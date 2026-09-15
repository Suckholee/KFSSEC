import { useLanguage } from '../i18n/LanguageContext';
import React from 'react';
import { ArrowRight, Layers } from 'lucide-react';
import { qualifications } from '../data/qualifications';

const packages = [
  { title: '외식창업 마스터 풀 패키지', subtitle: '창업 준비의 모든 것, 한 번에', tags: ['창업기획', '사업계획', '상권분석', '인허가'], courses: ['advisor', 'practice'] },
  { title: '메뉴개발·원가관리 풀 패키지', subtitle: '메뉴와 한국음식 역량을 함께', tags: ['메뉴기획', '레시피 표준화', '원가관리', '가격전략'], courses: ['kfood', 'practice'] },
  { title: '매장운영·서비스 풀 패키지', subtitle: '오래 사랑받는 매장 운영의 기본', tags: ['인력관리', '고객응대', '위생관리', '매출관리'], courses: ['practice', 'advisor'] },
  { title: '외식마케팅·프랜차이즈 풀 패키지', subtitle: '매출 성장과 확장을 위한 준비', tags: ['브랜딩', '온라인 마케팅', '배달 플랫폼', '가맹사업'], courses: ['advisor', 'practice'] },
];

export default function FullPackageCoursesSection({ onSelectPackage }) {
  const { t } = useLanguage();
  return <section className="py-12 lg:py-16 bg-[#0A1410] text-white border-b border-emerald-950"><div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
    <p className="text-[#D4AF37] font-bold text-sm">ALL-IN-ONE PACKAGES</p>
    <div className="flex flex-wrap justify-between items-end gap-4 mt-2 mb-8"><div><h2 className="text-2xl sm:text-3xl font-black">{t("외식창업 풀 패키지 상담")}</h2><p className="mt-3 text-sm text-emerald-100/70">{t("창업 목표에 맞춰 실제 자격과정과 함께 상담하세요. 패키지 구성·일정·비용은 상담 시 안내합니다.")}</p></div><button onClick={onSelectPackage} className="rounded-xl border border-[#C5A059] px-5 py-3 font-bold text-sm">{t("패키지 상담 신청")}</button></div>
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">{packages.map((pkg,index) => <article key={t(pkg.title)} className="rounded-3xl border border-emerald-500/30 bg-[#111C16] overflow-hidden flex flex-col">
      <div className="p-6 bg-gradient-to-br from-[#174f38] to-[#111C16] min-h-56"><div className="flex justify-between text-[#D4AF37]"><Layers size={28}/><span className="font-bold">0{index+1}</span></div><h3 className="text-2xl font-black mt-7 leading-snug">{t(pkg.title)}</h3><p className="text-sm text-emerald-100/70 mt-3">{t(pkg.subtitle)}</p></div>
      <div className="p-5 flex-1"><p className="text-xs text-gray-400 mb-3">{t("상담 주제")}</p><div className="flex flex-wrap gap-2">{pkg.tags.map(tag=><span key={t(tag)} className="rounded-full px-2.5 py-1 bg-emerald-500/10 text-xs text-emerald-200">{t(tag)}</span>)}</div><p className="mt-6 mb-2 text-xs text-gray-400">{t("관련 자격과정")}</p>{pkg.courses.map(id=><p key={id} className="text-sm leading-7">{t(qualifications.find(q=>q.id===id).name)}{' '}{t("2급")}</p>)}</div>
      <button onClick={onSelectPackage} className="p-5 border-t border-emerald-900 flex justify-between items-center text-emerald-300 text-sm font-bold" aria-label={`${t(pkg.title)} — ${t("패키지 상담 신청")}`}>{t("수강 및 1:1 상담 신청")}{' '}<ArrowRight size={18}/></button>
    </article>)}</div>
  </div></section>;
}
