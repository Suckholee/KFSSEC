import { useLanguage } from '../../i18n/LanguageContext';
import React, { useState, useEffect } from 'react';
import SubSidebar from '../common/SubSidebar';
import CourseGrid from './CourseGrid';
import CourseModal from '../CourseModal';
import QualificationGuide from './QualificationGuide';
import { getCoursesFromDB, fetchCoursesFromAPI } from '../../services/courseDatabase';
import { useAdminEdit } from '../../context/AdminEditContext';
import EditableText from '../Admin/InlineEditor/EditableText';
import AdminCourses from '../Admin/AdminCourses';
import { BookOpen, X, Sparkles } from 'lucide-react';
import SectorBlock from '../Admin/InlineEditor/SectorBlock';

export default function CourseCatalogPage({ initialSubTab = 'courses', onGoToConsulting }) {
  const { tr, language } = useLanguage();
  const { isEditMode, siteDraft } = useAdminEdit();
  const [subTab, setSubTab] = useState(initialSubTab);
  const [courses, setCourses] = useState(getCoursesFromDB);
  const [search, setSearch] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [guideId, setGuideId] = useState('advisor');
  const [isCoursesAdminOpen, setIsCoursesAdminOpen] = useState(false);

  useEffect(() => setSubTab(initialSubTab), [initialSubTab]);
  useEffect(() => {
    const update = () => setCourses(getCoursesFromDB());
    window.addEventListener('kfssec_courses_updated', update);
    fetchCoursesFromAPI();
    return () => window.removeEventListener('kfssec_courses_updated', update);
  }, []);
  const filtered = courses.filter(c => `${c.title} ${c.instructor} ${c.description} ${tr(c.title)} ${tr(c.instructor)} ${tr(c.description)}`.toLowerCase().includes(search.trim().toLowerCase())).map(c => ({ ...c, priceFormatted: c.price == null ? '수강료 문의' : tr`${Number(c.price).toLocaleString()}원` }));
  const dates = courses.filter(c => subTab === 'schedule' ? c.startDate : c.examDate);

  return (
    <div className="bg-stone-50 min-h-screen py-8 px-4 sm:px-8 lg:px-12">
      <div className="max-w-[1500px] mx-auto flex flex-col md:flex-row gap-8 items-start">
        <SubSidebar
          title={tr("교육·자격증")}
          activeId={subTab}
          onSelectTab={setSubTab}
          items={[
            { id: 'courses', label: '교육 과정' },
            { id: 'guide', label: '자격과정 안내' },
            { id: 'schedule', label: '교육 일정' },
            { id: 'cert_exam', label: '자격 시험' },
            { id: 'exam_schedule', label: '시험 일정' },
          ]}
        />
        <div
          id="subsidebar-content-anchor"
          key={subTab}
          className="w-full flex-1 min-w-0 animate-content-slide-up"
        >
          {subTab === 'courses' && (
            <SectorBlock
              sectorId="S-CAT-01"
              sectorName="온라인 교육 과정 목록 & 검색"
              pageKey="catalog"
              editContentLabel="📚 교육 과정 전체 관리 (추가/수정/삭제)"
              onEditContent={() => setIsCoursesAdminOpen(true)}
              customActions={[
                {
                  label: '📚 교육 과정 등록/수정/가격 관리',
                  onClick: () => setIsCoursesAdminOpen(true),
                },
              ]}
            >
              <section className="space-y-7">
                <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div>
                    <p className="text-sm font-bold text-[#15803D]">
                      <EditableText
                        path="catalogPage.subHeader"
                        value={siteDraft?.catalogPage?.subHeader || tr("한국외식창업교육원")}
                      />
                    </p>
                    <h1 className="text-3xl font-black mt-2">
                      <EditableText
                        path="catalogPage.title"
                        value={siteDraft?.catalogPage?.title || tr("교육 과정")}
                      />
                    </h1>
                    <p className="text-gray-600 mt-3">
                      <EditableText
                        path="catalogPage.desc"
                        multiline
                        value={siteDraft?.catalogPage?.desc || tr("외식창업과 한국음식 분야의 전문성을 키우는 온라인 자격과정입니다.")}
                      />
                    </p>
                  </div>
                  {isEditMode && (
                    <button
                      type="button"
                      onClick={() => setIsCoursesAdminOpen(true)}
                      className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer border border-amber-400/80 shrink-0 self-start sm:self-auto"
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>교육 과정 전체 관리</span>
                    </button>
                  )}
                </header>
                <label className="block">
                  <span className="sr-only">{tr("과정명 또는 교수명 검색")}</span>
                  <input type="search" value={search} onChange={e=>setSearch(e.target.value)} placeholder={tr("과정명 또는 교수명 검색")} className="w-full bg-white border border-stone-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#15803D]/20 focus:border-[#15803D]"/>
                </label>
                <p className="text-sm text-gray-500">{tr("총 ")}{tr(filtered.length)}{tr("개 과정")}</p>
                <CourseGrid courses={filtered} loading={false} viewMode="grid" onSelectCourse={setSelectedCourse} onResetFilters={()=>setSearch('')}/>
                <div className="rounded-2xl bg-white border border-stone-200 p-6">
                  <h2 className="font-bold text-lg">{tr("전문 자격과 발급 안내")}</h2>
                  <p className="text-sm text-gray-600 mt-2">{tr("등급별 직무, 외식명인·소믈리에 파티컨설턴트·푸드테크 설계사 및 자격증 발급 절차를 확인하세요.")}</p>
                  <button onClick={()=>setSubTab('guide')} className="text-[#15803D] hover:text-[#EA580C] font-bold mt-4 cursor-pointer transition-colors">{tr("자격과정 안내 보기 →")}</button>
                </div>
              </section>
            </SectorBlock>
          )}
      {(subTab === 'guide' || subTab === 'cert_exam') && (
        <SectorBlock sectorId={subTab === 'guide' ? 'S-CAT-02' : 'S-CAT-04'} sectorName={subTab === 'guide' ? '자격과정 안내 및 발급 절차' : '자격 시험 및 검정 과목'} pageKey="catalog">
          <QualificationGuide key={guideId} initialSelected={guideId} onGoToConsulting={onGoToConsulting}/>
        </SectorBlock>
      )}
      {(subTab === 'schedule' || subTab === 'exam_schedule') && (
        <SectorBlock sectorId={subTab === 'schedule' ? 'S-CAT-03' : 'S-CAT-05'} sectorName={subTab === 'schedule' ? '교육 및 개강 접수 일정' : '자격 검정 시험 일정'} pageKey="catalog">
          <section>
            <h1 className="text-3xl font-black mb-6">{tr(subTab === 'schedule' ? '교육 일정' : '시험 일정')}</h1>
            {dates.length ? (
              <div className="space-y-3">
                {dates.map(c=><div key={c.id} className="bg-white border rounded-xl p-5"><h2 className="font-bold">{tr(c.title)}</h2><p className="mt-2">{tr(subTab === 'schedule' ? c.startDate : c.examDate)}</p></div>)}
              </div>
            ) : (
              <div className="bg-white border border-stone-200 rounded-2xl p-8">
                <h2 className="text-xl font-bold">{tr("일정은 교육원으로 문의해 주세요.")}</h2>
                <p className="mt-3 text-gray-600">{tr("온라인 2급 과정의 수강 기간은 4주 이내입니다. 개강일과 검정일은 상담을 통해 안내해 드립니다.")}</p>
                <div className="flex flex-wrap gap-3 mt-5">
                  <a href="tel:01072446796" className="inline-flex items-center gap-1.5 font-bold text-[#15803D] bg-[#F0FDF4] border border-[#DCFCE7] px-4 py-2.5 rounded-xl">📞 010-7244-6796</a>
                  {onGoToConsulting && <button onClick={onGoToConsulting} className="bg-gradient-to-r from-[#EA580C] to-[#F97316] hover:from-[#C2410C] hover:to-[#EA580C] text-white font-black px-4 py-2.5 rounded-xl shadow-xs cursor-pointer border border-orange-300/40">⚡ 1:1 상담 신청하기</button>}
                </div>
              </div>
            )}
          </section>
        </SectorBlock>
      )}
        </div>
      </div>

      {/* Admin Courses Management Modal */}
      {isCoursesAdminOpen && (
        <div
          onClick={() => setIsCoursesAdminOpen(false)}
          className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#F8FAF9] rounded-3xl shadow-2xl border border-[#CCE4D6] w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden text-gray-900"
          >
            {/* Modal Header */}
            <div className="px-6 py-4 bg-[#F2F8F4] border-b border-[#D0E7DA] flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-[#D8EDE0] text-[#1B5539] rounded-2xl border border-[#BCE1CB] shadow-xs">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-black text-[#153D28]">온라인 교육 과정 전체 관리</h3>
                    <span className="px-2 py-0.5 rounded-full bg-[#E0F2E7] text-[#1B5E3C] text-[10px] font-bold border border-[#BFE5CE]">관리자 모드</span>
                  </div>
                  <p className="text-xs text-[#396D51] font-medium mt-0.5">신규 강좌 등록, 수강료 설정, 썸네일 사진 교체 및 마우스 드래그 순서 변경</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsCoursesAdminOpen(false)}
                className="p-2 text-[#467A5E] hover:text-[#153D28] hover:bg-[#E2F1E8] rounded-xl transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6 bg-[#F8FAF9]">
              <AdminCourses />
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3.5 bg-white border-t border-[#DDECE3] flex justify-end shrink-0">
              <button
                type="button"
                onClick={() => {
                  setIsCoursesAdminOpen(false);
                  setCourses(getCoursesFromDB());
                }}
                className="px-6 py-2.5 bg-[#32875D] hover:bg-[#276F4B] text-white font-black text-xs sm:text-sm rounded-xl shadow-xs hover:shadow-md transition-all cursor-pointer"
              >
                완료 및 닫기
              </button>
            </div>
          </div>
        </div>
      )}

      <CourseModal
        course={selectedCourse}
        onClose={() => setSelectedCourse(null)}
        onGoToConsulting={onGoToConsulting}
        onViewGuide={(id) => {
          setGuideId(id);
          setSelectedCourse(null);
          setSubTab('guide');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}
