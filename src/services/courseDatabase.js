import { actualCourses as DEFAULT_COURSES } from '../data/actualCourses.js';

const DB_VERSION = 'v6_official_clean_tuition_20260927';

// Upgrade reused default covers while preserving administrator uploads.
function withCourseCovers(courses) {
  return courses.map(course => {
    const id = course.qualificationId || (course.id?.includes('foodtech') ? 'foodtech' : course.id?.includes('sommelier') ? 'sommelier' : null);
    if (!['foodtech', 'sommelier'].includes(id) || !['/images/qualifications/advisor.jpg', '/images/qualifications/practice.jpg'].includes(course.image)) return course;
    return { ...course, image: `/images/qualifications/${id}.jpg` };
  });
}

// Fetch all courses from Real REST API Backend DB with fallback
export async function fetchCoursesFromAPI() {
  // Always retrieve authoritative synced DB (auto-purging old legacy mock cache)
  try {
    const res = await fetch('/api/courses');
    if (res.ok) {
      const contentType = res.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          const courses = withCourseCovers(json.data);
          cacheCourses(courses);
          return courses;
        }
      }
    }
  } catch (err) {
    console.warn('Course API unavailable:', err);
  }

  return getCoursesFromDB();
}

export function getCoursesFromDB() {
  const version = localStorage.getItem('kfssec_courses_version');
  const saved = localStorage.getItem('kfssec_courses_db');

  if (version === DB_VERSION && saved) {
    try {
      const parsed = JSON.parse(saved);
      const hasLegacyMock = parsed.some(
        (c) =>
          (c.id && String(c.id).startsWith('CRS-')) ||
          (c.category === 'behavior' || c.category === 'petfood') ||
          c.title?.includes('전통 한식 조리 마스터') ||
          c.title?.includes('일식 횟집') ||
          c.title?.includes('파스타 & 파인다이닝') ||
          c.title?.includes('대박 분식집') ||
          c.title?.includes('반려견') ||
          c.title?.includes('펫푸드')
      );
      if (Array.isArray(parsed) && !hasLegacyMock) {
        return withCourseCovers(parsed);
      }
    } catch (e) {
      console.error('Failed to parse courses DB from localStorage:', e);
    }
  }

  // Force auto-purge any old dummy cache & enforce institute course dataset
  localStorage.setItem('kfssec_courses_version', DB_VERSION);
  localStorage.setItem('kfssec_courses_db', JSON.stringify(DEFAULT_COURSES));
  return DEFAULT_COURSES;
}

export function resetCoursesToDefault() {
  localStorage.setItem('kfssec_courses_version', DB_VERSION);
  localStorage.setItem('kfssec_courses_db', JSON.stringify(DEFAULT_COURSES));
  try {
    window.dispatchEvent(new Event('kfssec_courses_updated'));
  } catch (e) {
    // Ignore
  }
  return DEFAULT_COURSES;
}

function cacheCourses(courses) {
  if (!Array.isArray(courses)) return;
  localStorage.setItem('kfssec_courses_version', DB_VERSION);
  localStorage.setItem('kfssec_courses_db', JSON.stringify(courses));
  try {
    window.dispatchEvent(new Event('kfssec_courses_updated'));
  } catch (e) {
    // Ignore in non-browser context
  }
}

export async function saveCoursesToDB(courses) {
  if (!Array.isArray(courses)) throw new Error('교육 목록 형식이 올바르지 않습니다.');
  const res = await fetch('/api/courses?id=reorder', {
    method: 'PUT',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ courses }),
  });
  const json = await res.json();
  if (!res.ok || !json.success || !Array.isArray(json.data)) {
    throw new Error(json.message || '교육 목록 저장에 실패했습니다.');
  }
  cacheCourses(json.data);
  return json.data;
}

// REST API POST Create Course
export async function createCourseAPI(courseData) {
  const newCourse = {
    ...courseData,
    id: courseData.id || `c${Date.now()}`,
  };

    const res = await fetch('/api/courses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCourse),
    });
  const json = await res.json();
  if (!res.ok || !json.success || !json.data) throw new Error(json.message || '과정 등록 실패');
  cacheCourses([json.data, ...getCoursesFromDB()]);
  return json.data;
}

// REST API PUT Update Course with 100% robust string ID matching
export async function updateCourseAPI(id, courseData) {
    const res = await fetch(`/api/courses?id=${encodeURIComponent(id)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(courseData),
    });
  const json = await res.json();
  if (!res.ok || !json.success || !json.data) throw new Error(json.message || '과정 수정 실패');
  const updatedPayload = json.data;

  // Update in local DB store using robust string ID matching
  const current = getCoursesFromDB();
  const idStr = String(id);

  const updated = current.map((c) => {
    const cIdStr = String(c.id);
    if (cIdStr === idStr || cIdStr === `c${idStr}` || `c${cIdStr}` === idStr) {
      return { ...c, ...updatedPayload };
    }
    return c;
  });

  cacheCourses(updated);
  return updatedPayload;
}

// REST API DELETE Course
export async function deleteCourseAPI(id) {
    const res = await fetch(`/api/courses?id=${encodeURIComponent(id)}`, {
      method: 'DELETE',
    });
  const json = await res.json();
  if (!res.ok || !json.success) throw new Error(json.message || '과정 삭제 실패');

  const current = getCoursesFromDB();
  const idStr = String(id);
  const updated = current.filter((c) => {
    const cIdStr = String(c.id);
    return !(cIdStr === idStr || cIdStr === `c${idStr}` || `c${cIdStr}` === idStr);
  });
  cacheCourses(updated);
  return true;
}

// REST API Direct File Upload to Server
export async function uploadImageAPI(base64Data, fileName) {
  try {
    const res = await fetch('/api/upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imageBase64: base64Data, fileName }),
    });
    if (res.ok) {
      const contentType = res.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const json = await res.json();
        if (json.success && json.url) return json.url;
      }
    }
  } catch (err) {
    console.warn('Real API upload error:', err);
  }
  return base64Data;
}

// Derive Academic Schedules (교육 일정) dynamically from DB
export function getAcademicSchedulesFromDB() {
  const courses = getCoursesFromDB();
  const schedules = [];

  courses.forEach((c) => {
    if (c.startDate) {
      const day = parseInt(c.startDate.split('-')[2], 10);
      schedules.push({
        day,
        title: `${c.title.slice(0, 10)}... 개강`,
        type: 'start',
        color: 'bg-emerald-100 text-emerald-900 border-emerald-300',
        courseId: c.id,
      });
    }
    if (c.endDate) {
      const day = parseInt(c.endDate.split('-')[2], 10);
      schedules.push({
        day,
        title: `${c.title.slice(0, 10)}... 종강`,
        type: 'end',
        color: 'bg-sky-100 text-sky-900 border-sky-300',
        courseId: c.id,
      });
    }
  });

  return schedules;
}

// Derive Certification Exams & Schedules (자격 시험 & 시험 일정) dynamically from DB
export function getExamSchedulesFromDB() {
  const courses = getCoursesFromDB();
  const exams = [];

  courses.forEach((c) => {
    if (c.examDate && c.certName) {
      const day = parseInt(c.examDate.split('-')[2], 10);
      exams.push({
        day,
        certName: c.certName,
        title: `${c.certName} 실기검정`,
        dateStr: c.examDate,
        color: 'bg-rose-100 text-rose-900 border-rose-300',
        courseId: c.id,
      });
    }
  });

  return exams;
}
