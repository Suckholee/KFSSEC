import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import PopularCourses from './components/PopularCourses';
import CourseModal from './components/CourseModal';
import AuthModal from './components/AuthModal';
import Footer from './components/Footer';

export default function App() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [authMode, setAuthMode] = useState(null); // 'login' | 'signup' | null

  const handleScrollToCourses = () => {
    const el = document.getElementById('courses');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToAbout = () => {
    alert('한국외식창업교육원은 외식업계 실무 전문가들이 만든 외식 창업 전담 교육 기관입니다.');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-slate-800 antialiased selection:bg-brand-500 selection:text-white">
      
      {/* Navigation Header */}
      <Header onOpenAuth={(mode) => setAuthMode(mode)} />

      {/* Main Page Content */}
      <main className="flex-grow">
        <Hero
          onExploreClick={handleScrollToCourses}
          onAboutClick={handleScrollToAbout}
        />
        <Features />
        <PopularCourses
          onSelectCourse={(course) => setSelectedCourse(course)}
        />
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
