// Shared content definitions are also the defaults used by partial inline writes.
export const resourceRegistry = new Map();
export const resourceDefaults = new Map();
export const resourceViews = new Map();
let revision = 0;
export const announceResources = () => { revision++; if (typeof window !== 'undefined') window.dispatchEvent(new Event('kfssec:resources')); };
export const resourceRevision = () => revision;
export const getPath = (object, path) => path.split('.').reduce((value, key) => value?.[key], object);
export function setPath(object, path, value) {
  const keys = path.split('.');
  const clone = Array.isArray(object) ? [...object] : { ...object };
  let node = clone;
  keys.forEach((key, index) => {
    if (index === keys.length - 1) node[key] = value;
    else { const previous = node[key]; node[key] = previous && typeof previous === 'object' ? (Array.isArray(previous) ? [...previous] : { ...previous }) : (/^\d+$/.test(keys[index + 1]) ? [] : {}); node = node[key]; }
  });
  return clone;
}
export function updateWithDefaults(site, path, value) {
  const candidates = [...resourceDefaults.keys()].filter(key => path === key || path.startsWith(key + '.')).sort((a, b) => a.length - b.length);
  let base = site;
  for (const key of candidates) if (getPath(base, key) === undefined) base = setPath(base, key, serializable(resourceDefaults.get(key)));
  return setPath(base, path, value);
}
const excludedFields = /^(id|_.*|contentOrder|isDemo|icon|component|badgeColor|className|color|imageClassName|imageLayout|style|layout|on.*)$/;
export const isContentField = key => !excludedFields.test(key);
export function serializable(value) {
  if (Array.isArray(value)) return value.map(serializable);
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).filter(([key, v]) => typeof v !== 'function' && typeof v !== 'symbol' && v !== undefined && !v?.$$typeof && !['icon', 'component'].includes(key)).map(([key, v]) => [key, serializable(v)]));
  return value;
}
export function restoreTemplates(saved, defaults) {
  if (!Array.isArray(saved)) return saved;
  return saved.map((item, index) => {
    if (item === null || typeof item !== 'object') return item;
    const template = (item._templateId || item.id ? (defaults || []).find(original => original?.id === (item._templateId || item.id)) : undefined) || defaults?.[index] || defaults?.[0] || {};
    const restored = { ...template, ...item };
    for (const [key, value] of Object.entries(item)) if (Array.isArray(value)) restored[key] = restoreTemplates(value, template[key]);
    return restored;
  });
}
export const publicItems = items => items.filter(item => !item || typeof item !== 'object' || item.visible !== false).map(item => item && typeof item === 'object' ? Object.fromEntries(Object.entries(item).map(([key, value]) => [key, Array.isArray(value) ? publicItems(value) : value])) : item);
export function moveItem(items, index, offset) {
  const target = index + offset;
  if (target < 0 || target >= items.length) return items;
  const next = [...items]; [next[index], next[target]] = [next[target], next[index]]; return next;
}
export function newItem(template, ordinal = 1) {
  if (typeof template === 'string' || template === undefined) return '새 항목';
  const item = serializable(template);
  item._templateId = item._templateId || item.id;
  if ('id' in item) item.id = crypto.randomUUID();
  if ('num' in item) item.num = String(ordinal).padStart(2, '0');
  for (const [key, value] of Object.entries(item)) {
    if (!isContentField(key)) continue;
    if (Array.isArray(value)) item[key] = [];
    else if (typeof value === 'string') item[key] = /^(title|name|question|q|label)$/.test(key) ? '새 항목' : /^(image|imageUrl|photo|poster|url|link|href|linkUrl)$/.test(key) ? '' : value;
  }
  item.visible = true;
  return item;
}
export function sortedSectorIds(ids, settings = {}) {
  return ids.map((id, index) => ({ id, index, order: settings[id]?.order ?? index })).sort((a, b) => a.order - b.order || a.index - b.index).map(item => item.id);
}
export const fieldNames = { title: '제목', isPinned: '상단 고정', views: '조회 수', tags: '검색 분류', children: '하위 메뉴', subItems: '하위 메뉴', subTab: '이동할 세부 화면', defaultSubTab: '첫 화면 이동 위치', levelLabel: '등급 표시', assessment: '검정 내용', key: '메뉴 이동 위치', subKey: '하위 메뉴 이동 위치', label: '표시 이름', logo: '로고', photo: '사진', imageOnly: '이미지만 표시', duration: '교육 기간', target: '지원 대상', qualifications: '자격 정보', name: '이름·명칭', desc: '설명', description: '설명', question: '질문', answer: '답변', q: '질문', a: '답변', subtitle: '보조 제목', image: '사진', imageUrl: '이미지', poster: '포스터', intro: '소개', role: '직함·역할', badge: '표시 문구', num: '표시 번호', step: '단계', tag: '분류 표시', category: '분류', group: '질문 분류', highlights: '주요 경력', specialties: '전문 분야', publications: '저서·발표', items: '세부 항목', events: '연혁 사건', year: '연도', date: '날짜', startDate: '시작일', examDate: '시험일', registration: '등록번호', professor: '담당 교수', details: '세부 설명', grades: '등급·검정 내용', reviews: '후기', reviewsCount: '후기 수', visible: '방문자에게 공개', active: '사용 여부', url: '이동 주소', link: '이동 주소', href: '이동 주소', linkUrl: '이동 주소', buttonLink: '버튼 이동 위치', buttonText: '버튼 문구', content: '본문', author: '작성자', categoryType: '게시판 분류', galleryCategory: '갤러리 분류', images: '사진 목록', coverImage: '표지 사진', location: '장소', headline: '소개 제목', engName: '영문 이름', bio: '소개·약력', icon: '표시 아이콘', labels: '표시 문구' };
