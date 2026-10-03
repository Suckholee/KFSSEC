import { useLanguage } from '../../i18n/LanguageContext';
import React from 'react';
import { ChevronRight } from 'lucide-react';

export default function SubSidebar({
  title,
  items = [],
  activeId,
  activeTab,
  onSelectTab,
  onTabChange,
}) {
  const { tr, language } = useLanguage();
  const currentActive = activeId || activeTab;

  const handleSelect = (id) => {
    if (onSelectTab) onSelectTab(id);
    if (onTabChange) onTabChange(id);

    // Smoothly scroll up to the content top for natural UX
    requestAnimationFrame(() => {
      const anchor = document.getElementById('subsidebar-content-anchor');
      if (anchor) {
        const headerOffset = 110;
        const elementPosition = anchor.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: Math.max(0, offsetPosition),
          behavior: 'smooth',
        });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  };

  return (
    <aside className="w-full md:w-60 lg:w-64 shrink-0 font-sans text-gray-900 md:sticky md:top-28 z-20">
      {/* Mobile Horizontal Pill Scroll Bar (Visible on mobile < md) */}
      <div className="md:hidden w-full bg-white rounded-2xl p-1.5 border border-stone-200 shadow-sm mb-4">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 px-0.5 overscroll-x-contain scroll-smooth touch-pan-x">
          {items.map((item) => {
            const isActive = currentActive === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className={`py-2 px-3.5 rounded-xl text-xs font-black transition-all whitespace-nowrap cursor-pointer shrink-0 border tracking-tight break-keep ${
                  isActive
                    ? 'bg-[#2B7752] text-white border-[#2B7752] shadow-sm'
                    : 'bg-stone-50 text-gray-700 hover:bg-[#F2FAF5] border-stone-200'
                }`}
              >
                {tr(item.label)}
              </button>
            );
          })}
        </div>
      </div>

      {/* Desktop Vertical Left Sidebar (Visible on desktop >= md) */}
      <div className="hidden md:block bg-[#F8FAF9] rounded-3xl p-5 border border-[#D0E7DA] shadow-xs space-y-4">
        {/* Top Header Badge Pill */}
        <div className="bg-[#2B7752] text-white text-base font-black px-4 py-2.5 rounded-xl text-center shadow-xs tracking-tight">
          {tr(title)}
        </div>

        {/* Vertical Sub-Link Navigation List */}
        <nav className="space-y-1.5 pt-1">
          {items.map((item) => {
            const isActive = currentActive === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className={`w-full text-left py-2.5 px-4 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center justify-between cursor-pointer ${
                  isActive
                    ? 'bg-white text-[#1E5D3B] font-black shadow-xs border border-[#D0E7DA] translate-x-1'
                    : 'text-stone-700 hover:text-[#1E5D3B] hover:bg-white/80'
                }`}
              >
                <span>{tr(item.label)}</span>
                {isActive && <ChevronRight className="w-4 h-4 text-[#2B7752]" />}
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
