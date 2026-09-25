/**
 * Course Poster & Visual Graphic Generator for KFSSEC
 * Renders high-resolution (800 x 1066 px, 3:4 ratio) promotional course posters
 * directly on HTML5 Canvas using course content and metadata.
 */

export const POSTER_THEMES = [
  {
    id: 'heritage_gold',
    name: '헤리티지 명장 직강형 (Heritage Gold)',
    description: '전통과 권위의 딥그린 바탕에 샴페인 골드 프레임과 명장 인장',
    bgColors: ['#041D12', '#0A3321', '#062015'],
    accentColor: '#D4AF37',
    accentText: '#181203',
    textColor: '#FFFFFF',
    subTextColor: '#A7F3D0',
    borderColor: '#C5A059',
    cardBg: 'rgba(5, 38, 24, 0.75)',
    cardBorder: 'rgba(197, 160, 89, 0.4)',
    badgeBg: '#C5A059',
    badgeText: '#0A2518',
  },
  {
    id: 'royal_burgundy',
    name: '로열 파인다이닝형 (Royal Burgundy)',
    description: '최고급 호텔 요리와 프리미엄 미식 감성의 다크 버건디 & 엠버',
    bgColors: ['#1C070B', '#340E16', '#20070D'],
    accentColor: '#F59E0B',
    accentText: '#1A0B02',
    textColor: '#FFFFFF',
    subTextColor: '#FECDD3',
    borderColor: '#F59E0B',
    cardBg: 'rgba(38, 10, 16, 0.75)',
    cardBorder: 'rgba(245, 158, 11, 0.4)',
    badgeBg: '#F59E0B',
    badgeText: '#1A0B02',
  },
  {
    id: 'financial_navy',
    name: '정부지원금 & 정책자금형 (Financial Navy)',
    description: '공공기관의 신뢰도와 청년·소상공인 1억원 지원의 네이비 & 에메랄드',
    bgColors: ['#051124', '#0A2146', '#040C1A'],
    accentColor: '#10B981',
    accentText: '#02241A',
    textColor: '#FFFFFF',
    subTextColor: '#93C5FD',
    borderColor: '#10B981',
    cardBg: 'rgba(8, 25, 54, 0.75)',
    cardBorder: 'rgba(16, 185, 129, 0.4)',
    badgeBg: '#10B981',
    badgeText: '#02241A',
  },
  {
    id: 'artisan_cafe',
    name: '트렌디 카페 & 베이커리 (Artisan Cafe)',
    description: '스페셜티 커피 및 시그니처 디저트 창업의 다크 에스프레소 & 앰버',
    bgColors: ['#19120E', '#2B1E16', '#140D0A'],
    accentColor: '#F97316',
    accentText: '#260B02',
    textColor: '#FFFFFF',
    subTextColor: '#FED7AA',
    borderColor: '#F97316',
    cardBg: 'rgba(36, 24, 17, 0.75)',
    cardBorder: 'rgba(249, 115, 22, 0.4)',
    badgeBg: '#F97316',
    badgeText: '#260B02',
  },
  {
    id: 'crimson_championship',
    name: 'K-FOOD 요리대회 & 자격증 (Crimson Trophy)',
    description: '전국 요리대회 출전 및 공인 자격증 취득의 임페리얼 크림슨 & 골드',
    bgColors: ['#28080C', '#450E16', '#1E0509'],
    accentColor: '#EAB308',
    accentText: '#231502',
    textColor: '#FFFFFF',
    subTextColor: '#FFE4E6',
    borderColor: '#EAB308',
    cardBg: 'rgba(46, 11, 17, 0.75)',
    cardBorder: 'rgba(234, 179, 8, 0.4)',
    badgeBg: '#EAB308',
    badgeText: '#231502',
  },
  {
    id: 'executive_slate',
    name: '올인원 풀 패키지 창업 (Executive Slate)',
    description: '상권분석부터 매장운영까지 6대 로드맵 완성의 슬레이트 & 코발트',
    bgColors: ['#0A0F1D', '#131C35', '#080C17'],
    accentColor: '#38BDF8',
    accentText: '#041B2D',
    textColor: '#FFFFFF',
    subTextColor: '#BAE6FD',
    borderColor: '#38BDF8',
    cardBg: 'rgba(15, 23, 42, 0.8)',
    cardBorder: 'rgba(56, 189, 248, 0.4)',
    badgeBg: '#38BDF8',
    badgeText: '#041B2D',
  },
];

