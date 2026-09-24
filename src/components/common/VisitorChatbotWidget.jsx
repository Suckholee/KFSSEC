import { useLanguage } from '../../i18n/LanguageContext';
import React, { useState, useEffect, useRef } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Bot,
  Sparkles,
  ChevronRight,
  PhoneCall,
  Building2,
  BookOpen,
  Award,
  ArrowRight,
  FileQuestion,
} from 'lucide-react';
import {
  getChatbotConfig,
  findBotAnswer,
} from '../../services/chatbotConfig';

export default function VisitorChatbotWidget({ onNavigate }) {
  const { t } = useLanguage();
  const [config, setConfig] = useState(getChatbotConfig());
  const [isOpen, setIsOpen] = useState(false);
  const [showNudge, setShowNudge] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const [chatLog, setChatLog] = useState(() => [
    {
      sender: 'bot',
      text: config.welcomeMessage,
    },
  ]);

  // Keep synced with admin updates
  useEffect(() => {
    const handleConfigUpdate = () => {
      const fresh = getChatbotConfig();
      setConfig(fresh);
    };
    window.addEventListener('kfssec_chatbot_config_updated', handleConfigUpdate);
    return () => window.removeEventListener('kfssec_chatbot_config_updated', handleConfigUpdate);
  }, []);

  // Listen for open trigger from Header or other CTA buttons
  useEffect(() => {
    const handleExternalOpen = () => {
      setIsOpen(true);
      setShowNudge(false);
    };
    window.addEventListener('kfssec_open_chatbot', handleExternalOpen);
    return () => window.removeEventListener('kfssec_open_chatbot', handleExternalOpen);
  }, []);

  // Show floating nudge tooltip after delay
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setShowNudge(true);
      }, (config.nudgeDelaySeconds || 2) * 1000);
      return () => clearTimeout(timer);
    } else {
      setShowNudge(false);
    }
  }, [isOpen, config.nudgeDelaySeconds]);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatLog, isTyping, isOpen]);

  if (config.enabled === false) {
    return null;
  }

  const handleSelectQuestion = (q) => {
    const userMsg = { sender: 'user', text: q.label };
    setChatLog((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      const botMsg = {
        sender: 'bot',
        text: q.reply,
        targetTab: q.actionTab,
        targetSub: q.actionSubTab,
        actionLabel: q.actionLabel || '해당 페이지로 바로 이동',
      };
      setChatLog((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 300);
  };

  const handleSendMessage = (e) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;

    const userText = inputText.trim();
    setInputText('');

    const userMsg = { sender: 'user', text: userText };
    setChatLog((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      const result = findBotAnswer(userText, config);
      const botMsg = {
        sender: 'bot',
        text: result.text,
        targetTab: result.targetTab,
        targetSub: result.targetSub,
        actionLabel: result.actionLabel,
        isFallback: result.isFallback,
        userQuery: userText,
      };
      setChatLog((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 400);
  };

  const handleNavigateWithQuery = (targetTab, targetSub, userQuery) => {
    if (userQuery) {
      try {
        localStorage.setItem(
          'kfssec_inquiry_draft',
          JSON.stringify({
            title: `[AI 챗봇 연계 문의] ${userQuery}`,
            content: `AI 챗봇 상담 중 심층 맞춤 상담을 위해 접수된 문의입니다.\n\n[문의 내용]:\n${userQuery}\n\n추가 상담 및 일정 안내를 부탁드립니다.`,
          })
        );
      } catch (e) {}
    }

    if (onNavigate) {
      onNavigate(targetTab, targetSub);
    }
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-20 right-3 sm:right-6 z-50 animate-fadeIn font-sans">
      {/* Nudge Speech Bubble Prompt */}
      {!isOpen && showNudge && (
        <div className="absolute bottom-16 right-0 mb-2 w-72 sm:w-80 bg-white rounded-2xl p-3.5 shadow-2xl border-2 border-[#0B3C26] animate-bounce duration-1000 flex items-start justify-between gap-2.5 z-50">
          <div
            onClick={() => {
              setIsOpen(true);
              setShowNudge(false);
            }}
            className="flex items-start gap-2.5 cursor-pointer flex-1"
          >
            <div className="w-8 h-8 rounded-full bg-[#C5A059] flex items-center justify-center text-[#0B3C26] shrink-0 font-black shadow-xs">
              <Sparkles className="w-4 h-4 fill-white text-white" />
            </div>
            <div className="space-y-0.5">
              <span className="text-[11px] font-black text-[#0B3C26] block">
                {t(config.botName || '한국외식창업교육원 AI 도우미')}
              </span>
              <p className="text-xs text-gray-800 font-extrabold leading-snug">
                {t(config.nudgeMessage || '💬 24시간 실시간 AI 상담 운영 중! 외식창업·자격증 무엇이든 물어보세요.')}
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowNudge(false)}
            className="p-1 text-gray-400 hover:text-black rounded-lg transition-colors cursor-pointer shrink-0"
            title={t('닫기')}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => {
            setIsOpen(true);
            setShowNudge(false);
          }}
          className="px-5 py-3.5 bg-[#0B3C26] hover:bg-[#072819] text-white font-black text-sm sm:text-base rounded-full shadow-2xl transition-all border-2 border-[#C5A059] flex items-center gap-2.5 cursor-pointer group hover:scale-105"
          aria-label={t('AI 챗봇 도우미 열기', 'Open AI guide')}
        >
          <div className="w-9 h-9 rounded-full bg-[#C5A059] text-white flex items-center justify-center font-black shadow-xs relative">
            <Bot className="w-5 h-5 text-[#0B3C26]" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-pulse" />
          </div>
          <span>{t('💬 24시 AI 상담 챗봇', '💬 24h AI Chatbot')}</span>
        </button>
      )}

      {/* Expanded Interactive Chatbot Window */}
      {isOpen && (
        <div className="bg-white rounded-3xl w-[92vw] sm:w-[460px] max-w-[480px] shadow-2xl border-2 border-[#0B3C26] overflow-hidden flex flex-col h-[580px] sm:h-[640px] max-h-[calc(100dvh-6rem)] transition-all">
          {/* Header */}
          <div className="bg-[#0B3C26] text-white p-4 px-5 flex items-center justify-between border-b-2 border-[#C5A059] shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#C5A059] flex items-center justify-center text-[#0B3C26] shadow-sm">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-black text-base sm:text-lg text-white leading-tight">
                  {t(config.botName || '한국외식창업교육원 AI 도우미')}
                </h4>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs text-emerald-200 font-bold">
                    {t('24시간 실시간 대화형 AI 상담 가동중')}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full bg-black/30 hover:bg-black/60 text-white flex items-center justify-center transition-colors cursor-pointer"
              title={t('닫기')}
              aria-label={t('닫기')}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Log Container */}
          <div className="flex-1 min-h-0 p-4 sm:p-5 overflow-y-auto space-y-4 bg-[#FDFBF7] text-sm font-bold">
            {chatLog.map((msg, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[88%] p-3.5 sm:p-4 rounded-2xl leading-relaxed text-xs sm:text-sm ${
                    msg.sender === 'user'
                      ? 'bg-[#0B3C26] text-white font-extrabold rounded-tr-none shadow-md'
                      : 'bg-white text-gray-900 font-bold border border-stone-200 rounded-tl-none shadow-xs whitespace-pre-line'
                  }`}
                >
                  {t(msg.text)}
                </div>

                {msg.targetTab && (
                  <button
                    onClick={() =>
                      handleNavigateWithQuery(msg.targetTab, msg.targetSub, msg.userQuery)
                    }
                    className="mt-2 px-4 py-2 bg-[#C5A059] hover:bg-[#B38F48] text-white text-xs sm:text-sm font-black rounded-xl transition-all shadow-sm flex items-center gap-1.5 cursor-pointer border border-[#D4AF37]"
                  >
                    <span>{t(msg.actionLabel || '해당 페이지로 바로 이동')}</span>
                    <ChevronRight className="w-4 h-4 text-white" />
                  </button>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 p-3 bg-white border border-stone-200 rounded-2xl w-24 text-gray-400">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce [animation-delay:0.4s]" />
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Option Selection Buttons */}
          <div className="p-3 sm:p-3.5 bg-stone-50 border-t border-stone-200 space-y-1.5 shrink-0 max-h-36 overflow-y-auto">
            <span className="text-[11px] sm:text-xs font-black text-gray-600 block px-1">
              {t('추천 질문을 선택하시거나 아래에 직접 입력하세요:')}
            </span>
            <div className="flex flex-col gap-1.5">
              {config.quickButtons.map((q) => (
                <button
                  key={q.id}
                  onClick={() => handleSelectQuestion(q)}
                  className="w-full text-left p-2.5 sm:p-3 bg-white hover:bg-emerald-50 text-gray-900 font-extrabold text-xs sm:text-sm rounded-xl border border-stone-300 hover:border-[#0B3C26] transition-all flex items-center justify-between cursor-pointer shadow-2xs group"
                >
                  <span className="group-hover:text-[#0B3C26] truncate">{t(q.label)}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#0B3C26] group-hover:translate-x-0.5 transition-transform shrink-0" />
                </button>
              ))}
            </div>
          </div>

          {/* Free Text Input Form */}
          <form
            onSubmit={handleSendMessage}
            className="p-3 bg-white border-t-2 border-stone-200 flex items-center gap-2 shrink-0"
          >
            <input
              type="text"
              placeholder={t('외식창업, 수강료, 자격증 무엇이든 물어보세요...')}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 px-4 py-2.5 bg-stone-100 border border-stone-300 rounded-2xl text-xs sm:text-sm font-bold text-gray-900 focus:outline-none focus:border-[#0B3C26] focus:bg-white transition-all shadow-inner"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-2.5 sm:px-4 sm:py-2.5 bg-[#0B3C26] hover:bg-[#072819] disabled:bg-gray-300 text-white rounded-2xl shadow-md transition-all flex items-center justify-center cursor-pointer disabled:cursor-not-allowed border border-[#C5A059]"
              title={t('전송')}
            >
              <Send className="w-4 h-4 text-[#D4AF37]" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
