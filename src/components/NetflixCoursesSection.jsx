import { useLanguage } from '../i18n/LanguageContext';
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { actualCourses } from '../data/actualCourses';

export default function NetflixCoursesSection({ onSelectCourse }) {
  const { t } = useLanguage();
  return <section className="py-12 lg:py-16 bg-[#0A1410] text-white border-b border-emerald-950">
    <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
      <p className="text-emerald-300 text-sm font-bold">{t("한국외식창업교육원 온라인 자격과정")}</p>
      <div className="flex flex-wrap items-end justify-between gap-4 mt-2 mb-8">
        <h2 className="text-2xl sm:text-3xl font-black">{t("추천 강의")}</h2>
        <button onClick={onSelectCourse} className="flex items-center gap-2 text-emerald-300 font-bold">{t("전체 강의 보기")}{' '}<ArrowRight size={18}/></button>
      </div>
      <div className="grid md:grid-cols-3 gap-6">{actualCourses.map(course => <button key={course.id} onClick={onSelectCourse} className="text-left rounded-3xl overflow-hidden bg-[#111C16] border border-emerald-500/30 hover:border-emerald-300 transition-colors">
        <img src={course.image} alt={t(course.title)} className="block w-full h-auto"/>
        <div className="p-5 space-y-3"><p className="text-sm text-emerald-300">{t(course.instructor)} · {t(course.format)}</p><h3 className="font-black text-xl">{t(course.title)}</h3><p className="text-sm text-gray-300 leading-relaxed">{t(course.description)}</p><div className="flex justify-between border-t border-emerald-900 pt-4 text-sm font-bold"><span>{t(course.duration)}</span><span>{t("수강료 문의")}</span></div></div>
      </button>)}</div>
    </div>
  </section>;
}
