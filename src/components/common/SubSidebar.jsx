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
  const currentActive = activeId || activeTab;

  const handleSelect = (id) => {
    if (onSelectTab) onSelectTab(id);
    if (onTabChange) onTabChange(id);
  };

  return (
    <aside className="w-full md:w-60 lg:w-64 shrink-0 font-sans text-gray-900">
      {/* Mobile Horizontal Pill Scroll Bar (Visible on mobile < md) */}
      <div className="md:hidden w-full bg-white rounded-2xl p-2 border border-stone-200 shadow-sm mb-4">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 px-1">
          {items.map((item) => {
            const isActive = currentActive === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className={`py-2.5 px-4 rounded-xl text-xs font-black transition-all whitespace-nowrap cursor-pointer shrink-0 border ${
                  isActive
                    ? 'bg-[#0B3C26] text-white border-[#C5A059] shadow-sm'
                    : 'bg-stone-50 text-gray-700 hover:bg-stone-100 border-stone-200'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Desktop Vertical Left Sidebar (Visible on desktop >= md) */}
      <div className="hidden md:block bg-[#e8e8e8] rounded-3xl p-5 border border-gray-300 shadow-md space-y-4">
        {/* Top Black Header Badge Pill */}
        <div className="bg-black text-white text-base font-black px-4 py-2.5 rounded-xl text-center shadow-sm tracking-tight">
          {title}
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
                    ? 'bg-white text-black font-black shadow-md border border-gray-300 translate-x-1'
                    : 'text-gray-700 hover:text-black hover:bg-white/60'
                }`}
              >
                <span>{item.label}</span>
                {isActive && <ChevronRight className="w-4 h-4 text-[#0B3C26]" />}
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
