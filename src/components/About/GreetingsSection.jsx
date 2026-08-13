import React from 'react';
import { CheckCircle2, GraduationCap, Award, BookOpen, Presentation, Briefcase, Utensils } from 'lucide-react';

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

  const profileData = [
    {
      category: '학력',
      icon: GraduationCap,
      items: [
        '세종대학교 외식경영학 석사',
        '경기대학교 외식조리경영학 경영학 박사 수료',
        '세종대학교 외식창업 최고위과정 수료',
      ],
    },
    {
      category: '외식브랜드',
      icon: Utensils,
      items: [
        '㈜외식창업 대표이사',
        '㈜프랜차이즈 대표이사',
        '다수의 외식 브랜드 대표 및 전담 브랜딩 개발',
        '한식·일식·카페 시그니처 메뉴 개발 총괄',
        '프랜차이즈 가맹점 100여 개소 운영 및 관리',
      ],
    },
    {
      category: '경력',
      icon: Briefcase,
      items: [
        '사단법인 한국외식창업교육원 이사장/원장 (2022~현재)',
        '소상공인시장진흥공단 외식 전문 컨설턴트',
        '농림축산식품부 외식산업 자문위원',
        '경기대학교 외식조리경영학과 겸임교수',
        '전국외식업경영자연합회 이사',
        '국내 주요 외식 프랜차이즈 총괄대표 및 경영고문',
      ],
    },
    {
      category: '저서',
      icon: BookOpen,
      items: [
        '외식창업 성공방정식 (Fast Track to Success)',
        '프랜차이즈 시스템 구축 실무 (Franchise System)',
        '소상공인 외식창업 가이드북 (Small Business Guide)',
        '외식업 메뉴 개발과 마케팅 전략 (Menu & Marketing Strategy)',
      ],
    },
    {
      category: '강의',
      icon: Presentation,
      items: [
        '외식창업 실무 및 상권분석 전담 강의',
        '프랜차이즈 가맹사업 성공 노하우 특강',
        '소상공인 외식업 매출 증대 마케팅 특강',
        '외식업 메뉴 개발 및 원가 관리 강의',
        '외식업 수강생 대상 1:1 맞춤 창업 멘토링',
        '국비지원 외식 창업자 교육 실무 강의',
        '지자체 외식업 활성화 프로젝트 전담 강사',
      ],
    },
    {
      category: '수상',
      icon: Award,
      items: [
        '농림축산식품부 장관 표창 (외식산업 발전 공로)',
        '소상공인연합회 대한민국 소상공인 대상 수상',
        '서울특별시 시장 표창 (외식 창업 활성화 기여)',
        '대한민국 외식산업대상 외식경영대상 수상',
        '경기도지사 표창 (지역 외식산업 발전 공로)',
        '한국외식경영학회 외식경영대상 수상',
        '외식산업발전 우수 유공자 정부 표창',
        '소상공인 자문 공로상 및 감사패 다수 수상',
      ],
    },
  ];

  return (
    <section className="space-y-12">
      
      {/* Top Green Banner */}
      <div className="bg-[#0F5132] rounded-3xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-2">
          <span className="text-xs font-bold text-emerald-300 uppercase tracking-widest block">
            GREETINGS & VISION
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight">
            "미래를 선도하는 외식창업의 동반자,<br className="hidden sm:inline" />
            <span className="text-emerald-300"> 한국외식창업교육원</span>"
          </h2>
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-emerald-500/10 rounded-r-3xl pointer-events-none" />
      </div>

      {/* Main Greetings Grid: Photo + Speech Body */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-emerald-100 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Portrait & Title Box */}
          <div className="lg:col-span-4 space-y-4">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-emerald-100 bg-stone-100 aspect-[3/4]">
              <img
                src="/images/chairman_ahn.jpg"
                alt="안형상 이사장/원장"
                className="w-full h-full object-cover object-top hover:scale-103 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-xs font-bold text-emerald-300 block">이사장 / 원장</span>
                <span className="text-xl font-black tracking-tight">안형상</span>
              </div>
            </div>

            <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200/80 text-xs sm:text-sm space-y-1">
              <span className="font-bold text-emerald-900 block">사단법인 한국외식창업교육원</span>
              <p className="text-gray-600 font-medium">
                이사장/원장 <strong className="text-gray-900">안형상</strong>
              </p>
            </div>
          </div>

          {/* Right Column: Full Greeting Text */}
          <div className="lg:col-span-8 space-y-6 text-gray-700 font-medium text-sm sm:text-base leading-relaxed">
            
            <div className="space-y-4">
              <p className="text-lg font-bold text-gray-900">
                안녕하십니까! 사단법인 한국외식창업교육원 이사장/원장 안형상입니다.
              </p>
              <p>
                우리 한국외식창업교육원을 찾아주신 예비 창업자 및 외식업계 종사자 여러분께 진심으로 감사드립니다.
              </p>
              <p>
                외식산업은 단순한 먹거리를 제공하는 창업을 넘어, 세련된 시각과 창의적인 서비스를 접목하는 창조적 산업으로 발전하고 있습니다. 그러나 체계적인 준비와 전문 지식 없이 시작하는 외식 창업은 수많은 위험을 내포하고 있습니다.
              </p>
              <p>
                이에 사단법인 한국외식창업교육원은 예비 창업자와 기존 외식업 경영주들이 성공적인 창업과 지속 가능한 성장을 이룰 수 있도록, 실무 중심의 전문 교육과 맞춤형 컨설팅을 제공하고 있습니다. 다양한 업종별·단계별 교육 커리큘럼을 비롯하여, 현장 실습 및 R&D, 경영 노하우 전수까지 포함된 통합 시스템을 통해 성공 창업의 길을 열어드리고 있습니다.
              </p>
            </div>

            {/* 4 Highlight Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-3">
              {highlightPoints.map((pt) => (
                <div
                  key={pt.num}
                  className="bg-stone-50 p-4 rounded-2xl border border-stone-200/80 space-y-1.5 hover:border-emerald-300 hover:bg-emerald-50/40 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#0F5132] text-white text-xs font-black flex items-center justify-center shrink-0">
                      {pt.num}
                    </span>
                    <h4 className="text-sm font-bold text-gray-900 underline decoration-emerald-400 decoration-2 underline-offset-4">
                      {pt.title}
                    </h4>
                  </div>
                  <p className="text-xs text-gray-600 font-medium leading-normal pl-8">
                    {pt.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Sub Section 1: 지속 가능한 성장과 상생의 가치 */}
            <div className="space-y-2 pt-2">
              <h4 className="text-base font-black text-[#0F5132] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>지속 가능한 성장과 상생의 가치</span>
              </h4>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                우리 교육원은 단순히 외식업체를 늘리는 데 그치지 않고, 소상공인과 함께 성장하며 상생하는 외식 생태계를 만드는 데 기여하고자 합니다. 지역 사회와의 상생, 로컬 식자재 활용, 지속 가능한 경영 모델 개발을 통해 외식산업의 선순환 구조를 만들어 가고 있습니다.
              </p>
            </div>

            {/* Sub Section 2: 혁신을 선도하는 파트너 */}
            <div className="space-y-2">
              <h4 className="text-base font-black text-[#0F5132] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>혁신을 선도하는 파트너</span>
              </h4>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                사단법인 한국외식창업교육원은 시대의 변화를 읽고, AI·푸드테크 등 차세대 외식 트렌드를 빠르게 선도해 나가고 있습니다. 도전과 혁신을 멈추지 않는 여러분의 든든한 페이스메이커로서 언제나 곁에서 함께하겠습니다.
              </p>
            </div>

            <p className="pt-2 text-gray-800 font-medium">
              여러분의 성공 창업과 외식산업의 발전을 위해 최선을 다할 것을 약속드립니다. 감사합니다.
            </p>

            <div className="pt-4 text-right">
              <span className="text-sm font-bold text-gray-500 block">사단법인 한국외식창업교육원</span>
              <span className="text-lg font-black text-gray-900 tracking-tight">
                이사장/원장 <span className="text-[#0F5132] text-xl font-extrabold ml-1">안 형 상</span>
              </span>
            </div>

          </div>

        </div>
      </div>

      {/* BOTTOM SECTION: AN HYEONG-SANG CHAIRMAN FULL PROFILE */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-emerald-100 shadow-sm space-y-8">
        
        {/* Profile Card Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-6">
          <div>
            <span className="text-xs font-black text-emerald-600 tracking-widest uppercase block">
              CHAIRMAN PROFILE
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              안형상 이사장님 프로필
            </h3>
          </div>
          <div className="bg-emerald-50 px-4 py-2 rounded-2xl border border-emerald-200/80 text-xs font-bold text-emerald-900 self-start sm:self-auto">
            국내 외식 경영·컨설팅 전문가 20여 년
          </div>
        </div>

        {/* Profile Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {profileData.map((sec, idx) => {
            const IconComp = sec.icon;
            return (
              <div
                key={idx}
                className="bg-stone-50/80 rounded-2xl p-6 border border-stone-200/80 hover:bg-white hover:border-emerald-300 hover:shadow-md transition-all space-y-3"
              >
                <div className="flex items-center gap-2.5 text-[#0F5132]">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100/80 flex items-center justify-center shrink-0">
                    <IconComp className="w-4 h-4 stroke-[2.2]" />
                  </div>
                  <h4 className="text-base font-black tracking-tight">{sec.category}</h4>
                </div>

                <ul className="space-y-1.5 text-xs sm:text-sm text-gray-700 font-medium pt-1">
                  {sec.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold shrink-0 mt-0.5">•</span>
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

      </div>

    </section>
  );
}
