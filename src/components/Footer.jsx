import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function Footer({ onOpenAbout }) {
  return (
    <footer className="bg-[#0D1512] text-gray-300 text-sm border-t border-emerald-950 pt-12 pb-8 font-sans">
      <div className="w-full px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Col 1: Official Brand Info */}
          <div className="space-y-3.5 md:col-span-1">
            <div className="bg-white/95 p-3 rounded-2xl inline-block shadow-sm">
              <img
                src="/images/official_logo.png"
                alt="사단법인 한국외식창업교육원"
                className="h-10 w-auto object-contain"
              />
            </div>
            <p className="text-xs leading-relaxed text-gray-300 font-medium">
              법인명: 사단법인 한국외식창업교육원<br />
              대표자: 안형상 이사장 | 설립일: 2022년 7월 12일<br />
              분야: 외식·펫 창업 실무 교육 및 전문 자격증 발급
            </p>
            <button
              onClick={onOpenAbout}
              className="text-xs font-bold text-emerald-400 hover:text-emerald-300 underline underline-offset-4 cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none min-h-[44px] flex items-center"
              aria-label="교육원 상세 조직 및 이사장 인사말 보기"
            >
              <span>교육원 상세 정보 보기 &gt;</span>
            </button>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-sm font-black text-white mb-3 tracking-tight">주요 교육과정</h4>
            <ul className="space-y-2.5 text-xs text-gray-300 font-medium">
              <li><button onClick={onOpenAbout} className="hover:text-emerald-400 transition-colors cursor-pointer text-left">외식창업 성공전략 마스터</button></li>
              <li><button onClick={onOpenAbout} className="hover:text-emerald-400 transition-colors cursor-pointer text-left">메뉴개발 & 원가관리 실전</button></li>
              <li><button onClick={onOpenAbout} className="hover:text-emerald-400 transition-colors cursor-pointer text-left">펫푸드 & 수제간식 제조 과정</button></li>
              <li><button onClick={onOpenAbout} className="hover:text-emerald-400 transition-colors cursor-pointer text-left">반려견 행동교정 자격증</button></li>
            </ul>
          </div>

          {/* Col 3: Customer Service */}
          <div>
            <h4 className="text-sm font-black text-white mb-3 tracking-tight">고객센터 및 입학상담</h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-center gap-2 text-white font-black text-base">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>02-511-8484</span>
              </div>
              <p className="text-gray-300 font-medium">평일 09:00 - 18:00 (주말/공휴일 휴무)</p>
              <div className="flex items-center gap-2 text-gray-300 font-medium pt-1">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-mono text-emerald-300">contact@kfssec.or.kr</span>
              </div>
            </div>
          </div>

          {/* Col 4: Location */}
          <div>
            <h4 className="text-sm font-black text-white mb-3 tracking-tight">교육원 위치</h4>
            <div className="flex items-start gap-2 text-xs leading-relaxed text-gray-300 font-medium">
              <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>서울특별시 강남구 테헤란로 123 KFSSEC 빌딩 3-5층 (실습 및 검정 전용 교육장)</span>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-6 border-t border-emerald-950 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400 font-medium">
          <p>© 2026 사단법인 한국외식창업교육원. All Rights Reserved.</p>
          <div className="flex gap-4">
            <button onClick={onOpenAbout} className="hover:text-white cursor-pointer">기관 정보</button>
            <button onClick={onOpenAbout} className="hover:text-white cursor-pointer">개인정보처리방침</button>
            <button onClick={onOpenAbout} className="hover:text-white cursor-pointer">이용약관</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
