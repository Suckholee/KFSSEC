import React, { useState } from 'react';
import { X, Award, CheckCircle2, FileText, ShieldCheck, ChevronRight, Scale, BookOpen, Clock, UserCheck } from 'lucide-react';

export default function CertExamGuideModal({ isOpen, course, onClose, onApplyExam }) {
  const [applied, setApplied] = useState(false);

  if (!isOpen || !course) return null;

  const handleApply = () => {
    setApplied(true);
    setTimeout(() => {
      alert(`🎉 [${course.certName || '자격증 검정'}] 응시 접수가 완료되었습니다.\n검정위원회에서 접수 확인 문자를 발송합니다.`);
      setApplied(false);
      onClose();
    }, 1200);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl transition-all border border-gray-200 max-h-[92vh] flex flex-col cursor-default"
      >
        {/* Header */}
        <div className="bg-[#0B3C26] text-white p-6 sm:p-7 relative shrink-0 border-b border-[#C5A059]">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-black/30 hover:bg-black/60 text-white flex items-center justify-center transition-colors cursor-pointer"
            title="닫기 (ESC)"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C5A059]/20 border border-[#C5A059]/40 text-[#D4AF37] text-xs font-black">
              <Award className="w-3.5 h-3.5" />
              <span>사단법인 한국외식창업교육원 민간자격검정</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              {course.certName || '외식창업 전문 자격증 요강'}
            </h2>

            <p className="text-xs sm:text-sm text-emerald-100/80 font-bold">
              농림축산식품부 소관 비영리법인 정식 인가 자격검정 시행 요강 및 심사 평가표
            </p>
          </div>
        </div>

        {/* Modal Main Content */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto flex-1 text-xs sm:text-sm font-bold text-gray-800">
          
          {/* Quick Specs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#F8F6F0] p-4 rounded-2xl border border-[#E5E0D8]">
            <div>
              <span className="text-gray-500 block text-[11px]">검정 과목명</span>
              <span className="font-black text-gray-900">{course.title}</span>
            </div>
            <div>
              <span className="text-gray-500 block text-[11px]">자격 등록번호</span>
              <span className="font-mono font-black text-[#0B3C26]">제 2022-004819호</span>
            </div>
            <div>
              <span className="text-gray-500 block text-[11px]">검정 일자</span>
              <span className="font-mono font-black text-rose-700">{course.examDate || '2026-09-28'}</span>
            </div>
            <div>
              <span className="text-gray-500 block text-[11px]">합격 기준</span>
              <span className="font-black text-emerald-800">100점 만점 중 70점 이상</span>
            </div>
          </div>

          {/* Practical Exam Grading Rubric Table */}
          <div className="space-y-3">
            <h3 className="text-base font-black text-gray-900 flex items-center gap-2 border-b-2 border-[#0B3C26] pb-2">
              <Scale className="w-4 h-4 text-[#0B3C26]" />
              <span>실기 심사 평가 항목 및 배점 기준표</span>
            </h3>

            <div className="border border-gray-300 rounded-2xl overflow-hidden shadow-xs text-xs">
              <div className="grid grid-cols-12 bg-[#0B3C26] text-white font-black p-3 text-center">
                <div className="col-span-3">평가 분야</div>
                <div className="col-span-6">세부 심사 기준</div>
                <div className="col-span-3">배점</div>
              </div>

              <div className="divide-y divide-gray-200 bg-white">
                <div className="grid grid-cols-12 p-3 items-center">
                  <div className="col-span-3 font-black text-gray-900">레시피 및 원가계산</div>
                  <div className="col-span-6 text-gray-600 font-medium">재료 정량 계량, 식자재 원가 비율 산출 및 메뉴판 구성</div>
                  <div className="col-span-3 text-center font-mono font-black text-[#0B3C26]">20점</div>
                </div>

                <div className="grid grid-cols-12 p-3 items-center bg-stone-50/50">
                  <div className="col-span-3 font-black text-gray-900">조리 숙련도 & 테크닉</div>
                  <div className="col-span-6 text-gray-600 font-medium">불 조절, 웍 조리법, 칼질 숙련도 및 불맛 추출 기법</div>
                  <div className="col-span-3 text-center font-mono font-black text-[#0B3C26]">30점</div>
                </div>

                <div className="grid grid-cols-12 p-3 items-center">
                  <div className="col-span-3 font-black text-gray-900">플레이팅 및 완성도</div>
                  <div className="col-span-6 text-gray-600 font-medium">시각적 미분, 고명 세팅, 용기 담음새 및 판매 상품성</div>
                  <div className="col-span-3 text-center font-mono font-black text-[#0B3C26]">30점</div>
                </div>

                <div className="grid grid-cols-12 p-3 items-center bg-stone-50/50">
                  <div className="col-span-3 font-black text-gray-900">위생 & 관능 평가</div>
                  <div className="col-span-6 text-gray-600 font-medium">조리대 위생, 복장 규정, 조리 시간 준수 및 관능 시식</div>
                  <div className="col-span-3 text-center font-mono font-black text-[#0B3C26]">20점</div>
                </div>
              </div>
            </div>
          </div>

          {/* Exam Benefits & Certificate Sample Notice */}
          <div className="bg-emerald-50/70 p-5 rounded-2xl border border-emerald-200 space-y-3">
            <h4 className="font-black text-[#0B3C26] flex items-center gap-2 text-xs sm:text-sm">
              <ShieldCheck className="w-4 h-4 text-[#0B3C26]" />
              <span>자격증 취득 시 특전 혜택</span>
            </h4>
            <ul className="space-y-1.5 text-xs text-gray-700 font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#0B3C26] shrink-0" />
                <span>사단법인 한국외식창업교육원 창업 컨설팅 1:1 무상 우대</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#0B3C26] shrink-0" />
                <span>외식창업 명인 심사위원 추천 및 명인 사업단 멤버십 자격 부여</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#0B3C26] shrink-0" />
                <span>정부 지원금 및 소상공인 창업 지원 시 가산점 인정서 동봉</span>
              </li>
            </ul>
          </div>

          {/* Action CTA Bar */}
          <div className="pt-4 border-t border-gray-200 flex items-center justify-between gap-4">
            <div>
              <span className="block text-xs text-gray-500 font-bold">검정 응시료 (수강생 100% 면제)</span>
              <span className="text-xl font-black text-[#0B3C26]">0원 (수강 혜택 포함)</span>
            </div>

            <button
              onClick={handleApply}
              disabled={applied}
              className="px-6 py-3 bg-[#0B3C26] hover:bg-[#072819] text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer border border-[#C5A059]"
            >
              <span>{applied ? '접수 완료 중...' : '⚡ 자격증 응시 즉시 접수'}</span>
              <ChevronRight className="w-4 h-4 text-[#D4AF37]" />
            </button>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-gray-50 p-4 px-6 border-t border-gray-200 flex items-center justify-between text-xs text-gray-600 font-bold shrink-0">
          <span>주관: 사단법인 한국외식창업교육원 자격검정위원회</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors cursor-pointer"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
