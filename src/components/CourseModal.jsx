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

          {/* Weekly Detailed Curriculum Accordion */}
          <div className="space-y-3">
            <h3 className="text-base font-black text-gray-900 flex items-center justify-between">
              <span>주차별 상세 실습 커리큘럼</span>
              <span className="text-xs font-bold text-[#0B3C26] bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                100% 현장 실무 전수
              </span>
            </h3>

            <div className="space-y-2 text-xs sm:text-sm font-bold">
              {[
                { week: '1주차', title: '창업 기획 & 메뉴판 원가율 설계', desc: '식자재 마진 계산, 원가 산정 excel 표준 레시피북 수여 및 대표 메뉴 확정' },
                { week: '2주차', title: '시그니처 레시피 & 조리 테크닉 전수', desc: '특제 100년 발효 소스 염지법, 불맛 웍 조리법 및 핵심 비법 기술 1:1 도제식 전수' },
                { week: '3주차', title: '주방 동선 설계 & 동선 효율화', desc: '주방 설비 인허가 규정, 최단 동선 배치 및 수강생 매장 실전 동선 컨설팅' },
                { week: '4주차', title: '네이버 플레이스 공략 & 실기 심사', desc: '지역 상권 키워드 마케팅, 오픈 마케팅 바이럴 전수 및 사단법인 자격 실기 검정' },
              ].map((item, idx) => (
                <details key={idx} className="group bg-stone-50 rounded-xl border border-stone-200 overflow-hidden text-gray-800">
                  <summary className="p-3 font-black flex items-center justify-between cursor-pointer hover:bg-emerald-50/50 transition-colors select-none">
                    <span className="flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-[#0B3C26] text-white text-[10px] font-black rounded">
                        {item.week}
                      </span>
                      <span className="text-gray-900">{item.title}</span>
                    </span>
                    <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="p-3 pt-1 text-xs text-gray-600 font-medium leading-relaxed bg-white border-t border-stone-200">
                    {item.desc}
                  </div>
                </details>
              ))}
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
                  <CheckCircle2 className="w-4 h-4 text-[#0B3C26] shrink-0 mt-0.5" />
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
