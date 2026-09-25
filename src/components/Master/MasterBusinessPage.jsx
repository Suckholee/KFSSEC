import React, { useState, useEffect } from 'react';
import { flushSync } from 'react-dom';
import { Sparkles, Award, Medal } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import useMasterProfiles from '../../hooks/useMasterProfiles';
import MasterDirectory from './MasterDirectory';

const normalizeTab = tab => {
  if (tab === 'directory') return 'directory';
  if (tab === 'profiles') return 'profiles';
  return 'all';
};

export default function MasterBusinessPage({ initialSubTab = 'all', initialTab = 'all' }) {
  const { tr, t } = useLanguage();
  const defaultSub = normalizeTab(initialSubTab || initialTab || 'all');
  const [activeTab, setActiveTab] = useState(defaultSub);
  const { profiles } = useMasterProfiles();

  const totalCount = profiles.filter(p => p.published).length;
  const masterCount = profiles.filter(p => p.published && p.group === 'master').length;
  const expertCount = profiles.filter(p => p.published && p.group === 'expert').length;

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
    {
      id: 'all',
      label: '명장·명인 전체',
      group: 'all',
      count: totalCount,
      icon: Sparkles,
      desc: '외식산업을 이끄는 모든 마스터와 장인',
    },
    {
      id: 'profiles',
      label: '대한민국 명장',
      group: 'master',
      count: masterCount,
      icon: Award,
      desc: '국가 공인 최고 권위 조리명장',
    },
    {
      id: 'directory',
      label: '조리 명인',
      group: 'expert',
      count: expertCount,
      icon: Medal,
      desc: '전통 비법과 현장 실무의 장인들',
    },
  ];

  const currentItem = masterSubItems.find(item => item.id === activeTab) || masterSubItems[0];

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-8 sm:py-12 font-sans text-gray-900">
      
      {/* Full Width Flush Layout matching Header margins */}
      <div className="w-full max-w-[1520px] mx-auto px-4 sm:px-8 lg:px-12 space-y-8">
        
        {/* Hero Section */}
        <header className="relative bg-gradient-to-br from-[#0B3C26] via-[#104830] to-[#072517] text-white rounded-3xl p-6 sm:p-10 lg:p-12 border-2 border-[#C5A059] shadow-xl overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-3 sm:space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C5A059]/20 border border-[#C5A059]/50 text-[#D4AF37] text-xs font-black tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>KFSSEC · CULINARY MASTERS & ARTISANS</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight font-serif">
              {tr("대한민국 명장·명인")}
            </h1>
            
            <p className="text-sm sm:text-base text-emerald-100/90 font-medium leading-relaxed">
              {tr("수십 년간 축적된 조리 비법과 철학으로 대한민국 외식산업의 깊이를 더하는 국가 공인 조리명장과 요리명인 네트워크입니다.")}
            </p>
          </div>

          {/* Decorative ambient gold glow */}
          <div className="absolute -bottom-16 -right-16 w-80 h-80 bg-[#C5A059]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
        </header>

        {/* Unified Master / Artisan Branch Navigation Tabs */}
        <section aria-label={tr("명장·명인 분류 선택")} className="bg-white rounded-2xl p-2 sm:p-3 border border-stone-200/90 shadow-xs">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {masterSubItems.map(item => {
              const IconComp = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => selectTab(item.id)}
                  className={`group relative flex items-center justify-between p-3.5 sm:p-4 rounded-xl border transition-all text-left cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-[#0B3C26] to-[#124b31] border-[#C5A059] text-white shadow-md'
                      : 'bg-stone-50/70 hover:bg-stone-100/80 border-stone-200 text-stone-700 hover:text-stone-900'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                        isActive
                          ? 'bg-[#C5A059] text-white shadow-xs'
                          : 'bg-white border border-stone-200 text-[#0B3C26] group-hover:border-[#C5A059]'
                      }`}
                    >
                      <IconComp className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-black text-sm sm:text-base tracking-tight truncate">
                          {tr(item.label)}
                        </span>
                      </div>
                      <p className={`text-[11px] truncate ${isActive ? 'text-emerald-100/80' : 'text-stone-500'}`}>
                        {tr(item.desc)}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`ml-2 px-2.5 py-1 rounded-full text-xs font-black shrink-0 ${
                      isActive
                        ? 'bg-[#C5A059] text-white'
                        : 'bg-stone-200/80 text-stone-700'
                    }`}
                  >
                    {item.count}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Master Directory Content Panel */}
        <main className="w-full min-w-0">
          <MasterDirectory
            key={activeTab}
            group={currentItem.group}
            groupLabel={currentItem.label}
            onSelectGroup={selectTab}
          />
        </main>

      </div>

    </div>
  );
}
