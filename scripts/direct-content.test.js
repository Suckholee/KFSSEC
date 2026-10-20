import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { test } from 'node:test';
import { createServer } from 'vite';
import { createServer as createHttpServer } from 'node:http';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import directContentPlugin, { isPublicContentFile } from './direct-content-plugin.js';
import { valueKey, textRole, isAllowedContentUrl, sharedBindingId } from '../src/components/Admin/InlineEditor/directContentModel.js';

const require = createRequire(import.meta.resolve('@vitejs/plugin-react'));
const { transformSync } = require('@babel/core');
const compile = (source, filename = resolve('src/components/About/GreetingsSection.jsx')) => transformSync(source, { filename, configFile: false, babelrc: false, parserOpts: { plugins: ['jsx'] }, plugins: [directContentPlugin] }).code;

test('public content has a stable binding and repeated items remain independent', () => {
  assert.equal(valueKey('x', 'title', '원문'), valueKey('x', 'title', '원문'));
  assert.notEqual(valueKey('x', 'title', '안형상'), valueKey('x', 'title', '다른 교수'));
  assert.notEqual(valueKey('x', 'title', '원문', 'ko'), valueKey('x', 'title', '원문', 'en'));
  const album = [{ imageUrl: '/a.jpg' }];
  assert.equal(sharedBindingId(album), sharedBindingId(album));
  assert.notEqual(sharedBindingId(album), sharedBindingId([...album]));
  assert.equal(textRole('h3'), '제목'); assert.equal(textRole('p'), '설명·본문');
});

test('content URLs reject executable protocols and accept local media', () => {
  for (const url of ['javascript:alert(1)', 'data:text/html,x', '//evil.example/x', ' https://example.com', 'java\nscript:foo']) assert.equal(isAllowedContentUrl(url, 'media'), false, url);
  for (const url of ['/images/x.jpg', 'https://example.com/x', 'http://localhost:3000/x']) assert.equal(isAllowedContentUrl(url, 'image'), true, url);
  for (const url of ['#profile', 'mailto:hello@example.com', 'tel:021234567']) assert.equal(isAllowedContentUrl(url, 'link'), true);
});

test('compiler preserves existing editors, instruments images and stable sibling bindings', () => {
  const source = '<section><h3>제목</h3><p>{t("설명")}</p><img src={photo} /><EditableText value="직접 수정" /><EditableImage><img src="/existing.jpg" /></EditableImage></section>';
  const compiled = compile(source);
  assert.match(compiled, /as="h3"/); assert.match(compiled, /as="p"/); assert.match(compiled, /as="img"/);
  assert.match(compiled, /<img src="\/existing.jpg"/);
  const base = compile('<h3>제목</h3>').match(/contentId="([^"]+)"/)[1];
  const added = compile('<><p>추가</p><h3>제목</h3></>').match(/as="h3" contentId="([^"]+)"/)[1];
  assert.equal(base, added);
  assert.doesNotMatch(compile('<p>관리자 설정</p>', resolve('src/components/Admin/AdminAbout.jsx')), /__SiteContent/);
});

function files(dir) { return readdirSync(dir, { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? files(`${dir}/${entry.name}`) : [`${dir}/${entry.name}`]); }
test('all public component modules compile through the common editor', () => {
  let modules = 0, bindings = 0;
  for (const file of files(resolve('src/components')).filter(isPublicContentFile)) {
    const result = compile(readFileSync(file, 'utf8'), file);
    modules++; bindings += [...result.matchAll(/contentId="/g)].length;
  }
  console.log(`Audited ${modules} public component modules; ${bindings} automatic element bindings, plus existing dedicated editors.`);
  assert.ok(modules > 40); assert.ok(bindings > 500);
});

test('visitor output, saved overrides, empty text, language separation and image replacement', async () => {
  const server = await createServer({ configFile: false, plugins: [(await import('@vitejs/plugin-react')).default({ babel: { plugins: [directContentPlugin] } })], server: { middlewareMode: true, hmr: { server: createHttpServer() } }, appType: 'custom', logLevel: 'error' });
  try {
    const { default: Content } = await server.ssrLoadModule('/src/components/Admin/InlineEditor/DirectContent.jsx');
    const { AdminEditProvider } = await server.ssrLoadModule('/src/context/AdminEditContext.jsx');
    const { LanguageProvider } = await server.ssrLoadModule('/src/i18n/LanguageContext.jsx');
    const render = (overrides, content) => renderToStaticMarkup(React.createElement(LanguageProvider, null, React.createElement(AdminEditProvider, { siteData: { contentOverrides: overrides }, adminAuth: { authenticated: false } }, content)));
    const title = React.createElement(Content, { as: 'h3', contentId: 'profile-title', className: 'original-style' }, '안형상 이사장 프로필 & 주요 약력');
    const key = valueKey('profile-title', 'text-0', '안형상 이사장 프로필 & 주요 약력');
    assert.equal(render({}, title), '<h3 class="original-style">안형상 이사장 프로필 &amp; 주요 약력</h3>');
    assert.match(render({ [key]: '수정한 제목' }, title), /수정한 제목/);
    assert.equal(render({ [key]: '' }, title), '<h3 class="original-style"></h3>');
    assert.doesNotMatch(render({ [key + '_en']: 'English' }, title), /English/);
    const image = React.createElement(Content, { as: 'img', contentId: 'profile-image', src: '/old.jpg', alt: '프로필' });
    assert.match(render({ [valueKey('profile-image', 'src', '/old.jpg')]: '/new.jpg' }, image), /src="\/new.jpg"/);
    assert.doesNotMatch(render({ [key]: '수정한 제목' }, title), /data-direct-content/);
  } finally { await server.close(); }
});
