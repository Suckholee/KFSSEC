import { useLanguage } from '../../i18n/LanguageContext';
import React from 'react';
import { ArrowUpRight, MessageSquare } from 'lucide-react';

export default function MobileQuickBar({ onGoToConsulting, onOpenEnrollment, onOpenAiAssistant }) {
  const { tr } = useLanguage();
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-[#FAF9F5] text-[#183D30] px-3 pt-2.5 pb-[calc(10px+env(safe-area-inset-bottom))] border-t border-[#DDDCCE] flex items-center justify-between gap-2">
      {/* AI Chatbot Button */}
      <button
        onClick={() => {
          if (onOpenAiAssistant) {
            onOpenAiAssistant();
          } else {
            window.dispatchEvent(new CustomEvent('kfssec_open_chatbot'));
          }
        }}
        className="flex-1 min-w-0 min-h-[44px] py-2 hover:bg-[#EDEFE8] text-[#183D30] font-medium text-[11px] rounded-md flex items-center justify-center gap-1 transition-all cursor-pointer"
        aria-label={tr("24시 AI 상담 챗봇")}
      >
        <MessageSquare className="w-3.5 h-3.5" aria-hidden="true" />
        <span>{tr("AI상담")}</span>
      </button>

      {/* 1:1 Quick Apply Button */}
      <button
        onClick={onGoToConsulting || onOpenEnrollment}
        className="flex-1 min-w-0 min-h-[44px] py-2 bg-[#183D30] hover:bg-[#275240] text-white font-medium text-[11px] rounded-md flex items-center justify-center gap-1 transition-all cursor-pointer"
        aria-label={tr("1:1 수강 신청하기")}
      >
        <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
        <span>{tr("1:1신청")}</span>
      </button>
    </div>
  );
}
