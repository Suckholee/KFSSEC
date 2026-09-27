import fs from 'node:fs';
import path from 'node:path';
import { writeContent, readContent } from '../api/_store.js';

// 1. Courses
const coursesPath = path.resolve('server/data/content/courses.json');
const coursesFallbackPath = path.resolve('server/data/courses.json');
let coursesData;
if (fs.existsSync(coursesPath)) {
  coursesData = JSON.parse(fs.readFileSync(coursesPath, 'utf8'));
} else if (fs.existsSync(coursesFallbackPath)) {
  coursesData = JSON.parse(fs.readFileSync(coursesFallbackPath, 'utf8'));
}

// 2. Masters
const mastersRaw = JSON.parse(fs.readFileSync(path.resolve('src/data/masterDirectory.json'), 'utf8'));
const mastersData = mastersRaw.map((profile, index) => ({
  id: `master-${index + 1}`,
  title: '',
  intro: '',
  awards: [],
  published: true,
  order: index + 1,
  ...profile,
}));

// 3. Chatbot
const chatbotData = {
  enabled: true,
  botName: '한국외식창업교육원 AI 도우미',
  welcomeMessage: '안녕하세요! (사)한국외식창업교육원 24시 AI 상담 도우미입니다. 무엇이 궁금하신가요? 아래 추천 질문을 선택하시거나 궁금한 점을 직접 입력해 주세요.',
  nudgeMessage: '💬 24시간 실시간 AI 상담 운영 중! 외식창업·자격증 무엇이든 물어보세요.',
  nudgeDelaySeconds: 2,
  autoReplyAiDraft: true,
  quickButtons: [
    {
      id: 'courses',
      label: '💬 어떤 교육과정이 있나요?',
      reply: '외식창업지도사 2급, 외식창업실무사 2급, 한국음식능력(K-FOOD) 2급 온라인 자격 과정 및 1:1 도제식 창업 마스터 과정이 개설되어 있습니다. 4주 집중 과정으로 진행됩니다.',
      actionTab: 'catalog',
      actionSubTab: 'courses',
      actionLabel: '교육과정 전체보기',
    },
    {
      id: 'about',
      label: '🏛️ 교육원 소개를 보고 싶어요.',
      reply: '사단법인 한국외식창업교육원은 농림축산식품부 소관 비영리 사단법인으로 외식창업 명장 선생님들이 1:1 도제식 전수를 진행합니다.',
      actionTab: 'about',
      actionSubTab: 'greetings',
      actionLabel: '교육원 소개 보기',
    },
    {
      id: 'masters',
      label: '👨‍🍳 명장·명인 정보를 보고 싶어요.',
      reply: '40년 경력의 안형상 이사장님을 비롯한 대한민국 조리 명장·명인 교수진이 특제 비법 레시피와 매장 경영 노하우를 직접 전수합니다.',
      actionTab: 'master',
      actionSubTab: 'profiles',
      actionLabel: '명장·명인 프로필 보기',
    },
    {
      id: 'contact',
      label: '📞 1:1 문의 및 입학 상담은 어떻게 하나요?',
      reply: '대표전화 010-7244-6796으로 즉시 전화 연결하시거나, 1:1 온라인 문의 게시판에 글을 남겨주시면 담당 컨설턴트가 신속히 상세 상담을 도와드립니다.',
      actionTab: 'community',
      actionSubTab: 'inquiry',
      actionLabel: '1:1 문의 게시판 바로가기',
    },
  ],
  faqRules: [
    {
      id: 'faq-price',
      title: '수강료 및 결제/할인 안내',
      keywords: ['수강료', '비용', '가격', '얼마', '결제', '할인', '카드', '할부', '금액'],
      reply: '교육과정별 수강료는 온라인 자격과정(20~26만원대) 및 1:1 실전 창업 패키지(38~45만원대)로 구성되어 있습니다. 조기 등록 시 10% 얼리버드 및 국비 지원 연계 혜택이 적용됩니다.',
      actionTab: 'catalog',
      actionSubTab: 'courses',
      actionLabel: '교육과정 & 수강료 확인',
    },
    {
      id: 'faq-cert',
      title: '자격증 검정 및 시험 일정',
      keywords: ['자격증', '시험', '외식창업지도사', '외식창업실무사', 'K-FOOD', '민간자격', '합격', '응시'],
      reply: '외식창업지도사 2급, 외식창업실무사 2급, K-FOOD 자격증은 농림축산식품부 소관 등록 민간자격증입니다. 온라인 강의 80% 이상 이수 후 정기 자격 검정 시험(필기/실기)을 통해 취득하실 수 있습니다.',
      actionTab: 'catalog',
      actionSubTab: 'guide',
      actionLabel: '자격증 검정 안내 보기',
    },
    {
      id: 'faq-gov',
      title: '정부지원금 및 청년 창업',
      keywords: ['정부지원', '국비', '청년', '지원금', '소상공인', '정책자금', '5천만원', '지원사업'],
      reply: '만 39세 이하 청년 외식창업자 및 소상공인을 대상으로 최대 5,000만원 한도의 정부지원금 연계 창업 교육 및 사업계획서 1:1 맞춤 컨설팅을 지원해 드립니다.',
      actionTab: 'consulting',
      actionSubTab: 'apply',
      actionLabel: '정부지원 컨설팅 신청',
    },
    {
      id: 'faq-location',
      title: '교육원 위치 및 주차 안내',
      keywords: ['위치', '주소', '어디', '찾아오는', '오시는', '길', '주차', '역삼역', '테헤란로'],
      reply: '교육원은 서울시 강남구 테헤란로(역삼역 도보 5분 거리)에 위치해 있으며, 지하 주차장 이용이 가능합니다. 상세 약도 및 대중교통 정보는 오시는 길 페이지에서 확인하실 수 있습니다.',
      actionTab: 'about',
      actionSubTab: 'location',
      actionLabel: '오시는 길 & 약도 보기',
    },
    {
      id: 'faq-refund',
      title: '환불 및 수강 취소 규정',
      keywords: ['환불', '취소', '중도해지', '반환', '환불규정'],
      reply: '개강 전 취소 시 결제하신 수강료 전액이 100% 환불되며, 개강 후에는 평생교육법 및 학원법 환불 기준에 따라 잔여 수업 일수에 비례하여 신속히 환불 처리됩니다.',
      actionTab: 'catalog',
      actionSubTab: 'courses',
      actionLabel: '환불 규정 상세 보기',
    },
    {
      id: 'faq-gangnam',
      title: '강남구 소호 인큐베이팅',
      keywords: ['강남', '소호', '인큐베이팅', '공유주방', '매장', '입주', '창업지원'],
      reply: '강남구 관내 외식 창업 소상공인을 위한 공유 실습 공간 및 인큐베이팅 거점 공간을 제공하여 초기 창업 설비 및 임대료 부담을 대폭 낮춰 드립니다.',
      actionTab: 'gangnam',
      actionSubTab: 'intro',
      actionLabel: '강남 소호 안내 보기',
    },
    {
      id: 'faq-course-general',
      title: '교육과정 및 커리큘럼',
      keywords: ['교육과정', '과정', '강좌', '강의', '커리큘럼', '수업'],
      reply: '외식창업지도사 2급, 외식창업실무사 2급, 한국음식능력(K-FOOD) 2급 온라인 자격 과정 및 1:1 도제식 창업 마스터 과정이 개설되어 있습니다. 4주 집중 과정으로 진행됩니다.',
      actionTab: 'catalog',
      actionSubTab: 'courses',
      actionLabel: '교육과정 전체보기',
    },
    {
      id: 'faq-about-general',
      title: '교육원 소개 및 이사장 인사말',
      keywords: ['교육원', '소개', '이사장', '인사말', '설립'],
      reply: '사단법인 한국외식창업교육원은 농림축산식품부 소관 비영리 사단법인으로 외식창업 명장 선생님들이 1:1 도제식 전수를 진행합니다.',
      actionTab: 'about',
      actionSubTab: 'greetings',
      actionLabel: '교육원 소개 보기',
    },
    {
      id: 'faq-masters-general',
      title: '명장·명인 교수진 정보',
      keywords: ['명장', '명인', '교수', '교수진', '셰프', '안형상', '진익준', '신충섭'],
      reply: '40년 경력의 안형상 이사장님을 비롯한 대한민국 조리 명장·명인 교수진이 특제 비법 레시피와 매장 경영 노하우를 직접 전수합니다.',
      actionTab: 'master',
      actionSubTab: 'profiles',
      actionLabel: '명장·명인 프로필 보기',
    },
    {
      id: 'faq-contact-general',
      title: '1:1 상담 및 문의',
      keywords: ['문의', '상담', '전화', '연락', '번호', '입학', '신청'],
      reply: '대표전화 010-7244-6796으로 즉시 전화 연결하시거나, 1:1 온라인 문의 게시판에 글을 남겨주시면 담당 컨설턴트가 신속히 상세 상담을 도와드립니다.',
      actionTab: 'community',
      actionSubTab: 'inquiry',
      actionLabel: '1:1 문의 게시판 바로가기',
    },
  ],
  fallbackReply: '질문해 주신 내용에 대해 담당 전문 컨설턴트의 1:1 심층 상담이 필요합니다. 아래 [1:1 문의 게시판 남기기] 버튼을 누르시면 교육원에서 영업일 기준 신속히 전화 및 온라인으로 맞춤 안내를 드립니다.',
};

