import React, { useState, useEffect } from 'react';
import SubSidebar from '../common/SubSidebar';
import { Award, Utensils, CheckCircle2, ChevronRight, Scale, Sparkles, ShieldCheck, UserCheck, Star } from 'lucide-react';
import ScrollReveal from '../common/ScrollReveal';
import MasterDetailModal from './MasterDetailModal';

export const masterProfilesList = [
  {
    id: 'ahn_hyungsang',
    name: '안형상 명인',
    title: '(사)한국외식창업교육원 이사장 / 조리 명인',
    category: '외식창업 & 한식·전통음식',
    image: '/images/masters/image11.png',
    badge: '문화체육부 장관상 대상 (2회)',
    intro: '특급호텔 40년 실무 경력 및 농림축산식품부 소관 비영리 사단법인 이사장으로서 실전 외식창업 비법과 1:1 도제식 교육 총괄 전수',
    awards: [
      '문화체육관광부 장관상 (대상) - 2015 전통음식 부문',
      '문화체육관광부 장관상 (대상) - 2014 건강음식 부문',
      '서울특별시장상 (대상) - 2013 라이브 요리 부문',
      '서울특별시장상 (우수상) - 2014 일반부 단체 부문',
      '중소벤처기업부 소상공인지원단 전담교수',
      '전국 기능올림픽위원회 실기 심사위원',
      '대한민국 전통주 조주사 국가대표 선발전 실기 심사위원',
    ],
  },
  {
    id: 'lee_sangjung',
    name: '이상정 명장',
    title: '대한민국 조리명장 (제2002-5호 노동부장관 인증)',
    category: '서양조리 & 호텔외식 경영',
    image: '/images/masters/image15.png',
    badge: '대한민국 조리명장 제2002-5호',
    intro: 'Grand Hyatt, Ritz-Carlton, JW Marriott 등 특급 호텔 총주방장 역임 및 청운대학교 호텔관광학부 교수',
    awards: [
      '대한민국 조리명장 인증 (제2002-5호 노동부 장관)',
      'The Ritz-Carlton, Seoul 조리부장 및 총주방장 역임',
      'J.W Marriott Hotel 조리부장 및 총주방장 역임',
      'Swiss Grand Hotel 조리부장 역임',
      'Grand Hyatt Hotel 조리부 과장 (Hugo\'s Kitchen 총괄)',
      '청운대학교 호텔관광학부 부교수 (서양조리 분야)',
      '영산대학교 조리학부 학부장 및 부교수',
      '조리기능장 자격증 (제3922호 한국산업인력공단)',
    ],
  },
  {
    id: 'kwon_youngbok',
    name: '권영복 명인',
    title: '대한민국 제과·제빵 조리 명인 / 탕종·발효 특허',
    category: '제과·제빵 & 디저트·베이커리',
    image: '/images/masters/image1.png',
    badge: '탕종식빵/발효액종 특허 3건 보유',
    intro: '신라명과(브레댄코) 연구개발 이사 및 파리바게뜨 식품연구소 수석연구원 출신 베이커리 탕종 발효 특허 개발 명인',
    awards: [
      '㈜신라명과 (브레댄코) 연구개발 이사',
      '㈜파리크라상 (파리바게뜨) 식품연구소 수석연구원',
      '서울 리츠칼튼호텔 Bakery Chief-Chef',
      '미국 CIA Cheese / Bakery 과정 연수',
      '프랑스 르놋뜨르 (Lenôtre) 제과 과정 연수',
      '도우제조(탕종) 식빵 제조방법 특허 (제10-1936119호)',
      '된장/청국장 발효액종 제빵용 도우 제조 특허 2건',
      '한국산업인력관리공단 제과제빵 실기감독위원 (10년)',
    ],
  },
  {
    id: 'jang_dongseok',
    name: '장동석 명인',
    title: '대한민국 한식 육류·갈비 명인 / ㈜이학갈비 대표',
    category: '한식 육류·갈비 & 외식 경영',
    image: '/images/masters/image16.png',
    badge: '보건복지부장관상 & 상공봉사대상',
    intro: '대한민국 대표 한식 갈비 명가 ㈜이학갈비 대표이사로서 최상급 원육 가공, 특제 양념 염지 및 대형 매장 경영 전수',
    awards: [
      '㈜이학갈비 대표이사 (2002년 ~ 현재)',
      '상공봉사대상 수상 (인천상공회의소)',
      '보건복지부장관상 수상 (보건복지부)',
      '중부지방국세청장 표창 (국세청)',
      '이학갈비 조리이사 및 조리실장 역임',
      '한식 조리사 자격증 취득',
    ],
  },
  {
    id: 'jeon_byungkyu',
    name: '전병규 명인',
    title: '대한민국 면·육수·양념장 개발 전수 명인',
    category: '면·곰탕·막국수 & 양념장·소스',
    image: '/images/masters/image17.png',
    badge: '냉면/곰탕/막국수 20곳 창업 전수',
    intro: '독도 얼큰이 냉면 양념장 개발, 용산 나주곰탕 총괄셰프, 여주 천서리막국수 개발 및 소스 20여 곳 기술 전수 전문 셰프',
    awards: [
      '독도 얼큰이 (냉면 양념장 개발 및 20곳 기술 전수)',
      '용산 나주곰탕 총괄 쉐프',
      '육일관 곰탕 총괄 쉐프',
      '리치푸드시스템 소스개발 총괄 쉐프',
      '대구 냉면장수 컨설팅 및 창업 총괄',
      '우원 (축산전문기업) 제품 개발 및 고문',
      '여주 천서리막국수 수출용 양념장 및 면 개발',
      '고선생에프씨에스 백봉곰탕 브랜드 개발',
    ],
  },
  {
    id: 'guk_gukjin',
    name: '곡국진 명인',
    title: '대한민국 중식 조리 명인 / ㈜다이닝디자인 상해루 총괄',
    category: '중화요리 & 퓨전 중식',
    image: '/images/masters/image10.png',
    badge: '세계중찬명부 교류협회 명인이사',
    intro: '30년 이상 중식 조리 최고 대가로서 포춘차이나 및 상해루 조리총괄이사를 거쳐 아시아 명장 요리대회 금상 수상',
    awards: [
      '중식 조리 30년 이상 최고요리 대가',
      '㈜다이닝디자인 상해루 조리총괄이사',
      '진해 중식당 포춘차이나 조리총괄부장',
      '㈜삼보중기 삼보성 총괄부장',
      '2015년 서울 아시아 명장 요리대회 (금상)',
      '2012년 이금기배 화서촌 왕중왕 대결 (금상)',
      '2011년 대만국제 최고요리대회 대만시장상 (동상)',
      '한국외식창업교육원 중식분과위원장',
    ],
  },
  {
    id: 'kim_soonyeol',
    name: '김순열 명인',
    title: '대한민국 전통음식·외식경영 명인 / 혜전·경민대 교수',
    category: '전통음식 & 외식 경영 자문',
    image: '/images/masters/image3.png',
    badge: '(사)한국음식관광협회 수석부회장',
    intro: '(사)한국음식관광협회 수석 부회장 및 2018 평창동계올림픽 지원단 후원단장으로서 한식 및 글로벌 음식 문화 확산 주도',
    awards: [
      '(사)한국음식관광협회 수석 부회장 & 강원도 지회장',
      '2018 평창동계올림픽 지원단 후원단장',
      '신흥대학 평생교육원 외식산업최고경영자과정 자문위원장',
      '춘천지방검찰청 영월지청 검찰시민위원',
      '미주총신대학교 목회대학원 교수',
      '평창문화원 부원장',
    ],
  },
  {
    id: 'yoon_byungse',
    name: '윤병세 명인',
    title: '대한민국 제과기능장 / 런던베이글뮤지엄 본부장',
    category: '베이커리 & 제과·제빵 기능장',
    image: '/images/masters/image14.png',
    badge: '제과기능장 (한국산업인력공단)',
    intro: '런던베이글뮤지엄 본부장, 오로라베이커리 기술상무, SPC연구소 수석연구원 출신 베이커리 핫플레이스 브랜딩 기술자',
    awards: [
      '런던베이글뮤지엄 본부장',
      '오로라베이커리 기술상무',
      'SPC연구소 수석연구원',
      '나폴레옹 제과점 생산이사',
      '데이즈 앤 데이즈 실장',
      '제과기능장 자격증 취득 (한국산업인력공단)',
      '한국제과기능장협회 최우수상',
      '코리아마스터베이커팀 챔피언쉽 경영대회 은상',
    ],
  },
  {
    id: 'kim_moonkyung',
    name: '김문경 명인',
    title: '대한민국 혼례음식·다식·수제간식 명인 / 맘메이드 대표',
    category: '혼례음식 & 수제간식·원가관리',
    image: '/images/masters/image2.png',
    badge: '보건복지부 & 농림축산식품부 장관상',
    intro: '맘메이드 창업 대표 및 김문경 음식연구원 원장으로서 혼례음식, 다식, 수제간식 제조 기술 전수',
    awards: [
      '맘메이드 대표 & 김문경 음식연구원 원장',
      '2023 서울 세계푸드올림픽 보건복지부 장관상',
      '2023 월드푸드 챔피온쉽 농림축산식품부 장관상',
      '2023 월드푸드 챔피온쉽 서울특별시장상',
      '혼례음식지도사 / 한식요리사 / 아동요리사 자격',
      '목포 자유시장 다식체험 / 김대중컨벤션센터 화과자 강사',
    ],
  },
  {
    id: 'joo_jungja',
    name: '주정자 명인',
    title: '대한민국 한식·약선요리 명인 / 조리사회 중앙회 이사',
    category: '전통한식 & 약선요리·북한음식',
    image: '/images/masters/image18.png',
    badge: '문화관광부 & 보건복지부 장관상',
    intro: '(사)한국음식관광협회 부회장 및 조리사회 중앙회 이사로서 전통 양반가 음식, 약선 요리, 전통주 심사 및 전수',
    awards: [
      '(사)한국음식관광협회 이사 부회장',
      '(사)한국조리사회 중앙회 이사 역임',
      '서울 국제요리 경연대회 전통양반가음식 (금상)',
      '대한민국 요리경연대회 약선요리/북한음식 (금상·대상)',
      '보건복지부장관 표창장 (차홍봉/전재희)',
      '문화관광부장관 표창장 (이창동)',
      '서울특별시장 표창장 (고건)',
    ],
  },
  {
    id: 'oh_sun',
    name: '오순 명인',
    title: '대한민국 조리기능장 / 대한민국 인물대상 대상',
    category: '조리기능장 & 한식·외식자문',
    image: '/images/masters/image12.png',
    badge: '조리기능장 & 대한민국 인물대상',
    intro: '조리기능장 보유 셰프이자 대한민국 인물대상 대상 수상자로서 조리 지도 및 지역사회 봉사를 실천하는 명인',
    awards: [
      '대한민국 조리기능장 (한국산업인력공단)',
      '대한민국 인물대상 (대상 수상)',
      '보건복지부장관 표창',
      '라이브 요리 경연대회 금상 입상',
      '더불어지역아동센터장 (정기후원 및 봉사)',
    ],
  },
  {
    id: 'oh_changgoo',
    name: '오창구 명인',
    title: '대한민국 중식 조리 명인 / 짬뽕명가 총괄',
    category: '중화요리 & 불맛 짬뽕 전수',
    image: '/images/masters/image13.png',
    badge: '중식 짬뽕·중화요리 전수자',
    intro: '희래등 조리실장, 짬뽕명가 및 백년짬뽕 총괄 셰프로서 시그니처 짬뽕 불맛 조리법 및 비법 육수 전수',
    awards: [
      '희래등 조리 실장',
      '짬뽕명가 운영 및 조리실장',
      '백년짬뽕 운영 및 조리실장',
      '㈜대한민국된장 품질관리 주임',
      '㈜한국된장 제품개발 사원',
      '한식 자격증 취득 (한국산업인력관리공단)',
    ],
  },
];

