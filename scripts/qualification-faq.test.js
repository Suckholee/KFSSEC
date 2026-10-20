import assert from 'node:assert/strict';
import { test } from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createServer } from 'vite';
import { createServer as createHttpServer } from 'node:http';
import { DEFAULT_QUALIFICATION_FAQS, getQualificationFaqs, moveFaq, validateFaqs } from '../src/data/qualificationFaqs.js';
import { valueKey } from '../src/components/Admin/InlineEditor/directContentModel.js';

test('saved order, hidden items and an empty list remain explicit', () => {
  const defaults = getQualificationFaqs();
  assert.equal(defaults.length, 3);
  assert.deepEqual(getQualificationFaqs({ qualificationFaqs: [] }), []);
  const changed = [{ ...defaults[2], visible: false }, defaults[0]];
  assert.deepEqual(getQualificationFaqs({ qualificationFaqs: changed }), changed);
  const moved = moveFaq(defaults, 0, 1);
  assert.equal(moved[0].id, defaults[1].id);
  assert.equal(defaults[0].id, 'eligibility');
  assert.equal(moveFaq(defaults, 0, -1), defaults);
  assert.equal(validateFaqs([]), '');
  assert.notEqual(validateFaqs([{ id: 'new', question: '', answer: '' }]), '');
  assert.notEqual(validateFaqs([defaults[0], defaults[0]]), '');
});

test('previous direct edits are preserved when opening list management', () => {
  const original = DEFAULT_QUALIFICATION_FAQS[0];
  const contentOverrides = { [valueKey('ccfb2b3d65273bd2-0', 'text-0', original.question)]: '이전에 수정한 질문', [valueKey('7759f399c2b8db5f-0', 'text-0', original.answer)]: '이전에 수정한 답변' };
  assert.equal(getQualificationFaqs({ contentOverrides })[0].question, '이전에 수정한 질문');
  assert.equal(getQualificationFaqs({ contentOverrides })[0].answer, '이전에 수정한 답변');
  assert.equal(getQualificationFaqs({ contentOverrides, qualificationFaqs: [original] })[0].question, original.question);
});

test('visitor sees public items in saved order; administrator sees hidden items and management', async () => {
  const server = await createServer({ configFile: false, plugins: [(await import('@vitejs/plugin-react')).default()], server: { middlewareMode: true, hmr: { server: createHttpServer() } }, appType: 'custom', logLevel: 'error' });
  try {
    const { default: Section } = await server.ssrLoadModule('/src/components/Catalog/QualificationFaqSection.jsx');
    const { AdminEditProvider } = await server.ssrLoadModule('/src/context/AdminEditContext.jsx');
    const { LanguageProvider } = await server.ssrLoadModule('/src/i18n/LanguageContext.jsx');
    const render = (items, admin = false) => renderToStaticMarkup(React.createElement(LanguageProvider, null, React.createElement(AdminEditProvider, { siteData: { qualificationFaqs: items }, adminAuth: { authenticated: admin } }, React.createElement(Section))));
    const items = [{ id: 'b', question: '두 번째 질문', answer: '공개 답변', visible: true }, { id: 'a', question: '숨긴 질문', answer: '숨긴 답변', visible: false }, { id: 'c', question: '마지막 질문', answer: '끝 답변', visible: true }];
    const html = render(items);
    assert.ok(html.indexOf('두 번째 질문') < html.indexOf('마지막 질문'));
    assert.doesNotMatch(html, /숨긴 질문|숨긴 답변|FAQ 목록 관리/);
    assert.match(render(items, true), /FAQ 목록 관리/);
    assert.match(render(items, true), /비공개 · 관리자에게만 표시/);
    assert.equal(render([]), '');
    assert.match(render([], true), /등록된 질문이 없습니다/);
  } finally { await server.close(); }
});
