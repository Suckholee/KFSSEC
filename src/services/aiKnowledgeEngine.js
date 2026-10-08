import { getCoursesFromDB } from './courseDatabase.js';
import { getMasterProfiles } from './masterDatabase.js';
import { qualifications, specialistQualifications } from '../data/qualifications.js';
import { getChatbotConfig } from './chatbotConfig.js';

let liveIndexedPosts = [];

export function setAiIndexedPosts(posts) {
  if (Array.isArray(posts)) {
    liveIndexedPosts = posts;
  }
}

export function getAiIndexedPosts() {
  return liveIndexedPosts;
}

// Clean text for space-insensitive Korean matching
function clean(str = '') {
  return (str || '').replace(/\s+/g, '').toLowerCase();
}

export function searchAiKnowledge(userQuery = '', options = {}) {
  const query = (userQuery || '').trim();
  const cq = clean(query);

  if (!query) {
    return {
      query: '',
      cards: [],
      recommendations: getDefaultRecommendations(),
      followUpQuestions: [],
    };
  }

  const courses = getCoursesFromDB() || [];
  const masters = getMasterProfiles() || [];
  const chatbotConfig = getChatbotConfig() || {};
  const faqRules = chatbotConfig.faqRules || [];
  const posts = (options.postsList && options.postsList.length > 0) ? options.postsList : liveIndexedPosts;

  const cards = [];
  const recommendations = [];
  let followUpQuestions = [];

  // =========================================================================
  // 1. INTENT: 창업 컨설팅 / 진익준 교수 컨설팅 / 매장 리뉴얼 / 경영 개선
  // =========================================================================
  if (
    cq.includes('컨설팅') ||
    cq.includes('진익준') ||
    cq.includes('리뉴얼') ||
    cq.includes('창업상담') ||
    cq.includes('매장개선') ||
    cq.includes('동선') ||
    cq.includes('인테리어') ||
    cq.includes('상권분석')
  ) {
    cards.push({
      id: 'sol-consulting-jin',
      badge: '외식 공간 & 경영 컨설팅',
      badgeColor: 'bg-emerald-600',
      title: '진익준 교수의 1:1 맞춤 외식공간 & 경영 컨설팅',
      analysisInfo:
        '단순 인테리어를 넘어 [상권 빅데이터 분석 + 브랜드 입지 전략 + 효율적인 주방/매장 동선 시스템 + 공간 브랜딩]을 종합 기획합니다. 노후 매장 동선 재배치, 푸드테크 주방 개선, 브랜드 리뉴얼을 통해 최소 비용으로 최대 매출 상승을 달성할 수 있도록 1:1 맞춤 컨설팅을 제공합니다.',
      recommendReason:
        '질문하신 외식 창업 컨설팅 및 매장 개선 고민에 대해 국내외 100건 이상의 공간 설계 및 감리 실적을 보유한 진익준 교수의 전문 연구팀이 가장 확실한 오퍼레이션 솔루션을 제시하기 때문입니다.',
      actionTab: 'consulting',
      actionSubTab: 'professor',
      actionLabel: '진익준 교수 컨설팅 상세 안내',
    });

    cards.push({
      id: 'sol-consulting-process',
      badge: '컨설팅 진행 절차 & 준비사항',
      badgeColor: 'bg-teal-700',
      title: '창업 컨설팅 신청 절차 및 사전 진단 양식',
      analysisInfo:
        '온라인/전화 문의 접수 시 [매장 위치(주소) 및 평수 / 현재(예정) 메뉴 콘셉트 / 예산 범위 / 주요 고민사항] 4가지를 작성해 주시면 신속한 사전 진단 후, 현장 조사 및 1:1 면담을 통해 단계별 컨설팅 범위와 일정을 확정합니다.',
      recommendReason:
        '사전에 매장 현황과 예산을 체계적으로 정리하여 접수하면 불필요한 시행착오 없이 맞춤형 솔루션을 가장 빠르게 도출할 수 있습니다.',
      actionTab: 'consulting',
      actionSubTab: 'roadmap',
      actionLabel: '컨설팅 로드맵 & 신청 양식 보기',
    });

    recommendations.push(
      {
        id: 'rec-jin-profile',
        badge: '전문 컨설팅',
        badgeColor: 'bg-emerald-600',
        title: '진익준 교수 맞춤 외식공간 컨설팅',
        desc: '국내외 100+ 프랜차이즈 및 대형 외식공간 설계·감리 경험을 바탕으로 상권분석, 파사드, 동선 최적화 1:1 진단',
        meta: '담당: 진익준 교수 | 대상: 신규 창업 & 기존 매장 리뉴얼 | 지원: 1:1 현장 코칭',
        summaryTip: '매장 주소, 평수, 메뉴 컨셉, 예산을 사전 접수하시면 빠른 1차 진단이 진행됩니다.',
        actionTab: 'consulting',
        actionSubTab: 'professor',
        actionLabel: '1:1 컨설팅 신청',
      },
      {
        id: 'rec-master-course',
        badge: '창업 마스터',
        badgeColor: 'bg-amber-600',
        title: '1:1 도제식 창업 마스터 실전 패키지',
        desc: '문체부 제8대 조리명인·국가공인 조리기능장 안형상 이사장님이 특제 비법 레시피 전수부터 1인 주방 세팅 및 원가 관리 노하우를 밀착 전수',
        meta: '담당: 안형상 조리명인·기능장 | 기간: 4주 집중 | 방식: 1:1 도제식 오프라인 실습',
        summaryTip: '수강생 매장 콘셉트에 맞춘 커스텀 시그니처 소스 및 메뉴 레시피가 표준화됩니다.',
        actionTab: 'catalog',
        actionSubTab: 'courses',
        actionLabel: '마스터 과정 보기',
      },
      {
        id: 'rec-youth-fund',
        badge: '정부지원 연계',
        badgeColor: 'bg-blue-600',
        title: '청년 창업 및 소상공인 정책자금 지원 트랙',
        desc: '만 39세 이하 청년 외식창업자 대상 최대 5,000만원 정책지원금 및 저금리 융자 연계 사업계획서 1:1 첨삭 코칭',
        meta: '소관: 중소벤처기업부/소진공 연계 | 교육원 수료 공식 추천서 발급',
        summaryTip: '사업계획서 기본 양식을 무료 다운로드하고 서류 합격률을 높일 수 있습니다.',
        actionTab: 'consulting',
        actionSubTab: 'youth',
        actionLabel: '지원사업 안내',
      }
    );

    followUpQuestions = [
      '진익준 교수 컨설팅 준비 자료 및 신청 절차는 어떻게 되나요?',
      '기존 매장의 주방 동선 및 리뉴얼 컨설팅도 가능한가요?',
      '1:1 도제식 창업 마스터 과정의 커리큘럼을 알려주세요.',
    ];
  }

  // =========================================================================
  // 2. INTENT: 자격증 / K-FOOD / 시험 / 검정 / 취득
  // =========================================================================
  else if (
    cq.includes('자격증') ||
    cq.includes('자격') ||
    cq.includes('시험') ||
    cq.includes('kfood') ||
    cq.includes('k-food') ||
    cq.includes('지도사') ||
    cq.includes('실무사') ||
    cq.includes('소믈리에') ||
    cq.includes('푸드테크')
  ) {
    cards.push({
      id: 'sol-cert-overview',
      badge: '농림축산식품부 등록 민간자격',
      badgeColor: 'bg-blue-700',
      title: '한국외식창업교육원 전문 자격증 과정 안내',
      analysisInfo:
        '본 교육원은 농림축산식품부 허가를 받은 다양한 전문 자격증 과정을 운영하고 있습니다. 대표적으로 [K-FOOD 자격증], [외식지도사(1, 2급)], [외식창업실무지도사(1, 2급)], [명인민간자격증], [소믈리에파티컨설턴트], [푸드테크설계사 자격증] 등이 있습니다. 온라인 강의 80% 이상 이수 후 정기 자격 검정을 통해 취득하실 수 있습니다.',
      recommendReason:
        '취득하신 자격증은 자격기본법 규정에 따라 사단법인 이사장 명의의 공인 자격증서가 발급되며 창업, 취업 및 지자체 지원 사업 시 공신력 있는 공식 이력으로 인정받기 때문입니다.',
      actionTab: 'catalog',
      actionSubTab: 'guide',
      actionLabel: '자격증 검정 및 시험 안내 보기',
    });

    recommendations.push(
      {
        id: 'rec-cert-kfood',
        badge: '온라인 자격',
        badgeColor: 'bg-emerald-600',
        title: '한국음식능력 (K-FOOD) 2급 자격과정',
        desc: '전통 한식 조리 기법과 현대적 플레이팅, 위생 및 글로벌 식문화 표준을 학습하는 국가 등록 민간자격',
        meta: '주관: 농림축산식품부 등록 (사)한국외식창업교육원 | 온라인 4주',
        summaryTip: '온라인 강의 80% 수강 후 모바일/PC로 정기 필기 검정에 응시할 수 있습니다.',
        actionTab: 'catalog',
        actionSubTab: 'courses',
        actionLabel: '과정 상세 보기',
      },
      {
        id: 'rec-cert-consultant',
        badge: '지도사 자격',
        badgeColor: 'bg-blue-700',
        title: '외식창업실무지도사 2급 자격과정',
        desc: '상권분석, 매장 운영관리, 원가회계, 조리 실무를 종합 지도할 수 있는 외식 전문가 양성 코스',
        meta: '주관: (사)한국외식창업교육원 | 온라인 + 실습 하이브리드',
        summaryTip: '소상공인 멘토 및 외식 창업 컨설턴트 취업/활동 시 필수적인 핵심 자격증입니다.',
        actionTab: 'catalog',
        actionSubTab: 'courses',
        actionLabel: '과정 상세 보기',
      }
    );

    followUpQuestions = [
      '외식창업실무지도사 2급 자격증 검정 기준과 시험 일정은?',
      '한국음식능력 K-FOOD 2급 온라인 자격 과정 상세 안내',
      '비전공자 초보자도 민간자격증 시험에 합격할 수 있나요?',
    ];
  }

  // =========================================================================
  // 3. INTENT: 명인·명장 시상식 / 선발 / 추대 / 신청 요건
  // =========================================================================
  else if (
    cq.includes('시상식') ||
    cq.includes('시상') ||
    cq.includes('명인') ||
    cq.includes('명장') ||
    cq.includes('추대') ||
    cq.includes('선발') ||
    cq.includes('포상')
  ) {
    cards.push({
      id: 'sol-award-schedule',
      badge: '연례 정기 공식 행사',
      badgeColor: 'bg-amber-600',
      title: '대한민국 외식 명인·명장 정기 시상식 및 추대 안내',
      analysisInfo:
        '명인·명장 시상식은 연 1회 정기적으로 개최됩니다. 한 해 동안 대한민국 외식 산업 발전과 문화 진흥에 기여한 우수 외식인 및 전문가들을 발굴하여 격려하고 명인·명장으로 공식 추대하는 행사입니다.',
      recommendReason:
        '선발된 명인·명장에게는 교육원 공식 인증패와 증서가 수여되며 교육원 교수진 위촉 및 대외 협력 활동 기회가 제공되기 때문입니다.',
      actionTab: 'master',
      actionSubTab: 'profiles',
      actionLabel: '명인·명장 프로필 & 시상식 보기',
    });

    cards.push({
      id: 'sol-award-process',
      badge: '심사 기준 및 접수',
      badgeColor: 'bg-stone-800',
      title: '명인·명장 자격요건 및 서류 심사 프로세스',
      analysisInfo:
        '오랜 기간 외식 및 조리 분야에서 탁월한 업적과 실무 경력을 쌓아온 전문가들을 대상으로 합니다. 홈페이지 내 [명인·명장] 메뉴의 자격요건을 확인하신 후 심사 서류를 제출해 주시면, 소정의 공정한 심사 기준을 거쳐 최종 선발됩니다.',
      recommendReason:
        '엄격한 경력 검증과 요건 심사를 거쳐 외식업계에서 가장 신뢰받는 명인·명장 타이틀을 획득하실 수 있습니다.',
      actionTab: 'master',
      actionSubTab: 'profiles',
      actionLabel: '명인·명장 신청 안내 확인',
    });

    recommendations.push(
      {
        id: 'rec-master-ahnhyungsang',
        badge: '조리명인·기능장',
        badgeColor: 'bg-amber-600',
        title: '안형상 이사장 (문체부 제8대 조리명인 · 조리기능장)',
        desc: '호텔 조리 실무 40년·강의 경력 20년, 청년상인육성재단 메뉴개발 전담교수, 2026년 소기업소상공인 정책자문위원',
        meta: '직책: 사단법인 이사장 | 전문분야: 한식/외식창업/푸드테크/메뉴개발',
        summaryTip: '수강생 1:1 도제식 전수 및 교육원 자격개발·교육과정 기획 총괄',
        actionTab: 'master',
        actionSubTab: 'profiles',
        actionLabel: '프로필 보기',
      },
      {
        id: 'rec-master-jinikjun',
        badge: '공간명인',
        badgeColor: 'bg-emerald-600',
        title: '진익준 교수 (외식공간기획 / 푸드테크 저자)',
        desc: '국내외 100+ 외식공간 설계·감리, 상권분석 및 매장 동선 최적화 총괄',
        meta: '직책: 수석 컨설턴트/교수 | 전문분야: 공간브랜딩/푸드테크/상권입지',
        summaryTip: '신규 창업 및 노후 매장 턴어라운드 리뉴얼 컨설팅을 직접 지도합니다.',
        actionTab: 'consulting',
        actionSubTab: 'professor',
        actionLabel: '교수 소개 보기',
      }
    );

    followUpQuestions = [
      '명인·명장 시상식 심사 서류와 선발 기준이 궁금해요.',
      '선발된 명인·명장에게 어떤 혜택과 위촉 기회가 주어지나요?',
      '안형상 조리명장님의 주요 약력과 전수 분야를 알려주세요.',
    ];
  }

  // =========================================================================
  // 4. INTENT: 오프라인 교육장 위치 / 주소 / 강의실 / 실습실 / 어디
  // =========================================================================
  else if (
    cq.includes('위치') ||
    cq.includes('어디') ||
    cq.includes('주소') ||
    cq.includes('교육장') ||
    cq.includes('강의실') ||
    cq.includes('실습실') ||
    cq.includes('캐롤라인') ||
    cq.includes('서초동') ||
    cq.includes('교대역') ||
    cq.includes('닥터장') ||
    cq.includes('베이킹랩') ||
    cq.includes('대륭')
  ) {
    cards.push({
      id: 'sol-location-venues',
      badge: '오프라인 공식 교육장',
      badgeColor: 'bg-teal-700',
      title: '이론강의실(교대역) 및 실습강의실(가산) 위치 안내',
      analysisInfo:
        '교육원은 이론강의실과 실습강의실이 분리되어 쾌적하게 운영됩니다.\n\n🏛️ 이론강의실 (교대역):\n캐롤라인대학교 교육장 (서울 서초구 서초대로 334, 브라운스톤 4층 402호, 교대역 1번/5번 출구 도보 3분)\n\n🍳 실습강의실 (가산디지털단지):\n닥터장 베이킹랩 실습장 (서울 금천구 디지털로 130, 남성프라자 2층 214호, 가산디지털단지역 4번/5번 출구 도보 5분)\n\n방문 상담을 원하실 경우 1:1 온라인 문의나 대표전화로 사전 예약 후 방문이 가능합니다.',
      recommendReason:
        '전문적인 외식 경영 세미나와 최신 베이킹/조리 기물이 완비된 전문 실습장을 분리 운영하여 가장 효과적인 실전 교육을 제공하기 때문입니다.',
      actionTab: 'about',
      actionSubTab: 'location',
      actionLabel: '오시는 길 & 약도 보기',
    });

    recommendations.push(
      {
        id: 'rec-loc-caroline',
        badge: '이론강의실',
        badgeColor: 'bg-emerald-600',
        title: '교대역 캐롤라인대학교 강의실 (서초동)',
        desc: '서울 서초구 서초대로 334, 브라운스톤 4층 402호 (교대역 도보 3분)',
        meta: '용도: 외식경영, 상권분석, 프랜차이즈 이론 및 인허가 세미나',
        summaryTip: '대중교통(지하철 2, 3호선 교대역) 접근성이 우수하며 사전 예약 상담이 진행됩니다.',
        actionTab: 'about',
        actionSubTab: 'location',
        actionLabel: '약도 보기',
      },
      {
        id: 'rec-loc-drjang',
        badge: '실습교육장',
        badgeColor: 'bg-amber-600',
        title: '닥터장 베이킹랩 실습 교육장 (가산)',
        desc: '서울 금천구 디지털로 130 남성프라자 2층 214호 (가산디지털단지역 도보 5분)',
        meta: '용도: 시그니처 소스 개발, 제과제빵, 칼 다루기 및 1:1 조리 실습',
        summaryTip: '업소용 오븐, 대형 믹서, 화구 설비가 완비된 최신 실습 공간입니다.',
        actionTab: 'about',
        actionSubTab: 'location',
        actionLabel: '실습장 안내',
      }
    );

    followUpQuestions = [
      '교대역 캐롤라인대학교 이론강의실 찾아가는 길을 알려주세요.',
      '가산 닥터장 베이킹랩 실습장의 조리 설비는 어떻게 갖춰져 있나요?',
      '오프라인 교육장 방문 상담은 어떻게 예약하나요?',
    ];
  }

  // =========================================================================
  // 5. INTENT: 초보자 수강 / 처음 / 요리경험 없는 분
  // =========================================================================
  else if (
    cq.includes('초보') ||
    cq.includes('처음') ||
    cq.includes('경험없는') ||
    cq.includes('경험없') ||
    cq.includes('아무것도') ||
    cq.includes('초심자')
  ) {
    cards.push({
      id: 'sol-beginner-program',
      badge: '초보자 맞춤 코칭',
      badgeColor: 'bg-emerald-600',
      title: '외식 창업 초보자를 위한 1:1 기초 밀착 교육',
      analysisInfo:
        '네, 전혀 걱정하지 않으셔도 됩니다! 외식업 창업을 꿈꾸는 초보자부터 메뉴 개발, 경영 실무, 마케팅까지 체계적인 현장 맞춤형 교육이 준비되어 있으므로 누구나 수강하실 수 있습니다. 기초적인 칼 다루기와 식재료 손질부터 시그니처 메뉴 표준 레시피, 1인 운영 주방 동선 설계, 원가 계산 및 인허가 행정 절차까지 1:1로 지도합니다.',
      recommendReason:
        '실패 원인의 90%는 기본기 부족에서 비롯됩니다. 본원의 도제식 실전 교육은 초보자가 오픈 첫날부터 능숙하게 주방을 운영할 수 있도록 만들어 드립니다.',
      actionTab: 'catalog',
      actionSubTab: 'courses',
      actionLabel: '초보자 맞춤 교육과정 보기',
    });

    recommendations.push(
      {
        id: 'rec-beginner-course',
        badge: '기초부터 실전까지',
        badgeColor: 'bg-emerald-600',
        title: '1:1 도제식 창업 마스터 4주 과정',
        desc: '초보자도 4주 만에 시그니처 메뉴 완성 및 1인 주방 운영이 가능하도록 조리명장이 밀착 코칭',
        meta: '교육방식: 1:1 대면 실습 + 온라인 이론 | 수강생 만족도 98.4%',
        summaryTip: '수강 전 본인이 희망하는 창업 아이템에 맞춘 커스텀 커리큘럼 설계가 지원됩니다.',
        actionTab: 'catalog',
        actionSubTab: 'courses',
        actionLabel: '과정 확인하기',
      }
    );

    followUpQuestions = [
      '요리나 칼 다루는 법을 전혀 몰라도 창업 교육 수강이 가능한가요?',
      '창업 마스터 과정 수강 시 1인 매장 동선도 설계해 주나요?',
      '청년 및 소상공인 정책자금 5천만원 연계 조건이 어떻게 되나요?',
    ];
  }

  // =========================================================================
  // 6. INTENT: 교육원 소개 / 어떤 곳인가요 / 설립 목적
  // =========================================================================
  else if (
    cq.includes('어떤곳') ||
    cq.includes('소개') ||
    cq.includes('교육원') ||
    cq.includes('한국외식창업교육원')
  ) {
    cards.push({
      id: 'sol-about-institute',
      badge: '농림축산식품부 소관 비영리 사단법인',
      badgeColor: 'bg-emerald-700',
      title: '사단법인 한국외식창업교육원 소개',
      analysisInfo:
        '본 교육원은 오랜 현장 실무 경험과 실력을 갖춘 명인, 명장들과 함께 예비 창업자 및 소상공인을 지원하고 전문 외식 인재를 양성하는 전문 교육기관입니다. 체계적인 교육 과정과 컨설팅을 통해 성공적인 외식 창업을 돕고 있습니다.',
      recommendReason:
        '대한민국 조리명장, 외식공간기획 교수진, 10대 공식 협력업체가 원팀이 되어 이론과 실습, 매장 오픈과 사후관리까지 원스톱으로 지원하기 때문입니다.',
      actionTab: 'about',
      actionSubTab: 'greetings',
      actionLabel: '교육원 비전 및 소개 보기',
    });

    recommendations.push(...getDefaultRecommendations());

    followUpQuestions = [
      '사단법인 한국외식창업교육원의 핵심 교수진을 소개해 주세요.',
      '교육원에서 취득할 수 있는 대표 자격증은 무엇인가요?',
      '외식 창업 1:1 컨설팅 진행 절차를 안내해 주세요.',
    ];
  }

  // =========================================================================
  // 7. INTENT: 수강료 / 비용 / 환불 / 금액
  // =========================================================================
  else if (
    cq.includes('수강료') ||
    cq.includes('비용') ||
    cq.includes('가격') ||
    cq.includes('얼마') ||
    cq.includes('환불') ||
    cq.includes('할인')
  ) {
    cards.push({
      id: 'sol-price-tuition',
      badge: '수강료 & 환불 안내',
      badgeColor: 'bg-indigo-700',
      title: '교육과정별 투명한 수강료 체계 및 100% 환불 규정',
      analysisInfo:
        '교육과정별 수강료는 온라인 전문 자격과정(20~26만원대) 및 1:1 도제식 실전 창업 패키지(38~45만원대)로 구성되어 있습니다. 조기 등록 시 10% 얼리버드 및 국비 지원 연계 혜택이 적용됩니다.\n\n• 환불 규정: 개강 전 취소 시 결제 수강료 100% 전액 환불되며, 개강 후에는 평생교육법 기준에 따라 잔여 수업 일수에 비례하여 신속히 환불됩니다.',
      recommendReason:
        '신용카드 무이자 할부(최대 12개월), 간편 결제 및 전자세금계산서/현금영수증 발행을 지원하여 수강생 부담을 덜어드리기 때문입니다.',
      actionTab: 'catalog',
      actionSubTab: 'courses',
      actionLabel: '과정별 수강료 확인',
    });

    recommendations.push(...getDefaultRecommendations().slice(0, 2));

    followUpQuestions = [
      '신용카드 무이자 할부 혜택과 국비 지원 연계가 가능한가요?',
      '개강 후 수강 취소 시 환불 규정은 어떻게 적용되나요?',
      '소상공인 우대 할인 혜택이 적용되는 과정을 알려주세요.',
    ];
  }

  // =========================================================================
  // 8. FALLBACK & GENERAL INQUIRY (Smart Matching through DB courses & FAQ)
  // =========================================================================
  else {
    // 8-A. Search Community Posts & Lecture Materials from DB/Storage
    const matchedPosts = (posts || []).filter((p) => {
      const full = `${p.title || ''} ${p.content || ''} ${p.author || ''} ${p.category || ''} ${p.categoryType || ''}`.toLowerCase();
      return (
        query.split(' ').some((word) => word.length >= 2 && full.includes(word.toLowerCase())) ||
        clean(full).includes(cq)
      );
    });

    // 8-B. Search Courses for keyword hits
    const matchedCourses = courses.filter((c) => {
      const full = `${c.title} ${c.instructor} ${c.desc} ${c.category}`.toLowerCase();
      return (
        query.split(' ').some((word) => full.includes(word.toLowerCase())) ||
        clean(full).includes(cq)
      );
    });

    if (matchedPosts.length > 0) {
      const topPost = matchedPosts[0];
      cards.push({
        id: `sol-post-${topPost.id || Date.now()}`,
        badge: topPost.category || (topPost.categoryType === 'notice' ? '공지사항' : '교육원 자료실'),
        badgeColor: topPost.categoryType === 'notice' ? 'bg-emerald-700' : 'bg-blue-700',
        title: topPost.title,
        analysisInfo: `${topPost.content ? topPost.content.slice(0, 320) + (topPost.content.length > 320 ? '...' : '') : '사단법인 한국외식창업교육원 공식 등록 콘텐츠입니다.'}\n\n• 등록일자: ${topPost.createdAt || topPost.date || '최신'}\n• 작성자: ${topPost.author || '교육원 연구팀'}`,
        recommendReason:
          '질문해 주신 내용과 일치하는 교육원 공식 DB 등록 게시글 및 공지/강의자료 데이터입니다.',
        actionTab: 'community',
        actionSubTab: topPost.categoryType || 'all',
        actionLabel: '원문 게시글 확인하기',
      });

      matchedPosts.slice(0, 3).forEach((p) => {
        recommendations.push({
          id: `rec-post-${p.id || Math.random()}`,
          badge: p.category || '공식 게시글',
          badgeColor: p.categoryType === 'notice' ? 'bg-emerald-600' : 'bg-blue-600',
          title: p.title,
          desc: p.content ? p.content.slice(0, 90) + '...' : '교육원 공식 등록 자료',
          meta: `작성: ${p.author || '교육원'} | 등록: ${p.createdAt || p.date || '최근'}`,
          summaryTip: '홈페이지 커뮤니티 게시판에서 전체 상세 내용 및 첨부파일을 확인하실 수 있습니다.',
          actionTab: 'community',
          actionSubTab: p.categoryType || 'all',
          actionLabel: '게시글 열기',
        });
      });

      followUpQuestions = [
        '해당 공지 및 강의자료에 대한 추가 문의는 어떻게 하나요?',
        '교육원 수강생 전용 자료실 및 실습 교재를 확인할 수 있나요?',
        '1:1 온라인 문의를 통해 담당자 상담을 요청하고 싶어요.',
      ];
    } else if (matchedCourses.length > 0) {
      const topCourse = matchedCourses[0];
      cards.push({
        id: `sol-course-${topCourse.id}`,
        badge: '추천 맞춤 교육과정',
        badgeColor: 'bg-emerald-600',
        title: topCourse.title,
        analysisInfo: `${topCourse.desc || '대한민국 외식 전문 교수진이 지도하는 실전 창업 코스입니다.'}\n\n• 담당 교수: ${topCourse.instructor || '외식 전문 교수진'}\n• 수강료: ${topCourse.tuition || '과정별 상이'}\n• 교육 방식: ${topCourse.format || '온라인 / 오프라인 실습'}`,
        recommendReason:
          '질문해 주신 키워드와 연계된 교육원의 대표 커리큘럼으로, 실무 현장에 즉시 적용 가능한 검증된 과정이기 때문입니다.',
        actionTab: 'catalog',
        actionSubTab: 'courses',
        actionLabel: '해당 교육과정 상세 보기',
      });

      matchedCourses.slice(0, 3).forEach((c) => {
        recommendations.push({
          id: `rec-c-${c.id}`,
          badge: c.category === 'master' ? '마스터 과정' : '자격증 과정',
          badgeColor: c.category === 'master' ? 'bg-amber-600' : 'bg-emerald-600',
          title: c.title,
          desc: c.desc || '체계적인 외식 창업 실무 교육',
          meta: `담당: ${c.instructor || '명인 교수진'} | 수강료: ${c.tuition || '안내 참조'}`,
          summaryTip: '수료 시 농림축산식품부 등록 민간자격 및 공식 수료증 발급',
          actionTab: 'catalog',
          actionSubTab: 'courses',
          actionLabel: '과정 확인',
        });
      });

      followUpQuestions = [
        '해당 교육과정의 상세 주차별 커리큘럼을 확인할 수 있나요?',
        '온라인 자율 수강과 오프라인 실습 일정은 어떻게 되나요?',
        '수강 신청 후 결제 방법 및 할인 혜택을 알려주세요.',
      ];
    } else {
      // General informative card bridging to 1:1 consultation
      cards.push({
        id: 'sol-general-consult',
        badge: '24시 전문 상담 연계',
        badgeColor: 'bg-stone-800',
        title: `'${query}' 관련 교육원 전문 맞춤 안내`,
        analysisInfo:
          '질문해 주신 내용에 대해 교육원 공식 지식 데이터베이스를 바탕으로 1차 검토되었습니다. 수강생의 현재 상황(창업 준비 단계, 예산, 아이템, 매장 위치 등)에 맞추어 가장 알맞은 교육과정 및 1:1 컨설팅 일정을 배정해 드립니다.',
        recommendReason:
          '외식 창업은 개인별 상권과 메뉴 특성이 다르므로 담당 명장 및 컨설턴트와의 1:1 심층 상담을 통해 성공 확률을 극대화할 수 있기 때문입니다.',
        actionTab: 'community',
        actionSubTab: 'inquiry',
        actionLabel: '1:1 온라인 상담 남기기',
      });

      recommendations.push(...getDefaultRecommendations());

      followUpQuestions = [
        '창업 컨설팅을 받고싶어',
        '취득 가능한 자격증 종류 알려줘',
        '명인·명장 시상식은 언제 개최되나요?',
      ];
    }
  }

  if (!followUpQuestions || !followUpQuestions.length) {
    followUpQuestions = [
      '창업 컨설팅을 받고싶어',
      '취득 가능한 자격증 종류 알려줘',
      '명인·명장 시상식은 언제 개최되나요?',
    ];
  }

  return {
    query,
    cards,
    recommendations,
    followUpQuestions,
  };
}

