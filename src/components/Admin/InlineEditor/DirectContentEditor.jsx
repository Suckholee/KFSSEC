import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useAdminEdit } from '../../../context/AdminEditContext';
import { collectContentFields, contentRegistry, isAllowedContentUrl } from './directContentModel';

export default function DirectContentEditor() {
  const { isEditMode, updateSiteDraft } = useAdminEdit();
  const [session, setSession] = useState(null);
  const [draft, setDraft] = useState({});
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const dialogRef = useRef(null);
  const opener = useRef(null);

  useEffect(() => {
    if (!isEditMode) { setSession(null); return; }
    const open = event => {
      const { element, sectorId } = event.detail || {};
      const root = sectorId ? document.getElementById(`sector-${sectorId}`) : document;
      let fields = root ? collectContentFields(root) : [];
      if (element) {
        const keys = new Set((contentRegistry.get(element)?.fields || []).map(f => f.key));
        fields = fields.filter(f => keys.has(f.key));
      }
      opener.current = document.activeElement;
      setSession({ fields, title: element ? element.dataset.contentRole : root?.dataset?.editorName || '현재 페이지 전체' });
      setDraft(Object.fromEntries(fields.map(field => [field.key, field.value])));
      setQuery(''); setError('');
    };
    window.addEventListener('kfssec:edit-content', open);
    return () => window.removeEventListener('kfssec:edit-content', open);
  }, [isEditMode]);

  useEffect(() => {
    if (!session) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialogRef.current?.querySelector('button')?.focus();
    const keys = event => {
      if (event.key === 'Escape') { event.preventDefault(); setSession(null); }
      if (event.key === 'Tab') {
        const controls = [...dialogRef.current.querySelectorAll('button, input, textarea')].filter(el => !el.disabled && el.getClientRects().length);
        const first = controls[0], last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    };
    document.addEventListener('keydown', keys);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', keys);
      opener.current?.focus?.();
    };
  }, [session]);

  if (!session || !isEditMode) return null;
  const dirty = session.fields.filter(f => draft[f.key] !== f.value);
  const apply = event => {
    event.preventDefault();
    for (const field of dirty) {
      if (field.type !== 'text' && !isAllowedContentUrl(draft[field.key], field.type)) {
        setError(`${field.label}: 올바른 웹 주소 또는 /로 시작하는 사이트 내 주소를 입력해주세요.`);
        return;
      }
    }
    const groups = new Map();
    for (const field of dirty) {
      if (field.groupKey) {
        const group = groups.get(field.groupKey) || { apply: field.groupApply, changes: {} };
        group.changes[field.key] = draft[field.key];
        groups.set(field.groupKey, group);
      } else field.onApply?.(draft[field.key]);
    }
    for (const group of groups.values()) group.apply(group.changes);
    const overrides = dirty.filter(field => !field.onApply);
    if (overrides.length) updateSiteDraft(site => {
      const contentOverrides = { ...site.contentOverrides };
      for (const field of overrides) {
        if (draft[field.key] === field.original) delete contentOverrides[field.key];
        else contentOverrides[field.key] = draft[field.key];
      }
      return { ...site, contentOverrides };
    });
    setSession(null);
  };
  const upload = async (file, field) => {
    if (!file) return;
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type) || file.size > 4 * 1024 * 1024) {
      setError('JPG, PNG, WebP 이미지 파일을 4MB 이하로 선택해주세요.'); return;
    }
    setUploading(true); setError('');
    try {
      const imageBase64 = await new Promise((resolve, reject) => {
        const reader = new FileReader(); reader.onload = () => resolve(reader.result); reader.onerror = reject; reader.readAsDataURL(file);
      });
      const response = await fetch('/api/upload', { method: 'POST', credentials: 'same-origin', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ imageBase64, fileName: file.name }) });
      const result = await response.json();
      if (!response.ok || !result.success || !isAllowedContentUrl(result.url, 'image')) throw new Error(result.message || '사진을 업로드하지 못했습니다.');
      setDraft(current => ({ ...current, [field.key]: result.url }));
    } catch (err) { setError(err.message || '사진 업로드에 실패했습니다.'); }
    finally { setUploading(false); }
  };
  const visibleFields = session.fields.filter(f => `${f.section} ${f.label} ${f.value}`.toLowerCase().includes(query.toLowerCase()));

  return createPortal(
    <div data-content-editor-ui className="fixed inset-0 z-[100100] bg-slate-950/70 flex items-center justify-center p-3" onClick={() => !dirty.length && setSession(null)}>
      <form ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="direct-editor-title" onSubmit={apply} onClick={e => e.stopPropagation()} className="bg-white text-slate-900 w-full max-w-3xl max-h-[90dvh] flex flex-col rounded-2xl shadow-2xl">
        <div className="p-4 sm:p-5 border-b space-y-2">
          <div className="flex justify-between gap-3 items-start">
            <div><h2 id="direct-editor-title" className="font-bold text-lg">{session.title} · 내용 편집</h2><p className="text-xs text-slate-600 mt-1">제목, 설명, 목록, 이미지와 링크를 수정하세요. 적용 후 상단의 ‘전체 저장’을 눌러야 방문자에게 반영됩니다.</p></div>
            <button type="button" aria-label="편집 취소하고 닫기" onClick={() => setSession(null)} className="border rounded-lg px-3 py-2 shrink-0">닫기</button>
          </div>
          <input aria-label="수정할 내용 검색" value={query} onChange={e => setQuery(e.target.value)} placeholder="제목·설명·현재 문구로 검색" className="border rounded-lg px-3 py-2 w-full text-sm" />
          <p className="text-xs text-slate-500">현재 화면 {session.fields.length}개 항목 · 다른 탭이나 펼쳐지는 목록은 해당 화면을 연 뒤 편집하세요. 문구는 현재 선택한 언어에 적용됩니다.</p>
        </div>
        <div className="overflow-y-auto p-4 sm:p-5 space-y-4">
          {!visibleFields.length && <p className="text-sm text-slate-600">수정할 항목이 없습니다. 검색어를 바꾸거나 편집할 화면을 먼저 열어주세요.</p>}
          {visibleFields.map((field, index) => <div key={field.key} className="border rounded-xl p-3 space-y-2">
            <div className="flex justify-between gap-2 items-center"><label htmlFor={`content-field-${index}`} className="text-sm font-bold"><span className="text-amber-800 bg-amber-50 rounded px-2 py-1 mr-2">{field.label} 영역</span><span className="text-xs text-slate-500">{field.section}</span></label><button type="button" onClick={() => setDraft(current => ({ ...current, [field.key]: field.original }))} className="text-xs underline shrink-0">{field.resetLabel || '기본값 복원'}</button></div>
            {field.type === 'text' ? <textarea id={`content-field-${index}`} rows={field.value.length > 100 ? 4 : 2} value={draft[field.key]} onChange={e => setDraft(current => ({ ...current, [field.key]: e.target.value }))} className="w-full border rounded-lg px-3 py-2 text-sm" /> : <input id={`content-field-${index}`} value={draft[field.key]} onChange={e => setDraft(current => ({ ...current, [field.key]: e.target.value }))} className="w-full border rounded-lg px-3 py-2 text-sm" />}
            {field.type === 'image' && <div className="flex items-center gap-3"><img src={draft[field.key] || undefined} alt="변경할 이미지 미리보기" className="w-24 h-16 object-contain rounded bg-slate-100" /><label className="text-xs cursor-pointer border rounded-lg px-3 py-2">{uploading ? '업로드 중…' : '사진 파일 선택'}<input type="file" accept="image/jpeg,image/png,image/webp" disabled={uploading} onChange={e => upload(e.target.files?.[0], field)} className="sr-only" /></label></div>}
          </div>)}
        </div>
        <div className="border-t p-4 space-y-2">
          {error && <p role="alert" className="text-red-700 text-sm">{error}</p>}
          <div className="flex justify-between gap-3 items-center"><p className="text-xs text-slate-600">{dirty.length}개 변경 · 닫기를 누르면 이 창의 변경은 취소됩니다.</p><button disabled={uploading || !dirty.length} className="bg-amber-500 text-slate-950 font-bold px-5 py-2 rounded-lg disabled:opacity-40">수정 내용 적용</button></div>
        </div>
      </form>
    </div>, document.body,
  );
}
