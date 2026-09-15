import { useLanguage } from '../../i18n/LanguageContext';
import React, { useState, useEffect } from 'react';
import SubSidebar from '../common/SubSidebar';
import GreetingsSection from './GreetingsSection';
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

export default function AboutPage({ initialSubTab = 'greetings', initialTab = 'greetings' }) {
  const { t } = useLanguage();
  const validSubTabs = ['greetings', 'speech', 'profile', 'organization'];
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
    { id: 'greetings', label: t("교육원 소개") },
    { id: 'speech', label: t("이사장 인사말") },
    { id: 'profile', label: t("이사장 프로필") },
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
                    <span>{t("설립목적")}</span>
                  </h3>
                  <div className="space-y-4 text-xs sm:text-sm text-gray-800 font-bold leading-relaxed">
                    <p>{t("본원은")}{' '}<span className="text-[#0B3C26] font-black">{t("[민법] 제32조 (비영리법인의 설립과 허가)")}</span>{' '}{t("및 농림축산식품부 장관 및 그 소속 청장소관 비영리법인의 설립 및 감독에 관한규칙 제 5조의 규정에 의하여 설립됨.")}{' '}</p>
                    <p>{t("본원은 농수축산물을 활용한 외식산업 발전과 외식창업교육을 통해 외식산업 경쟁력에 기여함으로써, 국내 및 국외 외식산업을 발전시키는 것.")}{' '}</p>
                  </div>
                </div>

              </div>
            )}

            {/* SUB-TAB 2: 원장 인사말 */}
            {activeTab === 'speech' && (
              <GreetingsSection viewMode="speech" />
            )}

            {/* SUB-TAB 3: 원장 프로필 */}
            {activeTab === 'profile' && (
              <GreetingsSection viewMode="profile" />
            )}

            {/* SUB-TAB 4: 조직도 */}
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
