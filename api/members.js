import { readContent } from './_store.js';
import { actualCourses } from '../src/data/actualCourses.js';
import { requireAdmin } from './_auth.js';
import { memberSessionId } from './_memberSession.js';
import { getMember, saveMember, listMembers } from './_members.js';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (!await requireAdmin(req, res)) return;
  if (!['GET', 'PATCH'].includes(req.method)) return res.status(405).json({ message: '지원하지 않는 요청입니다.' });
  if (req.method === 'PATCH') {
    const origin = new URL(process.env.SITE_URL || 'http://localhost:3000').origin;
    if (req.headers.origin !== origin) return res.status(403).json({ message: '잘못된 요청입니다.' });
    const { id, membershipType, adminRole, enrolledCourses } = req.body || {};
    const courseChange = enrolledCourses !== undefined;
    const roleChange = adminRole !== undefined;
    const actor = memberSessionId(req) ? await getMember(memberSessionId(req)) : null;
    const target = typeof id === 'string' ? await getMember(id) : null;
    if (roleChange && target?.id === actor?.id && adminRole === 'none') return res.status(400).json({ message: '본인 계정의 관리자 권한은 다른 관리자가 해제해야 합니다.' });
    if (typeof id !== 'string' || !id || (courseChange ? !Array.isArray(enrolledCourses) : roleChange ? !['admin', 'none'].includes(adminRole) : !['general', 'regular'].includes(membershipType))) {
      return res.status(400).json({ message: '회원과 회원 구분을 확인해 주세요.' });
    }
    try {
      const existing = await getMember(id);
      if (!existing?.registrationComplete) return res.status(404).json({ message: '회원을 찾을 수 없습니다.' });
      let nextCourses;
      if (courseChange) {
        if (enrolledCourses.length > 200) return res.status(400).json({ message: '등록 가능한 과정 수를 초과했습니다.' });
        const catalog = await readContent('courses') ?? actualCourses, ids = new Set();
        nextCourses = [];
        for (const row of enrolledCourses) {
          const course = catalog.find(item => String(item.id) === String(row?.courseId));
          if (!course || !['수강예정','수강중','수료','취소'].includes(row.status) || ids.has(String(row.courseId))) return res.status(400).json({ message: '과정과 수강 상태를 확인해 주세요.' });
          ids.add(String(row.courseId));
          const previous = existing.enrolledCourses?.find(item => String(item.courseId) === String(row.courseId));
          nextCourses.push({ ...previous, courseId: String(course.id), courseTitle: course.title, status: row.status, enrolledDate: previous?.enrolledDate || new Date().toISOString().slice(0,10) });
        }
      }
      const member = await saveMember({ id, ...(courseChange ? { enrolledCourses: nextCourses } : roleChange ? { adminRole } : { membershipType }) }, { touchLogin: false });
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
