// Mock API Service for GET /api/v1/courses

const ALL_COURSES = [
  {
    id: 1,
    industry: '한식',
    stage: '창업 준비',
    format: '오프라인',
    badge: 'BEST',
    title: '한식 창업 마스터 과정',
    description: '한식 창업 A to Z, 성공 노하우 전수 및 시그니처 메뉴 조리 실습',
    image: '/images/course_restaurant.jpg',
    duration: '4주 과정',
    lessons: '20강',
    price: 450000,
    priceFormatted: '450,000원',
    rating: 4.95,
    views: 1420,
    createdAt: '2026-02-10',
    instructor: '김정식 한식 명인'
  },
  {
    id: 2,
    industry: '카페/디저트',
    stage: '메뉴 개발',
    format: '혼합형',
    badge: 'BEST',
    title: '카페 창업 실전 과정',
    description: '카페 창업 기획부터 운영까지 실전 커리큘럼 및 라떼아트 전수',
    image: '/images/course_cafe.jpg',
    duration: '3주 과정',
    lessons: '18강',
    price: 390000,
    priceFormatted: '390,000원',
    rating: 4.90,
    views: 1890,
    createdAt: '2026-02-12',
    instructor: '이지은 바리스타 챔피언'
  },
  {
    id: 3,
    industry: '치킨',
    stage: '매장 오픈',
    format: '오프라인',
    badge: 'HOT',
    title: '치킨 브랜드 창업 과정',
    description: '치킨 전문점 창업과 성공 운영 전략 및 파우더/소스 개발',
    image: '/images/course_delivery.jpg',
    duration: '2주 과정',
    lessons: '10강',
    price: 350000,
    priceFormatted: '350,000원',
    rating: 4.85,
    views: 1100,
    createdAt: '2026-01-25',
    instructor: '박용호 대표'
  },
  {
    id: 4,
    industry: '기타',
    stage: '창업 준비',
    format: '온라인',
    badge: 'NEW',
    title: '창업 사업계획서 작성 과정',
    description: '투자 유치를 위한 사업계획서 작성 실무 및 정부지원금 가이드',
    image: '/images/course_menu_dev.jpg',
    duration: '2주 과정',
    lessons: '8강',
    price: 150000,
    priceFormatted: '150,000원',
    rating: 4.88,
    views: 950,
    createdAt: '2026-02-14',
    instructor: '최성훈 수석 컨설턴트'
  },
  {
    id: 5,
    industry: '일식',
    stage: '메뉴 개발',
    format: '오프라인',
    badge: 'NEW',
    title: '정통 일식 텐동 & 라멘 마스터',
    description: '일식 육수 추출부터 튀김 기술까지 고수익 일식 메뉴 완성',
    image: '/images/course_restaurant.jpg',
    duration: '4주 과정',
    lessons: '16강',
    price: 520000,
    priceFormatted: '520,000원',
    rating: 4.92,
    views: 820,
    createdAt: '2026-02-01',
    instructor: '야마모토 셰프'
  },
  {
    id: 6,
    industry: '중식',
    stage: '매장 운영',
    format: '오프라인',
    badge: null,
    title: '실전 불맛 중식 요리사 과정',
    description: '웍 조리법 마스터 및 짬뽕, 짜장, 탕수육 효율적 단체 조리법',
    image: '/images/course_delivery.jpg',
    duration: '3주 과정',
    lessons: '14강',
    price: 480000,
    priceFormatted: '480,000원',
    rating: 4.80,
    views: 670,
    createdAt: '2026-01-18',
    instructor: '장성룡 셰프'
  },
  {
    id: 7,
    industry: '양식',
    stage: '메뉴 개발',
    format: '혼합형',
    badge: 'RECOMMEND',
    title: '파스타 & 파인다이닝 브런치 창업',
    description: '생면 파스타 제조법 및 트렌디한 브런치 카페 대표 메뉴 수강',
    image: '/images/course_menu_dev.jpg',
    duration: '4주 과정',
    lessons: '20강',
    price: 600000,
    priceFormatted: '600,000원',
    rating: 4.96,
    views: 1540,
    createdAt: '2026-02-05',
    instructor: '마르코 김 셰프'
  },
  {
    id: 8,
    industry: '분식',
    stage: '창업 준비',
    format: '오프라인',
    badge: 'BEST',
    title: '대박 분식집 떡볶이 & 튀김 비법',
    description: '특제 소스 비율과 바삭한 튀김 조리법, 상권별 고객 유입 노하우',
    image: '/images/course_delivery.jpg',
    duration: '2주 과정',
    lessons: '12강',
    price: 290000,
    priceFormatted: '290,000원',
    rating: 4.91,
    views: 2100,
    createdAt: '2026-01-30',
    instructor: '정순자 명인'
  },
  {
    id: 9,
    industry: '배달/밀키트',
    stage: '성장/확장',
    format: '온라인',
    badge: 'HOT',
    title: '배달 전문점 및 밀키트 상품화',
    description: '배달 플랫폼 알고리즘 공략 및 식품 제조 유통 가이드라인',
    image: '/images/course_cafe.jpg',
    duration: '3주 과정',
    lessons: '15강',
    price: 320000,
    priceFormatted: '320,000원',
    rating: 4.87,
    views: 1780,
    createdAt: '2026-02-08',
    instructor: '강동원 이사'
  },
  {
    id: 10,
    industry: '한식',
    stage: '입지 선정',
    format: '온라인',
    badge: null,
    title: '외식 상권분석 및 입지선정 실무',
    description: '빅데이터 기반 유동인구 및 유망 상권 분석 툴 활용 전략',
    image: '/images/course_menu_dev.jpg',
    duration: '2주 과정',
    lessons: '8강',
    price: 180000,
    priceFormatted: '180,000원',
    rating: 4.82,
    views: 890,
    createdAt: '2026-01-15',
    instructor: '임창덕 소장'
  },
  {
    id: 11,
    industry: '카페/디저트',
    stage: '마케팅/브랜딩',
    format: '온라인',
    badge: 'NEW',
    title: '인스타그램 기반 카페 브랜딩',
    description: '비주얼 푸드 포토그래피 및 SNS 바이럴 마케팅 기법',
    image: '/images/course_cafe.jpg',
    duration: '2주 과정',
    lessons: '10강',
    price: 220000,
    priceFormatted: '220,000원',
    rating: 4.89,
    views: 1300,
    createdAt: '2026-02-11',
    instructor: '손유진 마케팅 팀장'
  },
  {
    id: 12,
    industry: '한식',
    stage: '매장 운영',
    format: '오프라인',
    badge: null,
    title: '외식업 노무 & 세무 원스톱 가이드',
    description: '주휴수당, 알바 노동법, 종합소득세 절세 실무 가이드',
    image: '/images/course_restaurant.jpg',
    duration: '1주 과정',
    lessons: '6강',
    price: 120000,
    priceFormatted: '120,000원',
    rating: 4.79,
    views: 640,
    createdAt: '2026-01-20',
    instructor: '김현태 세무사'
  }
];

