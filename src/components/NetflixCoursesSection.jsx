import { useLanguage } from '../i18n/LanguageContext';
import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { actualCourses } from '../data/actualCourses';

export default function NetflixCoursesSection({ onSelectCourse }) {
  const { t } = useLanguage();
  return (
    <section className="py-12 lg:py-16 bg-[#FAF8F5] text-gray-900 border-b border-stone-200/80 font-sans">
      <div className="max-w-[1520px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0B3C26]/10 text-[#0B3C26] border border-[#0B3C26]/20 text-xs font-black mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>{t("한국외식창업교육원 온라인 자격과정")}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 tracking-tight">
              {t("추천 대표 강좌")}
            </h2>
          </div>
          <button
            onClick={onSelectCourse}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-black text-[#0B3C26] hover:text-[#C5A059] transition-colors cursor-pointer self-start sm:self-auto"
          >
            <span>{t("전체 강의 보기")}</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {actualCourses.map((course) => (
            <button
              key={course.id}
              onClick={onSelectCourse}
              className="text-left rounded-3xl overflow-hidden bg-white border border-stone-200/90 shadow-sm hover:shadow-xl hover:border-[#0B3C26] transition-all group cursor-pointer flex flex-col justify-between"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-stone-100">
                <img
                  src={course.image}
                  alt={t(course.title)}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5 sm:p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <p className="text-xs font-black text-[#0B3C26]">
                    {t(course.instructor)} · {t(course.format)}
                  </p>
                  <h3 className="font-black text-lg sm:text-xl text-gray-900 group-hover:text-[#0B3C26] transition-colors leading-snug">
                    {t(course.title)}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed line-clamp-2">
                    {t(course.description)}
                  </p>
                </div>
                <div className="flex items-center justify-between border-t border-stone-100 pt-4 text-xs font-bold text-stone-600">
                  <span className="text-[#0B3C26] font-black">{t(course.duration)}</span>
                  <span className="text-[#C5A059] font-black">{t("수강료 문의")}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
