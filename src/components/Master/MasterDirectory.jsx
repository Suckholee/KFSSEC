import { useLanguage } from '../../i18n/LanguageContext';
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import useMasterProfiles from '../../hooks/useMasterProfiles';
import MasterPhotoGrid from './MasterPhotoGrid';

export default function MasterDirectory({ group = 'expert' }) {
  const { tr, language } = useLanguage();
  const { profiles, error } = useMasterProfiles();
  const [search, setSearch] = useState('');
  const filtered = profiles.filter(profile => profile.published && profile.group === group && `${profile.name} ${tr(profile.name)}`.toLowerCase().includes(search.trim().toLowerCase()));

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-5 border-b border-gray-100 pb-5">
        <div className="flex items-baseline gap-3">
          <h2 className="text-xl font-bold tracking-tight text-gray-900">{tr(group === 'master' ? '명장' : '명인')}</h2>
          <p className="text-sm text-gray-400">{tr("총 ")}{tr(filtered.length)}{tr("명")}</p>
        </div>
        <label className="relative block w-full sm:w-64">
          <span className="sr-only">{tr("이름 검색")}</span>
          <Search aria-hidden="true" size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="search"
            value={search}
            onChange={event => setSearch(event.target.value)}
            placeholder={tr("이름 검색")}
            className="bg-white border border-gray-200 rounded-md pl-11 pr-4 py-3 w-full text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
          />
        </label>
      </div>
      {error && <p role="alert" className="text-red-700">{tr(error)}</p>}
      <MasterPhotoGrid profiles={filtered} />
      {!filtered.length && <p className="py-8 text-gray-500">{tr("검색 결과가 없습니다.")}</p>}
    </section>
  );
}
