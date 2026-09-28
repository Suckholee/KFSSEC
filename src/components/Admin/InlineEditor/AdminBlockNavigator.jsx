import React, { useState, useEffect } from 'react';
import { useAdminEdit } from '../../../context/AdminEditContext';
import {
  Layers,
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  Edit3,
  Sparkles,
  X,
  Compass,
  Tv,
  Image,
  Award,
  BookOpen,
  Globe,
  GraduationCap,
  Building,
  Building2,
  Bell,
  Sliders,
  Users,
  MessageSquare,
  Briefcase,
  Camera,
  MapPin,
  ChevronDown,
} from 'lucide-react';

const PAGE_SECTOR_MAP = {
  home: {
    title: '홈 메인',
    sectors: [
      { id: 'S-HOME-00', name: '🪟 행사 공지 팝업 (오늘 다시보지 않기)', isPopup: true, editLabel: '팝업 관리' },
      { id: 'S-HOME-01', name: '메인 비주얼 배너', editLabel: '배너 편집' },
      { id: 'S-HOME-02', name: '수강생 모집 / 이벤트 배너', editLabel: '배너 설정' },
      { id: 'S-HOME-08', name: '공식 유튜브 미디어', editLabel: '영상 링크', isYoutube: true },
      { id: 'S-HOME-03', name: '추천 강좌 큐레이션 (넷플릭스형)' },
      { id: 'S-HOME-04', name: '글로벌 외식 트렌드 뉴스' },
      { id: 'S-HOME-05', name: '자격증·실무 과정 카테고리' },
      { id: 'S-HOME-05B', name: '분야별 교육 포커스' },
      { id: 'S-HOME-06', name: '공식 제휴 & 파트너사 로고' },
      { id: 'S-HOME-07', name: '최신 공지사항 & 커뮤니티' },
      { id: 'S-GLOBAL-02', name: '하단 푸터 & 법인 정보', isFooter: true },
    ],
  },
  catalog: {
    title: '교육·자격증',
    sectors: [
      { id: 'S-CAT-01', name: '온라인 교육 과정 목록 & 검색', subTab: 'courses', editLabel: '과정 목록' },
      { id: 'S-CAT-02', name: '자격과정 안내 및 발급 절차', subTab: 'guide', editLabel: '자격 안내' },
      { id: 'S-CAT-03', name: '교육 및 개강 접수 일정', subTab: 'schedule', editLabel: '교육 일정' },
      { id: 'S-CAT-04', name: '자격 시험 및 검정 과목', subTab: 'cert_exam', editLabel: '시험 과목' },
      { id: 'S-CAT-05', name: '자격 검정 시험 일정', subTab: 'exam_schedule', editLabel: '시험 일정' },
      { id: 'S-GLOBAL-02', name: '하단 푸터 & 법인 정보', isFooter: true },
    ],
  },
  about: {
    title: '교육원 소개',
    sectors: [
      { id: 'S-ABOUT-00', name: '교육원 소개 & 12대 방향', subTab: 'greetings', editLabel: '소개·방향' },
      { id: 'S-ABOUT-01', name: '이사장 인사말 및 연설문', subTab: 'speech', editLabel: '인사말' },
      { id: 'S-ABOUT-02', name: '교육원 설립 연혁', subTab: 'history', editLabel: '연혁' },
      { id: 'S-ABOUT-04', name: '이사장 프로필 & 약력', subTab: 'profile', editLabel: '프로필' },
      { id: 'S-ABOUT-05', name: '교수진 및 자문위원', subTab: 'faculty', editLabel: '교수진' },
      { id: 'S-ABOUT-06', name: '조직도 및 법인정보', subTab: 'organization', editLabel: '조직도' },
      { id: 'S-GLOBAL-02', name: '하단 푸터 & 법인 정보', isFooter: true },
    ],
  },
  master: {
    title: '명장·명인',
    sectors: [
      { id: 'S-MAS-01', name: '명장·명인 전체 목록', subTab: 'all', editLabel: '전체' },
      { id: 'S-MAS-02', name: '대한민국 조리명장 명단', subTab: 'profiles', editLabel: '조리명장' },
      { id: 'S-MAS-03', name: '외식창업 조리명인 명단', subTab: 'directory', editLabel: '조리명인' },
      { id: 'S-GLOBAL-02', name: '하단 푸터 & 법인 정보', isFooter: true },
    ],
  },
  consulting: {
    title: '창업컨설팅',
    sectors: [
      { id: 'S-CON-01', name: '외식 창업 교육 과정 안내', subTab: 'education', editLabel: '창업 교육' },
      { id: 'S-CON-02', name: '1:1 맞춤 외식 창업 컨설팅', subTab: 'consulting', editLabel: '컨설팅' },
      { id: 'S-CON-03', name: '진익준 교수 프로필 & 전문분야', subTab: 'professor', editLabel: '교수 프로필' },
      { id: 'S-CON-04', name: '청년 창업 및 인큐베이팅 상담', subTab: 'youth', editLabel: '청년 창업' },
      { id: 'S-CON-05', name: '창업 준비 자가진단 및 가이드', subTab: 'readiness', editLabel: '창업 준비' },
      { id: 'S-GLOBAL-02', name: '하단 푸터 & 법인 정보', isFooter: true },
    ],
  },
  community: {
    title: '게시판·커뮤니티',
    sectors: [
      { id: 'S-COM-01', name: '전체 게시글 & 공지사항', subTab: 'all', editLabel: '전체글' },
      { id: 'S-COM-02', name: '공식 공지사항', subTab: 'notice', editLabel: '공지사항' },
      { id: 'S-COM-03', name: '주요 문의 (FAQ 10문 10답)', subTab: 'faq', editLabel: 'FAQ' },
      { id: 'S-COM-04', name: '1:1 온라인 문의 및 수강 상담', subTab: 'inquiry', editLabel: '1:1 문의' },
      { id: 'S-GLOBAL-02', name: '하단 푸터 & 법인 정보', isFooter: true },
    ],
  },
  gallery: {
    title: '갤러리·미디어',
    sectors: [
      { id: 'S-GAL-01', name: '전체 갤러리 미디어', subTab: 'all', editLabel: '전체' },
      { id: 'S-GAL-02', name: '요리대회 포토 갤러리', subTab: 'competition', editLabel: '요리대회' },
      { id: 'S-GAL-03', name: '시상식 & 인증패 갤러리', subTab: 'ceremony', editLabel: '시상식' },
      { id: 'S-GAL-04', name: '지자체 컨설팅 포토', subTab: 'consulting', editLabel: '컨설팅' },
      { id: 'S-GAL-05', name: '조리 실습 현장 스케치', subTab: 'training', editLabel: '실습현장' },
      { id: 'S-GLOBAL-02', name: '하단 푸터 & 법인 정보', isFooter: true },
    ],
  },
  partners: {
    title: '공식 제휴사',
    sectors: [
      { id: 'S-PART-01', name: '공식 제휴기관 & 파트너사 목록', editLabel: '제휴사 목록' },
      { id: 'S-PART-02', name: '글로벌 외식 산업 협력 MOU', editLabel: '협력 MOU' },
      { id: 'S-PART-03', name: '공식 업무 제휴 및 입점 문의', editLabel: '제휴 문의' },
      { id: 'S-GLOBAL-02', name: '하단 푸터 & 법인 정보', isFooter: true },
    ],
  },
};

