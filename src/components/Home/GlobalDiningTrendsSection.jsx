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
  Play,
  Pause,
  RefreshCw,
} from 'lucide-react';

export default function GlobalDiningTrendsSection() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('all');
  const [direction, setDirection] = useState('right'); // 'right' (default) or 'left'
  const [isPlaying, setIsPlaying] = useState(true);

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

  // Duplicate list for seamless infinite marquee loop
  const marqueeList = filteredArticles.length > 0
    ? [...filteredArticles, ...filteredArticles]
    : [];

  // Duration in seconds calculated so it flows gently regardless of item count
  const marqueeDuration = Math.max(45, filteredArticles.length * 3.8);

  return (
    <section
      id="global-dining-trends-section"
      className="relative py-14 lg:py-20 bg-gradient-to-b from-[#FAF8F5] via-white to-[#FAF8F5] text-gray-900 font-sans border-y-2 border-[#E7E2D8] overflow-hidden shadow-inner"
    >
      {/* Background Decorative Ambient Gradients */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#C5A059]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full px-4 sm:px-8 lg:px-12 max-w-[1600px] mx-auto space-y-7">
        
        {/* Gallery Header Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-stone-200">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-[#14532D] to-[#15803D] text-white text-xs font-black shadow-xs border border-[#4ADE80]/30">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
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
                <Camera className="w-7 h-7 sm:w-8 sm:h-8 text-[#15803D]" />
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

          {/* Right Navigation & Flow Controls */}
          <div className="flex flex-wrap items-center gap-2.5 self-start md:self-end shrink-0">
            {/* Gallery Flow Controls */}
            <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-full border border-stone-200 shadow-2xs">
              <button
                type="button"
                onClick={() => {
                  setDirection('left');
                  setIsPlaying(true);
                }}
                aria-label="왼쪽으로 흐르기"
                title="왼쪽 방향으로 흐르기"
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                  direction === 'left' && isPlaying
                    ? 'bg-[#15803D] text-white shadow-xs'
                    : 'bg-white hover:bg-stone-200 text-stone-700'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setIsPlaying((prev) => !prev)}
                aria-label={isPlaying ? '흐름 일시정지' : '자동 흐름 재생'}
                title={isPlaying ? '마우스 오버 시에도 정지됩니다 (클릭하여 일시정지)' : '자동 애니메이션 재생'}
                className={`px-3 h-8 rounded-full flex items-center gap-1.5 text-xs font-bold transition-all cursor-pointer ${
                  !isPlaying
                    ? 'bg-amber-500 text-stone-950 font-black shadow-xs'
                    : 'bg-white hover:bg-stone-200 text-stone-700'
                }`}
              >
                {isPlaying ? (
                  <Pause className="w-3.5 h-3.5 text-stone-700" />
                ) : (
                  <Play className="w-3.5 h-3.5 fill-current" />
                )}
                <span>{isPlaying ? '일시정지' : '자동재생'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setDirection('right');
                  setIsPlaying(true);
                }}
                aria-label="오른쪽으로 흐르기 (기본)"
                title="오른쪽 방향으로 계속 흐르기"
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                  direction === 'right' && isPlaying
                    ? 'bg-[#15803D] text-white shadow-xs'
                    : 'bg-white hover:bg-stone-200 text-stone-700'
                }`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* View Full Gallery Link Button */}
            <a
              href={TREND_CATEGORY_INFO.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-full bg-gradient-to-r from-[#EA580C] to-[#F97316] hover:from-[#C2410C] hover:to-[#EA580C] text-white border border-orange-300 font-black text-xs sm:text-sm shadow-md transition-all duration-200 group cursor-pointer"
              title="글로벌외식정보 포토뉴스 전체보기 (새창)"
            >
              <span>{t('외식 트렌드 전체보기', 'View All Photo News')}</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-white" />
            </a>
          </div>
        </div>

        {/* Category Filter Pills & Live Update Status */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 overflow-x-auto pb-1 scrollbar-none">
          <div className="flex items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap focus-visible:ring-2 focus-visible:ring-[#15803D] focus-visible:outline-none ${
                  activeCategory === cat.id
                    ? 'bg-gradient-to-r from-[#14532D] to-[#15803D] text-white shadow-sm font-black border border-[#4ADE80]/30'
                    : 'bg-white text-stone-600 border border-stone-200 hover:border-stone-400 hover:text-stone-900'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2.5 text-xs font-medium text-stone-500 shrink-0">
            <span className="inline-flex items-center gap-1.5 bg-[#EAF6EE] text-[#1E5D3B] px-3 py-1 rounded-full border border-[#BEDECB] font-bold text-[11px] shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>실시간 최신화 연동 ({TREND_CATEGORY_INFO.lastUpdated})</span>
            </span>
            <span className="hidden lg:inline-block text-stone-400">
              총 {filteredArticles.length}편 수록 · 마우스 오버 시 정지
            </span>
          </div>
        </div>

        {/* Gallery Continuous Rightward Flowing Track */}
        <div className="relative w-full overflow-hidden group py-2">
          {/* Left & Right Shadow Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-r from-[#FAF8F5] via-[#FAF8F5]/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-l from-[#FAF8F5] via-[#FAF8F5]/80 to-transparent z-10 pointer-events-none" />

          {/* Marquee Row */}
          <div
            className={`flex items-stretch gap-5 sm:gap-6 w-max ${
              direction === 'right' ? 'animate-marquee-right' : 'animate-marquee-left'
            } hover:[animation-play-state:paused]`}
            style={{
              animationDuration: `${marqueeDuration}s`,
              animationPlayState: isPlaying ? undefined : 'paused',
            }}
          >
            {marqueeList.map((article, idx) => {
              const realIdx = idx % filteredArticles.length;
              const isLatestHot = realIdx === 0;
              const isSecondHot = realIdx === 1;

              return (
                <a
                  key={`${article.id}-${idx}`}
                  href={article.linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 w-[290px] sm:w-[340px] lg:w-[370px] group/card bg-white rounded-3xl border border-stone-200/90 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:border-[#16A34A] flex flex-col overflow-hidden select-none"
                  title={`${article.title} (새창 열기)`}
                >
                  {/* Gallery Image Canvas */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover/card:scale-108 transition-transform duration-700 ease-out"
                      onError={(e) => {
                        e.currentTarget.src = article.remoteImageUrl;
                      }}
                    />

                    {/* Dark Gradient Overlay for Gallery Effect */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent opacity-60 group-hover/card:opacity-40 transition-opacity" />

                    {/* Top Badge */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span className="px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-md text-white text-[11px] font-bold border border-white/20">
                        포토뉴스 #{realIdx + 1}
                      </span>
                      {isLatestHot && (
                        <span className="px-2 py-0.5 rounded-lg bg-gradient-to-r from-[#EA580C] to-[#F97316] text-white text-[10px] font-black shadow-xs">
                          HOT
                        </span>
                      )}
                      {isSecondHot && (
                        <span className="px-2 py-0.5 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-[10px] font-black shadow-xs">
                          NEW
                        </span>
                      )}
                    </div>

                    {/* Hover CTA Indicator */}
                    <div className="absolute bottom-3 right-3 opacity-0 group-hover/card:opacity-100 translate-y-2 group-hover/card:translate-y-0 transition-all duration-300">
                      <span className="px-3 py-1.5 rounded-full bg-[#14532D]/95 backdrop-blur-md text-[#86EFAC] text-xs font-black border border-[#4ADE80]/40 shadow-md flex items-center gap-1">
                        <span>기사 읽기</span>
                        <ExternalLink className="w-3 h-3 text-[#86EFAC]" />
                      </span>
                    </div>
                  </div>

                  {/* Gallery Card Information */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs text-stone-500 font-medium gap-2">
                        <span className="flex items-center gap-1 text-[#15803D] font-bold shrink-0">
                          <Calendar className="w-3.5 h-3.5 text-stone-400" />
                          <span>{article.date}</span>
                        </span>
                        <span className="truncate max-w-[160px] text-stone-600 bg-stone-100 px-2 py-0.5 rounded-md font-semibold text-[11px]">
                          {article.author}
                        </span>
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-gray-900 group-hover/card:text-[#15803D] transition-colors line-clamp-2 tracking-tight leading-snug">
                        {article.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-stone-500 line-clamp-2 leading-relaxed font-medium">
                        {article.summary}
                      </p>
                    </div>

                    {/* Card Footer Link */}
                    <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-[#15803D]">
                      <span className="group-hover/card:underline">글로벌외식정보 기사 전문</span>
                      <div className="w-7 h-7 rounded-full bg-[#F0FDF4] group-hover/card:bg-[#15803D] group-hover/card:text-white flex items-center justify-center transition-colors">
                        <ArrowUpRight className="w-4 h-4 transition-transform group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5" />
                      </div>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>


      </div>
    </section>
  );
}
