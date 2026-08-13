import React from 'react';
import { Phone, Mail, MapPin, Building2 } from 'lucide-react';

export default function Footer({ onOpenAbout }) {
  return (
    <footer className="bg-gray-900 text-gray-400 text-sm border-t border-gray-800 pt-12 pb-8">
      <div className="w-full px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Col 1: Official Brand Info */}
          <div className="space-y-3.5 md:col-span-1">
            <div className="flex items-center gap-2.5 text-white">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white shrink-0">
                <svg viewBox="0 0 100 100" className="w-6 h-6">
                  <path d="M 15,55 A 35,35 0 0,0 85,55 Z" fill="#FFFFFF" />
                  <path d="M 50,45 C 40,25 30,30 35,48 Z" fill="#22C55E" />
                  <path d="M 50,45 C 50,20 60,20 58,45 Z" fill="#F97316" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-emerald-400 font-bold leading-none">사단법인</span>
                <span className="font-extrabold text-base tracking-tight text-white">한국외식창업교육원</span>
              </div>
            </div>
            <p className="text-xs leading-relaxed text-gray-400">
              법인명: 사단법인 한국외식창업교육원<br />
              대표자: 안형상 이사장 | 설립일: 2022년 7월 12일<br />
              분야: 창업 외식 교육 컨설팅 및 자격증 발급
            </p>
            <button
              onClick={onOpenAbout}
              className="text-xs font-bold text-emerald-400 hover:text-emerald-300 underline underline-offset-4 cursor-pointer"
            >
              교육원 상세 정보 보기 &gt;
            </button>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white mb-3">주요 교육과정</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#courses" className="hover:text-white transition-colors">카페 창업 마스터 과정</a></li>
              <li><a href="#courses" className="hover:text-white transition-colors">외식 창업 실무 과정</a></li>
              <li><a href="#courses" className="hover:text-white transition-colors">메뉴 개발 전문가 과정</a></li>
              <li><a href="#courses" className="hover:text-white transition-colors">배달 창업 특화 과정</a></li>
            </ul>
          </div>

          {/* Col 3: Customer Service */}
          <div>
            <h4 className="text-sm font-bold text-white mb-3">고객센터 및 입학상담</h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-white font-extrabold text-base">
                <Phone className="w-4 h-4 text-emerald-500" />
                <span>02-511-8484</span>
              </div>
              <p className="text-gray-400">평일 09:00 - 18:00 (주말/공휴일 휴무)</p>
              <div className="flex items-center gap-2 text-gray-400 pt-1">
                <Mail className="w-4 h-4 text-gray-500" />
                <span>contact@foodrc.or.kr</span>
              </div>
            </div>
          </div>

          {/* Col 4: Location */}
          <div>
            <h4 className="text-sm font-bold text-white mb-3">교육원 위치</h4>
            <div className="flex items-start gap-2 text-xs leading-relaxed">
              <MapPin className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>서울특별시 강남구 테헤란로 123 KFSSEC 빌딩 3-5층 (실습 전용 교육장)</span>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© 2026 사단법인 한국외식창업교육원. All Rights Reserved.</p>
          <div className="flex gap-4">
            <button onClick={onOpenAbout} className="hover:text-gray-300">기관 정보</button>
            <a href="#" className="hover:text-gray-300">개인정보처리방침</a>
            <a href="#" className="hover:text-gray-300">이용약관</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
