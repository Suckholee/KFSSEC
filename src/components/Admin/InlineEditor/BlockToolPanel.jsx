import React, { useState } from 'react';
import {
  Edit3,
  ArrowUp,
  ArrowDown,
  EyeOff,
  Eye,
  Sliders,
  Copy,
  Check,
  X,
  Layers,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

export default function BlockToolPanel({
  isOpen,
  isMobile,
  position,
  onClose,
  sectorId,
  sectorName,
  canMoveUp,
  canMoveDown,
  onMoveUp,
  onMoveDown,
  onToggleVisibility,
  isVisible = true,
  onEditContent,
  editContentLabel = '블록 내용 직접 수정',
  customActions = [],
  onOpenDrawer,
}) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyId = (e) => {
    e.stopPropagation();
    try {
      navigator.clipboard.writeText(sectorId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  // DESKTOP: Floating Context Menu
  if (!isMobile) {
    return (
      <div
        className="fixed inset-0 z-[9998] select-none"
        onClick={onClose}
        onContextMenu={(e) => {
          e.preventDefault();
          onClose();
        }}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            position: 'fixed',
            left: `${position.x}px`,
            top: `${position.y}px`,
          }}
          className="z-[9999] w-[270px] bg-slate-900/95 backdrop-blur-xl border border-amber-500/40 rounded-2xl shadow-2xl p-2.5 text-white animate-fadeIn text-xs font-sans divide-y divide-slate-800"
        >
          {/* Header */}
          <div className="pb-2 px-1 flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 font-mono text-[10px] font-bold shrink-0">
                {sectorId}
              </span>
              <span className="font-extrabold text-slate-100 truncate text-[11px]">
                {sectorName}
              </span>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Primary Action (If specific content editor provided) */}
          {onEditContent && (
            <div className="py-1.5">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onEditContent();
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs shadow-md transition transform active:scale-95 cursor-pointer"
              >
                <Edit3 className="w-4 h-4 stroke-[2.5]" />
                <span>{editContentLabel}</span>
              </button>
            </div>
          )}

          {/* Custom Section-Specific Actions */}
          {customActions && customActions.length > 0 && (
            <div className="py-1 space-y-0.5">
              {customActions.map((action, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    onClose();
                    action.onClick?.();
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg hover:bg-slate-800 text-slate-200 hover:text-white font-medium text-xs transition cursor-pointer text-left"
                >
                  {action.icon || <Sparkles className="w-3.5 h-3.5 text-amber-400" />}
                  <span>{action.label}</span>
                </button>
              ))}
            </div>
          )}

          {/* Block Reordering & Visibility Actions */}
          <div className="py-1 space-y-0.5">
            <button
              type="button"
              disabled={!canMoveUp}
              onClick={() => {
                onClose();
                onMoveUp?.();
              }}
              className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg hover:bg-slate-800 disabled:opacity-40 disabled:hover:bg-transparent text-slate-200 hover:text-white font-medium text-xs transition cursor-pointer disabled:cursor-not-allowed"
            >
              <div className="flex items-center gap-2.5">
                <ArrowUp className="w-3.5 h-3.5 text-emerald-400" />
                <span>블록 한 칸 위로 이동</span>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">▲</span>
            </button>

            <button
              type="button"
              disabled={!canMoveDown}
              onClick={() => {
                onClose();
                onMoveDown?.();
              }}
              className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg hover:bg-slate-800 disabled:opacity-40 disabled:hover:bg-transparent text-slate-200 hover:text-white font-medium text-xs transition cursor-pointer disabled:cursor-not-allowed"
            >
              <div className="flex items-center gap-2.5">
                <ArrowDown className="w-3.5 h-3.5 text-emerald-400" />
                <span>블록 한 칸 아래로 이동</span>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">▼</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onClose();
                onToggleVisibility?.();
              }}
              className="w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg hover:bg-slate-800 text-slate-200 hover:text-red-300 font-medium text-xs transition cursor-pointer"
            >
              {isVisible ? (
                <>
                  <EyeOff className="w-3.5 h-3.5 text-red-400" />
                  <span>이 블록 방문자에게 숨기기</span>
                </>
              ) : (
                <>
                  <Eye className="w-3.5 h-3.5 text-emerald-400" />
                  <span>이 블록 다시 화면에 노출</span>
                </>
              )}
            </button>
          </div>

          {/* Secondary Utilities */}
          <div className="pt-1.5 space-y-0.5">
            {onOpenDrawer && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenDrawer();
                }}
                className="w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white font-medium text-xs transition cursor-pointer"
              >
                <Sliders className="w-3.5 h-3.5 text-sky-400" />
                <span>관리 서랍 패널 열기</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleCopyId}
              className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200 font-medium text-[11px] transition cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Copy className="w-3 h-3" />
                <span>섹터 코드 복사</span>
              </div>
              {copied && <span className="text-emerald-400 font-bold">복사됨!</span>}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // MOBILE: Bottom Action Sheet
  return (
    <div
      className="fixed inset-0 z-[9998] bg-black/70 backdrop-blur-sm flex flex-col justify-end animate-fadeIn select-none"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="z-[9999] bg-slate-900 border-t border-amber-500/50 rounded-t-3xl p-5 text-white max-h-[85vh] overflow-y-auto shadow-2xl animate-slideUp space-y-4"
      >
        {/* Grabber Handle */}
        <div className="w-12 h-1.5 bg-slate-700 rounded-full mx-auto mb-1" />

        {/* Mobile Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 font-mono text-xs font-bold">
              {sectorId}
            </span>
            <h3 className="font-extrabold text-base text-white">
              {sectorName}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Primary Content Editor Action Button on Mobile */}
        {onEditContent && (
          <button
            type="button"
            onClick={() => {
              onClose();
              onEditContent();
            }}
            className="w-full py-3.5 px-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-black font-black text-sm flex items-center justify-center gap-2 shadow-lg active:scale-98 transition cursor-pointer"
          >
            <Edit3 className="w-4 h-4 stroke-[2.5]" />
            <span>{editContentLabel}</span>
          </button>
        )}

        {/* Custom Actions */}
        {customActions && customActions.length > 0 && (
          <div className="grid grid-cols-1 gap-2">
            {customActions.map((action, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  onClose();
                  action.onClick?.();
                }}
                className="w-full py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-3 transition cursor-pointer"
              >
                {action.icon || <Sparkles className="w-4 h-4 text-amber-400" />}
                <span>{action.label}</span>
              </button>
            ))}
          </div>
        )}

        {/* Movement Controls on Mobile */}
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            disabled={!canMoveUp}
            onClick={() => {
              onClose();
              onMoveUp?.();
            }}
            className="py-3 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer disabled:cursor-not-allowed"
          >
            <ArrowUp className="w-4 h-4 text-emerald-400" />
            <span>위로 한 칸 이동</span>
          </button>

          <button
            type="button"
            disabled={!canMoveDown}
            onClick={() => {
              onClose();
              onMoveDown?.();
            }}
            className="py-3 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer disabled:cursor-not-allowed"
          >
            <ArrowDown className="w-4 h-4 text-emerald-400" />
            <span>아래로 한 칸 이동</span>
          </button>
        </div>

        {/* Visibility Toggle */}
        <button
          type="button"
          onClick={() => {
            onClose();
            onToggleVisibility?.();
          }}
          className="w-full py-3 px-4 rounded-xl bg-red-950/40 border border-red-500/40 text-red-300 font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer"
        >
          {isVisible ? (
            <>
              <EyeOff className="w-4 h-4 text-red-400" />
              <span>이 블록 방문자에게 숨기기 (OFF)</span>
            </>
          ) : (
            <>
              <Eye className="w-4 h-4 text-emerald-400" />
              <span>이 블록 다시 노출하기 (ON)</span>
            </>
          )}
        </button>

        {/* Footer Utilities */}
        <div className="pt-2 flex items-center justify-between text-xs text-slate-400">
          {onOpenDrawer && (
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenDrawer();
              }}
              className="flex items-center gap-1.5 text-sky-400 font-bold p-1"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>전체 관리 서랍 열기</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleCopyId}
            className="flex items-center gap-1 text-slate-400 hover:text-white p-1"
          >
            <Copy className="w-3 h-3" />
            <span>{copied ? '복사 완료!' : `ID: ${sectorId}`}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
