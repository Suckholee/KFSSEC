import React, { useState } from 'react';
import { ChevronRight, Bell, Calendar, ChevronDown } from 'lucide-react';

export default function NoticePostSection({ onScrollNext }) {
  const [activeSlide, setActiveSlide] = useState(0);

  const posts = [
    {
      id: 'post-1',
      date: '2022년 11월',
      title: '2022년 11월 정기 총회 및 명인 인증식',
      subtitle: '사단법인 한국외식창업교육원 정기총회 & 명인인증식 현장 기록',
      image: '/images/yt_thumb_2.jpg',
    },
    {
      id: 'post-2',
      date: '2024년 02월',
      title: '240203 한국외식창업교육원 정기총회 세미나',
      subtitle: '2023 결산 및 2024 외식창업 비전 사업 계획 정기 총회',
      image: '/images/yt_thumb_1.jpg',
    },
    {
      id: 'post-3',
      date: '2026년 08월',
      title: '외식창업 수강생 N:N 커리큘럼 매칭 시스템 전격 도입',
      subtitle: '복수 교육과정 맞춤 수강생 라이프스타일 창업 교육 개편',
      image: '/images/dir_1.jpg',
    },
  ];

  const currentPost = posts[activeSlide];

  return (
    <section id="notice-section" className="relative py-10 lg:py-14 bg-white text-black border-b-4 border-black min-h-[460px] flex flex-col justify-center font-sans">
      <div className="w-full px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto space-y-6">
        
        {/* Slanted Black Header Badge Bar (Matching Image 1) */}
        <div className="relative border-b-4 border-black pb-1 flex items-center justify-between">
          <div className="relative inline-block bg-black text-white font-black text-lg sm:text-xl px-8 py-2.5 transform -skew-x-12 shadow-md">
            <span className="inline-block transform skew-x-12 tracking-tight">
              공지사항·게시글
            </span>
          </div>

          {/* Dots Carousel Indicator (••• Matching Image 1) */}
          <div className="flex items-center gap-2">
            {posts.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveSlide(idx)}
                className={`w-3.5 h-3.5 rounded-full transition-all cursor-pointer ${
                  activeSlide === idx ? 'bg-black scale-125' : 'bg-gray-400 hover:bg-gray-600'
                }`}
                title={`슬라이드 ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Card Content with Slanted Left Photo (Matching Image 1) */}
        <div className="bg-gray-100 rounded-2xl border-2 border-gray-300 p-4 sm:p-6 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden">
          
          {/* Left Slanted Photo Container */}
          <div className="w-full md:w-1/2 relative h-56 sm:h-64 rounded-xl overflow-hidden shadow-lg border border-gray-400 bg-black group transform -skew-x-3">
            <img
              src={currentPost.image}
              alt={currentPost.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 transform skew-x-3"
            />
            <div className="absolute top-3 left-3 bg-black/80 text-white font-black text-xs px-3 py-1 rounded transform skew-x-3">
              사)한국외식창업교육원 정기총회&명인인증식
            </div>
          </div>

          {/* Right Info Text & Slide Title */}
          <div className="w-full md:w-1/2 space-y-4 md:pl-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-rose-100 text-rose-800 border border-rose-300 text-xs font-black">
              <Calendar className="w-3.5 h-3.5" />
              <span>{currentPost.date}</span>
            </div>

            <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-black leading-snug">
              {currentPost.title}
            </h3>

            <p className="text-xs sm:text-sm text-gray-700 font-medium leading-relaxed">
              {currentPost.subtitle}
            </p>

            <div className="pt-2">
              <button
                onClick={() => alert(`"${currentPost.title}" 게시글 상세 페이지로 이동합니다.`)}
                className="px-5 py-2.5 bg-black hover:bg-gray-800 text-white text-xs sm:text-sm font-black rounded-xl shadow-md transition-all cursor-pointer inline-flex items-center gap-2"
              >
                <span>게시글 전문 읽기</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Scroll Down Indicator */}
      {onScrollNext && (
        <button
          onClick={onScrollNext}
          className="absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center gap-0.5 text-gray-500 hover:text-black transition-colors cursor-pointer"
        >
          <span className="text-[9px] font-black tracking-widest uppercase">SCROLL DOWN</span>
          <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
        </button>
      )}

    </section>
  );
}
