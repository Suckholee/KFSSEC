import React, { useState, useEffect } from 'react';
import {
  Briefcase,
  GraduationCap,
  Store,
  FileText,
  Phone,
  Plus,
  Trash2,
  Edit3,
  Save,
  CheckCircle2,
  X,
  Search,
  Filter,
  ExternalLink,
  Sparkles,
  MapPin,
  TrendingUp,
  Award,
  ChevronRight,
  Download,
  Clock,
  CheckCircle,
  HelpCircle,
  Image as ImageIcon,
  UserCheck,
} from 'lucide-react';
import { defaultConsultingCases } from '../../data/defaultConsultingCases';

const DEFAULT_ROADMAP_STEPS = [
  { step: '01', title: '빅데이터 상권분석 & 입지 타당성 진단', desc: '유동인구 동선, 배후 세대 소비력, 경쟁점 분석을 통한 최적의 점포 입지 선정 및 출점 전략 수립', tag: '상권진단' },
  { step: '02', title: '고객 경험(CX) 기반 점포 콘셉트 기획', desc: '타겟 고객층 정의, 브랜드 스토리텔링, 차별화된 시그니처 가치 제안 및 BI/CI 비주얼 기획', tag: '브랜드전략' },
  { step: '03', title: '시그니처 메뉴 R&D & 식자재 원가 표준화', desc: '조리명장 및 전담 셰프의 레시피 표준화(SOP), 원가율 30% 이하 최적화, 식자재 직배송 체계 구축', tag: '메뉴R&D' },
  { step: '04', title: '주방 동선 최적화 & 공간 인테리어 시공', desc: '홀/주방 효율 극대화 레이아웃 설계, 파사드 익스테리어 디자인, 감리 및 책임 시공', tag: '공간설계' },
  { step: '05', title: '그랜드 오픈 마케팅 & 슈퍼바이징 코칭', desc: '지역 밀착형 SNS 바이럴 홍보, 네이버 플레이스 최적화, 3개월 사후 경영 데이터 모니터링', tag: '사후코칭' },
];

const DEFAULT_SUCCESS_STORIES = [
  {
    id: 'succ-1',
    brand: '이학갈비 (송도/연수/사가정 등 다수 매장)',
    location: '인천 연수구 외',
    desc: '대형 프리미엄 한식 다이닝의 공간 혁신 및 동선 재배치를 통해 테이블 회전율 35% 향상 및 월 매출 3억 돌파 성공',
    image: '/images/gallery_1.jpg',
    metric: '월 매출 35% 증가',
    director: '진익준 교수 / 공간전략팀',
  },
  {
    id: 'succ-2',
    brand: '칠곡제면소 (전통 면요리 명가)',
    location: '대전 용문동',
    desc: '자가제면 주방 동선 특화 설계 및 로컬 고객 유입 파사드 리뉴얼로 오픈 첫 달 목표 매출 180% 달성',
    image: '/images/gallery_2.jpg',
    metric: '목표 매출 180% 달성',
    director: '진익준 교수 / 메뉴R&D팀',
  },
];

const DEFAULT_CONSULTING_FAQS = [
  {
    q: '컨설팅 신청 후 최초 진단까지 얼마나 소요되나요?',
    a: '접수 후 24시간 이내에 담당 교수진 및 자문위원이 1차 유선 상담을 진행하며, 3영업일 이내에 현장 방문 일정이 확정됩니다.',
  },
  {
    q: '소상공인이나 청년 창업자의 경우 정부 지원금 연계가 가능한가요?',
    a: '네, 가능합니다. 교육원은 소상공인시장진흥공단 및 지자체 연계 정책자금, 청년 창업 인큐베이팅 지원사업과 연계하여 초기 자본금 부담을 대폭 경감해 드립니다.',
  },
  {
    q: '기존 점포의 리뉴얼(업종 전환) 컨설팅도 가능한가요?',
    a: '물론입니다. 기존 설비와 인테리어를 최대한 활용하는 저비용 고효율 턴어라운드 솔루션을 통해 재도약을 지원합니다.',
  },
];

