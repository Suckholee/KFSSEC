import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import NetflixCard from './NetflixCard';

export default function NetflixCategoryRow({
  category,
  rowIndex = 0,
  isMotionPaused = false,
  items = [],
  isEditMode = false,
  onSelectPhoto,
  onViewAllCategory,
  onEditItem,
  onDeleteItem,
}) {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const hovering = useRef(false);
  const touching = useRef(false);
  const pauseUntil = useRef(0);

  useEffect(() => {
    const track = scrollRef.current;
    if (!track || isMotionPaused) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let visible = false;
    let previousTime = 0;
    let frame;
    let direction = rowIndex % 2 === 0 ? 1 : -1;
    let position = direction === 1 ? track.scrollLeft : track.scrollWidth - track.clientWidth;
    if (!reducedMotion.matches && direction === -1) track.scrollLeft = position;
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    observer.observe(track);
    const animate = time => {
      const seconds = previousTime ? Math.min((time - previousTime) / 1000, 0.05) : 0;
      previousTime = time;
      const paused = reducedMotion.matches || !visible || document.hidden || hovering.current || touching.current || track.contains(document.activeElement) || time < pauseUntil.current;
      const max = track.scrollWidth - track.clientWidth;
      if (!paused && max > 0) {
        position = Math.max(0, Math.min(max, position + direction * seconds * (12 + rowIndex % 3 * 2)));
        track.scrollLeft = position;
        if (position >= max) direction = -1;
        if (position <= 0) direction = 1;
      } else position = track.scrollLeft;
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); };
  }, [items, rowIndex, isEditMode, isMotionPaused]);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 20);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 20);
  };

  const handleScroll = (direction) => {
    if (!scrollRef.current) return;
    pauseUntil.current = performance.now() + 4000;
    const scrollAmount = scrollRef.current.clientWidth * 0.75;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
    setTimeout(checkScroll, 350);
  };

  if (!items || items.length === 0) return null;

  return (
    <div className="relative group/row my-6 sm:my-8 px-4 sm:px-8 lg:px-12">
      {/* Row Header */}
      <div className="flex items-center justify-between mb-2.5 sm:mb-3.5">
        <button
          onClick={() => onViewAllCategory?.(category.id)}
          className="group/title flex items-center gap-2 cursor-pointer text-left focus:outline-none"
        >
          <h2 className="text-base sm:text-lg lg:text-xl font-black text-stone-900 tracking-tight group-hover/title:text-[#15803D] transition-colors flex items-center gap-2">
            <span>{category.label}</span>
            <span className="text-[11px] font-bold text-[#15803D] opacity-0 group-hover/title:opacity-100 transition-opacity">
              모두 보기 ›
            </span>
          </h2>
        </button>

        {/* Netflix-style Pagination Dash Indicator */}
        <div className="flex items-center gap-1 opacity-0 group-hover/row:opacity-100 transition-opacity duration-300">
          <span className="w-3.5 h-1 bg-[#15803D] rounded-full" />
          <span className="w-3.5 h-1 bg-stone-300 rounded-full" />
          <span className="w-3.5 h-1 bg-stone-300 rounded-full" />
        </div>
      </div>

      {/* Row Carousel Container with Edge Slider Handles */}
      <div className="relative">
        {/* Left Slider Handle */}
        {canScrollLeft && (
          <button
            type="button"
            onClick={() => handleScroll('left')}
            className="absolute left-0 top-0 bottom-0 w-9 sm:w-11 bg-white/95 hover:bg-white text-stone-900 z-40 flex items-center justify-center transition-all opacity-0 group-hover/row:opacity-100 cursor-pointer shadow-xl rounded-r-xl border border-stone-200"
            title="이전 사진 보기"
            aria-label="이전"
          >
            <ChevronLeft className="w-6 h-6 stroke-[3] transform group-hover/row:scale-110 transition-transform text-stone-800" />
          </button>
        )}

        {/* Right Slider Handle */}
        {canScrollRight && (
          <button
            type="button"
            onClick={() => handleScroll('right')}
            className="absolute right-0 top-0 bottom-0 w-9 sm:w-11 bg-white/95 hover:bg-white text-stone-900 z-40 flex items-center justify-center transition-all opacity-0 group-hover/row:opacity-100 cursor-pointer shadow-xl rounded-l-xl border border-stone-200"
            title="다음 사진 보기"
            aria-label="다음"
          >
            <ChevronRight className="w-6 h-6 stroke-[3] transform group-hover/row:scale-110 transition-transform text-stone-800" />
          </button>
        )}

        {/* Horizontal Slider Track (5~6 items visible on desktop like Netflix) */}
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          onMouseEnter={() => { hovering.current = true; }}
          onMouseLeave={() => { hovering.current = false; }}
          onTouchStart={() => { touching.current = true; }}
          onTouchEnd={() => { touching.current = false; pauseUntil.current = performance.now() + 4000; }}
          onTouchCancel={() => { touching.current = false; }}
          onWheel={() => { pauseUntil.current = performance.now() + 4000; }}
          className="flex gap-2 sm:gap-2.5 overflow-x-auto scrollbar-none py-3 px-1 -mx-1"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {items.map((item) => (
            <div
              key={item.id}
              className="w-[calc(50%-4px)] sm:w-[calc(33.333%-6px)] md:w-[calc(25%-6px)] lg:w-[calc(20%-8px)] xl:w-[calc(16.666%-8px)] shrink-0"
            >
              <NetflixCard
                item={item}
                isEditMode={isEditMode}
                onSelect={(selected) => onSelectPhoto?.(selected)}
                onEdit={onEditItem}
                onDelete={onDeleteItem}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
