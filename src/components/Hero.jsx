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
import { useAdminEdit } from '../context/AdminEditContext';
import EditableText from './Admin/InlineEditor/EditableText';
import EditableImage from './Admin/InlineEditor/EditableImage';

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
  const { isEditMode, siteDraft, updateSiteField, updateSiteDraft } = useAdminEdit();

  const currentHeroBanners = (siteDraft?.heroBanners && siteDraft.heroBanners.length > 0)
    ? siteDraft.heroBanners
    : (heroBanners && heroBanners.length > 0 ? heroBanners : DEFAULT_HERO_BANNERS);

  const banners = currentHeroBanners.filter((b) => b.active !== false);

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

  // Auto-play rotation (every 5.5s) - pause if admin edit mode is active
  useEffect(() => {
    if (isEditMode || !isPlaying || isHovered || banners.length <= 1) {
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
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#F0FDF4] via-[#F8FAF9] to-white text-stone-900 border-b border-[#DCFCE7] shadow-xs">
      {/* Subtle Pastel Ambient Glow */}
      <div className="absolute top-0 inset-x-0 h-96 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(34,197,94,0.12),transparent)] pointer-events-none" />

      {/* HERO SLIDER CAROUSEL CONTAINER (Framed Modern Showcase) */}
      <div className="w-full max-w-[1520px] mx-auto px-2 sm:px-6 lg:px-8 pt-3 sm:pt-6 relative z-10">
        <div
          className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-stone-200/80 bg-stone-950 flex justify-center items-center group/hero select-none"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="w-full relative min-h-[260px] sm:min-h-[380px] md:min-h-[460px] lg:min-h-[540px] flex items-center justify-center">
            
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
                    <EditableImage
                      src={banner.imageUrl}
                      alt={banner.title || '사단법인 한국외식창업교육원 대한민국 명인·명장'}
                      slides={banners}
                      currentSlideIndex={currentIndex}
                      onSelectSlide={(newIdx) => setCurrentIndex(newIdx)}
                      onReorderSlides={(newBanners) => {
                        updateSiteDraft((prev) => ({
                          ...prev,
                          heroBanners: newBanners,
                        }));
                      }}
                      onChange={(newUrl, targetIdx) => {
                        updateSiteDraft((prev) => {
                          const list = prev?.heroBanners || DEFAULT_HERO_BANNERS;
                          const targetBanner = targetIdx !== undefined ? banners[targetIdx] : banner;
                          return {
                            ...prev,
                            heroBanners: list.map((b) => (b.id === (targetBanner?.id || banner.id) ? { ...b, imageUrl: newUrl } : b)),
                          };
                        });
                      }}
                      className="w-full flex justify-center items-center bg-stone-950 min-h-[280px]"
                      imageClassName="w-full h-auto max-h-[640px] object-cover sm:object-contain block mx-auto transition-transform duration-1000"
                    />
                  ) : (
                    /* TYPE 2: CINEMATIC PHOTO + OVERLAY TYPOGRAPHY */
                    <div className="relative w-full h-[320px] sm:h-[420px] md:h-[500px] lg:h-[580px] flex items-center justify-center overflow-hidden bg-stone-950">
                      {/* Background Image */}
                      <EditableImage
                        src={banner.imageUrl}
                        alt={banner.title}
                        slides={banners}
                        currentSlideIndex={currentIndex}
                        onSelectSlide={(newIdx) => setCurrentIndex(newIdx)}
                        onReorderSlides={(newBanners) => {
                          updateSiteDraft((prev) => ({
                            ...prev,
                            heroBanners: newBanners,
                          }));
                        }}
                        onChange={(newUrl, targetIdx) => {
                          updateSiteDraft((prev) => {
                            const list = prev?.heroBanners || DEFAULT_HERO_BANNERS;
                            const targetBanner = targetIdx !== undefined ? banners[targetIdx] : banner;
                            return {
                              ...prev,
                              heroBanners: list.map((b) => (b.id === (targetBanner?.id || banner.id) ? { ...b, imageUrl: newUrl } : b)),
                            };
                          });
                        }}
                        className="absolute inset-0 w-full h-full"
                        imageClassName="w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000"
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
                          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#EA580C] text-white font-black text-[11px] sm:text-xs shadow-lg">
                            <Sparkles className="w-3.5 h-3.5 fill-white" />
                            <EditableText
                              value={banner.tag}
                              onChange={(val) => {
                                updateSiteDraft((prev) => {
                                  const list = prev?.heroBanners || DEFAULT_HERO_BANNERS;
                                  return {
                                    ...prev,
                                    heroBanners: list.map((b) => (b.id === banner.id ? { ...b, tag: val } : b)),
                                  };
                                });
                              }}
                            />
                          </div>
                        )}

                        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
                          <EditableText
                            value={banner.title}
                            onChange={(val) => {
                              updateSiteDraft((prev) => {
                                const list = prev?.heroBanners || DEFAULT_HERO_BANNERS;
                                return {
                                  ...prev,
                                  heroBanners: list.map((b) => (b.id === banner.id ? { ...b, title: val } : b)),
                                };
                              });
                            }}
                          />
                        </h1>

                        <p className="text-xs sm:text-base md:text-lg text-emerald-100/90 font-medium max-w-2xl leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                          <EditableText
                            value={banner.subtitle}
                            multiline
                            onChange={(val) => {
                              updateSiteDraft((prev) => {
                                const list = prev?.heroBanners || DEFAULT_HERO_BANNERS;
                                return {
                                  ...prev,
                                  heroBanners: list.map((b) => (b.id === banner.id ? { ...b, subtitle: val } : b)),
                                };
                              });
                            }}
                          />
                        </p>

                        {banner.buttonText && (
                          <button
                            onClick={() => handleBannerButtonClick(banner)}
                            className="mt-2 px-6 sm:px-8 py-2.5 sm:py-3.5 bg-gradient-to-r from-[#14532D] via-[#15803D] to-[#16A34A] hover:from-[#15803D] hover:to-[#16A34A] text-white font-black text-xs sm:text-sm rounded-xl sm:rounded-2xl border border-[#4ADE80]/40 shadow-2xl transition-all cursor-pointer flex items-center gap-2 group/btn"
                          >
                            <EditableText
                              value={banner.buttonText}
                              onChange={(val) => {
                                updateSiteDraft((prev) => {
                                  const list = prev?.heroBanners || DEFAULT_HERO_BANNERS;
                                  return {
                                    ...prev,
                                    heroBanners: list.map((b) => (b.id === banner.id ? { ...b, buttonText: val } : b)),
                                  };
                                });
                              }}
                            />
                            <ChevronRight className="w-4 h-4 text-[#86EFAC] group-hover/btn:translate-x-1 transition-transform" />
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
                  className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-black/50 hover:bg-black/80 text-white/90 hover:text-white border border-white/20 hover:border-[#F97316] backdrop-blur-md flex items-center justify-center transition-all shadow-xl cursor-pointer opacity-80 sm:opacity-0 group-hover/hero:opacity-100"
                  aria-label="이전 배너"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
                </button>

                <button
                  onClick={handleNext}
                  className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-black/50 hover:bg-black/80 text-white/90 hover:text-white border border-white/20 hover:border-[#F97316] backdrop-blur-md flex items-center justify-center transition-all shadow-xl cursor-pointer opacity-80 sm:opacity-0 group-hover/hero:opacity-100"
                  aria-label="다음 배너"
                >
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
                </button>
              </>
            )}

            {/* SLIDER BOTTOM CONTROLS & INDICATOR PILLS */}
            {banners.length > 1 && (
              <div className="absolute bottom-3 sm:bottom-4 z-20 flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 shadow-2xl">
                {/* Dots */}
                <div className="flex items-center gap-1.5">
                  {banners.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`h-2 rounded-full transition-all cursor-pointer ${
                        idx === currentIndex
                          ? 'w-6 bg-[#F97316] shadow-[0_0_8px_#F97316]'
                          : 'w-2 bg-white/40 hover:bg-white/80'
                      }`}
                      aria-label={`슬라이드 ${idx + 1}`}
                    />
                  ))}
                </div>

                {/* Counter Indicator */}
                <span className="text-[10px] sm:text-[11px] font-mono font-bold text-gray-200 pl-1 border-l border-white/20">
                  <span className="text-[#F97316]">0{currentIndex + 1}</span> / 0{banners.length}
                </span>

                {/* Play / Pause Toggle */}
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="text-gray-300 hover:text-white transition-colors cursor-pointer p-0.5"
                  aria-label={isPlaying ? '자동 슬라이드 일시정지' : '자동 슬라이드 재생'}
                >
                  {isPlaying ? (
                    <Pause className="w-3 h-3 text-gray-200" />
                  ) : (
                    <Play className="w-3 h-3 text-[#F97316]" />
                  )}
                </button>

                {/* Edit Mode Quick Reorder Buttons */}
                {isEditMode && banners.length > 1 && (
                  <div className="flex items-center gap-1 pl-1.5 border-l border-white/20">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (currentIndex > 0) {
                          const newBanners = [...banners];
                          const [moved] = newBanners.splice(currentIndex, 1);
                          newBanners.splice(currentIndex - 1, 0, moved);
                          updateSiteDraft((prev) => ({ ...prev, heroBanners: newBanners }));
                          setCurrentIndex(currentIndex - 1);
                        }
                      }}
                      disabled={currentIndex === 0}
                      className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-amber-500 hover:bg-amber-400 disabled:opacity-30 disabled:hover:bg-amber-500 text-slate-950 flex items-center gap-0.5 cursor-pointer disabled:cursor-not-allowed transition"
                      title={`${currentIndex + 1}번 배너를 앞으로 이동`}
                    >
                      <ChevronLeft className="w-3 h-3 stroke-[2.5]" />
                      <span>앞으로</span>
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (currentIndex < banners.length - 1) {
                          const newBanners = [...banners];
                          const [moved] = newBanners.splice(currentIndex, 1);
                          newBanners.splice(currentIndex + 1, 0, moved);
                          updateSiteDraft((prev) => ({ ...prev, heroBanners: newBanners }));
                          setCurrentIndex(currentIndex + 1);
                        }
                      }}
                      disabled={currentIndex === banners.length - 1}
                      className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-amber-500 hover:bg-amber-400 disabled:opacity-30 disabled:hover:bg-amber-500 text-slate-950 flex items-center gap-0.5 cursor-pointer disabled:cursor-not-allowed transition"
                      title={`${currentIndex + 1}번 배너를 뒤로 이동`}
                    >
                      <span>뒤로</span>
                      <ChevronRight className="w-3 h-3 stroke-[2.5]" />
                    </button>
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      </div>

      {/* Floating Action Buttons & 3 Core Stats Area */}
      <div className="relative z-10 py-7 sm:py-9 px-4 sm:px-8">
        <div className="max-w-[1520px] mx-auto flex flex-col items-center gap-5 sm:gap-6">
          
          {/* Action Buttons Row */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
            <button
              onClick={onExploreClick}
              className="px-7 sm:px-9 py-3.5 bg-gradient-to-r from-[#EA580C] to-[#F97316] hover:from-[#C2410C] hover:to-[#EA580C] text-white font-black text-xs sm:text-sm rounded-2xl shadow-xl shadow-orange-500/20 transition-all flex items-center justify-center gap-2 border border-orange-300/40 cursor-pointer group"
              aria-label={t("교육과정 둘러보기 목록으로 이동")}
            >
              <span>{t("교육과정 둘러보기")}</span>
              <ChevronRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onAboutClick}
              className="px-7 sm:px-9 py-3.5 bg-white hover:bg-[#F0FDF4] text-[#14532D] font-black text-xs sm:text-sm rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 border-2 border-[#15803D]/25 hover:border-[#15803D] cursor-pointer group"
              aria-label={t("교육원 상세 소개 페이지로 이동")}
            >
              <span>{t("교육원 소개")}</span>
              <ChevronRight className="w-4 h-4 text-[#16A34A] group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* 3 Core Stats Card - Fresh Sage & Emerald Glassmorphism */}
          <div className="w-full max-w-2xl bg-gradient-to-r from-[#14532D] via-[#15803D] to-[#16A34A] text-white border border-[#4ADE80]/30 rounded-2xl p-4 sm:p-5 shadow-xl shadow-emerald-900/10">
            <div className="grid grid-cols-3 gap-2 sm:gap-4 divide-x divide-emerald-500/30">
              
              {/* Stat 1: 1·2급 자격과정 */}
              <div className="flex flex-col items-center text-center px-1">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/15 border border-white/25 flex items-center justify-center mb-1 text-[#86efac] shadow-xs">
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
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/15 border border-white/25 flex items-center justify-center mb-1 text-[#86efac] shadow-xs">
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
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/15 border border-white/25 flex items-center justify-center mb-1 text-[#86efac] shadow-xs">
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
          className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 group cursor-pointer focus-visible:ring-2 focus-visible:ring-[#15803D] focus-visible:outline-none rounded-full p-1"
          aria-label={t("아래 섹션으로 스크롤")}
        >
          <div className="w-6 h-6 rounded-full bg-white border border-[#16A34A]/30 flex items-center justify-center text-[#15803D] group-hover:bg-[#15803D] group-hover:text-white transition-all shadow-sm animate-bounce">
            <ChevronDown className="w-3.5 h-3.5 stroke-[2.5]" />
          </div>
        </button>
      )}

    </section>
  );
}
