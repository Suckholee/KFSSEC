import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createServer } from 'vite';
import { createServer as createHttpServer } from 'node:http';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { chairmanCareerSections, migrateChairmanCareer } from '../src/data/chairmanCareer.js';
import managedContentPlugin from './managed-content-plugin.js';
import directContentPlugin from './direct-content-plugin.js';

test('legacy mixed profile preserves custom entries while splitting requested credentials once', () => {
  const site = {
    managedLists: {
      chairmanCareer: [
        { id: '01', items: ['기존 자격'] },
        { id: '06', title: '학력 & 주요 경력 및 강의 경력', items: ['캐롤라인대학교 외식경영학 박사', '추가된 학력'], visible: false },
      ],
    },
    speech: { profileAdditionalItems: {
      '01': [{ id: 'keep', text: '다른 자격' }],
      '06': [
        { id: 'old', text: '전) 한국약선협회 이사·경상남도 지회장' },
        { id: 'custom', text: '새로운 경력', deleted: true },
      ],
    } },
  };
  const result = migrateChairmanCareer(site);
  assert.deepEqual(result.managedLists.chairmanCareer.map(card => card.id), ['01', '06', '07', '08']);
  assert.deepEqual(result.managedLists.chairmanCareer[1].items, [...chairmanCareerSections[0].items, '추가된 학력']);
  assert.equal(result.managedLists.chairmanCareer[2].visible, false);
  assert.deepEqual(result.speech.profileAdditionalItems['06'], [{ id: 'custom', text: '새로운 경력', deleted: true }]);
  assert.equal(result.speech.profileAdditionalItems['01'], site.speech.profileAdditionalItems['01']);
  assert.equal(migrateChairmanCareer(result), result);
  assert.equal(site.managedLists.chairmanCareer.length, 2);
  assert.deepEqual(migrateChairmanCareer({ managedLists: { chairmanCareer: [] } }), { managedLists: { chairmanCareer: [] } });
});

test('master and sommelier covers include ministry labels, including an uploaded cover', async () => {
  const server = await createServer({
    configFile: false,
    plugins: [(await import('@vitejs/plugin-react')).default({ babel: { plugins: [managedContentPlugin, directContentPlugin] } })],
    server: { middlewareMode: true, hmr: { server: createHttpServer() } },
    appType: 'custom', logLevel: 'error',
  });
  try {
    const { default: Cover } = await server.ssrLoadModule('/src/components/Catalog/CourseCover.jsx');
    const { LanguageProvider } = await server.ssrLoadModule('/src/i18n/LanguageContext.jsx');
    for (const course of [
      { id: 'master', name: '외식명인', image: '/images/course_menu_dev.jpg' },
      { id: 'sommelier', name: '소믈리에 파티컨설턴트', image: '/images/qualifications/sommelier.jpg' },
      { id: 'sommelier', name: '소믈리에 파티컨설턴트', image: '/uploaded-cover.jpg' },
    ]) {
      const html = renderToStaticMarkup(React.createElement(LanguageProvider, null, React.createElement(Cover, { course })));
      assert.match(html, /주무부처 농림축산식품부/);
      assert.ok(html.includes(course.image));
    }
  } finally {
    await server.close();
  }
});
