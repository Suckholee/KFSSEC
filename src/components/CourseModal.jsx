import React, { useState, useEffect } from 'react';
import { X, Clock, BookOpen, Star, User, CheckCircle2 } from 'lucide-react';

export default function CourseModal({ course, onClose }) {
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    if (!course) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [course, onClose]);

  if (!course) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm animate-fadeIn cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl transition-all border border-gray-100 max-h-[90vh] flex flex-col cursor-default"
      >
        
        {/* Header Image & Close Button */}
        <div className="relative h-56 sm:h-64 bg-gray-900 shrink-0">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#062d1b]/90 via-black/40 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition-colors cursor-pointer"
            title="닫기 (ESC)"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6 text-white">
            <span className="px-2.5 py-1 text-xs font-black rounded-md tracking-wider uppercase inline-block mb-2 bg-emerald-600 text-white">
              {course.badge || course.categoryName || '인기과정'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {course.title}
            </h2>
            <div className="flex items-center gap-3 text-xs sm:text-sm text-emerald-100 mt-2 font-medium">
              <div className="flex items-center gap-1 text-amber-400 font-bold">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{course.rating || 4.9}</span>
              </div>
              <span>•</span>
              <span>{course.instructor || '안형상 이사장 / 40년 명장'}</span>
            </div>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto">
          <div>
            <h3 className="text-base font-bold text-gray-900 mb-2">과정 소개 및 교육 내용</h3>
            <p className="text-sm text-gray-700 leading-relaxed font-medium whitespace-pre-wrap bg-stone-50 p-4 rounded-2xl border border-stone-200">
              {course.description}
            </p>
          </div>

          {/* Quick Specs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100 text-xs sm:text-sm">
            <div className="flex items-center gap-2 text-gray-700">
              <Clock className="w-4 h-4 text-emerald-600" />
              <div>
                <span className="block text-gray-400 text-xs">개강일 / 기간</span>
                <span className="font-bold">{course.startDate || course.duration}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <BookOpen className="w-4 h-4 text-emerald-600" />
              <div>
                <span className="block text-gray-400 text-xs">자격증</span>
                <span className="font-bold text-[11px]">{course.certName || '자격증 검정 연계'}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-700 col-span-2 sm:col-span-1">
              <User className="w-4 h-4 text-emerald-600" />
              <div>
                <span className="block text-gray-400 text-xs">수강인원</span>
                <span className="font-bold">선착순 15명 정원</span>
              </div>
            </div>
          </div>

          {/* Curriculum Checklist */}
          <div>
            <h3 className="text-base font-bold text-gray-900 mb-3">핵심 수강 혜택</h3>
            <ul className="space-y-2 text-sm text-gray-700 font-medium">
              {[
                '전문가 1:1 창업 컨설팅 및 매장 메뉴판 피드백 1회 제공',
                '사단법인 한국외식창업교육원 수료증 발급 및 자격시험 가산점 부여',
                '수강생 전용 창업 네트워킹 커뮤니티 및 정보 공유방 무료 입장',
                '실습 레시피북 및 원가 계산 excel 템플릿 기본 제공',
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Pricing & Register Action */}
          <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-4">
            <div>
              <span className="block text-xs text-gray-400 font-medium">수강료 (재료비 포함)</span>
              <span className="text-xl sm:text-2xl font-black text-emerald-700 tracking-tight">
                {course.priceFormatted || (course.price ? `${course.price.toLocaleString()}원` : '4,500,000원')}
              </span>
            </div>
            <button
              onClick={() => setApplied(true)}
              disabled={applied}
              className={`px-6 py-3 rounded-xl text-base font-bold transition-all shadow-md cursor-pointer ${
                applied
                  ? 'bg-emerald-700 text-white cursor-default'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20'
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
