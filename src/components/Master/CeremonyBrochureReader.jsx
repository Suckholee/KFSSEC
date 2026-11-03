import React from 'react';

const brochureUrl = '/documents/kfssec-2026-master-ceremony.pdf';

export default function CeremonyBrochureReader() {
  return <section aria-labelledby="ceremony-brochure-title" className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm">
    <div className="p-5 sm:p-8 space-y-4">
      <span className="inline-block rounded-full bg-stone-100 px-3 py-1 text-sm text-stone-600">지난 행사 · 2026.10.19</span>
      <h2 id="ceremony-brochure-title" className="text-xl sm:text-2xl font-black text-green-950">2026 명인·명장 선정식 브로슈어</h2>
      <p className="text-stone-600 leading-7">제5회 대한민국 자랑스런 명인·명장 선정식 · 더샵갤러리 4F<br/>개회사, 행사 순서, 선정자와 수상자, 후원 등 브로슈어 13쪽을 원문으로 확인하세요.</p>
      <div className="flex flex-wrap gap-3">
        <a href={brochureUrl} target="_blank" rel="noreferrer" className="rounded-xl bg-green-800 px-5 py-3 font-bold text-white">PDF 전체화면 열기 ↗</a>
        <a href={brochureUrl} download className="rounded-xl border border-green-800 px-5 py-3 font-bold text-green-900">PDF 다운로드</a>
        <a href="/gallery/ceremony" className="px-3 py-3 font-bold text-green-900 underline">시상식 갤러리</a>
      </div>
      <p className="text-sm leading-6 text-stone-500">아래에서 PDF를 넘겨 읽을 수 있습니다. 모바일이나 PDF가 표시되지 않는 환경에서는 ‘PDF 전체화면 열기’를 이용해 주세요.</p>
    </div>
    <iframe
      src={`${brochureUrl}#view=FitH`}
      title="2026 명인·명장 선정식 브로슈어 PDF 리더 (13쪽)"
      className="block w-full border-0 bg-stone-100"
      style={{ height: '85vh', minHeight: 520 }}
    />
  </section>;
}
