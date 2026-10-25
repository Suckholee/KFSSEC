import { requireAdmin, isPasswordAdmin } from './_auth.js';
import { getMember, saveMember, listMembers } from './_members.js';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (!await requireAdmin(req, res)) return;
  if (!['GET', 'PATCH'].includes(req.method)) return res.status(405).json({ message: '지원하지 않는 요청입니다.' });
  if (req.method === 'PATCH') {
    const origin = new URL(process.env.SITE_URL || 'http://localhost:3000').origin;
    if (req.headers.origin !== origin) return res.status(403).json({ message: '잘못된 요청입니다.' });
    const { id, membershipType, adminRole } = req.body || {};
    const roleChange = adminRole !== undefined;
    if (roleChange && !isPasswordAdmin(req)) return res.status(403).json({ message: '관리자 권한 변경은 시스템 운영자 로그인 후 가능합니다.' });
    if (typeof id !== 'string' || !id || (roleChange ? !['admin', 'none'].includes(adminRole) : !['general', 'regular'].includes(membershipType))) {
      return res.status(400).json({ message: '회원과 회원 구분을 확인해 주세요.' });
    }
    try {
      const existing = await getMember(id);
      if (!existing?.registrationComplete) return res.status(404).json({ message: '회원을 찾을 수 없습니다.' });
      const member = await saveMember({ id, ...(roleChange ? { adminRole } : { membershipType }) }, { touchLogin: false });
      return res.status(200).json({ member });
    } catch {
      return res.status(503).json({ message: '회원 구분을 저장하지 못했습니다. 다시 시도해 주세요.' });
    }
  }
  try {
    return res.status(200).json({ members: (await listMembers()).filter(member => member.registrationComplete) });
  } catch {
    return res.status(503).json({ message: '회원 목록을 불러오지 못했습니다. 다시 시도해 주세요.' });
  }
}
