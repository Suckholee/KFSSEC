import { clearAdminCookie, isAdmin, setAdminCookie, validPassword } from './_auth.js';

export default function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method === 'GET') return res.status(200).json({ authenticated: isAdmin(req), configured: true });
  if (req.method === 'DELETE') {
    clearAdminCookie(res);
    return res.status(200).json({ success: true });
  }
  if (req.method !== 'POST') return res.status(405).json({ success: false });
  if (!validPassword(req.body?.password) || req.body?.username !== 'admin') {
    return res.status(401).json({ success: false, message: '관리자 인증 정보가 올바르지 않습니다.' });
  }
  setAdminCookie(res);
  return res.status(200).json({ success: true });
}