/**
 * Automatically analyze course data and synthesize poster copywriting
 */
export function analyzeCourseContent(course = {}) {
  const title = (course.title || '외식창업 마스터 실무과정').trim();
  const rawDesc = (course.description || course.desc || '').trim();
  const categoryName = course.categoryName || course.industry || '한식';
  const instructor = (course.instructor || '안형상 이사장 외 조리명장진').trim();
  const startDate = course.startDate || '2026.10.05';
  const price = course.price != null ? course.price : 1200000;
  const priceStr = typeof price === 'number' ? `${price.toLocaleString()}원` : price;

  // Split description by lines or periods to extract 3 punchy highlights
  let bullets = [];
  if (rawDesc) {
    const lines = rawDesc
      .split(/[\n.·]/)
      .map((s) => s.trim())
      .filter((s) => s.length > 5);

    if (lines.length >= 3) {
      bullets = lines.slice(0, 3);
    } else if (lines.length > 0) {
      bullets = [...lines];
    }
  }

  // Fallback default bullets based on category
  const defaultBulletsMap = {
    한식: [
      '특급호텔 40년 명장의 100년 전통 발효 소스 전수',
      '1인 주방 최적화 동선 설계 및 대용량 레시피 표준화',
      '중소벤처기업부 정책자금 연계 및 사단법인 공인 수료증',
    ],
    펫푸드: [
      '반려동물 생애주기별 영양 요구량 및 안전 식자재 가공',
      '수제간식 창업 인허가·HACCP 기준 매장 설계 지도',
      '온라인 스마트스토어 및 배송 패키징 실무 솔루션',
    ],
    행동교정: [
      '반려견 심리 시그널 판독 및 1:1 도제식 행동 교정술',
      '상담 실습 및 클라이언트 커뮤니케이션 스킬 마스터',
      '사단법인 등록 공식 행동교정 지도사 자격 취득 연계',
    ],
    '풀 패키지': [
      '상권분석 + 메뉴개발 + 매장운영 + 마케팅 올인원 완성',
      '실패 확률을 0%로 줄이는 6대 창업 로드맵 1:1 밀착 코칭',
      '조리명장 시그니처 비법 및 1억원 정책자금 우선 추천',
    ],
  };

  const fallbackBullets =
    defaultBulletsMap[categoryName] || defaultBulletsMap['한식'];

  while (bullets.length < 3) {
    bullets.push(fallbackBullets[bullets.length]);
  }

  // Generate catchy hook subtitle
  let hook = '실전 1:1 도제식 전수로 단번에 완성하는 성공 창업 솔루션';
  if (title.includes('명장') || title.includes('마스터')) {
    hook = '대한민국 특급호텔 40년 명장이 전수하는 비법의 정수';
  } else if (title.includes('정책자금') || title.includes('지원금')) {
    hook = '합격률 94% 사업계획서 1:1 첨삭 및 최대 1억원 무상환 연계';
  } else if (title.includes('카페') || title.includes('디저트')) {
    hook = '핫플레이스 시그니처 메뉴 세팅부터 고수익 동선 설계까지';
  } else if (title.includes('패키지')) {
    hook = '상권분석부터 원가관리·매장운영까지 6대 로드맵 올인원 완성';
  }

  return {
    badgeText: '사단법인 한국외식창업교육원 공식 인가',
    categoryTag: `${categoryName} 창업 실무 · 조리명장 직강`,
    title,
    hook,
    highlights: bullets,
    instructor,
    schedule: `개강일정: ${startDate} (선착순 마감)`,
    priceTag: `수강료: ${priceStr}`,
    benefitTag: '수강료 30% 장학지원 선착순 혜택',
  };
}

/**
 * Draws the high-res 800 x 1066 poster directly onto an HTML5 Canvas
 */
