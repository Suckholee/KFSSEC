import React from 'react';
import { Calendar, ChevronRight } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { useAdminEdit } from '../../context/AdminEditContext';
import EditableText from '../Admin/InlineEditor/EditableText';

export default function AwardCeremonyBannerSection({ onGoToGallery, onGoToInquiry, bannerData = {} }) {
  const { tr } = useLanguage();
  const { siteDraft } = useAdminEdit();
  const currentBanner = siteDraft?.banner || bannerData || {};

  if (currentBanner.active === false) return null;

  return (
    <section className="w-full bg-[#F6F4EE] text-[#183D30] border-y border-[#DDDCCE]" aria-label={tr("교육원 안내")}>
      <div className="max-w-[1520px] mx-auto px-5 sm:px-8 lg:px-12 py-9 sm:py-12 lg:py-14">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_280px] gap-8 lg:gap-12 items-center">
          <div className="min-w-0">
            <div className="flex items-start gap-3 text-[11px] sm:text-xs font-medium leading-relaxed text-[#6B715F] mb-4">
              <span className="w-5 h-px bg-[#AD9561] shrink-0 mt-2" aria-hidden="true" />
              <EditableText path="banner.badgeText" value={currentBanner.badgeText || "2026 KFSSEC 공식 시상식 개최 안내"} />
            </div>
            <h3 className="text-[24px] sm:text-[30px] lg:text-[34px] font-semibold tracking-[-0.04em] leading-[1.35] max-w-3xl [text-wrap:balance]">
              <EditableText path="banner.title" value={currentBanner.title || "대한민국 외식산업 명인·명장 추계 시상식 및 선정식"} />
            </h3>
            <p className="mt-4 text-[13px] sm:text-sm text-[#6B7169] font-normal leading-[1.8] max-w-2xl">
              <EditableText path="banner.subtitle" multiline value={currentBanner.subtitle || "한국 전통 식문화의 계승과 K-FOOD 세계화에 기여한 최고 권위의 조리명장 및 명인을 선정하고 공식 인증패를 수여합니다."} />
            </p>
          </div>
          <div className="min-w-0 border-t lg:border-t-0 lg:border-l border-[#DDDCCE] pt-6 lg:pt-0 lg:pl-8">
            <div className="flex items-center gap-2 text-sm text-[#657164] mb-5">
              <Calendar className="w-4 h-4 shrink-0" aria-hidden="true" />
              <EditableText path="banner.dDay" value={currentBanner.dDay || "2026. 10. 19 (월)"} />
            </div>
            <button onClick={onGoToGallery} className="w-full min-h-[48px] px-4 py-3 bg-[#183D30] hover:bg-[#275240] text-white text-[13px] font-medium rounded-md transition-colors flex items-center justify-between gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#183D30]">
              <EditableText path="banner.buttonText" value={currentBanner.buttonText || "시상식 갤러리 보기"} />
              <ChevronRight className="w-4 h-4 shrink-0" aria-hidden="true" />
            </button>
            <button onClick={onGoToInquiry} className="mt-3 min-h-[44px] text-xs text-[#657164] hover:text-[#183D30] underline underline-offset-4 decoration-[#B7BBAF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#183D30]">
              {tr("시상식 문의")}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
