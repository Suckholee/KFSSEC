import React from 'react';
import { Award, GraduationCap, Briefcase, BookOpen, Presentation, CheckCircle, Scale } from 'lucide-react';

export default function GreetingsSection() {
  const profileSections = [
    {
      title: '학력',
      icon: GraduationCap,
      items: [
        '캐롤라인대학교 경영학박사',
        '동의대학교 대학원 박사수료 (호텔,외식,관광)',
        '강릉원주대학교 박사 수료 (관광,외식)',
      ],
    },
    {
      title: '경력(40년)',
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
      title: '심사',
      icon: Scale,
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
      title: '저서',
      icon: BookOpen,
      items: [
        'NCS에 의한 양식조리기능사 Westen Cuisine',
        '고급서양조리 The Professional Western Cuisine',
        '소비자가 선호하는 외식업체의 고객만족도 요인에 관한 연구',
        '호텔레스토랑의 식공간 연출이 고객감정반응과 행동의도에 미치는 영향에 관한 연구',
      ],
    },
    {
      title: '강의',
      icon: Presentation,
      items: [
        '현) 한국외식창업교육원 교수',
        '현) 청년상인 육성재단 청년상인 지원단',
        '중소벤처기업부 소상공인지원단 전담교수',
        '산업인력관리공단 취업교육 강사(기초기능서비스업)',
        '동의대학교 외식조리와 겸임교수',
        '한중대학교 외식산업학과 겸임교수',
        '창신대학교 호텔 조리과 겸임교수',
        '창원시 청소년 직업상담 진로교육 상담위',
        '창원문성대학교 식품조리와 겸임교수',
      ],
    },
    {
      title: '상장',
      icon: Award,
      items: [
        '문화체육부 장관상(대상) 2015년 전통음식부분',
        '문화체육부 장관상(대상) 2014년 건강음식부분',
        '서울특별시장상(우수상) 2014년 일반부 단체부분',
        '서울특별시장상(대상) 2013년 라이브 요리 부분',
        '중국 남경시 약선요리대회 백금상(2등) 2011년 개인부분',
        '한국국제요리경영대회 금상 2010년 향토음식',
        '경상남도 도지사상 우수상 2008년 향토음식 개인요리 부분',
        '한국산업인력공단 경남지사장상 금상 2006년 개인요리 부분',
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

          {/* Right Column: Full Original Greeting Speech Text (Scaled Up Font Sizes) */}
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

      {/* BOTTOM SECTION: EXACT AN HYEONG-SANG PROFILE (Matching User Screenshot) */}
      <div className="bg-white rounded-3xl p-6 sm:p-12 border border-emerald-100 shadow-sm space-y-10">
        
        {/* Profile Card Header */}
        <div className="flex flex-col sm:flex-row sm:items-start gap-6 border-b border-gray-200 pb-8">
          <div className="w-32 sm:w-40 aspect-[3/4] rounded-2xl overflow-hidden border border-emerald-100 bg-stone-100 shrink-0 shadow-sm">
            <img
              src="/images/chairman_ahn_real.jpg?v=2"
              alt="안형상 이사장"
              className="w-full h-full object-cover object-top"
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 tracking-tight">
              안형상 이사장님 프로필
            </h3>
            <div className="space-y-2 text-base sm:text-lg font-extrabold text-gray-900">
              <p className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>대한민국 외식명장</span>
              </p>
              <p className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>사)한국외식 창업교육원 원장</span>
              </p>
              <p className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>대한민국 조리 명인 (사)한국외식창업교육원</span>
              </p>
              <p className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>국가 공인 대한민국 조리기능장 2003년</span>
              </p>
            </div>
          </div>
        </div>

        {/* Profile Section Rows */}
        <div className="space-y-8 divide-y divide-gray-100">
          {profileSections.map((sec, idx) => {
            const IconComp = sec.icon;
            return (
              <div key={idx} className="pt-8 first:pt-0 grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                <div className="md:col-span-3 flex items-center gap-2 text-gray-900 font-black text-lg sm:text-xl">
                  <IconComp className="w-6 h-6 text-[#0F5132] shrink-0" />
                  <span>{sec.title}</span>
                </div>
                <div className="md:col-span-9 space-y-2 text-sm sm:text-base lg:text-lg text-gray-800 font-medium">
                  {sec.items.map((item, itemIdx) => (
                    <p key={itemIdx} className="leading-relaxed">
                      {item}
                    </p>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>

    </section>
  );
}
