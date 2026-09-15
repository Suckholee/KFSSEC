import { useLanguage } from '../../i18n/LanguageContext';
import React from 'react';
import { PhoneCall, Zap, MessageSquare } from 'lucide-react';

export default function MobileQuickBar({ onGoToConsulting, onOpenEnrollment }) {
  const { tr, language } = useLanguage();
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-[#0B3C26] text-white px-3 py-2.5 border-t-2 border-[#C5A059] shadow-2xl flex items-center justify-between gap-2 backdrop-blur-md bg-opacity-98 animate-fadeIn">
      {/* Call Button */}
      <a
        href="tel:01072446796"
        className="flex-1 py-2.5 bg-white/10 hover:bg-white/20 text-white font-extrabold text-xs rounded-xl border border-white/20 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        aria-label={tr("입학 상담 전화 걸기")}
      >
        <PhoneCall className="w-4 h-4 text-[#D4AF37]" />
        <span>{tr("전화상담")}</span>
      </a>

      {/* 1:1 Quick Apply Button */}
      <button
        onClick={onGoToConsulting || onOpenEnrollment}
        className="flex-1 py-2.5 bg-[#C5A059] hover:bg-[#B38F48] text-white font-black text-xs rounded-xl shadow-md flex items-center justify-center gap-1.5 transition-all cursor-pointer border border-[#D4AF37]"
        aria-label={tr("1:1 수강 신청하기")}
      >
        <Zap className="w-4 h-4 text-white fill-white" />
        <span>{tr("⚡ 1:1 수강신청")}</span>
      </button>
    </div>
  );
}
