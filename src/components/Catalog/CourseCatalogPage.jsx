import React, { useState, useEffect } from 'react';
import SubSidebar from '../common/SubSidebar';
import CourseGrid from './CourseGrid';
import CourseModal from '../CourseModal';
import QualificationGuide from './QualificationGuide';
import { getCoursesFromDB, fetchCoursesFromAPI } from '../../services/courseDatabase';

export default function CourseCatalogPage({ initialSubTab = 'courses' }) {
  const [subTab, setSubTab] = useState(initialSubTab);
  const [courses, setCourses] = useState(getCoursesFromDB);
  const [search, setSearch] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [guideId, setGuideId] = useState('advisor');
  useEffect(() => setSubTab(initialSubTab), [initialSubTab]);
  useEffect(() => {
    const update = () => setCourses(getCoursesFromDB());
    window.addEventListener('kfssec_courses_updated', update);
    fetchCoursesFromAPI();
    return () => window.removeEventListener('kfssec_courses_updated', update);
  }, []);
  const filtered = courses.filter(c => `${c.title} ${c.instructor} ${c.description}`.includes(search.trim())).map(c => ({ ...c, priceFormatted: c.price == null ? '수강료 문의' : `${Number(c.price).toLocaleString()}원` }));
  const dates = courses.filter(c => subTab === 'schedule' ? c.startDate : c.examDate);
  return <div className="bg-stone-50 min-h-screen py-8 px-4 sm:px-8 lg:px-12"><div className="max-w-[1500px] mx-auto flex flex-col md:flex-row gap-8 items-start">
    <SubSidebar title="교육·자격증" activeId={subTab} onSelectTab={setSubTab} items={[{id:'courses',label:'교육 과정'},{id:'guide',label:'자격과정 안내'},{id:'schedule',label:'교육 일정'},{id:'cert_exam',label:'자격 시험'},{id:'exam_schedule',label:'시험 일정'}]}/>
    <div className="w-full flex-1 min-w-0">
      {subTab === 'courses' && <section className="space-y-7"><header><p className="text-sm font-bold text-[#0B3C26]">한국외식창업교육원</p><h1 className="text-3xl font-black mt-2">교육 과정</h1><p className="text-gray-600 mt-3">외식창업과 한국음식 분야의 전문성을 키우는 온라인 자격과정입니다.</p></header><label className="block"><span className="sr-only">과정명 또는 교수명 검색</span><input type="search" value={search} onChange={e=>setSearch(e.target.value)} placeholder="과정명 또는 교수명 검색" className="w-full bg-white border border-stone-300 rounded-xl px-4 py-3"/></label><p className="text-sm text-gray-500">총 {filtered.length}개 과정</p><CourseGrid courses={filtered} loading={false} viewMode="grid" onSelectCourse={setSelectedCourse} onResetFilters={()=>setSearch('')}/><div className="rounded-2xl bg-white border border-stone-200 p-6"><h2 className="font-bold text-lg">전문 자격과 발급 안내</h2><p className="text-sm text-gray-600 mt-2">등급별 직무, 외식명인·소믈리에 파티컨설턴트·푸드테크 설계사 및 자격증 발급 절차를 확인하세요.</p><button onClick={()=>setSubTab('guide')} className="text-[#0B3C26] font-bold mt-4">자격과정 안내 보기 →</button></div></section>}
      {(subTab === 'guide' || subTab === 'cert_exam') && <QualificationGuide key={guideId} initialSelected={guideId}/>}
      {(subTab === 'schedule' || subTab === 'exam_schedule') && <section><h1 className="text-3xl font-black mb-6">{subTab === 'schedule' ? '교육 일정' : '시험 일정'}</h1>{dates.length ? <div className="space-y-3">{dates.map(c=><div key={c.id} className="bg-white border rounded-xl p-5"><h2 className="font-bold">{c.title}</h2><p className="mt-2">{subTab === 'schedule' ? c.startDate : c.examDate}</p></div>)}</div> : <div className="bg-white border border-stone-200 rounded-2xl p-8"><h2 className="text-xl font-bold">일정은 교육원으로 문의해 주세요.</h2><p className="mt-3 text-gray-600">온라인 2급 과정의 수강 기간은 4주 이내입니다. 개강일과 검정일은 상담을 통해 안내해 드립니다.</p><a href="tel:01072446796" className="inline-block mt-5 font-bold text-[#0B3C26]">010-7244-6796</a></div>}</section>}
    </div>
    <CourseModal course={selectedCourse} onClose={()=>setSelectedCourse(null)} onViewGuide={id=>{setGuideId(id);setSelectedCourse(null);setSubTab('guide');window.scrollTo({top:0,behavior:'smooth'});}}/>
  </div></div>;
}
