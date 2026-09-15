import React, { useEffect, useRef, useState } from 'react';
import { Plus, Award, Pencil, Trash2, Save, ArrowLeft, ArrowRight, GripVertical } from 'lucide-react';
import useMasterProfiles from '../../hooks/useMasterProfiles';
import { saveMasterProfile, deleteMasterProfile, moveMasterProfile } from '../../services/masterDatabase';
import ProfileImageEditor from './ProfileImageEditor';
import { checkProfileImage } from '../../utils/profileImage';
import MasterPhotoGrid from '../Master/MasterPhotoGrid';

const inputClass = 'mt-2 w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600';
const buttonClass = 'inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-2 text-sm font-bold disabled:opacity-50';

export default function AdminMasters() {
  const headingRef = useRef(null);
  const { profiles, error: readError } = useMasterProfiles();
  const [search, setSearch] = useState('');
  const [group, setGroup] = useState('all');
  const [draft, setDraft] = useState(null);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [draggedId, setDraggedId] = useState(null);
  const [dropId, setDropId] = useState(null);
  const dragRef = useRef(null);
  const [imageStatus, setImageStatus] = useState('empty');
  const [saving, setSaving] = useState(false);
  const savingRef = useRef(false);
  const originalRef = useRef(null);
  const initialDraftRef = useRef('');
  const dirty = draft && JSON.stringify(draft) !== initialDraftRef.current;
  useEffect(() => {
    if (!dirty) return;
    const warn = e => { e.preventDefault(); e.returnValue = ''; };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);
  useEffect(() => { headingRef.current?.scrollIntoView({ block: 'start' }); }, [draft?.id]);
  const filtered = profiles.filter(p => (group === 'all' || p.group === group) && `${p.name} ${p.title}`.includes(search.trim()));
  const canArrange = !search.trim() && !readError;
  const groupIds = profile => profiles.filter(p => p.group === profile.group).map(p => p.id);
  const move = (profile, targetId, expectedIds = groupIds(profile)) => {
    try {
      moveMasterProfile(profile.id, targetId, expectedIds);
      setError(''); setNotice(`${profile.name} 프로필의 배치를 저장했습니다. 사이트에도 같은 순서로 반영됩니다.`);
    } catch (error) { setError(error.message); }
    finally { dragRef.current = null; setDraggedId(null); setDropId(null); }
  };
  const clearDrag = () => { dragRef.current = null; setDraggedId(null); setDropId(null); };
  const beginDrag = (event, profile) => {
    if (!canArrange || event.button !== 0) return;
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = { profile, ids: groupIds(profile), x: event.clientX, y: event.clientY, targetId: null };
  };
  const trackDrag = event => {
    const drag = dragRef.current;
    if (!drag) return;
    if (Math.hypot(event.clientX - drag.x, event.clientY - drag.y) < 6) return;
    setDraggedId(drag.profile.id);
    const target = document.elementFromPoint(event.clientX, event.clientY)?.closest('[data-profile-id]');
    const valid = target?.dataset.profileGroup === drag.profile.group;
    drag.targetId = valid ? target.dataset.profileId : null;
    setDropId(drag.targetId);
    const canvas = event.currentTarget.closest('main');
    if (canvas) {
      const bounds = canvas.getBoundingClientRect();
      if (event.clientY > bounds.bottom - 60) canvas.scrollBy(0, 18);
      else if (event.clientY < bounds.top + 60) canvas.scrollBy(0, -18);
    }
  };
  const finishDrag = event => {
    const drag = dragRef.current;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    if (canArrange && drag?.targetId && drag.targetId !== drag.profile.id) move(drag.profile, drag.targetId, drag.ids);
    else clearDrag();
  };
  const edit = profile => {
    originalRef.current = profiles.find(p => p.id === profile.id) || null;
    const next = { ...profile, awardsText: (profile.awards || []).join('\n') };
    initialDraftRef.current = JSON.stringify(next);
    setDraft(next); setImageStatus(profile.image ? 'checking' : 'empty'); setError(''); setNotice('');
  };
  const change = (key, value) => setDraft(d => d ? ({ ...d, [key]: value }) : d);
  const close = () => {
    if (!dirty || window.confirm('편집을 종료할까요? 저장하지 않은 내용은 사라집니다.')) { setDraft(null); setError(''); }
  };
  const save = async event => {
    event.preventDefault();
    if (savingRef.current || imageStatus === 'checking' || imageStatus === 'error') return;
    savingRef.current = true; setSaving(true); setError('');
    try {
      const { awardsText, ...profile } = draft;
      await checkProfileImage(profile.image);
      saveMasterProfile({ ...profile, awards: awardsText.split('\n').map(s => s.trim()).filter(Boolean) }, originalRef.current);
      setDraft(null); setNotice('프로필을 저장했습니다. 이 브라우저의 명장·명인 페이지에 반영되었습니다.');
    } catch (error) { setError(error.message); }
    finally { savingRef.current = false; setSaving(false); }
  };
  const remove = profile => {
    if (!window.confirm(`${profile.name} 프로필을 삭제할까요? 삭제 후 복구할 수 없습니다.`)) return;
    try { deleteMasterProfile(profile.id); setError(''); setNotice('프로필을 삭제했습니다.'); }
    catch (error) { setError(error.message); }
  };
  return (
    <section className="mx-auto max-w-6xl space-y-6">
      <header ref={headingRef} className="flex flex-wrap items-center justify-between gap-4">
        <div><h1 className="text-2xl font-bold flex items-center gap-2"><Award className="text-emerald-700" />명장·명인 프로필 관리</h1><p className="mt-2 text-sm text-gray-500">사진과 소개, 경력, 공개 여부를 관리합니다.</p></div>
        {!draft && <button disabled={!!readError} className={`${buttonClass} bg-emerald-800 text-white`} onClick={() => edit({ id: crypto.randomUUID(), headline: '', name: '', group: 'expert', image: '', title: '', intro: '', awards: [], published: true, order: Math.max(0, ...profiles.map(p => p.order)) + 1 })}><Plus size={16} />프로필 등록</button>}
      </header>
      <p className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">현재 변경 사항은 이 브라우저에 저장됩니다. 다른 기기에는 공유되지 않으며 브라우저 데이터 삭제 시 초기화됩니다.</p>
      {(error || readError) && <p role="alert" className="rounded-xl bg-red-50 p-4 text-red-700">{error || readError}</p>}
      {notice && <p role="status" className="rounded-xl bg-emerald-50 p-4 text-emerald-800">{notice}</p>}
      {draft ? <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
        <form onSubmit={save} className="space-y-5 rounded-2xl border bg-white p-5"><fieldset disabled={saving} className="min-w-0 space-y-5">
          <button type="button" disabled={saving} onClick={close} className={buttonClass}><ArrowLeft size={16} />목록으로</button>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-bold">이름 *<input required maxLength={50} className={inputClass} value={draft.name} onChange={e => change('name', e.target.value)} /></label>
            <label className="text-sm font-bold">구분<select className={inputClass} value={draft.group} onChange={e => change('group', e.target.value)}><option value="master">명장</option><option value="expert">명인</option></select></label>
          </div>
          <label className="block text-sm font-bold">카드 소개 문구<span className="ml-2 text-xs text-gray-500">짧게 두 줄로 입력</span><textarea rows={2} maxLength={60} className={inputClass} value={draft.headline || ''} onChange={e => change('headline', e.target.value)} placeholder="전문 분야와 개성을 담은 한마디" /></label>
          <label className="block text-sm font-bold">직함 · 전문 분야<input className={inputClass} maxLength={200} value={draft.title} onChange={e => change('title', e.target.value)} placeholder="예: 한식 조리 / 전통 발효 전문가" /></label>
          <ProfileImageEditor key={draft.id} value={draft.image} original={originalRef.current?.image || ''} onChange={value => change('image', value)} onStatus={setImageStatus} disabled={saving} />
          <label className="block text-sm font-bold">소개<textarea rows={4} maxLength={5000} className={inputClass} value={draft.intro} onChange={e => change('intro', e.target.value)} /></label>
          <label className="block text-sm font-bold">주요 경력 · 수상 내역<span className="ml-2 text-xs text-gray-500">한 줄에 하나씩 입력</span><textarea rows={6} maxLength={10000} className={inputClass} value={draft.awardsText} onChange={e => change('awardsText', e.target.value)} /></label>
          <div className="flex flex-wrap items-center gap-6"><label className="flex items-center gap-2 text-sm font-bold"><input type="checkbox" checked={draft.published} onChange={e => change('published', e.target.checked)} />사이트에 공개</label></div>
          <button disabled={saving || imageStatus === 'checking' || imageStatus === 'error' || (draft.published && !draft.image.trim()) || !!readError} className={`${buttonClass} bg-emerald-800 text-white`}><Save size={16} />{saving ? '저장 중…' : imageStatus === 'checking' ? '이미지 확인 중…' : '프로필 저장'}</button>
          {draft.published && !draft.image.trim() && <p className="text-sm text-amber-800">공개하려면 사진을 등록해 주세요. 사진 없이 저장하려면 공개를 해제하세요.</p>}
        </fieldset></form>
        <aside className="space-y-4"><h2 className="font-bold">카드 미리보기</h2><div className="[&>div]:!grid-cols-1"><MasterPhotoGrid profiles={[{ ...draft, image: imageStatus === 'ready' ? draft.image : '', awards: draft.awardsText.split('\n').map(s => s.trim()).filter(Boolean) }]} /></div><p className="text-sm text-gray-500">저장 후 사이트의 프로필을 클릭하면 소개와 경력이 표시됩니다.</p></aside>
      </div> : <>
        <div className="flex flex-wrap items-center gap-3"><input aria-label="프로필 검색" type="search" value={search} onChange={e => setSearch(e.target.value)} placeholder="이름 또는 전문 분야 검색" className={`${inputClass} !mt-0 sm:!w-72`} /><select aria-label="구분 필터" value={group} onChange={e => setGroup(e.target.value)} className={`${inputClass} !mt-0 !w-auto`}><option value="all">전체</option><option value="master">명장</option><option value="expert">명인</option></select><span className="text-sm text-gray-500">총 {filtered.length}명 · 공개 {profiles.filter(p => p.published).length}명</span></div>
        <p id="profile-arrange-help" className="rounded-xl bg-emerald-50 p-4 text-sm text-emerald-900">
          {canArrange ? '카드의 끌기 손잡이를 다른 카드 위로 옮기세요. 앞·뒤 버튼으로도 이동할 수 있습니다. 같은 구분 안에서 즉시 저장되며, 명장이 먼저 표시됩니다.' : '검색 중에는 순서를 바꿀 수 없습니다. 검색어를 지운 뒤 배치해 주세요.'}
        </p>
        {['master', 'expert'].filter(type => group === 'all' || group === type).map(type => <section key={type} className="space-y-3" aria-label={`${type === 'master' ? '명장' : '명인'} 배치 목록`}>
        <h2 className="text-lg font-bold">{type === 'master' ? '명장' : '명인'} <span className="text-sm font-normal text-gray-500">{filtered.filter(p => p.group === type).length}명</span></h2>
        <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">{filtered.filter(p => p.group === type).map((profile, index, list) => <article key={profile.id}
          data-profile-id={profile.id} data-profile-group={profile.group}
          className={`rounded-2xl border bg-white p-4 space-y-4 transition-shadow ${draggedId === profile.id ? 'opacity-50' : ''} ${dropId === profile.id && draggedId !== profile.id ? 'ring-2 ring-emerald-600 shadow-lg' : ''}`}>
          <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-3">
            <span onPointerDown={event => beginDrag(event, profile)} onPointerMove={trackDrag}
              onPointerUp={finishDrag} onPointerCancel={clearDrag} onLostPointerCapture={clearDrag}
              style={{ touchAction: 'none', userSelect: 'none' }}
              title={`${profile.name} 끌어서 이동`} aria-hidden="true"
              className={`inline-flex items-center gap-1 rounded-lg px-2 py-2 text-xs text-gray-500 ${canArrange ? 'cursor-grab active:cursor-grabbing hover:bg-gray-100' : 'opacity-40'}`}><GripVertical size={18} />끌기</span>
            <div className="flex gap-1">
              <button type="button" disabled={!canArrange || index === 0} aria-label={`${profile.name} 앞으로 이동`} aria-describedby="profile-arrange-help"
                onClick={() => move(profile, list[index - 1].id)} className="inline-flex items-center gap-1 rounded-lg border px-3 py-2 text-xs disabled:opacity-30"><ArrowLeft size={14} />앞</button>
              <button type="button" disabled={!canArrange || index === list.length - 1} aria-label={`${profile.name} 뒤로 이동`} aria-describedby="profile-arrange-help"
                onClick={() => move(profile, list[index + 1].id)} className="inline-flex items-center gap-1 rounded-lg border px-3 py-2 text-xs disabled:opacity-30">뒤<ArrowRight size={14} /></button>
            </div>
          </div>
          <div className="flex gap-4"><div className="h-24 w-20 shrink-0 rounded-xl bg-stone-100 overflow-hidden">{profile.image ? <img src={profile.image} alt={profile.name} className="h-full w-full object-contain" /> : <span className="flex h-full items-center justify-center text-xs text-gray-400">사진 없음</span>}</div><div className="min-w-0"><p className="text-xs text-gray-500">{profile.group === 'master' ? '명장' : '명인'}</p><h2 className="mt-1 text-lg font-bold">{profile.name}</h2><p className="truncate text-sm text-gray-500">{profile.title || '전문 분야 미등록'}</p><span className={`mt-2 inline-block rounded-full px-2 py-1 text-xs ${profile.published ? 'bg-emerald-50 text-emerald-800' : 'bg-gray-100 text-gray-600'}`}>{profile.published ? '공개' : '비공개'}</span></div></div>
          <div className="flex gap-2 border-t pt-3"><button className={buttonClass} onClick={() => edit(profile)} aria-label={`${profile.name} 수정`}><Pencil size={14} />수정</button><button className={`${buttonClass} text-red-700`} onClick={() => remove(profile)} aria-label={`${profile.name} 삭제`}><Trash2 size={14} />삭제</button></div>
        </article>)}</div></section>)}
        {!filtered.length && !readError && <p className="py-12 text-center text-gray-500">등록된 프로필 또는 검색 결과가 없습니다.</p>}
      </>}
    </section>
  );
}
