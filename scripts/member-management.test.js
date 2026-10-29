import {test} from 'node:test';
import assert from 'node:assert/strict';
import {memberManagementRow} from '../src/utils/memberManagement.js';
test('social authentication, institute membership and administrator permissions remain distinct',()=>{
 const source={id:'kakao:1',provider:'kakao',registrationComplete:true,membershipType:'general'};
 const row=memberManagementRow(source);
 assert.equal(row.loginMethod,'카카오 간편 로그인');
 assert.equal(row.accessRole,'일반 이용자');
 assert.equal(row.membershipType,'general');
 assert.equal(row.contactStatus,'연락처 확인 필요');
 assert.equal(source.loginMethod,undefined);
 assert.equal(memberManagementRow({...source,membershipType:'regular'}).accessRole,'일반 이용자');
 assert.equal(memberManagementRow({...source,adminRole:'admin'}).accessRole,'관리자');
 assert.equal(memberManagementRow({...source,registrationComplete:false}).registrationStatus,'추가 정보 입력 필요');
});
