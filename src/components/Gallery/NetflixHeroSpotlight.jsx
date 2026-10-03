import React from 'react';
import { Camera, Calendar, MapPin, Maximize2, Sparkles, ArrowRight, Play } from 'lucide-react';
import { cleanMarkdownSnippet } from '../common/RichContentRenderer';

export default function NetflixHeroSpotlight({
  item,
  spotlightList = [],
  onSelectPhoto,
  onViewCategory,
  onSelectSpotlight,
}) {
  if (!item) return null;

  const cleanDesc = cleanMarkdownSnippet(item.desc);
  const photoCount = item.images ? item.images.length : 1;

  return (
    <div className="relative rounded-3xl overflow-hidden bg-stone-950 text-white shadow-2xl border border-stone-800 min-h-[380px] sm:min-h-[460px] lg:min-h-[520px] flex items-end">
      {/* Background Hero Image */}
      <div className="absolute inset-0">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover object-center transform scale-100 transition-transform duration-1000 ease-out"
        />
        {/* Cinematic Multi-gradient Overlay (Left-to-Right + Bottom-to-Top) */}
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/75 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/50 to-transparent z-10" />
        <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-stone-950/70 to-transparent z-10 pointer-events-none" />
      </div>

      {/* Hero Content */}
      <div className="relative z-20 w-full p-6 sm:p-10 lg:p-14 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        {/* Left Information Block */}
        <div className="max-w-3xl space-y-4">
          {/* Top Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#15803D] text-[#A7F3D0] text-xs font-black tracking-wide shadow-md border border-[#85CFAB]/40">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>KFSSEC SPOTLIGHT 갤러리</span>
            </span>
            <span className="px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-white text-xs font-bold border border-white/20">
              {item.categoryLabel}
            </span>
            {photoCount > 1 && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md text-amber-300 text-xs font-bold border border-amber-300/30">
                <Camera className="w-3 h-3" />
                <span>사진 {photoCount}장 수록</span>
              </span>
            )}
          </div>

          {/* Big Bold Title */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-white tracking-tight leading-tight drop-shadow-md">
            {item.title}
          </h1>

          {/* Date & Location */}
          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-stone-300 font-bold">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#4ADE80]" />
              <span>{item.date}</span>
            </span>
            {item.location && (
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#F97316]" />
                <span>{item.location}</span>
              </span>
            )}
          </div>

          {/* Description Snippet */}
          <p className="text-xs sm:text-sm text-stone-200/90 leading-relaxed font-normal line-clamp-2 sm:line-clamp-3 max-w-2xl drop-shadow-xs">
            {cleanDesc}
          </p>

          {/* Netflix-style Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onSelectPhoto?.(item)}
              className="px-6 py-3 bg-white hover:bg-stone-100 text-stone-950 font-black text-xs sm:text-sm rounded-xl flex items-center gap-2 shadow-2xl hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <Maximize2 className="w-4 h-4 text-[#15803D]" />
              <span>사진 크게보기</span>
            </button>

            {onViewCategory && (
              <button
                onClick={() => onViewCategory(item.category)}
                className="px-5 py-3 bg-stone-900/80 hover:bg-stone-800 text-white font-bold text-xs sm:text-sm rounded-xl border border-stone-700/80 backdrop-blur-md flex items-center gap-2 transition hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>{item.categoryLabel} 전체 탐색</span>
                <ArrowRight className="w-4 h-4 text-stone-400" />
              </button>
            )}
          </div>
        </div>

        {/* Right Thumbnail Carousel / Spotlight Switcher */}
        {spotlightList && spotlightList.length > 1 && (
          <div className="shrink-0 space-y-2 lg:max-w-xs w-full lg:w-auto">
            <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
              주요 하이라이트 순간
            </p>
            <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
              {spotlightList.slice(0, 4).map((spot) => {
                const isCurrent = spot.id === item.id;
                return (
                  <button
                    key={spot.id}
                    onClick={() => onSelectSpotlight?.(spot)}
                    className={`flex items-center gap-3 p-2 rounded-xl text-left transition-all cursor-pointer w-full shrink-0 lg:shrink ${
                      isCurrent
                        ? 'bg-white/20 border border-white/40 ring-2 ring-[#4ADE80]'
                        : 'bg-black/40 hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    <img
                      src={spot.image}
                      alt={spot.title}
                      className="w-14 h-10 object-cover rounded-lg shrink-0 bg-stone-800"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-bold text-[#A7F3D0] truncate">
                        {spot.categoryLabel}
                      </p>
                      <p className="text-xs font-bold text-white truncate">
                        {spot.title}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
