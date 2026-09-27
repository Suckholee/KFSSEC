import { useLanguage } from '../../i18n/LanguageContext';
import React from 'react';
import {
  MapPin,
  Phone,
  Printer,
  Clock,
  Building2,
  Mail,
  ShieldCheck,
  Award,
  Users,
  CheckCircle2
} from 'lucide-react';

export default function LocationSection() {
  const { t } = useLanguage();
  return (
    <section className="space-y-8 animate-fadeIn w-full">
      
      {/* Official Secretariat Header Banner */}
      <div className="relative bg-gradient-to-br from-[#1E5B3C] via-[#2A7550] to-[#388C61] text-white rounded-3xl p-6 sm:p-10 border border-[#85CFAB]/50 shadow-xl overflow-hidden">
        <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-[#A7F3D0]/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-white/15 border border-white/25 text-[#A7F3D0] text-xs font-black rounded-full">
            <ShieldCheck className="w-4 h-4 text-[#A7F3D0]" />
            <span>{t("농림축산식품부 소관 비영리 사단법인")}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">{t("교육원 및 교육센터 오시는 길")}{' '}</h2>

          <p className="text-emerald-100/90 text-xs sm:text-sm font-extrabold max-w-2xl leading-relaxed">{t("사단법인 한국외식창업교육원 본원 및 입학상담센터 오시는 길 안내입니다.")}{' '}</p>
        </div>
      </div>

      {/* Main Secretariat Info Card Grid */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#D0E7DA] shadow-sm space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card 1: 교육원 기본 주소 & 연락처 */}
          <div className="bg-[#F8FAF9] p-6 rounded-2xl border border-[#D0E7DA] space-y-4">
            <h3 className="text-base font-black text-gray-900 border-b border-[#BEDECB] pb-3 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-[#2B7752]" />
              <span>{t("교육원 위치 및 입학상담")}</span>
            </h3>

            <div className="space-y-3 text-xs sm:text-sm text-gray-800 font-bold leading-relaxed">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#2B7752] shrink-0 mt-1" />
                <div>
                  <span className="text-gray-500 block text-xs">{t("교육원 소재지")}</span>
                  <span className="text-gray-900 font-black">{t("서울특별시 강남구 테헤란로 123, KFSSEC 빌딩 3~5층")}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-1 border-t border-gray-200">
                <Phone className="w-4 h-4 text-[#2B7752] shrink-0" />
                <div>
                  <span className="text-gray-500 block text-xs">{t("대표전화 / 입학상담")}</span>
                  <span className="text-lg font-black text-[#1E5D3B]">02-511-8484</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Printer className="w-4 h-4 text-gray-500 shrink-0" />
                <div>
                  <span className="text-gray-500 block text-xs">{t("팩스 번호")}</span>
                  <span className="text-gray-800 font-bold">02-511-8485</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gray-500 shrink-0" />
                <div>
                  <span className="text-gray-500 block text-xs">{t("공식 이메일")}</span>
                  <span className="text-gray-800 font-mono">contact@kfssec.or.kr</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: 운영 시간 & 상담 안내 */}
          <div className="bg-[#F8FAF9] p-6 rounded-2xl border border-[#D0E7DA] space-y-4">
            <h3 className="text-base font-black text-gray-900 border-b border-[#BEDECB] pb-3 flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#2B7752]" />
              <span>{t("고객센터 운영 및 상담 시간")}</span>
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-gray-800 font-bold">
              <div className="bg-white p-4 rounded-xl border border-stone-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 text-xs">{t("평일 수강/입학 상담")}</span>
                  <span className="font-black text-[#1E5D3B]">09:00 ~ 18:00</span>
                </div>
                <div className="flex items-center justify-between border-t border-gray-100 pt-2">
                  <span className="text-gray-500 text-xs">{t("점심 시간")}</span>
                  <span className="font-bold text-gray-700">12:00 ~ 13:00</span>
                </div>
                <div className="flex items-center justify-between border-t border-gray-100 pt-2">
                  <span className="text-gray-500 text-xs">{t("주말 및 공휴일")}</span>
                  <span className="font-bold text-rose-600">{t("주말/공휴일 휴무 (1:1 온라인 문의 접수)")}</span>
                </div>
              </div>

              <div className="p-4 bg-[#F2FAF5] rounded-xl border border-[#D0E7DA] space-y-1.5">
                <span className="text-xs font-black text-[#1E5D3B] flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#2B7752]" />
                  <span>{t("1:1 온라인 및 챗봇 문의 24시간 연중무휴 접수")}</span>
                </span>
                <p className="text-xs text-gray-600 font-medium">{t("업무 시간 외 문의사항은 1:1 온라인 문의 게시판 또는 AI 상담원 챗봇에 남겨주시면 다음 영업일 오전 순차 연락드립니다.")}{' '}</p>
              </div>
            </div>
          </div>

        </div>

        {/* Offline Lecture Rooms & Practice Labs */}
        <div className="pt-6 border-t border-[#D0E7DA] space-y-4">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-[#1E5D3B]" />
            <h3 className="text-lg font-black text-gray-900">
              {t("오프라인 이론강의실 및 실습 교육장 안내")}
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 font-medium">
            {t("사단법인 한국외식창업교육원은 이론 및 경영 세미나 강의실과 최신 설비를 갖춘 실기 실습장을 이원화하여 전문적으로 운영하고 있습니다.")}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* Theory Lab */}
            <div className="p-6 bg-emerald-50/50 rounded-2xl border-2 border-emerald-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-[#1E5D3B] text-white text-xs font-black rounded-lg">
                  {t("이론 및 경영강의실")}
                </span>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                  교대역 인접
                </span>
              </div>
              <h4 className="text-base font-black text-gray-950">
                캐롤라인대학교 강의실
              </h4>
              <div className="space-y-1.5 text-xs sm:text-sm text-gray-700 font-medium">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#1E5D3B] shrink-0 mt-0.5" />
                  <span className="font-bold text-gray-900">
                    서울 서초구 서초동 1666-13, 지제이빌딩 5층
                  </span>
                </div>
                <p className="text-xs text-stone-500 pl-6">
                  외식 경영 실무, 상권 분석, 인허가 및 브랜드 이론 강의 진행
                </p>
              </div>
            </div>

            {/* Practical Lab */}
            <div className="p-6 bg-amber-50/50 rounded-2xl border-2 border-amber-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-[#C5A059] text-gray-950 text-xs font-black rounded-lg">
                  {t("조리 및 베이커리 실습장")}
                </span>
                <span className="text-xs font-bold text-amber-900 bg-amber-100/80 px-2 py-0.5 rounded-full">
                  가산 디지털단지
                </span>
              </div>
              <h4 className="text-base font-black text-gray-950">
                닥터장 베이킹랩 교육장
              </h4>
              <div className="space-y-1.5 text-xs sm:text-sm text-gray-700 font-medium">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                  <span className="font-bold text-gray-900">
                    서울 금천구 대륭테크노타운 8차 5층 503호
                  </span>
                </div>
                <p className="text-xs text-stone-500 pl-6">
                  메뉴 개발, 제과제빵, 시그니처 소스 및 조리 실습 진행
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>

    </section>
  );
}
