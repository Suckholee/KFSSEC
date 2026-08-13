import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import PopularCourses from './components/PopularCourses';
import CourseCatalogPage from './components/Catalog/CourseCatalogPage';
import CourseModal from './components/CourseModal';
import AuthModal from './components/AuthModal';
import AboutModal from './components/AboutModal';
import Footer from './components/Footer';

export default function App() {
  const getInitialView = () => {
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has('industry') || searchParams.has('stage') || searchParams.has('format') || window.location.hash === '#catalog') {
      return 'catalog';
    }
    return 'landing';
  };

  const [currentView, setCurrentView] = useState(getInitialView());
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [authMode, setAuthMode] = useState(null); // 'login' | 'signup' | null
  const [aboutOpen, setAboutOpen] = useState(false);

  useEffect(() => {
    const handleHashOrPopState = () => {
      const searchParams = new URLSearchParams(window.location.search);
      if (searchParams.has('industry') || searchParams.has('stage') || searchParams.has('format') || window.location.hash === '#catalog') {
        setCurrentView('catalog');
      } else if (window.location.hash === '#landing' || (!window.location.hash && !window.location.search)) {
        setCurrentView('landing');
      }
    };
    window.addEventListener('popstate', handleHashOrPopState);
    return () => window.removeEventListener('popstate', handleHashOrPopState);
  }, []);

  const handleViewChange = (view) => {
    setCurrentView(view);
    if (view === 'catalog') {
      window.location.hash = '#catalog';
    } else {
      window.location.hash = '';
      window.history.pushState(null, '', window.location.pathname);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-slate-800 antialiased selection:bg-brand-500 selection:text-white">
      
      {/* Navigation Header */}
      <Header
        currentView={currentView}
        onViewChange={handleViewChange}
        onOpenAuth={(mode) => setAuthMode(mode)}
        onOpenAbout={() => setAboutOpen(true)}
      />

      {/* Main Page Content */}
      <main className="flex-grow">
        {currentView === 'catalog' ? (
          <CourseCatalogPage />
        ) : (
          <>
            <Hero
              onExploreClick={() => handleViewChange('catalog')}
              onAboutClick={() => setAboutOpen(true)}
            />
            <Features />
            <PopularCourses
              onSelectCourse={(course) => setSelectedCourse(course)}
              onViewAllClick={() => handleViewChange('catalog')}
            />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer onOpenAbout={() => setAboutOpen(true)} />

      {/* Modals */}
      {selectedCourse && (
        <CourseModal
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
        />
      )}

      {authMode && (
        <AuthModal
          initialMode={authMode}
          onClose={() => setAuthMode(null)}
        />
      )}

      {aboutOpen && (
        <AboutModal
          onClose={() => setAboutOpen(false)}
        />
      )}

    </div>
  );
}
