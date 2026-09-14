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
  const normalizedCourses = dbCourses.map(c => ({
    ...c,
    priceFormatted: c.price == null ? '수강료 문의' : `${Number(c.price).toLocaleString()}원`,
    createdAt: c.startDate || '',
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
