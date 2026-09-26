import React, { useState, useRef } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { GLOBAL_DINING_TRENDS, TREND_CATEGORY_INFO } from '../../data/globalDiningTrends';
import {
  ExternalLink,
  TrendingUp,
  Sparkles,
  Calendar,
  User,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Camera,
  Layers,
} from 'lucide-react';

export default function GlobalDiningTrendsSection() {
  const { t } = useLanguage();
  const scrollContainerRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: '전체 트렌드 화보' },
    { id: 'column', label: '경영·트렌드 칼럼' },
    { id: 'story', label: '현장 스토리 & 인터뷰' },
  ];

  const filteredArticles = GLOBAL_DINING_TRENDS.filter((item) => {
    if (activeCategory === 'column') {
      return item.title.includes('칼럼') || item.author.includes('논설') || item.author.includes('작가');
    }
    if (activeCategory === 'story') {
      return item.title.includes('스토리') || item.author.includes('기자') || !item.author.includes('논설');
    }
    return true;
  });

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 380;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id="global-dining-trends-section"
      className="relative py-14 lg:py-20 bg-gradient-to-b from-[#FAF8F5] via-white to-[#FAF8F5] text-gray-900 font-sans border-y-2 border-[#E7E2D8] overflow-hidden shadow-inner"
    >
      {/* Background Decorative Ambient Gradients */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#C5A059]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full px-4 sm:px-8 lg:px-12 max-w-[1560px] mx-auto space-y-7">
        
        {/* Gallery Header Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-stone-200">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0B3C26] text-[#D4AF37] text-xs font-black shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>{t('공식 미디어 제휴', 'Official Media Partner')}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white text-stone-700 text-xs font-bold border border-stone-200 shadow-2xs">
                <img
                  src="/images/logo_global_dining.png"
                  alt="글로벌외식정보"
                  className="h-4 w-auto object-contain"
                />
                <span>글로벌외식정보 (HSGDN)</span>
              </span>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 tracking-tight flex items-center gap-2.5">
                <Camera className="w-7 h-7 sm:w-8 sm:h-8 text-[#0B3C26]" />
                <span>{t('외식 트렌드 포토 갤러리', 'Food Trend & Photo Gallery')}</span>
              </h2>
              <p className="text-sm sm:text-base text-stone-600 mt-1 font-medium">
                {t(
                  '글로벌외식정보의 현장 밀착형 외식 경영 인사이트와 최신 기사를 사진 갤러리 형태로 둘러보세요.',
                  'Explore real-world restaurant management insights and photo news articles by Global Dining News.'
                )}
              </p>
            </div>
          </div>

          {/* Right Navigation & External Link */}
          <div className="flex items-center gap-3 self-start md:self-end shrink-0">
            {/* Gallery Prev / Next Buttons */}
            <div className="flex items-center gap-1.5 bg-stone-100 p-1 rounded-full border border-stone-200 shadow-2xs">
              <button
                onClick={() => scroll('left')}
                aria-label="이전 기사 화보 보기"
                className="w-9 h-9 rounded-full bg-white hover:bg-[#0B3C26] text-stone-700 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-xs focus-visible:ring-2 focus-visible:ring-[#0B3C26] focus-visible:outline-none"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scroll('right')}
                aria-label="다음 기사 화보 보기"
                className="w-9 h-9 rounded-full bg-white hover:bg-[#0B3C26] text-stone-700 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-xs focus-visible:ring-2 focus-visible:ring-[#0B3C26] focus-visible:outline-none"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* View Full Gallery Link Button */}
            <a
              href={TREND_CATEGORY_INFO.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-full bg-[#0B3C26] hover:bg-[#072819] text-white hover:text-[#D4AF37] border border-[#C5A059] font-bold text-xs sm:text-sm shadow-sm transition-all duration-200 group cursor-pointer"
              title="글로벌외식정보 포토뉴스 전체보기 (새창)"
            >
              <span>{t('외식 트렌드 전체보기', 'View All Photo News')}</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-[#D4AF37]" />
            </a>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap focus-visible:ring-2 focus-visible:ring-[#0B3C26] focus-visible:outline-none ${
                activeCategory === cat.id
                  ? 'bg-[#0B3C26] text-[#D4AF37] shadow-sm font-black'
                  : 'bg-white text-stone-600 border border-stone-200 hover:border-stone-400 hover:text-stone-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
          <span className="text-xs text-stone-400 ml-auto hidden sm:inline-block font-medium">
            총 {filteredArticles.length}개의 최신 트렌드 기사
          </span>
        </div>

        {/* Gallery Carousel Horizontal Scroll Track */}
        <div
          ref={scrollContainerRef}
          className="flex gap-5 sm:gap-6 overflow-x-auto pb-4 pt-1 scroll-smooth snap-x snap-mandatory scrollbar-thin scrollbar-thumb-stone-300 scrollbar-track-transparent"
        >
          {filteredArticles.map((article, idx) => (
            <a
              key={article.id}
              href={article.linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="snap-start shrink-0 w-[300px] sm:w-[350px] lg:w-[380px] group bg-white rounded-3xl border border-stone-200/90 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-[#0B3C26] flex flex-col overflow-hidden"
              title={`${article.title} (새창 열기)`}
            >
              {/* Gallery Image Canvas */}
              <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                  onError={(e) => {
                    e.currentTarget.src = article.remoteImageUrl;
                  }}
                />

                {/* Dark Gradient Overlay for Gallery Effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                {/* Top Badge */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md text-white text-[11px] font-bold border border-white/20">
                    포토뉴스 #{idx + 1}
                  </span>
                  {idx === 0 && (
                    <span className="px-2 py-0.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-white text-[10px] font-black shadow-xs">
                      HOT
                    </span>
                  )}
                </div>

                {/* Hover CTA Indicator */}
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  <span className="px-3 py-1.5 rounded-full bg-[#0B3C26]/90 backdrop-blur-md text-[#D4AF37] text-xs font-black border border-[#C5A059]/60 shadow-md flex items-center gap-1">
                    <span>기사 읽기</span>
                    <ExternalLink className="w-3 h-3 text-[#D4AF37]" />
                  </span>
                </div>
              </div>

              {/* Gallery Card Information */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-stone-500 font-medium">
                    <span className="flex items-center gap-1 text-[#0B3C26] font-bold">
                      <Calendar className="w-3.5 h-3.5 text-stone-400" />
                      <span>{article.date}</span>
                    </span>
                    <span className="truncate max-w-[150px] text-stone-600 bg-stone-100 px-2 py-0.5 rounded-md font-semibold text-[11px]">
                      {article.author}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-[#0B3C26] transition-colors line-clamp-2 tracking-tight leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-stone-500 line-clamp-2 leading-relaxed">
                    {article.summary}
                  </p>
                </div>

                {/* Card Footer Link */}
                <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-[#0B3C26]">
                  <span className="group-hover:underline">글로벌외식정보 기사 전문</span>
                  <div className="w-7 h-7 rounded-full bg-emerald-50 group-hover:bg-[#0B3C26] group-hover:text-[#D4AF37] flex items-center justify-center transition-colors">
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Gallery Guidance Footer */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#0B3C26]/5 border border-[#0B3C26]/15 flex flex-col sm:flex-row items-center justify-between gap-3 text-stone-700 text-xs sm:text-sm">
          <div className="flex items-center gap-2.5">
            <span className="text-base sm:text-lg">💡</span>
            <span>
              <strong>외식업 성공 창업 노하우:</strong> 각 기사 화보를 클릭하면 <strong>글로벌외식정보(HSGDN)</strong> 공식 칼럼 상세 페이지로 연결되어 전체 인터뷰와 분석 자료를 열람하실 수 있습니다.
            </span>
          </div>

          <a
            href={TREND_CATEGORY_INFO.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-black text-[#0B3C26] hover:text-[#164e34] hover:underline flex items-center gap-1 shrink-0"
          >
            <span>포토뉴스 페이지 바로가기</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
}
