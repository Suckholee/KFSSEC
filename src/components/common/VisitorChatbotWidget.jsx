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
      reply: '저희 교육원에는 외식창업 성공전략, 상권·입지 분석, 메뉴개발과 원가관리, 매장 운영·서비스 관리 등 12개 실전 교육과정이 준비되어 있습니다.',
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
      actionSubTab: 'intro',
    },
    {
      id: 'contact',
      label: '📞 1:1 문의 및 입학 상담은 어떻게 하나요?',
      reply: '대표전화 02-511-8484로 즉시 전화 연결하시거나, 1:1 창업컨설팅 신청 페이지에서 문의글을 남기실 수 있습니다.',
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
    <div className="fixed bottom-20 right-4 sm:right-6 z-50 animate-fadeIn">
      {/* Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="px-4 py-3 bg-[#0B3C26] hover:bg-[#072819] text-white font-black text-xs sm:text-sm rounded-full shadow-2xl transition-all border-2 border-[#C5A059] flex items-center gap-2 cursor-pointer group"
          aria-label="AI 챗봇 도우미 열기"
        >
          <div className="w-8 h-8 rounded-full bg-[#C5A059] text-white flex items-center justify-center font-black">
            <Bot className="w-5 h-5 text-[#0B3C26]" />
          </div>
          <span>💬 AI 안내 챗봇</span>
        </button>
      )}

      {/* Chatbot Window */}
      {isOpen && (
        <div className="bg-white rounded-3xl max-w-sm w-80 sm:w-96 shadow-2xl border-2 border-[#0B3C26] overflow-hidden flex flex-col h-[480px]">
          {/* Header */}
          <div className="bg-[#0B3C26] text-white p-4 px-5 flex items-center justify-between border-b border-[#C5A059]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#C5A059] flex items-center justify-center text-[#0B3C26]">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-white leading-tight">한국외식창업교육원 챗봇</h4>
                <span className="text-[10px] text-emerald-200 font-bold">● 24시간 실시간 질문 도우미</span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="w-7 h-7 rounded-full bg-black/20 hover:bg-black/40 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Log */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#FDFBF7] text-xs font-bold">
            {chatLog.map((msg, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl leading-relaxed shadow-xs ${
                    msg.sender === 'user'
                      ? 'bg-[#0B3C26] text-white rounded-tr-none'
                      : 'bg-white text-gray-800 border border-gray-200 rounded-tl-none'
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
                    className="mt-1.5 px-3 py-1.5 bg-[#C5A059] hover:bg-[#B38F48] text-white text-[11px] font-black rounded-lg transition-all shadow-xs flex items-center gap-1 cursor-pointer"
                  >
                    <span>해당 페이지로 바로 이동</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Quick Option Selection Buttons (Designed for Middle-aged Users) */}
          <div className="p-3 bg-white border-t border-gray-200 space-y-1.5">
            <span className="text-[11px] font-extrabold text-gray-500 block px-1">원하시는 문의를 선택해주세요:</span>
            <div className="grid grid-cols-1 gap-1.5 max-h-36 overflow-y-auto pr-1">
              {quickQuestions.map((q) => (
                <button
                  key={q.id}
                  onClick={() => handleSelectQuestion(q)}
                  className="w-full text-left p-2.5 bg-stone-50 hover:bg-emerald-50 text-gray-900 font-extrabold text-xs rounded-xl border border-stone-200 hover:border-emerald-500 transition-all flex items-center justify-between cursor-pointer"
                >
                  <span>{q.label}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
