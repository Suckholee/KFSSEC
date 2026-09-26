import { useLanguage } from '../../i18n/LanguageContext';
import React, { useState } from 'react';
import ScrollReveal from '../common/ScrollReveal';
import { DEFAULT_PARTNER_LOGOS } from '../Home/PartnerMarqueeSection';
import {
  Handshake,
  Building2,
  Award,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Send,
  Sparkles,
  Layers,
  MapPin,
  Calendar,
  X,
  Maximize2,
} from 'lucide-react';

export default function PartnersPage({ initialSubTab = 'all', partnerLogos = [] }) {
  const { t } = useLanguage();
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // Close modal on Escape key press
  React.useEffect(() => {
    if (!selectedPhoto) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedPhoto(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhoto]);

  // Smooth scroll based on sub-tab navigation
  React.useEffect(() => {
    if (initialSubTab === 'mou') {
      const el = document.getElementById('partners-mou');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (initialSubTab === 'inquiry') {
      const el = document.getElementById('partners-inquiry');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (initialSubTab === 'all') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [initialSubTab]);



  const PARTNER_DESCRIPTIONS = {
    '농림축산식품부': '사단법인 한국외식창업교육원의 주무관청으로서 K-외식 창업 및 전통 식문화 계승, 농수산물 외식 소비 촉진을 종합 지도합니다.',
    '소상공인시장진흥공단': '소상공인 맞춤형 정책자금 연계, 온누리상품권 가맹 및 재도약 창업 패키지를 협력 지원하는 공공기관 파트너입니다.',
    '강남구청': '지역 상권 활성화 및 청년·신중년 외식 창업 육성을 위해 관내 외식 상생 인큐베이팅 프로그램을 공동 운영합니다.',
    '(주)주방뱅크': '대한민국 1위 업소용 주방기구 및 설비 토탈 컨설팅 기업으로, 수강생 대상 주방 집기 특별 할인 및 3D 도면 설계를 지원합니다.',
    '(주)세진': 'HACCP 인증 친환경 주방 세척 및 살균 소독 시스템 전문 기업으로 안전한 위생 환경 구축을 보증합니다.',
    '(주)비엠스 인터내셔날': '프리미엄 수입 식자재 및 해외 향신료 유통 전문 기업으로 안정적인 B2B 원가 절감 유통망을 연계합니다.',
    '㈜자인': '100년 전통 발효 비법을 바탕으로 한 시그니처 소스 및 천연 조미 소재 개발 협력 파트너입니다.',
    '㈜다이닝에프앤비': '유망 외식 프랜차이즈 브랜드 기획 및 가맹 시스템 구축, 인큐베이팅을 협업하는 전문 F&B 그룹입니다.',
    '김태완스시': '전국 30여 개 매장을 운영 중인 초밥 전문 브랜드로, 실전 현장 인턴십 및 매장 경영 노하우를 공유합니다.',
    '황태회관': '평창 50년 전통의 대표 향토음식 전문점으로, 지역 농수특산물 연계 및 명인 레시피 상품화를 함께합니다.',
    'VEN60 (벤60)': '호텔식 고급 디저트 및 제과제빵 전문 브랜드로, 수강생을 위한 바리스타 및 베이킹 실습 환경을 지원합니다.',
    'VEN60': '호텔식 고급 디저트 및 제과제빵 전문 브랜드로, 수강생을 위한 바리스타 및 베이킹 실습 환경을 지원합니다.',
    '진도울돌목가는길': '청정 남도 해역 수산물 직거래 유통 및 특산물 기반 메뉴 개발을 협업하는 산지 직송 파트너입니다.',
    '닥터장 베이킹랩': '제과기능장의 천연효모종 발효 빵 및 쌀 베이킹 레시피를 공동 개발하고 지도하는 전문 연구소입니다.',
  };

  // Dynamic Official Partner Companies from Admin or Defaults
  const rawPartners = partnerLogos && partnerLogos.length > 0 ? partnerLogos : DEFAULT_PARTNER_LOGOS;
  const activePartners = rawPartners.filter((p) => p.active !== false);
  const partnersList = activePartners.map((partner, idx) => ({
    ...partner,
    id: partner.id || `partner-${idx}`,
    desc: partner.desc || PARTNER_DESCRIPTIONS[partner.name] || `${partner.name}은(는) 사단법인 한국외식창업교육원의 공식 파트너사로서 수강생 외식 창업 역량 강화를 전폭 지원합니다.`,
  }));

  // MOU Event Photos
  const mouPhotos = [
    {
      id: 1,
      title: '한국외식창업교육원 - 10대 가족기업 산학협력 합동 MOU 체결식',
      date: '2026.08.12',
      image: '/images/hero_bg.jpg',
      desc: '안형상 이사장과 10대 협력기업 대표단이 참석하여 청년 창업 및 조리 실습 지원에 관한 포괄적 업무협약을 체결했습니다.',
    },
    {
      id: 2,
      title: '전국 지자체 소상공인 연합 지원 업무협약 및 현판 수여식',
      date: '2026.07.25',
      image: '/images/chairman_ahn_real.jpg',
      desc: '지역 골목상권 활성화와 외식 창업인의 경쟁력 강화를 위한 지자체-교육원 간 공식 지원 협약이 체결되었습니다.',
    },
    {
      id: 3,
      title: '(주)주방뱅크 - 교육원 공식 주방설비 공급 및 3D 설계 협약',
      date: '2026.06.30',
      image: '/images/course_menu_dev.jpg',
      desc: '수강생 전용 업소용 주방설비 원가 공급 및 매장 오픈 시 무상 도면 설계 지원 협약을 공식 조인했습니다.',
    },
    {
      id: 4,
      title: '글로벌 K-FOOD 문화 교류 및 아시아 외식 조리협회 교류 협약',
      date: '2026.05.18',
      image: '/images/course_restaurant.jpg',
      desc: '대한민국 외식명인들의 해외 진출과 전통 한국 발효 음식의 세계화를 위한 아시아 조리협회와의 협약식 현장입니다.',
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-8 font-sans text-gray-900">
      <div className="w-full px-4 sm:px-8 lg:px-12 max-w-[1520px] mx-auto space-y-12">
        
        {/* Top Header Hero */}
        <ScrollReveal direction="up" delay={0}>
          <div className="relative bg-[#0B3C26] text-white rounded-3xl p-6 sm:p-10 border-2 border-[#C5A059] shadow-xl overflow-hidden">
            <div className="relative z-10 max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#C5A059]/20 border border-[#C5A059]/40 text-[#D4AF37] text-xs font-black rounded-full">
                <Handshake className="w-3.5 h-3.5" />
                <span>OFFICIAL PARTNERS & STRATEGIC ALLIANCES</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight">
                외식 창업의 든든한 동반자, <br className="hidden sm:inline" />
                <span className="text-[#D4AF37]">산학협력 가족기업 & MOU 파트너</span>
              </h1>
              <p className="text-xs sm:text-sm text-emerald-100/90 font-medium leading-relaxed">
                사단법인 한국외식창업교육원은 주방설비, 식자재 유통, 프랜차이즈, 위생 솔루션 등 분야별 국내 최고 기업들과의 공식 업무협약을 통해 수강생들의 성공적인 창업을 전방위로 지원합니다.
              </p>
            </div>
            <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-[#C5A059]/15 rounded-full blur-3xl pointer-events-none" />
          </div>
        </ScrollReveal>

        {/* SECTION 1: INFINITE ROLLING LOGO SLIDER (고객 반영사항: 협력업체 로고들이 좌우로 슬라이딩되는 롤링 디자인) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b-2 border-[#0B3C26] pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#C5A059]" />
              <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
                공식 협력업체 롤링 파트너스
              </h2>
            </div>
            <span className="text-xs text-stone-500 font-bold hidden sm:inline">
              마우스를 올리면 슬라이드가 일시 정지됩니다
            </span>
          </div>

          {/* Rolling Marquee Container */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-md space-y-5 overflow-hidden">
            
            {/* Track 1: Sliding Left */}
            <div className="overflow-hidden relative py-1">
              <div className="animate-marquee-left flex items-center gap-4">
                {[...partnersList, ...partnersList].map((partner, idx) => {
                  const isClickable = Boolean(partner.linkUrl);
                  const CardWrapper = isClickable ? 'a' : 'div';
                  const wrapperProps = isClickable
                    ? {
                        href: partner.linkUrl,
                        target: '_blank',
                        rel: 'noopener noreferrer',
                        title: `${partner.name} 공식 사이트 방문`,
                      }
                    : {};

                  return (
                    <CardWrapper
                      key={`track1-${idx}`}
                      {...wrapperProps}
                      className="flex items-center gap-3.5 px-5 py-3.5 rounded-2xl bg-stone-50 border border-stone-200 hover:border-[#0B3C26] hover:bg-emerald-50/50 transition-all shrink-0 shadow-2xs group cursor-pointer"
                    >
                      <div className="w-11 h-11 rounded-xl bg-white border border-stone-200 p-1 flex items-center justify-center overflow-hidden shrink-0 shadow-xs group-hover:border-[#0B3C26] transition-colors">
                        {partner.image ? (
                          <img
                            src={partner.image}
                            alt={partner.name}
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                              const fb = e.currentTarget.parentElement?.querySelector('.track1-fallback');
                              if (fb) fb.style.display = 'flex';
                            }}
                          />
                        ) : null}
                        <div
                          className="track1-fallback w-full h-full flex flex-col items-center justify-center bg-[#0B3C26] text-[#D4AF37] rounded-lg"
                          style={{ display: partner.image ? 'none' : 'flex' }}
                        >
                          <Building2 className="w-4 h-4 mb-0.5" />
                          <span className="text-[7px] font-black font-mono leading-none truncate max-w-[36px]">
                            {partner.logoText || 'MOU'}
                          </span>
                        </div>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block">
                          {partner.category}
                        </span>
                        <strong className="text-sm font-black text-stone-900 group-hover:text-[#0B3C26] transition-colors whitespace-nowrap">
                          {partner.name}
                        </strong>
                      </div>
                      <span className="text-[10px] font-bold bg-[#C5A059]/20 text-[#0B3C26] px-2 py-0.5 rounded-full whitespace-nowrap">
                        {partner.tag}
                      </span>
                    </CardWrapper>
                  );
                })}
              </div>
            </div>

            {/* Track 2: Sliding Right */}
            <div className="overflow-hidden relative py-1">
              <div className="animate-marquee-right flex items-center gap-4">
                {[...partnersList.slice().reverse(), ...partnersList.slice().reverse()].map((partner, idx) => {
                  const isClickable = Boolean(partner.linkUrl);
                  const CardWrapper = isClickable ? 'a' : 'div';
                  const wrapperProps = isClickable
                    ? {
                        href: partner.linkUrl,
                        target: '_blank',
                        rel: 'noopener noreferrer',
                        title: `${partner.name} 공식 사이트 방문`,
                      }
                    : {};

                  return (
                    <CardWrapper
                      key={`track2-${idx}`}
                      {...wrapperProps}
                      className="flex items-center gap-3.5 px-5 py-3.5 rounded-2xl bg-stone-50 border border-stone-200 hover:border-[#C5A059] hover:bg-amber-50/40 transition-all shrink-0 shadow-2xs group cursor-pointer"
                    >
                      <div className="w-11 h-11 rounded-xl bg-white border border-stone-200 p-1 flex items-center justify-center overflow-hidden shrink-0 shadow-xs group-hover:border-[#C5A059] transition-colors">
                        {partner.image ? (
                          <img
                            src={partner.image}
                            alt={partner.name}
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                              const fb = e.currentTarget.parentElement?.querySelector('.track2-fallback');
                              if (fb) fb.style.display = 'flex';
                            }}
                          />
                        ) : null}
                        <div
                          className="track2-fallback w-full h-full flex flex-col items-center justify-center bg-stone-800 text-white rounded-lg"
                          style={{ display: partner.image ? 'none' : 'flex' }}
                        >
                          <Building2 className="w-4 h-4 mb-0.5" />
                          <span className="text-[7px] font-black font-mono leading-none truncate max-w-[36px]">
                            {partner.logoText || 'MOU'}
                          </span>
                        </div>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block">
                          {partner.category}
                        </span>
                        <strong className="text-sm font-black text-stone-900 group-hover:text-[#C5A059] transition-colors whitespace-nowrap">
                          {partner.name}
                        </strong>
                      </div>
                      <span className="text-[10px] font-bold bg-stone-200 text-stone-800 px-2 py-0.5 rounded-full whitespace-nowrap">
                        {partner.tag || '가족기업'}
                      </span>
                    </CardWrapper>
                  );
                })}
              </div>
            </div>

          </div>
        </div>

        {/* SECTION 2: MOU SIGNING PHOTOS (고객 반영사항: 업무협약 관련 사진 등록) */}
        <div id="partners-mou" className="space-y-6 scroll-mt-28">

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-2 border-[#0B3C26] pb-3">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-100 text-[#0B3C26] text-xs font-black mb-1">
                <Award className="w-3.5 h-3.5" />
                <span>OFFICIAL MOU ARCHIVES</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
                업무협약(MOU) 공식 체결 현장 기록
              </h2>
            </div>
            <span className="text-xs font-black text-[#0B3C26] bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 self-start sm:self-auto">
              사단법인 공식 체결 건수 35+
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mouPhotos.map((photo) => (
              <ScrollReveal key={photo.id} direction="up" delay={photo.id * 80}>
                <div
                  onClick={() => setSelectedPhoto(photo)}
                  className="group bg-white rounded-2xl overflow-hidden border border-stone-200 hover:border-[#0B3C26] shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col h-full"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                    <img
                      src={photo.image}
                      alt={photo.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-[#0B3C26]/90 text-white text-[10px] font-black px-2.5 py-1 rounded-md">
                      MOU 협약식
                    </div>
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white">
                      <Maximize2 className="w-6 h-6 drop-shadow-md" />
                    </div>
                  </div>

                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-2">
                    <div className="space-y-1">
                      <span className="text-[11px] text-stone-500 font-bold flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-[#C5A059]" />
                        <span>{photo.date}</span>
                      </span>
                      <h3 className="font-black text-sm text-gray-900 group-hover:text-[#0B3C26] transition-colors line-clamp-2">
                        {photo.title}
                      </h3>
                    </div>
                    <p className="text-xs text-stone-600 line-clamp-2 font-medium leading-relaxed">
                      {photo.desc}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* SECTION 3: PARTNER COMPANIES DETAIL CARDS */}
        <div className="space-y-6">
          <div className="border-b-2 border-[#0B3C26] pb-3 flex items-center justify-between flex-wrap gap-2">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
                공식 협력업체 및 제휴 기관 상세 네트워크
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 font-medium mt-1">
                각 분야별 최고 전문성을 갖춘 파트너 기업 및 주무관청이 교육원 수강생에게 맞춤형 창업 솔루션을 제공합니다.
              </p>
            </div>
            <span className="text-xs font-bold text-[#0B3C26] bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
              총 {partnersList.length}개 기관 제휴
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {partnersList.map((partner) => (
              <div
                key={partner.id}
                className="bg-white rounded-2xl p-6 border border-stone-200 hover:border-[#0B3C26] shadow-xs hover:shadow-md transition-all space-y-4 flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between border-b border-stone-100 pb-3 gap-3">
                    <div className="flex items-center gap-3">
                      {/* Logo Image or Fallback */}
                      <div className="w-12 h-12 rounded-xl bg-stone-50 border border-stone-200 p-1.5 flex items-center justify-center overflow-hidden shrink-0 group-hover:border-[#0B3C26] transition-colors">
                        {partner.image ? (
                          <img
                            src={partner.image}
                            alt={partner.name}
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                              const fb = e.currentTarget.parentElement?.querySelector('.card-fallback');
                              if (fb) fb.style.display = 'flex';
                            }}
                          />
                        ) : null}
                        <div
                          className="card-fallback w-full h-full flex flex-col items-center justify-center bg-stone-100 rounded-lg text-stone-600"
                          style={{ display: partner.image ? 'none' : 'flex' }}
                        >
                          <Building2 className="w-5 h-5 text-[#0B3C26]" />
                          <span className="text-[7px] font-black font-mono leading-none mt-0.5 truncate max-w-[36px]">
                            {partner.logoText || 'MOU'}
                          </span>
                        </div>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">
                          {partner.category}
                        </span>
                        <h3 className="text-base sm:text-lg font-black text-stone-900 mt-1 group-hover:text-[#0B3C26] transition-colors">
                          {partner.name}
                        </h3>
                      </div>
                    </div>
                    <span className="text-xs font-black text-[#C5A059] bg-stone-50 px-2.5 py-1 rounded-lg border border-stone-200 shrink-0">
                      {partner.tag}
                    </span>
                  </div>

                  <p className="text-xs text-stone-600 font-medium leading-relaxed">
                    {partner.desc}
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs font-bold text-stone-500 border-t border-stone-100">
                  <span className="flex items-center gap-1 text-[#0B3C26]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>산학협력 공식 조인</span>
                  </span>
                  {partner.linkUrl ? (
                    <a
                      href={partner.linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-700 hover:text-[#0B3C26] flex items-center gap-1 font-mono text-[11px] hover:underline"
                    >
                      <span>공식 사이트</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <span className="text-stone-400 font-mono text-[11px]">
                      {partner.logoText || 'MOU'}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 4: PARTNERSHIP INQUIRY BANNER */}
        <div id="partners-inquiry" className="bg-[#0B3C26] text-white rounded-3xl p-6 sm:p-10 border-2 border-[#C5A059] shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 scroll-mt-28">

          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-black">
              사단법인 한국외식창업교육원과 함께할 협력기업을 모십니다
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100 font-medium">
              주방기기, 식자재 공급, 프랜차이즈, 지자체 로컬푸드 등 산학협력 및 업무협약(MOU) 제휴를 상시 접수합니다.
            </p>
          </div>
          <button
            onClick={() => window.location.href = 'tel:010-8914-1188'}
            className="px-6 py-3 bg-[#C5A059] hover:bg-[#d8b368] text-stone-950 font-black text-sm rounded-xl shadow-lg transition-all flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <span>MOU 제휴 문의 (010-8914-1188)</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Photo Detail Modal */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm cursor-pointer animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border-2 border-[#0B3C26] cursor-default flex flex-col max-h-[90vh]"
          >
            <div className="bg-[#0B3C26] text-white p-4 px-6 flex items-center justify-between">
              <span className="text-xs font-black text-[#D4AF37]">
                MOU 공식 협약 기록
              </span>
              <button
                onClick={() => setSelectedPhoto(null)}
                className="w-8 h-8 rounded-full bg-black/20 hover:bg-black/40 flex items-center justify-center text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="relative aspect-[16/10] bg-stone-900 overflow-hidden">
              <img
                src={selectedPhoto.image}
                alt={selectedPhoto.title}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="p-6 space-y-3 overflow-y-auto">
              <span className="text-xs text-stone-500 font-bold block">
                {selectedPhoto.date}
              </span>
              <h3 className="text-lg sm:text-xl font-black text-gray-900">
                {selectedPhoto.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-medium">
                {selectedPhoto.desc}
              </p>
            </div>

            <div className="bg-stone-50 p-4 border-t border-stone-200 flex justify-end">
              <button
                onClick={() => setSelectedPhoto(null)}
                className="px-5 py-2 bg-[#0B3C26] text-white text-xs font-bold rounded-xl hover:bg-[#072819] transition-colors cursor-pointer"
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
