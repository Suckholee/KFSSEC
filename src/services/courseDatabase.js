import { actualCourses as DEFAULT_COURSES } from '../data/actualCourses.js';

const DB_VERSION = 'v4_curriculums_expanded_20260925';

// Fetch all courses from Real REST API Backend DB with fallback
export async function fetchCoursesFromAPI() {
  // Always retrieve authoritative synced DB (auto-purging old legacy mock cache)
  try {
    const res = await fetch('/api/courses');
    if (res.ok) {
      const contentType = res.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          const hasLegacy = json.data.some(c => /^c(?:[1-9]|1[0-2])$/.test(String(c.id)));
          if (!hasLegacy) {
            saveCoursesToDB(json.data);
            return json.data;
          }
        }
      }
    }
  } catch (err) {
    console.warn('[REAL DB CLIENT] Real REST API server offline, fallback to localStorage:', err);
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
          c.title.includes('전통 한식 조리 마스터') ||
          c.title.includes('일식 횟집') ||
          c.title.includes('파스타 & 파인다이닝') ||
          c.title.includes('대박 분식집')
      );
      if (Array.isArray(parsed) && parsed.length > 0 && !hasLegacyMock) {
        return parsed;
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

export function saveCoursesToDB(courses) {
  if (!Array.isArray(courses) || courses.length === 0) return;
  localStorage.setItem('kfssec_courses_version', DB_VERSION);
  localStorage.setItem('kfssec_courses_db', JSON.stringify(courses));
  try {
    window.dispatchEvent(new Event('kfssec_courses_updated'));
  } catch (e) {
    // Ignore in non-browser context
  }
}

// REST API POST Create Course
export async function createCourseAPI(courseData) {
  const newCourse = {
    ...courseData,
    id: courseData.id || `c${Date.now()}`,
  };

  try {
    const res = await fetch('/api/courses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCourse),
    });
    if (res.ok) {
      const contentType = res.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const json = await res.json();
        if (json.success && json.data) {
          const current = getCoursesFromDB();
          const updated = [json.data, ...current];
          saveCoursesToDB(updated);
          return json.data;
        }
      }
    }
  } catch (err) {
    console.warn('Real API create error, saving locally:', err);
  }

  const current = getCoursesFromDB();
  const updated = [newCourse, ...current];
  saveCoursesToDB(updated);
  return newCourse;
}

// REST API PUT Update Course with 100% robust string ID matching
export async function updateCourseAPI(id, courseData) {
  let updatedPayload = courseData;

  try {
    const res = await fetch(`/api/courses/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(courseData),
    });
    if (res.ok) {
      const contentType = res.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const json = await res.json();
        if (json.success && json.data) {
          updatedPayload = json.data;
        }
      }
    }
  } catch (err) {
    console.warn('Real API update error, saving locally:', err);
  }

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

  saveCoursesToDB(updated);
  return updatedPayload;
}

// REST API DELETE Course
export async function deleteCourseAPI(id) {
  try {
    const res = await fetch(`/api/courses/${id}`, {
      method: 'DELETE',
    });
    if (res.ok) {
      const contentType = res.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const json = await res.json();
        if (json.success) {
          // Proceed
        }
      }
    }
  } catch (err) {
    console.warn('Real API delete error, saving locally:', err);
  }

  const current = getCoursesFromDB();
  const idStr = String(id);
  const updated = current.filter((c) => {
    const cIdStr = String(c.id);
    return !(cIdStr === idStr || cIdStr === `c${idStr}` || `c${cIdStr}` === idStr);
  });
  saveCoursesToDB(updated);
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