// 4. Posts
const postsData = [
  {
    id: 1,
    category: '공지 사항',
    categoryType: 'notice',
    isPinned: true,
    title: '2026년 사단법인 한국외식창업교육원 3분기 총회 및 성과발표회 개최 안내',
    date: '2026.08.30',
    author: 'Admin (교육원)',
    views: 1450,
    content: '사단법인 한국외식창업교육원 2026년 3분기 외식 창업 성과 발표 및 글로벌 K-FOOD 조리 명장 인증서 수여식 총회가 개최됩니다.',
  },
  {
    id: 2,
    category: '공지 사항',
    categoryType: 'notice',
    isPinned: true,
    title: '외식창업 수강생 N:N 커리큘럼 매칭 포트폴리오 시스템 도입 안내',
    date: '2026.08.28',
    author: 'Admin (교육원)',
    views: 1120,
    content: '128명 가입 수강생 1인이 다수의 조리/창업 커리큘럼을 연계하여 수강하고 정부지원금 혜택을 제공받을 수 있는 N:N 매칭 포트폴리오 시스템이 공식 도입되었습니다.',
  },
  {
    id: 3,
    category: '공지 사항',
    categoryType: 'notice',
    isPinned: true,
    title: '제 01회 요리대회 <K-FOOD 지역 특산물 연계 조리 경연 대회> 규정집 & 접수 안내',
    date: '2026.08.25',
    author: 'Admin (교육원)',
    views: 2340,
    content: '전국 128명 수강생 및 외식 창업 준비생 대상 K-FOOD 지역 농수축산물 활성화 요리대회 참가를 위한 규정집 다운로드 및 접수 안내입니다.',
  },
  {
    id: 4,
    category: '요리대회',
    categoryType: 'competition',
    title: '제 01회 K-FOOD 지역 특산물 연계 요리대회 참가 신청서 제출',
    date: '2026.08.29',
    author: '김태훈 수강생',
    views: 890,
    content: '전통 한식 조리 마스터 과정을 수강 중인 김태훈입니다. 발효 장류를 활용한 퓨전 한식 메뉴로 요리대회 참가를 신청합니다.',
  },
  {
    id: 5,
    category: '갤러리',
    categoryType: 'gallery',
    title: '2026 대한민국 자랑스러운 외식 명인 시상식 현장 화보',
    date: '2026.08.29',
    author: '안형상 이사장',
    views: 1280,
    image: '/images/hero_bg.jpg',
    content: '특급호텔 40년 현장 실무 경력의 조리 명장진과 열정적인 128명 수강생들의 명인 시상식 및 수여식 현장 사진 기록입니다.',
  },
  {
    id: 6,
    category: '갤러리',
    categoryType: 'gallery',
    title: '외식창업 조리 실습실 100년 전통 발효 소스 시그니처 메뉴 테스트 현장',
    date: '2026.08.28',
    author: '박준형 수강생',
    views: 940,
    image: '/images/course_menu_dev.jpg',
    content: '한식 셰프 창업 과정을 통해 직접 조리한 100년 전통 발효 소스 시그니처 갈비찜 테스트 실습 현장 화보입니다.',
  },
  {
    id: 7,
    category: '갤러리',
    categoryType: 'gallery',
    title: '카페 창업 실전 & 라떼아트 1:1 직강 이수 인증 샷!',
    date: '2026.08.27',
    author: '최성민 수강생',
    views: 710,
    image: '/images/course_cafe.jpg',
    content: '바리스타 챔피언 이지은 강사님의 라떼아트 1:1 코칭을 이수하고 드디어 로제타 패턴 완성에 성공했습니다!',
  },
  {
    id: 8,
    category: '문의',
    categoryType: 'inquiry',
    status: 'completed',
    title: '청년 외식창업 정부지원금 5천만원 연계 신청 방법 및 자격 문의',
    date: '2026.08.30',
    author: '강현우 수강생',
    views: 450,
    content: '청년 창업 교육 지원 정책 및 소상공인 창업 지원금 연계 절차에 관해 문의드립니다. 제출 서류 양식이 궁금합니다.',
    reply: {
      date: '2026.08.30 14:20',
      content: '안녕하세요 강현우 수강생님, 사단법인 한국외식창업교육원입니다.\n청년 외식창업 정부지원금 연계 서류는 스마트 파트너 센터 마이페이지에서 다운로드 가능하며, 1:1 전담 컨설턴트가 사업계획서 검토를 도와드립니다.',
    },
  },
  {
    id: 9,
    category: '문의',
    categoryType: 'inquiry',
    status: 'completed',
    title: '전통 한식 조리 마스터 1:1 주방 동선 컨설팅 예약 문의',
    date: '2026.08.29',
    author: '조수진 수강생',
    views: 380,
    content: '9월 매장 오픈 예정인 한식 전문점 주방 설비 및 동선 1:1 현장 컨설팅 일정을 신청하고자 합니다.',
    reply: {
      date: '2026.08.29 16:45',
      content: '조수진 대표님 안녕하세요!\n신청하신 1:1 주방 동선 컨설팅은 9월 5일 개강 당일 안형상 이사장님 직강 후 오프라인 실습실에서 진행될 예정입니다.',
    },
  },
  {
    id: 10,
    category: '문의',
    categoryType: 'inquiry',
    status: 'pending',
    title: '소상공인 100년 전통 발효 소스 시그니처 전수 과정 문의',
    date: '2026.08.30',
    author: '윤경민 수강생',
    views: 290,
    content: '기존 매장 메뉴 리뉴얼 및 셰프 1:1 레시피 전수 과정 수강료 할인 패키지에 대해 상세 상담 부탁드립니다.',
    reply: null,
  },
  {
    id: 11,
    category: '문의',
    categoryType: 'inquiry',
    status: 'completed',
    title: '파스타 생면 제면기 및 이태리 파인다이닝 주방 집기 중고 구매 문의',
    date: '2026.08.28',
    author: '장보미 수강생',
    views: 510,
    content: '브런치 파스타 창업 과정 수강생 전용 커뮤니티에서 업소용 제면기 중고 구매 정보를 얻을 수 있나요?',
    reply: {
      date: '2026.08.28 11:10',
      content: '장보미 수강생님 반갑습니다.\n이사장님 추천 검증된 주방 집기 거래망 및 수강생 정보 공유 커뮤니티 채팅방 링크를 문자로 발송해 드렸습니다.',
    },
  },
  {
    id: 12,
    category: '문의',
    categoryType: 'inquiry',
    status: 'pending',
    title: '일식 횟집 & 초밥 오마카세 창업 1:1 컨설팅 일정 문의',
    date: '2026.08.30',
    author: '임남궁건 수강생',
    views: 330,
    content: '활어 오로시 및 성게알 타르타르 레시피 실습 시간표와 주말반 개설 여부가 궁금합니다.',
    reply: null,
  },
];

