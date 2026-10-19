export const DEFAULT_FACULTY = [
    {
      id: 'prof-jin',
      name: '진익준',
      role: '외식 공간디자인 & 상권분석 전담교수',
      title: '브랜드경험디자인연구소 대표 / 청운대학교 외식조리경영학과 겸임교수',
      image: '/images/faculty/jin_ikjun_expert.png',
      badge: '외식 상권 & 인테리어 석학',
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
      intro:
        '단순한 미적 인테리어를 넘어, 데이터 기반 상권·입지 분석과 타겟 고객의 방문 맥락(Context)을 통합 설계하는 대한민국 대표 외식 공간 브랜딩 전문가입니다.',
      highlights: [
        '홍익대학교 건축도시대학원 실내설계 석사',
        '세종대학교 일반대학원 조리·외식경영학 박사과정',
        '청운대학교 외식조리경영학과 겸임교수',
        '브랜드경험디자인연구소 대표',
        '한국외식창업교육원 상권분석 및 공간기획 자문위원',
      ],
      publications: [
        '『성공하는 식당은 콘셉트부터 다르다』 저자',
        '『창업성공의 인테리어 디자인 전략』 저자',
        '한국외식신문, 호텔&레스토랑 외식 브랜딩 정기 칼럼니스트',
      ],
      specialties: [
        '상권분석 기반 점포 콘셉트 기획',
        '고객 경험 디자인 (CX & Space Branding)',
        '주방 동선 최적화 및 파사드 설계',
        '소상공인 점포 리뉴얼 & 턴어라운드',
      ],
    },
    {
      id: 'prof-lee',
      name: '이상정',
      role: '서양조리 & 마스터클래스 석좌교수',
      title: '대한민국 조리명장 제1호 / 호텔 조리부 총괄',
      image: '/images/faculty/lee_sangjeong.jpg',
      badge: '대한민국 조리명장 1호',
      badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      intro:
        '대한민국 조리 분야 최초의 노동부 지정 조리명장으로서, 특급호텔 조리 현장 노하우와 서양조리의 정석을 후학들에게 도제식으로 전수합니다.',
      highlights: [
        '대한민국 조리명장 제1호 (노동부 지정)',
        '특급호텔 조리부 총괄 역임',
        '한국외식창업교육원 고문 및 명장 마스터클래스 주임교수',
        '국가기술자격 조리기능장 출제 및 실기심사위원',
      ],
      publications: [
        '『서양조리의 정석과 실무 테크닉』 저자',
        '국가직무능력표준(NCS) 조리분야 개발 자문위원',
      ],
      specialties: [
        '호텔식 파인다이닝 메뉴 R&D',
        '서양식 스테이크 및 소스 표준화',
        '셰프 1:1 도제식 실무 전수',
      ],
    },
    {
      id: 'prof-shin',
      name: '신충섭',
      role: '외식 정책 & 프랜차이즈 경영 자문위원',
      title: '외식산업 산학협력 총괄 / 경영 정책 자문위원',
      image: '/images/faculty/portrait_pending.svg',
      badge: '경영·정책 자문',
      badgeColor: 'bg-blue-100 text-blue-900 border-blue-300',
      intro:
        '외식 프랜차이즈 시스템 구축과 정부지원 정책 연계, 소상공인 창업 리스크 관리를 지원하는 정책 자문 전문가입니다.',
      highlights: [
        '한국외식창업교육원 자문위원회 위원',
        '외식산업 산학협력 네트워크 총괄',
        '소상공인시장진흥공단 정책 자문위원',
      ],
      publications: [
        '외식 프랜차이즈 인허가 및 가맹사업 규정 실무 가이드',
      ],
      specialties: [
        '프랜차이즈 가맹 시스템 구축',
        '소상공인 정부 정책자금 연계',
        '외식 인허가 및 법률·세무 컨설팅',
      ],
    },
    {
      id: 'prof-cho',
      name: '조춘봉',
      role: '외식경영학 & 서비스 R&D 고문',
      title: '관광호텔·외식경영학 석학 / 교육원 고문',
      image: '/images/faculty/cho_chunbong.png',
      badge: '외식경영학 석학',
      badgeColor: 'bg-purple-100 text-purple-900 border-purple-300',
      intro:
        '외식경영학 학문적 깊이와 고객 만족 서비스 전략을 결합하여, 지속 가능한 외식 비즈니스 모델을 제시합니다.',
      highlights: [
        '외식경영학 명예교수 / 관광외식학회 회장 역임',
        '한국외식창업교육원 고문단',
        '국내 주요 호텔 & 리조트 경영 자문',
      ],
      publications: [
        '『현대 외식산업경영론』 공저',
        '외식 서비스 품질과 재방문 행동 연구 논문 다수',
      ],
      specialties: [
        '외식 비즈니스 모델(BM) 수립',
        '홀 서비스 품질 & CS 코칭',
        '외식업체 장기 경영 전략',
      ],
    },
  ];

const PRIORITY_NAMES = ['이상정', '주정자', '신충섭', '진익준'];
export const PENDING_PORTRAIT = '/images/faculty/portrait_pending.svg';

const jooJeongja = {
  id: 'prof-joo',
  name: '주정자',
  image: '/images/faculty/joo_jeongja.jpg',
  badgeColor: 'bg-rose-100 text-rose-900 border-rose-300',
};
DEFAULT_FACULTY.splice(2, 0, jooJeongja);
DEFAULT_FACULTY.sort((a, b) => rank(a.name) - rank(b.name));

function rank(name) {
  const index = PRIORITY_NAMES.indexOf(name);
  return index === -1 ? PRIORITY_NAMES.length : index;
}

function pendingText(value) {
  return typeof value === 'string' && value.trim() ? value : '준비중';
}

function pendingList(value) {
  const items = Array.isArray(value) ? value.filter(item => typeof item === 'string' && item.trim()) : [];
  return items.length ? items : ['준비중'];
}

// Apply the requested order to saved content too, preserving custom profiles and photos.
export function resolveFaculty(saved) {
  const members = Array.isArray(saved) && saved.length ? saved.filter(Boolean) : DEFAULT_FACULTY;
  const roster = [...members];
  if (!roster.some(member => member.id === jooJeongja.id || member.name === jooJeongja.name)) {
    roster.push(jooJeongja);
  }

  return roster.map(member => {
    const profile = DEFAULT_FACULTY.find(item => item.id === member.id || item.name === member.name);
    const image = !member.image || /^\/images\/dir_\d+\.jpg$/.test(member.image)
      ? profile?.image || PENDING_PORTRAIT
      : member.image;
    return {
      ...member,
      image,
      role: pendingText(member.role),
      title: pendingText(member.title),
      badge: pendingText(member.badge),
      intro: pendingText(member.intro),
      highlights: pendingList(member.highlights),
      specialties: pendingList(member.specialties),
      publications: pendingList(member.publications),
    };
  }).sort((a, b) => rank(a.name) - rank(b.name));
}
