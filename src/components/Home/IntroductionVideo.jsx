import React, { useEffect, useRef, useState } from 'react';

const INTRO_VIDEO_URL = '/videos/chairman-promotional-smooth.mp4';

export default function IntroductionVideo() {
  const videoRef = useRef(null);
  const visibleRef = useRef(false);
  const retryRef = useRef(null);
  const [failed, setFailed] = useState(false);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || failed) return;
    let disposed = false;
    let needsGesture = false;
    async function playWithSound() {
      if (!visibleRef.current || document.hidden || disposed) return;
      video.muted = false;
      try {
        await video.play();
        if (disposed || !visibleRef.current || document.hidden) video.pause();
        if (!disposed) { needsGesture = false; setBlocked(false); }
      } catch (error) {
        if (!disposed && visibleRef.current && error.name === 'NotAllowedError') {
          needsGesture = true; setBlocked(true);
        }
      }
    }
    retryRef.current = playWithSound;
    const observer = new IntersectionObserver(([entry]) => {
      visibleRef.current = entry.isIntersecting && entry.intersectionRatio > 0;
      if (visibleRef.current) playWithSound();
      else { video.pause(); setBlocked(false); }
    }, { threshold: [0, 0.01], rootMargin: '-90px 0px 0px 0px' });
    observer.observe(video);
    const handleVisibility = () => {
      if (document.hidden) video.pause();
      else if (visibleRef.current) playWithSound();
    };
    const retryAfterInteraction = () => { if (needsGesture) playWithSound(); };
    document.addEventListener('visibilitychange', handleVisibility);
    document.addEventListener('pointerdown', retryAfterInteraction);
    document.addEventListener('keydown', retryAfterInteraction);
    return () => {
      disposed = true; visibleRef.current = false; retryRef.current = null;
      observer.disconnect(); video.pause();
      document.removeEventListener('visibilitychange', handleVisibility);
      document.removeEventListener('pointerdown', retryAfterInteraction);
      document.removeEventListener('keydown', retryAfterInteraction);
    };
  }, [failed]);

  return <section aria-label="한국외식창업교육원 소개영상" className="bg-gradient-to-b from-emerald-50 to-white py-5 sm:py-7 px-4 sm:px-6 lg:px-8">
    <div className="max-w-[1456px] mx-auto mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <img src="/images/logo-transparent.svg" alt="사단법인 한국외식창업교육원" className="w-48 sm:w-60 h-auto" />
      <div className="sm:text-right">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900">외식 창업의 시작부터 성장까지</h2>
        <p className="mt-1 text-sm text-slate-600">안형상 이사장과 함께하는 교육원 소개 · AI 영상 및 실제 현장 자료</p>
      </div>
    </div>
    <div className="relative max-w-[1456px] mx-auto overflow-hidden rounded-2xl sm:rounded-3xl bg-black shadow-xl">
      {failed ? <div className="p-8 text-center text-white">소개영상을 불러오지 못했습니다. <a className="underline" href={INTRO_VIDEO_URL}>영상 직접 보기</a></div> : <video
        ref={videoRef}
        className="block w-full aspect-video object-contain"
        src={INTRO_VIDEO_URL}
        aria-label="한국외식창업교육원 안형상 이사장 AI 인사 영상"
        loop playsInline controls preload="metadata"
        onPlay={() => { if (!visibleRef.current || document.hidden) videoRef.current?.pause(); else setBlocked(false); }}
        onError={() => setFailed(true)}
      >브라우저에서 동영상을 지원하지 않습니다. <a href={INTRO_VIDEO_URL}>소개영상 보기</a></video>}
      {blocked && !failed && <button type="button" onClick={() => retryRef.current?.()} className="absolute inset-x-0 mx-auto top-1/2 -translate-y-1/2 w-fit px-6 py-3 rounded-full bg-emerald-700 text-white font-bold shadow-lg border border-white/30">▶ 소리 켜고 재생</button>}
    </div>
  </section>;
}
