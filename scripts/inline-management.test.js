import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createRequire } from 'node:module';
import { readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { createServer } from 'vite';
import { createServer as createHttpServer } from 'node:http';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import managedContentPlugin from './managed-content-plugin.js';
import directContentPlugin from './direct-content-plugin.js';
import { resourceDefaults, updateWithDefaults, restoreTemplates, serializable, publicItems, moveItem, newItem, sortedSectorIds } from '../src/content/resourceModel.js';
const require = createRequire(import.meta.resolve('@vitejs/plugin-react'));
const { transformSync } = require('@babel/core');

test('partial writes hydrate the full missing resource and never replace explicit lists', () => {
  const history = [{year:'2026',events:[{title:'A'},{title:'B'}]},{year:'2025',events:[{title:'C'}]}];
  resourceDefaults.set('history',history);
  resourceDefaults.set('strategicPillars',Array.from({length:12},(_,i)=>({title:`방향 ${i}`,desc:'설명'})));
  const original={unrelated:{preserve:true}};
  const result=updateWithDefaults(original,'history.0.year','2027');
  assert.equal(result.history.length,2); assert.equal(result.history[0].events.length,2);
  assert.equal(result.history[1].events[0].title,'C'); assert.equal(history[0].year,'2026');
  assert.equal(result.unrelated,original.unrelated);
  const pillars=updateWithDefaults(original,'strategicPillars.0.title','수정');
  assert.equal(pillars.strategicPillars.length,12); assert.equal(pillars.strategicPillars[11].title,'방향 11');
  assert.deepEqual(updateWithDefaults({history:[]},'history',[]).history,[]);
  assert.equal(updateWithDefaults({history:[{year:'사용자 자료'}]},'history.0.year','변경').history.length,1);
});
test('collection deletion, ordering, nested visibility and presentation templates survive serialization', () => {
  const icon=()=>null;
  const defaults=[{id:'a',title:'A',icon,items:[{name:'one',icon},{name:'two',icon}]},{id:'b',title:'B',icon}];
  const added=newItem(defaults[0]);
  assert.notEqual(added.id,'a'); assert.deepEqual(added.items,[]);
  const saved=serializable([defaults[1],{...added,title:'새 자료'}]);
  const restored=restoreTemplates(saved,defaults);
  assert.equal(restored[1].icon,icon); assert.equal(restored[1].title,'새 자료');
  assert.deepEqual(restoreTemplates([],defaults),[]);
  assert.equal(moveItem(defaults,0,1)[0].id,'b'); assert.equal(defaults[0].id,'a');
  assert.deepEqual(publicItems([{title:'공개',items:[{name:'숨김',visible:false},{name:'공개'}]},{visible:false}]),[{title:'공개',items:[{name:'공개'}]}]);
  const uniqueIcons=[{title:'A',icon:()=>1},{title:'B',icon:()=>2}];
  assert.equal(restoreTemplates(serializable(uniqueIcons),uniqueIcons)[1].icon,uniqueIcons[1].icon);
});
test('section order uses saved positions, including repeated moves', () => {
  const ids=['intro','hero','notice'];
  assert.deepEqual(sortedSectorIds(ids,{hero:{order:0},intro:{order:1},notice:{order:2}}),['hero','intro','notice']);
  assert.deepEqual(sortedSectorIds(ids,{notice:{order:0},hero:{order:1},intro:{order:2}}),['notice','hero','intro']);
});
function files(dir) {return readdirSync(dir,{withFileTypes:true}).flatMap(item=>item.isDirectory()?files(`${dir}/${item.name}`):[`${dir}/${item.name}`]);}
test('all application modules compile with source management and inline content together',()=>{
  let count=0;
  for(const filename of files(resolve('src')).filter(file=>file.endsWith('.jsx'))){
    transformSync(readFileSync(filename,'utf8'),{filename,configFile:false,babelrc:false,parserOpts:{plugins:['jsx']},plugins:[managedContentPlugin,directContentPlugin]}); count++;
  }
  assert.ok(count>80);
});
test('actual visitor components use saved collections, nested visibility and explicit empty lists',async()=>{
  const server=await createServer({configFile:false,plugins:[(await import('@vitejs/plugin-react')).default({babel:{plugins:[managedContentPlugin,directContentPlugin]}})],server:{middlewareMode:true,hmr:{server:createHttpServer()}},appType:'custom',logLevel:'error'});
  try {
    const {AdminEditProvider}=await server.ssrLoadModule('/src/context/AdminEditContext.jsx');
    const {LanguageProvider}=await server.ssrLoadModule('/src/i18n/LanguageContext.jsx');
    const render=(Component,siteData={},postsList=[])=>renderToStaticMarkup(React.createElement(LanguageProvider,null,React.createElement(AdminEditProvider,{siteData,postsList,adminAuth:{authenticated:false}},React.createElement(Component))));
    const {default:History}=await server.ssrLoadModule('/src/components/About/HistorySection.jsx');
    const history=render(History,{history:[{year:'2099',title:'테스트',events:[{date:'2099',title:'공개 사건',desc:'설명'},{title:'비공개 사건',visible:false}]}]});
    assert.match(history,/공개 사건/); assert.doesNotMatch(history,/비공개 사건/);
    assert.doesNotMatch(render(History,{history:[]}),/대한민국 자랑스러운/);
    const {default:Hero}=await server.ssrLoadModule('/src/components/Hero.jsx');
    assert.equal(render(Hero,{heroBanners:[]}), '');
    const {default:Gallery}=await server.ssrLoadModule('/src/components/Gallery/GalleryPage.jsx');
    const gallery=render(Gallery,{},[{id:'only',categoryType:'gallery',title:'단일 저장 자료',image:'/custom.jpg'}]);
    assert.match(gallery,/단일 저장 자료/); assert.match(gallery,/custom.jpg/);
    assert.doesNotMatch(render(Gallery,{},[]),/단일 저장 자료/);
    const {default:Guide}=await server.ssrLoadModule('/src/components/Catalog/QualificationGuide.jsx');
    assert.match(render(Guide,{managedLists:{qualificationCatalog:[]}}),/등록된 자격과정이 없습니다/);
    const hidden=render(Guide,{managedLists:{qualificationCatalog:[{id:'only',name:'커스텀 과정',image:'/custom.jpg',reviews:['공개 후기'],grades:['공개 등급']}]}});
    assert.match(hidden,/커스텀 과정/); assert.match(hidden,/공개 후기/);
    assert.doesNotMatch(hidden,/data-direct-content|data-editor-sector/);
  }finally {await server.close();}
});
