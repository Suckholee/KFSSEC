import { useLanguage } from '../../i18n/LanguageContext';
import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { X, Award, CheckCircle2, ShieldCheck, ChevronRight, BookOpen, Star, Calendar } from 'lucide-react';

export default function MasterDetailModal({ isOpen, master, onClose, originRect }) {
  const { tr, language } = useLanguage();
  const dialogRef = useRef(null);
  const overlayRef = useRef(null);
  const closingRef = useRef(false);
  const closeRef = useRef(onClose);
  const requestClose = () => {
    if (closingRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !dialogRef.current?.animate) { onClose(); return; }
    closingRef.current = true;
    const animation = dialogRef.current.animate([
      { opacity: 1, transform: 'translateY(0) scale(1)' },
      { opacity: 0, transform: 'translateY(12px) scale(.98)' },
    ], { duration: 180, easing: 'ease-in', fill: 'forwards' });
    overlayRef.current?.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 180, fill: 'forwards' });
    animation.onfinish = onClose;
  };
  closeRef.current = requestClose;
  useLayoutEffect(() => {
    closingRef.current = false;
    if (!isOpen || !dialogRef.current?.animate || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = dialogRef.current.getBoundingClientRect();
    const x = originRect ? originRect.left + originRect.width / 2 - rect.left - rect.width / 2 : 0;
    const y = originRect ? originRect.top + originRect.height / 2 - rect.top - rect.height / 2 : 20;
    const scale = originRect ? Math.max(.65, Math.min(.92, originRect.width / rect.width)) : .96;
    const animation = dialogRef.current.animate([
      { opacity: 0, transform: `translate(${x}px, ${y}px) scale(${scale})` },
      { opacity: 1, transform: 'translate(0, 0) scale(1)' },
    ], { duration: 440, easing: 'cubic-bezier(.22,1,.36,1)' });
    return () => animation.cancel();
  }, [isOpen]);
  useEffect(() => {
    if (!isOpen) return;
    const previous = document.activeElement;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialogRef.current?.focus();
    const handleKey = event => {
      if (event.key === 'Escape') closeRef.current();
      if (event.key === 'Tab') {
        const buttons = dialogRef.current?.querySelectorAll('button');
        const first = buttons?.[0];
        const last = buttons?.[buttons.length - 1];
        if (event.shiftKey && (document.activeElement === first || document.activeElement === dialogRef.current)) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener('keydown', handleKey);
      previous?.focus();
    };
  }, [isOpen]);
  if (!isOpen || !master) return null;

  return (
    <div
      onClick={requestClose}
      ref={overlayRef}
      className="master-profile-backdrop fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md cursor-pointer"
    >
      <div
        ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="master-detail-title" tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className="master-profile-dialog bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl transition-all border-2 border-[#0B3C26] max-h-[92vh] flex flex-col cursor-default"
      >
        {/* Header */}
        <div className="bg-[#262a28] text-white p-6 sm:p-7 relative shrink-0 border-b-2 border-[#C5A059]">
          <button
            onClick={requestClose}
            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-black/30 hover:bg-black/60 text-white flex items-center justify-center transition-colors cursor-pointer"
            title={tr("닫기 (ESC)")}
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-[#C5A059] shadow-md bg-white shrink-0">
              <img
                src={master.image}
                alt={tr(master.name)}
                className="w-full h-full object-cover object-center"
              />
            </div>

            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#C5A059]/20 border border-[#C5A059]/40 text-[#D4AF37] text-xs font-black">
                <Award className="w-3.5 h-3.5" />
                <span>{tr(master.badge || (master.group === 'expert' ? '명인' : '명장'))}</span>
              </div>

              <h2 id="master-detail-title" className="text-2xl sm:text-3xl font-black tracking-tight text-white font-serif">
                {tr(master.name)}
              </h2>

              <p className="text-xs sm:text-sm text-emerald-100/90 font-bold">
                {tr(master.title)}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Main Body */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto flex-1 text-xs sm:text-sm font-bold text-gray-800 bg-[#FDFBF7]">
          
          {/* Intro Overview Box */}
          <div className="bg-white p-5 rounded-2xl border border-[#E5E0D8] shadow-xs space-y-2">
            <h3 className="text-sm font-black text-[#0B3C26] flex items-center gap-2">
              <Star className="w-4 h-4 text-[#C5A059]" />
              <span>{tr("소개 및 전문 분야")}</span>
            </h3>
            <p className="text-xs sm:text-sm text-gray-700 font-medium leading-relaxed whitespace-pre-wrap">
              {tr(master.intro || '소개가 아직 등록되지 않았습니다.')}
            </p>
          </div>

          {/* Awards & Career Timeline List */}
          <div className="space-y-3">
            <h3 className="text-base font-black text-gray-900 flex items-center gap-2 border-b-2 border-[#0B3C26] pb-2">
              <Award className="w-4 h-4 text-[#0B3C26]" />
              <span>{tr("주요 이력, 활동 및 수상 경력")}</span>
            </h3>

            <div className="bg-white p-5 rounded-2xl border border-gray-200 space-y-2.5 shadow-xs">
              {!master.awards?.length && <p className="font-normal text-gray-500">{tr("등록된 경력이 없습니다.")}</p>}
              {master.awards && master.awards.map((award, idx) => (
                <div key={idx} className="flex items-start gap-3 py-1 border-b border-stone-100 last:border-0">
                  <CheckCircle2 className="w-4 h-4 text-[#0B3C26] shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-gray-800 font-bold leading-relaxed">{tr(award)}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-gray-100 p-4 px-6 border-t border-gray-200 flex items-center justify-between text-xs text-gray-600 font-bold shrink-0">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#0B3C26]" />
            <span>{tr("사단법인 한국외식창업교육원 검증 명인 사업단")}</span>
          </span>
          <button
            onClick={requestClose}
            className="px-5 py-2 bg-[#0B3C26] text-white rounded-xl font-bold hover:bg-[#072819] transition-colors cursor-pointer"
          >{tr(" 닫기 ")}</button>
        </div>

      </div>
    </div>
  );
}
