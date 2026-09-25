import { useLanguage } from '../i18n/LanguageContext';
import React from 'react';
import { ChevronRight, GraduationCap, Award, Building2, ChevronDown } from 'lucide-react';

export default function Hero({ onExploreClick, onAboutClick, onScrollNext }) {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-[#0A0D0B] text-white border-b-2 border-[#C5A059] shadow-2xl">
      
      {/* Main Wide Banner Image Showcase (1024x285 aspect ratio) */}
      <div className="relative w-full max-w-[1920px] mx-auto bg-black">
        <div className="relative w-full aspect-[1024/310] sm:aspect-[1024/285] min-h-[260px] sm:min-h-[340px] md:min-h-[420px] lg:min-h-[480px] flex items-center justify-center overflow-hidden">
          <img
            src="/images/main_banner_masters.png"
            alt={t("꿈꾸는 외식창업 아무에게나 맡기시겠습니까? 사단법인 한국외식창업교육원 대한민국 명인·명장 교수진")}
            className="w-full h-full object-cover sm:object-contain lg:object-cover object-center transform transition-transform duration-700 hover:scale-[1.01]"
          />
          {/* Bottom subtle gradient fade */}
          <div className="absolute inset-x-0 bottom-0 h-16 sm:h-24 bg-gradient-to-t from-[#0A0D0B] via-[#0A0D0B]/60 to-transparent pointer-events-none" />
        </div>

        {/* Floating Action Buttons & 3 Core Stats Overlay */}
        <div className="relative z-10 -mt-8 sm:-mt-12 md:-mt-16 pb-8 sm:pb-10 px-4 sm:px-8 max-w-7xl mx-auto flex flex-col items-center gap-5 sm:gap-6">
          
          {/* Action Buttons Row */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
            <button
              onClick={onExploreClick}
              className="px-7 sm:px-9 py-3.5 bg-gradient-to-r from-[#0B3C26] to-[#146340] hover:from-[#072819] hover:to-[#0B3C26] text-white font-black text-sm sm:text-base rounded-2xl shadow-2xl transition-all flex items-center justify-center gap-2 border-2 border-[#C5A059] cursor-pointer group"
              aria-label={t("교육과정 둘러보기 목록으로 이동")}
            >
              <span>{t("교육과정 둘러보기")}</span>
              <ChevronRight className="w-5 h-5 text-[#D4AF37] group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onAboutClick}
              className="px-7 sm:px-9 py-3.5 bg-black/80 hover:bg-black text-[#D4AF37] hover:text-white font-black text-sm sm:text-base rounded-2xl shadow-2xl transition-all flex items-center justify-center gap-2 border-2 border-[#C5A059]/80 cursor-pointer group backdrop-blur-md"
              aria-label={t("교육원 상세 소개 페이지로 이동")}
            >
              <span>{t("교육원 소개")}</span>
              <ChevronRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* 3 Core Stats Card */}
          <div className="w-full max-w-2xl bg-white text-gray-900 border-2 border-[#C5A059] rounded-2xl p-4 sm:p-5 shadow-2xl">
            <div className="grid grid-cols-3 gap-2 sm:gap-4 divide-x divide-stone-200">
              
              {/* Stat 1: 1·2급 자격과정 */}
              <div className="flex flex-col items-center text-center px-1">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#F2ECE0] border border-[#D4C5B0] flex items-center justify-center mb-1 text-[#0B3C26] shadow-xs">
                  <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2]" />
                </div>
                <span className="text-sm sm:text-base lg:text-lg font-black text-[#0B3C26] tracking-tight leading-tight">
                  {t("온·오프라인")}
                </span>
                <span className="text-[11px] sm:text-xs font-bold text-gray-600 mt-0.5">
                  {t("1·2급 자격과정")}
                </span>
              </div>

              {/* Stat 2: 수강 기간 */}
              <div className="flex flex-col items-center text-center px-1">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#F2ECE0] border border-[#D4C5B0] flex items-center justify-center mb-1 text-[#0B3C26] shadow-xs">
                  <Award className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2]" />
                </div>
                <span className="text-sm sm:text-base lg:text-lg font-black text-[#0B3C26] tracking-tight leading-tight">
                  {t("4~8주 완성")}
                </span>
                <span className="text-[11px] sm:text-xs font-bold text-gray-600 mt-0.5">
                  {t("수강 기간")}
                </span>
              </div>

              {/* Stat 3: 5대 전문과정 */}
              <div className="flex flex-col items-center text-center px-1">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#F2ECE0] border border-[#D4C5B0] flex items-center justify-center mb-1 text-[#0B3C26] shadow-xs">
                  <Building2 className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2]" />
                </div>
                <span className="text-sm sm:text-base lg:text-lg font-black text-[#0B3C26] tracking-tight leading-tight">
                  {t("5대 전문과정")}
                </span>
                <span className="text-[11px] sm:text-xs font-bold text-gray-600 mt-0.5 truncate max-w-[120px] sm:max-w-none">
                  {t("창업·푸드테크·와인")}
                </span>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* Scroll Down Indicator */}
      {onScrollNext && (
        <button
          onClick={onScrollNext}
          className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 group cursor-pointer focus-visible:ring-2 focus-visible:ring-[#C5A059] focus-visible:outline-none rounded-full p-1"
          aria-label={t("아래 섹션으로 스크롤")}
        >
          <div className="w-6 h-6 rounded-full bg-black/40 border border-[#C5A059] flex items-center justify-center text-[#D4AF37] group-hover:bg-[#C5A059] group-hover:text-black transition-all shadow-xs animate-bounce">
            <ChevronDown className="w-3.5 h-3.5 stroke-[2.5]" />
          </div>
        </button>
      )}

    </section>
  );
}
