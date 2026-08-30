import React, { useState } from 'react';
import { ShieldCheck, ChevronDown, User, LogIn, Globe, Search, Menu, X, BookOpen, Layers } from 'lucide-react';

export default function Header({ currentView, onViewChange, onOpenAuth, onOpenAboutTab }) {
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lang, setLang] = useState('KOR');

  const megaMenuItems = [
    {
      title: '교육원 소개',
      key: 'about',
      subLinks: [
        { label: '교육원 소개', tab: 'greetings' },
        { label: '원장 인사말', tab: 'greetings' },
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
      hasAccent: true,
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

  const handleSubLinkClick = (item) => {
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
      const el = document.getElementById('notice-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      onViewChange('catalog');
    }
  };

  return (
    <header className="relative bg-white border-b-4 border-black z-50 transition-all font-sans text-gray-900">
      
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
            className="h-11 sm:h-14 w-auto object-contain group-hover:scale-103 transition-transform"
          />
        </div>

        {/* Desktop Main Navigation Bar */}
        <nav
          onMouseEnter={() => setMegaMenuOpen(true)}
          className="hidden md:flex items-center gap-8 lg:gap-12"
        >
          {megaMenuItems.map((menu, mIdx) => (
            <div key={mIdx} className="relative group py-6 cursor-pointer">
              <button
                onClick={() => {
                  if (menu.key === 'about') onOpenAboutTab('greetings');
                  else onViewChange('catalog');
                }}
                className={`text-base lg:text-lg font-black tracking-tight transition-colors flex items-center gap-1 ${
                  menu.hasAccent
                    ? 'text-black border-b-2 border-dashed border-rose-500 pb-0.5'
                    : 'text-gray-900 hover:text-emerald-700'
                }`}
              >
                <span>{menu.title}</span>
              </button>
            </div>
          ))}
        </nav>

        {/* Right Top Utility Buttons (KOR Selector & LOGIN/JOIN US & Admin Panel Shortcut) */}
        <div className="hidden md:flex items-center gap-4 shrink-0">
          
          {/* Admin Panel Shortcut */}
          <button
            onClick={() => onViewChange('admin')}
            className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-500/40 text-emerald-800 text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
            title="관리자 센터로 이동"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>관리자 센터</span>
          </button>

          {/* Language Selector Pill (KOR | ▼) */}
          <div className="relative">
            <button
              onClick={() => setLang(lang === 'KOR' ? 'ENG' : 'KOR')}
              className="px-4 py-1.5 bg-black text-white text-xs font-black rounded-full flex items-center gap-2 cursor-pointer shadow-md hover:bg-gray-800 transition-colors"
            >
              <span>{lang}</span>
              <span className="text-gray-400">|</span>
              <ChevronDown className="w-3.5 h-3.5 text-white" />
            </button>
          </div>

          {/* # LOGIN / JOIN US Button */}
          <button
            onClick={() => onOpenAuth('login')}
            className="group flex flex-col items-center justify-center text-xs font-black text-black hover:text-emerald-700 transition-colors cursor-pointer border-l-2 border-black pl-4"
          >
            <div className="flex items-center gap-1 text-sm font-black">
              <span className="text-xl font-mono text-black group-hover:text-emerald-600">#</span>
              <span>LOGIN</span>
            </div>
            <span className="text-[10px] text-gray-600 font-bold tracking-widest -mt-1 group-hover:text-emerald-600">
              JOIN US
            </span>
          </button>

        </div>

        {/* Mobile Hamburger Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-black hover:text-emerald-700 rounded-xl"
        >
          {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>

      </div>

      {/* DESKTOP HOVER MEGA-MENU DROPDOWN BACKDROP (Matching Screenshot 2) */}
      {megaMenuOpen && (
        <div
          onMouseEnter={() => setMegaMenuOpen(true)}
          onMouseLeave={() => setMegaMenuOpen(false)}
          className="absolute left-0 right-0 top-full bg-[#e8e8e8] border-b-2 border-gray-400 shadow-2xl z-40 transition-all duration-300 animate-fadeIn"
        >
          <div className="max-w-7xl mx-auto px-8 lg:px-12 py-8 grid grid-cols-5 gap-8">
            {megaMenuItems.map((col, cIdx) => (
              <div key={cIdx} className="space-y-3">
                <h4 className="text-sm font-black text-gray-900 border-b border-gray-400 pb-2 flex items-center justify-between">
                  <span>{col.title}</span>
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm font-extrabold text-gray-800">
                  {col.subLinks.map((sub, sIdx) => (
                    <li key={sIdx}>
                      <button
                        onClick={() => handleSubLinkClick(sub)}
                        className="hover:text-rose-600 transition-colors cursor-pointer block text-left w-full py-1 hover:translate-x-1 duration-200"
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
      )}

      {/* MOBILE MENU DROPDOWN */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b-4 border-black p-6 space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between pb-4 border-b border-gray-200">
            <button
              onClick={() => {
                onViewChange('admin');
                setMobileMenuOpen(false);
              }}
              className="px-4 py-2 bg-emerald-700 text-white text-xs font-black rounded-xl"
            >
              🛡️ 관리자 센터
            </button>
            <button
              onClick={() => {
                onOpenAuth('login');
                setMobileMenuOpen(false);
              }}
              className="px-4 py-2 bg-black text-white text-xs font-black rounded-xl"
            >
              # LOGIN / JOIN US
            </button>
          </div>

          <div className="space-y-6">
            {megaMenuItems.map((col, cIdx) => (
              <div key={cIdx} className="space-y-2">
                <h4 className="text-sm font-black text-black border-b border-gray-300 pb-1">
                  {col.title}
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs font-bold text-gray-700 pt-1">
                  {col.subLinks.map((sub, sIdx) => (
                    <button
                      key={sIdx}
                      onClick={() => handleSubLinkClick(sub)}
                      className="text-left py-1 hover:text-rose-600"
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
