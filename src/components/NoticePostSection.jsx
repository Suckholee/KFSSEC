import { useLanguage } from '../i18n/LanguageContext';
import React, { useState } from 'react';
import { ChevronRight, Bell, Calendar } from 'lucide-react';

export default function NoticePostSection({ onScrollNext, postsList = [] }) {
  const { t } = useLanguage();
  const [activeSlide, setActiveSlide] = useState(0);

  const posts = postsList.filter(post => post.categoryType === 'notice' || post.isPinned).slice(0, 3)
    .map(post => ({ ...post, subtitle: post.content, image: post.image || '/images/hero_bg.jpg' }));
  const currentPost = posts[activeSlide % posts.length];
  if (!currentPost) return null;

  return (
    <section
      id="notice-section"
      className="relative py-12 lg:py-16 bg-[#FAF8F5] text-gray-900 min-h-[460px] flex flex-col justify-center font-sans border-b border-[#E7E2D8]"
    >
      <div className="w-full px-4 sm:px-8 lg:px-12 max-w-[1520px] mx-auto space-y-6">
        {/* Header Badge Bar */}
        <div className="border-b border-stone-200 pb-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="px-3 py-1 bg-[#F0FDF4] text-[#15803D] border border-[#DCFCE7] text-xs font-black rounded-full flex items-center gap-1.5 shadow-xs">
              <Bell className="w-3.5 h-3.5 text-[#15803D]" />
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
                className={`w-3.5 h-3.5 rounded-full transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-[#15803D] focus-visible:outline-none ${
                  activeSlide === idx
                    ? 'bg-[#F97316] scale-125 shadow-xs'
                    : 'bg-stone-300 hover:bg-stone-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Card Content View */}
        <div className="bg-white rounded-3xl border border-stone-200 p-5 sm:p-7 lg:p-8 shadow-xs hover:shadow-md transition-all flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 overflow-hidden">
          {/* Left Photo Container */}
          <div className="w-full md:w-1/2 relative h-56 sm:h-72 rounded-2xl overflow-hidden shadow-xs border border-stone-200 bg-[#F0FDF4] group shrink-0">
            <img
              src={currentPost.image}
              alt={t(currentPost.title)}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-3 left-3 bg-[#14532D]/90 backdrop-blur-md text-white font-black text-xs px-3 py-1 rounded-lg border border-[#4ADE80]/30 shadow-xs">
              {t("사)한국외식창업교육원 공지")}
            </div>
          </div>

          {/* Right Info Text & Slide Title */}
          <div className="w-full md:w-1/2 space-y-4 md:pl-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#F0FDF4] text-[#15803D] border border-[#DCFCE7] text-xs font-black">
              <Calendar className="w-3.5 h-3.5 text-[#15803D]" />
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
                className="px-6 py-3 bg-gradient-to-r from-[#EA580C] to-[#F97316] hover:from-[#C2410C] hover:to-[#EA580C] text-white text-xs sm:text-sm font-black rounded-xl shadow-md transition-all cursor-pointer inline-flex items-center gap-2 border border-orange-300/40 min-h-[44px] focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:outline-none"
                aria-label={`${t(currentPost.title)} — ${t("게시글 전문 읽기")}`}
              >
                <span>{t("게시글 전문 읽기")}</span>
                <ChevronRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
