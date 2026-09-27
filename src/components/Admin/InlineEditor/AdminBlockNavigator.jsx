import React, { useState, useEffect } from 'react';
import { useAdminEdit } from '../../../context/AdminEditContext';
import {
  Layers,
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  Edit3,
  ExternalLink,
  Sparkles,
  X,
  Compass,
  CheckCircle2,
  Tv,
  Image,
  Award,
  BookOpen,
  Globe,
  GraduationCap,
  Building,
  Bell,
  Sliders,
} from 'lucide-react';

const SECTOR_ICONS = {
  'S-HOME-01': <Image className="w-3.5 h-3.5 text-amber-400 shrink-0" />,
  'S-HOME-02': <Award className="w-3.5 h-3.5 text-rose-400 shrink-0" />,
  'S-HOME-08': <Tv className="w-3.5 h-3.5 text-red-500 shrink-0" />,
  'S-HOME-03': <BookOpen className="w-3.5 h-3.5 text-emerald-400 shrink-0" />,
  'S-HOME-04': <Globe className="w-3.5 h-3.5 text-cyan-400 shrink-0" />,
  'S-HOME-05': <GraduationCap className="w-3.5 h-3.5 text-indigo-400 shrink-0" />,
  'S-HOME-05B': <Sparkles className="w-3.5 h-3.5 text-yellow-400 shrink-0" />,
  'S-HOME-06': <Building className="w-3.5 h-3.5 text-orange-400 shrink-0" />,
  'S-HOME-07': <Bell className="w-3.5 h-3.5 text-teal-400 shrink-0" />,
  'S-GLOBAL-02': <Building className="w-3.5 h-3.5 text-purple-400 shrink-0" />,
  // About Page
  'S-ABOUT-01': <GraduationCap className="w-3.5 h-3.5 text-emerald-400 shrink-0" />,
  'S-ABOUT-02': <BookOpen className="w-3.5 h-3.5 text-blue-400 shrink-0" />,
  'S-ABOUT-04': <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />,
  'S-ABOUT-05': <GraduationCap className="w-3.5 h-3.5 text-indigo-400 shrink-0" />,
  'S-ABOUT-06': <Building className="w-3.5 h-3.5 text-purple-400 shrink-0" />,
};

