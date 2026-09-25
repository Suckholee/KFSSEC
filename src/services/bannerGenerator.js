/**
 * AI-assisted Banner Content & Copy Generator for KFSSEC
 * Provides preset copywriting, color palettes, visual guidelines,
 * and dynamic copy synthesis for arbitrary promotional topics.
 */

export const BANNER_SPECS = [
  {
    id: 'top_strip',
    name: '메인 상단 와이드 띠배너',
    width: 1920,
    height: 100,
    aspectRatio: '19.2 / 1',
    description: '웹사이트 최상단에 상시 노출되는 주목도 1위 풀와이드 띠배너',
    recommendedUse: '행사 공지, 조기 마감(D-Day), 수강생 얼리버드 혜택',
  },
  {
    id: 'wide_promo',
    name: '와이드 프로모션 배너',
    width: 1200,
    height: 360,
    aspectRatio: '12 / 3.6',
    description: '본문 중간 섹션에 배치되어 세부 혜택을 강조하는 가로형 배너',
    recommendedUse: '신규 자격과정 론칭, 조리명장 세미나 초청, 정책자금 안내',
  },
  {
    id: 'popup_square',
    name: '공지 팝업 모달 (정방형)',
    width: 600,
    height: 600,
    aspectRatio: '1 / 1',
    description: '홈페이지 접속 시 중앙 레이어로 노출되는 고주목도 팝업',
    recommendedUse: '총회 개최, 요리대회 접수 개시, 긴급 공지사항',
  },
  {
    id: 'sns_card',
    name: 'SNS 홍보 & 인스타그램 카드뉴스',
    width: 1080,
    height: 1080,
    aspectRatio: '1 / 1',
    description: '인스타그램 피드 및 카카오톡 채널 메시지용 고화질 카드',
    recommendedUse: '소상공인 턴어라운드 후기, 명장 레시피 시연회 화보',
  },
];

