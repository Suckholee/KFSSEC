// Central Dynamic Database Store for Courses, Schedules, and Certification Exams
// Supports full CRUD and localStorage persistence for Administrator operations

const DEFAULT_COURSES_DB = [
  {
    id: 'c1',
    title: '전통 한식 조리 마스터 & 셰프 창업 과정',
    category: 'hansik',
    categoryName: '한식',
    industry: '한식',
    stage: '매장 오픈',
    format: '오프라인',
    price: 4500000,
    discountRate: 35,
    duration: '4주 과정',
    startDate: '2024-03-05',
    endDate: '2024-04-02',
    examDate: '2024-03-24',
    certName: '한식 조리기능장 및 지도사 1급',
    instructor: '안형상 이사장 / 40년 명장',
    image: '/images/course_menu_dev.jpg',
    description: '특급호텔 40년 경력 명장이 직접 전수하는 100년 전통 발효 소스 및 한식 시그니처 레시피 전수',
  },
  {
    id: 'c2',
    title: '일식 횟집 & 초밥 오마카세 창업 실무',
    category: 'ilsik',
    categoryName: '일식',
    industry: '일식',
    stage: '메뉴 개발',
    format: '오프라인',
    price: 5200000,
    discountRate: 30,
    duration: '4주 과정',
    startDate: '2024-03-12',
    endDate: '2024-04-09',
    examDate: '2024-03-28',
    certName: '일식 오마카세 전문가 자격증',
    instructor: '김명진 일식 조리명인',
    image: '/images/course_restaurant.jpg',
    description: '최상급 활어 오로시, 성게알 타르타르 레이어링 및 오마카세 동선 설계 집중 교육',
  },
  {
    id: 'c3',
    title: '배달전문점 & 밀키트 HMR 식품 제조 실무',
    category: 'delivery',
    categoryName: '배달/밀키트',
    industry: '배달/밀키트',
    stage: '창업 준비',
    format: '온라인',
    price: 3200000,
    discountRate: 40,
    duration: '3주 과정',
    startDate: '2024-03-18',
    endDate: '2024-04-08',
    examDate: '2024-04-05',
    certName: 'HMR/RMR 레시피 개발 전문가',
    instructor: '이창민 유통 컨설턴트',
    image: '/images/course_delivery.jpg',
    description: '배달 플랫폼 알고리즘 공략 및 식품 위생 유통 진단 가이드라인',
  },
  {
    id: 'c4',
    title: '파스타 & 파인다이닝 레스토랑 창업',
    category: 'yangsik',
    categoryName: '양식',
    industry: '양식',
    stage: '입지 선정',
    format: '혼합형',
    price: 6000000,
    discountRate: 25,
    duration: '4주 과정',
    startDate: '2024-03-20',
    endDate: '2024-04-17',
    examDate: '2024-04-12',
    certName: '외식경영 관리사 1급',
    instructor: '박성호 총주방장',
    image: '/images/course_cafe.jpg',
    description: '생면 파스타 제조법 및 트렌디한 브런치 카페 대표 메뉴 수강',
  },
];

export function getCoursesFromDB() {
  const saved = localStorage.getItem('kfssec_courses_db');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse courses DB from localStorage:', e);
    }
  }
  return DEFAULT_COURSES_DB;
}

export function saveCoursesToDB(courses) {
  localStorage.setItem('kfssec_courses_db', JSON.stringify(courses));
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
        title: `${c.title.slice(0, 10)}... 종강/발표회`,
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
