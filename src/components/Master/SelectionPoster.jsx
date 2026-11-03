import React from 'react';

export default function SelectionPoster({ name, title, width = 1024, height = 1536, wide = false }) {
  const src = `/images/master-selection/${name}.png`;
  return <figure className={`mx-auto w-full ${wide ? '' : 'max-w-2xl'} space-y-3`}>
    <a href={src} target="_blank" rel="noreferrer" aria-label={`${title} 원본 크게 보기`} className="block rounded-2xl overflow-hidden border border-stone-200 bg-white shadow-sm">
      <img src={src} alt={title} width={width} height={height} loading="lazy" className="block w-full h-auto" />
    </a>
    <figcaption className="flex flex-wrap justify-between gap-2 text-sm text-stone-600"><span>{title}</span><a href={src} download className="font-bold text-green-900 underline">원본 이미지 다운로드</a></figcaption>
  </figure>;
}
