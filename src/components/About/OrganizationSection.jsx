import React, { useState } from 'react';
import OrganizationChart from './OrganizationChart';
import { useLanguage } from '../../i18n/LanguageContext';
import { useAdminEdit } from '../../context/AdminEditContext';
import EditableText from '../Admin/InlineEditor/EditableText';
import {
  Shield,
  Building2,
  Award,
  CheckCircle2,
  Network,
  Users,
  Store,
  TrendingUp,
  GraduationCap,
  HeartHandshake,
  UtensilsCrossed,
  Coffee,
  CakeSlice,
  Wine,
  Trophy,
  Sparkles,
  PartyPopper,
  FlaskConical,
  Handshake,
  Megaphone,
  Globe,
  Layers,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

export default function OrganizationSection() {
  const { t } = useLanguage();
  
  // 메인 뷰 모드: 'hierarchy' (조직 체계도) | 'domains' (주요 업무 안내)
  const [activeView, setActiveView] = useState('hierarchy');
  
  // 주요 업무 뷰 필터: 'all' | 'startup' | 'culinary' | 'education' | 'rnd'
  const [selectedField, setSelectedField] = useState('all');

  // 원본 16열 다이어그램 확장 토글
  const [showRaw16Columns, setShowRaw16Columns] = useState(false);

  // 10개 산학 협력업체 목록
  const partners = [
    "(주)세진",
    "(주)비엠스 인터내셔날",
    "㈜자인",
    "㈜다이닝에프앤비",
    "㈜주방뱅크",
    "김태완스시",
    "황태회관",
    "VEN60",
    "진도울돌목가는길",
    "닥터장 베이킹랩",
  ];

  // 16대 원본 분과 목록 (순서 보존)
  const rawDivisions = [
    "메뉴개발", "외식창업", "교육,자격", "연구개발",
    "대외협력", "홍보개발", "장인발굴단", "요리대회",
    "외식경영 컨설팅", "창업교육", "바리스타", "베이커리",
    "문화행사", "소믈리에", "시니어", "해외사업부"
  ];

  // 4대 주요 사업 분야 및 16대 실무 업무 정의
  const businessFields = [
    {
      id: 'startup',
      title: '외식 창업 & 경영 지원',
      desc: '예비 창업자 및 소상공인을 위한 입지 상권 분석과 전문 경영 솔루션',
      badge: '창업·경영',
      badgeColor: 'bg-emerald-50 text-emerald-900 border-emerald-200',
      items: [
        {
          name: '외식창업',
          role: '상권 분석, 점포 입지 선정, 콘셉트 기획 및 매장 개설 전 과정 지원',
          icon: Store,
        },
        {
          name: '외식경영 컨설팅',
          role: '기존 매장 경영 진단, 원가 절감, 운영 효율화 및 매출 개선 솔루션',
          icon: TrendingUp,
        },
        {
          name: '창업교육',
          role: '실전 비즈니스 모델 구축 및 예비 창업자를 위한 집중 실무 교육',
          icon: GraduationCap,
        },
        {
          name: '시니어',
          role: '은퇴자 및 5060 중장년층을 위한 맞춤형 안정 외식 창업 지원',
          icon: HeartHandshake,
        },
      ],
    },
    {
      id: 'culinary',
      title: '메뉴 개발 & 식음료 실무',
      desc: '대표 시그니처 메뉴 기획과 카페·제과제빵·주류 전문 기술 전수',
      badge: '메뉴·식음료',
      badgeColor: 'bg-amber-50 text-amber-900 border-amber-200',
      items: [
        {
          name: '메뉴개발',
          role: '트렌드 맞춤형 대표 시그니처 메뉴 개발, 레시피 전수 및 표준화',
          icon: UtensilsCrossed,
        },
        {
          name: '바리스타',
          role: '스페셜티 커피 추출, 원두 선별 및 최신 카페 음료 실무 기술',
          icon: Coffee,
        },
        {
          name: '베이커리',
          role: '천연 발효 제빵, 시그니처 디저트 기획 및 카페형 제과제빵 실습',
          icon: CakeSlice,
        },
        {
          name: '소믈리에',
          role: '와인 및 주류 페어링 큐레이션, 유통 및 테이블 서비스 실무',
          icon: Wine,
        },
      ],
    },
    {
      id: 'education',
      title: '전문 교육 & 자격·대회',
      desc: '공인 자격증 검정, 요리경연대회 주관 및 숨은 외식 장인 발굴',
      badge: '교육·자격',
      badgeColor: 'bg-teal-50 text-teal-900 border-teal-200',
      items: [
        {
          name: '교육,자격',
          role: '외식 전문 국가 및 민간 자격증 과정 운영과 공인 검정 체계 총괄',
          icon: Award,
        },
        {
          name: '요리대회',
          role: '국내외 공인 요리경연대회 기획·주관 및 차세대 조리 인재 육성',
          icon: Trophy,
        },
        {
          name: '장인발굴단',
          role: '전국 각지의 숨은 외식 명인과 조리 장인 발굴 및 비법 계승 보존',
          icon: Sparkles,
        },
        {
          name: '문화행사',
          role: '식문화 페스티벌, 미식 박람회 및 학술·미식 세미나 행사 주관',
          icon: PartyPopper,
        },
      ],
    },
    {
      id: 'rnd',
      title: '연구 개발 & 대외 협력',
      desc: '신소재 식자재 연구, 산학 협력 네트워크 및 K-푸드 해외 진출',
      badge: '연구·협력',
      badgeColor: 'bg-sky-50 text-sky-900 border-sky-200',
      items: [
        {
          name: '연구개발',
          role: '농수축산물 식자재 활용성 및 최신 조리과학·식품 응용 연구',
          icon: FlaskConical,
        },
        {
          name: '대외협력',
          role: '정부기관, 지자체, 대학교 및 산업체와의 산학 MOU 협력 체계 구축',
          icon: Handshake,
        },
        {
          name: '홍보개발',
          role: '언론 보도, 온·오프라인 브랜드 마케팅 및 유튜브·SNS 전파',
          icon: Megaphone,
        },
        {
          name: '해외사업부',
          role: 'K-푸드 글로벌 진출, 해외 프랜차이즈 연계 및 인바운드 교육',
          icon: Globe,
        },
      ],
    },
  ];

  // 필터링된 업무 목록
  const displayedFields = selectedField === 'all'
    ? businessFields
    : businessFields.filter((f) => f.id === selectedField);

  const { isEditMode, siteDraft } = useAdminEdit();
  const displayPartners = (siteDraft?.partnerLogos && siteDraft.partnerLogos.length > 0)
    ? siteDraft.partnerLogos.map(p => p.name)
    : partners;

  return (
    <div className="space-y-8 sm:space-y-10 animate-fadeIn font-sans text-gray-900 break-keep">
      
      {/* ------------------------------------------------------------- */}
      {/* 1. HEADER BANNER & VIEW SWITCHER                              */}
      {/* ------------------------------------------------------------- */}
      <div className="text-center max-w-4xl mx-auto space-y-3 px-2">
        <span className="text-[11px] sm:text-xs font-black text-emerald-800 bg-emerald-100 px-3.5 py-1 rounded-full uppercase tracking-wider">
          ORGANIZATION & KEY DIVISIONS
        </span>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 tracking-tight leading-snug">
          {t("사단법인 한국외식창업교육원")}{' '}
          <span className="text-[#1E5D3B] underline decoration-[#85CFAB] decoration-4 underline-offset-8">
            {t("조직 및 주요 업무")}
          </span>
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 font-medium max-w-2xl mx-auto leading-relaxed pt-1">
          {t("외식 산업 발전과 전문 인재 양성을 이끄는 교육원의 체계적인 조직 기구 및 16대 실무 업무 영역입니다.")}
        </p>

        {/* Universal View Switcher Tabs (Desktop & Mobile) */}
        <div className="inline-flex items-center p-1.5 bg-[#F2FAF5] rounded-2xl border border-[#D0E7DA] mt-3 shadow-xs">
          <button
            onClick={() => setActiveView('hierarchy')}
            className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-2 ${
              activeView === 'hierarchy'
                ? 'bg-[#2B7752] text-white shadow-md'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Network className="w-4 h-4 text-[#A7F3D0]" />
            <span>{t("조직 체계도")}</span>
          </button>
          <button
            onClick={() => setActiveView('domains')}
            className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-2 ${
              activeView === 'domains'
                ? 'bg-[#2B7752] text-white shadow-md'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Layers className="w-4 h-4 text-[#A7F3D0]" />
            <span>{t("16대 주요 업무 안내")}</span>
          </button>
        </div>
      </div>

      {/* ============================================================= */}
      {/* 2. VIEW 1: PRESTIGIOUS HIERARCHY MAP (조직 체계도)            */}
      {/* ============================================================= */}
      {activeView === 'hierarchy' && (
        <div className="space-y-8 animate-fadeIn">
          
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#D0E7DA] shadow-xl min-w-0">
            
            {/* Desktop / Large Screen Diagram Container */}
            <div className="w-full min-w-0 max-w-6xl mx-auto space-y-6 pt-2 pb-6">
              
              <OrganizationChart partners={displayPartners} />

              {/* Main Vertical Connecting Line to 4 Fields */}
              <div className="w-0.5 h-8 bg-[#2B7752]/30 mx-auto" />

              {/* 3) LOWER LEVEL: 4 MAJOR BUSINESS FIELDS (16 DIVISIONS) */}
              <div className="relative pt-2">
                <div className="text-center mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F2FAF5] text-[#1E5D3B] text-xs font-black rounded-full border border-[#D0E7DA]">
                    <Award className="w-3.5 h-3.5 text-[#2B7752]" />
                    <span>{t("교육원 4대 주요 사업 분야 (16대 실무 부서)")}</span>
                  </span>
                </div>

                {/* Connecting horizontal bar across 4 pillars */}
                <div className="relative">
                  <div className="absolute -top-3 left-[12.5%] right-[12.5%] h-0.5 bg-[#2B7752]/30" />
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-0.5 h-3 bg-[#2B7752]/30" />
                </div>

                {/* 4 Pillars Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                  {businessFields.map((field, fIdx) => (
                    <div
                      key={fIdx}
                      className="bg-stone-50/80 rounded-2xl p-3.5 border border-stone-200/90 shadow-xs hover:border-[#34885E] transition-all space-y-2.5"
                    >
                      {/* Pillar Header */}
                      <div className="bg-white rounded-xl p-2.5 border border-stone-200 shadow-2xs text-center">
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-md border inline-block mb-1 ${field.badgeColor}`}>
                          {t(field.badge)}
                        </span>
                        <h4 className="font-black text-xs sm:text-sm text-stone-900 truncate">
                          <EditableText
                            path={`organization.fields.${fIdx}.title`}
                            value={siteDraft?.organization?.fields?.[fIdx]?.title || field.title}
                          />
                        </h4>
                      </div>

                      {/* 4 Departments inside this field */}
                      <div className="grid grid-cols-1 gap-1.5">
                        {field.items.map((item, iIdx) => {
                          const ItemIcon = item.icon;
                          return (
                            <div
                              key={iIdx}
                              className="bg-white rounded-xl px-2.5 py-2 border border-stone-200/80 flex items-center justify-between hover:bg-emerald-50/50 hover:border-emerald-300 transition-colors"
                            >
                              <div className="flex items-center gap-2 min-w-0">
                                <div className="w-6 h-6 rounded-lg bg-[#F2FAF5] flex items-center justify-center shrink-0 text-[#2B7752]">
                                  <ItemIcon className="w-3.5 h-3.5" />
                                </div>
                                <span className="text-xs font-black text-stone-900 truncate">
                                  <EditableText
                                    path={`organization.fields.${fIdx}.items.${iIdx}.name`}
                                    value={siteDraft?.organization?.fields?.[fIdx]?.items?.[iIdx]?.name || item.name}
                                  />
                                </span>
                              </div>
                              <span className="text-[10px] text-stone-400 font-bold shrink-0">
                                #{fIdx * 4 + iIdx + 1}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

              </div>

            </div>

            {/* Expandable Section: Original 16-Column Straight Flow */}
            <div className="mt-8 border-t border-stone-200 pt-6 text-center">
              <button
                onClick={() => setShowRaw16Columns(!showRaw16Columns)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-600 hover:text-[#2B7752] bg-stone-100 px-4 py-2 rounded-xl transition-all cursor-pointer"
              >
                <span>{showRaw16Columns ? t("원본 16열 펼침 보기 접기") : t("원본 16열 펼침 다이어그램 보기")}</span>
                {showRaw16Columns ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>

              {showRaw16Columns && (
                <div className="mt-4 pt-4 border-t border-dashed border-stone-300 overflow-x-auto no-scrollbar animate-fadeIn">
                  <p className="text-[11px] text-stone-500 font-medium mb-3">
                    {t("제공해주신 이미지 원안과 동일한 16개 분과 가로 나열 배치입니다.")}
                  </p>
                  <div
                    className="grid gap-1.5 text-center min-w-[1100px]"
                    style={{ gridTemplateColumns: 'repeat(16, minmax(0, 1fr))' }}
                  >
                    {rawDivisions.map((item, idx) => (
                      <div
                        key={idx}
                        className="bg-white border border-[#4A7BB0] p-2 min-h-[56px] flex items-center justify-center rounded-sm shadow-2xs hover:bg-stone-50"
                      >
                        <span className="font-extrabold text-[11px] text-stone-900 leading-snug">
                          {t(item)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>
      )}

      {/* ============================================================= */}
      {/* 3. VIEW 2: 16 CORE OPERATIONAL DOMAINS (16대 주요 업무 안내)    */}
      {/* ============================================================= */}
      {activeView === 'domains' && (
        <div className="space-y-6 animate-fadeIn">
          
          {/* Field Filter Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto px-2">
            <button
              onClick={() => setSelectedField('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all ${
                selectedField === 'all'
                  ? 'bg-[#2B7752] text-white shadow-xs'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {t("전체 분야 (16)")}
            </button>
            {businessFields.map((field) => (
              <button
                key={field.id}
                onClick={() => setSelectedField(field.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
                  selectedField === field.id
                    ? 'bg-[#2B7752] text-white shadow-xs'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                <span>{t(field.title)}</span>
                <span className="text-[10px] opacity-80">(4)</span>
              </button>
            ))}
          </div>

          {/* Cards Showcase Grouped by Field */}
          <div className="space-y-8">
            {displayedFields.map((field, fIdx) => (
              <div key={fIdx} className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-md space-y-4">
                
                {/* Field Title & Desc */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-md border ${field.badgeColor}`}>
                        {t(field.badge)}
                      </span>
                      <h3 className="text-lg sm:text-xl font-black text-stone-900">
                        {t(field.title)}
                      </h3>
                    </div>
                    <p className="text-xs text-stone-500 font-medium">
                      {t(field.desc)}
                    </p>
                  </div>
                  <span className="text-xs font-bold text-stone-400 self-start sm:self-auto">
                    4개 전문 실무 부서
                  </span>
                </div>

                {/* 4 Cards Grid for this field */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                  {field.items.map((item, iIdx) => {
                    const ItemIcon = item.icon;
                    return (
                      <div
                        key={iIdx}
                        className="bg-stone-50 hover:bg-white rounded-2xl p-4 border border-stone-200 hover:border-[#85CFAB] hover:shadow-md transition-all duration-200 flex flex-col justify-between space-y-3 group"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="w-10 h-10 rounded-xl bg-white border border-stone-200 flex items-center justify-center text-[#2B7752] shadow-2xs group-hover:scale-105 group-hover:bg-[#2B7752] group-hover:text-white transition-all">
                              <ItemIcon className="w-5 h-5" />
                            </div>
                            <span className="text-[11px] font-black text-stone-400">
                              0{iIdx + 1}
                            </span>
                          </div>

                          <div>
                            <h4 className="font-black text-sm text-stone-900 group-hover:text-[#2B7752] transition-colors">
                              {t(item.name)}
                            </h4>
                          </div>

                          <p className="text-xs text-stone-600 font-medium leading-relaxed">
                            {t(item.role)}
                          </p>
                        </div>

                        <div className="pt-2 border-t border-stone-200/60 flex items-center justify-between text-[11px] text-stone-400 font-bold">
                          <span>{t("전문 실무")}</span>
                          <span className="text-[#2B7752] font-black">ACTIVE</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>
            ))}
          </div>

        </div>
      )}

    </div>
  );
}