const DEFAULT_INQUIRIES = [
  {
    id: 'CON-2026-001',
    name: '박영호',
    phone: '010-8274-9912',
    email: 'youngho.park@naver.com',
    storeType: '대형 한식구이 전문점',
    location: '경기 성남시 분당구',
    area: '75평',
    requestedFaculty: '진익준 교수',
    date: '2026.10.02',
    status: '상담진행중',
    memo: '송도 이학갈비 성공사례 보고 연락. 11월 인테리어 착공 예정.',
  },
  {
    id: 'CON-2026-002',
    name: '김서연',
    phone: '010-3381-4491',
    email: 'sy.kim@gmail.com',
    storeType: '브런치 & 베이커리 카페',
    location: '서울 성동구 성수동',
    area: '42평',
    requestedFaculty: '진익준 교수',
    date: '2026.09.28',
    status: '신청접수',
    memo: '청년 창업 지원사업 연계 희망. 메뉴 표준화 및 공간 브랜딩 자문 요망.',
  },
  {
    id: 'CON-2026-003',
    name: '최민석',
    phone: '010-5192-7733',
    email: 'minseok.choi@daum.net',
    storeType: '특급호텔식 파인다이닝',
    location: '부산 해운대구',
    area: '60평',
    requestedFaculty: '이상정 명장',
    date: '2026.09.20',
    status: '컨설팅완료',
    memo: '양식 스테이크 및 소스 레시피 전수 완료. 성공적 오픈 완료.',
  },
];

