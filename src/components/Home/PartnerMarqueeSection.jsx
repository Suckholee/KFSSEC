import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { Handshake, ExternalLink, Sparkles, Building2 } from 'lucide-react';

export const DEFAULT_PARTNER_LOGOS = [
  {
    id: 'p1',
    name: '농림축산식품부',
    category: '주무관청',
    tag: '정부기관',
    desc: '사단법인 한국외식창업교육원의 주무관청으로서 K-외식 창업 및 전통 식문화 계승, 농수산물 외식 소비 촉진을 종합 지도합니다.',
    logoText: 'MAFRA',
    image: '',
    linkUrl: 'https://www.mafra.go.kr',
    active: true,
  },
  {
    id: 'p2',
    name: '소상공인시장진흥공단',
    category: '공공기관',
    tag: '정책자금 연계',
    desc: '소상공인 맞춤형 정책자금 연계, 온누리상품권 가맹 및 재도약 창업 패키지를 협력 지원하는 공공기관 파트너입니다.',
    logoText: 'SEMAS',
    image: '',
    linkUrl: 'https://www.sbiz.or.kr',
    active: true,
  },
  {
    id: 'p3',
    name: '강남구청',
    category: '지자체 협력',
    tag: '골목상권 상생',
    desc: '지역 상권 활성화 및 청년·신중년 외식 창업 육성을 위해 관내 외식 상생 인큐베이팅 프로그램을 공동 운영합니다.',
    logoText: 'GANGNAM-GU',
    image: '',
    linkUrl: 'https://www.gangnam.go.kr',
    active: true,
  },
  {
    id: 'p4',
    name: '(주)주방뱅크',
    category: '주방 설비 1위',
    tag: '3D 주방 설계',
    desc: '대한민국 1위 업소용 주방기구 및 설비 토탈 컨설팅 기업으로, 수강생 대상 주방 집기 특별 할인 및 3D 도면 설계를 지원합니다.',
    logoText: 'KITCHEN BANK',
    image: '',
    linkUrl: 'https://www.jubangbank.co.kr',
    active: true,
  },
  {
    id: 'p5',
    name: '(주)세진',
    category: '친환경 위생',
    tag: 'HACCP 솔루션',
    desc: 'HACCP 인증 친환경 주방 세척 및 살균 소독 시스템 전문 기업으로 안전한 위생 환경 구축을 보증합니다.',
    logoText: 'SEJIN CORP',
    image: '',
    linkUrl: '',
    active: true,
  },
  {
    id: 'p6',
    name: '(주)비엠스 인터내셔날',
    category: '글로벌 유통',
    tag: '식자재 B2B',
    desc: '프리미엄 수입 식자재 및 해외 향신료 유통 전문 기업으로 안정적인 B2B 원가 절감 유통망을 연계합니다.',
    logoText: 'BMS INTER',
    image: '',
    linkUrl: '',
    active: true,
  },
  {
    id: 'p7',
    name: '㈜자인',
    category: '발효소스 R&D',
    tag: '100년 전통 소스',
    desc: '100년 전통 발효 비법을 바탕으로 한 시그니처 소스 및 천연 조미 소재 개발 협력 파트너입니다.',
    logoText: 'JAIN FOODS',
    image: '',
    linkUrl: '',
    active: true,
  },
  {
    id: 'p8',
    name: '㈜다이닝에프앤비',
    category: 'F&B 프랜차이즈',
    tag: '브랜드 인큐베이팅',
    desc: '유망 외식 프랜차이즈 브랜드 기획 및 가맹 시스템 구축, 인큐베이팅을 협업하는 전문 F&B 그룹입니다.',
    logoText: 'DINING F&B',
    image: '',
    linkUrl: '',
    active: true,
  },
  {
    id: 'p9',
    name: '김태완스시',
    category: '일식 조리 연구',
    tag: '실전 외식 매장',
    desc: '전국 30여 개 매장을 운영 중인 초밥 전문 브랜드로, 실전 현장 인턴십 및 매장 경영 노하우를 공유합니다.',
    logoText: 'KIM TAE WAN',
    image: '',
    linkUrl: '',
    active: true,
  },
  {
    id: 'p10',
    name: '황태회관',
    category: '향토 음식 보존',
    tag: '전통 맛집 계승',
    desc: '평창 50년 전통의 대표 향토음식 전문점으로, 지역 농수특산물 연계 및 명인 레시피 상품화를 함께합니다.',
    logoText: 'HWANGTAE',
    image: '',
    linkUrl: '',
    active: true,
  },
  {
    id: 'p11',
    name: 'VEN60 (벤60)',
    category: '외식 공간 디자인',
    tag: 'CX 파사드 인테리어',
    desc: '호텔식 고급 디저트 및 제과제빵 전문 브랜드로, 수강생을 위한 바리스타 및 베이킹 실습 환경을 지원합니다.',
    logoText: 'VEN60 DESIGN',
    image: '',
    linkUrl: '',
    active: true,
  },
  {
    id: 'p12',
    name: '진도울돌목가는길',
    category: '수산물 특산 R&D',
    tag: '산지 수산물',
    desc: '청정 남도 해역 수산물 직거래 유통 및 특산물 기반 메뉴 개발을 협업하는 산지 직송 파트너입니다.',
    logoText: 'JINDO FOOD',
    image: '',
    linkUrl: '',
    active: true,
  },
  {
    id: 'p13',
    name: '닥터장 베이킹랩',
    category: '베이커리 & 디저트',
    tag: '제과제빵 R&D',
    desc: '제과기능장의 천연효모종 발효 빵 및 쌀 베이킹 레시피를 공동 개발하고 지도하는 전문 연구소입니다.',
    logoText: 'DR.JANG LAB',
    image: '',
    linkUrl: '',
    active: true,
  },
];

