import { useLanguage } from '../../i18n/LanguageContext';
import React, { useState, useEffect } from 'react';
import SubSidebar from '../common/SubSidebar';
import { MessageSquare, Bell, Image, Trophy, HelpCircle, PenSquare, Search, Eye, Calendar, User, ChevronRight, X, Lock, Pin, ShieldCheck, CheckCircle2, Clock, Send, FileText, Bot, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import ScrollReveal from '../common/ScrollReveal';
import SectorBlock from '../Admin/InlineEditor/SectorBlock';

export default function CommunityPage({ initialTab = 'all', onOpenAuth, isUserLoggedIn, onGoToEditor, postsList = [], setPostsList }) {
  const { tr, language } = useLanguage();
  const [activeTab, setActiveTab] = useState(initialTab);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    const openLinkedPost = () => {
      const id = new URL(window.location.href).searchParams.get('post');
      const post = postsList.find(item => String(item.id) === id && item.categoryType !== 'inquiry' && item.category !== '문의');
      if (post) setSelectedPost(post);
    };
    openLinkedPost();
    window.addEventListener('popstate', openLinkedPost);
    return () => window.removeEventListener('popstate', openLinkedPost);
  }, [postsList]);

  // Close post modal on Escape key press
  useEffect(() => {
    if (!selectedPost) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedPost(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPost]);


  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  const [expandedFaqId, setExpandedFaqId] = useState(1);
  const [faqCategoryFilter, setFaqCategoryFilter] = useState('all');

  const communitySubItems = [
    { id: 'all', label: tr('전체 게시판') },
    { id: 'notice', label: tr('공지사항') },
    { id: 'faq', label: tr('주요문의 (FAQ)') },
    { id: 'inquiry', label: tr('1:1 AI 상담 & 문의') },
  ];

  const faqList = [
    {
      id: 1,
      category: '교육원 소개',
      group: 'institute',
      q: '한국외식창업교육원은 어떤 곳인가요?',
      a: '본 교육원은 오랜 현장 실무 경험과 실력을 갖춘 명인, 명장들과 함께 예비 창업자 및 소상공인을 지원하고 전문 외식 인재를 양성하는 전문 교육기관입니다. 체계적인 교육 과정과 컨설팅을 통해 성공적인 외식 창업을 돕고 있습니다.',
    },
    {
      id: 2,
      category: '취득 자격증',
      group: 'certificate',
      q: '교육원에서 취득할 수 있는 자격증은 어떤 것이 있나요?',
      a: '농림축산식품부 허가를 받은 다양한 전문 자격증 과정을 운영하고 있습니다. 대표적으로 K-FOOD 자격증, 외식지도사(1, 2급), 외식창업실무지도사(1, 2급), 명인민간자격증, 소믈리에파티컨설턴트, 푸드테크설계사 자격증 등이 있습니다.',
    },
    {
      id: 3,
      category: '명인·명장 시상식',
      group: 'award',
      q: '명인·명장 시상식은 언제 개최되나요?',
      a: '명인·명장 시상식은 연 1회 정기적으로 개최됩니다. 한 해 동안 대한민국 외식 산업 발전과 문화 진흥에 기여한 우수 외식인 및 전문가들을 발굴하여 격려하고 명인·명장으로 추대하는 공식 행사입니다.',
    },
    {
      id: 4,
      category: '명인·명장 선발',
      group: 'award',
      q: '명인·명장 자격요건 및 신청 프로세스는 어떻게 되나요?',
      a: '오랜 기간 외식 및 조리 분야에서 탁월한 업적과 실무 경력을 쌓아온 전문가들을 대상으로 합니다. 홈페이지 내 [명인·명장] 메뉴의 자격요건을 확인하신 후 심사 서류를 제출해 주시면, 소정의 심사 기준을 거쳐 최종 선발됩니다.',
    },
    {
      id: 5,
      category: '초보자 수강',
      group: 'course',
      q: '외식 창업을 전혀 해본 적 없는 초보자도 교육을 받을 수 있나요?',
      a: '네, 물론입니다. 외식업 창업을 꿈꾸는 초보자부터 메뉴 개발, 경영 실무, 마케팅까지 체계적인 현장 맞춤형 교육이 준비되어 있으므로 누구나 수강하실 수 있습니다.',
    },
    {
      id: 6,
      category: '창업 컨설팅',
      group: 'consulting',
      q: '창업 컨설팅은 어떤 방식으로 진행되나요?',
      a: '예비 창업자의 아이템 분석, 상권 분석, 점포 계약 및 인테리어, 메뉴 선정부터 사후 경영 노하우까지 성공적인 창업을 위한 1:1 맞춤형 종합 컨설팅을 제공하고 있습니다.',
    },
    {
      id: 7,
      category: '사후 관리/지원',
      group: 'consulting',
      q: '교육원 수료 후 사후 관리나 지원 혜택이 있나요?',
      a: '수료 후에도 지속적인 네트워크 형성을 위한 명인명장 협력업체 연계, 정보 공유, 자문 등 다양한 사후 지원 프로그램을 운영하여 성공적인 사업 유지를 돕고 있습니다.',
    },
    {
      id: 8,
      category: '신청 및 상담',
      group: 'apply',
      q: '수강 신청 및 상담은 어떻게 하나요?',
      a: '홈페이지 내 [교육과정] 메뉴에서 온라인으로 간편하게 신청하실 수 있습니다. 또한, 카카오톡 채널을 통해서도 실시간 1:1 상담 및 문의가 가능합니다.',
    },
    {
      id: 9,
      category: '오프라인 교육장',
      group: 'location',
      q: '오프라인 교육장 위치는 어디이며, 방문 상담이 가능한가요?',
      a: '이론강의실과 실습강의실이 따로 운영되고 있습니다.\n• 이론강의실 (교대역): 캐롤라인대학교 강의실 (서울 서초구 서초동 1666-13, 지제이빌딩 5층)\n• 실습강의실: 닥터장 베이킹랩 교육장 (서울 금천구 대륭테크노타운 8차 5층 503호)',
    },
    {
      id: 10,
      category: '커리큘럼/자료',
      group: 'course',
      q: '교육 일정이나 커리큘럼에 대한 상세 자료를 받아볼 수 있나요?',
      a: '홈페이지의 교육과정 페이지에서 각 과목별 상세 커리큘럼을 확인하실 수 있으며, 추가적인 자료나 궁금한 사항은 교육원 사무국으로 문의해 주시면 친절하게 안내해 드립니다.',
    },
    {
      id: 11,
      category: '진익준 교수 외식컨설팅',
      group: 'jin',
      q: '진익준 교수의 외식 컨설팅은 기존 컨설팅과 어떻게 다른가요?',
      a: '단순히 인테리어 디자인에만 치중하지 않습니다. 국내외 수많은 외식공간 설계·감리 경험과 학술적 연구를 바탕으로 [상권 분석 + 브랜드 입지 전략 + 효율적인 주방/매장 동선 시스템 + 공간 브랜딩]을 종합적으로 기획하여 실질적인 매출 상승과 오퍼레이션 효율화를 이끌어내는 맞춤형 공간/경영 컨설팅을 제공합니다.',
    },
    {
      id: 12,
      category: '진익준 교수 외식컨설팅',
      group: 'jin',
      q: '신규 창업이 아닌, 기존에 운영 중인 매장의 리뉴얼이나 경영 개선도 컨설팅이 가능한가요?',
      a: '네, 가능합니다. 노후화되거나 효율이 떨어진 기존 매장의 동선 재배치, 주방 시스템 개선(푸드테크 적용 등), 브랜드 리뉴얼 컨설팅을 전문적으로 진행합니다. 상권 환경과 고객 타겟 분석을 거쳐 최소 비용으로 최대 효과를 낼 수 있는 리모델링 및 경영 개선 방안을 제시해 드립니다.',
    },
    {
      id: 13,
      category: '진익준 교수 외식컨설팅',
      group: 'jin',
      q: '컨설팅 진행 절차와 신청 시 준비해야 할 자료는 무엇인가요?',
      a: '온라인/전화 문의 접수 후 사전 상담을 진행하며, [매장 입지(주소) 및 평수 / 현재(예정) 메뉴 컨셉 / 예산 범위 / 주요 고민사항]을 작성해 주시면 더욱 신속하고 정확한 진단이 가능합니다. 이후 사전 현장 조사 및 면담을 통해 단계별 컨설팅 범위와 일정을 확정하게 됩니다.',
    },
  ];

  // Filter & Sort Posts (Pinned posts first, then newest first)
  const filteredPosts = postsList
    .filter((post) => {
      const matchesTab =
        activeTab === 'all' ? true : post.categoryType === activeTab;
      const matchesSearch =
        `${post.title} ${tr(post.title)}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        `${post.author} ${tr(post.author)}`.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesTab && matchesSearch;
    })
    .sort((a, b) => {
      const aPinned = a.isPinned || a.category === '공지 사항';
      const bPinned = b.isPinned || b.category === '공지 사항';
      if (aPinned && !bPinned) return -1;
      if (!aPinned && bPinned) return 1;
      return 0;
    });

  const handleWriteButtonClick = () => {
    if (onGoToEditor) onGoToEditor();
  };

  const handleTogglePin = (postId) => {
    if (!setPostsList) return;
    setPostsList((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, isPinned: !p.isPinned } : p))
    );
    if (selectedPost && selectedPost.id === postId) {
      setSelectedPost((prev) => ({ ...prev, isPinned: !prev.isPinned }));
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-6 font-sans text-gray-900">
      
      {/* Full Width Widescreen Layout matching Header padding */}
      <div className="w-full px-6 sm:px-10 lg:px-14 space-y-6">
        
        {/* Main Content Layout: Left SubSidebar + Right Main Content */}
        <div className="flex flex-col md:flex-row gap-6 lg:gap-8 items-start">
          
          {/* Left Vertical SubSidebar Menu */}
          <SubSidebar
            title={tr("커뮤니티")}
            items={communitySubItems}
            activeId={activeTab}
            onSelectTab={(tabId) => setActiveTab(tabId)}
          />

          {/* Right Main Content Panel with dynamic slide-up animation on tab change */}
          <div
            id="subsidebar-content-anchor"
            key={activeTab}
            className="flex-1 w-full space-y-6 min-w-0 animate-content-slide-up"
          >
            <SectorBlock
              sectorId={activeTab === 'notice' ? 'S-COM-02' : activeTab === 'faq' ? 'S-COM-03' : activeTab === 'inquiry' ? 'S-COM-04' : 'S-COM-01'}
              sectorName={activeTab === 'notice' ? '공식 공지사항' : activeTab === 'faq' ? '주요 문의 (FAQ 10문 10답)' : activeTab === 'inquiry' ? '1:1 온라인 문의 및 수강 상담' : '전체 게시글 & 공지사항'}
              pageKey="community"
            >
            <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-black shadow-lg space-y-6 w-full">
              
              {/* Header Title & Search Toolbar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-black pb-4">
                <div>
                  <h2 className="text-3xl font-black text-black tracking-tight">{tr(" 게시판 ")}</h2>
                  <p className="text-xs text-gray-500 font-bold mt-1">{tr(" 사단법인 한국외식창업교육원 공지사항 및 커뮤니티 게시판입니다. (📌 주요 공지 상단 고정) ")}</p>
                </div>

                <div className="flex items-center gap-3">
                  {/* Search Input */}
                  <div className="relative">
                    <input
                      type="text"
                      placeholder={tr("제목 또는 작성자 검색...")}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9 pr-4 py-2 border border-gray-300 rounded-xl text-xs font-bold text-gray-900 focus:outline-none focus:border-black w-48 sm:w-60 shadow-xs"
                    />
                    <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                  </div>

                  {/* Write Post Button (Requires Login) */}
                  <button
                    onClick={handleWriteButtonClick}
                    className="px-4 py-2 bg-black hover:bg-gray-800 text-white text-xs font-black rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
                    title={tr(isUserLoggedIn ? '새 게시글 작성하기' : '로그인 필요')}
                  >
                    {!isUserLoggedIn ? (
                      <Lock className="w-3.5 h-3.5 text-amber-400" />
                    ) : (
                      <PenSquare className="w-4 h-4 text-emerald-400" />
                    )}
                    <span>{tr("글쓰기")}</span>
                  </button>
                </div>
              </div>

              {/* 1:1 AI Inquiry Board Active Banner */}
              {activeTab === 'inquiry' && (
                <div className="p-4 sm:p-5 bg-gradient-to-r from-[#14532D] via-[#15803D] to-[#16A34A] rounded-2xl border border-[#16A34A]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md text-white animate-fadeIn">
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-2xl bg-[#F0FDF4] text-[#15803D] flex items-center justify-center font-black shrink-0 shadow-xs">
                      <Bot className="w-6 h-6" />
                    </div>
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-black text-white">24시간 1:1 실시간 AI 상담 및 문의 접수</span>
                        <span className="text-[10px] font-bold bg-[#F0FDF4] text-[#15803D] px-2 py-0.5 rounded-full">
                          AI 1초 즉각 답변 가동중
                        </span>
                      </div>
                      <p className="text-xs text-emerald-100 font-medium leading-relaxed">
                        궁금하신 점을 질문으로 남기시면 AI가 교육원 공식 데이터 기반 사전 안내를 즉시 생성하며, 담당 명장 및 행정팀이 추가 검토 후 정식 답변을 완료합니다.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => window.dispatchEvent(new CustomEvent('kfssec_open_chatbot'))}
                    className="px-4 py-2.5 bg-gradient-to-r from-[#EA580C] to-[#F97316] hover:from-[#C2410C] hover:to-[#EA580C] text-white text-xs font-black rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer shrink-0 border border-orange-300/40 hover:scale-105"
                  >
                    <Sparkles className="w-4 h-4 text-amber-200" />
                    <span>💬 24시 AI 챗봇 실시간 대화</span>
                  </button>
                </div>
              )}

              {/* Active Tab View: FAQ Accordion or Posts Table */}
              {activeTab === 'faq' ? (
                <div className="space-y-4">
                  <div className="bg-[#FAF8F5] p-4 sm:p-5 rounded-2xl border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <HelpCircle className="w-5 h-5 text-[#15803D]" />
                      <span className="text-sm font-black text-[#15803D]">
                        자주 묻는 질문 10대 핵심 질의응답 & 진익준 교수 컨설팅 FAQ
                      </span>
                    </div>
                  </div>

                  {/* FAQ Category Pills */}
                  <div className="flex flex-wrap items-center gap-2 pt-1 pb-2">
                    {[
                      { key: 'all', label: '전체 보기', count: faqList.length },
                      { key: 'institute', label: '🏛️ 교육원 소개', count: faqList.filter(f => f.group === 'institute').length },
                      { key: 'award', label: '🏆 명인·명장 시상식/선발', count: faqList.filter(f => f.group === 'award').length },
                      { key: 'certificate', label: '📜 취득 자격증', count: faqList.filter(f => f.group === 'certificate').length },
                      { key: 'jin', label: '📐 진익준 교수 컨설팅', count: faqList.filter(f => f.group === 'jin').length },
                      { key: 'course', label: '🎓 수강 및 커리큘럼', count: faqList.filter(f => f.group === 'course').length },
                      { key: 'consulting', label: '🤝 창업컨설팅 & 사후지원', count: faqList.filter(f => f.group === 'consulting').length },
                      { key: 'location', label: '📍 오프라인 교육장', count: faqList.filter(f => f.group === 'location').length },
                    ].map(tab => {
                      const isActive = faqCategoryFilter === tab.key;
                      return (
                        <button
                          key={tab.key}
                          type="button"
                          onClick={() => setFaqCategoryFilter(tab.key)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                            isActive
                              ? 'bg-[#15803D] text-white shadow-sm'
                              : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
                          }`}
                        >
                          <span>{tab.label}</span>
                          <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                            isActive ? 'bg-white/20 text-white' : 'bg-stone-100 text-stone-500'
                          }`}>
                            {tab.count}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="space-y-3">
                    {faqList
                      .filter((faq) => {
                        const matchesCat = faqCategoryFilter === 'all' || faq.group === faqCategoryFilter;
                        const matchesSearch = !searchTerm.trim() ||
                          faq.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          faq.a.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          faq.category.toLowerCase().includes(searchTerm.toLowerCase());
                        return matchesCat && matchesSearch;
                      })
                      .map((faq) => {
                        const isOpen = expandedFaqId === faq.id;
                        return (
                          <div
                            key={faq.id}
                            className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:border-[#16A34A]/50 transition-colors"
                          >
                            <button
                              type="button"
                              onClick={() => setExpandedFaqId(isOpen ? null : faq.id)}
                              className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-3 cursor-pointer bg-white hover:bg-stone-50 transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                <span className="w-8 h-8 rounded-xl bg-[#15803D] text-white font-black text-xs flex items-center justify-center shrink-0 shadow-xs">
                                  Q{faq.id}
                                </span>
                                <div>
                                  <span className="text-[10px] font-black text-[#15803D] bg-[#F0FDF4] px-2 py-0.5 rounded-md inline-block mb-1 border border-[#DCFCE7]">
                                    {faq.category}
                                  </span>
                                  <h4 className="text-sm sm:text-base font-black text-gray-900 leading-snug">
                                    {faq.q}
                                  </h4>
                                </div>
                              </div>
                              <div className="shrink-0 text-stone-400">
                                {isOpen ? (
                                  <ChevronUp className="w-5 h-5 text-[#15803D]" />
                                ) : (
                                  <ChevronDown className="w-5 h-5" />
                                )}
                              </div>
                            </button>

                            {isOpen && (
                              <div className="p-4 sm:p-6 bg-stone-50 border-t border-stone-200 text-xs sm:text-sm text-gray-800 leading-relaxed font-medium animate-fadeIn flex items-start gap-3">
                                <span className="w-6 h-6 rounded-lg bg-[#C5A059] text-stone-950 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                                  A
                                </span>
                                <p className="flex-1 whitespace-pre-line leading-relaxed">
                                  {faq.a}
                                </p>
                              </div>
                            )}
                          </div>
                        );
                      })}
                  </div>
                </div>
              ) : (
                /* Table Layout Matching Target Screenshot + Answer Status Badges */
                <div className="border border-gray-300 rounded-2xl overflow-hidden shadow-sm bg-white">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm font-sans">
                    
                    {/* Table Header */}
                    <thead>
                      <tr className="bg-gray-100 text-black font-black border-b-2 border-black text-center">
                        <th className="py-3.5 px-3 w-16 border-r border-gray-300">{tr("번호")}</th>
                        <th className="py-3.5 px-4 w-28 border-r border-gray-300">{tr("항목")}</th>
                        <th className="py-3.5 px-6 border-r border-gray-300 text-left">{tr("제목")}</th>
                        <th className="py-3.5 px-4 w-32 border-r border-gray-300">{tr("작성일")}</th>
                        <th className="py-3.5 px-4 w-28">{tr("작성인")}</th>
                      </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody className="divide-y divide-gray-300 text-gray-800 font-medium">
                      {filteredPosts.length > 0 ? (
                        filteredPosts.map((post, idx) => {
                          const isPinnedRow = post.isPinned || post.category === '공지 사항';
                          const isAnswered = post.reply || post.status === 'completed';

                          return (
                            <tr
                              key={post.id}
                              onClick={() => setSelectedPost(post)}
                              className={`transition-colors cursor-pointer text-center ${
                                isPinnedRow
                                  ? 'bg-rose-50/70 hover:bg-rose-100/80 border-l-4 border-l-rose-600 font-bold'
                                  : 'hover:bg-emerald-50/60'
                              }`}
                            >
                              <td className="py-3.5 px-3 border-r border-gray-200 font-bold text-gray-600">
                                {isPinnedRow ? (
                                  <span className="inline-flex items-center justify-center bg-rose-600 text-white rounded-full p-1 shadow-xs" title={tr("상단 고정")}>
                                    <Pin className="w-3 h-3 fill-white text-white" />
                                  </span>
                                ) : (
                                  filteredPosts.length - idx
                                )}
                              </td>

                              <td className="py-3.5 px-4 border-r border-gray-200">
                                <span
                                  className={`px-2.5 py-1 rounded text-xs font-black inline-block ${
                                    post.category === '공지 사항'
                                      ? 'text-rose-600 font-black'
                                      : post.category === '요리대회'
                                      ? 'text-blue-700 font-bold'
                                      : post.category === '갤러리'
                                      ? 'text-emerald-700 font-bold'
                                      : 'text-gray-800 font-bold'
                                  }`}
                                >
                                  {tr(post.category)}
                                </span>
                              </td>

                              <td className="py-3.5 px-6 border-r border-gray-200 text-left font-bold text-gray-900 hover:text-rose-600 transition-colors">
                                <div className="flex items-center gap-2">
                                  {isPinnedRow && (
                                    <span className="text-[11px] font-black text-white bg-rose-600 px-1.5 py-0.5 rounded shrink-0">{tr(" 📌 필독 ")}</span>
                                  )}

                                  {post.category === '문의' && (
                                    post.reply?.isAI ? (
                                      <span className="text-[11px] font-black text-purple-900 bg-purple-100 px-2 py-0.5 rounded-full border border-purple-300 shrink-0 flex items-center gap-1">
                                        <Bot className="w-3 h-3 text-purple-700" />
                                        {tr(" 🤖 AI 즉시답변 ")}
                                      </span>
                                    ) : isAnswered ? (
                                      <span className="text-[11px] font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300 shrink-0 flex items-center gap-1">{tr(" ✓ 답변완료 ")}</span>
                                    ) : (
                                      <span className="text-[11px] font-black text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-300 shrink-0 flex items-center gap-1">{tr(" ⏳ 답변대기 ")}</span>
                                    )
                                  )}

                                  <span className="line-clamp-1">{tr(post.title)}</span>
                                </div>
                              </td>

                              <td className="py-3.5 px-4 border-r border-gray-200 text-gray-600 font-semibold text-xs">
                                {tr(post.date)}
                              </td>

                              <td className="py-3.5 px-4 font-bold text-gray-700">
                                {tr(post.author)}
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan="5" className="py-12 text-center text-gray-500 font-bold">{tr(" 등록된 게시글이 없습니다. ")}</td>
                        </tr>
                      )}
                    </tbody>

                  </table>
                </div>
              )}

            </div>
            </SectorBlock>

          </div>

        </div>

      </div>

      {/* Public Post View Modal (Public View - Clean Answer Card Display) */}
      {selectedPost && (
        <div
          onClick={() => setSelectedPost(null)}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full border-2 border-black shadow-2xl space-y-5 animate-fadeIn max-h-[90vh] overflow-y-auto cursor-default"
          >

            
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-gray-200 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-rose-600 bg-rose-100 px-3 py-1 rounded-full">
                    {tr(selectedPost.category)}
                  </span>

                  {selectedPost.category === '문의' && (
                    selectedPost.reply?.isAI ? (
                      <span className="text-xs font-black text-purple-900 bg-purple-100 px-3 py-1 rounded-full border border-purple-300 flex items-center gap-1">
                        <Bot className="w-3.5 h-3.5 text-purple-700" />
                        {tr(" 🤖 AI 즉시답변 ")}
                      </span>
                    ) : selectedPost.reply || selectedPost.status === 'completed' ? (
                      <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">{tr(" ✓ 답변완료 ")}</span>
                    ) : (
                      <span className="text-xs font-black text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">{tr(" ⏳ 답변대기 ")}</span>
                    )
                  )}
                </div>

                <h3 className="text-xl font-black text-black pt-2">
                  {tr(selectedPost.title)}
                </h3>
                <div className="flex items-center gap-4 text-xs font-bold text-gray-500 pt-1">
                  <span>{tr("작성자: ")}{tr(selectedPost.author)}</span>
                  <span>|</span>
                  <span>{tr("작성일: ")}{tr(selectedPost.date)}</span>
                </div>
              </div>

              <button
                onClick={() => setSelectedPost(null)}
                className="text-gray-400 hover:text-black font-black text-xl p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Post Image */}
            {(selectedPost.image || selectedPost.coverImage) && (
              <div className="rounded-2xl overflow-hidden max-h-64 shadow-md bg-black">
                <img
                  src={selectedPost.image || selectedPost.coverImage}
                  alt={tr(selectedPost.title)}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Question Content */}
            <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200 text-sm text-gray-800 font-medium leading-relaxed min-h-[100px] whitespace-pre-wrap">
              {tr(selectedPost.content)}
            </div>

            {/* Official Administrator Reply Card / AI Reply Card */}
            {selectedPost.reply && (
              <div
                className={`rounded-2xl p-5 border-2 space-y-3 shadow-md animate-fadeIn ${
                  selectedPost.reply.isAI
                    ? 'bg-purple-50/90 border-purple-400'
                    : 'bg-emerald-50/90 border-emerald-500'
                }`}
              >
                <div
                  className={`flex items-center justify-between border-b pb-2 ${
                    selectedPost.reply.isAI ? 'border-purple-200' : 'border-emerald-200'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {selectedPost.reply.isAI ? (
                      <>
                        <div className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center">
                          <Bot className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-sm font-black text-purple-950">
                          {tr(" 사단법인 한국외식창업교육원 24시 AI 실시간 사전 답변 ")}
                        </span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-5 h-5 text-emerald-700" />
                        <span className="text-sm font-black text-emerald-900">
                          {tr(" 사단법인 한국외식창업교육원 공식 답변 ")}
                        </span>
                      </>
                    )}
                  </div>
                  <span
                    className={`text-xs font-bold ${
                      selectedPost.reply.isAI ? 'text-purple-700' : 'text-emerald-700'
                    }`}
                  >
                    {tr(selectedPost.reply.date)}
                  </span>
                </div>
                <p
                  className={`text-xs sm:text-sm font-bold whitespace-pre-wrap leading-relaxed ${
                    selectedPost.reply.isAI ? 'text-purple-950' : 'text-emerald-950'
                  }`}
                >
                  {tr(selectedPost.reply.content)}
                </p>
                {selectedPost.reply.isAI && (
                  <div className="text-[11px] text-purple-800 font-bold bg-white/80 p-2.5 rounded-xl border border-purple-200 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-purple-600 shrink-0" />
                    <span>
                      본 답변은 교육원 공식 학사 및 창업 규정 데이터베이스를 토대로 AI가 1초 내에 실시간 생성한 사전 답변입니다. 담당 교수진 및 행정팀이 영업일 기준 추가 확인을 진행합니다.
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Unanswered Notice for Public */}
            {!selectedPost.reply && selectedPost.category === '문의' && (
              <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200 text-xs font-bold text-amber-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-700 shrink-0" />
                <span>{tr("담당 컨설턴트 및 교육팀에서 답변을 준비 중입니다. 빠르게 안내 도와드리겠습니다.")}</span>
              </div>
            )}

            {/* Modal Footer Controls */}
            <div className="pt-2 flex items-center justify-end border-t border-gray-200">
              <button
                onClick={() => setSelectedPost(null)}
                className="px-6 py-2.5 bg-black hover:bg-gray-800 text-white font-black text-xs rounded-xl shadow-md transition-colors cursor-pointer"
              >{tr(" 닫기 ")}</button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
