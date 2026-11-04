import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';

export default function CourseCurriculum({ modules, title = '교육 커리큘럼', description }) {
  const { tr } = useLanguage();
  if (!modules?.length) return null;
  return (
    <section className="space-y-4" aria-label={tr(title)}>
      <h3 className="text-xl font-black text-gray-900">{tr(title)}</h3>
      {description && <p className="text-sm leading-relaxed text-gray-600">{tr(description)}</p>}
      <ol className="space-y-3">
        {modules.map((module, index) => (
          <li key={module.title} className="flex gap-3 rounded-xl border border-stone-200 bg-white p-4 sm:p-5">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-sm font-black text-emerald-800">{String(index + 1).padStart(2, '0')}</span>
            <div className="min-w-0">
              <h4 className="font-bold leading-relaxed text-gray-900">{tr(module.title)}</h4>
              <ul className="mt-2 list-disc space-y-1.5 pl-4 text-sm leading-relaxed text-gray-600">
                {module.topics.map(topic => <li key={topic}>{tr(topic)}</li>)}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
