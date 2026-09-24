import { useLanguage } from '../../i18n/LanguageContext';
import React, { useState, useEffect } from 'react';
import SubSidebar from '../common/SubSidebar';
import { Rocket, Shield, HelpCircle, CheckSquare, ChevronRight, ArrowLeft, FileText, CheckCircle2 } from 'lucide-react';
import ScrollReveal from '../common/ScrollReveal';

export default function ConsultingPage({ initialSubTab = 'education', initialTab = 'education', onOpenAuth }) {
  const { tr, language } = useLanguage();
  const resolveTab = value => value === 'apply' ? 'consulting' : ['education', 'consulting', 'youth', 'readiness'].includes(value) ? value : 'education';
  const defaultSub = resolveTab(initialSubTab || initialTab);
  const [activeTab, setActiveTab] = useState(defaultSub);
  const [showTermsModal, setShowTermsModal] = useState(false);

  useEffect(() => {
    const target = initialSubTab || initialTab;
    if (target) {
      setActiveTab(resolveTab(target));
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
      alert(tr`[${type}] 신청 양식으로 이동합니다.`);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-6 font-sans text-gray-900">
      <div className="w-full px-4 sm:px-8 lg:px-12 space-y-6">
        
        {/* Main Content Layout: Left SubSidebar + Right Main Content (100% Matching Screenshots 1-4) */}
        <div className="flex flex-col md:flex-row gap-6 lg:gap-8 items-start">
          
          {/* Left Vertical SubSidebar Menu */}
          <SubSidebar
            title={tr("창업컨설팅")}
            items={consultingSubItems}
            activeId={activeTab}
            onSelectTab={(tabId) => setActiveTab(tabId)}
          />

          {/* Right Main Content Panel */}
          <div className="flex-1 w-full space-y-6 min-w-0">
            
            {/* SUB-TAB 1: 창업 교육 */}
            {activeTab === 'education' && (
              <div className="space-y-8 animate-fadeIn w-full">
                <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-[#0B3C26] shadow-xl space-y-8 w-full">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-[#0B3C26] pb-4">
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C5A059]/20 border border-[#C5A059]/40 text-[#0B3C26] text-xs font-black mb-1.5">
                        <Rocket className="w-3.5 h-3.5 text-[#C5A059]" />
                        <span>ENTREPRENEURSHIP CURRICULUM</span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                        {tr("외식 창업 전문 교육 프로그램")}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 font-medium mt-1">
                        {tr("청년 창업부터 중장년 은퇴 창업까지, 정부지원금 연계와 실전 조리 실습이 결합된 맞춤형 교육 과정입니다.")}
                      </p>
                    </div>
                    <span className="text-xs font-black text-white bg-[#0B3C26] px-4 py-2 rounded-2xl shrink-0 self-start sm:self-auto shadow-md">
                      상시 모집 중
                    </span>
                  </div>

                  {/* Two Application Action Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                    
                    {/* Card 1: 청년 창업 교육 */}
                    <div className="bg-stone-50 rounded-2xl p-6 border-2 border-stone-200 hover:border-[#0B3C26] space-y-4 shadow-xs hover:shadow-md transition-all">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                          만 39세 이하 청년 특화
                        </span>
                        <span className="text-xs font-bold text-gray-400">정부지원금 연계</span>
                      </div>
                      <h4 className="text-xl font-black text-gray-900">{tr("청년 외식창업 사관학교")}</h4>
                      <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed">
                        {tr("소자본 트렌디 외식 창업, 배달/밀키트 기획, 소상공인 정책자금 신청을 위한 사업계획서 1:1 코칭을 제공합니다.")}
                      </p>
                      
                      <ul className="space-y-1.5 text-xs text-gray-700 font-bold border-t border-stone-200 pt-3">
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#0B3C26]" />
                          <span>중소벤처기업부 저금리 정책자금 코칭</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#0B3C26]" />
                          <span>SNS 마케팅 & 네이버 플레이스 공략법</span>
                        </li>
                      </ul>

                      <div className="pt-2">
                        <button
                          onClick={() => handleApplyClick('청년 창업 교육')}
                          className="w-full py-3 bg-[#0B3C26] hover:bg-[#072819] text-white font-black text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <span>{tr("청년 창업 교육 신청하기")}</span>
                          <ChevronRight className="w-4 h-4 text-[#D4AF37]" />
                        </button>
                      </div>
                    </div>

                    {/* Card 2: 일반 창업 교육 */}
                    <div className="bg-stone-50 rounded-2xl p-6 border-2 border-stone-200 hover:border-[#C5A059] space-y-4 shadow-xs hover:shadow-md transition-all">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-amber-900 bg-amber-100 px-3 py-1 rounded-full">
                          일반 & 은퇴자 맞춤
                        </span>
                        <span className="text-xs font-bold text-gray-400">업종 전환 / 시니어</span>
                      </div>
                      <h4 className="text-xl font-black text-gray-900">{tr("실전 외식경영 & 업종전환 마스터")}</h4>
                      <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed">
                        {tr("기존 매장 매출 부진 개선, 100년 전통 발효 소스 전수, 안정적 오토 매장 구축 등 실전 성공 솔루션을 전수합니다.")}
                      </p>

                      <ul className="space-y-1.5 text-xs text-gray-700 font-bold border-t border-stone-200 pt-3">
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A059]" />
                          <span>조리명장 시그니처 레시피 1:1 도제식 전수</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A059]" />
                          <span>식자재 원가 절감 & 주방 동선 효율화</span>
                        </li>
                      </ul>

                      <div className="pt-2">
                        <button
                          onClick={() => handleApplyClick('일반 창업 교육')}
                          className="w-full py-3 bg-[#C5A059] hover:bg-[#d8b368] text-stone-950 font-black text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <span>{tr("일반 창업 교육 신청하기")}</span>
                          <ChevronRight className="w-4 h-4 text-stone-950" />
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            )}

            {/* SUB-TAB 2: 창업 컨설팅 */}
            {activeTab === 'consulting' && (
              <div className="space-y-8 animate-fadeIn w-full">
                <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-[#0B3C26] shadow-xl space-y-8 w-full">
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-[#0B3C26] pb-4">
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C5A059]/20 border border-[#C5A059]/40 text-[#0B3C26] text-xs font-black mb-1.5">
                        <Shield className="w-3.5 h-3.5 text-[#C5A059]" />
                        <span>END-TO-END STARTUP CONSULTING</span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                        {tr("외식 창업 6단계 토탈 컨설팅 로드맵")}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 font-medium mt-1">
                        {tr("진익준 교수, 조리명장, 주방뱅크 등 최고의 전문가 집단이 개설 전 과정을 밀착 동행합니다.")}
                      </p>
                    </div>
                  </div>

                  {/* 6 Step Roadmap Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {[
                      {
                        step: 'STEP 01',
                        title: '1:1 정밀 진단 & 예산 기획',
                        desc: '창업자의 자본금, 희망 업종, 상권 선호도를 종합 분석하여 최적의 비즈니스 모델을 수립합니다.',
                      },
                      {
                        step: 'STEP 02',
                        title: '빅데이터 상권 & 입지 분석',
                        desc: '진익준 교수 연구팀의 유동인구, 배후 세대수, 경쟁 점포 데이터 분석으로 실패 없는 입지를 선정합니다.',
                      },
                      {
                        step: 'STEP 03',
                        title: '시그니처 메뉴 & 레시피 R&D',
                        desc: '조리명장의 독보적 레시피 전수 및 대용량 조리 표준화, 원가율 30% 이하 최적화 설계를 진행합니다.',
                      },
                      {
                        step: 'STEP 04',
                        title: '공간 브랜딩 & 3D 주방 설계',
                        desc: '(주)주방뱅크 협력을 통해 조리 동선 최적화 주방 도면과 고객 경험 디자인(CX) 파사드를 시공합니다.',
                      },
                      {
                        step: 'STEP 05',
                        title: '인허가 & 소방·위생·세무 지원',
                        desc: '영업신고증, 위생교육, 사업자등록, 소방 방염 필증 등 복잡한 행정 절차를 무상 대행 코칭합니다.',
                      },
                      {
                        step: 'STEP 06',
                        title: '그랜드 오픈 & 바이럴 마케팅',
                        desc: '네이버 플레이스 1페이지 노출, 인스타그램 릴스 마케팅, 오픈 당일 현장 밀착 감독 및 사후 모니터링을 보장합니다.',
                      },
                    ].map((item, idx) => (
                      <div key={idx} className="bg-stone-50 p-5 rounded-2xl border border-stone-200 hover:border-[#0B3C26] transition-all space-y-2 group">
                        <span className="text-[11px] font-black text-white bg-[#0B3C26] px-2.5 py-0.5 rounded-md group-hover:bg-[#C5A059] transition-colors">
                          {item.step}
                        </span>
                        <h4 className="font-black text-gray-900 text-base group-hover:text-[#0B3C26] transition-colors">
                          {tr(item.title)}
                        </h4>
                        <p className="text-xs text-gray-600 font-medium leading-relaxed">
                          {tr(item.desc)}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* CTA Banner */}
                  <div className="bg-emerald-50/80 rounded-2xl p-6 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <h4 className="font-black text-base text-[#0B3C26]">
                        {tr("내 매장 맞춤형 1:1 창업 컨설팅 무료 상담 받기")}
                      </h4>
                      <p className="text-xs text-stone-600 font-medium mt-0.5">
                        {tr("전담 전문위원이 24시간 이내에 입지 및 메뉴 진단 제안서를 준비하여 연락드립니다.")}
                      </p>
                    </div>
                    <button
                      onClick={() => handleApplyClick('1:1 맞춤형 창업 컨설팅')}
                      className="px-6 py-3 bg-[#0B3C26] hover:bg-[#072819] text-white font-black text-xs sm:text-sm rounded-xl shadow-md transition-all cursor-pointer whitespace-nowrap"
                    >
                      {tr("1:1 컨설팅 신청하기")}
                    </button>
                  </div>

                </div>
              </div>
            )}

            {/* SUB-TAB 3: 청년 창업 상담 */}
            {activeTab === 'youth' && (
              <div className="space-y-8 animate-fadeIn w-full">
                <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-[#0B3C26] shadow-xl space-y-8 w-full">
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-[#0B3C26] pb-4">
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C5A059]/20 border border-[#C5A059]/40 text-[#0B3C26] text-xs font-black mb-1.5">
                        <Rocket className="w-3.5 h-3.5 text-[#C5A059]" />
                        <span>YOUTH ENTREPRENEUR INCUBATING</span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                        {tr("청년 외식창업 집중 인큐베이팅")}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 font-medium mt-1">
                        {tr("만 39세 이하 청년 창업인을 위한 정부 정책자금, 엔젤투자, 청년몰 입점 및 1:1 멘토링 상담입니다.")}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200 space-y-2">
                      <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">지원 01</span>
                      <h4 className="font-black text-sm text-gray-900">청년 소상공인 정책자금</h4>
                      <p className="text-xs text-gray-600 font-medium leading-relaxed">최대 1억원 저금리 정책 대출 사업계획서 1:1 첨삭 및 교육원 수료증 발급</p>
                    </div>
                    <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200 space-y-2">
                      <span className="text-xs font-black text-amber-800 bg-amber-100 px-2 py-0.5 rounded">지원 02</span>
                      <h4 className="font-black text-sm text-gray-900">공유주방 & 팝업스토어</h4>
                      <p className="text-xs text-gray-600 font-medium leading-relaxed">창업 전 시제품 메뉴 시장성 검증을 위한 테스트 베드 및 조리 시설 무상 지원</p>
                    </div>
                    <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200 space-y-2">
                      <span className="text-xs font-black text-purple-800 bg-purple-100 px-2 py-0.5 rounded">지원 03</span>
                      <h4 className="font-black text-sm text-gray-900">조리명장 1:1 전담 멘토링</h4>
                      <p className="text-xs text-gray-600 font-medium leading-relaxed">초보 청년 창업자가 겪는 주방 운영, 발주, 위생, 컴플레인 해결 전담 코칭</p>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => handleApplyClick('청년 창업 1:1 심층 상담')}
                      className="w-full sm:w-auto px-8 py-3.5 bg-[#0B3C26] hover:bg-[#072819] text-white font-black text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>{tr("청년 창업 상담 신청하기")}</span>
                      <ChevronRight className="w-4 h-4 text-[#D4AF37]" />
                    </button>
                  </div>

                </div>
              </div>
            )}

            {/* SUB-TAB 4: 창업 준비 */}
            {activeTab === 'readiness' && (
              <div className="space-y-8 animate-fadeIn w-full">
                <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-[#0B3C26] shadow-xl space-y-8 w-full">
                  <div className="border-b-2 border-[#0B3C26] pb-4">
                    <h3 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                      {tr("외식 창업 필수 자가진단 체크리스트")}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 font-medium mt-1">
                      {tr("창업 전 반드시 점검해야 할 핵심 10대 요소를 확인하고 부족한 부분을 교육원과 함께 보완하세요.")}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      '1. 목표 상권의 핵심 타겟 고객층과 유동인구 동선이 확인되었는가?',
                      '2. 대표 시그니처 메뉴의 레시피 표준화 및 원가율(30% 이하)이 계산되었는가?',
                      '3. 1인 운영 또는 피크타임 주방 동선이 최소화되어 설계되었는가?',
                      '4. 초기 보증금, 인테리어, 집기 외에 6개월치 예비 운영자금이 확보되었는가?',
                      '5. 관할 지자체 식품위생법상 인허가 및 정화조 용량이 확인되었는가?',
                      '6. 배달 플랫폼(배민, 쿠팡이츠) 등록 및 포장 밀키트 규격이 마련되었는가?',
                      '7. 네이버 플레이스 및 스마트콜 등 온라인 검색 최적화가 준비되었는가?',
                      '8. 안정적인 식자재 B2B 발주 및 식자재 공급 계약이 완료되었는가?',
                    ].map((item, idx) => (
                      <div key={idx} className="bg-stone-50 p-4 rounded-xl border border-stone-200 flex items-start gap-2.5">
                        <CheckSquare className="w-4 h-4 text-[#0B3C26] shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm text-gray-800 font-bold">{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
                    <button
                      onClick={() => handleApplyClick('창업 준비 종합 진단')}
                      className="w-full sm:w-auto px-8 py-3.5 bg-[#0B3C26] hover:bg-[#072819] text-white font-black text-sm rounded-xl shadow-md transition-all cursor-pointer"
                    >
                      {tr("창업 준비 종합 진단 의뢰하기")}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* SUB-TAB 4: 창업 준비 (Matching Screenshot 4) */}
            {activeTab === 'readiness' && (
              <div className="space-y-8 animate-fadeIn w-full">
                <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-black shadow-lg space-y-6 w-full">
                  
                  <div className="inline-block bg-black text-white text-xl font-black px-8 py-2.5 rounded-2xl shadow-md">{tr(" 창업 준비 ")}</div>

                  <div className="space-y-4 max-w-3xl">
                    <h3 className="text-xl sm:text-2xl font-black text-black">{tr(" 성공 창업을 위한 Step-by-Step 가이드라인 ")}</h3>
                    <p className="text-sm text-gray-700 font-bold leading-relaxed">{tr(" 체계적인 창업 준비 프로세스로 실패 없는 외식 창업을 가꾸어 드립니다. ")}</p>
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
                          STEP {tr(step.step)}
                        </span>
                        <h4 className="font-black text-black text-base pt-1">{tr(step.title)}</h4>
                        <p className="text-xs text-gray-600 font-medium">{tr(step.desc)}</p>
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
              <h3 className="text-lg font-black text-black">{tr("창업 교육 및 상담 이용약관")}</h3>
              <button
                onClick={() => setShowTermsModal(false)}
                className="text-gray-400 hover:text-black font-black text-xl"
              >
                ✕
              </button>
            </div>
            
            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 text-xs text-gray-700 space-y-2 max-h-60 overflow-y-auto font-medium">
              <p className="font-bold text-black">{tr("제1조 (목적)")}</p>
              <p>{tr("본 약관은 사단법인 한국외식창업교육원이 제공하는 창업 교육 및 1:1 창업 컨설팅 서비스의 이용조건 및 절차에 관한 사항을 규정함을 목적으로 합니다.")}</p>
              <p className="font-bold text-black pt-2">{tr("제2조 (개인정보 수집 동의)")}</p>
              <p>{tr("신청 시 입력하신 이름, 연락처, 희망 업종 정보는 상담 및 일정 안내 목적으로만 활용됩니다.")}</p>
            </div>

            <div className="pt-2 text-right">
              <button
                onClick={() => setShowTermsModal(false)}
                className="px-6 py-2.5 bg-black text-white font-black text-xs rounded-xl shadow-md hover:bg-gray-800 transition-colors"
              >{tr(" 확인 및 닫기 ")}</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