export const PRESET_THEMES = [
  {
    id: 'early_bird',
    name: '신규 수강생 모집 & 얼리버드',
    tag: '장학지원 30%',
    badgeText: '사단법인 한국외식창업교육원 2026 하반기 신규 수강생 모집',
    title: 'K-FOOD 시그니처 100년 발효 레시피 & 창업 실무 직강',
    subtitle: '특급호텔 40년 명장이 전수하는 소상공인 창업 성공 솔루션 (선착순 수강료 30% 감면)',
    dDay: 'D-7일 마감임박',
    buttonText: '얼리버드 장학 신청하기 >',
    palette: {
      name: '헤리티지 딥그린 & 골드 (Heritage Forest)',
      bgGradient: 'from-[#0B3C26] via-[#104830] to-[#072517]',
      accentBg: '#C5A059',
      accentText: '#1c1503',
      textColor: '#FFFFFF',
      subTextColor: '#A7F3D0',
      borderStyle: 'border-2 border-[#C5A059]',
    },
    designGuide: {
      mood: '신뢰감과 품격을 주는 정통 학술·사단법인 분위기',
      visualElements: '골드 프레임 테두리, 전통 기와/한지 질감 텍스처, 월계관 인증 엠블럼',
      typography: '국문 헤드라인은 단정하고 굵은 명조/고딕 혼용, 영문은 클래식 세리프',
    },
  },
  {
    id: 'master_seminar',
    name: '조리명장 시그니처 비법 전수',
    tag: '명장 1:1 직강',
    badgeText: '대한민국 조리명장 제1호 & 40년 대가 초청 시연 세미나',
    title: '특급호텔 파인다이닝 스테이크 & 100년 전통 소스 전수 특강',
    subtitle: '1인 주방 최적화 동선 설계부터 대용량 맛 표준화 레시피까지 단 하루 전수',
    dDay: '선착순 20명 한정',
    buttonText: '명장 세미나 예약하기 >',
    palette: {
      name: '럭셔리 다크버건디 & 엠버 (Royal Burgundy)',
      bgGradient: 'from-[#2B0E14] via-[#3E161F] to-[#1A070B]',
      accentBg: '#F59E0B',
      accentText: '#180B03',
      textColor: '#FFFFFF',
      subTextColor: '#FECDD3',
      borderStyle: 'border-2 border-[#F59E0B]',
    },
    designGuide: {
      mood: '화려한 미식과 최고급 호텔 셰프의 장인정신 강조',
      visualElements: '셰프 불쇼 조리 현장 실루엣, 골드 포크/나이프 아이콘, 다크 톤 대비',
      typography: '압도적인 굵기의 볼드 고딕으로 명장 직강 임팩트 강조',
    },
  },
  {
    id: 'gov_subsidy',
    name: '정부지원금 & 정책자금 설명회',
    tag: '최대 1억원 연계',
    badgeText: '중소벤처기업부 & 소상공인시장진흥공단 정책자금 연계 지원',
    title: '청년·소상공인 외식창업 정책자금 1억원 무상환 연계 설명회',
    subtitle: '합격률 94%의 사업계획서 1:1 첨삭 및 교육원 공식 수료 추천서 발급 안내',
    dDay: '이번 주 토요일 14시',
    buttonText: '설명회 무료 참가신청 >',
    palette: {
      name: '비즈니스 네이비 & 에메랄드 (Financial Trust)',
      bgGradient: 'from-[#0A192F] via-[#112240] to-[#020C1B]',
      accentBg: '#10B981',
      accentText: '#022C22',
      textColor: '#FFFFFF',
      subTextColor: '#93C5FD',
      borderStyle: 'border-2 border-[#10B981]',
    },
    designGuide: {
      mood: '정부 공공기관의 신뢰성과 금융 지원의 혜택 직관성 전달',
      visualElements: '상승 차트 그래픽, 정부 승인 방패 뱃지, 서류/계획서 그래픽 요소',
      typography: '가독성이 극대화된 깔끔한 산세리프 볼드 서체',
    },
  },
  {
    id: 'kfood_contest',
    name: '전국 K-FOOD 조리경연대회',
    tag: '총상금 2천만원',
    badgeText: '농림축산식품부 후원 제01회 K-FOOD 지역특산물 연계 조리경연대회',
    title: '전국 외식창업 준비생 & 조리 명인들의 맛의 대제전',
    subtitle: '지역 농수축산물 메뉴 상품화 및 농림부 장관상·사단법인 이사장상 수여',
    dDay: '참가 접수 마감 D-14',
    buttonText: '대회 요강 & 접수안내 >',
    palette: {
      name: '로열 블루 & 샴페인 골드 (Grand Competition)',
      bgGradient: 'from-[#1E3A8A] via-[#1E40AF] to-[#0F172A]',
      accentBg: '#FBBF24',
      accentText: '#2D1F00',
      textColor: '#FFFFFF',
      subTextColor: '#BFDBFE',
      borderStyle: 'border-2 border-[#FBBF24]',
    },
    designGuide: {
      mood: '전국 규모 대회의 웅장함과 축제 분위기',
      visualElements: '트로피, 금메달 리본, 태극 문양의 현대적 그라디언트 터치',
      typography: '헤드라인 자간을 좁히고 힘찬 서체로 공식 대회 권위 표현',
    },
  },
  {
    id: 'new_course_launch',
    name: '신규 융합 과정 론칭 (펫/푸드테크)',
    tag: '2026 신설과정',
    badgeText: '외식 트렌드를 선도하는 미래형 외식 창업 신규 자격 라인업',
    title: '소믈리에 파티컨설턴트 & 펫푸드 창업 마스터 1·2급 정식 개강',
    subtitle: '반려동물 1,500만 시대 블루오션! 휴먼그레이드 수제간식 매장 창업 A to Z',
    dDay: '얼리버드 1기 모집',
    buttonText: '커리큘럼 상세 보기 >',
    palette: {
      name: '모던 바이올렛 & 라벤더 (Creative Trend)',
      bgGradient: 'from-[#2E1065] via-[#3B0764] to-[#1E1B4B]',
      accentBg: '#C084FC',
      accentText: '#1E1B4B',
      textColor: '#FFFFFF',
      subTextColor: '#E9D5FF',
      borderStyle: 'border-2 border-[#C084FC]',
    },
    designGuide: {
      mood: '트렌디하고 감각적인 최신 F&B 및 펫푸드 라이프스타일',
      visualElements: '모던 와인잔 & 반려동물 친화적 일러스트 라인, 네온 하이라이트',
      typography: '감각적인 트렌드 서체와 널찍한 여백의 세련된 레이아웃',
    },
  },
  {
    id: 'consulting_week',
    name: '1:1 무료 창업 경영진단 주간',
    tag: '상권분석 무료',
    badgeText: '진익준 교수 연구팀과 함께하는 골목상권 소상공인 턴어라운드 프로젝트',
    title: '데이터 기반 상권분석 & 점포 동선 1:1 맞춤형 무료 컨설팅',
    subtitle: '빅데이터 유동인구 분석과 고객 경험(CX) 파사드 디자인 무료 진단 (일 5개 매장 한정)',
    dDay: '이번 주 선착순 접수',
    buttonText: '1:1 무료 진단 예약 >',
    palette: {
      name: '다크 포레스트 & 민트 (Analytical Forest)',
      bgGradient: 'from-[#064E3B] via-[#065F46] to-[#022C22]',
      accentBg: '#34D399',
      accentText: '#064E3B',
      textColor: '#FFFFFF',
      subTextColor: '#A7F3D0',
      borderStyle: 'border-2 border-[#34D399]',
    },
    designGuide: {
      mood: '실무 데이터 컨설팅의 정밀함과 친근한 맞춤형 코칭',
      visualElements: '지도 핀 포인트, 돋보기 분석 아이콘, 그린 톤 데이터 대시보드 무드',
      typography: '신뢰감을 주는 산세리프 폰트와 명확한 숫자 강조',
    },
  },
];

