import React from 'react';
import { X, Building2, Calendar, UserCheck, Award, Globe, CheckCircle2 } from 'lucide-react';

export default function AboutModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative border border-gray-100 space-y-6 overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-4 border-b border-gray-100 pb-5">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
            <svg viewBox="0 0 100 100" className="w-11 h-11">
              <path d="M 15,55 A 35,35 0 0,0 85,55 Z" fill="#10B981" />
              <path d="M 50,45 C 40,25 30,30 35,48 Z" fill="#22C55E" />
              <path d="M 50,45 C 50,20 60,20 58,45 Z" fill="#F97316" />
              <path d="M 50,45 C 65,25 75,32 68,48 Z" fill="#0EA5E9" />
            </svg>
          </div>
          <div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md">
              공식 지정 단체
            </span>
            <h2 className="text-2xl font-black text-gray-900 tracking-tight mt-1">
              사단법인 한국외식창업교육원
            </h2>
            <p className="text-xs text-gray-400 font-medium">
              Korea Food Service Startup Education Center
            </p>
          </div>
        </div>

        {/* Legal Corporate Profile Card (Image Spec Match) */}
        <div className="bg-stone-100/80 rounded-2xl p-6 border border-stone-200/60 space-y-3.5 text-sm text-gray-800">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="flex items-center gap-2.5">
              <Building2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <div>
                <span className="text-xs text-gray-400 font-medium block">법인명</span>
                <span className="font-bold text-gray-900">사단법인 한국외식창업교육원</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Globe className="w-4 h-4 text-emerald-600 shrink-0" />
              <div>
                <span className="text-xs text-gray-400 font-medium block">영문명</span>
                <span className="font-bold text-gray-900">Korea Food Service Startup Education Center</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <UserCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <div>
                <span className="text-xs text-gray-400 font-medium block">대표자</span>
                <span className="font-bold text-gray-900">안형상 이사장</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Award className="w-4 h-4 text-emerald-600 shrink-0" />
              <div>
                <span className="text-xs text-gray-400 font-medium block">분야</span>
                <span className="font-bold text-gray-900">창업 외식 교육</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 sm:col-span-2">
              <Calendar className="w-4 h-4 text-emerald-600 shrink-0" />
              <div>
                <span className="text-xs text-gray-400 font-medium block">설립 및 허가일자</span>
                <span className="font-bold text-gray-900">2022년 7월 12일</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-gray-900">기관 소개 및 비전</h3>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-medium">
            사단법인 한국외식창업교육원은 2022년 7월 12일 설립인가를 받은 국내 최고 권위의 외식 창업 실무 교육기관입니다. 외식 창업 준비부터 메뉴 개발, 상권 분석, 매장 운영 효율화까지 체계적인 컨설팅 및 자격증 교육으로 예비 및 기존 사업자의 성공을 도모합니다.
          </p>
        </div>

        {/* Footer Action */}
        <div className="pt-3 border-t border-gray-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-[#1E2B4D] hover:bg-slate-900 text-white font-bold text-xs sm:text-sm rounded-xl transition-colors shadow-sm"
          >
            확인 및 닫기
          </button>
        </div>

      </div>
    </div>
  );
}
