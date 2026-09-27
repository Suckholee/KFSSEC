import crypto from 'node:crypto';

const COOKIE = 'kfssec_admin_session';
const DAY = 24 * 60 * 60;

function sign(value) {
  return crypto.createHmac('sha256', process.env.ADMIN_SESSION_SECRET || '').update(value).digest('hex');
}

export function isAdmin(req) {
  if (!process.env.ADMIN_SESSION_SECRET || !process.env.ADMIN_PASSWORD) return false;
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
  const expected = process.env.ADMIN_PASSWORD || '';
  if (!expected || !candidate) return false;
  const left = crypto.createHash('sha256').update(String(candidate)).digest();
  const right = crypto.createHash('sha256').update(expected).digest();
  return crypto.timingSafeEqual(left, right);
}

export function requireAdmin(req, res) {
  if (isAdmin(req)) return true;
  res.status(401).json({ success: false, message: '관리자 로그인이 필요합니다.' });
  return false;
}
