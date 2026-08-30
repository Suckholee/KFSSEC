import React, { useState, useEffect } from 'react';
import SubSidebar from '../common/SubSidebar';
import Sidebar from './Sidebar';
import FilterPanel from './FilterPanel';
import CourseGrid from './CourseGrid';
import Pagination from './Pagination';
import CourseModal from '../CourseModal';
import { fetchCourses } from '../../services/courseApi';
import { getCoursesFromDB, getAcademicSchedulesFromDB, getExamSchedulesFromDB, fetchCoursesFromAPI } from '../../services/courseDatabase';
import { BookOpenText, LayoutGrid, ListFilter, Home, ChevronRight, Calendar, Award, GraduationCap, CheckCircle2, Clock, Search, X } from 'lucide-react';
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
      search: searchParams.get('search') || '',
      industry: searchParams.get('industry') || '전체보기',
      stage: searchParams.get('stage') || '전체보기',
      formats: searchParams.get('format') ? searchParams.get('format').split(',') : [],
      sort: searchParams.get('sort') || 'latest',
      page: parseInt(searchParams.get('page') || '1', 10),
      category: searchParams.get('category') || 'all',
    };
  };

  const initialParams = getInitialParams();

  const [searchTerm, setSearchTerm] = useState(initialParams.search);
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

  // Dynamic DB Live Sync Data
  const [dbCourses, setDbCourses] = useState(getCoursesFromDB());
  const [academicSchedules, setAcademicSchedules] = useState(getAcademicSchedulesFromDB());
  const [examSchedules, setExamSchedules] = useState(getExamSchedulesFromDB());

  const updateUrlParams = (newParams) => {
    const searchParams = new URLSearchParams();
    if (newParams.search) searchParams.set('search', newParams.search);
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
        search: searchTerm,
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
    // Sync Real REST API DB
    fetchCoursesFromAPI().then(() => {
      setDbCourses(getCoursesFromDB());
      setAcademicSchedules(getAcademicSchedulesFromDB());
      setExamSchedules(getExamSchedulesFromDB());
    });

    const handleCoursesUpdate = () => {
      setDbCourses(getCoursesFromDB());
      setAcademicSchedules(getAcademicSchedulesFromDB());
      setExamSchedules(getExamSchedulesFromDB());
      if (subTab === 'courses') {
        loadData();
      }
    };

    window.addEventListener('kfssec_courses_updated', handleCoursesUpdate);
    window.addEventListener('storage', handleCoursesUpdate);

    if (subTab === 'courses') {
      loadData();
      updateUrlParams({
        search: searchTerm,
        industry: selectedIndustry,
        stage: selectedStage,
        formats: selectedFormats,
        sort: sortOption,
        page: currentPage,
        category: activeSidebarCategory,
      });
    }

    return () => {
      window.removeEventListener('kfssec_courses_updated', handleCoursesUpdate);
      window.removeEventListener('storage', handleCoursesUpdate);
    };
  }, [searchTerm, selectedIndustry, selectedStage, selectedFormats, sortOption, currentPage, activeSidebarCategory, subTab]);

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
    setSearchTerm('');
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
    <div className="bg-emerald-50/20 min-h-screen py-6 font-sans text-gray-900">
      
      {/* Full Width Widescreen Layout matching Header padding */}
      <div className="w-full px-6 sm:px-10 lg:px-14 space-y-6">
        
        {/* Unified Main Layout: Left Vertical Sidebar Column */}
        <div className="flex flex-col md:flex-row gap-6 lg:gap-8 items-start">
          
          {/* Left Vertical Sidebar Column */}
          <div className="w-full md:w-56 lg:w-64 flex flex-col gap-6 shrink-0">
            <SubSidebar
              title="교육·자격증"
              items={catalogSubItems}
              activeId={subTab}
              onSelectTab={(tabId) => setSubTab(tabId)}
            />

            {subTab === 'courses' && (
              <Sidebar
                activeCategory={activeSidebarCategory}
                onSelectCategory={(catId) => {
                  setActiveSidebarCategory(catId);
                  if (catId === 'all') handleResetFilters();
                }}
              />
            )}
          </div>

          {/* Right Main Content Panel */}
          <div className="flex-1 w-full space-y-6 min-w-0">
            
            {/* SUB-TAB 1: 교육 과정 */}
            {subTab === 'courses' && (
              <div className="space-y-8 animate-fadeIn w-full">
                
                {/* PROMINENT COURSE SEARCH INPUT BAR */}
                <div className="bg-white p-5 rounded-3xl border-2 border-black shadow-lg space-y-3 w-full">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-black flex items-center gap-1.5">
                      <Search className="w-4 h-4 text-emerald-700" />
                      <span>원하시는 요리 교육과정 키워드 직접 검색</span>
                    </span>
                    {searchTerm && (
                      <button
                        onClick={handleResetFilters}
                        className="text-xs text-rose-600 font-bold hover:underline"
                      >
                        필터 & 검색 초기화 ↺
                      </button>
                    )}
                  </div>

                  <div className="relative flex items-center w-full">
                    <Search className="w-5 h-5 text-gray-400 absolute left-4 pointer-events-none" />
                    <input
                      type="text"
                      placeholder="🔎 배우고 싶은 요리 과정, 메뉴 비법, 강사명, 키워드를 입력하세요... (예: 한식, 일식, 카페, 짬뽕, 파스타)"
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="w-full pl-12 pr-12 py-3.5 bg-stone-50 border-2 border-stone-300 focus:border-black rounded-2xl text-sm font-black text-black placeholder:text-gray-400 focus:outline-none transition-all shadow-inner"
                    />
                    {searchTerm && (
                      <button
                        onClick={() => {
                          setSearchTerm('');
                          setCurrentPage(1);
                        }}
                        className="absolute right-4 text-gray-400 hover:text-black font-black text-sm"
                        title="검색어 지우기"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </div>



                {/* Course Grid & Filter Toolbar Container */}
                <div className="space-y-6 w-full pt-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <span className="text-sm font-bold text-gray-700">
                      총 <strong className="text-emerald-800 font-black">{totalCount}개</strong>의 교육과정이 있습니다.
                      {searchTerm && <span className="text-emerald-700 font-bold ml-2"> (검색어: "{searchTerm}")</span>}
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
            )}

            {/* SUB-TAB 2: 교육 일정 (2026년 학사일정) */}
            {subTab === 'schedule' && (
              <div className="space-y-8 animate-fadeIn w-full">
                <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-black shadow-lg space-y-6 w-full">
                  <div className="flex items-center justify-between border-b-2 border-black pb-3">
                    <div className="inline-block bg-black text-white text-xl font-black px-8 py-2.5 rounded-2xl shadow-md">
                      2026년 9월 학사 & 개강 일정 (DB 실시간 연동)
                    </div>
                    <span className="text-xs font-bold text-gray-500">
                      관리자 DB에서 수정된 2026년 개강/종강 일자가 달력에 즉시 표시됩니다.
                    </span>
                  </div>

                  <div className="border border-gray-300 rounded-2xl overflow-hidden shadow-sm bg-gray-100 w-full">
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
                        const dayNum = idx - 1;
                        const isValidDay = dayNum > 0 && dayNum <= 30;
                        const isToday = dayNum === 15;

                        const matchedEvents = academicSchedules.filter((s) => s.day === dayNum);

                        return (
                          <div key={idx} className="min-h-[100px] p-2 flex flex-col justify-between hover:bg-emerald-50/50 transition-colors">
                            <span className={`font-black ${isToday ? 'bg-emerald-700 text-white w-6 h-6 rounded-full flex items-center justify-center' : ''}`}>
                              {isValidDay ? dayNum : ''}
                            </span>

                            <div className="space-y-1 mt-1">
                              {matchedEvents.map((ev, i) => (
                                <div key={i} className={`p-1 rounded text-[10px] font-black leading-tight border ${ev.color}`}>
                                  {ev.title}
                                </div>
                              ))}
                            </div>
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
              <div className="space-y-8 animate-fadeIn w-full">
                <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-black shadow-lg space-y-6 w-full">
                  <div className="flex items-center justify-between border-b-2 border-black pb-3">
                    <div className="inline-block bg-black text-white text-xl font-black px-8 py-2.5 rounded-2xl shadow-md">
                      2026년 사단법인 민간 자격 시험 안내 (DB 연동)
                    </div>
                    <span className="text-xs font-bold text-gray-500">
                      교육과정과 연계된 자격 시험 요강 및 검정 목록입니다.
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 w-full">
                    {dbCourses.map((c, idx) => (
                      <div key={c.id || idx} className="bg-stone-50 p-6 rounded-2xl border border-stone-300 space-y-3 hover:border-emerald-600 hover:bg-emerald-50/40 transition-all shadow-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-black text-emerald-900 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
                            {c.categoryName || c.industry} 과정 연계
                          </span>
                          <span className="text-xs font-mono font-bold text-rose-700">
                            검정일: {c.examDate || '일정미정'}
                          </span>
                        </div>

                        <h3 className="text-lg font-black text-black">{c.certName}</h3>
                        <p className="text-xs text-gray-600 font-medium leading-relaxed">
                          {c.title} 수강생 대상 특급 명장 실기 심사 및 전문 자격증 검정 과정
                        </p>

                        <button
                          onClick={() => alert(`"${c.certName}" 자격시험 응시 요강을 확인합니다.`)}
                          className="px-4 py-2 bg-black text-white text-xs font-black rounded-xl hover:bg-gray-800 transition-colors cursor-pointer"
                        >
                          응시 요강 보기 ➔
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* SUB-TAB 4: 시험 일정 (2026년 시험달력) */}
            {subTab === 'exam_schedule' && (
              <div className="space-y-8 animate-fadeIn w-full">
                <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-black shadow-lg space-y-6 w-full">
                  <div className="flex items-center justify-between border-b-2 border-black pb-3">
                    <div className="inline-block bg-black text-white text-xl font-black px-8 py-2.5 rounded-2xl shadow-md">
                      2026년 자격증 시험 및 검정 달력 (DB 실시간 연동)
                    </div>
                    <span className="text-xs font-bold text-gray-500">
                      관리자 DB의 자격증 시험 일자가 실시간 달력으로 자동 배치됩니다.
                    </span>
                  </div>

                  <div className="border border-gray-300 rounded-2xl overflow-hidden shadow-sm bg-gray-100 w-full">
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
                        const dayNum = idx - 1;
                        const isValidDay = dayNum > 0 && dayNum <= 30;

                        const matchedExams = examSchedules.filter((e) => e.day === dayNum);

                        return (
                          <div key={idx} className="min-h-[100px] p-2 flex flex-col justify-between hover:bg-rose-50/50 transition-colors">
                            <span className={`font-black ${matchedExams.length > 0 ? 'bg-rose-600 text-white w-6 h-6 rounded-full flex items-center justify-center' : ''}`}>
                              {isValidDay ? dayNum : ''}
                            </span>

                            <div className="space-y-1 mt-1">
                              {matchedExams.map((ex, i) => (
                                <div key={i} className={`p-1 rounded text-[10px] font-black leading-tight border ${ex.color}`}>
                                  {ex.title}
                                </div>
                              ))}
                            </div>
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
