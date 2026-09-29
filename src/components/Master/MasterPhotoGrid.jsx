import React, { useRef, useState } from 'react';
import { Award, Medal, ArrowUpRight, CheckCircle2, ChevronRight, Edit3, Youtube, Instagram, Globe } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import MasterDetailModal from './MasterDetailModal';
import { useAdminEdit } from '../../context/AdminEditContext';

export default function MasterPhotoGrid({ profiles, onEditMaster }) {
  const { tr, t, language } = useLanguage();
  const { isEditMode } = useAdminEdit();
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
              className="group relative bg-white rounded-3xl border border-stone-200/90 hover:border-[#16A34A]/50 shadow-xs hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col overflow-hidden cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-[#15803D] focus:ring-offset-2"
            >
              {/* Top Accent Line on hover */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#15803D] via-[#F97316] to-[#16A34A] opacity-0 group-hover:opacity-100 transition-opacity z-20" />

              {/* Portrait Container with Studio Gradient Backdrop */}
              <div className="relative w-full aspect-[4/4.8] sm:aspect-[4/5] overflow-hidden bg-gradient-to-b from-[#FAF8F5] via-[#F2EDE4] to-[#E5E0D5]">
                
                {/* Badges on Top of Photo */}
                <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2 z-10 pointer-events-none">
                  {isMaster ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-[#14532D] to-[#15803D] text-white border border-[#4ADE80]/30 shadow-md text-xs font-black tracking-wide backdrop-blur-xs">
                      <Award className="w-3.5 h-3.5 text-[#86EFAC]" />
                      <span>{tr("대한민국 명장")}</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-[#EA580C] to-[#F97316] text-white border border-orange-300/40 shadow-md text-xs font-black tracking-wide backdrop-blur-xs">
                      <Medal className="w-3.5 h-3.5 text-amber-100" />
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

                {/* Direct Edit Button on Photo for Admin */}
                {isEditMode && (
                  <div className="absolute bottom-8 right-3 z-30 pointer-events-auto">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        onEditMaster?.(profile.id || profile.name);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-xl border border-amber-300 flex items-center gap-1.5 transition-all cursor-pointer hover:scale-105 active:scale-95"
                      title="이 명장의 사진, 직함, 약력, 대표 요리 수정"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-slate-950" />
                      <span>프로필 수정</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Card Body Info */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4 -mt-7 relative z-10 bg-white rounded-t-3xl border-t border-stone-100">
                <div className="space-y-3">
                  
                  {/* Headline Quote */}
                  <div className="min-h-[42px] flex items-center">
                    <p className="text-xs sm:text-[13px] font-bold text-stone-600 line-clamp-2 leading-relaxed italic border-l-2 border-[#F97316] pl-2.5">
                      "{tr(profile.headline || `${profile.name} 명인의 정성과 비법`)}"
                    </p>
                  </div>

                  {/* Name and Official Title */}
                  <div className="pt-1.5 border-t border-stone-100">
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="text-xl sm:text-2xl font-black text-gray-900 font-serif tracking-tight">
                        {tr(profile.name)}
                      </h3>
                      <span className={`text-xs font-black ${isMaster ? 'text-[#15803D]' : 'text-[#EA580C]'}`}>
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
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#15803D] shrink-0" />
                        <span className="truncate">{tr(primaryAward)}</span>
                      </p>
                    </div>
                  )}
                </div>

                {/* Card Action Footer */}
                <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#15803D] group-hover:text-[#EA580C] transition-colors flex items-center gap-1">
                    <span>{tr("상세 프로필 보기")}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>

                  <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                    {/* Media Icons / Links */}
                    {profile.youtubeUrl && (
                      <a
                        href={profile.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-6 h-6 rounded-full bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center transition shadow-xs hover:scale-110 active:scale-95 cursor-pointer"
                        title="유튜브 채널 바로가기"
                        aria-label="유튜브 채널"
                      >
                        <Youtube className="w-3.5 h-3.5 fill-white" />
                      </a>
                    )}
                    {profile.instagramUrl && (
                      <a
                        href={profile.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-6 h-6 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center transition shadow-xs hover:scale-110 active:scale-95 cursor-pointer"
                        title="인스타그램 바로가기"
                        aria-label="인스타그램"
                      >
                        <Instagram className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {profile.blogUrl && (
                      <a
                        href={profile.blogUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-6 h-6 rounded-full bg-[#03C75A] hover:bg-[#02B150] text-white flex items-center justify-center transition shadow-xs hover:scale-110 active:scale-95 cursor-pointer"
                        title="블로그 / 공식 홈페이지 바로가기"
                        aria-label="블로그 / 웹사이트"
                      >
                        <Globe className="w-3.5 h-3.5" />
                      </a>
                    )}

                    {isEditMode && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          onEditMaster?.(profile.id || profile.name);
                        }}
                        className="ml-1 px-2.5 py-1 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 font-bold text-[11px] flex items-center gap-1 cursor-pointer transition shadow-xs"
                        title="이 명장 프로필 편집"
                      >
                        <Edit3 className="w-3 h-3 text-amber-700" />
                        <span>수정</span>
                      </button>
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
        onEditMaster={onEditMaster}
      />
    </>
  );
}
