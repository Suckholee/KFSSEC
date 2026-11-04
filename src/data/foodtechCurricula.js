export const FOODTECH_CURRICULUM_REVISION = '2026-11-04';

export const foodtechCurricula = {
  '2급': {
    label: '실무자 과정',
    description: '2급은 매장 현장에서 스마트 주방 운영, POS/주문 시스템 관리, 데이터 수집 및 운용을 직접 실행하는 실무 역량 중심의 커리큘럼입니다.',
    assessment: '스마트 매장 기기 및 POS 시스템 통합 작동 실습, 2급 실기시험 대응 종합 과제 평가',
    modules: [
      { title: '푸드테크의 이해와 스마트 매장 기초', topics: ['푸드테크의 개념과 외식업 현장 적용 범위', '스마트 주방 및 디지털 매장 운영의 기본 구조 이해'] },
      { title: '스마트 주방 기기 및 자동화 설비 운영', topics: ['조리 로봇, 자동 튀김기, 스마트 오븐 등 주방 기기 조작법 및 안전 관리', '기기 유지보수 및 일일 점검 매뉴얼 실무'] },
      { title: '디지털 주문·결제 시스템(POS/키오스크/테이블오더) 운용', topics: ['POS, 키오스크, 테이블오더 시스템 연동 및 작동원리', '주문 오류 및 결제 시스템 장애 발생 시 대응 대책'] },
      { title: '배달 플랫폼 및 스마트 서빙 솔루션 연동', topics: ['배달 대행 및 주문 통합 관리 프로그램(O2O) 활용법', '서빙 로봇 동선 지정 및 현장 운영 가이드'] },
      { title: '매장 데이터 수집과 기초 매출/재고 관리', topics: ['POS 및 주문 데이터 추출과 일별/시간대별 매출 분석', '재고 관리 소프트웨어를 활용한 식자재 수량 수집 및 로스율 감소 실무'] },
      { title: '고객 데이터(CRM) 수집 및 기본 마케팅 활용', topics: ['포인트 적립, 알림톡, 모바일 쿠폰 시스템을 통한 고객 데이터 구축', '데이터를 활용한 단골 고객 관리 및 재방문 유도 실무'] },
      { title: '2급 실무 평가 및 디지털 매장 운영 종합 실습', topics: ['스마트 매장 기기 및 POS 시스템 통합 작동 실습', '2급 실기시험 대응 종합 과제 평가'] },
    ],
  },
  '1급': {
    label: '전문가 과정',
    description: '1급은 외식업 디지털 운영 설계, 주방 동선 최적화, 푸드테크 시스템 도입 기획 및 컨설팅을 총괄하는 고급 전문가 과정입니다.',
    assessment: '실제 매장 사례 분석을 통한 푸드테크 설계 도면 및 기획서 작성, 푸드테크 컨설팅 제안서 발표 및 1급 자격 실기 심사',
    modules: [
      { title: '외식업 디지털 트랜스포메이션(DX)과 운영 설계 전략', topics: ['외식업 맞춤형 푸드테크 기술 분석 및 DX 기획', '업종·규모별 디지털 매장 컨셉 설계 및 ROI(투자대비효과) 산출'] },
      { title: '스마트 주방 레이아웃 및 동선 최적화 설계', topics: ['조리 동선과 서빙 동선의 교차 최소화를 위한 주방 공간 설계', '푸드테크 기기(조리 로봇, 자동화 설비) 배치를 고려한 주방 인테리어 기획'] },
      { title: '스마트 주방 인프라 및 가스·전기·통신 데이터 설계', topics: ['푸드테크 기기 도입을 위한 전기용량, 급배수, 환기(후드) 공학적 설계', '매장 내 IoT 센서 및 Wi-Fi/통신 네트워크 데이터 망 구축'] },
      { title: '통합 데이터 기반 외식 경영 시스템 구축', topics: ['POS, ERP, CRM 데이터 통합 분석을 통한 매장 경영 효율화', '식자재 자동 발주 시스템 및 AI 데이터 기반 수요 예측 기획'] },
      { title: '푸드테크 시스템 도입 컨설팅 및 비용 최적화', topics: ['신규 창업 및 기존 매장 리뉴얼 시 푸드테크 도입 맞춤형 컨설팅 프로세스', '정부 지원 사업 활용 및 자본 예산(CAPEX/OPEX) 산출 전략'] },
      { title: '푸드테크 매장 보안, 안전 및 표준 운영 절차(SOP) 수립', topics: ['매장 디지털 보안, 고객 개인정보 보호 및 시스템 백업 체계 구축', '푸드테크 매장 표준 운영 매뉴얼(SOP) 작성 및 직원 교육 전략'] },
      { title: '1급 전문가 과정 종합 컨설팅 프로젝트 및 실기 평가', topics: ['실제 매장 사례 분석을 통한 푸드테크 설계 도면 및 기획서 작성', '푸드테크 컨설팅 제안서 발표 및 1급 자격 실기 심사'] },
    ],
  },
};

export function foodtechCourseContent(grade) {
  const curriculum = foodtechCurricula[grade];
  return {
    courseLabel: curriculum.label,
    description: curriculum.description,
    assessment: curriculum.assessment,
    curriculum: curriculum.modules,
    curriculumRevision: FOODTECH_CURRICULUM_REVISION,
  };
}

// Apply the supplied curriculum to pre-update API/cache records without changing
// administrator-managed images, prices, schedules, or unrelated courses.
export function withCurrentCourseContent(courses) {
  return courses.map(course => {
    const grade = course.id === 'qualification-foodtech-1' ? '1급'
      : course.id === 'qualification-foodtech-2' ? '2급' : null;
    if (!grade || course.curriculumRevision >= FOODTECH_CURRICULUM_REVISION) return course;
    return { ...course, ...foodtechCourseContent(grade) };
  });
}
