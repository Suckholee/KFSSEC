import React from 'react';
import { ShieldCheck, LogIn, CreditCard, ArrowRight, UserCheck } from 'lucide-react';
import ScrollReveal from './common/ScrollReveal';

export default function BannerSection({ onOpenLogin, onOpenCatalog, onOpenPaymentGuide, onScrollNext }) {
  return (
    <section className="relative py-14 lg:py-20 bg-[#0A1410] text-white border-t border-emerald-950/80">
      <div className="w-full px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto space-y-8">
        
        {/* Title & Subtitle */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold">
            <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
            <span>SERVICE GUIDE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            수강생 필수 서비스 안내
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100/70 font-semibold">
            사단법인 한국외식창업교육원의 간편 회원 서비스 및 수강 결제 혜택을 확인하세요.
          </p>
        </div>

        {/* Two Service Banners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          
          {/* Banner 1: 로그인 & 수강 신청 안내 */}
          <ScrollReveal direction="up" delay={100}>
            <div
              onClick={onOpenLogin}
              className="group relative bg-[#111C16] hover:bg-[#16241c] rounded-3xl p-6 sm:p-8 border border-emerald-500/30 hover:border-emerald-400/70 shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden flex flex-col justify-between h-full"
            >
              <div className="flex items-center justify-between z-10 gap-4">
                <div className="space-y-3">
                  <div className="bg-white/95 px-3 py-1.5 rounded-xl inline-block shadow-xs">
                    <img
                      src="/images/official_logo.png"
                      alt="사단법인 한국외식창업교육원"
                      className="h-7 w-auto object-contain"
                    />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight group-hover:text-emerald-300 transition-colors">
                    한국외식창업교육원 <br />
                    <span className="text-[#D4AF37]">회원 및 수강 로그인</span>
                  </h3>
                </div>

                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-[#0A1410] rounded-2xl border border-emerald-500/40 p-3 shadow-md flex items-center justify-center shrink-0 text-[#D4AF37] group-hover:scale-105 transition-transform">
                  <LogIn className="w-10 h-10 stroke-[1.8]" />
                </div>
              </div>

              <div className="pt-8 z-10 flex items-center justify-between">
                <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0B3C26] group-hover:bg-[#072819] text-white font-extrabold text-xs rounded-xl shadow-md transition-colors border border-[#C5A059]">
                  <span>클래스 수강 신청하기</span>
                  <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
                </span>
                <span className="text-xs text-emerald-300/80 font-bold">간편 가입 혜택</span>
              </div>

              {/* Decorative background glow */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl group-hover:scale-125 transition-transform" />
            </div>
          </ScrollReveal>

          {/* Banner 2: 수강료 결제 & 지원 안내 */}
          <ScrollReveal direction="up" delay={200}>
            <div
              onClick={onOpenPaymentGuide}
              className="group relative bg-[#111C16] hover:bg-[#16241c] rounded-3xl p-6 sm:p-8 border border-emerald-500/30 hover:border-emerald-400/70 shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden flex flex-col justify-between h-full"
            >
              <div className="flex items-center justify-between z-10 gap-4">
                <div className="space-y-3">
                  <div className="bg-white/95 px-3 py-1.5 rounded-xl inline-block shadow-xs">
                    <img
                      src="/images/official_logo.png"
                      alt="사단법인 한국외식창업교육원"
                      className="h-7 w-auto object-contain"
                    />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight group-hover:text-emerald-300 transition-colors">
                    사단법인 한국외식창업교육원 <br />
                    <span className="text-[#D4AF37]">수강료 결제 안내</span>
                  </h3>
                </div>

                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-[#0A1410] rounded-2xl border border-emerald-500/40 p-3 shadow-md flex items-center justify-center shrink-0 text-[#D4AF37] group-hover:scale-105 transition-transform">
                  <CreditCard className="w-10 h-10 stroke-[1.8]" />
                </div>
              </div>

              <div className="pt-8 z-10 flex items-center justify-between">
                <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0B3C26] group-hover:bg-[#072819] text-white font-extrabold text-xs rounded-xl shadow-md transition-colors border border-[#C5A059]">
                  <span>수강료 할인 혜택 보기</span>
                  <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
                </span>
                <span className="text-xs text-emerald-300/80 font-bold">정부지원금 연계</span>
              </div>

              {/* Decorative background glow */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl group-hover:scale-125 transition-transform" />
            </div>
          </ScrollReveal>

        </div>

      </div>
    </section>
  );
}
