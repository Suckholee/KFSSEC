import { useLanguage } from '../../i18n/LanguageContext';
import React from 'react';
import { PhoneCall, Zap, MessageSquare } from 'lucide-react';

export default function MobileQuickBar({ onGoToConsulting, onOpenEnrollment, onOpenAiAssistant }) {
  const { tr, language } = useLanguage();
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-gradient-to-r from-[#14532D] via-[#15803D] to-[#16A34A] text-white px-3 py-2.5 border-t border-[#4ADE80]/30 shadow-2xl flex items-center justify-between gap-2 backdrop-blur-md bg-opacity-98 animate-fadeIn">
      {/* Call Button */}
      <a
        href="tel:01072446796"
        className="flex-1 py-2 bg-white/10 hover:bg-white/20 text-white font-extrabold text-[11px] rounded-xl border border-white/20 flex items-center justify-center gap-1 transition-colors cursor-pointer"
        aria-label={tr("입학 상담 전화 걸기")}
      >
        <PhoneCall className="w-3.5 h-3.5 text-[#86EFAC]" />
        <span>{tr("전화상담")}</span>
      </a>

      {/* AI Chatbot Button */}
      <button
        onClick={() => {
          if (onOpenAiAssistant) {
            onOpenAiAssistant();
          } else {
            window.dispatchEvent(new CustomEvent('kfssec_open_chatbot'));
          }
        }}
        className="flex-1 py-2 bg-white/15 hover:bg-white/25 text-white font-black text-[11px] rounded-xl border border-white/20 flex items-center justify-center gap-1 transition-all cursor-pointer shadow-xs"
        aria-label={tr("24시 AI 상담 챗봇")}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80] animate-pulse" />
        <span>{tr("💬 AI상담")}</span>
      </button>

      {/* 1:1 Quick Apply Button - Highlighted in Logo Orange Accent */}
      <button
        onClick={onGoToConsulting || onOpenEnrollment}
        className="flex-1 py-2 bg-gradient-to-r from-[#EA580C] to-[#F97316] hover:from-[#C2410C] hover:to-[#EA580C] text-white font-black text-[11px] rounded-xl shadow-lg flex items-center justify-center gap-1 transition-all cursor-pointer border border-orange-300"
        aria-label={tr("1:1 수강 신청하기")}
      >
        <Zap className="w-3.5 h-3.5 text-white fill-white" />
        <span>{tr("⚡ 1:1신청")}</span>
      </button>
    </div>
  );
}
