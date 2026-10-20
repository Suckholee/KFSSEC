// One registration per original resource; related pages intentionally reuse paths.
export const collections = {
  'Hero': { resourceBanners: ['heroBanners', '메인 배너·버튼 링크 목록', 'DEFAULT_HERO_BANNERS', 'S-HOME-01'] },
  'About/HistorySection': { milestones: ['history', '연혁 목록', 'defaultMilestones', 'S-ABOUT-02'] },
  'About/AboutPage': { pillars: ['strategicPillars', '12대 사업방향 목록', 'DEFAULT_PILLARS', 'S-ABOUT-00'] },
  'About/FacultySection': { facultyMembers: ['faculty', '교수진·자문위원 목록', 'resolveFaculty()', 'S-ABOUT-05'] },
  'About/GreetingsSection': { profileCards: ['managedLists.chairmanCareer', '이사장 경력·자격 카드'], highlightPoints: ['managedLists.instituteHighlights', '교육원 핵심 가치 목록'] },
  'About/OrganizationSection': { rawDivisions: ['managedLists.organizationDivisions', '조직 분과 목록', undefined, 'S-ABOUT-06'], businessFields: ['managedLists.businessFields', '사업 분야·담당 업무 목록', undefined, 'S-ABOUT-06'], partners: ['managedLists.organizationPartners', '조직도 협력기관 목록', undefined, 'S-ABOUT-06'] },
  'Consulting/JinIkjunProfileSection': { facultyMembers: ['faculty', '교수진·자문위원 목록', 'resolveFaculty()'], references: ['consultingCases', '컨설팅 실적·레퍼런스 목록', 'defaultConsultingCases', 'S-CON-03'], consultingFaqs: ['managedLists.consultingFaqs', '교수 컨설팅 FAQ 목록', undefined, 'S-CON-03'] },
  'Community/CommunityPage': { faqList: ['managedLists.communityFaqs', '커뮤니티 FAQ·분류 목록'] },
  'Catalog/QualificationGuide': { qualificationCatalog: ['managedLists.qualificationCatalog', '자격과정·등급·검정·후기 목록'], specialistQualifications: ['managedLists.specialistQualifications', '분야별 전문 자격 목록'] },
  'CategoryFocusSection': { specialistQualifications: ['managedLists.specialistQualifications', '분야별 전문 자격 목록'] },
  'Header': { mainMenuItems: ['managedLists.navigation', '상단 메뉴·하위 메뉴 목록'] },
  'Home/GlobalDiningTrendsSection': { articles: ['managedLists.diningTrends', '외식 트렌드 기사 목록', 'GLOBAL_DINING_TRENDS'] },
};
export const inlineCollectionFiles = new Set(['Consulting/ConsultingPage', 'Consulting/JinIkjunProfileSection', 'Catalog/QualificationGuide', 'CategoryFocusSection', 'Features']);
