import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import ResourceEditor from './ResourceEditor';
import { useResourceCatalog, resourcesForSector } from '../../../content/useContentResource';
import { resourceRegistry, resourceViews } from '../../../content/resourceModel';
import { sectorRegistry, selectScope, clearScope } from '../../../content/sectorModel';
import { useAdminEdit } from '../../../context/AdminEditContext';

export default function ScopeInspector() {
  const { isEditMode } = useAdminEdit();
  useResourceCatalog();
  const dialogRef = useRef(null);
  const [scope, setScope] = useState(null);
  const [resource, setResource] = useState(null);
  useEffect(() => {
    const open = event => {
      const { sectorId, path, index, id } = event.detail || {};
      if (path) {
        const descriptor = resourceRegistry.get(path)?.current;
        if (!descriptor) return;
        const selectedIndex = id ? descriptor.value.findIndex(item => item?.id === id) : index;
        const view = [...(resourceViews.get(path) || [])][0];
        selectScope(view?.nodes?.[selectedIndex] || view?.anchor?.closest('[data-editor-sector]'));
        setResource({ ...descriptor, selectedIndex }); setScope(null);
      } else {
        const element = document.getElementById(`sector-${sectorId}`) || document.querySelector(`[data-editor-sector="${sectorId}"]`);
        selectScope(element); setScope({ sectorId, label: element?.dataset.editorName || '선택 영역' });
      }
    };
    if (isEditMode) window.addEventListener('kfssec:manage-scope', open);
    return () => window.removeEventListener('kfssec:manage-scope', open);
  }, [isEditMode]);
  useEffect(() => { if (!isEditMode) { setScope(null); setResource(null); clearScope(); } }, [isEditMode]);
  useEffect(() => {
    if (!scope) return;
    const opener = document.activeElement;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialogRef.current?.querySelector('button')?.focus();
    const key = event => {
      if (event.key === 'Escape') { setScope(null); clearScope(); }
      if (event.key === 'Tab') {
        const controls = [...dialogRef.current.querySelectorAll('button')].filter(el => !el.disabled);
        if (event.shiftKey && document.activeElement === controls[0]) { event.preventDefault(); controls.at(-1)?.focus(); }
        else if (!event.shiftKey && document.activeElement === controls.at(-1)) { event.preventDefault(); controls[0]?.focus(); }
      }
    };
    document.addEventListener('keydown', key);
    return () => { document.body.style.overflow = overflow; document.removeEventListener('keydown', key); opener?.focus?.(); };
  }, [scope]);
  const close = () => { setResource(null); setScope(null); clearScope(); };
  if (!isEditMode) return null;
  if (resource) return <ResourceEditor resource={resource} selectedIndex={resource.selectedIndex} onClose={close} />;
  if (!scope) return null;
  const resources = resourcesForSector(scope.sectorId);
  const sector = sectorRegistry.get(scope.sectorId);
  return createPortal(<div data-content-editor-ui className="fixed inset-0 z-[100105] bg-slate-950/55 flex justify-end" onClick={close}>
    <aside ref={dialogRef} role="dialog" aria-modal="true" aria-label="선택 영역 관리" className="w-full max-w-lg h-full bg-white text-slate-900 shadow-xl flex flex-col" onClick={event => event.stopPropagation()}>
      <div className="p-5 border-b"><div className="flex justify-between gap-3"><h2 className="text-lg font-bold">{scope.label}</h2><button type="button" onClick={close} className="border px-3 py-1 rounded">닫기</button></div><p className="text-sm mt-2">선택한 범위가 화면에서 강조됩니다. 관리할 대상을 선택하세요.</p><p className="text-xs text-slate-500 mt-1">{scope.sectorId.startsWith('S-GLOBAL') ? '모든 페이지에 공통으로 적용되는 영역입니다.' : '이 화면의 선택 영역을 관리합니다.'} 적용 → 미리보기 → 전체 저장</p></div>
      <div className="p-5 overflow-y-auto space-y-3">
        {resources.map(item => <button key={item.path} type="button" onClick={() => { setResource(item); setScope(null); }} className="block w-full text-left border-2 border-emerald-100 rounded-xl p-4 hover:bg-emerald-50"><strong>{item.label} 관리</strong><span className="block text-xs text-slate-600 mt-2">원본 목록 {item.value.length}개 · 내용·추가·삭제·순서·공개 여부</span></button>)}
        {sector?.manage && <button type="button" onClick={() => { close(); sector.manage(); }} className="block w-full text-left border rounded-xl p-4"><strong>{sector.toolLabel || '자료 상세 관리'}</strong><span className="block text-xs mt-2 text-slate-600">연결된 원본 자료의 전용 관리 도구를 엽니다.</span></button>}
        <button type="button" onClick={() => { setScope(null); window.dispatchEvent(new CustomEvent('kfssec:edit-content', { detail: { sectorId: scope.sectorId } })); }} className="block w-full text-left border rounded-xl p-4"><strong>제목·설명·이미지 수정</strong><span className="block text-xs mt-2 text-slate-600">이 범위의 안내 문구·사진·영상 주소를 수정합니다. 목록 자료는 위 원본 관리 도구를 사용하세요.</span></button>
      </div>
    </aside>
  </div>, document.body);
}
