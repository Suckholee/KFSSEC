import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const facultySource=fs.readFileSync(new URL('../src/data/faculty.js',import.meta.url),'utf8');
const facultyUrl=`data:text/javascript,${encodeURIComponent(facultySource)}`;
const source=fs.readFileSync(new URL('../src/data/profileDirectory.js',import.meta.url),'utf8').replace("'./faculty'",JSON.stringify(facultyUrl));
const {profileLines,resolveDirectory,migrateProfileDirectories}=await import(`data:text/javascript,${encodeURIComponent(source)}`);
test('saved multiline profile entries are separate items without losing content',()=>{
 assert.deepEqual(profileLines(['first\n\nsecond\r\nthird','fourth']),['first','second','third','fourth']);
 const site={faculty:[{id:'joo',name:'주정자',highlights:['첫 항목\n\n둘째 항목']}]};
 assert.deepEqual(resolveDirectory(site)[0].highlights,['첫 항목','둘째 항목']);
 assert.equal(site.faculty[0].highlights.length,1);
});
test('consultants are independent, include chairman, and preserve explicit empty lists and order',()=>{
 const site={faculty:[{id:'prof-jin',name:'진익준',image:'/approved.jpg'},{id:'advisor',name:'고문'}]};
 const consultants=resolveDirectory(site,'consultingFaculty');
 assert.deepEqual(consultants.map(m=>m.name),['안형상','진익준']);
 assert.equal(consultants[1].image,'/approved.jpg');
 consultants[1].name='수정';assert.equal(site.faculty[0].name,'진익준');
 assert.deepEqual(resolveDirectory({...site,consultingFaculty:[]},'consultingFaculty'),[]);
 assert.deepEqual(resolveDirectory({faculty:[]},'faculty'),[]);
 const manual=[{id:'b',name:'나'},{id:'a',name:'가'}];
 assert.deepEqual(resolveDirectory({faculty:manual}).map(m=>m.id),['b','a']);
});

test('adviser migration is independent and runs once so deletions survive reload',()=>{
 const original={faculty:[{id:'joo',name:'주정자',highlights:['첫 항목\n둘째 항목']}]};
 const migrated=migrateProfileDirectories(original);
 assert.deepEqual(migrated.faculty.map(m=>m.name),['주정자','이득식','정보헌','박상혜','정기엽']);
 assert.deepEqual(migrated.consultingFaculty.map(m=>m.name),['안형상','진익준']);
 assert.equal(original.faculty.length,1);
 const deleted={...migrated,faculty:[]};
 assert.equal(migrateProfileDirectories(deleted),deleted);
 assert.deepEqual(migrateProfileDirectories(deleted).faculty,[]);
});

test('profile card migration fills missing content and preserves administrator content',()=>{
 const migrated=migrateProfileDirectories({profileDirectoryVersion:1,faculty:[{id:'lee',name:'이득식',highlights:[]},{id:'jung',name:'정보헌',image:'/custom.jpg',highlights:['관리자 약력']}]});
 assert.equal(migrated.profileDirectoryVersion,2);
 assert.equal(migrated.faculty[0].imageLayout,'card');
 assert.equal(migrated.faculty[0].highlights.length,10);
 assert.equal(migrated.faculty[1].image,'/custom.jpg');
 assert.deepEqual(migrated.faculty[1].highlights,['관리자 약력']);
});
