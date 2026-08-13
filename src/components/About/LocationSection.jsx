import React from 'react';
import {
  MapPin,
  Phone,
  Printer,
  Clock,
  Navigation,
  Bus,
  Car,
  Map as MapIcon,
  RotateCcw,
  Plus,
  Minus,
} from 'lucide-react';

export default function LocationSection() {
  const kakaoMapUrl = 'https://map.kakao.com/link/map/한국외식창업교육원,37.4981,127.0117';
  const kakaoNaviUrl = 'https://map.kakao.com/link/to/한국외식창업교육원,37.4981,127.0117';

  return (
    <section className="space-y-10 animate-fadeIn">
      
      {/* Top Banner */}
      <div className="bg-[#0F5132] rounded-3xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden text-center sm:text-left">
        <div className="relative z-10 space-y-2 max-w-2xl">
          <span className="text-xs font-bold text-emerald-300 uppercase tracking-widest block">
            LOCATION & DIRECTIONS
          </span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
            오시는 길
          </h2>
          <p className="text-emerald-100/90 text-sm sm:text-base font-medium">
            한국외식창업교육원에 오시는 다양한 방법을 안내해드립니다.
          </p>
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-emerald-500/10 rounded-r-3xl pointer-events-none" />
      </div>

      {/* Main Location Container Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-emerald-100 shadow-md space-y-8">
        
        {/* Kakao Map Frame matching User Screenshot */}
        <div className="relative rounded-2xl overflow-hidden border border-gray-300 shadow-sm bg-[#E9EBE8] aspect-[16/9] max-h-[500px]">
          
          {/* Map Image / Embedded Kakao Map View */}
          <iframe
            title="한국외식창업교육원 카카오맵"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3165.419076594246!2d127.0117!3d37.4981!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca16000000001%3A0x1!2z7ISc7Jq47Yq567OE7IucIOyEnOyogOq1rCDsgqTsnZTrp7nroZwgMTc0!5e0!3m2!1sko!2skr!4v1700000000000!5m2!1sko!2skr"
            className="w-full h-full border-0 brightness-[98%] contrast-[102%]"
            loading="lazy"
            allowFullScreen
          />

          {/* Kakao Map Custom Info Overlay Window */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl p-4 sm:p-5 shadow-2xl border border-gray-300 max-w-xs sm:max-w-sm w-full space-y-2 backdrop-blur-md pointer-events-none">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#0F5132] text-white flex items-center justify-center font-black shrink-0 shadow-sm">
                  🏢
                </div>
                <div>
                  <h4 className="font-extrabold text-gray-900 text-sm sm:text-base">
                    한국외식창업교육원
                  </h4>
                  <p className="text-xs text-gray-600 font-medium leading-tight mt-0.5">
                    서울특별시 서초구 사임당로 174, 강남미래타워 5층
                  </p>
                </div>
              </div>
            </div>
            <div className="pt-2 border-t border-gray-100 flex items-center gap-1.5 text-xs font-bold text-[#0F5132]">
              <Phone className="w-3.5 h-3.5" />
              <span>02-3474-7001</span>
            </div>
          </div>

          {/* Top Left Controls: 지도 / 스카이뷰 */}
          <div className="absolute top-3 left-3 bg-white rounded-xl shadow-md border border-gray-300 p-1 flex items-center text-xs font-bold text-gray-700 gap-1 z-10">
            <span className="px-3 py-1 bg-[#258fff] text-white rounded-lg cursor-pointer">지도</span>
            <span className="px-3 py-1 hover:bg-gray-100 rounded-lg cursor-pointer">스카이뷰</span>
          </div>

          {/* Bottom Left Kakao Logo & Scale */}
          <div className="absolute bottom-3 left-3 flex items-center gap-2 text-xs font-extrabold text-gray-700 pointer-events-none z-10">
            <span className="px-2 py-0.5 bg-white/90 rounded border border-gray-300 text-gray-900 font-black text-xs">
              kakao
            </span>
            <span className="text-[11px] bg-white/80 px-1.5 py-0.5 rounded text-gray-600 font-medium">
              100m
            </span>
          </div>

          {/* Right Map Controls (+, -, Refresh) */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 bg-white rounded-xl shadow-md border border-gray-300 flex flex-col divide-y divide-gray-200 text-gray-700 z-10">
            <button className="p-2 hover:bg-gray-100 transition-colors" title="확대">
              <Plus className="w-4 h-4" />
            </button>
            <button className="p-2 hover:bg-gray-100 transition-colors" title="축소">
              <Minus className="w-4 h-4" />
            </button>
            <button className="p-2 hover:bg-gray-100 transition-colors" title="초기화">
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Bottom Right Reset Bar */}
          <div className="absolute bottom-3 right-3 z-10">
            <a
              href={kakaoMapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 bg-white/95 hover:bg-white text-gray-700 border border-gray-300 rounded-xl text-xs font-bold shadow-xs flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5 text-gray-500" />
              <span>지도 초기화</span>
            </a>
          </div>

        </div>

        {/* Action Quick Buttons Bar (Matching User Screenshot) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <a
            href={kakaoMapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 p-3.5 bg-white border border-gray-200 hover:border-amber-400 hover:bg-amber-50/50 text-gray-800 rounded-2xl font-bold text-xs sm:text-sm shadow-xs transition-all cursor-pointer"
          >
            <div className="w-3 h-3 rounded-full bg-[#FEE500] border border-amber-400 shrink-0" />
            <span>카카오맵에서 보기</span>
          </a>

          <a
            href={kakaoNaviUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 p-3.5 bg-white border border-gray-200 hover:border-blue-400 hover:bg-blue-50/50 text-gray-800 rounded-2xl font-bold text-xs sm:text-sm shadow-xs transition-all cursor-pointer"
          >
            <Navigation className="w-4 h-4 text-[#258fff]" />
            <span>길찾기</span>
          </a>

          <a
            href="#public-transport"
            className="flex items-center justify-center gap-2 p-3.5 bg-white border border-gray-200 hover:border-emerald-400 hover:bg-emerald-50/50 text-gray-800 rounded-2xl font-bold text-xs sm:text-sm shadow-xs transition-all cursor-pointer"
          >
            <Bus className="w-4 h-4 text-[#0F5132]" />
            <span>대중교통</span>
          </a>

          <a
            href="#parking"
            className="flex items-center justify-center gap-2 p-3.5 bg-white border border-gray-200 hover:border-gray-400 hover:bg-gray-50 text-gray-800 rounded-2xl font-bold text-xs sm:text-sm shadow-xs transition-all cursor-pointer"
          >
            <Car className="w-4 h-4 text-gray-600" />
            <span>주차 안내</span>
          </a>
        </div>

        {/* Detailed Information Grid (Exact 3-Column Layout Matching Screenshot) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4 border-t border-gray-100">
          
          {/* Col 1: 주소 및 연락처 */}
          <div className="space-y-4">
            <h3 className="text-base font-black text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#0F5132]" />
              <span>주소 및 연락처</span>
            </h3>

            <div className="space-y-3 text-xs sm:text-sm text-gray-700 font-medium">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-gray-900 block">서울특별시 서초구 사임당로 174</span>
                  <span className="text-gray-500">강남미래타워 5층 (우: 06628)</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 pt-1">
                <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-bold text-gray-900">02-3474-7001</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Printer className="w-4 h-4 text-gray-400 shrink-0" />
                <span className="text-gray-600">02-3474-7002</span>
              </div>

              <div className="flex items-start gap-2.5 pt-1">
                <Clock className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-gray-900 block">평일 09:00 - 18:00</span>
                  <span className="text-gray-500 text-xs">(주말/공휴일 휴무)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Col 2: 지하철 이용 시 */}
          <div className="space-y-4">
            <h3 className="text-base font-black text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
              <Navigation className="w-4 h-4 text-[#0F5132]" />
              <span>지하철 이용 시</span>
            </h3>

            <div className="space-y-3.5 text-xs sm:text-sm text-gray-700 font-medium">
              
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[11px] font-black flex items-center justify-center shrink-0 mt-0.5">
                  2
                </span>
                <div>
                  <span className="font-bold text-gray-900 block">2호선 강남역 10번 출구</span>
                  <span className="text-gray-500 text-xs">도보 12분 (약 750m)</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-orange-500 text-white text-[11px] font-black flex items-center justify-center shrink-0 mt-0.5">
                  3
                </span>
                <div>
                  <span className="font-bold text-gray-900 block">3호선 고속터미널역 8-1번 출구</span>
                  <span className="text-gray-500 text-xs">도보 5분 (약 350m)</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-amber-700 text-white text-[11px] font-black flex items-center justify-center shrink-0 mt-0.5">
                  7
                </span>
                <div>
                  <span className="font-bold text-gray-900 block">7호선 반포역 3번 출구</span>
                  <span className="text-gray-500 text-xs">도보 10분 (약 600m)</span>
                </div>
              </div>

            </div>
          </div>

          {/* Col 3: 버스 이용 시 */}
          <div className="space-y-4" id="public-transport">
            <h3 className="text-base font-black text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
              <Bus className="w-4 h-4 text-[#0F5132]" />
              <span>버스 이용 시</span>
            </h3>

            <div className="space-y-2 text-xs sm:text-sm text-gray-700 font-medium">
              
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-blue-600 text-white text-[11px] font-bold">
                  간선
                </span>
                <span className="font-bold text-gray-800">144, 146, 401, 406, 740</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-emerald-600 text-white text-[11px] font-bold">
                  지선
                </span>
                <span className="font-bold text-gray-800">3412, 3422, 4312</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-red-600 text-white text-[11px] font-bold">
                  광역
                </span>
                <span className="font-bold text-gray-800">9408, 9500, 9501, 9802</span>
              </div>

              <div className="pt-2 text-xs text-gray-500 font-medium border-t border-stone-100 mt-2">
                <span className="font-bold text-gray-800 block">고속터미널·신세계백화점 앞 하차</span>
                <span>도보 3분 (약 200m)</span>
              </div>

            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
