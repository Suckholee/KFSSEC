import { useLanguage } from '../i18n/LanguageContext';
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
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const mainMenuItems = [
    { id: 'about', title: t('교육원 소개', 'About Us'), key: 'about', defaultSubTab: 'greetings' },
    { id: 'master_chef', title: t('명장', 'Master Chefs'), key: 'master', defaultSubTab: 'profiles' },
    { id: 'artisan', title: t('명인', 'Culinary Artisans'), key: 'master', defaultSubTab: 'directory' },
    { id: 'catalog', title: t('교육·자격증', 'Courses & Certificates'), key: 'catalog', defaultSubTab: 'courses' },
    { id: 'consulting', title: t('창업컨설팅', 'Startup Consulting'), key: 'consulting', defaultSubTab: 'consulting' },
    { id: 'gallery', title: t('갤러리', 'Gallery'), key: 'gallery', defaultSubTab: 'all' },
    { id: 'partners', title: t('파트너사', 'Partners'), key: 'partners', defaultSubTab: 'all' },
    { id: 'community', title: t('게시판', 'Board'), key: 'community', defaultSubTab: 'all' },
  ];

  const languages = [
    { code: 'ko', label: '한국어 (KOR)', flag: '🇰🇷' },
    { code: 'en', label: 'English (ENG)', flag: '🇺🇸' },
    { code: 'ja', label: '日本語 (JPN)', flag: '🇯🇵' },
    { code: 'zh', label: '中文 (CHN)', flag: '🇨🇳' },
    { code: 'vi', label: 'Tiếng Việt (VIE)', flag: '🇻🇳' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#FDFBF7]/95 backdrop-blur-md border-b-2 border-[#E7E2D8] transition-all font-sans text-gray-900 shadow-sm">
      
      {/* Full Width Top Header Bar */}
      <div className="w-full px-4 sm:px-6 lg:px-8 h-20 sm:h-22 flex items-center justify-between gap-3 sm:gap-4 max-w-[1600px] mx-auto">
        
        {/* Official Logo (Far Left) */}
        <button
          onClick={() => onTabChange && onTabChange('home')}
          className="flex items-center gap-3 cursor-pointer group shrink-0 focus-visible:ring-2 focus-visible:ring-[#0B3C26] focus-visible:outline-none rounded-xl p-1"
          title={t('한국외식창업교육원 메인 홈으로 이동', 'KFSSEC home')}
          aria-label={t('한국외식창업교육원 메인 홈으로 이동', 'KFSSEC home')}
        >
          <img
            src="/images/logo-transparent.svg"
            alt={t('사단법인 한국외식창업교육원')}
            className="h-12 sm:h-15 w-auto object-contain"
          />
        </button>

        {/* Centered Desktop Main Navigation Bar */}
        <nav className="hidden xl:flex flex-1 items-center justify-center gap-2 2xl:gap-3">
          {mainMenuItems.map((menu) => {
            const isMenuActive =
              menu.key === 'master'
                ? activeTab === 'master' && (menu.id === 'master_chef' ? (subTab === 'profiles' || subTab === 'masters') : (subTab === 'directory' || subTab === 'dishes'))
                : activeTab === menu.key;

            return (
              <div key={menu.id} className="relative group py-4 cursor-pointer">
                <button
                  onClick={() => {
                    if (onTabChange) {
                      onTabChange(menu.key, menu.defaultSubTab);
                    }
                  }}
                  className={`text-[13px] 2xl:text-sm font-bold tracking-tight transition-all flex items-center gap-1 cursor-pointer whitespace-nowrap min-h-[44px] px-2 rounded-lg focus-visible:ring-2 focus-visible:ring-[#0B3C26] focus-visible:outline-none ${
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
        <div className="hidden xl:flex items-center gap-2.5 shrink-0">
          
          {/* 1:1 AI Consultation & Chatbot Trigger */}
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('kfssec_open_chatbot'))}
            className="px-3 py-2 bg-gradient-to-r from-[#0B3C26] to-[#164e34] hover:from-[#072819] hover:to-[#0f3a27] text-white text-xs font-black rounded-full flex items-center gap-1.5 cursor-pointer shadow-sm border border-[#C5A059] transition-all hover:scale-105 min-h-[44px]"
            title={t('24시 실시간 1:1 AI 상담 & 챗봇 열기', 'Open 24/7 AI Guide')}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[#D4AF37]">💬</span>
            <span>{t('1:1 AI 상담', '1:1 AI Guide')}</span>
          </button>

          {/* Multi-Language Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              aria-label="언어 선택 (Language)"
              className="px-3 py-2 bg-[#F2ECE0] border border-[#D4C5B0] text-[#0B3C26] text-xs font-bold rounded-full flex items-center gap-1.5 cursor-pointer shadow-xs hover:bg-[#EBE2D4] transition-colors focus-visible:ring-2 focus-visible:ring-[#0B3C26] focus-visible:outline-none min-h-[44px]"
            >
              <span>{language === 'ko' ? '🇰🇷 KOR' : '🇺🇸 ENG'}</span>
              <span className="text-[#C5A059]">|</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#0B3C26]" />
            </button>

            {langDropdownOpen && (
              <div
                className="absolute right-0 top-full mt-2 w-44 bg-white rounded-2xl shadow-xl border border-stone-200 py-2 z-50 animate-fadeIn"
                onMouseLeave={() => setLangDropdownOpen(false)}
              >
                <div className="px-3 py-1.5 text-[10px] font-black text-stone-400 border-b border-stone-100 uppercase tracking-wider">
                  다국어 번역 선택
                </div>
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setLanguage(l.code === 'ko' ? 'ko' : 'en');
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full px-3 py-2 text-left text-xs font-bold flex items-center justify-between hover:bg-emerald-50 transition-colors ${
                      language === l.code ? 'text-[#0B3C26] font-black bg-emerald-50/60' : 'text-stone-700'
                    }`}
                  >
                    <span>{l.flag} {l.label}</span>
                    {language === l.code && <span className="text-[#0B3C26]">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* USER AUTH / LOGIN STATUS BUTTON */}
          {currentUser ? (
            <div className="flex items-center gap-2.5 border-l border-[#E5E0D8] pl-3.5">
              <div className="flex items-center gap-2">
                <div className="bg-[#0B3C26] p-1.5 rounded-full text-white">
                  <User className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-bold text-[#0B3C26]">
                  {currentUser.name || t('수강생 회원', 'Member')}{language === 'ko' ? '님' : ''}
                </span>
              </div>
              <button
                onClick={onLogout}
                className="px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-800 text-xs font-bold rounded-xl border border-rose-300 transition-colors cursor-pointer flex items-center gap-1 min-h-[44px] focus-visible:ring-2 focus-visible:ring-rose-600 focus-visible:outline-none"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>{t('로그아웃', 'Log out')}</span>
              </button>
            </div>
          ) : (
            <button
              onClick={() => onOpenAuth && onOpenAuth('login')}
              aria-label={t('로그인 및 수강 회원가입', 'Log in or sign up')}
              className="group px-4 lg:px-5 py-2 bg-[#0B3C26] hover:bg-[#072819] text-white rounded-2xl shadow-md transition-all cursor-pointer border border-[#0B3C26] flex items-center gap-2 min-h-[44px] focus-visible:ring-2 focus-visible:ring-[#0B3C26] focus-visible:outline-none"
            >
              <div className="flex items-center gap-1 text-sm font-black">
                <span className="text-base font-mono text-[#D4AF37]">#</span>
                <span>{t('로그인', 'LOGIN')}</span>
              </div>
              <span className="text-[10px] text-[#D4AF37] font-bold tracking-widest border-l border-emerald-800 pl-2">
                {t('회원가입', 'JOIN US')}
              </span>
            </button>
          )}

        </div>

        {/* Mobile Hamburger Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? t('메인 메뉴 닫기', 'Close menu') : t('메인 메뉴 열기', 'Open menu')}
          className="xl:hidden p-2 text-[#0B3C26] hover:text-black rounded-xl focus-visible:ring-2 focus-visible:ring-[#0B3C26] focus-visible:outline-none min-h-[44px] min-w-[44px] flex items-center justify-center"
        >
          {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>

      </div>

      {/* MOBILE MENU DROPDOWN */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#F8F6F0] border-b border-[#E7E2D8] p-6 space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between pb-4 border-b border-[#E7E2D8]">
            <span className="text-xs font-bold text-gray-600">{t('사단법인 한국외식창업교육원')}</span>
            {currentUser ? (
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-[#0B3C26]">{currentUser.name}{language === 'ko' ? '님' : ''}</span>
                <button
                  onClick={() => {
                    onLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="px-3.5 py-2 bg-rose-600 text-white text-xs font-bold rounded-xl min-h-[44px]"
                >
                  {t('로그아웃', 'Log out')}
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
                {t('로그인 / 회원가입', 'LOGIN / JOIN US')}
              </button>
            )}
          </div>

          <button
            onClick={() => setLanguage(language === 'ko' ? 'en' : 'ko')}
            aria-label={language === 'ko' ? 'Switch to English' : '한국어로 변경'}
            className="min-h-[44px] px-4 py-2 border border-[#C5A059] rounded-full font-bold text-[#0B3C26]"
          >
            {language === 'ko' ? 'KOR · English' : 'ENG · 한국어'}
          </button>
          <div className="space-y-4">
            {mainMenuItems.map((menu) => {
              const isMenuActive =
                menu.key === 'master'
                  ? activeTab === 'master' && (menu.id === 'master_chef' ? (subTab === 'profiles' || subTab === 'masters') : (subTab === 'directory' || subTab === 'dishes'))
                  : activeTab === menu.key;

              return (
                <button
                  key={menu.id}
                  onClick={() => {
                    if (onTabChange) {
                      onTabChange(menu.key, menu.defaultSubTab);
                    }
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left py-3 text-base border-b border-[#E7E2D8] min-h-[44px] flex items-center justify-between ${
                    isMenuActive ? 'text-[#0B3C26] font-black pl-2 border-l-4 border-l-[#C5A059]' : 'text-gray-800 font-bold hover:text-[#C5A059]'
                  }`}
                >
                  <span>{menu.title}</span>
                  {isMenuActive && <span className="text-[#C5A059]">●</span>}
                </button>
              );
            })}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                window.dispatchEvent(new CustomEvent('kfssec_open_chatbot'));
              }}
              className="w-full py-3 bg-[#0B3C26] text-white font-black text-sm rounded-2xl flex items-center justify-center gap-2 shadow-md border-2 border-[#C5A059] cursor-pointer mt-2"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>💬 {t('24시 실시간 1:1 AI 상담 챗봇 열기', 'Open 24/7 AI Chatbot')}</span>
            </button>
          </div>
        </div>
      )}

    </header>
  );
}
