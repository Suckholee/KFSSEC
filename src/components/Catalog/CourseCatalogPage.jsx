import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import FilterPanel from './FilterPanel';
import CourseGrid from './CourseGrid';
import Pagination from './Pagination';
import CourseModal from '../CourseModal';
import { fetchCourses } from '../../services/courseApi';
import { BookOpenText, LayoutGrid, ListFilter, Home, ChevronRight } from 'lucide-react';

export default function CourseCatalogPage() {
  // Deep Linking Sync from URL Query Parameters
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
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'

  const [courses, setCourses] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [modalCourse, setModalCourse] = useState(null);

  // Sync state to URL Query Parameters for Deep Linking
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

  // Fetch Courses Data
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
    loadData();
    updateUrlParams({
      industry: selectedIndustry,
      stage: selectedStage,
      formats: selectedFormats,
      sort: sortOption,
      page: currentPage,
      category: activeSidebarCategory,
    });
  }, [selectedIndustry, selectedStage, selectedFormats, sortOption, currentPage, activeSidebarCategory]);

  // Handlers
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

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      {/* Full width container without max-w-7xl constraint */}
      <div className="w-full px-4 sm:px-8 lg:px-12">
        
        {/* Breadcrumb & Top Guide Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm text-gray-500 mb-6">
          <div className="flex items-center gap-1.5 font-medium">
            <Home className="w-3.5 h-3.5 text-gray-400" />
            <ChevronRight className="w-3 h-3 text-gray-300" />
            <span>교육과정</span>
            <ChevronRight className="w-3 h-3 text-gray-300" />
            <span className="font-bold text-gray-900">전체 교육과정</span>
          </div>

          <button
            onClick={() => alert('교육과정 가이드북 PDF를 불러옵니다.')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg bg-white text-gray-700 hover:bg-gray-50 text-xs font-bold shadow-sm transition-colors self-start sm:self-auto cursor-pointer"
          >
            <BookOpenText className="w-4 h-4 text-blue-800" />
            <span>교육과정 가이드</span>
          </button>
        </div>

        {/* Catalog Main Layout (Sidebar + Main Content) */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Left Sidebar */}
          <Sidebar
            activeCategory={activeSidebarCategory}
            onSelectCategory={(catId) => {
              setActiveSidebarCategory(catId);
              if (catId === 'all') handleResetFilters();
            }}
          />

          {/* Right Main Catalog Content */}
          <div className="flex-1 w-full space-y-6">
            
            {/* Catalog Title Section */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                전체 교육과정
              </h1>
              <p className="text-sm text-gray-500 font-medium mt-1">
                외식 창업의 시작부터 성공까지, 맞춤형 교육으로 함께합니다.
              </p>
            </div>

            {/* Filter Panel (Industry / Stage / Format) */}
            <FilterPanel
              selectedIndustry={selectedIndustry}
              onSelectIndustry={handleIndustryChange}
              selectedStage={selectedStage}
              onSelectStage={handleStageChange}
              selectedFormats={selectedFormats}
              onToggleFormat={handleToggleFormat}
            />

            {/* Results Toolbar Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
              <span className="text-sm font-bold text-gray-700">
                총 <strong className="text-blue-900 font-black">{totalCount}개</strong>의 교육과정이 있습니다.
              </span>

              <div className="flex items-center gap-3 self-end sm:self-auto">
                {/* Sort Select */}
                <select
                  value={sortOption}
                  onChange={(e) => {
                    setSortOption(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs sm:text-sm font-bold text-gray-700 focus:outline-none focus:border-blue-900 shadow-sm cursor-pointer"
                >
                  <option value="latest">최신순</option>
                  <option value="popular">인기순</option>
                  <option value="price_low">수강료 낮은순</option>
                  <option value="price_high">수강료 높은순</option>
                </select>

                {/* View Mode Toggle Buttons */}
                <div className="flex items-center bg-white border border-gray-200 rounded-xl p-1 shadow-sm">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded-lg transition-colors ${
                      viewMode === 'grid'
                        ? 'bg-[#1E2B4D] text-white shadow-sm'
                        : 'text-gray-400 hover:text-gray-700'
                    }`}
                    title="그리드 뷰"
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded-lg transition-colors ${
                      viewMode === 'list'
                        ? 'bg-[#1E2B4D] text-white shadow-sm'
                        : 'text-gray-400 hover:text-gray-700'
                    }`}
                    title="리스트 뷰"
                  >
                    <ListFilter className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Course Grid Component */}
            <CourseGrid
              courses={courses}
              loading={loading}
              viewMode={viewMode}
              onSelectCourse={(c) => setModalCourse(c)}
              onResetFilters={handleResetFilters}
            />

            {/* Pagination Component */}
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