export default function PartnerMarqueeSection({ partnerLogos = [] }) {
  const { t } = useLanguage();

  // Active logos from props or fallback
  const rawList = partnerLogos && partnerLogos.length > 0 ? partnerLogos : DEFAULT_PARTNER_LOGOS;
  const activeLogos = rawList.filter((item) => item.active !== false);

  // Duplicate for seamless infinite loop (double length)
  const marqueeList = [...activeLogos, ...activeLogos];

  return (
    <section className="py-12 sm:py-16 bg-[#FAF8F5] border-b border-stone-200/80 overflow-hidden relative font-sans">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-40 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1520px] mx-auto px-4 sm:px-8 mb-8 text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0B3C26] text-[#D4AF37] border border-[#C5A059] text-xs font-black shadow-xs">
          <Handshake className="w-3.5 h-3.5" />
          <span>KFSSEC PARTNERS & MOU NETWORK</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
          {t('주요 협력 기관 및 산학 업무협약(MOU) 기업')}
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 font-medium max-w-2xl mx-auto">
          {t(
            '농림축산식품부 인가 사단법인 한국외식창업교육원과 함께 외식 산업의 미래를 열어가는 공식 파트너 네트워크입니다.'
          )}
        </p>
      </div>

      {/* Marquee Track Container with gradient fade edges */}
      <div className="relative w-full overflow-hidden group">
        {/* Left & Right Shadow Gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#FAF8F5] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#FAF8F5] to-transparent z-10 pointer-events-none" />

        {/* Continuous Scrolling Row */}
        <div
          className="flex items-center gap-5 w-max animate-marquee hover:[animation-play-state:paused]"
          style={{
            animation: 'marquee 35s linear infinite',
          }}
        >
          {marqueeList.map((partner, index) => {
            const isClickable = Boolean(partner.linkUrl);
            const CardWrapper = isClickable ? 'a' : 'div';
            const wrapperProps = isClickable
              ? {
                  href: partner.linkUrl,
                  target: '_blank',
                  rel: 'noopener noreferrer',
                  title: `${partner.name} 공식 사이트 열기`,
                }
              : {};

            return (
              <CardWrapper
                key={`${partner.id}-${index}`}
                {...wrapperProps}
                className="flex items-center gap-3.5 px-5 py-3.5 bg-white/95 rounded-2xl border border-stone-200/90 shadow-sm hover:shadow-md hover:border-[#0B3C26] hover:bg-white transition-all cursor-pointer shrink-0 select-none group/card"
              >
                {/* Logo Image or Initials Badge */}
                <div className="w-12 h-12 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-center p-1.5 overflow-hidden shrink-0 group-hover/card:border-[#C5A059] transition-colors">
                  {partner.image ? (
                    <img
                      src={partner.image}
                      alt={partner.name}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const fallback = e.currentTarget.parentElement?.querySelector('.fallback-badge');
                        if (fallback) fallback.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div
                    className="fallback-badge w-full h-full flex flex-col items-center justify-center text-center"
                    style={{ display: partner.image ? 'none' : 'flex' }}
                  >
                    <Building2 className="w-5 h-5 text-[#0B3C26] group-hover/card:text-[#C5A059] transition-colors" />
                    <span className="text-[8px] font-black text-stone-500 font-mono leading-none mt-0.5 truncate max-w-[40px]">
                      {partner.logoText || 'MOU'}
                    </span>
                  </div>
                </div>

                {/* Partner Details */}
                <div className="text-left space-y-0.5 min-w-[130px]">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold text-[#0B3C26] bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                      {partner.tag || partner.category}
                    </span>
                    {isClickable && (
                      <ExternalLink className="w-3 h-3 text-stone-400 group-hover/card:text-[#0B3C26] transition-colors" />
                    )}
                  </div>
                  <h4 className="text-sm font-black text-gray-900 group-hover/card:text-[#0B3C26] transition-colors">
                    {partner.name}
                  </h4>
                  <p className="text-[11px] text-gray-500 font-medium">
                    {partner.category}
                  </p>
                </div>
              </CardWrapper>
            );
          })}
        </div>
      </div>

      {/* Marquee Keyframes Inline Style */}
      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}
