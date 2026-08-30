import React from 'react';
import { Users, Shield, Award, Building2, UserCheck, CheckCircle2 } from 'lucide-react';
import ScrollReveal from '../common/ScrollReveal';

export default function OrganizationSection() {
  return (
    <div className="space-y-10 animate-fadeIn font-sans text-gray-900">
      
      {/* Header Banner */}
      <div className="text-center max-w-4xl mx-auto space-y-3">
        <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-3.5 py-1 rounded-full uppercase tracking-wider">
          ORGANIZATION CHART
        </span>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 tracking-tight">
          사단법인 한국외식창업교육원 <span className="text-emerald-700">조직도</span>
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 font-medium max-w-2xl mx-auto">
          외식 산업 발전과 전문 인재 양성을 선도하는 한국외식창업교육원의 체계적인 조직 체계입니다.
        </p>
      </div>

      {/* Interactive Official Diagram (Matching Image 4) */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-300 shadow-xl overflow-x-auto no-scrollbar">
        <div className="min-w-[900px] max-w-6xl mx-auto space-y-8">
          
          {/* LEVEL 1: TOP EXECUTIVE CHAIRMAN (원장 안형상) */}
          <div className="flex justify-center">
            <div className="w-72 bg-white border-2 border-black rounded-2xl p-5 text-center shadow-lg hover:shadow-2xl transition-all">
              <span className="text-xs font-black text-gray-500 block uppercase tracking-wider">사단법인 수장</span>
              <h3 className="text-2xl font-black text-black mt-1">원 장</h3>
              <p className="text-xl font-black text-emerald-800 mt-1">안 형 상</p>
            </div>
          </div>

          {/* CONNECTING LINE LEVEL 1 -> LEVEL 2 */}
          <div className="w-0.5 h-8 bg-gray-400 mx-auto" />

          {/* LEVEL 2: TWO MAIN BRANCHES (LEFT: Advisory Group | RIGHT: Secretariat) */}
          <div className="grid grid-cols-2 gap-8 relative">
            
            {/* Horizontal Line connecting Branches */}
            <div className="absolute top-0 left-1/4 right-1/4 h-0.5 bg-gray-400" />

            {/* LEFT BRANCH: POLICY & PRACTICE ADVISORY GROUPS */}
            <div className="space-y-6 pt-4">
              
              {/* Policy Advisory Group */}
              <div className="bg-gray-50 rounded-2xl border border-gray-300 p-4 space-y-3 shadow-sm">
                <div className="bg-white border border-black rounded-xl py-2 px-4 text-center font-black text-sm text-black shadow-xs">
                  정책 자문단
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="bg-white p-2.5 rounded-xl border border-gray-300">
                    <span className="font-black text-gray-900 block text-xs">고문단</span>
                    <span className="text-gray-600 font-bold text-[11px]">이득식, 김동승, 황광해</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-gray-300">
                    <span className="font-black text-gray-900 block text-xs">교수자문단</span>
                    <span className="text-gray-600 font-bold text-[11px]">안성규 외 13명</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-gray-300">
                    <span className="font-black text-gray-900 block text-xs">사업 기획단</span>
                    <span className="text-gray-600 font-bold text-[11px]">지기철, 트라이경영연구소</span>
                  </div>
                </div>
              </div>

              {/* Practice Advisory Group */}
              <div className="bg-gray-50 rounded-2xl border border-gray-300 p-4 space-y-3 shadow-sm">
                <div className="bg-white border border-black rounded-xl py-2 px-4 text-center font-black text-sm text-black shadow-xs">
                  실무 자문단
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="bg-white p-2.5 rounded-xl border border-gray-300">
                    <span className="font-black text-gray-900 block text-xs">전국협력교육기관</span>
                    <span className="text-emerald-700 font-black text-[11px]">12곳</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-gray-300">
                    <span className="font-black text-gray-900 block text-xs">법률자문</span>
                    <span className="text-gray-600 font-bold text-[11px]">노무사, 세무사, 변호사</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-gray-300">
                    <span className="font-black text-gray-900 block text-xs">창업 협력업체</span>
                    <span className="text-gray-600 font-bold text-[11px]">설비, 인테리어 등</span>
                  </div>
                </div>
              </div>

            </div>

            {/* RIGHT BRANCH: SECRETARIAT & AFFILIATED LEGAL ENTITIES */}
            <div className="space-y-4 pt-4">
              
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white border border-black rounded-xl p-3 text-center shadow-xs">
                  <span className="text-xs font-bold text-gray-500 block">사무국장</span>
                  <span className="font-black text-sm text-black">이원웅</span>
                </div>
                <div className="bg-white border border-black rounded-xl p-3 text-center shadow-xs">
                  <span className="text-xs font-bold text-gray-500 block">감사</span>
                  <span className="font-black text-sm text-black">박경옥</span>
                </div>
              </div>

              <div className="bg-white border border-black rounded-xl p-3 text-center shadow-xs">
                <span className="text-xs font-bold text-gray-500 block">사무장</span>
                <span className="font-black text-sm text-black">김근혜</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white border border-black rounded-xl p-3 text-center shadow-xs">
                  <span className="text-xs font-bold text-gray-500 block">사무국 대리</span>
                  <span className="font-black text-sm text-black">장희은</span>
                </div>
                <div className="bg-white border border-black rounded-xl p-3 text-center shadow-xs">
                  <span className="text-xs font-bold text-gray-500 block">사무국 주임</span>
                  <span className="font-black text-sm text-black">모영주</span>
                </div>
              </div>

              {/* Green Box: Collaborating Legal Entities (협업 법인단체 - Image 4 Green Card) */}
              <div className="bg-emerald-100/80 border-2 border-emerald-500 rounded-2xl p-4 space-y-2 shadow-sm">
                <span className="text-xs font-black text-emerald-900 block text-center uppercase tracking-wider">
                  협업 법인단체
                </span>
                <ul className="text-xs font-extrabold text-emerald-950 space-y-1">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span>사)한국문화관광평가연구원 (문화관광부)</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span>사)글로벌푸드연구소 (해양수산부)</span>
                  </li>
                </ul>
              </div>

            </div>

          </div>

          {/* CONNECTING LINE LEVEL 2 -> LEVEL 3 */}
          <div className="w-0.5 h-8 bg-gray-400 mx-auto" />

          {/* LEVEL 3: COMMITTEE CHAIR & 14 CULINARY MASTER CATEGORIES (위원장 & 분야별 조리 명인) */}
          <div className="space-y-4">
            
            <div className="w-64 bg-white border-2 border-black rounded-xl py-3 px-6 mx-auto text-center font-black text-lg text-black shadow-md">
              위 원 장
            </div>

            {/* 14 Culinary Master Categories Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2.5 text-center text-xs font-extrabold">
              {[
                { title: '양식', name: '김철우' },
                { title: '중식', name: '송창수' },
                { title: '한식', name: '방선배' },
                { title: '일식', name: '김태완' },
                { title: '생활요리', name: '김봉예' },
                { title: '발효음식', name: '성경자' },
                { title: '사찰요리', name: '전은희' },
                { title: '퓨전요리', name: '허연웅' },
                { title: '실버요리', name: '신재복' },
                { title: '아시안푸드', name: '박부석' },
                { title: '전통음식', name: '강귀녀' },
                { title: '베이커리디저트', name: '장현호' },
                { title: '떡 & 한과', name: '전은희' },
                { title: '식음료개발', name: '김명선' },
              ].map((item, idx) => (
                <div key={idx} className="bg-gray-50 border border-gray-300 rounded-xl p-2 hover:border-emerald-500 hover:bg-emerald-50 transition-all">
                  <span className="text-gray-500 block text-[11px]">{item.title}</span>
                  <span className="text-black font-black text-xs">{item.name}</span>
                </div>
              ))}
            </div>

            {/* 5 Operational Divisions Grid */}
            <div className="grid grid-cols-5 gap-2.5 text-center text-xs font-extrabold pt-1">
              {[
                { title: '기획&행사', name: '최제홍' },
                { title: '연회서비스', name: '강기숙' },
                { title: '커피', name: '김미숙' },
                { title: '칵테일', name: '심재학' },
                { title: 'R&D', name: '이재훈' },
              ].map((item, idx) => (
                <div key={idx} className="bg-emerald-950 text-white rounded-xl p-2 border border-emerald-700">
                  <span className="text-emerald-300 block text-[10px]">{item.title}</span>
                  <span className="font-black text-xs">{item.name}</span>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}
