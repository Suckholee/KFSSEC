import React, { useState } from 'react';
import { Search, User, ChevronDown, Menu, X, BookOpen } from 'lucide-react';

export default function Header({ currentView = 'landing', onViewChange, onOpenAuth, onOpenAbout }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Top Header Menu Items from exact Client Spec
  const navItems = [
    {
      id: 'about',
      name: '교육원 소개',
      subItems: ['설립 목적 및 12대 사업', '원장 인사말', '조직도', '오시는 길'],
    },
    {
      id: 'catalog',
      name: '자격증 과정',
      subItems: ['전체 교육과정', '자격증 과정 안내', '자격시험 일정', '기출문제 자료실'],
    },
    {
      id: 'knowledge',
      name: '지식 살롱',
      subItems: ['창업 노하우', '외식 트렌드 리포트', '시그니처 레시피'],
    },
    {
      id: 'consulting',
      name: '창업 컨설팅',
      subItems: ['1:1 맞춤 컨설팅', '연구용역 실적', '상권 분석'],
    },
    {
      id: 'masters',
      name: '명장·명인',
      subItems: ['외식 요리명인', '명인 사업단 소개', '명인 칼럼'],
    },
    {
      id: 'partners',
      name: '협력 업체',
      subItems: ['렌탈서비스', '출장서비스', 'POS & KIOSK 지원'],
    },
    {
      id: 'community',
      name: '게시판/이벤트',
      subItems: ['공지사항', '외식 요리대회', '이벤트 안내', '1:1 문의하기'],
    },
  ];

  const handleNavClick = (id, subItem = null) => {
    if (id === 'about' || subItem === '설립 목적 및 12대 사업') {
      onViewChange('about');
    } else if (id === 'catalog' || id === 'partners') {
      onViewChange('catalog');
    } else {
      onViewChange('catalog');
    }
    setActiveDropdown(null);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/98 backdrop-blur-md border-b border-emerald-100 shadow-xs transition-all">
      <div className="w-full px-4 sm:px-8 lg:px-10 py-3 flex items-center justify-between">
        
        {/* Official Logo */}
        <button
          onClick={() => onViewChange('landing')}
          className="flex items-center group text-left cursor-pointer shrink-0"
        >
          <img
            src="/images/official_logo.png"
            alt="사단법인 한국외식창업교육원"
            className="h-11 sm:h-12 w-auto object-contain group-hover:scale-102 transition-transform"
          />
        </button>

        {/* Center Desktop Navigation Menu */}
        <nav className="hidden xl:flex items-center gap-7">
          {navItems.map((item) => {
            const isActive =
              (item.id === 'catalog' && currentView === 'catalog') ||
              (item.id === 'about' && currentView === 'about');

            return (
              <div
                key={item.id}
                className="relative py-2"
                onMouseEnter={() => setActiveDropdown(item.id)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  onClick={() => handleNavClick(item.id)}
                  className={`text-base font-bold transition-colors duration-150 flex items-center gap-1 cursor-pointer py-1 ${
                    isActive || activeDropdown === item.id
                      ? 'text-emerald-700 font-extrabold'
                      : 'text-gray-800 hover:text-emerald-600'
                  }`}
                >
                  <span>{item.name}</span>
                  {item.subItems && (
                    <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform ${activeDropdown === item.id ? 'rotate-180 text-emerald-600' : ''}`} />
                  )}
                </button>

                {/* Dropdown Menu Overlay */}
                {activeDropdown === item.id && item.subItems && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-52 bg-white rounded-2xl border border-emerald-100 shadow-xl p-2.5 space-y-1 animate-fadeIn z-50">
                    {item.subItems.map((sub, sIdx) => (
                      <button
                        key={sIdx}
                        onClick={() => handleNavClick(item.id, sub)}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-gray-700 hover:bg-emerald-50 hover:text-emerald-800 transition-colors cursor-pointer"
                      >
                        {sub}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Right Header Utilities */}
        <div className="hidden sm:flex items-center gap-5 shrink-0">
          
          {/* Search Button */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-2 text-gray-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-full transition-colors cursor-pointer"
            title="교육 검색"
          >
            <Search className="w-5 h-5 stroke-[2.2]" />
          </button>

          {/* 수강목록 */}
          <button
            onClick={() => handleNavClick('catalog')}
            className="text-sm font-bold text-gray-700 hover:text-emerald-700 transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <BookOpen className="w-4 h-4 text-emerald-600" />
            <span>수강목록</span>
          </button>

          {/* User Profile Icon */}
          <button
            onClick={() => onOpenAuth('login')}
            className="w-9 h-9 rounded-full bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 text-emerald-800 flex items-center justify-center transition-colors cursor-pointer"
            title="마이페이지 / 로그인"
          >
            <User className="w-5 h-5" />
          </button>

        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="xl:hidden flex items-center gap-2">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-2 text-gray-600 hover:text-gray-900"
          >
            <Search className="w-5 h-5" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            aria-label="메뉴 열기"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Expandable Search Bar */}
      {searchOpen && (
        <div className="bg-emerald-50/60 border-t border-b border-emerald-100 px-4 sm:px-8 py-3 animate-fadeIn">
          <div className="max-w-3xl mx-auto flex items-center gap-3">
            <Search className="w-5 h-5 text-emerald-600" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="원하시는 교육과정, 업종, 자격증을 검색해보세요 (예: 카페, 한식, 비건)"
              className="flex-1 bg-transparent border-none text-sm font-semibold text-gray-900 focus:outline-none placeholder-emerald-800/50"
              autoFocus
            />
            <button
              onClick={() => {
                if (searchQuery.trim()) {
                  onViewChange('catalog');
                  setSearchOpen(false);
                }
              }}
              className="px-4 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-700 transition-colors"
            >
              검색
            </button>
          </div>
        </div>
      )}

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-gray-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-xl">
          <nav className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <div key={item.id} className="space-y-1">
                <button
                  onClick={() => {
                    handleNavClick(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-base font-bold flex items-center justify-between ${
                    ((item.id === 'catalog' && currentView === 'catalog') || (item.id === 'about' && currentView === 'about'))
                      ? 'bg-emerald-50 text-emerald-800 font-extrabold'
                      : 'text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  <span>{item.name}</span>
                </button>
                {item.subItems && (
                  <div className="pl-6 space-y-1">
                    {item.subItems.map((sub, sIdx) => (
                      <button
                        key={sIdx}
                        onClick={() => {
                          handleNavClick(item.id, sub);
                          setMobileMenuOpen(false);
                        }}
                        className="w-full text-left py-1 text-xs font-medium text-gray-500 hover:text-emerald-700"
                      >
                        • {sub}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
          
          <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-3">
            <button
              onClick={() => {
                handleNavClick('catalog');
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2 text-center text-xs font-bold text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              수강목록
            </button>
            <button
              onClick={() => {
                onOpenAuth('login');
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2 text-center text-xs font-bold text-white bg-emerald-600 rounded-lg hover:bg-emerald-700"
            >
              로그인 / 회원가입
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
