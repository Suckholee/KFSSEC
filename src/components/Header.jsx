import React, { useState, useRef } from 'react';
import { ShieldCheck, ChevronDown, User, LogIn, Globe, Search, Menu, X, BookOpen, Layers } from 'lucide-react';

export default function Header({ currentView, onViewChange, onOpenAuth, onOpenAboutTab }) {
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lang, setLang] = useState('KOR');
  
  const timeoutRef = useRef(null);

  const megaMenuItems = [
    {
      title: '교육원 소개',
      key: 'about',
      subLinks: [
        { label: '교육원 소개', tab: 'greetings' },
        { label: '원장 인사말', tab: 'speech' },
        { label: '원장 프로필', tab: 'profile' },
        { label: '조직도', tab: 'organization' },
        { label: '교육원 사무국', tab: 'location' },
      ],
    },
    {
      title: '명인사업단',
      key: 'masters',
      subLinks: [
        { label: '명인 사업단', tab: 'masters' },
        { label: '명인 요리', action: 'catalog_masters' },
      ],
    },
    {
      title: '교육·자격증',
      key: 'education',
      subLinks: [
        { label: '교육 과정', action: 'catalog' },
        { label: '교육 일정', action: 'schedule' },
        { label: '자격 시험', action: 'certification' },
        { label: '시험 일정', action: 'exam_schedule' },
      ],
    },
    {
      title: '창업컨설팅',
      key: 'consulting',
      subLinks: [
        { label: '창업 교육', action: 'package' },
        { label: '창업 컨설팅', action: 'consulting_modal' },
        { label: '청년 창업 상담', action: 'consulting_modal' },
        { label: '창업 준비', action: 'startup_guide' },
      ],
    },
    {
      title: '커뮤니티',
      key: 'community',
      subLinks: [
        { label: '공지 사항', action: 'notice' },
        { label: '갤러리', action: 'gallery' },
        { label: '요리대회', action: 'competition' },
        { label: '문의하기', action: 'inquiry_modal' },
      ],
    },
  ];

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setMegaMenuOpen(true);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setMegaMenuOpen(false);
    }, 200);
  };

  const handleSubLinkClick = (item) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setMegaMenuOpen(false);
    setMobileMenuOpen(false);

    if (item.tab) {
      onOpenAboutTab(item.tab);
    } else if (item.action === 'catalog' || item.action === 'catalog_masters') {
      onViewChange('catalog');
    } else if (item.action === 'consulting_modal' || item.action === 'inquiry_modal') {
      onOpenAuth('consulting');
    } else if (item.action === 'notice' || item.action === 'gallery') {
      onViewChange('landing');
    } else {
      onViewChange('catalog');
    }
  };

  return (
    <header className="relative bg-[#0a1410] border-b border-emerald-950/80 z-50 transition-all font-sans text-white">
      
      {/* Main Top Header Bar */}
      <div className="w-full px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto h-20 sm:h-24 flex items-center justify-between">
        
        {/* Official Logo */}
        <div
          onClick={() => onViewChange('landing')}
          className="flex items-center gap-3 cursor-pointer group shrink-0"
        >
          <img
            src="/images/logo.png"
            alt="사단법인 한국외식창업교육원"
            className="h-10 sm:h-12 w-auto object-contain group-hover:scale-103 transition-transform"
          />
        </div>

        {/* Desktop Main Navigation Bar */}
        <nav
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="hidden md:flex items-center gap-8 lg:gap-12"
        >
          {megaMenuItems.map((menu, mIdx) => {
            const isMenuActive =
              (menu.key === 'about' && currentView === 'about') ||
              (menu.key === 'education' && currentView === 'catalog');

            return (
              <div key={mIdx} className="relative group py-6 cursor-pointer">
                <button
                  onClick={() => {
                    if (menu.key === 'about') onOpenAboutTab('greetings');
                    else onViewChange('catalog');
                  }}
                  className={`text-base lg:text-lg font-black tracking-tight transition-colors flex items-center gap-1 ${
                    isMenuActive
                      ? 'text-emerald-400 border-b-2 border-dashed border-rose-500 pb-0.5'
                      : 'text-white hover:text-emerald-300'
                  }`}
                >
                  <span>{menu.title}</span>
                </button>
              </div>
            );
          })}
        </nav>

        {/* Right Top Utility Buttons */}
        <div className="hidden md:flex items-center gap-4 shrink-0">
          
          {/* Admin Panel Shortcut */}
          <button
            onClick={() => onViewChange('admin')}
            className="px-3.5 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500 text-emerald-300 hover:text-white border border-emerald-500/40 text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
            title="관리자 센터로 이동"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>관리자 센터</span>
          </button>

          {/* Language Selector Pill (KOR | ▼) */}
          <div className="relative">
            <button
              onClick={() => setLang(lang === 'KOR' ? 'ENG' : 'KOR')}
              className="px-4 py-1.5 bg-emerald-950 border border-emerald-500/40 text-white text-xs font-black rounded-full flex items-center gap-2 cursor-pointer shadow-md hover:bg-emerald-900 transition-colors"
            >
              <span>{lang}</span>
              <span className="text-emerald-500">|</span>
              <ChevronDown className="w-3.5 h-3.5 text-white" />
            </button>
          </div>

          {/* # LOGIN / JOIN US Button */}
          <button
            onClick={() => onOpenAuth('login')}
            className="group flex flex-col items-center justify-center text-xs font-black text-white hover:text-emerald-300 transition-colors cursor-pointer border-l border-emerald-900/80 pl-4"
          >
            <div className="flex items-center gap-1 text-sm font-black">
              <span className="text-xl font-mono text-emerald-400 group-hover:text-emerald-300">#</span>
              <span>LOGIN</span>
            </div>
            <span className="text-[10px] text-emerald-300/80 font-bold tracking-widest -mt-1 group-hover:text-white">
              JOIN US
            </span>
          </button>

        </div>

        {/* Mobile Hamburger Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-emerald-300 hover:text-white rounded-xl"
        >
          {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>

      </div>

      {/* DESKTOP HOVER MEGA-MENU DROPDOWN BACKDROP */}
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`absolute left-0 right-0 top-full bg-[#0e1c16]/98 backdrop-blur-xl border-b border-emerald-500/30 shadow-2xl z-40 overflow-hidden transition-all duration-300 ease-out origin-top ${
          megaMenuOpen
            ? 'max-h-[380px] opacity-100 translate-y-0 pointer-events-auto'
            : 'max-h-0 opacity-0 -translate-y-2 pointer-events-none'
        }`}
      >
        <div className="max-w-7xl mx-auto px-8 lg:px-12 py-8 grid grid-cols-5 gap-8">
          {megaMenuItems.map((col, cIdx) => (
            <div key={cIdx} className="space-y-3">
              <h4 className="text-sm font-black text-emerald-300 border-b border-emerald-900/60 pb-2 flex items-center justify-between">
                <span>{col.title}</span>
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm font-extrabold text-gray-200">
                {col.subLinks.map((sub, sIdx) => (
                  <li key={sIdx}>
                    <button
                      onClick={() => handleSubLinkClick(sub)}
                      className="hover:text-emerald-300 text-gray-300 hover:translate-x-1.5 transition-all duration-200 cursor-pointer block text-left w-full py-1"
                    >
                      {sub.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a1410] border-b border-emerald-900/80 p-6 space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between pb-4 border-b border-emerald-900/60">
            <button
              onClick={() => {
                onViewChange('admin');
                setMobileMenuOpen(false);
              }}
              className="px-4 py-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-black rounded-xl"
            >
              🛡️ 관리자 센터
            </button>
            <button
              onClick={() => {
                onOpenAuth('login');
                setMobileMenuOpen(false);
              }}
              className="px-4 py-2 bg-emerald-500 text-white text-xs font-black rounded-xl"
            >
              # LOGIN / JOIN US
            </button>
          </div>

          <div className="space-y-6">
            {megaMenuItems.map((col, cIdx) => (
              <div key={cIdx} className="space-y-2">
                <h4 className="text-sm font-black text-emerald-400 border-b border-emerald-900/60 pb-1">
                  {col.title}
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs font-bold text-gray-300 pt-1">
                  {col.subLinks.map((sub, sIdx) => (
                    <button
                      key={sIdx}
                      onClick={() => handleSubLinkClick(sub)}
                      className="text-left py-1 hover:text-emerald-300"
                    >
                      • {sub.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </header>
  );
}
