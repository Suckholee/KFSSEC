import React, { useState } from 'react';
import {
  Award,
  BookOpen,
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

export default function JinIkjunProfileSection({ onConsultClick }) {
  const { siteDraft } = useAdminEdit();
  // Sub-tabs: 'profile' (진익준교수 소개 프로필) | 'references' (진익준교수 사례예시 프렌차이즈 사례)
  const [activeSubTab, setActiveSubTab] = useState('profile');
  const [refCategory, setRefCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showMoreEdu, setShowMoreEdu] = useState(false);
  const [showMorePublic, setShowMorePublic] = useState(false);
  const [showMoreMedia, setShowMoreMedia] = useState(false);

  const jinData = siteDraft?.jinIkjun || {};

  // 100+ Reference Projects Database
  const references = [
    // 1. 대형 한식 & 프랜차이즈 명가
    { id: 1, region: '국내', category: 'korean', brand: '이학갈비 본점', location: '인천 연수동', role: '설계, 감리', type: '한식레스토랑 명가', highlight: true },
    { id: 2, region: '국내', category: 'korean', brand: '이학갈비 사가정점', location: '서울 면목동', role: '설계, 감리', type: '한식레스토랑', highlight: true },
    { id: 3, region: '국내', category: 'korean', brand: '이학갈비 산본점', location: '경기 군포시', role: '설계, 감리', type: '한식레스토랑', highlight: true },
    { id: 4, region: '국내', category: 'korean', brand: '이학갈비 시흥점', location: '경기 시흥시', role: '설계, 감리', type: '한식레스토랑', highlight: true },
    { id: 5, region: '국내', category: 'korean', brand: '이학농가', location: '경기 김포시', role: '설계, 감리', type: '대형 프리미엄 한식타운', highlight: true },
    { id: 6, region: '국내', category: 'korean', brand: '칠곡제면소', location: '대전 용문동', role: '설계, 감리', type: '전통 면요리 한식레스토랑', highlight: true },
    { id: 7, region: '국내', category: 'korean', brand: '탐나미장', location: '부산 대연동', role: '설계, 감리', type: '한식레스토랑', highlight: true },
    { id: 8, region: '국내', category: 'korean', brand: '개운정', location: '부산 대연동', role: '설계, 감리', type: '한식레스토랑', highlight: true },
    { id: 9, region: '국내', category: 'korean', brand: '햇잎갈비 태평점', location: '대전 태평동', role: '설계, 감리', type: '갈비 전문 브랜드', highlight: false },
    { id: 10, region: '국내', category: 'korean', brand: '소반 마산점', location: '경남 마산', role: '설계, 감리', type: '정갈한 한식레스토랑', highlight: false },
    { id: 11, region: '국내', category: 'korean', brand: '소반 창원점', location: '경남 창원', role: '설계, 감리', type: '한식레스토랑', highlight: false },
    { id: 12, region: '국내', category: 'korean', brand: '양지말 화로구이', location: '강원 홍천', role: '설계', type: '전국구 화로구이 명소', highlight: true },
    { id: 13, region: '국내', category: 'korean', brand: '한우프라자 가평점', location: '경기 가평', role: '설계', type: '한우 전문 식육식당', highlight: false },
    { id: 14, region: '국내', category: 'korean', brand: '한우프라자 횡성점', location: '강원 횡성', role: '설계', type: '횡성 한우 명가', highlight: false },
    { id: 15, region: '국내', category: 'korean', brand: '대호가든', location: '서울 창동', role: '설계, 감리', type: '대형 가든 한식당', highlight: false },
    { id: 16, region: '국내', category: 'korean', brand: '임비곰비', location: '인천 계산', role: '설계', type: '한식 보쌈전문점', highlight: false },
    { id: 17, region: '국내', category: 'korean', brand: '부전돼지국밥', location: '부산 사상', role: '설계, 감리', type: '전통 부산 국밥 명가', highlight: false },
    { id: 18, region: '국내', category: 'korean', brand: '여우골', location: '경기 수원', role: '설계, 감리', type: '구이전문 한식레스토랑', highlight: false },
    { id: 19, region: '국내', category: 'korean', brand: '로즈힐', location: '서울 역삼', role: '설계, 감리', type: '강남 고급 한식레스토랑', highlight: true },
    { id: 20, region: '국내', category: 'korean', brand: '청정일품정', location: '서울 신촌', role: '설계, 감리', type: '한식레스토랑', highlight: false },

    // 2. 아카데미 & 전문 교육공간
    { id: 21, region: '국내', category: 'academy', brand: '한솔요리학원 종로본점', location: '서울 종로구', role: '설계, 감리', type: '대한민국 대표 조리아카데미', highlight: true },
    { id: 22, region: '국내', category: 'academy', brand: '한솔요리학원 종로3가점', location: '서울 종로구', role: '설계, 감리', type: '전문 조리 실습 캠퍼스', highlight: false },
    { id: 23, region: '국내', category: 'academy', brand: '한솔요리학원 강남점', location: '서울 강남구', role: '설계, 감리', type: '강남 플래그십 조리교육관', highlight: true },
    { id: 24, region: '국내', category: 'academy', brand: '한솔요리학원 서면점', location: '부산 서면', role: '설계, 감리', type: '영남권 거점 조리아카데미', highlight: false },
    { id: 25, region: '국내', category: 'academy', brand: '한솔 커피 바리스타 & 베이커리 학원', location: '경기 분당', role: '설계, 감리', type: '카페&베이커리 전문 교육센터', highlight: true },

    // 3. 글로벌 & 해외 레퍼런스 (aT 및 글로벌 대기업 프로젝트)
    { id: 26, region: '해외', category: 'global', brand: '미국 샌디에이고 일식레스토랑 ‘스시맨’', location: '미국 San Diego', role: '설계, 감리', type: '미국 현지 프리미엄 일식', highlight: true },
    { id: 27, region: '해외', category: 'global', brand: '미국 LA 한식레스토랑 디자인 컨설팅', location: '미국 Los Angeles', role: '디자인 컨설팅 (aT 한국농수산식품유통공사)', type: 'K-FOOD 글로벌화 정부 프로젝트', highlight: true },
    { id: 28, region: '해외', category: 'global', brand: '프랑스 파리 한식레스토랑 디자인 컨설팅 (3개년 연속)', location: '프랑스 Paris', role: '디자인 컨설팅 (2012, 2013, 2014 aT)', type: '유럽 거점 K-다이닝 표준화', highlight: true },
    { id: 29, region: '해외', category: 'global', brand: '호주 브리즈번 한식레스토랑 ‘미담’', location: '호주 Brisbane', role: '설계, 감리', type: '호주 현지 모던 한식', highlight: true },
    { id: 30, region: '해외', category: 'global', brand: '중국 심양 한식레스토랑 ‘진지’ (SK네트웍스)', location: '중국 심양시', role: '설계, 감리', type: '대기업 글로벌 외식 프로젝트', highlight: true },
    { id: 31, region: '해외', category: 'global', brand: '중국 대련 한식레스토랑 디자인 컨설팅', location: '중국 대련시', role: '디자인 컨설팅 (2015 aT)', type: '정부 글로벌화 지원사업', highlight: false },
    { id: 32, region: '해외', category: 'global', brand: '중국 위해 한식당 ‘통삼왕’', location: '중국 위해시', role: '설계, 감리', type: '대형 한식구이 전문관', highlight: false },
    { id: 33, region: '해외', category: 'global', brand: '중국 연길 ‘백옥꿸성’ 본점 (1,2층 전관)', location: '중국 연길시', role: '설계, 감리', type: '현지 랜드마크 외식공간', highlight: true },
    { id: 34, region: '해외', category: 'global', brand: '중국 대련 ‘Molinary coffee’ (대련세계무역센터)', location: '중국 대련시', role: '설계, 감리', type: '랜드마크 빌딩 스페셜티 카페', highlight: false },
    { id: 35, region: '해외', category: 'global', brand: '중국 청도 한식레스토랑 ‘청계천’ (신복성찬음유한공사)', location: '중국 청도시', role: '설계, 감리', type: '합작 외식 기업 프로젝트', highlight: false },
    { id: 36, region: '해외', category: 'global', brand: '중국 청도 ‘이매방 cafe & hairshop’ (이토킨백화점)', location: '중국 청도시', role: '설계, 감리', type: '백화점 입점 뷰티&F&B 복합공간', highlight: false },
    { id: 37, region: '해외', category: 'global', brand: '중국 북경 ‘스트라다커피’ (대학성)', location: '중국 북경시', role: '설계, 감리', type: '대학가 트렌디 카페', highlight: false },
    { id: 38, region: '해외', category: 'global', brand: '중국 심양 한식레스토랑 ‘대장금’ (상업백화점)', location: '중국 심양시', role: '설계, 감리', type: '쇼핑몰 대표 한식 다이닝', highlight: false },
    { id: 39, region: '해외', category: 'global', brand: '중국 심양 분식카페 ‘야래야’ (SK빌딩)', location: '중국 심양시', role: '설계, 감리', type: '오피스 타워 F&B 스페이스', highlight: false },
    { id: 40, region: '해외', category: 'global', brand: '중국 합비 한식레스토랑 ‘청와대’', location: '중국 합비시', role: '설계, 감리', type: '대형 프리미엄 한식당', highlight: false },
    { id: 41, region: '해외', category: 'global', brand: '중국 이우 한식레스토랑 ‘천하일품’', location: '중국 이우시', role: '디자인 컨설팅', type: '글로벌 무역도시 한식 거점', highlight: false },
    { id: 42, region: '해외', category: 'global', brand: '중국 장가계 복합문화공간 (군진그룹)', location: '중국 장가계', role: '디자인 컨설팅', type: '관광 리조트 복합 F&B 컬처스페이스', highlight: true },
    { id: 43, region: '해외', category: 'global', brand: '중국 연길 연변대학교 내 ‘한식푸드카페’', location: '중국 연길시', role: '설계', type: '캠퍼스 내 식문화 공간', highlight: false },

    // 4. 프랜차이즈 & 일식/세계요리 & 트렌드 다이닝
    { id: 44, region: '국내', category: 'franchise', brand: '태국레스토랑 ‘살라타이’ 프랜차이즈 목동점', location: '서울 목동', role: '설계, 감리', type: '에스닉 다이닝 프랜차이즈', highlight: true },
    { id: 45, region: '국내', category: 'franchise', brand: '태국레스토랑 ‘살라타이’ 부천점', location: '경기 부천', role: '설계, 감리', type: '에스닉 다이닝 프랜차이즈', highlight: false },
    { id: 46, region: '국내', category: 'franchise', brand: '태국레스토랑 ‘살라타이’ 미아점', location: '서울 미아', role: '설계, 감리', type: '에스닉 다이닝 프랜차이즈', highlight: false },
    { id: 47, region: '국내', category: 'franchise', brand: '태국레스토랑 ‘살라타이’ 신촌점', location: '서울 신촌', role: '설계, 감리', type: '에스닉 다이닝 프랜차이즈', highlight: false },
    { id: 48, region: '국내', category: 'franchise', brand: '명란명가 서면점', location: '부산 서면', role: '설계, 감리', type: '명란 전문 특화 외식 브랜드', highlight: true },
    { id: 49, region: '국내', category: 'franchise', brand: '명란명가 롯데백화점 광복점', location: '부산 광복동', role: '설계, 감리', type: '백화점 프리미엄 식품관 입점', highlight: true },
    { id: 50, region: '국내', category: 'franchise', brand: '수제버거전문점 ‘댈리랩’ 대흥점', location: '대전 대흥동', role: '설계, 감리', type: '수제버거 프랜차이즈 모델', highlight: false },
    { id: 51, region: '국내', category: 'world', brand: '미국식 수제버거하우스 ‘B-24’', location: '서울 압구정', role: '설계, 감리', type: '압구정 로데오 핫플레이스', highlight: true },
    { id: 52, region: '국내', category: 'world', brand: '회전스시전문점 ‘쇼젠’ (애경백화점 직영)', location: '서울 구로', role: '설계', type: '백화점 직영 일식 스시', highlight: true },
    { id: 53, region: '국내', category: 'world', brand: '일식레스토랑 ‘이즈모’ 구로디지털점', location: '서울 구로', role: '설계, 감리', type: '오피스타운 일식 다이닝', highlight: false },
    { id: 54, region: '국내', category: 'world', brand: '일식레스토랑 ‘삼호복집’', location: '서울 잠원동', role: '설계, 감리', type: '전통 복요리 전문 일식당', highlight: true },
    { id: 55, region: '국내', category: 'world', brand: '클럽식 이자카야 ‘블루케찹’', location: '서울 강남역', role: '설계, 감리', type: '감성 인터랙티브 미디어 다이닝', highlight: true },
    { id: 56, region: '국내', category: 'world', brand: '이자카야 ‘오타루노 몽’', location: '서울 장안동', role: '설계, 감리', type: '정통 홋카이도 스타일 이자카야', highlight: false },
    { id: 57, region: '국내', category: 'world', brand: '레스토랑 ‘후레쉬빌’', location: '서울 대치동', role: '설계', type: '대치동 학원가 대표 경양식', highlight: false },
    { id: 58, region: '국내', category: 'world', brand: '씨푸드 레스토랑 ‘BAY SEAFOOD’', location: '부산', role: '설계', type: '오션뷰 해산물 뷔페 다이닝', highlight: false },
    { id: 59, region: '국내', category: 'world', brand: '돈가스전문점 ‘다비비’', location: '서울 서교동(홍대)', role: '설계, 감리', type: '홍대 감성 프리미엄 카츠', highlight: false },
    { id: 60, region: '국내', category: 'world', brand: '이탈리안 레스토랑 ‘휴앤’', location: '서울 한남동', role: '설계, 감리', type: '한남동 감성 이탈리안 비스트로', highlight: true },

    // 5. 카페 & 베이커리 & 바
    { id: 61, region: '국내', category: 'cafe', brand: '라피스라줄리 카페 서면점', location: '부산 서면', role: '설계, 감리', type: '보석 테마 프리미엄 디저트 카페', highlight: true },
    { id: 62, region: '국내', category: 'cafe', brand: '카페 ‘보볼리’', location: '서울 대치동', role: '설계, 감리', type: '유러피안 가든 카페', highlight: false },
    { id: 63, region: '국내', category: 'cafe', brand: '카페 ‘티어블 시즌스’', location: '서울 신촌', role: '설계', type: '티&베이커리 전문 공간', highlight: false },
    { id: 64, region: '국내', category: 'cafe', brand: '카페 ‘디즈앤댓’', location: '서울 양재동', role: '설계, 감리', type: '양재천 브런치 카페', highlight: false },
    { id: 65, region: '국내', category: 'cafe', brand: '커피마루', location: '경기 산본', role: '설계, 감리', type: '로스터리 원두 전문점', highlight: false },
    { id: 66, region: '국내', category: 'cafe', brand: '레스카페 ‘레모니’', location: '서울 역삼', role: '설계, 감리', type: '테라스 다이닝 카페', highlight: false },
    { id: 67, region: '국내', category: 'cafe', brand: '스무디 카페 ‘허브’', location: '서울 명동', role: '설계, 감리', type: '명동 메인로드 웰빙 음료 바', highlight: false },
  ];

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
              <span>외식경영 & 공간전략 권위자</span>
              <span className="text-[#1E5D3B] underline decoration-[#85CFAB] decoration-4">진익준 교수</span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 font-medium mt-1.5 leading-relaxed">
              사단법인 한국외식창업교육원 교육분과이사 / 비엑스디(BXD) 대표 / 청운대·세종사이버대 외래교수
            </p>
          </div>

          {/* Quick CTA Action */}
          <button
            onClick={() => onConsultClick && onConsultClick('진익준 교수 1:1 창업 컨설팅')}
            className="px-6 py-3 bg-[#2B7752] hover:bg-[#236344] text-white font-black text-sm rounded-2xl shadow-md transition-all flex items-center gap-2 shrink-0 cursor-pointer border border-[#85CFAB]"
          >
            <span>진익준 교수 1:1 컨설팅 문의</span>
            <ChevronRight className="w-4 h-4 text-[#A7F3D0]" />
          </button>
        </div>

        {/* 3 Major Sub-Tabs Switcher (진익준교수 소개 프로필 / 사례예시 프랜차이즈 사례 / 외식 컨설팅 FAQ) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6">
          <button
            onClick={() => setActiveSubTab('profile')}
            className={`flex items-center justify-center gap-2.5 py-4 px-4 rounded-2xl font-black text-sm sm:text-base transition-all cursor-pointer border-2 ${
              activeSubTab === 'profile'
                ? 'bg-[#2B7752] text-white border-[#2B7752] shadow-md'
                : 'bg-stone-50 text-gray-700 border-stone-200 hover:border-[#34885E] hover:bg-stone-100'
            }`}
          >
            <GraduationCap className={`w-5 h-5 ${activeSubTab === 'profile' ? 'text-[#A7F3D0]' : 'text-gray-400'}`} />
            <span>소개 프로필</span>
          </button>

          <button
            onClick={() => setActiveSubTab('references')}
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
            onClick={() => setActiveSubTab('faq')}
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
        <div className="w-full bg-[#FAF9F5] rounded-3xl border border-[#E7E3DA] p-6 sm:p-12 lg:p-16 text-stone-900 shadow-sm animate-fadeIn">
          {/* 1. Top Header Bar */}
          <div className="flex items-center justify-between text-xs sm:text-sm text-stone-600 font-medium pb-4 border-b border-[#E5E1D8]">
            <span>한국외식창업교육원</span>
            <span className="tracking-[0.25em] text-stone-400 font-semibold text-xs uppercase">
              EXPERT PROFILE
            </span>
          </div>

          {/* 2. Main Hero Split: Left Info + Right Portrait Photo */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start pt-8 sm:pt-10 pb-6 sm:pb-8">
            {/* Left Content */}
            <div className="lg:col-span-7 xl:col-span-8 space-y-5 sm:space-y-6">
              {/* Category Eyebrow */}
              <div className="text-[#2F6B55] font-semibold text-sm sm:text-base tracking-tight">
                <EditableText
                  path="jinIkjun.category"
                  value={jinData.category || "외식경영 · 공간전략 전문가"}
                />
              </div>

              {/* Big Bold Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-stone-900 leading-[1.28] tracking-tight whitespace-pre-line">
                <EditableText
                  multiline
                  path="jinIkjun.headline"
                  value={jinData.headline || "외식 공간을 설계하고,\n경영의 방향을 제안합니다."}
                />
              </h1>

              {/* Name & English Name */}
              <div className="pt-1 flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-bold text-stone-900">
                  <EditableText
                    path="jinIkjun.name"
                    value={jinData.name || "진익준"}
                  />
                </span>
                <span className="text-xs sm:text-sm font-semibold text-stone-400 tracking-[0.22em] uppercase">
                  <EditableText
                    path="jinIkjun.engName"
                    value={jinData.engName || "JIN IK JUN"}
                  />
                </span>
              </div>

              {/* Title / Role */}
              <p className="text-base sm:text-lg font-medium text-stone-700">
                <EditableText
                  path="jinIkjun.role"
                  value={jinData.role || "비엑스디(BXD) 대표 · 교육분과이사"}
                />
              </p>

              {/* Summary Description */}
              <p className="text-stone-600 text-sm sm:text-base leading-relaxed max-w-2xl whitespace-pre-line">
                <EditableText
                  multiline
                  path="jinIkjun.bio"
                  value={jinData.bio || "상권 입지부터 주방 설계, 브랜드 콘셉트와 고객 경험까지.\n20여 년의 현장 경험을 바탕으로 외식 공간을 설계합니다."}
                />
              </p>
            </div>

            {/* Right Column: Portrait Photo with Amber/Yellow Background */}
            <div className="lg:col-span-5 xl:col-span-4 flex flex-col items-center sm:items-start lg:items-end">
              <div className="w-full max-w-[280px] sm:max-w-[320px] aspect-square overflow-hidden rounded-xs border border-stone-200/80 shadow-xs bg-[#E5A01E]">
                <EditableImage
                  path="jinIkjun.image"
                  src={jinData.image || "/images/faculty/jin_ikjun_expert.png"}
                  alt="진익준 교수"
                  className="w-full h-full"
                  imageClassName="w-full h-full object-cover"
                />
              </div>
              <p className="w-full max-w-[280px] sm:max-w-[320px] text-xs sm:text-sm text-stone-500 mt-2.5 text-center sm:text-left">
                <EditableText
                  path="jinIkjun.caption"
                  value={jinData.caption || "공간과 경영을 함께 바라보는 전문가"}
                />
              </p>
            </div>
          </div>

          {/* 3. Horizontal Core Focus / Keyword Tags Bar */}
          <div className="border-y border-[#E5E1D8] py-4 sm:py-5 my-6 sm:my-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 text-stone-800 text-sm sm:text-base font-medium text-center sm:text-left">
              <div>상권·입지 분석</div>
              <div>3D 주방 설계</div>
              <div>브랜드 콘셉트</div>
              <div>고객 경험 디자인</div>
            </div>
          </div>

          {/* 4. Two-Column Careers & Activities */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14 py-4 sm:py-6">
            {/* Left: 교육 및 학술 */}
            <div className="space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-stone-900">교육 및 학술</h2>
              <ul className="space-y-3 text-sm sm:text-base text-stone-800">
                <li className="flex items-center gap-3">
                  <span className="text-[#2F6B55] font-semibold text-xs sm:text-sm shrink-0">현재</span>
                  <span>청운대학교 외래교수</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-[#2F6B55] font-semibold text-xs sm:text-sm shrink-0">현재</span>
                  <span>세종사이버대학교 외래교수</span>
                </li>
              </ul>

              <button
                type="button"
                onClick={() => setShowMoreEdu(!showMoreEdu)}
                className="text-stone-500 hover:text-stone-900 text-xs sm:text-sm font-medium flex items-center gap-1.5 pt-2 transition cursor-pointer"
              >
                <span>{showMoreEdu ? '▼ 교육 경력 접기' : '▶ 그 외 교육 경력 보기'}</span>
              </button>

              {showMoreEdu && (
                <div className="pt-2 pl-3 space-y-2 text-xs sm:text-sm text-stone-600 border-l-2 border-[#2F6B55]/30 animate-fadeIn">
                  <p>충청대학교 외식조리경영학과 외래교수</p>
                  <p>혜전대학교 호텔조리외식계열 외래교수</p>
                  <p>한양사이버대학교 경영학부 외식프랜차이즈경영학과 강사</p>
                  <p>경기대학교 서비스경영전문대학원 외식경영전공 외래교수</p>
                  <p>세종대학교 일반대학원 조리외식경영학 박사수료</p>
                  <p>홍익대학교 건축도시대학원 실내설계 석사</p>
                </div>
              )}
            </div>

            {/* Right: 공직 및 협회 활동 */}
            <div className="space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-stone-900">공직 및 협회 활동</h2>
              <ul className="space-y-3 text-sm sm:text-base text-stone-800">
                <li className="flex items-center gap-3">
                  <span className="text-[#2F6B55] font-semibold text-xs sm:text-sm shrink-0">현재</span>
                  <span>한국외식창업교육원 교육분과이사</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-[#2F6B55] font-semibold text-xs sm:text-sm shrink-0">현재</span>
                  <span>국가보훈처 자문위원</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-[#2F6B55] font-semibold text-xs sm:text-sm shrink-0">현재</span>
                  <span>한국외식경영학회 부회장</span>
                </li>
              </ul>

              <button
                type="button"
                onClick={() => setShowMorePublic(!showMorePublic)}
                className="text-stone-500 hover:text-stone-900 text-xs sm:text-sm font-medium flex items-center gap-1.5 pt-2 transition cursor-pointer"
              >
                <span>{showMorePublic ? '▼ 전체 활동 접기' : '▶ 전체 활동 보기'}</span>
              </button>

              {showMorePublic && (
                <div className="pt-2 pl-3 space-y-2 text-xs sm:text-sm text-stone-600 border-l-2 border-[#2F6B55]/30 animate-fadeIn">
                  <p>(사)한국전통주학회 부회장</p>
                  <p>(사)한국외식업중앙회 신규영업자교육 교수</p>
                  <p>(사)한국외식창업교육원 상권분석 및 공간기획 수석자문위원</p>
                  <p>중소벤처기업부·소상공인시장진흥공단 소상공인 전문컨설턴트</p>
                  <p>aT 한국농수산식품유통공사 해외 한식당 경쟁력 강화 디자인 컨설턴트 (미국, 프랑스, 중국 등)</p>
                  <p>(주)한솔요리학원 고문 및 공간설계 총괄</p>
                </div>
              )}
            </div>
          </div>

          {/* 5. Divider Line */}
          <div className="border-t border-[#E5E1D8] my-6 sm:my-8" />

          {/* 6. 글로 전하는 외식경영 인사이트 */}
          <div className="space-y-3 py-2">
            <h2 className="text-lg sm:text-xl font-bold text-stone-900">글로 전하는 외식경영 인사이트</h2>
            <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
              식품저널 · 월간 음식과사람 · 매일경제신문 · 월간 호텔&레스토랑
            </p>

            <button
              type="button"
              onClick={() => setShowMoreMedia(!showMoreMedia)}
              className="text-stone-500 hover:text-stone-900 text-xs sm:text-sm font-medium flex items-center gap-1.5 pt-1 transition cursor-pointer"
            >
              <span>{showMoreMedia ? '▼ 전체 기고 매체 및 저서 접기' : '▶ 전체 기고 매체 보기'}</span>
            </button>

            {showMoreMedia && (
              <div className="pt-3 pl-3 space-y-3 text-xs sm:text-sm text-stone-600 border-l-2 border-[#2F6B55]/30 animate-fadeIn">
                <div>
                  <h3 className="font-bold text-stone-800 mb-1">정기 언론 & 전문지 기고 칼럼</h3>
                  <p className="text-stone-600">
                    글로벌 외식정보 논설위원, 월간 외식경영, 월간 창업&프랜차이즈, 월간 뚝배기, 매일경제신문, 창업경영신문, 월간 주류저널, 포털 야후 등 11개 유력 전문 매체 정기 칼럼니스트
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-stone-800 mb-1">대표 출간 저서</h3>
                  <ul className="list-disc list-inside space-y-1 text-stone-600">
                    <li>『푸드테크 주방경영 시스템』 (비엑스디, 2026)</li>
                    <li>『그래서, 어디서 가게 열 건데요』 (비엑스디, 2026)</li>
                    <li>『창업성공의 인테리어 디자인 전략』 (크라운출판사)</li>
                    <li>『외식업 성공지침서』 (백산출판사)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-stone-800 mb-1">주요 학술 연구 논문</h3>
                  <ul className="list-disc list-inside space-y-1 text-stone-600">
                    <li>소비가치에 따른 밀레니얼세대 카페 소비자 세분화에 관한 연구 (외식경영연구)</li>
                    <li>외식창업자의 지식이 외식업종 선택 및 공간디자인 결정에 미치는 영향 (한국실내디자인학회)</li>
                    <li>Q방법론에 의한 레스토랑 이용자의 실내디자인 선호유형에 관한 연구 (외식경영학회)</li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* 7. Divider Line */}
          <div className="border-t border-[#E5E1D8] my-6 sm:my-8" />

          {/* 8. Bottom Inquiry Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
            <div className="text-stone-800 font-medium text-sm sm:text-base">
              강의 · 컨설팅 문의
            </div>
            <div className="flex flex-wrap items-center gap-5 sm:gap-7 text-sm sm:text-base font-medium text-[#2F6B55]">
              <a
                href={`mailto:${jinData.email || 'ikjunjin@naver.com'}`}
                className="hover:underline flex items-center gap-1 group"
              >
                <span>
                  <EditableText path="jinIkjun.email" value={jinData.email || "ikjunjin@naver.com"} />
                </span>
                <span className="text-xs transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
              </a>
              <a
                href={`tel:${(jinData.phone || '010-8563-8440').replace(/[^0-9]/g, '')}`}
                className="hover:underline"
              >
                <EditableText path="jinIkjun.phone" value={jinData.phone || "010-8563-8440"} />
              </a>

              {onConsultClick && (
                <button
                  type="button"
                  onClick={() => onConsultClick('진익준 교수 1:1 외식 컨설팅 신청')}
                  className="px-4 py-1.5 rounded-full bg-[#2F6B55] hover:bg-[#235341] text-white text-xs font-semibold shadow-xs transition active:scale-95 cursor-pointer ml-auto sm:ml-0"
                >
                  1:1 상담 신청
                </button>
              )}
            </div>
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
