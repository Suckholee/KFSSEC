import { resolveFaculty, DEFAULT_FACULTY, PENDING_PORTRAIT } from './faculty';

export function profileLines(value) {
  return (Array.isArray(value) ? value : [value]).flatMap(item => typeof item === 'string' ? item.split(/\r?\n/) : []).map(item => item.trim()).filter(Boolean);
}
export function normalizeProfile(member) {
  return { ...member, image: member.image || PENDING_PORTRAIT, highlights: profileLines(member.highlights), specialties: profileLines(member.specialties), publications: profileLines(member.publications) };
}
export function resolveDirectory(site = {}, collection = 'faculty', fallback) {
  if (Array.isArray(site[collection])) return site[collection].filter(Boolean).map(normalizeProfile);
  if (collection === 'faculty') return resolveFaculty(fallback).map(normalizeProfile);
  const jin = (site.faculty || DEFAULT_FACULTY).find(member => member.id === 'prof-jin' || member.name === '진익준') || DEFAULT_FACULTY.find(member => member.id === 'prof-jin');
  return [normalizeProfile({ id: 'consultant-ahn', name: '안형상', role: '이사장', title: '사단법인 한국외식창업교육원 이사장', badge: '외식 창업 컨설팅', image: '/images/chairman_ahn_real.jpg', intro: '한국외식창업교육원 이사장으로서 외식 창업 및 경영 상담을 지원합니다.', highlights: [], specialties: ['외식 창업 상담', '외식 경영 상담'], publications: [] }), normalizeProfile({ ...jin })];
}

// One-time adoption of the two advisers explicitly identified in the client conversation.
// No unverified biography or portrait is substituted. Saving persists the marker so
// later administrator deletions remain intentional rather than reappearing.
export function migrateProfileDirectories(site = {}) {
  if (site.profileDirectoryVersion >= 1) return site;
  const faculty = (Array.isArray(site.faculty) ? site.faculty : resolveFaculty()).map(normalizeProfile);
  for (const [id, name, title] of [['advisor-lee-deuksik', '이득식', '이득식 박사'], ['advisor-jung-boheon', '정보헌', '정보헌 회장']]) {
    if (!faculty.some(member => member.name === name)) faculty.push(normalizeProfile({ id, name, role: '고문', title, badge: '교육원 고문', highlights: [], specialties: [], publications: [] }));
  }
  return { ...site, faculty, consultingFaculty: resolveDirectory(site, 'consultingFaculty'), profileDirectoryVersion: 1 };
}
