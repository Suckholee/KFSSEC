import { useLanguage } from '../i18n/LanguageContext';
import React from 'react';
import { ArrowRight, BookOpen } from 'lucide-react';
import useCourses from '../hooks/useCourses';

export default function CategoryCourseSection({ onSelectCourse }) {
  const { t } = useLanguage();
  const actualCourses = useCourses();

  return (
    <section className="py-12 lg:py-16 bg-[#F8FAF9] text-gray-900 border-b border-[#D0E7DA] font-sans">
      <div className="max-w-[1520px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF6EE] text-[#1E5D3B] border border-[#D0E7DA] text-xs font-black mb-2">
            <BookOpen className="w-3.5 h-3.5 text-[#2B7752]" />
            <span>KFSSEC DISCIPLINE TRACKS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 tracking-tight">
            {t("분야별 집중 교육 과정")}
          </h2>
        </div>

        <div className="space-y-8">
          {['외식창업', '한국음식'].map((category) => (
            <div key={category} className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Category Highlight Card */}
              <div className="bg-gradient-to-br from-[#1E5B3C] via-[#2A7550] to-[#388C61] text-white rounded-3xl p-7 sm:p-8 flex flex-col justify-between border border-[#85CFAB]/40 shadow-md relative overflow-hidden">
                <div className="relative z-10 space-y-3">
                  <span className="text-[11px] font-mono text-[#A7F3D0] font-bold tracking-wider uppercase block">
                    SPECIALIZED TRACK
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white">{t(category)}</h3>
                  <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-medium">
                    {t(
                      category === '외식창업'
                        ? '창업 준비와 현장 실무를 위한 상권 분석 및 메뉴 기획 전문 역량'
                        : '한국 전통 음식과 발효 식문화를 체계적으로 계승하는 K-FOOD 전문 역량'
                    )}
                  </p>
                </div>
                <div className="pt-6 relative z-10">
                  <span className="text-xs text-[#A7F3D0] font-bold">1:1 도제식 명장 지도 연계</span>
                </div>
                {/* Decorative background glow */}
                <div className="absolute -bottom-8 -right-8 w-36 h-36 bg-white/10 rounded-full blur-2xl pointer-events-none" />
              </div>

              {/* Course Cards under this Category */}
              <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                {actualCourses
                  .filter((c) => c.categoryName === category)
                  .map((c) => (
                    <button
                      key={c.id}
                      onClick={onSelectCourse}
                      className="text-left bg-white rounded-3xl p-6 sm:p-7 border border-[#D0E7DA] hover:border-[#32875D] hover:shadow-lg transition-all flex flex-col justify-between group cursor-pointer shadow-xs"
                    >
                      <div>
                        <p className="text-xs font-black text-[#256D48] tracking-tight">{t(c.instructor)}</p>
                        <h4 className="text-lg sm:text-xl font-black text-gray-900 mt-2 group-hover:text-[#256D48] transition-colors leading-snug">
                          {t(c.title)}
                        </h4>
                        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mt-3 line-clamp-2">
                          {t(c.description)}
                        </p>
                      </div>

                      <div className="mt-6 pt-4 border-t border-[#EAF2EC] flex items-center justify-between">
                        <span className="text-xs text-stone-500 font-bold">{t("온라인 · 4주 완성")}</span>
                        <span className="inline-flex items-center gap-1 text-xs font-black text-[#2B7752] group-hover:text-[#1E5D3B] transition-colors">
                          <span>{t("과정 자세히 보기")}</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </span>
                      </div>
                    </button>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
