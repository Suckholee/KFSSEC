import React, { useState } from 'react';
import { ChevronDown, User, LogIn, Globe, Search, Menu, X, BookOpen, Layers, LogOut, ShieldCheck } from 'lucide-react';

export default function Header({
  activeTab = 'home',
  subTab = null,
  onTabChange,
  onOpenAuth,
  currentUser,
  onLogout,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lang, setLang] = useState('KOR');

  const mainMenuItems = [
    { title: '교육원 소개', key: 'about', defaultSubTab: 'greetings' },
    { title: '명인사업단', key: 'master', defaultSubTab: 'intro' },
    { title: '교육·자격증', key: 'catalog', defaultSubTab: 'courses' },
    { title: '창업컨설팅', key: 'consulting', defaultSubTab: 'apply' },
    { title: '커뮤니티', key: 'community', defaultSubTab: 'all' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#FDFBF7]/95 backdrop-blur-md border-b-2 border-[#E7E2D8] transition-all font-sans text-gray-900 shadow-sm">
      
      {/* Full Width Top Header Bar */}
      <div className="w-full px-4 sm:px-8 lg:px-10 h-20 sm:h-22 flex items-center justify-between gap-4 sm:gap-6 max-w-7xl mx-auto">
        
        {/* Official Logo (Far Left) */}
        <button
          onClick={() => onTabChange && onTabChange('home')}
          className="flex items-center gap-3 cursor-pointer group shrink-0 focus-visible:ring-2 focus-visible:ring-[#0B3C26] focus-visible:outline-none rounded-xl p-1"
          title="사단법인 한국외식창업교육원 메인 홈으로 이동"
          aria-label="한국외식창업교육원 메인 홈으로 이동"
        >
          <img
            src="/images/logo.png"
            alt="사단법인 한국외식창업교육원"
            className="h-10 sm:h-12 w-auto object-contain group-hover:scale-105 transition-transform"
          />
        </button>

        {/* Centered Desktop Main Navigation Bar */}
        <nav className="hidden md:flex flex-1 items-center justify-center gap-6 lg:gap-10">
          {mainMenuItems.map((menu) => {
            const isMenuActive = activeTab === menu.key;

            return (
              <div key={menu.key} className="relative group py-4 cursor-pointer">
                <button
                  onClick={() => {
                    if (onTabChange) {
                      onTabChange(menu.key, menu.defaultSubTab);
                    }
                  }}
                  className={`text-base lg:text-lg font-bold tracking-tight transition-all flex items-center gap-1 cursor-pointer whitespace-nowrap min-h-[44px] px-2 rounded-lg focus-visible:ring-2 focus-visible:ring-[#0B3C26] focus-visible:outline-none ${
                    isMenuActive
                      ? 'text-[#0B3C26] font-black border-b-2 border-[#C5A059] pb-0.5 scale-105'
                      : 'text-[#2A3B32] hover:text-[#C5A059]'
                  }`}
                >
                  <span>{menu.title}</span>
                </button>
              </div>
            );
          })}
        </nav>

        {/* Right Top Utility Buttons (KOR Selector & User Auth) */}
        <div className="hidden md:flex items-center gap-3 lg:gap-4 shrink-0">
          
          {/* Language Selector Pill */}
          <div className="relative">
            <button
              onClick={() => setLang(lang === 'KOR' ? 'ENG' : 'KOR')}
              aria-label="언어 변경 (Current: KOR)"
              className="px-3.5 py-2 bg-[#F2ECE0] border border-[#D4C5B0] text-[#0B3C26] text-xs font-bold rounded-full flex items-center gap-1.5 cursor-pointer shadow-xs hover:bg-[#EBE2D4] transition-colors focus-visible:ring-2 focus-visible:ring-[#0B3C26] focus-visible:outline-none min-h-[44px]"
            >
              <span>{lang}</span>
              <span className="text-[#C5A059]">|</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#0B3C26]" />
            </button>
          </div>

          {/* USER AUTH / LOGIN STATUS BUTTON */}
          {currentUser ? (
            <div className="flex items-center gap-2.5 border-l border-[#E5E0D8] pl-3.5">
              <div className="flex items-center gap-2">
                <div className="bg-[#0B3C26] p-1.5 rounded-full text-white">
                  <User className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-bold text-[#0B3C26]">
                  {currentUser.name || '수강생 회원'}님
                </span>
              </div>
              <button
                onClick={onLogout}
                className="px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-800 text-xs font-bold rounded-xl border border-rose-300 transition-colors cursor-pointer flex items-center gap-1 min-h-[44px] focus-visible:ring-2 focus-visible:ring-rose-600 focus-visible:outline-none"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>로그아웃</span>
              </button>
            </div>
          ) : (
            <button
              onClick={() => onOpenAuth && onOpenAuth('login')}
              aria-label="로그인 및 수강 회원가입"
              className="group px-4 lg:px-5 py-2 bg-[#0B3C26] hover:bg-[#072819] text-white rounded-2xl shadow-md transition-all cursor-pointer border border-[#0B3C26] flex items-center gap-2 min-h-[44px] focus-visible:ring-2 focus-visible:ring-[#0B3C26] focus-visible:outline-none"
            >
              <div className="flex items-center gap-1 text-sm font-black">
                <span className="text-base font-mono text-[#D4AF37]">#</span>
                <span>LOGIN</span>
              </div>
              <span className="text-[10px] text-[#D4AF37] font-bold tracking-widest border-l border-emerald-800 pl-2">
                JOIN US
              </span>
            </button>
          )}

        </div>

        {/* Mobile Hamburger Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? '메인 메뉴 닫기' : '메인 메뉴 열기'}
          className="md:hidden p-2 text-[#0B3C26] hover:text-black rounded-xl focus-visible:ring-2 focus-visible:ring-[#0B3C26] focus-visible:outline-none min-h-[44px] min-w-[44px] flex items-center justify-center"
        >
          {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>

      </div>

      {/* MOBILE MENU DROPDOWN */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#F8F6F0] border-b border-[#E7E2D8] p-6 space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between pb-4 border-b border-[#E7E2D8]">
            <span className="text-xs font-bold text-gray-600">사단법인 한국외식창업교육원</span>
            {currentUser ? (
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-[#0B3C26]">{currentUser.name}님</span>
                <button
                  onClick={() => {
                    onLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="px-3.5 py-2 bg-rose-600 text-white text-xs font-bold rounded-xl min-h-[44px]"
                >
                  로그아웃
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  onOpenAuth('login');
                  setMobileMenuOpen(false);
                }}
                className="px-4 py-2.5 bg-[#0B3C26] text-white text-xs font-bold rounded-xl min-h-[44px]"
              >
                # LOGIN / JOIN US
              </button>
            )}
          </div>

          <div className="space-y-4">
            {mainMenuItems.map((menu) => (
              <button
                key={menu.key}
                onClick={() => {
                  if (onTabChange) {
                    onTabChange(menu.key, menu.defaultSubTab);
                  }
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left py-3 text-base border-b border-[#E7E2D8] min-h-[44px] ${
                  activeTab === menu.key ? 'text-[#0B3C26] font-black' : 'text-gray-800 font-bold hover:text-[#C5A059]'
                }`}
              >
                {menu.title}
              </button>
            ))}
          </div>
        </div>
      )}

    </header>
  );
}