/**
 * Dynamically synthesizes a customized banner concept based on user's free-form prompt.
 */
export function generateCustomBanner(userPrompt) {
  if (!userPrompt || !userPrompt.trim()) {
    return PRESET_THEMES[0];
  }

  const prompt = userPrompt.trim();
  const today = new Date();
  const month = today.getMonth() + 1;

  // Keyword Matching heuristics
  let matchedPreset = PRESET_THEMES[0];
  if (prompt.includes('명장') || prompt.includes('요리') || prompt.includes('셰프') || prompt.includes('레시피') || prompt.includes('소스')) {
    matchedPreset = PRESET_THEMES[1];
  } else if (prompt.includes('지원금') || prompt.includes('대출') || prompt.includes('정부') || prompt.includes('정책') || prompt.includes('자금')) {
    matchedPreset = PRESET_THEMES[2];
  } else if (prompt.includes('대회') || prompt.includes('경연') || prompt.includes('상') || prompt.includes('축제')) {
    matchedPreset = PRESET_THEMES[3];
  } else if (prompt.includes('펫') || prompt.includes('카페') || prompt.includes('와인') || prompt.includes('소믈리에') || prompt.includes('신설')) {
    matchedPreset = PRESET_THEMES[4];
  } else if (prompt.includes('상권') || prompt.includes('컨설팅') || prompt.includes('진단') || prompt.includes('진익준') || prompt.includes('인테리어')) {
    matchedPreset = PRESET_THEMES[5];
  }

  return {
    id: `custom-${Date.now()}`,
    name: `[맞춤 생성] ${prompt.slice(0, 18)}...`,
    tag: 'AI 맞춤 생성',
    badgeText: `사단법인 한국외식창업교육원 ${month}월 특별 프로모션`,
    title: prompt.length < 15 ? `${prompt} - 사단법인 공인 명장 직강` : prompt,
    subtitle: `특급호텔 40년 조리명장의 1:1 도제식 전수 및 외식 창업 성공 패키지 (${prompt} 특화)`,
    dDay: 'D-5일 마감임박',
    buttonText: '특별 프로모션 참여하기 >',
    palette: matchedPreset.palette,
    designGuide: matchedPreset.designGuide,
  };
}

/**
 * Generate a clean designer Markdown brief/handover document
 */
export function generateDesignerBrief(bannerData, selectedSpec) {
  const spec = selectedSpec || BANNER_SPECS[0];
  return `[사단법인 한국외식창업교육원 - 배너 제작 의뢰 및 가이드 시트]
======================================================
1. 기본 제작 규격
 - 배너 명칭: ${spec.name}
 - 해상도 규격: ${spec.width} × ${spec.height} px (비율: ${spec.aspectRatio})
 - 권장 확장자: WebP (품질 90% 이상) 또는 JPG / PNG (투명도 필요 시)
 - 모바일 대응: ${spec.width > 1000 ? '반응형 768px 미만 분기 시 텍스트 2줄 래핑 지원' : '1:1 정방형 규격 유지'}

2. 배너 카피라이팅 (Copywriting)
 - 상단 뱃지: ${bannerData.badgeText || ''}
 - 메인 헤드라인: ${bannerData.title || ''}
 - 서브타이틀: ${bannerData.subtitle || ''}
 - 기간/D-Day: ${bannerData.dDay || ''}
 - CTA 버튼 문구: ${bannerData.buttonText || ''}

3. 비주얼 및 디자인 가이드라인
 - 테마/무드: ${bannerData.designGuide?.mood || '사단법인 공식 교육기관으로서의 높은 신뢰감과 품격'}
 - 추천 컬러 팔레트: ${bannerData.palette?.name || '헤리티지 딥그린 & 골드'}
   * 배경 그라디언트: ${bannerData.palette?.bgGradient || 'from-[#0B3C26] to-[#072517]'}
   * 포인트/액센트 색상: ${bannerData.palette?.accentBg || '#C5A059'}
   * 메인 텍스트: ${bannerData.palette?.textColor || '#FFFFFF'}
 - 추천 시각 요소: ${bannerData.designGuide?.visualElements || '골드 테두리, 공식 인증 뱃지, 실루엣 그래픽'}
 - 타이포그래피: ${bannerData.designGuide?.typography || '가독성 높은 볼드 고딕 + 클래식 세리프 포인트'}

4. 검수 및 납품 기준
 - 브랜드 로고 (/images/logo-transparent.svg) 선명도 확인
 - 모바일 화면에서 메인 카피 판독성 확보
======================================================`;
}
