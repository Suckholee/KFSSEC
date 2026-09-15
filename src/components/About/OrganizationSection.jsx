import { useLanguage } from '../../i18n/LanguageContext';
import React, { useState } from 'react';
import { Shield, Building2, Award, CheckCircle2, LayoutGrid, Network, Newspaper, Handshake, Users } from 'lucide-react';

export default function OrganizationSection() {
  const { t } = useLanguage();
  const [mobileView, setMobileView] = useState('cards'); // 'cards' | 'diagram'

  const divisions = [
    t("메뉴개발"),
    t("외식창업"),
    t("교육,자격"),
    t("연구개발"),
    t("대외협력"),
    t("홍보개발"),
    t("장인발굴단"),
    t("요리대회"),
    t("외식경영 컨설팅"),
    t("창업교육"),
    t("바리스타"),
    t("베이커리"),
    t("문화행사"),
    t("소믈리에"),
    t("시니어"),
    t("해외사업부"),
  ];

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

  return (
    <div className="space-y-8 sm:space-y-10 animate-fadeIn font-sans text-gray-900 break-keep">
      
      {/* Header Banner */}
      <div className="text-center max-w-4xl mx-auto space-y-2.5 px-2">
        <span className="text-[11px] sm:text-xs font-black text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full uppercase tracking-wider">
          ORGANIZATION CHART
        </span>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 tracking-tight leading-snug">
          {t("사단법인 한국외식창업교육원")}{' '}<span className="text-emerald-700">{t("조직도")}</span>
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 font-medium max-w-2xl mx-auto leading-relaxed">
          {t("외식 산업 발전과 전문 인재 양성을 선도하는 한국외식창업교육원의 체계적인 조직 체계입니다.")}{' '}
        </p>

        {/* Mobile View Toggle (Visible on < lg) */}
        <div className="lg:hidden inline-flex items-center p-1 bg-stone-100 rounded-xl border border-stone-200 mt-2">
          <button
            onClick={() => setMobileView('cards')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-black transition-all flex items-center gap-1.5 ${
              mobileView === 'cards'
                ? 'bg-[#0B3C26] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>{t("모바일 요약 보기")}</span>
          </button>
          <button
            onClick={() => setMobileView('diagram')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-black transition-all flex items-center gap-1.5 ${
              mobileView === 'diagram'
                ? 'bg-[#0B3C26] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Network className="w-3.5 h-3.5" />
            <span>{t("전체 다이어그램")}</span>
          </button>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 1. MOBILE COMPACT HIERARCHY CARDS (Visible on < lg when mobileView === 'cards') */}
      {/* ============================================================ */}
      {mobileView === 'cards' && (
        <div className="lg:hidden space-y-4">
          
          {/* Level 1: Chairman Card */}
          <div className="bg-gradient-to-br from-[#0B3C26] to-[#062417] text-white rounded-2xl p-5 shadow-lg border-2 border-[#C5A059] text-center space-y-1">
            <span className="text-[10px] font-black text-[#D4AF37] uppercase tracking-widest block">{t("사단법인 수장")}</span>
            <h3 className="text-xl font-black text-white">{t("이 사 장")}</h3>
            <p className="text-2xl font-black text-[#D4AF37] pt-0.5">{t("안 형 상")}</p>
          </div>

          {/* Level 2: Executive Officers & Audit */}
          <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-sm space-y-3">
            <div className="flex items-center gap-2 border-b border-stone-100 pb-2">
              <Shield className="w-4 h-4 text-emerald-700" />
              <h4 className="text-sm font-black text-stone-900">{t("임원진 및 감사")}</h4>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 text-center">
                <span className="text-[10px] text-stone-500 font-bold block">{t("명예 이사장")}</span>
                <span className="text-stone-900 font-black text-sm block mt-0.5">{t("이상정")}</span>
              </div>
              <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 text-center">
                <span className="text-[10px] text-stone-500 font-bold block">{t("명예 부이사장")}</span>
                <span className="text-stone-900 font-black text-sm block mt-0.5">{t("주정자")}</span>
              </div>
              <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-200 text-center">
                <span className="text-[10px] text-stone-500 font-bold block">{t("상임이사")}</span>
                <span className="text-stone-700 font-bold text-xs block mt-0.5">{t("상임이사")}</span>
              </div>
              <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-200 text-center">
                <span className="text-[10px] text-emerald-800 font-black block">{t("감사")}</span>
                <span className="text-stone-900 font-black text-sm block mt-0.5">{t("권영복")}</span>
              </div>
            </div>
          </div>

          {/* Level 3: Secretariat */}
          <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-sm space-y-3">
            <div className="flex items-center gap-2 border-b border-stone-100 pb-2">
              <Building2 className="w-4 h-4 text-emerald-700" />
              <h4 className="text-sm font-black text-stone-900">{t("사무국")}</h4>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-200">
                <span className="text-[10px] text-stone-500 font-bold block">{t("사무국장")}</span>
                <span className="text-stone-900 font-black text-xs mt-0.5 block">{t("김근혜")}</span>
              </div>
              <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-200">
                <span className="text-[10px] text-stone-500 font-bold block">{t("사무장")}</span>
                <span className="text-stone-700 font-bold text-xs mt-0.5 block">{t("사무장")}</span>
              </div>
              <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-200">
                <span className="text-[10px] text-stone-500 font-bold block">{t("주임")}</span>
                <span className="text-stone-900 font-black text-xs mt-0.5 block">{t("조범진")}</span>
              </div>
            </div>
          </div>

          {/* Level 4: Advisory & Advisors */}
          <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-sm space-y-3">
            <div className="flex items-center gap-2 border-b border-stone-100 pb-2">
              <Users className="w-4 h-4 text-emerald-700" />
              <h4 className="text-sm font-black text-stone-900">{t("자문위원회 및 고문단")}</h4>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 text-center">
                <span className="text-[10px] text-stone-500 font-bold block">{t("자문위원회")}</span>
                <p className="text-stone-900 font-black text-sm mt-1">{t("신충섭")}</p>
                <p className="text-stone-900 font-black text-sm mt-0.5">{t("진익준")}</p>
              </div>
              <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 text-center">
                <span className="text-[10px] text-stone-500 font-bold block">{t("고문단")}</span>
                <p className="text-stone-900 font-black text-sm mt-1">{t("이상정")}</p>
                <p className="text-stone-900 font-black text-sm mt-0.5">{t("조춘봉")}</p>
              </div>
            </div>
          </div>

          {/* Level 5: Partner Companies & Press */}
          <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-stone-100 pb-2">
              <div className="flex items-center gap-2">
                <Handshake className="w-4 h-4 text-emerald-700" />
                <h4 className="text-sm font-black text-stone-900">{t("협력업체 및 언론사")}</h4>
              </div>
              <span className="text-[10px] font-bold bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-md border border-emerald-200">10개 협력사</span>
            </div>
            
            <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 flex items-center justify-between">
              <span className="text-xs font-bold text-stone-500">{t("공식 협력 언론사")}</span>
              <span className="text-sm font-black text-emerald-900">{t("글로벌 외식정보")}</span>
            </div>

            <div>
              <span className="text-[10px] text-stone-500 font-bold block mb-2">{t("협력업체 목록")}</span>
              <div className="grid grid-cols-2 gap-1.5 text-xs">
                {partners.map((p, idx) => (
                  <div key={idx} className="bg-stone-50 p-2 rounded-lg border border-stone-200 text-stone-800 font-bold text-[11px] flex items-center gap-1.5">
                    <CheckCircle2 className="w-3 h-3 text-emerald-700 shrink-0" />
                    <span className="truncate">{p}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Level 6: 16 Divisional Departments */}
          <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-stone-100 pb-2">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-700" />
                <h4 className="text-sm font-black text-stone-900">{t("16대 사업 분과")}</h4>
              </div>
              <span className="text-[10px] font-bold bg-stone-100 px-2 py-0.5 rounded-md text-stone-600">16개 분야</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-center text-xs">
              {divisions.map((name, idx) => (
                <div key={idx} className="bg-stone-50 border border-stone-200 rounded-lg p-2 hover:border-emerald-600 transition-colors">
                  <span className="text-stone-900 font-extrabold text-xs">{name}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ============================================================ */}
      {/* 2. OFFICIAL EXACT DIAGRAM (Matching User's Uploaded Final Image) */}
      {/* ============================================================ */}
      <div className={`bg-white rounded-3xl p-6 sm:p-10 border border-gray-300 shadow-xl overflow-x-auto no-scrollbar ${
        mobileView === 'diagram' ? 'block' : 'hidden lg:block'
      }`}>
        {/* Mobile scroll helper hint */}
        <p className="lg:hidden text-center text-xs text-stone-500 font-bold mb-6 flex items-center justify-center gap-1">
          <span>👈</span> {t("화면을 좌우로 스크롤하여 전체 조직도를 확인하세요")} <span>👉</span>
        </p>

        <div className="min-w-[1100px] max-w-6xl mx-auto space-y-6 pt-2 pb-6">
          
          {/* LEVEL 1: TOP EXECUTIVE CHAIRMAN (이사장 : 안형상) */}
          <div className="flex justify-center">
            <div className="w-96 bg-white border-2 border-black rounded-sm py-4 px-8 text-center shadow-sm">
              <h3 className="text-2xl sm:text-3xl font-black text-black tracking-wider">
                {t("이사장 : 안형상")}
              </h3>
            </div>
          </div>

          {/* MAIN VERTICAL LINE FROM TOP */}
          <div className="w-0.5 h-6 bg-[#4A7BB0] mx-auto" />

          {/* MAIN HORIZONTAL SPINE CONNECTING LEFT AND RIGHT BRANCHES */}
          <div className="relative">
            <div className="absolute top-0 left-[6%] right-[5%] h-0.5 bg-[#4A7BB0]" />
            <div className="w-0.5 h-4 bg-[#4A7BB0] mx-auto" />
          </div>

          {/* LEVEL 2: MIDDLE LAYER (LEFT: Advisory/Partners | RIGHT: Secretariat/Officers) */}
          <div className="grid grid-cols-12 gap-6 items-start pt-2">
            
            {/* ---------------- LEFT BLOCK: 4 COLUMNS ---------------- */}
            <div className="col-span-6 grid grid-cols-4 gap-3 relative">
              
              {/* Vertical connector line from horizontal spine */}
              <div className="absolute -top-6 left-[12.5%] right-[12.5%] h-0.5 bg-[#4A7BB0]" />
              <div className="absolute -top-6 left-[12.5%] w-0.5 h-6 bg-[#4A7BB0]" />
              <div className="absolute -top-6 left-[37.5%] w-0.5 h-6 bg-[#4A7BB0]" />
              <div className="absolute -top-6 left-[62.5%] w-0.5 h-6 bg-[#4A7BB0]" />
              <div className="absolute -top-6 left-[87.5%] w-0.5 h-6 bg-[#4A7BB0]" />

              {/* Col 1: 자문위원회 */}
              <div className="space-y-2">
                <div className="border border-[#4A7BB0] bg-white text-center py-2 px-1 text-sm font-black text-black">
                  {t("자문위원회")}
                </div>
                <div className="border border-[#4A7BB0] bg-white p-4 text-center space-y-4 min-h-[140px] flex flex-col justify-center">
                  <p className="font-black text-base text-black">{t("신충섭")}</p>
                  <p className="font-black text-base text-black">{t("진익준")}</p>
                </div>
              </div>

              {/* Col 2: 고문단 */}
              <div className="space-y-2">
                <div className="border border-[#4A7BB0] bg-white text-center py-2 px-1 text-sm font-black text-black">
                  {t("고문단")}
                </div>
                <div className="border border-[#4A7BB0] bg-white p-4 text-center space-y-4 min-h-[140px] flex flex-col justify-center">
                  <p className="font-black text-base text-black">{t("이상정")}</p>
                  <p className="font-black text-base text-black">{t("조춘봉")}</p>
                </div>
              </div>

              {/* Col 3: 협력업체 */}
              <div className="space-y-2">
                <div className="border border-[#4A7BB0] bg-white text-center py-2 px-1 text-sm font-black text-black">
                  {t("협력업체")}
                </div>
                <div className="border border-[#4A7BB0] bg-white p-2.5 text-left text-[11px] leading-relaxed font-bold text-gray-800 space-y-0.5">
                  {partners.map((item, idx) => (
                    <p key={idx} className="truncate">{item}</p>
                  ))}
                </div>
              </div>

              {/* Col 4: 언론사 */}
              <div className="space-y-2">
                <div className="border border-[#4A7BB0] bg-white text-center py-2 px-1 text-sm font-black text-black">
                  {t("언론사")}
                </div>
                <div className="border border-[#4A7BB0] bg-white p-3 text-center min-h-[90px] flex flex-col items-center justify-center">
                  <p className="font-black text-sm text-black leading-tight">
                    {t("글로벌")}<br />{t("외식정보")}
                  </p>
                </div>
              </div>

            </div>

            {/* ---------------- RIGHT BLOCK: 4 COLUMNS ---------------- */}
            <div className="col-span-6 grid grid-cols-4 gap-3 relative">
              
              {/* Vertical connector line from horizontal spine */}
              <div className="absolute -top-6 left-[12.5%] right-[12.5%] h-0.5 bg-[#4A7BB0]" />
              <div className="absolute -top-6 left-[12.5%] w-0.5 h-6 bg-[#4A7BB0]" />
              <div className="absolute -top-6 left-[37.5%] w-0.5 h-6 bg-[#4A7BB0]" />
              <div className="absolute -top-6 left-[62.5%] w-0.5 h-6 bg-[#4A7BB0]" />
              <div className="absolute -top-6 left-[87.5%] w-0.5 h-6 bg-[#4A7BB0]" />

              {/* Col 1: 사무국 */}
              <div className="space-y-2">
                <div className="border border-[#4A7BB0] bg-white text-center py-2 px-1 text-sm font-black text-black">
                  {t("사무국")}
                </div>
                <div className="space-y-2">
                  <div className="border border-[#4A7BB0] bg-white py-2 px-1 text-center">
                    <span className="text-[11px] font-bold text-gray-600 block">{t("사무국장")}</span>
                    <span className="text-sm font-black text-black">{t("김근혜")}</span>
                  </div>
                  <div className="border border-[#4A7BB0] bg-white py-2 px-1 text-center font-black text-sm text-black">
                    {t("사무장")}
                  </div>
                  <div className="border border-[#4A7BB0] bg-white py-2 px-1 text-center text-xs font-bold text-black">
                    {t("주임: 조범진")}
                  </div>
                </div>
              </div>

              {/* Col 2: 명예 이사장 / 명예 부이사장 */}
              <div className="space-y-3 pt-1">
                <div className="border border-[#4A7BB0] bg-white p-2.5 text-center">
                  <span className="text-xs font-bold text-gray-600 block">{t("명예 이사장")}</span>
                  <span className="text-sm font-black text-black">{t("이상정")}</span>
                </div>
                <div className="border border-[#4A7BB0] bg-white p-2.5 text-center">
                  <span className="text-xs font-bold text-gray-600 block">{t("명예 부이사장")}</span>
                  <span className="text-sm font-black text-black">{t("주정자")}</span>
                </div>
              </div>

              {/* Col 3: 상임이사 2개 */}
              <div className="space-y-3 pt-1">
                <div className="border border-[#4A7BB0] bg-white py-4 px-2 text-center font-black text-sm text-black">
                  {t("상임이사")}
                </div>
                <div className="border border-[#4A7BB0] bg-white py-4 px-2 text-center font-black text-sm text-black">
                  {t("상임이사")}
                </div>
              </div>

              {/* Col 4: 감사 */}
              <div className="pt-4">
                <div className="border border-[#4A7BB0] bg-white py-4 px-2 text-center">
                  <span className="text-xs font-bold text-gray-600 block">{t("감사")}</span>
                  <span className="text-base font-black text-black">{t("권영복")}</span>
                </div>
              </div>

            </div>

          </div>

          {/* MAIN VERTICAL LINE TO BOTTOM LAYER */}
          <div className="w-0.5 h-10 bg-[#4A7BB0] mx-auto" />

          {/* LEVEL 3: BOTTOM 16 DIVISIONAL DEPARTMENTS */}
          <div className="relative pt-3">
            
            {/* Top horizontal connecting bar across all 16 boxes */}
            <div className="absolute top-0 left-[2.5%] right-[2.5%] h-0.5 bg-[#4A7BB0]" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-3 bg-[#4A7BB0]" />

            {/* 16 Boxes Row Grid */}
            <div
              className="grid gap-1.5 text-center"
              style={{ gridTemplateColumns: 'repeat(16, minmax(0, 1fr))' }}
            >
              {divisions.map((item, idx) => (
                <div key={idx} className="relative pt-3">
                  {/* Small vertical connector line to each box */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-3 bg-[#4A7BB0]" />
                  
                  <div className="border border-[#4A7BB0] bg-white p-1.5 min-h-[64px] flex items-center justify-center rounded-xs shadow-2xs hover:bg-[#4A7BB0]/5 transition-colors">
                    <span className="font-extrabold text-[11px] text-black leading-snug break-keep">
                      {item}
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}
