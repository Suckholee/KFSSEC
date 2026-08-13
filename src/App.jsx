import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import PopularCourses from './components/PopularCourses';
import CourseCatalogPage from './components/Catalog/CourseCatalogPage';
import AboutPage from './components/About/AboutPage';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';

export default function App() {
  const [currentView, setCurrentView] = useState('landing'); // 'landing' | 'catalog' | 'about'
  const [aboutTab, setAboutTab] = useState('greetings'); // 'greetings' | 'overview' | 'directions'
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authInitialMode, setAuthInitialMode] = useState('login');

  const handleOpenAuth = (mode = 'login') => {
    setAuthInitialMode(mode);
    setAuthModalOpen(true);
  };

  const handleOpenAboutTab = (tab = 'greetings') => {
    setAboutTab(tab);
    setCurrentView('about');
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
          <div className="scroll-snap-container no-scrollbar">
            {/* Section 1: Hero */}
            <section className="scroll-snap-section flex flex-col justify-center">
              <Hero
                onExploreClick={() => {
                  setCurrentView('catalog');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onAboutClick={() => handleOpenAboutTab('greetings')}
              />
            </section>

            {/* Section 2: Features & Why Us */}
            <section className="scroll-snap-section flex flex-col justify-center bg-white py-6">
              <Features />
            </section>

            {/* Section 3: Popular Courses */}
            <section className="scroll-snap-section flex flex-col justify-center py-6">
              <PopularCourses
                onSelectCourse={() => {
                  setCurrentView('catalog');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            </section>

            {/* Section 4: Footer */}
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
