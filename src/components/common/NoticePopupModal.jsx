import React, { useState, useEffect } from 'react';
import { X, ExternalLink, Calendar, CheckSquare, Square } from 'lucide-react';

export default function NoticePopupModal({ popupData, onNavigate }) {
  const [isOpen, setIsOpen] = useState(false);
  const [dontShowToday, setDontShowToday] = useState(false);

  useEffect(() => {
    if (!popupData || popupData.enabled === false) {
      setIsOpen(false);
      return;
    }

    // 1. Check Date Range
    const now = new Date();
    if (popupData.startDate) {
      const start = new Date(popupData.startDate + 'T00:00:00');
      if (now < start) {
        setIsOpen(false);
        return;
      }
    }

    if (popupData.endDate) {
      const end = new Date(popupData.endDate + 'T23:59:59');
      if (now > end) {
        setIsOpen(false);
        return;
      }
    }

    // 2. Check "Do not show today" local storage
    try {
      const dismissedUntil = localStorage.getItem('kfssec_popup_dismissed_until');
      if (dismissedUntil && Number(dismissedUntil) > now.getTime()) {
        setIsOpen(false);
        return;
      }
    } catch (e) {
      console.error('Failed to read popup storage:', e);
    }

    // 3. Mobile screen check
    if (popupData.showOnMobile === false && window.innerWidth < 640) {
      setIsOpen(false);
      return;
    }

    // If all checks pass, show popup
    setIsOpen(true);
  }, [popupData]);

  const handleClose = () => {
    if (dontShowToday) {
      // Calculate end of today (23:59:59.999)
      const endOfToday = new Date();
      endOfToday.setHours(23, 59, 59, 999);
      try {
        localStorage.setItem('kfssec_popup_dismissed_until', endOfToday.getTime().toString());
      } catch (e) {
        console.error('Failed to save popup dismissal:', e);
      }
    }
    setIsOpen(false);
  };

  // Close popup on Escape key press
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, dontShowToday]);

  if (!isOpen || !popupData || popupData.enabled === false) {
    return null;
  }

  const handleDismissTodayImmediately = () => {
    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);
    try {
      localStorage.setItem('kfssec_popup_dismissed_until', endOfToday.getTime().toString());
    } catch (e) {
      console.error('Failed to save popup dismissal:', e);
    }
    setIsOpen(false);
  };

  const handleLinkClick = (e) => {
    if (!popupData.linkUrl) return;

    if (popupData.linkUrl.startsWith('http')) {
      window.open(popupData.linkUrl, popupData.linkTarget || '_blank');
    } else {
      e.preventDefault();
      // Internal route parsing (e.g. /gallery/ceremony -> tab: gallery, subTab: ceremony)
      const cleanPath = popupData.linkUrl.replace(/^\//, '');
      const [tab, subTab] = cleanPath.split('/');
      if (onNavigate && tab) {
        onNavigate(tab, subTab || null);
        setIsOpen(false);
      } else {
        window.location.href = popupData.linkUrl;
      }
    }
  };

  const popupWidth = popupData.width ? `${popupData.width}px` : '440px';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={popupData.title || '공지 팝업 안내'}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          handleClose();
        }
      }}
    >
      <div
        style={{ maxWidth: popupWidth }}
        className="w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-200 flex flex-col max-h-[92vh] animate-scaleUp relative"
      >
        {/* Top Header Bar */}
        <div className="bg-[#1A2332] text-white px-4 py-2.5 flex items-center justify-between text-xs font-bold border-b border-slate-700 shrink-0">
          <div className="flex items-center gap-2 truncate pr-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shrink-0" />
            <span className="truncate">{popupData.title || '사단법인 한국외식창업교육원 공지'}</span>
          </div>
          <button
            onClick={handleClose}
            className="text-slate-300 hover:text-white p-1 rounded-lg hover:bg-slate-700 transition cursor-pointer"
            title="창 닫기"
            aria-label="창 닫기"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Poster Image Body */}
        <div className="overflow-y-auto flex-1 bg-stone-100 flex items-center justify-center">
          {popupData.linkUrl ? (
            <a
              href={popupData.linkUrl}
              onClick={handleLinkClick}
              className="block w-full cursor-pointer group relative"
              title="클릭하여 상세 안내 바로가기"
            >
              <img
                src={popupData.imageUrl || '/images/popup_award_ceremony_2026.jpg'}
                alt={popupData.title || '공지 팝업'}
                className="w-full h-auto object-contain block transition-transform duration-300 group-hover:opacity-95"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center pointer-events-none">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/75 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                  <span>자세히 보기</span>
                  <ExternalLink className="w-3.5 h-3.5 text-amber-300" />
                </span>
              </div>
            </a>
          ) : (
            <img
              src={popupData.imageUrl || '/images/popup_award_ceremony_2026.jpg'}
              alt={popupData.title || '공지 팝업'}
              className="w-full h-auto object-contain block"
            />
          )}
        </div>

        {/* Optional Action CTA Link Bar (if link is provided) */}
        {popupData.linkUrl && (
          <div className="bg-emerald-50 border-t border-emerald-200 px-4 py-2 flex items-center justify-between text-xs font-bold text-emerald-900 shrink-0">
            <span className="truncate">{popupData.linkText || '시상식 및 행사 상세 안내 바로가기'}</span>
            <button
              onClick={handleLinkClick}
              className="px-3 py-1 bg-[#1E5D3B] hover:bg-[#17482E] text-white text-[11px] font-black rounded-lg transition flex items-center gap-1 cursor-pointer shrink-0 ml-2"
            >
              <span>이동하기</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        )}

        {/* Bottom Control Bar: "오늘 하루 다시 보지 않기" Checkbox + Close Button */}
        <div className="bg-[#1A2332] text-white px-4 py-3 flex items-center justify-between text-xs font-bold border-t border-slate-700 shrink-0">
          {/* Left Checkbox */}
          <label className="flex items-center gap-2 cursor-pointer select-none text-slate-300 hover:text-white transition">
            <input
              type="checkbox"
              checked={dontShowToday}
              onChange={(e) => setDontShowToday(e.target.checked)}
              className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-gray-400 cursor-pointer accent-emerald-600"
            />
            <span className="text-[11px] sm:text-xs">오늘 하루 다시 보지 않기</span>
          </label>

          {/* Right Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleDismissTodayImmediately}
              className="text-[11px] text-amber-300 hover:text-amber-200 hover:underline cursor-pointer hidden sm:inline"
            >
              [오늘 그만보기]
            </button>
            <button
              onClick={handleClose}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-bold transition flex items-center gap-1 border border-slate-600 cursor-pointer"
            >
              <span>닫기</span>
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
