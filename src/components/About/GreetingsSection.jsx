import React from 'react';
import ScrollReveal from '../common/ScrollReveal';
import {
  Award,
  GraduationCap,
  Briefcase,
  BookOpen,
  Presentation,
  CheckCircle2,
  Scale,
  Medal,
  Star,
  Building2,
  BookmarkCheck,
} from 'lucide-react';

export default function GreetingsSection({ viewMode = 'all' }) {
  const highlightPoints = [
    {
      num: '1',
      title: '실무중심의 전문 교육',
      desc: '이론에 그치지 않고 현장에 즉시 적용할 수 있는 실전 노하우를 교육합니다.',
    },
    {
      num: '2',
      title: '맞춤형 컨설팅',
      desc: '예비 창업자의 입지, 예산, 브랜드 콘셉트에 맞춘 1:1 밀착 솔루션을 제공합니다.',
    },
    {
      num: '3',
      title: '품질 및 위생관리 시스템',
      desc: '신뢰할 수 있는 매장 운영을 위해 최고 수준의 품질 및 위생 관리 기준을 전수합니다.',
    },
    {
      num: '4',
      title: '지속적인 사후관리 지원',
      desc: '단순 교육에 그치지 않고 창업 후 지속적인 경영 개선과 모니터링을 함께합니다.',
    },
  ];

  const profileCards = [
    {
      id: '01',
      title: '학력',
      subtitle: 'Academic Background',
      icon: GraduationCap,
      items: [
        '캐롤라인대학교 경영학박사',
        '동의대학교 대학원 박사수료 (호텔,외식,관광)',
        '강릉원주대학교 박사 수료 (관광,외식)',
      ],
    },
    {
      id: '02',
      title: '경력 (40년)',
      subtitle: '40 Years Career Journey',
      icon: Briefcase,
      items: [
        '웨스틴 조선호텔',
        '리츠칼튼호텔',
        '산피아 후쿠오카 리조트',
        '풀만 앰버서더 호텔',
        '쥬레스 가든 컨벤션 & 웨딩',
      ],
    },
    {
      id: '03',
      title: '국가 및 기관 심사위원',
      icon: Scale,
      subtitle: 'Official Committee Judge',
      items: [
        '조리기능장, 기능사, 산업기사 2005~2007년 실기심사위원',
        '전국 기능올림픽위원회 실기 심사위원',
        '지방 기능올림픽위원회 실기 심사위원',
        '중국약선협회 약선요리 실기 심사위원',
        '세계 음식 박람회 각 단체별 실기 심사위원',
        '대한민국 전통주 조주사 국가대표선발전 실기 심사위원',
      ],
    },
    {
      id: '04',
      title: '저서 및 학술연구',
      icon: BookOpen,
      subtitle: 'Publications & Research',
      items: [
        'NCS에 의한 양식조리기능사 Westen Cuisine',
        '고급서양조리 The Professional Western Cuisine',
        '소비자가 선호하는 외식업체의 고객만족도 요인에 관한 연구',
        '호텔레스토랑의 식공간 연출이 고객감정반응과 행동의도에 미치는 영향에 관한 연구',
      ],
    },
    {
      id: '05',
      title: '교수 및 전문 강의',
      icon: Presentation,
      subtitle: 'Lectures & Professorship',
      items: [
        '현) 한국외식창업교육원 교수',
        '현) 청년상인 육성재단 청년상인 지원단',
        '중소벤처기업부 소상공인지원단 전담교수',
        '산업인력관리공단 취업교육 강사(기초기능서비스업)',
        '동의대학교 / 한중대학교 외식산업학과 겸임교수',
        '창신대학교 / 창원문성대학교 겸임교수',
        '창원시 청소년 직업상담 진로교육 상담위',
      ],
    },
    {
      id: '06',
      title: '정부 표창 및 주요 수상',
      icon: Award,
      subtitle: 'Honors & Government Awards',
      items: [
        '문화체육부 장관상(대상) 2015년 전통음식부분',
        '문화체육부 장관상(대상) 2014년 건강음식부분',
        '서울특별시장상(우수상) 2014년 일반부 단체부분',
        '서울특별시장상(대상) 2013년 라이브 요리 부분',
        '중국 남경시 약선요리대회 백금상(2등) 2011년 개인부분',
        '한국국제요리경영대회 금상 2010년 향토음식',
        '경상남도 도지사상 우수상 / 한국산업인력공단 금상',
        '2005산청한방 웰빙요리대회 대상 2005년 개인 종합 최우수 부분',
      ],
    },
  ];

  const renderSpeechContent = () => (
    <>
      {/* Top Green Vision Banner */}
      <ScrollReveal direction="up" delay={0}>
        <div className="relative rounded-3xl p-8 sm:p-12 text-white shadow-xl overflow-hidden bg-[#073822] border border-emerald-500/30 min-h-[220px] flex items-center">
          <div className="absolute right-0 top-0 bottom-0 w-full sm:w-[65%] h-full overflow-hidden">
            <img
              src="/images/hero_bg.jpg"
              alt="한국외식창업교육원 시상식 현장 비전 배경"
              className="w-full h-full object-cover object-right opacity-90 filter contrast-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#073822] via-[#073822]/85 sm:via-[#073822]/70 to-transparent" />
          </div>

          <div className="relative z-10 max-w-2xl space-y-3">
            <span className="text-xs sm:text-sm font-black text-emerald-300 uppercase tracking-widest block drop-shadow-md">
              GREETINGS & VISION
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-black tracking-tight leading-tight text-white drop-shadow-lg">
              " 미래를 선도하는<br className="hidden sm:inline" />
              <span className="text-emerald-300"> 외식산업의 동반자, 한국외식창업교육원 </span>"
            </h2>
          </div>
        </div>
      </ScrollReveal>

      {/* Main Greetings Grid: Photo + Speech Body */}
      <div className="bg-white rounded-3xl p-6 sm:p-12 border border-emerald-100 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Portrait Photo & Title Box */}
          <div className="lg:col-span-4 space-y-5">
            <ScrollReveal direction="right" delay={100}>
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-emerald-100 bg-stone-100 aspect-[3/4]">
                <img
                  src="/images/chairman_ahn_real.jpg?v=2"
                  alt="안형상 이사장"
                  className="w-full h-full object-cover object-top hover:scale-103 transition-transform duration-500"
                />
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={200}>
              <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200/80 space-y-1.5 shadow-xs hover:border-emerald-300 transition-colors">
                <span className="font-extrabold text-gray-900 text-lg sm:text-xl block">안녕하십니까?</span>
                <span className="text-gray-700 font-bold text-base block">사단법인</span>
                <span className="text-gray-900 font-black text-xl sm:text-2xl block">한국외식창업교육원</span>
                <span className="text-[#0F5132] font-black text-xl sm:text-2xl block">
                  이사장 안형상<span className="text-gray-800 font-semibold text-base sm:text-lg">입니다.</span>
                </span>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Full Original Greeting Speech Text */}
          <div className="lg:col-span-8 space-y-8 text-gray-800 font-medium text-base sm:text-lg lg:text-xl leading-relaxed">
            
            {/* Opening Paragraphs */}
            <ScrollReveal direction="up" delay={150}>
              <div className="space-y-5 border-b border-gray-100 pb-8">
                <h3 className="text-2xl sm:text-3xl lg:text-3xl font-black text-gray-900 tracking-tight leading-snug">
                  안녕하십니까? 사단법인 한국외식창업교육원 이사장 안형상입니다.
                </h3>
                <p className="text-gray-900 font-bold leading-relaxed">
                  먼저 저희 한국외식창업교육원 홈페이지를 방문해 주신 여러분께 깊은 감사의 말씀을 전합니다.
                </p>
                <p className="leading-relaxed">
                  외식산업은 단순히 먹거리를 제공하는 것을 넘어, 사람들의 삶에 풍요와 행복을 더하며, 문화와 가치를 창출하는 중요한 산업으로 자리 잡았습니다. 급변하는 시대 속에서 외식산업은 창의성과 혁신, 그리고 진정성을 요구받고 있으며, 이러한 변화는 무한한 가능성과 도전의 기회를 열어주고 있습니다.
                </p>
                <p className="leading-relaxed">
                  사단법인 한국외식창업교육원은 "미래를 선도하는 외식산업의 동반자"라는 사명을 바탕으로, 창업을 준비하시는 분들과 현업에서 활동하고 계신 분들께 실질적이고 미래 지향적인 교육을 제공하기 위해 최선을 다하고 있습니다.
                </p>
                <p className="leading-relaxed">
                  우리는 여러분의 꿈과 비전을 실현할 수 있도록 든든한 동반자로 함께하며, 지속 가능한 외식산업 생태계를 구축하기 위해 노력하고 있습니다.
                </p>
              </div>
            </ScrollReveal>

            {/* I. 교육원의 운영 목표 */}
            <ScrollReveal direction="up" delay={200}>
              <div className="space-y-4 pt-2">
                <h4 className="text-xl sm:text-2xl font-black text-gray-900 inline-block bg-emerald-100/90 text-emerald-950 px-4 py-1.5 rounded-lg">
                  I. 교육원의 운영 목표
                </h4>
                <p className="text-sm sm:text-base text-gray-600 font-bold">
                  다음과 같은 세 가지 핵심 목표를 중심으로 운영되고 있습니다.
                </p>

                <div className="space-y-4 pt-2">
                  <ScrollReveal direction="up" delay={250}>
                    <div className="bg-stone-50 p-5 sm:p-6 rounded-2xl border border-stone-200/80 space-y-2 hover:bg-emerald-50/50 hover:border-emerald-200 transition-all">
                      <h5 className="font-black text-[#0F5132] text-lg sm:text-xl">
                        1. 미래지향적 교육
                      </h5>
                      <p className="text-sm sm:text-base text-gray-700 font-medium leading-relaxed">
                        급변하는 외식산업 트렌드와 기술을 반영한 실용적인 교육을 통해 시대가 요구하는 역량을 갖춘 인재를 양성합니다.
                      </p>
                    </div>
                  </ScrollReveal>

                  <ScrollReveal direction="up" delay={300}>
                    <div className="bg-stone-50 p-5 sm:p-6 rounded-2xl border border-stone-200/80 space-y-2 hover:bg-emerald-50/50 hover:border-emerald-200 transition-all">
                      <h5 className="font-black text-[#0F5132] text-lg sm:text-xl">
                        2. 실전 중심의 통합 솔루션
                      </h5>
                      <p className="text-sm sm:text-base text-gray-700 font-medium leading-relaxed">
                        창업의 첫걸음부터 안정적인 정착에 이르기까지 컨설팅, 멘토링, 마케팅 지원 등 외식 창업 전 과정에 필요한 종합적인 솔루션을 제공합니다.
                      </p>
                    </div>
                  </ScrollReveal>

                  <ScrollReveal direction="up" delay={350}>
                    <div className="bg-stone-50 p-5 sm:p-6 rounded-2xl border border-stone-200/80 space-y-2 hover:bg-emerald-50/50 hover:border-emerald-200 transition-all">
                      <h5 className="font-black text-[#0F5132] text-lg sm:text-xl">
                        3. 상생과 협력의 네트워크
                      </h5>
                      <p className="text-sm sm:text-base text-gray-700 font-medium leading-relaxed">
                        창업자, 소상공인, 그리고 관련 기관 간의 긴밀한 협력 체계를 구축하여 외식산업 전반의 경쟁력을 높이고 지역사회 발전에 기여합니다.
                      </p>
                    </div>
                  </ScrollReveal>
                </div>
              </div>
            </ScrollReveal>

            {/* II. 맺음말 */}
            <ScrollReveal direction="up" delay={300}>
              <div className="space-y-4 pt-6 border-t border-gray-100">
                <h4 className="text-xl sm:text-2xl font-black text-gray-900 inline-block bg-emerald-100/90 text-emerald-950 px-4 py-1.5 rounded-lg">
                  II. 맺음말
                </h4>
                <p className="leading-relaxed">
                  외식업은 지속적인 도전과 열정을 필요로 하는 영역입니다. 하지만 올바른 길을 제시하고 함께 고민해 주는 파트너가 있다면, 도전은 더 이상 두려움이 아닌 성공의 시작이 될 것입니다.
                </p>
                <p className="leading-relaxed">
                  한국외식창업교육원은 여러분의 열정이 결실을 맺을 수 있도록 늘 곁에서 최고의 교육과 지원을 아끼지 않을 것을 약속드립니다.
                </p>
                <p className="leading-relaxed font-bold text-gray-900">
                  여러분의 원대한 꿈과 도전이 이곳 한국외식창업교육원에서 시작되기를 진심으로 응원합니다.
                </p>
                <p className="leading-relaxed pt-2 font-black text-[#0F5132]">
                  감사합니다.
                </p>

                <div className="pt-6 flex justify-end">
                  <div className="text-right space-y-1 bg-emerald-50/60 px-6 py-4 rounded-2xl border border-emerald-100 inline-block shadow-xs">
                    <span className="text-xs text-gray-500 font-bold block">사단법인 한국외식창업교육원</span>
                    <span className="text-[#0F5132] font-black text-xl sm:text-2xl">
                      이사장 안 형 상
                    </span>
                  </div>
                </div>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </div>

      {/* Highlight 4 Core Strengths Banner */}
      <ScrollReveal direction="up" delay={100}>
        <div className="bg-[#0F5132] rounded-3xl p-8 sm:p-12 text-white space-y-8 shadow-xl">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-black text-emerald-300 tracking-widest uppercase">
              WHY CHOOSE US
            </span>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
              한국외식창업교육원의 4가지 핵심 약속
            </h3>
            <p className="text-sm text-emerald-100 font-medium">
              성공적인 외식 창업을 위해 최고의 실무진과 차별화된 프로세스를 제공합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {highlightPoints.map((item, idx) => (
              <ScrollReveal key={item.num} direction="up" delay={150 + idx * 100}>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:bg-white/20 transition-all space-y-3 h-full">
                  <div className="w-10 h-10 rounded-xl bg-emerald-400 text-[#0F5132] font-black text-lg flex items-center justify-center shadow-md">
                    {item.num}
                  </div>
                  <h4 className="text-lg font-black text-white">{item.title}</h4>
                  <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </>
  );

  const renderProfileContent = () => (
    <div className="space-y-8 pt-2 animate-fadeIn font-sans text-gray-900">
      <ScrollReveal direction="up" delay={100}>
        <div className="border-b border-gray-200 pb-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-[#0F5132] text-xs font-black mb-2">
            <Medal className="w-3.5 h-3.5" />
            <span>40 YEARS OF DEDICATION & EXPERTISE</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            안형상 이사장 프로필 & 주요 약력
          </h3>
          <p className="text-sm text-gray-600 font-medium mt-1">
            특급호텔 40년 현장 경력과 국가 심사위원, 학술 연구를 갖춘 외식 명장의 발자취입니다.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {profileCards.map((card, idx) => {
          const IconComp = card.icon;
          return (
            <ScrollReveal key={card.id} direction="up" delay={100 + idx * 80}>
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-emerald-100/80 shadow-sm hover:shadow-xl hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between group h-full">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#0F5132] flex items-center justify-center group-hover:bg-[#0F5132] group-hover:text-white transition-colors shadow-xs">
                        <IconComp className="w-5 h-5 stroke-[2.2]" />
                      </div>
                      <div>
                        <h4 className="text-base sm:text-lg font-black text-gray-900">
                          {card.title}
                        </h4>
                        <span className="text-[11px] font-bold text-emerald-700 tracking-wider block">
                          {card.subtitle}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-black text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg">
                      {card.id}
                    </span>
                  </div>

                  <ul className="space-y-2.5 pt-1">
                    {card.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start gap-2 text-xs sm:text-sm text-gray-700 font-semibold leading-relaxed">
                        <BookmarkCheck className="w-4 h-4 text-[#0F5132] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </div>
  );

  return (
    <section className="space-y-12">
      {viewMode === 'speech' && renderSpeechContent()}
      {viewMode === 'profile' && renderProfileContent()}
      {viewMode === 'all' && (
        <>
          {renderSpeechContent()}
          {renderProfileContent()}
        </>
      )}
    </section>
  );
}
