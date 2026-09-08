import React, { useState, useEffect } from 'react';
import SubSidebar from '../common/SubSidebar';
import { Building2, ShieldCheck, Scale, FileText, Bell, Users, CheckCircle2, ChevronRight, HelpCircle, Gift, Sparkles, PhoneCall } from 'lucide-react';
import ScrollReveal from '../common/ScrollReveal';

export default function GangnamSohoPage({ initialSubTab = 'intro', initialTab = 'intro' }) {
  const defaultSub = initialSubTab || initialTab || 'intro';
  const [activeTab, setActiveTab] = useState(defaultSub);

  useEffect(() => {
    const target = initialSubTab || initialTab;
    if (target) {
      setActiveTab(target);
    }
  }, [initialSubTab, initialTab]);

  const handleTabChange = (id) => {
    setActiveTab(id);
    window.history.pushState({}, '', `/gangnam/${id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const gangnamSubItems = [
    { id: 'intro', label: '조직 및 연합 소개' },
    { id: 'benefits', label: '회원 가입 혜택' },
    { id: 'support', label: '법률·세무·회계 지원' },
    { id: 'notices', label: '공지 및 행사 소식' },
  ];

  return (
    <div className="w-full bg-[#FDFBF7] min-h-screen font-sans text-gray-900 pb-16">
      
      {/* Top Banner Header */}
      <div className="relative bg-[#0B3C26] text-white py-12 sm:py-16 px-4 sm:px-8 border-b-4 border-[#C5A059] shadow-lg overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C5A059]/20 border border-[#C5A059]/40 text-[#D4AF37] text-xs font-black">
            <Building2 className="w-4 h-4" />
            <span>강남구 소상공인 특별 전용 지원 센터</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white font-serif">
            강남구 소상공인 연합 지원관
          </h1>

          <p className="text-emerald-100/90 text-sm sm:text-base font-bold max-w-2xl leading-relaxed">
            강남구 지역 소상공인의 권익 보호, 경영 개선 및 법률·세무·회계 종합 자문 지원을 위한 전용 공간입니다.
          </p>
        </div>
      </div>

      {/* Main Container Layout (SubSidebar + Content) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
          {/* Left SubSidebar */}
          <div className="lg:col-span-1 sticky top-24 z-20">
            <SubSidebar
              title="강남구 소상공인"
              items={gangnamSubItems}
              activeTab={activeTab}
              onTabChange={handleTabChange}
            />
          </div>

          {/* Right Main Content */}
          <div className="lg:col-span-3 space-y-8">
            
            {/* SUB-TAB 1: 조직 및 연합 소개 */}
            {activeTab === 'intro' && (
              <ScrollReveal>
                <div className="space-y-6">
                  <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-gray-200 shadow-md space-y-4">
                    <span className="text-xs font-black text-[#0B3C26] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                      GANGNAM SOHO ASSOCIATION
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
                      강남구 소상공인 연합회 개요
                    </h2>
                    <p className="text-sm sm:text-base text-gray-700 font-medium leading-relaxed">
                      강남구 내 5만 여 소상공인의 안정적인 매장 운영과 지속 가능한 성장을 돕기 위해 설립된 비영리 자율 지원 단체입니다.
                      한국외식창업교육원과 협력하여 골목상권 활성화, 맞춤형 창업 인허가 컨설팅, 소상공인 역량 강화 교육을 적극 추진하고 있습니다.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-2 text-center">
                      <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto text-[#0B3C26]">
                        <Users className="w-6 h-6" />
                      </div>
                      <h4 className="font-black text-gray-900 text-base">회원 권익 보호</h4>
                      <p className="text-xs text-gray-600 font-medium">소상공인 규제 개선 및 불공정 거래 대응 자문</p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-2 text-center">
                      <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mx-auto text-[#B38F48]">
                        <Building2 className="w-6 h-6" />
                      </div>
                      <h4 className="font-black text-gray-900 text-base">골목상권 활성화</h4>
                      <p className="text-xs text-gray-600 font-medium">강남구 상권 데이터 분석 및 마케팅 지원</p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-2 text-center">
                      <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto text-[#0B3C26]">
                        <Scale className="w-6 h-6" />
                      </div>
                      <h4 className="font-black text-gray-900 text-base">전문가 경영 자문</h4>
                      <p className="text-xs text-gray-600 font-medium">변호사·세무사·노무사 1:1 동반 상담</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            )}

            {/* SUB-TAB 2: 회원 가입 혜택 */}
            {activeTab === 'benefits' && (
              <ScrollReveal>
                <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-gray-200 shadow-md space-y-6">
                  <div className="border-b border-gray-200 pb-4">
                    <span className="text-xs font-black text-[#C5A059] bg-[#C5A059]/10 px-3 py-1 rounded-full border border-[#C5A059]/30">
                      MEMBERSHIP BENEFITS
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mt-2">
                      강남구 소상공인 회원 혜택
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm font-bold">
                    {[
                      { title: '외식창업 수강료 30% 특별 할인', desc: '한국외식창업교육원 실전 전과정 우대 가산점 및 수강료 감면' },
                      { title: '무상 세무·노무 1:1 상담권', desc: '매월 1회 전문 세무사·노무사 무료 자문 상담 제공' },
                      { title: '정부/지자체 소상공인 지원금 알림', desc: '강남구 및 서울시 소상공인 육성자금 신속 안내' },
                      { title: '네이버 플레이스 마케팅 컨설팅', desc: '지역 상권 키워드 상위 노출 기법 및 무료 메뉴판 디자인 템플릿' },
                    ].map((benefit, idx) => (
                      <div key={idx} className="bg-[#F8F6F0] p-5 rounded-2xl border border-[#E5E0D8] space-y-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#0B3C26]" />
                          <span className="font-black text-gray-900 text-sm sm:text-base">{benefit.title}</span>
                        </div>
                        <p className="text-xs text-gray-600 font-medium leading-relaxed pl-6">{benefit.desc}</p>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-gray-200 flex justify-end">
                    <button
                      onClick={() => alert('🎉 강남구 소상공인 가입 상담 신청이 완료되었습니다.\n담당자가 빠른 시간 내 연락드립니다.')}
                      className="px-6 py-3 bg-[#0B3C26] hover:bg-[#072819] text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer border border-[#C5A059]"
                    >
                      <span>⚡ 강남구 소상공인 회원 가입 상담 신청</span>
                      <ChevronRight className="w-4 h-4 text-[#D4AF37]" />
                    </button>
                  </div>
                </div>
              </ScrollReveal>
            )}

            {/* SUB-TAB 3: 법률·세무·회계 지원 */}
            {activeTab === 'support' && (
              <ScrollReveal>
                <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-gray-200 shadow-md space-y-6">
                  <div className="border-b border-gray-200 pb-4">
                    <span className="text-xs font-black text-emerald-900 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
                      LEGAL & TAX SUPPORT
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mt-2">
                      법률·세무·회계 전문 지원 정보
                    </h2>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-stone-50 p-5 rounded-2xl border border-stone-300 space-y-2">
                      <h4 className="font-black text-gray-900 text-base flex items-center gap-2">
                        <Scale className="w-5 h-5 text-[#0B3C26]" />
                        <span>상가 임대차 보호법 및 권리금 자문</span>
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed">
                        계약 갱신 요구권, 임대료 인상 상한율(5%), 권리금 회수 기회 보호 등 소상공인이 필수적으로 알아야 할 임대차 법률 가이드를 제공합니다.
                      </p>
                    </div>

                    <div className="bg-stone-50 p-5 rounded-2xl border border-stone-300 space-y-2">
                      <h4 className="font-black text-gray-900 text-base flex items-center gap-2">
                        <FileText className="w-5 h-5 text-[#B38F48]" />
                        <span>부가가치세 & 종합소득세 절세 절차</span>
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed">
                        외식업 의제매입세액 공제, 카드 매출 매입 공제 및 식자재 지출 증빙 팁을 실무 중심으로 안내합니다.
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            )}

            {/* SUB-TAB 4: 공지 및 행사 소식 */}
            {activeTab === 'notices' && (
              <ScrollReveal>
                <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-gray-200 shadow-md space-y-6">
                  <div className="border-b border-gray-200 pb-4">
                    <span className="text-xs font-black text-gray-700 bg-gray-100 px-3 py-1 rounded-full border border-gray-300">
                      NOTICES & EVENTS
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mt-2">
                      강남구 소상공인 공지사항 및 행사 소식
                    </h2>
                  </div>

                  <div className="divide-y divide-gray-200 font-bold text-xs sm:text-sm">
                    {[
                      { id: 1, date: '2026.09.05', title: '[강남구청 소식] 2026 하반기 소상공인 긴급 경영안정자금 신청 안내', category: '지원사업' },
                      { id: 2, date: '2026.08.28', title: '[세무 특강] 외식업 자영업자를 위한 부가가치세 신고 및 절세 세미나', category: '세미나' },
                      { id: 3, date: '2026.08.15', title: '[행사] 강남구 맛집 상권 소상공인 상생 박람회 개최 안내', category: '행사' },
                    ].map((notice) => (
                      <div key={notice.id} className="py-4 flex items-center justify-between gap-4 hover:bg-stone-50 transition-colors cursor-pointer px-2 rounded-xl">
                        <div className="space-y-1">
                          <span className="text-[11px] font-black text-emerald-900 bg-emerald-100 px-2.5 py-0.5 rounded-md mr-2">
                            {notice.category}
                          </span>
                          <span className="font-bold text-gray-900 text-sm">{notice.title}</span>
                        </div>
                        <span className="text-xs font-mono text-gray-400 shrink-0">{notice.date}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            )}

          </div>

        </div>
      </div>

    </div>
  );
}
