import crypto from 'node:crypto';
import { getMember, saveMember, identityMember, claimIdentity, linkVerifiedIdentity } from './_members.js';

import { emailIdentity, emailAuth } from './_emailAuth.js';
const GOOGLE_STATE = 'kfssec_google_state';
const EMAIL_CHALLENGE = 'kfssec_email_challenge';
const SESSION = 'kfssec_member_session';
const STATE = 'kfssec_kakao_state';
const DAY = 86400;

function settings() {
  const origin = new URL(process.env.SITE_URL || 'http://localhost:3000').origin;
  if (process.env.VERCEL && (!process.env.SITE_URL || !origin.startsWith('https://'))) throw new Error('SITE_URL required');
  const secret = process.env.MEMBER_SESSION_SECRET;
  if (!secret || secret.length < 32) throw new Error('MEMBER_SESSION_SECRET required');
  const key = crypto.createHash('sha256').update(secret).digest();
  return { origin, key, redirect: `${origin}/api/member-auth?action=callback` };
}

function seal(value, key) {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  const data = Buffer.concat([cipher.update(JSON.stringify(value)), cipher.final()]);
  return Buffer.concat([iv, cipher.getAuthTag(), data]).toString('base64url');
}

function read(req, name, key) {
  try {
    const cookie = (req.headers.cookie || '').split(';').map(v => v.trim()).find(v => v.startsWith(`${name}=`));
    if (!cookie) return null;
    const bytes = Buffer.from(cookie.slice(name.length + 1), 'base64url');
    const cipher = crypto.createDecipheriv('aes-256-gcm', key, bytes.subarray(0, 12));
    cipher.setAuthTag(bytes.subarray(12, 28));
    const value = JSON.parse(Buffer.concat([cipher.update(bytes.subarray(28)), cipher.final()]).toString());
    return value.expires > Date.now() ? value : null;
  } catch { return null; }
}

function cookie(name, value, age, origin) {
  return `${name}=${value}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${age}${origin.startsWith('https://') ? '; Secure' : ''}`;
}

function redirect(res, destination) {
  res.statusCode = 302;
  res.setHeader('Location', destination);
  return res.end();
}

