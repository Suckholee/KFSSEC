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
  Code,
  Terminal,
  Paperclip,
  CheckSquare,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  PenTool,
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

  // Developer Inquiries / Communications State
  const [devInquiries, setDevInquiries] = useState([
    {
      id: 3,
      type: '신규기능',
      title: '관리자 서브 라우팅(/admin/courses, /admin/developer) 구축 요청',
      description: '운영 편의성을 위해 관리자 센터 메뉴 클릭 시 주소가 다이내믹하게 변경되고 새로고침/뒤로가기가 되도록 해주세요.',
      screenshot: null,
      status: 'completed',
      date: '2026.08.30 19:40',
      devReply: '✓ 구현 완료: window.history.pushState 및 Admin Sub-Routing(/admin/courses, /admin/developer) 구조 적용되었습니다.',
    },
    {
      id: 2,
      type: '신규기능',
      title: '수강생 필수 서비스 안내 결제 팝업 모달 연결 요청',
      description: '메인 랜딩페이지 결제 안내 배너 클릭 시 3 STEP 수강료 및 환불 안내 팝업 모달이 뜨도록 수정 부탁드립니다.',
      screenshot: '/images/course_menu_dev.jpg',
      status: 'completed',
      date: '2026.08.30 19:02',
      devReply: '✓ 구현 완료: PaymentGuideModal.jsx 작성 및 BannerSection 배너 클릭 이벤트 연동 완료되었습니다.',
    },
    {
      id: 1,
      type: 'UI개선',
      title: '관리자 센터 다크톤을 화이트 톤으로 전면 개편 요청',
      description: '관리자가 장시간 사용 시 눈 피로도가 덜 하도록 깔끔한 오프화이트 톤과 에메랄드 포인트로 변경해 주세요.',
      screenshot: null,
      status: 'completed',
      date: '2026.08.30 18:59',
      devReply: '✓ 구현 완료: AdminLayout.jsx 전면 화이트 톤(White Theme) 및 고대비 파트너 뷰로 스타일링 적용되었습니다.',
    },
  ]);

  // Selected Inquiry for Board Row Expansion Detail
  const [expandedDevInquiryId, setExpandedDevInquiryId] = useState(3);
  const [isWriteFormOpen, setIsWriteFormOpen] = useState(false);

  // Form state for creating new Developer Inquiry
  const [newDevInquiryType, setNewDevInquiryType] = useState('버그수정');
  const [newDevInquiryTitle, setNewDevInquiryTitle] = useState('');
  const [newDevInquiryDesc, setNewDevInquiryDesc] = useState('');
  const [newDevInquiryScreenshot, setNewDevInquiryScreenshot] = useState(null);
  const devFileInputRef = useRef(null);

  // Hidden File Input Ref for course edit image upload
  const fileInputRef = useRef(null);

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
    } else if (parts[1] === 'developer') {
      menu = 'developer';
      subTab = 'dev_inquiry_list';
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

  // Developer Screenshot File Upload Handler
  const handleDevScreenshotUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setNewDevInquiryScreenshot(ev.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Submit Developer Inquiry
  const handleSubmitDevInquiry = (e) => {
    e.preventDefault();
    if (!newDevInquiryTitle.trim() || !newDevInquiryDesc.trim()) {
      alert('문의 제목과 상세 내용을 입력해주세요.');
      return;
    }

    const created = {
      id: Date.now(),
      type: newDevInquiryType,
      title: newDevInquiryTitle,
      description: newDevInquiryDesc,
      screenshot: newDevInquiryScreenshot,
      status: 'pending',
      date: new Date().toISOString().replace('T', ' ').slice(0, 16).replace(/-/g, '.'),
      devReply: null,
    };

    setDevInquiries([created, ...devInquiries]);
    setExpandedDevInquiryId(created.id);
    setIsWriteFormOpen(false);
    setNewDevInquiryTitle('');
    setNewDevInquiryDesc('');
    setNewDevInquiryScreenshot(null);
    triggerSavedNotice();
    alert('🚀 개발자 소통 게시판에 문의 및 스크린샷이 성공적으로 등록되었습니다!');
  };

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
        const serverPath = await uploadImageAPI(base64Data, file.name);
        setSelectedCourseForEdit((prev) => ({
          ...prev,
          image: serverPath,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Dedicated Course Page Save Handler
  const handleSaveCourseDetail = async (e) => {
    e.preventDefault();
    if (!selectedCourseForEdit.title || !selectedCourseForEdit.startDate) {
      alert('교육과정명과 개강일을 입력해주세요.');
      return;
    }

    if (selectedCourseForEdit.id) {
      await updateCourseAPI(selectedCourseForEdit.id, selectedCourseForEdit);
    } else {
      await createCourseAPI(selectedCourseForEdit);
    }

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
      case 'developer':
        return [
          { id: 'dev_inquiry_list', label: '📋 개발 문의 게시판' },
          { id: 'dev_issue_track', label: '🐞 버그 제보 & 스크린샷' },
          { id: 'dev_feature_request', label: '✨ 신규 기능 제안' },
        ];
      case 'reservations':
        return [
          { id: 'enrollees_list', label: '수강 신청자 명단' },
          { id: 'payment_status', label: '수강료 결제 현황' },
        ];
      case 'inquiries':
        return [
          { id: 'inquiry_all', label: '1:1 수강 문의 전체' },
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
      
      {/* Top Header Bar */}
      <header className="bg-[#1e2329] text-white h-16 px-6 flex items-center justify-between shadow-md shrink-0 z-50">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="bg-emerald-500 p-1.5 rounded-xl text-black">
              <ShieldCheck className="w-5 h-5 font-black" />
            </div>
            <h1 className="text-lg font-black tracking-tight flex items-center gap-2">
              <span>스마트 파트너 센터</span>
              <span className="text-[11px] font-mono bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded-full font-bold">
                DEV CHANNEL CONNECTED
              </span>
            </h1>
          </div>
        </div>

        {/* Top Quick Links */}
        <div className="flex items-center gap-3 text-xs font-bold">
          <button
            onClick={() => switchPrimaryMenu('developer', 'dev_inquiry_list', null)}
            className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-md font-black animate-pulse"
          >
            <Code className="w-4 h-4 text-emerald-200" />
            <span>💻 개발자 1:1 문의 게시판</span>
          </button>

          <div className="h-4 w-px bg-gray-700" />
          
          <button
            onClick={onExitAdmin}
            className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-200 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
            <span>메인 사이트</span>
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

      {/* Main Container with 2-Tier Dual Left Sidebar */}
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

          {/* DEVELOPER INQUIRY CHANNEL ICON */}
          <button
            onClick={() => switchPrimaryMenu('developer', 'dev_inquiry_list', null)}
            className={`w-11 h-11 rounded-2xl flex flex-col items-center justify-center transition-all cursor-pointer border relative ${
              primaryMenu === 'developer'
                ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-900/50 scale-105 border-emerald-400'
                : 'text-emerald-400 hover:text-white hover:bg-gray-800 border-emerald-800/80 bg-emerald-950/40'
            }`}
            title="개발자 1:1 게시판"
          >
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-black animate-ping" />
            <Code className="w-5 h-5" />
            <span className="text-[9px] font-black mt-0.5">개발게시판</span>
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
              {primaryMenu === 'developer' && '💻 개발자 소통 게시판'}
              {primaryMenu === 'reservations' && '수강신청 & 결제'}
              {primaryMenu === 'inquiries' && '1:1 수강 문의'}
              {primaryMenu === 'reviews' && '수강후기 & 별점'}
            </h2>
            <p className="text-[10px] text-gray-500 font-bold mt-0.5">스마트 파트너 워크스페이스</p>
          </div>

          <div className="px-1">
            <button
              onClick={() => switchPrimaryMenu('developer', 'dev_inquiry_list', null)}
              className="w-full py-2 px-3 bg-emerald-900 text-emerald-100 hover:bg-black rounded-xl text-xs font-black transition-all flex items-center justify-between shadow-sm cursor-pointer border border-emerald-700"
            >
              <span className="flex items-center gap-1.5">
                <Code className="w-3.5 h-3.5 text-emerald-400" />
                <span>개발 문의 게시판 ➔</span>
              </span>
            </button>
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
                게시물이 성공적으로 등록되었습니다.
              </span>
            </div>
          )}

          {/* DYNAMIC SCREEN: DEVELOPER INQUIRY BOARD VIEW */}
          {primaryMenu === 'developer' && (
            <div className="space-y-6 animate-fadeIn max-w-6xl">
              
              {/* Header Title & Top Action Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-black pb-3">
                <div>
                  <h3 className="text-xl font-black text-black tracking-tight flex items-center gap-2">
                    <Terminal className="w-6 h-6 text-emerald-700" />
                    <span>개발자 소통 & 1:1 개발 문의 게시판</span>
                  </h3>
                  <p className="text-xs text-gray-500 font-bold mt-0.5">
                    개발자(Antigravity)와 주고받은 문의 및 기능 요청 조치 결과 게시판입니다.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsWriteFormOpen(!isWriteFormOpen)}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <PenTool className="w-4 h-4" />
                    <span>{isWriteFormOpen ? '✕ 문의 작성 닫기' : '✏️ 새 개발 문의 작성'}</span>
                  </button>
                </div>
              </div>

              {/* WRITE FORM COLLAPSIBLE PANEL */}
              {isWriteFormOpen && (
                <form onSubmit={handleSubmitDevInquiry} className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-black shadow-xl space-y-4 text-xs font-bold animate-fadeIn">
                  <div className="border-b border-gray-200 pb-3 flex items-center justify-between">
                    <h4 className="text-base font-black text-black flex items-center gap-2">
                      <Send className="w-4 h-4 text-emerald-700" />
                      <span>새 개발 문의 & 스크린샷 캡쳐 등록</span>
                    </h4>
                    <span className="text-xs text-emerald-800 font-mono">Form Status: Active</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    <div className="md:col-span-3">
                      <label className="block text-gray-700 mb-1">문의 유형</label>
                      <select
                        value={newDevInquiryType}
                        onChange={(e) => setNewDevInquiryType(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-xl font-black text-black focus:outline-none focus:border-black"
                      >
                        <option value="버그수정">🐞 버그수정</option>
                        <option value="신규기능">✨ 신규기능</option>
                        <option value="UI개선">🎨 UI개선</option>
                        <option value="성능기타">⚡ 성능기타</option>
                      </select>
                    </div>

                    <div className="md:col-span-9">
                      <label className="block text-gray-700 mb-1">문의 제목</label>
                      <input
                        type="text"
                        required
                        placeholder="예: 메인 랜딩페이지 띠배너 고해상도 지원 요청"
                        value={newDevInquiryTitle}
                        onChange={(e) => setNewDevInquiryTitle(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-xl font-bold text-black focus:outline-none focus:border-black"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-1">상세 요청 내용</label>
                    <textarea
                      rows="4"
                      required
                      placeholder="개발자에게 전달할 구체적인 증상 및 요청사항을 설명해주세요..."
                      value={newDevInquiryDesc}
                      onChange={(e) => setNewDevInquiryDesc(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-xl leading-relaxed focus:outline-none focus:border-black resize-none"
                    />
                  </div>

                  {/* SCREENSHOT FILE UPLOAD AREA */}
                  <div className="space-y-2 bg-stone-50 p-4 rounded-2xl border border-stone-300">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-black text-gray-800 flex items-center gap-1.5">
                        <Paperclip className="w-3.5 h-3.5 text-emerald-700" />
                        <span>스크린샷 이미지 첨부</span>
                      </span>

                      <button
                        type="button"
                        onClick={() => devFileInputRef.current && devFileInputRef.current.click()}
                        className="px-3.5 py-1.5 bg-black hover:bg-gray-800 text-white rounded-xl text-xs font-black transition-all cursor-pointer"
                      >
                        📁 내 컴퓨터 스크린샷 캡쳐 파일 선택
                      </button>

                      <input
                        ref={devFileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleDevScreenshotUpload}
                        className="hidden"
                      />
                    </div>

                    {newDevInquiryScreenshot && (
                      <div className="relative h-36 rounded-xl overflow-hidden border border-emerald-500 bg-black">
                        <img
                          src={newDevInquiryScreenshot}
                          alt="첨부 스크린샷"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => setNewDevInquiryScreenshot(null)}
                          className="absolute top-2 right-2 bg-rose-600 text-white w-6 h-6 rounded-full flex items-center justify-center font-black text-xs"
                        >
                          ✕
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsWriteFormOpen(false)}
                      className="px-4 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-800 font-black text-xs rounded-xl transition-all cursor-pointer"
                    >
                      취소
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>🚀 게시판에 문의글 및 스크린샷 등록</span>
                    </button>
                  </div>
                </form>
              )}

              {/* CLASSIC BOARD TABLE LIST (게시판 목록) */}
              <div className="bg-white rounded-3xl border-2 border-gray-300 shadow-md overflow-hidden">
                <div className="bg-gray-800 text-white px-6 py-3.5 flex items-center justify-between text-xs font-black">
                  <span>📋 개발 문의 게시글 목록 (총 {devInquiries.length}건)</span>
                  <span className="text-emerald-400 font-mono">게시판 형태 지원</span>
                </div>

                <div className="divide-y divide-gray-200 text-xs font-bold">
                  {/* Table Header */}
                  <div className="grid grid-cols-12 bg-gray-100 px-6 py-3 text-gray-600 font-black border-b border-gray-200">
                    <div className="col-span-1 text-center">번호</div>
                    <div className="col-span-2 text-center">유형</div>
                    <div className="col-span-5">문의 제목 & 첨부</div>
                    <div className="col-span-2 text-center">작성일시</div>
                    <div className="col-span-2 text-center">처리 상태</div>
                  </div>

                  {/* Table Rows */}
                  {devInquiries.map((ticket) => {
                    const isExpanded = expandedDevInquiryId === ticket.id;

                    return (
                      <div key={ticket.id} className="transition-colors hover:bg-stone-50">
                        
                        {/* Summary Row */}
                        <div
                          onClick={() => setExpandedDevInquiryId(isExpanded ? null : ticket.id)}
                          className="grid grid-cols-12 px-6 py-4 items-center cursor-pointer select-none"
                        >
                          <div className="col-span-1 text-center font-mono text-gray-500">#{ticket.id}</div>
                          <div className="col-span-2 text-center">
                            <span className="px-2.5 py-1 rounded-full bg-black text-white text-[10px] font-black">
                              {ticket.type}
                            </span>
                          </div>
                          <div className="col-span-5 font-black text-black flex items-center gap-2 pr-2">
                            <span>{ticket.title}</span>
                            {ticket.screenshot && (
                              <span className="text-[10px] bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded border border-emerald-300 flex items-center gap-1 font-mono">
                                📷 캡쳐첨부
                              </span>
                            )}
                          </div>
                          <div className="col-span-2 text-center font-mono text-gray-500 text-[11px]">{ticket.date}</div>
                          <div className="col-span-2 text-center flex items-center justify-center gap-2">
                            <span
                              className={`px-3 py-1 rounded-full text-[10px] font-black border ${
                                ticket.status === 'completed'
                                  ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                                  : 'bg-amber-100 text-amber-900 border-amber-300 animate-pulse'
                              }`}
                            >
                              {ticket.status === 'completed' ? '✓ 완료됨' : '⏳ 처리 진행중'}
                            </span>
                            {isExpanded ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                          </div>
                        </div>

                        {/* EXPANDED DETAIL BOARD POST VIEW */}
                        {isExpanded && (
                          <div className="bg-stone-50 border-t border-stone-300 p-6 space-y-4 animate-fadeIn">
                            <div className="bg-white p-5 rounded-2xl border border-stone-300 shadow-xs space-y-3">
                              <span className="text-xs font-black text-gray-800 flex items-center gap-2 border-b border-gray-100 pb-2">
                                <PenTool className="w-4 h-4 text-emerald-700" />
                                <span>상세 문의 내용</span>
                              </span>
                              <p className="text-xs text-gray-800 font-medium leading-relaxed whitespace-pre-wrap">
                                {ticket.description}
                              </p>

                              {ticket.screenshot && (
                                <div className="pt-2">
                                  <span className="text-[11px] font-bold text-gray-500 block mb-1.5">📷 첨부된 스크린샷 이미지:</span>
                                  <div className="relative max-w-xl h-64 rounded-2xl overflow-hidden border-2 border-gray-300 bg-black shadow-md">
                                    <img
                                      src={ticket.screenshot}
                                      alt="첨부 스크린샷"
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* Developer Reply Card */}
                            {ticket.devReply && (
                              <div className="bg-emerald-50 p-5 rounded-2xl border-2 border-emerald-400 text-xs font-bold text-emerald-950 space-y-2 shadow-xs">
                                <span className="font-black text-emerald-900 flex items-center gap-2 border-b border-emerald-200 pb-2 text-sm">
                                  <Terminal className="w-4 h-4 text-emerald-700" />
                                  <span>👨‍💻 개발자(Antigravity) 조치 및 작업 결과</span>
                                </span>
                                <p className="leading-relaxed font-mono text-xs">{ticket.devReply}</p>
                              </div>
                            )}
                          </div>
                        )}

                      </div>
                    );
                  })}
                </div>
              </div>

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
                  </div>

                  <div className="space-y-4 bg-stone-50 p-5 rounded-2xl border-2 border-emerald-500/80 shadow-sm">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-black text-black flex items-center gap-2">
                        <Image className="w-4 h-4 text-emerald-700" />
                        <span>강의 대표 커버 이미지 (서버 업로드 / URL)</span>
                      </label>

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

                    <div className="relative h-52 rounded-2xl overflow-hidden border-2 border-emerald-600 bg-black group shadow-md">
                      <img
                        src={selectedCourseForEdit.image || '/images/course_menu_dev.jpg'}
                        alt="강의 커버 프리뷰"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="space-y-2">
                      <input
                        type="text"
                        placeholder="이미지 URL 입력..."
                        value={selectedCourseForEdit.image || ''}
                        onChange={(e) => setSelectedCourseForEdit({ ...selectedCourseForEdit, image: e.target.value })}
                        className="w-full px-3.5 py-2 bg-white border border-gray-300 rounded-xl text-xs font-mono font-bold focus:outline-none focus:border-black"
                      />
                    </div>
                  </div>

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
                    </div>

                    <div className="bg-stone-50 rounded-2xl overflow-hidden border border-stone-300 shadow-sm space-y-3 p-4">
                      <div className="relative h-48 rounded-xl overflow-hidden bg-black">
                        <img
                          src={selectedCourseForEdit.image || '/images/course_menu_dev.jpg'}
                          alt="실시간 미리보기"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <h4 className="text-base font-black text-black leading-snug">
                        {selectedCourseForEdit.title || '강의명을 입력하세요'}
                      </h4>
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
