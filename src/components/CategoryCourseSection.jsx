import React from 'react';
import { ChevronRight, ChevronDown, Award, Utensils, Lightbulb, Dog } from 'lucide-react';

export default function CategoryCourseSection({ onViewMoreClick, onSelectCourse, onScrollNext }) {
  
  // Row 1: 행동교정
  const behaviorCourses = [
    {
      id: 'beh-1',
      instructor: '김서연',
      title: '반려견 행동 이해·상담',
      discount: '최대 20%',
      price: '120,000원',
      image: '/images/behavior_focus_1.jpg',
    },
    {
      id: 'beh-2',
      instructor: '박지훈',
      title: '문제행동 진단·교정 실전',
      discount: '',
      price: '80,000원',
      image: '/images/behavior_focus_2.jpg',
    },
    {
      id: 'beh-3',
      instructor: '이수민',
      title: '보호자 코칭·현장 실습',
      discount: '최대 16%',
      price: '140,000원',
      image: '/images/behavior_focus_3.jpg',
    },
  ];

  // Row 2: 펫푸드
  const petFoodCourses = [
    {
      id: 'food-1',
      instructor: '김서연',
      title: '반려동물 영양·식재료 기초',
      discount: '최대 20%',
      price: '120,000원',
      image: '/images/petfood_focus_1.jpg',
    },
    {
      id: 'food-2',
      instructor: '박지훈',
      title: '수제간식·펫푸드 실전',
      discount: '',
      price: '80,000원',
      image: '/images/petfood_focus_2.jpg',
    },
    {
      id: 'food-3',
      instructor: '이수민',
      title: '상품 구성·판매 전략',
      discount: '최대 16%',
      price: '140,000원',
      image: '/images/petfood_focus_3.jpg',
    },
  ];

  // Row 3: 창업전략
  const startupCourses = [
    {
      id: 'str-1',
      instructor: '김서연',
      title: '창업기획·사업계획 수립',
      discount: '최대 20%',
      price: '120,000원',
      image: '/images/startup_focus_1.jpg',
    },
    {
      id: 'str-2',
      instructor: '박지훈',
      title: '상권분석·수익구조 설계',
      discount: '',
      price: '80,000원',
      image: '/images/startup_focus_2.jpg',
    },
    {
      id: 'str-3',
      instructor: '이수민',
      title: '마케팅·단골고객 전략',
      discount: '최대 16%',
      price: '140,000원',
      image: '/images/startup_focus_3.jpg',
    },
  ];

  return (
    <section className="relative py-10 lg:py-14 bg-[#0a1410] text-white min-h-full flex flex-col justify-center border-b border-emerald-950">
      <div className="w-full px-4 sm:px-8 lg:px-12 space-y-10 max-w-7xl mx-auto">
        
        {/* Category Row 1: 행동교정 */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            {/* Left Category Card */}
            <div className="lg:col-span-3 bg-[#1e1e1e] rounded-3xl p-5 border border-emerald-500/30 flex flex-col justify-between relative overflow-hidden shadow-xl">
              <div className="space-y-2 z-10">
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  행동교정
                </h3>
                <p className="text-xs text-gray-400 font-semibold leading-relaxed border-t border-gray-700/50 pt-2">
                  찐 전문가는 이 기술을 배웁니다.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-gray-700/50 flex items-center justify-between z-10">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                  <Dog className="w-3.5 h-3.5" />
                  <span>행동 분석 및 코칭</span>
                </div>
                <Award className="w-5 h-5 text-amber-500/40" />
              </div>
            </div>

            {/* Right 3-Course Cards Grid */}
            <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {behaviorCourses.map((course) => (
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

        {/* Category Row 2: 펫푸드 */}
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
                  <span>수제간식·레시피 실무</span>
                </div>
                <Award className="w-5 h-5 text-amber-500/40" />
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

        {/* Category Row 3: 창업전략 */}
        <div className="space-y-4 border-t border-emerald-900/40 pt-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            {/* Left Category Card */}
            <div className="lg:col-span-3 bg-[#1e1e1e] rounded-3xl p-5 border border-emerald-500/30 flex flex-col justify-between relative overflow-hidden shadow-xl">
              <div className="space-y-2 z-10">
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  창업전략
                </h3>
                <p className="text-xs text-gray-400 font-semibold leading-relaxed border-t border-gray-700/50 pt-2">
                  아무도 알려주지 않았던 창업 기술
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-gray-700/50 flex items-center justify-between z-10">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                  <Lightbulb className="w-3.5 h-3.5" />
                  <span>데이터 기반 성공 창업</span>
                </div>
                <Award className="w-5 h-5 text-amber-500/40" />
              </div>
            </div>

            {/* Right 3-Course Cards Grid */}
            <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {startupCourses.map((course) => (
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
