import React from 'react';
import { ChevronRight } from 'lucide-react';

export default function SubSidebar({ title, items, activeId, onSelectTab }) {
  return (
    <aside className="w-56 sm:w-60 lg:w-64 bg-[#e8e8e8] rounded-3xl p-5 border border-gray-300 shadow-md shrink-0 space-y-4 font-sans text-gray-900">
      
      {/* Top Black Header Badge Pill (Matching Target Screenshot) */}
      <div className="bg-black text-white text-base font-black px-4 py-2.5 rounded-xl text-center shadow-sm tracking-tight">
        {title}
      </div>

      {/* Vertical Sub-Link Navigation List */}
      <nav className="space-y-1.5 pt-1">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`w-full text-left py-2.5 px-4 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center justify-between cursor-pointer ${
                isActive
                  ? 'bg-white text-black font-black shadow-md border border-gray-300 translate-x-1'
                  : 'text-gray-700 hover:text-black hover:bg-white/60'
              }`}
            >
              <span>{item.label}</span>
              {isActive && <ChevronRight className="w-4 h-4 text-rose-600" />}
            </button>
          );
        })}
      </nav>

    </aside>
  );
}
