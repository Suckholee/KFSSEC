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
    <header className="relative bg-[#0a1410] border-b border-emerald-950/80 z-50 transition-all font-sans text-white shadow-md">
      
      {/* Full Width Top Header Bar */}
      <div className="w-full px-6 sm:px-10 lg:px-14 h-20 sm:h-24 flex items-center justify-between gap-6">
        
        {/* Official Logo (Far Left) */}
        <div
          onClick={() => onTabChange && onTabChange('home')}
          className="flex items-center gap-3 cursor-pointer group shrink-0"
          title="한국외식창업교육원 홈으로 이동"
        >
          <img
            src="/images/logo.png"
            alt="사단법인 한국외식창업교육원"
            className="h-10 sm:h-12 w-auto object-contain group-hover:scale-105 transition-transform"
          />
        </div>

        {/* Centered Desktop Main Navigation Bar */}
        <nav className="hidden md:flex flex-1 items-center justify-center gap-8 lg:gap-14">
          {mainMenuItems.map((menu) => {
            const isMenuActive = activeTab === menu.key;

            return (
              <div key={menu.key} className="relative group py-6 cursor-pointer">
                <button
                  onClick={() => {
                    if (onTabChange) {
                      onTabChange(menu.key, menu.defaultSubTab);
                    }
                  }}
                  className={`text-base lg:text-lg font-black tracking-tight transition-all flex items-center gap-1 cursor-pointer whitespace-nowrap ${
                    isMenuActive
                      ? 'text-emerald-400 border-b-2 border-dashed border-rose-500 pb-0.5 scale-105'
                      : 'text-white hover:text-emerald-300'
                  }`}
                >
                  <span>{menu.title}</span>
                </button>
              </div>
            );
          })}
        </nav>

        {/* Right Top Utility Buttons (KOR Selector & User Auth) */}
        <div className="hidden md:flex items-center gap-5 shrink-0">
          
          {/* Language Selector Pill */}
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

          {/* USER AUTH / LOGIN STATUS BUTTON */}
          {currentUser ? (
            <div className="flex items-center gap-3 border-l border-emerald-900/80 pl-5">
              <div className="flex items-center gap-2">
                <div className="bg-emerald-600 p-1.5 rounded-full text-black">
                  <User className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="text-xs font-black text-white">
                  {currentUser.name || '수강생 회원'}님
                </span>
              </div>
              <button
                onClick={onLogout}
                className="px-3 py-1.5 bg-rose-950/80 hover:bg-rose-900 text-rose-300 text-xs font-black rounded-xl border border-rose-800 transition-colors cursor-pointer flex items-center gap-1"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>로그아웃</span>
              </button>
            </div>
          ) : (
            <button
              onClick={() => onOpenAuth && onOpenAuth('login')}
              className="group flex flex-col items-center justify-center text-xs font-black text-white hover:text-emerald-300 transition-colors cursor-pointer border-l border-emerald-900/80 pl-5"
            >
              <div className="flex items-center gap-1 text-sm font-black">
                <span className="text-xl font-mono text-emerald-400 group-hover:text-emerald-300">#</span>
                <span>LOGIN</span>
              </div>
              <span className="text-[10px] text-emerald-300/80 font-bold tracking-widest -mt-1 group-hover:text-white">
                JOIN US
              </span>
            </button>
          )}

        </div>

        {/* Mobile Hamburger Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-emerald-300 hover:text-white rounded-xl"
        >
          {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>

      </div>

      {/* MOBILE MENU DROPDOWN */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#08120d] border-b border-emerald-900/80 p-6 space-y-6 animate-fadeIn">
          <div className="flex items-center justify-end pb-4 border-b border-emerald-900/60">
            {currentUser ? (
              <div className="flex items-center gap-3">
                <span className="text-xs font-black text-white">{currentUser.name}님</span>
                <button
                  onClick={() => {
                    onLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="px-3 py-1.5 bg-rose-950 text-rose-300 text-xs font-black rounded-xl"
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
                className="px-4 py-2 bg-emerald-500 text-white text-xs font-black rounded-xl"
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
                className={`w-full text-left py-2 text-base font-black border-b border-emerald-900/40 ${
                  activeTab === menu.key ? 'text-emerald-400 font-black' : 'text-white hover:text-emerald-300'
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
