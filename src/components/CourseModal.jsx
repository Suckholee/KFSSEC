import React, { useState } from 'react';
import { X, Clock, BookOpen, Star, User, CheckCircle2 } from 'lucide-react';

export default function CourseModal({ course, onClose }) {
  const [applied, setApplied] = useState(false);

  if (!course) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl transition-all border border-gray-100 max-h-[90vh] flex flex-col">
        
        {/* Header Image & Close Button */}
        <div className="relative h-56 sm:h-64 bg-gray-900 shrink-0">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6 text-white">
            <span className={`px-2.5 py-1 text-xs font-black rounded-md tracking-wider uppercase inline-block mb-2 ${course.badgeColor}`}>
              {course.badge}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {course.title}
            </h2>
            <div className="flex items-center gap-3 text-xs sm:text-sm text-gray-200 mt-2 font-medium">
              <div className="flex items-center gap-1 text-amber-400 font-bold">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{course.rating}</span>
              </div>
              <span>•</span>
              <span>{course.instructor}</span>
            </div>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto">
          <div>
            <h3 className="text-base font-bold text-gray-900 mb-2">과정 소개</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {course.description}. 본 교육 과정은 현장에서 즉각 활용 가능한 조리 기술부터 레시피 개발, 매장 효율화, 수익성 분석까지 통합적으로 다룹니다.
            </p>
          </div>

          {/* Quick Specs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100 text-xs sm:text-sm">
            <div className="flex items-center gap-2 text-gray-700">
              <Clock className="w-4 h-4 text-brand-500" />
              <div>
                <span className="block text-gray-400 text-xs">수강 기간</span>
                <span className="font-bold">{course.duration}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <BookOpen className="w-4 h-4 text-brand-500" />
              <div>
                <span className="block text-gray-400 text-xs">총 강의수</span>
                <span className="font-bold">{course.lessons}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-700 col-span-2 sm:col-span-1">
              <User className="w-4 h-4 text-brand-500" />
              <div>
                <span className="block text-gray-400 text-xs">수강인원</span>
                <span className="font-bold">선착순 15명 정원</span>
              </div>
            </div>
          </div>

          {/* Curriculum Checklist */}
          <div>
            <h3 className="text-base font-bold text-gray-900 mb-3">핵심 수강 혜택</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              {[
                '전문가 1:1 창업 컨설팅 및 매장 메뉴판 피드백 1회 제공',
                '한국외식창업교육원 수료증 발급 및 자격시험 가산점 부여',
                '수강생 전용 창업 네트워킹 커뮤니티 및 정보 공유방 무료 입장',
                '실습 레시피북 및 원가 계산 excel 템플릿 기본 제공',
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Pricing & Register Action */}
          <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-4">
            <div>
              <span className="block text-xs text-gray-400 font-medium">수강료 (재료비 포함)</span>
              <span className="text-xl sm:text-2xl font-black text-brand-600 tracking-tight">
                {course.price}
              </span>
            </div>
            <button
              onClick={() => setApplied(true)}
              disabled={applied}
              className={`px-6 py-3 rounded-xl text-base font-bold transition-all shadow-md ${
                applied
                  ? 'bg-emerald-500 text-white cursor-default'
                  : 'bg-brand-500 hover:bg-brand-600 text-white shadow-brand-500/20'
              }`}
            >
              {applied ? '수강 신청 완료!' : '수강 신청하기'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
