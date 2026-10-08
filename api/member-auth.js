import crypto from 'node:crypto';
import { getMember, saveMember } from './_members.js';

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
    res.setHeader('Set-Cookie', [cookie(SESSION, '', 0, origin), cookie(STATE, '', 0, origin)]);
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
    return res.status(200).json({ configured, user: session?.user?.registrationComplete ? session.user : null, registrationRequired: Boolean(session?.pendingUser || (session?.user && !session.user.registrationComplete)) });
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
      if (req.method === 'GET') return res.status(200).json({ profile: Object.fromEntries(['name', 'phone', 'email', 'industry', 'organization', 'position'].map(field => [field, member[field] || ''])) });
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
    if (!pendingUser) return res.status(401).json({ message: '카카오 인증을 다시 진행해 주세요.' });
    let fields;
    try { fields = profileFields(req.body); } catch (error) { return res.status(400).json({ message: error.message }); }
    try {
      const member = await saveMember({ id: pendingUser.id, provider: 'kakao', nickname: pendingUser.nickname || pendingUser.name, ...fields, registrationComplete: true });
      const user = { id: member.id, name: member.name, provider: member.provider, registrationComplete: true };
      res.setHeader('Set-Cookie', cookie(SESSION, seal({ user, expires: Date.now() + DAY * 1000 }, key), DAY, origin));
      return res.status(200).json({ success: true, user });
    } catch { return res.status(503).json({ message: '가입 정보를 저장하지 못했습니다. 다시 시도해 주세요.' }); }
  }
  if (req.method !== 'GET' || !['start', 'callback'].includes(action)) return res.status(405).json({ message: '지원하지 않는 요청입니다.' });
  if (!configured) return res.status(503).json({ configured: false, message: '카카오 앱 키 설정이 필요합니다.' });
  if (action === 'start') {
    const state = crypto.randomBytes(32).toString('base64url');
    res.setHeader('Set-Cookie', cookie(STATE, seal({ state, expires: Date.now() + 600000 }, key), 600, origin));
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
    const member = await getMember(user.id);
    if (!member?.registrationComplete) {
      const pendingUser = { id: user.id, name: user.name, nickname: user.name, provider: 'kakao' };
      res.setHeader('Set-Cookie', [cookie(STATE, '', 0, origin), cookie(SESSION, seal({ pendingUser, expires: Date.now() + 1200000 }, key), 1200, origin)]);
      return redirect(res, `${origin}/?signup=1`);
    }
    await saveMember({ id: user.id, nickname: user.name });
    user.name = member.name;
    user.registrationComplete = true;
    res.setHeader('Set-Cookie', [cookie(STATE, '', 0, origin), cookie(SESSION, seal({ user, expires: Date.now() + DAY * 1000 }, key), DAY, origin)]);
    return redirect(res, `${origin}/`);
  } catch {
    return redirect(res, `${origin}/?login_error=failed`);
  }
}
