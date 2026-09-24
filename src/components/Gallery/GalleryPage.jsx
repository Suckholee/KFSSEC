import { useLanguage } from '../../i18n/LanguageContext';
import React, { useState } from 'react';
import SubSidebar from '../common/SubSidebar';
import ScrollReveal from '../common/ScrollReveal';
import {
  Image,
  Trophy,
  Award,
  Building2,
  UtensilsCrossed,
  Eye,
  Calendar,
  X,
  Search,
  Filter,
  CheckCircle2,
  Sparkles,
  Maximize2,
} from 'lucide-react';

export default function GalleryPage({ initialSubTab = 'all' }) {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState(initialSubTab || 'all');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const galleryCategories = [
    { id: 'all', label: t('전체 갤러리') },
    { id: 'competition', label: t('요리대회') },
    { id: 'ceremony', label: t('시상식 & 인증패') },
    { id: 'consulting', label: t('지자체 컨설팅') },
    { id: 'training', label: t('조리 실습 현장') },
  ];

  const galleryItems = [
    {
      id: 1,
      category: 'ceremony',
      categoryLabel: '시상식 & 인증패',
      title: '2026 대한민국 자랑스러운 외식 명인·명장 인물대상 시상식',
      date: '2026.08.30',
      location: '한국외식창업교육원 대강당',
      image: '/images/hero_bg.jpg',
      desc: '특급호텔 40년 현장 실무 경력의 조리 명장진과 열정적인 128명 수강생, 협회 임원진이 함께한 명인 인증서 수여식 및 공로패 시상 현장입니다.',
    },
    {
      id: 2,
      category: 'competition',
      categoryLabel: '요리대회',
      title: '제01회 K-FOOD 지역 특산물 연계 조리 경연대회 본선 현장',
      date: '2026.08.25',
      location: '교육원 조리 실습 1강의실',
      image: '/images/chef_tossing_food.jpg',
      desc: '전국 농수축산물 식자재를 현대적 감각으로 재해석한 창작 요리 경연으로, 심사위원단의 엄정한 실기 채점이 진행되었습니다.',
    },
    {
      id: 3,
      category: 'consulting',
      categoryLabel: '지자체 컨설팅',
      title: '강남구 및 전국 지자체 소상공인 외식창업 경영개선 현장 컨설팅',
      date: '2026.08.20',
      location: '강남구 소상공인 지원센터',
      image: '/images/course_menu_dev.jpg',
      desc: '진익준 교수를 비롯한 전문 컨설턴트가 골목상권 소상공인 매장을 직접 방문하여 상권분석 및 메뉴 표준화 솔루션을 제공했습니다.',
    },
    {
      id: 4,
      category: 'training',
      categoryLabel: '조리 실습 현장',
      title: '100년 전통 발효 소스 시그니처 갈비찜 실전 레시피 전수',
      date: '2026.08.15',
      location: '한식 마스터 실습실',
      image: '/images/course_restaurant.jpg',
      desc: '조리 명장이 직접 시연하는 전통 비법 소스와 육질 연화 테크닉, 업소용 대용량 조리 표준 매뉴얼을 전수하는 마스터클래스 실습 현장입니다.',
    },
    {
      id: 5,
      category: 'consulting',
      categoryLabel: '지자체 컨설팅',
      title: '경상남도 및 산청군 향토 약선음식 외식자원화 품평회',
      date: '2026.08.10',
      location: '지자체 특산물 R&D 센터',
      image: '/images/course_delivery.jpg',
      desc: '지역 농가와 외식 창업인의 상생을 위한 지자체 연계 프로젝트로, 약선 한방 식재료를 활용한 시제품 메뉴 품평 및 시식이 진행되었습니다.',
    },
    {
      id: 6,
      category: 'competition',
      categoryLabel: '요리대회',
      title: '청년 외식창업자 라이브 쿠킹 배틀 & 시그니처 메뉴 쇼케이스',
      date: '2026.07.28',
      location: '국제외식박람회 특설무대',
      image: '/images/course_net_1.jpg',
      desc: '창의적인 소자본 창업 아이템을 겨루는 청년 창업가 라이브 조리대회로 우수팀에게는 창업 지원금 및 협회장상이 수여되었습니다.',
    },
    {
      id: 7,
      category: 'ceremony',
      categoryLabel: '시상식 & 인증패',
      title: '10대 산학협력 가족기업 업무협약(MOU) 및 명예교수 위촉식',
      date: '2026.07.18',
      location: '교육원 컨벤션홀',
      image: '/images/chairman_ahn_real.jpg',
      desc: '(주)주방뱅크, (주)세진, ㈜자인 등 10대 공식 협력업체 대표단과 안형상 이사장이 참석한 산학협력 공식 조인식 현장입니다.',
    },
    {
      id: 8,
      category: 'training',
      categoryLabel: '조리 실습 현장',
      title: '스페셜티 카페 창업 & 에스프레소 추출 및 라떼아트 1:1 직강',
      date: '2026.07.05',
      location: '바리스타 & 베이커리 랩',
      image: '/images/course_cafe.jpg',
      desc: '상위 1% 스페셜티 원두 큐레이션부터 매장형 머신 관리, 테이크아웃 회전율 최적화 동선까지 실습하는 전문 바리스타 창업 수업 현장입니다.',
    },
  ];

  // Filtering
  const filteredItems = galleryItems.filter((item) => {
    const matchesCategory =
      activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      item.location.toLowerCase().includes(searchKeyword.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-gray-50 min-h-screen py-8 font-sans text-gray-900">
      <div className="w-full px-4 sm:px-8 lg:px-12 max-w-[1520px] mx-auto space-y-8">
        
        {/* Top Header Hero Banner */}
        <ScrollReveal direction="up" delay={0}>
          <div className="relative bg-[#0B3C26] text-white rounded-3xl p-6 sm:p-10 border-2 border-[#C5A059] shadow-xl overflow-hidden">
            <div className="relative z-10 max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#C5A059]/20 border border-[#C5A059]/40 text-[#D4AF37] text-xs font-black rounded-full">
                <Image className="w-3.5 h-3.5" />
                <span>KFSSEC OFFICIAL GALLERY</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight">
                현장의 열정과 영광의 순간, <br className="hidden sm:inline" />
                <span className="text-[#D4AF37]">한국외식창업교육원 갤러리</span>
              </h1>
              <p className="text-xs sm:text-sm text-emerald-100/90 font-medium leading-relaxed">
                전국 조리경연대회, 명인·명장 시상식, 전국 지자체 소상공인 컨설팅 및 생생한 현장 조리 실습의 순간들을 기록합니다.
              </p>
            </div>
            <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-[#C5A059]/15 rounded-full blur-3xl pointer-events-none" />
          </div>
        </ScrollReveal>

        {/* Category Tabs & Search Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Subtabs */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {galleryCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#0B3C26] text-white shadow-md'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder={t('갤러리 검색 (대회, 시상식, 지자체...)')}
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-stone-300 text-xs font-bold text-gray-900 focus:outline-none focus:border-[#0B3C26] shadow-2xs"
            />
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
          </div>

        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item, idx) => (
            <ScrollReveal key={item.id} direction="up" delay={idx * 60}>
              <div
                onClick={() => setSelectedPhoto(item)}
                className="group bg-white rounded-2xl overflow-hidden border border-stone-200 hover:border-[#0B3C26] shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col h-full"
              >
                {/* Photo Thumbnail */}
                <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#0B3C26]/90 backdrop-blur-xs text-white text-[10px] font-black px-2.5 py-1 rounded-md border border-[#C5A059]/40">
                    {item.categoryLabel}
                  </div>
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white">
                    <Maximize2 className="w-7 h-7 drop-shadow-md" />
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] text-stone-500 font-bold">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-[#C5A059]" />
                        <span>{item.date}</span>
                      </span>
                      <span>{item.location}</span>
                    </div>
                    <h3 className="font-black text-sm sm:text-base text-gray-900 group-hover:text-[#0B3C26] transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-xs text-stone-600 line-clamp-2 font-medium leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="bg-white rounded-2xl p-12 text-center text-stone-500 space-y-2 border border-stone-200">
            <Image className="w-10 h-10 text-stone-300 mx-auto" />
            <p className="font-bold">일치하는 갤러리 자료가 없습니다.</p>
          </div>
        )}

      </div>

      {/* Photo Detail Modal */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm cursor-pointer animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border-2 border-[#0B3C26] cursor-default flex flex-col max-h-[90vh]"
          >
            {/* Modal Header */}
            <div className="bg-[#0B3C26] text-white p-4 px-6 flex items-center justify-between">
              <span className="text-xs font-black text-[#D4AF37]">
                {selectedPhoto.categoryLabel}
              </span>
              <button
                onClick={() => setSelectedPhoto(null)}
                className="w-8 h-8 rounded-full bg-black/20 hover:bg-black/40 flex items-center justify-center text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Image */}
            <div className="relative aspect-[16/10] bg-stone-900 overflow-hidden">
              <img
                src={selectedPhoto.image}
                alt={selectedPhoto.title}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-3 overflow-y-auto">
              <div className="flex items-center justify-between text-xs text-stone-500 font-bold border-b pb-2">
                <span>{selectedPhoto.date}</span>
                <span>{selectedPhoto.location}</span>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-gray-900">
                {selectedPhoto.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-medium">
                {selectedPhoto.desc}
              </p>
            </div>

            {/* Modal Footer */}
            <div className="bg-stone-50 p-4 border-t border-stone-200 flex justify-end">
              <button
                onClick={() => setSelectedPhoto(null)}
                className="px-5 py-2 bg-[#0B3C26] text-white text-xs font-bold rounded-xl hover:bg-[#072819] transition-colors cursor-pointer"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
