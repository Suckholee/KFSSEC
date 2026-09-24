// Central Chatbot & 1:1 AI Inquiry Configuration Store
const STORAGE_KEY = 'kfssec_chatbot_config';

export const DEFAULT_CHATBOT_CONFIG = {
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
      reply: '40년 경력의 안형상 이사장님을 비롯한 대한민국 조리 명장·명인 사업단에서 특제 비법 레시피와 매장 경영 노하우를 직접 전수합니다.',
      actionTab: 'master',
      actionSubTab: 'masters',
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
  ],
  fallbackReply: '질문해 주신 내용에 대해 담당 전문 컨설턴트의 1:1 심층 상담이 필요합니다. 아래 [1:1 문의 게시판 남기기] 버튼을 누르시면 교육원에서 영업일 기준 신속히 전화 및 온라인으로 맞춤 안내를 드립니다.',
};

// Retrieve config from localStorage with fallback
export function getChatbotConfig() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return { ...DEFAULT_CHATBOT_CONFIG, ...parsed };
    }
  } catch (e) {
    console.error('Failed to load chatbot config:', e);
  }
  return DEFAULT_CHATBOT_CONFIG;
}

// Save config and notify listeners
export function saveChatbotConfig(newConfig) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newConfig));
    window.dispatchEvent(new CustomEvent('kfssec_chatbot_config_updated', { detail: newConfig }));
    return true;
  } catch (e) {
    console.error('Failed to save chatbot config:', e);
    return false;
  }
}

// Reset to factory defaults
export function resetChatbotConfig() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new CustomEvent('kfssec_chatbot_config_updated', { detail: DEFAULT_CHATBOT_CONFIG }));
    return DEFAULT_CHATBOT_CONFIG;
  } catch (e) {
    console.error('Failed to reset chatbot config:', e);
    return DEFAULT_CHATBOT_CONFIG;
  }
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

  // Check custom FAQ rules
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
  if (fullText.includes('정부지원') || fullText.includes('청년') || fullText.includes('지원금') || fullText.includes('정책자금')) {
    advice = '현재 만 39세 이하 청년 창업자 대상 최대 5,000만원 정책지원금 연계 트랙이 개설되어 있습니다. 사업계획서 기본 양식은 마이페이지 자료실에서 다운로드 가능하며, 담당 컨설턴트가 1:1 대면/유선으로 지원 자격 심사를 검토해 드립니다.';
  } else if (fullText.includes('자격증') || fullText.includes('시험') || fullText.includes('지도사') || fullText.includes('실무사')) {
    advice = '외식창업지도사/실무사 2급 자격 과정은 4주 온라인 강의(진도율 80% 이상) 이수 시 정기 자격 검정 응시가 가능합니다. 합격 시 농림축산식품부 등록 민간자격증이 발급됩니다.';
  } else if (fullText.includes('레시피') || fullText.includes('명장') || fullText.includes('소스') || fullText.includes('한식') || fullText.includes('카페')) {
    advice = '대한민국 조리명장 안형상 이사장님 및 명인 사업단이 직접 전수하는 1:1 도제식 실습 코칭으로 진행됩니다. 수강생 매장의 메뉴 콘셉트와 주방 설비에 맞춘 커스텀 레시피 조정이 가능합니다.';
  } else if (fullText.includes('수강료') || fullText.includes('비용') || fullText.includes('환불') || fullText.includes('할인')) {
    advice = '과정별 수강료는 20만원대~40만원대 패키지로 다양하며, 조기 등록 얼리버드 및 수강생 우대 할인이 적용됩니다. 개강 전 취소 시 100% 전액 환불됩니다.';
  } else {
    advice = '질문해 주신 외식 창업 및 교육과정 관련 세부 요건을 교육원 사무국에서 확인 중입니다. 맞춤형 커리큘럼 추천 및 입학 절차 안내를 위해 전문 상담사가 추가 답변을 드릴 예정입니다.';
  }

  return `[사단법인 한국외식창업교육원 24시 AI 상담 실장 즉각 사전 답변]\n\n안녕하세요, 질문해 주신 내용에 대해 AI 사전 검토 결과를 먼저 안내드립니다.\n\n💡 핵심 안내:\n${advice}\n\n📞 본 답변은 AI 실시간 안내이며, 보다 정확한 안내 및 일정 확정을 위해 교육원 행정실 및 담당 명장 컨설턴트가 영업일 기준 순차적으로 확인 후 정식 답변을 보완해 드립니다. 급하신 문의는 대표전화(010-7244-6796)로 연락 주시면 즉시 안내받으실 수 있습니다.`;
}
