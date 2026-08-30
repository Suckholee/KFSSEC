import React, { useState } from 'react';
import { ChevronRight, Bell, Calendar, ChevronDown } from 'lucide-react';

export default function NoticePostSection({ onScrollNext }) {
  const [activeSlide, setActiveSlide] = useState(0);

  const posts = [
    {
      id: 'post-1',
      date: '2026년 08월',
      title: '외식창업 수강생 N:N 커리큘럼 매칭 포트폴리오 시스템 도입',
      subtitle: '사단법인 한국외식창업교육원 맞춤 수강생 라이프스타일 창업 교육 개편',
      image: '/images/dir_1.jpg',
    },
    {
      id: 'post-2',
      date: '2026년 08월',
      title: '2026 사단법인 한국외식창업교육원 3분기 총회 및 성과발표회 개최',
      subtitle: '2026 결산 및 외식창업 비전 사업 계획 정기 총회 성료',
      image: '/images/yt_thumb_1.jpg',
    },
    {
      id: 'post-3',
      date: '2026년 08월',
      title: '제 01회 요리대회 <K-FOOD 지역 특산물 연계 조리 경연 대회> 규정집 안내',
      subtitle: '지역 특산 식재료 연계 레시피 개발 및 외식창업 시그니처 메뉴 경연',
      image: '/images/yt_thumb_2.jpg',
    },
  ];

  const currentPost = posts[activeSlide];

  return (
    <section id="notice-section" className="relative py-12 lg:py-16 bg-[#0A1410] text-white min-h-[460px] flex flex-col justify-center font-sans border-t border-emerald-950">
      <div className="w-full px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto space-y-6">
        
        {/* Header Badge Bar */}
        <div className="border-b border-emerald-900/60 pb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold rounded-full flex items-center gap-1">
              <Bell className="w-3.5 h-3.5" />
              <span>공지사항 & 소식</span>
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              교육원 주요 소식
            </h2>
          </div>

          {/* Dots Carousel Indicator */}
          <div className="flex items-center gap-2">
            {posts.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveSlide(idx)}
                aria-label={`공지 소식 슬라이드 ${idx + 1} 보기`}
                className={`w-3.5 h-3.5 rounded-full transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none ${
                  activeSlide === idx ? 'bg-[#D4AF37] scale-125' : 'bg-emerald-900/60 hover:bg-emerald-700'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Card Content View */}
        <div className="bg-[#111C16] rounded-3xl border border-emerald-500/30 p-5 sm:p-7 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden">
          
          {/* Left Photo Container */}
          <div className="w-full md:w-1/2 relative h-56 sm:h-64 rounded-2xl overflow-hidden shadow-lg border border-emerald-500/30 bg-black group shrink-0">
            <img
              src={currentPost.image}
              alt={currentPost.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
            />
            <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md text-emerald-300 font-bold text-xs px-3 py-1 rounded-lg border border-emerald-500/30">
              사)한국외식창업교육원 공지
            </div>
          </div>

          {/* Right Info Text & Slide Title */}
          <div className="w-full md:w-1/2 space-y-4 md:pl-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-950 text-emerald-300 border border-emerald-800 text-xs font-bold">
              <Calendar className="w-3.5 h-3.5" />
              <span>{currentPost.date}</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-white leading-snug">
              {currentPost.title}
            </h3>

            <p className="text-xs sm:text-sm text-gray-300 font-medium leading-relaxed">
              {currentPost.subtitle}
            </p>

            <div className="pt-2">
              <button
                onClick={() => alert(`"${currentPost.title}" 상세 공지사항 보기`)}
                className="px-5 py-2.5 bg-[#0B3C26] hover:bg-[#072819] text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition-all cursor-pointer inline-flex items-center gap-2 border border-[#C5A059] min-h-[44px] focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none"
                aria-label={`${currentPost.title} 전문 읽기`}
              >
                <span>게시글 전문 읽기</span>
                <ChevronRight className="w-4 h-4 text-[#D4AF37]" />
              </button>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
