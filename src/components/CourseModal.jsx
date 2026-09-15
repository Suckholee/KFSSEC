import { useLanguage } from '../i18n/LanguageContext';
import React, { useEffect } from 'react';
import { X } from 'lucide-react';
export default function CourseModal({ course, onClose, onViewGuide, onGoToConsulting }) {
  const { tr, language } = useLanguage();
  useEffect(() => {
    if (!course) return;
    const previous = document.activeElement;
    const close = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', close);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', close); document.body.style.overflow=overflow; previous?.focus(); };
  }, [course, onClose]);
  if (!course) return null;
  return <div onClick={onClose} className="fixed inset-0 z-[60] bg-black/60 flex items-center justify-center p-4"><section role="dialog" aria-modal="true" aria-labelledby="course-title" onClick={e=>e.stopPropagation()} onKeyDown={e=>{if(e.key==='Tab'){const nodes=e.currentTarget.querySelectorAll('button, a[href]');const first=nodes[0],last=nodes[nodes.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}}} className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"><button autoFocus onClick={onClose} aria-label={tr("닫기")} className="absolute top-3 right-3 rounded-full p-2 bg-white shadow"><X/></button><img src={course.image} alt="" className="block w-full h-auto object-contain"/><div className="p-6 sm:p-8 space-y-5"><h2 id="course-title" className="text-2xl font-black">{tr(course.title)}</h2><p className="text-gray-600 leading-relaxed">{tr(course.description)}</p><dl className="grid grid-cols-2 gap-4 text-sm">{[['담당 교수',course.instructor || '문의'],['수강 방식',course.format || '문의'],['수강 기간',course.duration || '문의'],['등록번호',course.registration || '문의'],['수강료',course.price == null?'수강료 문의':tr`${Number(course.price).toLocaleString()}원`],['검정 일정',course.examDate || '일정 문의']].map(([k,v])=><div key={k}><dt className="text-gray-500">{tr(k)}</dt><dd className="font-bold mt-1">{tr(v)}</dd></div>)}</dl><div className="border-t pt-5"><h3 className="font-bold">{tr("검정 내용")}</h3><p className="text-sm text-gray-600 leading-relaxed mt-2">{tr(course.assessment || '교육원 문의')}</p></div><div className="flex flex-wrap gap-2.5 pt-2">{onViewGuide && course.qualificationId && <button onClick={()=>onViewGuide(course.qualificationId)} className="border border-[#0B3C26] rounded-xl px-4 py-3 font-bold text-[#0B3C26] text-sm">{tr("과정 상세 안내")}</button>}<a href="tel:01072446796" className="bg-[#0B3C26] text-white rounded-xl px-4 py-3 font-bold text-sm">{tr("전화 문의")}</a>{onGoToConsulting && <button onClick={()=>{onClose();onGoToConsulting();}} className="bg-[#C5A059] hover:bg-[#B38F48] text-white rounded-xl px-4 py-3 font-black text-sm border border-[#D4AF37] shadow-xs">{tr("⚡ 1:1 온라인 문의")}</button>}</div></div></section></div>;
}
