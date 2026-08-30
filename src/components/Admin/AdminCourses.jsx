import React, { useState } from 'react';
import { Plus, Search, Filter, Edit, Trash2, Tag, Check, X, GraduationCap, Sparkles } from 'lucide-react';

export default function AdminCourses() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [editingCourse, setEditingCourse] = useState(null);

  const [courses, setCourses] = useState([
    {
      id: 'CRS-001',
      category: 'full-package',
      categoryName: '풀 패키지',
      title: '외식창업 마스터 풀 패키지',
      instructor: '안형상 이사장 외 명장진',
      price: '1,200,000원',
      discount: '20% OFF',
      status: '운영중',
      studentsCount: 142,
    },
    {
      id: 'CRS-002',
      category: 'full-package',
      categoryName: '풀 패키지',
      title: '메뉴개발·원가관리 풀 패키지',
      instructor: '김서연 명인 / 박지훈 셰프',
      price: '980,000원',
      discount: '15% OFF',
      status: '운영중',
      studentsCount: 98,
    },
    {
      id: 'CRS-003',
      category: 'behavior',
      categoryName: '행동교정',
      title: '반려견 행동 이해·상담 입문',
      instructor: '김서연 전문원장',
      price: '120,000원',
      discount: '20% OFF',
      status: '운영중',
      studentsCount: 64,
    },
    {
      id: 'CRS-004',
      category: 'petfood',
      categoryName: '펫푸드',
      title: '반려동물 영양·식재료 기초',
      instructor: '김서연 영양사',
      price: '120,000원',
      discount: '20% OFF',
      status: '운영중',
      studentsCount: 81,
    },
    {
      id: 'CRS-005',
      category: 'startup',
      categoryName: '창업전략',
      title: '창업기획·사업계획 수립 마스터',
      instructor: '김서연 이사',
      price: '120,000원',
      discount: '20% OFF',
      status: '운영중',
      studentsCount: 67,
    },
    {
      id: 'CRS-006',
      category: 'netflix',
      categoryName: '인기 클래스',
      title: '성공적인 카페 & 음료 매장 창업 마스터클래스',
      instructor: '안형상 이사장 직강',
      price: '150,000원',
      discount: 'NEW',
      status: '모집중',
      studentsCount: 45,
    },
  ]);

  const filteredCourses = courses.filter((c) => {
    const matchesSearch = c.title.includes(searchTerm) || c.instructor.includes(searchTerm);
    const matchesCat = categoryFilter === 'all' || c.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  const handleDelete = (id) => {
    if (window.confirm('정말로 이 교육과정을 목록에서 삭제하시겠습니까?')) {
      setCourses(courses.filter((c) => c.id !== id));
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#111c16] p-6 rounded-3xl border border-emerald-500/20 shadow-xl">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            교육과정 & 풀 패키지 상품 관리
          </h2>
          <p className="text-xs sm:text-sm text-emerald-200/70 font-medium mt-1">
            메인 페이지 및 전체 카탈로그에 등록된 수강 과목의 가격, 수강료 할인, 개설 상태를 관리합니다.
          </p>
        </div>

        <button
          onClick={() => alert('신규 교육과정 등록 모달이 열립니다.')}
          className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg transition-all shrink-0 cursor-pointer flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>신규 교육과정 등록</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#0e1712] p-4 rounded-2xl border border-emerald-900/60">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="과정명 또는 강사명으로 검색..."
            className="w-full bg-[#16241c] border border-emerald-500/30 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-white placeholder-emerald-800/60 focus:outline-none focus:border-emerald-400"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto no-scrollbar">
          <Filter className="w-4 h-4 text-emerald-400 shrink-0" />
          {[
            { id: 'all', name: '전체' },
            { id: 'full-package', name: '풀 패키지' },
            { id: 'behavior', name: '행동교정' },
            { id: 'petfood', name: '펫푸드' },
            { id: 'startup', name: '창업전략' },
            { id: 'netflix', name: '인기 클래스' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                categoryFilter === cat.id
                  ? 'bg-emerald-500 text-white shadow-md'
                  : 'bg-[#16241c] text-gray-300 hover:bg-emerald-950 hover:text-emerald-300'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Courses Table */}
      <div className="bg-[#111c16] rounded-3xl p-6 border border-emerald-500/20 shadow-xl">
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left border-collapse min-w-[750px]">
            <thead>
              <tr className="text-xs font-black text-emerald-400/80 border-b border-emerald-900/40">
                <th className="pb-3 px-3">과정 ID</th>
                <th className="pb-3 px-3">카테고리</th>
                <th className="pb-3 px-3">교육 과정명</th>
                <th className="pb-3 px-3">담당 명인 / 강사</th>
                <th className="pb-3 px-3">수강료</th>
                <th className="pb-3 px-3">할인/혜택</th>
                <th className="pb-3 px-3">수강생 수</th>
                <th className="pb-3 px-3 text-center">관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-900/30 text-xs sm:text-sm font-semibold text-gray-200">
              {filteredCourses.map((c) => (
                <tr key={c.id} className="hover:bg-emerald-950/40 transition-colors">
                  <td className="py-3.5 px-3 font-mono text-xs text-gray-400">{c.id}</td>
                  <td className="py-3.5 px-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-black">
                      {c.categoryName}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 font-black text-white">{c.title}</td>
                  <td className="py-3.5 px-3 text-gray-300">{c.instructor}</td>
                  <td className="py-3.5 px-3 font-black text-emerald-300">{c.price}</td>
                  <td className="py-3.5 px-3">
                    <span className="px-2 py-0.5 bg-rose-500/20 text-rose-300 rounded-md text-xs font-bold">
                      {c.discount}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 font-bold text-gray-300">{c.studentsCount} 명</td>
                  <td className="py-3.5 px-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => alert(`[${c.title}] 정보 수정 모달이 열립니다.`)}
                        className="p-1.5 rounded-lg bg-emerald-900/40 hover:bg-emerald-800 text-emerald-300 transition-colors cursor-pointer"
                        title="수정"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(c.id)}
                        className="p-1.5 rounded-lg bg-rose-900/40 hover:bg-rose-800 text-rose-300 transition-colors cursor-pointer"
                        title="삭제"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
