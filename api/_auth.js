import crypto from 'node:crypto';
import { getMember } from './_members.js';
import { memberSessionId } from './_memberSession.js';
const COOKIE = 'kfssec_admin_session';
const DAY = 86400;
function sign(value) {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || secret.length < 32) throw new Error('ADMIN_SESSION_SECRET required');
  return crypto.createHmac('sha256', secret).update(value).digest('hex');
}
export function isPasswordAdmin(req) {
  try {
    const raw = (req.headers.cookie || '').split(';').map(s => s.trim()).find(s => s.startsWith(`${COOKIE}=`));
    if (!raw) return false;
    const [expires, signature] = decodeURIComponent(raw.slice(COOKIE.length + 1)).split('.');
    if (!/^\d+$/.test(expires) || !signature || Number(expires) <= Date.now()) return false;
    const expected = sign(expires);
    return signature.length === expected.length && crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
  } catch { return false; }
}
export async function isAdmin(req) {
  if (isPasswordAdmin(req)) return true;
  const id = memberSessionId(req);
  if (!id) return false;
  try {
    const member = await getMember(id);
    return member?.registrationComplete === true && member.adminRole === 'admin';
  } catch { return false; }
}
export function setAdminCookie(res) {
  const expires = String(Date.now() + DAY * 1000);
  res.setHeader('Set-Cookie', `${COOKIE}=${expires}.${sign(expires)}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${DAY}${process.env.VERCEL ? '; Secure' : ''}`);
}
export function clearAdminCookie(res) {
  res.setHeader('Set-Cookie', `${COOKIE}=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0${process.env.VERCEL ? '; Secure' : ''}`);
}
export function validPassword(candidate) {
  if (typeof candidate !== 'string' || !process.env.ADMIN_PASSWORD || !process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_SESSION_SECRET.length < 32) return false;
  const a = Buffer.from(candidate), b = Buffer.from(process.env.ADMIN_PASSWORD);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}
export async function requireAdmin(req, res) {
  if (await isAdmin(req)) return true;
  res.status(401).json({ success: false, message: '관리자 권한이 있는 계정으로 로그인해 주세요.' });
  return false;
}
