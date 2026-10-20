import React, { useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { useAdminEdit } from '../../context/AdminEditContext';
import { getQualificationFaqs } from '../../data/qualificationFaqs';
import FaqListEditor from '../Admin/InlineEditor/FaqListEditor';
import EditableText from '../Admin/InlineEditor/EditableText';

export default function QualificationFaqSection() {
  const { tr } = useLanguage();
  const { isEditMode, siteDraft, updateSiteField, updateSiteDraft } = useAdminEdit();
  const [isManaging, setIsManaging] = useState(false);
  const items = getQualificationFaqs(siteDraft);
  const shown = items.filter(item => isEditMode || item.visible !== false);
  const updateItem = (id, patch) => updateSiteDraft(site => ({ ...site, qualificationFaqs: getQualificationFaqs(site).map(item => item.id === id ? { ...item, ...patch } : item) }));
  if (!isEditMode && !shown.length) return null;
  return <section aria-label="자주 묻는 질문" className="space-y-2">
    <div className="flex flex-wrap gap-3 justify-between items-center mb-5"><h2 className="text-2xl font-black text-gray-900">{tr('자주 묻는 질문')}</h2>{isEditMode && <div data-content-editor-ui><button type="button" onClick={() => setIsManaging(true)} className="rounded-lg bg-amber-400 text-slate-950 font-bold px-4 py-2">FAQ 목록 관리</button><p className="text-xs text-slate-600 mt-1">질문·답변 추가/삭제 · 순서 · 공개 여부</p></div>}</div>
    {shown.map(item => <details key={item.id} className={`border-b border-stone-200 py-5 ${item.visible === false ? 'bg-slate-50 opacity-70' : ''}`}>
      <summary className="font-bold cursor-pointer text-gray-900">{isEditMode ? <><EditableText value={item.question} onChange={question => updateItem(item.id, { question })} />{item.visible === false && <span data-content-editor-ui className="ml-2 text-xs text-slate-600">비공개 · 관리자에게만 표시</span>}</> : tr(item.question)}</summary>
      <div className="mt-4 text-gray-600 leading-relaxed whitespace-pre-wrap">{isEditMode ? <EditableText as="p" multiline value={item.answer} onChange={answer => updateItem(item.id, { answer })} /> : <p>{tr(item.answer)}</p>}</div>
    </details>)}
    {isEditMode && !items.length && <p className="text-sm text-slate-600 py-5">등록된 질문이 없습니다. ‘FAQ 목록 관리’에서 질문을 추가하세요.</p>}
    {isManaging && isEditMode && <FaqListEditor items={items} onApply={next => updateSiteField('qualificationFaqs', next)} onClose={() => setIsManaging(false)} />}
  </section>;
}
