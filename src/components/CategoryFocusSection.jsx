import { useLanguage } from '../i18n/LanguageContext';
import React from 'react';
import { specialistQualifications } from '../data/qualifications';

export default function CategoryFocusSection({ onViewMoreClick }) {
  const { t } = useLanguage();
  return <section className="py-12 lg:py-16 bg-[#0A1410] text-white"><div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12"><p className="text-sm text-emerald-300 font-bold">{t("전문 분야를 더 깊이")}</p><h2 className="text-2xl sm:text-3xl font-black mt-2 mb-8">{t("분야별 전문 자격 안내")}</h2><div className="grid md:grid-cols-3 gap-6">{specialistQualifications.map(q=><article key={t(q.name)} className="rounded-3xl p-6 border border-emerald-500/30 bg-[#111C16] flex flex-col"><h3 className="text-xl font-black">{t(q.name)}</h3><p className="text-sm text-gray-300 leading-relaxed mt-4 flex-1">{t(q.description)}</p><button onClick={onViewMoreClick} className="text-left text-emerald-300 font-bold text-sm mt-6">{t("자격 요건 및 검정 안내 →")}</button></article>)}</div></div></section>;
}
