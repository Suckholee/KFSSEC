import React, { useState, useEffect } from 'react';
import SubSidebar from '../common/SubSidebar';
import { Rocket, Shield, HelpCircle, CheckSquare, ChevronRight, ArrowLeft, FileText, CheckCircle2 } from 'lucide-react';
import ScrollReveal from '../common/ScrollReveal';

export default function ConsultingPage({ initialSubTab = 'education', initialTab = 'education', onOpenAuth }) {
  const defaultSub = initialSubTab || initialTab || 'education';
  const [activeTab, setActiveTab] = useState(defaultSub);
  const [showTermsModal, setShowTermsModal] = useState(false);

  useEffect(() => {
    const target = initialSubTab || initialTab;
    if (target) {
      setActiveTab(target);
    }
  }, [initialSubTab, initialTab]);

  const consultingSubItems = [
    { id: 'education', label: '창업 교육' },
    { id: 'consulting', label: '창업 컨설팅' },
    { id: 'youth', label: '청년 창업 상담' },
    { id: 'readiness', label: '창업 준비' },
  ];

  const handleApplyClick = (type) => {
    if (onOpenAuth) {
      onOpenAuth('consulting');
    } else {
      alert(`[${type}] 신청 양식으로 이동합니다.`);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-6 font-sans text-gray-900">
      <div className="w-full px-4 sm:px-8 lg:px-12 space-y-6">
        
        {/* Main Content Layout: Left SubSidebar + Right Main Content (100% Matching Screenshots 1-4) */}
        <div className="flex flex-col md:flex-row gap-6 lg:gap-8 items-start">
          
          {/* Left Vertical SubSidebar Menu */}
          <SubSidebar
            title="창업컨설팅"
            items={consultingSubItems}
            activeId={activeTab}
            onSelectTab={(tabId) => setActiveTab(tabId)}
          />

          {/* Right Main Content Panel */}
          <div className="flex-1 w-full space-y-6 min-w-0">
            
            {/* SUB-TAB 1: 창업 교육 (Matching Screenshot 1) */}
            {activeTab === 'education' && (
              <div className="space-y-8 animate-fadeIn w-full">
                
                <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-black shadow-lg space-y-8 w-full">
                  
                  {/* Black Rounded Pill Header */}
                  <div className="inline-block bg-black text-white text-xl font-black px-8 py-2.5 rounded-2xl shadow-md">
                    창업 교육 신청
                  </div>

                  {/* Description Box */}
                  <div className="space-y-4 max-w-3xl">
                    <h3 className="text-xl sm:text-2xl font-black text-black">
                      창업 교육 신청 란
                    </h3>
                    <p className="text-sm sm:text-base text-gray-800 font-bold leading-relaxed">
                      창업 교육론은 청년 그리고 일반으로 나누어 지고있으며, 해당하는 정부 지원 정책도 소개하고 있기에 나눴습니다. 아래 신청 버튼을 눌러서 신청하시면 됩니다.
                    </p>
                  </div>

                  {/* Terms & Conditions Button (약관 ◀) */}
                  <div className="pt-2">
                    <button
                      onClick={() => setShowTermsModal(true)}
                      className="px-6 py-2.5 bg-black hover:bg-gray-800 text-white font-black text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <span>약관</span>
                      <span className="text-xs">◀</span>
                    </button>
                  </div>

                  {/* Two Application Action Cards (청년 창업 교육 & 일반 창업 교육) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
                    
                    {/* Card 1: 청년 창업 교육 */}
                    <div className="bg-stone-50 rounded-2xl p-6 border border-stone-300 space-y-4 shadow-sm hover:border-black transition-all">
                      <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                        GOVERNMENT POLICY SUPPORT
                      </span>
                      <h4 className="text-xl font-black text-black">
                        청년 창업 교육
                      </h4>
                      <p className="text-xs text-gray-600 font-medium leading-relaxed">
                        만 39세 이하 청년 예비 창업자를 위한 정부지원 연계 특화 창업 교육 프로그램
                      </p>
                      
                      <div className="pt-2">
                        <button
                          onClick={() => handleApplyClick('청년 창업 교육')}
                          className="w-full py-3 bg-black hover:bg-gray-800 text-white font-black text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <span>신청</span>
                          <span>◀</span>
                        </button>
                      </div>
                    </div>

                    {/* Card 2: 일반 창업 교육 */}
                    <div className="bg-stone-50 rounded-2xl p-6 border border-stone-300 space-y-4 shadow-sm hover:border-black transition-all">
                      <span className="text-xs font-black text-blue-800 bg-blue-100 px-3 py-1 rounded-full">
                        GENERAL STARTUP PACKAGE
                      </span>
                      <h4 className="text-xl font-black text-black">
                        일반 창업 교육
                      </h4>
                      <p className="text-xs text-gray-600 font-medium leading-relaxed">
                        업종 전환 및 신규 외식업 창업자를 위한 실전 메뉴개발 및 매장 운영 집중 교육
                      </p>
                      
                      <div className="pt-2">
                        <button
                          onClick={() => handleApplyClick('일반 창업 교육')}
                          className="w-full py-3 bg-black hover:bg-gray-800 text-white font-black text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <span>신청</span>
                          <span>◀</span>
                        </button>
                      </div>
                    </div>

                  </div>

                </div>

              </div>
            )}

            {/* SUB-TAB 2: 창업 컨설팅 (Matching Screenshot 2) */}
            {activeTab === 'consulting' && (
              <div className="space-y-8 animate-fadeIn w-full">
                <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-black shadow-lg space-y-6 w-full">
                  
                  <div className="inline-block bg-black text-white text-xl font-black px-8 py-2.5 rounded-2xl shadow-md">
                    창업 컨설팅
                  </div>

                  <div className="space-y-4 max-w-3xl">
                    <h3 className="text-xl sm:text-2xl font-black text-black">
                      1:1 맞춤형 외식 창업 비즈니스 컨설팅
                    </h3>
                    <p className="text-sm text-gray-700 font-bold leading-relaxed">
                      사단법인 한국외식창업교육원의 외식업 40년 명장진이 상권 분석부터 레시피 개발, 인테리어 설계, N:N 커리큘럼 매칭까지 밀착 컨설팅을 제공합니다.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                    {[
                      { title: '상권 및 입지 분석', desc: 'AI 데이터 기반 유동인구 및 주소비층 밀착 분석' },
                      { title: '시그니처 메뉴 개발', desc: '원가 산정 및 100년 전통 발효 소스 전수' },
                      { title: '매장 경영 솔루션', desc: '위생 관리, 동선 설계 및 POS 마케팅 구축' },
                    ].map((item, idx) => (
                      <div key={idx} className="bg-stone-50 p-5 rounded-2xl border border-stone-300 space-y-2">
                        <CheckCircle2 className="w-5 h-5 text-emerald-700" />
                        <h4 className="font-black text-black text-base">{item.title}</h4>
                        <p className="text-xs text-gray-600 font-medium">{item.desc}</p>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={() => handleApplyClick('1:1 창업 컨설팅')}
                      className="px-8 py-3.5 bg-black hover:bg-gray-800 text-white font-black text-sm rounded-xl shadow-md transition-all cursor-pointer"
                    >
                      1:1 컨설팅 신청하기
                    </button>
                  </div>

                </div>
              </div>
            )}

            {/* SUB-TAB 3: 청년 창업 상담 (Matching Screenshot 3) */}
            {activeTab === 'youth' && (
              <div className="space-y-8 animate-fadeIn w-full">
                <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-black shadow-lg space-y-8 w-full">
                  
                  <div className="inline-block bg-black text-white text-xl font-black px-8 py-2.5 rounded-2xl shadow-md">
                    청년 창업 상담 신청
                  </div>

                  <div className="space-y-4 max-w-3xl">
                    <h3 className="text-xl sm:text-2xl font-black text-black">
                      청년 창업 상담 신청
                    </h3>
                    <p className="text-sm sm:text-base text-gray-800 font-bold leading-relaxed">
                      청년 창업 상담 신청 하는 곳입니다.
                    </p>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => setShowTermsModal(true)}
                      className="px-6 py-2.5 bg-black hover:bg-gray-800 text-white font-black text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <span>약관</span>
                      <span className="text-xs">◀</span>
                    </button>
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={() => handleApplyClick('청년 창업 상담')}
                      className="px-8 py-3.5 bg-black hover:bg-gray-800 text-white font-black text-sm rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <span>신청</span>
                      <span className="text-xs">◀</span>
                    </button>
                  </div>

                </div>
              </div>
            )}

            {/* SUB-TAB 4: 창업 준비 (Matching Screenshot 4) */}
            {activeTab === 'readiness' && (
              <div className="space-y-8 animate-fadeIn w-full">
                <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-black shadow-lg space-y-6 w-full">
                  
                  <div className="inline-block bg-black text-white text-xl font-black px-8 py-2.5 rounded-2xl shadow-md">
                    창업 준비
                  </div>

                  <div className="space-y-4 max-w-3xl">
                    <h3 className="text-xl sm:text-2xl font-black text-black">
                      성공 창업을 위한 Step-by-Step 가이드라인
                    </h3>
                    <p className="text-sm text-gray-700 font-bold leading-relaxed">
                      체계적인 창업 준비 프로세스로 실패 없는 외식 창업을 가꾸어 드립니다.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
                    {[
                      { step: '01', title: '사업 구상 & 아이템 선정', desc: '타겟 고객층 분석 및 메뉴 컨셉 수립' },
                      { step: '02', title: '점포 계약 & 인허가', desc: '영업신고증 및 사업자등록 서류 절차' },
                      { step: '03', title: '주방 설비 & 시음 시식', desc: '동선 최적화 및 셰프 시식회 검증' },
                      { step: '04', title: '그랜드 오픈 & 홍보', desc: 'SNS 마케팅 및 오프라인 개업 지원' },
                    ].map((step, idx) => (
                      <div key={idx} className="bg-stone-50 p-5 rounded-2xl border border-stone-300 space-y-2">
                        <span className="text-xs font-black text-white bg-black px-2.5 py-1 rounded-lg">
                          STEP {step.step}
                        </span>
                        <h4 className="font-black text-black text-base pt-1">{step.title}</h4>
                        <p className="text-xs text-gray-600 font-medium">{step.desc}</p>
                      </div>
                    ))}
                  </div>

                </div>
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Terms & Conditions Modal */}
      {showTermsModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full border-2 border-black shadow-2xl space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-gray-200 pb-3">
              <h3 className="text-lg font-black text-black">창업 교육 및 상담 이용약관</h3>
              <button
                onClick={() => setShowTermsModal(false)}
                className="text-gray-400 hover:text-black font-black text-xl"
              >
                ✕
              </button>
            </div>
            
            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 text-xs text-gray-700 space-y-2 max-h-60 overflow-y-auto font-medium">
              <p className="font-bold text-black">제1조 (목적)</p>
              <p>본 약관은 사단법인 한국외식창업교육원이 제공하는 창업 교육 및 1:1 창업 컨설팅 서비스의 이용조건 및 절차에 관한 사항을 규정함을 목적으로 합니다.</p>
              <p className="font-bold text-black pt-2">제2조 (개인정보 수집 동의)</p>
              <p>신청 시 입력하신 이름, 연락처, 희망 업종 정보는 상담 및 일정 안내 목적으로만 활용됩니다.</p>
            </div>

            <div className="pt-2 text-right">
              <button
                onClick={() => setShowTermsModal(false)}
                className="px-6 py-2.5 bg-black text-white font-black text-xs rounded-xl shadow-md hover:bg-gray-800 transition-colors"
              >
                확인 및 닫기
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
