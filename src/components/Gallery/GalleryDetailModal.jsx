import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { renderRichContent } from '../common/RichContentRenderer';

export default function GalleryDetailModal({ photo, onClose }) {
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  const images = photo?.images && photo.images.length > 0
    ? photo.images
    : (photo?.image ? [photo.image] : ['/images/hero_bg.jpg']);

  const currentImage = images[activePhotoIndex] || images[0];

  // Keyboard navigation: Escape to close, ArrowLeft / ArrowRight to flip photos
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose?.();
      } else if (images.length > 1) {
        if (e.key === 'ArrowLeft') {
          setActivePhotoIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
        } else if (e.key === 'ArrowRight') {
          setActivePhotoIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [images.length, onClose]);

  if (!photo) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm cursor-pointer animate-fadeIn"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-[#85CFAB] cursor-default flex flex-col max-h-[92vh]"
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#1B5238] via-[#266847] to-[#34885E] text-white p-4 px-6 flex items-center justify-between border-b border-[#85CFAB]/40">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black text-[#A7F3D0]">
              {photo.categoryLabel}
            </span>
            {images.length > 1 && (
              <span className="text-[11px] font-bold bg-white/20 px-2 py-0.5 rounded-full text-white">
                {activePhotoIndex + 1} / {images.length}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-black/20 hover:bg-black/40 flex items-center justify-center text-white transition-colors cursor-pointer"
            title="닫기 (ESC)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Main Image & Slide Controls */}
        <div className="relative aspect-[16/10] bg-stone-950 overflow-hidden flex items-center justify-center select-none group">
          <img
            src={currentImage}
            alt={`${photo.title} (${activePhotoIndex + 1})`}
            className="w-full h-full object-contain transition-all duration-200"
          />

          {/* Prev / Next Arrows */}
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActivePhotoIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition shadow-xl border border-white/20 active:scale-95 cursor-pointer z-10"
                title="이전 사진 (키보드 ←)"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActivePhotoIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition shadow-xl border border-white/20 active:scale-95 cursor-pointer z-10"
                title="다음 사진 (키보드 →)"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
        </div>

        {/* Multi-photo Thumbnails Filmstrip */}
        {images.length > 1 && (
          <div className="bg-stone-900/90 px-4 py-2.5 flex items-center gap-2 overflow-x-auto border-t border-stone-800">
            {images.map((img, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActivePhotoIndex(i)}
                className={`relative shrink-0 w-14 h-11 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                  activePhotoIndex === i
                    ? 'border-amber-400 scale-105 shadow-md ring-2 ring-amber-400/40'
                    : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img} alt={`썸네일 ${i + 1}`} className="w-full h-full object-cover" />
                {photo.image === img && (
                  <span
                    className="absolute bottom-0.5 right-0.5 w-3 h-3 rounded-full bg-amber-400 flex items-center justify-center text-[7px] text-black font-black"
                    title="대표 사진"
                  >
                    ★
                  </span>
                )}
              </button>
            ))}
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 space-y-3 overflow-y-auto">
          <div className="flex items-center justify-between text-xs text-stone-500 font-bold border-b pb-2">
            <span>{photo.date}</span>
            <span>{photo.location}</span>
          </div>
          <h3 className="text-lg sm:text-xl font-black text-gray-900">
            {photo.title}
          </h3>
          <div className="text-xs sm:text-sm text-gray-700 leading-relaxed font-medium">
            {renderRichContent(photo.desc)}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-stone-50 p-4 border-t border-stone-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#2B7752] text-white text-xs font-bold rounded-xl hover:bg-[#236344] transition-colors cursor-pointer"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
