import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { validateCourse, validateCourseList } from '../src/utils/courseValidation.js';
import { actualCourses } from '../src/data/actualCourses.js';
test('course writes preserve optional data and reject invalid shapes and duplicate identifiers',()=>{
 assert.equal(validateCourseList(actualCourses).length,actualCourses.length);
 const course={id:'x',title:' 과정명 ',notes:{custom:true},price:'200,000원'};
 assert.equal(validateCourse(course).title,'과정명');
 assert.deepEqual(validateCourse(course).notes,{custom:true});
 for(const input of [null,{},[null],[{id:'x',title:' '}],[{id:'x',title:'과정',industry:{}}],[{id:'x',title:'하나'},{id:'x',title:'둘'}]]) assert.throws(()=>validateCourseList(input),{name:'CourseValidationError'});
 assert.deepEqual(validateCourseList([]),[]);
});
const src=fs.readFileSync(new URL('../src/services/courseDatabase.js',import.meta.url),'utf8').replace("import { actualCourses as DEFAULT_COURSES } from '../data/actualCourses.js';",`const DEFAULT_COURSES = ${JSON.stringify(actualCourses)};`);
test('blocked, corrupt and full browser storage never break course reads or successful server saves',async()=>{
 const originalStorage=globalThis.localStorage,originalFetch=globalThis.fetch;
 const db=await import(`data:text/javascript,${encodeURIComponent(src)}`);
 try {
  globalThis.localStorage={getItem(){throw new Error('blocked');},setItem(){throw new Error('full');}};
  assert.ok(db.getCoursesFromDB().length>0);
  const persisted=[{id:7,title:'수정 과정',image:'/approved.jpg'}];
  globalThis.fetch=async()=>({ok:true,json:async()=>({success:true,data:persisted})});
  assert.deepEqual(await db.saveCoursesToDB(persisted),persisted);
  assert.deepEqual(db.getCoursesFromDB(),persisted);
  globalThis.localStorage={getItem(key){return key.includes('version')?'v6_official_clean_tuition_20260927':'{"broken":true}';},setItem(){}};
  assert.deepEqual(db.getCoursesFromDB(),persisted);
 } finally {globalThis.localStorage=originalStorage;globalThis.fetch=originalFetch;}
});
const apiSource=fs.readFileSync(new URL('../api/courses.js',import.meta.url),'utf8').replace(/^import .*;\n/gm,'');
test('invalid authorized course saves return a clear error without touching stored data',async()=>{
 const writes=[];
 const validationCode=fs.readFileSync(new URL('../src/utils/courseValidation.js',import.meta.url),'utf8').replaceAll('export ','');
 const harness=`${validationCode}\nconst actualCourses=[]; const requireAdmin=async()=>true; const readContent=async()=>[{id:'existing',title:'기존 과정'}]; const writeContent=async(...args)=>writes.push(args); const normalizeImages=async value=>value; ${apiSource}`.replace('export default async function handler','async function handler');
 const create=new Function('writes',`${harness}; return handler;`);
 const handler=create(writes);
 for(const body of [{courses:null},{courses:[{id:'x',title:' '}]},{courses:[{id:'x',title:'하나'},{id:'x',title:'둘'}]}]) {
  const res={setHeader(){},status(code){this.code=code;return this;},json(value){this.body=value;return this;}};
  await handler({method:'PUT',query:{id:'reorder'},body},res);
  assert.equal(res.code,400); assert.equal(res.body.success,false);
 }
 assert.equal(writes.length,0);
});
test('course search tolerates blank optional fields and keeps formatted tuition text',async()=>{
 const sample=[{id:'x',title:'푸드테크설계사',description:null,industry:null,price:'200,000원'},{id:'y',title:'소믈리에',price:0}];
 const source=fs.readFileSync(new URL('../src/services/courseApi.js',import.meta.url),'utf8').replace("import { getCoursesFromDB } from './courseDatabase';",`const getCoursesFromDB = () => ${JSON.stringify(sample)};`);
 const {fetchCourses}=await import(`data:text/javascript,${encodeURIComponent(source)}`);
 const result=await fetchCourses({search:'푸드테크'});
 assert.equal(result.data.length,1);assert.equal(result.data[0].priceFormatted,'200,000원');
 assert.equal((await fetchCourses({search:'소믈리에'})).data[0].priceFormatted,'0원');
 assert.equal((await fetchCourses({search:'없는 과정'})).data.length,0);
});
