import React, { useState } from 'react';
import { useAdminEdit } from '../../../context/AdminEditContext';
import { Eye, EyeOff, ArrowUp, ArrowDown, Layers, Check } from 'lucide-react';

export default function SectorBlock({
  sectorId,
  sectorName,
  pageKey = 'home',
  sectorList = [],
  children,
  className = '',
}) {
  const { isEditMode, sectorSettings, toggleSectorVisibility, moveSector } = useAdminEdit();
  const [isHovered, setIsHovered] = useState(false);

  const pageConfig = sectorSettings[pageKey] || {};
  const isVisible = pageConfig[sectorId]?.visible !== false;

  // When not in edit mode, if hidden don't render; if visible, render children normally
  if (!isEditMode) {
    return isVisible ? <div className={className}>{children}</div> : null;
  }

  // In Edit Mode, but sector is marked hidden: Show a gentle placeholder so the admin can un-hide it anytime
  if (!isVisible) {
    return (
      <div className="my-4 mx-4 p-4 rounded-xl border-2 border-dashed border-slate-300 bg-slate-100/80 text-slate-500 flex items-center justify-between gap-4 transition select-none">
        <div className="flex items-center gap-2">
          <EyeOff className="w-4 h-4 text-slate-400" />
          <span className="font-semibold text-xs tracking-wider uppercase bg-slate-200 px-2 py-0.5 rounded text-slate-600">
            {sectorId}
          </span>
          <span className="font-medium text-sm text-slate-700">{sectorName}</span>
          <span className="text-xs text-slate-400">(현재 방문자에게 숨김 처리됨)</span>
        </div>
        <button
          type="button"
          onClick={() => toggleSectorVisibility(pageKey, sectorId)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs shadow-sm transition active:scale-95"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>화면에 다시 보이기</span>
        </button>
      </div>
    );
  }

  const currentIndex = sectorList.findIndex(s => s.id === sectorId);
  const canMoveUp = currentIndex > 0;
  const canMoveDown = currentIndex >= 0 && currentIndex < sectorList.length - 1;

  return (
    <section
      aria-label={`${sectorName} 섹터`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative transition-all ${
        isHovered
          ? 'ring-2 ring-amber-500/70 ring-offset-2 rounded-xl shadow-lg'
          : 'ring-1 ring-amber-400/20'
      } ${className}`}
    >
      {/* Sector Control Bar - visible on hover or persistent in edit mode */}
      <div
        className={`sticky top-14 z-30 transition-all px-3 py-1.5 bg-slate-900/90 backdrop-blur-md text-white border-b border-amber-500/40 rounded-t-xl flex items-center justify-between gap-2 shadow-md ${
          isHovered ? 'opacity-100' : 'opacity-75 sm:opacity-40 hover:opacity-100'
        }`}
      >
        {/* Sector Label */}
        <div className="flex items-center gap-2 text-xs font-semibold">
          <Layers className="w-3.5 h-3.5 text-amber-400" />
          <span className="bg-amber-500/30 text-amber-300 px-1.5 py-0.5 rounded border border-amber-500/40 font-mono text-[11px]">
            {sectorId}
          </span>
          <span className="text-slate-200">{sectorName}</span>
        </div>

        {/* Action Buttons: Move Up, Move Down, Hide */}
        <div className="flex items-center gap-1.5 text-xs">
          {canMoveUp && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                moveSector(pageKey, sectorList, sectorId, 'up');
              }}
              className="p-1 rounded bg-slate-800 hover:bg-amber-600 text-slate-300 hover:text-white transition"
              title="이 섹터를 한 단계 위로 이동"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          )}

          {canMoveDown && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                moveSector(pageKey, sectorList, sectorId, 'down');
              }}
              className="p-1 rounded bg-slate-800 hover:bg-amber-600 text-slate-300 hover:text-white transition"
              title="이 섹터를 한 단계 아래로 이동"
            >
              <ArrowDown className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleSectorVisibility(pageKey, sectorId);
            }}
            className="inline-flex items-center gap-1 px-2 py-1 rounded bg-slate-800 hover:bg-red-600/80 text-slate-300 hover:text-white transition"
            title="방문자 화면에서 이 섹터 숨기기"
          >
            <EyeOff className="w-3 h-3" />
            <span className="text-[11px]">숨기기</span>
          </button>
        </div>
      </div>

      {/* Actual Sector Content */}
      <div className="relative">
        {children}
      </div>
    </section>
  );
}