export default function MasterBusinessPage({ initialSubTab = 'masters', initialTab = 'masters' }) {
  const defaultSub = initialSubTab || initialTab || 'masters';
  const [activeTab, setActiveTab] = useState(defaultSub);
  const [selectedMaster, setSelectedMaster] = useState(null);

  useEffect(() => {
    const target = initialSubTab || initialTab;
    if (target) {
      setActiveTab(target);
    }
  }, [initialSubTab, initialTab]);

  const masterSubItems = [
    { id: 'masters', label: '명인·명장 사업단' },
    { id: 'profiles', label: '대한민국 명인·명장 프로필' },
    { id: 'dishes', label: '명인 요리' },
  ];

  const masterDishes = [
    {
      id: 1,
      title: '제철 미나리와 가리비 관자 조리',
      category: '한식·퓨전 명인 요리',
      image: '/images/course_menu_dev.jpg',
      desc: '자연산 미나리의 산뜻한 향과 관자 조리의 깊은 풍미를 살린 대표 명인 요리',
    },
    {
      id: 2,
      title: '성게알(우니) & 연어알 타르타르 타워',
      category: '일식·해산물 명인 요리',
      image: '/images/course_restaurant.jpg',
      desc: '신선한 최상급 우니와 이쿠라, 제철 해산물을 레이어링한 시그니처 요리',
    },
    {
      id: 3,
      title: '금박 포인트를 가미한 복어회 & 미나리 롤',
      category: '전통·고급 일식 명인 요리',
      image: '/images/course_delivery.jpg',
      desc: '얇게 뜬 복어회와 식용 금박, 수제 양념장이 어우러진 최고급 명인 셰프 작품',
    },
    {
      id: 4,
      title: '명인 가문 정갈 한식 & 발효 소스 요리',
      category: '전통 한식 명인 요리',
      image: '/images/course_cafe.jpg',
      desc: '100년 전통 발효 소스와 조리 명인의 정성이 들어간 한상차림 레시피',
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-6 font-sans text-gray-900">
      
      {/* Full Width Flush Layout matching Header margins */}
      <div className="w-full px-4 sm:px-8 lg:px-12 space-y-6">
        
        {/* Main Content Layout: Left SubSidebar + Right Main Content */}
        <div className="flex flex-col md:flex-row gap-6 lg:gap-8 items-start">
          
          {/* Left Vertical SubSidebar Menu */}
          <SubSidebar
            title="명인 사업단"
            items={masterSubItems}
            activeId={activeTab}
            onSelectTab={(tabId) => setActiveTab(tabId)}
          />

          {/* Right Main Content Panel */}
          <div className="flex-1 w-full space-y-6 min-w-0">
            
            {/* SUB-TAB 1: 명인 사업단 */}
            {activeTab === 'masters' && (
              <div className="space-y-8 animate-fadeIn w-full">
                
                {/* Header Card Box with Logo & Title */}
                <div className="relative bg-[#0B3C26] text-white rounded-3xl p-6 sm:p-8 border-2 border-[#C5A059] shadow-xl grid grid-cols-1 sm:grid-cols-12 gap-6 items-center w-full overflow-hidden">
                  <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-[#C5A059]/15 rounded-full blur-3xl pointer-events-none" />

                  <div className="sm:col-span-5 bg-white p-6 rounded-2xl border-2 border-[#C5A059] flex items-center justify-center shadow-md">
                    <img
                      src="/images/logo.png"
                      alt="사단법인 한국외식창업교육원"
                      className="w-full max-w-xs h-auto object-contain"
                    />
                  </div>

                  <div className="sm:col-span-7 flex flex-col items-center sm:items-start justify-center space-y-2 z-10">
                    <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-[#C5A059]/20 border border-[#C5A059]/40 text-[#D4AF37] text-xs font-black rounded-full">
                      <Award className="w-4 h-4 text-[#D4AF37]" />
                      <span>사단법인 한국외식창업교육원 명장 그룹</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight flex items-center gap-3">
                      <span>명인·명장 사업단</span>
                      <span className="text-[#D4AF37] text-xl font-bold hidden lg:inline">| KFSSEC Master Group</span>
                    </h2>
                    <p className="text-xs sm:text-sm text-emerald-100/80 font-bold">
                      대한민국 외식 조리 명인·장인 및 펫창업 전문가로 구성된 검증된 실무 사업단입니다.
                    </p>
                  </div>
                </div>

                {/* Purpose & Content Box */}
                <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-gray-200 shadow-lg space-y-6 w-full">
                  <h3 className="text-xl font-black text-gray-900 border-b-2 border-[#0B3C26] pb-3 flex items-center gap-2">
                    <Scale className="w-5 h-5 text-[#0B3C26]" />
                    <span>설립목적</span>
                  </h3>
                  
                  <div className="space-y-5 text-xs sm:text-sm text-gray-800 font-bold leading-relaxed">
                    <div className="flex items-start gap-3 bg-emerald-50/70 p-4.5 rounded-2xl border border-emerald-200">
                      <CheckCircle2 className="w-5 h-5 text-[#0B3C26] shrink-0 mt-0.5" />
                      <p>
                        본원은 <span className="text-[#0B3C26] font-black">[민법] 제32조 (비영리법인의 설립과 허가)</span> 및 농림축산식품부 장관 및 그 소속 청장소관 비영리법인의 설립 및 감독에 관한규칙 제 5조의 규정에 의하여 설립됨.
                      </p>
                    </div>

                    <div className="flex items-start gap-3 bg-stone-50 p-4.5 rounded-2xl border border-stone-200">
                      <CheckCircle2 className="w-5 h-5 text-[#0B3C26] shrink-0 mt-0.5" />
                      <p>
                        본원은 <span className="text-[#0B3C26] font-black">농수축산물을 활용한 외식산업 발전</span>과 <span className="text-gray-900 font-black">외식 및 펫창업 전문 교육</span>을 통해 외식산업 경쟁력에 기여함으로써, 국내 및 국외 외식산업을 발전시키는 것.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Master Chef Profiles Overview Section inside main tab */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b-2 border-[#0B3C26] pb-3">
                    <h3 className="text-2xl font-black text-gray-900 flex items-center gap-2">
                      <UserCheck className="w-6 h-6 text-[#0B3C26]" />
                      <span>대한민국 명인·명장 교수진</span>
                    </h3>
                    <button
                      onClick={() => setActiveTab('profiles')}
                      className="text-xs font-black text-[#0B3C26] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>전체 명인 프로필 12인 전체보기</span>
                      <ChevronRight className="w-4 h-4 text-[#C5A059]" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {masterProfilesList.slice(0, 6).map((m) => (
                      <div
                        key={m.id}
                        onClick={() => setSelectedMaster(m)}
                        className="bg-white rounded-3xl p-5 border-2 border-stone-200 shadow-md hover:border-[#0B3C26] transition-all cursor-pointer group space-y-4"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-[#C5A059] shrink-0 shadow-sm bg-stone-900">
                            <img src={m.image} alt={m.name} className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500" />
                          </div>
                          <div>
                            <span className="text-[11px] font-black text-[#0B3C26] bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200 inline-block mb-1">
                              {m.category}
                            </span>
                            <h4 className="text-lg font-black text-gray-900 group-hover:text-[#0B3C26] transition-colors">{m.name}</h4>
                            <p className="text-xs text-gray-500 font-bold line-clamp-1">{m.title}</p>
                          </div>
                        </div>

                        <p className="text-xs text-gray-600 font-medium line-clamp-2 leading-relaxed bg-[#F8F6F0] p-3 rounded-xl border border-stone-200">
                          {m.intro}
                        </p>

                        <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs font-extrabold text-[#0B3C26]">
                          <span>상세 경력 및 특허 보기</span>
                          <ChevronRight className="w-4 h-4 text-[#C5A059] group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* SUB-TAB 2: 대한민국 명인·명장 프로필 (Full 12 Masters) */}
            {activeTab === 'profiles' && (
              <div className="space-y-8 animate-fadeIn w-full">
                
                <div className="border-b-2 border-[#0B3C26] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0B3C26] text-[#D4AF37] border border-[#C5A059] text-xs font-black">
                      <Star className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>KFSSEC MASTER CHEF PROFILES</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mt-2">
                      대한민국 명인·명장 프로필
                    </h2>
                  </div>
                  <span className="text-xs font-bold text-gray-500">
                    사단법인 한국외식창업교육원 검증 12인 최고 조리 명인·명장 교수진
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2 w-full">
                  {masterProfilesList.map((m, idx) => (
                    <ScrollReveal key={m.id} direction="up" delay={idx * 50}>
                      <div
                        onClick={() => setSelectedMaster(m)}
                        className="bg-white rounded-3xl p-5 border-2 border-stone-200 shadow-md hover:shadow-2xl hover:border-[#0B3C26] transition-all duration-300 cursor-pointer group space-y-4 h-full flex flex-col justify-between"
                      >
                        <div className="space-y-4">
                          <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden border-2 border-[#C5A059] shadow-sm bg-black shrink-0">
                            <img
                              src={m.image}
                              alt={m.name}
                              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute top-3 left-3 bg-[#0B3C26]/90 text-[#D4AF37] font-black text-[11px] px-3 py-1 rounded-full border border-[#C5A059]/40 backdrop-blur-xs">
                              {m.category}
                            </div>
                          </div>

                          <div className="space-y-1.5">
                            <div className="inline-block bg-stone-100 text-stone-800 text-[11px] font-black px-2.5 py-0.5 rounded border border-stone-300">
                              {m.badge}
                            </div>
                            <h3 className="text-xl font-black text-gray-900 group-hover:text-[#0B3C26] transition-colors">
                              {m.name}
                            </h3>
                            <p className="text-xs text-gray-500 font-bold leading-tight">
                              {m.title}
                            </p>
                          </div>

                          <p className="text-xs text-gray-600 font-medium leading-relaxed bg-[#F8F6F0] p-3 rounded-xl border border-stone-200 line-clamp-3">
                            {m.intro}
                          </p>
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedMaster(m);
                          }}
                          className="w-full py-2.5 bg-[#0B3C26] hover:bg-[#072819] text-white text-xs font-black rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5 border border-[#C5A059]"
                        >
                          <span>📋 상세 이력 및 수상 정보 보기</span>
                          <ChevronRight className="w-4 h-4 text-[#D4AF37]" />
                        </button>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>

              </div>
            )}

            {/* SUB-TAB 3: 명인 요리 */}
            {activeTab === 'dishes' && (
              <div className="space-y-8 animate-fadeIn w-full">
                
                <div className="border-b-2 border-[#0B3C26] pb-4 flex items-center justify-between">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0B3C26] text-[#D4AF37] border border-[#C5A059] text-xs font-black">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>MASTER SIGNATURE DISHES</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mt-2">
                      명인 요리
                    </h2>
                  </div>
                  <span className="text-xs font-bold text-gray-500 hidden sm:inline">
                    대한민국 외식업 분야별 명인 셰프 시그니처 레시피
                  </span>
                </div>

                {/* Slanted High Quality Food Dish Photos Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-2 w-full">
                  {masterDishes.map((dish, idx) => (
                    <ScrollReveal key={dish.id} direction="up" delay={idx * 100}>
                      <div className="group bg-white rounded-3xl border-2 border-gray-200 p-4 shadow-xl hover:shadow-2xl hover:border-[#0B3C26] transition-all duration-500 space-y-4 overflow-hidden h-full flex flex-col justify-between">
                        
                        <div className="relative h-60 sm:h-64 rounded-2xl overflow-hidden shadow-md bg-black transform -skew-x-4 group-hover:skew-x-0 transition-transform duration-500 shrink-0">
                          <img
                            src={dish.image}
                            alt={dish.title}
                            className="w-full h-full object-cover transform skew-x-4 group-hover:skew-x-0 group-hover:scale-108 transition-transform duration-700"
                          />
                          <div className="absolute top-3 left-3 bg-black/85 text-[#D4AF37] font-black text-[11px] px-3 py-1 rounded-full transform skew-x-4 border border-[#C5A059]/40">
                            {dish.category}
                          </div>
                        </div>

                        <div className="space-y-2 px-1 pb-1 flex-1 flex flex-col justify-between">
                          <div>
                            <h3 className="text-base font-black text-gray-900 group-hover:text-[#0B3C26] transition-colors leading-snug">
                              {dish.title}
                            </h3>
                            <p className="text-xs text-gray-600 font-medium leading-relaxed mt-1.5">
                              {dish.desc}
                            </p>
                          </div>

                          <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#0B3C26]">
                            <span>명인 레시피 과정</span>
                            <ChevronRight className="w-4 h-4 text-[#D4AF37] group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>

                      </div>
                    </ScrollReveal>
                  ))}
                </div>

              </div>
            )}

          </div>

        </div>

      </div>

      {/* Master Detail Modal */}
      {selectedMaster && (
        <MasterDetailModal
          isOpen={Boolean(selectedMaster)}
          master={selectedMaster}
          onClose={() => setSelectedMaster(null)}
        />
      )}
    </div>
  );
}
