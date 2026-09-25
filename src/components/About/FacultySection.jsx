import { useLanguage } from '../../i18n/LanguageContext';
import React from 'react';
import ScrollReveal from '../common/ScrollReveal';
import {
  GraduationCap,
  BookOpen,
  Award,
  Sparkles,
  Building,
  CheckCircle2,
  BookmarkCheck,
  UserCheck,
  MapPin,
  Store,
  Layers,
  FileText,
} from 'lucide-react';

export default function FacultySection({ facultyList: propFaculty }) {
  const { t } = useLanguage();

  const defaultFaculty = [
    {
      id: 'prof-jin',
      name: '진익준',
      role: '외식 공간디자인 & 상권분석 전담교수',
      title: '브랜드경험디자인연구소 대표 / 청운대학교 외식조리경영학과 겸임교수',
      image: '/images/dir_1.jpg',
      badge: '외식 상권 & 인테리어 석학',
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
      intro:
        '단순한 미적 인테리어를 넘어, 데이터 기반 상권·입지 분석과 타겟 고객의 방문 맥락(Context)을 통합 설계하는 대한민국 대표 외식 공간 브랜딩 전문가입니다.',
      highlights: [
        '홍익대학교 건축도시대학원 실내설계 석사',
        '세종대학교 일반대학원 조리·외식경영학 박사과정',
        '청운대학교 외식조리경영학과 겸임교수',
        '브랜드경험디자인연구소 대표',
        '한국외식창업교육원 상권분석 및 공간기획 자문위원',
      ],
      publications: [
        '『성공하는 식당은 콘셉트부터 다르다』 저자',
        '『창업성공의 인테리어 디자인 전략』 저자',
        '한국외식신문, 호텔&레스토랑 외식 브랜딩 정기 칼럼니스트',
      ],
      specialties: [
        '상권분석 기반 점포 콘셉트 기획',
        '고객 경험 디자인 (CX & Space Branding)',
        '주방 동선 최적화 및 파사드 설계',
        '소상공인 점포 리뉴얼 & 턴어라운드',
      ],
    },
    {
      id: 'prof-lee',
      name: '이상정',
      role: '서양조리 & 마스터클래스 석좌교수',
      title: '대한민국 조리명장 제1호 / 호텔 조리부 총괄',
      image: '/images/dir_2.jpg',
      badge: '대한민국 조리명장 1호',
      badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      intro:
        '대한민국 조리 분야 최초의 노동부 지정 조리명장으로서, 특급호텔 조리 현장 노하우와 서양조리의 정석을 후학들에게 도제식으로 전수합니다.',
      highlights: [
        '대한민국 조리명장 제1호 (노동부 지정)',
        '특급호텔 조리부 총괄 역임',
        '한국외식창업교육원 고문 및 명장 마스터클래스 주임교수',
        '국가기술자격 조리기능장 출제 및 실기심사위원',
      ],
      publications: [
        '『서양조리의 정석과 실무 테크닉』 저자',
        '국가직무능력표준(NCS) 조리분야 개발 자문위원',
      ],
      specialties: [
        '호텔식 파인다이닝 메뉴 R&D',
        '서양식 스테이크 및 소스 표준화',
        '셰프 1:1 도제식 실무 전수',
      ],
    },
    {
      id: 'prof-shin',
      name: '신충섭',
      role: '외식 정책 & 프랜차이즈 경영 자문위원',
      title: '외식산업 산학협력 총괄 / 경영 정책 자문위원',
      image: '/images/dir_3.jpg',
      badge: '경영·정책 자문',
      badgeColor: 'bg-blue-100 text-blue-900 border-blue-300',
      intro:
        '외식 프랜차이즈 시스템 구축과 정부지원 정책 연계, 소상공인 창업 리스크 관리를 지원하는 정책 자문 전문가입니다.',
      highlights: [
        '한국외식창업교육원 자문위원회 위원',
        '외식산업 산학협력 네트워크 총괄',
        '소상공인시장진흥공단 정책 자문위원',
      ],
      publications: [
        '외식 프랜차이즈 인허가 및 가맹사업 규정 실무 가이드',
      ],
      specialties: [
        '프랜차이즈 가맹 시스템 구축',
        '소상공인 정부 정책자금 연계',
        '외식 인허가 및 법률·세무 컨설팅',
      ],
    },
    {
      id: 'prof-cho',
      name: '조춘봉',
      role: '외식경영학 & 서비스 R&D 고문',
      title: '관광호텔·외식경영학 석학 / 교육원 고문',
      image: '/images/dir_4.jpg',
      badge: '외식경영학 석학',
      badgeColor: 'bg-purple-100 text-purple-900 border-purple-300',
      intro:
        '외식경영학 학문적 깊이와 고객 만족 서비스 전략을 결합하여, 지속 가능한 외식 비즈니스 모델을 제시합니다.',
      highlights: [
        '외식경영학 명예교수 / 관광외식학회 회장 역임',
        '한국외식창업교육원 고문단',
        '국내 주요 호텔 & 리조트 경영 자문',
      ],
      publications: [
        '『현대 외식산업경영론』 공저',
        '외식 서비스 품질과 재방문 행동 연구 논문 다수',
      ],
      specialties: [
        '외식 비즈니스 모델(BM) 수립',
        '홀 서비스 품질 & CS 코칭',
        '외식업체 장기 경영 전략',
      ],
    },
  ];

  const facultyMembers = propFaculty && propFaculty.length > 0 ? propFaculty : defaultFaculty;

  return (
    <div className="space-y-10 animate-fadeIn font-sans text-gray-900 w-full">
      {/* Top Banner Header */}
      <ScrollReveal direction="up" delay={0}>
        <div className="relative bg-[#0B3C26] text-white rounded-3xl p-6 sm:p-10 border-2 border-[#C5A059] shadow-xl overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#C5A059]/20 border border-[#C5A059]/40 text-[#D4AF37] text-xs font-black rounded-full">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>DISTINGUISHED FACULTY & ADVISORS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight">
              외식산업 최고 권위의 <br className="hidden sm:inline" />
              <span className="text-[#D4AF37]">명문 교수진 & 전문 자문단</span>
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100/90 font-medium leading-relaxed">
              사단법인 한국외식창업교육원은 조리명장, 상권분석 및 인테리어 건축 석학, 프랜차이즈 경영 정책 전문가가 하나 되어 이론과 실무를 관통하는 차별화된 교육을 제공합니다.
            </p>
          </div>
          <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-[#C5A059]/15 rounded-full blur-3xl pointer-events-none" />
        </div>
      </ScrollReveal>

      {/* Faculty Cards Grid */}
      <div className="space-y-8">
        {facultyMembers.map((member, idx) => (
          <ScrollReveal key={member.id} direction="up" delay={100 + idx * 80}>
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-gray-200 hover:border-[#0B3C26] shadow-md hover:shadow-xl transition-all duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left Column: Portrait & Badge */}
                <div className="lg:col-span-4 flex flex-col items-center sm:items-start space-y-4">
                  <div className="relative w-44 sm:w-52 aspect-[3/4] rounded-2xl overflow-hidden border-2 border-[#C5A059] shadow-md bg-stone-100">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="space-y-1.5 text-center sm:text-left">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-black border ${member.badgeColor}`}>
                      {member.badge}
                    </span>
                    <h3 className="text-2xl font-black text-gray-900 tracking-tight flex items-center justify-center sm:justify-start gap-2">
                      <span>{member.name}</span>
                      <span className="text-sm font-bold text-gray-500">교수</span>
                    </h3>
                    <p className="text-xs font-black text-[#0B3C26]">
                      {member.role}
                    </p>
                    <p className="text-xs text-gray-500 font-medium">
                      {member.title}
                    </p>
                  </div>
                </div>

                {/* Right Column: Full Details */}
                <div className="lg:col-span-8 space-y-5 text-gray-800">
                  
                  {/* Philosophy / Overview */}
                  <div className="bg-stone-50 p-4 sm:p-5 rounded-2xl border border-stone-200">
                    <p className="text-xs sm:text-sm text-gray-800 font-medium leading-relaxed">
                      "{member.intro}"
                    </p>
                  </div>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    
                    {/* Career & Academic Background */}
                    <div className="space-y-2.5">
                      <h4 className="text-xs font-black uppercase text-[#0B3C26] flex items-center gap-1.5 border-b border-gray-200 pb-1.5">
                        <BookmarkCheck className="w-3.5 h-3.5 text-[#C5A059]" />
                        <span>주요 학력 및 경력</span>
                      </h4>
                      <ul className="space-y-1.5 text-xs text-gray-700 font-semibold">
                        {member.highlights.map((h, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#0B3C26] shrink-0 mt-0.5" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Specialties / Core Subjects */}
                    <div className="space-y-2.5">
                      <h4 className="text-xs font-black uppercase text-[#0B3C26] flex items-center gap-1.5 border-b border-gray-200 pb-1.5">
                        <Store className="w-3.5 h-3.5 text-[#C5A059]" />
                        <span>전문 강의 및 지도 분야</span>
                      </h4>
                      <ul className="space-y-1.5 text-xs text-gray-700 font-semibold">
                        {member.specialties.map((s, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] shrink-0 mt-1.5" />
                            <span>{s}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>

                  {/* Publications & Research */}
                  {member.publications?.length > 0 && (
                    <div className="space-y-2 pt-2 border-t border-gray-100">
                      <h4 className="text-xs font-black uppercase text-gray-900 flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-[#0B3C26]" />
                        <span>주요 저서 및 연구 활동</span>
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {member.publications.map((pub, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1 px-3 py-1 bg-white border border-gray-300 text-gray-800 text-xs font-medium rounded-xl shadow-2xs"
                          >
                            <FileText className="w-3 h-3 text-[#C5A059]" />
                            <span>{pub}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                </div>

              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
