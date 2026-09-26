import { useLanguage } from '../i18n/LanguageContext';
import React, { useState } from 'react';
import { ChevronDown, User, LogIn, Globe, Search, Menu, X, BookOpen, Layers, LogOut, ShieldCheck, ExternalLink } from 'lucide-react';

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
    {
      id: 'about',
      title: t('교육원 소개', 'About Us'),
      key: 'about',
      defaultSubTab: 'greetings',
      subItems: [
        { id: 'greetings', title: t('교육원 소개 & 방향', 'About KFSSEC'), subTab: 'greetings' },
        { id: 'history', title: t('주요 연혁', 'History'), subTab: 'history' },
        { id: 'speech', title: t('이사장 인사말', "Chairman's Greeting"), subTab: 'speech' },
        { id: 'profile', title: t('이사장 프로필 & MOU', 'Chairman Profile & MOU'), subTab: 'profile' },
        { id: 'faculty', title: t('교수진 소개', 'Faculty'), subTab: 'faculty' },
        { id: 'organization', title: t('조직도', 'Organization'), subTab: 'organization' },
      ],
    },
    {
      id: 'master',
      title: t('명장·명인', 'Masters & Artisans'),
      key: 'master',
      defaultSubTab: 'all',
      subItems: [
        { id: 'all', title: t('명장·명인 전체', 'All Masters & Artisans'), subTab: 'all' },
        { id: 'profiles', title: t('대한민국 명장', 'Master Chefs'), subTab: 'profiles' },
        { id: 'directory', title: t('조리 명인', 'Culinary Artisans'), subTab: 'directory' },
      ],
    },
    {
      id: 'catalog',
      title: t('교육·자격증', 'Courses & Certificates'),
      key: 'catalog',
      defaultSubTab: 'courses',
      subItems: [
        { id: 'courses', title: t('교육 과정', 'Courses'), subTab: 'courses' },
        { id: 'guide', title: t('자격과정 안내', 'Certification Guide'), subTab: 'guide' },
        { id: 'schedule', title: t('교육 일정', 'Course Schedule'), subTab: 'schedule' },
        { id: 'cert_exam', title: t('자격 시험', 'Qualification Exam'), subTab: 'cert_exam' },
      ],
    },
    {
      id: 'consulting',
      title: t('창업컨설팅', 'Startup Consulting'),
      key: 'consulting',
      defaultSubTab: 'education',
      subItems: [
        { id: 'education', title: t('창업 교육', 'Startup Education'), subTab: 'education' },
        { id: 'consulting', title: t('창업 컨설팅', 'Startup Consulting'), subTab: 'consulting' },
        { id: 'professor', title: t('교수 프로필', 'Professor Profile'), subTab: 'professor' },
        { id: 'youth', title: t('청년 창업 상담', 'Youth Startup Inquiry'), subTab: 'youth' },
        { id: 'readiness', title: t('창업 준비', 'Startup Preparation'), subTab: 'readiness' },
      ],
    },
    {
      id: 'gallery',
      title: t('갤러리', 'Gallery'),
      key: 'gallery',
      defaultSubTab: 'all',
      subItems: [
        { id: 'all', title: t('전체 갤러리', 'All Photos'), subTab: 'all' },
        { id: 'ceremony', title: t('시상식 & 인증패', 'Awards & Ceremonies'), subTab: 'ceremony' },
        { id: 'competition', title: t('요리대회', 'Cooking Contests'), subTab: 'competition' },
        { id: 'consulting', title: t('지자체 컨설팅', 'Municipality Consulting'), subTab: 'consulting' },
        { id: 'training', title: t('조리 실습 현장', 'Culinary Training'), subTab: 'training' },
      ],
    },
    {
      id: 'partners',
      title: t('파트너사', 'Partners'),
      key: 'partners',
      defaultSubTab: 'all',
      subItems: [
        { id: 'all', title: t('협력기업 네트워크', 'Partner Network'), subTab: 'all' },
        { id: 'mou', title: t('MOU 체결 현장', 'MOU Archives'), subTab: 'mou' },
        { id: 'inquiry', title: t('제휴·협력 문의', 'Partnership Inquiry'), subTab: 'inquiry' },
      ],
    },
    {
      id: 'community',
      title: t('게시판', 'Board'),
      key: 'community',
      defaultSubTab: 'all',
      subItems: [
        { id: 'all', title: t('전체 게시판', 'All Board'), subTab: 'all' },
        { id: 'notice', title: t('공지사항', 'Announcements'), subTab: 'notice' },
        { id: 'faq', title: t('자주 묻는 질문 (FAQ)', 'FAQ'), subTab: 'faq' },
        { id: 'inquiry', title: t('1:1 온라인 문의', '1:1 Inquiry'), subTab: 'inquiry' },
      ],
    },
  ];


  const languages = [
    { code: 'ko', label: '한국어 (KOR)', flag: '🇰🇷' },
    { code: 'en', label: 'English (ENG)', flag: '🇺🇸' },
    { code: 'ja', label: '日本語 (JPN)', flag: '🇯🇵' },
    { code: 'zh', label: '中文 (CHN)', flag: '🇨🇳' },
  ];

  const getLangBadge = (code) => {
    switch (code) {
      case 'en': return '🇺🇸 ENG';
      case 'ja': return '🇯🇵 JPN';
      case 'zh': return '🇨🇳 CHN';
      default: return '🇰🇷 KOR';
    }
  };

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
        <nav className="hidden xl:flex flex-1 items-center justify-center gap-1.5 2xl:gap-3">
          {mainMenuItems.map((menu) => {
            const isMenuActive = activeTab === menu.key;
            const hasSub = Boolean(menu.subItems);

            return (
              <div key={menu.id} className="relative group py-4">
                <button
                  onClick={() => {
                    if (onTabChange) {
                      onTabChange(menu.key, menu.defaultSubTab);
                    }
                  }}
                  className={`text-[13px] 2xl:text-sm font-bold tracking-tight transition-all flex items-center gap-1 cursor-pointer whitespace-nowrap min-h-[44px] px-2.5 rounded-lg focus-visible:ring-2 focus-visible:ring-[#0B3C26] focus-visible:outline-none ${
                    isMenuActive
                      ? 'text-[#0B3C26] font-black border-b-2 border-[#C5A059] pb-0.5 scale-105'
                      : 'text-[#2A3B32] hover:text-[#C5A059]'
                  }`}
                >
                  <span>{menu.title}</span>
                  {hasSub && (
                    <ChevronDown className="w-3.5 h-3.5 text-stone-400 group-hover:text-[#0B3C26] group-hover:rotate-180 transition-transform duration-200" />
                  )}
                </button>

                {/* Submenu Dropdown if present */}
                {hasSub && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-full pt-1 hidden group-hover:block group-focus-within:block z-50">
                    <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-[#C5A059]/30 py-1.5 min-w-[170px] whitespace-nowrap animate-fadeIn">

                      {menu.subItems.map((sub) => {
                        const isSubActive =
                          isMenuActive &&
                          (subTab === sub.subTab || (!subTab && sub.subTab === menu.defaultSubTab));
                        return (
                          <button
                            key={sub.id}
                            onClick={(e) => {
                              e.stopPropagation();
                              if (onTabChange) {
                                onTabChange(menu.key, sub.subTab);
                              }
                            }}
                            className={`w-full px-4 py-2.5 text-left text-xs font-bold transition-all flex items-center justify-between gap-3 ${
                              isSubActive
                                ? 'bg-[#0B3C26] text-[#D4AF37] font-black'
                                : 'text-stone-800 hover:bg-emerald-50 hover:text-[#0B3C26]'
                            }`}
                          >
                            <span>{sub.title}</span>
                            {isSubActive && <span className="text-[#D4AF37]">●</span>}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Subtle Vertical Divider */}
          <div className="h-5 w-px bg-stone-300 mx-1 2xl:mx-1.5 self-center shrink-0" />

          {/* 글로벌외식정보 로고 (게시판 우측) */}
          <div className="relative group py-4 flex items-center shrink-0">
            <a
              href="https://www.hsgdn.co.kr/news/list.php?mcode=m247tk9&vg=photo"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl hover:bg-emerald-50/70 border border-transparent hover:border-[#D4C5B0]/80 transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-[#0B3C26] focus-visible:outline-none group/link"
              title={t('글로벌외식정보 외식 트렌드 바로가기 (새창 열기)', 'Go to Global Dining News - Trends (New Window)')}
              aria-label="글로벌외식정보 외식 트렌드 바로가기 (새창)"
            >
              <img
                src="/images/logo_global_dining.png"
                alt="글로벌외식정보 (Global Dining News)"
                className="h-8 2xl:h-9 w-auto object-contain group-hover/link:scale-105 transition-transform drop-shadow-xs"
              />
              <ExternalLink className="w-3.5 h-3.5 text-stone-400 group-hover/link:text-[#0B3C26] transition-colors" />
            </a>
          </div>
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
              <span>{getLangBadge(language)}</span>
              <span className="text-[#C5A059]">|</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#0B3C26]" />
            </button>

            {langDropdownOpen && (
              <div
                className="absolute right-0 top-full mt-2 w-44 bg-white rounded-2xl shadow-xl border border-stone-200 py-2 z-50 animate-fadeIn"
                onMouseLeave={() => setLangDropdownOpen(false)}
              >
                <div className="px-3 py-1.5 text-[10px] font-black text-stone-400 border-b border-stone-100 uppercase tracking-wider">
                  다국어 번역 선택 (Language)
                </div>
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setLanguage(l.code);
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full px-3 py-2 text-left text-xs font-bold flex items-center justify-between hover:bg-emerald-50 transition-colors cursor-pointer ${
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

          <div className="space-y-1.5">
            <p className="text-[11px] font-bold text-gray-500">언어 선택 (Select Language)</p>
            <div className="grid grid-cols-4 gap-1.5">
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLanguage(l.code)}
                  className={`min-h-[40px] px-2 py-1.5 text-xs rounded-xl font-bold border transition-all text-center flex flex-col items-center justify-center cursor-pointer ${
                    language === l.code
                      ? 'bg-[#0B3C26] text-[#D4AF37] border-[#C5A059] shadow-xs font-black'
                      : 'bg-white border-stone-200 text-stone-700 hover:border-stone-300'
                  }`}
                >
                  <span className="text-sm leading-none">{l.flag}</span>
                  <span className="text-[10px] mt-0.5 truncate">{l.code.toUpperCase()}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {mainMenuItems.map((menu) => {
              const isMenuActive = activeTab === menu.key;
              const hasSub = Boolean(menu.subItems);

              return (
                <div key={menu.id} className="border-b border-[#E7E2D8]">
                  <button
                    onClick={() => {
                      if (onTabChange) {
                        onTabChange(menu.key, menu.defaultSubTab);
                      }
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full text-left py-3 text-base min-h-[44px] flex items-center justify-between ${
                      isMenuActive ? 'text-[#0B3C26] font-black pl-2 border-l-4 border-l-[#C5A059]' : 'text-gray-800 font-bold hover:text-[#C5A059]'
                    }`}
                  >
                    <span>{menu.title}</span>
                    {isMenuActive && <span className="text-[#C5A059]">●</span>}
                  </button>

                  {/* Mobile sub items */}
                  {hasSub && (
                    <div className="pl-3 pb-2 space-y-1 bg-white/70 rounded-xl mb-2 p-1.5 border border-stone-200">
                      {menu.subItems.map((sub) => {
                        const isSubActive =
                          isMenuActive &&
                          (subTab === sub.subTab || (!subTab && sub.subTab === menu.defaultSubTab));
                        return (
                          <button
                            key={sub.id}
                            onClick={() => {
                              if (onTabChange) {
                                onTabChange(menu.key, sub.subTab);
                              }
                              setMobileMenuOpen(false);
                            }}
                            className={`w-full text-left py-2 px-3 text-xs rounded-lg flex items-center justify-between ${
                              isSubActive
                                ? 'bg-[#0B3C26] text-[#D4AF37] font-black'
                                : 'text-stone-700 font-semibold hover:bg-emerald-50'
                            }`}
                          >
                            <span>└ {sub.title}</span>
                            {isSubActive && <span className="text-[10px] text-[#D4AF37]">선택됨</span>}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Mobile Global Dining News Card Link (게시판 바로 아래) */}
            <a
              href="https://www.hsgdn.co.kr/news/list.php?mcode=m247tk9&vg=photo"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-3.5 bg-white rounded-2xl border border-[#D4C5B0] shadow-xs hover:border-[#0B3C26] transition-all group mt-3"
              title="글로벌외식정보 외식 트렌드 바로가기 (새창)"
            >
              <div className="flex items-center gap-3">
                <img
                  src="/images/logo_global_dining.png"
                  alt="글로벌외식정보"
                  className="h-10 w-auto object-contain shrink-0"
                />
                <div className="text-left">
                  <div className="text-xs font-black text-stone-900 group-hover:text-[#0B3C26] flex items-center gap-1.5">
                    <span>외식 트렌드 최신 뉴스</span>
                    <span className="text-[10px] text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded font-bold border border-emerald-200">공식 제휴</span>
                  </div>
                  <div className="text-[10px] text-stone-500 font-mono mt-0.5">글로벌외식정보 바로가기 ↗</div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-stone-400 group-hover:text-[#0B3C26] shrink-0" />
            </a>

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
