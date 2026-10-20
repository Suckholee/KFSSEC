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
    showEditGuides,
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
      data-editor-sector={sectorId}
      data-editor-name={sectorName}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...bindProps}
      className={`relative transition-all duration-200 rounded-3xl ${
        isHovered
          ? 'ring-2 ring-amber-500/70 shadow-xl'
          : 'ring-1 ring-amber-500/20'
      } ${className}`}
    >
      <div data-content-editor-ui className="relative z-30 mb-3 flex flex-wrap items-center justify-between gap-2 rounded-xl bg-slate-900 px-3 py-2 text-white text-xs shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          <Layers className="w-3.5 h-3.5 text-amber-300" />
          <span className="font-bold">{sectorName} 영역</span>
          {showEditGuides && <span className="text-slate-300">제목·설명·목록·이미지를 구분해 수정할 수 있어요</span>}
        </div>
        <div className="flex items-center gap-2">
          <button type="button" onClick={e => { e.stopPropagation(); window.dispatchEvent(new CustomEvent('kfssec:edit-content', { detail: { sectorId } })); }} className="rounded-lg bg-amber-400 px-3 py-1.5 font-bold text-slate-950">내용 편집</button>
          <button type="button" onClick={handleOpenMenuManual} aria-label={`${sectorName} 영역 설정`} className="p-1.5 rounded hover:bg-slate-700" title="영역 순서·표시 설정"><MoreVertical className="w-4 h-4" /></button>
        </div>
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
        onEditContent={() => window.dispatchEvent(new CustomEvent('kfssec:edit-content', { detail: { sectorId } }))}
        editContentLabel="제목·설명·이미지 내용 편집"
        customActions={[...(onEditContent ? [{ label: editContentLabel, onClick: onEditContent }] : []), ...customActions]}
        onOpenDrawer={handleOpenDrawer}
      />
    </section>
  );
}
