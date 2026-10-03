import React, { useState } from 'react';
import { Camera, Calendar, MapPin, Maximize2, Edit3, Trash2 } from 'lucide-react';

export default function NetflixCard({
  item,
  isEditMode = false,
  onSelect,
  onEdit,
  onDelete,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const hasMultiplePhotos = item.images && item.images.length > 1;

  return (
    <div
      onClick={() => onSelect?.(item)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative aspect-video w-full rounded-xl overflow-hidden bg-stone-900 cursor-pointer transition-all duration-300 ease-out transform hover:scale-105 sm:hover:scale-108 hover:z-30 shadow-sm hover:shadow-2xl hover:shadow-stone-950/30 border border-stone-200 hover:border-[#15803D]"
    >
      {/* 16:9 Full Bleed Cover Image */}
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
      />

      {/* Signature KFSSEC Brand Emblem on Top-Left */}
      <div className="absolute top-2 left-2 z-10 select-none pointer-events-none drop-shadow-md">
        <span className="bg-[#15803D]/90 backdrop-blur-xs text-[#A7F3D0] font-black text-[10px] sm:text-xs px-1.5 py-0.5 rounded border border-[#85CFAB]/40 tracking-tight leading-none flex items-center gap-0.5">
          <span>K</span>
        </span>
      </div>

      {/* Multi-photo badge on Top-Right */}
      {hasMultiplePhotos && (
        <div className="absolute top-2 right-2 bg-black/75 backdrop-blur-xs text-white text-[10px] font-black px-2 py-0.5 rounded-md flex items-center gap-1 z-10 pointer-events-none border border-white/20">
          <Camera className="w-3 h-3 text-amber-300" />
          <span>+{item.images.length}</span>
        </div>
      )}

      {/* Bottom Gradient Overlay for Typography Legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent pointer-events-none" />

      {/* Card Content Overlaid at Bottom */}
      <div className="absolute inset-x-0 bottom-0 p-2.5 sm:p-3 flex flex-col justify-end z-10">
        {/* Title styled with text shadow for crisp legibility */}
        <h3 className="font-black text-xs sm:text-sm text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] line-clamp-1 leading-snug tracking-tight group-hover:text-[#86EFAC] transition-colors">
          {item.title}
        </h3>

        {/* Sub-pills: Brand Badge & Location/Date */}
        <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
          {/* Brand Accent Pill */}
          <span className={`font-black text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded-sm tracking-tight shadow-xs uppercase ${
            item.isPinned
              ? 'bg-amber-400 text-stone-950 font-black'
              : 'bg-[#15803D] text-white font-bold'
          }`}>
            {item.isPinned ? '★ TOP' : '최신 현장'}
          </span>

          {item.date && (
            <span className="text-[10px] sm:text-[11px] text-stone-200 font-bold drop-shadow-xs">
              {item.date}
            </span>
          )}

          {item.location && (
            <span className="hidden sm:inline-block text-[10px] text-stone-300 font-medium truncate max-w-[110px] drop-shadow-xs">
              · {item.location}
            </span>
          )}
        </div>

        {/* Expanded Details on Hover */}
        {isHovered && (
          <div className="mt-2 pt-2 border-t border-white/15 flex items-center justify-between text-[11px] text-stone-300 animate-fadeIn">
            <span className="flex items-center gap-1 text-[#4ADE80] font-black text-[10px]">
              <Maximize2 className="w-3 h-3" />
              <span>사진 크게보기</span>
            </span>
            <span className="text-[10px] text-stone-400">
              {item.categoryLabel}
            </span>
          </div>
        )}
      </div>

      {/* Admin Action Pill (Hover Mode) */}
      {isEditMode && isHovered && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute top-2 right-2 z-40 flex items-center gap-1 bg-black/90 p-1 rounded border border-amber-500/70 shadow-xl"
        >
          <button
            type="button"
            onClick={(e) => onEdit?.(e, item)}
            className="px-1.5 py-0.5 bg-amber-500 hover:bg-amber-400 text-black font-black text-[9px] rounded flex items-center gap-0.5 transition cursor-pointer"
            title="수정"
          >
            <Edit3 className="w-2.5 h-2.5" />
            <span>수정</span>
          </button>
          <button
            type="button"
            onClick={(e) => onDelete?.(e, item)}
            className="p-1 text-stone-300 hover:text-red-400 transition rounded cursor-pointer"
            title="삭제"
          >
            <Trash2 className="w-3 h-3" />
          </button>
        </div>
      )}
    </div>
  );
}
