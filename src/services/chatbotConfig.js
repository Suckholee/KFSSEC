// Central Chatbot & 1:1 AI Inquiry Configuration Store
import { readSharedContent, saveSharedContent } from './contentApi.js';

export const CHATBOT_UPDATE_EVENT = 'kfssec_chatbot_config_updated';

export const DEFAULT_CHATBOT_CONFIG = {
  enabled: true,
  botName: '한국외식창업교육원 AI 도우미',
  welcomeMessage: '안녕하세요! (사)한국외식창업교육원 24시 AI 상담 도우미입니다. 무엇이 궁금하신가요? 아래 추천 질문을 선택하시거나 궁금한 점을 직접 입력해 주세요.',
  nudgeMessage: '💬 24시간 실시간 AI 상담 운영 중! 외식창업·자격증 무엇이든 물어보세요.',
  nudgeDelaySeconds: 2,
  autoReplyAiDraft: true,
  quickButtons: [
    {
      id: 'about',
      label: '🏛️ 교육원 소개 & 어떤 곳인가요?',
      reply: '사단법인 한국외식창업교육원은 오랜 현장 실무 경험과 실력을 갖춘 명인, 명장들과 함께 예비 창업자 및 소상공인을 지원하고 전문 외식 인재를 양성하는 전문 교육기관입니다. 체계적인 교육 과정과 컨설팅을 통해 성공적인 외식 창업을 돕고 있습니다.',
      actionTab: 'about',
      actionSubTab: 'greetings',
      actionLabel: '교육원 소개 보기',
    },
    {
      id: 'cert',
      label: '📜 취득 가능 자격증은 무엇이 있나요?',
      reply: '농림축산식품부 허가를 받은 다양한 전문 자격증 과정을 운영하고 있습니다. 대표적으로 K-FOOD 자격증, 외식지도사(1, 2급), 외식창업실무지도사(1, 2급), 명인민간자격증, 소믈리에파티컨설턴트, 푸드테크설계사 자격증 등이 있습니다.',
      actionTab: 'catalog',
      actionSubTab: 'guide',
      actionLabel: '자격증 검정 안내 보기',
    },
    {
      id: 'award',
      label: '🏆 명인·명장 시상식 & 신청 방법은?',
      reply: '명인·명장 시상식은 연 1회 정기적으로 개최되며 대한민국 외식 산업 발전에 기여한 우수 전문가들을 발굴해 추대합니다. 오랜 경력과 업적을 갖춘 분들을 대상으로 소정의 서류 심사를 거쳐 최종 선발됩니다.',
      actionTab: 'master',
      actionSubTab: 'profiles',
      actionLabel: '명인·명장 시상식 안내 보기',
    },
    {
      id: 'jin',
      label: '📐 진익준 교수 외식 컨설팅 안내',
      reply: '진익준 교수의 컨설팅은 단순 인테리어를 넘어 [상권 분석 + 브랜드 입지 전략 + 효율적인 주방/매장 동선 시스템 + 공간 브랜딩]을 종합 기획하여 실질적인 매출 상승과 오퍼레이션 효율화를 제공합니다. 기존 매장 리뉴얼도 가능합니다.',
      actionTab: 'consulting',
      actionSubTab: 'professor',
      actionLabel: '진익준 교수 컨설팅 페이지',
    },
    {
      id: 'location',
      label: '📍 오프라인 교육장 위치가 어디인가요?',
      reply: '이론강의실과 실습강의실이 따로 운영되고 있습니다.\n• 이론강의실 (교대역): 캐롤라인대학교 강의실 (서초구 서초동 1666-13, 지제이빌딩 5층)\n• 실습강의실: 닥터장 베이킹랩 교육장 (금천구 대륭테크노타운 8차 5층 503호)',
      actionTab: 'about',
      actionSubTab: 'location',
      actionLabel: '오시는 길 & 약도 보기',
    },
    {
      id: 'beginner',
      label: '🔰 초보자도 창업 교육을 받을 수 있나요?',
      reply: '네, 물론입니다! 외식업 창업을 꿈꾸는 초보자부터 메뉴 개발, 경영 실무, 마케팅까지 체계적인 현장 맞춤형 교육이 준비되어 있으므로 누구나 수강하실 수 있습니다.',
      actionTab: 'catalog',
      actionSubTab: 'courses',
      actionLabel: '맞춤 교육과정 보기',
    },
  ],
  faqRules: [
    {
      id: 'faq-about',
      title: '한국외식창업교육원 소개',
      keywords: [
        '어떤 곳', '어떤곳', '한국외식창업교육원', '교육원 소개', '소개', '설립', '기관',
        'about', 'institute', '教育院', '紹介', '介绍', '机构'
      ],
      reply: '사단법인 한국외식창업교육원은 오랜 현장 실무 경험과 실력을 갖춘 명인, 명장들과 함께 예비 창업자 및 소상공인을 지원하고 전문 외식 인재를 양성하는 전문 교육기관입니다. 체계적인 교육 과정과 컨설팅을 통해 성공적인 외식 창업을 돕고 있습니다.',
      actionTab: 'about',
      actionSubTab: 'greetings',
      actionLabel: '교육원 소개 보기',
    },
    {
      id: 'faq-cert',
      title: '취득 가능 자격증 안내',
      keywords: [
        '자격증', 'k-food', 'kfood', '외식지도사', '외식창업실무지도사', '외식창업실무사', '명인민간자격증', '소믈리에', '푸드테크', '취득',
        'cert', 'license', 'qualification', '資格', '資格証', '证书', '资格证'
      ],
      reply: '농림축산식품부 허가를 받은 다양한 전문 자격증 과정을 운영하고 있습니다. 대표적으로 K-FOOD 자격증, 외식지도사(1, 2급), 외식창업실무지도사(1, 2급), 명인민간자격증, 소믈리에파티컨설턴트, 푸드테크설계사 자격증 등이 있습니다.',
      actionTab: 'catalog',
      actionSubTab: 'guide',
      actionLabel: '자격증 검정 안내 보기',
    },
    {
      id: 'faq-award-schedule',
      title: '명인·명장 시상식 개최 일정',
      keywords: [
        '시상식', '시상식 언제', '명인 시상식', '명장 시상식', '명인명장 시상식', '추대', '개최',
        'award', 'ceremony', '授賞式', '颁奖'
      ],
      reply: '명인·명장 시상식은 연 1회 정기적으로 개최됩니다. 한 해 동안 대한민국 외식 산업 발전과 문화 진흥에 기여한 우수 외식인 및 전문가들을 발굴하여 격려하고 명인·명장으로 추대하는 공식 행사입니다.',
      actionTab: 'master',
      actionSubTab: 'profiles',
      actionLabel: '명인·명장 시상식 안내 보기',
    },
    {
      id: 'faq-award-apply',
      title: '명인·명장 자격요건 및 신청 프로세스',
      keywords: [
        '명인 신청', '명장 신청', '자격요건', '신청 프로세스', '심사 서류', '선발', '명인 요건', '명장 요건', '심사 기준'
      ],
      reply: '오랜 기간 외식 및 조리 분야에서 탁월한 업적과 실무 경력을 쌓아온 전문가들을 대상으로 합니다. 홈페이지 내 [명인·명장] 메뉴의 자격요건을 확인하신 후 심사 서류를 제출해 주시면, 소정의 심사 기준을 거쳐 최종 선발됩니다.',
      actionTab: 'master',
      actionSubTab: 'profiles',
      actionLabel: '명인·명장 자격요건 확인',
    },
    {
      id: 'faq-beginner',
      title: '초보자 외식 창업 수강 가능 여부',
      keywords: [
        '초보자', '초보', '경험 없는', '경험없', '처음', '창업 경험', '요리 경험', '누구나',
        'beginner', '初心者', '小白', '初学者'
      ],
      reply: '네, 물론입니다. 외식업 창업을 꿈꾸는 초보자부터 메뉴 개발, 경영 실무, 마케팅까지 체계적인 현장 맞춤형 교육이 준비되어 있으므로 누구나 수강하실 수 있습니다.',
      actionTab: 'catalog',
      actionSubTab: 'courses',
      actionLabel: '맞춤 교육과정 보기',
    },
    {
      id: 'faq-consulting-general',
      title: '외식 창업 컨설팅 진행 방식',
      keywords: [
        '창업 컨설팅', '컨설팅 방식', '컨설팅 진행', '어떤 방식', '아이템 분석', '상권 분석', '점포 계약', '종합 컨설팅'
      ],
      reply: '예비 창업자의 아이템 분석, 상권 분석, 점포 계약 및 인테리어, 메뉴 선정부터 사후 경영 노하우까지 성공적인 창업을 위한 1:1 맞춤형 종합 컨설팅을 제공하고 있습니다.',
      actionTab: 'consulting',
      actionSubTab: 'roadmap',
      actionLabel: '창업 컨설팅 로드맵 보기',
    },
    {
      id: 'faq-after-service',
      title: '수료 후 사후 관리 및 지원 혜택',
      keywords: [
        '사후 관리', '사후관리', '수료 후', '수료후', '지원 혜택', '사후 지원', '네트워크', '협력업체 연계', '자문'
      ],
      reply: '수료 후에도 지속적인 네트워크 형성을 위한 명인명장 협력업체 연계, 정보 공유, 자문 등 다양한 사후 지원 프로그램을 운영하여 성공적인 사업 유지를 돕고 있습니다.',
      actionTab: 'partners',
      actionSubTab: 'all',
      actionLabel: '협력업체 및 사후지원 보기',
    },
    {
      id: 'faq-application',
      title: '수강 신청 및 카카오톡 상담',
      keywords: [
        '수강 신청', '수강신청', '상담', '카카오톡', '카톡', '신청 방법', '어떻게 신청', '상담 방법',
        'apply', 'contact', 'consult', '申込み', '报名'
      ],
      reply: '홈페이지 내 [교육과정] 메뉴에서 온라인으로 간편하게 신청하실 수 있습니다. 또한, 카카오톡 채널을 통해서도 실시간 1:1 상담 및 문의가 가능합니다.',
      actionTab: 'community',
      actionSubTab: 'inquiry',
      actionLabel: '1:1 문의 & 상담 신청',
    },
    {
      id: 'faq-location',
      title: '오프라인 교육장 위치 및 방문 상담',
      keywords: [
        '교육장', '위치', '강의실', '실습실', '어디', '주소', '캐롤라인', '서초동', '교대역', '닥터장', '베이킹랩', '대륭테크노타운', '오프라인', '방문 상담',
        'location', 'address', 'where', '場所', '位置', '地址'
      ],
      reply: '이론강의실과 실습강의실이 따로 운영되고 있습니다.\n• 이론강의실 (교대역): 캐롤라인대학교 강의실 (서울 서초구 서초동 1666-13, 지제이빌딩 5층)\n• 실습강의실: 닥터장 베이킹랩 교육장 (서울 금천구 대륭테크노타운 8차 5층 503호)\n방문 상담을 원하실 경우 사전에 1:1 온라인 문의 또는 대표전화로 예약해 주시기 바랍니다.',
      actionTab: 'about',
      actionSubTab: 'location',
      actionLabel: '오시는 길 & 약도 보기',
    },
    {
      id: 'faq-curriculum',
      title: '교육 일정 및 커리큘럼 상세 자료',
      keywords: [
        '커리큘럼', '교육 일정', '상세 자료', '일정', '자료', '과목별', '시간표',
        'curriculum', 'schedule', 'カリキュラム', '日程', '课程表'
      ],
      reply: '홈페이지의 교육과정 페이지에서 각 과목별 상세 커리큘럼을 확인하실 수 있으며, 추가적인 자료나 궁금한 사항은 교육원 사무국(010-7244-6796)으로 문의해 주시면 친절하게 안내해 드립니다.',
      actionTab: 'catalog',
      actionSubTab: 'courses',
      actionLabel: '교육과정 상세 커리큘럼',
    },
    {
      id: 'faq-jin-diff',
      title: '진익준 교수의 외식 컨설팅 차별점',
      keywords: [
        '진익준', '진익준 교수', '차별점', '기존 컨설팅', '기존 컨설팅과', '외식공간', '공간 브랜딩', '동선 시스템'
      ],
      reply: '단순히 인테리어 디자인에만 치중하지 않습니다. 국내외 수많은 외식공간 설계·감리 경험과 학술적 연구를 바탕으로 [상권 분석 + 브랜드 입지 전략 + 효율적인 주방/매장 동선 시스템 + 공간 브랜딩]을 종합적으로 기획하여 실질적인 매출 상승과 오퍼레이션 효율화를 이끌어내는 맞춤형 공간/경영 컨설팅을 제공합니다.',
      actionTab: 'consulting',
      actionSubTab: 'professor',
      actionLabel: '진익준 교수 프로필 및 사례',
    },
    {
      id: 'faq-jin-renewal',
      title: '기존 매장 리뉴얼 및 경영 개선 컨설팅',
      keywords: [
        '리뉴얼', '매장 리뉴얼', '경영 개선', '기존 매장', '리모델링', '동선 재배치', '노후', '주방 개선'
      ],
      reply: '네, 가능합니다. 노후화되거나 효율이 떨어진 기존 매장의 동선 재배치, 주방 시스템 개선(푸드테크 적용 등), 브랜드 리뉴얼 컨설팅을 전문적으로 진행합니다. 상권 환경과 고객 타겟 분석을 거쳐 최소 비용으로 최대 효과를 낼 수 있는 리모델링 및 경영 개선 방안을 제시해 드립니다.',
      actionTab: 'consulting',
      actionSubTab: 'professor',
      actionLabel: '진익준 교수 1:1 컨설팅 문의',
    },
    {
      id: 'faq-jin-process',
      title: '컨설팅 진행 절차 및 준비 자료',
      keywords: [
        '컨설팅 절차', '준비 자료', '진행 절차', '준비해야 할', '사전 상담', '현장 조사', '컨설팅 신청', '자료는 무엇'
      ],
      reply: '온라인/전화 문의 접수 후 사전 상담을 진행하며, [매장 입지(주소) 및 평수 / 현재(예정) 메뉴 컨셉 / 예산 범위 / 주요 고민사항]을 작성해 주시면 더욱 신속하고 정확한 진단이 가능합니다. 이후 사전 현장 조사 및 면담을 통해 단계별 컨설팅 범위와 일정을 확정하게 됩니다.',
      actionTab: 'consulting',
      actionSubTab: 'professor',
      actionLabel: '컨설팅 문의 남기기',
    },
    {
      id: 'faq-price',
      title: '수강료 및 결제/할인 안내',
      keywords: [
        '수강료', '비용', '가격', '얼마', '결제', '할인', '카드', '할부', '금액',
        'price', 'tuition', 'fee', 'cost', 'pay', 'discount',
        '受講料', '費用', '価格', 'いくら', '決済', '割引', 'カード',
        '学费', '费用', '价格', '多少钱', '支付', '优惠', '折扣'
      ],
      reply: '교육과정별 수강료는 온라인 자격과정(20~26만원대) 및 1:1 실전 창업 패키지(38~45만원대)로 구성되어 있습니다. 조기 등록 시 10% 얼리버드 및 국비 지원 연계 혜택이 적용됩니다.',
      actionTab: 'catalog',
      actionSubTab: 'courses',
      actionLabel: '교육과정 & 수강료 확인',
    },
    {
      id: 'faq-refund',
      title: '환불 및 수강 취소 규정',
      keywords: [
        '환불', '취소', '중도해지', '반환', '환불규정',
        'refund', 'cancel', 'return',
        '返金', 'キャンセル', '中途解約', '払い戻し',
        '退款', '取消', '退费'
      ],
      reply: '개강 전 취소 시 결제하신 수강료 전액이 100% 환불되며, 개강 후에는 평생교육법 및 학원법 환불 기준에 따라 잔여 수업 일수에 비례하여 신속히 환불 처리됩니다.',
      actionTab: 'catalog',
      actionSubTab: 'courses',
      actionLabel: '환불 규정 상세 보기',
    },
    {
      id: 'faq-gov',
      title: '정부지원금 및 청년 창업',
      keywords: [
        '정부지원', '국비', '청년', '지원금', '소상공인', '정책자금', '5천만원', '지원사업',
        'subsidy', 'grant', 'youth', 'government', 'funding',
        '政府支援', '国費', '青年', '支援金', '小規模事業者', '政策資金',
        '政府补贴', '政策扶持', '资金', '青年创业', '小微商户'
      ],
      reply: '만 39세 이하 청년 외식창업자 및 소상공인을 대상으로 최대 5,000만원 한도의 정부지원금 연계 창업 교육 및 사업계획서 1:1 맞춤 컨설팅을 지원해 드립니다.',
      actionTab: 'consulting',
      actionSubTab: 'apply',
      actionLabel: '정부지원 컨설팅 신청',
    },
  ],
  fallbackReply: '질문해 주신 내용에 대해 담당 전문 컨설턴트의 1:1 심층 상담이 필요합니다. 아래 [1:1 문의 게시판 남기기] 버튼을 누르시면 교육원에서 영업일 기준 신속히 전화 및 온라인으로 맞춤 안내를 드립니다.',
};

