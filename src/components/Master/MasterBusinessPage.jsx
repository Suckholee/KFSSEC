import React, { useState, useEffect } from 'react';
import SubSidebar from '../common/SubSidebar';
import { Award, Utensils, CheckCircle2, ChevronRight, Scale, Sparkles, ShieldCheck } from 'lucide-react';
import ScrollReveal from '../common/ScrollReveal';

export default function MasterBusinessPage({ initialSubTab = 'masters', initialTab = 'masters' }) {
  const defaultSub = initialSubTab || initialTab || 'masters';
  const [activeTab, setActiveTab] = useState(defaultSub);

  useEffect(() => {
    const target = initialSubTab || initialTab;
    if (target) {
      setActiveTab(target);
    }
  }, [initialSubTab, initialTab]);

  const masterSubItems = [
    { id: 'masters', label: '명인 사업단' },
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
                
                {/* Header Card Box with Logo & Title - Redesigned to Heritage Gold & Deep Green Theme */}
                <div className="relative bg-[#0B3C26] text-white rounded-3xl p-6 sm:p-8 border-2 border-[#C5A059] shadow-xl grid grid-cols-1 sm:grid-cols-12 gap-6 items-center w-full overflow-hidden">
                  {/* Ambient Background Light Glow */}
                  <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-[#C5A059]/15 rounded-full blur-3xl pointer-events-none" />

                  {/* Left Logo Box */}
                  <div className="sm:col-span-5 bg-white p-6 rounded-2xl border-2 border-[#C5A059] flex items-center justify-center shadow-md">
                    <img
                      src="/images/logo.png"
                      alt="사단법인 한국외식창업교육원"
                      className="w-full max-w-xs h-auto object-contain"
                    />
                  </div>

                  {/* Right Title & Sub-badge */}
                  <div className="sm:col-span-7 flex flex-col items-center sm:items-start justify-center space-y-2 z-10">
                    <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-[#C5A059]/20 border border-[#C5A059]/40 text-[#D4AF37] text-xs font-black rounded-full">
                      <Award className="w-4 h-4 text-[#D4AF37]" />
                      <span>사단법인 한국외식창업교육원 명장 그룹</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight flex items-center gap-3">
                      <span>명인 사업단</span>
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

              </div>
            )}

            {/* SUB-TAB 2: 명인 요리 */}
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
    </div>
  );
}
