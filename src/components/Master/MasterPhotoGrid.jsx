import React, { useRef, useState } from 'react';
import { Award, Medal, ArrowUpRight, CheckCircle2, ChevronRight } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import MasterDetailModal from './MasterDetailModal';

export default function MasterPhotoGrid({ profiles }) {
  const { tr, t, language } = useLanguage();
  const originRef = useRef(null);
  const [selectedId, setSelectedId] = useState(null);
  const selected = profiles.find(profile => (profile.id || profile.name) === selectedId);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7">
        {profiles.map(profile => {
          const isMaster = profile.group === 'master';
          const primaryAward = profile.awards?.[0] || profile.intro || '';
          const specialtyTag = profile.title ? profile.title.split('·')[0].trim() : '';

          return (
            <article
              key={profile.id || profile.name}
              onClick={event => {
                originRef.current = event.currentTarget.getBoundingClientRect();
                setSelectedId(profile.id || profile.name);
              }}
              tabIndex={0}
              role="button"
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedId(profile.id || profile.name);
                }
              }}
              aria-label={tr`${profile.name || '명장·명인'} 상세 프로필 보기`}
              className="group relative bg-white rounded-3xl border border-stone-200/90 hover:border-[#C5A059] shadow-xs hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col overflow-hidden cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-[#0B3C26] focus:ring-offset-2"
            >
              {/* Top Accent Line on hover */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C5A059] to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-20" />

              {/* Portrait Container with Studio Gradient Backdrop */}
              <div className="relative w-full aspect-[4/4.8] sm:aspect-[4/5] overflow-hidden bg-gradient-to-b from-[#FAF8F5] via-[#F2EDE4] to-[#E5E0D5]">
                
                {/* Badges on Top of Photo */}
                <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2 z-10 pointer-events-none">
                  {isMaster ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0B3C26] text-[#D4AF37] border border-[#C5A059]/60 shadow-md text-xs font-black tracking-wide backdrop-blur-xs">
                      <Award className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>{tr("대한민국 명장")}</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1E293B]/90 text-amber-300 border border-amber-400/50 shadow-md text-xs font-black tracking-wide backdrop-blur-xs">
                      <Medal className="w-3.5 h-3.5 text-amber-300" />
                      <span>{tr("조리 명인")}</span>
                    </span>
                  )}

                  {specialtyTag && (
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-white/95 text-stone-800 text-[11px] font-bold border border-stone-300 shadow-2xs backdrop-blur-xs max-w-[130px] truncate">
                      {tr(specialtyTag)}
                    </span>
                  )}
                </div>

                {/* Chef Photo (Clean & Crisp, No Multiply Clutter) */}
                {profile.image ? (
                  <img
                    src={profile.image}
                    alt={tr(profile.name)}
                    loading="lazy"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-stone-400 text-sm font-bold">
                    {tr("사진 준비중")}
                  </div>
                )}

                {/* Smooth Vignette Gradient at Bottom of Photo */}
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white via-white/50 to-transparent pointer-events-none" />
              </div>

              {/* Card Body Info */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4 -mt-7 relative z-10 bg-white rounded-t-3xl border-t border-stone-100">
                <div className="space-y-3">
                  
                  {/* Headline Quote */}
                  <div className="min-h-[42px] flex items-center">
                    <p className="text-xs sm:text-[13px] font-bold text-stone-600 line-clamp-2 leading-relaxed italic border-l-2 border-[#C5A059] pl-2.5">
                      "{tr(profile.headline || `${profile.name} 명인의 정성과 비법`)}"
                    </p>
                  </div>

                  {/* Name and Official Title */}
                  <div className="pt-1.5 border-t border-stone-100">
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="text-xl sm:text-2xl font-black text-gray-900 font-serif tracking-tight">
                        {tr(profile.name)}
                      </h3>
                      <span className={`text-xs font-black ${isMaster ? 'text-emerald-800' : 'text-amber-800'}`}>
                        {tr(isMaster ? '대한민국 명장' : '조리 명인')}
                      </span>
                    </div>

                    {profile.title && (
                      <p className="text-xs font-semibold text-stone-500 mt-1 truncate">
                        {tr(profile.title)}
                      </p>
                    )}
                  </div>

                  {/* Career / Award Highlight Snippet */}
                  {primaryAward && (
                    <div className="pt-0.5">
                      <p className="text-xs text-stone-600 font-medium line-clamp-1 flex items-center gap-1.5 bg-stone-50 px-2.5 py-1.5 rounded-lg border border-stone-100">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0B3C26] shrink-0" />
                        <span className="truncate">{tr(primaryAward)}</span>
                      </p>
                    </div>
                  )}
                </div>

                {/* Card Action Footer */}
                <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#0B3C26] group-hover:text-[#C5A059] transition-colors flex items-center gap-1">
                    <span>{tr("상세 프로필 보기")}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>

                  {/* Media Icons Preview Indicators */}
                  <div className="flex items-center gap-1.5">
                    {profile.youtubeUrl && (
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500" title="YouTube" />
                    )}
                    {profile.blogUrl && (
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" title="Blog" />
                    )}
                    {profile.instagramUrl && (
                      <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" title="Instagram" />
                    )}
                  </div>
                </div>

              </div>
            </article>
          );
        })}
      </div>

      <MasterDetailModal
        originRect={originRef.current}
        isOpen={!!selected}
        master={selected}
        onClose={() => setSelectedId(null)}
      />
    </>
  );
}
