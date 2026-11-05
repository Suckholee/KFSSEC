import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createRequire } from 'node:module';
import { readFileSync, readdirSync } from 'node:fs';
import { qualifications } from '../src/data/qualifications.js';
const require = createRequire(import.meta.resolve('@vitejs/plugin-react'));
const { parse } = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const parseSource = file => parse(readFileSync(file, 'utf8'), { sourceType: 'module', plugins: ['jsx'] });
function files(dir) { return readdirSync(dir, {withFileTypes:true}).flatMap(item => item.isDirectory() ? files(`${dir}/${item.name}`) : [`${dir}/${item.name}`]); }
test('fullscreen dialogs escape transformed sections through a portal', () => {
 let checked = 0;
 for (const file of files('src/components').filter(f => f.endsWith('.jsx'))) {
  if (file.endsWith('/Header.jsx') || file.endsWith('/AdminBlockNavigator.jsx')) continue;
  traverse(parseSource(file), { JSXElement(p) {
   const classes = p.node.openingElement.attributes.find(a => a.name?.name === 'className')?.value?.value;
   if (!classes || !/\bfixed\b/.test(classes) || !/\binset-0\b/.test(classes)) return;
   const portal = p.findParent(q => (q.isJSXElement() && q.node.openingElement.name.name === 'ModalPortal') || (q.isCallExpression() && q.node.callee.name === 'createPortal'));
   assert.ok(portal, `${file}:${p.node.loc.start.line} is trapped in its page`); checked++;
  }});
 }
 assert.ok(checked >= 40);
});
test('published defaults and database seeds no longer include prototype content', () => {
 const defaults = readFileSync('src/data/defaultPosts.js','utf8');
 assert.doesNotMatch(defaults, /gal-demo-|gal-(ceremony|comp|consult|train)-[123]"|"p-[123]"|"isDemo"/);
 assert.match(defaults, /post-nongahn-20260918/);
 assert.match(defaults, /mou-post-tonichi/);
 assert.match(readFileSync('scripts/sync_data.js','utf8'), /const postsData = \[\];/);
 for (const qualification of qualifications) assert.deepEqual(qualification.reviews, []);
});
test('server post deletion and explicit empty lists are not replaced by release defaults', () => {
 let reads = 0;
 traverse(parseSource('src/App.jsx'), { CallExpression(p) {
  if (p.node.callee.name !== 'setPostsList' || p.node.arguments[0]?.name !== 'data') return;
  assert.match(readFileSync('src/App.jsx','utf8').slice(p.parentPath.parent.start,p.parentPath.parent.end), /Array\.isArray/);
  reads++;
 }});
 assert.equal(reads, 1);
 assert.doesNotMatch(readFileSync('src/App.jsx','utf8'), /adoptReleasePosts/);
});
