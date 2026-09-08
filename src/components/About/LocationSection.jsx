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
  return (
    <section className="space-y-8 animate-fadeIn w-full">
      
      {/* Official Secretariat Header Banner */}
      <div className="relative bg-[#0B3C26] text-white rounded-3xl p-6 sm:p-10 border-2 border-[#C5A059] shadow-xl overflow-hidden">
        <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-[#C5A059]/15 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-[#C5A059]/20 border border-[#C5A059]/40 text-[#D4AF37] text-xs font-black rounded-full">
            <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
            <span>농림축산식품부 소관 비영리 사단법인</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            교육원 사무국 안내
          </h2>

          <p className="text-emerald-100/90 text-xs sm:text-sm font-extrabold max-w-2xl leading-relaxed">
            사단법인 한국외식창업교육원 총괄 사무국 및 입학 상담센터 기본 정보입니다.
          </p>
        </div>
      </div>

      {/* Main Secretariat Info Card Grid */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-gray-200 shadow-lg space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card 1: 사무국 기본 주소 & 연락처 */}
          <div className="bg-[#F8F6F0] p-6 rounded-2xl border border-[#E5E0D8] space-y-4">
            <h3 className="text-base font-black text-gray-900 border-b border-[#D4C5B0] pb-3 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-[#0B3C26]" />
              <span>사무국 위치 및 연락처</span>
            </h3>

            <div className="space-y-3 text-xs sm:text-sm text-gray-800 font-bold leading-relaxed">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#0B3C26] shrink-0 mt-1" />
                <div>
                  <span className="text-gray-500 block text-xs">사무국 소재지</span>
                  <span className="text-gray-900 font-black">서울특별시 강남구 테헤란로 123, KFSSEC 빌딩 3~5층</span>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-1 border-t border-gray-200">
                <Phone className="w-4 h-4 text-[#0B3C26] shrink-0" />
                <div>
                  <span className="text-gray-500 block text-xs">대표전화 / 입학상담</span>
                  <span className="text-lg font-black text-[#0B3C26]">02-511-8484</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Printer className="w-4 h-4 text-gray-500 shrink-0" />
                <div>
                  <span className="text-gray-500 block text-xs">팩스 번호</span>
                  <span className="text-gray-800 font-bold">02-511-8485</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gray-500 shrink-0" />
                <div>
                  <span className="text-gray-500 block text-xs">공식 이메일</span>
                  <span className="text-gray-800 font-mono">contact@kfssec.or.kr</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: 운영 시간 & 상담 안내 */}
          <div className="bg-[#F8F6F0] p-6 rounded-2xl border border-[#E5E0D8] space-y-4">
            <h3 className="text-base font-black text-gray-900 border-b border-[#D4C5B0] pb-3 flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#0B3C26]" />
              <span>사무국 운영 시간</span>
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-gray-800 font-bold">
              <div className="bg-white p-4 rounded-xl border border-stone-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 text-xs">평일 수강/입학 상담</span>
                  <span className="font-black text-[#0B3C26]">09:00 ~ 18:00</span>
                </div>
                <div className="flex items-center justify-between border-t border-gray-100 pt-2">
                  <span className="text-gray-500 text-xs">점심 시간</span>
                  <span className="font-bold text-gray-700">12:00 ~ 13:00</span>
                </div>
                <div className="flex items-center justify-between border-t border-gray-100 pt-2">
                  <span className="text-gray-500 text-xs">주말 및 공휴일</span>
                  <span className="font-bold text-rose-600">사무국 휴무 (1:1 온라인 문의 접수)</span>
                </div>
              </div>

              <div className="p-4 bg-emerald-50/70 rounded-xl border border-emerald-200 space-y-1.5">
                <span className="text-xs font-black text-[#0B3C26] flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#0B3C26]" />
                  <span>1:1 온라인 및 챗봇 문의 24시간 연중무휴 접수</span>
                </span>
                <p className="text-xs text-gray-600 font-medium">
                  사무국 업무 시간 외 문의사항은 1:1 온라인 문의 게시판 또는 AI 상담원 챗봇에 남겨주시면 다음 영업일 오전 순차 연락드립니다.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
