import React, { useState, useMemo } from 'react';
import { Search, X, RotateCcw, Filter, UtensilsCrossed } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import useMasterProfiles from '../../hooks/useMasterProfiles';
import MasterPhotoGrid from './MasterPhotoGrid';

const SPECIALTIES = [
  { id: 'all', label: '전체 분야', keywords: [] },
  { id: 'korean', label: '한식 · 육류', keywords: ['한식', '향토', '김치', '황태', '갈비', '국밥', '냉면', '반찬', '약선', '한정식', '곰탕', '보쌈', '밀면', '소반'] },
  { id: 'western', label: '호텔 · 서양조리', keywords: ['서양', '호텔', '양식', '스테이크', '파인다이닝', '뷔페', '연회', '조선', '리츠칼튼', '하얏트', '메리어트'] },
  { id: 'japanese', label: '일식 · 사시미', keywords: ['일식', '스시', '사시미', '초밥', '해산물', '샤브샤브', '이자카야'] },
  { id: 'chinese', label: '중식 · 짬뽕', keywords: ['중식', '짬뽕', '짜장', '상해루', '야래향', '이금기'] },
  { id: 'bakery', label: '베이커리 · 전통다식', keywords: ['제과', '제빵', '베이커리', '빵', '다식', '화과자', '한과', '폐백', '도우', '식빵'] },
  { id: 'sauce', label: '발효장류 · 소스개발', keywords: ['발효', '소스', '양념', '장류', '면'] },
  { id: 'business', label: '외식경영 · R&D', keywords: ['경영', '외식창업', '컨설팅', '비즈니스', '연구원', '대표', '교육', '실무사'] },
];

export default function MasterDirectory({ group = 'all', groupLabel = '명장·명인 전체', onSelectGroup }) {
  const { tr, t } = useLanguage();
  const { profiles, error } = useMasterProfiles();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  // Base list filtered by group (master / expert / all)
  const baseProfiles = useMemo(() => {
    return profiles.filter(profile => {
      if (!profile.published) return false;
      if (group !== 'all' && profile.group !== group) return false;
      return true;
    });
  }, [profiles, group]);

  // Compute category counts for base list
  const categoryCounts = useMemo(() => {
    const counts = { all: baseProfiles.length };
    SPECIALTIES.forEach(cat => {
      if (cat.id === 'all') return;
      counts[cat.id] = baseProfiles.filter(p => {
        const textToSearch = `${p.title || ''} ${p.headline || ''} ${p.intro || ''} ${(p.awards || []).join(' ')}`.toLowerCase();
        return cat.keywords.some(kw => textToSearch.includes(kw.toLowerCase()));
      }).length;
    });
    return counts;
  }, [baseProfiles]);

  // Final filtered list with category and search query
  const filtered = useMemo(() => {
    return baseProfiles.filter(profile => {
      // Category filter
      if (activeCategory !== 'all') {
        const catSpec = SPECIALTIES.find(c => c.id === activeCategory);
        if (catSpec) {
          const textToSearch = `${profile.title || ''} ${profile.headline || ''} ${profile.intro || ''} ${(profile.awards || []).join(' ')}`.toLowerCase();
          const matchesCategory = catSpec.keywords.some(kw => textToSearch.includes(kw.toLowerCase()));
          if (!matchesCategory) return false;
        }
      }

      // Search keyword filter
      if (search.trim()) {
        const query = search.trim().toLowerCase();
        const searchable = `${profile.name} ${tr(profile.name)} ${profile.title || ''} ${profile.headline || ''} ${profile.intro || ''} ${(profile.awards || []).join(' ')}`.toLowerCase();
        if (!searchable.includes(query)) return false;
      }

      return true;
    });
  }, [baseProfiles, activeCategory, search, tr]);

  const resetFilters = () => {
    setActiveCategory('all');
    setSearch('');
  };

  return (
    <section className="space-y-6">
      
      {/* Search & Specialty Filter Controls */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 border border-stone-200/90 shadow-xs space-y-5">
        
        {/* Top Filter Bar: Category Chips & Search Bar */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          
          {/* Search Box */}
          <div className="relative w-full lg:w-80">
            <Search aria-hidden="true" size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={tr("이름, 전문분야, 요리 키워드 검색")}
              className="bg-stone-50 border border-stone-200 rounded-xl pl-11 pr-10 py-3 w-full text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0B3C26]/20 focus:border-[#0B3C26] transition-all"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-1"
                aria-label={tr("검색어 지우기")}
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Quick Info & Active Filters Badge */}
          <div className="flex items-center justify-between lg:justify-end gap-3 text-xs">
            <span className="font-bold text-stone-500">
              {tr("검색 결과:")} <span className="font-black text-[#0B3C26] text-sm">{filtered.length}</span>{tr("명")}
              {baseProfiles.length !== filtered.length && (
                <span className="text-stone-400 ml-1">({tr("전체")} {baseProfiles.length}{tr("명 중")})</span>
              )}
            </span>

            {(activeCategory !== 'all' || search) && (
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold transition-colors cursor-pointer"
              >
                <RotateCcw size={13} />
                <span>{tr("필터 초기화")}</span>
              </button>
            )}
          </div>
        </div>

        {/* Specialty Category Filter Pills */}
        <div className="pt-2 border-t border-stone-100">
          <div className="flex items-center gap-2 mb-2.5">
            <Filter size={14} className="text-[#0B3C26]" />
            <span className="text-xs font-black text-stone-800 tracking-tight">{tr("전문 조리 분야별 보기")}</span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {SPECIALTIES.map(cat => {
              const isActive = activeCategory === cat.id;
              const count = categoryCounts[cat.id] ?? 0;
              
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#0B3C26] text-[#D4AF37] border border-[#C5A059] shadow-xs'
                      : 'bg-stone-50 hover:bg-stone-100 text-stone-600 hover:text-stone-900 border border-stone-200'
                  }`}
                >
                  <span>{tr(cat.label)}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                    isActive ? 'bg-[#C5A059] text-white' : 'bg-stone-200/80 text-stone-600'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* Error alert if any */}
      {error && <p role="alert" className="text-rose-700 font-bold p-4 bg-rose-50 rounded-2xl">{tr(error)}</p>}

      {/* Profile Photo Grid */}
      <MasterPhotoGrid profiles={filtered} />

      {/* Empty State */}
      {!filtered.length && (
        <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 space-y-4">
          <div className="w-16 h-16 rounded-full bg-stone-100 text-stone-400 mx-auto flex items-center justify-center">
            <UtensilsCrossed size={32} />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-gray-800">{tr("조건에 맞는 명장·명인이 없습니다.")}</h3>
            <p className="text-xs sm:text-sm text-gray-500">{tr("검색어를 변경하거나 필터를 초기화해 보세요.")}</p>
          </div>
          <button
            type="button"
            onClick={resetFilters}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0B3C26] text-white text-xs font-bold hover:bg-[#082d1c] transition-colors cursor-pointer shadow-xs"
          >
            <RotateCcw size={14} />
            <span>{tr("전체 목록 보기")}</span>
          </button>
        </div>
      )}

    </section>
  );
}
