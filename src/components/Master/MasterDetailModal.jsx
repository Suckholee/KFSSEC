import React from 'react';
import { X, Award, CheckCircle2, ShieldCheck, ChevronRight, BookOpen, Star, Calendar } from 'lucide-react';

export default function MasterDetailModal({ isOpen, master, onClose }) {
  if (!isOpen || !master) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl transition-all border-2 border-[#0B3C26] max-h-[92vh] flex flex-col cursor-default"
      >
        {/* Header */}
        <div className="bg-[#0B3C26] text-white p-6 sm:p-7 relative shrink-0 border-b-2 border-[#C5A059]">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-black/30 hover:bg-black/60 text-white flex items-center justify-center transition-colors cursor-pointer"
            title="닫기 (ESC)"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-[#C5A059] shadow-md bg-white shrink-0">
              <img
                src={master.image}
                alt={master.name}
                className="w-full h-full object-cover object-center"
              />
            </div>

            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#C5A059]/20 border border-[#C5A059]/40 text-[#D4AF37] text-xs font-black">
                <Award className="w-3.5 h-3.5" />
                <span>{master.badge || '사단법인 한국외식창업교육원 명장'}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white font-serif">
                {master.name}
              </h2>

              <p className="text-xs sm:text-sm text-emerald-100/90 font-bold">
                {master.title}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Main Body */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto flex-1 text-xs sm:text-sm font-bold text-gray-800 bg-[#FDFBF7]">
          
          {/* Intro Overview Box */}
          <div className="bg-white p-5 rounded-2xl border border-[#E5E0D8] shadow-xs space-y-2">
            <h3 className="text-sm font-black text-[#0B3C26] flex items-center gap-2">
              <Star className="w-4 h-4 text-[#C5A059]" />
              <span>명인 소개 및 전문 분야</span>
            </h3>
            <p className="text-xs sm:text-sm text-gray-700 font-medium leading-relaxed">
              {master.intro}
            </p>
          </div>

          {/* Awards & Career Timeline List */}
          <div className="space-y-3">
            <h3 className="text-base font-black text-gray-900 flex items-center gap-2 border-b-2 border-[#0B3C26] pb-2">
              <Award className="w-4 h-4 text-[#0B3C26]" />
              <span>주요 이력, 활동 및 수상 경력</span>
            </h3>

            <div className="bg-white p-5 rounded-2xl border border-gray-200 space-y-2.5 shadow-xs">
              {master.awards && master.awards.map((award, idx) => (
                <div key={idx} className="flex items-start gap-3 py-1 border-b border-stone-100 last:border-0">
                  <CheckCircle2 className="w-4 h-4 text-[#0B3C26] shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-gray-800 font-bold leading-relaxed">{award}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-gray-100 p-4 px-6 border-t border-gray-200 flex items-center justify-between text-xs text-gray-600 font-bold shrink-0">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#0B3C26]" />
            <span>사단법인 한국외식창업교육원 검증 명인 사업단</span>
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#0B3C26] text-white rounded-xl font-bold hover:bg-[#072819] transition-colors cursor-pointer"
          >
            닫기
          </button>
        </div>

      </div>
    </div>
  );
}
