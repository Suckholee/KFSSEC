import { useLanguage } from '../../i18n/LanguageContext';
import React, { useState, useEffect } from 'react';
import SubSidebar from '../common/SubSidebar';
import GreetingsSection from './GreetingsSection';
import HistorySection from './HistorySection';
import OrganizationSection from './OrganizationSection';
import ScrollReveal from '../common/ScrollReveal';
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
  Scale,
  Building2,
  Calendar,
  UserCheck,
  Globe,
  User,
  MapPin,
  ShieldCheck,
  ChevronUp as ScrollTopIcon,
} from 'lucide-react';

import FacultySection from './FacultySection';

export default function AboutPage({ initialSubTab = 'greetings', initialTab = 'greetings' }) {
  const { t } = useLanguage();
  const validSubTabs = ['greetings', 'history', 'speech', 'profile', 'faculty', 'organization'];
  const resolveTab = (val) => (validSubTabs.includes(val) ? val : 'greetings');
  const defaultSub = resolveTab(initialSubTab || initialTab);
  const [activeTab, setActiveTab] = useState(defaultSub);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const target = initialSubTab || initialTab;
    if (target) {
      setActiveTab(resolveTab(target));
    }
  }, [initialSubTab, initialTab]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const aboutSubItems = [
    { id: 'greetings', label: t("교육원 소개 & 12대 방향") },
    { id: 'history', label: t("연혁 & 3대 발자취") },
    { id: 'speech', label: t("이사장 인사말") },
    { id: 'profile', label: t("이사장 프로필 & MOU") },
    { id: 'faculty', label: t("교수진 소개") },
    { id: 'organization', label: t("조직도") },
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-6 font-sans text-gray-900">
      
      {/* Full Width Widescreen Layout matching Header padding */}
      <div className="w-full px-6 sm:px-10 lg:px-14 space-y-6">
        
        {/* Main Content Layout: Left SubSidebar + Right Main Content */}
        <div className="flex flex-col md:flex-row gap-6 lg:gap-8 items-start">
          
          {/* Left Vertical SubSidebar Menu */}
          <SubSidebar
            title={t("교육원 소개")}
            items={aboutSubItems}
            activeId={activeTab}
            onSelectTab={(tabId) => setActiveTab(tabId)}
          />

          {/* Right Main Content Panel */}
          <div className="flex-1 w-full space-y-6 min-w-0">
            
            {/* SUB-TAB 1: 교육원 소개 */}
            {activeTab === 'greetings' && (
              <div className="space-y-8 animate-fadeIn w-full">
                
                {/* Official Institution Profile Summary Box - Redesigned to Heritage Gold & Deep Green Theme */}
                <div className="relative bg-[#0B3C26] text-white rounded-3xl p-6 sm:p-8 border-2 border-[#C5A059] shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full overflow-hidden">
                  {/* Ambient Background Light Glow */}
                  <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-[#C5A059]/15 rounded-full blur-3xl pointer-events-none" />
                  
                  {/* Left Logo Card */}
                  <div className="lg:col-span-5 bg-white p-6 rounded-2xl border-2 border-[#C5A059] flex items-center justify-center shadow-md">
                    <img
                      src="/images/logo-transparent.svg"
                      alt={t("사단법인 한국외식창업교육원")}
                      className="w-full max-w-xs h-auto object-contain"
                    />
                  </div>

                  {/* Right Info Details */}
                  <div className="lg:col-span-7 space-y-4 text-xs sm:text-sm z-10">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#C5A059]/20 border border-[#C5A059]/40 text-[#D4AF37] text-xs font-black rounded-full">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>{t("사단법인 공식 기관 정보")}</span>
                    </div>

                    <ul className="space-y-3 font-bold text-gray-100">
                      <li className="flex items-center gap-3">
                        <Building2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                        <span><strong className="text-[#D4AF37] font-black">{t("법인명 :")}</strong>{' '}{t("사단법인 한국외식창업교육원")}</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <Globe className="w-4 h-4 text-[#D4AF37] shrink-0" />
                        <span><strong className="text-[#D4AF37] font-black">{t("영문명 :")}</strong> Korea Food Service Startup Education Center</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <UserCheck className="w-4 h-4 text-[#D4AF37] shrink-0" />
                        <span><strong className="text-[#D4AF37] font-black">{t("대표자 :")}</strong>{' '}{t("안형상 이사장")}</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <UtensilsCrossed className="w-4 h-4 text-[#D4AF37] shrink-0" />
                        <span><strong className="text-[#D4AF37] font-black">{t("분 야 :")}</strong>{' '}{t("창업 외식 교육 & 펫창업 특화 과정")}</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <Calendar className="w-4 h-4 text-[#D4AF37] shrink-0" />
                        <span><strong className="text-[#D4AF37] font-black">{t("설립 및 허가일자 :")}</strong>{' '}{t("2022년 7월 29일")}</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Establishment Purpose (설립목적) */}
                <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-gray-200 shadow-lg space-y-6 w-full">
                  <h3 className="text-xl font-black text-gray-900 border-b-2 border-[#0B3C26] pb-3 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#0B3C26]" />
                    <span>{t("설립목적 및 교육원 핵심 가치")}</span>
                  </h3>
                  <div className="space-y-4 text-xs sm:text-sm text-gray-800 font-bold leading-relaxed">
                    <p>{t("본원은")}{' '}<span className="text-[#0B3C26] font-black">{t("[민법] 제32조 (비영리법인의 설립과 허가)")}</span>{' '}{t("및 농림축산식품부 장관 및 그 소속 청장소관 비영리법인의 설립 및 감독에 관한규칙 제 5조의 규정에 의하여 설립됨.")}{' '}</p>
                    <p>{t("본원은 농수축산물을 활용한 외식산업 발전과 외식창업교육을 통해 외식산업 경쟁력에 기여함으로써, 국내 및 국외 외식산업을 발전시키는 것.")}{' '}</p>
                  </div>
                </div>

                {/* 12 Major Strategic Directions (고객 반영사항: 교육원 방향성 및 '12대 사업방향' 내용 추가) */}
                <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-[#0B3C26] shadow-xl space-y-8 w-full">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-[#0B3C26] pb-4">
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C5A059]/20 border border-[#C5A059]/40 text-[#0B3C26] text-xs font-black mb-1.5">
                        <Target className="w-3.5 h-3.5 text-[#C5A059]" />
                        <span>KFSSEC 12 STRATEGIC PILLARS</span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                        {t("교육원 공식 12대 핵심 사업방향")}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 font-medium mt-1">
                        {t("대한민국 외식산업의 선진화와 창업 성공률 제고를 위한 교육원의 12가지 중점 추진 과제입니다.")}
                      </p>
                    </div>
                    <span className="text-xs font-black text-white bg-[#0B3C26] px-4 py-2 rounded-2xl shrink-0 self-start sm:self-auto shadow-md">
                      VISION 2030
                    </span>
                  </div>

                  {/* 12 Strategic Directions Grid (4x3) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {[
                      {
                        num: '01',
                        title: '실무 중심 외식창업 원스톱 육성',
                        desc: '점포 개설부터 인허가, 상권분석, 매장 운영 매뉴얼까지 창업 전 과정을 원스톱으로 지원합니다.',
                        tag: '창업육성',
                      },
                      {
                        num: '02',
                        title: '공식 자격 검정 & 전문 자격증 발급',
                        desc: '외식창업실무지도사, 외식창업실무사 등 공신력 있는 민간 및 전문 자격을 체계적으로 양성·발급합니다.',
                        tag: '자격검정',
                      },
                      {
                        num: '03',
                        title: '조리명장·명인 1:1 도제식 전수',
                        desc: '호텔 40년 경력의 조리명장 및 대한민국 외식명인진의 시그니처 레시피와 현장 실무 노하우를 직접 전수합니다.',
                        tag: '명인전수',
                      },
                      {
                        num: '04',
                        title: '로컬푸드 & 농수축산물 메뉴 R&D',
                        desc: '전국 지자체 특산물과 연계한 로컬푸드 신메뉴 개발 및 건강한 한국형 외식 상품화를 선도합니다.',
                        tag: '메뉴R&D',
                      },
                      {
                        num: '05',
                        title: '소상공인 점포 경영진단 & 리뉴얼',
                        desc: '매출 부진 및 위기 점포를 위한 메뉴 재설계, 원가 절감, 고객 서비스 개선 등 밀착 솔루션을 제공합니다.',
                        tag: '경영개선',
                      },
                      {
                        num: '06',
                        title: '빅데이터 상권분석 & 공간 디자인',
                        desc: '진익준 교수를 비롯한 전문 연구진이 상권 유동인구 데이터와 고객 경험 디자인(CX) 공간 기획을 제공합니다.',
                        tag: '상권·공간',
                      },
                      {
                        num: '07',
                        title: '카페·베이커리·식음료(F&B) 특화',
                        desc: '스페셜티 커피, 천연발효 빵, 시그니처 디저트, 소믈리에 주류 페어링 등 최신 트렌드 기술을 교육합니다.',
                        tag: '카페·제과',
                      },
                      {
                        num: '08',
                        title: '시니어·은퇴자 맞춤형 안정 창업',
                        desc: '5060 중장년 및 은퇴자를 위해 무리한 투자 없는 안정적이고 지속 가능한 맞춤형 외식 창업을 돕습니다.',
                        tag: '시니어창업',
                      },
                      {
                        num: '09',
                        title: '청년 창업가 육성 & 정부지원 연계',
                        desc: '청년 예비 창업자를 대상으로 중소벤처기업부 및 소상공인 정책자금, 저금리 대출 연계를 코칭합니다.',
                        tag: '청년지원',
                      },
                      {
                        num: '10',
                        title: 'K-FOOD 요리대회 & 명인 시상식',
                        desc: '정기적인 전국 규모 K-FOOD 조리경연대회와 자랑스러운 외식 명인 시상식을 주관하여 위상을 높입니다.',
                        tag: '경연·시상',
                      },
                      {
                        num: '11',
                        title: '산학연 MOU & 글로벌 해외진출',
                        desc: '10대 공식 협력업체와의 산학협력망 및 해외 외식기관과의 교류를 통해 K-외식의 글로벌화를 추진합니다.',
                        tag: '산학·글로벌',
                      },
                      {
                        num: '12',
                        title: 'ESG 친환경 외식 & 위생 안전 인증',
                        desc: '친환경 식자재 관리, 음식물 쓰레기 감축, 최고 수준의 위생 안전 표준을 준수하는 외식 문화를 보급합니다.',
                        tag: 'ESG·안전',
                      },
                    ].map((item) => (
                      <div
                        key={item.num}
                        className="bg-stone-50 hover:bg-emerald-50/40 p-5 rounded-2xl border border-stone-200 hover:border-[#0B3C26] transition-all duration-300 space-y-2.5 group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-black text-white bg-[#0B3C26] px-2.5 py-0.5 rounded-lg group-hover:bg-[#C5A059] transition-colors">
                            {item.num}
                          </span>
                          <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded-md">
                            {item.tag}
                          </span>
                        </div>
                        <h4 className="font-black text-sm sm:text-base text-gray-900 group-hover:text-[#0B3C26] transition-colors">
                          {t(item.title)}
                        </h4>
                        <p className="text-xs text-gray-600 font-medium leading-relaxed">
                          {t(item.desc)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* SUB-TAB 2: 연혁 & 3대 발자취 */}
            {activeTab === 'history' && (
              <HistorySection />
            )}

            {/* SUB-TAB 3: 원장 인사말 */}
            {activeTab === 'speech' && (
              <GreetingsSection viewMode="speech" />
            )}

            {/* SUB-TAB 3: 원장 프로필 & MOU */}
            {activeTab === 'profile' && (
              <GreetingsSection viewMode="profile" />
            )}

            {/* SUB-TAB 4: 교수진 소개 */}
            {activeTab === 'faculty' && (
              <FacultySection />
            )}

            {/* SUB-TAB 5: 조직도 */}
            {activeTab === 'organization' && (
              <OrganizationSection />
            )}

          </div>

        </div>

      </div>

      {/* Floating Scroll-To-Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-2xl bg-[#0B3C26] text-white shadow-2xl hover:bg-[#072819] flex items-center justify-center transition-all duration-300 hover:scale-110 border border-[#C5A059] cursor-pointer animate-fadeIn"
          aria-label={t("최상단으로 이동")}
        >
          <ScrollTopIcon className="w-6 h-6 stroke-[2.5] text-[#D4AF37]" />
        </button>
      )}
    </div>
  );
}
