import React from 'react';
import { ChevronDown } from 'lucide-react';
import AcademyMasterBanner from './AcademyMasterBanner';

export default function BannerSection({ onOpenLogin, onOpenCatalog, onScrollNext }) {
  return (
    <section className="relative py-12 lg:py-16 bg-gradient-to-b from-white via-emerald-50/30 to-white border-b border-emerald-100/60 h-full flex flex-col justify-center">
      <div className="w-full px-4 sm:px-8 lg:px-12 space-y-8">
        
        {/* Custom Food Service CSAT-Style Master Banner */}
        <AcademyMasterBanner
          onOpenCatalog={onOpenCatalog}
          onOpenAbout={() => {}}
        />

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2 pt-2">
          <span className="text-xs font-black text-emerald-700 bg-emerald-100/80 px-3 py-1 rounded-full uppercase tracking-wider">
            SERVICE GUIDE
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            수강생 필수 서비스 안내
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 font-medium">
            한국외식창업교육원의 간편 로그인 및 수강 결제 안내를 확인해 보세요.
          </p>
        </div>

        {/* 2-Column Banner Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          
          {/* Banner 1: Login Guide */}
          <div
            onClick={onOpenLogin}
            className="group relative rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 border border-emerald-100/80 cursor-pointer bg-white"
          >
            <img
              src="/images/banner_login_info.png"
              alt="한국외식창업교육원 로그인 안내"
              className="w-full h-auto object-cover group-hover:scale-102 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-emerald-900/0 group-hover:bg-emerald-950/10 transition-colors pointer-events-none" />
          </div>

          {/* Banner 2: Payment Guide */}
          <div
            onClick={onOpenCatalog}
            className="group relative rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 border border-emerald-100/80 cursor-pointer bg-white"
          >
            <img
              src="/images/banner_payment_info.png"
              alt="사단법인 한국외식창업교육원 결제 안내"
              className="w-full h-auto object-cover group-hover:scale-102 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-emerald-900/0 group-hover:bg-emerald-950/10 transition-colors pointer-events-none" />
          </div>

        </div>

      </div>

      {/* Subtle Scroll Down Indicator Bar */}
      {onScrollNext && (
        <button
          onClick={onScrollNext}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 group cursor-pointer"
          aria-label="아래로 스크롤"
        >
          <span className="text-[10px] sm:text-[11px] font-black tracking-[0.25em] uppercase text-emerald-800/60 group-hover:text-emerald-900 transition-colors">
            SCROLL DOWN
          </span>
          <div className="w-7 h-7 rounded-full bg-emerald-100/80 border border-emerald-300 flex items-center justify-center text-emerald-800 group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-xs animate-bounce">
            <ChevronDown className="w-4 h-4 stroke-[2.5]" />
          </div>
        </button>
      )}
    </section>
  );
}