export default function AdminConsulting({ siteData, onUpdateSiteData, subTab = 'faculty_manage', onSubTabChange }) {
  const [activeTab, setActiveTab] = useState(subTab || 'faculty_manage');

  // Synchronize internal state with parent subTab changes
  useEffect(() => {
    if (subTab) {
      setActiveTab(subTab);
    }
  }, [subTab]);

  const handleTabSwitch = (newTab) => {
    setActiveTab(newTab);
    if (onSubTabChange) onSubTabChange(newTab);
  };

  // State
  const [cases, setCases] = useState(() => {
    return siteData?.consultingCases || defaultConsultingCases;
  });
  const [caseFilterCategory, setCaseFilterCategory] = useState('all');
  const [caseSearchQuery, setCaseSearchQuery] = useState('');

  // Modals for Cases
  const [isCaseModalOpen, setIsCaseModalOpen] = useState(false);
  const [editingCase, setEditingCase] = useState(null);
  const [caseBrand, setCaseBrand] = useState('');
  const [caseLocation, setCaseLocation] = useState('');
  const [caseRole, setCaseRole] = useState('설계, 감리');
  const [caseCategory, setCaseCategory] = useState('korean');
  const [caseType, setCaseType] = useState('');
  const [caseRegion, setCaseRegion] = useState('국내');
  const [caseHighlight, setCaseHighlight] = useState(false);

  // Inquiries State
  const [inquiries, setInquiries] = useState(() => {
    return siteData?.consultingInquiries || DEFAULT_INQUIRIES;
  });
  const [inquirySearch, setInquirySearch] = useState('');
  const [inquiryStatusFilter, setInquiryStatusFilter] = useState('all');

  // Roadmap & Success Stories State
  const [roadmap, setRoadmap] = useState(() => {
    return siteData?.consultingRoadmap || DEFAULT_ROADMAP_STEPS;
  });
  const [stories, setStories] = useState(() => {
    return siteData?.consultingStories || DEFAULT_SUCCESS_STORIES;
  });
  const [faqs, setFaqs] = useState(() => {
    return siteData?.consultingFaqs || DEFAULT_CONSULTING_FAQS;
  });

  // Notice Alert
  const [notice, setNotice] = useState('');
  const showNotice = (msg) => {
    setNotice(msg);
    setTimeout(() => setNotice(''), 3000);
  };

  // 1. Save Cases Handler
  const handleSaveCasesToDatabase = async (updatedCases) => {
    const list = updatedCases !== undefined ? updatedCases : cases;
    setCases(list);
    if (onUpdateSiteData) {
      await onUpdateSiteData({
        ...siteData,
        consultingCases: list,
      });
      showNotice('프랜차이즈 사례 데이터베이스가 서버에 안전하게 저장되었습니다.');
    }
  };

  // Open Add Case Modal
  const handleOpenAddCase = () => {
    setEditingCase(null);
    setCaseBrand('');
    setCaseLocation('');
    setCaseRole('설계, 감리');
    setCaseCategory('korean');
    setCaseType('외식 레스토랑');
    setCaseRegion('국내');
    setCaseHighlight(false);
    setIsCaseModalOpen(true);
  };

  // Open Edit Case Modal
  const handleOpenEditCase = (item) => {
    setEditingCase(item);
    setCaseBrand(item.brand);
    setCaseLocation(item.location);
    setCaseRole(item.role || '설계, 감리');
    setCaseCategory(item.category || 'korean');
    setCaseType(item.type || '');
    setCaseRegion(item.region || '국내');
    setCaseHighlight(Boolean(item.highlight));
    setIsCaseModalOpen(true);
  };

  // Submit Case Modal
  const handleSaveCaseModalSubmit = async (e) => {
    e.preventDefault();
    if (!caseBrand.trim()) {
      alert('브랜드명을 입력해주세요.');
      return;
    }

    let updated;
    if (editingCase) {
      updated = cases.map((c) =>
        c.id === editingCase.id
          ? {
              ...c,
              brand: caseBrand.trim(),
              location: caseLocation.trim(),
              role: caseRole.trim(),
              category: caseCategory,
              type: caseType.trim(),
              region: caseRegion,
              highlight: caseHighlight,
            }
          : c
      );
    } else {
      const newId = Date.now();
      const newCase = {
        id: newId,
        brand: caseBrand.trim(),
        location: caseLocation.trim(),
        role: caseRole.trim(),
        category: caseCategory,
        type: caseType.trim(),
        region: caseRegion,
        highlight: caseHighlight,
      };
      updated = [newCase, ...cases];
    }

    await handleSaveCasesToDatabase(updated);
    setIsCaseModalOpen(false);
  };

  // Delete Case
  const handleDeleteCase = async (id, brandName) => {
    if (window.confirm(`'${brandName}' 사례를 정말 삭제하시겠습니까?`)) {
      const updated = cases.filter((c) => c.id !== id);
      await handleSaveCasesToDatabase(updated);
    }
  };

  // Filtered cases
  const filteredCases = cases.filter((c) => {
    const matchCategory =
      caseFilterCategory === 'all' ||
      (caseFilterCategory === 'korean' && c.category === 'korean') ||
      (caseFilterCategory === 'franchise' && c.category === 'franchise') ||
      (caseFilterCategory === 'world' && c.category === 'world') ||
      (caseFilterCategory === 'academy' && c.category === 'academy') ||
      (caseFilterCategory === 'global' && (c.region === '해외' || c.category === 'global')) ||
      (caseFilterCategory === 'cafe' && c.category === 'cafe');

    const matchQuery =
      caseSearchQuery.trim() === '' ||
      c.brand.toLowerCase().includes(caseSearchQuery.toLowerCase()) ||
      c.location.toLowerCase().includes(caseSearchQuery.toLowerCase()) ||
      c.type.toLowerCase().includes(caseSearchQuery.toLowerCase());

    return matchCategory && matchQuery;
  });

  // Inquiries Status Toggle
  const handleUpdateInquiryStatus = async (id, newStatus) => {
    const updated = inquiries.map((inq) =>
      inq.id === id ? { ...inq, status: newStatus } : inq
    );
    setInquiries(updated);
    if (onUpdateSiteData) {
      await onUpdateSiteData({
        ...siteData,
        consultingInquiries: updated,
      });
      showNotice('상담 접수 상태가 업데이트되었습니다.');
    }
  };

  // Inquiries Memo Edit
  const handleUpdateInquiryMemo = async (id, newMemo) => {
    const updated = inquiries.map((inq) =>
      inq.id === id ? { ...inq, memo: newMemo } : inq
    );
    setInquiries(updated);
    if (onUpdateSiteData) {
      await onUpdateSiteData({
        ...siteData,
        consultingInquiries: updated,
      });
    }
  };

  // Delete Inquiry
  const handleDeleteInquiry = async (id) => {
    if (window.confirm('이 상담 접수 내역을 삭제하시겠습니까?')) {
      const updated = inquiries.filter((inq) => inq.id !== id);
      setInquiries(updated);
      if (onUpdateSiteData) {
        await onUpdateSiteData({
          ...siteData,
          consultingInquiries: updated,
        });
        showNotice('상담 내역이 삭제되었습니다.');
      }
    }
  };

  // Faculty list from siteData
  const facultyList = siteData?.faculty || [
    {
      id: 'prof-jin',
      name: '진익준',
      role: '외식 공간디자인 & 상권분석 전담교수',
      title: '브랜드경험디자인연구소 대표 / 청운대학교 겸임교수',
      badge: '외식 상권 & 인테리어 석학',
      isLead: true,
      hasCases: true,
      phone: '010-8563-8440',
    },
    {
      id: 'prof-lee',
      name: '이상정',
      role: '서양조리 & 마스터클래스 석좌교수',
      title: '대한민국 조리명장 제1호 / 호텔 조리부 총괄',
      badge: '대한민국 조리명장 1호',
      isLead: true,
      hasCases: false,
      phone: '02-744-8840',
    },
    {
      id: 'prof-shin',
      name: '신충섭',
      role: '외식 정책 & 프랜차이즈 경영 자문위원',
      title: '외식산업 산학협력 총괄 / 정책 자문위원',
      badge: '경영·정책 자문',
      isLead: true,
      hasCases: false,
      phone: '02-744-8840',
    },
    {
      id: 'prof-cho',
      name: '조춘봉',
      role: '외식경영학 & 서비스 R&D 고문',
      title: '외식경영학 석학 / 교육원 고문',
      badge: '외식경영학 석학',
      isLead: true,
      hasCases: false,
      phone: '02-744-8840',
    },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 animate-fadeIn">
      {/* Top Main Workstation Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-black mb-2">
            <Briefcase className="w-3.5 h-3.5 text-emerald-600" />
            <span>KFSSEC CONSULTING WORKSTATION</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight flex items-center gap-2">
            <span>창업 컨설팅 통합 관리센터</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
            명문 교수진 1:1 상담 매칭, 100+ 프랜차이즈 시공 사례, 컨설팅 로드맵 및 접수 내역을 실시간으로 관리합니다.
          </p>
        </div>

        {/* Action Button: Quick Add Case */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleOpenAddCase}
            className="px-5 py-2.5 bg-[#2B7752] hover:bg-[#225e41] text-white font-black text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>신규 프랜차이즈 사례 등록</span>
          </button>
        </div>
      </div>

      {/* Notice Banner */}
      {notice && (
        <div className="bg-emerald-100 border-2 border-emerald-500 text-emerald-950 p-4 rounded-2xl flex items-center gap-3 animate-fadeIn shadow-md">
          <CheckCircle className="w-5 h-5 text-emerald-700 shrink-0" />
          <span className="text-sm font-black">{notice}</span>
        </div>
      )}

      {/* 4 Secondary Sub-Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-white p-2 rounded-2xl border border-stone-200 shadow-xs">
        <button
          onClick={() => handleTabSwitch('faculty_manage')}
          className={`py-3 px-3 rounded-xl font-black text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === 'faculty_manage'
              ? 'bg-[#2B7752] text-white shadow-md'
              : 'text-gray-600 hover:bg-stone-100'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>👨‍🏫 전담 교수진 관리</span>
        </button>

        <button
          onClick={() => handleTabSwitch('cases_manage')}
          className={`py-3 px-3 rounded-xl font-black text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === 'cases_manage'
              ? 'bg-[#2B7752] text-white shadow-md'
              : 'text-gray-600 hover:bg-stone-100'
          }`}
        >
          <Store className="w-4 h-4" />
          <span>🏢 100+ 프랜차이즈 사례 ({cases.length})</span>
        </button>

        <button
          onClick={() => handleTabSwitch('process_manage')}
          className={`py-3 px-3 rounded-xl font-black text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === 'process_manage'
              ? 'bg-[#2B7752] text-white shadow-md'
              : 'text-gray-600 hover:bg-stone-100'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>📌 로드맵 & 성공사례</span>
        </button>

        <button
          onClick={() => handleTabSwitch('inquiry_manage')}
          className={`py-3 px-3 rounded-xl font-black text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === 'inquiry_manage'
              ? 'bg-[#2B7752] text-white shadow-md'
              : 'text-gray-600 hover:bg-stone-100'
          }`}
        >
          <Phone className="w-4 h-4" />
          <span>📥 1:1 상담 접수함 ({inquiries.length})</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: 👨‍🏫 컨설팅 전담 교수진 관리                                        */}
      {/* ========================================================================= */}
      {activeTab === 'faculty_manage' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
              <div>
                <h3 className="text-lg font-black text-gray-900 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-[#2B7752]" />
                  <span>창업컨설팅 전담 교수진 & 자문위원 매칭 현황</span>
                </h3>
                <p className="text-xs text-gray-500 font-medium mt-1">
                  교육원 소개와 창업컨설팅 페이지는 동일한 통합 교수진 DB를 공유합니다. 각 교수의 컨설팅 직통 채널 및 포트폴리오 연동을 설정하세요.
                </p>
              </div>
              <span className="px-3 py-1 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-full border border-emerald-200 shrink-0">
                총 {facultyList.length}명 등록
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {facultyList.map((member, idx) => (
                <div
                  key={member.id || idx}
                  className="bg-stone-50 rounded-2xl p-5 border border-stone-200 hover:border-[#2B7752] transition-all space-y-4"
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={member.image || '/images/faculty/jin_ikjun_expert.png'}
                      alt={member.name}
                      className="w-16 h-20 rounded-xl object-cover object-top border border-stone-300 shadow-xs shrink-0"
                    />
                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                          {member.badge || '전문 교수진'}
                        </span>
                        {member.id === 'prof-jin' && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                            100+ 사례 연동
                          </span>
                        )}
                      </div>
                      <h4 className="text-base font-black text-gray-900 flex items-center gap-1.5">
                        <span>{member.name}</span>
                        <span className="text-xs text-gray-500 font-bold">
                          {member.badge?.includes('명장') ? '명장' : '교수'}
                        </span>
                      </h4>
                      <p className="text-xs font-bold text-[#1E5D3B] truncate">
                        {member.role}
                      </p>
                      <p className="text-[11px] text-gray-500 font-medium truncate">
                        {member.title}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-stone-200/80 flex items-center justify-between text-xs text-gray-600">
                    <div className="flex items-center gap-1.5 font-bold">
                      <Phone className="w-3.5 h-3.5 text-gray-400" />
                      <span>{member.phone || '010-8563-8440'}</span>
                    </div>
                    <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-bold">
                      컨설팅 1:1 상담 활성화됨
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200 text-xs text-emerald-900 leading-relaxed font-medium">
              💡 <strong>안내:</strong> 교수님의 학력, 경력, 저서, 사진 등 세부 프로필은 <strong>[교육원 관리 &gt; 명문 교수진 소개]</strong> 메뉴에서 일괄 수정 가능하며, 창업컨설팅 페이지에도 실시간으로 100% 자동 동기화됩니다.
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: 🏢 100+ 프랜차이즈 시공·컨설팅 사례 (100+) 관리                      */}
      {/* ========================================================================= */}
      {activeTab === 'cases_manage' && (
        <div className="space-y-6">
          {/* Filter, Search & Stats Header */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-black text-gray-900 flex items-center gap-2">
                  <Store className="w-5 h-5 text-[#2B7752]" />
                  <span>프랜차이즈 및 대형 매장 시공·컨설팅 레퍼런스 DB</span>
                </h3>
                <p className="text-xs text-gray-500 font-medium mt-1">
                  홈페이지 '프랜차이즈 사례 100+' 탭에 실시간 노출되는 프로젝트 포트폴리오를 관리합니다.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-stone-100 text-gray-700 text-xs font-bold rounded-xl border border-stone-300">
                  전체 {cases.length}건
                </span>
                <span className="px-3 py-1 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-xl border border-emerald-200">
                  해외 프로젝트 {cases.filter((c) => c.region === '해외').length}건
                </span>
              </div>
            </div>

            {/* Category Filter Pills & Search Input */}
            <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center pt-2">
              <div className="flex flex-wrap gap-1.5">
                {[
                  { id: 'all', label: '전체' },
                  { id: 'korean', label: '대형 한식명가' },
                  { id: 'franchise', label: '프랜차이즈' },
                  { id: 'world', label: '세계요리·일식' },
                  { id: 'academy', label: '조리아카데미' },
                  { id: 'global', label: '글로벌·해외' },
                  { id: 'cafe', label: '카페·베이커리' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setCaseFilterCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      caseFilterCategory === cat.id
                        ? 'bg-[#2B7752] text-white shadow-xs'
                        : 'bg-stone-100 text-gray-600 hover:bg-stone-200'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              <div className="relative w-full lg:w-72">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="브랜드명, 지역, 업종 검색..."
                  value={caseSearchQuery}
                  onChange={(e) => setCaseSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2B7752] focus:bg-white"
                />
              </div>
            </div>
          </div>

          {/* Cases Table List */}
          <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-gray-700">
                <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="py-3.5 px-4 w-12 text-center">No</th>
                    <th className="py-3.5 px-4">브랜드명</th>
                    <th className="py-3.5 px-4">소재지/지역</th>
                    <th className="py-3.5 px-4">수행 역할</th>
                    <th className="py-3.5 px-4">업종 특성</th>
                    <th className="py-3.5 px-4 text-center">추천사례</th>
                    <th className="py-3.5 px-4 text-right">관리</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {filteredCases.map((item, index) => (
                    <tr key={item.id || index} className="hover:bg-stone-50/80 transition-colors">
                      <td className="py-3 px-4 text-center font-bold text-gray-400">
                        {index + 1}
                      </td>
                      <td className="py-3 px-4 font-black text-gray-900">
                        <div className="flex items-center gap-2">
                          <span>{item.brand}</span>
                          {item.region === '해외' && (
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                              글로벌
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4 font-medium text-gray-600">
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-gray-400" />
                          <span>{item.location}</span>
                        </span>
                      </td>
                      <td className="py-3 px-4 font-bold text-emerald-800">
                        {item.role || '설계, 감리'}
                      </td>
                      <td className="py-3 px-4 text-gray-500 font-medium">
                        {item.type}
                      </td>
                      <td className="py-3 px-4 text-center">
                        {item.highlight ? (
                          <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-black">
                            주목
                          </span>
                        ) : (
                          <span className="text-gray-300 text-[10px]">-</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleOpenEditCase(item)}
                            className="p-1.5 rounded-lg text-gray-500 hover:text-emerald-700 hover:bg-emerald-50 transition cursor-pointer"
                            title="수정"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteCase(item.id, item.brand)}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                            title="삭제"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredCases.length === 0 && (
                    <tr>
                      <td colSpan="7" className="py-12 text-center text-gray-400 font-medium">
                        검색 조건에 일치하는 프랜차이즈 사례가 없습니다.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: 📌 컨설팅 프로세스 & 성공사례 관리                                 */}
      {/* ========================================================================= */}
      {activeTab === 'process_manage' && (
        <div className="space-y-6">
          {/* Roadmap Steps */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-stone-200 pb-4">
              <div>
                <h3 className="text-lg font-black text-gray-900 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#2B7752]" />
                  <span>창업 컨설팅 5단계 로드맵 프로세스</span>
                </h3>
                <p className="text-xs text-gray-500 font-medium mt-1">
                  소상공인 및 창업자가 신뢰할 수 있는 단계별 실무 솔루션 안내 문구입니다.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {roadmap.map((r, i) => (
                <div key={i} className="bg-stone-50 rounded-2xl p-4 border border-stone-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-black text-[#2B7752]">{r.step}단계</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      {r.tag}
                    </span>
                  </div>
                  <h4 className="text-xs font-black text-gray-900 leading-tight">
                    {r.title}
                  </h4>
                  <p className="text-[11px] text-gray-600 font-medium leading-relaxed">
                    {r.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Success Stories (이학갈비 등) */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-stone-200 pb-4">
              <div>
                <h3 className="text-lg font-black text-gray-900 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#2B7752]" />
                  <span>대표 성공 사례 (이학갈비, 칠곡제면소 등)</span>
                </h3>
                <p className="text-xs text-gray-500 font-medium mt-1">
                  실제 매출 향상 데이터 및 고화질 현장 사진이 배치되는 메인 홍보 블록입니다.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {stories.map((s) => (
                <div key={s.id} className="bg-stone-50 rounded-2xl p-5 border border-stone-200 space-y-4">
                  <div className="flex items-start gap-4">
                    <img
                      src={s.image}
                      alt={s.brand}
                      className="w-24 h-24 rounded-xl object-cover border border-stone-300 shrink-0"
                    />
                    <div className="space-y-1.5">
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black border border-emerald-300">
                        {s.metric}
                      </span>
                      <h4 className="text-sm font-black text-gray-900">{s.brand}</h4>
                      <p className="text-[11px] text-gray-600 font-medium leading-relaxed">
                        {s.desc}
                      </p>
                      <p className="text-[10px] text-gray-400 font-bold">
                        담당: {s.director}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: 📥 1:1 창업컨설팅 접수 내역 (신청자 관리 & 이사장 직통)             */}
      {/* ========================================================================= */}
      {activeTab === 'inquiry_manage' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200 pb-4">
              <div>
                <h3 className="text-lg font-black text-gray-900 flex items-center gap-2">
                  <Phone className="w-5 h-5 text-[#2B7752]" />
                  <span>홈페이지 1:1 외식 창업 컨설팅 접수 목록</span>
                </h3>
                <p className="text-xs text-gray-500 font-medium mt-1">
                  고객이 '교수 1:1 컨설팅 신청' 또는 '창업 상담'을 통해 접수한 실시간 신청 데이터입니다.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-amber-50 text-amber-900 text-xs font-bold rounded-xl border border-amber-200">
                  신청접수 {inquiries.filter((q) => q.status === '신청접수').length}건
                </span>
                <span className="px-3 py-1 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-xl border border-emerald-200">
                  상담진행 {inquiries.filter((q) => q.status === '상담진행중').length}건
                </span>
              </div>
            </div>

            {/* Inquiries Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-gray-700">
                <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="py-3.5 px-4">접수일</th>
                    <th className="py-3.5 px-4">신청자명</th>
                    <th className="py-3.5 px-4">연락처</th>
                    <th className="py-3.5 px-4">희망 교수/업종</th>
                    <th className="py-3.5 px-4">예상 매장 규모</th>
                    <th className="py-3.5 px-4">상태</th>
                    <th className="py-3.5 px-4">관리자 메모</th>
                    <th className="py-3.5 px-4 text-right">관리</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {inquiries.map((inq) => (
                    <tr key={inq.id} className="hover:bg-stone-50/80 transition-colors">
                      <td className="py-3 px-4 text-gray-400 font-mono text-[11px]">
                        {inq.date}
                      </td>
                      <td className="py-3 px-4 font-black text-gray-900">
                        {inq.name}
                      </td>
                      <td className="py-3 px-4 font-medium text-gray-600">
                        <a
                          href={`tel:${inq.phone.replace(/[^0-9]/g, '')}`}
                          className="hover:text-emerald-700 font-bold flex items-center gap-1"
                        >
                          <Phone className="w-3 h-3 text-emerald-600" />
                          <span>{inq.phone}</span>
                        </a>
                      </td>
                      <td className="py-3 px-4">
                        <div className="space-y-0.5">
                          <span className="font-bold text-gray-900 block">{inq.requestedFaculty}</span>
                          <span className="text-[11px] text-gray-500">{inq.storeType} ({inq.location})</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 font-medium text-gray-600">
                        {inq.area || '-'}
                      </td>
                      <td className="py-3 px-4">
                        <select
                          value={inq.status}
                          onChange={(e) => handleUpdateInquiryStatus(inq.id, e.target.value)}
                          className={`text-xs font-bold px-2 py-1 rounded-lg border focus:outline-none cursor-pointer ${
                            inq.status === '신청접수'
                              ? 'bg-amber-50 text-amber-900 border-amber-300'
                              : inq.status === '상담진행중'
                              ? 'bg-blue-50 text-blue-900 border-blue-300'
                              : inq.status === '컨설팅완료'
                              ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                              : 'bg-stone-100 text-stone-700 border-stone-300'
                          }`}
                        >
                          <option value="신청접수">신청접수</option>
                          <option value="상담진행중">상담진행중</option>
                          <option value="컨설팅완료">컨설팅완료</option>
                          <option value="보류">보류</option>
                        </select>
                      </td>
                      <td className="py-3 px-4 max-w-xs">
                        <input
                          type="text"
                          defaultValue={inq.memo}
                          onBlur={(e) => handleUpdateInquiryMemo(inq.id, e.target.value)}
                          placeholder="메모 입력 후 엔터/포커스 해제..."
                          className="w-full text-[11px] px-2 py-1 bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        />
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => handleDeleteInquiry(inq.id)}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                          title="삭제"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* CASE ADD/EDIT MODAL                                                       */}
      {/* ========================================================================= */}
      {isCaseModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-stone-200">
            <div className="flex items-center justify-between border-b border-stone-200 pb-4">
              <h3 className="text-lg font-black text-gray-900">
                {editingCase ? '프랜차이즈 사례 수정' : '신규 프랜차이즈 사례 등록'}
              </h3>
              <button
                onClick={() => setIsCaseModalOpen(false)}
                className="p-1.5 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-stone-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCaseModalSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  브랜드 및 매장명 <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="예: 이학갈비 사가정점, 칠곡제면소 본점"
                  value={caseBrand}
                  onChange={(e) => setCaseBrand(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">지역/소재지</label>
                  <input
                    type="text"
                    placeholder="예: 서울 면목동, 부산 서면"
                    value={caseLocation}
                    onChange={(e) => setCaseLocation(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">지역 구분</label>
                  <select
                    value={caseRegion}
                    onChange={(e) => setCaseRegion(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                  >
                    <option value="국내">국내 프로젝트</option>
                    <option value="해외">해외 / 글로벌</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">업종 카테고리</label>
                  <select
                    value={caseCategory}
                    onChange={(e) => setCaseCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                  >
                    <option value="korean">대형 한식명가</option>
                    <option value="franchise">프랜차이즈</option>
                    <option value="world">세계요리·일식</option>
                    <option value="academy">조리아카데미</option>
                    <option value="global">글로벌·해외</option>
                    <option value="cafe">카페·베이커리</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">수행 업무</label>
                  <input
                    type="text"
                    placeholder="설계, 감리, 디자인컨설팅"
                    value={caseRole}
                    onChange={(e) => setCaseRole(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">상세 특징 / 업종 설명</label>
                <input
                  type="text"
                  placeholder="예: 프리미엄 숯불갈비 전문점, 전통 면요리 한식당"
                  value={caseType}
                  onChange={(e) => setCaseType(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="caseHighlight"
                  checked={caseHighlight}
                  onChange={(e) => setCaseHighlight(e.target.checked)}
                  className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                />
                <label htmlFor="caseHighlight" className="font-bold text-gray-800 cursor-pointer">
                  주요 추천/주목 프로젝트로 지정 (배지 표시)
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setIsCaseModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-stone-300 text-gray-700 font-bold hover:bg-stone-50 transition"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#2B7752] hover:bg-[#20573c] text-white font-bold transition shadow-md"
                >
                  저장하기
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
