import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import EventBannerSection from './components/EventBannerSection';
import NetflixCoursesSection from './components/NetflixCoursesSection';
import YouTubeMediaSection from './components/YouTubeMediaSection';
import FullPackageCoursesSection from './components/FullPackageCoursesSection';
import CategoryCourseSection from './components/CategoryCourseSection';
import BannerSection from './components/BannerSection';
import CourseCatalogPage from './components/Catalog/CourseCatalogPage';
import AboutPage from './components/About/AboutPage';
import AdminLayout from './components/Admin/AdminLayout';
import AdminLoginModal from './components/Admin/AdminLoginModal';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';

export default function App() {
  // Determine initial view based on window.location.pathname
  const getInitialView = () => {
    const path = window.location.pathname;
    if (path === '/admin') return 'admin';
    if (path === '/catalog') return 'catalog';
    if (path === '/about') return 'about';
    return 'landing';
  };

  const [currentView, setCurrentView] = useState(getInitialView);
  const [aboutTab, setAboutTab] = useState('greetings');
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authInitialMode, setAuthInitialMode] = useState('login');

  // Central Dynamic Site Data Store with localStorage Persistence
  const [siteData, setSiteData] = useState(() => {
    const saved = localStorage.getItem('kfssec_site_data');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved site data:', e);
      }
    }
    return {
      youtube: {
        title: '한국외식창업교육원 미디어',
        subtitle: '사단법인 한국외식창업교육원의 주요 정기총회 현장 및 아시아창의방송 언론 보도 영상입니다.',
        channelUrl:
          'https://www.youtube.com/@%ED%95%9C%EA%B5%AD%EC%99%B8%EC%8B%9D%EC%B0%BD%EC%97%85%EA%B5%90%EC%9C%A1%EC%9C%88',
        videos: [
          {
            id: 'v1',
            videoUrl: 'https://www.youtube.com/watch?v=ZDZFUpS0fFE',
            videoId: 'ZDZFUpS0fFE',
            title: '240203 한국외식창업교육원 정기총회',
            subtitle: '한국외식창업교육원 2023년 결산 및 2024년 사업 계획에 대한 정기 총회 전체 영상',
            channel: '한국외식창업교육원 공식 채널',
            categoryBadge: '공식 채널 영상',
            badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
          },
          {
            id: 'v2',
            videoUrl: 'https://www.youtube.com/watch?v=E_WgebIP_SY',
            videoId: 'E_WgebIP_SY',
            title: '안형상 한국외식창업교육원 이사장, 정기총회서 "100세 초고령 시대 교육을 통한 글로벌 K-FOOD 시대 열어야..." 강조',
            subtitle: '아시아창의방송(actv) 정기총회 현장 취재 및 안형상 이사장 특별 언론 보도 영상',
            channel: '아시아창의방송 (actv) 언론 보도',
            categoryBadge: '언론 보도 영상',
            badgeColor: 'bg-red-500/20 text-red-300 border-red-500/30',
          },
        ],
      },
      banner: {
        active: true,
        title: '240203 한국외식창업교육원 정기총회 세미나',
      },
    };
  });

  const handleUpdateSiteData = (newPart) => {
    setSiteData((prev) => {
      const updated = {
        ...prev,
        ...newPart,
        youtube: newPart.youtube ? { ...prev.youtube, ...newPart.youtube } : prev.youtube,
        banner: newPart.banner ? { ...prev.banner, ...newPart.banner } : prev.banner,
      };
      localStorage.setItem('kfssec_site_data', JSON.stringify(updated));
      return updated;
    });
  };

  // Admin Security Authentication State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return localStorage.getItem('kfssec_admin_auth') === 'true';
  });

  const [adminLoginModalOpen, setAdminLoginModalOpen] = useState(false);
  const snapContainerRef = useRef(null);

  // Sync View to URL Pathname & Handle Popstate Navigation
  const changeView = (view, pathName = null) => {
    setCurrentView(view);
    const targetPath = pathName || (view === 'landing' ? '/' : `/${view}`);
    if (window.location.pathname !== targetPath) {
      window.history.pushState({ view }, '', targetPath);
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === '/admin') {
        setCurrentView('admin');
      } else if (path === '/catalog') {
        setCurrentView('catalog');
      } else if (path === '/about') {
        setCurrentView('about');
      } else {
        setCurrentView('landing');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Handle Admin Access Security Check
  useEffect(() => {
    if (currentView === 'admin') {
      if (!isAdminAuthenticated) {
        setAdminLoginModalOpen(true);
      }
    } else {
      setAdminLoginModalOpen(false);
    }
  }, [currentView, isAdminAuthenticated]);

  const handleAdminLoginSuccess = () => {
    setIsAdminAuthenticated(true);
    localStorage.setItem('kfssec_admin_auth', 'true');
    setAdminLoginModalOpen(false);
    changeView('admin', '/admin');
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    localStorage.removeItem('kfssec_admin_auth');
    setAdminLoginModalOpen(false);
    changeView('landing', '/');
  };

  const handleOpenAuth = (mode = 'login') => {
    setAuthInitialMode(mode);
    setAuthModalOpen(true);
  };

  const handleOpenAboutTab = (tab = 'greetings') => {
    setAboutTab(tab);
    changeView('about', '/about');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollNext = () => {
    if (snapContainerRef.current) {
      const vh = snapContainerRef.current.clientHeight;
      snapContainerRef.current.scrollBy({ top: vh, behavior: 'smooth' });
    }
  };

  // If in Admin Mode and Authenticated, render full-screen Admin Layout
  if (currentView === 'admin' && isAdminAuthenticated) {
    return (
      <AdminLayout
        siteData={siteData}
        onUpdateSiteData={handleUpdateSiteData}
        onExitAdmin={() => changeView('landing', '/')}
        onLogout={handleAdminLogout}
      />
    );
  }

  return (
    <div className="h-screen overflow-hidden bg-gray-50 flex flex-col font-sans text-gray-900 antialiased selection:bg-emerald-200 selection:text-emerald-900">
      {/* Header */}
      <Header
        currentView={currentView}
        onViewChange={(view) => {
          changeView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenAuth={handleOpenAuth}
        onOpenAboutTab={handleOpenAboutTab}
      />

      {/* Main Content Body with One-Scroll Fullpage Snap */}
      <main className="flex-1 overflow-hidden">
        {currentView === 'landing' ? (
          <div ref={snapContainerRef} className="scroll-snap-container no-scrollbar">
            {/* Section 1: Hero */}
            <section className="scroll-snap-section flex flex-col justify-center">
              <Hero
                onExploreClick={() => {
                  changeView('catalog', '/catalog');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onAboutClick={() => handleOpenAboutTab('greetings')}
                onScrollNext={handleScrollNext}
              />
            </section>

            {/* Section 2: Event Strip Banner */}
            <section className="scroll-snap-section flex flex-col justify-center bg-[#0c1015]">
              <EventBannerSection
                bannerData={siteData.banner}
                onEventClick={() => handleOpenAuth('login')}
                onScrollNext={handleScrollNext}
              />
            </section>

            {/* Section 3: Netflix-Style Course Catalog */}
            <section className="scroll-snap-section flex flex-col justify-center bg-[#091510]">
              <NetflixCoursesSection
                onSelectCourse={() => handleOpenAuth('login')}
                onScrollNext={handleScrollNext}
              />
            </section>

            {/* Section 4: YouTube Media Section with Instant Dynamic SiteData Sync */}
            <section className="scroll-snap-section flex flex-col justify-center bg-[#08100d]">
              <YouTubeMediaSection
                youtubeData={siteData.youtube}
                onScrollNext={handleScrollNext}
              />
            </section>

            {/* Section 5: Full Package Courses Section */}
            <section className="scroll-snap-section flex flex-col justify-center bg-[#061811]">
              <FullPackageCoursesSection
                onSelectPackage={() => handleOpenAuth('login')}
                onScrollNext={handleScrollNext}
              />
            </section>

            {/* Section 6: Unified Category Course Section */}
            <section className="scroll-snap-section flex flex-col justify-center bg-[#0a1410]">
              <CategoryCourseSection
                onViewMoreClick={() => {
                  changeView('catalog', '/catalog');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onSelectCourse={() => handleOpenAuth('login')}
                onScrollNext={handleScrollNext}
              />
            </section>

            {/* Section 7: Login & Payment Guide Banners */}
            <section className="scroll-snap-section flex flex-col justify-center py-6">
              <BannerSection
                onOpenLogin={() => handleOpenAuth('login')}
                onOpenCatalog={() => {
                  changeView('catalog', '/catalog');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onScrollNext={handleScrollNext}
              />
            </section>

            {/* Section 8: Footer */}
            <section className="scroll-snap-section flex flex-col justify-end">
              <Footer
                onViewChange={(view) => {
                  changeView(view);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onOpenAboutTab={handleOpenAboutTab}
              />
            </section>
          </div>
        ) : (
          <div className="h-[calc(100vh-65px)] overflow-y-auto">
            {currentView === 'catalog' && (
              <CourseCatalogPage
                onSelectCourse={() => handleOpenAuth('login')}
              />
            )}

            {currentView === 'about' && (
              <AboutPage initialTab={aboutTab} />
            )}

            <Footer
              onViewChange={(view) => {
                changeView(view);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenAboutTab={handleOpenAboutTab}
            />
          </div>
        )}
      </main>

      {/* Admin Security Login Modal */}
      <AdminLoginModal
        isOpen={adminLoginModalOpen}
        onClose={() => {
          setAdminLoginModalOpen(false);
          if (currentView === 'admin' && !isAdminAuthenticated) {
            changeView('landing', '/');
          }
        }}
        onLoginSuccess={handleAdminLoginSuccess}
      />

      {/* User Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authInitialMode}
      />
    </div>
  );
}
