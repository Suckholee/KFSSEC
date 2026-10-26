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

// Original profile cards supplied by the client. Versioned adoption preserves later edits/deletions.
const suppliedProfiles = [
  {
    "id": "advisor-lee-deuksik",
    "name": "이득식",
    "role": "고문",
    "title": "이득식 박사",
    "badge": "교육원 고문",
    "image": "/images/faculty/lee-deuksik-card.png",
    "imageLayout": "card",
    "highlights": [
      "(주)웰빙엘에스 CEO/연구소장",
      "한국산업단지공단(동해) 기능성바이오미니클러스터 회장",
      "한중대학교 외식영양학과 교수",
      "(사)강원도바이오기업협회 부회장",
      "한중대학교 관광대학 학장",
      "한중대학교 산학협력단장",
      "Wisconsin-Madison 주립대 연구교수",
      "일본 교토(京都)대학교 대학원 식품공학전공 농학박사",
      "(주)미원 중앙연구소 선임연구원 (현, 대상 주식회사)",
      "강원대학교 농과대학 식품공학과 학사, 석사(대학원)"
    ],
    "specialties": [],
    "publications": []
  },
  {
    "id": "advisor-jung-boheon",
    "name": "정보헌",
    "role": "고문",
    "title": "정보헌 회장",
    "badge": "교육원 고문",
    "image": "/images/faculty/jung-boheon-card.png",
    "imageLayout": "card",
    "highlights": [
      "화남인터내셔날 대표이사",
      "정푸드코리아 대표이사, 해피라이프 대표이사",
      "중소기업중앙회 이사",
      "중소기업중앙회 혁신조달위원회 위원",
      "한국통조림레토르트식품공업협동조합 이사장",
      "경기도수출기업협회 이사",
      "중소벤처기업부 수출유망중소기업 지정 (정푸드코리아)",
      "경기도 수출프론티어기업 인증 (해피라이프)",
      "여성가족부 가족친화기업 인증 (정푸드코리아)",
      "중소벤처기업부 수출유망중소기업 지정 (해피라이프)"
    ],
    "specialties": [],
    "publications": []
  },
  {
    "id": "advisor-park-sanghye",
    "name": "박상혜",
    "role": "고문",
    "title": "박상혜 원장",
    "badge": "교육원 고문",
    "image": "/images/faculty/park-sanghye-card.png",
    "imageLayout": "card",
    "highlights": [
      "요리연구가 (천연조미료 명인)",
      "現 박상혜 음식연구소 대표",
      "現 혜전대학교 호텔조리외식계열 겸임교수",
      "現 대한민국한식포럼·한식문화정책위원",
      "現 보령시 원도심 도시재생 창업활성화반 지도교수",
      "現 사단법인 한국조리협회 부회장",
      "現 대한민국 한식대가 (제2021-077호)",
      "現 천연조미료명인 1호 (제2021-19호)",
      "現 신지식인 (17-013)",
      "前 KBS 생생정보통 자문위원",
      "前 TV조선 살림9단의 만물상 만물박사"
    ],
    "specialties": [],
    "publications": []
  },
  {
    "id": "advisor-jung-kiyeop",
    "name": "정기엽",
    "role": "고문",
    "title": "정기엽 대표",
    "badge": "교육원 고문",
    "image": "/images/faculty/jung-kiyeop-card.png",
    "imageLayout": "card",
    "highlights": [
      "(주)디에이치디 대표",
      "세종 대학원 / 호텔경영",
      "국제 SKAL Club Seoul Member 사무국장",
      "인하공업전문대 / 계원 예술대 호텔경영과 외래교수",
      "구로 Ramada Sindorim / Pre-Opening 기관 준비 팀 운영",
      "청주 Howard Johnson Hotel / Brand Launching & Pre-Opening 자문",
      "강남 Marriott Gangnam / Marriott Development Team과 호텔 개발 소유주와 협의 중",
      "충북 Marriott Brand Conversion / 기존 독립호텔을 브랜드 호텔로 변경 진행 중",
      "신도림 Sheraton D-Cube co-work / 설계수정 레이아웃 및 브랜드 도입자문"
    ],
    "specialties": [],
    "publications": []
  }
];
export function migrateProfileDirectories(site = {}) {
  if (site.profileDirectoryVersion >= 2) return site;
  const faculty = (Array.isArray(site.faculty) ? site.faculty : resolveFaculty()).map(normalizeProfile);
  for (const supplied of suppliedProfiles) {
    const index = faculty.findIndex(member => member.name === supplied.name);
    if (index < 0) faculty.push(normalizeProfile(supplied));
    else {
      const member = faculty[index];
      const missingImage = !member.image || member.image === PENDING_PORTRAIT;
      faculty[index] = normalizeProfile({ ...supplied, ...member,
        ...(missingImage ? { image: supplied.image, imageLayout: 'card' } : {}),
        highlights: member.highlights.length ? member.highlights : supplied.highlights });
    }
  }
  return { ...site, faculty, consultingFaculty: resolveDirectory(site, 'consultingFaculty'), profileDirectoryVersion: 2 };
}
