// Central Dynamic Database Service - Communicates with Real REST API Server (/api/courses)
// Authoritative 12 Real Landing Page Courses Dataset

const DEFAULT_COURSES = [
  {
    id: 'c1',
    title: '외식창업 성공전략 마스터',
    category: 'hansik',
    categoryName: '한식',
    industry: '한식',
    stage: '창업 준비',
    format: '오프라인',
    price: 234000,
    discountRate: 10,
    duration: '4주 과정',
    startDate: '2026-09-05',
    endDate: '2026-10-03',
    examDate: '2026-09-24',
    certName: '외식창업 성공전략 지도사',
    instructor: '김도윤 수석 강사',
    image: '/images/course_net_1.jpg',
    description: '아이디어 기획부터 사업계획서 작성, 매장 인허가 및 성공적인 오픈 전략 완벽 전수',
  },
  {
    id: 'c2',
    title: '상권·입지 분석 실전',
    category: 'hansik',
    categoryName: '한식',
    industry: '한식',
    stage: '입지 선정',
    format: '오프라인',
    price: 216000,
    discountRate: 10,
    duration: '3주 과정',
    startDate: '2026-09-12',
    endDate: '2026-10-10',
    examDate: '2026-09-28',
    certName: '외식 상권분석 전문가',
    instructor: '박지훈 소장',
    image: '/images/course_net_2.jpg',
    description: '빅데이터 기반 유동인구 분석 및 데이터로 찾는 성공 입지 진단 핵심 노하우',
  },
  {
    id: 'c3',
    title: '메뉴개발과 원가관리',
    category: 'hansik',
    categoryName: '한식',
    industry: '한식',
    stage: '메뉴 개발',
    format: '혼합형',
    price: 190000,
    discountRate: 5,
    duration: '4주 과정',
    startDate: '2026-09-18',
    endDate: '2026-10-09',
    examDate: '2026-10-05',
    certName: '메뉴개발 및 원가관리사',
    instructor: '이수진 셰프',
    image: '/images/course_net_3.jpg',
    description: '수익을 만드는 메뉴 설계, 레시피 표준화 및 식자재 원가율 계산 마스터 커리큘럼',
  },
  {
    id: 'c4',
    title: '매장 운영·서비스 관리',
    category: 'hansik',
    categoryName: '한식',
    industry: '한식',
    stage: '매장 운영',
    format: '오프라인',
    price: 260000,
    discountRate: 13,
    duration: '4주 과정',
    startDate: '2026-09-20',
    endDate: '2026-10-18',
    examDate: '2026-10-12',
    certName: '외식 매장운영 관리사 1급',
    instructor: '최민석 대표',
    image: '/images/course_net_4.jpg',
    description: '재방문을 만드는 운영 노하우, 직원 교육, 서비스 관리 및 매장 매출 증대 가이드',
  },
  {
    id: 'c5',
    title: '외식업 마케팅 실전',
    category: 'cafe',
    categoryName: '카페/디저트',
    industry: '카페/디저트',
    stage: '마케팅/브랜딩',
    format: '온라인',
    price: 120000,
    discountRate: 0,
    duration: '2주 과정',
    startDate: '2026-09-22',
    endDate: '2026-10-13',
    examDate: '2026-10-15',
    certName: '외식 마케팅 지도사 2급',
    instructor: '정하늘 마케팅 팀장',
    image: '/images/course_net_5.jpg',
    description: '온라인 홍보부터 네이버 플레이스 공략, SNS 바이럴 및 단골 고객 관리 기법',
  },
  {
    id: 'c6',
    title: '프랜차이즈 창업의 이해',
    category: 'etc',
    categoryName: '기타',
    industry: '기타',
    stage: '창업 준비',
    format: '온라인',
    price: 150000,
    discountRate: 25,
    duration: '2주 과정',
    startDate: '2026-09-25',
    endDate: '2026-10-09',
    examDate: '2026-10-10',
    certName: '프랜차이즈 경영 관리사',
    instructor: '오세훈 가맹거래사',
    image: '/images/course_net_6.jpg',
    description: '가맹사업 준비와 본사 계약, 정보공개서 분석 및 프랜차이즈 수익 구조 이해',
  },
  {
    id: 'c7',
    title: '배달매장 운영 전략',
    category: 'delivery',
    categoryName: '배달/밀키트',
    industry: '배달/밀키트',
    stage: '성장/확장',
    format: '온라인',
    price: 160000,
    discountRate: 13,
    duration: '3주 과정',
    startDate: '2026-09-27',
    endDate: '2026-10-25',
    examDate: '2026-10-18',
    certName: 'HMR/배달 매장 전문가',
    instructor: '윤서연 디렉터',
    image: '/images/course_net_7.jpg',
    description: '배달 플랫폼 깃발 알고리즘 공략 및 배달 전용 매장 매출 높이기 핵심 실무',
  },
  {
    id: 'c8',
    title: '식품위생 및 안전관리',
    category: 'etc',
    categoryName: '기타',
    industry: '기타',
    stage: '매장 운영',
    format: '오프라인',
    price: 180000,
    discountRate: 10,
    duration: '2주 과정',
    startDate: '2026-09-29',
    endDate: '2026-10-13',
    examDate: '2026-10-16',
    certName: '식품위생 관리사 자격증',
    instructor: '임성호 위생사',
    image: '/images/course_net_8.jpg',
    description: '식약처 점검 대비, 현장 중심 위생관리 수칙 및 HACCP 기반 식품 안전 관리',
  },
  {
    id: 'c9',
    title: '외식창업 마스터 풀 패키지',
    category: 'etc',
    categoryName: '기타',
    industry: '기타',
    stage: '창업 준비',
    format: '혼합형',
    price: 450000,
    discountRate: 20,
    duration: '8주 패키지',
    startDate: '2026-10-01',
    endDate: '2026-11-15',
    examDate: '2026-11-20',
    certName: '외식창업 마스터 풀 패키지 수료증',
    instructor: '안형상 이사장 / 40년 명장팀',
    image: '/images/package_card_1.png',
    description: '창업기획, 사업계획서 작성, 상권분석, 매장 인허가까지 한 번에 완성하는 외식창업 대표 패키지',
  },
  {
    id: 'c10',
    title: '메뉴개발·원가관리 풀 패키지',
    category: 'hansik',
    categoryName: '한식',
    industry: '한식',
    stage: '메뉴 개발',
    format: '혼합형',
    price: 390000,
    discountRate: 15,
    duration: '6주 패키지',
    startDate: '2026-10-03',
    endDate: '2026-11-24',
    examDate: '2026-11-28',
    certName: '메뉴개발 표준화 마스터 수료증',
    instructor: '이수진 셰프 & 명인팀',
    image: '/images/package_card_2.png',
    description: '메뉴기획, 레시피 표준화, 원가계산, 가격전략 수강생 전용 올인원 마스터 패키지',
  },
  {
    id: 'c11',
    title: '매장운영·서비스 풀 패키지',
    category: 'etc',
    categoryName: '기타',
    industry: '기타',
    stage: '매장 운영',
    format: '혼합형',
    price: 420000,
    discountRate: 18,
    duration: '6주 패키지',
    startDate: '2026-10-05',
    endDate: '2026-11-30',
    examDate: '2026-12-05',
    certName: '외식매장 통합 운영 이수증',
    instructor: '최민석 대표 & 직강팀',
    image: '/images/package_card_3.png',
    description: '인력관리, 고객응대, 위생관리, 매출관리 오래 사랑받는 매장 운영의 정석 패키지',
  },
  {
    id: 'c12',
    title: '외식마케팅·프랜차이즈 풀 패키지',
    category: 'delivery',
    categoryName: '배달/밀키트',
    industry: '배달/밀키트',
    stage: '마케팅/브랜딩',
    format: '혼합형',
    price: 380000,
    discountRate: 25,
    duration: '6주 패키지',
    startDate: '2026-10-08',
    endDate: '2026-12-10',
    examDate: '2026-12-15',
    certName: '외식 브랜딩 마케터 1급',
    instructor: '정하늘 & 오세훈 디렉터',
    image: '/images/package_card_4.png',
    description: '브랜딩, 온라인 마케팅, 배달 플랫폼, 가맹사업 매출 성장과 확장을 한 번에 완성하는 패키지',
  },
];

// Fetch all courses from Real REST API Backend DB with fallback
export async function fetchCoursesFromAPI() {
  try {
    const res = await fetch('/api/courses');
    if (res.ok) {
      const contentType = res.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          saveCoursesToDB(json.data);
          return json.data;
        }
      }
    }
  } catch (err) {
    console.warn('[REAL DB CLIENT] Real REST API server offline, fallback to localStorage:', err);
  }

  // Fallback to localStorage or default
  return getCoursesFromDB();
}

export function getCoursesFromDB() {
  const saved = localStorage.getItem('kfssec_courses_db');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      // Force refresh if old mock title exists
      if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].title.includes('성공전략 마스터')) {
        return parsed;
      }
    } catch (e) {
      console.error('Failed to parse courses DB from localStorage:', e);
    }
  }
  localStorage.setItem('kfssec_courses_db', JSON.stringify(DEFAULT_COURSES));
  return DEFAULT_COURSES;
}

export function saveCoursesToDB(courses) {
  if (!Array.isArray(courses) || courses.length === 0) return;
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
