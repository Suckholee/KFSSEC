import React, { useState } from 'react';
import {
  LogOut,
  LayoutDashboard,
  Video,
  FileText,
  MessageSquare,
  Users,
  Settings,
  Plus,
  Trash2,
  Edit2,
  Save,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  ShieldAlert,
  ShieldCheck,
  Send,
  Pin,
  Clock,
  Sparkles,
  Eye,
  Monitor,
  Maximize2,
  Layers,
  Edit3,
  Home,
  BookOpen,
  Calendar,
  Award,
  Database,
  Star,
  TrendingUp,
  UserCheck,
  Megaphone,
  CreditCard,
  ChevronLeft,
  Search,
  Filter,
} from 'lucide-react';
import Hero from '../Hero';
import EventBannerSection from '../EventBannerSection';
import YouTubeMediaSection from '../YouTubeMediaSection';
import NetflixCoursesSection from '../NetflixCoursesSection';
import FullPackageCoursesSection from '../FullPackageCoursesSection';
import CategoryCourseSection from '../CategoryCourseSection';
import BannerSection from '../BannerSection';
import { getCoursesFromDB, saveCoursesToDB } from '../../services/courseDatabase';

export default function AdminLayout({
  siteData,
  onUpdateSiteData,
  onExitAdmin,
  onLogout,
  postsList = [],
  setPostsList,
}) {
  // Primary Navigation Group: 'home', 'courses', 'reservations', 'inquiries', 'reviews', 'analytics'
  const [primaryMenu, setPrimaryMenu] = useState('courses');
  const [secondarySubTab, setSecondarySubTab] = useState('course_list'); // Sub-tab within active category
  const [isSavedNotice, setIsSavedNotice] = useState(false);
  const [editingSection, setEditingSection] = useState(null);

  // Courses Database State
  const [coursesList, setCoursesList] = useState(getCoursesFromDB());
  const [editingCourse, setEditingCourse] = useState(null);
  const [showCourseFormModal, setShowCourseFormModal] = useState(false);

  // SmartPlace Student Reviews State
  const [reviewsList, setReviewsList] = useState([
    {
      id: 1,
      courseTitle: '전통 한식 조리 마스터 & 셰프 창업 과정',
      studentName: '김OO 수강생',
      rating: 5,
      date: '2024.02.28',
      content: '40년 조리 명장님의 1:1 발효 소스 비법 전수 덕분에 오픈 첫 달 매출이 30% 급증했습니다! 최고의 강의입니다.',
      reply: '감사합니다! 한국외식창업교육원은 수강생 여러분의 성공 창업을 끝까지 응원하겠습니다.',
    },
    {
      id: 2,
      courseTitle: '일식 횟집 & 초밥 오마카세 창업 실무',
      studentName: '이OO 수강생',
      rating: 5,
      date: '2024.02.25',
      content: '활어 오로시 칼질 기본기부터 오마카세 메뉴 구성까지 실습 위주라 당장 매장에 적용할 수 있었습니다.',
      reply: null,
    },
    {
      id: 3,
      courseTitle: '배달전문점 & 밀키트 HMR 식품 제조 실무',
      studentName: '박OO 수강생',
      rating: 5,
      date: '2024.02.20',
      content: '정부 지원금 연계 절차와 배달 플랫폼 상권 분석을 한 번에 해결할 수 있어서 큰 도움이 되었습니다.',
      reply: null,
    },
  ]);

  const [reviewReplyText, setReviewReplyText] = useState({});

  // Student Reservations & Enrollees State
  const [enrollees, setEnrollees] = useState([
    { id: 'e1', name: '박OO', phone: '010-1234-5678', course: '전통 한식 조리 마스터', date: '2024.02.29', status: '결제완료', amount: '4,500,000원' },
    { id: 'e2', name: '최OO', phone: '010-9876-5432', course: '일식 횟집 & 초밥 오마카세', date: '2024.02.28', status: '상담대기', amount: '5,200,000원' },
    { id: 'e3', name: '정OO', phone: '010-5555-7777', course: '배달전문점 & 밀키트 HMR', date: '2024.02.27', status: '결제완료', amount: '3,200,000원' },
  ]);

  // Default Inquiries list
  const defaultInquiries = [
    {
      id: 1,
      category: '문의',
      title: '청년 외식창업 정부지원금 연계 신청 방법 문의',
      author: '박 OOO',
      date: '2024.02.15',
      status: 'pending',
      content: '만 34세 이하 예비 창업자 대상 정부 지원 정책 연계 절차 및 준비 서류 문의드립니다.',
      reply: null,
    },
    {
      id: 2,
      category: '문의',
      title: '1:1 수강생 커리큘럼 매칭 상담 예약 문의',
      author: '이 OO',
      date: '2024.02.14',
      status: 'pending',
      content: '한식 마스터 과정 및 배달밀키트 창업과정 복수 수강 할인 혜택 수강료 상담 신청합니다.',
      reply: null,
    },
  ];

  const [adminInquiries, setAdminInquiries] = useState(defaultInquiries);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [inquiryReplyText, setInquiryReplyText] = useState('');
  const [inquiryFilter, setInquiryFilter] = useState('all');

  // YouTube & Banner State
  const [ytTitle, setYtTitle] = useState(siteData.youtube.title);
  const [ytSubtitle, setYtSubtitle] = useState(siteData.youtube.subtitle);
  const [videos, setVideos] = useState(siteData.youtube.videos);
  const [bannerActive, setBannerActive] = useState(siteData.banner.active);
  const [bannerTitle, setBannerTitle] = useState(siteData.banner.title);

  // Save Course DB
  const handleSaveCourseForm = (e) => {
    e.preventDefault();
    let updated;
    if (editingCourse.id) {
      updated = coursesList.map((c) => (c.id === editingCourse.id ? editingCourse : c));
    } else {
      const newCourse = { ...editingCourse, id: `c_${Date.now()}` };
      updated = [newCourse, ...coursesList];
    }
    setCoursesList(updated);
    saveCoursesToDB(updated);
    setShowCourseFormModal(false);
    setEditingCourse(null);
    triggerSavedNotice();
  };

  const handleDeleteCourse = (id) => {
    if (window.confirm('정말 이 교육과정을 DB에서 삭제하시겠습니까?')) {
      const updated = coursesList.filter((c) => c.id !== id);
      setCoursesList(updated);
      saveCoursesToDB(updated);
      triggerSavedNotice();
    }
  };

  // Review Reply Handler
  const handleReviewReplySubmit = (reviewId) => {
    const text = reviewReplyText[reviewId];
    if (!text || !text.trim()) return;

    setReviewsList((prev) =>
      prev.map((r) => (r.id === reviewId ? { ...r, reply: text } : r))
    );
    setReviewReplyText((prev) => ({ ...prev, [reviewId]: '' }));
    triggerSavedNotice();
  };

  const triggerSavedNotice = () => {
    setIsSavedNotice(true);
    setTimeout(() => setIsSavedNotice(false), 3000);
  };

  // Sub-menu definitions based on active primary icon (Kakao Business 2-Level Navigation)
  const getSecondaryMenus = () => {
    switch (primaryMenu) {
      case 'home':
        return [
          { id: 'visual_editor', label: '홈화면 라이브 에디터' },
          { id: 'banner_edit', label: '행사 띠배너 설정' },
          { id: 'youtube_edit', label: '유튜브 방송 미디어' },
        ];
      case 'courses':
        return [
          { id: 'course_list', label: '전체 교육과정 목록' },
          { id: 'course_add', label: '신규 과목 DB 등록' },
          { id: 'schedule_manage', label: '학사 및 개강일정' },
          { id: 'exam_manage', label: '자격시험 & 시험일정' },
        ];
      case 'reservations':
        return [
          { id: 'enrollees_list', label: '수강 신청자 명단' },
          { id: 'payment_status', label: '수강료 결제 현황' },
          { id: 'consulting_requests', label: '1:1 컨설팅 신청' },
        ];
      case 'inquiries':
        return [
          { id: 'inquiry_all', label: '1:1 수강 문의 전체' },
          { id: 'inquiry_pending', label: '답변 대기 문의' },
        ];
      case 'reviews':
        return [
          { id: 'review_list', label: '수강 후기 & 별점 관리' },
          { id: 'review_reply', label: '후기 답글 작성' },
        ];
      case 'analytics':
        return [
          { id: 'stats_overview', label: '방문자 & 신청 통계' },
          { id: 'marketing_hub', label: '마케팅 & 문자 발송' },
        ];
      default:
        return [];
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f6f8] text-gray-900 flex flex-col font-sans selection:bg-emerald-200 selection:text-emerald-900">
      
      {/* Top SmartPlace Style White Header Bar */}
      <header className="bg-[#1e2329] text-white h-16 px-6 flex items-center justify-between shadow-md shrink-0 z-50">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="bg-emerald-500 p-1.5 rounded-xl text-black">
              <ShieldCheck className="w-5 h-5 font-black" />
            </div>
            <h1 className="text-lg font-black tracking-tight flex items-center gap-2">
              <span>스마트 파트너 센터</span>
              <span className="text-[11px] font-mono bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded-full font-bold">
                SMART PLACE ADMIN
              </span>
            </h1>
          </div>
        </div>

        {/* Top Quick Links & User Controls */}
        <div className="flex items-center gap-4 text-xs font-bold">
          <span className="text-gray-400">사단법인 한국외식창업교육원 | 최고관리자</span>
          <div className="h-4 w-px bg-gray-700" />
          <button
            onClick={onExitAdmin}
            className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-200 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
            <span>메인 사이트로 이동</span>
          </button>
          <button
            onClick={onLogout}
            className="px-3 py-1.5 bg-rose-950/80 hover:bg-rose-900 text-rose-300 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>로그아웃</span>
          </button>
        </div>
      </header>

      {/* Main Container with 2-Tier Dual Left Sidebar (Kakao Business Style) */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* TIER 1: Far Left Narrow Icon Bar (64px - Kakao Partner Style) */}
        <nav className="w-16 bg-[#171b20] border-r border-gray-800 flex flex-col items-center py-4 space-y-4 shrink-0 z-20">
          <button
            onClick={() => {
              setPrimaryMenu('home');
              setSecondarySubTab('visual_editor');
            }}
            className={`w-11 h-11 rounded-2xl flex flex-col items-center justify-center transition-all cursor-pointer ${
              primaryMenu === 'home'
                ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-900/50 scale-105'
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
            title="홈화면 관리"
          >
            <Home className="w-5 h-5" />
            <span className="text-[9px] font-black mt-0.5">홈화면</span>
          </button>

          <button
            onClick={() => {
              setPrimaryMenu('courses');
              setSecondarySubTab('course_list');
            }}
            className={`w-11 h-11 rounded-2xl flex flex-col items-center justify-center transition-all cursor-pointer ${
              primaryMenu === 'courses'
                ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-900/50 scale-105'
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
            title="교육과정 DB"
          >
            <Database className="w-5 h-5" />
            <span className="text-[9px] font-black mt-0.5">강좌DB</span>
          </button>

          <button
            onClick={() => {
              setPrimaryMenu('reservations');
              setSecondarySubTab('enrollees_list');
            }}
            className={`w-11 h-11 rounded-2xl flex flex-col items-center justify-center transition-all cursor-pointer relative ${
              primaryMenu === 'reservations'
                ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-900/50 scale-105'
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
            title="수강신청 관리"
          >
            <UserCheck className="w-5 h-5" />
            <span className="text-[9px] font-black mt-0.5">수강신청</span>
          </button>

          <button
            onClick={() => {
              setPrimaryMenu('inquiries');
              setSecondarySubTab('inquiry_all');
            }}
            className={`w-11 h-11 rounded-2xl flex flex-col items-center justify-center transition-all cursor-pointer relative ${
              primaryMenu === 'inquiries'
                ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-900/50 scale-105'
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
            title="1:1 문의"
          >
            <MessageSquare className="w-5 h-5" />
            <span className="text-[9px] font-black mt-0.5">1:1문의</span>
            {adminInquiries.filter((i) => i.status === 'pending').length > 0 && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-500 rounded-full animate-ping" />
            )}
          </button>

          <button
            onClick={() => {
              setPrimaryMenu('reviews');
              setSecondarySubTab('review_list');
            }}
            className={`w-11 h-11 rounded-2xl flex flex-col items-center justify-center transition-all cursor-pointer ${
              primaryMenu === 'reviews'
                ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-900/50 scale-105'
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
            title="수강후기"
          >
            <Star className="w-5 h-5" />
            <span className="text-[9px] font-black mt-0.5">후기</span>
          </button>

          <button
            onClick={() => {
              setPrimaryMenu('analytics');
              setSecondarySubTab('stats_overview');
            }}
            className={`w-11 h-11 rounded-2xl flex flex-col items-center justify-center transition-all cursor-pointer ${
              primaryMenu === 'analytics'
                ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-900/50 scale-105'
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
            title="통계/마케팅"
          >
            <TrendingUp className="w-5 h-5" />
            <span className="text-[9px] font-black mt-0.5">통계</span>
          </button>
        </nav>

        {/* TIER 2: Secondary Expanding Sub-Panel (200px - Kakao & SmartPlace Hybrid) */}
        <aside className="w-52 bg-white border-r border-gray-300 p-4 space-y-4 shrink-0 shadow-xs z-10">
          <div className="px-2 border-b border-gray-200 pb-3">
            <h2 className="text-sm font-black text-black tracking-tight">
              {primaryMenu === 'home' && '홈화면 비주얼 관리'}
              {primaryMenu === 'courses' && '교육과정 DB 컨트롤'}
              {primaryMenu === 'reservations' && '수강신청 & 결제'}
              {primaryMenu === 'inquiries' && '1:1 수강 문의'}
              {primaryMenu === 'reviews' && '수강후기 & 별점'}
              {primaryMenu === 'analytics' && '통계 & 마케팅'}
            </h2>
            <p className="text-[10px] text-gray-500 font-bold mt-0.5">스마트 파트너 워크스페이스</p>
          </div>

          <div className="space-y-1">
            {getSecondaryMenus().map((menu) => (
              <button
                key={menu.id}
                onClick={() => setSecondarySubTab(menu.id)}
                className={`w-full text-left py-2.5 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-between cursor-pointer ${
                  secondarySubTab === menu.id
                    ? 'bg-emerald-50 text-emerald-950 border border-emerald-300 font-black shadow-xs'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span>{menu.label}</span>
                {secondarySubTab === menu.id && <ChevronRight className="w-3.5 h-3.5 text-emerald-700" />}
              </button>
            ))}
          </div>
        </aside>

        {/* MAIN WORKSTATION CANVAS AREA (Naver SmartPlace Dashboard Layout) */}
        <main className="flex-1 p-6 overflow-y-auto bg-[#f4f6f8] space-y-6">
          
          {/* SmartPlace Summary Stats Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-gray-300 shadow-xs flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-xs font-bold text-gray-500">누적 수강 신청자</span>
                <div className="text-2xl font-black text-black">1,240 명</div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  전월 대비 +15% 증가
                </span>
              </div>
              <div className="p-3 bg-emerald-100 rounded-2xl text-emerald-800">
                <Users className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-300 shadow-xs flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-xs font-bold text-gray-500">평균 수강 만족도</span>
                <div className="text-2xl font-black text-black flex items-center gap-1">
                  <span>4.95</span>
                  <span className="text-xs text-amber-500 font-bold">★ (348건)</span>
                </div>
                <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                  최고 등급 만족도
                </span>
              </div>
              <div className="p-3 bg-amber-100 rounded-2xl text-amber-800">
                <Star className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-300 shadow-xs flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-xs font-bold text-gray-500">이번 달 개강 과목</span>
                <div className="text-2xl font-black text-black">{coursesList.length} 개 강좌</div>
                <span className="text-[10px] font-bold text-sky-800 bg-sky-50 px-2 py-0.5 rounded-md border border-sky-200">
                  정원 마감 임박
                </span>
              </div>
              <div className="p-3 bg-sky-100 rounded-2xl text-sky-800">
                <BookOpen className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-300 shadow-xs flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-xs font-bold text-gray-500">미답변 1:1 문의</span>
                <div className="text-2xl font-black text-black">
                  {adminInquiries.filter((i) => i.status === 'pending').length} 건
                </div>
                <span className="text-[10px] font-bold text-rose-800 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
                  빠른 답변 필요
                </span>
              </div>
              <div className="p-3 bg-rose-100 rounded-2xl text-rose-800">
                <MessageSquare className="w-6 h-6" />
              </div>
            </div>
          </div>

          {/* DYNAMIC CONTENT PANELS */}
          {/* CATEGORY 1: COURSES DATABASE CONTROL PANEL */}
          {primaryMenu === 'courses' && (
            <div className="space-y-6 animate-fadeIn">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-black pb-3">
                <div>
                  <h3 className="text-xl font-black text-black tracking-tight">
                    네이버 스마트플레이스 스타일 교육과정 DB 관리자
                  </h3>
                  <p className="text-xs text-gray-500 font-bold mt-0.5">
                    등록된 강좌의 개강일, 수강료, 모집 상태를 시각적으로 컨트롤하고 학사 일정에 즉시 반영합니다.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setEditingCourse({
                      title: '',
                      category: 'hansik',
                      categoryName: '한식',
                      industry: '한식',
                      stage: '창업 준비',
                      format: '오프라인',
                      price: 4500000,
                      discountRate: 30,
                      duration: '4주 과정',
                      startDate: new Date().toISOString().split('T')[0],
                      endDate: '',
                      examDate: '',
                      certName: '한식 조리기능장 및 지도사 1급',
                      instructor: '안형상 이사장 / 40년 명장',
                      image: '/images/course_menu_dev.jpg',
                      description: '',
                    });
                    setShowCourseFormModal(true);
                  }}
                  className="px-5 py-2.5 bg-black hover:bg-gray-800 text-white font-black text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Plus className="w-4 h-4 text-emerald-400" />
                  <span>➕ 신규 강좌 DB 등록</span>
                </button>
              </div>

              {/* Visual SmartPlace Course Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {coursesList.map((c) => (
                  <div
                    key={c.id}
                    className="bg-white rounded-3xl p-5 border-2 border-gray-300 shadow-md space-y-4 hover:border-black transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-emerald-900 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
                          {c.categoryName || c.industry}
                        </span>
                        <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          모집중 (정원 15명)
                        </span>
                      </div>

                      <h4 className="text-base font-black text-black line-clamp-2">
                        {c.title}
                      </h4>

                      <div className="space-y-1 text-xs text-gray-600 font-bold border-t border-gray-200 pt-3">
                        <div className="flex items-center justify-between">
                          <span>📅 개강일:</span>
                          <span className="font-mono text-black">{c.startDate}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>📝 자격시험일:</span>
                          <span className="font-mono text-rose-700">{c.examDate || '미정'}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>💰 정가 수강료:</span>
                          <span className="font-mono text-emerald-900 font-black">{c.price.toLocaleString()}원</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-gray-200 flex items-center justify-end gap-2">
                      <button
                        onClick={() => {
                          setEditingCourse(c);
                          setShowCourseFormModal(true);
                        }}
                        className="px-3 py-1.5 bg-gray-100 hover:bg-black hover:text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                      >
                        수정
                      </button>
                      <button
                        onClick={() => handleDeleteCourse(c.id)}
                        className="px-3 py-1.5 bg-rose-100 text-rose-700 hover:bg-rose-600 hover:text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                      >
                        삭제
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* CATEGORY 2: STUDENT REVIEWS & RATING MANAGEMENT PANEL (Naver SmartPlace Review Style) */}
          {primaryMenu === 'reviews' && (
            <div className="space-y-6 animate-fadeIn max-w-5xl">
              <div className="border-b-2 border-black pb-3">
                <h3 className="text-xl font-black text-black tracking-tight">
                  수강생 방문후기 & 별점 관리자
                </h3>
                <p className="text-xs text-gray-500 font-bold mt-0.5">
                  수강생들이 작성한 생생한 별점 후기를 확인하고 공식 감사 답글을 달 수 있습니다.
                </p>
              </div>

              <div className="space-y-4">
                {reviewsList.map((rev) => (
                  <div key={rev.id} className="bg-white p-6 rounded-3xl border-2 border-gray-300 shadow-sm space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-amber-500 font-black text-sm">
                          {'★'.repeat(rev.rating)}
                        </span>
                        <span className="text-xs font-black text-black">{rev.studentName}</span>
                      </div>
                      <span className="text-xs font-mono text-gray-400">{rev.date}</span>
                    </div>

                    <div className="text-xs font-bold text-emerald-900 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                      강좌: {rev.courseTitle}
                    </div>

                    <p className="text-xs text-gray-800 font-medium leading-relaxed bg-stone-50 p-4 rounded-2xl border border-stone-200">
                      "{rev.content}"
                    </p>

                    {rev.reply ? (
                      <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-300 text-xs text-emerald-950 font-medium space-y-1">
                        <span className="font-black text-emerald-900">↳ 사단법인 한국외식창업교육원 공식 답글:</span>
                        <p>{rev.reply}</p>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 pt-2">
                        <input
                          type="text"
                          placeholder="수강생 후기에 답글을 입력해 주세요..."
                          value={reviewReplyText[rev.id] || ''}
                          onChange={(e) =>
                            setReviewReplyText({ ...reviewReplyText, [rev.id]: e.target.value })
                          }
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-xl text-xs font-medium focus:outline-none focus:border-black"
                        />
                        <button
                          onClick={() => handleReviewReplySubmit(rev.id)}
                          className="px-4 py-2 bg-black hover:bg-gray-800 text-white font-black text-xs rounded-xl shadow-xs cursor-pointer"
                        >
                          답글 등록
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CATEGORY 3: VISUAL LIVE HOME EDITOR (Image 1 Panel style) */}
          {primaryMenu === 'home' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-white p-4 rounded-2xl border border-gray-300 flex items-center justify-between">
                <span className="text-sm font-black text-black">
                  🖥️ 홈화면 시각적 라이브 에디터 (실제 화면 직접 보면서 클릭 수정)
                </span>
                <span className="text-xs font-bold text-gray-500">
                  각 요소의 <strong className="text-emerald-700 font-black">[✏️ 수정]</strong> 버튼을 누르면 모달 편집창이 출력됩니다.
                </span>
              </div>

              {/* LIVE PAGE CANVAS WRAPPER */}
              <div className="space-y-8 bg-white rounded-3xl p-4 sm:p-6 border-2 border-gray-300 shadow-xl text-gray-900 overflow-hidden relative">
                <div className="relative border-4 border-dashed border-emerald-500 rounded-2xl overflow-hidden group shadow-md">
                  <EventBannerSection bannerData={siteData.banner} onEventClick={() => {}} />
                </div>
                <div className="relative border-4 border-dashed border-emerald-500 rounded-2xl overflow-hidden group shadow-md">
                  <YouTubeMediaSection youtubeData={siteData.youtube} />
                </div>
                <div className="relative border-4 border-dashed border-gray-300 rounded-2xl overflow-hidden group shadow-md">
                  <NetflixCoursesSection onSelectCourse={() => {}} />
                </div>
              </div>
            </div>
          )}

          {/* CATEGORY 4: INQUIRIES WORKSTATION */}
          {primaryMenu === 'inquiries' && (
            <div className="space-y-6 animate-fadeIn max-w-5xl">
              <div className="border-b-2 border-black pb-3">
                <h3 className="text-xl font-black text-black tracking-tight">
                  수강생 1:1 문의 & 1초 템플릿 답변 워크스테이션
                </h3>
              </div>

              <div className="space-y-4">
                {adminInquiries.map((item) => (
                  <div key={item.id} className="bg-white p-6 rounded-3xl border-2 border-gray-300 shadow-sm space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-emerald-900 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
                        {item.category}
                      </span>
                      <span className="text-xs font-mono text-gray-400">{item.date}</span>
                    </div>

                    <h4 className="text-base font-black text-black">{item.title}</h4>
                    <p className="text-xs text-gray-700 bg-stone-50 p-4 rounded-2xl border border-stone-200 leading-relaxed">
                      {item.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </main>

      </div>

      {/* COURSE FORM MODAL */}
      {showCourseFormModal && editingCourse && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <form
            onSubmit={handleSaveCourseForm}
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full border-2 border-black shadow-2xl space-y-4 animate-fadeIn max-h-[90vh] overflow-y-auto text-gray-900"
          >
            <div className="flex items-center justify-between border-b-2 border-black pb-3">
              <h3 className="text-lg font-black text-black flex items-center gap-2">
                <Database className="w-5 h-5 text-emerald-700" />
                <span>교육과정 & 학사/시험일정 DB 등록/수정</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowCourseFormModal(false)}
                className="text-gray-400 hover:text-black font-black text-xl"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bold">
              <div className="sm:col-span-2">
                <label className="block text-gray-700 mb-1">교육과정명</label>
                <input
                  type="text"
                  required
                  value={editingCourse.title}
                  onChange={(e) => setEditingCourse({ ...editingCourse, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-black font-black text-sm"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">개강일 (📅 [교육 일정] 달력 연동)</label>
                <input
                  type="date"
                  required
                  value={editingCourse.startDate}
                  onChange={(e) => setEditingCourse({ ...editingCourse, startDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-black font-mono"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">자격시험 검정일 (📝 [시험 일정] 달력 연동)</label>
                <input
                  type="date"
                  value={editingCourse.examDate}
                  onChange={(e) => setEditingCourse({ ...editingCourse, examDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-black font-mono"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">정가 수강료 (원)</label>
                <input
                  type="number"
                  value={editingCourse.price}
                  onChange={(e) => setEditingCourse({ ...editingCourse, price: parseInt(e.target.value, 10) || 0 })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-black font-mono"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">연계 자격증 명칭</label>
                <input
                  type="text"
                  value={editingCourse.certName}
                  onChange={(e) => setEditingCourse({ ...editingCourse, certName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-black"
                />
              </div>
            </div>

            <div className="pt-3 flex items-center justify-end gap-2 border-t border-gray-200">
              <button
                type="button"
                onClick={() => setShowCourseFormModal(false)}
                className="px-5 py-2 bg-gray-200 text-gray-800 font-bold text-xs rounded-xl hover:bg-gray-300"
              >
                취소
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-black text-white font-black text-xs rounded-xl shadow-md hover:bg-gray-800 transition-colors"
              >
                DB 저장 및 사이트 실시간 반영
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}