// 5. Site
const siteData = {
  partnerLogos: [
    { id: 'p1', name: '농림축산식품부', category: '주무관청', tag: '정부기관', desc: '사단법인 한국외식창업교육원의 주무관청으로서 K-외식 창업 및 전통 식문화 계승, 농수산물 외식 소비 촉진을 종합 지도합니다.', logoText: 'MAFRA', image: '/images/partners/mafra.svg', linkUrl: 'https://www.mafra.go.kr', active: true },
    { id: 'p2', name: '소상공인시장진흥공단', category: '공공기관', tag: '정책자금 연계', desc: '소상공인 맞춤형 정책자금 연계, 온누리상품권 가맹 및 재도약 창업 패키지를 협력 지원하는 공공기관 파트너입니다.', logoText: 'SEMAS', image: '/images/partners/semas.svg', linkUrl: 'https://www.sbiz.or.kr', active: true },
    { id: 'p3', name: '강남구청', category: '지자체 협력', tag: '골목상권 상생', desc: '지역 상권 활성화 및 청년·신중년 외식 창업 육성을 위해 관내 외식 상생 인큐베이팅 프로그램을 공동 운영합니다.', logoText: 'GANGNAM-GU', image: '/images/partners/gangnam.svg', linkUrl: 'https://www.gangnam.go.kr', active: true },
    { id: 'p4', name: '(주)주방뱅크', category: '주방 설비 1위', tag: '3D 주방 설계', desc: '대한민국 1위 업소용 주방기구 및 설비 토탈 컨설팅 기업으로, 수강생 대상 주방 집기 특별 할인 및 3D 도면 설계를 지원합니다.', logoText: 'KITCHEN BANK', image: '/images/partners/jubangbank.svg', linkUrl: 'https://www.jubangbank.co.kr', active: true },
    { id: 'p5', name: '(주)세진', category: '친환경 위생', tag: 'HACCP 솔루션', desc: 'HACCP 인증 친환경 주방 세척 및 살균 소독 시스템 전문 기업으로 안전한 위생 환경 구축을 보증합니다.', logoText: 'SEJIN CORP', image: '/images/partners/sejin.svg', linkUrl: '', active: true },
    { id: 'p6', name: '(주)비엠스 인터내셔날', category: '글로벌 유통', tag: '식자재 B2B', desc: '프리미엄 수입 식자재 및 해외 향신료 유통 전문 기업으로 안정적인 B2B 원가 절감 유통망을 연계합니다.', logoText: 'BMS INTER', image: '/images/partners/bms.svg', linkUrl: '', active: true },
    { id: 'p7', name: '㈜자인', category: '발효소스 R&D', tag: '100년 전통 소스', desc: '100년 전통 발효 비법을 바탕으로 한 시그니처 소스 및 천연 조미 소재 개발 협력 파트너입니다.', logoText: 'JAIN FOODS', image: '/images/partners/jain.svg', linkUrl: '', active: true },
    { id: 'p8', name: '㈜다이닝에프앤비', category: 'F&B 프랜차이즈', tag: '브랜드 인큐베이팅', desc: '유망 외식 프랜차이즈 브랜드 기획 및 가맹 시스템 구축, 인큐베이팅을 협업하는 전문 F&B 그룹입니다.', logoText: 'DINING F&B', image: '/images/partners/diningfnb.svg', linkUrl: '', active: true },
    { id: 'p9', name: '김태완스시', category: '일식 조리 연구', tag: '실전 외식 매장', desc: '전국 30여 개 매장을 운영 중인 초밥 전문 브랜드로, 실전 현장 인턴십 및 매장 경영 노하우를 공유합니다.', logoText: 'KIM TAE WAN', image: '/images/partners/kimtaewan.svg', linkUrl: '', active: true },
    { id: 'p10', name: '황태회관', category: '향토 음식 보존', tag: '전통 맛집 계승', desc: '평창 50년 전통의 대표 향토음식 전문점으로, 지역 농수특산물 연계 및 명인 레시피 상품화를 함께합니다.', logoText: 'HWANGTAE', image: '/images/partners/hwangtae.svg', linkUrl: '', active: true },
    { id: 'p11', name: 'VEN60 (벤60)', category: '외식 공간 디자인', tag: 'CX 파사드 인테리어', desc: '호텔식 고급 디저트 및 제과제빵 전문 브랜드로, 수강생을 위한 바리스타 및 베이킹 실습 환경을 지원합니다.', logoText: 'VEN60 DESIGN', image: '/images/partners/ven60.svg', linkUrl: '', active: true },
    { id: 'p12', name: '진도울돌목가는길', category: '수산물 특산 R&D', tag: '산지 수산물', desc: '청정 남도 해역 수산물 직거래 유통 및 특산물 기반 메뉴 개발을 협업하는 산지 직송 파트너입니다.', logoText: 'JINDO FOOD', image: '/images/partners/jindo.svg', linkUrl: '', active: true },
    { id: 'p13', name: '닥터장 베이킹랩', category: '베이커리 & 디저트', tag: '제과제빵 R&D', desc: '제과기능장의 천연효모종 발효 빵 및 쌀 베이킹 레시피를 공동 개발하고 지도하는 전문 연구소입니다.', logoText: 'DR.JANG LAB', image: '/images/partners/drjang.svg', linkUrl: '', active: true },
    { id: 'p14', name: '글로벌외식정보', category: '공식 제휴 미디어', tag: '외식 트렌드', desc: '외식업 창업과 경영 인사이트, 현장 포토뉴스 및 칼럼을 전하는 공식 미디어 파트너입니다.', logoText: 'HSGDN', image: '/images/logo_global_dining.png', linkUrl: 'https://www.hsgdn.co.kr/news/list.php?mcode=m247tk9&vg=photo', active: true },
  ],
  institutionInfo: {
    corpName: '사단법인 한국외식창업교육원',
    engName: 'Korea Food Service Startup Education Center',
    ceoName: '안형상 이사장',
    phone: '010-7244-6796',
    tel: '02-3474-7001',
    fax: '02-3474-7002',
    email: 'contact@kfssec.or.kr',
    headquartersAddress: '서울특별시 강남구 테헤란로 123 KFSSEC 빌딩 3-5층 (실습 및 검정 전용 교육장)',
    officeAddress: '서울특별시 서초구 사임당로 174, 강남미래타워 5층 (우: 06628)',
    bizNumber: '114-82-10825',
    establishedDate: '2022년 7월 29일',
    operatingHours: '평일 09:00 - 18:00 (주말/공휴일 휴무)',
  },
  youtube: {
    title: '한국외식창업교육원 미디어',
    subtitle: '사단법인 한국외식창업교육원의 주요 정기총회 현장 및 아시아창의방송 언론 보도 영상입니다.',
    channelUrl: 'https://www.youtube.com/@%ED%95%9C%EA%B5%AD%EC%99%B8%EC%8B%9D%EC%B0%BD%EC%97%85%EA%B5%90%EC%9C%A1%EC%9C%88',
    videos: [
      {
        id: 'v1',
        videoUrl: 'https://www.youtube.com/watch?v=ZDZFUpS0fFE',
        videoId: 'ZDZFUpS0fFE',
        title: '240203 한국외식창업교육원 정기총회',
        subtitle: '한국외식창업교육원 2023년 결산 및 2024년 사업 계획에 대한 정기 총회 전체 영상',
        channel: '한국외식창업교육원 공식 채널',
        categoryBadge: '공식 채널 영상',
        thumbnail: 'https://img.youtube.com/vi/ZDZFUpS0fFE/hqdefault.jpg',
        uploadDate: '2024.02.03',
      },
      {
        id: 'v2',
        videoUrl: 'https://www.youtube.com/watch?v=E_WgebIP_SY',
        videoId: 'E_WgebIP_SY',
        title: '안형상 한국외식창업교육원 이사장, 정기총회서 "100세 초고령 시대 교육을 통한 글로벌 K-FOOD 시대 열어야..." 강조',
        subtitle: '아시아창의방송(actv) 정기총회 현장 취재 및 안형상 이사장 특별 언론 보도 영상',
        channel: '아시아창의방송(actv) 언론 보도',
        categoryBadge: '언론 보도 영상',
        thumbnail: 'https://img.youtube.com/vi/E_WgebIP_SY/hqdefault.jpg',
        uploadDate: '2024.01.15',
      },
    ],
  },
  banner: {
    badgeText: '사단법인 한국외식창업교육원 2026 하반기 신규 수강생 모집',
    title: 'K-FOOD 시그니처 100년 발효 레시피 & 창업 실무 직강',
    subtitle: '특급호텔 40년 명장이 전수하는 소상공인 창업 성공 솔루션',
    dDay: 'D-7일 마감임박',
    buttonText: '수강생 필수 서비스 안내',
  },
  heroBanners: [
    {
      id: 'banner_fearless',
      title: '외식 창업이 두려운가?',
      subtitle: '한국외식창업교육원에서 성공으로 이끌어 드립니다.',
      imageUrl: '/images/hero_banner_fearless.png',
      imageOnly: true,
      active: true,
      overlayDim: 0,
      buttonText: '교육과정 둘러보기',
      buttonLink: 'catalog',
    },
    {
      id: 'banner_masters_classic',
      title: '꿈꾸는 외식창업 아무에게나 맡기시겠습니까?',
      subtitle: '오랜 현장실무경험과 실력을 갖춘 명인, 명장님께 맡겨주세요! 성공적인 창업은 저희가 책임지겠습니다.',
      imageUrl: '/images/main_banner_masters.png',
      imageOnly: true,
      active: true,
      overlayDim: 0,
      buttonText: '명인·명장 교수진 소개',
      buttonLink: 'about',
    },
    {
      id: 'banner_culinary_pro',
      title: '특급호텔 40년 명장의 1:1 직강 비법 전수',
      subtitle: '100년 전통 발효 소스부터 1인 주방 최적화 동선 설계까지 실전 창업 성공 솔루션',
      imageUrl: '/images/chef_tossing_food.jpg',
      imageOnly: false,
      active: true,
      overlayDim: 55,
      tag: '대한민국 조리명장 제1호 직강',
      buttonText: '1:1 맞춤 상담 신청',
      buttonLink: 'community',
    },
  ],
};

async function main() {
  console.log('🚀 Starting sync to Supabase...');
  const datasets = { courses: coursesData, masters: mastersData, chatbot: chatbotData, posts: postsData, site: siteData };
  for (const [type, data] of Object.entries(datasets)) {
    const existing = await readContent(type);
    if (existing !== null) {
      console.log(`Skipping ${type}: already exists in Supabase`);
      continue;
    }
    console.log(`Uploading ${type}...`);
    await writeContent(type, data);
  }

  console.log('\n✅ Verification: Reading back from Supabase...');
  for (const type of ['courses', 'masters', 'chatbot', 'posts', 'site']) {
    const val = await readContent(type);
    const count = Array.isArray(val) ? `${val.length} items` : (val ? 'Object OK' : 'Empty');
    console.log(` - ${type}: ${count}`);
  }

  console.log('\n🎉 All local data successfully migrated and synced to Supabase!');
}

main().catch(err => {
  console.error('❌ Migration failed:', err);
  process.exit(1);
});
