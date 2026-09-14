import React, { useState } from 'react';
import profiles from '../../data/masterDirectory.json';
import MasterPhotoGrid from './MasterPhotoGrid';

export default function MasterDirectory({ group = 'expert' }) {
  const [search, setSearch] = useState('');
  const filtered = profiles.filter(profile => profile.group === group && profile.name.includes(search.trim()));

  return (
    <section className="space-y-6">
      <h2 className="text-3xl font-black">{group === 'master' ? '명장' : '명인'}</h2>
      <label className="block">
        <span className="sr-only">이름 검색</span>
        <input
          type="search"
          value={search}
          onChange={event => setSearch(event.target.value)}
          placeholder="이름 검색"
          className="bg-white border border-stone-300 rounded-xl px-4 py-3 w-full"
        />
      </label>
      <p className="text-sm text-gray-500">총 {filtered.length}명</p>
      <MasterPhotoGrid profiles={filtered} />
      {!filtered.length && <p className="py-8 text-gray-500">검색 결과가 없습니다.</p>}
    </section>
  );
}
