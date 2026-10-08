import { useLanguage } from '../../i18n/LanguageContext';
import React, { useState, useEffect, useRef } from 'react';
import SubSidebar from '../common/SubSidebar';
import GreetingsSection from './GreetingsSection';
import HistorySection from './HistorySection';
import OrganizationSection from './OrganizationSection';
import ScrollReveal from '../common/ScrollReveal';
import {
  Target,
  Users,
  TrendingUp,
  HeartHandshake,
  Bot,
  GraduationCap,
  UtensilsCrossed,
  Globe2,
  Store,
  Share2,
  Sparkles,
  Palette,
  Leaf,
  Heart,
  Building,
  Award,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  CheckCircle2,
  Scale,
  Building2,
  Calendar,
  UserCheck,
  Globe,
  User,
  MapPin,
  ShieldCheck,
  ChevronUp as ScrollTopIcon,
  Edit3,
  Camera,
  Upload,
  Link as LinkIcon,
  X,
  Save,
  Check,
  Plus,
  Trash2,
  RotateCcw,
  FileText,
  Briefcase,
  BookOpen,
} from 'lucide-react';

import FacultySection from './FacultySection';
import SectorBlock from '../Admin/InlineEditor/SectorBlock';
import EditableText from '../Admin/InlineEditor/EditableText';
import EditableImage from '../Admin/InlineEditor/EditableImage';
import { useAdminEdit } from '../../context/AdminEditContext';

const ABOUT_SECTORS = [
  { id: 'S-ABOUT-00', name: '교육원 소개 & 12대 방향' },
  { id: 'S-ABOUT-01', name: '이사장 인사말' },
  { id: 'S-ABOUT-02', name: '교육원 설립 연혁' },
  { id: 'S-ABOUT-03', name: '정기총회 특별 연설문' },
  { id: 'S-ABOUT-04', name: '이사장 프로필 & 약력' },
  { id: 'S-ABOUT-05', name: '교수진 및 자문위원' },
  { id: 'S-ABOUT-06', name: '조직도 및 법인정보' },
];

const DEFAULT_PURPOSE = {
  title: '설립목적 및 교육원 핵심 가치',
  law: '본원은 [민법] 제32조 (비영리법인의 설립과 허가) 및 농림축산식품부 장관 및 그 소속 청장소관 비영리법인의 설립 및 감독에 관한규칙 제 5조의 규정에 의하여 설립됨.',
  mission: '본원은 농수축산물을 활용한 외식산업 발전과 외식창업교육을 통해 외식산업 경쟁력에 기여함으로써, 국내 및 국외 외식산업을 발전시키는 것.',
};

const DEFAULT_PILLARS = [
  {
    num: '01',
    title: '실무 중심 외식창업 원스톱 육성',
    desc: '점포 개설부터 인허가, 상권분석, 매장 운영 매뉴얼까지 창업 전 과정을 원스톱으로 지원합니다.',
    tag: '창업육성',
  },
  {
    num: '02',
    title: '공식 자격 검정 & 전문 자격증 발급',
    desc: '외식창업실무지도사, 외식창업실무사 등 공신력 있는 민간 및 전문 자격을 체계적으로 양성·발급합니다.',
    tag: '자격검정',
  },
  {
    num: '03',
    title: '조리명장·명인 1:1 도제식 전수',
    desc: '호텔 40년 경력의 조리명장 및 대한민국 외식명인진의 시그니처 레시피와 현장 실무 노하우를 직접 전수합니다.',
    tag: '명인전수',
  },
  {
    num: '04',
    title: '로컬푸드 & 농수축산물 메뉴 R&D',
    desc: '전국 지자체 특산물과 연계한 로컬푸드 신메뉴 개발 및 건강한 한국형 외식 상품화를 선도합니다.',
    tag: '메뉴R&D',
  },
  {
    num: '05',
    title: '소상공인 점포 경영진단 & 리뉴얼',
    desc: '매출 부진 및 위기 점포를 위한 메뉴 재설계, 원가 절감, 고객 서비스 개선 등 밀착 솔루션을 제공합니다.',
    tag: '경영개선',
  },
  {
    num: '06',
    title: '빅데이터 상권분석 & 공간 디자인',
    desc: '진익준 교수를 비롯한 전문 연구진이 상권 유동인구 데이터와 고객 경험 디자인(CX) 공간 기획을 제공합니다.',
    tag: '상권·공간',
  },
  {
    num: '07',
    title: '카페·베이커리·식음료(F&B) 특화',
    desc: '스페셜티 커피, 천연발효 빵, 시그니처 디저트, 소믈리에 주류 페어링 등 최신 트렌드 기술을 교육합니다.',
    tag: '카페·제과',
  },
  {
    num: '08',
    title: '시니어·은퇴자 맞춤형 안정 창업',
    desc: '5060 중장년 및 은퇴자를 위해 무리한 투자 없는 안정적이고 지속 가능한 맞춤형 외식 창업을 돕습니다.',
    tag: '시니어창업',
  },
  {
    num: '09',
    title: '청년 창업가 육성 & 정부지원 연계',
    desc: '청년 예비 창업자를 대상으로 중소벤처기업부 및 소상공인 정책자금, 저금리 대출 연계를 코칭합니다.',
    tag: '청년지원',
  },
  {
    num: '10',
    title: 'K-FOOD 요리대회 & 명인 시상식',
    desc: '정기적인 전국 규모 K-FOOD 조리경연대회와 자랑스러운 외식 명인 시상식을 주관하여 위상을 높입니다.',
    tag: '경연·시상',
  },
  {
    num: '11',
    title: '산학연 MOU & 글로벌 해외진출',
    desc: '10대 공식 협력업체와의 산학협력망 및 해외 외식기관과의 교류를 통해 K-외식의 글로벌화를 추진합니다.',
    tag: '산학·글로벌',
  },
  {
    num: '12',
    title: 'ESG 친환경 외식 & 위생 안전 인증',
    desc: '친환경 식자재 관리, 음식물 쓰레기 감축, 최고 수준의 위생 안전 표준을 준수하는 외식 문화를 보급합니다.',
    tag: 'ESG·안전',
  },
];