// Client-side Caching Cache Store
const cache = new Map();

/**
 * Fetch courses async simulation matching GET /api/v1/courses
 * @param {Object} params
 * @param {string} params.industry
 * @param {string} params.stage
 * @param {Array<string>} params.formats
 * @param {string} params.sort - 'latest' | 'popular' | 'price_low' | 'price_high'
 * @param {number} params.page
 * @param {number} params.limit
 */
export async function fetchCourses(params = {}) {
  const {
    industry = '전체',
    stage = '전체',
    formats = [],
    sort = 'latest',
    page = 1,
    limit = 8
  } = params;

  const cacheKey = JSON.stringify({ industry, stage, formats: formats.sort(), sort, page, limit });

  if (cache.has(cacheKey)) {
    // Return cached result with tiny delay
    await new Promise((resolve) => setTimeout(resolve, 80));
    return cache.get(cacheKey);
  }

  // Artificial latency for realistic skeleton UI feel
  await new Promise((resolve) => setTimeout(resolve, 350));

  let filtered = [...ALL_COURSES];

  // Industry Filter
  if (industry && industry !== '전체' && industry !== '전체보기') {
    filtered = filtered.filter((c) => c.industry === industry);
  }

  // Stage Filter
  if (stage && stage !== '전체' && stage !== '전체보기') {
    filtered = filtered.filter((c) => c.stage === stage);
  }

  // Format Filter
  if (formats && formats.length > 0 && !formats.includes('전체')) {
    filtered = filtered.filter((c) => formats.includes(c.format));
  }

  // Sort Logic
  if (sort === 'popular') {
    filtered.sort((a, b) => b.views - a.views);
  } else if (sort === 'price_low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sort === 'price_high') {
    filtered.sort((a, b) => b.price - a.price);
  } else {
    // default latest
    filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  const totalCount = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / limit));
  const startIndex = (page - 1) * limit;
  const paginatedData = filtered.slice(startIndex, startIndex + limit);

  const result = {
    data: paginatedData,
    totalCount,
    totalPages,
    currentPage: page,
  };

  cache.set(cacheKey, result);
  return result;
}
