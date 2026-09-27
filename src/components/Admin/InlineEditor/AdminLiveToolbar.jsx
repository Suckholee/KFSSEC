import React from 'react';
import { useAdminEdit } from '../../../context/AdminEditContext';
import {
  Edit3,
  Eye,
  RotateCcw,
  Save,
  CheckCircle2,
  Sliders,
  LogOut,
  Shield,
  Layers,
  Sparkles,
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
    isNavigatorOpen,
    setIsNavigatorOpen,
    showEditGuides,
    toggleEditGuides,
    onLogout,
  } = useAdminEdit();

  if (!isAdmin) return null;

  return (
    <aside
      aria-label="관리자 라이브 편집 툴바"
      className="sticky top-0 z-[9999] w-full bg-slate-900/95 backdrop-blur-md text-white border-b border-amber-500/30 shadow-2xl px-3 sm:px-6 py-2.5 transition-all select-none"
    >
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
        {/* Left: Badge & Mode Controls */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-400 font-semibold border border-amber-500/40">
            <Shield className="w-3.5 h-3.5" />
            <span>KFSSEC 라이브 편집기</span>
          </div>

          {/* Block TOC Navigator Toggle Button */}
          {rawEditMode && !isPreviewMode && (
            <button
              type="button"
              onClick={() => setIsNavigatorOpen(!isNavigatorOpen)}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md font-bold transition-all cursor-pointer ${
                isNavigatorOpen
                  ? 'bg-amber-500 text-black shadow-md ring-2 ring-amber-400/60'
                  : 'bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/40'
              }`}
              title="수정 가능한 블록 목차 사이드바 열기/닫기"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>블록 목차</span>
            </button>
          )}

          {/* Edit Mode Toggle Switch */}
          <button
            type="button"
            onClick={() => {
              setIsEditMode(!rawEditMode);
              if (isPreviewMode) setIsPreviewMode(false);
            }}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md font-medium transition-all cursor-pointer ${
              rawEditMode && !isPreviewMode
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm ring-2 ring-emerald-400/40'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{rawEditMode && !isPreviewMode ? '편집 모드 켜짐' : '편집 모드 꺼짐'}</span>
          </button>

          {/* Highlight Editable Areas Toggle Switch */}
          {rawEditMode && !isPreviewMode && (
            <button
              type="button"
              onClick={toggleEditGuides}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md font-bold transition-all cursor-pointer ${
                showEditGuides
                  ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-md ring-2 ring-amber-300'
                  : 'bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/40'
              }`}
              title="화면 내 수정 가능한 모든 글자와 사진을 은은한 점선과 아이콘으로 한눈에 표시"
            >
              <Sparkles className={`w-3.5 h-3.5 ${showEditGuides ? 'fill-slate-950 text-slate-950' : 'text-amber-400'}`} />
              <span>{showEditGuides ? '👁️ 수정 영역 강조 켜짐' : '👁️ 수정 영역 강조'}</span>
            </button>
          )}

          {/* Visitor Preview Mode Toggle */}
          <button
            type="button"
            onClick={() => setIsPreviewMode(!isPreviewMode)}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium transition-all cursor-pointer ${
              isPreviewMode
                ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-400/40'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
            }`}
            title="편집 안내선과 테두리를 숨기고 실제 방문자 화면으로 확인"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{isPreviewMode ? '방문자 미리보기 중' : '방문자 시점'}</span>
          </button>
        </div>

        {/* Center: Live Status & Feedback */}
        <div className="flex items-center gap-2">
          {saveSuccessNotice ? (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-medium border border-emerald-500/40 animate-pulse">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Supabase에 저장 완료!</span>
            </div>
          ) : pendingChanges.count > 0 ? (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 font-medium border border-amber-500/40 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              <span>{pendingChanges.count}건 수정됨 (저장 대기)</span>
            </div>
          ) : (
            <span className="text-slate-300 text-xs hidden md:inline font-medium">
              💡 블록 위에서 <strong className="text-amber-300 font-bold">마우스 우클릭</strong>(PC) 또는 <strong className="text-amber-300 font-bold">꾹 누르면</strong>(모바일) 수정 툴 패널이 열립니다.
            </span>
          )}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 flex-wrap">
          {pendingChanges.count > 0 && (
            <button
              type="button"
              onClick={revertAllChanges}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
              title="저장하지 않은 모든 수정을 원래대로 취소"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>되돌리기</span>
            </button>
          )}

          {/* Primary Save Button */}
          <button
            type="button"
            onClick={saveAllChanges}
            disabled={isSaving || pendingChanges.count === 0}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md font-semibold text-white transition-all shadow-md ${
              pendingChanges.count > 0
                ? 'bg-emerald-600 hover:bg-emerald-500 active:scale-95 cursor-pointer ring-2 ring-emerald-400/50'
                : 'bg-slate-700 text-slate-400 cursor-not-allowed opacity-70'
            }`}
          >
            <Save className={`w-3.5 h-3.5 ${isSaving ? 'animate-spin' : ''}`} />
            <span>{isSaving ? '저장 중…' : '지금 화면 저장'}</span>
          </button>

          {/* Management Drawer Opener */}
          <button
            type="button"
            onClick={() => setIsDrawerOpen(true)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 transition"
            title="수강생 신청 내역 및 기관 설정"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">관리 서랍</span>
          </button>

          {/* Logout / Exit Editor */}
          {onLogout && (
            <button
              type="button"
              onClick={onLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500 text-rose-300 hover:text-white border border-rose-500/40 transition-all font-bold text-xs cursor-pointer shadow-xs active:scale-95"
              title="관리자 모드를 종료하고 일반 방문자 화면으로 돌아갑니다."
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>편집기 닫기 (로그아웃)</span>
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}
