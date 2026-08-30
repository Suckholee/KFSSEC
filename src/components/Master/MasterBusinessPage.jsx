import React, { useState, useEffect } from 'react';
import SubSidebar from '../common/SubSidebar';
import { Award, Utensils, CheckCircle2, ChevronRight, Scale, Sparkles } from 'lucide-react';
import ScrollReveal from '../common/ScrollReveal';

export default function MasterBusinessPage({ initialTab = 'masters' }) {
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

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
                
                {/* Header Card Box with Logo & Title */}
                <div className="bg-black text-white rounded-3xl p-6 sm:p-10 border border-gray-800 shadow-xl grid grid-cols-1 sm:grid-cols-12 gap-6 items-center w-full">
                  <div className="sm:col-span-5 bg-white p-6 rounded-2xl border border-gray-300 flex items-center justify-center shadow-inner">
                    <img
                      src="/images/logo.png"
                      alt="사단법인 한국외식창업교육원"
                      className="w-full max-w-xs h-auto object-contain"
                    />
                  </div>

                  <div className="sm:col-span-7 flex items-center justify-center sm:justify-start">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                      명인 사업단
                    </h2>
                  </div>
                </div>

                {/* Purpose & Content Box */}
                <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-gray-300 shadow-lg space-y-6 w-full">
                  <h3 className="text-xl font-black text-black border-b-2 border-black pb-2 flex items-center gap-2">
                    <Scale className="w-5 h-5 text-emerald-700" />
                    <span>• 설립목적</span>
                  </h3>
                  
                  <div className="space-y-5 text-xs sm:text-sm text-gray-800 font-bold leading-relaxed">
                    <div className="flex items-start gap-3 bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200/60">
                      <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                      <p>
                        본원은 <span className="text-emerald-700 font-black">[민법] 제32조 (비영리법인의 설립과 허가)</span> 및 농림축산식품부 장관 및 그 소속 청장소관 비영리법인의 설립 및 감독에 관한규칙 제 5조의 규정에 의하여 설립됨.
                      </p>
                    </div>

                    <div className="flex items-start gap-3 bg-stone-50 p-4 rounded-2xl border border-stone-200">
                      <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                      <p>
                        본원은 <span className="text-emerald-800 font-black">농수축산물을 활용한 외식산업 발전</span>과 <span className="text-black font-black">외식창업교육</span>을 통해 외식산업 경쟁력에 기여함으로써, 국내 및 국외 외식산업을 발전시키는 것.
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* SUB-TAB 2: 명인 요리 */}
            {activeTab === 'dishes' && (
              <div className="space-y-8 animate-fadeIn w-full">
                
                <div className="border-b-2 border-black pb-4 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-black text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full uppercase tracking-wider">
                      MASTER SIGNATURE DISHES
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-black text-black tracking-tight mt-2">
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
                      <div className="group bg-white rounded-3xl border-2 border-gray-300 p-4 shadow-xl hover:shadow-2xl hover:border-black transition-all duration-500 space-y-4 overflow-hidden h-full flex flex-col justify-between">
                        
                        <div className="relative h-60 sm:h-64 rounded-2xl overflow-hidden shadow-md bg-black transform -skew-x-4 group-hover:skew-x-0 transition-transform duration-500 shrink-0">
                          <img
                            src={dish.image}
                            alt={dish.title}
                            className="w-full h-full object-cover transform skew-x-4 group-hover:skew-x-0 group-hover:scale-108 transition-transform duration-700"
                          />
                          <div className="absolute top-3 left-3 bg-black/85 text-emerald-300 font-black text-[11px] px-3 py-1 rounded-full transform skew-x-4 border border-emerald-500/30">
                            {dish.category}
                          </div>
                        </div>

                        <div className="space-y-2 px-1 pb-1 flex-1 flex flex-col justify-between">
                          <div>
                            <h3 className="text-base font-black text-black group-hover:text-emerald-700 transition-colors leading-snug">
                              {dish.title}
                            </h3>
                            <p className="text-xs text-gray-600 font-medium leading-relaxed mt-1.5">
                              {dish.desc}
                            </p>
                          </div>

                          <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-emerald-700">
                            <span>명인 레시피 과정</span>
                            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