export default function AdminBlockNavigator({
  activeTab = 'home',
  homeSectors = [],
  aboutSectors = [],
}) {
  const {
    isEditMode,
    sectorSettings,
    toggleSectorVisibility,
    isNavigatorOpen,
    setIsNavigatorOpen,
    setIsDrawerOpen,
    setDrawerTab,
  } = useAdminEdit();

  const [activeHighlightId, setActiveHighlightId] = useState(null);

  // Auto detect current page's sectors
  const currentSectors = activeTab === 'about'
    ? (aboutSectors.length > 0 ? aboutSectors : [
        { id: 'S-ABOUT-01', name: '이사장 인사말 및 연설문' },
        { id: 'S-ABOUT-02', name: '교육원 설립 연혁' },
        { id: 'S-ABOUT-04', name: '이사장 프로필 & 약력' },
        { id: 'S-ABOUT-05', name: '교수진 및 자문위원' },
        { id: 'S-ABOUT-06', name: '조직도 및 법인정보' },
        { id: 'S-GLOBAL-02', name: '하단 푸터 & 법인 정보' },
      ])
    : (homeSectors.length > 0 ? homeSectors : [
        { id: 'S-HOME-01', name: '메인 비주얼 배너' },
        { id: 'S-HOME-02', name: '수강생 모집 / 이벤트 배너' },
        { id: 'S-HOME-08', name: '공식 유튜브 미디어' },
        { id: 'S-HOME-03', name: '추천 강좌 큐레이션 (넷플릭스형)' },
        { id: 'S-HOME-04', name: '글로벌 외식 트렌드 뉴스' },
        { id: 'S-HOME-05', name: '자격증·실무 과정 카테고리' },
        { id: 'S-HOME-05B', name: '분야별 교육 포커스' },
        { id: 'S-HOME-06', name: '공식 제휴 & 파트너사 로고' },
        { id: 'S-HOME-07', name: '최신 공지사항 & 커뮤니티' },
        { id: 'S-GLOBAL-02', name: '하단 푸터 & 법인 정보' },
      ]);

  if (!isEditMode) return null;

  const pageConfig = sectorSettings[activeTab] || {};

  // Scroll to targeted sector block and apply an eye-catching highlight glow
  const handleJumpToSector = (sectorId, actionToTrigger = null) => {
    setActiveHighlightId(sectorId);
    const element = document.getElementById(`sector-${sectorId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });

      // Add high-visibility ring glow
      element.classList.add('ring-4', 'ring-amber-400', 'ring-offset-4', 'ring-offset-black', 'shadow-2xl');
      setTimeout(() => {
        element.classList.remove('ring-4', 'ring-amber-400', 'ring-offset-4', 'ring-offset-black', 'shadow-2xl');
      }, 2500);

      // Trigger action if requested (e.g. YouTube modal)
      if (actionToTrigger) {
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent('kfssec:action', { detail: { action: actionToTrigger } }));
        }, 350);
      }
    }

    // Auto-close on mobile screens (<1024px) after selection
    if (window.innerWidth < 1024) {
      setIsNavigatorOpen(false);
    }
  };

  return (
    <>
      {/* 1. PC COLLAPSED FLOATING TRIGGER BUTTON (when sidebar is closed) */}
      {!isNavigatorOpen && (
        <button
          type="button"
          onClick={() => setIsNavigatorOpen(true)}
          className="fixed left-0 top-24 z-40 hidden lg:flex items-center gap-2 px-3 py-2.5 bg-slate-900/95 hover:bg-slate-800 text-amber-300 font-extrabold text-xs rounded-r-2xl border-y border-r border-amber-500/40 shadow-2xl transition-all transform hover:translate-x-1 cursor-pointer select-none backdrop-blur-md"
          title="수정 가능한 블록 목차 사이드바 열기"
        >
          <Layers className="w-4 h-4 text-amber-400 animate-pulse" />
          <span>블록 목차 ({currentSectors.length}개)</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      )}

      {/* 2. MOBILE BACKDROP OVERLAY (when drawer is open on mobile) */}
      {isNavigatorOpen && (
        <div
          className="fixed inset-0 z-[9998] bg-black/60 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={() => setIsNavigatorOpen(false)}
        />
      )}

      {/* 3. MAIN BLOCK NAVIGATOR (Left Sidebar on PC, Slide-over Drawer on Mobile) */}
      <aside
        aria-label="수정 블록 목차 카테고리 네비게이터"
        className={`fixed left-0 z-[9999] lg:z-40 transition-all duration-300 ease-in-out select-none flex flex-col bg-slate-900/95 backdrop-blur-xl border-r border-amber-500/30 text-white shadow-2xl ${
          // Mobile Positioning: full screen height slide-in drawer
          'inset-y-0 w-[84vw] max-w-[310px] ' +
          // Desktop Positioning: below toolbar, full remaining height
          'lg:top-[49px] lg:bottom-0 lg:w-[280px] ' +
          (isNavigatorOpen
            ? 'translate-x-0 opacity-100'
            : '-translate-x-full lg:-translate-x-full pointer-events-none opacity-0')
        }`}
      >
        {/* Sidebar Header */}
        <div className="px-4 py-3.5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0">
              <Layers className="w-4 h-4 text-amber-400" />
            </div>
            <div className="min-w-0">
              <h2 className="text-xs sm:text-sm font-black text-white truncate">
                수정 블록 목차
              </h2>
              <p className="text-[10px] text-emerald-400 font-mono">
                {activeTab.toUpperCase()} 섹터 ({currentSectors.length}개)
              </p>
            </div>
          </div>

          {/* Close / Collapse Button */}
          <button
            type="button"
            onClick={() => setIsNavigatorOpen(false)}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
            title="목차 사이드바 닫기/접기"
          >
            <ChevronLeft className="w-4 h-4 hidden lg:inline" />
            <X className="w-4 h-4 lg:hidden" />
          </button>
        </div>

        {/* Quick Instructions Banner */}
        <div className="px-3.5 py-2 bg-amber-500/10 border-b border-amber-500/20 flex items-center gap-2 text-[11px] text-amber-300">
          <Compass className="w-3.5 h-3.5 shrink-0 text-amber-400" />
          <span className="truncate">항목 클릭 시 해당 위치로 즉시 이동</span>
        </div>

        {/* Scrollable Sector Block List */}
        <div className="flex-1 overflow-y-auto px-2 py-2.5 space-y-1 divide-y divide-slate-800/40">
          {currentSectors.map((sector, index) => {
            const isVisible = pageConfig[sector.id]?.visible !== false;
            const isSelected = activeHighlightId === sector.id;

            return (
              <div
                key={sector.id}
                onClick={() => handleJumpToSector(sector.id)}
                className={`group flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-amber-500/20 border border-amber-400/60 shadow-md text-amber-200'
                    : isVisible
                    ? 'hover:bg-slate-800/80 text-slate-200 hover:text-white'
                    : 'bg-slate-950/40 text-slate-500 hover:text-slate-400 line-through'
                }`}
              >
                {/* Sector Info */}
                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                  <div className="shrink-0">
                    {SECTOR_ICONS[sector.id] || <Layers className="w-3.5 h-3.5 text-slate-400" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="font-mono text-[9px] font-bold px-1.5 py-0.2 rounded bg-slate-800 border border-slate-700 text-slate-300">
                        {sector.id}
                      </span>
                      {!isVisible && (
                        <span className="text-[9px] text-rose-400 font-bold">
                          [숨김]
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-bold truncate leading-tight">
                      {sector.name}
                    </p>
                  </div>
                </div>

                {/* Right Quick Controls on each item */}
                <div className="flex items-center gap-1 shrink-0 opacity-80 group-hover:opacity-100">
                  {/* YouTube Specific Fast Trigger */}
                  {sector.id === 'S-HOME-08' && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleJumpToSector(sector.id, 'edit_youtube');
                      }}
                      className="p-1 rounded-md bg-red-600/30 hover:bg-red-600 text-red-300 hover:text-white transition cursor-pointer text-[10px] font-bold flex items-center gap-0.5 px-1.5"
                      title="유튜브 영상 링크 변경 팝업 열기"
                    >
                      <Edit3 className="w-2.5 h-2.5" />
                      <span>영상</span>
                    </button>
                  )}

                  {/* Toggle Visibility (Show/Hide) */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSectorVisibility(activeTab, sector.id);
                    }}
                    className={`p-1 rounded-md transition cursor-pointer ${
                      isVisible
                        ? 'hover:bg-slate-700 text-slate-400 hover:text-slate-200'
                        : 'bg-rose-950/40 text-rose-400 hover:bg-rose-900/60'
                    }`}
                    title={isVisible ? '방문자에게 숨기기' : '화면에 다시 노출하기'}
                  >
                    {isVisible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Sidebar Footer with Drawer Shortcut */}
        <div className="p-3 border-t border-slate-800 bg-slate-950/80 space-y-2">
          <button
            type="button"
            onClick={() => {
              if (window.innerWidth < 1024) setIsNavigatorOpen(false);
              setDrawerTab('info');
              setIsDrawerOpen(true);
            }}
            className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <Sliders className="w-3.5 h-3.5 text-sky-400" />
            <span>법인 고정 정보 & 문의 서랍</span>
          </button>
        </div>
      </aside>
    </>
  );
}