function profileFields(body = {}) {
  const text = (key, max) => { const value = typeof body[key] === 'string' ? body[key].trim() : ''; if (value.length > max || /[<>\x00-\x1f]/.test(value)) throw new Error('입력 내용의 길이와 문자를 확인해 주세요.'); return value; };
  const name = text('name', 50);
  const phone = text('phone', 20).replace(/[\s-]/g, '');
  const email = text('email', 254);
  if (name.length < 2) throw new Error('성명을 2~50자로 입력해 주세요.');
  if (!/^01[016789]\d{7,8}$/.test(phone)) throw new Error('올바른 휴대폰 번호를 입력해 주세요.');
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('올바른 이메일 주소를 입력해 주세요.');
  return { name, phone, email, industry: text('industry', 100), organization: text('organization', 100), position: text('position', 100) };
}
function sessionUser(member) { return { id: member.id, name: member.name, provider: member.provider, registrationComplete: true }; }

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method === 'DELETE') {
    const origin = new URL(process.env.SITE_URL || 'http://localhost:3000').origin;
    if (req.headers.origin !== origin) return res.status(403).json({ message: '잘못된 요청입니다.' });
    res.setHeader('Set-Cookie', [cookie(SESSION, '', 0, origin), cookie(STATE, '', 0, origin), cookie(GOOGLE_STATE, '', 0, origin), cookie(EMAIL_CHALLENGE, '', 0, origin)]);
    return res.status(200).json({ success: true });
  }
  let config;
  try { config = settings(); } catch {
    return res.status(503).json({ configured: false, user: null, message: '카카오 로그인 서버 설정이 필요합니다.' });
  }
  const { origin, key } = config;
  const configured = Boolean(process.env.KAKAO_REST_API_KEY && process.env.KAKAO_CLIENT_SECRET);
  const action = req.query?.action || 'session';
  if (req.method === 'GET' && action === 'session') {
    const session = read(req, SESSION, key);
    if (session?.user?.registrationComplete) {
      try { const member = await getMember(session.user.id); session.user = member?.registrationComplete ? sessionUser(member) : null; } catch { return res.status(503).json({ message: '회원 정보를 확인하지 못했습니다.' }); }
    }
    return res.status(200).json({ configured, googleConfigured: Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET), emailConfigured: Boolean(process.env.SUPABASE_URL && (process.env.SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY)), user: session?.user?.registrationComplete ? session.user : null, registrationRequired: Boolean(session?.pendingUser || (session?.user && !session.user.registrationComplete)) });
  }
  if (['email-start', 'email-verify', 'email-token'].includes(action) && req.method === 'POST') {
    if (req.headers.origin !== origin) return res.status(403).json({ message: '잘못된 요청입니다.' });
    const session = read(req, SESSION, key);
    try {
      if (action === 'email-start') {
        const email = emailIdentity(req.body?.email);
        const linking = req.body?.purpose === 'link';
        const member = linking ? await getMember(session?.user?.id || '') : null;
        if (linking && !member?.registrationComplete) return res.status(401).json({ message: '기존 회원으로 먼저 로그인해 주세요.' });
        const previous = read(req, EMAIL_CHALLENGE, key);
        if (previous?.requestedAt > Date.now() - 60000) return res.status(429).json({ message: '1분 후 다시 요청해 주세요.' });
        await emailAuth(`otp?redirect_to=${encodeURIComponent(origin + '/?email_auth=1')}`, { email, create_user: true });
        const challenge = { email, memberId: member?.id || null, requestedAt: Date.now(), expires: Date.now() + 1200000 };
        res.setHeader('Set-Cookie', cookie(EMAIL_CHALLENGE, seal(challenge, key), 1200, origin));
        return res.status(200).json({ success: true, message: '인증메일을 보냈습니다. 같은 브라우저에서 메일의 로그인 링크를 열거나 인증코드를 입력해 주세요.' });
      }
      const challenge = read(req, EMAIL_CHALLENGE, key);
      if (!challenge) return res.status(401).json({ message: '인증 요청이 만료됐습니다. 이메일 인증을 다시 시작해 주세요.' });
      if (challenge.memberId) {
        const current = session?.user?.id ? await getMember(session.user.id) : null;
        if (!current || current.id !== challenge.memberId) return res.status(401).json({ message: '계정이 변경됐습니다. 로그인한 뒤 연결을 다시 시작해 주세요.' });
      }
      let verified;
      if (action === 'email-token') {
        if (typeof req.body?.accessToken !== 'string' || req.body.accessToken.length > 10000) throw new Error('잘못된 인증 정보입니다.');
        verified = await emailAuth('user', null, req.body.accessToken);
      } else {
        const token = req.body?.token;
        if (typeof token !== 'string' || !/^\d{6,8}$/.test(token)) throw new Error('메일에 표시된 인증코드를 입력해 주세요.');
        verified = (await emailAuth('verify', { email: challenge.email, token, type: 'email' })).user;
      }
      if (!verified?.email_confirmed_at || emailIdentity(verified.email) !== challenge.email) throw new Error('인증된 이메일이 일치하지 않습니다.');
      const identity = `email:${challenge.email}`;
      let member;
      if (challenge.memberId) { member = await linkVerifiedIdentity(challenge.memberId, identity); member = await saveMember({ id: member.id, verifiedEmail: challenge.email }, { touchLogin: false }); }
      else {
        member = await identityMember(identity);
        if (!member) {
          const id = `member:${crypto.randomUUID()}`;
          await saveMember({ id, provider: 'email', email: challenge.email, verifiedEmail: challenge.email, registrationComplete: false, loginIdentities: [identity] });
          await claimIdentity(identity, id);
          member = await identityMember(identity);
        }
      }
      if (!member) throw new Error('회원 연결 정보를 확인하지 못했습니다.');
      const user = member.registrationComplete ? sessionUser(member) : null;
      const nextSession = user ? { user, expires: Date.now() + DAY * 1000 } : { pendingUser: { id: member.id, provider: 'email', email: challenge.email, verifiedEmail: challenge.email, name: '' }, expires: Date.now() + 1200000 };
      res.setHeader('Set-Cookie', [cookie(EMAIL_CHALLENGE, '', 0, origin), cookie(SESSION, seal(nextSession, key), user ? DAY : 1200, origin)]);
      return res.status(200).json({ success: true, user, registrationRequired: !user, linked: Boolean(challenge.memberId) });
    } catch (error) { return res.status(400).json({ message: error.message || '이메일 인증에 실패했습니다.' }); }
  }
  const googlePending = req.method === 'GET' && action === 'callback' ? read(req, GOOGLE_STATE, key) : null;
  if (req.method === 'GET' && (['google-start', 'google-callback'].includes(action) || (action === 'callback' && googlePending && googlePending.state === req.query?.state))) {
    if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) return res.status(503).json({ message: 'Google 로그인 연결 설정이 필요합니다.' });
    const callback = config.redirect;
    if (action === 'google-start') {
      const session = read(req, SESSION, key);
      const linking = req.query?.link === '1';
      if (linking && !session?.user?.registrationComplete) return redirect(res, `${origin}/?login_error=link_session`);
      const state = crypto.randomBytes(32).toString('base64url');
      const verifier = crypto.randomBytes(32).toString('base64url');
      res.setHeader('Set-Cookie', cookie(GOOGLE_STATE, seal({ state, verifier, ...(linking ? { memberId: session.user.id } : {}), expires: Date.now() + 600000 }, key), 600, origin));
      const query = new URLSearchParams({ client_id: process.env.GOOGLE_CLIENT_ID, redirect_uri: callback, response_type: 'code', scope: 'openid email profile', state, code_challenge: crypto.createHash('sha256').update(verifier).digest('base64url'), code_challenge_method: 'S256', prompt: 'select_account' });
      return redirect(res, `https://accounts.google.com/o/oauth2/v2/auth?${query}`);
    }
    const pending = read(req, GOOGLE_STATE, key);
    res.setHeader('Set-Cookie', cookie(GOOGLE_STATE, '', 0, origin));
    if (!pending || typeof req.query.state !== 'string' || pending.state !== req.query.state) return redirect(res, `${origin}/?login_error=state`);
    if (req.query.error || typeof req.query.code !== 'string') return redirect(res, `${origin}/?login_error=cancelled`);
    try {
      const tokenResponse = await fetch('https://oauth2.googleapis.com/token', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams({ client_id: process.env.GOOGLE_CLIENT_ID, client_secret: process.env.GOOGLE_CLIENT_SECRET, redirect_uri: callback, grant_type: 'authorization_code', code: req.query.code, code_verifier: pending.verifier }), signal: AbortSignal.timeout(10000) });
      if (!tokenResponse.ok) throw new Error('token');
      const token = await tokenResponse.json();
      if (typeof token.access_token !== 'string' || !token.access_token) throw new Error('token');
      const response = await fetch('https://openidconnect.googleapis.com/v1/userinfo', { headers: { Authorization: `Bearer ${token.access_token}` }, signal: AbortSignal.timeout(10000) });
      if (!response.ok) throw new Error('profile');
      const profile = await response.json();
      if (typeof profile.sub !== 'string' || !/^[a-zA-Z0-9_-]{1,255}$/.test(profile.sub) || profile.email_verified !== true) throw new Error('profile');
      const email = emailIdentity(profile.email), identity = `google:${profile.sub}`;
      let member;
      if (pending.memberId) {
        const session = read(req, SESSION, key);
        const current = session?.user?.registrationComplete ? await getMember(session.user.id) : null;
        const original = await getMember(pending.memberId);
        if (!current || current.id !== original?.id) throw new Error('link session');
        member = await linkVerifiedIdentity(current.id, identity);
      } else {
        member = await identityMember(identity);
        if (!member) {
          const id = `member:${crypto.randomUUID()}`;
          await saveMember({ id, provider: 'google', email, registrationComplete: false, loginIdentities: [identity] });
          await claimIdentity(identity, id);
          member = await identityMember(identity);
        }
      }
      if (!member) throw new Error('member');
      const user = member.registrationComplete ? sessionUser(member) : null;
      const next = user ? { user, expires: Date.now() + DAY * 1000 } : { pendingUser: { id: member.id, provider: 'google', email, name: typeof profile.name === 'string' ? profile.name.slice(0, 100) : '' }, expires: Date.now() + 1200000 };
      if (user) await saveMember({ id: member.id });
      res.setHeader('Set-Cookie', [cookie(GOOGLE_STATE, '', 0, origin), cookie(SESSION, seal(next, key), user ? DAY : 1200, origin)]);
      return redirect(res, `${origin}/${user ? '' : '?signup=1'}`);
    } catch { return redirect(res, `${origin}/?login_error=failed`); }
  }
  if (action === 'profile' && ['GET', 'PUT'].includes(req.method)) {
    const session = read(req, SESSION, key);
    if (!session?.user?.registrationComplete) return res.status(401).json({ message: '회원 로그인이 필요합니다.' });
    if (req.method === 'PUT' && req.headers.origin !== origin) return res.status(403).json({ message: '잘못된 요청입니다.' });
    let fields;
    if (req.method === 'PUT') {
      try { fields = profileFields(req.body); } catch (error) { return res.status(400).json({ message: error.message }); }
    }
    try {
      const member = await getMember(session.user.id);
      if (!member?.registrationComplete) return res.status(401).json({ message: '회원가입을 완료해 주세요.' });
      if (req.method === 'GET') return res.status(200).json({ loginIdentities: member.loginIdentities || [member.id], enrolledCourses: member.enrolledCourses || [], profile: Object.fromEntries(['name', 'phone', 'email', 'industry', 'organization', 'position'].map(field => [field, member[field] || ''])) });
      const updated = await saveMember({ id: session.user.id, ...fields }, { touchLogin: false });
      const user = sessionUser(updated);
      res.setHeader('Set-Cookie', cookie(SESSION, seal({ user, expires: Date.now() + DAY * 1000 }, key), DAY, origin));
      return res.status(200).json({ success: true, user });
    } catch { return res.status(503).json({ message: '회원 정보를 처리하지 못했습니다. 다시 시도해 주세요.' }); }
  }
  if (req.method === 'POST' && action === 'register') {
    if (req.headers.origin !== origin) return res.status(403).json({ message: '잘못된 요청입니다.' });
    const session = read(req, SESSION, key);
    const pendingUser = session?.pendingUser || (session?.user && !session.user.registrationComplete ? session.user : null);
    if (!pendingUser) return res.status(401).json({ message: '로그인 인증을 다시 진행해 주세요.' });
    let fields;
    try { fields = profileFields(req.body); } catch (error) { return res.status(400).json({ message: error.message }); }
    try {
      const member = await saveMember({ id: pendingUser.id, provider: pendingUser.provider || 'kakao', ...(pendingUser.verifiedEmail ? { verifiedEmail: pendingUser.verifiedEmail } : {}), nickname: pendingUser.nickname || pendingUser.name, ...fields, registrationComplete: true });
      const user = { id: member.id, name: member.name, provider: member.provider, registrationComplete: true };
      res.setHeader('Set-Cookie', cookie(SESSION, seal({ user, expires: Date.now() + DAY * 1000 }, key), DAY, origin));
      return res.status(200).json({ success: true, user });
    } catch { return res.status(503).json({ message: '가입 정보를 저장하지 못했습니다. 다시 시도해 주세요.' }); }
  }
  if (req.method !== 'GET' || !['start', 'callback'].includes(action)) return res.status(405).json({ message: '지원하지 않는 요청입니다.' });
  if (!configured) return res.status(503).json({ configured: false, message: '카카오 앱 키 설정이 필요합니다.' });
  if (action === 'start') {
    const session = read(req, SESSION, key);
    const linking = req.query?.link === '1';
    if (linking && !session?.user?.registrationComplete) return redirect(res, `${origin}/?login_error=link_session`);
    const state = crypto.randomBytes(32).toString('base64url');
    res.setHeader('Set-Cookie', cookie(STATE, seal({ state, ...(linking ? { memberId: session.user.id } : {}), expires: Date.now() + 600000 }, key), 600, origin));
    const query = new URLSearchParams({ client_id: process.env.KAKAO_REST_API_KEY, redirect_uri: config.redirect, response_type: 'code', state });
    return redirect(res, `https://kauth.kakao.com/oauth/authorize?${query}`);
  }
  const pending = read(req, STATE, key);
  res.setHeader('Set-Cookie', cookie(STATE, '', 0, origin));
  if (!pending || typeof req.query.state !== 'string' || pending.state !== req.query.state) return redirect(res, `${origin}/?login_error=state`);
  if (req.query.error || typeof req.query.code !== 'string') return redirect(res, `${origin}/?login_error=cancelled`);
  try {
    const tokenResponse = await fetch('https://kauth.kakao.com/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
      body: new URLSearchParams({ grant_type: 'authorization_code', client_id: process.env.KAKAO_REST_API_KEY, client_secret: process.env.KAKAO_CLIENT_SECRET, redirect_uri: config.redirect, code: req.query.code }),
      signal: AbortSignal.timeout(10000),
    });
    if (!tokenResponse.ok) throw new Error('token');
    const token = await tokenResponse.json();
    if (!token.access_token) throw new Error('token');
    const userResponse = await fetch('https://kapi.kakao.com/v2/user/me', {
      headers: { Authorization: `Bearer ${token.access_token}` }, signal: AbortSignal.timeout(10000),
    });
    if (!userResponse.ok) throw new Error('profile');
    const profile = await userResponse.json();
    if (!profile.id) throw new Error('profile');
    const nickname = profile.kakao_account?.profile?.nickname || profile.properties?.nickname;
    const user = { id: `kakao:${profile.id}`, name: typeof nickname === 'string' ? nickname.slice(0, 100) : 'Kakao Member', provider: 'kakao' };
    let member;
    if (pending.memberId) {
      const session = read(req, SESSION, key);
      if (!session?.user?.registrationComplete || session.user.id !== pending.memberId) throw new Error('link session');
      member = await linkVerifiedIdentity(pending.memberId, user.id);
    } else member = await identityMember(user.id);
    if (!member?.registrationComplete) {
      const pendingUser = { id: user.id, name: user.name, nickname: user.name, provider: 'kakao' };
      res.setHeader('Set-Cookie', [cookie(STATE, '', 0, origin), cookie(SESSION, seal({ pendingUser, expires: Date.now() + 1200000 }, key), 1200, origin)]);
      return redirect(res, `${origin}/?signup=1`);
    }
    await saveMember({ id: member.id, nickname: user.name });
    user.id = member.id;
    user.name = member.name;
    user.registrationComplete = true;
    res.setHeader('Set-Cookie', [cookie(STATE, '', 0, origin), cookie(SESSION, seal({ user, expires: Date.now() + DAY * 1000 }, key), DAY, origin)]);
    return redirect(res, `${origin}/`);
  } catch {
    return redirect(res, `${origin}/?login_error=failed`);
  }
}
