import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Sparkles,
  Download,
  CheckCircle,
  Palette,
  RotateCcw,
  Sliders,
  Check,
  Eye,
  Info,
  Layers,
  ArrowRight,
} from 'lucide-react';
import {
  POSTER_THEMES,
  analyzeCourseContent,
  drawCoursePosterToCanvas,
} from '../../services/coursePosterGenerator';

export default function CoursePosterGeneratorModal({
  isOpen,
  course = {},
  onClose,
  onApplyPoster,
}) {
  const canvasRef = useRef(null);

  // Determine initial theme based on category
  const getInitialThemeId = (c) => {
    const cat = (c.categoryName || c.industry || '').toLowerCase();
    const title = (c.title || '').toLowerCase();
    if (cat.includes('카페') || cat.includes('디저트') || title.includes('카페')) {
      return 'artisan_cafe';
    }
    if (title.includes('정책') || title.includes('지원금')) {
      return 'financial_navy';
    }
    if (title.includes('대회') || title.includes('자격')) {
      return 'crimson_championship';
    }
    if (cat.includes('패키지') || title.includes('패키지')) {
      return 'executive_slate';
    }
    if (title.includes('스테이크') || title.includes('파인다이닝')) {
      return 'royal_burgundy';
    }
    return 'heritage_gold';
  };

  const [selectedThemeId, setSelectedThemeId] = useState('heritage_gold');
  const [posterData, setPosterData] = useState(null);
  const [appliedSuccess, setAppliedSuccess] = useState(false);
  const [isSynthesizing, setIsSynthesizing] = useState(false);

  // Initialize or re-analyze when modal opens
  useEffect(() => {
    if (isOpen && course) {
      setSelectedThemeId(getInitialThemeId(course));
      const analyzed = analyzeCourseContent(course);
      setPosterData(analyzed);
      setAppliedSuccess(false);
    }
  }, [isOpen, course]);

  // Redraw canvas whenever posterData or selectedThemeId changes
  useEffect(() => {
    if (canvasRef.current && posterData) {
      const theme =
        POSTER_THEMES.find((t) => t.id === selectedThemeId) || POSTER_THEMES[0];
      drawCoursePosterToCanvas(canvasRef.current, posterData, theme);
    }
  }, [posterData, selectedThemeId]);

  if (!isOpen || !posterData) return null;

  const currentTheme =
    POSTER_THEMES.find((t) => t.id === selectedThemeId) || POSTER_THEMES[0];

  // Re-run AI Content Analyzer
  const handleReAnalyze = () => {
    setIsSynthesizing(true);
    setTimeout(() => {
      const analyzed = analyzeCourseContent(course);
      setPosterData(analyzed);
      setIsSynthesizing(false);
    }, 400);
  };

  // 1-Click Apply to Course Cover Image
  const handleApply = () => {
    if (!canvasRef.current) return;
    const dataUrl = canvasRef.current.toDataURL('image/png');
    if (onApplyPoster) {
      onApplyPoster(dataUrl);
    }
    setAppliedSuccess(true);
    setTimeout(() => {
      setAppliedSuccess(false);
      onClose();
    }, 1200);
  };

  // Download high-resolution PNG
  const handleDownload = () => {
    if (!canvasRef.current) return;
    const dataUrl = canvasRef.current.toDataURL('image/png');
    const link = document.createElement('a');
    const safeTitle = (posterData.title || 'course_poster')
      .replace(/[^a-zA-Z0-9가-힣]/g, '_')
      .slice(0, 30);
    link.download = `KFSSEC_Poster_${safeTitle}.png`;
    link.href = dataUrl;
    link.click();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-fadeIn font-sans text-gray-900">
      <div className="relative w-full max-w-6xl max-h-[94vh] bg-stone-900 rounded-3xl border border-stone-700 shadow-2xl flex flex-col overflow-hidden text-white">
        
        {/* Header Bar */}
        <div className="p-5 sm:p-6 border-b border-stone-800 flex items-center justify-between bg-stone-950/80">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-stone-950 text-[11px] font-black tracking-wider uppercase flex items-center gap-1 shadow-sm">
                <Sparkles className="w-3.5 h-3.5" />
                AI Course Poster Studio
              </span>
              <span className="text-xs text-emerald-400 font-bold hidden sm:inline">
                사단법인 한국외식창업교육원
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-black text-white tracking-tight">
              강좌 내용 기반 AI 홍보 포스터 디자인 생성기
            </h2>
            <p className="text-xs text-stone-400 font-medium">
              강좌명과 상세 커리큘럼을 분석하여 고해상도(800 × 1066 px, 3:4) 공식 포스터를 자동 생성하고 강좌 대표 이미지로 즉시 적용합니다.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Workstation Body (Split 2 Columns) */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 bg-stone-900">
          
          {/* LEFT COLUMN: Controls & Fine-tuning Form */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Step 1: Design Theme Selector */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-black text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Palette className="w-4 h-4" />
                  <span>1. 외식창업 전문 디자인 테마 (6종)</span>
                </label>
                <button
                  type="button"
                  onClick={handleReAnalyze}
                  disabled={isSynthesizing}
                  className="text-xs text-stone-400 hover:text-amber-400 flex items-center gap-1 font-bold transition-colors cursor-pointer"
                >
                  <RotateCcw className={`w-3.5 h-3.5 ${isSynthesizing ? 'animate-spin' : ''}`} />
                  <span>카피 자동 재추출</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {POSTER_THEMES.map((theme) => {
                  const isSelected = selectedThemeId === theme.id;
                  return (
                    <button
                      key={theme.id}
                      type="button"
                      onClick={() => setSelectedThemeId(theme.id)}
                      className={`p-3 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'border-amber-400 bg-stone-800 shadow-md ring-1 ring-amber-400/40'
                          : 'border-stone-800 bg-stone-950/60 hover:border-stone-700 hover:bg-stone-800/60'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-white/20 shrink-0"
                          style={{ backgroundColor: theme.accentColor }}
                        />
                        <h4 className="text-xs font-black text-white truncate">
                          {theme.name.split('(')[0]}
                        </h4>
                      </div>
                      <p className="text-[10px] text-stone-400 mt-1 line-clamp-1">
                        {theme.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Content Fine-tuning Form */}
            <div className="space-y-3.5 bg-stone-950/70 p-4 sm:p-5 rounded-2xl border border-stone-800 text-xs">
              <div className="flex items-center justify-between border-b border-stone-800 pb-2">
                <label className="font-black text-stone-200 flex items-center gap-1.5">
                  <Sliders className="w-4 h-4 text-emerald-400" />
                  <span>2. 포스터 카피라이팅 & 세부 정보 조정</span>
                </label>
                <span className="text-[10px] text-stone-500 font-mono">수정 시 캔버스 즉시 동기화</span>
              </div>

              {/* Title & Hook */}
              <div className="space-y-1.5">
                <label className="font-bold text-stone-300">포스터 메인 타이틀</label>
                <input
                  type="text"
                  value={posterData.title}
                  onChange={(e) =>
                    setPosterData({ ...posterData, title: e.target.value })
                  }
                  className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3 py-2 text-white font-black text-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-stone-300">핵심 후킹 서브카피</label>
                <input
                  type="text"
                  value={posterData.hook}
                  onChange={(e) =>
                    setPosterData({ ...posterData, hook: e.target.value })
                  }
                  className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3 py-2 text-amber-300 font-bold text-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* 3 Core Highlights */}
              <div className="space-y-2 pt-1">
                <label className="font-bold text-stone-300 block">
                  핵심 교육 커리큘럼 3대 포인트
                </label>
                {(posterData.highlights || []).map((highlight, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-amber-400/20 text-amber-400 text-[10px] font-black flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <input
                      type="text"
                      value={highlight}
                      onChange={(e) => {
                        const next = [...posterData.highlights];
                        next[idx] = e.target.value;
                        setPosterData({ ...posterData, highlights: next });
                      }}
                      className="flex-1 bg-stone-900 border border-stone-700 rounded-xl px-3 py-1.5 text-stone-200 text-xs font-medium focus:outline-none focus:border-amber-400"
                    />
                  </div>
                ))}
              </div>

              {/* Metadata Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="space-y-1">
                  <label className="font-bold text-stone-300">지도 교수 / 명장</label>
                  <input
                    type="text"
                    value={posterData.instructor}
                    onChange={(e) =>
                      setPosterData({ ...posterData, instructor: e.target.value })
                    }
                    className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3 py-1.5 text-xs text-white font-bold focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-stone-300">개강 일정</label>
                  <input
                    type="text"
                    value={posterData.schedule}
                    onChange={(e) =>
                      setPosterData({ ...posterData, schedule: e.target.value })
                    }
                    className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3 py-1.5 text-xs text-white font-bold focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-stone-300">수강료 표기</label>
                  <input
                    type="text"
                    value={posterData.priceTag}
                    onChange={(e) =>
                      setPosterData({ ...posterData, priceTag: e.target.value })
                    }
                    className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3 py-1.5 text-xs text-emerald-400 font-bold focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-stone-300">장학 혜택 문구</label>
                  <input
                    type="text"
                    value={posterData.benefitTag}
                    onChange={(e) =>
                      setPosterData({ ...posterData, benefitTag: e.target.value })
                    }
                    className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3 py-1.5 text-xs text-amber-300 font-bold focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Live Canvas Preview & Action Bar */}
          <div className="lg:col-span-6 flex flex-col items-center justify-between space-y-4">
            
            <div className="w-full flex items-center justify-between border-b border-stone-800 pb-2">
              <span className="text-xs font-black text-stone-300 flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-emerald-400" />
                <span>실시간 고해상도 포스터 미리보기 (800 × 1066 px)</span>
              </span>
              <span className="text-[11px] font-mono text-stone-400">
                테마: {currentTheme.name.split('(')[0]}
              </span>
            </div>

            {/* CANVAS PREVIEW WRAPPER */}
            <div className="w-full flex items-center justify-center p-2 bg-stone-950 rounded-2xl border border-stone-800 overflow-hidden shadow-inner">
              <canvas
                ref={canvasRef}
                className="w-auto max-h-[520px] max-w-full rounded-xl shadow-2xl border border-stone-800 object-contain"
              />
            </div>

            {/* ACTION BUTTONS TOOLBAR */}
            <div className="w-full space-y-2 pt-2">
              <div className="flex flex-col sm:flex-row items-center gap-2.5">
                <button
                  type="button"
                  onClick={handleApply}
                  className="flex-1 w-full py-3.5 px-5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-stone-950 font-black text-xs sm:text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  {appliedSuccess ? (
                    <>
                      <Check className="w-4 h-4 text-stone-950" />
                      <span>강좌 대표 이미지로 적용 완료!</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4 text-stone-950" />
                      <span>강좌 대표 포스터로 즉시 적용</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleDownload}
                  className="w-full sm:w-auto py-3.5 px-4 bg-stone-800 hover:bg-stone-700 text-white font-bold text-xs rounded-xl border border-stone-700 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4 text-amber-400" />
                  <span>고화질 PNG 다운로드</span>
                </button>
              </div>

              <p className="text-[11px] text-stone-400 text-center font-medium">
                * [즉시 적용]을 클릭하면 현재 편집 중인 강좌의 커버 이미지로 즉시 치환됩니다.
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
