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
  FileText
} from 'lucide-react';

export default function JinIkjunProfileSection({ onConsultClick }) {
  // Sub-tabs: 'profile' (진익준교수 소개 프로필) | 'references' (진익준교수 사례예시 프렌차이즈 사례)
  const [activeSubTab, setActiveSubTab] = useState('profile');
  const [refCategory, setRefCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

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
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#0B3C26] shadow-xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b-2 border-stone-200">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A059]/20 border border-[#C5A059]/40 text-[#0B3C26] text-xs font-black mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>KFSSEC MASTER FACULTY & STARTUP STRATEGY</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight flex items-center gap-2">
              <span>외식경영 & 공간전략 권위자</span>
              <span className="text-[#0B3C26] underline decoration-[#C5A059] decoration-4">진익준 교수</span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 font-medium mt-1.5 leading-relaxed">
              사단법인 한국외식창업교육원 교육분과이사 / 비엑스디(BXD) 대표 / 청운대·세종사이버대 외래교수
            </p>
          </div>

          {/* Quick CTA Action */}
          <button
            onClick={() => onConsultClick && onConsultClick('진익준 교수 1:1 창업 컨설팅')}
            className="px-6 py-3 bg-[#0B3C26] hover:bg-[#072819] text-white font-black text-sm rounded-2xl shadow-lg transition-all flex items-center gap-2 shrink-0 cursor-pointer border border-[#C5A059]"
          >
            <span>진익준 교수 1:1 컨설팅 문의</span>
            <ChevronRight className="w-4 h-4 text-[#D4AF37]" />
          </button>
        </div>

        {/* 2 Major Sub-Tabs Switcher (진익준교수 소개 프로필 / 진익준교수 사례예시 프렌차이즈 사례) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-6">
          <button
            onClick={() => setActiveSubTab('profile')}
            className={`flex items-center justify-center gap-3 py-4 px-6 rounded-2xl font-black text-sm sm:text-base transition-all cursor-pointer border-2 ${
              activeSubTab === 'profile'
                ? 'bg-[#0B3C26] text-white border-[#0B3C26] shadow-md'
                : 'bg-stone-50 text-gray-700 border-stone-200 hover:border-[#0B3C26] hover:bg-stone-100'
            }`}
          >
            <GraduationCap className={`w-5 h-5 ${activeSubTab === 'profile' ? 'text-[#D4AF37]' : 'text-gray-400'}`} />
            <span>진익준교수 소개 프로필</span>
          </button>

          <button
            onClick={() => setActiveSubTab('references')}
            className={`flex items-center justify-center gap-3 py-4 px-6 rounded-2xl font-black text-sm sm:text-base transition-all cursor-pointer border-2 ${
              activeSubTab === 'references'
                ? 'bg-[#0B3C26] text-white border-[#0B3C26] shadow-md'
                : 'bg-stone-50 text-gray-700 border-stone-200 hover:border-[#0B3C26] hover:bg-stone-100'
            }`}
          >
            <Store className={`w-5 h-5 ${activeSubTab === 'references' ? 'text-[#D4AF37]' : 'text-gray-400'}`} />
            <div className="flex items-center gap-2">
              <span>진익준교수 사례예시 프렌차이즈 사례</span>
              <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                activeSubTab === 'references' ? 'bg-[#C5A059] text-gray-950' : 'bg-gray-200 text-gray-700'
              }`}>
                100+ 건
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* VIEW 1: 진익준교수 소개 프로필 (PROFILE)                                */}
      {/* ========================================================================= */}
      {activeSubTab === 'profile' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Main Visual Profile Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-stone-200 shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Official Profile Photo & QR Links */}
              <div className="lg:col-span-4 flex flex-col items-center text-center space-y-4">
                <div className="relative group w-full max-w-[280px] rounded-3xl overflow-hidden shadow-2xl border-4 border-[#0B3C26]/20 bg-amber-50">
                  <img
                    src="/images/faculty/jin_ikjun_profile.png"
                    alt="진익준 교수 공식 프로필"
                    className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#0B3C26] text-white text-[11px] font-black px-2.5 py-1 rounded-full border border-[#C5A059]">
                    KFSSEC 교육분과이사
                  </div>
                </div>

                <div className="w-full max-w-[280px] bg-stone-50 rounded-2xl p-4 border border-stone-200 space-y-2 text-left text-xs">
                  <div className="flex items-center gap-2 text-gray-700 font-bold">
                    <Mail className="w-4 h-4 text-[#0B3C26] shrink-0" />
                    <span className="truncate">ikjunjin@naver.com</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700 font-bold">
                    <Phone className="w-4 h-4 text-[#0B3C26] shrink-0" />
                    <span>010-8563-8440</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700 font-bold pt-1 border-t border-stone-200">
                    <Building className="w-4 h-4 text-[#C5A059] shrink-0" />
                    <span className="truncate">비엑스디(BXD) 대표</span>
                  </div>
                </div>

                {/* QR Codes for Direct Column/SNS Reading */}
                <div className="w-full max-w-[280px] bg-stone-50 rounded-2xl p-4 border border-stone-200 space-y-2">
                  <span className="text-[11px] font-black text-gray-500 block uppercase tracking-wider">
                    공식 칼럼 & 모바일 연결 QR
                  </span>
                  <div className="rounded-xl overflow-hidden border border-stone-200 shadow-inner bg-white p-1">
                    <img
                      src="/images/faculty/jin_ikjun_qr.png"
                      alt="진익준 교수 칼럼 및 네이버 블로그 QR"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Right Column: Detailed Biography & Academic Roles */}
              <div className="lg:col-span-8 space-y-6">
                <div>
                  <span className="text-xs font-black text-[#C5A059] tracking-widest uppercase">PROFILE & EXPERTISE</span>
                  <h3 className="text-3xl font-black text-gray-950 mt-1">
                    진 익 준 <span className="text-lg font-bold text-gray-500">/ JIN IK JUN</span>
                  </h3>
                  <p className="text-sm font-bold text-[#0B3C26] mt-1">
                    現 비엑스디 대표 (외식경영 및 공간전략 기획 컨설팅 / 외식관련 도서 출판사)
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
                    상권 입지 분석부터 3D 주방 설계, 브랜드 콘셉트, 고객 경험 디자인(CX)까지 외식 공간의 모든 것을 과학적 데이터와 20여 년의 현장 실전 노하우로 설계하는 대한민국 대표 외식 경영 컨설턴트입니다.
                  </p>
                </div>

                {/* Academic & Professional Affiliations Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Faculty Appointments */}
                  <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 space-y-2.5">
                    <div className="flex items-center gap-2 text-xs font-black text-[#0B3C26] border-b border-stone-200 pb-1.5">
                      <GraduationCap className="w-4 h-4 text-[#C5A059]" />
                      <span>외래교수 및 학술 직책</span>
                    </div>
                    <ul className="text-xs space-y-1.5 text-gray-700 font-medium">
                      <li className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0B3C26] shrink-0 mt-0.5" />
                        <span><strong>現 청운대학교</strong> 외래교수</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0B3C26] shrink-0 mt-0.5" />
                        <span><strong>現 세종사이버대학교</strong> 외래교수</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-gray-400 shrink-0 mt-0.5" />
                        <span>경기대학교 외래교수</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-gray-400 shrink-0 mt-0.5" />
                        <span>한양사이버대학교 MBA 외래교수</span>
                      </li>
                    </ul>
                  </div>

                  {/* Public & Corporate Advisory */}
                  <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 space-y-2.5">
                    <div className="flex items-center gap-2 text-xs font-black text-[#0B3C26] border-b border-stone-200 pb-1.5">
                      <Award className="w-4 h-4 text-[#C5A059]" />
                      <span>공직 및 협회 임원</span>
                    </div>
                    <ul className="text-xs space-y-1.5 text-gray-700 font-medium">
                      <li className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0B3C26] shrink-0 mt-0.5" />
                        <span><strong>現 (사)한국외식창업교육원</strong> 교육분과이사</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0B3C26] shrink-0 mt-0.5" />
                        <span><strong>現 국가보훈처</strong> 자문위원</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0B3C26] shrink-0 mt-0.5" />
                        <span><strong>現 (사)한국외식경영학회</strong> 부회장</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0B3C26] shrink-0 mt-0.5" />
                        <span><strong>現 (사)한국전통주학회</strong> 부회장</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0B3C26] shrink-0 mt-0.5" />
                        <span><strong>現 (사)한국외식업중앙회</strong> 신규영업자교육 교수</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-gray-500 shrink-0 mt-0.5" />
                        <span>(주)한솔요리학원 고문</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Columnist & Media Articles */}
                <div className="bg-amber-50/60 rounded-2xl p-5 border border-amber-200 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-black text-amber-950">
                    <Newspaper className="w-4 h-4 text-[#C5A059]" />
                    <span>전문지 및 유력 언론 칼럼니스트 활동</span>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs">
                    {[
                      '식품저널 칼럼니스트',
                      '월간 음식과사람 칼럼니스트',
                      '글로벌 외식정보 논설위원',
                      '월간 외식경영 칼럼니스트',
                      '월간 호텔&레스토랑 칼럼니스트',
                      '월간 창업&프랜차이즈 칼럼니스트',
                      '월간 뚝배기 칼럼니스트',
                      '매일경제신문 칼럼니스트',
                      '창업경영신문 칼럼니스트',
                      '월간 주류저널 칼럼니스트',
                      '포털 야후 칼럼니스트',
                    ].map((col, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 bg-white border border-amber-200 rounded-lg text-gray-800 font-bold shadow-2xs"
                      >
                        {col}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section: Books & Academic Theses */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-stone-200 shadow-lg space-y-6">
            <div className="flex items-center gap-2 border-b-2 border-stone-200 pb-4">
              <BookOpen className="w-6 h-6 text-[#0B3C26]" />
              <h4 className="text-xl sm:text-2xl font-black text-gray-950">저서(著書) 및 학술 연구 논문</h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Major Books */}
              <div className="space-y-4">
                <span className="text-xs font-black text-[#0B3C26] uppercase tracking-wider block">
                  MAJOR PUBLICATIONS (대표 출간 저서)
                </span>
                <div className="space-y-3">
                  {[
                    { title: '푸드테크 주방경영 시스템', publisher: '비엑스디 (2026)', desc: 'AI·로봇 자동화 및 최적 주방 동선 혁신 가이드' },
                    { title: '그래서, 어디서 가게 열 건데요', publisher: '비엑스디 (2026)', desc: '빅데이터 기반 외식 상권분석 및 입지 선정 바이블' },
                    { title: '창업성공의 인테리어 디자인 전략', publisher: '크라운출판사 (2008 / 2010)', desc: '매출을 극대화하는 외식 공간 기획의 정석' },
                    { title: '외식업 성공지침서', publisher: '백산출판사 (2009)', desc: '예비창업자와 점포 경영자를 위한 실전 솔루션' },
                  ].map((book, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-stone-50 border border-stone-200 hover:border-[#0B3C26] transition-all">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-md">
                          {book.publisher}
                        </span>
                      </div>
                      <h5 className="text-base font-black text-gray-950 mt-1.5">{book.title}</h5>
                      <p className="text-xs text-gray-600 font-medium mt-1">{book.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Research Papers */}
              <div className="space-y-4">
                <span className="text-xs font-black text-[#0B3C26] uppercase tracking-wider block">
                  ACADEMIC RESEARCH & PAPERS (학술 논문)
                </span>
                <div className="space-y-3">
                  {[
                    {
                      title: '소비가치에 따른 밀레니얼세대 카페 소비자 세분화에 관한 연구',
                      date: '2022.02.28',
                      journal: '외식경영연구',
                      desc: 'MZ세대 소비자 취향 및 공간 소비 행태에 따른 카페 브랜딩 전략'
                    },
                    {
                      title: '외식창업자의 지식이 외식업종(태) 선택 및 공간디자인 결정에 미치는 영향',
                      date: '2015.11',
                      journal: '한국실내디자인학회논문집',
                      desc: '창업자의 전문 지식이 매장 디자인 성공 및 생존율에 미치는 실증 분석'
                    },
                    {
                      title: 'Q방법론에 의한 레스토랑 이용자의 실내디자인 선호유형에 관한 연구',
                      date: '2014.02',
                      journal: '외식경영학회',
                      desc: '고객 심리와 감성 반응을 반영한 맞춤형 인테리어 선호 유형 분석'
                    },
                  ].map((paper, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-stone-50 border border-stone-200 hover:border-[#C5A059] transition-all">
                      <span className="text-[11px] font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded-md">
                        {paper.date} | {paper.journal}
                      </span>
                      <h5 className="text-sm font-black text-gray-950 mt-1.5 leading-snug">{paper.title}</h5>
                      <p className="text-xs text-gray-600 font-medium mt-1">{paper.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Section: Universities & Government Lectures (출강 이력) */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-stone-200 shadow-lg space-y-6">
            <div className="flex items-center gap-2 border-b-2 border-stone-200 pb-4">
              <Briefcase className="w-6 h-6 text-[#0B3C26]" />
              <h4 className="text-xl sm:text-2xl font-black text-gray-950">대학 최고경영자과정 및 사회단체 출강 이력</h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: '연세대학교', prog: '‘외식산업최고경영자과정’ 강사' },
                { title: '중앙대학교', prog: '‘외식산업경영자과정’ 강사' },
                { title: '강남구-중앙대학교', prog: '‘외식최고경영자과정’ 강사' },
                { title: '서초구-중앙대학교', prog: '‘외식최고경영자과정’ 강사' },
                { title: '경희대학교', prog: '‘프랜차이즈최고경영자과정’ 강사' },
                { title: '숭실대학교', prog: '‘한식글로벌 전문MBA과정’ 강사' },
                { title: '동아대학교', prog: '‘외식산업 최고경영자과정’ 강사' },
                { title: '공주대학교', prog: '‘식품프랜차이즈 전문경영자과정’ 강사' },
                { title: '영산대학교', prog: '‘외식산업경영개선과정’ 강사' },
                { title: '대구가톨릭대학교', prog: '‘외식최고경영자과정’ 강사' },
                { title: '인제대학교 / 부경대학교', prog: '‘외식최고경영자과정’ 강사' },
                { title: '중국 연변대학교', prog: '‘외식최고위과정’ 강사' },
                { title: '숙명여자대학교 대학원', prog: '르 꼬르동 블루(Le Cordon Bleu) 특강' },
                { title: '서울특별시', prog: '하이서울 실전창업스쿨 강사' },
                { title: '한국프랜차이즈산업협회', prog: '상업공간 인테리어 전문과정 담임강사' },
                { title: '중소기업청·소상공인진흥원', prog: '‘자영업컨설턴트 등록과정’ 교재개발 및 강사' },
                { title: '매일경제신문', prog: '실전창업아카데미 외식공간 강사' },
                { title: '외식업중앙회 경기지회', prog: '신규영업자 위생교육 및 경영개선 강사' },
              ].map((item, idx) => (
                <div key={idx} className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                  <div className="font-black text-xs text-[#0B3C26]">{item.title}</div>
                  <div className="text-xs text-gray-700 font-medium mt-0.5">{item.prog}</div>
                </div>
              ))}
            </div>
            <div className="text-right text-xs text-gray-400 font-bold">이외 전국 주요 지자체 및 공공기관 출강 다수</div>
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
                <span className="text-xs font-black text-[#C5A059] uppercase tracking-wider block">
                  PROVEN PORTFOLIO & CLIENT CASES
                </span>
                <h3 className="text-2xl font-black text-gray-950 mt-1 flex items-center gap-2">
                  <span>진익준 교수 국내외 대표 컨설팅 & 프랜차이즈 사례</span>
                  <span className="text-xs bg-[#0B3C26] text-white font-black px-3 py-1 rounded-full">
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
                  className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0B3C26]"
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
                      ? 'bg-[#0B3C26] text-white shadow-md'
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
            <div className="bg-gradient-to-br from-stone-900 to-[#0B3C26] rounded-3xl p-6 text-white shadow-xl space-y-4">
              <span className="text-[11px] font-black tracking-widest text-[#D4AF37] uppercase bg-black/40 px-2.5 py-1 rounded-full border border-[#D4AF37]/30">
                REPRESENTATIVE SUCCESS CASE
              </span>
              <h4 className="text-xl font-black">이학갈비 & 이학농가 전 지점</h4>
              <p className="text-xs text-stone-300 leading-relaxed">
                인천 연수동 본점, 서울 면목동 사가정점, 군포 산본점, 시흥점, 김포 이학농가까지 초대형 한식 명가의 공간 기획 및 설계 감리를 총괄하였습니다.
              </p>
              <div className="pt-2 text-xs font-bold text-[#D4AF37] flex items-center gap-1">
                <span>동선 최적화 & 고객 회전율 극대화 설계</span>
              </div>
            </div>

            {/* Spotlight 2: 프랑스/미국 aT 글로벌 */}
            <div className="bg-gradient-to-br from-[#0B3C26] to-emerald-950 rounded-3xl p-6 text-white shadow-xl space-y-4">
              <span className="text-[11px] font-black tracking-widest text-[#D4AF37] uppercase bg-black/40 px-2.5 py-1 rounded-full border border-[#D4AF37]/30">
                GLOBAL K-FOOD CONSULTING
              </span>
              <h4 className="text-xl font-black">aT 파리·LA·대련 해외 컨설팅</h4>
              <p className="text-xs text-stone-300 leading-relaxed">
                한국농수산식품유통공사(aT) 주관 프랑스 파리지역 한식당 디자인 컨설팅(3개년 연속) 및 미국 LA, 중국 대련 한식당 표준화 모델 구축.
              </p>
              <div className="pt-2 text-xs font-bold text-[#D4AF37] flex items-center gap-1">
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
                    ? 'border-[#0B3C26] bg-emerald-50/20'
                    : 'border-stone-200 hover:border-stone-400'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-md ${
                      item.region === '해외'
                        ? 'bg-amber-100 text-amber-900 border border-amber-300'
                        : 'bg-emerald-100 text-[#0B3C26] border border-emerald-200'
                    }`}>
                      {item.region} | {item.role}
                    </span>
                    {item.highlight && (
                      <span className="text-[10px] font-black text-[#C5A059] flex items-center gap-0.5">
                        <Sparkles className="w-3 h-3" />
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
                  <span className="text-[11px] text-[#0B3C26] font-bold">완료</span>
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
    </div>
  );
}
