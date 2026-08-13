import React from 'react';
import { ChevronRight, Play, Star, Sparkles, ChevronDown } from 'lucide-react';

export default function NetflixCoursesSection({ onSelectCourse, onScrollNext }) {
  
  const popularCourses = [
    {
      id: 101,
      instructor: '김도윤',
      title: '외식창업 성공전략 마스터',
      subtitle: '아이디어부터 오픈까지',
      discount: '최대 10%',
      price: '234,000원',
      originalPrice: '260,000원',
      rating: 4.9,
      image: '/images/course_net_1.jpg',
      tag: 'BEST',
    },
    {
      id: 102,
      instructor: '박지훈',
      title: '상권·입지 분석 실전',
      subtitle: '데이터로 찾는 성공 입지',
      discount: '최대 10%',
      price: '216,000원',
      originalPrice: '240,000원',
      rating: 4.95,
      image: '/images/course_net_2.jpg',
      tag: 'BEST',
    },
    {
      id: 103,
      instructor: '이수진',
      title: '메뉴개발과 원가관리',
      subtitle: '수익을 만드는 메뉴 설계',
      discount: '최대 5%',
      price: '190,000원',
      originalPrice: '200,000원',
      rating: 4.88,
      image: '/images/course_net_3.jpg',
      tag: 'BEST',
    },
    {
      id: 104,
      instructor: '최민석',
      title: '매장 운영·서비스 관리',
      subtitle: '재방문을 만드는 운영 노하우',
      discount: '최대 13%',
      price: '260,000원',
      originalPrice: '300,000원',
      rating: 4.92,
      image: '/images/course_net_4.jpg',
      tag: 'BEST',
    },
  ];

  const recommendedCourses = [
    {
      id: 105,
      instructor: '정하늘',
      title: '외식업 마케팅 실전',
      subtitle: '온라인 홍보부터 단골관리까지',
      discount: '',
      price: '120,000원',
      originalPrice: '',
      rating: 4.85,
      image: '/images/course_net_5.jpg',
      tag: 'RECOMMEND',
    },
    {
      id: 106,
      instructor: '오세훈',
      title: '프랜차이즈 창업의 이해',
      subtitle: '가맹사업 준비와 운영',
      discount: '최대 25%',
      price: '150,000원',
      originalPrice: '200,000원',
      rating: 4.9,
      image: '/images/course_net_6.jpg',
      tag: 'RECOMMEND',
    },
    {
      id: 107,
      instructor: '윤서연',
      title: '배달매장 운영 전략',
      subtitle: '배달 플랫폼 매출 높이기',
      discount: '최대 13%',
      price: '160,000원',
      originalPrice: '184,000원',
      rating: 4.87,
      image: '/images/course_net_7.jpg',
      tag: 'RECOMMEND',
    },
    {
      id: 108,
      instructor: '임성호',
      title: '식품위생 및 안전관리',
      subtitle: '현장 중심 위생관리',
      discount: '최대 10%',
      price: '180,000원',
      originalPrice: '200,000원',
      rating: 4.94,
      image: '/images/course_net_8.jpg',
      tag: 'RECOMMEND',
    },
  ];

  return (
    <section className="relative py-10 lg:py-14 bg-[#091510] text-white min-h-full flex flex-col justify-center">
      <div className="w-full px-4 sm:px-8 lg:px-12 space-y-8 max-w-7xl mx-auto">
        
        {/* Top Promo Banner (외식창업 실전과정 신규 오픈!) */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-emerald-500/30 group cursor-pointer transition-transform duration-300 hover:scale-[1.01]">
          <img
            src="/images/banner_new_course.png"
            alt="외식창업 실전과정 신규 오픈! 상권 분석부터 매장 운영까지 한 번에!"
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Row 1: Best 인기 클래스 */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2 tracking-tight">
              <span className="text-emerald-400">Best</span> 인기 클래스
            </h3>
            <span className="text-xs font-bold text-emerald-400 hover:underline cursor-pointer flex items-center gap-1">
              전체보기 <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {popularCourses.map((course) => (
              <div
                key={course.id}
                onClick={() => onSelectCourse(course)}
                className="group relative bg-[#0f231b] rounded-2xl border border-emerald-500/20 overflow-hidden hover:border-emerald-400/60 shadow-lg hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                {/* Cover Image Container */}
                <div className="relative aspect-[16/10] overflow-hidden bg-emerald-950">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f231b] via-transparent to-transparent opacity-80" />
                  
                  {/* Play Button Overlay on Hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-xs">
                    <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 fill-current ml-0.5" />
                    </div>
                  </div>
                </div>

                {/* Card Info */}
                <div className="p-4 space-y-1.5">
                  <div className="text-xs font-bold text-emerald-400">
                    {course.instructor}
                  </div>
                  <h4 className="text-base font-black text-white line-clamp-1 group-hover:text-emerald-300 transition-colors">
                    {course.title}
                  </h4>
                  <p className="text-xs text-gray-400 font-medium line-clamp-1">
                    {course.subtitle}
                  </p>
                  <div className="pt-2 flex items-center justify-between border-t border-emerald-900/60">
                    <div className="flex items-center gap-1.5">
                      {course.discount && (
                        <span className="text-xs font-extrabold text-rose-400">
                          {course.discount}
                        </span>
                      )}
                      <span className="text-sm font-black text-white">
                        {course.price}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{course.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: 이번 학기 추천 클래스 */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2 tracking-tight">
              이번 학기 <span className="text-emerald-400">추천 클래스</span>
            </h3>
            <span className="text-xs font-bold text-emerald-400 hover:underline cursor-pointer flex items-center gap-1">
              전체보기 <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {recommendedCourses.map((course) => (
              <div
                key={course.id}
                onClick={() => onSelectCourse(course)}
                className="group relative bg-[#0f231b] rounded-2xl border border-emerald-500/20 overflow-hidden hover:border-emerald-400/60 shadow-lg hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                {/* Cover Image Container */}
                <div className="relative aspect-[16/10] overflow-hidden bg-emerald-950">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f231b] via-transparent to-transparent opacity-80" />
                  
                  {/* Play Button Overlay on Hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-xs">
                    <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 fill-current ml-0.5" />
                    </div>
                  </div>
                </div>

                {/* Card Info */}
                <div className="p-4 space-y-1.5">
                  <div className="text-xs font-bold text-emerald-400">
                    {course.instructor}
                  </div>
                  <h4 className="text-base font-black text-white line-clamp-1 group-hover:text-emerald-300 transition-colors">
                    {course.title}
                  </h4>
                  <p className="text-xs text-gray-400 font-medium line-clamp-1">
                    {course.subtitle}
                  </p>
                  <div className="pt-2 flex items-center justify-between border-t border-emerald-900/60">
                    <div className="flex items-center gap-1.5">
                      {course.discount && (
                        <span className="text-xs font-extrabold text-rose-400">
                          {course.discount}
                        </span>
                      )}
                      <span className="text-sm font-black text-white">
                        {course.price}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{course.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
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
          <div className="w-7 h-7 rounded-full bg-emerald-900/80 border border-emerald-500/40 flex items-center justify-center text-emerald-300 group-hover:bg-emerald-500 group-hover:text-white transition-all shadow-xs animate-bounce">
            <ChevronDown className="w-4 h-4 stroke-[2.5]" />
          </div>
        </button>
      )}
    </section>
  );
}
