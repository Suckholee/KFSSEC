import React from 'react';
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

export default function GreetingsSection() {
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

  return (
    <section className="space-y-12">
      
      {/* Top Green Banner */}
      <div className="bg-[#0F5132] rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-4xl space-y-3">
          <span className="text-xs sm:text-sm font-extrabold text-emerald-300 uppercase tracking-widest block">
            GREETINGS & VISION
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black tracking-tight leading-tight">
            " 미래를 선도하는<br className="hidden sm:inline" />
            <span className="text-emerald-300"> 외식산업의 동반자, 한국외식창업교육원 </span>"
          </h2>
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-emerald-500/10 rounded-r-3xl pointer-events-none" />
      </div>

      {/* Main Greetings Grid: Photo + Speech Body */}
      <div className="bg-white rounded-3xl p-6 sm:p-12 border border-emerald-100 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Portrait Photo & Title Box */}
          <div className="lg:col-span-4 space-y-5">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-emerald-100 bg-stone-100 aspect-[3/4]">
              <img
                src="/images/chairman_ahn_real.jpg?v=2"
                alt="안형상 이사장"
                className="w-full h-full object-cover object-top hover:scale-103 transition-transform duration-500"
              />
            </div>

            <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200/80 space-y-1.5">
              <span className="font-extrabold text-gray-900 text-lg sm:text-xl block">안녕하십니까?</span>
              <span className="text-gray-700 font-bold text-base block">사단법인</span>
              <span className="text-gray-900 font-black text-xl sm:text-2xl block">한국외식창업교육원</span>
              <span className="text-[#0F5132] font-black text-xl sm:text-2xl block">
                이사장 안형상<span className="text-gray-800 font-semibold text-base sm:text-lg">입니다.</span>
              </span>
            </div>
          </div>

          {/* Right Column: Full Original Greeting Speech Text */}
          <div className="lg:col-span-8 space-y-8 text-gray-800 font-medium text-base sm:text-lg lg:text-xl leading-relaxed">
            
            {/* Opening Paragraphs */}
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

            {/* I. 교육원의 운영 목표 */}
            <div className="space-y-4 pt-2">
              <h4 className="text-xl sm:text-2xl font-black text-gray-900 inline-block bg-emerald-100/90 text-emerald-950 px-4 py-1.5 rounded-lg">
                I. 교육원의 운영 목표
              </h4>
              <p className="text-sm sm:text-base text-gray-600 font-bold">
                다음과 같은 세 가지 핵심 목표를 중심으로 운영되고 있습니다.
              </p>

              <div className="space-y-4 pt-2">
                <div className="bg-stone-50 p-5 sm:p-6 rounded-2xl border border-stone-200/80 space-y-2">
                  <h5 className="font-black text-[#0F5132] text-lg sm:text-xl">
                    1. 미래지향적 교육
                  </h5>
                  <p className="text-base sm:text-lg text-gray-700 font-medium leading-relaxed">
                    빠르게 변화하는 외식 트렌드와 최신 기술을 반영한 교육 프로그램을 통해 시대를 앞서가는 전문가를 양성합니다.
                  </p>
                </div>

                <div className="bg-stone-50 p-5 sm:p-6 rounded-2xl border border-stone-200/80 space-y-2">
                  <h5 className="font-black text-[#0F5132] text-lg sm:text-xl">
                    2. 창업의 희망과 비전 제시
                  </h5>
                  <p className="text-base sm:text-lg text-gray-700 font-medium leading-relaxed">
                    단순히 성공을 넘어 지속 가능한 성장을 이루는 창업 모델과 전략을 제안합니다.
                  </p>
                </div>

                <div className="bg-stone-50 p-5 sm:p-6 rounded-2xl border border-stone-200/80 space-y-2">
                  <h5 className="font-black text-[#0F5132] text-lg sm:text-xl">
                    3. 진취적이고 혁신적인 지원
                  </h5>
                  <p className="text-base sm:text-lg text-gray-700 font-medium leading-relaxed">
                    창업자와 현업 종사자들이 새로운 도전을 두려움 없이 이어갈 수 있도록 실질적인 도움과 네트워크를 제공합니다.
                  </p>
                </div>
              </div>
            </div>

            {/* II. 외식산업 발전과 세계화 */}
            <div className="space-y-4 pt-4 border-t border-gray-100">
              <h4 className="text-xl sm:text-2xl font-black text-gray-900 inline-block bg-emerald-100/90 text-emerald-950 px-4 py-1.5 rounded-lg">
                II. 외식산업 발전과 세계화
              </h4>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-medium">
                특히, 저희는 농수축산물을 활용한 외식산업 발전과 우리 음식을 세계화하는 데에 큰 비전을 두고 있습니다. 국내 농축산물을 기반으로 한 혁신적인 음식 개발과 해외 홍보를 통해, 한국 음식이 세계 속에서 조화를 이루며 성장할 수 있도록 최선을 다하고 있습니다.
              </p>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-medium">
                또한, 퇴직자 및 실버 세대를 위한 웰빙 요리 교육, 식문화 개선을 위한 연구, 우수 회원사 및 명인 발굴과 같은 다양한 활동도 적극적으로 전개하고 있습니다.
              </p>
            </div>

            {/* III. 함께 성장하는 동반자 */}
            <div className="space-y-4 pt-4 border-t border-gray-100">
              <h4 className="text-xl sm:text-2xl font-black text-gray-900 inline-block bg-emerald-100/90 text-emerald-950 px-4 py-1.5 rounded-lg">
                III. 함께 성장하는 동반자
              </h4>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-medium">
                저희 한국외식창업교육원은 여러분과 함께 고민하고 성장하며, 대한민국 외식산업의 밝은 미래를 열어가는 데 헌신할 것입니다. 외식 창업을 꿈꾸는 모든 분들이 새로운 도전을 통해 희망과 성공의 결실을 맺을 수 있도록 저희의 모든 역량을 아낌없이 지원하겠습니다.
              </p>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-medium">
                앞으로도 저희 교육원이 제시하는 길이 여러분의 꿈과 열정에 힘을 실어드리기를 진심으로 바랍니다. 지속적인 관심과 성원을 부탁드리며, 여러분과 함께 더 나은 내일을 만들어가겠습니다. 감사합니다.
              </p>
            </div>

            {/* Signature */}
            <div className="pt-8 text-right border-t border-gray-100">
              <span className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight font-serif italic">
                이사장 <span className="text-[#0F5132] not-italic ml-2 text-3xl sm:text-4xl font-extrabold">안형상</span>
              </span>
            </div>

          </div>

        </div>
      </div>

      {/* PINTEREST-INSPIRED BALANCED PROFILE SECTION */}
      <div className="space-y-8">
        
        {/* Balanced Executive Identity Header Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border-t-4 border-t-[#0F5132] border-x border-b border-gray-200/90 shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Left: Photo & Titles */}
            <div className="md:col-span-7 flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <div className="w-32 sm:w-36 aspect-[3/4] rounded-2xl overflow-hidden border border-emerald-200 bg-stone-100 shrink-0 shadow-md">
                <img
                  src="/images/chairman_ahn_real.jpg?v=2"
                  alt="안형상 이사장"
                  className="w-full h-full object-cover object-top"
                />
              </div>

              <div className="space-y-3 text-center sm:text-left">
                <div>
                  <span className="text-xs font-black text-emerald-700 bg-emerald-100/80 px-3 py-1 rounded-full uppercase tracking-wider">
                    CHAIRMAN & FOUNDER
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mt-2">
                    안형상 이사장님 프로필
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                  <span className="px-3 py-1 bg-emerald-50 border border-emerald-200/80 rounded-lg text-xs font-bold text-[#0F5132]">
                    🏅 대한민국 외식명장
                  </span>
                  <span className="px-3 py-1 bg-emerald-50 border border-emerald-200/80 rounded-lg text-xs font-bold text-[#0F5132]">
                    🏛️ (사)한국외식창업교육원 원장
                  </span>
                  <span className="px-3 py-1 bg-emerald-50 border border-emerald-200/80 rounded-lg text-xs font-bold text-[#0F5132]">
                    👑 대한민국 조리 명인
                  </span>
                  <span className="px-3 py-1 bg-emerald-50 border border-emerald-200/80 rounded-lg text-xs font-bold text-[#0F5132]">
                    📜 국가공인 조리기능장 (2003년)
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Balanced 2x2 Metric Grid */}
            <div className="md:col-span-5 grid grid-cols-2 gap-3.5 pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-stone-200 md:pl-8">
              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200/70 text-center">
                <span className="text-xl sm:text-2xl font-black text-[#0F5132] block">40년+</span>
                <span className="text-xs text-gray-600 font-bold">외식 실무 & 프랜차이즈</span>
              </div>
              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200/70 text-center">
                <span className="text-xl sm:text-2xl font-black text-[#0F5132] block">2003년</span>
                <span className="text-xs text-gray-600 font-bold">국가공인 조리기능장</span>
              </div>
              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200/70 text-center">
                <span className="text-xl sm:text-2xl font-black text-[#0F5132] block">9회+</span>
                <span className="text-xs text-gray-600 font-bold">장관상 및 주요 수상</span>
              </div>
              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200/70 text-center">
                <span className="text-xl sm:text-2xl font-black text-[#0F5132] block">100+</span>
                <span className="text-xs text-gray-600 font-bold">가맹점 브랜딩 개발</span>
              </div>
            </div>

          </div>
        </div>

        {/* Pinterest Symmetric 3-Column Equal-Balanced Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {profileCards.map((card) => {
            const IconComp = card.icon;
            return (
              <div
                key={card.id}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/90 hover:border-emerald-500 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Card Top Pill & Icon */}
                  <div className="flex items-center justify-between mb-4 border-b border-stone-100 pb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-[#0F5132] group-hover:bg-[#0F5132] group-hover:text-white flex items-center justify-center transition-colors shadow-xs">
                        <IconComp className="w-5 h-5 stroke-[2.2]" />
                      </div>
                      <div>
                        <h4 className="text-base sm:text-lg font-black text-gray-900 group-hover:text-[#0F5132] transition-colors">
                          {card.title}
                        </h4>
                        <span className="text-[11px] font-bold text-gray-400 block tracking-tight">
                          {card.subtitle}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-black text-[#0F5132] bg-emerald-50 px-2.5 py-1 rounded-md">
                      {card.id}
                    </span>
                  </div>

                  {/* List Items */}
                  <div className="space-y-2 text-xs sm:text-sm text-gray-700 font-medium pt-1">
                    {card.items.map((item, itemIdx) => (
                      <div key={itemIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-[11px] font-bold text-gray-400">
                  <span>한국외식창업교육원</span>
                  <span className="text-emerald-700 font-bold">{card.items.length}개 이력</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>

    </section>
  );
}
