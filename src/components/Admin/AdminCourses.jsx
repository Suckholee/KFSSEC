import React, { useState } from 'react';
import { Plus, Search, Filter, Edit, Trash2, LayoutGrid, List, Users, Sparkles, Tag, Eye } from 'lucide-react';
import CourseEditModal from './CourseEditModal';
import { calculateDiscount } from '../../utils/price';

export default function AdminCourses() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [viewMode, setViewMode] = useState('gallery'); // 'gallery' | 'list'
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedCourseForEdit, setSelectedCourseForEdit] = useState(null);

  const [courses, setCourses] = useState([
    {
      id: 'CRS-001',
      category: 'full-package',
      categoryName: '풀 패키지',
      title: '외식창업 마스터 풀 패키지',
      instructor: '안형상 이사장 외 명장진',
      originalPrice: '1,500,000원',
      price: '1,200,000원',
      discount: '20% OFF',
      status: '운영중',
      studentsCount: 142,
      thumbnail: '/images/package_card_1.png',
      fitMode: 'contain',
      desc: '상권분석부터 레시피, 마케팅, 매장 운영까지 외식 창업의 모든 단계를 집약한 최고급 풀패키지입니다.',
    },
    {
      id: 'CRS-002',
      category: 'full-package',
      categoryName: '풀 패키지',
      title: '메뉴개발·원가관리 풀 패키지',
      instructor: '김서연 명인 / 박지훈 셰프',
      originalPrice: '1,150,000원',
      price: '980,000원',
      discount: '15% OFF',
      status: '운영중',
      studentsCount: 98,
      thumbnail: '/images/package_card_2.png',
      fitMode: 'contain',
      desc: '시그니처 메뉴 개발과 식자재 원가 비율 최적화로 마진율을 극대화하는 정밀 솔루션 과정입니다.',
    },
    {
      id: 'CRS-003',
      category: 'full-package',
      categoryName: '풀 패키지',
      title: '매장운영·서비스 풀 패키지',
      instructor: '안형상 이사장 직강',
      originalPrice: '1,900,000원',
      price: '950,000원',
      discount: '50% OFF',
      status: '운영중',
      studentsCount: 110,
      thumbnail: '/images/package_card_3.png',
      fitMode: 'contain',
      desc: '고객 응대, QSC 품질 관리, 컴플레인 해결 및 단골 고객 유치 전술을 전수합니다.',
    },
    {
      id: 'CRS-004',
      category: 'full-package',
      categoryName: '풀 패키지',
      title: '외식마케팅·프랜차이즈 풀 패키지',
      instructor: '김서연 전문이사',
      originalPrice: '1,340,000원',
      price: '1,100,000원',
      discount: '18% OFF',
      status: '운영중',
      studentsCount: 89,
      thumbnail: '/images/package_card_4.png',
      fitMode: 'contain',
      desc: 'SNS 마케팅, 구글/네이버 상권 노출 및 프랜차이즈 가맹 표준화 시스템 구축 과정입니다.',
    },
    {
      id: 'CRS-005',
      category: 'behavior',
      categoryName: '행동교정',
      title: '반려견 행동 이해·상담 입문',
      instructor: '김서연 전문원장',
      originalPrice: '150,000원',
      price: '120,000원',
      discount: '20% OFF',
      status: '운영중',
      studentsCount: 64,
      thumbnail: '/images/behavior_card_1.jpg',
      fitMode: 'contain',
      desc: '반려견의 심리와 행동 시그널을 정확히 판독하고 맞춤 솔루션을 제시하는 전문 과정입니다.',
    },
    {
      id: 'CRS-006',
      category: 'petfood',
      categoryName: '펫푸드',
      title: '반려동물 영양·식재료 기초',
      instructor: '김서연 영양사',
      originalPrice: '150,000원',
      price: '120,000원',
      discount: '20% OFF',
      status: '운영중',
      studentsCount: 81,
      thumbnail: '/images/petfood_card_1.jpg',
      fitMode: 'contain',
      desc: '반려동물의 생애주기별 영양 요구량과 안전한 식자재 가공 기술을 체계적으로 교육합니다.',
    },
    {
      id: 'CRS-007',
      category: 'startup',
      categoryName: '창업전략',
      title: '창업기획·사업계획 수립 마스터',
      instructor: '김서연 이사',
      originalPrice: '150,000원',
      price: '120,000원',
      discount: '20% OFF',
      status: '운영중',
      studentsCount: 67,
      thumbnail: '/images/startup_card_1.jpg',
      fitMode: 'contain',
      desc: '손익분기점 계산, 초기 투자금 산정 및 성공적인 외식 사업계획서를 작성하는 핵심 특강입니다.',
    },
    {
      id: 'CRS-008',
      category: 'netflix',
      categoryName: '인기 클래스',
      title: '성공적인 카페 & 음료 매장 창업 마스터클래스',
      instructor: '안형상 이사장 직강',
      originalPrice: '150,000원',
      price: '150,000원',
      discount: 'NEW',
      status: '모집중',
      studentsCount: 45,
      thumbnail: '/images/dir_1.jpg',
      fitMode: 'cover',
      desc: '스페셜티 커피, 시그니처 음료 세팅부터 고수익 카페 동선 설계 노하우를 집중 강의합니다.',
    },
  ]);

  const filteredCourses = courses.filter((c) => {
    const matchesSearch = c.title.includes(searchTerm) || c.instructor.includes(searchTerm);
    const matchesCat = categoryFilter === 'all' || c.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  const handleOpenAddModal = () => {
    setSelectedCourseForEdit(null);
    setEditModalOpen(true);
  };

  const handleOpenEditModal = (course) => {
    setSelectedCourseForEdit(course);
    setEditModalOpen(true);
  };

  const handleSaveCourse = (savedCourse) => {
    const exists = courses.some((c) => c.id === savedCourse.id);
    if (exists) {
      setCourses(courses.map((c) => (c.id === savedCourse.id ? savedCourse : c)));
    } else {
      setCourses([savedCourse, ...courses]);
    }
  };

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
            할인율(%)을 적용하면 정가(취소선)와 최종 할인가가 자동 계산되어 함께 선명하게 표기됩니다.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg transition-all shrink-0 cursor-pointer flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>신규 교육과정 등록</span>
        </button>
      </div>

      {/* Filter & Search Bar + View Mode Toggle */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-[#0e1712] p-4 rounded-2xl border border-emerald-900/60">
        
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="과정명 또는 강사명으로 검색..."
            className="w-full bg-[#16241c] border border-emerald-500/30 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-white placeholder-emerald-800/60 focus:outline-none focus:border-emerald-400"
          />
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto no-scrollbar">
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

        {/* View Mode Toggle Button */}
        <div className="flex items-center gap-1 bg-[#16241c] p-1 rounded-xl border border-emerald-500/30 shrink-0 self-end md:self-auto">
          <button
            onClick={() => setViewMode('gallery')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              viewMode === 'gallery'
                ? 'bg-emerald-500 text-white shadow-sm'
                : 'text-gray-400 hover:text-white'
            }`}
            title="썸네일 갤러리 카드형"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>갤러리형</span>
          </button>

          <button
            onClick={() => setViewMode('list')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              viewMode === 'list'
                ? 'bg-emerald-500 text-white shadow-sm'
                : 'text-gray-400 hover:text-white'
            }`}
            title="목록 리스트형"
          >
            <List className="w-3.5 h-3.5" />
            <span>리스트형</span>
          </button>
        </div>

      </div>

      {/* VIEW MODE 1: GALLERY CARD GRID VIEW WITH ORIGINAL & DISCOUNTED PRICES */}
      {viewMode === 'gallery' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCourses.map((c) => {
            const priceCalc = calculateDiscount(c.originalPrice || c.price, c.discount);

            return (
              <div
                key={c.id}
                className="bg-[#111c16] rounded-3xl border border-emerald-500/20 hover:border-emerald-400/60 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Thumbnail Cover Header with Unclipped Fit Support */}
                <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-black/90 p-1 flex items-center justify-center">
                  <img
                    src={c.thumbnail}
                    alt={c.title}
                    className={`w-full h-full ${
                      c.fitMode === 'cover' ? 'object-cover object-top' : 'object-contain object-center'
                    } group-hover:scale-105 transition-transform duration-500`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111c16] via-transparent to-black/30 pointer-events-none" />

                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500 text-white text-[11px] font-black shadow-md tracking-wider">
                      {c.categoryName}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-md bg-rose-500 text-white text-[11px] font-black shadow-md">
                      {c.discount}
                    </span>
                  </div>

                  <div className="absolute bottom-2 left-3 text-xs font-mono text-gray-300 font-bold bg-black/60 px-2 py-0.5 rounded-md backdrop-blur-xs">
                    {c.id}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-base font-black text-white group-hover:text-emerald-300 transition-colors leading-snug line-clamp-2">
                      {c.title}
                    </h3>
                    <p className="text-xs text-gray-400 line-clamp-2 font-medium leading-relaxed">
                      {c.desc}
                    </p>
                  </div>

                  <div className="space-y-3 pt-3 border-t border-emerald-900/40">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400 font-medium">강사: {c.instructor}</span>
                      <div className="flex items-center gap-1 text-emerald-400 font-bold">
                        <Users className="w-3.5 h-3.5" />
                        <span>{c.studentsCount} 명 수강</span>
                      </div>
                    </div>

                    {/* Original Price (Strikethrough) & Final Discounted Price */}
                    <div className="flex items-end justify-between pt-1">
                      <div className="flex flex-col">
                        {priceCalc.hasDiscount && (
                          <span className="line-through text-gray-400 text-xs font-bold tracking-tight">
                            {priceCalc.originalPriceStr}
                          </span>
                        )}
                        <span className="text-lg font-black text-emerald-300">
                          {priceCalc.discountedPriceStr}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleOpenEditModal(c)}
                          className="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold transition-all cursor-pointer shadow-sm flex items-center gap-1"
                          title="정가 및 할인율 수정"
                        >
                          <Edit className="w-3.5 h-3.5" />
                          <span>수정</span>
                        </button>
                        <button
                          onClick={() => handleDelete(c.id)}
                          className="p-1.5 rounded-xl bg-rose-900/50 hover:bg-rose-600 text-rose-200 hover:text-white transition-colors cursor-pointer"
                          title="삭제"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* VIEW MODE 2: TABLE LIST VIEW WITH ORIGINAL & DISCOUNTED PRICES */
        <div className="bg-[#111c16] rounded-3xl p-6 border border-emerald-500/20 shadow-xl">
          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left border-collapse min-w-[850px]">
              <thead>
                <tr className="text-xs font-black text-emerald-400/80 border-b border-emerald-900/40">
                  <th className="pb-3 px-3">썸네일</th>
                  <th className="pb-3 px-3">과정 ID</th>
                  <th className="pb-3 px-3">카테고리</th>
                  <th className="pb-3 px-3">교육 과정명</th>
                  <th className="pb-3 px-3">담당 명인 / 강사</th>
                  <th className="pb-3 px-3">정가 (원래가격)</th>
                  <th className="pb-3 px-3">할인 수강료</th>
                  <th className="pb-3 px-3">할인 뱃지</th>
                  <th className="pb-3 px-3 text-center">관리</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-900/30 text-xs sm:text-sm font-semibold text-gray-200">
                {filteredCourses.map((c) => {
                  const priceCalc = calculateDiscount(c.originalPrice || c.price, c.discount);

                  return (
                    <tr key={c.id} className="hover:bg-emerald-950/40 transition-colors">
                      <td className="py-3 px-3">
                        <div className="w-14 h-14 rounded-xl overflow-hidden bg-black border border-emerald-500/30 shrink-0 p-0.5 flex items-center justify-center">
                          <img
                            src={c.thumbnail}
                            alt={c.title}
                            className={`w-full h-full ${
                              c.fitMode === 'cover' ? 'object-cover object-top' : 'object-contain object-center'
                            }`}
                          />
                        </div>
                      </td>
                      <td className="py-3 px-3 font-mono text-xs text-gray-400">{c.id}</td>
                      <td className="py-3 px-3">
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-black">
                          {c.categoryName}
                        </span>
                      </td>
                      <td className="py-3 px-3 font-black text-white">{c.title}</td>
                      <td className="py-3 px-3 text-gray-300">{c.instructor}</td>
                      <td className="py-3 px-3 font-bold text-gray-400 line-through">
                        {priceCalc.hasDiscount ? priceCalc.originalPriceStr : '-'}
                      </td>
                      <td className="py-3 px-3 font-black text-emerald-300">
                        {priceCalc.discountedPriceStr}
                      </td>
                      <td className="py-3 px-3">
                        <span className="px-2.5 py-0.5 bg-rose-500/20 text-rose-300 border border-rose-500/40 rounded-md text-xs font-black">
                          {c.discount}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleOpenEditModal(c)}
                            className="p-1.5 rounded-lg bg-emerald-900/40 hover:bg-emerald-800 text-emerald-300 transition-colors cursor-pointer"
                            title="정가 및 할인율 수정"
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
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Interactive Course Edit & Add Modal */}
      <CourseEditModal
        isOpen={editModalOpen}
        course={selectedCourseForEdit}
        onClose={() => setEditModalOpen(false)}
        onSaveCourse={handleSaveCourse}
      />

    </div>
  );
}
