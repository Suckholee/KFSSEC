import React, { useState } from 'react';
import { X, Plus, Trash2, CheckCircle2, GraduationCap, DollarSign, Calendar, BookOpen, ShieldAlert } from 'lucide-react';
import { maskName, maskPhone, maskEmail } from '../../utils/security';

export default function StudentCourseModal({ student, isOpen, onClose, onUpdateStudentCourses, allAvailableCourses, privacyMode }) {
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [newCourseStatus, setNewCourseStatus] = useState('결제완료');

  if (!isOpen || !student) return null;

  // Available courses not yet enrolled by this student
  const availableToAdd = allAvailableCourses.filter(
    (ac) => !student.enrolledCourses.some((ec) => ec.courseId === ac.id)
  );

  const handleAddCourse = (e) => {
    e.preventDefault();
    if (!selectedCourseId) return;

    const courseObj = allAvailableCourses.find((c) => c.id === selectedCourseId);
    if (!courseObj) return;

    const newEnrollment = {
      courseId: courseObj.id,
      courseTitle: courseObj.title,
      categoryName: courseObj.categoryName,
      price: courseObj.price,
      enrolledDate: new Date().toISOString().slice(0, 10),
      status: newCourseStatus,
    };

    const updatedCourses = [...student.enrolledCourses, newEnrollment];
    onUpdateStudentCourses(student.id, updatedCourses);
    setSelectedCourseId('');
  };

  const handleRemoveCourse = (courseId) => {
    if (student.enrolledCourses.length <= 1) {
      alert('수강생은 최소 1개 이상의 수강과목이 등록되어 있어야 합니다.');
      return;
    }
    if (window.confirm('해당 수강과목을 수강생 매칭 목록에서 제거하시겠습니까?')) {
      const updatedCourses = student.enrolledCourses.filter((ec) => ec.courseId !== courseId);
      onUpdateStudentCourses(student.id, updatedCourses);
    }
  };

  const handleStatusChange = (courseId, newStatus) => {
    const updatedCourses = student.enrolledCourses.map((ec) =>
      ec.courseId === courseId ? { ...ec, status: newStatus } : ec
    );
    onUpdateStudentCourses(student.id, updatedCourses);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-[#0d1712] rounded-3xl border border-emerald-500/40 p-6 sm:p-8 shadow-2xl space-y-6 text-white max-h-[90vh] overflow-y-auto no-scrollbar">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-gray-400 hover:text-white rounded-full hover:bg-emerald-950/60 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-900/60 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-black">
                STUDENT N:N CURRICULUM PORTFOLIO
              </span>
              <span className="text-xs text-gray-400 font-mono">{student.id}</span>
            </div>
            <h2 className="text-2xl font-black text-white">
              {privacyMode ? maskName(student.name) : student.name} 수강생 N:N 커리큘럼 매칭
            </h2>
            <p className="text-xs text-emerald-300/80 font-medium">
              연락처: <span className="font-mono text-emerald-200">{privacyMode ? maskPhone(student.phone) : student.phone}</span> | 이메일: <span className="font-mono text-emerald-200">{privacyMode ? maskEmail(student.email) : student.email}</span>
            </p>
          </div>

          <div className="bg-emerald-950 px-4 py-2.5 rounded-2xl border border-emerald-500/30 text-center shrink-0">
            <span className="text-[11px] text-gray-400 font-bold block">총 수강 등록 과목</span>
            <span className="text-xl font-black text-emerald-400">{student.enrolledCourses.length} 개 과목</span>
          </div>
        </div>

        {/* N:N Enrolled Courses Table */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black text-emerald-300 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-400" />
              <span>현재 수강 등록 및 매칭된 교육과정 목록 ({student.enrolledCourses.length})</span>
            </h3>
          </div>

          <div className="bg-[#111c16] rounded-2xl border border-emerald-500/20 overflow-hidden shadow-lg">
            <table className="w-full text-left border-collapse min-w-[550px]">
              <thead>
                <tr className="text-xs font-black text-emerald-400/80 border-b border-emerald-900/40 bg-emerald-950/40">
                  <th className="py-3 px-3">카테고리</th>
                  <th className="py-3 px-3">교육 과정명</th>
                  <th className="py-3 px-3">수강료</th>
                  <th className="py-3 px-3">등록일</th>
                  <th className="py-3 px-3 text-center">진행 상태</th>
                  <th className="py-3 px-3 text-center">제거</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-900/30 text-xs sm:text-sm font-semibold text-gray-200">
                {student.enrolledCourses.map((ec) => (
                  <tr key={ec.courseId} className="hover:bg-emerald-950/40 transition-colors">
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-black">
                        {ec.categoryName || '풀패키지'}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-black text-white">{ec.courseTitle}</td>
                    <td className="py-3 px-3 font-black text-emerald-300">{ec.price}</td>
                    <td className="py-3 px-3 text-xs text-gray-400 font-mono">{ec.enrolledDate}</td>
                    <td className="py-3 px-3 text-center">
                      <select
                        value={ec.status}
                        onChange={(e) => handleStatusChange(ec.courseId, e.target.value)}
                        className="px-2.5 py-1 rounded-xl text-xs font-black border bg-[#122219] border-emerald-500/40 text-emerald-300 cursor-pointer focus:outline-none"
                      >
                        <option value="결제완료">결제완료</option>
                        <option value="상담대기">상담대기</option>
                        <option value="신청완료">신청완료</option>
                        <option value="수강중">수강중</option>
                        <option value="취소">취소</option>
                      </select>
                    </td>
                    <td className="py-3 px-3 text-center">
                      <button
                        onClick={() => handleRemoveCourse(ec.courseId)}
                        className="p-1.5 rounded-lg bg-rose-900/40 hover:bg-rose-800 text-rose-300 transition-colors cursor-pointer"
                        title="과정 매칭 제거"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add New Course to Student Form */}
        <div className="bg-[#16241c] rounded-2xl p-5 border border-emerald-500/30 space-y-4">
          <h3 className="text-sm font-black text-white flex items-center gap-2">
            <Plus className="w-4 h-4 text-emerald-400" />
            <span>+ 신규 수강과목 추가 매칭 (N:N 확장)</span>
          </h3>

          <form onSubmit={handleAddCourse} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
            <div className="sm:col-span-6 space-y-1">
              <label className="text-xs font-bold text-emerald-300">추가할 교육과정 선택</label>
              <select
                value={selectedCourseId}
                onChange={(e) => setSelectedCourseId(e.target.value)}
                className="w-full bg-[#0d1712] border border-emerald-500/40 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-400 font-bold"
              >
                <option value="">-- 추가할 과목을 선택하세요 ({availableToAdd.length}개 선택 가능) --</option>
                {availableToAdd.map((ac) => (
                  <option key={ac.id} value={ac.id}>
                    [{ac.categoryName}] {ac.title} ({ac.price})
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-3 space-y-1">
              <label className="text-xs font-bold text-emerald-300">수강 상태</label>
              <select
                value={newCourseStatus}
                onChange={(e) => setNewCourseStatus(e.target.value)}
                className="w-full bg-[#0d1712] border border-emerald-500/40 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-400 font-bold"
              >
                <option value="결제완료">결제완료</option>
                <option value="상담대기">상담대기</option>
                <option value="신청완료">신청완료</option>
                <option value="수강중">수강중</option>
              </select>
            </div>

            <div className="sm:col-span-3">
              <button
                type="submit"
                disabled={!selectedCourseId}
                className="w-full py-2 bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-700 disabled:text-gray-500 text-white font-black text-xs sm:text-sm rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>과목 매칭 추가</span>
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}
