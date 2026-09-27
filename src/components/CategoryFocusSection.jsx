import { useLanguage } from '../i18n/LanguageContext';
import React from 'react';
import { Award, ArrowRight } from 'lucide-react';
import { specialistQualifications } from '../data/qualifications';

export default function CategoryFocusSection({ onViewMoreClick }) {
  const { t } = useLanguage();

  return (
    <section className="py-12 lg:py-16 bg-[#FAF8F5] text-gray-900 border-b border-[#E7E2D8] font-sans">
      <div className="max-w-[1520px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F0FDF4] text-[#15803D] border border-[#DCFCE7] text-xs font-black mb-2 shadow-xs">
              <Award className="w-3.5 h-3.5 text-[#F97316]" />
              <span>{t("전문 분야를 더 깊이")}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 tracking-tight">
              {t("분야별 전문 자격 안내")}
            </h2>
          </div>
          <button
            onClick={onViewMoreClick}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-black text-[#15803D] hover:text-[#EA580C] transition-colors cursor-pointer self-start sm:self-auto"
          >
            <span>{t("전체 자격과정 안내 보기")}</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {specialistQualifications.map((q) => (
            <article
              key={q.name}
              className="rounded-3xl p-6 sm:p-7 border border-stone-200 bg-white hover:border-[#16A34A]/50 hover:shadow-xl transition-all flex flex-col justify-between group shadow-xs"
            >
              <div>
                <div className="w-10 h-10 rounded-2xl bg-[#F0FDF4] border border-[#DCFCE7] flex items-center justify-center text-[#15803D] mb-4 group-hover:bg-gradient-to-r group-hover:from-[#14532D] group-hover:to-[#15803D] group-hover:text-white transition-all shadow-xs">
                  <Award className="w-5 h-5 text-[#F97316] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg sm:text-xl font-black text-gray-900 group-hover:text-[#15803D] transition-colors leading-snug">
                  {t(q.name)}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mt-3">
                  {t(q.description)}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-stone-100">
                <button
                  onClick={onViewMoreClick}
                  className="text-left text-[#15803D] group-hover:text-[#EA580C] font-black text-xs sm:text-sm inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>{t("자격 요건 및 검정 안내")}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
