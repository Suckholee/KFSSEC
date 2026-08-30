import React from 'react';
import ScrollReveal from './common/ScrollReveal';

export default function BannerSection({ onOpenLogin, onOpenCatalog, onOpenPaymentGuide, onScrollNext }) {
  return (
    <div className="w-full px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto space-y-6">
      
      {/* Title & Subtitle */}
      <div className="text-center space-y-2">
        <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-3.5 py-1 rounded-full uppercase tracking-wider">
          SERVICE GUIDE
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
          수강생 필수 서비스 안내
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 font-bold">
          한국외식창업교육원의 간편 로그인 및 수강 결제 안내를 확인해 보세요.
        </p>
      </div>

      {/* Two Service Banners Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        
        {/* Banner 1: 로그인 안내 */}
        <ScrollReveal direction="up" delay={100}>
          <div
            onClick={onOpenLogin}
            className="group relative bg-[#f4fbf7] hover:bg-[#e9f7ef] rounded-3xl p-6 sm:p-8 border-2 border-emerald-200/80 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden flex flex-col justify-between h-full"
          >
            <div className="flex items-center justify-between z-10">
              <div className="space-y-2">
                <img
                  src="/images/official_logo.png"
                  alt="사단법인 한국외식창업교육원"
                  className="h-8 w-auto object-contain"
                />
                <h3 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight group-hover:text-emerald-900 transition-colors">
                  한국외식창업교육원 <br />
                  <span className="text-emerald-700">로그인 안내</span>
                </h3>
              </div>

              <div className="w-28 sm:w-36 h-24 sm:h-28 bg-white rounded-2xl border border-emerald-300 p-2 shadow-md flex items-center justify-center shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&w=300&q=80"
                  alt="로그인 화면"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            </div>

            <div className="pt-6 z-10">
              <span className="inline-block px-5 py-2 bg-emerald-800 group-hover:bg-emerald-900 text-white font-black text-xs rounded-xl shadow-md transition-colors">
                클릭하여 자세히 보기 ➔
              </span>
            </div>

            {/* Decorative background circle */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-emerald-200/40 rounded-full blur-2xl group-hover:scale-125 transition-transform" />
          </div>
        </ScrollReveal>

        {/* Banner 2: 결제 안내 */}
        <ScrollReveal direction="up" delay={200}>
          <div
            onClick={onOpenPaymentGuide}
            className="group relative bg-[#f4fbf7] hover:bg-[#e9f7ef] rounded-3xl p-6 sm:p-8 border-2 border-emerald-200/80 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden flex flex-col justify-between h-full"
          >
            <div className="flex items-center justify-between z-10">
              <div className="space-y-2">
                <img
                  src="/images/official_logo.png"
                  alt="사단법인 한국외식창업교육원"
                  className="h-8 w-auto object-contain"
                />
                <h3 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight group-hover:text-emerald-900 transition-colors">
                  사단법인 한국외식창업교육원 <br />
                  <span className="text-emerald-700">결제 안내</span>
                </h3>
              </div>

              <div className="w-28 sm:w-36 h-24 sm:h-28 bg-white rounded-2xl border border-emerald-300 p-2 shadow-md flex items-center justify-center shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1556742049-0a670f4a4591?auto=format&fit=crop&w=300&q=80"
                  alt="결제 안내"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            </div>

            <div className="pt-6 z-10">
              <span className="inline-block px-5 py-2 bg-emerald-800 group-hover:bg-emerald-900 text-white font-black text-xs rounded-xl shadow-md transition-colors">
                클릭하여 자세히 보기 ➔
              </span>
            </div>

            {/* Decorative background circle */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-emerald-200/40 rounded-full blur-2xl group-hover:scale-125 transition-transform" />
          </div>
        </ScrollReveal>

      </div>

    </div>
  );
}
