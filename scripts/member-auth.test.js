import { test } from 'node:test';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import handler from '../api/member-auth.js';
import membersHandler from '../api/members.js';
import { setAdminCookie } from '../api/_auth.js';

test('Kakao OAuth validates state, protects member cookies and rejects cross-origin logout', async () => {
  const previousEnv = { ...process.env };
  const previousFetch = globalThis.fetch;
  Object.assign(process.env, { SITE_URL: 'http://localhost:3000', MEMBER_SESSION_SECRET: 'test-only-secret-at-least-32-characters', KAKAO_REST_API_KEY: 'test-key', KAKAO_CLIENT_SECRET: 'test-secret' });
  delete process.env.VERCEL;
  process.env.SUPABASE_URL = 'https://db.example';
  process.env.SUPABASE_SERVICE_ROLE_KEY = 'test-database-key';
  let storedMember;
  const request = async (query = {}, headers = {}, method = 'GET', body = {}) => {
    const res = { headers: {}, statusCode: 200, setHeader(k, v) { this.headers[k] = v; }, status(v) { this.statusCode = v; return this; }, json(v) { this.body = v; return this; }, end() { return this; } };
    await handler({ method, query, headers, body }, res);
    return res;
  };
  try {
    let calls = 0;
    globalThis.fetch = async (url, options) => {
      calls++;
      if (url.startsWith('https://db.example')) {
        if (url.endsWith('/object/list/members')) return { ok: true, json: async () => [{ name: 'a'.repeat(64) + '.json' }] };
        if (options.method === 'POST') { storedMember = JSON.parse(options.body); return { ok: true }; }
        return storedMember ? { ok: true, json: async () => storedMember } : { ok: false, status: 404, json: async () => ({ statusCode: '404' }) };
      }
      if (url.includes('/oauth/token')) {
        assert.equal(options.body.get('redirect_uri'), 'http://localhost:3000/api/member-auth?action=callback');
        assert.equal(options.body.get('client_secret'), 'test-secret');
        return { ok: true, json: async () => ({ access_token: 'private-token' }) };
      }
      assert.equal(options.headers.Authorization, 'Bearer private-token');
      return { ok: true, json: async () => ({ id: 123, kakao_account: { profile: { nickname: 'Member' } } }) };
    };
    const start = await request({ action: 'start' });
    const state = new URL(start.headers.Location).searchParams.get('state');
    const stateCookie = start.headers['Set-Cookie'].split(';')[0];
    const denied = await request({ action: 'callback', state: 'wrong', code: 'code' }, { cookie: stateCookie });
    assert.match(denied.headers.Location, /login_error=state/);
    assert.equal(calls, 0);
    const callback = await request({ action: 'callback', state, code: 'code' }, { cookie: stateCookie });
    assert.match(callback.headers.Location, /signup=1/);
    assert.equal(storedMember, undefined);
    const pendingCookie = callback.headers['Set-Cookie'][1].split(';')[0];
    const pending = await request({}, { cookie: pendingCookie });
    assert.equal(pending.body.user, null);
    assert.equal(pending.body.registrationRequired, true);
    const registerHeaders = { cookie: pendingCookie, origin: 'http://localhost:3000' };
    assert.equal((await request({ action: 'register' }, { ...registerHeaders, origin: 'https://other.example' }, 'POST')).statusCode, 403);
    assert.equal((await request({ action: 'register' }, { origin: 'http://localhost:3000' }, 'POST')).statusCode, 401);
    assert.equal((await request({ action: 'register' }, registerHeaders, 'POST', { name: '홍길동', phone: 'bad' })).statusCode, 400);
    const registered = await request({ action: 'register' }, registerHeaders, 'POST', { name: '홍길동', phone: '010-1234-5678', email: 'member@example.com', id: 'forged' });
    assert.equal(registered.statusCode, 200);
    const decodeMember = () => { const bytes = Buffer.from(storedMember.encrypted, 'base64'); const cipher = crypto.createDecipheriv('aes-256-gcm', crypto.createHash('sha256').update(process.env.MEMBER_SESSION_SECRET).digest(), bytes.subarray(0,12)); cipher.setAuthTag(bytes.subarray(12,28)); return JSON.parse(Buffer.concat([cipher.update(bytes.subarray(28)),cipher.final()]).toString()); };
    assert.equal(decodeMember().id, 'kakao:123');
    assert.equal(decodeMember().name, '홍길동');
    assert.equal(decodeMember().phone, '01012345678');
    assert.equal(decodeMember().registrationComplete, true);
    const joinedAt = decodeMember().joinedAt;
    const secondStart = await request({ action: 'start' });
    const returning = await request({ action: 'callback', state: new URL(secondStart.headers.Location).searchParams.get('state'), code: 'code' }, { cookie: secondStart.headers['Set-Cookie'].split(';')[0] });
    assert.equal(returning.headers.Location, 'http://localhost:3000/');
    assert.equal(decodeMember().joinedAt, joinedAt);
    assert.equal(decodeMember().name, '홍길동');
    const memberCookie = returning.headers['Set-Cookie'][1];
    assert.match(memberCookie, /HttpOnly; SameSite=Lax/);
    assert.ok(!memberCookie.includes('private-token'));
    const session = await request({}, { cookie: memberCookie.split(';')[0] });
    assert.equal(session.body.user.id, 'kakao:123');
    assert.equal(session.body.user.name, '홍길동');
    assert.equal(session.body.registrationRequired, false);
    const profileHeaders = { cookie: memberCookie.split(';')[0], origin: 'http://localhost:3000' };
    assert.equal((await request({ action: 'profile' })).statusCode, 401);
    assert.equal((await request({ action: 'profile' }, { ...profileHeaders, origin: 'https://other.example' }, 'PUT')).statusCode, 403);
    const beforeEdit = decodeMember();
    const edited = await request({ action: 'profile' }, profileHeaders, 'PUT', { id: 'forged', name: '김회원', phone: '01098765432', email: '', industry: '외식업', organization: '한국외식', position: '대표' });
    assert.equal(edited.statusCode, 200);
    assert.equal(edited.body.user.name, '김회원');
    assert.equal(decodeMember().id, 'kakao:123');
    assert.equal(decodeMember().joinedAt, beforeEdit.joinedAt);
    assert.equal(decodeMember().lastLoginAt, beforeEdit.lastLoginAt);
    const profile = await request({ action: 'profile' }, profileHeaders);
    assert.equal(profile.body.profile.organization, '한국외식');
    assert.equal(profile.body.profile.industry, '외식업');
    assert.equal(profile.body.profile.position, '대표');
    assert.equal(profile.body.profile.email, '');
    assert.equal((await request({ action: 'profile' }, profileHeaders, 'PUT', { name: '김회원', phone: '01098765432', organization: 'x'.repeat(101) })).statusCode, 400);
    const listResponse = () => ({ headers: {}, statusCode: 200, setHeader(k, v) { this.headers[k] = v; }, status(n) { this.statusCode = n; return this; }, json(v) { this.body = v; return this; } });
    const anonymousList = listResponse();
    await membersHandler({ method: 'GET', headers: {} }, anonymousList);
    assert.equal(anonymousList.statusCode, 401);
    const adminList = listResponse();
    setAdminCookie(adminList);
    await membersHandler({ method: 'GET', headers: { cookie: adminList.headers['Set-Cookie'].split(';')[0] } }, adminList);
    assert.equal(adminList.statusCode, 200);
    assert.equal(adminList.body.members.length, 1);
    assert.equal(adminList.body.members[0].name, '김회원');
    assert.equal(adminList.body.members[0].organization, '한국외식');
    assert.equal(adminList.body.members[0].membershipType, 'general');
    const adminCookie = adminList.headers['Set-Cookie'].split(';')[0];
    const patch = async (body, headers = { cookie: adminCookie, origin: 'http://localhost:3000' }) => {
      const response = listResponse();
      await membersHandler({ method: 'PATCH', headers, body }, response);
      return response;
    };
    assert.equal((await patch({ id: 'kakao:123', membershipType: 'regular' }, {})).statusCode, 401);
    assert.equal((await patch({ id: 'kakao:123', membershipType: 'regular' }, { cookie: adminCookie, origin: 'https://other.example' })).statusCode, 403);
    assert.equal((await patch({ id: 'kakao:123', membershipType: 'admin' })).statusCode, 400);
    const promote = await patch({ id: 'kakao:123', membershipType: 'regular', name: 'forged' });
    assert.equal(promote.statusCode, 200);
    assert.equal(promote.body.member.membershipType, 'regular');
    assert.equal(promote.body.member.name, '김회원');
    assert.equal(promote.body.member.joinedAt, beforeEdit.joinedAt);
    assert.equal(promote.body.member.lastLoginAt, beforeEdit.lastLoginAt);
    const selfEdit = await request({ action: 'profile' }, profileHeaders, 'PUT', { name: '김회원', phone: '01098765432', membershipType: 'general' });
    assert.equal(selfEdit.statusCode, 200);
    assert.equal(decodeMember().membershipType, 'regular');
    assert.equal((await patch({ id: 'kakao:123', membershipType: 'general' })).body.member.membershipType, 'general');

    const tampered = await request({}, { cookie: 'kfssec_member_session=invalid' });
    assert.equal(tampered.body.user, null);
    assert.equal((await request({}, { origin: 'https://other.example' }, 'DELETE')).statusCode, 403);
    assert.equal((await request({}, { origin: 'http://localhost:3000' }, 'DELETE')).statusCode, 200);
    delete process.env.MEMBER_SESSION_SECRET;
    assert.equal((await request()).statusCode, 503);
    assert.equal((await request({}, { origin: 'http://localhost:3000' }, 'DELETE')).statusCode, 200);
  } finally {
    globalThis.fetch = previousFetch;
    for (const name of ['SITE_URL', 'MEMBER_SESSION_SECRET', 'KAKAO_REST_API_KEY', 'KAKAO_CLIENT_SECRET', 'VERCEL', 'SUPABASE_URL', 'SUPABASE_SERVICE_ROLE_KEY']) {
      if (previousEnv[name] === undefined) delete process.env[name]; else process.env[name] = previousEnv[name];
    }
  }
});
