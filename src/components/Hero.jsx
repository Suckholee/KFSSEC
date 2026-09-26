import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import {
  ChevronRight,
  ChevronLeft,
  GraduationCap,
  Award,
  Building2,
  ChevronDown,
  Pause,
  Play,
  Sparkles,
} from 'lucide-react';

export const DEFAULT_HERO_BANNERS = [
  {
    id: 'banner_fearless',
    title: '외식 창업이 두려운가?',
    subtitle: '한국외식창업교육원에서 성공으로 이끌어 드립니다.',
    imageUrl: '/images/hero_banner_fearless.png',
    imageOnly: true,
    active: true,
    overlayDim: 0,
    buttonText: '교육과정 둘러보기',
    buttonLink: 'catalog',
  },
  {
    id: 'banner_masters_classic',
    title: '꿈꾸는 외식창업 아무에게나 맡기시겠습니까?',
    subtitle: '오랜 현장실무경험과 실력을 갖춘 명인, 명장님께 맡겨주세요! 성공적인 창업은 저희가 책임지겠습니다.',
    imageUrl: '/images/main_banner_masters.png',
    imageOnly: true,
    active: true,
    overlayDim: 0,
    buttonText: '명인·명장 교수진 소개',
    buttonLink: 'about',
  },
  {
    id: 'banner_culinary_pro',
    title: '특급호텔 40년 명장의 1:1 직강 비법 전수',
    subtitle: '100년 전통 발효 소스부터 1인 주방 최적화 동선 설계까지 실전 창업 성공 솔루션',
    imageUrl: '/images/chef_tossing_food.jpg',
    imageOnly: false,
    active: true,
    overlayDim: 55,
    tag: '대한민국 조리명장 제1호 직강',
    buttonText: '1:1 맞춤 상담 신청',
    buttonLink: 'community',
  },
];

