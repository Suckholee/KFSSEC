import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import ScrollReveal from '../common/ScrollReveal';
import {
  Calendar,
  Award,
  Building2,
  Handshake,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  TrendingUp,
  Landmark,
  ShieldCheck,
} from 'lucide-react';

export default function HistorySection() {
  const { t } = useLanguage();

  const milestones = [
    {
      year: '2026',
      badge: '도약과 결실',
      badgeColor: 'bg-[#C5A059] text-stone-950 font-black',
      events: [
        {
          date: '2026.10',
          title: t('대한민국 자랑스러운 외식 명인·명장 인물대상 시상식 개최 (10월 19일)'),
          desc: t('외식 산업 발전 및 한식 세계화에 기여한 전국 명장·명인을 발굴하여 공식 인증패 및 인물대상 수여'),
          tag: '정기 시상식',
          icon: Award,
        },
        {
          date: '2026.08',
          title: t('외식창업 수강생 128명 돌파 및 N:N 매칭 포트폴리오 시스템 도입'),
          desc: t('수강생 1인이 다수의 조리/창업 커리큘럼을 연계 이수하고 정책자금 지원과 1:1 창업 코칭을 받는 선진 학사 체계 완성'),
          tag: '교육 혁신',
          icon: TrendingUp,
        },
        {
          date: '2026.03',
          title: t('소믈리에 파티컨설턴트 및 푸드테크 설계사 1·2급 자격 과정 정식 론칭'),
          desc: t('외식 트렌드 변화에 발맞춘 신개념 융합 전문 자격 검정 체계 구축'),
          tag: '자격 신설',
          icon: Sparkles,
        },
      ],
    },
    {
      year: '2025',
      badge: '전국 확장',
      badgeColor: 'bg-[#0B3C26] text-[#D4AF37] border border-[#C5A059]/40',
      events: [
        {
          date: '2025.09',
          title: t('제01회 K-FOOD 지역 특산물 연계 조리 경연대회 주관'),
          desc: t('지역 농수축산물 소비 활성화를 위한 전국 단위 창작 요리 경연 대회 성공적 개최'),
          tag: '요리대회',
          icon: Award,
        },
        {
          date: '2025.04',
          title: t('한국음식능력(K-FOOD) 1·2급 및 외식창업실무사 1·2급 검정 확대 인가'),
          desc: t('농림축산식품부 등록 민간자격 기준에 따른 현장 실기 중심 검정 라인업 완성'),
          tag: '자격 확대',
          icon: ShieldCheck,
        },
      ],
    },
    {
      year: '2024',
      badge: '산학 협력 & 언론 보도',
      badgeColor: 'bg-stone-800 text-stone-200',
      events: [
        {
          date: '2024.06',
          title: t('강남구 및 전국 지자체 소상공인 외식창업 경영개선 현장 컨설팅 협약'),
          desc: t('골목상권 활성화 및 예비·청년 창업가를 위한 지자체 연계 맞춤형 밀착 컨설팅 시행'),
          tag: '지자체 협력',
          icon: Landmark,
        },
        {
          date: '2024.02',
          title: t('2024 한국외식창업교육원 정기총회 개최 및 아시아창의방송(actv) 언론 보도'),
          desc: t('안형상 이사장 "100세 초고령 시대 맞춤형 교육을 통한 글로벌 K-FOOD 시대 개막" 비전 선포 및 대외 언론 보도'),
          tag: '언론 보도',
          icon: Sparkles,
        },
      ],
    },
    {
      year: '2023',
      badge: '10대 기업 MOU',
      badgeColor: 'bg-stone-700 text-stone-300',
      events: [
        {
          date: '2023.07',
          title: t('10대 산학 협력업체 전략적 업무협약(MOU) 체결'),
          desc: t('(주)주방뱅크, (주)세진, (주)비엠스 인터내셔날, (주)자인 등 외식 인프라 1위 기업들과 설비·위생·식자재 상생 네트워크 구축'),
          tag: '산학 MOU',
          icon: Handshake,
        },
        {
          date: '2023.03',
          title: t('외식창업지도사 1·2급 자격 과정 개시 및 1:1 도제식 전수 교육장 완공'),
          desc: t('강남 테헤란로 본원 실습실 개설 및 최고급 조리 설비 확충'),
          tag: '실습장 완공',
          icon: Building2,
        },
      ],
    },
    {
      year: '2022',
      badge: '공식 설립',
      badgeColor: 'bg-emerald-950 text-emerald-300 border border-emerald-800',
      events: [
        {
          date: '2022.07.12',
          title: t('사단법인 한국외식창업교육원 창립 및 비영리 사단법인 설립 허가'),
          desc: t('[민법] 제32조 및 농림축산식품부 소관 비영리법인의 설립 및 감독에 관한 규칙 제5조에 의거 공식 비영리 사단법인 설립 인가'),
          tag: '법인 설립',
          icon: Landmark,
        },
        {
          date: '2022.08',
          title: t('안형상 초대 이사장 취임 및 교육원 12대 핵심 추진 방향 선포'),
          desc: t('40년 경력의 조리명장 중심 실전형 외식 창업 인재 양성 목표 수립'),
          tag: '이사장 취임',
          icon: Award,
        },
      ],
    },
  ];

  return (
    <div className="space-y-8 animate-fadeIn w-full">
      {/* Header Banner */}
      <div className="relative bg-[#0B3C26] text-white rounded-3xl p-6 sm:p-10 border-2 border-[#C5A059] shadow-xl overflow-hidden">
        <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-[#C5A059]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C5A059]/20 border border-[#C5A059]/40 text-[#D4AF37] text-xs font-black">
            <Calendar className="w-3.5 h-3.5" />
            <span>KFSSEC HISTORY & FOOTSTEPS</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight font-serif text-white">
            {t('교육원 연혁 & 3대 발자취')}
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100/90 font-medium max-w-2xl leading-relaxed">
            {t(
              '2022년 설립 이래 농림축산식품부 인가 비영리 사단법인으로서 쌓아온 역사, 전국 지자체 협약 및 10대 산학 협력의 자랑스러운 기록입니다.'
            )}
          </p>
        </div>
      </div>

      {/* Interactive Timeline List */}
      <div className="relative border-l-2 border-[#C5A059]/40 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
        {milestones.map((milestone, mIdx) => (
          <ScrollReveal key={milestone.year} direction="up" delay={mIdx * 80}>
            <div className="relative space-y-6">
              {/* Year Marker Pin */}
              <div className="absolute -left-[35px] sm:-left-[51px] top-0 flex items-center justify-center">
                <div className="w-6 h-6 rounded-full bg-[#0B3C26] border-4 border-[#C5A059] shadow-md flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                </div>
              </div>

              {/* Year Header */}
              <div className="flex items-center gap-3">
                <span className="text-3xl sm:text-4xl font-black text-[#0B3C26] tracking-tight font-serif">
                  {milestone.year}
                </span>
                <span
                  className={`text-xs px-3 py-1 rounded-full font-bold shadow-xs ${milestone.badgeColor}`}
                >
                  {milestone.badge}
                </span>
              </div>

              {/* Event Cards Grid */}
              <div className="grid grid-cols-1 gap-4">
                {milestone.events.map((evt, eIdx) => {
                  const Icon = evt.icon;
                  return (
                    <div
                      key={eIdx}
                      className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm hover:shadow-md hover:border-[#0B3C26] transition-all flex flex-col sm:flex-row sm:items-start justify-between gap-4 group"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#0B3C26] border border-emerald-200 flex items-center justify-center shrink-0 group-hover:bg-[#0B3C26] group-hover:text-[#D4AF37] transition-colors mt-0.5">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-black text-[#C5A059]">
                              {evt.date}
                            </span>
                            <span className="text-[11px] font-bold px-2 py-0.5 bg-stone-100 text-stone-600 rounded-md">
                              {evt.tag}
                            </span>
                          </div>
                          <h4 className="text-base font-black text-gray-900 group-hover:text-[#0B3C26] transition-colors">
                            {evt.title}
                          </h4>
                          <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed">
                            {evt.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
