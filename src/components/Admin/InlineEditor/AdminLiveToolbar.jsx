import React, { useRef, useEffect, useState } from 'react';
import DirectContentEditor from './DirectContentEditor';
import ScopeInspector from './ScopeInspector';
import { useAdminEdit } from '../../../context/AdminEditContext';
import {
  Edit3,
  Eye,
  RotateCcw,
  Save,
  Sliders,
  LogOut,
  Shield,
  Layers,
  Sparkles,
  Bell,
  ChevronDown,
  Users,
} from 'lucide-react';

export default function AdminLiveToolbar() {
  const {
    isAdmin,
    rawEditMode,
    setIsEditMode,
    isPreviewMode,
    setIsPreviewMode,
    pendingChanges,
    isSaving,
    saveSuccessNotice,
    saveAllChanges,
    revertAllChanges,
    setIsDrawerOpen,
    setDrawerTab,
    isNavigatorOpen,
    setIsNavigatorOpen,
    showEditGuides,
    toggleEditGuides,
    onLogout,
  } = useAdminEdit();

  const toolbarRef = useRef(null);
  const menuRef = useRef(null);
  const [managementOpen, setManagementOpen] = useState(false);
  useEffect(() => {
    const dismiss = event => { if (!menuRef.current?.contains(event.target)) setManagementOpen(false); };
    const escape = event => { if (event.key === 'Escape') setManagementOpen(false); };
    document.addEventListener('pointerdown', dismiss);
    document.addEventListener('keydown', escape);
    return () => { document.removeEventListener('pointerdown', dismiss); document.removeEventListener('keydown', escape); };
  }, []);

  useEffect(() => {
    if (!isAdmin) {
      if (typeof document !== 'undefined') {
        document.documentElement.style.removeProperty('--admin-toolbar-height');
      }
      return;
    }

    const updateHeight = () => {
      if (toolbarRef.current && typeof document !== 'undefined') {
        const height = toolbarRef.current.offsetHeight;
        document.documentElement.style.setProperty('--admin-toolbar-height', `${height}px`);
      }
    };

    updateHeight();

    let resizeObserver;
    if (typeof ResizeObserver !== 'undefined' && toolbarRef.current) {
      resizeObserver = new ResizeObserver(updateHeight);
      resizeObserver.observe(toolbarRef.current);
    }

    window.addEventListener('resize', updateHeight);
    return () => {
      if (resizeObserver) resizeObserver.disconnect();
      window.removeEventListener('resize', updateHeight);
      if (typeof document !== 'undefined') {
        document.documentElement.style.removeProperty('--admin-toolbar-height');
      }
    };
  }, [isAdmin, rawEditMode, pendingChanges.count, isNavigatorOpen]);

  if (!isAdmin) return null;

  return (
    <>
    <DirectContentEditor />
    <ScopeInspector />
    <aside
      ref={toolbarRef}
      aria-label="관리자 라이브 편집 툴바"
      className="fixed top-0 left-0 right-0 z-[60] w-full bg-slate-900/95 backdrop-blur-md text-white border-b border-amber-500/30 shadow-2xl px-3 sm:px-6 py-2.5 transition-all select-none"
    >
      <div className="mx-auto max-w-7xl space-y-2 text-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-semibold text-slate-100"><Shield className="h-4 w-4 text-emerald-400" /><span>홈페이지 관리</span></div>
          <div role="group" aria-label="화면 모드" className="flex rounded-lg bg-slate-800 p-1">
            <button type="button" aria-pressed={rawEditMode && !isPreviewMode} onClick={() => { setIsEditMode(true); setIsPreviewMode(false); }} className={`inline-flex min-h-9 items-center gap-2 rounded-md px-3 font-medium transition ${rawEditMode && !isPreviewMode ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-300 hover:bg-slate-700'}`}><Edit3 className="h-4 w-4" />화면 편집</button>
            <button type="button" aria-pressed={isPreviewMode || !rawEditMode} onClick={() => setIsPreviewMode(true)} className={`inline-flex min-h-9 items-center gap-2 rounded-md px-3 font-medium transition ${isPreviewMode || !rawEditMode ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-300 hover:bg-slate-700'}`}><Eye className="h-4 w-4" />미리보기</button>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span role="status" className={`mr-1 text-xs ${saveSuccessNotice ? 'text-emerald-300' : pendingChanges.count ? 'text-amber-300' : 'text-slate-400'}`}>{saveSuccessNotice ? '저장 완료' : pendingChanges.count ? `${pendingChanges.count}건 저장 대기` : '저장할 변경 없음'}</span>
            {pendingChanges.count > 0 && <button type="button" onClick={revertAllChanges} className="inline-flex min-h-9 items-center gap-1.5 rounded-lg px-2 text-xs text-slate-300 hover:bg-slate-800"><RotateCcw className="h-3.5 w-3.5" />변경 취소</button>}
            <button type="button" onClick={saveAllChanges} disabled={isSaving || pendingChanges.count === 0} className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-emerald-600 px-4 font-bold text-white hover:bg-emerald-500 disabled:cursor-not-allowed disabled:bg-slate-800 disabled:text-slate-500"><Save className={`h-4 w-4 ${isSaving ? 'animate-spin' : ''}`} />{isSaving ? '저장 중…' : '전체 저장'}</button>
            <div ref={menuRef} className="relative">
              <button type="button" aria-expanded={managementOpen} aria-controls="admin-operations-menu" onClick={() => setManagementOpen(!managementOpen)} className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-slate-600 bg-slate-800 px-3 font-medium text-white hover:bg-slate-700"><Sliders className="h-4 w-4" />운영 관리<ChevronDown className="h-4 w-4" /></button>
              {managementOpen && <nav id="admin-operations-menu" aria-label="운영 관리" className="absolute right-0 top-full z-10 mt-2 w-56 max-w-[calc(100vw-2rem)] rounded-xl border border-slate-200 bg-white p-2 text-slate-700 shadow-xl">
                <button type="button" onClick={() => window.location.assign('/admin/members')} className="flex min-h-11 w-full items-center gap-3 rounded-lg px-3 text-left hover:bg-slate-100"><Users className="h-4 w-4" />회원·수강 관리</button>
                <button type="button" onClick={() => { setDrawerTab('popup'); setIsDrawerOpen(true); setManagementOpen(false); }} className="flex min-h-11 w-full items-center gap-3 rounded-lg px-3 text-left hover:bg-slate-100"><Bell className="h-4 w-4" />공지 팝업 관리</button>
                <button type="button" onClick={() => { setDrawerTab('inquiry'); setIsDrawerOpen(true); setManagementOpen(false); }} className="flex min-h-11 w-full items-center gap-3 rounded-lg px-3 text-left hover:bg-slate-100"><Sliders className="h-4 w-4" />상담·기관 설정</button>
                {onLogout && <div className="mt-2 border-t border-slate-100 pt-2"><button type="button" onClick={onLogout} className="flex min-h-11 w-full items-center gap-3 rounded-lg px-3 text-left text-rose-700 hover:bg-rose-50"><LogOut className="h-4 w-4" />로그아웃</button></div>}
              </nav>}
            </div>
          </div>
        </div>
        {rawEditMode && !isPreviewMode && <div role="group" aria-label="페이지 편집 도구" className="flex flex-wrap items-center gap-2 border-t border-slate-700/70 pt-2">
          <span className="mr-1 text-xs text-slate-400">편집 도구</span>
          <button type="button" onClick={() => window.dispatchEvent(new CustomEvent('kfssec:edit-content'))} className="inline-flex min-h-9 items-center gap-2 rounded-lg bg-slate-800 px-3 text-xs font-medium text-slate-100 hover:bg-slate-700"><Edit3 className="h-3.5 w-3.5" />이 페이지 내용 수정</button>
          <button type="button" aria-pressed={isNavigatorOpen} onClick={() => setIsNavigatorOpen(!isNavigatorOpen)} className={`inline-flex min-h-9 items-center gap-2 rounded-lg border px-3 text-xs font-medium ${isNavigatorOpen ? 'border-slate-500 bg-slate-700 text-white' : 'border-slate-700 text-slate-300 hover:bg-slate-800'}`}><Layers className="h-3.5 w-3.5" />영역 목차</button>
          <button type="button" aria-pressed={showEditGuides} onClick={toggleEditGuides} className={`inline-flex min-h-9 items-center gap-2 rounded-lg border px-3 text-xs font-medium ${showEditGuides ? 'border-slate-500 bg-slate-700 text-white' : 'border-slate-700 text-slate-300 hover:bg-slate-800'}`}><Sparkles className="h-3.5 w-3.5" />수정 위치 표시</button>
          <span className="ml-auto hidden text-xs text-slate-400 xl:inline">화면의 글자·사진을 선택해 수정하세요.</span>
        </div>}
      </div>
    </aside>
    </>
  );
}
