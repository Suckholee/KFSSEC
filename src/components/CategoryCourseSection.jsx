import React from 'react';
import { ChevronRight, ChevronDown, Scissors, Award, Trophy, Utensils, Lightbulb } from 'lucide-react';

export default function CategoryCourseSection({ onViewMoreClick, onSelectCourse, onScrollNext }) {
  
  // Row 1: 펫미용
  const petGroomingCourses = [
    {
      id: 'cat-1',
      instructor: '김서연',
      title: '반려견 기초미용 입문',
      discount: '최대 20%',
      price: '100,000원',
      image: '/images/category_focus_1.jpg',
    },
    {
      id: 'cat-2',
      instructor: '박지훈',
      title: '견종별 스타일링 실전',
      discount: '',
      price: '50,000원',
      image: '/images/category_focus_2.jpg',
    },
    {
      id: 'cat-3',
      instructor: '이수민',
      title: '펫살롱 창업·고객관리',
      discount: '최대 16%',
      price: '100,000원',
      image: '/images/category_focus_3.jpg',
    },
  ];

  // Row 2: 쇼미용
  const showGroomingCourses = [
    {
      id: 'mst-1',
      instructor: '김서연',
      title: '푸들 쇼스타일 기초',
      discount: '최대 20%',
      price: '120,000원',
      image: '/images/master_focus_1.jpg',
    },
    {
      id: 'mst-2',
      instructor: '박지훈',
      title: '견종별 쇼미용 테크닉',
      discount: '',
      price: '80,000원',
      image: '/images/master_focus_2.jpg',
    },
    {
      id: 'mst-3',
      instructor: '이수민',
      title: '도그쇼 핸들링·코트관리',
      discount: '최대 16%',
      price: '140,000원',
      image: '/images/master_focus_3.jpg',
    },
  ];

  // Row 3: 펫푸드
  const petFoodCourses = [
    {
      id: 'food-1',
      instructor: '김철홍',
      title: '선형대수학의 정석',
      discount: '최대 20%',
      price: '100,000원',
      image: '/images/petfood_focus_1.jpg',
    },
    {
      id: 'food-2',
      instructor: '추영기',
      title: '대학수학을 위한 기본기 다지기 [기초수학 편]',
      discount: '',
      price: '50,000원',
      image: '/images/petfood_focus_2.jpg',
    },
    {
      id: 'food-3',
      instructor: 'Park,Ph.D',
      title: '확률과 통계 개념+실력 완성',
      discount: '최대 16%',
      price: '100,000원',
      image: '/images/petfood_focus_3.jpg',
    },
  ];

  // Row 4: 창업전략
  const startupCourses = [
    {
      id: 'str-1',
      instructor: '박영기',
      title: '전기·전자공학을 위한 기초전기전자',
      discount: '',
      price: '100,000원',
      image: '/images/startup_focus_1.jpg',
    },
    {
      id: 'str-2',
      instructor: '박영기',
      title: '전자기학 개념+실력 완성 1',
      discount: '',
      price: '100,000원',
      image: '/images/startup_focus_2.jpg',
    },
    {
      id: 'str-3',
      instructor: '박영기',
      title: '전자기학 개념+실력 완성 2',
      discount: '',
      price: '100,000원',
      image: '/images/startup_focus_3.jpg',
    },
  ];

  return (
    <section className="relative py-10 lg:py-14 bg-[#0a1410] text-white min-h-full flex flex-col justify-center border-b border-emerald-950">
      <div className="w-full px-4 sm:px-8 lg:px-12 space-y-10 max-w-7xl mx-auto">
        
        {/* Category Row 1: 펫미용 */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            {/* Left Category Card */}
            <div className="lg:col-span-3 bg-[#1e1e1e] rounded-3xl p-5 border border-emerald-500/30 flex flex-col justify-between relative overflow-hidden shadow-xl">
              <div className="space-y-2 z-10">
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  펫미용
                </h3>
                <p className="text-xs text-gray-400 font-semibold leading-relaxed border-t border-gray-700/50 pt-2">
                  가장 빠르게 경력 쌓는 방법
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-gray-700/50 flex items-center justify-between z-10">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                  <Scissors className="w-3.5 h-3.5" />
                  <span>체계적인 1:1 실무 교육</span>
                </div>
              </div>
            </div>

            {/* Right 3-Course Cards Grid */}
            <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {petGroomingCourses.map((course) => (
                <div
                  key={course.id}
                  onClick={onSelectCourse}
                  className="group bg-[#0f231b] rounded-3xl border border-emerald-500/20 overflow-hidden shadow-lg hover:shadow-2xl hover:border-emerald-400/60 transition-all duration-300 cursor-pointer flex flex-col justify-between hover:-translate-y-1"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-3.5 space-y-1.5 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[11px] font-bold text-gray-400">{course.instructor}</span>
                      <h4 className="text-sm font-black text-white group-hover:text-emerald-300 transition-colors line-clamp-1 mt-0.5">
                        {course.title}
                      </h4>
                    </div>
                    <div className="pt-2 border-t border-emerald-900/60 flex items-center justify-start gap-2">
                      {course.discount && <span className="text-xs font-black text-rose-400">{course.discount}</span>}
                      <span className="text-xs font-black text-white">{course.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center pt-1">
            <button
              onClick={onViewMoreClick}
              className="inline-flex items-center gap-1.5 px-6 py-2 bg-white hover:bg-emerald-50 text-gray-900 font-extrabold text-xs rounded-xl shadow-md border border-gray-200 transition-all group cursor-pointer"
            >
              <span>클래스 더 보러 가기</span>
              <ChevronRight className="w-3.5 h-3.5 text-emerald-600 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Category Row 2: 쇼미용 */}
        <div className="space-y-4 border-t border-emerald-900/40 pt-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            {/* Left Category Card */}
            <div className="lg:col-span-3 bg-[#1e1e1e] rounded-3xl p-5 border border-amber-500/30 flex flex-col justify-between relative overflow-hidden shadow-2xl">
              <div className="space-y-2 z-10">
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  쇼미용
                </h3>
                <p className="text-xs text-gray-300 font-semibold leading-relaxed border-t border-gray-700/50 pt-2">
                  압도적 경쟁력을 위한 필수 스킬
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-gray-700/50 flex items-center justify-between z-10">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
                  <Award className="w-3.5 h-3.5" />
                  <span>전문 마스터 코스</span>
                </div>
                <Trophy className="w-5 h-5 text-amber-500/40" />
              </div>
            </div>

            {/* Right 3-Course Cards Grid */}
            <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {showGroomingCourses.map((course) => (
                <div
                  key={course.id}
                  onClick={onSelectCourse}
                  className="group bg-[#141815] rounded-3xl border border-amber-500/20 overflow-hidden shadow-lg hover:shadow-2xl hover:border-amber-400/60 transition-all duration-300 cursor-pointer flex flex-col justify-between hover:-translate-y-1"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-3.5 space-y-1.5 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[11px] font-bold text-gray-400">{course.instructor}</span>
                      <h4 className="text-sm font-black text-white group-hover:text-amber-300 transition-colors line-clamp-1 mt-0.5">
                        {course.title}
                      </h4>
                    </div>
                    <div className="pt-2 border-t border-emerald-900/60 flex items-center justify-start gap-2">
                      {course.discount && <span className="text-xs font-black text-rose-400">{course.discount}</span>}
                      <span className="text-xs font-black text-white">{course.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center pt-1">
            <button
              onClick={onViewMoreClick}
              className="inline-flex items-center gap-1.5 px-6 py-2 bg-white hover:bg-amber-50 text-gray-900 font-extrabold text-xs rounded-xl shadow-md border border-gray-200 transition-all group cursor-pointer"
            >
              <span>클래스 더 보러 가기</span>
              <ChevronRight className="w-3.5 h-3.5 text-emerald-600 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Category Row 3: 펫푸드 */}
        <div className="space-y-4 border-t border-emerald-900/40 pt-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            {/* Left Category Card */}
            <div className="lg:col-span-3 bg-[#1e1e1e] rounded-3xl p-5 border border-emerald-500/30 flex flex-col justify-between relative overflow-hidden shadow-xl">
              <div className="space-y-2 z-10">
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  펫푸드
                </h3>
                <p className="text-xs text-gray-400 font-semibold leading-relaxed border-t border-gray-700/50 pt-2">
                  잘나가는 숍의 한 끗 차이
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-gray-700/50 flex items-center justify-between z-10">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                  <Utensils className="w-3.5 h-3.5" />
                  <span>수제 레시피 가공 실무</span>
                </div>
              </div>
            </div>

            {/* Right 3-Course Cards Grid */}
            <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {petFoodCourses.map((course) => (
                <div
                  key={course.id}
                  onClick={onSelectCourse}
                  className="group bg-[#0f231b] rounded-3xl border border-emerald-500/20 overflow-hidden shadow-lg hover:shadow-2xl hover:border-emerald-400/60 transition-all duration-300 cursor-pointer flex flex-col justify-between hover:-translate-y-1"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-3.5 space-y-1.5 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[11px] font-bold text-gray-400">{course.instructor}</span>
                      <h4 className="text-sm font-black text-white group-hover:text-emerald-300 transition-colors line-clamp-1 mt-0.5">
                        {course.title}
                      </h4>
                    </div>
                    <div className="pt-2 border-t border-emerald-900/60 flex items-center justify-start gap-2">
                      {course.discount && <span className="text-xs font-black text-rose-400">{course.discount}</span>}
                      <span className="text-xs font-black text-white">{course.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center pt-1">
            <button
              onClick={onViewMoreClick}
              className="inline-flex items-center gap-1.5 px-6 py-2 bg-white hover:bg-emerald-50 text-gray-900 font-extrabold text-xs rounded-xl shadow-md border border-gray-200 transition-all group cursor-pointer"
            >
              <span>클래스 더 보러 가기</span>
              <ChevronRight className="w-3.5 h-3.5 text-emerald-600 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Category Row 4: 창업전략 (Blue Accent Theme) */}
        <div className="space-y-4 border-t border-emerald-900/40 pt-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            {/* Left Category Card */}
            <div className="lg:col-span-3 bg-[#205c93] rounded-3xl p-5 border border-sky-400/40 flex flex-col justify-between relative overflow-hidden shadow-xl text-white">
              <div className="space-y-2 z-10">
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  창업전략
                </h3>
                <p className="text-xs text-sky-100 font-semibold leading-relaxed border-t border-sky-300/30 pt-2">
                  아무도 알려주지 않았던 창업 기술
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-sky-300/30 flex items-center justify-between z-10">
                <div className="flex items-center gap-1.5 text-xs font-bold text-sky-200">
                  <Lightbulb className="w-3.5 h-3.5" />
                  <span>데이터 기반 성공 창업</span>
                </div>
              </div>
            </div>

            {/* Right 3-Course Cards Grid */}
            <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {startupCourses.map((course) => (
                <div
                  key={course.id}
                  onClick={onSelectCourse}
                  className="group bg-[#0f231b] rounded-3xl border border-sky-500/20 overflow-hidden shadow-lg hover:shadow-2xl hover:border-sky-400/60 transition-all duration-300 cursor-pointer flex flex-col justify-between hover:-translate-y-1"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-3.5 space-y-1.5 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[11px] font-bold text-gray-400">{course.instructor}</span>
                      <h4 className="text-sm font-black text-white group-hover:text-sky-300 transition-colors line-clamp-1 mt-0.5">
                        {course.title}
                      </h4>
                    </div>
                    <div className="pt-2 border-t border-emerald-900/60 flex items-center justify-start gap-2">
                      {course.discount && <span className="text-xs font-black text-rose-400">{course.discount}</span>}
                      <span className="text-xs font-black text-white">{course.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center pt-1">
            <button
              onClick={onViewMoreClick}
              className="inline-flex items-center gap-1.5 px-6 py-2 bg-white hover:bg-sky-50 text-gray-900 font-extrabold text-xs rounded-xl shadow-md border border-gray-200 transition-all group cursor-pointer"
            >
              <span>클래스 더 보러 가기</span>
              <ChevronRight className="w-3.5 h-3.5 text-emerald-600 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

      </div>

      {/* Subtle Scroll Down Indicator Bar */}
      {onScrollNext && (
        <button
          onClick={onScrollNext}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 group cursor-pointer"
          aria-label="아래로 스크롤"
        >
          <span className="text-[10px] sm:text-[11px] font-black tracking-[0.25em] uppercase text-emerald-400/70 group-hover:text-emerald-300 transition-colors">
            SCROLL DOWN
          </span>
          <div className="w-7 h-7 rounded-full bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-emerald-300 group-hover:bg-emerald-500 group-hover:text-white transition-all shadow-xs animate-bounce">
            <ChevronDown className="w-4 h-4 stroke-[2.5]" />
          </div>
        </button>
      )}
    </section>
  );
}
