import React from 'react';
import { Award, Calendar, ChevronRight, Sparkles, Trophy, Users } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

export default function AwardCeremonyBannerSection({ onGoToGallery, onGoToInquiry }) {
  const { tr } = useLanguage();

  return (
    <section className="w-full bg-gradient-to-r from-[#072819] via-[#0B3C26] to-[#051C12] text-white py-6 sm:py-8 border-y-2 border-[#C5A059] relative overflow-hidden shadow-2xl">
      {/* Background Decorative Gold Ornaments */}
      <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full px-4 sm:px-8 lg:px-12 max-w-[1520px] mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          
          {/* Left: Badge & Titles */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 sm:gap-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#C5A059] to-[#8C6D2D] p-0.5 shadow-xl shrink-0 flex items-center justify-center">
              <div className="w-full h-full bg-[#0B3C26] rounded-2xl flex flex-col items-center justify-center p-2 text-center border border-[#C5A059]/50">
                <Trophy className="w-7 h-7 sm:w-8 sm:h-8 text-[#D4AF37] animate-pulse" />
                <span className="text-[9px] font-black text-[#D4AF37] tracking-tighter mt-0.5">D-DAY</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A059]/20 border border-[#C5A059]/50 text-[#D4AF37] text-xs font-black">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{tr("2026 KFSSEC 공식 시상식 개최 안내")}</span>
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight leading-snug">
                {tr("대한민국 외식산업 명인·명장 추계 시상식 및 선정식")}
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100/90 font-medium leading-relaxed max-w-2xl">
                {tr("한국 전통 식문화의 계승과 K-FOOD 세계화에 기여한 최고 권위의 조리명장 및 명인을 선정하고 공식 인증패를 수여합니다.")}
              </p>
            </div>
          </div>

          {/* Right: Date Badge & Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
            {/* Date Box */}
            <div className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-black/40 border border-[#C5A059]/40 flex items-center justify-center sm:justify-start gap-3">
              <Calendar className="w-5 h-5 text-[#D4AF37] shrink-0" />
              <div className="text-left">
                <span className="text-[10px] font-bold text-gray-400 block uppercase tracking-wider">{tr("시상식 일시")}</span>
                <span className="text-sm font-black text-white tracking-wide">{tr("2026. 10. 19 (월)")}</span>
              </div>
            </div>

            {/* CTA Button 1: Gallery */}
            <button
              onClick={onGoToGallery}
              className="w-full sm:w-auto px-5 py-3.5 bg-gradient-to-r from-[#C5A059] to-[#D4AF37] hover:from-[#b08e4c] hover:to-[#c5a059] text-gray-950 font-black text-xs sm:text-sm rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer border border-amber-200"
            >
              <Award className="w-4 h-4 text-gray-950" />
              <span>{tr("시상식 갤러리 보기")}</span>
              <ChevronRight className="w-4 h-4 text-gray-950" />
            </button>

            {/* CTA Button 2: Inquiry */}
            <button
              onClick={onGoToInquiry}
              className="w-full sm:w-auto px-4 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm rounded-2xl transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-white/20"
            >
              <span>{tr("시상식 문의")}</span>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
