import React, { useState } from 'react';
import { Bookmark, MapPin, Clock, Video } from 'lucide-react';

export default function CourseCard({ course, viewMode = 'grid', onClick }) {
  const [bookmarked, setBookmarked] = useState(false);

  const handleBookmarkClick = (e) => {
    e.stopPropagation();
    setBookmarked(!bookmarked);
  };

  const getFormatIcon = (fmt) => {
    if (fmt === '온라인') return <Video className="w-3.5 h-3.5 text-gray-400 shrink-0" />;
    return <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />;
  };

  if (viewMode === 'list') {
    return (
      <div
        onClick={onClick}
        className="group bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 flex flex-col sm:flex-row gap-5 shadow-sm hover:shadow-md transition-all cursor-pointer"
      >
        <div className="relative sm:w-64 aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 shrink-0">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {course.badge && (
            <span className="absolute top-2.5 left-2.5 px-2.5 py-1 text-[11px] font-black rounded bg-brand-500 text-white shadow-sm">
              {course.badge}
            </span>
          )}
        </div>

        <div className="flex-1 flex flex-col justify-between py-1">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md whitespace-nowrap">
                {course.industry}
              </span>
              <button
                onClick={handleBookmarkClick}
                className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors"
              >
                <Bookmark className={`w-5 h-5 ${bookmarked ? 'fill-brand-500 text-brand-500' : ''}`} />
              </button>
            </div>
            <h3 className="text-lg font-extrabold text-gray-900 mt-2 group-hover:text-brand-500 transition-colors tracking-tight">
              {course.title}
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 mt-1 font-medium leading-relaxed">
              {course.description}
            </p>
          </div>

          <div className="flex items-center justify-between pt-4 mt-2 border-t border-gray-100">
            <div className="flex items-center gap-3 text-xs font-semibold text-gray-500 whitespace-nowrap">
              <div className="flex items-center gap-1">
                {getFormatIcon(course.format)}
                <span className="whitespace-nowrap">{course.format}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                <span className="whitespace-nowrap">{course.duration}</span>
              </div>
            </div>
            <span className="text-base sm:text-lg font-black text-gray-900 whitespace-nowrap shrink-0">
              {course.priceFormatted}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className="group bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {course.badge && (
          <div className="absolute top-3 left-3">
            <span className="px-2.5 py-1 text-xs font-black rounded-md bg-[#1E2B4D] text-white shadow-sm uppercase tracking-wider">
              {course.badge}
            </span>
          </div>
        )}

        <button
          onClick={handleBookmarkClick}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/20 hover:bg-black/40 text-white flex items-center justify-center backdrop-blur-sm transition-colors"
        >
          <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-white text-white' : ''}`} />
        </button>
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <span className="text-xs font-extrabold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md inline-block mb-2 whitespace-nowrap">
            {course.industry}
          </span>
          <h3 className="text-sm sm:text-base font-bold text-gray-900 group-hover:text-brand-500 transition-colors line-clamp-1 tracking-tight">
            {course.title}
          </h3>
          <p className="text-xs text-gray-500 font-medium mt-1.5 line-clamp-2 leading-relaxed tracking-tight">
            {course.description}
          </p>
        </div>

        {/* Footer specs with strict whitespace-nowrap */}
        <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] sm:text-xs font-semibold text-gray-500 gap-1.5">
          <div className="flex items-center gap-2 shrink-0">
            <div className="flex items-center gap-1 shrink-0">
              {getFormatIcon(course.format)}
              <span className="whitespace-nowrap">{course.format}</span>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <Clock className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              <span className="whitespace-nowrap">{course.duration}</span>
            </div>
          </div>
          <span className="text-xs sm:text-sm font-black text-gray-900 whitespace-nowrap shrink-0">
            {course.priceFormatted}
          </span>
        </div>
      </div>
    </div>
  );
}
