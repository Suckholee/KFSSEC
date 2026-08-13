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
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900 antialiased selection:bg-emerald-200 selection:text-emerald-900">
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

      {/* Main Content Body */}
      <main className="flex-1">
        {currentView === 'landing' && (
          <>
            <Hero
              onViewCatalog={() => {
                setCurrentView('catalog');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenAbout={() => handleOpenAboutTab('greetings')}
            />
            <Features />
            <PopularCourses
              onSelectCourse={() => {
                setCurrentView('catalog');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </>
        )}

        {currentView === 'catalog' && (
          <CourseCatalogPage
            onSelectCourse={() => handleOpenAuth('login')}
          />
        )}

        {currentView === 'about' && (
          <AboutPage initialTab={aboutTab} />
        )}
      </main>

      {/* Footer */}
      <Footer
        onViewChange={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenAboutTab={handleOpenAboutTab}
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authInitialMode}
      />
    </div>
  );
}
