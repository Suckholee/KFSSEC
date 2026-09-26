/**
 * High-Definition AI Hero Banner Synthesizer Engine for KFSSEC
 * Renders complete 2296 × 640 native ultra-wide banners on HTML5 Canvas
 * based on free-form prompt input, matching the exact visual style of Image 2.
 */

export const QUICK_PROMPTS = [
  {
    label: '🥩 40년 명장 스테이크 & 와인 특강',
    prompt: '특급호텔 40년 조리명장의 비법 스테이크와 와인 페어링 창업 실무',
    style: 'chef',
  },
  {
    label: '☕ 감성 디저트 카페 & 바리스타',
    prompt: '가을맞이 감성 디저트 카페 창업 및 바리스타 1:1 라떼아트 실전',
    style: 'cafe',
  },
  {
    label: '🍲 100년 전통 발효 소스 전수',
    prompt: '100년 전통 발효 비법 레시피 전수 및 소상공인 시그니처 메뉴 상품화',
    style: 'sauce',
  },
  {
    label: '👑 외식 창업 성공 마스터반',
    prompt: '외식 창업이 두려운가? 대한민국 명인·명장 교수진이 성공으로 이끌어 드립니다',
    style: 'masters',
  },
  {
    label: '🏢 소상공인 턴어라운드 창업',
    prompt: '실패 없는 외식 비즈니스와 청년·소상공인 정책자금 1억원 무상환 연계',
    style: 'restaurant',
  },
];

const STYLE_BACKGROUNDS = {
  masters: '/images/hero_banner_fearless.png',
  masters_lineup: '/images/main_banner_masters.png',
  chef: '/images/chef_tossing_food.jpg',
  sauce: '/images/course_menu_dev.jpg',
  cafe: '/images/course_cafe.jpg',
  restaurant: '/images/course_restaurant.jpg',
};

/**
 * Intelligent prompt analysis & copywriting synthesizer
 */
export function analyzePromptAndGenerateCopy(promptText, styleKey = 'masters') {
  const text = (promptText || '').trim();

  // Detect style from keywords if not explicitly forced
  let resolvedStyle = styleKey;
  if (text.includes('카페') || text.includes('커피') || text.includes('바리스타') || text.includes('디저트') || text.includes('베이커리')) {
    resolvedStyle = 'cafe';
  } else if (text.includes('스테이크') || text.includes('고기') || text.includes('불쇼') || text.includes('셰프') || text.includes('구이')) {
    resolvedStyle = 'chef';
  } else if (text.includes('소스') || text.includes('발효') || text.includes('장류') || text.includes('한식') || text.includes('비법')) {
    resolvedStyle = 'sauce';
  } else if (text.includes('매장') || text.includes('창업') || text.includes('프랜차이즈') || text.includes('자금') || text.includes('컨설팅') || text.includes('인큐베이팅')) {
    resolvedStyle = 'restaurant';
  } else if (text.includes('명장') || text.includes('명인') || text.includes('교수') || text.includes('두려운가')) {
    resolvedStyle = 'masters';
  }

  // Synthesize headline & subtitle
  let headline = text;
  let subtitle = '사단법인 한국외식창업교육원 대한민국 명인·명장 교수진 전담 1:1 직강 솔루션';
  let badge = '사단법인 한국외식창업교육원 공인';

  if (!text) {
    headline = '외식 창업이 두려운가?';
    subtitle = '한국외식창업교육원에서 성공으로 이끌어 드립니다.';
  } else if (resolvedStyle === 'chef') {
    headline = text.length > 28 ? text.slice(0, 28) : text;
    subtitle = '특급호텔 40년 명장이 전수하는 화력 제어 기술 & 1인 주방 최적화 동선 설계';
    badge = '대한민국 조리명장 제1호 직강';
  } else if (resolvedStyle === 'cafe') {
    headline = text.length > 28 ? text.slice(0, 28) : text;
    subtitle = '시그니처 로스팅부터 원가율 20% 디저트 레시피까지 카페 창업 실전 마스터';
    badge = '바리스타 & F&B 카페 창업 실무';
  } else if (resolvedStyle === 'sauce') {
    headline = text.length > 28 ? text.slice(0, 28) : text;
    subtitle = '대용량 맛 표준화부터 특허 소스 상품화까지 외식업 불황을 이기는 비법 레시피';
    badge = '100년 전통 발효 소스 전수';
  } else if (resolvedStyle === 'restaurant') {
    headline = text.length > 28 ? text.slice(0, 28) : text;
    subtitle = '소상공인 턴어라운드 실전 코칭 및 정부 정책자금 무상환 연계 창업 지원';
    badge = '외식 비즈니스 인큐베이팅';
  } else {
    headline = text.length > 30 ? text.slice(0, 30) : text;
    subtitle = '한국외식창업교육원 128명 수강생 검증! 검증된 명인의 비법으로 성공을 완성합니다.';
    badge = '대한민국 명인·명장 사단법인';
  }

  const bgUrl = STYLE_BACKGROUNDS[resolvedStyle] || STYLE_BACKGROUNDS.masters;

  return {
    style: resolvedStyle,
    bgUrl,
    headline,
    subtitle,
    badge,
  };
}

