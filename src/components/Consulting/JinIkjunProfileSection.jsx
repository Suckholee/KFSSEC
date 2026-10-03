import React, { useState } from 'react';
import {
  Award,
  BookOpen,
  BookmarkCheck,
  Briefcase,
  GraduationCap,
  Building,
  Globe,
  Newspaper,
  Phone,
  Mail,
  CheckCircle2,
  ExternalLink,
  Search,
  Sparkles,
  ChevronRight,
  Filter,
  MapPin,
  TrendingUp,
  Store,
  Layers,
  FileText,
  HelpCircle
} from 'lucide-react';
import EditableImage from '../Admin/InlineEditor/EditableImage';
import EditableText from '../Admin/InlineEditor/EditableText';
import { useAdminEdit } from '../../context/AdminEditContext';
import ScrollReveal from '../common/ScrollReveal';
import { defaultConsultingCases } from '../../data/defaultConsultingCases';

export default function JinIkjunProfileSection({ onConsultClick }) {
  const { siteDraft } = useAdminEdit();
  // Sub-tabs: 'profile' (진익준교수 소개 프로필) | 'references' (진익준교수 사례예시 프렌차이즈 사례)
  const [activeSubTab, setActiveSubTab] = useState('profile');

  const handleSubTabSwitch = (tab) => {
    setActiveSubTab(tab);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };
  const [refCategory, setRefCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showMoreEdu, setShowMoreEdu] = useState(false);
  const [showMorePublic, setShowMorePublic] = useState(false);
  const [showMoreMedia, setShowMoreMedia] = useState(false);

  const jinData = siteDraft?.jinIkjun || {};

  // 100+ Reference Projects Database (Admin Managed or Default)
  const references = siteDraft?.consultingCases && siteDraft.consultingCases.length > 0
    ? siteDraft.consultingCases
    : defaultConsultingCases;

  // Filter references based on category and query
  const filteredReferences = references.filter((item) => {
    const matchCategory =
      refCategory === 'all' ||
      (refCategory === 'korean' && item.category === 'korean') ||
      (refCategory === 'franchise' && (item.category === 'franchise' || item.category === 'world')) ||
      (refCategory === 'cafe' && item.category === 'cafe') ||
      (refCategory === 'academy' && item.category === 'academy') ||
      (refCategory === 'global' && item.region === '해외');

    const matchQuery =
      searchQuery.trim() === '' ||
      item.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.type.toLowerCase().includes(searchQuery.toLowerCase());

    return matchCategory && matchQuery;
  });

  const defaultConsultingFaculty = [
    {
      id: 'prof-jin',
      name: jinData.name || '진익준',
      role: jinData.category || '외식 공간디자인 & 상권분석 전담교수',
      title: '브랜드경험디자인연구소 대표 / 청운대학교 외식조리경영학과 겸임교수',
      image: jinData.photoUrl || '/images/faculty/jin_ikjun_expert.png',
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
      hasReferences: true,
      referencesCount: references.length,
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

  const consultingFaculty = siteDraft?.faculty && siteDraft.faculty.length > 0
    ? siteDraft.faculty.map((f, i) => ({
        ...f,
        hasReferences: i === 0 || f.id === 'prof-jin',
        referencesCount: references.length,
      }))
    : defaultConsultingFaculty;

  return (
    <div className="space-y-6 w-full animate-fadeIn">
      {/* Top Banner & Tab Navigation Switcher */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D0E7DA] shadow-sm">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b-2 border-stone-200">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F2FAF5] border border-[#D0E7DA] text-[#1E5D3B] text-xs font-black mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#2B7752]" />
              <span>KFSSEC MASTER FACULTY & STARTUP STRATEGY</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight flex items-center gap-2">
              <span>외식창업 & 경영전략 전문 교수진</span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 font-medium mt-1.5 leading-relaxed">
              사단법인 한국외식창업교육원은 분야별 최고 권위의 교수진과 함께 실전 창업 및 비즈니스 턴어라운드를 지도합니다.
            </p>
          </div>

          {/* Quick CTA Action */}
          <button
            onClick={() => onConsultClick && onConsultClick('전문 교수진 1:1 창업 컨설팅')}
            className="px-6 py-3 bg-[#2B7752] hover:bg-[#236344] text-white font-black text-sm rounded-2xl shadow-md transition-all flex items-center gap-2 shrink-0 cursor-pointer border border-[#85CFAB]"
          >
            <span>교수진 1:1 컨설팅 문의</span>
            <ChevronRight className="w-4 h-4 text-[#A7F3D0]" />
          </button>
        </div>

        {/* 3 Major Sub-Tabs Switcher */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6">
          <button
            onClick={() => handleSubTabSwitch('profile')}
            className={`flex items-center justify-center gap-2.5 py-4 px-4 rounded-2xl font-black text-sm sm:text-base transition-all cursor-pointer border-2 ${
              activeSubTab === 'profile'
                ? 'bg-[#2B7752] text-white border-[#2B7752] shadow-md'
                : 'bg-stone-50 text-gray-700 border-stone-200 hover:border-[#34885E] hover:bg-stone-100'
            }`}
          >
            <GraduationCap className={`w-5 h-5 ${activeSubTab === 'profile' ? 'text-[#A7F3D0]' : 'text-gray-400'}`} />
            <span>교수진 프로필</span>
          </button>

          <button
            onClick={() => handleSubTabSwitch('references')}
            className={`flex items-center justify-center gap-2.5 py-4 px-4 rounded-2xl font-black text-sm sm:text-base transition-all cursor-pointer border-2 ${
              activeSubTab === 'references'
                ? 'bg-[#2B7752] text-white border-[#2B7752] shadow-md'
                : 'bg-stone-50 text-gray-700 border-stone-200 hover:border-[#34885E] hover:bg-stone-100'
            }`}
          >
            <Store className={`w-5 h-5 ${activeSubTab === 'references' ? 'text-[#A7F3D0]' : 'text-gray-400'}`} />
            <div className="flex items-center gap-1.5">
              <span>프랜차이즈 사례</span>
              <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${
                activeSubTab === 'references' ? 'bg-[#EAF6EE] text-[#1E5D3B]' : 'bg-gray-200 text-gray-700'
              }`}>
                100+
              </span>
            </div>
          </button>

          <button
            onClick={() => handleSubTabSwitch('faq')}
            className={`flex items-center justify-center gap-2.5 py-4 px-4 rounded-2xl font-black text-sm sm:text-base transition-all cursor-pointer border-2 ${
              activeSubTab === 'faq'
                ? 'bg-[#2B7752] text-white border-[#2B7752] shadow-md'
                : 'bg-stone-50 text-gray-700 border-stone-200 hover:border-[#34885E] hover:bg-stone-100'
            }`}
          >
            <HelpCircle className={`w-5 h-5 ${activeSubTab === 'faq' ? 'text-[#A7F3D0]' : 'text-gray-400'}`} />
            <div className="flex items-center gap-1.5">
              <span>외식 컨설팅 FAQ</span>
              <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${
                activeSubTab === 'faq' ? 'bg-[#EAF6EE] text-[#1E5D3B]' : 'bg-amber-100 text-amber-800'
              }`}>
                3문 3답
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* VIEW 1: 진익준교수 소개 프로필 (EXPERT PROFILE - Monograph Editorial)   */}
      {/* ========================================================================= */}
      {activeSubTab === 'profile' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Top Banner Header */}
          <ScrollReveal direction="up" delay={0}>
            <div className="relative bg-gradient-to-br from-[#1E5B3C] via-[#2A7550] to-[#388C61] text-white rounded-3xl p-6 sm:p-10 border border-[#85CFAB]/50 shadow-xl overflow-hidden">
              <div className="relative z-10 max-w-3xl space-y-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/15 border border-white/25 text-[#A7F3D0] text-xs font-black rounded-full">
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>DISTINGUISHED FACULTY & ADVISORS</span>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight">
                  외식산업 최고 권위의 <br className="hidden sm:inline" />
                  <span className="text-[#A7F3D0]">명문 교수진 & 전문 자문단</span>
                </h2>
                <p className="text-xs sm:text-sm text-emerald-100/90 font-medium leading-relaxed">
                  사단법인 한국외식창업교육원은 조리명장, 상권분석 및 인테리어 건축 석학, 프랜차이즈 경영 정책 전문가가 하나 되어 이론과 실무를 관통하는 차별화된 교육과 실전 창업 컨설팅을 제공합니다.
                </p>
              </div>
              <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-[#A7F3D0]/10 rounded-full blur-3xl pointer-events-none" />
            </div>
          </ScrollReveal>

          {/* Faculty Cards Grid */}
          <div className="space-y-8">
            {consultingFaculty.map((member, idx) => (
              <ScrollReveal key={member.id || idx} direction="up" delay={idx * 40}>
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 hover:border-[#34885E] shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Left Column: Portrait & Badge */}
                    <div className="lg:col-span-4 flex flex-col items-center sm:items-start space-y-4">
                      <div className="relative w-44 sm:w-52 aspect-[3/4] rounded-2xl overflow-hidden border border-[#D0E7DA] shadow-sm bg-stone-100">
                        <EditableImage
                          path={`faculty.${idx}.image`}
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full"
                          imageClassName="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      <div className="space-y-1.5 text-center sm:text-left w-full">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-black border ${member.badgeColor || 'bg-amber-100 text-amber-900 border-amber-300'}`}>
                          <EditableText path={`faculty.${idx}.badge`} value={member.badge} />
                        </span>
                        <h3 className="text-2xl font-black text-gray-900 tracking-tight flex items-center justify-center sm:justify-start gap-2">
                          <EditableText path={`faculty.${idx}.name`} value={member.name} />
                          <span className="text-sm font-bold text-gray-500">
                            {member.badge?.includes('명장') ? '명장' : '교수'}
                          </span>
                        </h3>
                        <p className="text-xs font-black text-[#1E5D3B]">
                          <EditableText path={`faculty.${idx}.role`} value={member.role} />
                        </p>
                        <p className="text-xs text-gray-500 font-medium leading-snug">
                          <EditableText path={`faculty.${idx}.title`} value={member.title} />
                        </p>
                      </div>
                    </div>

                    {/* Right Column: Full Details */}
                    <div className="lg:col-span-8 space-y-5 text-gray-800">
                      
                      {/* Philosophy / Overview */}
                      <div className="bg-stone-50 p-4 sm:p-5 rounded-2xl border border-stone-200">
                        <p className="text-xs sm:text-sm text-gray-800 font-medium leading-relaxed italic">
                          "<EditableText multiline path={`faculty.${idx}.intro`} value={member.intro} />"
                        </p>
                      </div>

                      {/* Highlights Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        
                        {/* Career & Academic Background */}
                        <div className="space-y-2.5">
                          <h4 className="text-xs font-black uppercase text-[#1E5D3B] flex items-center gap-1.5 border-b border-stone-200 pb-1.5">
                            <BookmarkCheck className="w-3.5 h-3.5 text-[#2B7752]" />
                            <span>주요 학력 및 경력</span>
                          </h4>
                          <ul className="space-y-1.5 text-xs text-gray-700 font-semibold">
                            {(member.highlights || []).map((h, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#2B7752] shrink-0 mt-0.5" />
                                <span>
                                  <EditableText path={`faculty.${idx}.highlights.${i}`} value={h} />
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Specialties / Core Subjects */}
                        <div className="space-y-2.5">
                          <h4 className="text-xs font-black uppercase text-[#1E5D3B] flex items-center gap-1.5 border-b border-stone-200 pb-1.5">
                            <Store className="w-3.5 h-3.5 text-[#2B7752]" />
                            <span>전문 강의 및 지도 분야</span>
                          </h4>
                          <ul className="space-y-1.5 text-xs text-gray-700 font-semibold">
                            {(member.specialties || []).map((s, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#2B7752] shrink-0 mt-0.5" />
                                <span>
                                  <EditableText path={`faculty.${idx}.specialties.${i}`} value={s} />
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>

                      </div>

                      {/* Publications */}
                      {member.publications && member.publications.length > 0 && (
                        <div className="pt-2">
                          <h4 className="text-xs font-black uppercase text-gray-700 flex items-center gap-1.5 mb-2">
                            <BookOpen className="w-3.5 h-3.5 text-[#2B7752]" />
                            <span>저서 및 주요 논문</span>
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {member.publications.map((pub, i) => (
                              <span
                                key={i}
                                className="inline-block text-xs font-medium px-3 py-1 bg-stone-100 text-gray-700 rounded-lg border border-stone-200"
                              >
                                <EditableText path={`faculty.${idx}.publications.${i}`} value={pub} />
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Action Buttons for Consulting */}
                      <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full sm:w-auto">
                          {member.hasReferences && (
                            <button
                              type="button"
                              onClick={() => handleSubTabSwitch('references')}
                              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#FAF9F5] hover:bg-[#F2EFE9] text-[#2F6B55] border border-[#E7E3DA] text-xs font-bold transition shadow-2xs cursor-pointer w-full sm:w-auto"
                            >
                              <Store className="w-3.5 h-3.5 text-[#2F6B55]" />
                              <span>100+ 프랜차이즈 시공 & 컨설팅 사례 보기</span>
                              <span className="text-xs font-extrabold text-[#2F6B55]">↗</span>
                            </button>
                          )}
                          {member.id === 'prof-jin' && (
                            <a
                              href="https://blog.naver.com/2k1207"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-stone-50 hover:bg-stone-100 text-stone-600 border border-stone-200 text-xs font-medium transition cursor-pointer w-full sm:w-auto"
                            >
                              <span>공식 블로그</span>
                              <span className="text-xs">↗</span>
                            </a>
                          )}
                        </div>

                        {onConsultClick && (
                          <button
                            type="button"
                            onClick={() => onConsultClick(`${member.name} 교수 1:1 맞춤 컨설팅 신청`)}
                            className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#2F6B55] hover:bg-[#235341] text-white text-xs font-bold transition shadow-xs cursor-pointer active:scale-95 w-full sm:w-auto shrink-0"
                          >
                            <Phone className="w-3.5 h-3.5 text-emerald-200" />
                            <span>{member.name} {member.badge?.includes('명장') ? '명장' : '교수'} 1:1 컨설팅 신청</span>
                          </button>
                        )}
                      </div>

                    </div>

                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 2: 진익준교수 사례예시 프렌차이즈 사례 (100+ REFERENCES & CASES)   */}
      {/* ========================================================================= */}
      {activeSubTab === 'references' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Filter & Search Bar Header */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-stone-200 shadow-lg space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-black text-[#2B7752] uppercase tracking-wider block">
                  PROVEN PORTFOLIO & CLIENT CASES
                </span>
                <h3 className="text-2xl font-black text-gray-950 mt-1 flex items-center gap-2">
                  <span>진익준 교수 국내외 대표 컨설팅 & 프랜차이즈 사례</span>
                  <span className="text-xs bg-[#2B7752] text-white font-black px-3 py-1 rounded-full">
                    {filteredReferences.length}개 검색됨
                  </span>
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">
                  이학갈비, 한솔요리학원, 살라타이 프랜차이즈, 미국·프랑스 aT 글로벌 사업 등 20여 년간 구축한 실전 프로젝트 목록입니다.
                </p>
              </div>

              {/* Search Input Box */}
              <div className="relative w-full md:w-72 shrink-0">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="브랜드명, 지역(예: 이학갈비, 파리)..."
                  className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#2B7752]"
                />
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-stone-200">
              {[
                { id: 'all', label: '전체 보기' },
                { id: 'korean', label: '한식·구이 명가 (이학갈비 외)' },
                { id: 'franchise', label: '프랜차이즈 & 세계요리' },
                { id: 'global', label: '해외 글로벌 (미국·프랑스·중국 aT)' },
                { id: 'academy', label: '조리 아카데미 (한솔요리학원)' },
                { id: 'cafe', label: '카페 & 베이커리' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setRefCategory(cat.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                    refCategory === cat.id
                      ? 'bg-[#2B7752] text-white shadow-md'
                      : 'bg-stone-100 text-gray-700 hover:bg-stone-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Key Highlight Spotlight: 이학갈비 & 글로벌 프로젝트 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Spotlight 1: 이학갈비 / 이학농가 */}
            <div className="bg-gradient-to-br from-stone-900 via-[#1E5B3C] to-[#2B7752] rounded-3xl p-6 text-white shadow-xl space-y-4">
              <span className="text-[11px] font-black tracking-widest text-[#A7F3D0] uppercase bg-black/40 px-2.5 py-1 rounded-full border border-white/20">
                REPRESENTATIVE SUCCESS CASE
              </span>
              <h4 className="text-xl font-black">이학갈비 & 이학농가 전 지점</h4>
              <p className="text-xs text-stone-300 leading-relaxed">
                인천 연수동 본점, 서울 면목동 사가정점, 군포 산본점, 시흥점, 김포 이학농가까지 초대형 한식 명가의 공간 기획 및 설계 감리를 총괄하였습니다.
              </p>
              <div className="pt-2 text-xs font-bold text-[#A7F3D0] flex items-center gap-1">
                <span>동선 최적화 & 고객 회전율 극대화 설계</span>
              </div>
            </div>

            {/* Spotlight 2: 프랑스/미국 aT 글로벌 */}
            <div className="bg-gradient-to-br from-[#1B5238] via-[#266847] to-[#34885E] rounded-3xl p-6 text-white shadow-xl space-y-4">
              <span className="text-[11px] font-black tracking-widest text-[#A7F3D0] uppercase bg-black/40 px-2.5 py-1 rounded-full border border-white/20">
                GLOBAL K-FOOD CONSULTING
              </span>
              <h4 className="text-xl font-black">aT 파리·LA·대련 해외 컨설팅</h4>
              <p className="text-xs text-stone-300 leading-relaxed">
                한국농수산식품유통공사(aT) 주관 프랑스 파리지역 한식당 디자인 컨설팅(3개년 연속) 및 미국 LA, 중국 대련 한식당 표준화 모델 구축.
              </p>
              <div className="pt-2 text-xs font-bold text-[#A7F3D0] flex items-center gap-1">
                <span>K-FOOD 글로벌 공간 표준화 달성</span>
              </div>
            </div>

            {/* Spotlight 3: 한솔요리학원 프랜차이즈 */}
            <div className="bg-gradient-to-br from-amber-950 to-stone-900 rounded-3xl p-6 text-white shadow-xl space-y-4">
              <span className="text-[11px] font-black tracking-widest text-[#D4AF37] uppercase bg-black/40 px-2.5 py-1 rounded-full border border-[#D4AF37]/30">
                EDUCATION & ACADEMY
              </span>
              <h4 className="text-xl font-black">한솔요리학원 종로·강남·부산</h4>
              <p className="text-xs text-stone-300 leading-relaxed">
                대한민국 1위 조리 전문 교육기관 한솔요리학원 종로 본점, 강남점, 부산 서면점 및 분당 바리스타 아카데미 전관 설계 감리 수행.
              </p>
              <div className="pt-2 text-xs font-bold text-[#D4AF37] flex items-center gap-1">
                <span>실습 최적화 주방 환기 및 동선 혁신</span>
              </div>
            </div>
          </div>

          {/* Reference Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredReferences.map((item) => (
              <div
                key={item.id}
                className={`bg-white rounded-2xl p-5 border-2 transition-all hover:shadow-lg flex flex-col justify-between ${
                  item.highlight
                    ? 'border-[#2B7752] bg-[#F2FAF5]/50'
                    : 'border-stone-200 hover:border-stone-400'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-md ${
                      item.region === '해외'
                        ? 'bg-amber-100 text-amber-900 border border-amber-300'
                        : 'bg-[#EAF6EE] text-[#1E5D3B] border border-[#BEDECB]'
                    }`}>
                      {item.region} | {item.role}
                    </span>
                    {item.highlight && (
                      <span className="text-[10px] font-black text-[#2B7752] flex items-center gap-0.5">
                        <Sparkles className="w-3 h-3 text-[#2B7752]" />
                        <span>대표사례</span>
                      </span>
                    )}
                  </div>
                  <h5 className="text-base font-black text-gray-950 leading-snug">{item.brand}</h5>
                  <p className="text-xs text-gray-600 font-medium">{item.type}</p>
                </div>

                <div className="pt-3 mt-3 border-t border-stone-100 flex items-center justify-between text-xs text-gray-500 font-bold">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-gray-400" />
                    <span>{item.location}</span>
                  </span>
                  <span className="text-[11px] text-[#2B7752] font-bold">완료</span>
                </div>
              </div>
            ))}
          </div>

          {filteredReferences.length === 0 && (
            <div className="bg-white rounded-2xl p-12 text-center text-gray-500 space-y-2">
              <p className="text-sm font-bold">검색된 사례가 없습니다.</p>
              <p className="text-xs">다른 검색어나 카테고리 필터를 선택해 주세요.</p>
            </div>
          )}

          {/* Bottom Consulting Lead Banner */}
          <div className="bg-stone-900 rounded-3xl p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 border-2 border-[#C5A059]">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-xs font-black text-[#D4AF37] uppercase tracking-wider">
                EXPERT CONSULTING FOR YOUR BRAND
              </span>
              <h4 className="text-2xl font-black">
                진익준 교수와 함께하는 외식 창업 & 프랜차이즈 공간 컨설팅
              </h4>
              <p className="text-xs sm:text-sm text-stone-300 max-w-2xl leading-relaxed">
                상권 분석부터 브랜드 콘셉트, 고객 경험 디자인(CX), 주방 도면 설계까지 실패 없는 매장을 만듭니다. 지금 교육원에 1:1 상담을 요청하세요.
              </p>
            </div>
            <button
              onClick={() => onConsultClick && onConsultClick('진익준 교수 맞춤 컨설팅')}
              className="px-8 py-4 bg-[#C5A059] hover:bg-[#b08e4c] text-gray-950 font-black text-sm rounded-2xl shadow-xl transition-all shrink-0 cursor-pointer flex items-center gap-2"
            >
              <span>1:1 상담 신청하기</span>
              <ChevronRight className="w-4 h-4 text-gray-950" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 3: 진익준 교수 외식 컨설팅 자주 묻는 질문 FAQ (3문 3답)             */}
      {/* ========================================================================= */}
      {activeSubTab === 'faq' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Header Card */}
          <div className="bg-gradient-to-br from-[#1E5D3B] to-[#2B7752] rounded-3xl p-6 sm:p-8 text-white border-2 border-[#85CFAB] shadow-lg space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 border border-white/20 text-[#A7F3D0] text-xs font-black">
              <HelpCircle className="w-4 h-4 text-[#A7F3D0]" />
              <span>진익준 교수 외식 컨설팅 핵심 가이드</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black">
              진익준 교수의 외식 공간 & 경영 컨설팅 FAQ
            </h3>
            <p className="text-emerald-100 text-xs sm:text-sm max-w-2xl leading-relaxed font-medium">
              컨설팅 차별점, 기존 매장 리뉴얼 및 경영 개선, 사전 준비 자료와 진행 절차 등 가장 많이 문의하시는 핵심 질문 3가지를 정리해 드립니다.
            </p>
          </div>

          {/* 3 FAQ Accordion / Cards */}
          <div className="space-y-4">
            {/* FAQ 1 */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-stone-200 shadow-sm space-y-4 hover:border-[#1E5D3B] transition-colors">
              <div className="flex items-start gap-4">
                <span className="w-10 h-10 rounded-2xl bg-[#1E5D3B] text-white font-black text-base flex items-center justify-center shrink-0 shadow-md">
                  Q1
                </span>
                <div className="space-y-1">
                  <span className="text-xs font-black text-[#1E5D3B] bg-[#EAF6EE] px-2.5 py-0.5 rounded-md inline-block border border-[#A7F3D0]">
                    차별화 경쟁력
                  </span>
                  <h4 className="text-base sm:text-lg font-black text-gray-950">
                    진익준 교수의 외식 컨설팅은 기존 컨설팅과 어떻게 다른가요?
                  </h4>
                </div>
              </div>
              <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200 flex items-start gap-3.5 ml-0 sm:ml-14">
                <span className="w-7 h-7 rounded-xl bg-[#C5A059] text-gray-950 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                  A
                </span>
                <p className="text-xs sm:text-sm text-gray-800 leading-relaxed font-medium">
                  단순히 인테리어 디자인에만 치중하지 않습니다. 국내외 수많은 외식공간 설계·감리 경험과 학술적 연구를 바탕으로 <strong className="text-[#1E5D3B] font-black">[상권 분석 + 브랜드 입지 전략 + 효율적인 주방/매장 동선 시스템 + 공간 브랜딩]</strong>을 종합적으로 기획하여 실질적인 매출 상승과 오퍼레이션 효율화를 이끌어내는 맞춤형 공간/경영 컨설팅을 제공합니다.
                </p>
              </div>
            </div>

            {/* FAQ 2 */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-stone-200 shadow-sm space-y-4 hover:border-[#1E5D3B] transition-colors">
              <div className="flex items-start gap-4">
                <span className="w-10 h-10 rounded-2xl bg-[#1E5D3B] text-white font-black text-base flex items-center justify-center shrink-0 shadow-md">
                  Q2
                </span>
                <div className="space-y-1">
                  <span className="text-xs font-black text-[#1E5D3B] bg-[#EAF6EE] px-2.5 py-0.5 rounded-md inline-block border border-[#A7F3D0]">
                    기존 매장 리뉴얼
                  </span>
                  <h4 className="text-base sm:text-lg font-black text-gray-950">
                    신규 창업이 아닌, 기존에 운영 중인 매장의 리뉴얼이나 경영 개선도 컨설팅이 가능한가요?
                  </h4>
                </div>
              </div>
              <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200 flex items-start gap-3.5 ml-0 sm:ml-14">
                <span className="w-7 h-7 rounded-xl bg-[#C5A059] text-gray-950 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                  A
                </span>
                <p className="text-xs sm:text-sm text-gray-800 leading-relaxed font-medium">
                  네, 가능합니다. 노후화되거나 효율이 떨어진 기존 매장의 <strong className="text-[#1E5D3B] font-black">동선 재배치, 주방 시스템 개선(푸드테크 적용 등), 브랜드 리뉴얼 컨설팅</strong>을 전문적으로 진행합니다. 상권 환경과 고객 타겟 분석을 거쳐 최소 비용으로 최대 효과를 낼 수 있는 리모델링 및 경영 개선 방안을 제시해 드립니다.
                </p>
              </div>
            </div>

            {/* FAQ 3 */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-stone-200 shadow-sm space-y-4 hover:border-[#1E5D3B] transition-colors">
              <div className="flex items-start gap-4">
                <span className="w-10 h-10 rounded-2xl bg-[#1E5D3B] text-white font-black text-base flex items-center justify-center shrink-0 shadow-md">
                  Q3
                </span>
                <div className="space-y-1">
                  <span className="text-xs font-black text-[#1E5D3B] bg-[#EAF6EE] px-2.5 py-0.5 rounded-md inline-block border border-[#A7F3D0]">
                    진행 절차 & 준비 자료
                  </span>
                  <h4 className="text-base sm:text-lg font-black text-gray-950">
                    컨설팅 진행 절차와 신청 시 준비해야 할 자료는 무엇인가요?
                  </h4>
                </div>
              </div>
              <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200 flex items-start gap-3.5 ml-0 sm:ml-14">
                <span className="w-7 h-7 rounded-xl bg-[#C5A059] text-gray-950 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                  A
                </span>
                <div className="space-y-2 text-xs sm:text-sm text-gray-800 leading-relaxed font-medium">
                  <p>
                    온라인/전화 문의 접수 후 사전 상담을 진행하며, 아래 항목을 미리 작성해 주시면 더욱 신속하고 정확한 진단이 가능합니다:
                  </p>
                  <ul className="list-disc list-inside space-y-1 bg-white p-3.5 rounded-xl border border-stone-200 text-gray-900 font-bold">
                    <li>매장 입지(주소) 및 평수</li>
                    <li>현재(또는 예정) 메뉴 콘셉트</li>
                    <li>예산 범위</li>
                    <li>주요 고민사항 및 개선 희망 포인트</li>
                  </ul>
                  <p className="pt-1">
                    이후 사전 현장 조사 및 면담을 통해 단계별 컨설팅 범위와 일정을 확정하게 됩니다.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Lead Banner */}
          <div className="bg-stone-900 rounded-3xl p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 border-2 border-[#C5A059]">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-xs font-black text-[#D4AF37] uppercase tracking-wider">
                1:1 맞춤 컨설팅 접수 중
              </span>
              <h4 className="text-2xl font-black">
                진익준 교수와 함께 성공하는 외식 공간을 설계하세요
              </h4>
              <p className="text-xs sm:text-sm text-stone-300 max-w-2xl leading-relaxed">
                위 4가지 사항(매장 위치, 평수, 메뉴 컨셉, 예산)을 남겨주시면 진익준 교수 연구팀에서 1차 검토 후 연락드립니다.
              </p>
            </div>
            <button
              onClick={() => onConsultClick && onConsultClick('진익준 교수 외식 컨설팅 신청')}
              className="px-8 py-4 bg-[#C5A059] hover:bg-[#b08e4c] text-gray-950 font-black text-sm rounded-2xl shadow-xl transition-all shrink-0 cursor-pointer flex items-center gap-2"
            >
              <span>지금 1:1 컨설팅 신청하기</span>
              <ChevronRight className="w-4 h-4 text-gray-950" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
