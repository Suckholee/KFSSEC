import React, { useState, useEffect } from 'react';
import GreetingsSection from './GreetingsSection';
import LocationSection from './LocationSection';
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
  ChevronUp as ScrollTopIcon,
} from 'lucide-react';

export default function AboutPage({ initialTab = 'greetings' }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

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

  const aboutSubTabs = [
    { id: 'greetings', label: '교육원 소개', icon: Building2 },
    { id: 'speech', label: '원장 인사말', icon: User },
    { id: 'profile', label: '원장 프로필', icon: UserCheck },
    { id: 'organization', label: '조직도', icon: Users },
    { id: 'location', label: '교육원 사무국', icon: MapPin },
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-10 relative font-sans text-gray-900">
      <div className="w-full px-4 sm:px-8 lg:px-12 space-y-10 max-w-7xl mx-auto">
        
        {/* Slanted Sub-Navigation Tabs Bar (Matching Images 1 - 5) */}
        <div className="bg-white rounded-2xl p-2 border-2 border-black shadow-lg flex flex-wrap items-center justify-center gap-2 max-w-5xl mx-auto mb-8">
          {aboutSubTabs.map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? 'bg-black text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-black'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-emerald-400' : 'text-gray-500'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* SUB-TAB 1: 교육원 소개 */}
        {activeTab === 'greetings' && (
          <div className="space-y-10 animate-fadeIn">
            
            {/* Image 1 Profile Summary Box */}
            <div className="bg-black text-white rounded-3xl p-6 sm:p-10 border border-gray-800 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-gray-300 flex items-center justify-center shadow-inner">
                <img
                  src="/images/logo.png"
                  alt="사단법인 한국외식창업교육원"
                  className="w-full max-w-xs h-auto object-contain"
                />
              </div>

              <div className="lg:col-span-7 space-y-3 text-xs sm:text-sm">
                <ul className="space-y-2 font-bold text-gray-200">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>법인명 : 사단법인 한국외식창업교육원</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>영문명 : Korea Food Service Startup Education Center</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>대표자 : 원장 안형상 이사장</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>분 야 : 창업 외식 교육</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>설립 및 허가일자 : 2022년 7월 29일</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Establishment Purpose (설립목적) */}
            <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-gray-300 shadow-lg space-y-6">
              <h3 className="text-xl font-black text-black border-b-2 border-black pb-2">
                • 설립목적
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-gray-800 font-bold leading-relaxed">
                <p>
                  본원은 <span className="text-emerald-700 font-black">[민법] 제32조 (비영리법인의 설립과 허가)</span> 및 농림축산식품부 장관 및 그 소속 청장소관 비영리법인의 설립 및 감독에 관한규칙 제 5조의 규정에 의하여 설립됨.
                </p>
                <p>
                  본원은 농수축산물을 활용한 외식산업 발전과 외식창업교육을 통해 외식산업 경쟁력에 기여함으로써, 국내 및 국외 외식산업을 발전시키는 것.
                </p>
              </div>
            </div>

          </div>
        )}

        {/* SUB-TAB 2: 원장 인사말 */}
        {activeTab === 'speech' && (
          <GreetingsSection />
        )}

        {/* SUB-TAB 3: 원장 프로필 */}
        {activeTab === 'profile' && (
          <GreetingsSection />
        )}

        {/* SUB-TAB 4: 조직도 (NEW ADDITION MATCHING IMAGE 4) */}
        {activeTab === 'organization' && (
          <OrganizationSection />
        )}

        {/* SUB-TAB 5: 교육원 사무국 */}
        {activeTab === 'location' && (
          <LocationSection />
        )}

      </div>

      {/* Floating Scroll-To-Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-2xl bg-black text-white shadow-2xl hover:bg-gray-800 flex items-center justify-center transition-all duration-300 hover:scale-110 border border-gray-600 cursor-pointer animate-fadeIn"
          aria-label="최상단으로 이동"
        >
          <ScrollTopIcon className="w-6 h-6 stroke-[2.5]" />
        </button>
      )}
    </div>
  );
}
