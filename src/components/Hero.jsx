import React from 'react';
import { ChevronRight, GraduationCap, Award, Building2 } from 'lucide-react';

export default function Hero({ onExploreClick, onAboutClick }) {
  return (
    <section className="relative overflow-hidden bg-[#062d1b] min-h-[620px] flex items-center py-12 lg:py-16">
      
      {/* 100% Full Opacity Raw Awards Photo Positioned on the Right (Completely Unobstructed) */}
      <div className="absolute inset-0 z-0 overflow-hidden flex justify-end">
        {/* Right Photo Container */}
        <div className="relative w-full lg:w-[62%] h-full ml-auto">
          <img
            src="/images/hero_bg.jpg?v=3"
            alt="2024 대한민국 자랑스러운 명인·장인·명장 인물대상 시상식"
            className="w-full h-full object-cover object-center lg:object-right opacity-100"
          />
          {/* Smooth Edge Gradient Fade for Text Readability on the Left */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#062d1b] via-[#062d1b]/60 via-25% to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#062d1b]/30 via-transparent to-transparent" />
        </div>
      </div>

      <div className="relative z-10 w-full px-4 sm:px-8 lg:px-12 text-white">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Main Hero Content Column (Positioned on the Left) */}
          <div className="lg:col-span-7 xl:col-span-7 space-y-8 max-w-3xl">
            
            {/* Top Text & Headline */}
            <div className="space-y-5">
              {/* Sub-label Badge */}
              <div className="inline-block px-4 py-1.5 bg-emerald-500/30 border border-emerald-400/40 rounded-full backdrop-blur-md">
                <span className="text-xs sm:text-sm font-extrabold text-emerald-300 tracking-tight">
                  사단법인 한국외식창업교육원
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-black text-white leading-[1.25] tracking-tight drop-shadow-lg">
                꿈꾸는 외식창업 <br />
                <span className="text-emerald-400 font-extrabold">아무에게나 맡기시겠습니까?</span>
              </h1>

              {/* Subtext */}
              <div className="text-base sm:text-lg text-emerald-100/95 font-semibold leading-relaxed max-w-xl space-y-1 drop-shadow-md">
                <p>오랜 현장실무경험과 실력을 갖춘 명인, 명장님께 맡겨주세요!</p>
                <p className="text-white font-bold">성공적인 창업은 저희가 책임지겠습니다</p>
              </div>

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
                  className="px-7 py-3.5 bg-[#062d1b]/90 hover:bg-[#062d1b] border border-white/40 text-white font-bold text-base rounded-2xl backdrop-blur-md transition-all flex items-center gap-2 group hover:border-white/60 cursor-pointer shadow-lg"
                >
                  <span>교육원 소개</span>
                  <ChevronRight className="w-5 h-5 text-emerald-300 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Stats Card Below the Main Buttons */}
            <div className="pt-2">
              <div className="w-full max-w-xl bg-[#042013]/90 border border-emerald-400/35 rounded-2xl p-5 sm:p-6 shadow-2xl text-white backdrop-blur-xl">
                <div className="grid grid-cols-3 gap-2 sm:gap-4 divide-x divide-emerald-500/30">
                  
                  {/* Stat 1 */}
                  <div className="flex flex-col items-center text-center px-1">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center mb-2.5 text-emerald-300 shadow-inner">
                      <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.8]" />
                    </div>
                    <span className="text-base sm:text-lg font-extrabold text-white tracking-tight leading-tight">
                      12,345명
                    </span>
                    <span className="text-[11px] sm:text-xs font-medium text-emerald-200/80 mt-1">
                      누적 수강생
                    </span>
                  </div>

                  {/* Stat 2 */}
                  <div className="flex flex-col items-center text-center px-1">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center mb-2.5 text-emerald-300 shadow-inner">
                      <Award className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.8]" />
                    </div>
                    <span className="text-base sm:text-lg font-extrabold text-white tracking-tight leading-tight">
                      98.7%
                    </span>
                    <span className="text-[11px] sm:text-xs font-medium text-emerald-200/80 mt-1">
                      수강생 만족도
                    </span>
                  </div>

                  {/* Stat 3 */}
                  <div className="flex flex-col items-center text-center px-1">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center mb-2.5 text-emerald-300 shadow-inner">
                      <Building2 className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.8]" />
                    </div>
                    <span className="text-base sm:text-lg font-extrabold text-white tracking-tight leading-tight">
                      1,200건+
                    </span>
                    <span className="text-[11px] sm:text-xs font-medium text-emerald-200/80 mt-1">
                      창업 성공 사례
                    </span>
                  </div>

                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
