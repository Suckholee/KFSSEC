import React, { useState, useEffect } from 'react';
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
  const [activeTab, setActiveTab] = useState('visual_editor'); // 'visual_editor', 'courses_db', 'inquiries', 'youtube', 'banner'
  const [isSavedNotice, setIsSavedNotice] = useState(false);
  const [editingSection, setEditingSection] = useState(null); // 'youtube', 'banner'

  // Courses Database State
  const [coursesList, setCoursesList] = useState(getCoursesFromDB());
  const [editingCourse, setEditingCourse] = useState(null); // Course currently being created or edited
  const [showCourseFormModal, setShowCourseFormModal] = useState(false);

  // Default Inquiries list if postsList not provided
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
    {
      id: 3,
      category: '문의',
      title: '소상공인 100년 전통 발효 소스 전수 과정 문의',
      author: '최 OOO',
      date: '2024.02.10',
      status: 'completed',
      content: '기존 매장 메뉴 리뉴얼 및 셰프 1:1 레시피 전수 과정 문의드립니다.',
      reply: {
        author: '사단법인 한국외식창업교육원',
        date: '2024.02.11',
        content: '안녕하세요, 한국외식창업교육원 명인사업단입니다. 전수 과정 상세 안내서가 메일로 발송되었습니다.',
      },
    },
  ];

  const [adminInquiries, setAdminInquiries] = useState(defaultInquiries);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [inquiryReplyText, setInquiryReplyText] = useState('');
  const [inquiryFilter, setInquiryFilter] = useState('all');

  // YouTube Media State
  const [ytTitle, setYtTitle] = useState(siteData.youtube.title);
  const [ytSubtitle, setYtSubtitle] = useState(siteData.youtube.subtitle);
  const [videos, setVideos] = useState(siteData.youtube.videos);

  // Banner State
  const [bannerActive, setBannerActive] = useState(siteData.banner.active);
  const [bannerTitle, setBannerTitle] = useState(siteData.banner.title);

  // Save Courses DB to LocalStorage and trigger update
  const handleSaveCourseForm = (e) => {
    e.preventDefault();
    if (!editingCourse.title || !editingCourse.startDate) {
      alert('교육과정명과 개강일을 입력해주세요.');
      return;
    }

    let updated;
    if (editingCourse.id) {
      updated = coursesList.map((c) => (c.id === editingCourse.id ? editingCourse : c));
    } else {
      const newCourse = {
        ...editingCourse,
        id: `c_${Date.now()}`,
      };
      updated = [newCourse, ...coursesList];
    }

    setCoursesList(updated);
    saveCoursesToDB(updated);
    setShowCourseFormModal(false);
    setEditingCourse(null);
    triggerSavedNotice();
    alert('🎉 교육과정 DB가 저장되었습니다. 교육 일정 및 시험 일정에 즉시 반영됩니다.');
  };

  const handleDeleteCourse = (id) => {
    if (window.confirm('정말 이 교육과정을 DB에서 삭제하시겠습니까? 관련 일정도 함께 제거됩니다.')) {
      const updated = coursesList.filter((c) => c.id !== id);
      setCoursesList(updated);
      saveCoursesToDB(updated);
      triggerSavedNotice();
    }
  };

  // Save YouTube Settings
  const handleSaveYouTube = () => {
    onUpdateSiteData({
      youtube: {
        ...siteData.youtube,
        title: ytTitle,
        subtitle: ytSubtitle,
        videos: videos,
      },
    });
    setEditingSection(null);
    triggerSavedNotice();
  };

  // Save Banner Settings
  const handleSaveBanner = () => {
    onUpdateSiteData({
      banner: {
        active: bannerActive,
        title: bannerTitle,
      },
    });
    setEditingSection(null);
    triggerSavedNotice();
  };

  const triggerSavedNotice = () => {
    setIsSavedNotice(true);
    setTimeout(() => setIsSavedNotice(false), 3000);
  };

  const handleAddVideo = () => {
    const newV = {
      id: `v_${Date.now()}`,
      videoUrl: 'https://www.youtube.com/watch?v=ZDZFUpS0fFE',
      videoId: 'ZDZFUpS0fFE',
      title: '새 동영상 제목을 입력하세요',
      subtitle: '영상 부제목 및 상세 설명을 입력하세요',
      channel: '한국외식창업교육원 공식 채널',
      categoryBadge: '신규 영상',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    };
    setVideos([...videos, newV]);
  };

  const handleRemoveVideo = (id) => {
    setVideos(videos.filter((v) => v.id !== id));
  };

  const handleUpdateVideoField = (id, field, value) => {
    setVideos(
      videos.map((v) => {
        if (v.id === id) {
          const updated = { ...v, [field]: value };
          if (field === 'videoUrl') {
            const regExp =
              /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
            const match = value.match(regExp);
            if (match && match[2].length === 11) {
              updated.videoId = match[2];
            }
          }
          return updated;
        }
        return v;
      })
    );
  };

  // Quick Preset Templates for Admin Inquiry Reply
  const applyAdminTemplate = (type) => {
    if (type === 'government') {
      setInquiryReplyText(
        '안녕하세요, 사단법인 한국외식창업교육원 사무국입니다.\n\n문의하신 청년 외식창업 정부 지원 정책의 경우, 만 39세 이하 예비 창업자 대상 교육 수강료 최대 80% 지원 혜택이 적용됩니다.\n자세한 서류 안내 및 지원금 신청은 본원 담당 컨설턴트(02-1234-5678)를 통해 1:1 안내받으실 수 있습니다.\n감사합니다.'
      );
    } else if (type === 'curriculum') {
      setInquiryReplyText(
        '안녕하세요, 한국외식창업교육원 교육팀입니다.\n\n수강생 1:1 맞춤형 N:N 커리큘럼 매칭 상담 예약이 접수되었습니다.\n희망하시는 수강 일정 및 업종(한식/일식/중식/카페)에 맞춰 담당 조리 명장이 직접 맞춤 상담 전화를 드릴 예정입니다.\n감사합니다.'
      );
    } else if (type === 'recipe') {
      setInquiryReplyText(
        '안녕하세요, 한국외식창업교육원 명인사업단입니다.\n\n소상공인 100년 전통 발효 소스 전수 과정 및 레시피 기술 이전에 관한 상세 카탈로그가 작성하신 이메일로 발송되었습니다.\n추가 문의사항은 언제든 편하게 남겨주세요.'
      );
    }
  };

  // Admin Reply Submit Handler
  const handleAdminInquiryReplySubmit = (e) => {
    e.preventDefault();
    if (!inquiryReplyText.trim()) {
      alert('답변 내용을 입력해 주세요.');
      return;
    }

    const replyData = {
      author: '사단법인 한국외식창업교육원',
      date: new Date().toISOString().split('T')[0].replace(/-/g, '.'),
      content: inquiryReplyText,
    };

    setAdminInquiries((prev) =>
      prev.map((item) =>
        item.id === selectedInquiry.id
          ? { ...item, reply: replyData, status: 'completed' }
          : item
      )
    );

    setSelectedInquiry((prev) => ({
      ...prev,
      reply: replyData,
      status: 'completed',
    }));

    setInquiryReplyText('');
    alert('🎉 공식 답변이 등록되었습니다. 수강생에게 알림이 발송되었습니다.');
  };

  const filteredInquiriesList = adminInquiries.filter((item) => {
    if (inquiryFilter === 'pending') return item.status === 'pending';
    if (inquiryFilter === 'completed') return item.status === 'completed';
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex flex-col font-sans selection:bg-emerald-200 selection:text-emerald-900">
      
      {/* Top White Admin Header Bar */}
      <header className="bg-white border-b border-gray-300 h-20 px-6 sm:px-10 flex items-center justify-between shadow-sm shrink-0 z-50">
        <div className="flex items-center gap-4">
          <div className="bg-emerald-100 p-2.5 rounded-2xl border border-emerald-300 text-emerald-800">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black text-black tracking-tight">
                한국외식창업교육원 관리자 센터
              </h1>
              <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 border border-emerald-300 px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-emerald-700" /> DYNAMIC DB CONSOLE
              </span>
            </div>
            <p className="text-xs text-gray-500 font-medium">
              홈페이지 실제 화면 및 교육과정·일정·자격시험 DB 실시간 동락 시스템
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={onExitAdmin}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-300 text-xs font-black rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <ExternalLink className="w-4 h-4 text-emerald-700" />
            <span>메인 사이트로 이동</span>
          </button>
          <button
            onClick={onLogout}
            className="px-4 py-2 bg-black hover:bg-gray-800 text-white text-xs font-black rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-md"
          >
            <LogOut className="w-4 h-4 text-rose-400" />
            <span>관리자 로그아웃</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        
        {/* White Sidebar Navigation */}
        <aside className="w-full md:w-64 bg-white border-r border-gray-300 p-6 space-y-3 shrink-0 shadow-xs">
          
          <button
            onClick={() => setActiveTab('visual_editor')}
            className={`w-full text-left py-3.5 px-4 rounded-2xl text-xs sm:text-sm font-black transition-all flex items-center gap-3 cursor-pointer ${
              activeTab === 'visual_editor'
                ? 'bg-black text-white shadow-lg shadow-gray-400/40'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Home className="w-4 h-4 text-emerald-400" />
            <span>🏠 홈화면 관리</span>
          </button>

          <button
            onClick={() => setActiveTab('courses_db')}
            className={`w-full text-left py-3.5 px-4 rounded-2xl text-xs sm:text-sm font-black transition-all flex items-center gap-3 cursor-pointer ${
              activeTab === 'courses_db'
                ? 'bg-black text-white shadow-lg shadow-gray-400/40'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Database className="w-4 h-4 text-emerald-400" />
            <span>📚 교육과정 & 일정/시험 DB</span>
          </button>

          <button
            onClick={() => setActiveTab('inquiries')}
            className={`w-full text-left py-3.5 px-4 rounded-2xl text-xs sm:text-sm font-black transition-all flex items-center justify-between cursor-pointer ${
              activeTab === 'inquiries'
                ? 'bg-black text-white shadow-lg shadow-gray-400/40'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center gap-3">
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>💬 수강생 문의 & 1:1 답변</span>
            </div>
            {adminInquiries.filter((i) => i.status === 'pending').length > 0 && (
              <span className="bg-rose-600 text-white text-[11px] font-black px-2 py-0.5 rounded-full">
                {adminInquiries.filter((i) => i.status === 'pending').length}
              </span>
            )}
          </button>

          <div className="pt-4 border-t border-gray-200 space-y-2">
            <span className="text-[11px] font-bold text-gray-400 uppercase px-2">빠른 항목 수정</span>
            
            <button
              onClick={() => {
                setActiveTab('visual_editor');
                setEditingSection('youtube');
              }}
              className="w-full text-left py-2.5 px-3 text-xs font-bold text-gray-700 hover:bg-emerald-50 hover:text-emerald-900 rounded-xl flex items-center gap-2"
            >
              <Video className="w-4 h-4 text-emerald-700" />
              <span>유튜브 미디어 설정</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('visual_editor');
                setEditingSection('banner');
              }}
              className="w-full text-left py-2.5 px-3 text-xs font-bold text-gray-700 hover:bg-emerald-50 hover:text-emerald-900 rounded-xl flex items-center gap-2"
            >
              <FileText className="w-4 h-4 text-emerald-700" />
              <span>행사 띠 배너 설정</span>
            </button>
          </div>

        </aside>

        {/* Dynamic Admin View Section */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto bg-gray-100 space-y-6">
          
          {/* Notification Alert for Saved Changes */}
          {isSavedNotice && (
            <div className="bg-emerald-100 border-2 border-emerald-500 text-emerald-950 p-4 rounded-2xl flex items-center gap-3 animate-fadeIn shadow-md">
              <CheckCircle className="w-5 h-5 text-emerald-700" />
              <span className="text-sm font-black">
                교육과정 및 학사/시험일정 DB가 실시간으로 사이트에 연동되었습니다.
              </span>
            </div>
          )}

          {/* MODE 1: HOME PAGE MANAGEMENT */}
          {activeTab === 'visual_editor' && (
            <div className="space-y-6 animate-fadeIn w-full">
              
              <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-gray-300 shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-emerald-600 animate-ping" />
                  <span className="text-sm font-black text-black">
                    홈화면 관리 (홈페이지 실제 화면에서 직접 요소 클릭 및 수정)
                  </span>
                </div>
                <span className="text-xs font-bold text-gray-600">
                  각 섹션 우상단의 <strong className="text-emerald-700 font-black">[✏️ 수정]</strong> 버튼을 누르면 실시간 편집이 가능합니다.
                </span>
              </div>

              {/* LIVE PAGE CANVAS WRAPPER */}
              <div className="space-y-8 bg-white rounded-3xl p-4 sm:p-6 border-2 border-gray-300 shadow-xl text-gray-900 overflow-hidden relative">
                
                {/* 1. Event Banner Section Frame */}
                <div className="relative border-4 border-dashed border-emerald-500 rounded-2xl overflow-hidden group shadow-md">
                  <div className="absolute top-4 right-4 z-40">
                    <button
                      onClick={() => setEditingSection('banner')}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black rounded-xl shadow-xl flex items-center gap-1.5 cursor-pointer hover:scale-105 transition-all"
                    >
                      <Edit3 className="w-4 h-4" />
                      <span>✏️ 행사 띠배너 수정</span>
                    </button>
                  </div>
                  <EventBannerSection
                    bannerData={siteData.banner}
                    onEventClick={() => {}}
                  />
                </div>

                {/* 2. YouTube Media Section Frame */}
                <div className="relative border-4 border-dashed border-emerald-500 rounded-2xl overflow-hidden group shadow-md">
                  <div className="absolute top-4 right-4 z-40">
                    <button
                      onClick={() => setEditingSection('youtube')}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black rounded-xl shadow-xl flex items-center gap-1.5 cursor-pointer hover:scale-105 transition-all"
                    >
                      <Edit3 className="w-4 h-4" />
                      <span>✏️ 유튜브 방송미디어 수정</span>
                    </button>
                  </div>
                  <YouTubeMediaSection
                    youtubeData={siteData.youtube}
                  />
                </div>

                {/* 3. Netflix Courses Section Frame */}
                <div className="relative border-4 border-dashed border-gray-300 rounded-2xl overflow-hidden group shadow-md">
                  <div className="absolute top-4 right-4 z-40">
                    <button
                      onClick={() => setActiveTab('courses_db')}
                      className="px-4 py-2 bg-black text-white text-xs font-black rounded-xl shadow-xl flex items-center gap-1.5 cursor-pointer hover:scale-105 transition-all"
                    >
                      <Edit3 className="w-4 h-4 text-emerald-400" />
                      <span>✏️ 교육과정 DB 관리로 이동</span>
                    </button>
                  </div>
                  <NetflixCoursesSection
                    onSelectCourse={() => {}}
                  />
                </div>

              </div>

            </div>
          )}

          {/* MODE 2: COURSES & SCHEDULES DYNAMIC DATABASE MANAGEMENT */}
          {activeTab === 'courses_db' && (
            <div className="space-y-6 animate-fadeIn max-w-6xl">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-black pb-4">
                <div>
                  <h2 className="text-2xl font-black text-black tracking-tight">
                    교육과정 & 학사/시험일정 통합 DB 콘솔
                  </h2>
                  <p className="text-xs text-gray-500 font-bold mt-1">
                    여기서 등록/수정된 교육과정은 개강일/종강일/자격시험 일자가 [교육 일정], [자격 시험], [시험 일정]에 자동 연동됩니다.
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
                  className="px-5 py-2.5 bg-black hover:bg-gray-800 text-white font-black text-xs sm:text-sm rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer shrink-0"
                >
                  <Plus className="w-4 h-4 text-emerald-400" />
                  <span>➕ 새 교육과정 DB 등록</span>
                </button>
              </div>

              {/* Courses DB Table */}
              <div className="bg-white rounded-3xl p-6 border-2 border-black shadow-lg space-y-4">
                <div className="border border-gray-300 rounded-2xl overflow-hidden shadow-xs">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm font-sans">
                    <thead>
                      <tr className="bg-gray-100 text-black font-black border-b-2 border-black text-center">
                        <th className="py-3.5 px-3 w-14 border-r border-gray-300">ID</th>
                        <th className="py-3.5 px-4 w-24 border-r border-gray-300">분야</th>
                        <th className="py-3.5 px-6 border-r border-gray-300 text-left">교육과정명</th>
                        <th className="py-3.5 px-4 w-28 border-r border-gray-300">개강일 (교육일정)</th>
                        <th className="py-3.5 px-4 w-28 border-r border-gray-300">시험일 (시험일정)</th>
                        <th className="py-3.5 px-32 border-r border-gray-300">연계 자격증</th>
                        <th className="py-3.5 px-24">관리</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-300 text-gray-800 font-medium">
                      {coursesList.map((c, idx) => (
                        <tr key={c.id} className="hover:bg-emerald-50/50 text-center transition-colors">
                          <td className="py-3.5 px-3 border-r border-gray-200 font-mono text-gray-500 font-bold">
                            #{idx + 1}
                          </td>
                          <td className="py-3.5 px-4 border-r border-gray-200">
                            <span className="bg-emerald-100 text-emerald-900 font-black text-xs px-2.5 py-1 rounded-full border border-emerald-300">
                              {c.categoryName || c.industry}
                            </span>
                          </td>
                          <td className="py-3.5 px-6 border-r border-gray-200 text-left font-black text-black">
                            {c.title}
                          </td>
                          <td className="py-3.5 px-4 border-r border-gray-200 text-emerald-800 font-black text-xs">
                            📅 {c.startDate || '일정미정'}
                          </td>
                          <td className="py-3.5 px-4 border-r border-gray-200 text-rose-700 font-black text-xs">
                            📝 {c.examDate || '일정미정'}
                          </td>
                          <td className="py-3.5 px-4 border-r border-gray-200 text-left text-xs font-bold text-gray-700">
                            🏆 {c.certName}
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={() => {
                                  setEditingCourse(c);
                                  setShowCourseFormModal(true);
                                }}
                                className="p-1.5 bg-gray-100 hover:bg-black hover:text-white rounded-lg transition-colors cursor-pointer"
                                title="수정"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteCourse(c.id)}
                                className="p-1.5 bg-rose-100 text-rose-700 hover:bg-rose-600 hover:text-white rounded-lg transition-colors cursor-pointer"
                                title="삭제"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* MODE 3: INQUIRIES & BOARD MANAGEMENT */}
          {activeTab === 'inquiries' && (
            <div className="space-y-8 animate-fadeIn max-w-6xl">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-black pb-4">
                <div>
                  <h2 className="text-2xl font-black text-black tracking-tight">
                    수강생 1:1 문의 & 게시글 관리 워크스테이션
                  </h2>
                  <p className="text-xs text-gray-500 font-bold mt-1">
                    수강생 문의글을 조회하고 1-Click 보조 템플릿으로 빠르게 공식 답변을 등록합니다.
                  </p>
                </div>

                {/* Status Filter Pills */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setInquiryFilter('all')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                      inquiryFilter === 'all'
                        ? 'bg-black text-white'
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
                    }`}
                  >
                    전체 ({adminInquiries.length})
                  </button>
                  <button
                    onClick={() => setInquiryFilter('pending')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                      inquiryFilter === 'pending'
                        ? 'bg-amber-500 text-black'
                        : 'bg-amber-50 text-amber-800 border border-amber-300'
                    }`}
                  >
                    ⏳ 답변대기 ({adminInquiries.filter((i) => i.status === 'pending').length})
                  </button>
                  <button
                    onClick={() => setInquiryFilter('completed')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                      inquiryFilter === 'completed'
                        ? 'bg-emerald-700 text-white'
                        : 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                    }`}
                  >
                    ✓ 답변완료 ({adminInquiries.filter((i) => i.status === 'completed').length})
                  </button>
                </div>
              </div>

              {/* Main Inquiries Workspace */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Left Inquiries List */}
                <div className="lg:col-span-5 space-y-3">
                  {filteredInquiriesList.map((item) => {
                    const isSelected = selectedInquiry?.id === item.id;
                    const isAnswered = item.reply || item.status === 'completed';

                    return (
                      <div
                        key={item.id}
                        onClick={() => {
                          setSelectedInquiry(item);
                          setInquiryReplyText(item.reply ? item.reply.content : '');
                        }}
                        className={`p-5 rounded-2xl border-2 transition-all cursor-pointer space-y-2 ${
                          isSelected
                            ? 'bg-emerald-50 border-emerald-600 shadow-md'
                            : 'bg-white border-gray-300 hover:border-black shadow-xs'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span
                            className={`text-[10px] font-black px-2.5 py-0.5 rounded-full border ${
                              isAnswered
                                ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                                : 'bg-amber-100 text-amber-900 border-amber-300 animate-pulse'
                            }`}
                          >
                            {isAnswered ? '✓ 답변완료' : '⏳ 답변대기'}
                          </span>
                          <span className="text-[11px] font-mono text-gray-500 font-bold">
                            {item.date}
                          </span>
                        </div>

                        <h4 className="text-sm font-black text-black line-clamp-1">
                          {item.title}
                        </h4>

                        <div className="flex items-center justify-between text-xs text-gray-600 font-bold pt-1 border-t border-gray-200">
                          <span>작성자: {item.author}</span>
                          <ChevronRight className="w-4 h-4 text-gray-500" />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Right Workstation Panel with 1-Click Templates */}
                <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border-2 border-gray-300 shadow-lg space-y-6">
                  {selectedInquiry ? (
                    <div className="space-y-6">
                      
                      <div className="border-b-2 border-gray-200 pb-4 space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-black text-emerald-900 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
                            {selectedInquiry.category}
                          </span>
                          {selectedInquiry.status === 'completed' ? (
                            <span className="text-xs font-black text-emerald-900 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
                              ✓ 공식 답변 완료됨
                            </span>
                          ) : (
                            <span className="text-xs font-black text-amber-900 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
                              ⏳ 답변 대기중
                            </span>
                          )}
                        </div>

                        <h3 className="text-xl font-black text-black">
                          {selectedInquiry.title}
                        </h3>

                        <div className="flex items-center gap-4 text-xs font-bold text-gray-500">
                          <span>작성자: {selectedInquiry.author}</span>
                          <span>|</span>
                          <span>작성일: {selectedInquiry.date}</span>
                        </div>
                      </div>

                      <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 text-xs text-gray-800 font-medium whitespace-pre-wrap leading-relaxed">
                        {selectedInquiry.content}
                      </div>

                      <div className="bg-stone-50 p-5 rounded-2xl border-2 border-black space-y-4 shadow-sm">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-300 pb-3">
                          <div className="flex items-center gap-2 text-sm font-black text-black">
                            <ShieldCheck className="w-5 h-5 text-emerald-700" />
                            <span>공식 답변 작성 및 템플릿 완성</span>
                          </div>

                          {/* 1-Click Preset Template Shortcuts */}
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="text-[10px] font-bold text-gray-500">자주 쓰는 템플릿:</span>
                            <button
                              type="button"
                              onClick={() => applyAdminTemplate('government')}
                              className="px-2.5 py-1 bg-white hover:bg-black hover:text-white text-gray-800 border border-gray-300 rounded-lg text-xs font-bold transition-all cursor-pointer"
                            >
                              ⚡ 정부지원금
                            </button>
                            <button
                              type="button"
                              onClick={() => applyAdminTemplate('curriculum')}
                              className="px-2.5 py-1 bg-white hover:bg-black hover:text-white text-gray-800 border border-gray-300 rounded-lg text-xs font-bold transition-all cursor-pointer"
                            >
                              ⚡ 커리큘럼
                            </button>
                            <button
                              type="button"
                              onClick={() => applyAdminTemplate('recipe')}
                              className="px-2.5 py-1 bg-white hover:bg-black hover:text-white text-gray-800 border border-gray-300 rounded-lg text-xs font-bold transition-all cursor-pointer"
                            >
                              ⚡ 레시피 전수
                            </button>
                          </div>
                        </div>

                        <textarea
                          rows="5"
                          placeholder="수강생에게 전달할 답변을 입력하거나 상단 템플릿 버튼을 클릭하세요..."
                          value={inquiryReplyText}
                          onChange={(e) => setInquiryReplyText(e.target.value)}
                          className="w-full p-4 bg-white border border-gray-300 rounded-xl text-xs font-medium text-black focus:outline-none focus:border-black resize-none leading-relaxed"
                        />

                        <div className="flex items-center justify-between pt-1">
                          <span className="text-[11px] font-bold text-gray-500">
                            ✓ 등록 시 작성자 이메일/SMS 알림이 자동 전송됩니다.
                          </span>

                          <button
                            onClick={handleAdminInquiryReplySubmit}
                            className="px-6 py-2.5 bg-black hover:bg-gray-800 text-white font-black text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
                          >
                            <Send className="w-4 h-4 text-emerald-400" />
                            <span>공식 답변 등록/수정</span>
                          </button>
                        </div>
                      </div>

                    </div>
                  ) : (
                    <div className="py-20 text-center text-gray-500 font-bold space-y-2">
                      <MessageSquare className="w-10 h-10 mx-auto text-gray-400" />
                      <p>좌측 목록에서 답변할 수강생 문의글을 선택해주세요.</p>
                    </div>
                  )}
                </div>

              </div>

            </div>
          )}

        </main>

      </div>

      {/* COURSE FORM MODAL (CREATE / EDIT COURSE DB) */}
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
                  placeholder="예: 전통 한식 조리 마스터 & 셰프 창업 과정"
                  value={editingCourse.title}
                  onChange={(e) => setEditingCourse({ ...editingCourse, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-black font-black text-sm"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">업종 분야</label>
                <select
                  value={editingCourse.industry}
                  onChange={(e) => setEditingCourse({ ...editingCourse, industry: e.target.value, categoryName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-black"
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
                <label className="block text-gray-700 mb-1">수강 형태</label>
                <select
                  value={editingCourse.format}
                  onChange={(e) => setEditingCourse({ ...editingCourse, format: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-black"
                >
                  <option value="오프라인">오프라인</option>
                  <option value="온라인">온라인</option>
                  <option value="혼합형">혼합형</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-1">개강일 (📅 [교육 일정] 달력 자동 반영)</label>
                <input
                  type="date"
                  required
                  value={editingCourse.startDate}
                  onChange={(e) => setEditingCourse({ ...editingCourse, startDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-black font-mono"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">종강일 (학사일정 자동 반영)</label>
                <input
                  type="date"
                  value={editingCourse.endDate}
                  onChange={(e) => setEditingCourse({ ...editingCourse, endDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-black font-mono"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">자격시험 검정일 (📝 [시험 일정] 달력 자동 반영)</label>
                <input
                  type="date"
                  value={editingCourse.examDate}
                  onChange={(e) => setEditingCourse({ ...editingCourse, examDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-black font-mono"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">연계 자격증 명칭 (🏆 [자격 시험] 반영)</label>
                <input
                  type="text"
                  placeholder="예: 한식 조리기능장 및 지도사 1급"
                  value={editingCourse.certName}
                  onChange={(e) => setEditingCourse({ ...editingCourse, certName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-black"
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
                <label className="block text-gray-700 mb-1">담당 명장 / 강사</label>
                <input
                  type="text"
                  value={editingCourse.instructor}
                  onChange={(e) => setEditingCourse({ ...editingCourse, instructor: e.target.value })}
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

      {/* EDITING DRAWER / MODAL FOR YOUTUBE */}
      {editingSection === 'youtube' && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full border-2 border-black shadow-2xl space-y-6 animate-fadeIn max-h-[90vh] overflow-y-auto text-gray-900">
            <div className="flex items-center justify-between border-b border-gray-200 pb-3">
              <h3 className="text-lg font-black text-black flex items-center gap-2">
                <Video className="w-5 h-5 text-emerald-700" />
                <span>유튜브 미디어 라이브 편집</span>
              </h3>
              <button
                onClick={() => setEditingSection(null)}
                className="text-gray-400 hover:text-black font-black text-xl"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-black text-gray-700 mb-1">
                  섹션 타이틀
                </label>
                <input
                  type="text"
                  value={ytTitle}
                  onChange={(e) => setYtTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-gray-300 rounded-xl text-xs font-bold text-black focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-gray-700 mb-1">
                  비전 설명 문구
                </label>
                <textarea
                  rows="2"
                  value={ytSubtitle}
                  onChange={(e) => setYtSubtitle(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-gray-300 rounded-xl text-xs font-medium text-black focus:outline-none focus:border-black resize-none"
                />
              </div>

              <div className="pt-2">
                <h4 className="text-xs font-black text-black mb-2">등록 동영상 URL</h4>
                {videos.map((vid) => (
                  <div key={vid.id} className="p-3 bg-stone-50 rounded-xl border border-stone-300 space-y-2 mb-2">
                    <input
                      type="text"
                      value={vid.videoUrl}
                      onChange={(e) => handleUpdateVideoField(vid.id, 'videoUrl', e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-white border border-gray-300 rounded-lg text-xs font-mono text-emerald-800 font-bold"
                    />
                    <input
                      type="text"
                      value={vid.title}
                      onChange={(e) => handleUpdateVideoField(vid.id, 'title', e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-white border border-gray-300 rounded-lg text-xs font-bold text-black"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                onClick={() => setEditingSection(null)}
                className="px-4 py-2 bg-gray-200 text-gray-800 font-bold text-xs rounded-xl hover:bg-gray-300"
              >
                취소
              </button>
              <button
                onClick={handleSaveYouTube}
                className="px-6 py-2 bg-black text-white font-black text-xs rounded-xl shadow-md hover:bg-gray-800"
              >
                라이브 적용 및 저장
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDITING DRAWER / MODAL FOR BANNER */}
      {editingSection === 'banner' && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full border-2 border-black shadow-2xl space-y-6 animate-fadeIn text-gray-900">
            <div className="flex items-center justify-between border-b border-gray-200 pb-3">
              <h3 className="text-lg font-black text-black flex items-center gap-2">
                <FileText className="w-5 h-5 text-emerald-700" />
                <span>행사 띠배너 라이브 편집</span>
              </h3>
              <button
                onClick={() => setEditingSection(null)}
                className="text-gray-400 hover:text-black font-black text-xl"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between bg-stone-50 p-3 rounded-xl border border-stone-300">
                <span className="text-xs font-bold text-gray-700">띠배너 표시 활성화</span>
                <button
                  onClick={() => setBannerActive(!bannerActive)}
                  className={`px-3 py-1 rounded-lg text-xs font-black border ${
                    bannerActive ? 'bg-black text-white' : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {bannerActive ? 'ON' : 'OFF'}
                </button>
              </div>

              <div>
                <label className="block text-xs font-black text-gray-700 mb-1">
                  이벤트 배너 문구
                </label>
                <input
                  type="text"
                  value={bannerTitle}
                  onChange={(e) => setBannerTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-gray-300 rounded-xl text-xs font-bold text-black focus:outline-none focus:border-black"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                onClick={() => setEditingSection(null)}
                className="px-4 py-2 bg-gray-200 text-gray-800 font-bold text-xs rounded-xl hover:bg-gray-300"
              >
                취소
              </button>
              <button
                onClick={handleSaveBanner}
                className="px-6 py-2 bg-black text-white font-black text-xs rounded-xl shadow-md hover:bg-gray-800"
              >
                라이브 적용 및 저장
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
