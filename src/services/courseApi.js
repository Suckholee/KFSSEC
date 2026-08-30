// Dynamic API Service for GET /api/v1/courses
// Syncs dynamically with getCoursesFromDB() from courseDatabase.js as Single Source of Truth

import { getCoursesFromDB } from './courseDatabase';

// Client-side Caching Cache Store
const cache = new Map();

/**
 * Fetch courses async simulation matching GET /api/v1/courses
 * Uses getCoursesFromDB() as the Single Source of Truth so Admin Center edits immediately sync to Public Pages!
 */
export async function fetchCourses(params = {}) {
  const {
    search = '',
    industry = '전체',
    stage = '전체',
    formats = [],
    sort = 'latest',
    page = 1,
    limit = 12
  } = params;

  // Retrieve Dynamic Courses from Central Database Store
  const dbCourses = getCoursesFromDB();

  // Normalize dbCourses for public catalog rendering
  const normalizedCourses = dbCourses.map((c, idx) => ({
    id: c.id || idx + 1,
    industry: c.industry || c.categoryName || '한식',
    categoryName: c.categoryName || c.industry || '한식',
    stage: c.stage || '창업 준비',
    format: c.format || '오프라인',
    badge: c.badge || (idx === 0 ? 'BEST' : idx === 1 ? 'BEST' : idx === 2 ? 'HOT' : null),
    title: c.title,
    description: c.description || '특급호텔 40년 경력 명장이 직접 전수하는 시그니처 레시피 및 창업 현장 실무 커리큘럼입니다.',
    image: c.image || '/images/course_menu_dev.jpg',
    duration: c.duration || '4주 과정',
    lessons: c.lessons || '20강',
    price: c.price || 4500000,
    priceFormatted: `${(c.price || 4500000).toLocaleString()}원`,
    rating: c.rating || (4.95 - (idx * 0.02)).toFixed(2),
    views: c.views || (1500 - idx * 70),
    createdAt: c.startDate || '2026-09-05',
    startDate: c.startDate || '2026-09-05',
    instructor: c.instructor || '안형상 이사장 / 40년 명장',
    certName: c.certName || '한식 조리기능장 및 지도사 1급',
  }));

  let filtered = [...normalizedCourses];

  // Keyword Search Filter
  if (search && search.trim() !== '') {
    const q = search.trim().toLowerCase();
    filtered = filtered.filter((c) =>
      c.title.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q) ||
      c.industry.toLowerCase().includes(q) ||
      (c.instructor && c.instructor.toLowerCase().includes(q))
    );
  }

  // Industry Filter
  if (industry && industry !== '전체' && industry !== '전체보기') {
    filtered = filtered.filter((c) => c.industry === industry || c.categoryName === industry);
  }

  // Stage Filter
  if (stage && stage !== '전체' && stage !== '전체보기') {
    filtered = filtered.filter((c) => c.stage === stage);
  }

  // Format Filter
  if (formats && formats.length > 0 && !formats.includes('전체')) {
    filtered = filtered.filter((c) => formats.includes(c.format));
  }

  // Sort Logic
  if (sort === 'popular') {
    filtered.sort((a, b) => b.views - a.views);
  } else if (sort === 'price_low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sort === 'price_high') {
    filtered.sort((a, b) => b.price - a.price);
  } else {
    filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  const totalCount = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / limit));
  const startIndex = (page - 1) * limit;
  const paginatedData = filtered.slice(startIndex, startIndex + limit);

  return {
    data: paginatedData,
    totalCount,
    totalPages,
    currentPage: page,
  };
}
