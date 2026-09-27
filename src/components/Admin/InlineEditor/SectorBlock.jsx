import React, { useState } from 'react';
import { useAdminEdit } from '../../../context/AdminEditContext';
import { Eye, EyeOff, Layers, MoreVertical, Sparkles } from 'lucide-react';
import { useBlockContextMenu } from '../../../hooks/useBlockContextMenu';
import BlockToolPanel from './BlockToolPanel';

export default function SectorBlock({
  sectorId,
  sectorName,
  pageKey = 'home',
  sectorList = [],
  children,
  className = '',
  onEditContent,
  editContentLabel = '블록 내용 직접 수정',
  customActions = [],
}) {
  const {
    isEditMode,
    sectorSettings,
    toggleSectorVisibility,
    moveSector,
    setIsDrawerOpen,
  } = useAdminEdit();

  const [isHovered, setIsHovered] = useState(false);

  // Hook for PC Right-Click & Mobile Long-Press (~500ms)
  const { isOpen, isMobile, position, closeMenu, bindProps } = useBlockContextMenu({
    isEnabled: isEditMode,
  });

  const pageConfig = sectorSettings[pageKey] || {};
  const isVisible = pageConfig[sectorId]?.visible !== false;

  // When not in edit mode:
  // - If hidden, don't render at all
  // - If visible, render clean production markup with no admin overhead
  if (!isEditMode) {
    return isVisible ? <div className={className}>{children}</div> : null;
  }

  // In Edit Mode, but sector is marked hidden: Show a gentle placeholder so the admin can un-hide it anytime
  if (!isVisible) {
    return (
      <div id={`sector-${sectorId}`} className="my-4 mx-4 p-4 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-100/90 text-slate-500 flex items-center justify-between gap-4 transition select-none">
        <div className="flex items-center gap-2">
          <EyeOff className="w-4 h-4 text-slate-400" />
          <span className="font-semibold text-xs tracking-wider uppercase bg-slate-200 px-2 py-0.5 rounded text-slate-600">
            {sectorId}
          </span>
          <span className="font-medium text-sm text-slate-700">{sectorName}</span>
          <span className="text-xs text-slate-400 hidden sm:inline">(현재 방문자에게 숨김 처리됨)</span>
        </div>
        <button
          type="button"
          onClick={() => toggleSectorVisibility(pageKey, sectorId)}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow transition active:scale-95 cursor-pointer"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>화면에 다시 노출하기</span>
        </button>
      </div>
    );
  }

  const currentIndex = sectorList.findIndex((s) => s.id === sectorId);
  const canMoveUp = currentIndex > 0;
  const canMoveDown = currentIndex >= 0 && currentIndex < sectorList.length - 1;

  const handleMoveUp = () => {
    moveSector(pageKey, sectorList, sectorId, 'up');
  };

  const handleMoveDown = () => {
    moveSector(pageKey, sectorList, sectorId, 'down');
  };

  const handleToggleVisibility = () => {
    toggleSectorVisibility(pageKey, sectorId);
  };

  const handleOpenDrawer = () => {
    setIsDrawerOpen(true);
  };

  // Explicit click on the 3-dots button to open menu
  const handleOpenMenuManual = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.min(rect.left, window.innerWidth - 280);
    const y = rect.bottom + 4;
    bindProps.onContextMenu({
      clientX: x,
      clientY: y,
      preventDefault: () => {},
      stopPropagation: () => {},
    });
  };

  return (
    <section
      id={`sector-${sectorId}`}
      aria-label={`${sectorName} 섹터`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...bindProps}
      className={`relative transition-all duration-200 rounded-3xl ${
        isHovered
          ? 'ring-2 ring-amber-500/70 shadow-xl'
          : 'ring-1 ring-amber-500/20'
      } ${className}`}
    >
      {/* Sleek Minimal Corner Block Badge in Edit Mode */}
      <div
        className={`absolute top-2 left-2 z-30 transition-all flex items-center gap-1.5 ${
          isHovered ? 'opacity-100' : 'opacity-60 sm:opacity-40 hover:opacity-100'
        }`}
      >
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-900/90 backdrop-blur-md border border-amber-500/40 text-white shadow-lg text-[11px] font-sans">
          <Layers className="w-3 h-3 text-amber-400 shrink-0" />
          <span className="font-mono font-bold text-amber-300 text-[10px]">
            {sectorId}
          </span>
          <span className="font-bold text-slate-200 truncate max-w-[150px] sm:max-w-none">
            {sectorName}
          </span>

          {/* Quick Context Menu Button */}
          <button
            type="button"
            onClick={handleOpenMenuManual}
            className="ml-1 p-0.5 rounded hover:bg-slate-800 text-amber-400 hover:text-white transition cursor-pointer"
            title="수정 툴 패널 열기 (우클릭 또는 모바일 꾹 누르기)"
          >
            <MoreVertical className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Hover Interaction Hint (Desktop only) */}
        {isHovered && (
          <span className="hidden md:inline-block px-2 py-0.5 rounded-lg bg-black/75 backdrop-blur-sm text-[10px] text-amber-300/90 border border-white/10 shadow-sm animate-fadeIn">
            💡 우클릭 / 꾹 누르면 수정 툴
          </span>
        )}
      </div>

      {/* Actual Sector Content */}
      <div className="relative">
        {children}
      </div>

      {/* CONTEXTUAL TOOL PANEL (PC Right-Click & Mobile Long-Press) */}
      <BlockToolPanel
        isOpen={isOpen}
        isMobile={isMobile}
        position={position}
        onClose={closeMenu}
        sectorId={sectorId}
        sectorName={sectorName}
        canMoveUp={canMoveUp}
        canMoveDown={canMoveDown}
        onMoveUp={handleMoveUp}
        onMoveDown={handleMoveDown}
        onToggleVisibility={handleToggleVisibility}
        isVisible={isVisible}
        onEditContent={onEditContent}
        editContentLabel={editContentLabel}
        customActions={customActions}
        onOpenDrawer={handleOpenDrawer}
      />
    </section>
  );
}
