import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Layers,
  CheckCircle,
  ExternalLink,
  Eye,
  RefreshCw,
  Sliders,
  ChevronRight,
  ChevronLeft,
  Upload,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Image as ImageIcon,
  Check,
  Type,
  Maximize2,
  RotateCcw,
  Palette,
  Layout,
} from 'lucide-react';
import { DEFAULT_HERO_BANNERS } from '../Hero';

// Gallery of institution high-res images for banner backgrounds
const PRESET_GALLERY_IMAGES = [
  {
    label: '👑 명장 단체 화보 (2번 이미지 스타일)',
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
  {
    label: '📜 안형상 이사장 직강 현장',
    url: '/images/chairman_ahn_real.jpg',
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
    badge: '👑 추천 1위 (2번 화보)',
  },
  {
    id: 'preset_masters',
    title: '꿈꾸는 외식창업 아무에게나 맡기시겠습니까?',
    subtitle: '오랜 현장실무경험과 실력을 갖춘 명인, 명장님께 맡겨주세요! 성공적인 창업은 저희가 책임지겠습니다.',
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
    subtitle: '100년 전통 발효 소스부터 1인 주방 최적화 동선 설계까지 실전 창업 솔루션',
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
    subtitle: '대용량 맛 표준화부터 특허 소스 전수까지 외식업 불황을 이기는 시그니처 메뉴',
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
    subtitle: '매출 300% 도약 소상공인 실전 컨설팅 및 정부 정책자금 무상환 연계 지원',
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
  onApplyToLiveBanner,
}) {
  // Current active slides list in slider
  const initialBanners =
    siteData?.heroBanners && siteData.heroBanners.length > 0
      ? siteData.heroBanners
      : DEFAULT_HERO_BANNERS;

  const [slides, setSlides] = useState(initialBanners);
  // Selected slide ID for editing
  const [selectedSlideId, setSelectedSlideId] = useState(initialBanners[0]?.id || 'banner_fearless');
  // Canvas preview slide index
  const [previewIndex, setPreviewIndex] = useState(0);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const fileInputRef = useRef(null);

  // Sync when siteData updates externally
  useEffect(() => {
    if (siteData?.heroBanners && siteData.heroBanners.length > 0) {
      setSlides(siteData.heroBanners);
    }
  }, [siteData]);

  // Current active slide object being edited
  const currentSlide =
    slides.find((s) => s.id === selectedSlideId) || slides[0] || DEFAULT_HERO_BANNERS[0];

  // Update a field of current slide
  const updateCurrentSlide = (field, value) => {
    setSlides((prev) =>
      prev.map((s) => (s.id === currentSlide.id ? { ...s, [field]: value } : s))
    );
  };

  // 1-Click Apply Preset Template
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

  // Add new slide
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

  // Delete slide
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

  // Toggle active status
  const handleToggleActive = (id) => {
    setSlides((prev) =>
      prev.map((s) => (s.id === id ? { ...s, active: !s.active } : s))
    );
  };

  // Move slide up
  const handleMoveUp = (index) => {
    if (index === 0) return;
    const newSlides = [...slides];
    const temp = newSlides[index - 1];
    newSlides[index - 1] = newSlides[index];
    newSlides[index] = temp;
    setSlides(newSlides);
  };

  // Move slide down
  const handleMoveDown = (index) => {
    if (index === slides.length - 1) return;
    const newSlides = [...slides];
    const temp = newSlides[index + 1];
    newSlides[index + 1] = newSlides[index];
    newSlides[index] = temp;
    setSlides(newSlides);
  };

  // Handle local image file upload
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

  // Save all slides to homepage siteData
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
    setTimeout(() => setSaveSuccess(false), 3500);
  };

  const activeSlides = slides.filter((s) => s.active !== false);

  return (
    <div className="space-y-8 animate-fadeIn max-w-6xl pb-16">
      
      {/* HEADER BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-black pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 bg-black text-[#D4AF37] font-black text-[10px] rounded-full uppercase tracking-wider">
              Main Hero Studio
            </span>
            <span className="text-xs font-bold text-emerald-800 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              실시간 홈페이지 연동 가동중
            </span>
          </div>
          <h2 className="text-2xl font-black text-black tracking-tight mt-1 flex items-center gap-2">
            <span>🖼️ 메인 히어로 배너 관리 &amp; 생성 스튜디오</span>
          </h2>
          <p className="text-xs text-gray-500 font-bold mt-0.5">
            홈페이지 최상단에 노출되는 대형 비주얼 배너(2번 이미지 화보 스타일)를 실시간으로 제작·등록하고 슬라이더를 관리합니다.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleAddNewSlide}
            className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-gray-900 font-black text-xs rounded-xl transition-all flex items-center gap-1.5 cursor-pointer border border-gray-300 shadow-xs"
          >
            <Plus className="w-4 h-4 text-emerald-700" />
            <span>➕ 새 배너 추가</span>
          </button>

          <button
            onClick={handleSaveToHomepage}
            className="px-5 py-2.5 bg-black hover:bg-gray-800 text-white font-black text-xs rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer border-2 border-[#C5A059]"
          >
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>💾 홈페이지 슬라이더 즉시 반영</span>
          </button>
        </div>
      </div>

      {/* TOAST SUCCESS ALERT */}
      {saveSuccess && (
        <div className="bg-emerald-950 text-white p-4 rounded-2xl border-2 border-[#C5A059] shadow-xl flex items-center justify-between gap-3 animate-fadeIn">
          <div className="flex items-center gap-2.5">
            <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <span className="font-black text-sm block">🎉 홈페이지 최상단 메인 히어로 배너에 즉시 반영되었습니다!</span>
              <span className="text-xs text-emerald-200 font-medium">메인 화면(/)으로 접속하시면 업데이트된 배너 슬라이더를 바로 확인하실 수 있습니다.</span>
            </div>
          </div>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 bg-[#C5A059] hover:bg-[#b08b43] text-black font-black text-xs rounded-xl shrink-0 flex items-center gap-1 transition-colors"
          >
            <span>메인 사이트 확인</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      )}

      {/* SECTION 1: LIVE HERO BANNER CINEMA CANVAS (MATCHES IMAGE 2) */}
      <div className="bg-stone-900 text-white rounded-3xl p-6 sm:p-8 border-2 border-black shadow-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h3 className="text-sm font-black text-white tracking-tight flex items-center gap-2">
              <span>실시간 비주얼 배너 라이브 캔버스 (홈페이지 최상단 노출 뷰)</span>
            </h3>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
            <span>2296 × 640 Native Ultra-HD View</span>
            <span className="px-2 py-0.5 bg-black/60 rounded text-[10px] text-[#D4AF37] border border-[#C5A059]/40">
              {currentSlide.imageOnly ? '🖼️ 완성형 그래픽 배너' : '✍️ 텍스트 오버레이 배너'}
            </span>
          </div>
        </div>

        {/* CINEMATIC PREVIEW FRAME (MATCHING IMAGE 2 EXACTLY) */}
        <div className="relative w-full rounded-2xl overflow-hidden bg-black border-2 border-[#C5A059] shadow-2xl flex items-center justify-center min-h-[220px] sm:min-h-[340px] md:min-h-[420px]">
          
          {currentSlide.imageOnly ? (
            /* IMAGE ONLY (Image 2 style) */
            <div className="w-full flex justify-center items-center bg-black">
              <img
                src={currentSlide.imageUrl}
                alt={currentSlide.title}
                className="w-full h-auto max-h-[500px] object-contain block mx-auto select-none"
              />
            </div>
          ) : (
            /* BACKGROUND PHOTO + OVERLAY TYPOGRAPHY */
            <div className="relative w-full h-[240px] sm:h-[360px] md:h-[440px] flex items-center justify-center overflow-hidden">
              <img
                src={currentSlide.imageUrl}
                alt={currentSlide.title}
                className="absolute inset-0 w-full h-full object-cover object-center"
              />

              {/* Dim Vignette */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30 pointer-events-none"
                style={{
                  backgroundColor: `rgba(0, 0, 0, ${(currentSlide.overlayDim || 50) / 100})`,
                }}
              />

              {/* Text Elements */}
              <div className="relative z-10 max-w-3xl mx-auto px-6 text-center flex flex-col items-center gap-2 sm:gap-3.5">
                {currentSlide.tag && (
                  <span className="px-3 py-1 rounded-full bg-[#C5A059] text-black font-black text-[10px] sm:text-xs shadow-md">
                    {currentSlide.tag}
                  </span>
                )}

                <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
                  {currentSlide.title}
                </h2>

                <p className="text-xs sm:text-sm md:text-base text-gray-200 font-medium max-w-xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                  {currentSlide.subtitle}
                </p>

                {currentSlide.buttonText && (
                  <button
                    type="button"
                    className="mt-1 px-5 py-2.5 bg-gradient-to-r from-[#0B3C26] to-[#146340] text-white font-black text-xs rounded-xl border border-[#C5A059] shadow-lg flex items-center gap-1.5"
                  >
                    <span>{currentSlide.buttonText}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* WATERMARK BADGE */}
          <div className="absolute top-3 left-3 z-20 px-2.5 py-1 bg-black/80 backdrop-blur-md rounded-lg border border-white/20 text-[10px] text-gray-300 font-mono">
            Previewing: {currentSlide.title}
          </div>
        </div>

        {/* CANVAS FOOTER BAR */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-gray-400 pt-1">
          <div className="flex items-center gap-3">
            <span>총 등록 슬라이드: <strong className="text-white font-mono">{slides.length}개</strong></span>
            <span>홈페이지 활성 슬라이드: <strong className="text-emerald-400 font-mono">{activeSlides.length}개</strong></span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-gray-400">현재 슬라이드:</span>
            <div className="flex items-center gap-1">
              {slides.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedSlideId(s.id)}
                  className={`w-6 h-6 rounded-lg text-[10px] font-mono font-bold transition-all cursor-pointer flex items-center justify-center ${
                    s.id === currentSlide.id
                      ? 'bg-[#C5A059] text-black font-black'
                      : 'bg-stone-800 text-gray-400 hover:bg-stone-700'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: 'PRETTY BANNER' PRESET TEMPLATES (2번 이미지 스타일 갤러리) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-black shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-gray-200 pb-3">
          <div>
            <h3 className="text-base font-black text-black tracking-tight flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>추천 '예쁜 배너' 템플릿 갤러리 (2번 이미지 스타일 원클릭 적용)</span>
            </h3>
            <p className="text-xs text-gray-500 font-bold mt-0.5">
              원하는 디자인 배너를 클릭하면 현재 편집 중인 배너 슬라이드에 즉시 적용됩니다.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PRESET_BANNER_TEMPLATES.map((tmpl) => (
            <div
              key={tmpl.id}
              onClick={() => handleApplyPreset(tmpl)}
              className="bg-stone-50 hover:bg-emerald-50/50 p-4 rounded-2xl border-2 border-stone-200 hover:border-emerald-600 transition-all cursor-pointer group flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 bg-black text-[#D4AF37] font-black text-[10px] rounded-full">
                    {tmpl.badge}
                  </span>
                  <span className="text-[10px] text-gray-400 font-mono">
                    {tmpl.imageOnly ? '완성형 그래픽' : '텍스트 오버레이'}
                  </span>
                </div>

                {/* Thumbnail */}
                <div className="w-full h-24 rounded-xl overflow-hidden bg-black relative border border-gray-300">
                  <img
                    src={tmpl.imageUrl}
                    alt={tmpl.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />
                  <span className="absolute bottom-1.5 left-2 text-[10px] font-black text-white drop-shadow-md truncate max-w-[90%]">
                    {tmpl.title}
                  </span>
                </div>

                <div>
                  <h4 className="text-xs font-black text-black group-hover:text-emerald-900 transition-colors line-clamp-1">
                    {tmpl.title}
                  </h4>
                  <p className="text-[11px] text-gray-500 line-clamp-1 mt-0.5">
                    {tmpl.subtitle}
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="w-full py-1.5 bg-black group-hover:bg-emerald-700 text-white font-black text-[11px] rounded-xl transition-colors flex items-center justify-center gap-1 shadow-xs cursor-pointer"
              >
                <span>이 배너 디자인 불러오기</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 3: DETAILED VISUAL CUSTOMIZER FOR SELECTED SLIDE */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-black shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-200 pb-3">
          <div>
            <h3 className="text-base font-black text-black tracking-tight flex items-center gap-2">
              <Sliders className="w-4 h-4 text-emerald-700" />
              <span>선택 배너 상세 편집기 (슬라이드 ID: {currentSlide.id})</span>
            </h3>
            <p className="text-xs text-gray-500 font-bold mt-0.5">
              배경 이미지 교체, 문구 수정, 텍스트 오버레이 여부 및 어두운 딤 강도를 정밀 조정합니다.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleToggleActive(currentSlide.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-colors cursor-pointer border ${
                currentSlide.active !== false
                  ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                  : 'bg-stone-100 text-gray-500 border-gray-300'
              }`}
            >
              {currentSlide.active !== false ? '✓ 홈 노출 활성' : '✕ 노출 숨김'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* LEFT: IMAGE SELECTION & UPLOAD */}
          <div className="space-y-4">
            <h4 className="text-xs font-black text-black flex items-center gap-1.5 border-b border-gray-100 pb-2">
              <ImageIcon className="w-3.5 h-3.5 text-emerald-700" />
              <span>1. 배너 배경 이미지 설정</span>
            </h4>

            {/* Banner Mode Switch */}
            <div className="space-y-1.5">
              <label className="text-xs font-black text-gray-700 block">배너 타입 선택</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => updateCurrentSlide('imageOnly', true)}
                  className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                    currentSlide.imageOnly
                      ? 'border-emerald-600 bg-emerald-50/50 shadow-xs'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <span className="text-xs font-black text-black block">🖼️ 완성형 그래픽 배너</span>
                  <span className="text-[10px] text-gray-500 block mt-0.5">2번처럼 사진 자체에 문구가 디자인된 배너</span>
                </button>

                <button
                  type="button"
                  onClick={() => updateCurrentSlide('imageOnly', false)}
                  className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                    !currentSlide.imageOnly
                      ? 'border-emerald-600 bg-emerald-50/50 shadow-xs'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <span className="text-xs font-black text-black block">✍️ 텍스트 오버레이 배너</span>
                  <span className="text-[10px] text-gray-500 block mt-0.5">배경 사진 위에 제목/부제목/버튼을 직접 합성</span>
                </button>
              </div>
            </div>

            {/* Upload Button from PC */}
            <div className="space-y-1.5">
              <label className="text-xs font-black text-gray-700 block">내 컴퓨터에서 이미지 직접 업로드</label>
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
                className="w-full py-3 bg-stone-100 hover:bg-black hover:text-white text-gray-800 font-black text-xs rounded-2xl border-2 border-dashed border-gray-300 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Upload className="w-4 h-4 text-emerald-700" />
                <span>📁 PC에서 배너 이미지 파일 선택 (JPG / PNG / WebP)</span>
              </button>
            </div>

            {/* Quick Gallery Image Selection */}
            <div className="space-y-1.5">
              <label className="text-xs font-black text-gray-700 block">또는 교육원 고화질 사진에서 선택</label>
              <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
                {PRESET_GALLERY_IMAGES.map((img) => (
                  <button
                    key={img.url}
                    type="button"
                    onClick={() => updateCurrentSlide('imageUrl', img.url)}
                    className={`p-2 rounded-xl border text-left flex items-center gap-2 transition-all cursor-pointer ${
                      currentSlide.imageUrl === img.url
                        ? 'border-emerald-600 bg-emerald-50'
                        : 'border-gray-200 bg-white hover:bg-stone-50'
                    }`}
                  >
                    <img src={img.url} alt="" className="w-8 h-8 rounded-lg object-cover shrink-0" />
                    <span className="text-[11px] font-bold text-gray-800 line-clamp-1 truncate">
                      {img.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Image URL Input */}
            <div className="space-y-1">
              <label className="text-xs font-black text-gray-700 block">이미지 URL 직접 입력</label>
              <input
                type="text"
                value={currentSlide.imageUrl || ''}
                onChange={(e) => updateCurrentSlide('imageUrl', e.target.value)}
                placeholder="/images/hero_banner_fearless.png 또는 https://..."
                className="w-full p-2.5 bg-stone-50 border border-gray-300 rounded-xl text-xs font-mono text-gray-800 focus:outline-none focus:border-black"
              />
            </div>
          </div>

          {/* RIGHT: TEXT & OVERLAY SETTINGS */}
          <div className="space-y-4">
            <h4 className="text-xs font-black text-black flex items-center gap-1.5 border-b border-gray-100 pb-2">
              <Type className="w-3.5 h-3.5 text-emerald-700" />
              <span>2. 텍스트 문구 &amp; 오버레이 효과</span>
            </h4>

            {/* Title */}
            <div className="space-y-1">
              <label className="text-xs font-black text-gray-700 block">메인 타이틀 (대형 헤드라인)</label>
              <input
                type="text"
                value={currentSlide.title || ''}
                onChange={(e) => updateCurrentSlide('title', e.target.value)}
                placeholder="외식 창업이 두려운가?"
                className="w-full p-2.5 bg-stone-50 border border-gray-300 rounded-xl text-xs font-black text-black focus:outline-none focus:border-black"
              />
            </div>

            {/* Subtitle */}
            <div className="space-y-1">
              <label className="text-xs font-black text-gray-700 block">서브 설명 문구</label>
              <textarea
                rows={2}
                value={currentSlide.subtitle || ''}
                onChange={(e) => updateCurrentSlide('subtitle', e.target.value)}
                placeholder="한국외식창업교육원에서 성공으로 이끌어 드립니다."
                className="w-full p-2.5 bg-stone-50 border border-gray-300 rounded-xl text-xs font-medium text-gray-800 focus:outline-none focus:border-black resize-none"
              />
            </div>

            {/* Tag / Badge */}
            <div className="space-y-1">
              <label className="text-xs font-black text-gray-700 block">상단 골드 배지 태그 (선택)</label>
              <input
                type="text"
                value={currentSlide.tag || ''}
                onChange={(e) => updateCurrentSlide('tag', e.target.value)}
                placeholder="대한민국 명인·명장 교수진"
                className="w-full p-2.5 bg-stone-50 border border-gray-300 rounded-xl text-xs font-bold text-gray-800 focus:outline-none focus:border-black"
              />
            </div>

            {/* Dim intensity slider */}
            {!currentSlide.imageOnly && (
              <div className="space-y-1 pt-1 bg-stone-50 p-3 rounded-2xl border border-stone-200">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-black text-gray-700">어두운 오버레이 딤(Dim) 강도</span>
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
                <span className="text-[10px] text-gray-400 block">
                  사진 위의 글자가 또렷하게 보이도록 배경을 어둡게 눌러주는 효과입니다.
                </span>
              </div>
            )}

            {/* CTA Button Text & Link */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="space-y-1">
                <label className="text-xs font-black text-gray-700 block">버튼 문구</label>
                <input
                  type="text"
                  value={currentSlide.buttonText || ''}
                  onChange={(e) => updateCurrentSlide('buttonText', e.target.value)}
                  placeholder="교육과정 둘러보기"
                  className="w-full p-2 bg-stone-50 border border-gray-300 rounded-xl text-xs font-bold text-gray-800 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-black text-gray-700 block">버튼 클릭 이동 위치</label>
                <select
                  value={currentSlide.buttonLink || 'catalog'}
                  onChange={(e) => updateCurrentSlide('buttonLink', e.target.value)}
                  className="w-full p-2 bg-stone-50 border border-gray-300 rounded-xl text-xs font-bold text-gray-800 focus:outline-none"
                >
                  <option value="catalog">교육과정 둘러보기 (/catalog)</option>
                  <option value="about">교육원 소개 (/about)</option>
                  <option value="community">1:1 수강 상담 (/community)</option>
                </select>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* SECTION 4: SLIDER ROSTER & ORDER MANAGEMENT */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-black shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-gray-200 pb-3">
          <div>
            <h3 className="text-base font-black text-black tracking-tight flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-700" />
              <span>3. 홈페이지 메인 슬라이더 순서 &amp; 활성화 관리 ({slides.length}개)</span>
            </h3>
            <p className="text-xs text-gray-500 font-bold mt-0.5">
              드래그하지 않고 위/아래 버튼으로 손쉽게 슬라이드 노출 순서를 정렬하고 활성화 여부를 지정합니다.
            </p>
          </div>

          <button
            onClick={handleAddNewSlide}
            className="px-3 py-1.5 bg-black hover:bg-gray-800 text-white font-black text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-emerald-400" />
            <span>슬라이드 추가</span>
          </button>
        </div>

        <div className="space-y-2.5">
          {slides.map((s, idx) => {
            const isSelected = s.id === currentSlide.id;

            return (
              <div
                key={s.id}
                onClick={() => setSelectedSlideId(s.id)}
                className={`p-3.5 rounded-2xl border-2 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer ${
                  isSelected
                    ? 'border-black bg-stone-50 shadow-md ring-2 ring-emerald-500/30'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  {/* Order Number Badge */}
                  <span className="w-7 h-7 rounded-xl bg-black text-[#D4AF37] font-black font-mono text-xs flex items-center justify-center shrink-0">
                    0{idx + 1}
                  </span>

                  {/* Thumbnail */}
                  <div className="w-16 h-10 rounded-lg overflow-hidden bg-black shrink-0 border border-gray-300">
                    <img src={s.imageUrl} alt="" className="w-full h-full object-cover" />
                  </div>

                  <div className="space-y-0.5 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-black truncate max-w-[240px] sm:max-w-md">
                        {s.title}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-black border ${
                        s.active !== false
                          ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                          : 'bg-stone-100 text-gray-500 border-gray-300'
                      }`}>
                        {s.active !== false ? '노출중' : '숨김'}
                      </span>
                      <span className="text-[10px] text-gray-400 font-mono hidden sm:inline">
                        {s.imageOnly ? '완성형 그래픽' : '텍스트 합성'}
                      </span>
                    </div>

                    <p className="text-[11px] text-gray-500 truncate max-w-[280px] sm:max-w-lg">
                      {s.subtitle}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 self-end sm:self-auto" onClick={(e) => e.stopPropagation()}>
                  {/* Move Up */}
                  <button
                    onClick={() => handleMoveUp(idx)}
                    disabled={idx === 0}
                    className="p-1.5 bg-stone-100 hover:bg-stone-200 disabled:opacity-30 rounded-lg text-gray-700 cursor-pointer"
                    title="위로 이동"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>

                  {/* Move Down */}
                  <button
                    onClick={() => handleMoveDown(idx)}
                    disabled={idx === slides.length - 1}
                    className="p-1.5 bg-stone-100 hover:bg-stone-200 disabled:opacity-30 rounded-lg text-gray-700 cursor-pointer"
                    title="아래로 이동"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>

                  {/* Toggle Active */}
                  <button
                    onClick={() => handleToggleActive(s.id)}
                    className="px-2 py-1 bg-stone-100 hover:bg-stone-200 rounded-lg text-[11px] font-bold text-gray-700 cursor-pointer"
                  >
                    {s.active !== false ? '숨기기' : '노출'}
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => handleDeleteSlide(s.id)}
                    disabled={slides.length <= 1}
                    className="p-1.5 bg-rose-50 hover:bg-rose-100 disabled:opacity-30 rounded-lg text-rose-700 cursor-pointer"
                    title="슬라이드 삭제"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* BOTTOM SAVE CALLOUT */}
        <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span className="text-xs text-gray-500 font-medium">
            슬라이더 편집 및 순서 변경 후 우측 <strong>[홈페이지 슬라이더 즉시 반영]</strong> 버튼을 누르시면 메인 페이지에 실시간 적용됩니다.
          </span>

          <button
            onClick={handleSaveToHomepage}
            className="px-6 py-2.5 bg-black hover:bg-gray-800 text-white font-black text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer border-2 border-[#C5A059] shrink-0"
          >
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>홈페이지 실시간 반영 저장</span>
          </button>
        </div>
      </div>

    </div>
  );
}