const SECTOR_ICONS = {
  'S-HOME-00': <Bell className="w-3.5 h-3.5 text-amber-400 shrink-0" />,
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
  // Catalog
  'S-CAT-01': <BookOpen className="w-3.5 h-3.5 text-emerald-400 shrink-0" />,
  'S-CAT-02': <GraduationCap className="w-3.5 h-3.5 text-amber-400 shrink-0" />,
  'S-CAT-03': <Bell className="w-3.5 h-3.5 text-blue-400 shrink-0" />,
  'S-CAT-04': <Award className="w-3.5 h-3.5 text-rose-400 shrink-0" />,
  'S-CAT-05': <Bell className="w-3.5 h-3.5 text-purple-400 shrink-0" />,
  // About
  'S-ABOUT-00': <Building2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />,
  'S-ABOUT-01': <GraduationCap className="w-3.5 h-3.5 text-emerald-400 shrink-0" />,
  'S-ABOUT-02': <BookOpen className="w-3.5 h-3.5 text-blue-400 shrink-0" />,
  'S-ABOUT-04': <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />,
  'S-ABOUT-05': <Users className="w-3.5 h-3.5 text-indigo-400 shrink-0" />,
  'S-ABOUT-06': <Building className="w-3.5 h-3.5 text-purple-400 shrink-0" />,
  // Master
  'S-MAS-01': <Users className="w-3.5 h-3.5 text-amber-400 shrink-0" />,
  'S-MAS-02': <Award className="w-3.5 h-3.5 text-rose-400 shrink-0" />,
  'S-MAS-03': <Briefcase className="w-3.5 h-3.5 text-emerald-400 shrink-0" />,
  // Consulting
  'S-CON-01': <Briefcase className="w-3.5 h-3.5 text-cyan-400 shrink-0" />,
  'S-CON-02': <Globe className="w-3.5 h-3.5 text-emerald-400 shrink-0" />,
  'S-CON-03': <GraduationCap className="w-3.5 h-3.5 text-amber-400 shrink-0" />,
  'S-CON-04': <Users className="w-3.5 h-3.5 text-blue-400 shrink-0" />,
  'S-CON-05': <BookOpen className="w-3.5 h-3.5 text-rose-400 shrink-0" />,
  // Community
  'S-COM-01': <Bell className="w-3.5 h-3.5 text-teal-400 shrink-0" />,
  'S-COM-02': <Bell className="w-3.5 h-3.5 text-indigo-400 shrink-0" />,
  'S-COM-03': <MessageSquare className="w-3.5 h-3.5 text-sky-400 shrink-0" />,
  'S-COM-04': <Edit3 className="w-3.5 h-3.5 text-amber-400 shrink-0" />,
  // Gallery
  'S-GAL-01': <Camera className="w-3.5 h-3.5 text-rose-400 shrink-0" />,
  'S-GAL-02': <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />,
  'S-GAL-03': <Image className="w-3.5 h-3.5 text-indigo-400 shrink-0" />,
  'S-GAL-04': <Building className="w-3.5 h-3.5 text-cyan-400 shrink-0" />,
  'S-GAL-05': <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0" />,
  // Partners
  'S-PART-01': <Building className="w-3.5 h-3.5 text-orange-400 shrink-0" />,
  'S-PART-02': <Globe className="w-3.5 h-3.5 text-cyan-400 shrink-0" />,
  'S-PART-03': <Briefcase className="w-3.5 h-3.5 text-emerald-400 shrink-0" />,
  // Gangnam
  'S-GANG-01': <MapPin className="w-3.5 h-3.5 text-yellow-400 shrink-0" />,
  'S-GANG-02': <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0" />,
  'S-GANG-03': <Award className="w-3.5 h-3.5 text-blue-400 shrink-0" />,
  'S-GANG-04': <Bell className="w-3.5 h-3.5 text-purple-400 shrink-0" />,
};

