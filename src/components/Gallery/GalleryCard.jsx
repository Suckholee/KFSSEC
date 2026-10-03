import React from 'react';
import ScrollReveal from '../common/ScrollReveal';
import { Calendar, Camera, Edit3, Maximize2, Trash2 } from 'lucide-react';
import { cleanMarkdownSnippet } from '../common/RichContentRenderer';

export default function GalleryCard({
  item,
  idx = 0,
  isEditMode = false,
  onSelect,
  onEdit,
  onDelete,
}) {
  const cleanSummary = cleanMarkdownSnippet(item.desc);

  return (
    <ScrollReveal direction="up" delay={idx * 60}>
      <div
        onClick={() => onSelect?.(item)}
        className="group bg-white rounded-2xl overflow-hidden border border-stone-200 hover:border-[#85CFAB] shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col h-full relative"
      >
        {/* Photo Thumbnail (Cinematic 16:9) */}
        <div className="relative aspect-video overflow-hidden bg-stone-900">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {/* Subtle Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

          <div className="absolute top-3 left-3 bg-[#1E5D3B]/90 backdrop-blur-xs text-[#A7F3D0] text-[10px] font-black px-2.5 py-1 rounded-md border border-[#85CFAB]/50 z-10">
            {item.categoryLabel}
          </div>

          {/* Multi-Photo Count Badge */}
          {item.images && item.images.length > 1 && (
            <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md text-white text-[11px] font-black px-2.5 py-1 rounded-full flex items-center gap-1.5 border border-white/20 shadow-lg z-10 pointer-events-none">
              <Camera className="w-3.5 h-3.5 text-amber-300" />
              <span>+{item.images.length}장</span>
            </div>
          )}

          {/* Admin Action Pill (Hover / Mobile) */}
          {isEditMode && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="absolute bottom-3 right-3 z-20 flex items-center gap-1 bg-stone-950/85 backdrop-blur-md p-1 rounded-lg border border-amber-500/50 shadow-xl"
            >
              <button
                type="button"
                onClick={(e) => onEdit?.(e, item)}
                className="px-2 py-1 bg-amber-500 hover:bg-amber-400 text-black font-black text-[10px] rounded flex items-center gap-1 transition active:scale-95 cursor-pointer"
                title="게시물 내용/사진 수정"
              >
                <Edit3 className="w-3 h-3" />
                <span>수정</span>
              </button>
              <button
                type="button"
                onClick={(e) => onDelete?.(e, item)}
                className="p-1 text-stone-300 hover:text-red-400 transition rounded active:scale-95 cursor-pointer"
                title="게시물 삭제"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="px-3.5 py-1.5 rounded-full bg-white/95 text-stone-900 font-black text-xs shadow-xl flex items-center gap-1.5 transform scale-95 group-hover:scale-100 transition-transform">
              <Maximize2 className="w-3.5 h-3.5 text-[#2B7752]" />
              <span>사진 크게보기</span>
            </div>
          </div>
        </div>

        {/* Content Details */}
        <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-2.5">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[11px] text-stone-500 font-bold">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3 text-[#2B7752]" />
                <span>{item.date}</span>
              </span>
              {item.location && (
                <span className="truncate max-w-[50%]">{item.location}</span>
              )}
            </div>
            <h3 className="font-black text-sm sm:text-base text-gray-900 group-hover:text-[#2B7752] transition-colors line-clamp-1 leading-snug">
              {item.title}
            </h3>
          </div>

          <p className="text-xs text-stone-500 line-clamp-2 font-normal leading-relaxed">
            {cleanSummary || '현장의 생생한 사진과 기록을 확인하세요.'}
          </p>
        </div>
      </div>
    </ScrollReveal>
  );
}
