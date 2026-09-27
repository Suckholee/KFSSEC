import { useLanguage } from '../i18n/LanguageContext';
import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import useCourses from '../hooks/useCourses';

export default function NetflixCoursesSection({ onSelectCourse }) {
  const { t } = useLanguage();
  const actualCourses = useCourses();
  return (
    <section className="py-12 lg:py-16 bg-[#F8FAF9] text-gray-900 border-b border-[#D0E7DA] font-sans">
      <div className="max-w-[1520px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF6EE] text-[#1E5D3B] border border-[#D0E7DA] text-xs font-black mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#2B7752]" />
              <span>{t("한국외식창업교육원 온라인 자격과정")}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 tracking-tight">
              {t("추천 대표 강좌")}
            </h2>
          </div>
          <button
            onClick={onSelectCourse}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-black text-[#2B7752] hover:text-[#1E5D3B] transition-colors cursor-pointer self-start sm:self-auto"
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
              className="text-left rounded-3xl overflow-hidden bg-white border border-[#D0E7DA] shadow-xs hover:shadow-xl hover:border-[#32875D] transition-all group cursor-pointer flex flex-col justify-between"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-[#F2FAF5]">
                <img
                  src={course.image}
                  alt={t(course.title)}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5 sm:p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <p className="text-xs font-black text-[#256D48]">
                    {t(course.instructor)} · {t(course.format)}
                  </p>
                  <h3 className="font-black text-lg sm:text-xl text-gray-900 group-hover:text-[#256D48] transition-colors leading-snug">
                    {t(course.title)}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed line-clamp-2">
                    {t(course.description)}
                  </p>
                </div>
                <div className="flex items-center justify-between border-t border-[#EAF2EC] pt-4 text-xs font-bold text-stone-600">
                  <span className="text-[#2B7752] font-black">{t(course.duration)}</span>
                  <span className="text-[#256D48] font-black bg-[#EAF6EE] px-2 py-0.5 rounded border border-[#D0E7DA]">{t("수강료 문의")}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