export function getDefaultRecommendations() {
  return [
    {
      id: 'rec-def-jin',
      badge: '외식 공간 컨설팅',
      badgeColor: 'bg-emerald-600',
      title: '진익준 교수 외식 공간 & 경영 컨설팅',
      desc: '상권 빅데이터 분석, 파사드 브랜드 디자인, 푸드테크 주방 동선 최적화 맞춤 솔루션',
      meta: '제공: 진익준 교수 연구팀 | 대상: 신규 창업 및 기존 매장 리뉴얼',
      summaryTip: '사전 상담 접수 시 매장 평수, 주소, 메뉴 컨셉을 기재하시면 빠른 1차 진단이 진행됩니다.',
      actionTab: 'consulting',
      actionSubTab: 'professor',
      actionLabel: '1:1 컨설팅 신청',
    },
    {
      id: 'rec-def-master',
      badge: '조리명인·기능장',
      badgeColor: 'bg-amber-600',
      title: '1:1 도제식 창업 마스터 실전 패키지',
      desc: '40년 안형상 조리명인·기능장 특제 소스 레시피 전수 및 1인 주방 오퍼레이션 완성 4주 집중 코스',
      meta: '담당: 안형상 이사장 외 명인 교수진 | 장소: 가산 닥터장 베이킹랩 실습장',
      summaryTip: '수강생 매장 메뉴 콘셉트에 맞춘 커스텀 레시피와 주방 기물 도면이 지원됩니다.',
      actionTab: 'catalog',
      actionSubTab: 'courses',
      actionLabel: '과정 상세 보기',
    },
    {
      id: 'rec-def-cert',
      badge: '국가등록 민간자격',
      badgeColor: 'bg-blue-700',
      title: '외식창업실무지도사 / K-FOOD 자격과정',
      desc: '농림축산식품부 등록 공인 민간자격증 취득으로 창업 및 지자체 지원사업 공신력 확보',
      meta: '온라인 4주 자율 수강 + 정기 필기/실기 검정 | 사단법인 이사장 명의 증서',
      summaryTip: '온라인 강의 80% 이상 이수 시 시험 응시 자격이 주어집니다.',
      actionTab: 'catalog',
      actionSubTab: 'guide',
      actionLabel: '자격증 검정 안내',
    },
  ];
}
