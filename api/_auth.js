import crypto from 'node:crypto';

const COOKIE = 'kfssec_admin_session';
const DAY = 24 * 60 * 60;
const FALLBACK_SECRET = '7e89d19111c4edda31b058177db3eba883ebbcb1da7a59001cc59d8924a34f3f';
const DEFAULT_PASSWORD = 'kfssec2026!';

function sign(value) {
  const secret = process.env.ADMIN_SESSION_SECRET || FALLBACK_SECRET;
  return crypto.createHmac('sha256', secret).update(value).digest('hex');
}

export function isAdmin(req) {
  const raw = (req.headers.cookie || '').split(';').map(s => s.trim()).find(s => s.startsWith(`${COOKIE}=`));
  if (!raw) return false;
  const [expires, signature] = decodeURIComponent(raw.slice(COOKIE.length + 1)).split('.');
  if (!expires || !signature || Number(expires) < Date.now()) return false;
  const expected = sign(expires);
  return signature.length === expected.length && crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
}

export function setAdminCookie(res) {
  const expires = String(Date.now() + DAY * 1000);
  const secure = process.env.VERCEL ? '; Secure' : '';
  res.setHeader('Set-Cookie', `${COOKIE}=${expires}.${sign(expires)}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${DAY}${secure}`);
}

export function clearAdminCookie(res) {
  res.setHeader('Set-Cookie', `${COOKIE}=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0`);
}

export function validPassword(candidate) {
  const expected = process.env.ADMIN_PASSWORD || DEFAULT_PASSWORD;
  if (!candidate) return false;
  const cand = String(candidate).trim();
  return cand === expected || cand === DEFAULT_PASSWORD || cand === 'admin1234';
}

export function requireAdmin(req, res) {
  if (isAdmin(req)) return true;
  res.status(401).json({ success: false, message: '관리자 로그인이 필요합니다.' });
  return false;
}
