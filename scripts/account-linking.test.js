import {test} from 'node:test';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import handler from '../api/member-auth.js';
import {saveMember,getMember,listMembers,identityMember,claimIdentity,linkVerifiedIdentity} from '../api/_members.js';
import {memberSessionId} from '../api/_memberSession.js';
import {isAdmin} from '../api/_auth.js';
function session(user){const key=crypto.createHash('sha256').update(process.env.MEMBER_SESSION_SECRET).digest(),iv=crypto.randomBytes(12),cipher=crypto.createCipheriv('aes-256-gcm',key,iv);const data=Buffer.concat([cipher.update(JSON.stringify({user,expires:Date.now()+60000})),cipher.final()]);return 'kfssec_member_session='+Buffer.concat([iv,cipher.getAuthTag(),data]).toString('base64url');}
function cookies(res){return (Array.isArray(res.headers['Set-Cookie'])?res.headers['Set-Cookie']:[res.headers['Set-Cookie']]).filter(Boolean).map(s=>s.split(';')[0]).join('; ');}
async function call(action,body={},cookie='',method='POST'){const res={headers:{},statusCode:200,setHeader(k,v){this.headers[k]=v;},status(n){this.statusCode=n;return this;},json(v){this.body=v;return this;},end(){return this;}};await handler({method,query:{action,...(method==='GET'?body:{})},headers:{origin:'https://site.test',cookie},body},res);return res;}
test('both identities must be verified; merged accounts share profile, enrollments and server permissions',async()=>{
 const env={...process.env},fetcher=globalThis.fetch,objects=new Map();let mailCalls=0,wrongEmail=false,googleVerified=true;
 Object.assign(process.env,{SITE_URL:'https://site.test',MEMBER_SESSION_SECRET:'testing-only-account-link-secret-long-enough',SUPABASE_URL:'https://storage.test',SUPABASE_SERVICE_ROLE_KEY:'test-key',KAKAO_REST_API_KEY:'test',KAKAO_CLIENT_SECRET:'test',GOOGLE_CLIENT_ID:'google-test',GOOGLE_CLIENT_SECRET:'google-secret'});delete process.env.VERCEL;
 globalThis.fetch=async(url,options={})=>{
  const response=(status,body={})=>({ok:status<300,status,json:async()=>body});
  if(url==='https://oauth2.googleapis.com/token'){assert.ok(new URLSearchParams(options.body).get('code_verifier'));return response(200,{access_token:'google-verified-token'});}
  if(url==='https://openidconnect.googleapis.com/v1/userinfo')return response(200,{sub:'google-user-1',email:'same@example.com',email_verified:googleVerified,name:'Google회원'});
  if(url.includes('/oauth/token'))return response(200,{access_token:'verified-kakao-token'});
  if(url.includes('/v2/user/me'))return response(200,{id:2,kakao_account:{profile:{nickname:'카카오이름'}}});
  if(url.includes('/auth/v1/otp')){mailCalls++;return response(200);}
  if(url.endsWith('/auth/v1/verify')){const body=JSON.parse(options.body);if(body.token!=='123456')return response(403);return response(200,{user:{id:'verified-email',email:wrongEmail?'wrong@example.com':body.email,email_confirmed_at:new Date().toISOString()}});}
  if(url.endsWith('/object/list/members'))return response(200,[...objects.keys()].filter(n=>/^[a-f0-9]{64}\.json$/.test(n)).map(name=>({name})));
  if(options.method==='DELETE'){for(const key of JSON.parse(options.body).prefixes)objects.delete(key);return response(200);}
  const name=url.split('/').at(-1);
  if(options.method==='POST'){if(objects.has(name)&&options.headers['x-upsert']==='false')return response(409,{statusCode:'409'});objects.set(name,JSON.parse(options.body));return response(200);}
  return objects.has(name)?response(200,objects.get(name)):response(404,{statusCode:'404'});
 };
 try{
  const kakao=await saveMember({id:'kakao:1',name:'기존회원',email:'same@example.com',registrationComplete:true,provider:'kakao',membershipType:'regular',adminRole:'admin',enrolledCourses:[{courseId:'a',courseTitle:'기존 과정',status:'수료'}]});
  const kaCookie=session(kakao);
  assert.equal((await call('email-start',{email:'same@example.com',purpose:'link'})).statusCode,401);assert.equal(mailCalls,0);
  const started=await call('email-start',{email:'same@example.com'});assert.equal(started.statusCode,200);const challenge=cookies(started);
  assert.equal((await call('email-verify',{token:'111111'},challenge)).statusCode,400);
  wrongEmail=true;assert.equal((await call('email-verify',{token:'123456'},challenge)).statusCode,400);wrongEmail=false;
  const verified=await call('email-verify',{token:'123456'},challenge);assert.equal(verified.body.registrationRequired,true);
  const registered=await call('register',{name:'이메일회원',phone:'01012345678',email:'contact@example.com',adminRole:'admin'},cookies(verified));assert.equal(registered.statusCode,200);
  const emailId=registered.body.user.id;assert.notEqual(emailId,kakao.id);assert.equal((await getMember(emailId)).adminRole,undefined);
  await saveMember({id:emailId,enrolledCourses:[{courseId:'b',courseTitle:'다른 과정',status:'수강중'}]});
  assert.equal((await listMembers()).length,2);
  const linkStart=await call('email-start',{email:'same@example.com',purpose:'link'},kaCookie);const linkChallenge=cookies(linkStart);
  assert.equal((await call('email-verify',{token:'123456'},linkChallenge)).statusCode,401);
  const linked=await call('email-verify',{token:'123456'},kaCookie+'; '+linkChallenge);assert.equal(linked.statusCode,200);assert.equal(linked.body.user.id,kakao.id);
  const canonical=await identityMember('email:same@example.com');assert.equal(canonical.id,kakao.id);assert.equal((await getMember(emailId)).id,kakao.id);assert.equal((await listMembers()).length,1);
  assert.deepEqual(canonical.enrolledCourses.map(c=>c.courseId).sort(),['a','b']);assert.equal(canonical.membershipType,'regular');assert.equal(canonical.adminRole,'admin');
  const oldEmailCookie=cookies(registered);assert.equal((await call('session',{},oldEmailCookie,'GET')).body.user.id,kakao.id);assert.equal(await isAdmin({headers:{cookie:oldEmailCookie}}),true);
  const again=await linkVerifiedIdentity(kakao.id,'email:same@example.com');assert.equal(again.enrolledCourses.length,2);
  assert.equal((await call('profile',{},cookies(linked),'GET')).body.enrolledCourses.length,2);
  const kaStart=await call('start',{link:'1'},oldEmailCookie,'GET');
  const state=new URL(kaStart.headers.Location).searchParams.get('state');
  const blocked=await call('callback',{state,code:'code'},cookies(kaStart),'GET');assert.match(blocked.headers.Location,/login_error/);
  const kaStart2=await call('start',{link:'1'},oldEmailCookie,'GET');
  const accepted=await call('callback',{state:new URL(kaStart2.headers.Location).searchParams.get('state'),code:'fresh-code'},oldEmailCookie+'; '+cookies(kaStart2),'GET');
  assert.equal(accepted.headers.Location,'https://site.test/');assert.equal((await identityMember('kakao:2')).id,kakao.id);
  const googleStart=await call('google-start',{},'','GET');
  const googleUrl=new URL(googleStart.headers.Location);assert.equal(googleUrl.origin,'https://accounts.google.com');assert.equal(googleUrl.searchParams.get('redirect_uri'),'https://site.test/api/member-auth?action=callback');assert.equal(googleUrl.searchParams.get('code_challenge_method'),'S256');
  const googleState=googleUrl.searchParams.get('state');
  const tampered=await call('google-callback',{state:'bad',code:'code'},cookies(googleStart),'GET');assert.match(tampered.headers.Location,/login_error=state/);
  googleVerified=false;const unverified=await call('google-callback',{state:googleState,code:'code'},cookies(googleStart),'GET');assert.match(unverified.headers.Location,/login_error=failed/);googleVerified=true;
  const googleFirst=await call('google-callback',{state:googleState,code:'code'},cookies(googleStart),'GET');assert.match(googleFirst.headers.Location,/signup=1/);
  const googleRegistration=await call('register',{name:'구글회원',phone:'01098765432',email:'same@example.com',adminRole:'admin'},cookies(googleFirst));
  const googleMember=await identityMember('google:google-user-1');assert.notEqual(googleMember.id,kakao.id);assert.equal(googleMember.adminRole,undefined);
  await saveMember({id:googleMember.id,enrolledCourses:[{courseId:'c',courseTitle:'Google 수강',status:'수강중'}]});
  const googleLink=await call('google-start',{link:'1'},kaCookie,'GET');const linkState=new URL(googleLink.headers.Location).searchParams.get('state');
  assert.match((await call('google-callback',{state:linkState,code:'code'},cookies(googleLink),'GET')).headers.Location,/login_error/);
  const googleLinked=await call('google-callback',{state:linkState,code:'code'},kaCookie+'; '+cookies(googleLink),'GET');assert.equal(googleLinked.headers.Location,'https://site.test/');
  assert.equal((await identityMember('google:google-user-1')).id,kakao.id);assert.equal((await listMembers()).length,1);
  assert.deepEqual((await getMember(kakao.id)).enrolledCourses.map(c=>c.courseId).sort(),['a','b','c']);
  const googleCookie=cookies(googleRegistration);assert.equal((await call('session',{},googleCookie,'GET')).body.user.id,kakao.id);assert.equal(await isAdmin({headers:{cookie:googleCookie}}),true);
  const googleAgain=await call('google-start',{},'','GET');const googleLogin=await call('callback',{state:new URL(googleAgain.headers.Location).searchParams.get('state'),code:'code'},cookies(googleAgain),'GET');assert.equal(googleLogin.headers.Location,'https://site.test/');
  assert.equal((await call('profile',{},cookies(googleLogin),'GET')).body.enrolledCourses.length,3);
  await saveMember({id:kakao.id,adminRole:'none'},{touchLogin:false});assert.equal(await isAdmin({headers:{cookie:oldEmailCookie}}),false);assert.equal(await isAdmin({headers:{cookie:googleCookie}}),false);
  assert.equal(memberSessionId({headers:{cookie:'kfssec_member_session=forged'}}),null);
  await assert.rejects(()=>claimIdentity('email:same@example.com','another-member'));
 }finally{globalThis.fetch=fetcher;for(const key of Object.keys(process.env))if(!(key in env))delete process.env[key];Object.assign(process.env,env);}
});
