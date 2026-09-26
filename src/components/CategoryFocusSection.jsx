import { useLanguage } from '../i18n/LanguageContext';
import React from 'react';
import { Award, ArrowRight } from 'lucide-react';
import { specialistQualifications } from '../data/qualifications';

export default function CategoryFocusSection({ onViewMoreClick }) {
  const { t } = useLanguage();

  return (
    <section className="py-12 lg:py-16 bg-[#FAF8F5] text-gray-900 border-b border-stone-200/80 font-sans">
      <div className="max-w-[1520px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0B3C26]/10 text-[#0B3C26] border border-[#0B3C26]/20 text-xs font-black mb-2">
              <Award className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>{t("전문 분야를 더 깊이")}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 tracking-tight">
              {t("분야별 전문 자격 안내")}
            </h2>
          </div>
          <button
            onClick={onViewMoreClick}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-black text-[#0B3C26] hover:text-[#C5A059] transition-colors cursor-pointer self-start sm:self-auto"
          >
            <span>{t("전체 자격과정 안내 보기")}</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {specialistQualifications.map((q) => (
            <article
              key={q.name}
              className="rounded-3xl p-6 sm:p-7 border border-stone-200/90 bg-white hover:border-[#0B3C26] hover:shadow-xl transition-all flex flex-col justify-between group shadow-sm"
            >
              <div>
                <div className="w-10 h-10 rounded-2xl bg-[#0B3C26]/10 border border-[#0B3C26]/20 flex items-center justify-center text-[#0B3C26] mb-4 group-hover:bg-[#0B3C26] group-hover:text-[#D4AF37] transition-colors">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="text-lg sm:text-xl font-black text-gray-900 group-hover:text-[#0B3C26] transition-colors leading-snug">
                  {t(q.name)}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mt-3">
                  {t(q.description)}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-stone-100">
                <button
                  onClick={onViewMoreClick}
                  className="text-left text-[#0B3C26] group-hover:text-[#C5A059] font-black text-xs sm:text-sm inline-flex items-center gap-1.5 transition-colors cursor-pointer"
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
