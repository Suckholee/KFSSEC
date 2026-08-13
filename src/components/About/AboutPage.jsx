import React, { useState } from 'react';
import {
  Target,
  Users,
  TrendingUp,
  HeartHandshake,
  Bot,
  GraduationCap,
  UtensilsCrossed,
  Globe2,
  Store,
  Share2,
  Sparkles,
  Palette,
  Leaf,
  Heart,
  Building,
  Award,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

export default function AboutPage() {
  const [selectedDirection, setSelectedDirection] = useState(1);

  // Section 1: 4 Mission Pillars
  const missionPillars = [
    {
      id: 1,
      icon: Target,
      title: '창업 성공률 향상',
      description: '체계적인 교육과 실무 지원으로 창업 생존율을 높입니다.',
    },
    {
      id: 2,
      icon: Users,
      title: '전문 인재 양성',
      description: '외식 산업에 특화된 실무형 전문 인재를 양성합니다.',
    },
    {
      id: 3,
      icon: TrendingUp,
      title: '산업 경쟁력 강화',
      description: '외식 산업의 혁신과 성장을 통한 국가 경제 발전에 기여합니다.',
    },
    {
      id: 4,
      icon: HeartHandshake,
      title: '상생 가치 실현',
      description: '창업자, 소상공인, 지역사회가 함께 성장하는 상생 모델을 구축합니다.',
    },
  ];

  // Section 2: 12 Major Strategic Directions
  const directions = [
    {
      id: 1,
      num: '01',
      title: '미래형 외식창업 컨설팅 & 스마트 창업 지원',
      shortDesc: 'AI·빅데이터 상권분석 및 공유주방·테스트매장 맞춤 컨설팅',
      icon: Bot,
      details: [
        'AI·빅데이터 기반 창업 컨설팅: 상권 분석, 고객 트렌드 예측, 맞춤형 창업 지원',
        '외식 브랜드 기획 & 마케팅 전략 수립: 브랜딩, SNS 홍보, 고객 유입 전략',
        '공유주방 & 테스트 매장 운영: 예비 창업자를 위한 실전 경험 및 파일럿 테스트 지원',
        '외식업 창업 맞춤 지원: 창업자 대상 법률, 세무, 자금 조달 원스톱 컨설팅',
      ],
    },
    {
      id: 2,
      num: '02',
      title: '차세대 외식 인재 양성을 위한 교육 혁신',
      shortDesc: '조리, 경영, 위생 전문교육 및 명인 특강·자격증 연계',
      icon: GraduationCap,
      details: [
        '외식업 창업자 및 종사자 대상 전문 교육 운영: 조리, 경영, 서비스, 위생관리 등',
        '명장·명인 초청 특강 & 최신 트렌드 세미나: 세계적 전문가와 함께하는 실전 강의',
        '외식업 관련 자격증 과정 운영: 바리스타, 소믈리에, 조리사, 외식경영 등',
        '글로벌 외식업 취업 & 창업 연계 프로그램: 국내외 외식기업과의 협업을 통한 취업 기회 제공',
      ],
    },
    {
      id: 3,
      num: '03',
      title: '푸드테크 & 미래형 메뉴 개발 R&D',
      shortDesc: 'HMR/RMR 신제품, AI 스마트 키친 & 로컬 지속가능 메뉴',
      icon: UtensilsCrossed,
      details: [
        'HMR/RMR(가정간편식·외식간편식) 신제품 개발: 편리성과 건강을 고려한 혁신 제품 연구',
        'AI 기반 스마트 키친 & 메뉴 추천 시스템 개발: 데이터 분석을 통한 고객 맞춤형 메뉴 추천',
        'PB 상품 개발 및 식음료 제조 사업 확대: 자체 브랜드 상품 및 특화 레시피 연구',
        '로컬 식재료 활용 & 지속 가능한 메뉴 연구: 친환경·유기농 식자재를 활용한 메뉴 개발',
      ],
    },
    {
      id: 4,
      num: '04',
      title: 'K-푸드 글로벌 진출 & 해외 시장 개척',
      shortDesc: '해외 진출 브랜딩, 식자재 무역 유통 & 글로벌 박람회',
      icon: Globe2,
      details: [
        '한식 및 한국 외식 브랜드의 해외 진출 컨설팅: 글로벌 시장 맞춤형 브랜드 전략',
        '국내외 식자재·주방기기·외식 관련 제품 유통 및 무역 사업 확대',
        '해외 외식 트렌드 연구 및 글로벌 네트워크 구축: 현지화 전략 개발 및 파트너십 구축',
        '국제 외식업 박람회 및 네트워크 구축: 글로벌 외식업체와 협업 기회 확대',
      ],
    },
    {
      id: 5,
      num: '05',
      title: '외식업 프랜차이즈 시스템 구축',
      shortDesc: '프랜차이즈 시스템 구축, 가맹 표준화 & 해외 시장 개척',
      icon: Store,
      details: [
        '프랜차이즈 브랜드 개발 및 가맹점 운영 컨설팅: 성공적인 프랜차이즈 모델 구축',
        '가맹사업 표준화 시스템 개발: 메뉴, 서비스, 운영 전반의 효율적 관리 시스템 마련',
        '예비 가맹점주 교육 & 성공 전략 지원: 가맹점 창업 및 운영 노하우 전수',
        '프랜차이즈 해외 진출 지원: 글로벌 브랜드로 성장할 수 있도록 해외 시장 개척 지원',
      ],
    },
    {
      id: 6,
      num: '06',
      title: '외식업 디지털 플랫폼 & 네트워크 활성화',
      shortDesc: '구인구직·식자재 직거래 플랫폼 & AI 경영 솔루션',
      icon: Share2,
      details: [
        '구인·구직, 매장 매매, 식자재 직거래 플랫폼 운영',
        '외식업 홍보 & 브랜드 컨설팅: SNS, 온라인 마케팅, 고객 데이터 기반 맞춤 홍보 전략',
        'AI 기반 외식업 경영 솔루션 제공: 고객 분석, 매출 예측, 최적 운영 전략 제안',
        '외식업체 간 협업 네트워크 구축: 외식업 관계자 및 기업 간 협력 기회 제공',
      ],
    },
    {
      id: 7,
      num: '07',
      title: '외식 문화 행사 & 글로벌 푸드 페스티벌',
      shortDesc: '외식 박람회, 요리경연대회, 쿠킹클래스 & 한식 세계화',
      icon: Sparkles,
      details: [
        '국내외 외식산업 박람회 & 전시회 기획 및 운영',
        '음식 경연대회, 쿠킹 클래스, 마스터 셰프 초청 이벤트',
        '외식업 종사자 및 소비자를 위한 체험형 외식 문화 행사',
        '글로벌 푸드 페스티벌 & 한식 세계화 캠페인 진행',
      ],
    },
    {
      id: 8,
      num: '08',
      title: '외식업 인테리어 & 공간 브랜딩 컨설팅',
      shortDesc: '점포 설계, 공간 브랜딩 & AI·IoT 스마트 레스토랑',
      icon: Palette,
      details: [
        '외식업 점포 설계 및 브랜드 디자인 개발: 차별화된 공간 브랜딩 지원',
        '스마트 외식공간 도입 & 트렌드 디자인 연구: AI·IoT 기반 스마트 레스토랑 구축',
        '매장 리뉴얼 & 공간 효율 최적화 컨설팅: 고객 동선 분석 및 공간 활용 극대화',
        '프랜차이즈 및 신규 브랜드 공간 브랜딩 기획',
      ],
    },
    {
      id: 9,
      num: '09',
      title: '친환경·웰빙 외식산업 구축',
      shortDesc: '로컬·비건·웰빙 메뉴 개발, ESG 외식 모델 & 패키징',
      icon: Leaf,
      details: [
        '로컬 식재료 활용 및 지속 가능한 식문화 연구',
        '친환경·비건·웰빙 메뉴 개발 및 건강식 프로젝트 운영',
        'ESG(환경·사회·지배구조) 기반 지속 가능한 외식사업 모델 구축',
        '음식물 쓰레기 절감 & 친환경 패키징 기술 연구',
      ],
    },
    {
      id: 10,
      num: '10',
      title: '사회적 가치 창출 & 복지 서비스 확대',
      shortDesc: '무료급식, 취약계층 직업훈련 & 일자리 창출 지원',
      icon: Heart,
      details: [
        '취약계층 및 노인을 위한 무료 급식 및 배식 서비스 운영',
        '장애인·노인·다문화 가정 대상 외식업 직업훈련 및 취업 지원',
        '사회적 기업 및 협동조합 연계를 통한 일자리 창출 및 창업 지원',
        '소외계층을 위한 맞춤형 건강식 및 식문화 교육 프로그램 운영',
      ],
    },
    {
      id: 11,
      num: '11',
      title: '외식업 창업 지원센터 & 비즈니스 허브',
      shortDesc: '창업 공간 지원, B2B 비즈니스 매칭 & 글로벌 콘퍼런스',
      icon: Building,
      details: [
        '외식업 창업자 대상 공간 제공 & 맞춤형 지원 프로그램 운영',
        '외식업 전문가·기업 간 네트워킹 & 비즈니스 매칭 플랫폼 운영',
        'B2B 글로벌 외식 비즈니스 허브 구축: 국내외 외식업체 간 협업 및 투자 유치 지원',
        '국제 외식 컨퍼런스 및 협력 프로젝트 운영',
      ],
    },
    {
      id: 12,
      num: '12',
      title: '명인·장인·명장 발굴 및 육성 사업',
      shortDesc: '분야별 명인·명장 발굴, 기술전수 멘토링 & 시상제도',
      icon: Award,
      details: [
        '한식, 중식, 일식, 양식, 베이커리, 커피, 와인, 김치, 발효 등 각 분야 명인·명장 발굴',
        '전통 음식문화 계승을 위한 연구 및 교육 지원',
        '젊은 외식업 인재들에게 명장·장인의 기술 전수 및 멘토링 프로그램 운영',
        '우수한 외식 인재를 글로벌 무대에 소개하고 성장할 수 있도록 지원',
        '외식업 종사자 대상 명장 인증 및 시상 제도 운영',
      ],
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="w-full px-4 sm:px-8 lg:px-12 space-y-16">
        
        {/* Banner Title */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <span className="text-xs sm:text-sm font-extrabold text-emerald-700 bg-emerald-100/70 px-4 py-1.5 rounded-full inline-block tracking-wider uppercase">
            사단법인 한국외식창업교육원
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight leading-tight">
            외식산업 혁신과 글로벌 성장을 선도하는 <br className="hidden sm:inline" />
            <span className="text-emerald-700">미래지향적 12대 사업 방향</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-600 font-medium max-w-2xl mx-auto">
            외식 창업의 시작부터 성공까지, 체계적인 지원과 끊임없는 R&D 교육으로 대한민국 외식산업의 든든한 파트너가 되겠습니다.
          </p>
        </div>

        {/* SECTION 1: MISSION (설립 목적) */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-emerald-100 shadow-sm space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-gray-100 pb-8">
            <div className="space-y-2 max-w-md">
              <span className="text-xs font-black text-emerald-600 tracking-widest uppercase">
                MISSION
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                설립 목적
              </h2>
            </div>
            <p className="text-sm sm:text-base text-gray-600 font-medium max-w-2xl leading-relaxed">
              한국외식창업교육원은 외식 산업의 지속 가능한 성장을 선도하고, 창업 희망자와 소상공인의 성공적인 미래를 함께 설계합니다.
            </p>
          </div>

          {/* 4 Pillars Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {missionPillars.map((item) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={item.id}
                  className="bg-emerald-50/40 rounded-2xl p-6 border border-emerald-100/70 hover:bg-white hover:shadow-md hover:border-emerald-300 transition-all group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center mb-4 shadow-md shadow-emerald-600/20 group-hover:scale-110 transition-transform">
                    <IconComponent className="w-6 h-6 stroke-[2]" />
                  </div>
                  <h3 className="text-base font-bold text-gray-900 group-hover:text-emerald-800 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 font-medium mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 2: DIRECTION (12대 사업 방향) */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-black text-emerald-600 tracking-widest uppercase">
              DIRECTION
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              12대 사업 방향
            </h2>
            <p className="text-sm text-gray-500 font-medium">
              각 사업 항목을 클릭하시면 상세 추진 전략을 확인하실 수 있습니다.
            </p>
          </div>

          {/* 12 Grid Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {directions.map((dir) => {
              const IconComponent = dir.icon;
              const isSelected = selectedDirection === dir.id;

              return (
                <div
                  key={dir.id}
                  onClick={() => setSelectedDirection(dir.id)}
                  className={`bg-white rounded-2xl p-6 border transition-all duration-300 flex flex-col justify-between cursor-pointer relative ${
                    isSelected
                      ? 'border-emerald-600 ring-2 ring-emerald-500/20 shadow-xl -translate-y-1 bg-emerald-50/10'
                      : 'border-gray-200/80 hover:border-emerald-300 hover:shadow-md'
                  }`}
                >
                  <div>
                    {/* Top Row: Number & Icon */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-black text-emerald-800 bg-emerald-100/70 px-2.5 py-1 rounded-md tracking-wider">
                        {dir.num}
                      </span>
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                        isSelected ? 'bg-[#0F5132] text-white' : 'bg-gray-100 text-gray-600'
                      }`}>
                        <IconComponent className="w-5 h-5 stroke-[2]" />
                      </div>
                    </div>

                    {/* Title & Short Description */}
                    <h3 className="text-base font-bold text-gray-900 leading-snug tracking-tight mb-2">
                      {dir.title}
                    </h3>
                    <p className="text-xs text-gray-500 font-medium leading-relaxed">
                      {dir.shortDesc}
                    </p>
                  </div>

                  {/* Expand Toggle */}
                  <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-emerald-700">
                    <span>{isSelected ? '상세내용 접기' : '상세내용 보기'}</span>
                    {isSelected ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    )}
                  </div>

                  {/* Expanded Callout Detail View */}
                  {isSelected && (
                    <div className="mt-4 pt-4 border-t border-emerald-200/60 bg-emerald-50/50 -mx-6 -mb-6 p-5 rounded-b-2xl animate-fadeIn space-y-2.5">
                      {dir.details.map((detail, dIdx) => (
                        <div key={dIdx} className="flex items-start gap-2 text-xs text-gray-700 font-medium leading-relaxed">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  )}

                </div>
              );
            })}
          </div>

          {/* Call-to-action Banner */}
          <div className="bg-[#0F5132] rounded-3xl p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-2">
              <span className="text-xs font-bold text-emerald-300">사단법인 한국외식창업교육원과 함께하는 창업 비전</span>
              <h3 className="text-xl sm:text-2xl font-black tracking-tight">
                체계적인 12대 전략으로 성공적인 외식 창업을 가꾸어 드립니다.
              </h3>
            </div>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="px-6 py-3 bg-white text-[#0F5132] font-black text-sm rounded-xl hover:bg-emerald-50 transition-colors shrink-0 shadow-md flex items-center gap-2 cursor-pointer"
            >
              <span>상단으로 돌아가기</span>
              <ArrowRight className="w-4 h-4 text-emerald-700" />
            </button>
          </div>

        </section>

      </div>
    </div>
  );
}
