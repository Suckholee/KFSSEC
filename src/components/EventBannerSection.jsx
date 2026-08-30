import React from 'react';
import { ChevronDown, Sparkles } from 'lucide-react';

export default function EventBannerSection({ bannerData, onEventClick, onScrollNext }) {
  if (bannerData && bannerData.active === false) {
    return null;
  }

  const bannerText = bannerData?.title || '지금 진행 중인 외식창업 이벤트를 만나보세요! 신규 수강 50% 할인부터 무료 특강, 창업 패키지까지 다양한 이벤트 진행 중';

  return (
    <section className="relative py-12 lg:py-16 bg-[#0c1015] text-white h-full flex flex-col justify-center border-b border-gray-800 animate-fadeIn">
      <div className="w-full px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto space-y-4">
        
        {/* Main 50% Event Banner Graphic */}
        <div
          onClick={onEventClick}
          className="group relative rounded-3xl overflow-hidden shadow-2xl border border-emerald-500/30 hover:border-emerald-400/70 transition-all duration-300 cursor-pointer hover:scale-[1.015] bg-black"
        >
          <img
            src="/images/banner_event_strip.png"
            alt={bannerText}
            className="w-full h-auto object-cover group-hover:brightness-105 transition-all duration-500"
          />
          
          {/* Text Overlay if updated by Admin */}
          {bannerData?.title && (
            <div className="absolute inset-x-0 bottom-0 bg-black/80 backdrop-blur-md px-6 py-3 border-t border-emerald-500/40 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-black text-white">
                <span className="px-2 py-0.5 bg-rose-500 text-white rounded text-[10px] uppercase font-mono">
                  EVENT
                </span>
                <span>{bannerText}</span>
              </div>
              <span className="text-xs font-black text-emerald-400 underline">
                상세 혜택 신청하기 ➔
              </span>
            </div>
          )}

          {/* Glossy Overlay Highlight */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-white/5 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        </div>

      </div>

      {/* Subtle Scroll Down Indicator Bar */}
      {onScrollNext && (
        <button
          onClick={onScrollNext}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 group cursor-pointer"
          aria-label="아래로 스크롤"
        >
          <span className="text-[10px] sm:text-[11px] font-black tracking-[0.25em] uppercase text-emerald-400/70 group-hover:text-emerald-300 transition-colors">
            SCROLL DOWN
          </span>
          <div className="w-7 h-7 rounded-full bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-emerald-300 group-hover:bg-emerald-500 group-hover:text-white transition-all shadow-xs animate-bounce">
            <ChevronDown className="w-4 h-4 stroke-[2.5]" />
          </div>
        </button>
      )}
    </section>
  );
}
