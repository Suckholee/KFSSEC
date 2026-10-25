import { clearAdminCookie, isAdmin, setAdminCookie, validPassword } from './_auth.js';
export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method === 'GET') return res.status(200).json({ authenticated: await isAdmin(req), configured: Boolean(process.env.ADMIN_PASSWORD && process.env.ADMIN_SESSION_SECRET?.length >= 32) });
  if (req.method === 'DELETE') { clearAdminCookie(res); return res.status(200).json({ success: true }); }
  if (req.method !== 'POST') return res.status(405).json({ success: false });
  const origin = new URL(process.env.SITE_URL || 'http://localhost:3000').origin;
  if (req.headers.origin !== origin) return res.status(403).json({ success: false, message: '잘못된 요청입니다.' });
  if (!validPassword(req.body?.password) || req.body?.username !== (process.env.ADMIN_USERNAME || 'admin')) return res.status(401).json({ success: false, message: '관리자 인증 정보가 올바르지 않습니다.' });
  setAdminCookie(res);
  return res.status(200).json({ success: true });
}