export default function Hero({
  heroBanners,
  onExploreClick,
  onAboutClick,
  onInquiryClick,
  onScrollNext,
}) {
  const { t } = useLanguage();

  const banners = (heroBanners && heroBanners.length > 0 ? heroBanners : DEFAULT_HERO_BANNERS)
    .filter((b) => b.active !== false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef(null);

  // Safety check if index out of bounds
  useEffect(() => {
    if (currentIndex >= banners.length) {
      setCurrentIndex(0);
    }
  }, [banners.length, currentIndex]);

  // Auto-play rotation (every 5.5s)
  useEffect(() => {
    if (!isPlaying || isHovered || banners.length <= 1) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 5500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, isHovered, banners.length]);

  const handlePrev = (e) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const handleNext = (e) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  };

  const currentBanner = banners[currentIndex] || DEFAULT_HERO_BANNERS[0];

  const handleBannerButtonClick = (banner) => {
    if (banner.buttonLink === 'catalog') {
      onExploreClick?.();
    } else if (banner.buttonLink === 'about') {
      onAboutClick?.();
    } else if (banner.buttonLink === 'community') {
      onInquiryClick?.();
    } else {
      onExploreClick?.();
    }
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#000000] text-white border-b-2 border-[#C5A059] shadow-2xl">
      {/* HERO SLIDER CAROUSEL CONTAINER */}
      <div
        className="relative w-full bg-[#000000] flex justify-center items-center group/hero select-none overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="w-full max-w-[2296px] mx-auto relative min-h-[260px] sm:min-h-[380px] md:min-h-[460px] lg:min-h-[540px] flex items-center justify-center">
          
          {/* SLIDES */}
          {banners.map((banner, idx) => {
            const isActive = idx === currentIndex;

            return (
              <div
                key={banner.id || idx}
                className={`transition-all duration-700 ease-in-out ${
                  isActive
                    ? 'opacity-100 z-10 scale-100 relative w-full'
                    : 'opacity-0 z-0 scale-95 pointer-events-none absolute inset-0'
                }`}
              >
                {banner.imageOnly ? (
                  /* TYPE 1: GRAPHIC BANNER WITH BAKED-IN DESIGN (Image 2 style) */
                  <div className="w-full flex justify-center items-center bg-black">
                    <img
                      src={banner.imageUrl}
                      alt={banner.title || '사단법인 한국외식창업교육원 대한민국 명인·명장'}
                      className="w-full h-auto max-h-[640px] object-contain block mx-auto transition-transform duration-1000"
                    />
                  </div>
                ) : (
                  /* TYPE 2: CINEMATIC PHOTO + OVERLAY TYPOGRAPHY */
                  <div className="relative w-full h-[320px] sm:h-[420px] md:h-[500px] lg:h-[580px] flex items-center justify-center overflow-hidden">
                    {/* Background Image */}
                    <img
                      src={banner.imageUrl}
                      alt={banner.title}
                      className="absolute inset-0 w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000"
                    />

                    {/* Dark Luxury Dimming Gradient */}
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30 pointer-events-none"
                      style={{
                        backgroundColor: `rgba(0, 0, 0, ${(banner.overlayDim || 50) / 100})`,
                      }}
                    />

                    {/* Foreground Content */}
                    <div className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center gap-3 sm:gap-4 animate-fadeIn">
                      {banner.tag && (
                        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#C5A059]/90 text-black font-black text-[11px] sm:text-xs shadow-lg">
                          <Sparkles className="w-3.5 h-3.5 fill-black" />
                          <span>{banner.tag}</span>
                        </div>
                      )}

                      <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
                        {banner.title}
                      </h1>

                      <p className="text-xs sm:text-base md:text-lg text-emerald-100/90 font-medium max-w-2xl leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                        {banner.subtitle}
                      </p>

                      {banner.buttonText && (
                        <button
                          onClick={() => handleBannerButtonClick(banner)}
                          className="mt-2 px-6 sm:px-8 py-2.5 sm:py-3.5 bg-gradient-to-r from-[#0B3C26] to-[#146340] hover:from-[#072819] hover:to-[#0B3C26] text-white font-black text-xs sm:text-sm rounded-xl sm:rounded-2xl border-2 border-[#C5A059] shadow-2xl transition-all cursor-pointer flex items-center gap-2 group/btn"
                        >
                          <span>{banner.buttonText}</span>
                          <ChevronRight className="w-4 h-4 text-[#D4AF37] group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* SLIDER NAVIGATION ARROWS (Visible on Hover / Mobile Always) */}
          {banners.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black text-white/80 hover:text-[#D4AF37] border border-white/20 hover:border-[#C5A059] backdrop-blur-md flex items-center justify-center transition-all shadow-xl cursor-pointer opacity-75 sm:opacity-0 group-hover/hero:opacity-100"
                aria-label="이전 배너"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black text-white/80 hover:text-[#D4AF37] border border-white/20 hover:border-[#C5A059] backdrop-blur-md flex items-center justify-center transition-all shadow-xl cursor-pointer opacity-75 sm:opacity-0 group-hover/hero:opacity-100"
                aria-label="다음 배너"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
              </button>
            </>
          )}

          {/* SLIDER BOTTOM CONTROLS & INDICATOR PILLS */}
          {banners.length > 1 && (
            <div className="absolute bottom-3 sm:bottom-4 z-20 flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10 shadow-2xl">
              {/* Dots */}
              <div className="flex items-center gap-1.5">
                {banners.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      idx === currentIndex
                        ? 'w-6 bg-[#D4AF37] shadow-[0_0_8px_#D4AF37]'
                        : 'w-2 bg-white/40 hover:bg-white/80'
                    }`}
                    aria-label={`슬라이드 ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Counter Indicator */}
              <span className="text-[10px] sm:text-[11px] font-mono font-bold text-gray-300 pl-1 border-l border-white/20">
                <span className="text-[#D4AF37]">0{currentIndex + 1}</span> / 0{banners.length}
              </span>

              {/* Play / Pause Toggle */}
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="text-gray-400 hover:text-white transition-colors cursor-pointer p-0.5"
                aria-label={isPlaying ? '자동 슬라이드 일시정지' : '자동 슬라이드 재생'}
              >
                {isPlaying ? (
                  <Pause className="w-3 h-3 text-gray-300" />
                ) : (
                  <Play className="w-3 h-3 text-[#D4AF37]" />
                )}
              </button>
            </div>
          )}

        </div>
      </div>

      {/* Floating Action Buttons & 3 Core Stats Overlay */}
      <div className="relative z-10 bg-gradient-to-b from-[#000000] via-[#050A07] to-[#0B150F] py-6 sm:py-8 px-4 sm:px-8 border-t border-stone-900">
        <div className="max-w-[1520px] mx-auto flex flex-col items-center gap-5 sm:gap-6">
          
          {/* Action Buttons Row */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
            <button
              onClick={onExploreClick}
              className="px-7 sm:px-9 py-3.5 bg-gradient-to-r from-[#0B3C26] to-[#146340] hover:from-[#072819] hover:to-[#0B3C26] text-white font-black text-xs sm:text-sm rounded-2xl shadow-2xl transition-all flex items-center justify-center gap-2 border-2 border-[#C5A059] cursor-pointer group"
              aria-label={t("교육과정 둘러보기 목록으로 이동")}
            >
              <span>{t("교육과정 둘러보기")}</span>
              <ChevronRight className="w-4 h-4 text-[#D4AF37] group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onAboutClick}
              className="px-7 sm:px-9 py-3.5 bg-black/80 hover:bg-black text-[#D4AF37] hover:text-white font-black text-xs sm:text-sm rounded-2xl shadow-2xl transition-all flex items-center justify-center gap-2 border-2 border-[#C5A059]/80 cursor-pointer group backdrop-blur-md"
              aria-label={t("교육원 상세 소개 페이지로 이동")}
            >
              <span>{t("교육원 소개")}</span>
              <ChevronRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* 3 Core Stats Card - Luxury Dark Emerald Glassmorphism */}
          <div className="w-full max-w-2xl bg-[#0B3C26]/90 backdrop-blur-md text-white border-2 border-[#C5A059] rounded-2xl p-4 sm:p-5 shadow-2xl">
            <div className="grid grid-cols-3 gap-2 sm:gap-4 divide-x divide-emerald-700/60">
              
              {/* Stat 1: 1·2급 자격과정 */}
              <div className="flex flex-col items-center text-center px-1">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#072819] border border-[#C5A059]/40 flex items-center justify-center mb-1 text-[#D4AF37] shadow-xs">
                  <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2]" />
                </div>
                <span className="text-sm sm:text-base lg:text-lg font-black text-white tracking-tight leading-tight">
                  {t("온·오프라인")}
                </span>
                <span className="text-[11px] sm:text-xs font-bold text-emerald-100/90 mt-0.5">
                  {t("1·2급 자격과정")}
                </span>
              </div>

              {/* Stat 2: 수강 기간 */}
              <div className="flex flex-col items-center text-center px-1">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#072819] border border-[#C5A059]/40 flex items-center justify-center mb-1 text-[#D4AF37] shadow-xs">
                  <Award className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2]" />
                </div>
                <span className="text-sm sm:text-base lg:text-lg font-black text-white tracking-tight leading-tight">
                  {t("4~8주 완성")}
                </span>
                <span className="text-[11px] sm:text-xs font-bold text-emerald-100/90 mt-0.5">
                  {t("수강 기간")}
                </span>
              </div>

              {/* Stat 3: 5대 전문과정 */}
              <div className="flex flex-col items-center text-center px-1">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#072819] border border-[#C5A059]/40 flex items-center justify-center mb-1 text-[#D4AF37] shadow-xs">
                  <Building2 className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2]" />
                </div>
                <span className="text-sm sm:text-base lg:text-lg font-black text-white tracking-tight leading-tight">
                  {t("5대 전문과정")}
                </span>
                <span className="text-[11px] sm:text-xs font-bold text-emerald-100/90 mt-0.5 truncate max-w-[120px] sm:max-w-none">
                  {t("창업·푸드테크·와인")}
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Scroll Down Indicator */}
      {onScrollNext && (
        <button
          onClick={onScrollNext}
          className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 group cursor-pointer focus-visible:ring-2 focus-visible:ring-[#C5A059] focus-visible:outline-none rounded-full p-1"
          aria-label={t("아래 섹션으로 스크롤")}
        >
          <div className="w-6 h-6 rounded-full bg-black/40 border border-[#C5A059] flex items-center justify-center text-[#D4AF37] group-hover:bg-[#C5A059] group-hover:text-black transition-all shadow-xs animate-bounce">
            <ChevronDown className="w-3.5 h-3.5 stroke-[2.5]" />
          </div>
        </button>
      )}

    </section>
  );
}
