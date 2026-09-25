import { useLanguage } from '../i18n/LanguageContext';
import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function Footer({ onTabChange, siteData = {} }) {
  const { t } = useLanguage();
  const info = siteData?.institutionInfo || {};
  const phone = info.phone || '010-7244-6796';
  const email = info.email || 'contact@kfssec.or.kr';
  const corpName = info.corpName || '사단법인 한국외식창업교육원';
  const ceoName = info.ceoName || '안형상 이사장';
  const establishedDate = info.establishedDate || '2022년 7월 29일';
  const hours = info.operatingHours || '평일 09:00 - 18:00 (주말/공휴일 휴무)';
  const address = info.headquartersAddress || '서울특별시 강남구 테헤란로 123 KFSSEC 빌딩 3-5층 (실습 및 검정 전용 교육장)';

  return (
    <footer className="bg-[#0D1512] text-gray-300 text-sm border-t border-emerald-950 pt-12 pb-24 sm:pb-8 font-sans">
      <div className="w-full px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Col 1: Official Brand Info */}
          <div className="space-y-3.5 md:col-span-1">
            <div className="inline-block py-2">
              <img
                src="/images/logo-transparent.svg"
                alt={t("사단법인 한국외식창업교육원")}
                className="h-20 w-auto object-contain brightness-0 invert"
              />
            </div>
            <p className="text-xs leading-relaxed text-gray-300 font-medium">
              {t("법인명: ")}{corpName}<br />
              {t("대표자: ")}{ceoName} | {t("설립일: ")}{establishedDate}<br />
              {t("분야: 외식·펫 창업 실무 교육 및 전문 자격증 발급")}
            </p>
            <button
              onClick={() => onTabChange?.('about', 'greetings')}
              className="text-xs font-bold text-emerald-400 hover:text-emerald-300 underline underline-offset-4 cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none min-h-[44px] flex items-center"
              aria-label={t("교육원 상세 조직 및 이사장 인사말 보기")}
            >
              <span>{t("교육원 상세 정보 보기 >")}</span>
            </button>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-sm font-black text-white mb-3 tracking-tight">{t("주요 교육과정")}</h4>
            <ul className="space-y-2.5 text-xs text-gray-300 font-medium">
              {[
                t("외식창업지도사 1·2급"),
                t("외식창업실무사 1·2급"),
                t("한국음식능력(K-FOOD) 1·2급"),
                t("푸드테크 설계사 1·2급"),
                t("소믈리에 파티컨설턴트")
              ].map(name => (
                <li key={name}>
                  <button onClick={() => onTabChange?.('catalog', 'courses')} className="hover:text-emerald-400 transition-colors text-left cursor-pointer">
                    {name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Customer Service */}
          <div>
            <h4 className="text-sm font-black text-white mb-3 tracking-tight">{t("고객센터 및 입학상담")}</h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-center gap-2 text-white font-black text-base">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{phone}</span>
              </div>
              <p className="text-gray-300 font-medium">{hours}</p>
              <div className="flex items-center gap-2 text-gray-300 font-medium pt-1">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-mono text-emerald-300">{email}</span>
              </div>
            </div>
          </div>

          {/* Col 4: Location */}
          <div>
            <h4 className="text-sm font-black text-white mb-3 tracking-tight">{t("교육원 위치")}</h4>
            <div className="flex items-start gap-2 text-xs leading-relaxed text-gray-300 font-medium">
              <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{address}</span>
            </div>
          </div>

        </div>

        {/* External Partner Sites Banner Bar */}
        <div className="py-4 border-t border-emerald-950 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-300 font-bold">
          <span className="text-[#C5A059] font-black">{t("🌐 관련 기관 & 글로벌 외식 정보 사이트:")}</span>
          <div className="flex flex-wrap items-center gap-4 text-xs font-medium">
            <a href="https://www.sbiz.or.kr" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 underline underline-offset-2">{t("소상공인시장진흥공단")}</a>
            <a href="https://www.mafra.go.kr" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 underline underline-offset-2">{t("농림축산식품부")}</a>
            <a href="https://www.gangnam.go.kr" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 underline underline-offset-2">{t("강남구청 소상공인관")}</a>
            <a href="https://www.youtube.com/@KFSSEC" target="_blank" rel="noopener noreferrer" className="hover:text-rose-400 underline underline-offset-2 text-rose-300">{t("📺 글로벌 외식뉴스 방송")}</a>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-4 border-t border-emerald-950 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400 font-medium">
          <p>{t("© 2026 사단법인 한국외식창업교육원. All Rights Reserved.")}</p>
          <div className="flex gap-4">
            <button onClick={() => onTabChange?.('about', 'greetings')} className="hover:text-white cursor-pointer">{t("기관 정보")}</button>
            <button onClick={() => onTabChange?.('about', 'greetings')} className="hover:text-white cursor-pointer">{t("개인정보처리방침")}</button>
            <button onClick={() => onTabChange?.('about', 'greetings')} className="hover:text-white cursor-pointer">{t("이용약관")}</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
