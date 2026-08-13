import React from 'react';
import { ChevronRight, GraduationCap, Award, Building2 } from 'lucide-react';

export default function Hero({ onExploreClick, onAboutClick }) {
  return (
    <section className="relative overflow-hidden bg-slate-90 min-h-[560px] flex items-center py-12 lg:py-16">
      
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero_bg.jpg"
          alt="한국외식창업교육원 실습실"
          className="w-full h-full object-cover object-center"
        />
        {/* Gradient Overlay for Text Legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/30 lg:to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Hero Text Content */}
          <div className="lg:col-span-7 xl:col-span-7 space-y-6 max-w-2xl">
            
            {/* Sub-label */}
            <div className="inline-block">
              <span className="text-sm sm:text-base font-bold text-gray-700 tracking-tight">
                한국외식창업교육원
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-gray-900 leading-[1.25] tracking-tight">
              당신의 <span className="text-brand-500 font-extrabold">외식 창업 성공</span>을 함께합니다
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-gray-600 font-medium leading-relaxed max-w-xl">
              실무 중심의 교육과 창업 컨설팅으로<br className="hidden sm:inline" />
              외식 창업의 모든 순간을 지원합니다.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onExploreClick}
                className="px-6 py-3.5 bg-brand-500 hover:bg-brand-600 text-white font-bold text-base rounded-lg shadow-lg shadow-brand-500/25 transition-all flex items-center gap-2 group hover:-translate-y-0.5"
              >
                <span>교육과정 둘러보기</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onAboutClick}
                className="px-6 py-3.5 bg-white hover:bg-gray-50 border border-gray-300 text-gray-800 font-bold text-base rounded-lg shadow-sm transition-all flex items-center gap-2 group hover:border-gray-400"
              >
                <span>교육원 소개</span>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Floating Dark Stats Overlay Card */}
          <div className="lg:col-span-5 xl:col-span-5 flex lg:justify-end mt-6 lg:mt-0">
            <div className="w-full max-w-md lg:max-w-none bg-[#252930] border border-[#373D47] rounded-2xl p-6 sm:p-7 shadow-floating text-white backdrop-blur-md">
              <div className="grid grid-cols-3 gap-2 sm:gap-4 divide-x divide-gray-700/60">
                
                {/* Stat 1 */}
                <div className="flex flex-col items-center text-center px-1">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 flex items-center justify-center mb-3 text-white">
                    <GraduationCap className="w-6 h-6 sm:w-7 sm:h-7 stroke-[1.8]" />
                  </div>
                  <span className="text-lg sm:text-xl font-extrabold text-white tracking-tight leading-tight">
                    12,345명
                  </span>
                  <span className="text-xs sm:text-sm font-medium text-gray-400 mt-1">
                    누적 수강생
                  </span>
                </div>

                {/* Stat 2 */}
                <div className="flex flex-col items-center text-center px-1">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 flex items-center justify-center mb-3 text-white">
                    <Award className="w-6 h-6 sm:w-7 sm:h-7 stroke-[1.8]" />
                  </div>
                  <span className="text-lg sm:text-xl font-extrabold text-white tracking-tight leading-tight">
                    98.7%
                  </span>
                  <span className="text-xs sm:text-sm font-medium text-gray-400 mt-1">
                    수강생 만족도
                  </span>
                </div>

                {/* Stat 3 */}
                <div className="flex flex-col items-center text-center px-1">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 flex items-center justify-center mb-3 text-white">
                    <Building2 className="w-6 h-6 sm:w-7 sm:h-7 stroke-[1.8]" />
                  </div>
                  <span className="text-lg sm:text-xl font-extrabold text-white tracking-tight leading-tight">
                    1,200건+
                  </span>
                  <span className="text-xs sm:text-sm font-medium text-gray-400 mt-1">
                    창업 성공 사례
                  </span>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
