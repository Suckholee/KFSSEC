import React, { useState, useEffect, useRef } from 'react';
import {
  MessageSquare,
  Sparkles,
  Send,
  X,
  Search,
  ExternalLink,
  RotateCcw,
  PanelLeftClose,
  PanelLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Bot,
  Building2,
  GraduationCap,
  Award,
  FileText,
  Clock,
  ArrowUp,
  Bookmark,
  CheckCircle2,
} from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { searchAiKnowledge, getDefaultRecommendations } from '../../services/aiKnowledgeEngine';

export default function AiAssistantPage({ onNavigate, postsList = [], siteData }) {
  const { tr } = useLanguage();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [inputText, setInputText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [sortOrder, setSortOrder] = useState('accuracy'); // 'accuracy' | 'latest'
  const [expandedRecId, setExpandedRecId] = useState(null);
  const [activeSummaryTip, setActiveSummaryTip] = useState(null);
  const [mobileTab, setMobileTab] = useState('chat'); // 'history' | 'chat' | 'recommendations'
  const [activePageNum, setActivePageNum] = useState(1);

  // Initial welcome card for fresh sessions
  const welcomeCard = {
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
  };

  // Sessions management
  // Core Rule: "질의 이력은 새 질의를 누를 때에만 늘어나야해"
  const [sessions, setSessions] = useState(() => {
    try {
      const saved = localStorage.getItem('kfssec_ai_sessions');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to load saved AI sessions:', e);
    }
    return [
      {
        id: `sess-${Date.now()}`,
        title: '새 질의',
        createdAt: Date.now(),
        messages: [],
      },
    ];
  });

  const [activeSessionId, setActiveSessionId] = useState(() => sessions[0]?.id || `sess-${Date.now()}`);

  const activeSession = sessions.find((s) => s.id === activeSessionId) || sessions[0];

  // Save sessions to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('kfssec_ai_sessions', JSON.stringify(sessions));
    } catch (e) {
      console.error('Failed to save AI sessions:', e);
    }
  }, [sessions]);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const centerInputRef = useRef(null);

  // Auto-scroll chat stream
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeSession?.messages, isGenerating]);

  // Execute query in CURRENT session (does NOT create a new session entry!)
  const executeQuery = (queryText) => {
    const trimmed = (queryText || '').trim();
    if (!trimmed || isGenerating) return;

    setInputText('');
    setIsGenerating(true);
    setActiveSummaryTip(null);

    const userMessage = {
      id: `msg-user-${Date.now()}`,
      sender: 'user',
      text: trimmed,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    // Update active session immediately with user message and set title if this was first message
    setSessions((prev) =>
      prev.map((s) => {
        if (s.id === activeSessionId) {
          const isFirstMessage = s.messages.length === 0;
          return {
            ...s,
            title: isFirstMessage ? trimmed : s.title,
            messages: [...s.messages, userMessage],
          };
        }
        return s;
      })
    );

    // Simulate realistic AI analysis latency (~350ms)
    setTimeout(() => {
      const searchResult = searchAiKnowledge(trimmed, { postsList });

      const botMessage = {
        id: `msg-bot-${Date.now()}`,
        sender: 'bot',
        cards: searchResult.cards,
        recommendations: searchResult.recommendations,
        followUpQuestions: searchResult.followUpQuestions,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setSessions((prev) =>
        prev.map((s) => {
          if (s.id === activeSessionId) {
            return {
              ...s,
              messages: [...s.messages, botMessage],
            };
          }
          return s;
        })
      );

      setExpandedRecId(searchResult.recommendations[0]?.id || null);
      setIsGenerating(false);
      setMobileTab('chat');
    }, 380);
  };

  // ONLY clicking "새 질의" creates a brand-new session in history!
  const handleStartNewQuery = () => {
    const newSession = {
      id: `sess-${Date.now()}`,
      title: '새 질의',
      createdAt: Date.now(),
      messages: [],
    };

    setSessions((prev) => [newSession, ...prev]);
    setActiveSessionId(newSession.id);
    setInputText('');
    setActiveSummaryTip(null);
    setExpandedRecId(null);
    setMobileTab('chat');

    setTimeout(() => {
      centerInputRef.current?.focus();
    }, 150);
  };

  // Delete a session from history
  const handleDeleteSession = (e, sessionId) => {
    e.stopPropagation();
    const remaining = sessions.filter((s) => s.id !== sessionId);
    if (remaining.length === 0) {
      const freshSession = {
        id: `sess-${Date.now()}`,
        title: '새 질의',
        createdAt: Date.now(),
        messages: [],
      };
      setSessions([freshSession]);
      setActiveSessionId(freshSession.id);
    } else {
      setSessions(remaining);
      if (activeSessionId === sessionId) {
        setActiveSessionId(remaining[0].id);
      }
    }
  };

  // Get active recommendations for right sidebar
  const lastBotMessage = [...(activeSession?.messages || [])]
    .reverse()
    .find((m) => m.sender === 'bot');

  const currentRecommendations =
    lastBotMessage?.recommendations && lastBotMessage.recommendations.length > 0
      ? lastBotMessage.recommendations
      : getDefaultRecommendations();

  // Quick prompt chips
  const quickChips = [
    { label: '💡 창업 컨설팅을 받고싶어', q: '창업 컨설팅을 받고싶어' },
    { label: '📜 취득 가능한 자격증', q: '취득 가능한 자격증 종류 알려줘' },
    { label: '🏆 명인·명장 시상식 및 선발', q: '명인 명장 시상식은 언제 개최되나요?' },
    { label: '📐 진익준 교수 외식 컨설팅', q: '진익준 교수 외식 컨설팅 차별점과 매장 리뉴얼' },
    { label: '📍 오프라인 교육장 위치', q: '오프라인 강의실 및 실습 교육장 위치 어디야' },
    { label: '🔰 초보자도 창업 가능한가요', q: '초보자도 외식 창업 교육을 받을 수 있나요' },
  ];

  // Welcome screen 4 prompt cards
  const welcomePrompts = [
    {
      icon: '✨',
      text: '창업 컨설팅 및 진익준 교수 매장 리뉴얼은 어떻게 진행되나요?',
    },
    {
      icon: '✨',
      text: '농림축산식품부 등록 공인 외식 자격증 종류와 취득 방법 알려줘',
    },
    {
      icon: '✨',
      text: '대한민국 조리명장 안형상 이사장님의 1:1 도제식 실전 창업 코스 안내',
    },
    {
      icon: '✨',
      text: '이론 교육장(교대역)과 실습장(가산 닥터장 베이킹랩) 위치 어디야?',
    },
  ];

  return (
    <div className="w-full bg-[#F8FAFC] flex flex-col font-sans text-gray-900 border-b border-stone-200">
      
      {/* Mobile Top Navigation Tabs */}
      <div className="lg:hidden flex items-center justify-around bg-slate-900 text-white border-b border-slate-800 text-xs font-bold py-2.5 px-2">
        <button
          onClick={() => setMobileTab('history')}
          className={`px-3 py-1.5 rounded-lg transition-all ${
            mobileTab === 'history' ? 'bg-amber-400 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
          }`}
        >
          질의이력 ({sessions.length})
        </button>
        <button
          onClick={() => setMobileTab('chat')}
          className={`px-3 py-1.5 rounded-lg transition-all ${
            mobileTab === 'chat' ? 'bg-[#2B7752] text-white font-black' : 'text-slate-400 hover:text-white'
          }`}
        >
          외식창업 AI 검색
        </button>
        <button
          onClick={() => setMobileTab('recommendations')}
          className={`px-3 py-1.5 rounded-lg transition-all ${
            mobileTab === 'recommendations' ? 'bg-emerald-600 text-white font-black' : 'text-slate-400 hover:text-white'
          }`}
        >
          추천데이터 ({currentRecommendations.length})
        </button>
      </div>

      {/* 3-Column Dedicated Layout matching https://www.data.go.kr/tcs/dss/aiAssistant.do */}
      <div className="flex-1 flex flex-col lg:flex-row min-h-[calc(100vh-140px)]">
        
        {/* =========================================================================
            LEFT COLUMN: 외식창업 AI 검색 & 질의이력 (Dark Navy / Slate)
            ========================================================================= */}
        <aside
          className={`${
            mobileTab === 'history' ? 'flex' : 'hidden'
          } lg:flex flex-col bg-[#1A2332] text-white transition-all duration-300 border-r border-slate-800 ${
            isSidebarOpen ? 'w-full lg:w-72 2xl:w-80' : 'w-full lg:w-16'
          } shrink-0`}
        >
          {/* Sidebar Top Header */}
          <div className="p-4 border-b border-slate-800/80 flex items-center justify-between">
            {isSidebarOpen ? (
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-emerald-400" />
                <span className="font-black text-sm text-white tracking-wide">외식창업 AI 검색</span>
              </div>
            ) : (
              <Search className="w-5 h-5 text-emerald-400 mx-auto" />
            )}

            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800/80 transition hidden lg:block cursor-pointer"
              title={isSidebarOpen ? '사이드바 접기' : '사이드바 펼치기'}
              aria-label={isSidebarOpen ? '사이드바 접기' : '사이드바 펼치기'}
            >
              {isSidebarOpen ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeft className="w-4 h-4" />}
            </button>
          </div>

          {/* New Query Button: ONLY THIS BUTTON CREATES A NEW SESSION */}
          <div className="p-3">
            <button
              onClick={handleStartNewQuery}
              className={`w-full py-3 px-3.5 rounded-xl bg-slate-800 hover:bg-slate-700/90 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 border border-slate-700 transition cursor-pointer shadow-xs ${
                !isSidebarOpen && 'lg:px-0'
              }`}
            >
              <MessageSquare className="w-4 h-4 text-amber-400 shrink-0" />
              {isSidebarOpen && <span>새 질의</span>}
            </button>
          </div>

          {/* Session History ("질의이력") */}
          {isSidebarOpen && (
            <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
              <div className="text-[11px] font-bold text-slate-400 px-1 py-1.5 flex items-center gap-1.5">
                <Clock className="w-3 h-3 text-slate-500" />
                <span>질의이력</span>
              </div>

              {sessions.map((session) => {
                const isActive = session.id === activeSessionId;
                return (
                  <div
                    key={session.id}
                    onClick={() => {
                      setActiveSessionId(session.id);
                      setMobileTab('chat');
                    }}
                    className={`w-full text-left px-3 py-2.5 rounded-xl flex items-center justify-between text-xs transition cursor-pointer group ${
                      isActive
                        ? 'bg-amber-400 text-gray-900 font-black shadow-xs'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/80 font-medium'
                    }`}
                  >
                    <span className="truncate pr-2">{session.title || '새 질의'}</span>
                    <button
                      onClick={(e) => handleDeleteSession(e, session.id)}
                      className={`p-1 rounded-md transition ${
                        isActive
                          ? 'text-gray-900 hover:bg-amber-500/50'
                          : 'text-slate-400 hover:text-rose-400 opacity-0 group-hover:opacity-100'
                      }`}
                      title="질의 내역 삭제"
                      aria-label="질의 내역 삭제"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {/* Bottom Engine Indicator */}
          <div className="p-3 border-t border-slate-800 text-[11px] text-emerald-400 font-bold flex items-center gap-2 bg-slate-900/60">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            {isSidebarOpen && <span>24시간 실시간 AI 지식엔진 가동중</span>}
          </div>
        </aside>

        {/* =========================================================================
            CENTER COLUMN: AI 검색 질의응답 스트림 & 입력창
            ========================================================================= */}
        <main
          className={`${
            mobileTab === 'chat' ? 'flex' : 'hidden'
          } lg:flex flex-1 flex-col bg-white overflow-hidden relative border-r border-stone-200 min-h-[550px]`}
        >
          {/* Scrollable Chat Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
            
            {/* If Current Session Has No Messages -> Show Empty Welcome Screen (Image 2) */}
            {activeSession?.messages?.length === 0 ? (
              <div className="max-w-2xl mx-auto py-8 sm:py-12 space-y-8 animate-fadeIn">
                
                {/* Large Title Header */}
                <div className="text-center space-y-2">
                  <h1 className="text-2xl sm:text-4xl font-black text-gray-900 tracking-tight">
                    외식창업, AI로 검색하세요.
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-500 font-medium">
                    교육원 공식 자격증, 명장 레시피, 공간 컨설팅, 교육장 위치 정보를 원스톱 안내해 드립니다.
                  </p>
                </div>

                {/* Big Search Input Box */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    executeQuery(inputText);
                  }}
                  className="bg-white rounded-2xl border-2 border-emerald-500/80 shadow-lg p-3 sm:p-4 relative transition-all focus-within:ring-2 focus-within:ring-emerald-400"
                >
                  <textarea
                    ref={centerInputRef}
                    rows={2}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        executeQuery(inputText);
                      }
                    }}
                    placeholder="어떤 외식창업 정보 또는 교육과정을 찾으시나요?"
                    className="w-full text-xs sm:text-sm text-gray-800 placeholder-gray-400 focus:outline-none resize-none pr-12 font-medium"
                  />
                  <button
                    type="submit"
                    disabled={!inputText.trim() || isGenerating}
                    className="absolute right-3 bottom-3 w-9 h-9 rounded-full bg-[#2563EB] hover:bg-blue-700 text-white flex items-center justify-center transition disabled:opacity-40 cursor-pointer shadow-md"
                    title="질문 검색 전송"
                    aria-label="질문 검색 전송"
                  >
                    <ArrowUp className="w-5 h-5" />
                  </button>
                </form>

                {/* 4 Recommendation Prompt Cards */}
                <div className="space-y-2.5">
                  {welcomePrompts.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => executeQuery(item.text)}
                      className="w-full text-left p-3.5 bg-gray-50/80 hover:bg-emerald-50/60 rounded-xl border border-gray-200/90 hover:border-emerald-300 text-xs sm:text-sm text-gray-700 hover:text-emerald-950 font-bold transition flex items-center gap-3 cursor-pointer shadow-xs group"
                    >
                      <span className="text-amber-500 text-base">{item.icon}</span>
                      <span className="flex-1 group-hover:underline">“{item.text}”</span>
                    </button>
                  ))}
                </div>

                {/* Initial Welcome AI Analysis Card */}
                <div className="bg-[#F8FAF9] rounded-2xl border border-emerald-100 p-5 space-y-3 shadow-xs">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black text-white bg-[#1E5D3B]">
                      {welcomeCard.badge}
                    </span>
                    <span className="text-xs font-bold text-gray-900">{welcomeCard.title}</span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed font-medium">
                    {welcomeCard.analysisInfo}
                  </p>
                </div>
              </div>
            ) : (
              /* Active Conversation Turns */
              <div className="space-y-6 max-w-3xl mx-auto">
                {activeSession.messages.map((msg) => {
                  if (msg.sender === 'user') {
                    return (
                      <div key={msg.id} className="flex justify-end animate-fadeIn">
                        <div className="bg-[#EBF5FB] text-[#1E3A8A] border border-[#BFDBFE] px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold max-w-[85%] shadow-xs">
                          {msg.text}
                        </div>
                      </div>
                    );
                  }

                  // Bot Response Message (Cards + Recommended Questions)
                  return (
                    <div key={msg.id} className="space-y-4 animate-fadeIn">
                      {/* Analysis Cards */}
                      {(msg.cards || []).map((card) => (
                        <div
                          key={card.id}
                          className="bg-white rounded-2xl border border-stone-200 p-5 sm:p-6 shadow-sm space-y-4 hover:border-emerald-300 transition"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 pb-3">
                            <span
                              className={`px-3 py-1 rounded-full text-[11px] font-black text-white ${
                                card.badgeColor || 'bg-stone-800'
                              }`}
                            >
                              {card.badge}
                            </span>
                            <div className="flex items-center gap-1.5 text-xs font-black text-gray-900">
                              <span>{card.title}</span>
                              <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
                            </div>
                          </div>

                          {/* Analysis Info */}
                          <div className="space-y-1">
                            <div className="text-[11px] font-black text-gray-900">(분석 정보)</div>
                            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed whitespace-pre-line font-medium">
                              {card.analysisInfo}
                            </p>
                          </div>

                          {/* Recommend Reason */}
                          {card.recommendReason && (
                            <div className="space-y-1">
                              <div className="text-[11px] font-black text-emerald-800">(추천 이유)</div>
                              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-medium">
                                {card.recommendReason}
                              </p>
                            </div>
                          )}

                          {/* Direct Action Button */}
                          {card.actionTab && (
                            <div className="pt-2 flex justify-end">
                              <button
                                onClick={() => onNavigate && onNavigate(card.actionTab, card.actionSubTab)}
                                className="px-4 py-2 bg-[#1E5D3B] hover:bg-[#17482E] text-white text-xs font-black rounded-xl shadow-xs flex items-center gap-1.5 transition cursor-pointer hover:scale-105"
                              >
                                <span>{card.actionLabel || '바로가기'}</span>
                                <ChevronRight className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          )}
                        </div>
                      ))}

                      {/* Recommended Follow-Up Questions (Light Blue Box - Image 1790512512620) */}
                      {msg.followUpQuestions && msg.followUpQuestions.length > 0 && (
                        <div className="bg-[#EFF6FF] border border-[#DBEAFE] rounded-2xl p-4 sm:p-5 space-y-2.5">
                          <div className="text-xs font-bold text-[#1E40AF] flex items-center gap-1.5">
                            <span>추천 질문</span>
                          </div>
                          <div className="space-y-1.5">
                            {msg.followUpQuestions.map((q, qIdx) => (
                              <button
                                key={qIdx}
                                onClick={() => executeQuery(q)}
                                className="w-full text-left text-xs sm:text-sm text-[#1D4ED8] hover:text-[#1E3A8A] hover:underline font-semibold flex items-center gap-2 py-1 transition cursor-pointer"
                              >
                                <span className="text-blue-400">·</span>
                                <span>{q}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* AI Generating Indicator */}
                {isGenerating && (
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 px-4 py-3 rounded-2xl border border-emerald-200 animate-pulse w-fit">
                    <Sparkles className="w-4 h-4 animate-spin text-emerald-600" />
                    <span>외식창업 공식 지식 데이터베이스 정밀 분석 중...</span>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Sticky Bottom Input & Quick Chips */}
          <div className="border-t border-stone-200 bg-white p-3 sm:p-4 space-y-2.5 shrink-0">
            {/* Quick Chips Horizontal Scroll */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
              {quickChips.map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => executeQuery(chip.q)}
                  className="px-3 py-1.5 bg-gray-100 hover:bg-emerald-50 text-gray-700 hover:text-emerald-900 border border-gray-200 hover:border-emerald-300 rounded-full font-bold whitespace-nowrap transition cursor-pointer shrink-0"
                >
                  {chip.label}
                </button>
              ))}
            </div>

            {/* Input Field Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                executeQuery(inputText);
              }}
              className="flex items-center gap-2 bg-gray-50 border border-stone-300 rounded-2xl p-1.5 sm:p-2 focus-within:border-emerald-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-emerald-200 transition"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="질문을 입력하세요 (ex) '창업 컨설팅 받고싶어', '자격증 종류 알려줘', '명인 시상식 언제야'"
                className="flex-1 bg-transparent px-3 py-2 text-xs sm:text-sm text-gray-800 placeholder-gray-400 focus:outline-none font-medium"
              />
              <button
                type="submit"
                disabled={!inputText.trim() || isGenerating}
                className="p-2 sm:px-4 sm:py-2.5 bg-[#1E5D3B] hover:bg-[#17482E] text-white rounded-xl text-xs font-bold transition disabled:opacity-40 cursor-pointer flex items-center gap-1.5 shrink-0"
                title="질문 전송"
                aria-label="질문 전송"
              >
                <Send className="w-4 h-4" />
                <span className="hidden sm:inline">전송</span>
              </button>
            </form>
          </div>
        </main>

        {/* =========================================================================
            RIGHT COLUMN: 추천데이터 (Cards + Pagination)
            ========================================================================= */}
        <aside
          className={`${
            mobileTab === 'recommendations' ? 'flex' : 'hidden'
          } lg:flex flex-col bg-white w-full lg:w-80 2xl:w-96 p-4 sm:p-5 border-l border-stone-200 shrink-0 overflow-y-auto space-y-4`}
        >
          {/* Header & Sort Toggle */}
          <div className="flex items-center justify-between border-b border-stone-200 pb-3">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <h2 className="font-black text-sm text-gray-900">추천데이터</h2>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-bold">
              <button
                onClick={() => setSortOrder('accuracy')}
                className={`px-2.5 py-1 rounded-lg transition ${
                  sortOrder === 'accuracy'
                    ? 'bg-[#1E5D3B] text-white font-black'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                정확도순
              </button>
              <button
                onClick={() => setSortOrder('latest')}
                className={`px-2.5 py-1 rounded-lg transition ${
                  sortOrder === 'latest'
                    ? 'bg-[#1E5D3B] text-white font-black'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                최신순
              </button>
            </div>
          </div>

          {/* Recommended Data Cards */}
          <div className="space-y-3 flex-1">
            {currentRecommendations.map((rec) => {
              const isExpanded = expandedRecId === rec.id;
              return (
                <div
                  key={rec.id}
                  className="bg-white rounded-2xl border border-stone-200 p-4 space-y-2.5 shadow-2xs hover:border-emerald-400 transition"
                >
                  <div className="flex items-center justify-between gap-1">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-black text-white ${
                        rec.badgeColor || 'bg-emerald-600'
                      }`}
                    >
                      {rec.badge}
                    </span>
                    <button
                      onClick={() => setExpandedRecId(isExpanded ? null : rec.id)}
                      className="text-gray-400 hover:text-gray-600 p-1"
                      aria-label="상세 토글"
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>

                  <h3 className="text-xs sm:text-sm font-black text-gray-900 leading-snug">
                    {rec.title}
                  </h3>

                  <p className="text-[11px] text-gray-600 leading-relaxed font-medium">
                    {rec.desc}
                  </p>

                  {/* Meta Details Container */}
                  <div className="bg-gray-50 p-2.5 rounded-xl border border-stone-100 text-[10px] text-gray-600 space-y-1">
                    <div>{rec.meta}</div>
                    {isExpanded && rec.summaryTip && (
                      <div className="text-emerald-700 font-bold border-t border-stone-200 pt-1 mt-1">
                        💡 {rec.summaryTip}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between gap-2 pt-1">
                    {rec.summaryTip && (
                      <button
                        onClick={() =>
                          setActiveSummaryTip(activeSummaryTip === rec.id ? null : rec.id)
                        }
                        className="px-2.5 py-1.5 rounded-lg border border-stone-300 hover:bg-stone-100 text-[11px] font-bold text-gray-700 transition cursor-pointer"
                      >
                        퀵서머리(활용팁)
                      </button>
                    )}

                    <button
                      onClick={() => onNavigate && onNavigate(rec.actionTab, rec.actionSubTab)}
                      className="flex-1 px-3 py-1.5 bg-[#1E5D3B] hover:bg-[#17482E] text-white text-[11px] font-black rounded-lg transition flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <span>{rec.actionLabel || '바로가기'}</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Popup Tooltip for Quick Summary */}
                  {activeSummaryTip === rec.id && (
                    <div className="bg-amber-50 border border-amber-200 text-amber-900 p-2.5 rounded-xl text-[11px] font-semibold animate-fadeIn">
                      {rec.summaryTip}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-1 pt-3 border-t border-stone-200">
            {[1, 2, 3].map((page) => (
              <button
                key={page}
                onClick={() => setActivePageNum(page)}
                className={`w-7 h-7 rounded-lg text-xs font-bold transition ${
                  activePageNum === page
                    ? 'bg-[#1E5D3B] text-white font-black'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
