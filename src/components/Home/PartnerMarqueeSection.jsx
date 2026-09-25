import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { Handshake, ExternalLink, Sparkles, Building2 } from 'lucide-react';

export const DEFAULT_PARTNER_LOGOS = [
  {
    id: 'p1',
    name: '농림축산식품부',
    category: '주무관청',
    tag: '정부기관',
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
    logoText: 'HWANGTAE',
    image: '',
    linkUrl: '',
    active: true,
  },
  {
    id: 'p11',
    name: 'VEN60',
    category: '외식 공간 디자인',
    tag: 'CX 파사드 인테리어',
    logoText: 'VEN60 DESIGN',
    image: '',
    linkUrl: '',
    active: true,
  },
  {
    id: 'p12',
    name: '닥터장 베이킹랩',
    category: '베이커리 & 디저트',
    tag: '제과제빵 R&D',
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
    <section className="py-12 sm:py-16 bg-[#F8F6F0] border-t border-b border-[#E7E2D8] overflow-hidden relative font-sans">
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
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#F8F6F0] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#F8F6F0] to-transparent z-10 pointer-events-none" />

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
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-center">
                      <Building2 className="w-5 h-5 text-[#0B3C26] group-hover/card:text-[#C5A059] transition-colors" />
                      <span className="text-[8px] font-black text-stone-500 font-mono leading-none mt-0.5 truncate max-w-[40px]">
                        {partner.logoText || 'MOU'}
                      </span>
                    </div>
                  )}
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
