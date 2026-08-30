import React from 'react';
import { ChevronDown, ArrowRight, Sparkles } from 'lucide-react';

export default function Hero({ onExploreClick, onAboutClick, onScrollNext }) {
  return (
    <section className="relative w-full bg-white text-black border-y-4 border-black overflow-hidden flex flex-col justify-center min-h-[500px] sm:min-h-[560px] lg:min-h-[620px]">
      
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-8 sm:py-12 flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Left Side: Chef Tossing Pan Food Graphic */}
        <div className="w-full md:w-1/2 relative h-64 sm:h-80 lg:h-96 rounded-2xl overflow-hidden shadow-2xl bg-black border border-gray-300 group">
          <img
            src="/images/chef_tossing_food.jpg"
            alt="외식창업 명인 셰프 조리 연출"
            className="w-full h-full object-cover object-left group-hover:scale-103 transition-transform duration-700"
          />
          {/* Smooth Fade Transition Overlay into White on the Right */}
          <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-r from-transparent to-white pointer-events-none" />
        </div>

        {/* Right Side: Exact Target Typography (Matching Image 1 & 2) */}
        <div className="w-full md:w-1/2 space-y-6 md:pl-6 text-left">
          
          <div className="space-y-3">
            {/* Title Row 1: 외식·창업 ·교육 ·개발 */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-black tracking-tight leading-tight">
              <span className="border-b-4 border-dashed border-rose-600 pb-0.5 mr-2">
                외식·창업
              </span>
              <span className="text-black font-black">
                ·교육 ·개발
              </span>
            </h1>

            {/* Title Row 2: 대한민국 외식, 창업을 위해 */}
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-800 tracking-tight pt-2">
              대한민국 외식, 창업을 위해
            </h2>

            {/* Title Row 3: 교육 그리고 인재 개발 양성 */}
            <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-700 tracking-tight pt-1">
              교육 그리고 인재 개발 양성
            </p>
          </div>

          {/* Subtext description */}
          <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed max-w-xl">
            사단법인 한국외식창업교육원은 외식업 대표 명장진과 함께 상권분석, 레시피 개발, 매장운영, 수강생 N:N 커리큘럼 매칭 시스템을 지원합니다.
          </p>

          {/* CTA Action Buttons */}
          <div className="pt-4 flex flex-wrap items-center gap-3">
            <button
              onClick={onExploreClick}
              className="px-6 py-3 bg-black hover:bg-gray-800 text-white font-black text-xs sm:text-sm rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>전체 교육 과정 보기</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onAboutClick}
              className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-black font-bold text-xs sm:text-sm rounded-xl border border-gray-400 transition-all cursor-pointer"
            >
              <span>교육원 소개</span>
            </button>
          </div>

        </div>

      </div>

      {/* Scroll Down Indicator */}
      {onScrollNext && (
        <button
          onClick={onScrollNext}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-gray-500 hover:text-black transition-colors cursor-pointer group"
        >
          <span className="text-[10px] font-black tracking-widest uppercase">
            SCROLL DOWN
          </span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </button>
      )}

    </section>
  );
}