let cachedConfig = null;

export function getChatbotConfig() {
  return cachedConfig || DEFAULT_CHATBOT_CONFIG;
}

export async function loadChatbotConfig() {
  const remote = await readSharedContent('chatbot');
  cachedConfig = remote ? { ...DEFAULT_CHATBOT_CONFIG, ...remote } : DEFAULT_CHATBOT_CONFIG;
  window.dispatchEvent(new CustomEvent(CHATBOT_UPDATE_EVENT, { detail: cachedConfig }));
  return cachedConfig;
}

export async function saveChatbotConfig(newConfig) {
  cachedConfig = await saveSharedContent('chatbot', newConfig);
  window.dispatchEvent(new CustomEvent(CHATBOT_UPDATE_EVENT, { detail: cachedConfig }));
  return cachedConfig;
}

export async function resetChatbotConfig() {
  return saveChatbotConfig(DEFAULT_CHATBOT_CONFIG);
}

// Match user question against FAQ keywords
export function findBotAnswer(userInput, config = null) {
  const currentConfig = config || getChatbotConfig();
  const trimmed = (userInput || '').trim().toLowerCase();

  if (!trimmed) {
    return {
      text: '궁금하신 질문을 입력해 주시거나 아래 추천 질문 버튼을 눌러주세요!',
    };
  }

  // Check custom FAQ rules (including newly added multilingual keywords)
  for (const rule of currentConfig.faqRules || []) {
    const hasMatch = (rule.keywords || []).some((kw) =>
      trimmed.includes(kw.toLowerCase().trim())
    );
    if (hasMatch) {
      return {
        text: rule.reply,
        targetTab: rule.actionTab,
        targetSub: rule.actionSubTab,
        actionLabel: rule.actionLabel,
      };
    }
  }

  // Check quick buttons label matching
  for (const q of currentConfig.quickButtons || []) {
    if (trimmed.includes(q.label.toLowerCase()) || q.label.toLowerCase().includes(trimmed)) {
      return {
        text: q.reply,
        targetTab: q.actionTab,
        targetSub: q.actionSubTab,
        actionLabel: q.actionLabel,
      };
    }
  }

  // Fallback response with bridge to 1:1 Inquiry Board
  return {
    text: currentConfig.fallbackReply,
    targetTab: 'community',
    targetSub: 'inquiry',
    actionLabel: '⚡ 1:1 AI 문의 게시판으로 남기기',
    isFallback: true,
  };
}

