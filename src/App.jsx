import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import PopularCourses from './components/PopularCourses';
import CourseCatalogPage from './components/Catalog/CourseCatalogPage';
import CourseModal from './components/CourseModal';
import AuthModal from './components/AuthModal';
import Footer from './components/Footer';

export default function App() {
  // Sync view state from URL query or hash
  const getInitialView = () => {
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has('industry') || searchParams.has('stage') || searchParams.has('format') || window.location.hash === '#catalog') {
      return 'catalog';
    }
    return 'landing'; // Default to landing page on initial load, toggleable on click
  };

  const [currentView, setCurrentView] = useState(getInitialView());
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [authMode, setAuthMode] = useState(null); // 'login' | 'signup' | null

  // Listen to popstate (back/forward button)
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
      />

      {/* Main Page Content */}
      <main className="flex-grow">
        {currentView === 'catalog' ? (
          <CourseCatalogPage />
        ) : (
          <>
            <Hero
              onExploreClick={() => handleViewChange('catalog')}
              onAboutClick={() => alert('한국외식창업교육원은 외식업계 실무 전문가들이 만든 외식 창업 전담 교육 기관입니다.')}
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
      <Footer />

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

    </div>
  );
}
