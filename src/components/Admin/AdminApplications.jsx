import React, { useState } from 'react';
import { Search, Filter, Phone, CheckCircle2, Clock, XCircle, CreditCard, ChevronDown, Download, Eye, EyeOff, Shield, BookOpen, Layers, Plus } from 'lucide-react';
import { maskName, maskPhone, maskEmail, maskId } from '../../utils/security';
import StudentCourseModal from './StudentCourseModal';

export default function AdminApplications() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [privacyMode, setPrivacyMode] = useState(true);
  const [selectedStudentForModal, setSelectedStudentForModal] = useState(null);

  // Available Master Courses Database for N:N Matching
  const allAvailableCourses = [
    { id: 'CRS-001', title: '외식창업 마스터 풀 패키지', categoryName: '풀 패키지', price: '1,200,000원' },
    { id: 'CRS-002', title: '메뉴개발·원가관리 풀 패키지', categoryName: '풀 패키지', price: '980,000원' },
    { id: 'CRS-003', title: '매장운영·서비스 풀 패키지', categoryName: '풀 패키지', price: '950,000원' },
    { id: 'CRS-004', title: '외식마케팅·프랜차이즈 풀 패키지', categoryName: '풀 패키지', price: '1,100,000원' },
    { id: 'CRS-005', title: '반려견 행동 이해·상담 입문', categoryName: '행동교정', price: '120,000원' },
    { id: 'CRS-006', title: '반려동물 영양·식재료 기초', categoryName: '펫푸드', price: '120,000원' },
    { id: 'CRS-007', title: '창업기획·사업계획 수립 마스터', categoryName: '창업전략', price: '120,000원' },
    { id: 'CRS-008', title: '성공적인 카페 & 음료 매장 창업 마스터클래스', categoryName: '인기 클래스', price: '150,000원' },
  ];

  // N:N Students Database with Multiple Enrolled Courses
  const [students, setStudents] = useState([
    {
      id: 'APP-2026-089',
      name: '김창업',
      phone: '010-3849-8120',
      email: 'changup.kim@gmail.com',
      enrolledCourses: [
        { courseId: 'CRS-001', courseTitle: '외식창업 마스터 풀 패키지', categoryName: '풀 패키지', price: '1,200,000원', enrolledDate: '2026-08-30', status: '결제완료' },
        { courseId: 'CRS-002', courseTitle: '메뉴개발·원가관리 풀 패키지', categoryName: '풀 패키지', price: '980,000원', enrolledDate: '2026-08-28', status: '수강중' },
      ],
    },
    {
      id: 'APP-2026-088',
      name: '이수진',
      phone: '010-9281-3019',
      email: 'sujin.lee@naver.com',
      enrolledCourses: [
        { courseId: 'CRS-006', courseTitle: '반려동물 영양·식재료 기초', categoryName: '펫푸드', price: '120,000원', enrolledDate: '2026-08-30', status: '상담대기' },
        { courseId: 'CRS-005', courseTitle: '반려견 행동 이해·상담 입문', categoryName: '행동교정', price: '120,000원', enrolledDate: '2026-08-29', status: '결제완료' },
        { courseId: 'CRS-007', courseTitle: '창업기획·사업계획 수립 마스터', categoryName: '창업전략', price: '120,000원', enrolledDate: '2026-08-25', status: '수강중' },
      ],
    },
    {
      id: 'APP-2026-087',
      name: '박재민',
      phone: '010-4720-9102',
      email: 'jaemin.park@gmail.com',
      enrolledCourses: [
        { courseId: 'CRS-008', courseTitle: '성공적인 카페 & 음료 매장 창업 마스터클래스', categoryName: '인기 클래스', price: '150,000원', enrolledDate: '2026-08-30', status: '신청완료' },
      ],
    },
    {
      id: 'APP-2026-086',
      name: '최명진',
      phone: '010-5821-4910',
      email: 'myungjin.choi@kakao.com',
      enrolledCourses: [
        { courseId: 'CRS-007', courseTitle: '창업기획·사업계획 수립 마스터', categoryName: '창업전략', price: '120,000원', enrolledDate: '2026-08-30', status: '결제완료' },
        { courseId: 'CRS-004', courseTitle: '외식마케팅·프랜차이즈 풀 패키지', categoryName: '풀 패키지', price: '1,100,000원', enrolledDate: '2026-08-27', status: '수강중' },
      ],
    },
    {
      id: 'APP-2026-085',
      name: '정현우',
      phone: '010-1849-9301',
      email: 'hyunwoo.jung@naver.com',
      enrolledCourses: [
        { courseId: 'CRS-002', courseTitle: '메뉴개발·원가관리 풀 패키지', categoryName: '풀 패키지', price: '980,000원', enrolledDate: '2026-08-29', status: '상담대기' },
      ],
    },
  ]);

  const filteredStudents = students.filter((st) => {
    const matchesSearch =
      st.name.includes(searchTerm) ||
      st.phone.includes(searchTerm) ||
      st.enrolledCourses.some((c) => c.courseTitle.includes(searchTerm));
    const matchesStatus =
      statusFilter === 'all' || st.enrolledCourses.some((c) => c.status === statusFilter);
    return matchesSearch && matchesStatus;
  });

  const handleUpdateStudentCourses = (studentId, updatedCourses) => {
    setStudents(
      students.map((st) => (st.id === studentId ? { ...st, enrolledCourses: updatedCourses } : st))
    );
    if (selectedStudentForModal && selectedStudentForModal.id === studentId) {
      setSelectedStudentForModal((prev) => ({ ...prev, enrolledCourses: updatedCourses }));
    }
  };

  const calculateTotalTuition = (courses) => {
    let total = 0;
    courses.forEach((c) => {
      const numStr = c.price.replace(/[^0-9]/g, '');
      if (numStr) total += parseInt(numStr, 10);
    });
    return total.toLocaleString() + '원';
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#111c16] p-6 rounded-3xl border border-emerald-500/20 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-black text-white">
              실시간 수강 신청 & N:N 커리큘럼 매칭 관리
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-black">
              N:N MULTI-MATCHING
            </span>
          </div>
          <p className="text-xs sm:text-sm text-emerald-200/70 font-medium mt-1">
            한 수강생이 복수의 외식창업 교육과정을 병행 수강할 수 있도록 N:N 커리큘럼 매칭을 지원합니다.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 self-start sm:self-auto">
          {/* Privacy Toggle Button */}
          <button
            onClick={() => setPrivacyMode(!privacyMode)}
            className={`px-3.5 py-2.5 rounded-xl text-xs font-extrabold border transition-all flex items-center gap-1.5 cursor-pointer ${
              privacyMode
                ? 'bg-emerald-950 text-emerald-300 border-emerald-500/40'
                : 'bg-rose-950/60 text-rose-300 border-rose-500/40'
            }`}
            title="개인정보 마스킹 켜기/끄기"
          >
            {privacyMode ? <EyeOff className="w-4 h-4 text-emerald-400" /> : <Eye className="w-4 h-4 text-rose-400" />}
            <span>{privacyMode ? '개인정보 마스킹 작동중' : '마스킹 해제됨'}</span>
          </button>

          <button
            onClick={() => alert('Excel 수강생 N:N 매칭 명단 다운로드가 진행됩니다.')}
            className="px-5 py-2.5 bg-[#162a20] hover:bg-emerald-900 border border-emerald-500/30 text-emerald-300 font-bold text-xs sm:text-sm rounded-xl shadow-lg transition-all shrink-0 cursor-pointer flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>수강생 명단 엑셀 다운로드</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#0e1712] p-4 rounded-2xl border border-emerald-900/60">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="수강생 성함, 전화번호, 과목명 검색..."
            className="w-full bg-[#16241c] border border-emerald-500/30 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-white placeholder-emerald-800/60 focus:outline-none focus:border-emerald-400"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto no-scrollbar">
          <Filter className="w-4 h-4 text-emerald-400 shrink-0" />
          {['all', '결제완료', '상담대기', '신청완료', '수강중', '취소'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                statusFilter === st
                  ? 'bg-emerald-500 text-white shadow-md'
                  : 'bg-[#16241c] text-gray-300 hover:bg-emerald-950 hover:text-emerald-300'
              }`}
            >
              {st === 'all' ? '전체 보기' : st}
            </button>
          ))}
        </div>
      </div>

      {/* N:N Student & Enrolled Courses Table */}
      <div className="bg-[#111c16] rounded-3xl p-6 border border-emerald-500/20 shadow-xl">
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left border-collapse min-w-[850px]">
            <thead>
              <tr className="text-xs font-black text-emerald-400/80 border-b border-emerald-900/40">
                <th className="pb-3 px-3">수강생 ID</th>
                <th className="pb-3 px-3">수강생명</th>
                <th className="pb-3 px-3">연락처 / 이메일</th>
                <th className="pb-3 px-3">N:N 매칭 수강 과목 목록</th>
                <th className="pb-3 px-3">총 결제 금액</th>
                <th className="pb-3 px-3 text-center">N:N 매칭 관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-900/30 text-xs sm:text-sm font-semibold text-gray-200">
              {filteredStudents.map((st) => (
                <tr key={st.id} className="hover:bg-emerald-950/40 transition-colors">
                  <td className="py-3.5 px-3 font-mono text-xs text-gray-400">
                    {privacyMode ? maskId(st.id) : st.id}
                  </td>
                  <td className="py-3.5 px-3 font-black text-white">
                    {privacyMode ? maskName(st.name) : st.name}
                  </td>
                  <td className="py-3.5 px-3">
                    <div className="text-xs">
                      <span className="font-bold text-emerald-300 block">
                        {privacyMode ? maskPhone(st.phone) : st.phone}
                      </span>
                      <span className="text-gray-400 text-[11px]">
                        {privacyMode ? maskEmail(st.email) : st.email}
                      </span>
                    </div>
                  </td>
                  
                  {/* N:N Multiple Enrolled Courses Badges Column */}
                  <td className="py-3.5 px-3">
                    <div className="space-y-1.5 max-w-md">
                      {st.enrolledCourses.map((c, cIdx) => (
                        <div key={c.courseId} className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-lg bg-emerald-950 text-emerald-200 border border-emerald-500/30 text-xs font-bold truncate">
                            [{c.categoryName}] {c.courseTitle}
                          </span>
                          <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 text-[10px] font-black shrink-0">
                            {c.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </td>

                  <td className="py-3.5 px-3 font-black text-white">
                    {calculateTotalTuition(st.enrolledCourses)}
                  </td>

                  {/* N:N Course Manager Modal Trigger */}
                  <td className="py-3.5 px-3 text-center">
                    <button
                      onClick={() => setSelectedStudentForModal(st)}
                      className="px-3.5 py-1.5 bg-emerald-500/20 hover:bg-emerald-500 text-emerald-300 hover:text-white border border-emerald-500/40 rounded-xl text-xs font-black transition-all cursor-pointer shadow-sm flex items-center gap-1.5 mx-auto"
                    >
                      <Layers className="w-3.5 h-3.5" />
                      <span>수강 과목 N:N 관리 ({st.enrolledCourses.length})</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Interactive N:N Student Course Portfolio Modal */}
      <StudentCourseModal
        student={selectedStudentForModal}
        isOpen={Boolean(selectedStudentForModal)}
        onClose={() => setSelectedStudentForModal(null)}
        onUpdateStudentCourses={handleUpdateStudentCourses}
        allAvailableCourses={allAvailableCourses}
        privacyMode={privacyMode}
      />

    </div>
  );
}