export function drawCoursePosterToCanvas(canvas, posterData, theme) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = 800;
  const H = 1066;

  canvas.width = W;
  canvas.height = H;

  // 1. Background Gradient
  const grad = ctx.createRadialGradient(W / 2, H * 0.35, 100, W / 2, H / 2, W * 0.85);
  grad.addColorStop(0, theme.bgColors[1]);
  grad.addColorStop(0.65, theme.bgColors[0]);
  grad.addColorStop(1, theme.bgColors[2]);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // 2. Subtle luxury particle / grid texture
  ctx.save();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.025)';
  ctx.lineWidth = 1;
  for (let y = 0; y < H; y += 40) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(W, y);
    ctx.stroke();
  }
  ctx.restore();

  // 3. Decorative Outer & Inner Gold Border
  ctx.save();
  // Outer line
  ctx.strokeStyle = theme.borderColor;
  ctx.lineWidth = 3;
  ctx.strokeRect(28, 28, W - 56, H - 56);

  // Inner thin line
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.lineWidth = 1;
  ctx.strokeRect(36, 36, W - 72, H - 72);

  // Corner Ornaments
  const cornerSize = 22;
  const corners = [
    [28, 28],
    [W - 28, 28],
    [28, H - 28],
    [W - 28, H - 28],
  ];
  ctx.fillStyle = theme.accentColor;
  corners.forEach(([cx, cy]) => {
    ctx.fillRect(cx - 4, cy - 4, 8, 8);
  });
  ctx.restore();

  // 4. Top Organization Crest & Header Bar
  ctx.save();
  ctx.textAlign = 'center';

  // Laurel / Emblem Icon placeholder (Golden circular badge)
  ctx.fillStyle = theme.accentColor;
  ctx.beginPath();
  ctx.arc(W / 2, 75, 14, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = theme.accentText;
  ctx.font = 'bold 12px sans-serif';
  ctx.fillText('★', W / 2, 80);

  // Top Subheader
  ctx.fillStyle = theme.subTextColor;
  ctx.font = 'bold 13px sans-serif';
  ctx.letterSpacing = '2px';
  ctx.fillText(
    'KOREA FOOD SERVICE STARTUP EDUCATION CENTER',
    W / 2,
    110
  );

  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 15px sans-serif';
  ctx.fillText(
    posterData.badgeText || '사단법인 한국외식창업교육원 공식 인가',
    W / 2,
    135
  );
  ctx.restore();

  // 5. Category Pill Badge
  ctx.save();
  ctx.textAlign = 'center';
  const catText = posterData.categoryTag || '외식창업 전문 실무과정';
  ctx.font = '900 13px sans-serif';
  const catMetrics = ctx.measureText(catText);
  const pillW = catMetrics.width + 36;
  const pillH = 30;
  const pillX = (W - pillW) / 2;
  const pillY = 165;

  ctx.fillStyle = theme.badgeBg;
  roundRect(ctx, pillX, pillY, pillW, pillH, 15);
  ctx.fill();

  ctx.fillStyle = theme.badgeText;
  ctx.fillText(catText, W / 2, pillY + 20);
  ctx.restore();

  // 6. Main Course Title (Multi-line text wrapping with shadow)
  ctx.save();
  ctx.textAlign = 'center';
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 38px "Pretendard", "Noto Sans KR", sans-serif';
  ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
  ctx.shadowBlur = 12;
  ctx.shadowOffsetY = 4;

  const titleLines = wrapText(ctx, posterData.title || '', W - 140);
  let titleY = 240;
  titleLines.forEach((line) => {
    ctx.fillText(line, W / 2, titleY);
    titleY += 48;
  });
  ctx.restore();

  // 7. Golden Catchy Hook Line
  ctx.save();
  ctx.textAlign = 'center';
  ctx.fillStyle = theme.accentColor;
  ctx.font = 'bold 17px "Pretendard", "Noto Sans KR", sans-serif';
  ctx.fillText(`“ ${posterData.hook} ”`, W / 2, titleY + 15);
  ctx.restore();

  // 8. Divider Ribbon
  ctx.save();
  ctx.strokeStyle = theme.borderColor;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(W / 2 - 120, titleY + 38);
  ctx.lineTo(W / 2 + 120, titleY + 38);
  ctx.stroke();

  // Small diamond in center
  ctx.fillStyle = theme.accentColor;
  ctx.beginPath();
  ctx.arc(W / 2, titleY + 38, 4, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // 9. Highlights Feature Box (3 Core Points Card)
  const cardY = titleY + 65;
  const cardW = W - 120;
  const cardH = 240;
  const cardX = 60;

  ctx.save();
  ctx.fillStyle = theme.cardBg;
  roundRect(ctx, cardX, cardY, cardW, cardH, 20);
  ctx.fill();

  ctx.strokeStyle = theme.cardBorder;
  ctx.lineWidth = 2;
  roundRect(ctx, cardX, cardY, cardW, cardH, 20);
  ctx.stroke();

  // Card Header
  ctx.fillStyle = theme.accentColor;
  ctx.font = '900 15px sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('✦ 핵심 교육 커리큘럼 3대 포인트', cardX + 28, cardY + 38);

  // 3 Check Bullets
  let bulletY = cardY + 80;
  const bullets = posterData.highlights || [];
  bullets.slice(0, 3).forEach((bullet, idx) => {
    // Check circle
    ctx.fillStyle = theme.accentColor;
    ctx.beginPath();
    ctx.arc(cardX + 38, bulletY - 5, 10, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = theme.accentText;
    ctx.font = 'bold 11px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`${idx + 1}`, cardX + 38, bulletY - 1);

    // Text
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '500 15px "Pretendard", "Noto Sans KR", sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(bullet, cardX + 62, bulletY);

    bulletY += 50;
  });
  ctx.restore();

  // 10. Bottom Metadata Strip (Instructor, Schedule, Tuition)
  const bottomY = H - 235;
  ctx.save();
  ctx.textAlign = 'left';

  // Left col: Instructor & Schedule
  ctx.fillStyle = theme.subTextColor;
  ctx.font = 'bold 13px sans-serif';
  ctx.fillText('지도교수 / 전수명장', 75, bottomY);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 17px sans-serif';
  ctx.fillText(posterData.instructor || '조리명장 안형상 이사장 직강', 75, bottomY + 26);

  ctx.fillStyle = theme.subTextColor;
  ctx.font = 'bold 13px sans-serif';
  ctx.fillText('교육 일정 안내', 75, bottomY + 65);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 16px sans-serif';
  ctx.fillText(posterData.schedule || '2026 하반기 정규 개강반', 75, bottomY + 90);

  // Right col: Gold Tuition Stamp & Scholarship Badge
  const stampW = 270;
  const stampH = 100;
  const stampX = W - 75 - stampW;
  const stampY = bottomY - 10;

  ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
  roundRect(ctx, stampX, stampY, stampW, stampH, 16);
  ctx.fill();

  ctx.strokeStyle = theme.borderColor;
  ctx.lineWidth = 2;
  roundRect(ctx, stampX, stampY, stampW, stampH, 16);
  ctx.stroke();

  ctx.textAlign = 'center';
  ctx.fillStyle = theme.accentColor;
  ctx.font = '900 18px sans-serif';
  ctx.fillText(posterData.priceTag || '수강료 1:1 문의', stampX + stampW / 2, stampY + 38);

  ctx.fillStyle = '#A7F3D0';
  ctx.font = 'bold 12px sans-serif';
  ctx.fillText(posterData.benefitTag || '얼리버드 30% 감면 지원', stampX + stampW / 2, stampY + 68);
  ctx.restore();

  // 11. Footer Inquiry & Address
  ctx.save();
  ctx.textAlign = 'center';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
  ctx.font = '500 12px sans-serif';
  ctx.fillText(
    '입학 및 수강 신청 상담: 010-7244-6796 · 공식 홈페이지: kfssec.com',
    W / 2,
    H - 58
  );
  ctx.restore();

  return canvas;
}

/**
 * Canvas utility: Round Rectangle helper
 */
function roundRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

/**
 * Canvas utility: Word wrapping for headings
 */
function wrapText(ctx, text, maxWidth) {
  const words = text.split(' ');
  const lines = [];
  let currentLine = words[0] || '';

  for (let i = 1; i < words.length; i++) {
    const word = words[i];
    const width = ctx.measureText(currentLine + ' ' + word).width;
    if (width < maxWidth) {
      currentLine += ' ' + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }
  if (currentLine) {
    lines.push(currentLine);
  }
  return lines;
}
