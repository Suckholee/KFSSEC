import React from 'react';
import { ChevronRight, GraduationCap, Award, Building2, ChevronDown } from 'lucide-react';

export default function Hero({ onExploreClick, onAboutClick, onScrollNext }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#FDFBF7] via-[#F8F6F0] to-[#EFEBE4] min-h-[620px] h-full flex items-center py-12 lg:py-16 border-b-2 border-[#E7E2D8]">
      
      {/* 100% Full Opacity Raw Awards Photo Positioned on the Right with Heritage Warm Gradient Blend */}
      <div className="absolute inset-0 z-0 overflow-hidden flex justify-end">
        {/* Right Photo Container */}
        <div className="relative w-full lg:w-[62%] h-full ml-auto">
          <img
            src="/images/hero_bg.jpg?v=3"
            alt="2024 대한민국 자랑스러운 명인·장인·명장 인물대상 시상식"
            className="w-full h-full object-cover object-center lg:object-right opacity-95"
          />
          {/* Elegant Heritage Warm Ivory Fade for Text Readability on Left */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#FDFBF7] via-[#FDFBF7]/85 via-35% to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FDFBF7]/40 via-transparent to-transparent" />
        </div>
      </div>

      <div className="relative z-10 w-full px-6 sm:px-10 lg:px-14 text-gray-900">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Main Hero Content Column (Positioned on the Left) */}
          <div className="lg:col-span-7 xl:col-span-7 space-y-8 max-w-3xl">
            
            {/* Top Text & Headline */}
            <div className="space-y-5">
              {/* Sub-label Badge */}
              <div className="inline-block px-4.5 py-1.5 bg-[#F2ECE0] border border-[#D4C5B0] rounded-full shadow-xs">
                <span className="text-xs sm:text-sm font-extrabold text-[#0B3C26] tracking-tight">
                  사단법인 한국외식창업교육원
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-black text-[#0B3C26] leading-[1.4] tracking-tight">
                <span>꿈꾸는 외식창업</span>
                <span className="block mt-2 text-[#07472A] font-extrabold">
                  아무에게나 맡기시겠습니까?
                </span>
              </h1>

              {/* Subtext */}
              <div className="text-base sm:text-lg text-[#4A4740] font-semibold leading-relaxed max-w-xl space-y-1.5 pt-1">
                <p>오랜 현장실무경험과 실력을 갖춘 명인, 명장님께 맡겨주세요!</p>
                <p className="text-[#0B3C26] font-extrabold">성공적인 창업은 저희가 책임지겠습니다</p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <button
                  onClick={onExploreClick}
                  className="px-7 py-3.5 bg-[#0B3C26] hover:bg-[#072819] text-white font-extrabold text-base rounded-2xl shadow-xl shadow-[#0B3C26]/20 transition-all flex items-center gap-2 group hover:-translate-y-0.5 cursor-pointer border border-[#0B3C26]"
                >
                  <span>교육과정 둘러보기</span>
                  <ChevronRight className="w-5 h-5 text-[#D4AF37] group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={onAboutClick}
                  className="px-7 py-3.5 bg-white hover:bg-[#F3ECE0] border-2 border-[#0B3C26] text-[#0B3C26] font-bold text-base rounded-2xl transition-all flex items-center gap-2 group cursor-pointer shadow-md"
                >
                  <span>교육원 소개</span>
                  <ChevronRight className="w-5 h-5 text-[#0B3C26] group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Heritage Classic Stats Card Below the Main Buttons */}
            <div className="pt-2">
              <div className="w-full max-w-xl bg-white/95 border-2 border-[#D4C5B0] rounded-2xl p-5 sm:p-6 shadow-xl text-gray-900 backdrop-blur-md">
                <div className="grid grid-cols-3 gap-2 sm:gap-4 divide-x divide-[#E5E0D8]">
                  
                  {/* Stat 1 */}
                  <div className="flex flex-col items-center text-center px-1">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#F2ECE0] border border-[#D4C5B0] flex items-center justify-center mb-2.5 text-[#0B3C26] shadow-xs">
                      <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2]" />
                    </div>
                    <span className="text-base sm:text-lg font-black text-[#0B3C26] tracking-tight leading-tight">
                      12,345명
                    </span>
                    <span className="text-[11px] sm:text-xs font-bold text-gray-600 mt-1">
                      누적 수강생
                    </span>
                  </div>

                  {/* Stat 2 */}
                  <div className="flex flex-col items-center text-center px-1">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#F2ECE0] border border-[#D4C5B0] flex items-center justify-center mb-2.5 text-[#0B3C26] shadow-xs">
                      <Award className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2]" />
                    </div>
                    <span className="text-base sm:text-lg font-black text-[#0B3C26] tracking-tight leading-tight">
                      98.7%
                    </span>
                    <span className="text-[11px] sm:text-xs font-bold text-gray-600 mt-1">
                      수강생 만족도
                    </span>
                  </div>

                  {/* Stat 3 */}
                  <div className="flex flex-col items-center text-center px-1">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#F2ECE0] border border-[#D4C5B0] flex items-center justify-center mb-2.5 text-[#0B3C26] shadow-xs">
                      <Building2 className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2]" />
                    </div>
                    <span className="text-base sm:text-lg font-black text-[#0B3C26] tracking-tight leading-tight">
                      1,200건+
                    </span>
                    <span className="text-[11px] sm:text-xs font-bold text-gray-600 mt-1">
                      창업 성공 사례
                    </span>
                  </div>

                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Subtle Scroll Down Indicator Bar */}
      <button
        onClick={onScrollNext}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 group cursor-pointer"
        aria-label="아래로 스크롤"
      >
        <span className="text-[10px] sm:text-[11px] font-black tracking-[0.25em] uppercase text-[#0B3C26] group-hover:text-[#C5A059] transition-colors">
          SCROLL DOWN
        </span>
        <div className="w-7 h-7 rounded-full bg-[#F2ECE0] border border-[#D4C5B0] flex items-center justify-center text-[#0B3C26] group-hover:bg-[#0B3C26] group-hover:text-white transition-all shadow-md animate-bounce">
          <ChevronDown className="w-4 h-4 stroke-[2.5]" />
        </div>
      </button>

    </section>
  );
}
