import React from 'react';
import { ChevronRight, GraduationCap, Award, Building2 } from 'lucide-react';

export default function Hero({ onExploreClick, onAboutClick }) {
  return (
    <section className="relative overflow-hidden bg-[#062d1b] min-h-[580px] flex items-center py-12 lg:py-16">
      
      {/* High-End Soft Blurred Background Image (2024 Awards Ceremony) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="/images/hero_bg.jpg?v=2"
          alt="2024 대한민국 자랑스러운 명인·장인·명장 인물대상 시상식"
          className="w-full h-full object-cover object-center scale-105 blur-[3px] opacity-40 brightness-95 contrast-[108%]"
        />
        {/* Luxury Deep Forest Green Gradient & Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#042013] via-[#062d1b]/90 to-[#042013]/70 mix-blend-multiply" />
        <div className="absolute inset-0 bg-radial-vignette opacity-60 pointer-events-none" />
      </div>

      <div className="relative z-10 w-full px-4 sm:px-8 lg:px-12 text-white">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Hero Text Content */}
          <div className="lg:col-span-7 xl:col-span-7 space-y-6 max-w-3xl">
            
            {/* Sub-label Badge */}
            <div className="inline-block px-4 py-1.5 bg-emerald-400/15 border border-emerald-400/30 rounded-full backdrop-blur-md shadow-xs">
              <span className="text-xs sm:text-sm font-black text-emerald-300 tracking-tight">
                사단법인 한국외식창업교육원
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-[48px] font-black text-white leading-[1.22] tracking-tight drop-shadow-lg">
              당신의 <span className="text-emerald-400 font-extrabold">외식 창업 성공</span>을 함께합니다
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-emerald-100/95 font-semibold leading-relaxed max-w-xl drop-shadow-sm">
              실무 중심의 교육과 창업 컨설팅으로<br className="hidden sm:inline" />
              외식 창업의 모든 순간을 지원합니다.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                onClick={onExploreClick}
                className="px-7 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-base rounded-2xl shadow-xl shadow-emerald-950/40 transition-all flex items-center gap-2 group hover:-translate-y-0.5 cursor-pointer"
              >
                <span>교육과정 둘러보기</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onAboutClick}
                className="px-7 py-3.5 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold text-base rounded-2xl backdrop-blur-md transition-all flex items-center gap-2 group hover:border-white/60 cursor-pointer shadow-lg"
              >
                <span>교육원 소개</span>
                <ChevronRight className="w-5 h-5 text-emerald-300 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Floating Deep Forest Green Stats Overlay Card */}
          <div className="lg:col-span-5 xl:col-span-5 flex lg:justify-end mt-6 lg:mt-0">
            <div className="w-full max-w-md lg:max-w-none bg-[#042013]/90 border border-emerald-400/30 rounded-3xl p-6 sm:p-8 shadow-2xl text-white backdrop-blur-xl">
              <div className="grid grid-cols-3 gap-2 sm:gap-4 divide-x divide-emerald-500/30">
                
                {/* Stat 1 */}
                <div className="flex flex-col items-center text-center px-1">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center mb-3 text-emerald-300 shadow-inner">
                    <GraduationCap className="w-6 h-6 sm:w-7 sm:h-7 stroke-[1.8]" />
                  </div>
                  <span className="text-lg sm:text-xl font-extrabold text-white tracking-tight leading-tight">
                    12,345명
                  </span>
                  <span className="text-xs sm:text-sm font-medium text-emerald-200/80 mt-1">
                    누적 수강생
                  </span>
                </div>

                {/* Stat 2 */}
                <div className="flex flex-col items-center text-center px-1">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center mb-3 text-emerald-300 shadow-inner">
                    <Award className="w-6 h-6 sm:w-7 sm:h-7 stroke-[1.8]" />
                  </div>
                  <span className="text-lg sm:text-xl font-extrabold text-white tracking-tight leading-tight">
                    98.7%
                  </span>
                  <span className="text-xs sm:text-sm font-medium text-emerald-200/80 mt-1">
                    수강생 만족도
                  </span>
                </div>

                {/* Stat 3 */}
                <div className="flex flex-col items-center text-center px-1">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center mb-3 text-emerald-300 shadow-inner">
                    <Building2 className="w-6 h-6 sm:w-7 sm:h-7 stroke-[1.8]" />
                  </div>
                  <span className="text-lg sm:text-xl font-extrabold text-white tracking-tight leading-tight">
                    1,200건+
                  </span>
                  <span className="text-xs sm:text-sm font-medium text-emerald-200/80 mt-1">
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
