import React, { useState, useEffect, useRef } from 'react';
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
  Image,
  ArrowLeft,
  Check,
  Upload,
  FolderOpen,
} from 'lucide-react';
import Hero from '../Hero';
import EventBannerSection from '../EventBannerSection';
import YouTubeMediaSection from '../YouTubeMediaSection';
import NetflixCoursesSection from '../NetflixCoursesSection';
import FullPackageCoursesSection from '../FullPackageCoursesSection';
import CategoryCourseSection from '../CategoryCourseSection';
import BannerSection from '../BannerSection';
import {
  getCoursesFromDB,
  saveCoursesToDB,
  fetchCoursesFromAPI,
  createCourseAPI,
  updateCourseAPI,
  deleteCourseAPI,
  uploadImageAPI,
} from '../../services/courseDatabase';

export default function AdminLayout({
  siteData,
  onUpdateSiteData,
  onExitAdmin,
  onLogout,
  postsList = [],
  setPostsList,
}) {
  // Courses Database State
  const [coursesList, setCoursesList] = useState(getCoursesFromDB());

  // Load Real Courses from REST API on Mount
  useEffect(() => {
    fetchCoursesFromAPI().then((data) => {
      if (Array.isArray(data) && data.length > 0) {
        setCoursesList(data);
      }
    });
  }, []);

  // Parse initial primary menu and course selection from window.location.pathname
  const parsePathToState = () => {
    const path = window.location.pathname;
    const parts = path.split('/').filter(Boolean);
    
    let menu = 'courses';
    let subTab = 'course_list';
    let selectedCourse = null;

    if (parts[1] === 'home') {
      menu = 'home';
      subTab = 'visual_editor';
    } else if (parts[1] === 'reservations') {
      menu = 'reservations';
      subTab = 'enrollees_list';
    } else if (parts[1] === 'inquiries') {
      menu = 'inquiries';
      subTab = 'inquiry_all';
    } else if (parts[1] === 'reviews') {
      menu = 'reviews';
      subTab = 'review_list';
    } else if (parts[1] === 'courses') {
      menu = 'courses';
      if (parts[2]) {
        const found = getCoursesFromDB().find((c) => c.id === parts[2]);
        if (found) {
          selectedCourse = found;
        }
      }
    }

    return { menu, subTab, selectedCourse };
  };

  const initialState = parsePathToState();
  const [primaryMenu, setPrimaryMenu] = useState(initialState.menu);
  const [secondarySubTab, setSecondarySubTab] = useState(initialState.subTab);
  const [selectedCourseForEdit, setSelectedCourseForEdit] = useState(initialState.selectedCourse);
  const [isSavedNotice, setIsSavedNotice] = useState(false);

  // Hidden File Input Ref for direct computer image upload
  const fileInputRef = useRef(null);

  // Helper to push browser URL state dynamically
  const updateAdminUrl = (menu, subTab, courseId = null) => {
    let targetPath = `/admin/${menu}`;
    if (menu === 'courses' && courseId) {
      targetPath = `/admin/courses/${courseId}`;
    }
    if (window.location.pathname !== targetPath) {
      window.history.pushState({}, '', targetPath);
    }
  };

  const switchPrimaryMenu = (menu, subTab = 'course_list', course = null) => {
    setPrimaryMenu(menu);
    setSecondarySubTab(subTab);
    setSelectedCourseForEdit(course);
    updateAdminUrl(menu, subTab, course ? course.id : null);
  };

  useEffect(() => {
    const handlePopState = () => {
      const parsed = parsePathToState();
      setPrimaryMenu(parsed.menu);
      setSecondarySubTab(parsed.subTab);
      setSelectedCourseForEdit(parsed.selectedCourse);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Image Presets for Quick Selection
  const imagePresets = [
    { label: '조리 실습 / 메뉴 개발', url: '/images/course_menu_dev.jpg' },
    { label: '특급 호텔 레스토랑', url: '/images/course_restaurant.jpg' },
    { label: '배달 / 밀키트 포장', url: '/images/course_delivery.jpg' },
    { label: '카페 / 바리스타 / 디저트', url: '/images/course_cafe.jpg' },
    { label: '총회 세미나 현장', url: '/images/dir_1.jpg' },
    { label: '기업 설명회 현장', url: '/images/dir_2.jpg' },
  ];

  // Direct Computer Image File Upload Handler to Real Server API
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('이미지 파일(JPG, PNG, WEBP 등)만 업로드할 수 있습니다.');
        return;
      }
      const reader = new FileReader();
      reader.onload = async (event) => {
        const base64Data = event.target.result;
        // Upload file to Real REST API Server (/api/upload)
        const serverPath = await uploadImageAPI(base64Data, file.name);
        setSelectedCourseForEdit((prev) => ({
          ...prev,
          image: serverPath,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

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
  ]);

  const [reviewReplyText, setReviewReplyText] = useState({});

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

  // Dedicated Course Page Save Handler (Real REST API Integration)
  const handleSaveCourseDetail = async (e) => {
    e.preventDefault();
    if (!selectedCourseForEdit.title || !selectedCourseForEdit.startDate) {
      alert('교육과정명과 개강일을 입력해주세요.');
      return;
    }

    if (selectedCourseForEdit.id) {
      // Real API PUT Update
      await updateCourseAPI(selectedCourseForEdit.id, selectedCourseForEdit);
    } else {
      // Real API POST Create
      await createCourseAPI(selectedCourseForEdit);
    }

    // Refresh Real DB List
    const fresh = await fetchCoursesFromAPI();
    setCoursesList(fresh);
    switchPrimaryMenu('courses', 'course_list', null);
    triggerSavedNotice();
    alert('🎉 업로드된 이미지 및 강의 정보가 리얼 REST API 서버 DB에 저장되었습니다.');
  };

  const handleDeleteCourse = async (id) => {
    if (window.confirm('정말 이 교육과정을 리얼 DB에서 삭제하시겠습니까?')) {
      await deleteCourseAPI(id);
      const fresh = await fetchCoursesFromAPI();
      setCoursesList(fresh);
      switchPrimaryMenu('courses', 'course_list', null);
      triggerSavedNotice();
    }
  };

  const triggerSavedNotice = () => {
    setIsSavedNotice(true);
    setTimeout(() => setIsSavedNotice(false), 3000);
  };

  // Sub-menu definitions
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
        ];
      case 'inquiries':
        return [
          { id: 'inquiry_all', label: '1:1 수강 문의 전체' },
          { id: 'inquiry_pending', label: '답변 대기 문의' },
        ];
      case 'reviews':
        return [
          { id: 'review_list', label: '수강 후기 & 별점 관리' },
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
                REAL REST API DB CONNECTED
              </span>
            </h1>
          </div>
        </div>

        {/* Top Quick Links */}
        <div className="flex items-center gap-4 text-xs font-bold">
          <span className="text-gray-400">사단법인 한국외식창업교육원 | 리얼 백엔드 DB</span>
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
        
        {/* TIER 1: Far Left Narrow Icon Bar */}
        <nav className="w-16 bg-[#171b20] border-r border-gray-800 flex flex-col items-center py-4 space-y-4 shrink-0 z-20">
          <button
            onClick={() => switchPrimaryMenu('home', 'visual_editor', null)}
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
            onClick={() => switchPrimaryMenu('courses', 'course_list', null)}
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
            onClick={() => switchPrimaryMenu('reservations', 'enrollees_list', null)}
            className={`w-11 h-11 rounded-2xl flex flex-col items-center justify-center transition-all cursor-pointer ${
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
            onClick={() => switchPrimaryMenu('inquiries', 'inquiry_all', null)}
            className={`w-11 h-11 rounded-2xl flex flex-col items-center justify-center transition-all cursor-pointer relative ${
              primaryMenu === 'inquiries'
                ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-900/50 scale-105'
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
            title="1:1 문의"
          >
            <MessageSquare className="w-5 h-5" />
            <span className="text-[9px] font-black mt-0.5">1:1문의</span>
          </button>

          <button
            onClick={() => switchPrimaryMenu('reviews', 'review_list', null)}
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
        </nav>

        {/* TIER 2: Secondary Expanding Sub-Panel */}
        <aside className="w-52 bg-white border-r border-gray-300 p-4 space-y-4 shrink-0 shadow-xs z-10">
          <div className="px-2 border-b border-gray-200 pb-3">
            <h2 className="text-sm font-black text-black tracking-tight">
              {primaryMenu === 'home' && '홈화면 비주얼 관리'}
              {primaryMenu === 'courses' && '교육과정 DB 컨트롤'}
              {primaryMenu === 'reservations' && '수강신청 & 결제'}
              {primaryMenu === 'inquiries' && '1:1 수강 문의'}
              {primaryMenu === 'reviews' && '수강후기 & 별점'}
            </h2>
            <p className="text-[10px] text-gray-500 font-bold mt-0.5">스마트 파트너 워크스페이스</p>
          </div>

          <div className="space-y-1">
            {getSecondaryMenus().map((menu) => (
              <button
                key={menu.id}
                onClick={() => {
                  setSecondarySubTab(menu.id);
                  if (menu.id === 'course_add') {
                    const newBlank = {
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
                      description: '특급호텔 40년 경력 명장이 직접 전수하는 100년 전통 발효 소스 및 시그니처 레시피 전수',
                    };
                    switchPrimaryMenu('courses', 'course_add', newBlank);
                  } else {
                    switchPrimaryMenu(primaryMenu, menu.id, null);
                  }
                }}
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

        {/* MAIN WORKSTATION CANVAS AREA */}
        <main className="flex-1 p-6 overflow-y-auto bg-[#f4f6f8] space-y-6">
          
          {/* Notification Alert for Saved Changes */}
          {isSavedNotice && (
            <div className="bg-emerald-100 border-2 border-emerald-500 text-emerald-950 p-4 rounded-2xl flex items-center gap-3 animate-fadeIn shadow-md">
              <CheckCircle className="w-5 h-5 text-emerald-700" />
              <span className="text-sm font-black">
                리얼 REST API 서버 DB(server/data/courses.json)에 변경 사항이 저장되었습니다.
              </span>
            </div>
          )}

          {/* DYNAMIC SCREEN 1: DEDICATED FULL-PAGE COURSE DETAIL EDITOR */}
          {selectedCourseForEdit ? (
            <div className="space-y-6 animate-fadeIn max-w-6xl">
              
              {/* Back to List & Top Action Bar */}
              <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-gray-300 shadow-sm">
                <button
                  onClick={() => switchPrimaryMenu('courses', 'course_list', null)}
                  className="px-4 py-2 bg-gray-100 hover:bg-black hover:text-white text-gray-800 font-black text-xs rounded-xl transition-all flex items-center gap-2 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>⬅️ 전체 교육과정 목록으로 돌아가기</span>
                </button>

                <div className="flex items-center gap-3">
                  {selectedCourseForEdit.id && (
                    <button
                      onClick={() => handleDeleteCourse(selectedCourseForEdit.id)}
                      className="px-4 py-2 bg-rose-100 text-rose-700 hover:bg-rose-600 hover:text-white font-black text-xs rounded-xl transition-colors cursor-pointer"
                    >
                      🗑️ 이 강좌 삭제
                    </button>
                  )}
                  <button
                    onClick={handleSaveCourseDetail}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>💾 리얼 DB에 저장 및 라이브 적용</span>
                  </button>
                </div>
              </div>

              {/* Course Detail Editor Workstation Split View */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Left Form: Image File Upload & Text Detail Edit Controls */}
                <form onSubmit={handleSaveCourseDetail} className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border-2 border-gray-300 shadow-lg space-y-6">
                  <div className="border-b-2 border-black pb-3">
                    <h3 className="text-xl font-black text-black tracking-tight flex items-center gap-2">
                      <Edit3 className="w-5 h-5 text-emerald-700" />
                      <span>강의 정보 & 이미지 파일 업로드 편집기</span>
                    </h3>
                    <p className="text-xs text-gray-500 font-bold mt-0.5">
                      컴퓨터의 이미지를 파일로 업로드하면 리얼 REST API 서버(/api/upload)에 저장됩니다.
                    </p>
                  </div>

                  {/* Section A: Course Cover Image Selection */}
                  <div className="space-y-4 bg-stone-50 p-5 rounded-2xl border-2 border-emerald-500/80 shadow-sm">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-black text-black flex items-center gap-2">
                        <Image className="w-4 h-4 text-emerald-700" />
                        <span>강의 대표 커버 이미지 (서버 업로드 / URL)</span>
                      </label>

                      {/* DIRECT LOCAL FILE UPLOAD BUTTON */}
                      <button
                        type="button"
                        onClick={() => fileInputRef.current && fileInputRef.current.click()}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer hover:scale-105"
                      >
                        <Upload className="w-4 h-4" />
                        <span>📁 내 컴퓨터에서 이미지 파일 선택 및 업로드</span>
                      </button>

                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </div>

                    {/* Image Preview Box */}
                    <div className="relative h-52 rounded-2xl overflow-hidden border-2 border-emerald-600 bg-black group shadow-md">
                      <img
                        src={selectedCourseForEdit.image || '/images/course_menu_dev.jpg'}
                        alt="강의 커버 프리뷰"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 left-3 bg-black/85 text-emerald-400 font-mono font-black text-xs px-3 py-1.5 rounded-lg border border-emerald-700 shadow-md">
                        ✓ 대표 썸네일 이미지 적용중
                      </div>
                    </div>

                    <div className="space-y-2">
                      <input
                        type="text"
                        placeholder="이미지 절대 경로 또는 URL 주소 입력..."
                        value={selectedCourseForEdit.image || ''}
                        onChange={(e) => setSelectedCourseForEdit({ ...selectedCourseForEdit, image: e.target.value })}
                        className="w-full px-3.5 py-2 bg-white border border-gray-300 rounded-xl text-xs font-mono font-bold focus:outline-none focus:border-black"
                      />

                      {/* Quick Presets */}
                      <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        <span className="text-[11px] font-bold text-gray-500">추천 프리셋:</span>
                        {imagePresets.map((p, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setSelectedCourseForEdit({ ...selectedCourseForEdit, image: p.url })}
                            className={`px-2.5 py-1 text-[11px] font-bold rounded-lg border transition-all cursor-pointer ${
                              selectedCourseForEdit.image === p.url
                                ? 'bg-black text-white border-black'
                                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                            }`}
                          >
                            {p.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Section B: Course Title & Basic Specs */}
                  <div className="space-y-4 text-xs font-bold">
                    <div>
                      <label className="block text-gray-800 mb-1">강의명 (타이틀)</label>
                      <input
                        type="text"
                        required
                        value={selectedCourseForEdit.title || ''}
                        onChange={(e) => setSelectedCourseForEdit({ ...selectedCourseForEdit, title: e.target.value })}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm font-black text-black focus:outline-none focus:border-black"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-800 mb-1">업종 분야</label>
                        <select
                          value={selectedCourseForEdit.industry || '한식'}
                          onChange={(e) => setSelectedCourseForEdit({ ...selectedCourseForEdit, industry: e.target.value, categoryName: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-black font-bold"
                        >
                          <option value="한식">한식</option>
                          <option value="일식">일식</option>
                          <option value="중식">중식</option>
                          <option value="양식">양식</option>
                          <option value="카페/디저트">카페/디저트</option>
                          <option value="배달/밀키트">배달/밀키트</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-gray-800 mb-1">수강 형태</label>
                        <select
                          value={selectedCourseForEdit.format || '오프라인'}
                          onChange={(e) => setSelectedCourseForEdit({ ...selectedCourseForEdit, format: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-black font-bold"
                        >
                          <option value="오프라인">오프라인 실습</option>
                          <option value="온라인">온라인 실시간</option>
                          <option value="혼합형">온/오프라인 혼합</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="block text-gray-800 mb-1">정가 수강료 (원)</label>
                        <input
                          type="number"
                          value={selectedCourseForEdit.price || 0}
                          onChange={(e) => setSelectedCourseForEdit({ ...selectedCourseForEdit, price: parseInt(e.target.value, 10) || 0 })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-xl font-mono text-black focus:outline-none focus:border-black"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-800 mb-1">할인율 (%)</label>
                        <input
                          type="number"
                          value={selectedCourseForEdit.discountRate || 0}
                          onChange={(e) => setSelectedCourseForEdit({ ...selectedCourseForEdit, discountRate: parseInt(e.target.value, 10) || 0 })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-xl font-mono text-black focus:outline-none focus:border-black"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-800 mb-1">교육 기간</label>
                        <input
                          type="text"
                          value={selectedCourseForEdit.duration || '4주 과정'}
                          onChange={(e) => setSelectedCourseForEdit({ ...selectedCourseForEdit, duration: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-xl text-black focus:outline-none focus:border-black"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-800 mb-1">📅 개강일 (학사일정 연동)</label>
                        <input
                          type="date"
                          required
                          value={selectedCourseForEdit.startDate || ''}
                          onChange={(e) => setSelectedCourseForEdit({ ...selectedCourseForEdit, startDate: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-xl font-mono focus:outline-none focus:border-black"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-800 mb-1">📝 자격시험일 (시험달력 연동)</label>
                        <input
                          type="date"
                          value={selectedCourseForEdit.examDate || ''}
                          onChange={(e) => setSelectedCourseForEdit({ ...selectedCourseForEdit, examDate: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-xl font-mono focus:outline-none focus:border-black"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-800 mb-1">🏆 연계 자격증명</label>
                      <input
                        type="text"
                        value={selectedCourseForEdit.certName || ''}
                        onChange={(e) => setSelectedCourseForEdit({ ...selectedCourseForEdit, certName: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-black"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-800 mb-1">담당 명장 / 주방장 강사</label>
                      <input
                        type="text"
                        value={selectedCourseForEdit.instructor || ''}
                        onChange={(e) => setSelectedCourseForEdit({ ...selectedCourseForEdit, instructor: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-black"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-800 mb-1">강의 상세 커리큘럼 및 설명</label>
                      <textarea
                        rows="5"
                        value={selectedCourseForEdit.description || ''}
                        onChange={(e) => setSelectedCourseForEdit({ ...selectedCourseForEdit, description: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-xl leading-relaxed focus:outline-none focus:border-black resize-none"
                      />
                    </div>
                  </div>

                </form>

                {/* Right Panel: Live Student Preview Card */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="bg-white p-6 rounded-3xl border-2 border-gray-300 shadow-md space-y-4 sticky top-6">
                    <div className="border-b border-gray-200 pb-3 flex items-center justify-between">
                      <h4 className="text-sm font-black text-black flex items-center gap-2">
                        <Eye className="w-4 h-4 text-emerald-700" />
                        <span>수강생 화면 실시간 미리보기</span>
                      </h4>
                      <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        LIVE PREVIEW
                      </span>
                    </div>

                    {/* Live Preview Card */}
                    <div className="bg-stone-50 rounded-2xl overflow-hidden border border-stone-300 shadow-sm space-y-3 p-4">
                      <div className="relative h-48 rounded-xl overflow-hidden bg-black">
                        <img
                          src={selectedCourseForEdit.image || '/images/course_menu_dev.jpg'}
                          alt="실시간 미리보기"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 left-2 bg-emerald-600 text-white text-[10px] font-black px-2 py-0.5 rounded">
                          {selectedCourseForEdit.industry || '한식'}
                        </div>
                      </div>

                      <h4 className="text-base font-black text-black leading-snug">
                        {selectedCourseForEdit.title || '강의명을 입력하세요'}
                      </h4>

                      <p className="text-xs text-gray-600 font-medium line-clamp-3 leading-relaxed">
                        {selectedCourseForEdit.description || '강의 상세 설명이 여기에 노출됩니다.'}
                      </p>

                      <div className="space-y-1 text-xs text-gray-700 font-bold pt-2 border-t border-stone-200">
                        <div className="flex items-center justify-between">
                          <span>📅 개강일자:</span>
                          <span className="font-mono text-emerald-900 font-black">{selectedCourseForEdit.startDate || '일정 미정'}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>🏆 자격증:</span>
                          <span className="text-gray-900 font-black">{selectedCourseForEdit.certName || '없음'}</span>
                        </div>
                        <div className="flex items-center justify-between pt-1">
                          <span>💰 수강료:</span>
                          <span className="font-mono text-sm font-black text-black">
                            {(selectedCourseForEdit.price || 0).toLocaleString()}원
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          ) : (
            /* DYNAMIC SCREEN 2: ALL COURSES CARDS GRID VIEW */
            primaryMenu === 'courses' && (
              <div className="space-y-6 animate-fadeIn">
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-black pb-3">
                  <div>
                    <h3 className="text-xl font-black text-black tracking-tight">
                      네이버 스마트플레이스 스타일 교육과정 DB 관리자
                    </h3>
                    <p className="text-xs text-gray-500 font-bold mt-0.5">
                      강의 카드를 클릭하거나 [수정] 버튼을 누르면 이미지 파일 직접 업로드 및 내용을 전면 편집할 수 있는 상세 페이지로 전환됩니다.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      const newBlank = {
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
                        description: '특급호텔 40년 경력 명장이 직접 전수하는 100년 전통 발효 소스 및 시그니처 레시피 전수',
                      };
                      switchPrimaryMenu('courses', 'course_add', newBlank);
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
                      onClick={() => switchPrimaryMenu('courses', 'course_list', c)}
                      className="bg-white rounded-3xl p-5 border-2 border-gray-300 shadow-md space-y-4 hover:border-black hover:scale-[1.01] transition-all cursor-pointer flex flex-col justify-between group"
                    >
                      <div className="space-y-3">
                        <div className="relative h-44 rounded-2xl overflow-hidden bg-black">
                          <img
                            src={c.image || '/images/course_menu_dev.jpg'}
                            alt={c.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-3 left-3 bg-black/80 text-white text-[11px] font-black px-3 py-1 rounded-full">
                            {c.categoryName || c.industry}
                          </div>
                        </div>

                        <h4 className="text-base font-black text-black line-clamp-2 group-hover:text-emerald-900 transition-colors">
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

                      <div className="pt-3 border-t border-gray-200 flex items-center justify-between">
                        <span className="text-xs font-bold text-emerald-800">
                          클릭하여 이미지 파일 & 내용 편집 ➔
                        </span>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              switchPrimaryMenu('courses', 'course_list', c);
                            }}
                            className="px-3 py-1.5 bg-black text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                          >
                            수정
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteCourse(c.id);
                            }}
                            className="px-3 py-1.5 bg-rose-100 text-rose-700 hover:bg-rose-600 hover:text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                          >
                            삭제
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            )
          )}

          {/* OTHER MENU SCREENS */}
          {primaryMenu === 'home' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-white p-4 rounded-2xl border border-gray-300 flex items-center justify-between">
                <span className="text-sm font-black text-black">
                  🖥️ 홈화면 시각적 라이브 에디터 (실제 화면 직접 보면서 클릭 수정)
                </span>
              </div>
              <div className="space-y-8 bg-white rounded-3xl p-4 sm:p-6 border-2 border-gray-300 shadow-xl text-gray-900 overflow-hidden relative">
                <div className="relative border-4 border-dashed border-emerald-500 rounded-2xl overflow-hidden group shadow-md">
                  <EventBannerSection bannerData={siteData.banner} onEventClick={() => {}} />
                </div>
                <div className="relative border-4 border-dashed border-emerald-500 rounded-2xl overflow-hidden group shadow-md">
                  <YouTubeMediaSection youtubeData={siteData.youtube} />
                </div>
              </div>
            </div>
          )}

        </main>

      </div>

    </div>
  );
}
