import React from 'react';
import { ChefHat, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 text-sm border-t border-gray-800 pt-12 pb-8">
      <div className="w-full px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5 text-white">
              <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center text-white">
                <ChefHat className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-lg tracking-tight">한국외식창업교육원</span>
            </div>
            <p className="text-xs leading-relaxed text-gray-400">
              실무 중심의 전문 인력 양성과 체계적인 컨설팅으로 성공적인 외식 창업 길잡이가 되어 드립니다.
            </p>
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
                <Phone className="w-4 h-4 text-brand-500" />
                <span>1588-0000</span>
              </div>
              <p className="text-gray-400">평일 09:00 - 18:00 (주말/공휴일 휴무)</p>
              <div className="flex items-center gap-2 text-gray-400 pt-1">
                <Mail className="w-4 h-4 text-gray-500" />
                <span>contact@kfssec.or.kr</span>
              </div>
            </div>
          </div>

          {/* Col 4: Location */}
          <div>
            <h4 className="text-sm font-bold text-white mb-3">교육원 위치</h4>
            <div className="flex items-start gap-2 text-xs leading-relaxed">
              <MapPin className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
              <span>서울특별시 강남구 테헤란로 123 KFSSEC 빌딩 3-5층 (실습 전용 교육장)</span>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© 2026 한국외식창업교육원. All Rights Reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-gray-300">개인정보처리방침</a>
            <a href="#" className="hover:text-gray-300">이용약관</a>
            <a href="#" className="hover:text-gray-300">이메일무단수집거부</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
