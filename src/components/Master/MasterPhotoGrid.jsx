import { useLanguage } from '../../i18n/LanguageContext';
import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import MasterDetailModal from './MasterDetailModal';

export default function MasterPhotoGrid({ profiles }) {
  const { tr, language } = useLanguage();
  const gridRef = useRef(null);
  const originRef = useRef(null);
  const [selectedId, setSelectedId] = useState(null);
  const selected = profiles.find(profile => (profile.id || profile.name) === selectedId);
  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll('.master-teacher-card');
    if (!cards || !window.IntersectionObserver || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const observer = new IntersectionObserver(entries => {
      entries.filter(entry => entry.isIntersecting).forEach((entry, index) => {
        entry.target.style.setProperty('--reveal-delay', `${Math.min(index, 4) * 60}ms`);
        entry.target.classList.remove('awaiting-reveal');
        entry.target.classList.add('has-revealed');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08 });
    cards.forEach(card => {
      if (card.classList.contains('has-revealed')) return;
      card.classList.add('awaiting-reveal');
      observer.observe(card);
    });
    return () => { observer.disconnect(); cards.forEach(card => card.classList.remove('awaiting-reveal')); };
  }, [profiles]);
  return (
    <>
      <div ref={gridRef} className="master-teacher-grid">
        {profiles.map(profile => (
          <button
            type="button"
            onClick={event => {
              originRef.current = event.currentTarget.getBoundingClientRect();
              setSelectedId(profile.id || profile.name);
            }}
            aria-label={tr`${profile.name || '프로필'} 상세 보기`}
            key={profile.id || profile.name}
            className={`master-teacher-card ${profile.group === 'master' ? 'is-master' : ''}`}
          >
            <span className="master-teacher-headline">{tr(profile.headline || profile.title || tr`${profile.name || '명장·명인'}의\n요리 이야기`)}</span>
            {profile.image && <img
              src={profile.image}
              alt=""
              loading="lazy"
              className="master-teacher-portrait"
            />}
            <span className="master-teacher-identity">
              <span className="master-teacher-category">{tr(profile.group === 'master' ? '명장' : '명인')}</span>
              <span className="master-teacher-name">{tr(profile.name || '이름')}</span>
              <span className="master-teacher-label">{tr("프로필 보기")}</span>
            </span>
            <span className="master-teacher-arrow" aria-hidden="true"><ArrowUpRight size={19} strokeWidth={1.5} /></span>
          </button>
        ))}
      </div>
      <MasterDetailModal originRect={originRef.current} isOpen={!!selected} master={selected} onClose={() => setSelectedId(null)} />
    </>
  );
}
