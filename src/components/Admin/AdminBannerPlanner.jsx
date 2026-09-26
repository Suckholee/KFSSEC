import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Layers,
  CheckCircle,
  ExternalLink,
  Sliders,
  ChevronRight,
  ChevronLeft,
  Upload,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Image as ImageIcon,
  Type,
  Eye,
  Download,
  Wand2,
} from 'lucide-react';
import { DEFAULT_HERO_BANNERS } from '../Hero';
import {
  QUICK_PROMPTS,
  renderHeroBannerCanvas,
} from '../../services/heroBannerSynthesizer';

// Gallery of institution high-res images for banner backgrounds
const PRESET_GALLERY_IMAGES = [
  {
    label: '👑 명장 단체 화보 (2번 화보)',
    url: '/images/hero_banner_fearless.png',
  },
  {
    label: '🎓 명인·명장 교수진 와이드',
    url: '/images/main_banner_masters.png',
  },
  {
    label: '🍳 특급 셰프 조리 실전 (불쇼)',
    url: '/images/chef_tossing_food.jpg',
  },
  {
    label: '🍷 100년 전통 발효 소스 시연',
    url: '/images/course_menu_dev.jpg',
  },
  {
    label: '☕ 카페 바리스타 & 라떼아트',
    url: '/images/course_cafe.jpg',
  },
  {
    label: '🏢 외식 매장 & 다이닝 공간',
    url: '/images/course_restaurant.jpg',
  },
];

// 5 Rich 'Pretty Banner' Presets matching Image 2
const PRESET_BANNER_TEMPLATES = [
  {
    id: 'preset_fearless',
    title: '외식 창업이 두려운가?',
    subtitle: '한국외식창업교육원에서 성공으로 이끌어 드립니다.',
    imageUrl: '/images/hero_banner_fearless.png',
    imageOnly: true,
    overlayDim: 0,
    tag: '사단법인 한국외식창업교육원',
    buttonText: '교육과정 둘러보기',
    buttonLink: 'catalog',
    badge: '👑 2번 화보 (추천 1위)',
  },
  {
    id: 'preset_masters',
    title: '꿈꾸는 외식창업 아무에게나 맡기시겠습니까?',
    subtitle: '오랜 현장실무경험과 실력을 갖춘 명인, 명장님께 맡겨주세요!',
    imageUrl: '/images/main_banner_masters.png',
    imageOnly: true,
    overlayDim: 0,
    tag: '대한민국 명인·명장 교수진',
    buttonText: '명문 교수진 소개',
    buttonLink: 'about',
    badge: '🎓 전통 헤리티지',
  },
  {
    id: 'preset_chef_pro',
    title: '특급호텔 40년 명장의 1:1 직강 비법 전수',
    subtitle: '100년 전통 발효 소스부터 1인 주방 최적화 동선 설계까지 실전 솔루션',
    imageUrl: '/images/chef_tossing_food.jpg',
    imageOnly: false,
    overlayDim: 55,
    tag: '대한민국 조리명장 제1호 직강',
    buttonText: '1:1 맞춤 상담 신청',
    buttonLink: 'community',
    badge: '🍳 실전 조리 비법',
  },
  {
    id: 'preset_menu_dev',
    title: '100년 전통 발효 레시피 & 창업 실무 직강',
    subtitle: '대용량 맛 표준화부터 특허 소스 전수까지 외식업 시그니처 메뉴',
    imageUrl: '/images/course_menu_dev.jpg',
    imageOnly: false,
    overlayDim: 60,
    tag: '시그니처 메뉴 개발',
    buttonText: '교육과정 둘러보기',
    buttonLink: 'catalog',
    badge: '🍷 메뉴 개발 특화',
  },
  {
    id: 'preset_restaurant',
    title: '실패 없는 외식 비즈니스 & 프랜차이즈 턴어라운드',
    subtitle: '소상공인 실전 컨설팅 및 정부 정책자금 무상환 연계 지원',
    imageUrl: '/images/course_restaurant.jpg',
    imageOnly: false,
    overlayDim: 60,
    tag: '정부지원금 연계 창업',
    buttonText: '창업 컨설팅 문의',
    buttonLink: 'community',
    badge: '🏢 비즈니스 인큐베이팅',
  },
];

