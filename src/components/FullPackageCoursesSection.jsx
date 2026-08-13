import React from 'react';
import { ChevronRight, Sparkles, ChevronDown } from 'lucide-react';

export default function FullPackageCoursesSection({ onSelectPackage, onScrollNext }) {
  const packages = [
    {
      id: 'pkg-1',
      title: '외식창업 마스터 풀 패키지',
      subtitle: '창업 준비의 모든 것, 한 번에!',
      tags: ['창업기획', '사업계획', '상권분석', '인허가'],
      image: '/images/package_card_1.png',
    },
    {
      id: 'pkg-2',
      title: '메뉴개발·원가관리 풀 패키지',
      subtitle: '수익을 만드는 메뉴의 모든 것!',
      tags: ['메뉴기획', '레시피 표준화', '원가가산', '가격전략'],
      image: '/images/package_card_2.png',
    },
    {
      id: 'pkg-3',
      title: '매장운영·서비스 풀 패키지',
      subtitle: '오래 사랑받는 매장 운영의 기본!',
      tags: ['인력관리', '고객응대', '위생관리', '매출관리'],
      image: '/images/package_card_3.png',
    },
    {
      id: 'pkg-4',
      title: '외식마케팅·프랜차이즈 풀 패키지',
      subtitle: '매출 성장과 확장을 한 번에!',
      tags: ['브랜딩', '온라인 마케팅', '배달 플랫폼', '가맹사업'],
      image: '/images/package_card_4.png',
    },
  ];

  return (
    <section className="relative py-12 lg:py-16 bg-[#061811] text-white min-h-full flex flex-col justify-center border-b border-emerald-950">
      <div className="w-full px-4 sm:px-8 lg:px-12 space-y-8 max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-black mb-3">
              <Sparkles className="w-3.5 h-3.5 fill-current" />
              <span>SPECIAL ALL-IN-ONE PACKAGES</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              외식창업 풀 패키지 추천
            </h2>
            <p className="text-sm text-emerald-200/70 font-medium mt-1">
              창업 준비부터 메뉴 개발, 매장 운영, 마케팅까지 한 번에 완성하는 외식창업 대표 패키지
            </p>
          </div>
          
          <button
            onClick={onSelectPackage}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-emerald-950/50 transition-all shrink-0 whitespace-nowrap self-start sm:self-auto cursor-pointer"
          >
            <span>전체 패키지 신청하기</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* 4-Column Responsive Vertical Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              onClick={onSelectPackage}
              className="group relative rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl border border-emerald-500/20 hover:border-emerald-400/60 transition-all duration-300 cursor-pointer bg-[#0b241a] flex flex-col hover:-translate-y-2"
            >
              {/* Package Card Graphic Image */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-black">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b241a] via-transparent to-transparent opacity-60 pointer-events-none" />
              </div>

              {/* Bottom Interactive Action Banner */}
              <div className="p-4 bg-[#0b241a] border-t border-emerald-500/20 flex items-center justify-between group-hover:bg-emerald-900/40 transition-colors">
                <span className="text-xs font-black text-emerald-300 group-hover:text-white transition-colors">
                  수강 및 상담 신청
                </span>
                <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-300 group-hover:bg-emerald-500 group-hover:text-white flex items-center justify-center transition-all">
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Subtle Scroll Down Indicator Bar */}
      {onScrollNext && (
        <button
          onClick={onScrollNext}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 group cursor-pointer"
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
