import React, { useEffect, useState } from 'react';
import { useAdminEdit } from '../../../context/AdminEditContext';
import { selectScope } from '../../../content/sectorModel';
const pages = { home: '홈', about: '교육원 소개', master: '명장·명인', catalog: '교육·자격증', consulting: '창업컨설팅', gallery: '현장 갤러리', partners: '파트너·MOU', community: '커뮤니티', 'ai-assistant': 'AI 상담' };
export default function AdminBlockNavigator({ activeTab = 'home', subTab, onTabChange }) {
  const { isEditMode, sectorSettings, toggleSectorVisibility, isNavigatorOpen, setIsNavigatorOpen } = useAdminEdit();
  const [sectors, setSectors] = useState([]);
  useEffect(() => {
    if (!isEditMode) return;
    let frame;
    const refresh = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const seen = new Set();
        const current = [...document.querySelectorAll('[data-editor-sector]')].filter(el => { const id = el.dataset.editorSector; if (seen.has(id)) return false; seen.add(id); return true; }).map(el => ({ id: el.dataset.editorSector, name: el.dataset.editorName, page: el.dataset.editorPage || activeTab, visible: el.dataset.editorVisible !== 'false' }));
        setSectors(previous => JSON.stringify(previous) === JSON.stringify(current) ? previous : current);
      });
    };
    refresh();
    const observer = new MutationObserver(refresh);
    observer.observe(document.getElementById('root'), { childList: true, subtree: true, attributes: true, attributeFilter: ['data-editor-visible'] });
    window.addEventListener('kfssec:sectors', refresh);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); window.removeEventListener('kfssec:sectors', refresh); };
  }, [isEditMode, activeTab, subTab]);
  if (!isEditMode) return null;
  const select = item => {
    const element = document.querySelector(`[data-editor-sector="${item.id}"]`);
    element?.scrollIntoView({ block: 'center', behavior: 'smooth' }); selectScope(element);
    if (window.innerWidth < 1024) setIsNavigatorOpen(false);
    window.dispatchEvent(new CustomEvent('kfssec:manage-scope', { detail: { sectorId: item.id } }));
  };
  return <>
    {isNavigatorOpen && <div data-content-editor-ui className="fixed inset-0 z-[54] bg-black/50 lg:hidden" onClick={() => setIsNavigatorOpen(false)} />}
    <aside data-content-editor-ui aria-label="수정 블록 목차 카테고리 네비게이터" style={{ top: 'var(--admin-toolbar-height, 0px)' }} className={`fixed left-0 bottom-0 z-[55] w-[86vw] max-w-[290px] bg-slate-900 text-white border-r border-slate-700 shadow-xl flex flex-col transition-transform ${isNavigatorOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="p-4 border-b border-slate-700"><div className="flex justify-between gap-2 items-center"><h2 className="font-bold">관리 범위 목차</h2><button type="button" aria-label="목차 사이드바 닫기/접기" onClick={() => setIsNavigatorOpen(false)} className="border border-slate-600 rounded px-2 py-1">닫기</button></div><p className="text-xs text-slate-300 mt-2">현재 화면에 연결된 범위만 표시합니다.</p><select aria-label="관리할 페이지 선택" value={pages[activeTab] ? activeTab : 'home'} onChange={event => { onTabChange?.(event.target.value); if (window.innerWidth < 1024) setIsNavigatorOpen(false); }} className="w-full mt-3 rounded bg-slate-800 px-2 py-2 text-sm">{Object.entries(pages).map(([key,name]) => <option key={key} value={key}>{name}</option>)}</select></div>
      <div className="flex-1 overflow-y-auto p-3 space-y-2">{sectors.map(item => <div key={item.id} className="rounded-xl border border-slate-700 p-3"><button type="button" onClick={() => select(item)} className="text-left font-bold text-sm hover:text-amber-300 w-full">{item.name}</button><div className="flex justify-between items-center gap-2 mt-2"><span className="text-xs text-slate-400">{item.page === 'global' ? '전체 페이지 공통' : pages[item.page] || '현재 화면'}</span><button type="button" onClick={() => toggleSectorVisibility(item.page, item.id, item.visible)} disabled={item.id === 'S-GLOBAL-01'} className="text-xs border border-slate-600 rounded px-2 py-1">{item.id === 'S-GLOBAL-01' ? '공통 메뉴' : !item.visible ? '다시 표시' : '숨김'}</button></div></div>)}{!sectors.length && <p className="text-sm text-slate-400 p-2">이 화면의 관리 영역을 확인하고 있습니다.</p>}</div>
    </aside>
  </>;
}
