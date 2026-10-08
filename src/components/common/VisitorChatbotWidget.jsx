import React, { useState, useEffect, useRef } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Bot,
  Sparkles,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Search,
  ExternalLink,
  RotateCcw,
  Clock,
  Maximize2,
  Minimize2,
  CheckCircle2,
  FileText,
  PanelLeftClose,
  PanelLeft,
  ArrowRight,
  Compass,
  Bookmark,
  Building2,
  GraduationCap,
  Award,
} from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { getChatbotConfig, loadChatbotConfig } from '../../services/chatbotConfig';
import { searchAiKnowledge, getDefaultRecommendations } from '../../services/aiKnowledgeEngine';

export default function VisitorChatbotWidget({ onNavigate }) {
  const { t } = useLanguage();
  const [config, setConfig] = useState(getChatbotConfig());
  const [isOpen, setIsOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [inputText, setInputText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [mobileTab, setMobileTab] = useState('chat'); // 'history' | 'chat' | 'recommendations'
  const [expandedRecId, setExpandedRecId] = useState(null);
  const [sortOrder, setSortOrder] = useState('accuracy'); // 'accuracy' | 'latest'
  const [activeSummaryTip, setActiveSummaryTip] = useState(null);

  // Initial welcome entry
  const initialWelcomeCards = [
    {
      id: 'welcome-card',
      badge: '외식창업 AI 공식 안내',
      badgeColor: 'bg-[#1E5D3B]',
      title: '사단법인 한국외식창업교육원 AI 지식 검색 & 컨설팅 포털에 오신 것을 환영합니다.',
      analysisInfo:
        '본 AI 지식 엔진은 농림축산식품부 등록 교육원의 공식 자격증 요강, 대한민국 조리명장 및 명인 교수진 프로필, 진익준 교수의 100+ 프랜차이즈 공간 컨설팅 사례, 오프라인 교육장(교대역 이론실/가산 실습장) 데이터를 실시간 통합 분석하여 최적의 솔루션을 제공합니다.',
      recommendReason:
        '궁금하신 사항(예: "창업 컨설팅을 받고싶어", "취득 가능한 자격증", "명인·명장 시상식", "교육장 위치")을 아래 입력창에 입력하시거나 추천 키워드를 클릭하시면 즉시 정밀 분석 정보를 확인하실 수 있습니다.',
      actionTab: 'catalog',
      actionSubTab: 'courses',
      actionLabel: '전체 교육과정 둘러보기',
    },
  ];

  // Conversation turns: Array of { query, timestamp, cards, recommendations }
  const [queryHistory, setQueryHistory] = useState([
    {
      id: 'hist-welcome',
      query: 'AI 포털 안내 시작',
      timestamp: '방금 전',
      cards: initialWelcomeCards,
      recommendations: getDefaultRecommendations(),
    },
  ]);

  const [currentTurn, setCurrentTurn] = useState(() => queryHistory[0]);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Synchronize with admin settings updates
  useEffect(() => {
    loadChatbotConfig().catch((err) => console.error('Chatbot load error:', err));
    const handleConfigUpdate = () => {
      setConfig(getChatbotConfig());
    };
    window.addEventListener('kfssec_chatbot_config_updated', handleConfigUpdate);
    return () => window.removeEventListener('kfssec_chatbot_config_updated', handleConfigUpdate);
  }, []);

  // Listen for open trigger from Header or CTA buttons
  useEffect(() => {
    const handleExternalOpen = () => {
      setIsOpen(true);
      setTimeout(() => inputRef.current?.focus(), 200);
    };
    window.addEventListener('kfssec_open_chatbot', handleExternalOpen);
    return () => window.removeEventListener('kfssec_open_chatbot', handleExternalOpen);
  }, []);

  // Close on Escape key press
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Auto-scroll when turn updates
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentTurn, isGenerating, isOpen]);

  // Execute Search Query
  const executeQuery = (searchQuery) => {
    const trimmed = (searchQuery || '').trim();
    if (!trimmed) return;

    setInputText('');
    setIsGenerating(true);
    setActiveSummaryTip(null);

    // Simulate AI generation phase (approx 450ms for realistic responsiveness)
    setTimeout(() => {
      const result = searchAiKnowledge(trimmed);
      const newTurn = {
        id: `turn-${Date.now()}`,
        query: trimmed,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        cards: result.cards,
        recommendations: result.recommendations,
      };

      setCurrentTurn(newTurn);
      setExpandedRecId(result.recommendations[0]?.id || null);
      setQueryHistory((prev) => [
        newTurn,
        ...prev.filter((h) => h.query !== trimmed).slice(0, 15),
      ]);
      setIsGenerating(false);
      setMobileTab('chat');
    }, 450);
  };

  const handleFormSubmit = (e) => {
    if (e) e.preventDefault();
    executeQuery(inputText);
  };

  const handleStartNewQuery = () => {
    setCurrentTurn({
      id: `turn-new-${Date.now()}`,
      query: null,
      timestamp: '새 질의',
      cards: initialWelcomeCards,
      recommendations: getDefaultRecommendations(),
    });
    setExpandedRecId(null);
    setActiveSummaryTip(null);
    setInputText('');
    setMobileTab('chat');
    inputRef.current?.focus();
  };

  const handleNavigateTo = (tab, subTab) => {
    if (onNavigate) {
      onNavigate(tab, subTab);
      setIsOpen(false);
    }
  };

  if (config.enabled === false) {
    return null;
  }

  // Quick Chips
  const quickChips = [
    { label: '💡 창업 컨설팅을 받고싶어', q: '창업 컨설팅을 받고싶어' },
    { label: '📜 취득 가능한 자격증', q: '취득 가능한 자격증 종류 알려줘' },
    { label: '🏆 명인·명장 시상식 및 선발', q: '명인 명장 시상식은 언제 개최되나요?' },
    { label: '📐 진익준 교수 외식 컨설팅', q: '진익준 교수 외식 컨설팅 차별점과 매장 리뉴얼' },
    { label: '📍 오프라인 교육장 위치', q: '오프라인 강의실 및 실습 교육장 위치 어디야' },
    { label: '🔰 초보자도 창업 가능한가요', q: '초보자도 외식 창업 교육을 받을 수 있나요' },
  ];

  return (
    <>
      {/* 1. FLOATING LAUNCHER BUTTON (When Closed) */}
      {!isOpen && (
        <aside
          aria-label={t('24시 AI 상담 챗봇')}
          className="fixed bottom-6 right-6 z-30 hidden sm:flex items-center group animate-bounce-soft"
        >
          <button
            onClick={() => {
              if (onNavigate) {
                onNavigate('ai-assistant');
              } else {
                setIsOpen(true);
                setTimeout(() => inputRef.current?.focus(), 250);
              }
            }}
            className="flex items-center gap-3 px-5 py-3.5 bg-gradient-to-r from-[#1E5D3B] via-[#2B7752] to-[#388C61] hover:from-[#17482E] hover:to-[#2B7752] text-white rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 border-[#85CFAB]/60 cursor-pointer"
          >
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <Bot className="w-5 h-5 text-emerald-200" />
              </div>
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full border-2 border-[#1E5D3B] animate-pulse" />
            </div>
            <div className="text-left pr-1">
              <div className="text-[10px] font-bold text-emerald-200 tracking-wide">
                {t('공공데이터 AI 포털 엔진')}
              </div>
              <div className="text-xs sm:text-sm font-black text-white flex items-center gap-1.5">
                <span>{t('외식창업 AI 지식 검색 & 상담')}</span>
                <ChevronRight className="w-3.5 h-3.5 text-emerald-300" />
              </div>
            </div>
          </button>
        </aside>
      )}

      {/* 2. FULL 3-COLUMN DATA.GO.KR STYLE AI PORTAL MODAL (When Open) */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="외식창업 AI 지식 검색 & 컨설팅 포털"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4 md:p-6 animate-fadeIn"
        >
          <div
            className={`bg-white rounded-none sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-gray-300 transition-all duration-300 ${
              isFullscreen
                ? 'w-full h-full rounded-none'
                : 'w-full max-w-7xl h-full sm:h-[92vh] max-h-[950px]'
            }`}
          >
            {/* ========================================================================= */}
            {/* TOP OFFICIAL HEADER BAR                                                    */}
            {/* ========================================================================= */}
            <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 flex items-center justify-between gap-4 shrink-0 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#1E5D3B] text-white flex items-center justify-center font-black shrink-0 shadow-xs">
                  <Bot className="w-5 h-5 text-[#A7F3D0]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-[#1E5D3B] tracking-tight">
                      사단법인 한국외식창업교육원
                    </span>
                    <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-emerald-50 text-[#1E5D3B] border border-emerald-200 text-[10px] font-black">
                      AI 지식 검색 엔진 v2.5
                    </span>
                  </div>
                  <h1 className="text-sm sm:text-base font-black text-gray-950 flex items-center gap-1.5">
                    <span>외식창업 AI 지식 검색 & 컨설팅 포털</span>
                  </h1>
                </div>
              </div>

              {/* Window Controls */}
              <div className="flex items-center gap-1 sm:gap-2">
                <button
                  type="button"
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="hidden sm:flex items-center justify-center w-8 h-8 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors cursor-pointer"
                  title={isFullscreen ? '창 모드로 복원' : '전체화면 확대'}
                >
                  {isFullscreen ? (
                    <Minimize2 className="w-4 h-4" />
                  ) : (
                    <Maximize2 className="w-4 h-4" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center w-8 h-8 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                  title="닫기 (ESC)"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Mobile Tab Switcher (Visible only on mobile/tablet < 1024px) */}
            <div className="lg:hidden flex items-center border-b border-gray-200 bg-gray-50 text-xs font-black">
              <button
                onClick={() => setMobileTab('history')}
                className={`flex-1 py-2.5 text-center transition-colors flex items-center justify-center gap-1.5 ${
                  mobileTab === 'history'
                    ? 'bg-white text-[#1E5D3B] border-b-2 border-[#1E5D3B]'
                    : 'text-gray-500'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>질의 이력</span>
              </button>
              <button
                onClick={() => setMobileTab('chat')}
                className={`flex-1 py-2.5 text-center transition-colors flex items-center justify-center gap-1.5 ${
                  mobileTab === 'chat'
                    ? 'bg-white text-[#1E5D3B] border-b-2 border-[#1E5D3B]'
                    : 'text-gray-500'
                }`}
              >
                <Bot className="w-3.5 h-3.5" />
                <span>AI 검색 및 답변</span>
              </button>
              <button
                onClick={() => setMobileTab('recommendations')}
                className={`flex-1 py-2.5 text-center transition-colors flex items-center justify-center gap-1.5 ${
                  mobileTab === 'recommendations'
                    ? 'bg-white text-[#1E5D3B] border-b-2 border-[#1E5D3B]'
                    : 'text-gray-500'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>추천 정보 ({currentTurn.recommendations?.length || 0})</span>
              </button>
            </div>

            {/* ========================================================================= */}
            {/* 3-COLUMN CORE WORKSPACE                                                   */}
            {/* ========================================================================= */}
            <div className="flex-1 flex overflow-hidden">
              
              {/* ----------------------------------------------------------------------- */}
              {/* COLUMN 1: LEFT SIDEBAR (질의이력 & 새 질의)                              */}
              {/* ----------------------------------------------------------------------- */}
              <div
                className={`${
                  mobileTab === 'history' ? 'flex' : 'hidden'
                } lg:flex flex-col bg-[#1B263B] text-white transition-all duration-300 shrink-0 ${
                  isSidebarOpen ? 'w-full lg:w-60 xl:w-64' : 'w-14'
                }`}
              >
                {/* Sidebar Header */}
                <div className="p-4 border-b border-white/10 flex items-center justify-between">
                  {isSidebarOpen ? (
                    <div className="flex items-center gap-2">
                      <Search className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs font-black tracking-wider uppercase">
                        외식창업 AI 검색
                      </span>
                    </div>
                  ) : null}
                  <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="p-1 rounded-md text-white/70 hover:text-white hover:bg-white/10 transition-colors hidden lg:block cursor-pointer"
                    title={isSidebarOpen ? '사이드바 접기' : '사이드바 펼치기'}
                  >
                    {isSidebarOpen ? (
                      <PanelLeftClose className="w-4 h-4" />
                    ) : (
                      <PanelLeft className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* New Query Button */}
                <div className="p-3">
                  <button
                    onClick={handleStartNewQuery}
                    className={`w-full py-2.5 px-3 rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 text-white text-xs font-black transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer ${
                      !isSidebarOpen && 'p-2'
                    }`}
                    title="새 질의 시작하기"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                    {isSidebarOpen && <span>새 질의</span>}
                  </button>
                </div>

                {/* History Section */}
                {isSidebarOpen && (
                  <div className="flex-1 overflow-y-auto p-3 space-y-2">
                    <div className="text-[10px] font-bold text-white/50 px-2 uppercase tracking-wider flex items-center gap-1.5">
                      <Clock className="w-3 h-3 text-white/40" />
                      <span>질의이력</span>
                    </div>

                    <div className="space-y-1">
                      {queryHistory.map((item) => {
                        const isCurrent = currentTurn.id === item.id;
                        return (
                          <button
                            key={item.id}
                            onClick={() => {
                              setCurrentTurn(item);
                              setExpandedRecId(item.recommendations?.[0]?.id || null);
                              setActiveSummaryTip(null);
                              setMobileTab('chat');
                            }}
                            className={`w-full text-left p-2.5 rounded-xl text-xs font-medium transition-all flex items-start gap-2 cursor-pointer ${
                              isCurrent
                                ? 'bg-white/20 text-white font-black shadow-xs'
                                : 'text-white/80 hover:bg-white/10'
                            }`}
                          >
                            <span className="text-emerald-400 font-bold shrink-0 mt-0.5">•</span>
                            <span className="line-clamp-2 leading-snug flex-1">
                              {item.query || '새 질의'}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Bottom Status Tag */}
                {isSidebarOpen && (
                  <div className="p-3.5 border-t border-white/10 bg-black/20 text-[11px] text-emerald-300 font-medium flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>24시간 실시간 AI 지식엔진 가동중</span>
                  </div>
                )}
              </div>

              {/* ----------------------------------------------------------------------- */}
              {/* COLUMN 2: CENTER WORKSPACE (대화 & AI 분석 카드)                         */}
              {/* ----------------------------------------------------------------------- */}
              <div
                className={`${
                  mobileTab === 'chat' ? 'flex' : 'hidden'
                } lg:flex flex-col flex-1 bg-[#F4F6F9] overflow-hidden`}
              >
                {/* Scrollable Message & Insight Stream */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 space-y-6">
                  
                  {/* User Question Bubble */}
                  {currentTurn.query && (
                    <div className="flex justify-end animate-fadeIn">
                      <div className="max-w-xl bg-[#E8F1FC] text-gray-900 border border-[#BED7F7] px-5 py-3.5 rounded-2xl rounded-tr-xs shadow-xs text-xs sm:text-sm font-bold leading-relaxed">
                        {currentTurn.query}
                      </div>
                    </div>
                  )}

                  {/* AI Generating Indicator (Matching data.go.kr animated spinner) */}
                  {isGenerating && (
                    <div className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-gray-200 shadow-xs animate-pulse max-w-md">
                      <div className="w-4 h-4 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
                      <span className="text-xs font-black text-gray-700">
                        답변 생성중...
                      </span>
                    </div>
                  )}

                  {/* AI Structured Insight Cards */}
                  {!isGenerating && currentTurn.cards && currentTurn.cards.length > 0 && (
                    <div className="space-y-4 animate-fadeIn">
                      {currentTurn.cards.map((card, idx) => (
                        <div
                          key={card.id || idx}
                          className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 shadow-xs hover:border-[#1E5D3B]/40 transition-all space-y-3.5"
                        >
                          {/* Badge + Clickable Title */}
                          <div className="flex flex-wrap items-center gap-2">
                            <span
                              className={`text-[11px] font-black text-white px-2.5 py-0.5 rounded-md ${
                                card.badgeColor || 'bg-emerald-700'
                              }`}
                            >
                              {card.badge}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleNavigateTo(card.actionTab, card.actionSubTab)}
                              className="text-sm sm:text-base font-black text-[#1E5D3B] hover:underline flex items-center gap-1.5 cursor-pointer text-left"
                            >
                              <span>{card.title}</span>
                              <ExternalLink className="w-3.5 h-3.5 shrink-0 text-[#1E5D3B]" />
                            </button>
                          </div>

                          {/* Analysis Info Section */}
                          <div className="text-xs sm:text-sm text-gray-800 leading-relaxed space-y-1 font-medium whitespace-pre-line">
                            <strong className="text-gray-950 font-black block text-xs">
                              (분석 정보)
                            </strong>
                            <p>{card.analysisInfo}</p>
                          </div>

                          {/* Recommend Reason Section */}
                          {card.recommendReason && (
                            <div className="text-xs sm:text-sm text-gray-700 leading-relaxed space-y-1 font-medium pt-2 border-t border-gray-100">
                              <strong className="text-emerald-800 font-black block text-xs">
                                (추천 이유)
                              </strong>
                              <p className="text-stone-700">{card.recommendReason}</p>
                            </div>
                          )}

                          {/* Bottom Action CTA */}
                          {card.actionLabel && (
                            <div className="pt-2 flex justify-end">
                              <button
                                type="button"
                                onClick={() =>
                                  handleNavigateTo(card.actionTab, card.actionSubTab)
                                }
                                className="px-4 py-2 bg-[#1E5D3B] hover:bg-[#2B7752] text-white text-xs font-black rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                              >
                                <span>{card.actionLabel}</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Bottom Input Area with Prompt Chips */}
                <div className="p-3 sm:p-4 bg-white border-t border-gray-200 space-y-2.5 shrink-0">
                  {/* Prompt Chips */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
                    {quickChips.map((chip, idx) => (
                      <button
                        key={idx}
                        onClick={() => executeQuery(chip.q)}
                        className="px-3 py-1 bg-stone-100 hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-300 text-stone-700 border border-stone-200 rounded-full font-bold text-[11px] whitespace-nowrap transition-colors cursor-pointer shrink-0"
                      >
                        {chip.label}
                      </button>
                    ))}
                  </div>

                  {/* Main Input Form */}
                  <form onSubmit={handleFormSubmit} className="relative flex items-center gap-2">
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      placeholder="질문을 입력하세요 (ex) '창업 컨설팅 받고싶어', '자격증 종류 알려줘', '명인 시상식 언제야'"
                      className="w-full pl-4 pr-12 py-3 bg-[#F8FAF9] border-2 border-stone-300 focus:border-[#1E5D3B] rounded-2xl text-xs sm:text-sm font-bold text-gray-900 focus:outline-hidden transition-all shadow-inner"
                    />
                    <button
                      type="submit"
                      disabled={!inputText.trim()}
                      className="absolute right-2 top-2 p-2 bg-[#1E5D3B] hover:bg-[#2B7752] disabled:bg-stone-300 text-white rounded-xl shadow-xs transition-all cursor-pointer disabled:cursor-not-allowed"
                      title="검색 및 질문하기"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              </div>

              {/* ----------------------------------------------------------------------- */}
              {/* COLUMN 3: RIGHT PANEL (추천 교육 및 지원정보)                            */}
              {/* ----------------------------------------------------------------------- */}
              <div
                className={`${
                  mobileTab === 'recommendations' ? 'flex' : 'hidden'
                } lg:flex flex-col w-full lg:w-80 xl:w-96 bg-white border-l border-gray-200 shrink-0 overflow-hidden`}
              >
                {/* Header with Sort Tabs */}
                <div className="p-4 border-b border-gray-200 flex items-center justify-between gap-2 shrink-0">
                  <h2 className="text-sm font-black text-gray-900 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                    <span>추천데이터</span>
                  </h2>

                  <div className="flex items-center gap-1 text-[11px] font-black">
                    <button
                      onClick={() => setSortOrder('accuracy')}
                      className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                        sortOrder === 'accuracy'
                          ? 'bg-[#1E5D3B] text-white'
                          : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                      }`}
                    >
                      정확도순
                    </button>
                    <button
                      onClick={() => setSortOrder('latest')}
                      className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                        sortOrder === 'latest'
                          ? 'bg-[#1E5D3B] text-white'
                          : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                      }`}
                    >
                      최신순
                    </button>
                  </div>
                </div>

                {/* Recommendation Accordion List */}
                <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3">
                  {(currentTurn.recommendations || []).map((rec, idx) => {
                    const isExpanded = expandedRecId === rec.id || (expandedRecId === null && idx === 0);
                    return (
                      <div
                        key={rec.id || idx}
                        className="border border-stone-200 rounded-2xl overflow-hidden shadow-2xs hover:border-emerald-500/40 transition-colors bg-white"
                      >
                        {/* Card Accordion Header */}
                        <button
                          type="button"
                          onClick={() => setExpandedRecId(isExpanded ? null : rec.id)}
                          className="w-full p-3.5 text-left flex items-start justify-between gap-2 cursor-pointer bg-stone-50/70 hover:bg-stone-100 transition-colors"
                        >
                          <div className="space-y-1">
                            <span
                              className={`text-[10px] font-black text-white px-2 py-0.2 rounded-md inline-block ${
                                rec.badgeColor || 'bg-emerald-600'
                              }`}
                            >
                              {rec.badge}
                            </span>
                            <h3 className="text-xs sm:text-sm font-black text-gray-900 leading-snug line-clamp-1">
                              {rec.title}
                            </h3>
                          </div>
                          <div className="text-stone-400 mt-1 shrink-0">
                            {isExpanded ? (
                              <ChevronUp className="w-4 h-4 text-emerald-700" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            )}
                          </div>
                        </button>

                        {/* Card Body (Expanded) */}
                        {isExpanded && (
                          <div className="p-3.5 bg-white border-t border-stone-200 space-y-3 text-xs text-gray-700 animate-fadeIn">
                            <p className="leading-relaxed font-medium text-gray-800">
                              {rec.desc}
                            </p>

                            {/* Meta Specs */}
                            {rec.meta && (
                              <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-200 text-[11px] font-bold text-stone-600 leading-normal">
                                {rec.meta}
                              </div>
                            )}

                            {/* Active Summary Tip Box */}
                            {activeSummaryTip === rec.id && (
                              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-xs font-bold leading-relaxed space-y-1 animate-fadeIn">
                                <span className="text-[10px] uppercase font-black text-amber-800 block">
                                  💡 퀵서머리 & 활용팁
                                </span>
                                <p>{rec.summaryTip}</p>
                              </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex items-center gap-2 pt-1">
                              <button
                                type="button"
                                onClick={() =>
                                  setActiveSummaryTip(
                                    activeSummaryTip === rec.id ? null : rec.id
                                  )
                                }
                                className="flex-1 py-2 px-3 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl font-black text-[11px] transition-colors flex items-center justify-center gap-1 cursor-pointer"
                              >
                                <FileText className="w-3.5 h-3.5 text-stone-500" />
                                <span>퀵서머리(활용팁)</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => handleNavigateTo(rec.actionTab, rec.actionSubTab)}
                                className="flex-1 py-2 px-3 bg-[#1E5D3B] hover:bg-[#2B7752] text-white rounded-xl font-black text-[11px] transition-colors flex items-center justify-center gap-1 cursor-pointer shadow-xs"
                              >
                                <span>{rec.actionLabel || '바로가기'}</span>
                                <ArrowRight className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Pagination matching screenshot */}
                <div className="p-3 border-t border-gray-200 flex items-center justify-center gap-1.5 text-xs font-black shrink-0">
                  <button className="w-7 h-7 rounded-lg bg-[#1E5D3B] text-white flex items-center justify-center">
                    1
                  </button>
                  <button className="w-7 h-7 rounded-lg hover:bg-gray-100 text-gray-700 flex items-center justify-center cursor-pointer">
                    2
                  </button>
                  <button className="w-7 h-7 rounded-lg hover:bg-gray-100 text-gray-700 flex items-center justify-center cursor-pointer">
                    3
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
}
