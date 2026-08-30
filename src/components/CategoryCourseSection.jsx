import React from 'react';
import { ChevronRight, ChevronDown, Award, Utensils, Lightbulb, Dog, Heart } from 'lucide-react';

export default function CategoryCourseSection({ onViewMoreClick, onSelectCourse, onScrollNext }) {
  
  // Row 1: 펫푸드 & 수제간식
  const petFoodCourses = [
    {
      id: 'food-1',
      instructor: '김서연 원장',
      title: '반려동물 영양·식재료 기초 및 레시피',
      discount: '15%',
      price: '120,000원',
      originalPrice: '141,000원',
      image: '/images/petfood_card_1.jpg?v=3',
    },
    {
      id: 'food-2',
      instructor: '박지훈 연구원',
      title: '수제간식·펫푸드 메뉴개발 실전',
      discount: '20%',
      price: '80,000원',
      originalPrice: '100,000원',
      image: '/images/petfood_card_2.jpg?v=3',
    },
    {
      id: 'food-3',
      instructor: '이수민 디렉터',
      title: '펫푸드 상품 구성·온라인 판매 전략',
      discount: '16%',
      price: '140,000원',
      originalPrice: '166,000원',
      image: '/images/petfood_card_3.jpg?v=3',
    },
  ];

  // Row 2: 반려견 행동교정
  const behaviorCourses = [
    {
      id: 'beh-1',
      instructor: '김서연 훈련사',
      title: '반려견 행동 심리 이해 & 코칭 상담',
      discount: '20%',
      price: '120,000원',
      originalPrice: '150,000원',
      image: '/images/behavior_card_1.jpg?v=3',
    },
    {
      id: 'beh-2',
      instructor: '박지훈 전문가',
      title: '문제행동 진단 & 오프라인 교정 실전',
      discount: '20%',
      price: '80,000원',
      originalPrice: '100,000원',
      image: '/images/behavior_card_2.jpg?v=3',
    },
    {
      id: 'beh-3',
      instructor: '이수민 마스터',
      title: '보호자 현장 코칭 & 행동분석 자격증',
      discount: '16%',
      price: '140,000원',
      originalPrice: '166,000원',
      image: '/images/behavior_card_3.jpg?v=3',
    },
  ];

  // Row 3: 외식업 창업전략 (Food Service Startup Strategy)
  const foodStartupCourses = [
    {
      id: 'str-1',
      instructor: '김도윤 대표',
      title: '외식창업 아이디어 & 사업계획 수립',
      discount: '10%',
      price: '234,000원',
      originalPrice: '260,000원',
      image: '/images/course_net_1.jpg',
    },
    {
      id: 'str-2',
      instructor: '박지훈 소장',
      title: '빅데이터 상권분석 & 수익구조 설계',
      discount: '10%',
      price: '216,000원',
      originalPrice: '240,000원',
      image: '/images/course_net_2.jpg',
    },
    {
      id: 'str-3',
      instructor: '정하늘 팀장',
      title: '외식업 인스타그램 마케팅 & 단골 전략',
      discount: '20%',
      price: '120,000원',
      originalPrice: '150,000원',
      image: '/images/course_net_5.jpg',
    },
  ];

  const handleKeyPress = (e, course) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelectCourse(course);
    }
  };

  return (
    <section className="relative py-12 lg:py-16 bg-[#0A1410] text-white min-h-full flex flex-col justify-center border-b border-emerald-950/80">
      <div className="w-full px-4 sm:px-8 lg:px-12 space-y-12 max-w-7xl mx-auto">
        
        {/* Category Row 1: 펫푸드 */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            {/* Left Category Card */}
            <div className="lg:col-span-3 bg-[#111C16] rounded-3xl p-6 border border-emerald-500/30 flex flex-col justify-between relative overflow-hidden shadow-lg">
              <div className="space-y-2 z-10">
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  펫푸드
                </h3>
                <p className="text-xs text-gray-300 font-semibold leading-relaxed border-t border-emerald-900/60 pt-3">
                  수제간식·레시피 실무 과정
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-emerald-900/60 flex items-center justify-between z-10 text-xs font-bold text-emerald-400">
                <span>수제간식 전문가 과정</span>
                <Utensils className="w-4 h-4 text-[#D4AF37]" />
              </div>
            </div>

            {/* Right 3-Course Cards Grid */}
            <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {petFoodCourses.map((course) => (
                <article
                  key={course.id}
                  onClick={() => onSelectCourse(course)}
                  onKeyDown={(e) => handleKeyPress(e, course)}
                  tabIndex={0}
                  role="button"
                  aria-label={`${course.title} 상세 과정 보기, 가격 ${course.price}`}
                  className="group bg-[#111C16] rounded-3xl border border-emerald-500/20 overflow-hidden shadow-md hover:shadow-xl hover:border-emerald-400/60 transition-all duration-300 cursor-pointer flex flex-col justify-between hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-xs font-bold text-emerald-400">{course.instructor}</span>
                      <h4 className="text-sm sm:text-base font-black text-white group-hover:text-emerald-300 transition-colors line-clamp-1 mt-0.5">
                        {course.title}
                      </h4>
                    </div>
                    <div className="pt-2.5 border-t border-emerald-900/60 flex items-center justify-between">
                      <span className="text-xs text-gray-400 line-through font-bold">{course.originalPrice}</span>
                      <div className="flex items-center gap-1.5">
                        {course.discount && <span className="text-xs font-black text-rose-400">{course.discount}</span>}
                        <span className="text-sm font-black text-white">{course.price}</span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="flex justify-center pt-1">
            <button
              onClick={() => onViewMoreClick && onViewMoreClick('catalog')}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-white hover:bg-emerald-50 text-gray-900 font-extrabold text-xs rounded-xl shadow-md border border-gray-200 transition-all group cursor-pointer min-h-[44px] focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:outline-none"
              aria-label="펫푸드 전체 강좌 둘러보기"
            >
              <span>클래스 더 보러 가기</span>
              <ChevronRight className="w-4 h-4 text-emerald-700 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Category Row 2: 반려견 행동교정 */}
        <div className="space-y-4 border-t border-emerald-950/80 pt-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            {/* Left Category Card */}
            <div className="lg:col-span-3 bg-[#111C16] rounded-3xl p-6 border border-emerald-500/30 flex flex-col justify-between relative overflow-hidden shadow-lg">
              <div className="space-y-2 z-10">
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  행동교정
                </h3>
                <p className="text-xs text-gray-300 font-semibold leading-relaxed border-t border-emerald-900/60 pt-3">
                  행동 분석 및 코칭 실무
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-emerald-900/60 flex items-center justify-between z-10 text-xs font-bold text-emerald-400">
                <span>행동분석 전문가 과정</span>
                <Dog className="w-4 h-4 text-[#D4AF37]" />
              </div>
            </div>

            {/* Right 3-Course Cards Grid */}
            <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {behaviorCourses.map((course) => (
                <article
                  key={course.id}
                  onClick={() => onSelectCourse(course)}
                  onKeyDown={(e) => handleKeyPress(e, course)}
                  tabIndex={0}
                  role="button"
                  aria-label={`${course.title} 상세 과정 보기, 가격 ${course.price}`}
                  className="group bg-[#111C16] rounded-3xl border border-emerald-500/20 overflow-hidden shadow-md hover:shadow-xl hover:border-emerald-400/60 transition-all duration-300 cursor-pointer flex flex-col justify-between hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-xs font-bold text-emerald-400">{course.instructor}</span>
                      <h4 className="text-sm sm:text-base font-black text-white group-hover:text-emerald-300 transition-colors line-clamp-1 mt-0.5">
                        {course.title}
                      </h4>
                    </div>
                    <div className="pt-2.5 border-t border-emerald-900/60 flex items-center justify-between">
                      <span className="text-xs text-gray-400 line-through font-bold">{course.originalPrice}</span>
                      <div className="flex items-center gap-1.5">
                        {course.discount && <span className="text-xs font-black text-rose-400">{course.discount}</span>}
                        <span className="text-sm font-black text-white">{course.price}</span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="flex justify-center pt-1">
            <button
              onClick={() => onViewMoreClick && onViewMoreClick('catalog')}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-white hover:bg-emerald-50 text-gray-900 font-extrabold text-xs rounded-xl shadow-md border border-gray-200 transition-all group cursor-pointer min-h-[44px] focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:outline-none"
              aria-label="행동교정 전체 강좌 둘러보기"
            >
              <span>클래스 더 보러 가기</span>
              <ChevronRight className="w-4 h-4 text-emerald-700 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Category Row 3: 창업전략 */}
        <div className="space-y-4 border-t border-emerald-950/80 pt-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            {/* Left Category Card */}
            <div className="lg:col-span-3 bg-[#111C16] rounded-3xl p-6 border border-emerald-500/30 flex flex-col justify-between relative overflow-hidden shadow-lg">
              <div className="space-y-2 z-10">
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  창업전략
                </h3>
                <p className="text-xs text-gray-300 font-semibold leading-relaxed border-t border-emerald-900/60 pt-3">
                  데이터 기반 성공 창업
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-emerald-900/60 flex items-center justify-between z-10 text-xs font-bold text-emerald-400">
                <span>외식 매장 성공 비즈니스</span>
                <Lightbulb className="w-4 h-4 text-[#D4AF37]" />
              </div>
            </div>

            {/* Right 3-Course Cards Grid */}
            <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {foodStartupCourses.map((course) => (
                <article
                  key={course.id}
                  onClick={() => onSelectCourse(course)}
                  onKeyDown={(e) => handleKeyPress(e, course)}
                  tabIndex={0}
                  role="button"
                  aria-label={`${course.title} 상세 과정 보기, 가격 ${course.price}`}
                  className="group bg-[#111C16] rounded-3xl border border-emerald-500/20 overflow-hidden shadow-md hover:shadow-xl hover:border-emerald-400/60 transition-all duration-300 cursor-pointer flex flex-col justify-between hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-xs font-bold text-emerald-400">{course.instructor}</span>
                      <h4 className="text-sm sm:text-base font-black text-white group-hover:text-emerald-300 transition-colors line-clamp-1 mt-0.5">
                        {course.title}
                      </h4>
                    </div>
                    <div className="pt-2.5 border-t border-emerald-900/60 flex items-center justify-between">
                      <span className="text-xs text-gray-400 line-through font-bold">{course.originalPrice}</span>
                      <div className="flex items-center gap-1.5">
                        {course.discount && <span className="text-xs font-black text-rose-400">{course.discount}</span>}
                        <span className="text-sm font-black text-white">{course.price}</span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="flex justify-center pt-1">
            <button
              onClick={() => onViewMoreClick && onViewMoreClick('catalog')}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-white hover:bg-emerald-50 text-gray-900 font-extrabold text-xs rounded-xl shadow-md border border-gray-200 transition-all group cursor-pointer min-h-[44px] focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:outline-none"
              aria-label="창업전략 전체 강좌 둘러보기"
            >
              <span>클래스 더 보러 가기</span>
              <ChevronRight className="w-4 h-4 text-emerald-700 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