export default function AdminBlockNavigator({
  activeTab = 'home',
  subTab,
  onTabChange,
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
  const [isPageDropdownOpen, setIsPageDropdownOpen] = useState(false);

  if (!isEditMode) return null;

  // Resolve current page's metadata dynamically
  const currentPageConfig = PAGE_SECTOR_MAP[activeTab] || PAGE_SECTOR_MAP.home;
  const currentSectors = currentPageConfig.sectors;
  const pageConfig = sectorSettings[activeTab] || {};

  // Scroll to targeted sector block and apply an eye-catching highlight glow
  const handleJumpToSector = (sector, actionToTrigger = null) => {
    setActiveHighlightId(sector.id);

    // If popup notice sector, open the drawer popup tab directly
    if (sector.isPopup) {
      setDrawerTab('popup');
      setIsDrawerOpen(true);
      if (window.innerWidth < 1024) {
        setIsNavigatorOpen(false);
      }
      return;
    }

    // If on admin route or other page, ensure onTabChange targets the correct tab
    const targetTab = activeTab === 'admin' ? 'home' : activeTab;

    // If sector requires switching subTab on this page
    if ((activeTab === 'admin' || (sector.subTab && sector.subTab !== subTab)) && onTabChange) {
      onTabChange(targetTab, sector.subTab);
    }

    let attempts = 0;
    // Scroll with small delay and retry to ensure any subtab view transition finishes
    const doScroll = () => {
      const element = document.getElementById(`sector-${sector.id}`);
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
      } else if (attempts < 5) {
        attempts++;
        setTimeout(doScroll, 120);
      }
    };

    setTimeout(doScroll, 80);

    // Auto-close on mobile screens (<1024px) after selection
    if (window.innerWidth < 1024) {
      setIsNavigatorOpen(false);
    }
  };

  const handleSwitchPage = (pageKey) => {
    setIsPageDropdownOpen(false);
    onTabChange?.(pageKey);
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
          <span>{currentPageConfig.title} 목차 ({currentSectors.length}개)</span>
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
        {/* Sidebar Header with Page Selector */}
        <div className="px-3.5 py-3 border-b border-slate-800 bg-slate-950/70 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0">
                <Layers className="w-4 h-4 text-amber-400" />
              </div>
              <div className="min-w-0">
                <h2 className="text-xs sm:text-sm font-black text-white truncate">
                  수정 블록 목차
                </h2>
                <p className="text-[10px] text-amber-400 font-bold">
                  {currentPageConfig.title} ({currentSectors.length}개 블록)
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

          {/* Quick Page Switcher Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsPageDropdownOpen(!isPageDropdownOpen)}
              className="w-full px-2.5 py-1.5 bg-slate-800/90 hover:bg-slate-800 border border-slate-700 rounded-lg text-[11px] font-bold text-slate-200 flex items-center justify-between transition cursor-pointer"
            >
              <span className="truncate">페이지 이동: {currentPageConfig.title}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {isPageDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 z-50 bg-slate-950 border border-amber-500/40 rounded-xl shadow-2xl p-1 text-xs divide-y divide-slate-800 max-h-56 overflow-y-auto">
                {Object.entries(PAGE_SECTOR_MAP).map(([key, item]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => handleSwitchPage(key)}
                    className={`w-full px-2.5 py-1.5 rounded-lg text-left text-[11px] font-bold flex items-center justify-between transition cursor-pointer ${
                      activeTab === key
                        ? 'bg-amber-500/20 text-amber-300'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <span>{item.title}</span>
                    <span className="text-[10px] font-mono text-slate-500">{key}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Quick Instructions Banner */}
        <div className="px-3.5 py-2 bg-amber-500/10 border-b border-amber-500/20 flex items-center gap-2 text-[11px] text-amber-300">
          <Compass className="w-3.5 h-3.5 shrink-0 text-amber-400" />
          <span className="truncate">블록 클릭 시 해당 화면으로 즉시 이동</span>
        </div>

        {/* Scrollable Sector Block List for Current Page */}
        <div className="flex-1 overflow-y-auto px-2 py-2.5 space-y-1 divide-y divide-slate-800/40">
          {currentSectors.map((sector) => {
            const isVisible = pageConfig[sector.id]?.visible !== false;
            const isSelected = activeHighlightId === sector.id || (sector.subTab && sector.subTab === subTab);

            return (
              <div
                key={sector.id}
                onClick={() => handleJumpToSector(sector)}
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
                      {sector.subTab && (
                        <span className="text-[9px] text-cyan-400 font-mono">
                          {sector.subTab}
                        </span>
                      )}
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
                  {/* Popup Specific Fast Trigger */}
                  {sector.isPopup && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setDrawerTab('popup');
                        setIsDrawerOpen(true);
                        if (window.innerWidth < 1024) {
                          setIsNavigatorOpen(false);
                        }
                      }}
                      className="p-1 rounded-md bg-amber-500/30 hover:bg-amber-500 text-amber-300 hover:text-slate-950 transition cursor-pointer text-[10px] font-bold flex items-center gap-0.5 px-1.5 border border-amber-500/40"
                      title="행사 공지 팝업 설정 열기"
                    >
                      <Sliders className="w-2.5 h-2.5" />
                      <span>설정</span>
                    </button>
                  )}

                  {/* YouTube Specific Fast Trigger */}
                  {sector.isYoutube && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleJumpToSector(sector, 'edit_youtube');
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