export default function AdminBannerPlanner({
  siteData = {},
  onUpdateSiteData,
}) {
  const initialBanners =
    siteData?.heroBanners && siteData.heroBanners.length > 0
      ? siteData.heroBanners
      : DEFAULT_HERO_BANNERS;

  const [slides, setSlides] = useState(initialBanners);
  const [selectedSlideId, setSelectedSlideId] = useState(initialBanners[0]?.id || 'banner_fearless');
  const [inspectorTab, setInspectorTab] = useState('image'); // 'image' | 'text'
  const [saveSuccess, setSaveSuccess] = useState(false);
  const fileInputRef = useRef(null);

  // AI Prompt State
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiStyle, setAiStyle] = useState('masters');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedSuccessMsg, setGeneratedSuccessMsg] = useState('');

  useEffect(() => {
    if (siteData?.heroBanners && siteData.heroBanners.length > 0) {
      setSlides(siteData.heroBanners);
    }
  }, [siteData]);

  const currentSlide =
    slides.find((s) => s.id === selectedSlideId) || slides[0] || DEFAULT_HERO_BANNERS[0];
  const currentSlideIndex = slides.findIndex((s) => s.id === currentSlide.id);

  const updateCurrentSlide = (field, value) => {
    setSlides((prev) =>
      prev.map((s) => (s.id === currentSlide.id ? { ...s, [field]: value } : s))
    );
  };

  const handleApplyPreset = (preset) => {
    setSlides((prev) =>
      prev.map((s) =>
        s.id === currentSlide.id
          ? {
              ...s,
              title: preset.title,
              subtitle: preset.subtitle,
              imageUrl: preset.imageUrl,
              imageOnly: preset.imageOnly,
              overlayDim: preset.overlayDim,
              tag: preset.tag,
              buttonText: preset.buttonText,
              buttonLink: preset.buttonLink,
            }
          : s
      )
    );
  };

  // AI Generation Handler from Prompt
  const handleGenerateFromPrompt = async () => {
    const promptToUse = aiPrompt.trim() || '특급호텔 40년 조리명장의 비법 스테이크와 와인 페어링 창업 실무';
    setIsGenerating(true);
    setGeneratedSuccessMsg('');

    try {
      const result = await renderHeroBannerCanvas({
        prompt: promptToUse,
        style: aiStyle,
      });

      const newId = `banner_ai_${Date.now()}`;
      const newSlide = {
        id: newId,
        title: result.headline,
        subtitle: result.subtitle,
        imageUrl: result.dataUrl,
        imageOnly: true, // Complete 2296x640 baked graphic matching Image 2!
        active: true,
        overlayDim: 0,
        tag: result.badge,
        buttonText: '교육과정 둘러보기',
        buttonLink: 'catalog',
      };

      // Add to beginning of slides so it becomes the primary active slide!
      setSlides([newSlide, ...slides]);
      setSelectedSlideId(newId);
      setGeneratedSuccessMsg(`✨ 2번 규격(2296×640)에 맞춘 고화질 배너가 새로 생성되었습니다!`);
      setTimeout(() => setGeneratedSuccessMsg(''), 4000);
    } catch (err) {
      console.error('Failed to generate banner:', err);
      alert('배너 생성 중 오류가 발생했습니다. 다시 시도해 주세요.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAddNewSlide = () => {
    const newId = `banner_${Date.now()}`;
    const newSlide = {
      id: newId,
      title: '외식 창업이 두려운가?',
      subtitle: '한국외식창업교육원에서 성공으로 이끌어 드립니다.',
      imageUrl: '/images/hero_banner_fearless.png',
      imageOnly: true,
      active: true,
      overlayDim: 0,
      tag: '사단법인 한국외식창업교육원',
      buttonText: '교육과정 둘러보기',
      buttonLink: 'catalog',
    };
    setSlides([...slides, newSlide]);
    setSelectedSlideId(newId);
  };

  const handleDeleteSlide = (id) => {
    if (slides.length <= 1) {
      alert('최소 1개의 배너 슬라이드는 유지되어야 합니다.');
      return;
    }
    const filtered = slides.filter((s) => s.id !== id);
    setSlides(filtered);
    if (selectedSlideId === id) {
      setSelectedSlideId(filtered[0]?.id);
    }
  };

  const handleToggleActive = (id) => {
    setSlides((prev) =>
      prev.map((s) => (s.id === id ? { ...s, active: !s.active } : s))
    );
  };

  const handleMoveUp = (index) => {
    if (index === 0) return;
    const newSlides = [...slides];
    const temp = newSlides[index - 1];
    newSlides[index - 1] = newSlides[index];
    newSlides[index] = temp;
    setSlides(newSlides);
  };

  const handleMoveDown = (index) => {
    if (index === slides.length - 1) return;
    const newSlides = [...slides];
    const temp = newSlides[index + 1];
    newSlides[index + 1] = newSlides[index];
    newSlides[index] = temp;
    setSlides(newSlides);
  };

  const handleImageFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('이미지 파일(PNG, JPG, WebP)만 업로드할 수 있습니다.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result;
      if (dataUrl) {
        updateCurrentSlide('imageUrl', dataUrl);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDownloadBannerImage = () => {
    if (!currentSlide.imageUrl) return;
    const link = document.createElement('a');
    link.download = `kfssec_hero_banner_${currentSlide.id}.png`;
    link.href = currentSlide.imageUrl;
    link.click();
  };

  const handleSaveToHomepage = () => {
    const updated = {
      ...siteData,
      heroBanners: slides,
    };

    if (onUpdateSiteData) {
      onUpdateSiteData(updated);
    }

    try {
      localStorage.setItem('kfssec_site_data', JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }

    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleCanvasPrev = () => {
    const prevIdx = (currentSlideIndex - 1 + slides.length) % slides.length;
    setSelectedSlideId(slides[prevIdx].id);
  };

  const handleCanvasNext = () => {
    const nextIdx = (currentSlideIndex + 1) % slides.length;
    setSelectedSlideId(slides[nextIdx].id);
  };

  return (
    <div className="space-y-3.5 animate-fadeIn font-sans max-w-7xl mx-auto pb-8">
      
      {/* 1. AI PROMPT BANNER GENERATOR BAR (MATCHING 2296x640 CINEMA SIZE) */}
      <div className="bg-gradient-to-r from-stone-950 via-stone-900 to-black rounded-2xl p-3.5 sm:p-4 border-2 border-[#C5A059] shadow-xl text-white space-y-2.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 border-b border-white/10 pb-2">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-[#C5A059] text-black flex items-center justify-center font-black shrink-0">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-black text-white flex items-center gap-2">
                <span>AI 프롬프트 배너 자동 생성기 (2번 규격 2296 × 640 맞춤 생성)</span>
                <span className="px-2 py-0.5 rounded-full bg-[#C5A059]/20 text-[#D4AF37] border border-[#C5A059]/40 text-[9px] font-mono">
                  Prompt to Cinema Banner
                </span>
              </h3>
            </div>
          </div>
          <span className="text-[11px] text-gray-400">
            원하는 주제를 입력하시면 2번 배너 사이즈에 맞춘 고화질 그래픽 배너를 즉시 생성합니다.
          </span>
        </div>

        {/* Input Form Row */}
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleGenerateFromPrompt()}
              placeholder="생성할 배너 주제 입력 (예: 특급호텔 40년 명장의 비법 스테이크와 와인 페어링 창업 특강)"
              className="w-full pl-3.5 pr-8 py-2 bg-stone-900/90 border border-white/20 focus:border-[#C5A059] rounded-xl text-xs font-bold text-white placeholder-gray-500 focus:outline-none"
            />
            {aiPrompt && (
              <button
                type="button"
                onClick={() => setAiPrompt('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white text-xs"
              >
                ✕
              </button>
            )}
          </div>

          <select
            value={aiStyle}
            onChange={(e) => setAiStyle(e.target.value)}
            className="bg-stone-900 border border-white/20 text-xs font-bold text-[#D4AF37] rounded-xl px-2.5 py-2 focus:outline-none focus:border-[#C5A059] shrink-0"
          >
            <option value="masters">👑 명장 화보 스타일 (2번)</option>
            <option value="chef">🍳 셰프 다이내믹 불쇼 스타일</option>
            <option value="sauce">🍷 100년 발효 비법 전수 스타일</option>
            <option value="cafe">☕ 감성 카페 &amp; 디저트 스타일</option>
            <option value="restaurant">🏢 프랜차이즈 창업 매장 스타일</option>
          </select>

          <button
            type="button"
            onClick={handleGenerateFromPrompt}
            disabled={isGenerating}
            className="px-5 py-2 bg-gradient-to-r from-[#C5A059] via-[#D4AF37] to-[#B38D43] hover:brightness-110 text-black font-black text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer shrink-0 disabled:opacity-50"
          >
            <Wand2 className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
            <span>{isGenerating ? 'AI 배너 생성중...' : '✨ AI 배너 새로 생성하기'}</span>
          </button>
        </div>

        {/* Quick Chips & Success Message */}
        <div className="flex items-center justify-between gap-2 pt-0.5">
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-none text-[10px]">
            <span className="text-gray-400 font-bold shrink-0">추천 예시:</span>
            {QUICK_PROMPTS.map((qp) => (
              <button
                key={qp.label}
                type="button"
                onClick={() => {
                  setAiPrompt(qp.prompt);
                  setAiStyle(qp.style);
                }}
                className="px-2 py-0.5 rounded-md bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors cursor-pointer shrink-0 border border-white/10"
              >
                {qp.label}
              </button>
            ))}
          </div>

          {generatedSuccessMsg && (
            <span className="text-[11px] text-emerald-400 font-bold shrink-0 animate-fadeIn flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>{generatedSuccessMsg}</span>
            </span>
          )}
        </div>
      </div>

      {/* 2. SLIM TOOLBAR (Slide Selector Chips + Action Buttons) */}
      <div className="bg-white p-2.5 rounded-2xl border border-gray-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        
        {/* Slide Switcher Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 scrollbar-thin">
          <span className="text-[11px] font-black text-gray-400 shrink-0 mr-1">슬라이드:</span>
          {slides.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setSelectedSlideId(s.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer shrink-0 flex items-center gap-1.5 ${
                s.id === currentSlide.id
                  ? 'bg-black text-[#D4AF37] shadow-xs ring-1 ring-[#C5A059]'
                  : 'bg-stone-100 hover:bg-stone-200 text-gray-700'
              }`}
            >
              <span className="font-mono text-[11px]">0{idx + 1}</span>
              <span className="truncate max-w-[130px]">{s.title}</span>
              {s.active === false && <span className="text-[9px] text-gray-400 font-normal">(숨김)</span>}
            </button>
          ))}

          <button
            onClick={handleAddNewSlide}
            className="px-2.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-xl text-xs font-black transition-colors cursor-pointer shrink-0 flex items-center gap-1 border border-emerald-200"
            title="새 슬라이더 추가"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>추가</span>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
          <button
            type="button"
            onClick={handleDownloadBannerImage}
            className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-gray-800 text-xs font-bold rounded-xl transition-colors flex items-center gap-1 cursor-pointer"
            title="현재 배너 이미지 파일 다운로드"
          >
            <Download className="w-3.5 h-3.5 text-gray-600" />
            <span>이미지 다운로드</span>
          </button>

          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-gray-800 text-xs font-bold rounded-xl transition-colors flex items-center gap-1"
          >
            <span>사이트 확인</span>
            <ExternalLink className="w-3 h-3 text-gray-500" />
          </a>

          <button
            onClick={handleSaveToHomepage}
            className="px-4 py-1.5 bg-black hover:bg-gray-800 text-white font-black text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer border border-[#C5A059]"
          >
            <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>홈페이지 즉시 반영 저장</span>
          </button>
        </div>
      </div>

      {/* TOAST SUCCESS NOTIFICATION */}
      {saveSuccess && (
        <div className="bg-emerald-950 text-white px-4 py-2 rounded-xl border border-[#C5A059] flex items-center justify-between text-xs animate-fadeIn shadow-sm">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="font-bold">🎉 홈페이지 메인 배너 슬라이더에 실시간으로 반영되었습니다!</span>
          </div>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 py-0.5 bg-[#C5A059] text-black font-black text-[10px] rounded-md hover:bg-amber-400 transition-colors"
          >
            메인 사이트 확인 ↗
          </a>
        </div>
      )}

      {/* 3. 2-COLUMN HIGH-DENSITY SPLIT WORKSPACE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        
        {/* LEFT COLUMN: LIVE CANVASS + TEMPLATES + ROSTER (7 cols) */}
        <div className="lg:col-span-7 space-y-3.5">
          
          {/* COMPACT CINEMA CANVAS PREVIEW */}
          <div className="bg-stone-900 rounded-2xl p-3 sm:p-4 border border-black shadow-md space-y-2">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-black text-white text-[11px]">라이브 캔버스 프리뷰</span>
                <span className="text-[10px] text-gray-400 font-mono">
                  ({currentSlide.imageOnly ? '완성형 그래픽' : '텍스트 오버레이'})
                </span>
              </div>

              <div className="flex items-center gap-2 text-[10px] text-gray-400 font-mono">
                <span>슬라이드 0{currentSlideIndex + 1} / 0{slides.length}</span>
                <span className={currentSlide.active !== false ? 'text-emerald-400 font-bold' : 'text-gray-500'}>
                  {currentSlide.active !== false ? '● 노출중' : '○ 숨김'}
                </span>
              </div>
            </div>

            {/* Canvas Box (Compact Cinema Height ~220px to 250px) */}
            <div className="relative w-full aspect-[21/9] sm:aspect-[2.4/1] max-h-[250px] rounded-xl overflow-hidden bg-black border border-[#C5A059] flex items-center justify-center group/canvas shadow-inner">
              {currentSlide.imageOnly ? (
                /* TYPE 1: GRAPHIC BANNER (Image 2 style) */
                <img
                  src={currentSlide.imageUrl}
                  alt={currentSlide.title}
                  className="w-full h-full object-contain block select-none bg-black"
                />
              ) : (
                /* TYPE 2: CINEMATIC PHOTO + OVERLAY */
                <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                  <img
                    src={currentSlide.imageUrl}
                    alt={currentSlide.title}
                    className="absolute inset-0 w-full h-full object-cover object-center"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30 pointer-events-none"
                    style={{
                      backgroundColor: `rgba(0, 0, 0, ${(currentSlide.overlayDim || 50) / 100})`,
                    }}
                  />
                  <div className="relative z-10 max-w-lg mx-auto px-4 text-center flex flex-col items-center gap-1.5 sm:gap-2">
                    {currentSlide.tag && (
                      <span className="px-2.5 py-0.5 rounded-full bg-[#C5A059] text-black font-black text-[9px] sm:text-[10px] shadow-xs">
                        {currentSlide.tag}
                      </span>
                    )}
                    <h3 className="text-base sm:text-2xl font-black text-white tracking-tight drop-shadow-md leading-tight">
                      {currentSlide.title}
                    </h3>
                    <p className="text-[10px] sm:text-xs text-gray-200 font-medium line-clamp-2 drop-shadow-xs max-w-sm">
                      {currentSlide.subtitle}
                    </p>
                    {currentSlide.buttonText && (
                      <span className="mt-0.5 px-3 py-1 bg-gradient-to-r from-[#0B3C26] to-[#146340] text-white font-black text-[10px] rounded-lg border border-[#C5A059] shadow-xs">
                        {currentSlide.buttonText} &gt;
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Prev / Next Arrows directly on Canvas */}
              {slides.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handleCanvasPrev}
                    className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-black/60 hover:bg-black text-white border border-white/20 flex items-center justify-center cursor-pointer transition-colors"
                    title="이전 슬라이드 보기"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleCanvasNext}
                    className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-black/60 hover:bg-black text-white border border-white/20 flex items-center justify-center cursor-pointer transition-colors"
                    title="다음 슬라이드 보기"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}

              {/* Watermark Label */}
              <div className="absolute top-2 left-2 z-20 px-2 py-0.5 bg-black/80 backdrop-blur-xs rounded text-[9px] text-gray-300 font-mono">
                {currentSlide.title}
              </div>
            </div>
          </div>

          {/* ONE-CLICK 2번 스타일 추천 템플릿 CHIPS */}
          <div className="bg-white rounded-2xl p-3 border border-gray-200 shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-black flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>2번 스타일 추천 템플릿 (원클릭 적용)</span>
              </span>
              <span className="text-[10px] text-gray-400">선택 시 현재 배너에 즉시 반영</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {PRESET_BANNER_TEMPLATES.map((tmpl) => (
                <button
                  key={tmpl.id}
                  type="button"
                  onClick={() => handleApplyPreset(tmpl)}
                  className="p-1.5 rounded-xl border border-gray-200 hover:border-black hover:bg-stone-50 transition-all text-left group flex items-center gap-2 cursor-pointer"
                >
                  <img
                    src={tmpl.imageUrl}
                    alt=""
                    className="w-10 h-7 rounded-lg object-cover bg-black shrink-0 border border-gray-300"
                  />
                  <div className="min-w-0">
                    <span className="text-[11px] font-black text-gray-900 group-hover:text-emerald-800 block truncate leading-tight">
                      {tmpl.title}
                    </span>
                    <span className="text-[9px] text-gray-400 block truncate mt-0.5">
                      {tmpl.badge}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* COMPACT SLIDES ORDER & ROSTER */}
          <div className="bg-white rounded-2xl p-3 border border-gray-200 shadow-xs space-y-2">
            <div className="flex items-center justify-between border-b border-gray-100 pb-1.5">
              <span className="text-xs font-black text-black flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-emerald-700" />
                <span>슬라이더 순서 &amp; 노출 관리 ({slides.length}개)</span>
              </span>
              <span className="text-[10px] text-gray-400">위/아래 순서 변경</span>
            </div>

            <div className="space-y-1 max-h-40 overflow-y-auto pr-1">
              {slides.map((s, idx) => (
                <div
                  key={s.id}
                  onClick={() => setSelectedSlideId(s.id)}
                  className={`p-1.5 sm:p-2 rounded-xl border transition-all flex items-center justify-between gap-2 cursor-pointer ${
                    s.id === currentSlide.id
                      ? 'border-black bg-stone-50 ring-1 ring-black'
                      : 'border-gray-200 bg-white hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-5 h-5 rounded-md bg-black text-[#D4AF37] font-black font-mono text-[10px] flex items-center justify-center shrink-0">
                      0{idx + 1}
                    </span>
                    <img src={s.imageUrl} alt="" className="w-8 h-5 rounded object-cover bg-black shrink-0 border border-gray-300" />
                    <span className="text-xs font-black text-black truncate max-w-[170px] sm:max-w-[220px]">
                      {s.title}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                    <button
                      type="button"
                      onClick={() => handleMoveUp(idx)}
                      disabled={idx === 0}
                      className="p-1 hover:bg-gray-200 rounded disabled:opacity-20 cursor-pointer"
                      title="위로 이동"
                    >
                      <ArrowUp className="w-3 h-3 text-gray-600" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleMoveDown(idx)}
                      disabled={idx === slides.length - 1}
                      className="p-1 hover:bg-gray-200 rounded disabled:opacity-20 cursor-pointer"
                      title="아래로 이동"
                    >
                      <ArrowDown className="w-3 h-3 text-gray-600" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleToggleActive(s.id)}
                      className={`px-1.5 py-0.5 rounded text-[10px] font-bold cursor-pointer ${
                        s.active !== false
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {s.active !== false ? '노출' : '숨김'}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteSlide(s.id)}
                      disabled={slides.length <= 1}
                      className="p-1 hover:bg-rose-100 rounded text-rose-600 disabled:opacity-20 cursor-pointer"
                      title="삭제"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: STICKY VISUAL INSPECTOR (5 cols) */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-2xl p-3.5 border border-gray-200 shadow-sm space-y-3.5 lg:sticky lg:top-4">
            
            {/* Inspector Tab Switcher */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-2">
              <div className="flex items-center gap-1 bg-gray-100 p-0.5 rounded-xl">
                <button
                  type="button"
                  onClick={() => setInspectorTab('image')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-black transition-all cursor-pointer flex items-center gap-1 ${
                    inspectorTab === 'image'
                      ? 'bg-black text-white shadow-xs'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <ImageIcon className="w-3 h-3 text-emerald-400" />
                  <span>배경 이미지</span>
                </button>
                <button
                  type="button"
                  onClick={() => setInspectorTab('text')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-black transition-all cursor-pointer flex items-center gap-1 ${
                    inspectorTab === 'text'
                      ? 'bg-black text-white shadow-xs'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Type className="w-3 h-3 text-amber-400" />
                  <span>문구 &amp; 스타일</span>
                </button>
              </div>

              <span className="text-[10px] text-gray-400 font-mono">0{currentSlideIndex + 1} 편집중</span>
            </div>

            {/* TAB 1: IMAGE SETTINGS */}
            {inspectorTab === 'image' && (
              <div className="space-y-3 text-xs animate-fadeIn">
                {/* Banner Mode */}
                <div className="space-y-1">
                  <label className="text-[11px] font-black text-gray-700 block">배너 타입</label>
                  <div className="grid grid-cols-2 gap-1.5">
                    <button
                      type="button"
                      onClick={() => updateCurrentSlide('imageOnly', true)}
                      className={`p-2 rounded-xl border text-left transition-all cursor-pointer ${
                        currentSlide.imageOnly
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-black ring-1 ring-emerald-500'
                          : 'border-gray-200 bg-white hover:bg-stone-50 text-gray-700 font-bold'
                      }`}
                    >
                      <span className="block text-[11px]">🖼️ 완성형 그래픽</span>
                      <span className="block text-[9px] text-gray-400 font-normal mt-0.5">2번 화보(문구 포함)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => updateCurrentSlide('imageOnly', false)}
                      className={`p-2 rounded-xl border text-left transition-all cursor-pointer ${
                        !currentSlide.imageOnly
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-black ring-1 ring-emerald-500'
                          : 'border-gray-200 bg-white hover:bg-stone-50 text-gray-700 font-bold'
                      }`}
                    >
                      <span className="block text-[11px]">✍️ 텍스트 오버레이</span>
                      <span className="block text-[9px] text-gray-400 font-normal mt-0.5">사진 위 텍스트 합성</span>
                    </button>
                  </div>
                </div>

                {/* PC Upload Button */}
                <div className="space-y-1">
                  <label className="text-[11px] font-black text-gray-700 block">내 컴퓨터에서 새 사진 등록</label>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageFileUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full py-2 bg-stone-100 hover:bg-black hover:text-white text-gray-800 font-black text-xs rounded-xl border border-dashed border-gray-300 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5 text-emerald-700" />
                    <span>📁 내 PC에서 배너 파일 선택 (JPG / PNG)</span>
                  </button>
                </div>

                {/* Quick Gallery Chips */}
                <div className="space-y-1">
                  <label className="text-[11px] font-black text-gray-700 block">교육원 추천 고화질 사진</label>
                  <div className="grid grid-cols-2 gap-1.5 max-h-36 overflow-y-auto pr-1">
                    {PRESET_GALLERY_IMAGES.map((img) => (
                      <button
                        key={img.url}
                        type="button"
                        onClick={() => updateCurrentSlide('imageUrl', img.url)}
                        className={`p-1.5 rounded-lg border text-left flex items-center gap-1.5 transition-all cursor-pointer ${
                          currentSlide.imageUrl === img.url
                            ? 'border-emerald-600 bg-emerald-50'
                            : 'border-gray-200 bg-white hover:bg-stone-50'
                        }`}
                      >
                        <img src={img.url} alt="" className="w-6 h-6 rounded object-cover shrink-0" />
                        <span className="text-[10px] font-bold text-gray-800 truncate">
                          {img.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Image URL Input */}
                <div className="space-y-1">
                  <label className="text-[11px] font-black text-gray-700 block">이미지 경로 직접 입력</label>
                  <input
                    type="text"
                    value={currentSlide.imageUrl || ''}
                    onChange={(e) => updateCurrentSlide('imageUrl', e.target.value)}
                    placeholder="/images/hero_banner_fearless.png"
                    className="w-full p-2 bg-stone-50 border border-gray-300 rounded-xl text-xs font-mono text-gray-800 focus:outline-none"
                  />
                </div>
              </div>
            )}

            {/* TAB 2: TEXT & STYLE SETTINGS */}
            {inspectorTab === 'text' && (
              <div className="space-y-2.5 text-xs animate-fadeIn">
                {/* Title */}
                <div className="space-y-1">
                  <label className="text-[11px] font-black text-gray-700 block">메인 타이틀 (대형 헤드라인)</label>
                  <input
                    type="text"
                    value={currentSlide.title || ''}
                    onChange={(e) => updateCurrentSlide('title', e.target.value)}
                    placeholder="외식 창업이 두려운가?"
                    className="w-full p-2 bg-stone-50 border border-gray-300 rounded-xl text-xs font-black text-black focus:outline-none"
                  />
                </div>

                {/* Subtitle */}
                <div className="space-y-1">
                  <label className="text-[11px] font-black text-gray-700 block">서브 설명 문구</label>
                  <textarea
                    rows={2}
                    value={currentSlide.subtitle || ''}
                    onChange={(e) => updateCurrentSlide('subtitle', e.target.value)}
                    placeholder="한국외식창업교육원에서 성공으로 이끌어 드립니다."
                    className="w-full p-2 bg-stone-50 border border-gray-300 rounded-xl text-xs font-medium text-gray-800 focus:outline-none resize-none"
                  />
                </div>

                {/* Tag / Badge */}
                <div className="space-y-1">
                  <label className="text-[11px] font-black text-gray-700 block">상단 골드 배지 문구</label>
                  <input
                    type="text"
                    value={currentSlide.tag || ''}
                    onChange={(e) => updateCurrentSlide('tag', e.target.value)}
                    placeholder="사단법인 한국외식창업교육원"
                    className="w-full p-2 bg-stone-50 border border-gray-300 rounded-xl text-xs font-bold text-gray-800 focus:outline-none"
                  />
                </div>

                {/* Dimming Slider */}
                {!currentSlide.imageOnly && (
                  <div className="space-y-1 bg-stone-50 p-2 rounded-xl border border-stone-200">
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="font-black text-gray-700">배경 어둡기(Dim)</span>
                      <span className="font-mono font-black text-emerald-800">{currentSlide.overlayDim || 50}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="90"
                      step="5"
                      value={currentSlide.overlayDim || 50}
                      onChange={(e) => updateCurrentSlide('overlayDim', Number(e.target.value))}
                      className="w-full accent-emerald-700 cursor-pointer"
                    />
                  </div>
                )}

                {/* CTA Button Settings */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-[11px] font-black text-gray-700 block">버튼 문구</label>
                    <input
                      type="text"
                      value={currentSlide.buttonText || ''}
                      onChange={(e) => updateCurrentSlide('buttonText', e.target.value)}
                      placeholder="교육과정 둘러보기"
                      className="w-full p-1.5 bg-stone-50 border border-gray-300 rounded-lg text-xs font-bold"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-black text-gray-700 block">버튼 이동 위치</label>
                    <select
                      value={currentSlide.buttonLink || 'catalog'}
                      onChange={(e) => updateCurrentSlide('buttonLink', e.target.value)}
                      className="w-full p-1.5 bg-stone-50 border border-gray-300 rounded-lg text-xs font-bold"
                    >
                      <option value="catalog">교육과정 둘러보기</option>
                      <option value="about">교육원 소개</option>
                      <option value="community">1:1 수강 상담</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Save Action Button */}
            <div className="pt-2 border-t border-gray-100">
              <button
                type="button"
                onClick={handleSaveToHomepage}
                className="w-full py-2 bg-black hover:bg-gray-800 text-white font-black text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-[#C5A059]"
              >
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>홈페이지 실시간 반영 저장</span>
              </button>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
