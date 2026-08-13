import React from 'react';
import { X, Building2, Calendar, UserCheck, Award, Globe, Scale } from 'lucide-react';

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
          <img
            src="/images/official_logo.png"
            alt="사단법인 한국외식창업교육원"
            className="h-14 w-auto object-contain"
          />
        </div>

        {/* Official Corporate Information Card */}
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

        {/* Legal Establishment Purpose Section */}
        <div className="space-y-3">
          <h3 className="text-base font-black text-gray-900 flex items-center gap-2">
            <Scale className="w-4 h-4 text-emerald-700" />
            <span>설립목적</span>
          </h3>
          <div className="bg-emerald-50/70 p-4 rounded-xl border border-emerald-200/80 space-y-2 text-xs sm:text-sm text-gray-800 font-bold leading-relaxed">
            <p className="flex items-start gap-2">
              <span className="text-emerald-700 font-black">•</span>
              <span>본원은 [민법] 제32조 (비영리법인의 설립과 허가) 및 농림축산식품부 장관 및 그 소속 청장소관 비영리법인의 설립 및 감독에 관한규칙 제 5조의 규정에 의하여 설립됨.</span>
            </p>
            <p className="flex items-start gap-2 pt-1 border-t border-emerald-100">
              <span className="text-emerald-700 font-black">•</span>
              <span>본원은 농수축산물을 활용한 외식산업 발전과 외식창업교육을 통해 외식산업 경쟁력에 기여함으로써, 국내 및 국외 외식산업을 발전시킴.</span>
            </p>
          </div>
        </div>

        {/* Footer Action */}
        <div className="pt-3 border-t border-gray-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-[#0F5132] hover:bg-emerald-900 text-white font-bold text-xs sm:text-sm rounded-xl transition-colors shadow-sm cursor-pointer"
          >
            확인 및 닫기
          </button>
        </div>

      </div>
    </div>
  );
}
