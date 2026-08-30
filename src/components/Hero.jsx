import React from 'react';
import { ChevronRight, GraduationCap, Award, Building2, ChevronDown } from 'lucide-react';

export default function Hero({ onExploreClick, onAboutClick, onScrollNext }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#FDFBF7] via-[#F8F6F0] to-[#EFEBE4] min-h-[640px] flex items-center py-10 lg:py-16 pb-20 lg:pb-16 border-b-2 border-[#E7E2D8]">
      
      {/* Background Photo Container with Robust Dark Scrim to prevent text collision */}
      <div className="absolute inset-0 z-0 overflow-hidden flex justify-end">
        <div className="relative w-full lg:w-[65%] h-full ml-auto">
          <img
            src="/images/hero_bg.jpg?v=3"
            alt="2024 대한민국 자랑스러운 명인·장인·명장 인물대상 시상식"
            className="w-full h-full object-cover object-center lg:object-right opacity-90 brightness-95"
          />
          {/* Robust Multi-layer Scrim Overlay for Uncompromised Mobile Readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#FDFBF7] via-[#FDFBF7]/95 sm:via-[#FDFBF7]/80 via-45% to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FDFBF7] via-transparent to-transparent sm:hidden" />
        </div>
      </div>

      <div className="relative z-10 w-full px-4 sm:px-8 lg:px-12 text-gray-900 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Main Hero Content Column */}
          <div className="lg:col-span-7 xl:col-span-7 space-y-6 max-w-2xl bg-[#FDFBF7]/80 sm:bg-transparent p-5 sm:p-0 rounded-3xl backdrop-blur-xs sm:backdrop-blur-none border border-[#E7E2D8] sm:border-none shadow-xs sm:shadow-none">
            
            {/* Top Text & Headline */}
            <div className="space-y-4">
              {/* Sub-label Badge */}
              <div className="inline-block px-4 py-1 bg-[#F2ECE0] border border-[#D4C5B0] rounded-full shadow-xs">
                <span className="text-xs sm:text-sm font-bold text-[#0B3C26] tracking-tight">
                  (사)한국외식창업교육원 · 펫창업 전문 자격 기관
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-2xl sm:text-4xl lg:text-[44px] font-black text-[#0B3C26] leading-[1.35] tracking-tight">
                <span>꿈꾸는 외식 & 펫 창업</span>
                <span className="block mt-1.5 text-[#07472A] font-extrabold">
                  검증된 명인·장인에게 배우세요!
                </span>
              </h1>

              {/* Subtext */}
              <div className="text-sm sm:text-base text-[#4A4740] font-semibold leading-relaxed max-w-xl space-y-1 pt-1">
                <p>외식 조리 실무부터 수제간식·행동교정 펫 창업까지 원스톱 전수!</p>
                <p className="text-[#0B3C26] font-bold">성공적인 매장 오픈과 마케팅, 책임지고 지도합니다.</p>
              </div>

              {/* Action Buttons with 44px+ Accessible Touch Targets */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={onExploreClick}
                  className="px-6 py-3.5 bg-[#0B3C26] hover:bg-[#072819] text-white font-extrabold text-sm sm:text-base rounded-2xl shadow-lg shadow-[#0B3C26]/20 transition-all flex items-center gap-2 group cursor-pointer border border-[#0B3C26] min-h-[48px] focus-visible:ring-2 focus-visible:ring-[#0B3C26] focus-visible:outline-none"
                  aria-label="교육과정 둘러보기 목록으로 이동"
                >
                  <span>교육과정 둘러보기</span>
                  <ChevronRight className="w-5 h-5 text-[#D4AF37] group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={onAboutClick}
                  className="px-6 py-3.5 bg-white hover:bg-[#F3ECE0] border-2 border-[#0B3C26] text-[#0B3C26] font-bold text-sm sm:text-base rounded-2xl transition-all flex items-center gap-2 group cursor-pointer shadow-sm min-h-[48px] focus-visible:ring-2 focus-visible:ring-[#0B3C26] focus-visible:outline-none"
                  aria-label="교육원 상세 소개 페이지로 이동"
                >
                  <span>교육원 소개</span>
                  <ChevronRight className="w-5 h-5 text-[#0B3C26] group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Heritage Classic Stats Card */}
            <div className="pt-2">
              <div className="w-full max-w-xl bg-white/95 border-2 border-[#D4C5B0] rounded-2xl p-4 sm:p-5 shadow-md text-gray-900 backdrop-blur-md">
                <div className="grid grid-cols-3 gap-2 sm:gap-4 divide-x divide-[#E5E0D8]">
                  
                  {/* Stat 1 */}
                  <div className="flex flex-col items-center text-center px-1">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#F2ECE0] border border-[#D4C5B0] flex items-center justify-center mb-2 text-[#0B3C26] shadow-xs">
                      <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2]" />
                    </div>
                    <span className="text-sm sm:text-lg font-black text-[#0B3C26] tracking-tight leading-tight">
                      12,345명
                    </span>
                    <span className="text-[11px] sm:text-xs font-bold text-gray-600 mt-0.5">
                      누적 수강생
                    </span>
                  </div>

                  {/* Stat 2 */}
                  <div className="flex flex-col items-center text-center px-1">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#F2ECE0] border border-[#D4C5B0] flex items-center justify-center mb-2 text-[#0B3C26] shadow-xs">
                      <Award className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2]" />
                    </div>
                    <span className="text-sm sm:text-lg font-black text-[#0B3C26] tracking-tight leading-tight">
                      98.7%
                    </span>
                    <span className="text-[11px] sm:text-xs font-bold text-gray-600 mt-0.5">
                      수강생 만족도
                    </span>
                  </div>

                  {/* Stat 3 */}
                  <div className="flex flex-col items-center text-center px-1">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#F2ECE0] border border-[#D4C5B0] flex items-center justify-center mb-2 text-[#0B3C26] shadow-xs">
                      <Building2 className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2]" />
                    </div>
                    <span className="text-sm sm:text-lg font-black text-[#0B3C26] tracking-tight leading-tight">
                      1,200건+
                    </span>
                    <span className="text-[11px] sm:text-xs font-bold text-gray-600 mt-0.5">
                      창업 성공 사례
                    </span>
                  </div>

                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Scroll Down Indicator Bar */}
      <button
        onClick={onScrollNext}
        className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 group cursor-pointer focus-visible:ring-2 focus-visible:ring-[#0B3C26] focus-visible:outline-none rounded-full p-1 min-h-[44px]"
        aria-label="아래 섹션으로 스크롤"
      >
        <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#0B3C26] group-hover:text-[#C5A059] transition-colors">
          SCROLL DOWN
        </span>
        <div className="w-6 h-6 rounded-full bg-[#F2ECE0] border border-[#D4C5B0] flex items-center justify-center text-[#0B3C26] group-hover:bg-[#0B3C26] group-hover:text-white transition-all shadow-xs animate-bounce">
          <ChevronDown className="w-3.5 h-3.5 stroke-[2.5]" />
        </div>
      </button>

    </section>
  );
}