// AI Instant Preliminary Inquiry Generator for Community 1:1 Inquiries
export function generateAIInquiryDraft(title = '', content = '') {
  const fullText = `${title} ${content}`.toLowerCase();

  let advice = '';
  if (fullText.includes('시상식') || fullText.includes('명인') || fullText.includes('명장') || fullText.includes('추대')) {
    advice = '명인·명장 시상식은 연 1회 정기 개최되며, 대한민국 외식 산업 발전에 기여한 우수 전문가를 선발하여 추대합니다. 오랜 경력과 업적을 갖춘 전문가분들은 [명인·명장] 메뉴의 자격요건을 확인하신 후 심사 서류를 접수하실 수 있습니다.';
  } else if (fullText.includes('진익준') || fullText.includes('리뉴얼') || fullText.includes('매장 개선') || fullText.includes('공간')) {
    advice = '진익준 교수의 외식 컨설팅은 단순 인테리어를 넘어 [상권 분석 + 브랜드 입지 전략 + 주방/매장 동선 최적화 + 공간 브랜딩]을 종합 기획합니다. 기존 매장의 리뉴얼이나 푸드테크 주방 개선 컨설팅도 활발히 진행 중입니다.';
  } else if (fullText.includes('위치') || fullText.includes('교육장') || fullText.includes('강의실') || fullText.includes('캐롤라인') || fullText.includes('닥터장')) {
    advice = '교육원은 이론강의실(교대역 캐롤라인대학교 강의실: 서초구 서초동 1666-13 지제이빌딩 5층)과 실습강의실(가산 닥터장 베이킹랩: 금천구 대륭테크노타운 8차 5층 503호)로 나뉘어 운영됩니다. 방문 상담은 사전 예약제로 진행됩니다.';
  } else if (fullText.includes('초보') || fullText.includes('경험') || fullText.includes('처음')) {
    advice = '외식창업이 처음이신 초보자분들도 메뉴 개발부터 주방 동선, 매장 경영 실무, 마케팅까지 기초부터 단계별 1:1 맞춤 교육을 수강하실 수 있으므로 안심하고 시작하실 수 있습니다.';
  } else if (fullText.includes('정부지원') || fullText.includes('청년') || fullText.includes('지원금') || fullText.includes('정책자금')) {
    advice = '현재 만 39세 이하 청년 창업자 대상 최대 5,000만원 정책지원금 연계 트랙이 개설되어 있습니다. 사업계획서 기본 양식은 마이페이지 자료실에서 다운로드 가능하며, 담당 컨설턴트가 1:1 대면/유선으로 지원 자격 심사를 검토해 드립니다.';
  } else if (fullText.includes('자격증') || fullText.includes('시험') || fullText.includes('지도사') || fullText.includes('실무사') || fullText.includes('k-food')) {
    advice = '외식지도사, 외식창업실무지도사(1, 2급), K-FOOD 자격증, 소믈리에파티컨설턴트 등 농림축산식품부 등록 민간자격증 과정을 운영하고 있으며, 정기 검정을 통해 공인 자격을 취득하실 수 있습니다.';
  } else if (fullText.includes('레시피') || fullText.includes('소스') || fullText.includes('한식') || fullText.includes('카페')) {
    advice = '대한민국 조리명장 안형상 이사장님 및 명장·명인 교수진이 직접 전수하는 1:1 도제식 실습 코칭으로 진행됩니다. 수강생 매장의 메뉴 콘셉트와 주방 설비에 맞춘 커스텀 레시피 조정이 가능합니다.';
  } else if (fullText.includes('수강료') || fullText.includes('비용') || fullText.includes('환불') || fullText.includes('할인')) {
    advice = '과정별 수강료는 온라인 자격과정부터 1:1 도제식 창업 마스터 패키지까지 다양하며, 조기 등록 얼리버드 및 수강생 우대 할인이 적용됩니다. 개강 전 취소 시 100% 전액 환불됩니다.';
  } else {
    advice = '질문해 주신 외식 창업 및 교육과정 관련 세부 요건을 교육원 상담실에서 확인 중입니다. 맞춤형 커리큘럼 추천 및 입학 절차 안내를 위해 전문 상담사가 추가 답변을 드릴 예정입니다.';
  }

  return `[사단법인 한국외식창업교육원 24시 AI 상담 실장 즉각 사전 답변]\n\n안녕하세요, 질문해 주신 내용에 대해 AI 사전 검토 결과를 먼저 안내드립니다.\n\n💡 핵심 안내:\n${advice}\n\n📞 본 답변은 AI 실시간 안내이며, 보다 정확한 안내 및 일정 확정을 위해 교육원 행정실 및 담당 명장 컨설턴트가 영업일 기준 순차적으로 확인 후 정식 답변을 보완해 드립니다. 급하신 문의는 대표전화(010-7244-6796)로 연락 주시면 즉시 안내받으실 수 있습니다.`;
}
