import React, { useState, useRef } from 'react';
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
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';

export default function App() {
  const [currentView, setCurrentView] = useState('landing'); // 'landing' | 'catalog' | 'about'
  const [aboutTab, setAboutTab] = useState('greetings'); // 'greetings' | 'overview' | 'directions'
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authInitialMode, setAuthInitialMode] = useState('login');

  const snapContainerRef = useRef(null);

  const handleOpenAuth = (mode = 'login') => {
    setAuthInitialMode(mode);
    setAuthModalOpen(true);
  };

  const handleOpenAboutTab = (tab = 'greetings') => {
    setAboutTab(tab);
    setCurrentView('about');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollNext = () => {
    if (snapContainerRef.current) {
      const vh = snapContainerRef.current.clientHeight;
      snapContainerRef.current.scrollBy({ top: vh, behavior: 'smooth' });
    }
  };

  return (
    <div className="h-screen overflow-hidden bg-gray-50 flex flex-col font-sans text-gray-900 antialiased selection:bg-emerald-200 selection:text-emerald-900">
      {/* Header */}
      <Header
        currentView={currentView}
        onViewChange={(view) => {
          setCurrentView(view);
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
                  setCurrentView('catalog');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onAboutClick={() => handleOpenAboutTab('greetings')}
                onScrollNext={handleScrollNext}
              />
            </section>

            {/* Section 2: Event Strip Banner (지금 진행 중인 외식창업 이벤트 50% 할인) */}
            <section className="scroll-snap-section flex flex-col justify-center bg-[#0c1015]">
              <EventBannerSection
                onEventClick={() => handleOpenAuth('login')}
                onScrollNext={handleScrollNext}
              />
            </section>

            {/* Section 3: Netflix-Style Course Catalog & Promo Banner */}
            <section className="scroll-snap-section flex flex-col justify-center bg-[#091510]">
              <NetflixCoursesSection
                onSelectCourse={() => handleOpenAuth('login')}
                onScrollNext={handleScrollNext}
              />
            </section>

            {/* Section 4: YouTube Media Section (자사 유튜브 콘텐츠 노출) */}
            <section className="scroll-snap-section flex flex-col justify-center bg-[#08100d]">
              <YouTubeMediaSection onScrollNext={handleScrollNext} />
            </section>

            {/* Section 5: Full Package Courses Section (외식창업 풀 패키지 추천) */}
            <section className="scroll-snap-section flex flex-col justify-center bg-[#061811]">
              <FullPackageCoursesSection
                onSelectPackage={() => handleOpenAuth('login')}
                onScrollNext={handleScrollNext}
              />
            </section>

            {/* Section 6: Unified Category Course Section (4대 카테고리 연속 스택: 펫미용 + 쇼미용 + 펫푸드 + 창업전략) */}
            <section className="scroll-snap-section flex flex-col justify-center bg-[#0a1410]">
              <CategoryCourseSection
                onViewMoreClick={() => {
                  setCurrentView('catalog');
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
                  setCurrentView('catalog');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onScrollNext={handleScrollNext}
              />
            </section>

            {/* Section 8: Footer */}
            <section className="scroll-snap-section flex flex-col justify-end">
              <Footer
                onViewChange={(view) => {
                  setCurrentView(view);
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
                setCurrentView(view);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenAboutTab={handleOpenAboutTab}
            />
          </div>
        )}
      </main>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authInitialMode}
      />
    </div>
  );
}
