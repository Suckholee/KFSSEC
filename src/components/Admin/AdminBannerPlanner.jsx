import React, { useState } from 'react';
import {
  Sparkles,
  Layers,
  Copy,
  CheckCircle,
  ExternalLink,
  Send,
  Eye,
  RefreshCw,
  Palette,
  FileText,
  Sliders,
  Maximize2,
  Calendar,
  AlertCircle,
  Check,
  ChevronRight,
  Info,
} from 'lucide-react';
import {
  BANNER_SPECS,
  PRESET_THEMES,
  generateCustomBanner,
  generateDesignerBrief,
} from '../../services/bannerGenerator';

export default function AdminBannerPlanner({
  siteData = {},
  onUpdateSiteData,
  onApplyToLiveBanner,
}) {
  // Selected Spec ID
  const [selectedSpecId, setSelectedSpecId] = useState('top_strip');
  // Selected Theme ID (or 'custom')
  const [selectedThemeId, setSelectedThemeId] = useState('early_bird');

  // Custom Prompt Input
  const [customPrompt, setCustomPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // Active Working Banner State
  const initialPreset = PRESET_THEMES[0];
  const [bannerData, setBannerData] = useState({
    badgeText: siteData?.banner?.badgeText || initialPreset.badgeText,
    title: siteData?.banner?.title || initialPreset.title,
    subtitle: siteData?.banner?.subtitle || initialPreset.subtitle,
    dDay: siteData?.banner?.dDay || initialPreset.dDay,
    buttonText: siteData?.banner?.buttonText || initialPreset.buttonText,
    palette: initialPreset.palette,
    designGuide: initialPreset.designGuide,
  });

  // Feedback states
  const [copiedBrief, setCopiedBrief] = useState(false);
  const [copiedText, setCopiedText] = useState(false);
  const [applySuccess, setApplySuccess] = useState(false);
  const [showBriefModal, setShowBriefModal] = useState(false);

  const currentSpec = BANNER_SPECS.find((s) => s.id === selectedSpecId) || BANNER_SPECS[0];

  // Select Preset Handler
  const handleSelectPreset = (preset) => {
    setSelectedThemeId(preset.id);
    setBannerData({
      badgeText: preset.badgeText,
      title: preset.title,
      subtitle: preset.subtitle,
      dDay: preset.dDay,
      buttonText: preset.buttonText,
      palette: preset.palette,
      designGuide: preset.designGuide,
    });
  };

  // AI Generator Handler
  const handleGenerateAI = () => {
    if (!customPrompt.trim()) {
      alert('생성할 행사나 프로모션의 핵심 키워드를 입력해주세요.\n예: 가을맞이 디저트 카페 창업 실전반 50% 국비지원');
      return;
    }
    setIsGenerating(true);
    setTimeout(() => {
      const generated = generateCustomBanner(customPrompt);
      setSelectedThemeId('custom');
      setBannerData({
        badgeText: generated.badgeText,
        title: generated.title,
        subtitle: generated.subtitle,
        dDay: generated.dDay,
        buttonText: generated.buttonText,
        palette: generated.palette,
        designGuide: generated.designGuide,
      });
      setIsGenerating(false);
    }, 700);
  };

  // 1-Click Apply to Live Website Top Strip Banner
  const handleApplyToLive = () => {
    const updatedBanner = {
      active: true,
      badgeText: bannerData.badgeText,
      title: bannerData.title,
      subtitle: bannerData.subtitle,
      dDay: bannerData.dDay,
      buttonText: bannerData.buttonText,
    };

    if (onApplyToLiveBanner) {
      onApplyToLiveBanner(updatedBanner);
    } else if (onUpdateSiteData) {
      onUpdateSiteData({
        ...siteData,
        banner: updatedBanner,
      });
    }

    setApplySuccess(true);
    setTimeout(() => setApplySuccess(false), 4000);
  };

  // Copy Handover Brief to Clipboard
  const handleCopyBrief = () => {
    const brief = generateDesignerBrief(bannerData, currentSpec);
    navigator.clipboard.writeText(brief).then(() => {
      setCopiedBrief(true);
      setTimeout(() => setCopiedBrief(false), 3000);
    });
  };

  // Copy plain text copy
  const handleCopyTextOnly = () => {
    const plain = `[${bannerData.badgeText}]\n헤드라인: ${bannerData.title}\n서브카피: ${bannerData.subtitle}\n일정/D-Day: ${bannerData.dDay}\n버튼 CTA: ${bannerData.buttonText}`;
    navigator.clipboard.writeText(plain).then(() => {
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 3000);
    });
  };

  return (
    <div className="space-y-6 font-sans text-gray-900 animate-fadeIn">
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-emerald-950 via-stone-900 to-emerald-900 text-white rounded-3xl p-6 sm:p-8 border border-emerald-800/40 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-full bg-emerald-500/10 blur-3xl rounded-full pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-amber-400 text-stone-950 text-[11px] font-black tracking-wider uppercase flex items-center gap-1 shadow-sm">
                <Sparkles className="w-3.5 h-3.5" />
                AI Content & Spec Studio
              </span>
              <span className="text-xs text-emerald-300 font-bold">
                사단법인 한국외식창업교육원
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              행사 띠배너 & 비주얼 카피 기획 생성기
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 max-w-2xl leading-relaxed">
              정해진 배너 규격(와이드 띠배너, 프로모션, 팝업, SNS)에 최적화된 마케팅 헤드라인과 서브카피를 자동 기획합니다. 클릭 한 번으로 메인 홈페이지에 즉시 송출하거나 디자이너 제작 의뢰서로 내보낼 수 있습니다.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={handleApplyToLive}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 font-black text-xs sm:text-sm shadow-lg transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <CheckCircle className="w-4 h-4 text-stone-950" />
              <span>홈페이지 띠배너 즉시 적용</span>
            </button>
            <button
              onClick={handleCopyBrief}
              className="px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              {copiedBrief ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-300">의뢰서 복사됨!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>디자이너 의뢰서 복사</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Success Notification Bar */}
      {applySuccess && (
        <div className="bg-emerald-50 border-2 border-emerald-500 text-emerald-950 p-4 rounded-2xl flex items-center justify-between gap-3 shadow-md animate-fadeIn">
          <div className="flex items-center gap-2.5">
            <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
            <div className="text-xs font-black">
              홈페이지 최상단 행사 띠배너에 방금 기획한 내용이 실시간 반영되었습니다! 메인 화면 상단에서 바로 확인하실 수 있습니다.
            </div>
          </div>
          <span className="px-2.5 py-1 bg-emerald-600 text-white text-[11px] font-black rounded-lg shrink-0">
            LIVE 반영 완료
          </span>
        </div>
      )}

      {/* STEP 1: SPECIFICATION SELECTOR */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black flex items-center justify-center">
              1
            </span>
            <h3 className="text-sm sm:text-base font-black text-gray-900">
              배너 규격 및 송출 채널 선택
            </h3>
          </div>
          <span className="text-xs text-gray-400 font-bold">
            선택된 규격: {currentSpec.width} × {currentSpec.height} px ({currentSpec.aspectRatio})
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {BANNER_SPECS.map((spec) => {
            const isSelected = spec.id === selectedSpecId;
            return (
              <button
                key={spec.id}
                onClick={() => setSelectedSpecId(spec.id)}
                className={`p-4 rounded-2xl text-left border-2 transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-emerald-600 bg-emerald-50/50 shadow-md ring-2 ring-emerald-500/20'
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50/60'
                }`}
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-black px-2 py-0.5 rounded-md ${
                        isSelected
                          ? 'bg-emerald-600 text-white'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {spec.width} × {spec.height} px
                    </span>
                    <span className="text-[11px] font-mono text-gray-400 font-bold">
                      {spec.aspectRatio}
                    </span>
                  </div>
                  <h4 className="text-sm font-black text-gray-900 pt-1">
                    {spec.name}
                  </h4>
                  <p className="text-[11px] text-gray-500 leading-snug line-clamp-2">
                    {spec.description}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-gray-100/80 text-[10px] text-emerald-700 font-bold flex items-center gap-1">
                  <span>추천:</span>
                  <span className="truncate">{spec.recommendedUse}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* STEP 2: PRESET THEME OR AI GENERATOR */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: 6 Core Presets & AI Topic Generator */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-gray-200 shadow-sm space-y-6">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
            <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black flex items-center justify-center">
              2
            </span>
            <h3 className="text-sm sm:text-base font-black text-gray-900">
              기획 테마 선택 & AI 맞춤 생성
            </h3>
          </div>

          {/* AI Custom Prompt Input */}
          <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black text-gray-900 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>AI 자유 키워드 기획 생성</span>
              </label>
              <span className="text-[10px] text-gray-500 font-bold">자유 입력</span>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="예: 가을맞이 디저트 창업 특강 선착순 50% 국비지원"
                className="flex-1 bg-white border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 font-bold placeholder-gray-400 focus:outline-none focus:border-emerald-500"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleGenerateAI();
                }}
              />
              <button
                type="button"
                onClick={handleGenerateAI}
                disabled={isGenerating}
                className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-black text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 shrink-0 cursor-pointer disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>생성중...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>AI 생성</span>
                  </>
                )}
              </button>
            </div>
            <p className="text-[10px] text-gray-500 leading-relaxed">
              * 키워드를 입력하시면 타겟 독자, 혜택, 마감일, 추천 컬러가 배너 규격에 맞게 자동 합성됩니다.
            </p>
          </div>

          {/* 6 Core Presets */}
          <div className="space-y-2.5">
            <label className="text-xs font-black text-gray-800 block">
              추천 외식창업 핵심 이벤트 프리셋 (6종)
            </label>
            <div className="space-y-2">
              {PRESET_THEMES.map((preset) => {
                const isSelected = selectedThemeId === preset.id;
                return (
                  <button
                    key={preset.id}
                    onClick={() => handleSelectPreset(preset)}
                    className={`w-full p-3 rounded-xl text-left border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-black shadow-xs ring-1 ring-emerald-500/20'
                        : 'border-gray-200 bg-white hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span
                        className="w-3.5 h-3.5 rounded-full shrink-0 border border-black/10"
                        style={{ backgroundColor: preset.palette.accentBg }}
                      />
                      <div className="truncate">
                        <div className="text-xs font-black truncate">
                          {preset.name}
                        </div>
                        <div className="text-[10px] text-gray-500 truncate">
                          {preset.title}
                        </div>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 text-[10px] font-bold shrink-0">
                      {preset.tag}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Live Interactive Visual Canvas */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border border-gray-200 shadow-sm space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black flex items-center justify-center">
                  3
                </span>
                <h3 className="text-sm sm:text-base font-black text-gray-900">
                  실시간 비주얼 배너 캔버스
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono px-2 py-0.5 bg-gray-100 rounded-md text-gray-600 font-bold">
                  {currentSpec.name} ({currentSpec.width} × {currentSpec.height})
                </span>
              </div>
            </div>

            {/* VISUAL CANVAS CONTAINER */}
            <div className="bg-stone-100/90 p-4 sm:p-6 rounded-2xl border border-stone-200/80 flex items-center justify-center min-h-[300px]">
              
              {/* SPEC 1: TOP STRIP (1920 x 100) */}
              {selectedSpecId === 'top_strip' && (
                <div
                  className={`w-full bg-gradient-to-r ${bannerData.palette.bgGradient} text-white p-4 sm:p-5 rounded-xl ${bannerData.palette.borderStyle} shadow-lg transition-all flex flex-col md:flex-row md:items-center justify-between gap-3`}
                >
                  <div className="space-y-1 min-w-0">
                    <div
                      className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black tracking-tight"
                      style={{
                        backgroundColor: bannerData.palette.accentBg,
                        color: bannerData.palette.accentText,
                      }}
                    >
                      {bannerData.badgeText}
                    </div>
                    <h4 className="text-base sm:text-lg font-black text-white truncate tracking-tight">
                      {bannerData.title}
                    </h4>
                    <p className="text-xs text-white/80 truncate">
                      {bannerData.subtitle}
                    </p>
                  </div>
                  <div className="flex items-center gap-2.5 shrink-0 self-end md:self-center">
                    <span className="px-3 py-1 rounded-xl bg-rose-600 text-white font-mono font-black text-xs shadow-xs">
                      {bannerData.dDay}
                    </span>
                    <span
                      className="px-4 py-2 rounded-xl font-black text-xs shadow-sm"
                      style={{
                        backgroundColor: bannerData.palette.accentBg,
                        color: bannerData.palette.accentText,
                      }}
                    >
                      {bannerData.buttonText}
                    </span>
                  </div>
                </div>
              )}

              {/* SPEC 2: WIDE PROMO (1200 x 360) */}
              {selectedSpecId === 'wide_promo' && (
                <div
                  className={`w-full max-w-2xl bg-gradient-to-br ${bannerData.palette.bgGradient} text-white p-6 sm:p-8 rounded-2xl ${bannerData.palette.borderStyle} shadow-xl transition-all space-y-4`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-black"
                      style={{
                        backgroundColor: bannerData.palette.accentBg,
                        color: bannerData.palette.accentText,
                      }}
                    >
                      {bannerData.badgeText}
                    </span>
                    <span className="px-3 py-1 rounded-xl bg-rose-600 text-white font-mono font-black text-xs">
                      {bannerData.dDay}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug">
                      {bannerData.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
                      {bannerData.subtitle}
                    </p>
                  </div>
                  <div className="pt-2 flex items-center justify-between border-t border-white/10">
                    <div className="text-[11px] text-stone-300 font-medium">
                      사단법인 한국외식창업교육원 공식 인가 프로그램
                    </div>
                    <button
                      type="button"
                      className="px-5 py-2.5 rounded-xl font-black text-xs shadow-lg"
                      style={{
                        backgroundColor: bannerData.palette.accentBg,
                        color: bannerData.palette.accentText,
                      }}
                    >
                      {bannerData.buttonText}
                    </button>
                  </div>
                </div>
              )}

              {/* SPEC 3: POPUP SQUARE (600 x 600) */}
              {selectedSpecId === 'popup_square' && (
                <div
                  className={`w-full max-w-xs sm:max-w-sm aspect-square bg-gradient-to-b ${bannerData.palette.bgGradient} text-white p-6 sm:p-7 rounded-3xl ${bannerData.palette.borderStyle} shadow-2xl transition-all flex flex-col justify-between relative overflow-hidden`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span
                        className="px-2.5 py-0.5 rounded-md text-[10px] font-black"
                        style={{
                          backgroundColor: bannerData.palette.accentBg,
                          color: bannerData.palette.accentText,
                        }}
                      >
                        공식 공지 모달
                      </span>
                      <span className="w-5 h-5 rounded-full bg-white/20 text-white flex items-center justify-center text-xs font-bold">
                        ✕
                      </span>
                    </div>
                    <div className="inline-block px-2.5 py-1 rounded-lg bg-black/40 text-[10px] text-stone-300 font-bold border border-white/10">
                      {bannerData.badgeText}
                    </div>
                    <h4 className="text-lg sm:text-xl font-black text-white tracking-tight leading-snug">
                      {bannerData.title}
                    </h4>
                    <p className="text-xs text-stone-300 leading-relaxed">
                      {bannerData.subtitle}
                    </p>
                  </div>

                  <div className="space-y-3 pt-3">
                    <div className="bg-black/30 p-2.5 rounded-xl border border-white/10 text-center">
                      <span className="text-[11px] font-mono text-amber-300 font-black">
                        마감 일정: {bannerData.dDay}
                      </span>
                    </div>
                    <button
                      type="button"
                      className="w-full py-3 rounded-xl font-black text-xs shadow-lg text-center"
                      style={{
                        backgroundColor: bannerData.palette.accentBg,
                        color: bannerData.palette.accentText,
                      }}
                    >
                      {bannerData.buttonText}
                    </button>
                  </div>
                </div>
              )}

              {/* SPEC 4: SNS CARD (1080 x 1080) */}
              {selectedSpecId === 'sns_card' && (
                <div
                  className={`w-full max-w-xs sm:max-w-sm aspect-square bg-gradient-to-br ${bannerData.palette.bgGradient} text-white p-6 sm:p-7 rounded-2xl ${bannerData.palette.borderStyle} shadow-2xl transition-all flex flex-col justify-between border-4`}
                >
                  <div className="flex items-center justify-between border-b border-white/15 pb-2.5">
                    <div className="text-[11px] font-black tracking-widest text-amber-300">
                      KFSSEC · K-FOOD
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/20 text-white font-mono">
                      #사단법인
                    </span>
                  </div>

                  <div className="space-y-2.5 my-auto py-2">
                    <div
                      className="inline-block px-2.5 py-0.5 rounded-md text-[10px] font-black"
                      style={{
                        backgroundColor: bannerData.palette.accentBg,
                        color: bannerData.palette.accentText,
                      }}
                    >
                      {bannerData.badgeText}
                    </div>
                    <h4 className="text-xl font-black text-white tracking-tight leading-tight">
                      {bannerData.title}
                    </h4>
                    <p className="text-xs text-stone-200 line-clamp-3 leading-relaxed">
                      {bannerData.subtitle}
                    </p>
                  </div>

                  <div className="space-y-2 border-t border-white/15 pt-2.5">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-stone-300 font-mono">
                        {bannerData.dDay}
                      </span>
                      <span
                        className="px-2.5 py-1 rounded-lg text-[10px] font-black"
                        style={{
                          backgroundColor: bannerData.palette.accentBg,
                          color: bannerData.palette.accentText,
                        }}
                      >
                        {bannerData.buttonText}
                      </span>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Spec & Palette Metadata Bar */}
            <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <Palette className="w-4 h-4 text-emerald-700" />
                <span className="font-black text-gray-800">
                  {bannerData.palette.name}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyTextOnly}
                  className="text-stone-600 hover:text-stone-900 font-bold flex items-center gap-1 cursor-pointer"
                >
                  {copiedText ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">카피 복사완료</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>카피 문구만 복사</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* STEP 3: INLINE COPYWRITING & SPECS EDITOR */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-200 shadow-sm space-y-5">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black flex items-center justify-center">
              4
            </span>
            <h3 className="text-sm sm:text-base font-black text-gray-900">
              배너 카피 세부 편집 & 디자이너 전달 가이드
            </h3>
          </div>
          <button
            onClick={() => setShowBriefModal(true)}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>디자이너 전달 의뢰서 전문 미리보기</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="space-y-1.5 md:col-span-2">
            <label className="font-black text-gray-700">상단 뱃지 문구 (소제목 / 소속기관 명시)</label>
            <input
              type="text"
              value={bannerData.badgeText}
              onChange={(e) =>
                setBannerData({ ...bannerData, badgeText: e.target.value })
              }
              className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2.5 text-gray-900 font-bold focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="space-y-1.5 md:col-span-2">
            <label className="font-black text-gray-700">메인 헤드라인 타이틀</label>
            <input
              type="text"
              value={bannerData.title}
              onChange={(e) =>
                setBannerData({ ...bannerData, title: e.target.value })
              }
              className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2.5 text-gray-900 font-bold focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="space-y-1.5 md:col-span-2">
            <label className="font-black text-gray-700">서브타이틀 상세 설명 카피</label>
            <input
              type="text"
              value={bannerData.subtitle}
              onChange={(e) =>
                setBannerData({ ...bannerData, subtitle: e.target.value })
              }
              className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2.5 text-gray-900 font-bold focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-black text-gray-700">D-Day 마감 카운트 문구</label>
            <input
              type="text"
              value={bannerData.dDay}
              onChange={(e) =>
                setBannerData({ ...bannerData, dDay: e.target.value })
              }
              className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2.5 text-gray-900 font-bold focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-black text-gray-700">우측 액션 버튼 문구 (CTA)</label>
            <input
              type="text"
              value={bannerData.buttonText}
              onChange={(e) =>
                setBannerData({ ...bannerData, buttonText: e.target.value })
              }
              className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2.5 text-gray-900 font-bold focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Design Guide Box */}
        <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-2 text-xs">
          <div className="font-black text-stone-900 flex items-center gap-1.5">
            <Info className="w-4 h-4 text-emerald-700" />
            <span>디자이너 비주얼 가이드라인 요약</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-stone-700 font-medium">
            <div className="bg-white p-3 rounded-xl border border-stone-200">
              <span className="font-black text-stone-900 block mb-1">분위기 및 무드</span>
              <p className="text-[11px] leading-relaxed">{bannerData.designGuide.mood}</p>
            </div>
            <div className="bg-white p-3 rounded-xl border border-stone-200">
              <span className="font-black text-stone-900 block mb-1">그래픽 시각 요소</span>
              <p className="text-[11px] leading-relaxed">{bannerData.designGuide.visualElements}</p>
            </div>
            <div className="bg-white p-3 rounded-xl border border-stone-200">
              <span className="font-black text-stone-900 block mb-1">타이포그래피 지침</span>
              <p className="text-[11px] leading-relaxed">{bannerData.designGuide.typography}</p>
            </div>
          </div>
        </div>
      </div>

      {/* DESIGNER BRIEF MODAL */}
      {showBriefModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-stone-200 animate-scaleUp">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black text-gray-900">
                  디자이너 작업 의뢰서 (Markdown Brief)
                </h3>
                <p className="text-xs text-gray-500">
                  Figma / Photoshop 디자이너에게 바로 전달할 수 있는 상세 규격 명세서입니다.
                </p>
              </div>
              <button
                onClick={() => setShowBriefModal(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="p-6 overflow-y-auto flex-1 font-mono text-xs bg-stone-950 text-stone-200 rounded-b-2xl whitespace-pre-wrap leading-relaxed">
              {generateDesignerBrief(bannerData, currentSpec)}
            </div>
            <div className="p-4 border-t border-gray-100 flex justify-end gap-2 bg-stone-50 rounded-b-3xl">
              <button
                onClick={handleCopyBrief}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs flex items-center gap-1.5 cursor-pointer"
              >
                {copiedBrief ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>의뢰서 복사 완료!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>의뢰서 클립보드 복사</span>
                  </>
                )}
              </button>
              <button
                onClick={() => setShowBriefModal(false)}
                className="px-4 py-2.5 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold text-xs cursor-pointer"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
