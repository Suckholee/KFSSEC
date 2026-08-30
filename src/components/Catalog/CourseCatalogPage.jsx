import React, { useState, useEffect } from 'react';
import SubSidebar from '../common/SubSidebar';
import Sidebar from './Sidebar';
import FilterPanel from './FilterPanel';
import CourseGrid from './CourseGrid';
import Pagination from './Pagination';
import CourseModal from '../CourseModal';
import { fetchCourses } from '../../services/courseApi';
import { BookOpenText, LayoutGrid, ListFilter, Home, ChevronRight, Calendar, Award, GraduationCap, CheckCircle2, Clock } from 'lucide-react';
import ScrollReveal from '../common/ScrollReveal';

export default function CourseCatalogPage({ initialSubTab = 'courses' }) {
  const [subTab, setSubTab] = useState(initialSubTab);

  useEffect(() => {
    if (initialSubTab) {
      setSubTab(initialSubTab);
    }
  }, [initialSubTab]);

  const getInitialParams = () => {
    const searchParams = new URLSearchParams(window.location.search);
    return {
      industry: searchParams.get('industry') || '전체보기',
      stage: searchParams.get('stage') || '전체보기',
      formats: searchParams.get('format') ? searchParams.get('format').split(',') : [],
      sort: searchParams.get('sort') || 'latest',
      page: parseInt(searchParams.get('page') || '1', 10),
      category: searchParams.get('category') || 'all',
    };
  };

  const initialParams = getInitialParams();

  const [activeSidebarCategory, setActiveSidebarCategory] = useState(initialParams.category);
  const [selectedIndustry, setSelectedIndustry] = useState(initialParams.industry);
  const [selectedStage, setSelectedStage] = useState(initialParams.stage);
  const [selectedFormats, setSelectedFormats] = useState(initialParams.formats);
  const [sortOption, setSortOption] = useState(initialParams.sort);
  const [currentPage, setCurrentPage] = useState(initialParams.page);
  const [viewMode, setViewMode] = useState('grid');

  const [courses, setCourses] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [modalCourse, setModalCourse] = useState(null);

  const updateUrlParams = (newParams) => {
    const searchParams = new URLSearchParams();
    if (newParams.industry && newParams.industry !== '전체보기') searchParams.set('industry', newParams.industry);
    if (newParams.stage && newParams.stage !== '전체보기') searchParams.set('stage', newParams.stage);
    if (newParams.formats && newParams.formats.length > 0) searchParams.set('format', newParams.formats.join(','));
    if (newParams.sort && newParams.sort !== 'latest') searchParams.set('sort', newParams.sort);
    if (newParams.page && newParams.page > 1) searchParams.set('page', newParams.page.toString());
    if (newParams.category && newParams.category !== 'all') searchParams.set('category', newParams.category);

    const queryString = searchParams.toString();
    const newUrl = `${window.location.pathname}${queryString ? `?${queryString}` : ''}`;
    window.history.pushState(null, '', newUrl);
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetchCourses({
        industry: selectedIndustry,
        stage: selectedStage,
        formats: selectedFormats,
        sort: sortOption,
        page: currentPage,
        limit: 12,
      });
      setCourses(res.data);
      setTotalCount(res.totalCount);
      setTotalPages(res.totalPages);
    } catch (err) {
      console.error('Failed to load courses:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (subTab === 'courses') {
      loadData();
      updateUrlParams({
        industry: selectedIndustry,
        stage: selectedStage,
        formats: selectedFormats,
        sort: sortOption,
        page: currentPage,
        category: activeSidebarCategory,
      });
    }
  }, [selectedIndustry, selectedStage, selectedFormats, sortOption, currentPage, activeSidebarCategory, subTab]);

  const handleIndustryChange = (ind) => {
    setSelectedIndustry(ind);
    setCurrentPage(1);
  };

  const handleStageChange = (stg) => {
    setSelectedStage(stg);
    setCurrentPage(1);
  };

  const handleToggleFormat = (fmt) => {
    if (fmt === '전체') {
      setSelectedFormats([]);
    } else {
      let next = [...selectedFormats];
      if (next.includes(fmt)) {
        next = next.filter((item) => item !== fmt);
      } else {
        next.push(fmt);
      }
      setSelectedFormats(next);
    }
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSelectedIndustry('전체보기');
    setSelectedStage('전체보기');
    setSelectedFormats([]);
    setSortOption('latest');
    setCurrentPage(1);
  };

  const catalogSubItems = [
    { id: 'courses', label: '교육 과정' },
    { id: 'schedule', label: '교육 일정' },
    { id: 'cert_exam', label: '자격 시험' },
    { id: 'exam_schedule', label: '시험 일정' },
  ];

  return (
    <div className="bg-emerald-50/20 min-h-screen py-8 font-sans text-gray-900">
      <div className="w-full px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto space-y-6">
        
        {/* Main Content Layout: Left SubSidebar + Right Main Content (100% Matching Screenshot) */}
        <div className="flex flex-col md:flex-row gap-8 items-start">
          
          {/* Left Vertical SubSidebar Menu */}
          <SubSidebar
            title="교육·자격증"
            items={catalogSubItems}
            activeId={subTab}
            onSelectTab={(tabId) => setSubTab(tabId)}
          />

          {/* Right Main Content Panel */}
          <div className="flex-1 w-full space-y-8">
            
            {/* SUB-TAB 1: 교육 과정 (Matching Target Screenshot) */}
            {subTab === 'courses' && (
              <div className="space-y-8 animate-fadeIn">
                
                {/* Slanted Chevron Banner Photos Container (Matching Target Screenshot) */}
                <div className="bg-white rounded-3xl p-6 border-2 border-black shadow-lg space-y-4 overflow-hidden">
                  <h2 className="text-2xl font-black text-black border-b-2 border-black pb-2">
                    교육 과정
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-2">
                    {/* Chevron Shape 1 */}
                    <div className="relative h-56 rounded-2xl overflow-hidden shadow-md bg-black transform -skew-x-6 group hover:skew-x-0 transition-transform duration-500">
                      <img
                        src="/images/dir_2.jpg"
                        alt="외국인 채용 기업체 설명회"
                        className="w-full h-full object-cover transform skew-x-6 group-hover:skew-x-0 group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-3 left-3 bg-black/85 text-white font-black text-xs px-3 py-1 rounded">
                        채용 기업체 설명회
                      </div>
                    </div>

                    {/* Chevron Shape 2 */}
                    <div className="relative h-56 rounded-2xl overflow-hidden shadow-md bg-black transform -skew-x-6 group hover:skew-x-0 transition-transform duration-500">
                      <img
                        src="/images/dir_1.jpg"
                        alt="정기총회 연설"
                        className="w-full h-full object-cover transform skew-x-6 group-hover:skew-x-0 group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-3 left-3 bg-black/85 text-white font-black text-xs px-3 py-1 rounded">
                        정기 총회 세미나
                      </div>
                    </div>

                    {/* Chevron Shape 3 */}
                    <div className="relative h-56 rounded-2xl overflow-hidden shadow-md bg-black transform -skew-x-6 group hover:skew-x-0 transition-transform duration-500">
                      <img
                        src="/images/dir_12.jpg"
                        alt="정기총회 & 명인 인증식"
                        className="w-full h-full object-cover transform skew-x-6 group-hover:skew-x-0 group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-3 left-3 bg-black/85 text-white font-black text-xs px-3 py-1 rounded">
                        명인 인증식 및 수여식
                      </div>
                    </div>
                  </div>
                </div>

                {/* Main Catalog Section */}
                <div className="flex flex-col lg:flex-row gap-8 items-start pt-2">
                  <Sidebar
                    activeCategory={activeSidebarCategory}
                    onSelectCategory={(catId) => {
                      setActiveSidebarCategory(catId);
                      if (catId === 'all') handleResetFilters();
                    }}
                  />

                  <div className="flex-1 w-full space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <span className="text-sm font-bold text-gray-700">
                        총 <strong className="text-emerald-800 font-black">{totalCount}개</strong>의 교육과정이 있습니다.
                      </span>

                      <div className="flex items-center gap-3">
                        <select
                          value={sortOption}
                          onChange={(e) => {
                            setSortOption(e.target.value);
                            setCurrentPage(1);
                          }}
                          className="px-3 py-2 bg-white border border-emerald-200 rounded-xl text-xs sm:text-sm font-bold text-emerald-900 focus:outline-none focus:border-emerald-600 shadow-sm cursor-pointer"
                        >
                          <option value="latest">최신순</option>
                          <option value="popular">인기순</option>
                          <option value="price_low">수강료 낮은순</option>
                          <option value="price_high">수강료 높은순</option>
                        </select>

                        <div className="flex items-center bg-white border border-emerald-200 rounded-xl p-1 shadow-sm">
                          <button
                            onClick={() => setViewMode('grid')}
                            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                              viewMode === 'grid'
                                ? 'bg-[#0F5132] text-white shadow-sm'
                                : 'text-gray-400 hover:text-emerald-700'
                            }`}
                            title="그리드 뷰"
                          >
                            <LayoutGrid className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setViewMode('list')}
                            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                              viewMode === 'list'
                                ? 'bg-[#0F5132] text-white shadow-sm'
                                : 'text-gray-400 hover:text-emerald-700'
                            }`}
                            title="리스트 뷰"
                          >
                            <ListFilter className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <FilterPanel
                      selectedIndustry={selectedIndustry}
                      onSelectIndustry={handleIndustryChange}
                      selectedStage={selectedStage}
                      onSelectStage={handleStageChange}
                      selectedFormats={selectedFormats}
                      onToggleFormat={handleToggleFormat}
                    />

                    <CourseGrid
                      courses={courses}
                      loading={loading}
                      viewMode={viewMode}
                      onSelectCourse={(c) => setModalCourse(c)}
                      onResetFilters={handleResetFilters}
                    />

                    {!loading && courses.length > 0 && (
                      <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={(p) => setCurrentPage(p)}
                      />
                    )}
                  </div>
                </div>

              </div>
            )}

            {/* SUB-TAB 2: 교육 일정 */}
            {subTab === 'schedule' && (
              <div className="space-y-8 animate-fadeIn">
                <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-black shadow-lg space-y-6">
                  <div className="inline-block bg-black text-white text-xl font-black px-8 py-2.5 rounded-2xl shadow-md">
                    교육 일정
                  </div>

                  <div className="border border-gray-300 rounded-2xl overflow-hidden shadow-sm bg-gray-100">
                    <div className="grid grid-cols-7 bg-gray-700 text-white font-black text-center py-3 text-sm">
                      <span className="text-rose-400">일</span>
                      <span>월</span>
                      <span>화</span>
                      <span>수</span>
                      <span>목</span>
                      <span>금</span>
                      <span className="text-sky-400">토</span>
                    </div>

                    <div className="grid grid-cols-7 text-xs font-bold text-gray-800 divide-x divide-y divide-gray-300 bg-white">
                      {Array.from({ length: 35 }).map((_, idx) => {
                        const dayNum = idx - 2;
                        const isValidDay = dayNum > 0 && dayNum <= 31;
                        const isToday = dayNum === 15;

                        return (
                          <div key={idx} className="min-h-[90px] p-2 flex flex-col justify-between hover:bg-emerald-50/50 transition-colors">
                            <span className={`font-black ${isToday ? 'bg-emerald-700 text-white w-6 h-6 rounded-full flex items-center justify-center' : ''}`}>
                              {isValidDay ? dayNum : ''}
                            </span>

                            {dayNum === 5 && (
                              <span className="bg-emerald-100 text-emerald-900 p-1 rounded text-[10px] font-black leading-tight border border-emerald-300">
                                한식 마스터 개강
                              </span>
                            )}
                            {dayNum === 12 && (
                              <span className="bg-amber-100 text-amber-900 p-1 rounded text-[10px] font-black leading-tight border border-amber-300">
                                일식 횟집 창업 개강
                              </span>
                            )}
                            {dayNum === 20 && (
                              <span className="bg-rose-100 text-rose-900 p-1 rounded text-[10px] font-black leading-tight border border-rose-300">
                                메뉴 개발 특강
                              </span>
                            )}
                            {dayNum === 28 && (
                              <span className="bg-sky-100 text-sky-900 p-1 rounded text-[10px] font-black leading-tight border border-sky-300">
                                수강생 종강 발표회
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SUB-TAB 3: 자격 시험 */}
            {subTab === 'cert_exam' && (
              <div className="space-y-8 animate-fadeIn">
                <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-black shadow-lg space-y-6">
                  <div className="inline-block bg-black text-white text-xl font-black px-8 py-2.5 rounded-2xl shadow-md">
                    자격 시험
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    {[
                      { title: '외식창업 지도사 1급/2급', desc: '상권분석 및 매장운영 실무 역량을 인증하는 비영리 민간 자격증' },
                      { title: '메뉴개발 전문가 자격증', desc: 'HMR/RMR 레시피 개발 및 식자재 원가 산정 전문가 인증' },
                      { title: '조리기능장 자격 검정', desc: '외식업 40년 경력 명장진의 실기 검정 및 기술 심사' },
                      { title: '외식경영 관리사', desc: '외식 프랜차이즈 가맹 표준화 및 경영 컨설팅 자격' },
                    ].map((cert, idx) => (
                      <div key={idx} className="bg-stone-50 p-6 rounded-2xl border border-stone-300 space-y-3 hover:border-emerald-500 hover:bg-emerald-50/40 transition-all">
                        <h3 className="text-lg font-black text-black">{cert.title}</h3>
                        <p className="text-xs text-gray-600 font-medium leading-relaxed">{cert.desc}</p>
                        <button
                          onClick={() => alert(`"${cert.title}" 자격시험 응시 요강을 확인합니다.`)}
                          className="px-4 py-2 bg-black text-white text-xs font-black rounded-xl hover:bg-gray-800 transition-colors cursor-pointer"
                        >
                          응시 요강 보기
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* SUB-TAB 4: 시험 일정 */}
            {subTab === 'exam_schedule' && (
              <div className="space-y-8 animate-fadeIn">
                <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-black shadow-lg space-y-6">
                  <div className="inline-block bg-black text-white text-xl font-black px-8 py-2.5 rounded-2xl shadow-md">
                    시험 일정
                  </div>

                  <div className="border border-gray-300 rounded-2xl overflow-hidden shadow-sm bg-gray-100">
                    <div className="grid grid-cols-7 bg-gray-700 text-white font-black text-center py-3 text-sm">
                      <span className="text-rose-400">일</span>
                      <span>월</span>
                      <span>화</span>
                      <span>수</span>
                      <span>목</span>
                      <span>금</span>
                      <span className="text-sky-400">토</span>
                    </div>

                    <div className="grid grid-cols-7 text-xs font-bold text-gray-800 divide-x divide-y divide-gray-300 bg-white">
                      {Array.from({ length: 35 }).map((_, idx) => {
                        const dayNum = idx - 2;
                        const isValidDay = dayNum > 0 && dayNum <= 31;
                        const isExamDay = dayNum === 10 || dayNum === 24;

                        return (
                          <div key={idx} className="min-h-[90px] p-2 flex flex-col justify-between hover:bg-rose-50/50 transition-colors">
                            <span className={`font-black ${isExamDay ? 'bg-rose-600 text-white w-6 h-6 rounded-full flex items-center justify-center' : ''}`}>
                              {isValidDay ? dayNum : ''}
                            </span>

                            {dayNum === 10 && (
                              <span className="bg-rose-100 text-rose-900 p-1 rounded text-[10px] font-black leading-tight border border-rose-300">
                                제24회 필기 시험
                              </span>
                            )}
                            {dayNum === 24 && (
                              <span className="bg-emerald-100 text-emerald-900 p-1 rounded text-[10px] font-black leading-tight border border-emerald-300">
                                실기 실무 검정
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Course Modal */}
      {modalCourse && (
        <CourseModal
          course={modalCourse}
          onClose={() => setModalCourse(null)}
        />
      )}
    </div>
  );
}
