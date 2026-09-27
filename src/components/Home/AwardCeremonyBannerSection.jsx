import React from 'react';
import { Award, Calendar, ChevronRight, Sparkles, Trophy, Users } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { useAdminEdit } from '../../context/AdminEditContext';
import EditableText from '../Admin/InlineEditor/EditableText';

export default function AwardCeremonyBannerSection({ onGoToGallery, onGoToInquiry, bannerData = {} }) {
  const { tr } = useLanguage();
  const { siteDraft } = useAdminEdit();
  const currentBanner = siteDraft?.banner || bannerData || {};

  if (currentBanner.active === false) return null;

  return (
    <section className="w-full bg-gradient-to-r from-[#14532D] via-[#15803D] to-[#16A34A] text-white py-6 sm:py-8 border-y border-[#4ADE80]/30 relative overflow-hidden shadow-2xl">
      {/* Background Decorative Ambient Glows */}
      <div className="absolute -top-12 -right-12 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-[#F97316]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full px-4 sm:px-8 lg:px-12 max-w-[1520px] mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          
          {/* Left: Badge & Titles */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 sm:gap-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#EA580C] to-[#F97316] p-0.5 shadow-xl shrink-0 flex items-center justify-center border border-orange-300">
              <div className="w-full h-full bg-[#14532D] rounded-2xl flex flex-col items-center justify-center p-2 text-center border border-orange-400/40">
                <Trophy className="w-7 h-7 sm:w-8 sm:h-8 text-[#FB923C] animate-pulse" />
                <span className="text-[9px] font-black text-[#FB923C] tracking-tighter mt-0.5">D-DAY</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 border border-orange-400/40 text-orange-200 text-xs font-black">
                <Sparkles className="w-3.5 h-3.5 text-orange-300" />
                <EditableText
                  path="banner.badgeText"
                  value={currentBanner.badgeText || "2026 KFSSEC 공식 시상식 개최 안내"}
                />
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight leading-snug">
                <EditableText
                  path="banner.title"
                  value={currentBanner.title || "대한민국 외식산업 명인·명장 추계 시상식 및 선정식"}
                />
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100/90 font-medium leading-relaxed max-w-2xl">
                <EditableText
                  path="banner.subtitle"
                  multiline
                  value={currentBanner.subtitle || "한국 전통 식문화의 계승과 K-FOOD 세계화에 기여한 최고 권위의 조리명장 및 명인을 선정하고 공식 인증패를 수여합니다."}
                />
              </p>
            </div>
          </div>

          {/* Right: Date Badge & Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
            {/* Date Box */}
            <div className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-black/25 border border-white/20 flex items-center justify-center sm:justify-start gap-3">
              <Calendar className="w-5 h-5 text-orange-300 shrink-0" />
              <div className="text-left">
                <span className="text-[10px] font-bold text-emerald-100 block uppercase tracking-wider">{tr("시상식 일시")}</span>
                <span className="text-sm font-black text-white tracking-wide">
                  <EditableText
                    path="banner.dDay"
                    value={currentBanner.dDay || "2026. 10. 19 (월)"}
                  />
                </span>
              </div>
            </div>

            {/* CTA Button 1: Gallery (Accent Orange) */}
            <button
              onClick={onGoToGallery}
              className="w-full sm:w-auto px-5 py-3.5 bg-gradient-to-r from-[#EA580C] to-[#F97316] hover:from-[#C2410C] hover:to-[#EA580C] text-white font-black text-xs sm:text-sm rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer border border-orange-300 hover:scale-102"
            >
              <Award className="w-4 h-4 text-white" />
              <EditableText
                path="banner.buttonText"
                value={currentBanner.buttonText || "시상식 갤러리 보기"}
              />
              <ChevronRight className="w-4 h-4 text-white" />
            </button>

            {/* CTA Button 2: Inquiry */}
            <button
              onClick={onGoToInquiry}
              className="w-full sm:w-auto px-4 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm rounded-2xl transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-white/20"
            >
              <span>{tr("시상식 문의")}</span>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
