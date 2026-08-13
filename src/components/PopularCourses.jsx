import React from 'react';
import { Clock, BookOpen, ChevronRight } from 'lucide-react';

export default function PopularCourses({ onSelectCourse, onViewAllClick }) {
  const courses = [
    {
      id: 1,
      badge: 'BEST',
      badgeColor: 'bg-[#0F5132] text-white',
      title: '카페 창업 마스터 과정',
      description: '카페 창업에 필요한 모든 것을 배우는 실전 과정',
      image: '/images/course_cafe.jpg',
      duration: '4주 과정',
      lessons: '20강',
      instructor: '김이듬 원장 (15년 카페 브랜드 총괄)',
      price: '1,200,000원',
      rating: 4.9,
    },
    {
      id: 2,
      badge: 'BEST',
      badgeColor: 'bg-[#0F5132] text-white',
      title: '외식 창업 실무 과정',
      description: '외식 창업 준비부터 운영까지 실무 중심 교육',
      image: '/images/course_restaurant.jpg',
      duration: '6주 과정',
      lessons: '30강',
      instructor: '박성재 교수 (외식 컨설팅 대표)',
      price: '1,800,000원',
      rating: 4.95,
    },
    {
      id: 3,
      badge: 'NEW',
      badgeColor: 'bg-emerald-600 text-white',
      title: '메뉴 개발 전문가 과정',
      description: '차별화된 메뉴 개발과 원가 관리 노하우',
      image: '/images/course_menu_dev.jpg',
      duration: '4주 과정',
      lessons: '16강',
      instructor: '최유경 셰프 (미슐랭 스타 출신)',
      price: '1,500,000원',
      rating: 4.88,
    },
    {
      id: 4,
      badge: 'NEW',
      badgeColor: 'bg-emerald-600 text-white',
      title: '배달 창업 특화 과정',
      description: '배달 전문점 창업과 운영에 최적화된 과정',
      image: '/images/course_delivery.jpg',
      duration: '3주 과정',
      lessons: '12강',
      instructor: '한동훈 이사 (플랫폼 외식 마케팅 리드)',
      price: '980,000원',
      rating: 4.85,
    },
  ];

  return (
    <section id="courses" className="py-16 bg-white">
      <div className="w-full px-4 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              인기 교육과정
            </h2>
            <p className="text-base text-gray-500 font-medium mt-1">
              실무에 바로 적용 가능한 인기 교육과정을 만나보세요.
            </p>
          </div>
          <button
            onClick={onViewAllClick}
            className="inline-flex items-center gap-1.5 px-4 py-2 border border-emerald-200 text-sm font-bold text-emerald-900 rounded-xl hover:bg-emerald-50 hover:border-emerald-300 transition-all self-start sm:self-auto cursor-pointer"
          >
            <span>전체 교육과정 보기</span>
            <ChevronRight className="w-4 h-4 text-emerald-600" />
          </button>
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              onClick={() => onSelectCourse(course)}
              className="group bg-white rounded-2xl border border-emerald-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col cursor-pointer"
            >
              {/* Image & Badge Container */}
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className={`px-2.5 py-1 text-xs font-black rounded-md tracking-wider shadow-sm uppercase ${course.badgeColor}`}>
                    {course.badge}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-emerald-700 transition-colors line-clamp-1">
                    {course.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 mt-2 font-medium leading-relaxed line-clamp-2">
                    {course.description}
                  </p>
                </div>

                {/* Course Metadata Meta Chips */}
                <div className="flex items-center gap-4 mt-6 pt-4 border-t border-emerald-100/60 text-xs font-semibold text-gray-500">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-emerald-600" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-emerald-600" />
                    <span>{course.lessons}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
