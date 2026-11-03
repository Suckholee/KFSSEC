import React, { useEffect, useRef, useState } from 'react';
import workerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

export default function BrochurePdfViewer({ url }) {
  const [document, setDocument] = useState(null);
  const [page, setPage] = useState(1);
  const [zoom, setZoom] = useState(1);
  const [width, setWidth] = useState(600);
  const [busy, setBusy] = useState(true);
  const [error, setError] = useState('');
  const [text, setText] = useState('');
  const container = useRef(null);
  const canvas = useRef(null);

  useEffect(() => {
    let active = true;
    let task;
    (async () => {
      try {
        const pdfjs = await import('pdfjs-dist/build/pdf.mjs');
        if (!active) return;
        pdfjs.GlobalWorkerOptions.workerSrc = workerUrl;
        task = pdfjs.getDocument(url);
        const pdf = await task.promise;
        if (active) setDocument(pdf);
      } catch (failure) {
        if (active) { setError('PDF를 불러오지 못했습니다. 위의 PDF 열기 또는 다운로드 버튼을 이용해 주세요.'); setBusy(false); }
      }
    })();
    return () => { active = false; task?.destroy(); };
  }, [url]);

  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => setWidth(Math.max(240, entry.contentRect.width - 32)));
    observer.observe(container.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!document) return;
    let active = true;
    let render;
    setBusy(true);
    setError('');
    (async () => {
      try {
        const pdfPage = await document.getPage(page);
        if (!active) return;
        const base = pdfPage.getViewport({ scale: 1 });
        const viewport = pdfPage.getViewport({ scale: width / base.width * zoom });
        const ratio = Math.min(window.devicePixelRatio || 1, 2);
        const target = canvas.current;
        target.width = Math.floor(viewport.width * ratio);
        target.height = Math.floor(viewport.height * ratio);
        target.style.width = `${viewport.width}px`;
        target.style.height = `${viewport.height}px`;
        render = pdfPage.render({ canvasContext: target.getContext('2d'), viewport, transform: [ratio, 0, 0, ratio, 0, 0] });
        await render.promise;
        if (!active) return;
        setBusy(false);
        const content = await pdfPage.getTextContent();
        if (active) setText(content.items.map(item => item.str || '').join(' '));
      } catch (failure) {
        if (active && failure.name !== 'RenderingCancelledException') {
          setError('이 페이지를 표시하지 못했습니다. PDF 열기 버튼으로 원문을 확인해 주세요.'); setBusy(false);
        }
      }
    })();
    return () => { active = false; render?.cancel(); };
  }, [document, page, zoom, width]);

  return <div className="border-t border-stone-200">
    <div role="toolbar" aria-label="브로슈어 PDF 읽기 도구" className="flex flex-wrap items-center justify-center gap-2 bg-stone-100 p-3">
      <button type="button" aria-label="이전 페이지" disabled={!document || page === 1} onClick={() => setPage(p => p - 1)} className="rounded-lg border bg-white px-4 py-2 disabled:opacity-40">← 이전</button>
      <label className="flex items-center gap-2 text-sm"><span className="sr-only">페이지 선택</span><select aria-label="페이지 선택" value={page} disabled={!document} onChange={event => setPage(Number(event.target.value))} className="rounded-lg border bg-white px-3 py-2">{Array.from({length: document?.numPages || 1}, (_,i) => <option key={i+1} value={i+1}>{i+1}쪽</option>)}</select><span>/ {document?.numPages || '…'}쪽</span></label>
      <button type="button" aria-label="다음 페이지" disabled={!document || page === document.numPages} onClick={() => setPage(p => p + 1)} className="rounded-lg border bg-white px-4 py-2 disabled:opacity-40">다음 →</button>
      <span className="mx-1 h-6 border-l border-stone-300" />
      <button type="button" aria-label="축소" disabled={zoom <= 0.75} onClick={() => setZoom(z => Math.max(0.75,z-0.25))} className="rounded-lg border bg-white px-3 py-2 disabled:opacity-40">−</button>
      <button type="button" onClick={() => setZoom(1)} className="rounded-lg border bg-white px-3 py-2 text-sm">{Math.round(zoom*100)}% · 폭 맞춤</button>
      <button type="button" aria-label="확대" disabled={zoom >= 2} onClick={() => setZoom(z => Math.min(2,z+0.25))} className="rounded-lg border bg-white px-3 py-2 disabled:opacity-40">＋</button>
    </div>
    <div ref={container} aria-busy={busy} className="min-h-[400px] overflow-auto bg-stone-800 p-4">
      {busy && <p role="status" className="mb-3 text-center text-sm text-white">PDF를 불러오는 중입니다…</p>}
      {error && <p role="alert" className="rounded-xl bg-white p-5 text-center text-red-800">{error}</p>}
      <canvas ref={canvas} role="img" aria-label={`브로슈어 ${page}쪽`} className="block mx-auto bg-white shadow-lg" />
      <p className="sr-only">{text}</p>
    </div>
  </div>;
}
