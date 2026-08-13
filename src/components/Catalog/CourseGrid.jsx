import React from 'react';
import CourseCard from './CourseCard';
import { SearchX } from 'lucide-react';

export default function CourseGrid({
  courses,
  loading,
  viewMode = 'grid',
  onSelectCourse,
  onResetFilters,
}) {
  // Skeleton Loader Cards (8 skeleton cards)
  if (loading) {
    return (
      <div
        className={
          viewMode === 'grid'
            ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6'
            : 'space-y-4'
        }
      >
        {Array.from({ length: 8 }).map((_, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl border border-gray-200 p-4 space-y-4 animate-pulse"
          >
            <div className="aspect-[4/3] bg-gray-200 rounded-xl" />
            <div className="h-4 bg-gray-200 rounded w-1/3" />
            <div className="h-5 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-100 rounded w-full" />
            <div className="pt-3 border-t border-gray-100 flex justify-between">
              <div className="h-4 bg-gray-200 rounded w-1/2" />
              <div className="h-4 bg-gray-200 rounded w-1/4" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Placeholder View when 0 results match
  if (!courses || courses.length === 0) {
    return (
      <div className="bg-white rounded-3xl border border-gray-200 p-12 text-center my-6 space-y-4 shadow-sm">
        <div className="w-16 h-16 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mx-auto">
          <SearchX className="w-8 h-8 stroke-[1.8]" />
        </div>
        <div>
          <h3 className="text-lg font-extrabold text-gray-900">
            해당 카테고리의 준비된 교육이 없습니다
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            다른 업종이나 창업 단계 필터를 선택해 보시거나 조건 검색을 초기화해 보세요.
          </p>
        </div>
        <button
          onClick={onResetFilters}
          className="px-5 py-2.5 bg-[#1E2B4D] hover:bg-slate-900 text-white font-bold text-xs sm:text-sm rounded-xl transition-colors shadow-sm"
        >
          필터 조건 초기화하기
        </button>
      </div>
    );
  }

  return (
    <div
      className={
        viewMode === 'grid'
          ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6'
          : 'space-y-4'
      }
    >
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          course={course}
          viewMode={viewMode}
          onClick={() => onSelectCourse(course)}
        />
      ))}
    </div>
  );
}
