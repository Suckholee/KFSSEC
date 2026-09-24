import { useLanguage } from '../../i18n/LanguageContext';
import React, { useState, useEffect } from 'react';
import SubSidebar from '../common/SubSidebar';
import { MessageSquare, Bell, Image, Trophy, HelpCircle, PenSquare, Search, Eye, Calendar, User, ChevronRight, X, Lock, Pin, ShieldCheck, CheckCircle2, Clock, Send, FileText, Bot, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import ScrollReveal from '../common/ScrollReveal';

export default function CommunityPage({ initialTab = 'all', onOpenAuth, isUserLoggedIn, onGoToEditor, postsList = [], setPostsList }) {
  const { tr, language } = useLanguage();
  const [activeTab, setActiveTab] = useState(initialTab);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  const [expandedFaqId, setExpandedFaqId] = useState(1);

  const communitySubItems = [
    { id: 'all', label: tr('전체 게시판') },
    { id: 'notice', label: tr('공지사항') },
    { id: 'faq', label: tr('주요문의 (FAQ 10문 10답)') },
    { id: 'inquiry', label: tr('1:1 AI 상담 & 문의') },
  ];

  const faqList = [
    {
      id: 1,
      category: '입학/수강 자격',
      q: '사단법인 한국외식창업교육원의 수강 및 입학 자격 요건은 어떻게 되나요?',
      a: '연령, 학력, 경력에 따른 제한이 일체 없습니다. 예비 외식창업자, 매출 개선을 원하는 현업 자영업자, 업종 전환 희망자, 조리 및 베이커리 자격증 취득을 목표로 하는 분 누구나 신청하실 수 있습니다.',
    },
    {
      id: 2,
      category: '자격증 효력',
      q: '수료 후 발급되는 자격증은 공신력 있는 공식 자격인가요?',
      a: '네, 본원의 자격 과정(외식창업실무지도사, 외식창업실무사 등)은 자격기본법 규정에 따라 정식 등록된 전문 자격증으로, 사단법인 이사장 명의의 공인 자격인증서가 발급되며 창업 및 지자체 지원 시 공식 이력으로 활용 가능합니다.',
    },
    {
      id: 3,
      category: '교육 방식',
      q: '교육 과정은 어떤 방식으로 진행되나요? (온라인 vs 오프라인 실습)',
      a: '바쁜 수강생분들을 위해 이론 및 경영 지식은 4주간 온라인 자율 수강으로 편하게 학습하시고, 핵심 메뉴 조리 및 비법 소스 전수는 조리명장 및 명인이 직접 지도하는 오프라인 1:1 도제식 실습으로 진행되는 하이브리드 맞춤 시스템입니다.',
    },
    {
      id: 4,
      category: '초보자 창업',
      q: '요리나 외식업 경험이 전혀 없는 초보자도 창업이 가능한가요?',
      a: '가능합니다. 기초적인 칼 다루는 법과 식재료 손질부터 시그니처 메뉴 레시피 표준화, 1인 운영 주방 동선 설계, 원가 계산 및 인허가 절차까지 기초부터 차근차근 1:1 밀착 코칭해 드립니다.',
    },
    {
      id: 5,
      category: '정부 지원금',
      q: '청년 창업 지원금 및 소상공인 정책자금 연계가 가능한가요?',
      a: '네, 중소벤처기업부 및 소상공인시장진흥공단의 청년 창업 정책자금, 저금리 융자 및 지자체 지원 사업 신청 시 필요한 사업계획서 1:1 첨삭과 교육원 공식 수료 추천서를 지원합니다.',
    },
    {
      id: 6,
      category: '수강료/환불',
      q: '수강료 및 결제 방식, 분할 납부 혜택은 어떻게 되나요?',
      a: '과정별 맞춤 커리큘럼에 따라 책정되며, 신용카드 무이자 할부(최대 12개월), 간편 결제, 전자세금계산서 및 현금영수증 발행이 지원됩니다. 세부 수강료는 1:1 상담을 통해 상세히 안내받으실 수 있습니다.',
    },
    {
      id: 7,
      category: '상권분석',
      q: '상권분석 및 점포 입지 선정도 직접 컨설팅을 해주시나요?',
      a: '네, 진익준 교수를 비롯한 외식 상권분석 및 공간 브랜딩 전문 연구팀이 빅데이터 유동인구 분석, 배후 세대수 조사, 경쟁 점포 동향을 토대로 성공 확률이 가장 높은 입지와 파사드 디자인을 직접 컨설팅합니다.',
    },
    {
      id: 8,
      category: '사후 관리',
      q: '매장 오픈 후 사후관리(매출 부진 개선 등)도 제공되나요?',
      a: '단순 교육 수료로 끝나지 않습니다. 오픈 당일 현장 감독 지원은 물론, 오픈 후 6개월간 주기적인 매출 분석, 신메뉴 리뉴얼 R&D 자문, 네이버 플레이스 마케팅 피드백 등 지속적인 사후관리를 보장합니다.',
    },
    {
      id: 9,
      category: '협력업체 혜택',
      q: '10대 공식 협력업체를 통한 주방설비 및 식자재 공급 혜택이 있나요?',
      a: '(주)주방뱅크를 통한 업소용 주방기물 원가 공급 및 3D 도면 무료 설계, (주)세진의 친환경 위생 솔루션, ㈜자인의 시그니처 소스 B2B 공급 등 수강생 전용 우대 할인 및 직거래 혜택을 제공합니다.',
    },
    {
      id: 10,
      category: '위탁/출강',
      q: '지자체 위탁 교육, 단체 출강 및 맞춤형 위탁 운영도 가능한가요?',
      a: '전국 시·군·구 지자체, 공공기관, 대학교 및 외식 프랜차이즈 본사를 위한 맞춤형 위탁 교육, 소상공인 역량강화 세미나, 조리명장 초청 특강이 상시 가능하며 교육원 사무국(010-8914-1188)으로 문의하시면 제안서를 발송해 드립니다.',
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
    if (!isUserLoggedIn) {
      alert(tr('🔒 글작성은 로그인 후 이용 가능합니다. 로그인 페이지로 이동합니다.'));
      onOpenAuth('login');
    } else {
      if (onGoToEditor) {
        onGoToEditor();
      }
    }
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

          {/* Right Main Content Panel */}
          <div className="flex-1 w-full space-y-6 min-w-0">
            
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
                <div className="p-4 sm:p-5 bg-gradient-to-r from-emerald-950 via-[#0B3C26] to-[#123824] rounded-2xl border-2 border-[#C5A059] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md text-white animate-fadeIn">
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-2xl bg-[#C5A059] text-[#0B3C26] flex items-center justify-center font-black shrink-0 shadow-sm">
                      <Bot className="w-6 h-6" />
                    </div>
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-black text-white">24시간 1:1 실시간 AI 상담 및 문의 접수</span>
                        <span className="text-[10px] font-bold bg-[#C5A059] text-[#0B3C26] px-2 py-0.5 rounded-full">
                          AI 1초 즉각 답변 가동중
                        </span>
                      </div>
                      <p className="text-xs text-emerald-100 font-bold leading-relaxed">
                        궁금하신 점을 질문으로 남기시면 AI가 교육원 공식 데이터 기반 사전 안내를 즉시 생성하며, 담당 명장 및 행정팀이 추가 검토 후 정식 답변을 완료합니다.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => window.dispatchEvent(new CustomEvent('kfssec_open_chatbot'))}
                    className="px-4 py-2.5 bg-[#C5A059] hover:bg-[#B38F48] text-[#0B3C26] text-xs font-black rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer shrink-0 border border-[#D4AF37] hover:scale-105"
                  >
                    <Sparkles className="w-4 h-4 text-[#0B3C26]" />
                    <span>💬 24시 AI 챗봇 실시간 대화</span>
                  </button>
                </div>
              )}

              {/* Active Tab View: FAQ Accordion or Posts Table */}
              {activeTab === 'faq' ? (
                <div className="space-y-4">
                  <div className="bg-emerald-50/70 p-4 sm:p-5 rounded-2xl border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <HelpCircle className="w-5 h-5 text-[#0B3C26]" />
                      <span className="text-sm font-black text-[#0B3C26]">
                        자주 묻는 질문 10대 핵심 질의응답
                      </span>
                    </div>
                    <span className="text-xs text-stone-600 font-bold">
                      질문을 클릭하시면 상세 답변을 확인하실 수 있습니다.
                    </span>
                  </div>

                  <div className="space-y-3">
                    {faqList.map((faq) => {
                      const isOpen = expandedFaqId === faq.id;
                      return (
                        <div
                          key={faq.id}
                          className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:border-[#0B3C26] transition-colors"
                        >
                          <button
                            type="button"
                            onClick={() => setExpandedFaqId(isOpen ? null : faq.id)}
                            className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-3 cursor-pointer bg-white hover:bg-stone-50 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <span className="w-8 h-8 rounded-xl bg-[#0B3C26] text-[#D4AF37] font-black text-xs flex items-center justify-center shrink-0">
                                Q{faq.id}
                              </span>
                              <div>
                                <span className="text-[10px] font-black text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md inline-block mb-1">
                                  {faq.category}
                                </span>
                                <h4 className="text-sm sm:text-base font-black text-gray-900 leading-snug">
                                  {faq.q}
                                </h4>
                              </div>
                            </div>
                            <div className="shrink-0 text-stone-400">
                              {isOpen ? (
                                <ChevronUp className="w-5 h-5 text-[#0B3C26]" />
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
                              <p className="flex-1 whitespace-pre-wrap">
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

          </div>

        </div>

      </div>

      {/* Public Post View Modal (Public View - Clean Answer Card Display) */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full border-2 border-black shadow-2xl space-y-5 animate-fadeIn max-h-[90vh] overflow-y-auto">
            
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
            <div className="pt-2 flex items-center justify-between border-t border-gray-200">
              <button
                onClick={() => handleTogglePin(selectedPost.id)}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer border ${
                  selectedPost.isPinned || selectedPost.category === '공지 사항'
                    ? 'bg-rose-100 text-rose-800 border-rose-300'
                    : 'bg-stone-100 text-stone-700 border-stone-300 hover:bg-stone-200'
                }`}
              >
                <Pin className="w-3.5 h-3.5" />
                <span>
                  {tr(selectedPost.isPinned || selectedPost.category === '공지 사항'
                    ? '상단 고정 해제'
                    : '상단에 고정하기')}
                </span>
              </button>

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
