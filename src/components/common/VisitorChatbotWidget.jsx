import React, { useState } from 'react';
import { MessageSquare, X, Send, Bot, Sparkles, ChevronRight, PhoneCall, Building2, BookOpen, Award } from 'lucide-react';

export default function VisitorChatbotWidget({ onNavigate }) {
  const [isOpen, setIsOpen] = useState(false);
  const [chatLog, setChatLog] = useState([
    {
      sender: 'bot',
      text: '안녕하세요! (사)한국외식창업교육원 AI 도우미 챗봇입니다. 무엇이 궁금하신가요? 아래 버튼을 선택해 주세요.',
    },
  ]);

  const quickQuestions = [
    {
      id: 'courses',
      label: '💬 어떤 교육과정이 있나요?',
      reply: '외식창업지도사 2급, 외식창업실무사 2급, 한국음식능력(K-FOOD) 2급 온라인 과정이 있습니다. 수강 기간은 4주 이내이며 수강료와 일정은 교육원에 문의해 주세요.',
      actionTab: 'catalog',
      actionSubTab: 'courses',
    },
    {
      id: 'about',
      label: '🏛️ 교육원 소개를 보고 싶어요.',
      reply: '사단법인 한국외식창업교육원은 농림축산식품부 소관 비영리 사단법인으로 외식창업 명장 선생님들이 1:1 도제식 전수를 진행합니다.',
      actionTab: 'about',
      actionSubTab: 'greetings',
    },
    {
      id: 'masters',
      label: '👨‍🍳 명인·명장 정보를 보고 싶어요.',
      reply: '40년 경력의 안형상 이사장님을 비롯한 대한민국 조리 명인·명장 사업단에서 특제 레시피와 노하우를 직접 전수합니다.',
      actionTab: 'master',
      actionSubTab: 'masters',
    },
    {
      id: 'contact',
      label: '📞 1:1 문의 및 입학 상담은 어떻게 하나요?',
      reply: '대표전화 010-7244-6796로 즉시 전화 연결하시거나, 1:1 창업컨설팅 신청 페이지에서 문의글을 남기실 수 있습니다.',
      actionTab: 'consulting',
      actionSubTab: 'apply',
    },
  ];

  const handleSelectQuestion = (q) => {
    const userMsg = { sender: 'user', text: q.label };
    const botMsg = { sender: 'bot', text: q.reply, targetTab: q.actionTab, targetSub: q.actionSubTab };
    setChatLog((prev) => [...prev, userMsg, botMsg]);
  };

  return (
    <div className="fixed bottom-20 right-3 sm:right-6 z-50 animate-fadeIn">
      {/* Large Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="px-5 py-3.5 bg-[#0B3C26] hover:bg-[#072819] text-white font-black text-sm sm:text-base rounded-full shadow-2xl transition-all border-2 border-[#C5A059] flex items-center gap-2.5 cursor-pointer group hover:scale-105"
          aria-label="AI 챗봇 도우미 열기"
        >
          <div className="w-9 h-9 rounded-full bg-[#C5A059] text-white flex items-center justify-center font-black shadow-xs">
            <Bot className="w-5 h-5 text-[#0B3C26]" />
          </div>
          <span>💬 AI 안내 챗봇</span>
        </button>
      )}

      {/* Expanded Large Chatbot Window */}
      {isOpen && (
        <div className="bg-white rounded-3xl w-[92vw] sm:w-[460px] max-w-[480px] shadow-2xl border-2 border-[#0B3C26] overflow-hidden flex flex-col h-[560px] sm:h-[620px] transition-all">
          {/* Header */}
          <div className="bg-[#0B3C26] text-white p-4 px-6 flex items-center justify-between border-b-2 border-[#C5A059] shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#C5A059] flex items-center justify-center text-[#0B3C26] shadow-sm">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-black text-base sm:text-lg text-white leading-tight">한국외식창업교육원 챗봇</h4>
                <span className="text-xs text-emerald-200 font-bold">● 24시간 실시간 질문 도우미</span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full bg-black/30 hover:bg-black/60 text-white flex items-center justify-center transition-colors cursor-pointer"
              title="닫기"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Log with Increased Font Size & Spacing */}
          <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4 bg-[#FDFBF7] text-sm sm:text-base font-bold">
            {chatLog.map((msg, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[88%] p-3.5 sm:p-4 rounded-2xl leading-relaxed shadow-xs text-sm sm:text-base ${
                    msg.sender === 'user'
                      ? 'bg-[#0B3C26] text-white font-extrabold rounded-tr-none'
                      : 'bg-white text-gray-900 font-bold border border-stone-200 rounded-tl-none'
                  }`}
                >
                  {msg.text}
                </div>

                {msg.targetTab && (
                  <button
                    onClick={() => {
                      if (onNavigate) onNavigate(msg.targetTab, msg.targetSub);
                      setIsOpen(false);
                    }}
                    className="mt-2 px-4 py-2 bg-[#C5A059] hover:bg-[#B38F48] text-white text-xs sm:text-sm font-black rounded-xl transition-all shadow-sm flex items-center gap-1.5 cursor-pointer border border-[#D4AF37]"
                  >
                    <span>해당 페이지로 바로 이동</span>
                    <ChevronRight className="w-4 h-4 text-white" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Quick Option Selection Buttons (Larger & Clearer for All Ages) */}
          <div className="p-4 bg-white border-t-2 border-stone-200 space-y-2 shrink-0">
            <span className="text-xs sm:text-sm font-black text-gray-700 block px-1">
              원하시는 문의 항목을 아래에서 선택하세요:
            </span>
            <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto pr-1">
              {quickQuestions.map((q) => (
                <button
                  key={q.id}
                  onClick={() => handleSelectQuestion(q)}
                  className="w-full text-left p-3 sm:p-3.5 bg-[#F8F6F0] hover:bg-emerald-50 text-gray-900 font-extrabold text-xs sm:text-sm rounded-2xl border border-stone-300 hover:border-[#0B3C26] transition-all flex items-center justify-between cursor-pointer shadow-2xs group"
                >
                  <span className="group-hover:text-[#0B3C26]">{q.label}</span>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#0B3C26] group-hover:translate-x-0.5 transition-transform" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
