import React from 'react';
import { ChevronRight, Play, Star, Sparkles, ChevronDown } from 'lucide-react';

export default function NetflixCoursesSection({ onSelectCourse, onScrollNext }) {
  
  const popularCourses = [
    {
      id: 101,
      instructor: '김도윤',
      title: '외식창업 성공전략 마스터',
      subtitle: '아이디어부터 오픈까지',
      discount: '10%',
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
      discount: '10%',
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
      discount: '5%',
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
      discount: '13%',
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
      discount: '20%',
      price: '120,000원',
      originalPrice: '150,000원',
      rating: 4.85,
      image: '/images/course_net_5.jpg',
      tag: 'RECOMMEND',
    },
    {
      id: 106,
      instructor: '오세훈',
      title: '프랜차이즈 창업의 이해',
      subtitle: '가맹사업 준비와 운영',
      discount: '25%',
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
      discount: '13%',
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
      discount: '10%',
      price: '180,000원',
      originalPrice: '200,000원',
      rating: 4.94,
      image: '/images/course_net_8.jpg',
      tag: 'RECOMMEND',
    },
  ];

  const handleKeyPress = (e, course) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelectCourse(course);
    }
  };

  return (
    <section className="relative py-12 lg:py-16 bg-[#0A1410] text-white min-h-full flex flex-col justify-center border-b border-emerald-950">
      <div className="w-full px-4 sm:px-8 lg:px-12 space-y-10 max-w-7xl mx-auto">
        
        {/* Top Promo Banner */}
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
              <span className="text-[#D4AF37]">Best</span> 인기 클래스
            </h3>
            <button
              onClick={() => onSelectCourse && onSelectCourse(popularCourses[0])}
              className="text-xs font-bold text-emerald-400 hover:text-emerald-300 cursor-pointer flex items-center gap-1 focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none rounded-lg p-1 min-h-[44px]"
              aria-label="Best 인기 클래스 전체 목록 보기"
            >
              <span>인기 클래스 전체보기</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {popularCourses.map((course) => (
              <article
                key={course.id}
                onClick={() => onSelectCourse(course)}
                onKeyDown={(e) => handleKeyPress(e, course)}
                tabIndex={0}
                role="button"
                aria-label={`${course.title} 상세 보기, 정가 ${course.originalPrice}, 할인율 ${course.discount}, 판매가 ${course.price}`}
                className="group relative bg-[#111C16] rounded-2xl border border-emerald-500/20 overflow-hidden hover:border-emerald-400/60 shadow-lg hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col justify-between focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none"
              >
                {/* Cover Image Container */}
                <div className="relative aspect-[16/10] overflow-hidden bg-black">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111C16] via-transparent to-transparent opacity-80" />
                  
                  {/* Play Button Overlay on Hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-xs">
                    <div className="w-12 h-12 rounded-full bg-[#0B3C26] text-white flex items-center justify-center shadow-lg border border-[#C5A059] transform group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 fill-current text-[#D4AF37] ml-0.5" />
                    </div>
                  </div>
                </div>

                {/* Card Info */}
                <div className="p-4 space-y-2">
                  <div className="text-xs font-bold text-emerald-400">
                    {course.instructor} 강사
                  </div>
                  <h4 className="text-base font-black text-white line-clamp-1 group-hover:text-emerald-300 transition-colors">
                    {course.title}
                  </h4>
                  <p className="text-xs text-gray-300 font-medium line-clamp-1">
                    {course.subtitle}
                  </p>
                  <div className="pt-2.5 flex items-center justify-between border-t border-emerald-900/60">
                    <div className="flex flex-col">
                      <span className="text-[11px] text-gray-400 line-through font-bold">{course.originalPrice}</span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-black text-rose-400">
                          {course.discount}
                        </span>
                        <span className="text-sm font-black text-white">
                          {course.price}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-[#D4AF37] text-xs font-bold bg-black/40 px-2 py-1 rounded-lg border border-amber-500/20">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{course.rating}</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Row 2: 이번 학기 추천 클래스 */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2 tracking-tight">
              이번 학기 <span className="text-emerald-400">추천 클래스</span>
            </h3>
            <button
              onClick={() => onSelectCourse && onSelectCourse(recommendedCourses[0])}
              className="text-xs font-bold text-emerald-400 hover:text-emerald-300 cursor-pointer flex items-center gap-1 focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none rounded-lg p-1 min-h-[44px]"
              aria-label="추천 클래스 전체 목록 보기"
            >
              <span>추천 클래스 전체보기</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {recommendedCourses.map((course) => (
              <article
                key={course.id}
                onClick={() => onSelectCourse(course)}
                onKeyDown={(e) => handleKeyPress(e, course)}
                tabIndex={0}
                role="button"
                aria-label={`${course.title} 상세 보기, 정가 ${course.originalPrice}, 할인율 ${course.discount}, 판매가 ${course.price}`}
                className="group relative bg-[#111C16] rounded-2xl border border-emerald-500/20 overflow-hidden hover:border-emerald-400/60 shadow-lg hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col justify-between focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none"
              >
                {/* Cover Image Container */}
                <div className="relative aspect-[16/10] overflow-hidden bg-black">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111C16] via-transparent to-transparent opacity-80" />
                  
                  {/* Play Button Overlay on Hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-xs">
                    <div className="w-12 h-12 rounded-full bg-[#0B3C26] text-white flex items-center justify-center shadow-lg border border-[#C5A059] transform group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 fill-current text-[#D4AF37] ml-0.5" />
                    </div>
                  </div>
                </div>

                {/* Card Info */}
                <div className="p-4 space-y-2">
                  <div className="text-xs font-bold text-emerald-400">
                    {course.instructor} 강사
                  </div>
                  <h4 className="text-base font-black text-white line-clamp-1 group-hover:text-emerald-300 transition-colors">
                    {course.title}
                  </h4>
                  <p className="text-xs text-gray-300 font-medium line-clamp-1">
                    {course.subtitle}
                  </p>
                  <div className="pt-2.5 flex items-center justify-between border-t border-emerald-900/60">
                    <div className="flex flex-col">
                      <span className="text-[11px] text-gray-400 line-through font-bold">{course.originalPrice}</span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-black text-rose-400">
                          {course.discount}
                        </span>
                        <span className="text-sm font-black text-white">
                          {course.price}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-[#D4AF37] text-xs font-bold bg-black/40 px-2 py-1 rounded-lg border border-amber-500/20">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{course.rating}</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
