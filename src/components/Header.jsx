import React, { useState } from 'react';
import { ChefHat, Menu, X } from 'lucide-react';

export default function Header({ currentView = 'landing', onViewChange, onOpenAuth }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'catalog', name: '교육과정' },
    { id: 'about', name: '교육원 소개' },
    { id: 'apply', name: '창업지원' },
    { id: 'community', name: '커뮤니티' },
    { id: 'mypage', name: '마이페이지' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <button
          onClick={() => onViewChange('landing')}
          className="flex items-center gap-3 group text-left"
        >
          <div className="w-10 h-10 rounded-xl bg-brand-500 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
            <ChefHat className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-xl tracking-tight text-gray-900 leading-tight">
              한국외식창업교육원
            </span>
            <span className="text-[10px] font-semibold tracking-wider text-gray-400 uppercase">
              Korea Food Service Entrepreneurship Institute
            </span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive =
              (item.id === 'catalog' && currentView === 'catalog') ||
              (item.id === 'landing' && currentView === 'landing');

            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id === 'catalog' ? 'catalog' : 'landing')}
                className={`text-base font-semibold transition-colors duration-150 relative py-1 ${
                  isActive
                    ? 'text-[#1E2B4D] font-extrabold'
                    : 'text-gray-600 hover:text-brand-500'
                }`}
              >
                {item.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1E2B4D] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Auth Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={() => onOpenAuth('login')}
            className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors"
          >
            로그인
          </button>
          <button
            onClick={() => onOpenAuth('signup')}
            className="px-4 py-2 text-sm font-semibold text-white bg-brand-500 rounded-lg hover:bg-brand-600 shadow-md shadow-brand-500/20 transition-all hover:shadow-lg"
          >
            회원가입
          </button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            aria-label="메뉴 열기"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white px-4 pt-3 pb-6 space-y-3 shadow-xl">
          <nav className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onViewChange(item.id === 'catalog' ? 'catalog' : 'landing');
                  setMobileMenuOpen(false);
                }}
                className={`text-left px-3 py-2.5 rounded-lg text-base font-semibold ${
                  (item.id === 'catalog' && currentView === 'catalog')
                    ? 'bg-blue-50 text-blue-900 font-bold'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {item.name}
              </button>
            ))}
          </nav>
          <div className="pt-3 border-t border-gray-100 flex gap-2">
            <button
              onClick={() => {
                onOpenAuth('login');
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2.5 text-center text-sm font-semibold text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              로그인
            </button>
            <button
              onClick={() => {
                onOpenAuth('signup');
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2.5 text-center text-sm font-semibold text-white bg-brand-500 rounded-lg hover:bg-brand-600 shadow-sm"
            >
              회원가입
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
