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
} from 'lucide-react';
import Hero from '../Hero';
import EventBannerSection from '../EventBannerSection';
import YouTubeMediaSection from '../YouTubeMediaSection';
import NetflixCoursesSection from '../NetflixCoursesSection';
import FullPackageCoursesSection from '../FullPackageCoursesSection';
import CategoryCourseSection from '../CategoryCourseSection';
import BannerSection from '../BannerSection';

export default function AdminLayout({
  siteData,
  onUpdateSiteData,
  onExitAdmin,
  onLogout,
  postsList = [],
  setPostsList,
}) {
  const [activeTab, setActiveTab] = useState('visual_editor'); // 'visual_editor', 'inquiries', 'youtube', 'banner'
  const [isSavedNotice, setIsSavedNotice] = useState(false);
  const [editingSection, setEditingSection] = useState(null); // 'youtube', 'banner'

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
              <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-emerald-700" /> WHITE LIVE ADMIN
              </span>
            </div>
            <p className="text-xs text-gray-500 font-medium">
              실제 홈페이지 UI를 보면서 직접 클릭하여 편집하는 시각적 페이지 관리자
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
            <Monitor className="w-4 h-4 text-emerald-400" />
            <span>🖥️ WYSIWYG 라이브 에디터</span>
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
            <span className="text-[11px] font-bold text-gray-400 uppercase px-2">빠른 양식 편집</span>
            
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
                사이트 변경 사항이 실시간으로 홈페이지에 반영되었습니다.
              </span>
            </div>
          )}

          {/* MODE 1: VISUAL WYSIWYG LIVE CANVAS EDITOR (WHITE THEME) */}
          {activeTab === 'visual_editor' && (
            <div className="space-y-6 animate-fadeIn w-full">
              
              <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-gray-300 shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-emerald-600 animate-ping" />
                  <span className="text-sm font-black text-black">
                    라이브 시각적 프레임워크 (홈페이지 실제 화면에서 직접 요소 편집)
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
                      onClick={() => alert('교육과정 마스터 카탈로그 편집 화면으로 이동합니다.')}
                      className="px-4 py-2 bg-black text-white text-xs font-black rounded-xl shadow-xl flex items-center gap-1.5 cursor-pointer hover:scale-105 transition-all"
                    >
                      <Edit3 className="w-4 h-4 text-emerald-400" />
                      <span>✏️ 교육과정 카탈로그 관리</span>
                    </button>
                  </div>
                  <NetflixCoursesSection
                    onSelectCourse={() => {}}
                  />
                </div>

                {/* 4. Full Package Courses Section Frame */}
                <div className="relative border-4 border-dashed border-gray-300 rounded-2xl overflow-hidden group shadow-md">
                  <FullPackageCoursesSection
                    onSelectPackage={() => {}}
                  />
                </div>

              </div>

            </div>
          )}

          {/* MODE 2: INQUIRIES & BOARD MANAGEMENT (WHITE THEME) */}
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

      {/* EDITING DRAWER / MODAL FOR YOUTUBE (WHITE THEME) */}
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

      {/* EDITING DRAWER / MODAL FOR BANNER (WHITE THEME) */}
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
