import React from 'react';
import { ChevronRight, Sparkles } from 'lucide-react';

export default function AcademyMasterBanner({ onOpenCatalog, onOpenAbout }) {
  return (
    <div className="w-full max-w-6xl mx-auto my-6">
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#0a231b] via-[#0F5132] to-[#041a13] text-white shadow-2xl border border-emerald-500/30">
        
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-400/20 via-transparent to-transparent pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 items-center min-h-[260px] p-6 sm:p-10 relative z-10">
          
          {/* Left Text & Headline Area */}
          <div className="lg:col-span-7 space-y-4 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-400/20 border border-emerald-400/40 text-emerald-300 text-xs font-black tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
              <span>KFSSEC MASTER CLASS 2026</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight text-white drop-shadow-md">
              외식창업 실무과정 <span className="text-emerald-400">신규 오픈!</span>
            </h2>

            <p className="text-sm sm:text-base text-emerald-100/90 font-medium leading-relaxed max-w-xl">
              <strong className="text-white">Dreams Come True</strong>, 메뉴 개발부터 상권 분석 및 1:1 밀착 창업 컨설팅까지 한번에!
            </p>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={onOpenCatalog}
                className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-lg shadow-emerald-950/40 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>수강 신청 바로가기</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Portrait & Official Brand Logo Area */}
          <div className="lg:col-span-5 flex items-center justify-end relative mt-6 lg:mt-0">
            
            {/* Top Right "2026 NEW" Green Circle Badge */}
            <div className="absolute -top-4 right-0 lg:right-4 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 text-emerald-950 font-black flex flex-col items-center justify-center shadow-lg transform rotate-12 z-20 border-2 border-white/40">
              <span className="text-[10px] sm:text-xs font-extrabold tracking-tight">2026</span>
              <span className="text-sm sm:text-base font-black italic -mt-1">New</span>
            </div>

            {/* Portrait Photo Container */}
            <div className="relative w-44 sm:w-52 aspect-[3/4] rounded-2xl overflow-hidden border-2 border-emerald-400/40 shadow-2xl bg-stone-900 shrink-0">
              <img
                src="/images/chairman_ahn_real.jpg?v=2"
                alt="안형상 이사장/원장"
                className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Official Logo at the End Corner (Image 2) */}
            <div className="bg-white/95 backdrop-blur-md p-2.5 sm:p-3 rounded-2xl border border-emerald-200/80 shadow-xl ml-4 shrink-0 max-w-[120px] sm:max-w-[140px]">
              <img
                src="/images/official_logo.png"
                alt="사단법인 한국외식창업교육원"
                className="w-full h-auto object-contain"
              />
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