/**
 * Call serverless / Express backend to generate high-res image using OpenAI or Google Gemini
 */
export async function generateAiBannerImage({ prompt, model = 'gemini', style = 'masters' }) {
  try {
    const response = await fetch('/api/generate-ai-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt, model, style }),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.message || `API error (${response.status})`);
    }

    const data = await response.json();
    if (!data.success || !data.imageUrl) {
      throw new Error(data.message || 'Image generation failed');
    }

    return data;
  } catch (err) {
    console.error('[generateAiBannerImage] Error:', err);
    throw err;
  }
}

/**
 * Loads an image with CORS/local safety
 */
function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => {
      // Fallback try without crossOrigin
      const fallbackImg = new Image();
      fallbackImg.onload = () => resolve(fallbackImg);
      fallbackImg.onerror = (err) => reject(err);
      fallbackImg.src = src;
    };
    img.src = src;
  });
}

/**
 * Synthesize a 2296 × 640 Ultra-HD Banner on HTML5 Canvas
 */
export async function renderHeroBannerCanvas({
  prompt,
  style = 'masters',
  model = 'gemini', // 'gemini' | 'openai'
  useAiGeneration = false,
  customBgUrl = null,
  overrideHeadline = null,
  overrideSubtitle = null,
  overrideBadge = null,
}) {
  const analysis = analyzePromptAndGenerateCopy(prompt, style);
  let targetBgUrl = customBgUrl;
  let modelUsed = null;

  // If AI generation is requested and no customBgUrl is provided, generate image via API
  if (useAiGeneration && !targetBgUrl) {
    try {
      const aiResult = await generateAiBannerImage({ prompt, model, style });
      targetBgUrl = aiResult.imageUrl;
      modelUsed = aiResult.modelUsed || model;
    } catch (aiErr) {
      console.warn('AI image generation failed or offline, falling back to local style background:', aiErr.message);
      targetBgUrl = analysis.bgUrl;
    }
  } else if (!targetBgUrl) {
    targetBgUrl = analysis.bgUrl;
  }

  const headline = overrideHeadline || analysis.headline;
  const subtitle = overrideSubtitle || analysis.subtitle;
  const badge = overrideBadge || analysis.badge;

  // 1. Create native 2296 × 640 Canvas
  const canvas = document.createElement('canvas');
  canvas.width = 2296;
  canvas.height = 640;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Canvas context not supported');
  }

  // 2. Load background image
  try {
    const bgImage = await loadImage(targetBgUrl);

    // Cover calculation
    const imgRatio = bgImage.width / bgImage.height;
    const canvasRatio = canvas.width / canvas.height;
    let renderW = canvas.width;
    let renderH = canvas.height;
    let offsetX = 0;
    let offsetY = 0;

    if (imgRatio > canvasRatio) {
      renderW = canvas.height * imgRatio;
      offsetX = (canvas.width - renderW) / 2;
    } else {
      renderH = canvas.width / imgRatio;
      offsetY = (canvas.height - renderH) / 2;
    }

    // Draw background
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(bgImage, offsetX, offsetY, renderW, renderH);
  } catch (e) {
    // If background image fails, draw luxury gradient background
    const bgGrad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    bgGrad.addColorStop(0, '#050A07');
    bgGrad.addColorStop(0.5, '#0B3C26');
    bgGrad.addColorStop(1, '#020C06');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  // 3. Cinematic Multi-Layer Lighting Vignette
  // A. Top-to-bottom dark gradient
  const vGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
  vGrad.addColorStop(0, 'rgba(0, 0, 0, 0.45)');
  vGrad.addColorStop(0.5, 'rgba(0, 0, 0, 0.60)');
  vGrad.addColorStop(1, 'rgba(0, 0, 0, 0.88)');
  ctx.fillStyle = vGrad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // B. Radial center vignette
  const rGrad = ctx.createRadialGradient(
    canvas.width / 2,
    canvas.height / 2,
    150,
    canvas.width / 2,
    canvas.height / 2,
    canvas.width / 1.6
  );
  rGrad.addColorStop(0, 'rgba(0, 0, 0, 0.1)');
  rGrad.addColorStop(0.7, 'rgba(0, 0, 0, 0.4)');
  rGrad.addColorStop(1, 'rgba(0, 0, 0, 0.85)');
  ctx.fillStyle = rGrad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 4. Render Badge Tag Capsule (Top Center)
  if (badge) {
    ctx.save();
    ctx.font = 'bold 22px "Pretendard", "Noto Sans KR", -apple-system, sans-serif';
    const textWidth = ctx.measureText(badge).width;
    const badgeW = textWidth + 48;
    const badgeH = 42;
    const badgeX = (canvas.width - badgeW) / 2;
    const badgeY = 160;

    // Draw Capsule
    ctx.beginPath();
    ctx.roundRect(badgeX, badgeY, badgeW, badgeH, 21);
    const badgeGrad = ctx.createLinearGradient(badgeX, badgeY, badgeX + badgeW, badgeY + badgeH);
    badgeGrad.addColorStop(0, '#C5A059');
    badgeGrad.addColorStop(1, '#DFB96C');
    ctx.fillStyle = badgeGrad;
    ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
    ctx.shadowBlur = 16;
    ctx.shadowOffsetY = 4;
    ctx.fill();

    // Badge Text
    ctx.fillStyle = '#120E05';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'transparent';
    ctx.fillText(badge, canvas.width / 2, badgeY + badgeH / 2 + 1);
    ctx.restore();
  }

  // 5. Render Main Headline (Bold, Crisp White, Powerful Shadow)
  ctx.save();
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Dynamic font sizing if headline is long
  const headlineFontSize = headline.length > 20 ? 66 : 78;
  ctx.font = `900 ${headlineFontSize}px "Pretendard", "Noto Sans KR", -apple-system, sans-serif`;
  ctx.fillStyle = '#FFFFFF';
  ctx.shadowColor = 'rgba(0, 0, 0, 0.95)';
  ctx.shadowBlur = 32;
  ctx.shadowOffsetY = 8;
  ctx.fillText(headline, canvas.width / 2, 335);

  // 6. Render Subtitle (Subtle, Clean)
  if (subtitle) {
    ctx.font = '600 32px "Pretendard", "Noto Sans KR", -apple-system, sans-serif';
    ctx.fillStyle = '#E5E7EB';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
    ctx.shadowBlur = 18;
    ctx.shadowOffsetY = 4;
    ctx.fillText(subtitle, canvas.width / 2, 425);
  }
  ctx.restore();

  // 7. Subtle Gold Bottom Border Rule
  ctx.save();
  const ruleGrad = ctx.createLinearGradient(0, canvas.height - 4, canvas.width, canvas.height);
  ruleGrad.addColorStop(0, '#0B3C26');
  ruleGrad.addColorStop(0.3, '#C5A059');
  ruleGrad.addColorStop(0.7, '#C5A059');
  ruleGrad.addColorStop(1, '#0B3C26');
  ctx.fillStyle = ruleGrad;
  ctx.fillRect(0, canvas.height - 4, canvas.width, 4);
  ctx.restore();

  // 8. Export to PNG Data URL (Native 2296 × 640 Quality)
  const dataUrl = canvas.toDataURL('image/png', 0.95);

  return {
    dataUrl,
    headline,
    subtitle,
    badge,
    bgUrl: targetBgUrl,
    modelUsed,
  };
}
