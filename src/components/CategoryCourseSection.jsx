import { useLanguage } from '../i18n/LanguageContext';
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { actualCourses } from '../data/actualCourses';

export default function CategoryCourseSection({ onSelectCourse }) {
  const { t } = useLanguage();
  return <section className="py-12 lg:py-16 bg-[#f8f6f0]"><div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12"><h2 className="text-2xl sm:text-3xl font-black mb-8">{t("분야별 강의")}</h2>
    <div className="space-y-6">{['외식창업', '한국음식'].map(category=><div key={t(category)} className="grid lg:grid-cols-4 gap-5"><div className="bg-[#0B3C26] text-white rounded-3xl p-7"><h3 className="text-2xl font-black">{t(category)}</h3><p className="text-sm text-emerald-100 mt-4 leading-relaxed">{t(category==='외식창업'?'창업 준비와 현장 실무를 위한 전문 역량':'한국 음식과 식문화를 이해하는 K-FOOD 역량')}</p></div><div className="lg:col-span-3 grid sm:grid-cols-2 gap-5">{actualCourses.filter(c=>c.categoryName===category).map(c=><button key={c.id} onClick={onSelectCourse} className="text-left bg-white rounded-3xl p-6 border border-stone-200 hover:border-emerald-600"><p className="text-sm text-emerald-700 font-bold">{t(c.instructor)}</p><h4 className="text-xl font-black mt-3">{t(c.title)}</h4><p className="text-sm text-gray-600 leading-relaxed mt-4">{t(c.description)}</p><p className="text-sm text-gray-500 mt-5">{t("온라인 · 4주 이내 · 수강료 문의")}</p><span className="flex items-center gap-2 mt-5 text-emerald-800 font-bold text-sm">{t("과정 자세히 보기")}{' '}<ArrowRight size={16}/></span></button>)}</div></div>)}</div>
  </div></section>;
}
