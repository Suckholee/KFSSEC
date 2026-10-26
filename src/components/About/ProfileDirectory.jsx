import React, { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useAdminEdit } from '../../context/AdminEditContext';
import EditableText from '../Admin/InlineEditor/EditableText';
import EditableImage from '../Admin/InlineEditor/EditableImage';
import { resolveDirectory, profileLines } from '../../data/profileDirectory';

const labels = { name: '이름', role: '직함', title: '소속·소개', badge: '분야', intro: '소개글', highlights: '주요 학력 및 경력', specialties: '전문 분야', publications: '저서 및 논문' };
const listFields = ['highlights', 'specialties', 'publications'];
export default function ProfileDirectory({ collection = 'faculty', fallback, onConsultClick, onReferences }) {
  const { isEditMode, siteDraft, updateSiteField } = useAdminEdit();
  const members = resolveDirectory(siteDraft, collection, fallback);
  const [editor, setEditor] = useState(null);
  const [error, setError] = useState('');
  const dialogRef = useRef(null);
  const consulting = collection === 'consultingFaculty';
  const title = consulting ? '창업컨설팅 전문 교수진' : '교육원 임원·고문 및 교수진';
  const save = next => updateSiteField(collection, next);
  const change = (id, key, value) => save(members.map(m => m.id === id ? { ...m, [key]: value } : m));
  const move = (index, offset) => {
    const next = [...members], target = index + offset;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    save(next);
  };
  useEffect(() => {
    if (!editor) return;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialogRef.current?.querySelector('input')?.focus();
    const close = event => {
      if (event.key === 'Escape') setEditor(null);
      if (event.key === 'Tab') {
        const controls = [...(dialogRef.current?.querySelectorAll('input,textarea,select,button') || [])].filter(el => !el.disabled);
        if (event.shiftKey && document.activeElement === controls[0]) { event.preventDefault(); controls.at(-1)?.focus(); }
        else if (!event.shiftKey && document.activeElement === controls.at(-1)) { event.preventDefault(); controls[0]?.focus(); }
      }
    };
    window.addEventListener('keydown', close);
    return () => { window.removeEventListener('keydown', close); document.body.style.overflow = previousOverflow; previousFocus?.focus(); };
  }, [editor]);
  const openEditor = member => {
    setError('');
    setEditor(Object.fromEntries(Object.entries(member).map(([key, value]) => [key, listFields.includes(key) ? profileLines(value).join('\n') : value])));
  };
  const commit = event => {
    event.preventDefault();
    if (!editor.name?.trim()) { setError('이름을 입력해 주세요.'); return; }
    const profile = { ...editor, name: editor.name.trim() };
    listFields.forEach(key => { profile[key] = profileLines(editor[key]); });
    save(members.some(m => m.id === profile.id) ? members.map(m => m.id === profile.id ? profile : m) : [...members, profile]);
    setEditor(null);
  };
  const buttonClass = 'rounded-lg border border-emerald-200 bg-white px-3 py-2 text-sm font-bold text-emerald-900 disabled:opacity-30 hover:bg-emerald-50';
  return <section className="space-y-6" aria-label={title}>
    <div className="rounded-2xl bg-[#235F43] p-6 text-white sm:p-8">
      <h2 className="text-2xl font-black">{title}</h2>
      <p className="mt-2 text-sm text-emerald-100">{consulting ? '외식 창업과 경영을 함께하는 분야별 전문가를 소개합니다.' : '교육원의 운영과 전문 교육을 이끄는 임원·고문 및 교수진을 소개합니다.'}</p>
    </div>
    {isEditMode && <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
      <p className="text-sm text-emerald-900">{consulting ? '컨설팅 전문가' : '교육원 교수진'} 전용 목록입니다. 추가·수정 후 상단 ‘전체 저장’을 눌러주세요.</p>
      <button className={buttonClass} onClick={() => openEditor({ id: crypto.randomUUID(), name: '', role: '', title: '', badge: '', intro: '', image: '', highlights: [], specialties: [], publications: [], visible: true })}>+ {consulting ? '전문가' : '임원·고문·교수'} 추가</button>
    </div>}
    {members.filter(m => isEditMode || m.visible !== false).map(member => {
      const index = members.findIndex(m => m.id === member.id);
      return <article key={member.id} className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm sm:p-8" aria-label={`${member.name} 프로필`}>
        {isEditMode && <div className="mb-5 flex flex-wrap justify-end gap-2">
          <button className={buttonClass} disabled={index === 0} onClick={() => move(index, -1)} aria-label={`${member.name} 위로 이동`}>↑</button>
          <button className={buttonClass} disabled={index === members.length - 1} onClick={() => move(index, 1)} aria-label={`${member.name} 아래로 이동`}>↓</button>
          <button className={buttonClass} onClick={() => openEditor(member)}>프로필 수정</button>
          <button className={buttonClass} onClick={() => change(member.id, 'visible', member.visible === false)}>{member.visible === false ? '공개하기' : '비공개로 전환'}</button>
          <button className={buttonClass} onClick={() => { if (window.confirm(`${member.name} 프로필을 이 목록에서 삭제할까요?`)) save(members.filter(m => m.id !== member.id)); }}>삭제</button>
        </div>}
        <div className={`grid gap-6 ${member.imageLayout === 'card' ? 'lg:grid-cols-2' : 'md:grid-cols-[190px_minmax(0,1fr)]'}`}>
          <div className="min-w-0 space-y-3">
            <div className={member.imageLayout === 'card' ? "w-full overflow-hidden rounded-xl bg-stone-100" : "mx-auto h-[235px] w-44 overflow-hidden rounded-xl bg-stone-100"}>
              <EditableImage src={member.image} alt={member.name} onChange={value => change(member.id, 'image', value)} className={member.imageLayout === 'card' ? "block w-full" : "block h-full w-full"} imageClassName={member.imageLayout === 'card' ? "h-auto w-full object-contain" : "h-full w-full object-contain object-top"} />
            </div>
            <p className="text-xs font-bold text-emerald-700"><EditableText value={member.badge} onChange={value => change(member.id, 'badge', value)} /></p>
            <h3 className="text-2xl font-black"><EditableText value={member.name} onChange={value => change(member.id, 'name', value)} /></h3>
            <p className="text-sm font-bold text-emerald-900"><EditableText value={member.role} onChange={value => change(member.id, 'role', value)} /></p>
            <p className="whitespace-pre-line text-sm text-stone-600"><EditableText multiline value={member.title} onChange={value => change(member.id, 'title', value)} /></p>
          </div>
          <div className="min-w-0 space-y-6">
            {member.intro && <p className="whitespace-pre-line rounded-xl bg-stone-50 p-4 text-sm leading-7"><EditableText multiline value={member.intro} onChange={value => change(member.id, 'intro', value)} /></p>}
            {listFields.map(key => member[key]?.length > 0 && <div key={key}>
              <h4 className="mb-3 border-b pb-2 text-sm font-black text-emerald-900">{labels[key]}</h4>
              <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-stone-700">{member[key].map((text, i) => <li key={i}><EditableText multiline value={text} onChange={value => change(member.id, key, member[key].map((v, j) => i === j ? value : v))} /></li>)}</ul>
            </div>)}
            {consulting && <div className="flex flex-wrap gap-3">
              <button className={buttonClass} onClick={() => onConsultClick?.(`${member.name} 1:1 창업 컨설팅`)}>{member.name} 1:1 상담 신청</button>
              {member.id === 'prof-jin' && <button className={buttonClass} onClick={onReferences}>프랜차이즈 사례 보기</button>}
            </div>}
          </div>
        </div>
      </article>;
    })}
    {!members.some(m => m.visible !== false) && <p className="rounded-xl bg-stone-50 p-6 text-center text-stone-500">등록된 공개 프로필이 없습니다.</p>}
    {editor && isEditMode && createPortal(<div data-content-editor-ui className="fixed inset-0 z-[100110] overflow-y-auto bg-black/60 p-4" onClick={() => setEditor(null)}>
      <form ref={dialogRef} role="dialog" aria-modal="true" aria-label="프로필 편집" onSubmit={commit} onClick={e => e.stopPropagation()} className="mx-auto my-6 max-w-2xl space-y-4 rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex justify-between"><h3 className="text-xl font-black">프로필 편집</h3><button type="button" onClick={() => setEditor(null)} aria-label="프로필 편집 닫기">✕</button></div>
        <p className="text-sm text-stone-500">학력·경력, 전문 분야, 저서는 한 줄에 한 항목씩 입력하세요. 사진은 등록 후 사진을 클릭해 업로드할 수 있습니다.</p>
        {Object.entries(labels).map(([key, label]) => <label key={key} className="block text-sm font-bold">{label}{['intro', ...listFields].includes(key) ? <textarea rows={key === 'intro' ? 3 : 4} className="mt-1 w-full rounded-lg border p-3 font-normal" value={editor[key] || ''} onChange={e => setEditor({ ...editor, [key]: e.target.value })} /> : <input autoFocus={key === 'name'} required={key === 'name'} className="mt-1 w-full rounded-lg border p-3 font-normal" value={editor[key] || ''} onChange={e => setEditor({ ...editor, [key]: e.target.value })} />}</label>)}
        <label className="block text-sm font-bold">프로필 이미지 형식<select className="mt-1 w-full rounded-lg border p-3" value={editor.imageLayout || 'portrait'} onChange={e => setEditor({ ...editor, imageLayout: e.target.value })}><option value="portrait">인물 사진</option><option value="card">가로형 프로필 카드 (전체 표시)</option></select></label>
        <label className="flex gap-2 text-sm"><input type="checkbox" checked={editor.visible !== false} onChange={e => setEditor({ ...editor, visible: e.target.checked })} />홈페이지에 공개</label>
        {error && <p role="alert" className="text-red-600">{error}</p>}
        <div className="flex justify-end gap-3"><button type="button" className={buttonClass} onClick={() => setEditor(null)}>취소</button><button className={buttonClass} type="submit">목록에 반영</button></div>
      </form>
    </div>, document.body)}
  </section>;
}
