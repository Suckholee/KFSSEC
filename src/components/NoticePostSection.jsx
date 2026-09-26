import { useLanguage } from '../i18n/LanguageContext';
import React, { useState } from 'react';
import { ChevronRight, Bell, Calendar } from 'lucide-react';

export default function NoticePostSection({ onScrollNext }) {
  const { t } = useLanguage();
  const [activeSlide, setActiveSlide] = useState(0);

  const posts = [
    {
      id: 'post-1',
      date: '2026년 08월',
      title: '외식창업 수강생 N:N 커리큘럼 매칭 포트폴리오 시스템 도입',
      subtitle: '사단법인 한국외식창업교육원 맞춤 수강생 라이프스타일 창업 교육 개편',
      image: '/images/dir_1.jpg',
    },
    {
      id: 'post-2',
      date: '2026년 08월',
      title: '2026 사단법인 한국외식창업교육원 3분기 총회 및 성과발표회 개최',
      subtitle: '2026 결산 및 외식창업 비전 사업 계획 정기 총회 성료',
      image: '/images/yt_thumb_1.jpg',
    },
    {
      id: 'post-3',
      date: '2026년 08월',
      title: '제 01회 요리대회 <K-FOOD 지역 특산물 연계 조리 경연 대회> 규정집 안내',
      subtitle: '지역 특산 식재료 연계 레시피 개발 및 외식창업 시그니처 메뉴 경연',
      image: '/images/yt_thumb_2.jpg',
    },
  ];

  const currentPost = posts[activeSlide];

  return (
    <section
      id="notice-section"
      className="relative py-12 lg:py-16 bg-[#FAF8F5] text-gray-900 min-h-[460px] flex flex-col justify-center font-sans border-b border-stone-200/80"
    >
      <div className="w-full px-4 sm:px-8 lg:px-12 max-w-[1520px] mx-auto space-y-6">
        {/* Header Badge Bar */}
        <div className="border-b border-stone-200/80 pb-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="px-3 py-1 bg-[#0B3C26]/10 text-[#0B3C26] border border-[#0B3C26]/20 text-xs font-black rounded-full flex items-center gap-1.5 shadow-xs">
              <Bell className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>{t("공지사항 & 소식")}</span>
            </span>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-gray-900 tracking-tight">
              {t("교육원 주요 소식")}
            </h2>
          </div>

          {/* Dots Carousel Indicator */}
          <div className="flex items-center gap-2">
            {posts.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveSlide(idx)}
                aria-label={`${t('교육원 주요 소식')} ${idx + 1}`}
                className={`w-3.5 h-3.5 rounded-full transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-[#0B3C26] focus-visible:outline-none ${
                  activeSlide === idx
                    ? 'bg-[#0B3C26] scale-125 shadow-xs'
                    : 'bg-stone-300 hover:bg-stone-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Card Content View */}
        <div className="bg-white rounded-3xl border border-stone-200/90 p-5 sm:p-7 lg:p-8 shadow-md hover:shadow-lg transition-all flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 overflow-hidden">
          {/* Left Photo Container */}
          <div className="w-full md:w-1/2 relative h-56 sm:h-72 rounded-2xl overflow-hidden shadow-sm border border-stone-200 bg-stone-100 group shrink-0">
            <img
              src={currentPost.image}
              alt={t(currentPost.title)}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-3 left-3 bg-[#0B3C26]/90 backdrop-blur-md text-[#D4AF37] font-black text-xs px-3 py-1 rounded-lg border border-[#C5A059]/40 shadow-xs">
              {t("사)한국외식창업교육원 공지")}
            </div>
          </div>

          {/* Right Info Text & Slide Title */}
          <div className="w-full md:w-1/2 space-y-4 md:pl-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#0B3C26]/10 text-[#0B3C26] border border-[#0B3C26]/20 text-xs font-black">
              <Calendar className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>{t(currentPost.date)}</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-gray-900 leading-snug">
              {t(currentPost.title)}
            </h3>

            <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed">
              {t(currentPost.subtitle)}
            </p>

            <div className="pt-2">
              <button
                onClick={() => alert(t(currentPost.title))}
                className="px-6 py-3 bg-[#0B3C26] hover:bg-[#072819] text-white text-xs sm:text-sm font-black rounded-xl shadow-md transition-all cursor-pointer inline-flex items-center gap-2 border border-[#C5A059] min-h-[44px] focus-visible:ring-2 focus-visible:ring-[#0B3C26] focus-visible:outline-none"
                aria-label={`${t(currentPost.title)} — ${t("게시글 전문 읽기")}`}
              >
                <span>{t("게시글 전문 읽기")}</span>
                <ChevronRight className="w-4 h-4 text-[#D4AF37]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
