import React from 'react';
import { ChevronRight, ChevronDown, Award, Sparkles, Scissors } from 'lucide-react';

export default function CategoryFocusSection({ onViewMoreClick, onSelectCourse, onScrollNext }) {
  
  const courses = [
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

  return (
    <section className="relative py-12 lg:py-16 bg-[#0a1410] text-white min-h-full flex flex-col justify-center border-b border-emerald-950">
      <div className="w-full px-4 sm:px-8 lg:px-12 space-y-8 max-w-7xl mx-auto">
        
        {/* Main Grid: Left Category Focus Banner + Right 3 Course Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Category Focus Card (1/4 Width on Large Screens) */}
          <div className="lg:col-span-3 bg-[#1e1e1e] rounded-3xl p-6 border border-emerald-500/30 flex flex-col justify-between relative overflow-hidden shadow-xl min-h-[300px]">
            <div className="space-y-3 z-10">
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                펫미용
              </h3>
              
              <p className="text-xs sm:text-sm text-gray-400 font-semibold leading-relaxed border-t border-gray-700/50 pt-3">
                가장 빠르게 경력 쌓는 방법
              </p>
            </div>

            {/* Decorative Vector Graphic Icon */}
            <div className="mt-8 pt-6 border-t border-gray-700/50 flex items-center justify-between z-10">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                <Scissors className="w-4 h-4" />
                <span>체계적인 1:1 실무 교육</span>
              </div>
            </div>

            <div className="absolute -bottom-8 -right-8 w-36 h-36 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
          </div>

          {/* Right 3-Course Cards Grid (3/4 Width on Large Screens) */}
          <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-3 gap-5">
            {courses.map((course) => (
              <div
                key={course.id}
                onClick={onSelectCourse}
                className="group bg-[#0f231b] rounded-3xl border border-emerald-500/20 overflow-hidden shadow-lg hover:shadow-2xl hover:border-emerald-400/60 transition-all duration-300 cursor-pointer flex flex-col justify-between hover:-translate-y-1.5"
              >
                {/* Course Image */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Course Details */}
                <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold text-gray-400">
                      {course.instructor}
                    </span>
                    <h4 className="text-base font-black text-white group-hover:text-emerald-300 transition-colors line-clamp-1 mt-0.5">
                      {course.title}
                    </h4>
                  </div>

                  <div className="pt-2 border-t border-emerald-900/60 flex items-center justify-start gap-2">
                    {course.discount && (
                      <span className="text-xs font-black text-rose-400">
                        {course.discount}
                      </span>
                    )}
                    <span className="text-sm font-black text-white">
                      {course.price}
                    </span>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>

        {/* Bottom View More Button Bar */}
        <div className="flex justify-center pt-2">
          <button
            onClick={onViewMoreClick}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-white hover:bg-emerald-50 text-gray-900 font-extrabold text-sm rounded-2xl shadow-xl hover:shadow-2xl border border-gray-200 transition-all group cursor-pointer"
          >
            <span>클래스 더 보러 가기</span>
            <ChevronRight className="w-4 h-4 text-emerald-600 group-hover:translate-x-1 transition-transform" />
          </button>
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