export default function AboutPage({ initialSubTab = 'speech', initialTab = 'speech', siteData = {}, onTabChange }) {
  const { t } = useLanguage();
  const { isEditMode, siteDraft, updateSiteDraft } = useAdminEdit();
  const currentSite = (siteDraft && Object.keys(siteDraft).length > 0) ? siteDraft : siteData;
  const info = currentSite?.institutionInfo || {};
  const corpName = info.corpName || '사단법인 한국외식창업교육원';
  const engName = info.engName || 'Korea Food Service Startup Education Center';
  const ceoName = info.ceoName || '안형상 이사장';
  const establishedDate = info.establishedDate || '2022년 7월 29일';
  const fieldName = info.field || '외식 창업 실무 교육 및 전문 자격증 발급';

  const purpose = currentSite?.establishmentPurpose || DEFAULT_PURPOSE;
  const pillars = currentSite?.strategicPillars || DEFAULT_PILLARS;
  const pillarsTitle = currentSite?.strategicPillarsTitle || '교육원 공식 12대 핵심 사업방향';
  const pillarsSubtitle = currentSite?.strategicPillarsSubtitle || '대한민국 외식산업의 선진화와 창업 성공률 제고를 위한 교육원의 12가지 중점 추진 과제입니다.';

  const validSubTabs = ['speech', 'profile', 'greetings', 'history', 'faculty', 'organization'];
  const resolveTab = (val) => (validSubTabs.includes(val) ? val : 'speech');
  const defaultSub = resolveTab(initialSubTab || initialTab);
  const [activeTab, setActiveTab] = useState(defaultSub);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Institution Modal State
  const [isInstitutionModalOpen, setIsInstitutionModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState('info'); // info, purpose, pillars
  const [formData, setFormData] = useState({
    info: {
      corpName,
      engName,
      ceoName,
      establishedDate,
      field: fieldName,
      logo: info.logo || '/images/logo-transparent.svg',
    },
    purpose: { ...purpose },
    pillarsTitle,
    pillarsSubtitle,
    pillars: [...pillars],
  });
  const [uploadLoading, setUploadLoading] = useState(false);
  const logoInputRef = useRef(null);

  useEffect(() => {
    setFormData({
      info: {
        corpName: currentSite?.institutionInfo?.corpName || corpName,
        engName: currentSite?.institutionInfo?.engName || engName,
        ceoName: currentSite?.institutionInfo?.ceoName || ceoName,
        establishedDate: currentSite?.institutionInfo?.establishedDate || establishedDate,
        field: currentSite?.institutionInfo?.field || fieldName,
        logo: currentSite?.institutionInfo?.logo || info.logo || '/images/logo-transparent.svg',
      },
      purpose: currentSite?.establishmentPurpose || DEFAULT_PURPOSE,
      pillarsTitle: currentSite?.strategicPillarsTitle || pillarsTitle,
      pillarsSubtitle: currentSite?.strategicPillarsSubtitle || pillarsSubtitle,
      pillars: currentSite?.strategicPillars || DEFAULT_PILLARS,
    });
  }, [currentSite]);

  useEffect(() => {
    const target = initialSubTab || initialTab;
    if (target) {
      setActiveTab(resolveTab(target));
    }
  }, [initialSubTab, initialTab]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const aboutSubItems = [
    { id: 'speech', label: t("이사장 인사말") },
    { id: 'profile', label: t("이사장 프로필 & 약력") },
    { id: 'greetings', label: t("교육원 소개 & 12대 방향") },
    { id: 'history', label: t("주요 연혁") },
    { id: 'faculty', label: t("교수진 소개") },
    { id: 'organization', label: t("조직도") },
  ];

  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('로고 이미지 파일 크기는 5MB 이하여야 합니다.');
      return;
    }

    setUploadLoading(true);
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const base64Data = reader.result;
        try {
          const res = await fetch('/api/upload', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ imageBase64: base64Data, fileName: file.name }),
          });
          const data = await res.json();
          if (res.ok && data.url) {
            setFormData(prev => ({ ...prev, info: { ...prev.info, logo: data.url } }));
            setUploadLoading(false);
            return;
          }
        } catch {
          // fallback
        }
        setFormData(prev => ({ ...prev, info: { ...prev.info, logo: base64Data } }));
      } finally {
        setUploadLoading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveInstitutionModal = (e) => {
    e.preventDefault();
    if (updateSiteDraft) {
      updateSiteDraft(prev => ({
        ...prev,
        institutionInfo: {
          ...(prev?.institutionInfo || {}),
          ...formData.info,
        },
        establishmentPurpose: formData.purpose,
        strategicPillarsTitle: formData.pillarsTitle,
        strategicPillarsSubtitle: formData.pillarsSubtitle,
        strategicPillars: formData.pillars,
      }));
    }
    setIsInstitutionModalOpen(false);
  };

  const handlePillarChange = (idx, field, value) => {
    setFormData(prev => {
      const updated = [...prev.pillars];
      updated[idx] = { ...updated[idx], [field]: value };
      return { ...prev, pillars: updated };
    });
  };

  const handleAddPillar = () => {
    setFormData(prev => {
      const nextNum = String(prev.pillars.length + 1).padStart(2, '0');
      return {
        ...prev,
        pillars: [
          ...prev.pillars,
          { num: nextNum, tag: '신규 과제', title: '새 사업 추진 방향', desc: '상세 추진 내용을 입력하세요.' },
        ],
      };
    });
  };

  const handleDeletePillar = (idx) => {
    if (formData.pillars.length <= 1) {
      alert('최소 1개 이상의 사업방향이 유지되어야 합니다.');
      return;
    }
    setFormData(prev => ({
      ...prev,
      pillars: prev.pillars.filter((_, i) => i !== idx),
    }));
  };

  return (
    <div className="bg-gray-50 min-h-screen py-6 font-sans text-gray-900">
      
      {/* Full Width Widescreen Layout matching Header padding */}
      <div className="w-full px-6 sm:px-10 lg:px-14 space-y-6">
        
        {/* Main Content Layout: Left SubSidebar + Right Main Content */}
        <div className="flex flex-col md:flex-row gap-6 lg:gap-8 items-start">
          
          {/* Left Vertical SubSidebar Menu */}
          <SubSidebar
            title={t("교육원 소개")}
            items={aboutSubItems}
            activeId={activeTab}
            onSelectTab={(tabId) => setActiveTab(tabId)}
          />

          {/* Right Main Content Panel with dynamic slide-up animation on tab change */}
          <div
            id="subsidebar-content-anchor"
            key={activeTab}
            className="flex-1 w-full space-y-6 min-w-0 animate-content-slide-up"
          >
            
            {/* SUB-TAB 1: 교육원 소개 & 12대 방향 */}
            {activeTab === 'greetings' && (
              <SectorBlock
                sectorId="S-ABOUT-00"
                sectorName="교육원 소개 & 12대 핵심 사업방향"
                pageKey="about"
                sectorList={ABOUT_SECTORS}
                editContentLabel="🏛️ 교육원 공식 정보 & 12대 방향 관리"
                onEditContent={() => setIsInstitutionModalOpen(true)}
                customActions={[
                  {
                    label: '🏛️ 공식 기관 정보 & 12대 방향 폼 편집',
                    onClick: () => setIsInstitutionModalOpen(true),
                  },
                ]}
              >
                <div className="space-y-8 animate-fadeIn w-full">
                  
                  {/* Admin Quick Editor Header when Edit Mode is active */}
                  {isEditMode && (
                    <div className="bg-gradient-to-r from-[#1B5238] via-[#266847] to-[#34885E] text-white p-4 sm:p-5 rounded-2xl border border-[#85CFAB]/40 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className="p-2.5 bg-white/15 text-[#A7F3D0] rounded-xl border border-white/20">
                          <Building2 className="w-5 h-5" />
                        </span>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-black text-[#A7F3D0] uppercase tracking-wider">
                              교육원 정보 & 12대 사업방향 편집 모드
                            </span>
                            <span className="px-2 py-0.5 rounded-full bg-emerald-400/20 text-emerald-100 text-[10px] font-bold">
                              실시간 연동
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm text-gray-100 font-medium mt-0.5">
                            화면의 글자들을 직접 클릭하여 수정하거나, 모달창에서 12개 사업방향과 기관 정보를 한 번에 일괄 편집할 수 있습니다.
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsInstitutionModalOpen(true)}
                        className="px-5 py-2.5 bg-white hover:bg-[#EAF6EE] text-[#1E5D3B] font-black text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center gap-2 shrink-0 cursor-pointer hover:scale-102"
                      >
                        <Edit3 className="w-4 h-4" />
                        <span>✍️ 기관 정보 & 12대 방향 폼 편집</span>
                      </button>
                    </div>
                  )}

                  {/* Official Institution Profile Summary Box - Inspired by Official Logo Green & Orange */}
                  <div className="relative bg-gradient-to-br from-[#14532D] via-[#15803D] to-[#16A34A] text-white rounded-3xl p-6 sm:p-8 border border-[#4ADE80]/30 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full overflow-hidden">
                    {/* Ambient Background Light Glow */}
                    <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-[#F97316]/15 rounded-full blur-3xl pointer-events-none" />
                    
                    {/* Left Logo Card */}
                    <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-[#D0E7DA] flex items-center justify-center shadow-md">
                      <EditableImage
                        path="institutionInfo.logo"
                        src={info.logo || '/images/logo-transparent.svg'}
                        alt={t("사단법인 한국외식창업교육원")}
                        className="w-full max-w-xs h-auto flex items-center justify-center"
                        imageClassName="w-full max-w-xs h-auto object-contain"
                      />
                    </div>

                    {/* Right Info Details */}
                    <div className="lg:col-span-7 space-y-4 text-xs sm:text-sm z-10">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-[#EA580C] to-[#F97316] text-white text-xs font-black rounded-full shadow-md border border-orange-300">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>{t("사단법인 공식 기관 정보")}</span>
                      </div>

                      <ul className="space-y-3 font-bold text-gray-100">
                        <li className="flex items-center gap-3">
                          <Building2 className="w-4 h-4 text-orange-300 shrink-0" />
                          <span>
                            <strong className="text-orange-300 font-black">{t("법인명 :")}</strong>{' '}
                            <EditableText path="institutionInfo.corpName" value={corpName} />
                          </span>
                        </li>
                        <li className="flex items-center gap-3">
                          <Globe className="w-4 h-4 text-orange-300 shrink-0" />
                          <span>
                            <strong className="text-orange-300 font-black">{t("영문명 :")}</strong>{' '}
                            <EditableText path="institutionInfo.engName" value={engName} />
                          </span>
                        </li>
                        <li className="flex items-center gap-3">
                          <UserCheck className="w-4 h-4 text-orange-300 shrink-0" />
                          <span>
                            <strong className="text-orange-300 font-black">{t("대표자 :")}</strong>{' '}
                            <EditableText path="institutionInfo.ceoName" value={ceoName} />
                          </span>
                        </li>
                        <li className="flex items-center gap-3">
                          <UtensilsCrossed className="w-4 h-4 text-orange-300 shrink-0" />
                          <span>
                            <strong className="text-orange-300 font-black">{t("분 야 :")}</strong>{' '}
                            <EditableText path="institutionInfo.field" value={fieldName} />
                          </span>
                        </li>
                        <li className="flex items-center gap-3">
                          <Calendar className="w-4 h-4 text-orange-300 shrink-0" />
                          <span>
                            <strong className="text-orange-300 font-black">{t("설립 및 허가일자 :")}</strong>{' '}
                            <EditableText path="institutionInfo.establishedDate" value={establishedDate} />
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Establishment Purpose (설립목적) */}
                  <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#D0E7DA] shadow-xs space-y-6 w-full">
                    <h3 className="text-xl font-black text-gray-900 border-b border-[#D0E7DA] pb-3 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#15803D]" />
                      <span>
                        <EditableText path="establishmentPurpose.title" value={purpose.title} />
                      </span>
                    </h3>
                    <div className="space-y-4 text-xs sm:text-sm text-gray-800 font-bold leading-relaxed">
                      <p>
                        <EditableText multiline path="establishmentPurpose.law" value={purpose.law} />
                      </p>
                      <p>
                        <EditableText multiline path="establishmentPurpose.mission" value={purpose.mission} />
                      </p>
                    </div>
                  </div>

                  {/* 12 Major Strategic Directions */}
                  <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#D0E7DA] shadow-xs space-y-8 w-full">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D0E7DA] pb-4">
                      <div>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF6EE] border border-[#D0E7DA] text-[#15803D] text-xs font-black mb-1.5">
                          <Target className="w-3.5 h-3.5 text-[#15803D]" />
                          <span>KFSSEC 12 STRATEGIC PILLARS</span>
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                          <EditableText path="strategicPillarsTitle" value={pillarsTitle} />
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-600 font-medium mt-1">
                          <EditableText multiline path="strategicPillarsSubtitle" value={pillarsSubtitle} />
                        </p>
                      </div>
                      <span className="text-xs font-black text-white bg-gradient-to-r from-[#EA580C] to-[#F97316] px-4 py-2 rounded-2xl shrink-0 self-start sm:self-auto shadow-md border border-orange-300">
                        VISION 2030
                      </span>
                    </div>

                    {/* 12 Strategic Directions Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                      {pillars.map((item, idx) => (
                        <div
                          key={item.num || idx}
                          className="bg-[#F8FAF9] hover:bg-[#F2FAF5] p-5 rounded-2xl border border-[#D0E7DA] hover:border-[#15803D] hover:shadow-md transition-all duration-300 space-y-2.5 group shadow-2xs"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-black text-white bg-[#15803D] px-2.5 py-0.5 rounded-lg group-hover:bg-[#166534] transition-colors">
                              <EditableText path={`strategicPillars.${idx}.num`} value={item.num} />
                            </span>
                            <span className="text-[11px] font-bold text-[#EA580C] bg-orange-50 px-2 py-0.5 rounded-md border border-orange-200">
                              <EditableText path={`strategicPillars.${idx}.tag`} value={item.tag} />
                            </span>
                          </div>
                          <h4 className="font-black text-sm sm:text-base text-gray-900 group-hover:text-[#15803D] transition-colors">
                            <EditableText path={`strategicPillars.${idx}.title`} value={item.title} />
                          </h4>
                          <p className="text-xs text-gray-600 font-medium leading-relaxed">
                            <EditableText multiline path={`strategicPillars.${idx}.desc`} value={item.desc} />
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </SectorBlock>
            )}

            {/* SUB-TAB 2: 주요 연혁 */}
            {activeTab === 'history' && (
              <SectorBlock sectorId="S-ABOUT-02" sectorName="교육원 설립 연혁" pageKey="about" sectorList={ABOUT_SECTORS}>
                <HistorySection milestones={currentSite?.history || siteData?.history} />
              </SectorBlock>
            )}

            {/* SUB-TAB 3: 원장 인사말 */}
            {activeTab === 'speech' && (
              <SectorBlock
                sectorId="S-ABOUT-01"
                sectorName="이사장 인사말 및 연설문"
                pageKey="about"
                sectorList={ABOUT_SECTORS}
                editContentLabel="✍️ 이사장 인사말 & 사진 전체 관리"
                onEditContent={() => {
                  window.dispatchEvent(new CustomEvent('kfssec:open-speech-modal'));
                }}
                customActions={[
                  {
                    label: '✍️ 인사말 폼 모달 편집 (사진/문구/목표)',
                    onClick: () => {
                      window.dispatchEvent(new CustomEvent('kfssec:open-speech-modal'));
                    },
                  },
                ]}
              >
                <GreetingsSection viewMode="speech" speech={currentSite?.speech || siteData?.speech} />
              </SectorBlock>
            )}

            {/* SUB-TAB 3: 이사장 프로필 & 약력 */}
            {activeTab === 'profile' && (
              <SectorBlock sectorId="S-ABOUT-04" sectorName="이사장 프로필 & 주요 약력" pageKey="about" sectorList={ABOUT_SECTORS}>
                <GreetingsSection viewMode="profile" onNavigate={(tab, sub) => onTabChange?.(tab, sub)} />
              </SectorBlock>
            )}

            {/* SUB-TAB 4: 교수진 소개 */}
            {activeTab === 'faculty' && (
              <SectorBlock sectorId="S-ABOUT-05" sectorName="교수진 및 자문위원" pageKey="about" sectorList={ABOUT_SECTORS}>
                <FacultySection facultyList={currentSite?.faculty || siteData?.faculty} />
              </SectorBlock>
            )}

            {/* SUB-TAB 5: 조직도 */}
            {activeTab === 'organization' && (
              <SectorBlock sectorId="S-ABOUT-06" sectorName="조직도 및 법인정보" pageKey="about" sectorList={ABOUT_SECTORS}>
                <OrganizationSection />
              </SectorBlock>
            )}

          </div>

        </div>

      </div>

      {/* Floating Scroll-To-Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-2xl bg-[#2B7752] text-white shadow-2xl hover:bg-[#236344] flex items-center justify-center transition-all duration-300 hover:scale-110 border border-[#85CFAB] cursor-pointer animate-fadeIn"
          aria-label={t("최상단으로 이동")}
        >
          <ScrollTopIcon className="w-6 h-6 stroke-[2.5] text-[#A7F3D0]" />
        </button>
      )}

      {/* Complete Institution & 12 Pillars Edit Modal */}
      {isInstitutionModalOpen && (
        <div
          onClick={() => setIsInstitutionModalOpen(false)}
          className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl shadow-2xl border border-gray-200 w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden text-gray-900"
          >
            {/* Modal Header */}
            <div className="px-6 py-4 bg-gradient-to-r from-[#1B5238] via-[#266847] to-[#34885E] text-white flex items-center justify-between border-b border-[#BEDECB]/30 shrink-0">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 text-[#A7F3D0] rounded-xl border border-white/25">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-white">교육원 공식 정보 & 12대 사업방향 전체 설정</h3>
                  <p className="text-xs text-emerald-100">기관 정보, 설립목적, 12가지 핵심 추진과제를 한 번에 편집합니다.</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsInstitutionModalOpen(false)}
                className="p-2 text-gray-200 hover:text-white hover:bg-black/20 rounded-xl transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Navigation Tabs */}
            <div className="flex border-b border-gray-200 bg-gray-50 px-6 pt-3 gap-2 overflow-x-auto shrink-0">
              {[
                { id: 'info', label: '1. 공식 기관 정보', icon: Building2 },
                { id: 'purpose', label: '2. 설립목적 & 핵심가치', icon: FileText },
                { id: 'pillars', label: '3. 12대 핵심 사업방향', icon: Target },
              ].map((tab) => {
                const IconComp = tab.icon;
                const isActive = modalTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setModalTab(tab.id)}
                    className={`px-4 py-2.5 text-xs font-bold rounded-t-xl flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                      isActive
                        ? 'bg-white text-[#2B7752] border-t-2 border-x border-b-0 border-[#2B7752] font-black shadow-xs'
                        : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <IconComp className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Modal Form Body */}
            <form onSubmit={handleSaveInstitutionModal} className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* TAB 1: INSTITUTION INFO */}
              {modalTab === 'info' && (
                <div className="space-y-6">
                  {/* Logo Upload Section */}
                  <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#D0E7DA] space-y-4">
                    <label className="text-xs font-black text-[#256D48] flex items-center gap-1.5">
                      <Camera className="w-4 h-4 text-[#256D48]" />
                      <span>공식 로고 이미지</span>
                    </label>

                    <div className="flex flex-col sm:flex-row items-center gap-5">
                      <div className="w-40 h-24 rounded-2xl overflow-hidden border border-[#D0E7DA] shadow-md bg-white p-2 flex items-center justify-center shrink-0">
                        <img
                          src={formData.info.logo || '/images/logo-transparent.svg'}
                          alt="로고 미리보기"
                          className="w-full h-full object-contain"
                        />
                      </div>

                      <div className="flex-1 w-full space-y-3">
                        <div className="flex items-center gap-2">
                          <input
                            ref={logoInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleLogoUpload}
                            className="hidden"
                          />
                          <button
                            type="button"
                            onClick={() => logoInputRef.current?.click()}
                            disabled={uploadLoading}
                            className="px-4 py-2 bg-[#2B7752] hover:bg-[#236344] text-white rounded-xl text-xs font-black shadow-xs transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                          >
                            <Upload className="w-3.5 h-3.5" />
                            <span>{uploadLoading ? '업로드 중...' : '내 컴퓨터에서 로고 파일 선택 (5MB)'}</span>
                          </button>
                        </div>

                        <div>
                          <label className="text-[11px] font-bold text-gray-600 block mb-1">
                            또는 이미지 링크(URL) 직접 입력:
                          </label>
                          <input
                            type="text"
                            value={formData.info.logo || ''}
                            onChange={(e) => setFormData({
                              ...formData,
                              info: { ...formData.info, logo: e.target.value },
                            })}
                            placeholder="/images/logo-transparent.svg 또는 https://..."
                            className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl focus:outline-none focus:border-[#2B7752] font-mono"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Institution Details Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-xs font-black text-gray-700">법인명 (공식 명칭)</label>
                      <input
                        type="text"
                        value={formData.info.corpName || ''}
                        onChange={(e) => setFormData({
                          ...formData,
                          info: { ...formData.info, corpName: e.target.value },
                        })}
                        className="w-full px-3.5 py-2.5 text-xs border border-gray-300 rounded-xl font-bold focus:outline-none focus:border-[#2B7752]"
                        placeholder="사단법인 한국외식창업교육원"
                      />
                    </div>

                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-xs font-black text-gray-700">영문명</label>
                      <input
                        type="text"
                        value={formData.info.engName || ''}
                        onChange={(e) => setFormData({
                          ...formData,
                          info: { ...formData.info, engName: e.target.value },
                        })}
                        className="w-full px-3.5 py-2.5 text-xs border border-gray-300 rounded-xl font-bold focus:outline-none focus:border-[#2B7752]"
                        placeholder="Korea Food Service Startup Education Center"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-black text-gray-700">대표자 (성함 및 직함)</label>
                      <input
                        type="text"
                        value={formData.info.ceoName || ''}
                        onChange={(e) => setFormData({
                          ...formData,
                          info: { ...formData.info, ceoName: e.target.value },
                        })}
                        className="w-full px-3.5 py-2.5 text-xs border border-gray-300 rounded-xl font-bold focus:outline-none focus:border-[#2B7752]"
                        placeholder="안형상 이사장"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-black text-gray-700">설립 및 허가일자</label>
                      <input
                        type="text"
                        value={formData.info.establishedDate || ''}
                        onChange={(e) => setFormData({
                          ...formData,
                          info: { ...formData.info, establishedDate: e.target.value },
                        })}
                        className="w-full px-3.5 py-2.5 text-xs border border-gray-300 rounded-xl font-bold focus:outline-none focus:border-[#2B7752]"
                        placeholder="2022년 7월 29일"
                      />
                    </div>

                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-xs font-black text-gray-700">교육 분야 및 특화 과정</label>
                      <input
                        type="text"
                        value={formData.info.field || ''}
                        onChange={(e) => setFormData({
                          ...formData,
                          info: { ...formData.info, field: e.target.value },
                        })}
                        className="w-full px-3.5 py-2.5 text-xs border border-gray-300 rounded-xl font-bold focus:outline-none focus:border-[#2B7752]"
                        placeholder="외식 창업 실무 교육 및 전문 자격증 발급"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: PURPOSE */}
              {modalTab === 'purpose' && (
                <div className="space-y-5">
                  <div className="space-y-1">
                    <label className="text-xs font-black text-gray-800">섹션 제목</label>
                    <input
                      type="text"
                      value={formData.purpose.title || ''}
                      onChange={(e) => setFormData({
                        ...formData,
                        purpose: { ...formData.purpose, title: e.target.value },
                      })}
                      className="w-full px-3.5 py-2.5 text-xs border border-gray-300 rounded-xl font-black focus:outline-none focus:border-[#2B7752]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-black text-gray-800">설립 근거 법령 및 허가 규정</label>
                    <textarea
                      rows={3}
                      value={formData.purpose.law || ''}
                      onChange={(e) => setFormData({
                        ...formData,
                        purpose: { ...formData.purpose, law: e.target.value },
                      })}
                      className="w-full px-3.5 py-2.5 text-xs border border-gray-300 rounded-xl font-bold focus:outline-none focus:border-[#2B7752] leading-relaxed"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-black text-gray-800">교육원 설립 목적 및 기여 방향</label>
                    <textarea
                      rows={4}
                      value={formData.purpose.mission || ''}
                      onChange={(e) => setFormData({
                        ...formData,
                        purpose: { ...formData.purpose, mission: e.target.value },
                      })}
                      className="w-full px-3.5 py-2.5 text-xs border border-gray-300 rounded-xl focus:outline-none focus:border-[#2B7752] leading-relaxed"
                    />
                  </div>
                </div>
              )}

              {/* TAB 3: 12 PILLARS */}
              {modalTab === 'pillars' && (
                <div className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-black text-gray-800">12대 방향 헤드라인 제목</label>
                      <input
                        type="text"
                        value={formData.pillarsTitle || ''}
                        onChange={(e) => setFormData({ ...formData, pillarsTitle: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs border border-gray-300 rounded-xl font-bold focus:outline-none focus:border-[#2B7752]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-black text-gray-800">소개 부제목</label>
                      <input
                        type="text"
                        value={formData.pillarsSubtitle || ''}
                        onChange={(e) => setFormData({ ...formData, pillarsSubtitle: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs border border-gray-300 rounded-xl font-bold focus:outline-none focus:border-[#2B7752]"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                    <span className="text-xs font-black text-gray-700">
                      총 {formData.pillars.length}개의 핵심 사업방향
                    </span>
                    <button
                      type="button"
                      onClick={handleAddPillar}
                      className="px-3.5 py-1.5 bg-[#2B7752] text-white rounded-lg text-xs font-bold hover:bg-[#236344] transition flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>새 사업방향 추가</span>
                    </button>
                  </div>

                  {/* Pillars List */}
                  <div className="space-y-3.5">
                    {formData.pillars.map((item, idx) => (
                      <div
                        key={idx}
                        className="bg-[#F8FAF9] border border-[#D0E7DA] rounded-2xl p-4 space-y-3 relative hover:border-[#32875D] transition-colors"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-md bg-[#2B7752] text-white text-xs font-black flex items-center justify-center">
                              {item.num || idx + 1}
                            </span>
                            <span className="text-xs font-black text-gray-900">과제 #{idx + 1}</span>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleDeletePillar(idx)}
                            className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition cursor-pointer"
                            title="삭제"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                          <div className="space-y-1 sm:col-span-1">
                            <label className="text-[11px] font-bold text-gray-600">번호</label>
                            <input
                              type="text"
                              value={item.num || ''}
                              onChange={(e) => handlePillarChange(idx, 'num', e.target.value)}
                              className="w-full px-2.5 py-1.5 text-xs border border-gray-300 rounded-lg font-bold bg-white focus:outline-none focus:border-[#2B7752]"
                            />
                          </div>

                          <div className="space-y-1 sm:col-span-1">
                            <label className="text-[11px] font-bold text-gray-600">분류 태그</label>
                            <input
                              type="text"
                              value={item.tag || ''}
                              onChange={(e) => handlePillarChange(idx, 'tag', e.target.value)}
                              className="w-full px-2.5 py-1.5 text-xs border border-gray-300 rounded-lg font-bold bg-white focus:outline-none focus:border-[#2B7752]"
                            />
                          </div>

                          <div className="space-y-1 sm:col-span-2">
                            <label className="text-[11px] font-bold text-gray-600">사업방향 제목</label>
                            <input
                              type="text"
                              value={item.title || ''}
                              onChange={(e) => handlePillarChange(idx, 'title', e.target.value)}
                              className="w-full px-2.5 py-1.5 text-xs border border-gray-300 rounded-lg font-bold bg-white focus:outline-none focus:border-[#2B7752]"
                            />
                          </div>

                          <div className="space-y-1 sm:col-span-4">
                            <label className="text-[11px] font-bold text-gray-600">상세 설명</label>
                            <textarea
                              rows={2}
                              value={item.desc || ''}
                              onChange={(e) => handlePillarChange(idx, 'desc', e.target.value)}
                              className="w-full px-2.5 py-1.5 text-xs border border-gray-300 rounded-lg bg-white leading-relaxed focus:outline-none focus:border-[#2B7752]"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Modal Footer Controls */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-200 mt-6">
                <button
                  type="button"
                  onClick={() => setFormData({
                    info: {
                      corpName: '사단법인 한국외식창업교육원',
                      engName: 'Korea Food Service Startup Education Center',
                      ceoName: '안형상 이사장',
                      establishedDate: '2022년 7월 29일',
                      field: '외식 창업 실무 교육 및 전문 자격증 발급',
                      logo: '/images/logo-transparent.svg',
                    },
                    purpose: DEFAULT_PURPOSE,
                    pillarsTitle: '교육원 공식 12대 핵심 사업방향',
                    pillarsSubtitle: '대한민국 외식산업의 선진화와 창업 성공률 제고를 위한 교육원의 12가지 중점 추진 과제입니다.',
                    pillars: DEFAULT_PILLARS,
                  })}
                  className="text-xs font-bold text-gray-500 hover:text-red-600 transition"
                >
                  기본값으로 초기화
                </button>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsInstitutionModalOpen(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-100 rounded-xl text-xs font-bold transition cursor-pointer"
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#2B7752] hover:bg-[#236344] text-white rounded-xl text-xs font-black shadow-md transition flex items-center gap-1.5 cursor-pointer border border-[#3CA370]"
                  >
                    <Save className="w-4 h-4" />
                    <span>변경사항 지금 적용</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
