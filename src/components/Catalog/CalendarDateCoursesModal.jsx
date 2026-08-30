import React, { useState } from 'react';
import { X, Calendar as CalendarIcon, Clock, User, CheckCircle2, Sparkles, ChevronRight, Award, GraduationCap, ShieldCheck } from 'lucide-react';

export default function CalendarDateCoursesModal({
  isOpen,
  dayNum,
  dateStr,
  matchedCourses = [],
  allCourses = [],
  onClose,
  onSelectCourseForModal,
}) {
  const [enrollingCourse, setEnrollingCourse] = useState(null);
  const [enrollForm, setEnrollForm] = useState({
    name: '',
    phone: '',
    email: '',
    experience: '신규 창업 준비생',
    note: '',
  });
  const [enrollSuccess, setEnrollSuccess] = useState(false);

  if (!isOpen) return null;

  const displayCourses = matchedCourses.length > 0 ? matchedCourses : allCourses.slice(0, 3);
  const isFallback = matchedCourses.length === 0;

  const handleEnrollSubmit = (e) => {
    e.preventDefault();
    if (!enrollForm.name || !enrollForm.phone) {
      alert('성함과 연락처를 입력해 주세요.');
      return;
    }

    setEnrollSuccess(true);
    setTimeout(() => {
      alert(`🎉 [${enrollingCourse.title}] 수강 신청 접수가 완료되었습니다.\n담담 연구원이 24시간 이내 연락처(${enrollForm.phone})로 안내 문자를 발송합니다.`);
      setEnrollSuccess(false);
      setEnrollingCourse(null);
      onClose();
    }, 1500);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl transition-all border border-gray-200 max-h-[90vh] flex flex-col cursor-default"
      >
        {/* Modal Header */}
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
              <CalendarIcon className="w-3.5 h-3.5" />
              <span>2026년 9월 학사 일정 및 수강 신청</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-2">
              <span>{dateStr || `2026년 9월 ${dayNum}일`}</span>
              <span className="text-[#D4AF37] text-lg font-bold">강의 일정</span>
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100/80 font-bold">
              {isFallback
                ? '선택하신 일자에는 개강 예정 과정이 없으나, 모집 중인 추천 인기 특화 과정을 바로 신청하실 수 있습니다.'
                : '선택하신 일자에 개강 및 수업이 진행되는 특화 자격증 과정을 확인하고 원클릭 수강 신청을 진행하세요.'}
            </p>
          </div>
        </div>

        {/* Modal Main Body */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto flex-1">
          {/* ENROLLMENT SUB-FORM MODAL VIEW IF USER CLICKED APPLY */}
          {enrollingCourse ? (
            <div className="bg-emerald-50/70 p-6 sm:p-7 rounded-3xl border-2 border-[#0B3C26] space-y-5 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-emerald-200 pb-4">
                <div>
                  <span className="text-xs font-bold text-[#0B3C26] bg-emerald-100 px-3 py-1 rounded-full">
                    원클릭 수강 신청
                  </span>
                  <h3 className="text-xl font-black text-gray-900 mt-1">
                    {enrollingCourse.title}
                  </h3>
                  <p className="text-xs text-gray-600 font-bold mt-0.5">
                    {enrollingCourse.instructor || '명장 전수 강좌'} · 수강료 {enrollingCourse.priceFormatted || `${enrollingCourse.price?.toLocaleString()}원`}
                  </p>
                </div>
                <button
                  onClick={() => setEnrollingCourse(null)}
                  className="text-xs font-bold text-gray-500 hover:text-gray-900 underline cursor-pointer"
                >
                  목록으로 돌아가기
                </button>
              </div>

              {enrollSuccess ? (
                <div className="py-10 text-center space-y-3">
                  <div className="w-14 h-14 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-lg animate-bounce">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-black text-gray-900">수강 신청 처리 중...</h4>
                  <p className="text-xs text-gray-600 font-bold">잠시만 기다려주시면 접수가 완료됩니다.</p>
                </div>
              ) : (
                <form onSubmit={handleEnrollSubmit} className="space-y-4 text-xs font-bold">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 font-bold mb-1">신청자 성함 *</label>
                      <input
                        type="text"
                        required
                        placeholder="홍길동"
                        value={enrollForm.name}
                        onChange={(e) => setEnrollForm({ ...enrollForm, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-xl font-black text-gray-900 focus:outline-none focus:border-[#0B3C26]"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-bold mb-1">연락처 (휴대폰) *</label>
                      <input
                        type="tel"
                        required
                        placeholder="010-1234-5678"
                        value={enrollForm.phone}
                        onChange={(e) => setEnrollForm({ ...enrollForm, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-xl font-black text-gray-900 focus:outline-none focus:border-[#0B3C26]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-bold mb-1">창업 상태 및 관심 분야</label>
                    <select
                      value={enrollForm.experience}
                      onChange={(e) => setEnrollForm({ ...enrollForm, experience: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-xl font-black text-gray-900 focus:outline-none focus:border-[#0B3C26]"
                    >
                      <option value="신규 창업 준비생">신규 창업 준비생 (6개월 이내 오픈)</option>
                      <option value="기존 업종 변경/재창업">기존 업종 변경 / 재창업 희망자</option>
                      <option value="수제간식/펫창업">펫푸드 & 수제간식 전문 창업</option>
                      <option value="반려견 행동교정">반려견 행동교정 코칭 자격증</option>
                      <option value="단순 취미/역량강화">단순 수강 및 자격증 취득 목적</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-bold mb-1">상담 희망사항 / 메모 (선택)</label>
                    <textarea
                      rows={2}
                      placeholder="국비지원 가능 여부 및 주말반 개설 문의 등..."
                      value={enrollForm.note}
                      onChange={(e) => setEnrollForm({ ...enrollForm, note: e.target.value })}
                      className="w-full p-3 bg-white border border-gray-300 rounded-xl font-medium text-gray-900 focus:outline-none focus:border-[#0B3C26] resize-none"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setEnrollingCourse(null)}
                      className="px-5 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold rounded-xl"
                    >
                      취소
                    </button>
                    <button
                      type="submit"
                      className="px-7 py-2.5 bg-[#0B3C26] hover:bg-[#072819] text-white font-extrabold rounded-xl shadow-lg border border-[#C5A059] flex items-center gap-2 cursor-pointer"
                    >
                      <span>수강 신청 접수 완료</span>
                      <ChevronRight className="w-4 h-4 text-[#D4AF37]" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          ) : (
            /* COURSES LIST FOR SELECTED DATE */
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-black text-gray-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#0B3C26]" />
                  <span>
                    {isFallback ? '개강 추천 인기 수강 과정' : `9월 ${dayNum}일 수강 및 개강 강좌 목록 (${matchedCourses.length}건)`}
                  </span>
                </h3>
                <span className="text-xs text-gray-500 font-bold">선착순 15명 정원 마감 임박</span>
              </div>

              <div className="space-y-4">
                {displayCourses.map((c, idx) => (
                  <div
                    key={c.id || idx}
                    className="group bg-white rounded-2xl border-2 border-gray-200 hover:border-[#0B3C26] p-4 sm:p-5 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row items-center justify-between gap-4"
                  >
                    {/* Course Image & Main Info */}
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                      <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-black shrink-0 relative border border-gray-200">
                        <img
                          src={c.image}
                          alt={c.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                        <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-black/80 text-white text-[10px] font-bold">
                          {c.categoryName || c.industry || '인기과정'}
                        </span>
                      </div>

                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 bg-emerald-100 text-[#0B3C26] text-[10px] font-black rounded border border-emerald-300">
                            {c.startDate ? `${c.startDate} 개강` : '9월 개강'}
                          </span>
                          <span className="text-xs font-bold text-gray-500">
                            {c.instructor || '안형상 명장 전수'}
                          </span>
                        </div>

                        <h4 className="text-base sm:text-lg font-black text-gray-900 group-hover:text-[#0B3C26] transition-colors leading-snug">
                          {c.title}
                        </h4>

                        <p className="text-xs text-gray-600 font-medium line-clamp-1">
                          {c.description || '외식창업 실무 레시피 및 매장 운영 전수'}
                        </p>

                        <div className="flex items-center gap-3 pt-1 text-xs font-extrabold text-gray-900">
                          <span className="text-emerald-800 text-sm sm:text-base font-black">
                            {c.priceFormatted || (c.price ? `${c.price.toLocaleString()}원` : '234,000원')}
                          </span>
                          {c.discountRate && (
                            <span className="text-rose-600 text-xs font-bold bg-rose-50 px-2 py-0.5 rounded">
                              {c.discountRate} 할인
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Right Action Buttons */}
                    <div className="flex sm:flex-col items-center gap-2 w-full sm:w-auto shrink-0 justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                      <button
                        onClick={() => setEnrollingCourse(c)}
                        className="flex-1 sm:flex-initial px-5 py-2.5 bg-[#0B3C26] hover:bg-[#072819] text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-[#C5A059] whitespace-nowrap min-h-[44px]"
                      >
                        <span>⚡ 바로 수강 신청</span>
                        <ChevronRight className="w-4 h-4 text-[#D4AF37]" />
                      </button>

                      <button
                        onClick={() => {
                          onClose();
                          onSelectCourseForModal && onSelectCourseForModal(c);
                        }}
                        className="flex-1 sm:flex-initial px-4 py-2 bg-white hover:bg-gray-100 text-gray-800 font-bold text-xs rounded-xl border border-gray-300 transition-colors whitespace-nowrap min-h-[40px]"
                      >
                        📖 커리큘럼 보기
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Guarantee Notice */}
        <div className="bg-gray-50 p-4 px-6 border-t border-gray-200 flex items-center justify-between text-xs text-gray-600 font-bold shrink-0">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#0B3C26]" />
            <span>(사)한국외식창업교육원 정식 인증 자격 연계 과정</span>
          </div>
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
