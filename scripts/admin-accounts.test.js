import { test } from 'node:test';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import { isAdmin, requireAdmin, setAdminCookie, validPassword } from '../api/_auth.js';
import auth from '../api/auth.js';
import members from '../api/members.js';
import inquiries from '../api/inquiries.js';
const response = () => ({ headers: {}, statusCode: 200, setHeader(k,v){this.headers[k]=v;}, status(n){this.statusCode=n;return this;}, json(body){this.body=body;return this;} });
function encrypted(value) {
  const key=crypto.createHash('sha256').update(process.env.MEMBER_SESSION_SECRET).digest(), iv=crypto.randomBytes(12);
  const cipher=crypto.createCipheriv('aes-256-gcm',key,iv);
  const data=Buffer.concat([cipher.update(JSON.stringify(value)),cipher.final()]);
  return Buffer.concat([iv,cipher.getAuthTag(),data]);
}
test('admin access requires server-designated membership and revocation takes effect immediately',async()=>{
 const old={...process.env}, originalFetch=globalThis.fetch;
 Object.assign(process.env,{SITE_URL:'http://localhost:3000',ADMIN_PASSWORD:'configured-test-operator-password',ADMIN_SESSION_SECRET:'test-admin-signing-secret-at-least-32-characters',MEMBER_SESSION_SECRET:'test-member-signing-secret-at-least-32-characters',SUPABASE_URL:'https://db.example',SUPABASE_SERVICE_ROLE_KEY:'test'});
 let member={id:'kakao:123',name:'테스트회원',registrationComplete:true,adminRole:'none'};
 globalThis.fetch=async(_url,options={})=> options.method==='POST' ? {ok:true} : {ok:true,json:async()=>({encrypted:encrypted(member).toString('base64')})};
 const cookie=`kfssec_member_session=${encrypted({user:{id:member.id,registrationComplete:true},expires:Date.now()+60000}).toString('base64url')}`;
 try {
  assert.equal(await isAdmin({headers:{cookie}}),false);
  member.adminRole='admin'; assert.equal(await isAdmin({headers:{cookie}}),true);
  member.adminRole='none'; assert.equal(await isAdmin({headers:{cookie}}),false);
  const forged=`kfssec_member_session=${encrypted({user:{id:member.id,registrationComplete:true,adminRole:'admin'},expires:Date.now()+60000}).toString('base64url')}`;
  assert.equal(await isAdmin({headers:{cookie:forged}}),false);
  assert.equal(await isAdmin({headers:{cookie:'kfssec_member_session=invalid'}}),false);
  assert.equal(await isAdmin({headers:{cookie:'kfssec_admin_session=%INVALID'}}),false);
  assert.equal(validPassword('kfssec2026!'),false);assert.equal(validPassword('admin1234'),false);
  assert.equal(validPassword('configured-test-operator-password'),true);
  const denied=response();assert.equal(await requireAdmin({headers:{cookie}},denied),false);assert.equal(denied.statusCode,401);
  const admin=response();setAdminCookie(admin);const adminCookie=admin.headers['Set-Cookie'].split(';')[0];
  assert.equal(await isAdmin({headers:{cookie:adminCookie}}),true);
  const cross=response();await auth({method:'POST',headers:{origin:'https://other.example'},body:{username:'admin',password:process.env.ADMIN_PASSWORD}},cross);assert.equal(cross.statusCode,403);
  member.adminRole='none'; const escalation=response();await members({method:'PATCH',headers:{cookie,origin:process.env.SITE_URL},body:{id:'kakao:other',adminRole:'admin'}},escalation);assert.equal(escalation.statusCode,401);
  member.adminRole='admin'; const selfRevoke=response(); await members({method:'PATCH',headers:{cookie,origin:process.env.SITE_URL},body:{id:member.id,adminRole:'none'}},selfRevoke); assert.equal(selfRevoke.statusCode,400);
  process.env.ADMIN_PASSWORD='kfssec2026!'; assert.equal(validPassword('kfssec2026!'),false);
  const anonymous=response();await inquiries({method:'POST',headers:{origin:process.env.SITE_URL},body:{title:'t',content:'c'}},anonymous);assert.equal(anonymous.statusCode,401);
 } finally { globalThis.fetch=originalFetch;for(const key of Object.keys(process.env))if(!(key in old))delete process.env[key];Object.assign(process.env,old); }
});
