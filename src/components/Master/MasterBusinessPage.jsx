import { useLanguage } from '../../i18n/LanguageContext';
import MasterDirectory from './MasterDirectory';
import { flushSync } from 'react-dom';
import React, { useState, useEffect } from 'react';

const normalizeTab = tab => (tab === 'directory' ? 'directory' : 'profiles');

export default function MasterBusinessPage({ initialSubTab = 'profiles', initialTab = 'profiles' }) {
  const { tr } = useLanguage();
  const defaultSub = normalizeTab(initialSubTab || initialTab || 'profiles');
  const [activeTab, setActiveTab] = useState(defaultSub);

  useEffect(() => {
    const target = initialSubTab || initialTab;
    if (target) {
      setActiveTab(normalizeTab(target));
    }
  }, [initialSubTab, initialTab]);

  const selectTab = id => {
    if (id === activeTab) return;
    const update = () => {
      setActiveTab(id);
      window.history.pushState({}, '', `/master/${id}`);
      window.dispatchEvent(new PopStateEvent('popstate'));
    };
    if (document.startViewTransition && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.startViewTransition(() => flushSync(update));
    } else update();
  };
  const masterSubItems = [
    { id: 'profiles', label: '명장' },
    { id: 'directory', label: '명인' },
  ];

  return (
    <div className="bg-white min-h-screen py-8 sm:py-12 font-sans text-gray-900">
      
      {/* Full Width Flush Layout matching Header margins */}
      <div className="w-full max-w-[1520px] mx-auto px-4 sm:px-8 lg:px-12 space-y-6">
        
        {/* Main Content Layout: Left SubSidebar + Right Main Content */}
        <div className="flex flex-col gap-8 items-stretch">
          
          {/* Left Vertical SubSidebar Menu */}
          <div className="space-y-7">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-[11px] tracking-[0.22em] font-semibold text-emerald-700 mb-3">KFSSEC · PEOPLE</p>
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">{tr("명장·명인")}</h1>
              </div>
              <p className="text-sm text-gray-500">{tr("외식의 깊이를 더하는 사람들")}</p>
            </div>
            <nav aria-label={tr("명장·명인 메뉴")} className="master-profile-tabs grid grid-cols-2 border-b border-gray-800" style={{ '--active-tab': Math.max(0, masterSubItems.findIndex(item => item.id === activeTab)) }}>
              {masterSubItems.map(item => (
                <button key={item.id} type="button" aria-current={activeTab === item.id ? 'page' : undefined}
                  onClick={() => selectTab(item.id)}
                  className={`min-h-14 px-2 py-3 sm:text-base text-xs border border-b-0 -mb-px font-semibold transition-colors ${activeTab === item.id ? 'relative bg-white border-gray-800 text-gray-950' : 'bg-gray-50 border-gray-200 text-gray-500 hover:text-emerald-800'}`}>
                  {tr(item.label)}
                </button>
              ))}
            </nav>
          </div>

          {/* Right Main Content Panel */}
          <div className="master-profile-content flex-1 w-full space-y-6 min-w-0">
            {activeTab === 'directory' && <MasterDirectory key="expert" group="expert" />}
            {activeTab === 'profiles' && <MasterDirectory key="master" group="master" />}
          </div>

        </div>

      </div>

    </div>
  );
}
