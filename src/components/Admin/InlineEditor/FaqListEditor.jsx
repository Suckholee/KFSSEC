import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { moveFaq, validateFaqs } from '../../../data/qualificationFaqs';

export default function FaqListEditor({ items, onApply, onClose }) {
  const [draft, setDraft] = useState(() => items.map(item => ({ ...item })));
  const [error, setError] = useState('');
  const dialogRef = useRef(null);
  useEffect(() => {
    const opener = document.activeElement;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialogRef.current.querySelector('button')?.focus();
    const handleKey = event => {
      if (event.key === 'Escape') { event.preventDefault(); onClose(); }
      if (event.key !== 'Tab') return;
      const controls = [...dialogRef.current.querySelectorAll('button,input,textarea')].filter(el => !el.disabled);
      const first = controls[0], last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    document.addEventListener('keydown', handleKey);
    return () => { document.body.style.overflow = overflow; document.removeEventListener('keydown', handleKey); opener?.focus(); };
  }, []);
  const changeDraft = updater => { setError(''); setDraft(updater); };
  const update = (id, changes) => changeDraft(current => current.map(item => item.id === id ? { ...item, ...changes } : item));
  const apply = event => {
    event.preventDefault();
    const message = validateFaqs(draft);
    if (message) { setError(message); return; }
    onApply(draft.map(item => ({ ...item, question: item.question.trim(), answer: item.answer.trim() })));
    onClose();
  };
  return createPortal(<div data-content-editor-ui className="fixed inset-0 z-[100100] bg-slate-950/70 flex items-center justify-center p-3">
    <form ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="faq-list-title" onSubmit={apply} className="w-full max-w-3xl max-h-[90dvh] flex flex-col rounded-2xl bg-white text-slate-900 shadow-2xl">
      <div className="p-4 sm:p-5 border-b space-y-2">
        <div className="flex justify-between items-start gap-3"><div><h2 id="faq-list-title" className="text-lg font-bold">FAQ 목록 관리</h2><p className="text-sm text-slate-600 mt-1">자격과정 안내·자격 시험 화면에 공통으로 표시되는 질문 목록입니다.</p></div><button type="button" onClick={onClose} className="border rounded-lg px-3 py-2 shrink-0">닫기</button></div>
        <p className="text-xs text-slate-500">한국어 질문·답변을 관리합니다. 목록에 적용한 후 상단 ‘전체 저장’을 눌러야 방문자에게 반영됩니다. 닫기는 이 창의 변경을 취소합니다.</p>
        <p className="text-sm font-bold">전체 {draft.length}개 · 공개 {draft.filter(item => item.visible !== false).length}개</p>
      </div>
      <div className="overflow-y-auto p-4 sm:p-5 space-y-4">
        {!draft.length && <p className="text-sm text-slate-600">질문이 없습니다. 질문을 추가하거나 빈 목록으로 저장할 수 있습니다.</p>}
        {draft.map((item, index) => <fieldset key={item.id} className="border rounded-xl p-3 space-y-3">
          <legend className="font-bold px-1">{index + 1}번 질문</legend>
          <div className="flex flex-wrap gap-2 items-center">
            <label className="flex gap-2 items-center text-sm mr-auto"><input type="checkbox" checked={item.visible !== false} onChange={event => update(item.id, { visible: event.target.checked })} />방문자에게 공개</label>
            <button type="button" aria-label={`${index + 1}번 질문 위로 이동`} disabled={index === 0} onClick={() => changeDraft(current => moveFaq(current, index, -1))} className="border px-2 py-1 rounded disabled:opacity-30">↑ 위로</button>
            <button type="button" aria-label={`${index + 1}번 질문 아래로 이동`} disabled={index === draft.length - 1} onClick={() => changeDraft(current => moveFaq(current, index, 1))} className="border px-2 py-1 rounded disabled:opacity-30">↓ 아래로</button>
            <button type="button" aria-label={`${index + 1}번 질문 삭제`} onClick={() => changeDraft(current => current.filter(row => row.id !== item.id))} className="border border-red-200 text-red-700 px-2 py-1 rounded">삭제</button>
          </div>
          <label className="block text-sm font-bold">질문 제목<input value={item.question} onChange={event => update(item.id, { question: event.target.value })} className="block w-full border rounded-lg px-3 py-2 font-normal mt-1" /></label>
          <label className="block text-sm font-bold">답변 내용<textarea rows={4} value={item.answer} onChange={event => update(item.id, { answer: event.target.value })} className="block w-full border rounded-lg px-3 py-2 font-normal mt-1" /></label>
        </fieldset>)}
        <button type="button" onClick={() => { setDraft(current => [...current, { id: crypto.randomUUID(), question: '', answer: '', visible: true }]); setError(''); }} className="w-full border-2 border-dashed border-emerald-600 text-emerald-800 rounded-xl py-3 font-bold">+ 질문 추가</button>
      </div>
      <div className="border-t p-4 space-y-2">{error && <p role="alert" className="text-sm text-red-700">{error}</p>}<div className="flex justify-between items-center gap-3"><span className="text-xs text-slate-600">삭제·순서·공개 설정도 함께 적용됩니다.</span><button className="rounded-lg bg-amber-400 px-4 py-2 font-bold">목록에 적용</button></div></div>
    </form>
  </div>, document.body);
}
