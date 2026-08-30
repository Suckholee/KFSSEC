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

            {/* Section 4: YouTube Media Section */}
            <section className="scroll-snap-section flex flex-col justify-center bg-[#08100d]">
              <YouTubeMediaSection onScrollNext={handleScrollNext} />
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
