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
} from 'lucide-react';

export default function AdminLayout({
  siteData,
  onUpdateSiteData,
  onExitAdmin,
  onLogout,
  postsList = [],
  setPostsList,
}) {
  const [activeTab, setActiveTab] = useState('youtube');
  const [isSavedNotice, setIsSavedNotice] = useState(false);

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
  const [inquiryFilter, setInquiryFilter] = useState('all'); // 'all', 'pending', 'completed'

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
    <div className="min-h-screen bg-[#070d0a] text-gray-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      
      {/* Top Admin Navigation Bar */}
      <header className="bg-[#0b1611] border-b border-emerald-900/60 h-20 px-6 sm:px-10 flex items-center justify-between shadow-xl">
        <div className="flex items-center gap-4">
          <div className="bg-emerald-500/20 p-2.5 rounded-2xl border border-emerald-500/40 text-emerald-400">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black text-white tracking-tight">
                한국외식창업교육원 관리자 센터
              </h1>
              <span className="text-[10px] font-mono bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded-full">
                ADMIN CONSOLE
              </span>
            </div>
            <p className="text-xs text-gray-400 font-medium">
              실시간 사이트 미디어 및 수강생 문의 1:1 답변 총괄 관리
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={onExitAdmin}
            className="px-4 py-2 bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-800 text-xs font-black rounded-xl transition-all flex items-center gap-2 cursor-pointer"
          >
            <ExternalLink className="w-4 h-4" />
            <span>메인 사이트로 이동</span>
          </button>
          <button
            onClick={onLogout}
            className="px-4 py-2 bg-rose-950/80 hover:bg-rose-900 text-rose-300 border border-rose-800 text-xs font-black rounded-xl transition-all flex items-center gap-2 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>관리자 로그아웃</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-64 bg-[#09120e] border-r border-emerald-900/50 p-6 space-y-2 shrink-0">
          
          <button
            onClick={() => setActiveTab('youtube')}
            className={`w-full text-left py-3 px-4 rounded-xl text-sm font-black transition-all flex items-center gap-3 cursor-pointer ${
              activeTab === 'youtube'
                ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-900/30'
                : 'text-gray-400 hover:text-white hover:bg-emerald-950/50'
            }`}
          >
            <Video className="w-4 h-4" />
            <span>유튜브 미디어 관리</span>
          </button>

          <button
            onClick={() => setActiveTab('inquiries')}
            className={`w-full text-left py-3 px-4 rounded-xl text-sm font-black transition-all flex items-center justify-between cursor-pointer ${
              activeTab === 'inquiries'
                ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-900/30'
                : 'text-gray-400 hover:text-white hover:bg-emerald-950/50'
            }`}
          >
            <div className="flex items-center gap-3">
              <MessageSquare className="w-4 h-4" />
              <span>문의 & 답변 관리</span>
            </div>
            {adminInquiries.filter((i) => i.status === 'pending').length > 0 && (
              <span className="bg-rose-600 text-white text-[11px] font-black px-2 py-0.5 rounded-full">
                {adminInquiries.filter((i) => i.status === 'pending').length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('banner')}
            className={`w-full text-left py-3 px-4 rounded-xl text-sm font-black transition-all flex items-center gap-3 cursor-pointer ${
              activeTab === 'banner'
                ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-900/30'
                : 'text-gray-400 hover:text-white hover:bg-emerald-950/50'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>행사 띠 배너 설정</span>
          </button>

        </aside>

        {/* Dynamic Admin View Section */}
        <main className="flex-1 p-6 sm:p-10 overflow-y-auto bg-[#060c09] space-y-6">
          
          {/* Notification Alert for Saved Changes */}
          {isSavedNotice && (
            <div className="bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 p-4 rounded-2xl flex items-center gap-3 animate-fadeIn">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
              <span className="text-sm font-bold">
                변경 사항이 성공적으로 저장되었습니다.
              </span>
            </div>
          )}

          {/* TAB 1: YOUTUBE MEDIA MANAGEMENT */}
          {activeTab === 'youtube' && (
            <div className="space-y-8 animate-fadeIn max-w-5xl">
              
              <div className="flex items-center justify-between border-b border-emerald-900/60 pb-4">
                <div>
                  <h2 className="text-2xl font-black text-white tracking-tight">
                    유튜브 미디어 섹션 설정
                  </h2>
                  <p className="text-xs text-gray-400 font-medium mt-1">
                    메인 랜딩페이지의 언론 보도 및 정기총회 영상 갤러리를 실시간 업데이트합니다.
                  </p>
                </div>
                <button
                  onClick={handleSaveYouTube}
                  className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs sm:text-sm rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>설정 저장하기</span>
                </button>
              </div>

              {/* Title & Subtitle Inputs */}
              <div className="bg-[#0b1611] p-6 rounded-3xl border border-emerald-900/60 space-y-4">
                <div>
                  <label className="block text-xs font-black text-emerald-400 mb-1">
                    섹션 제목
                  </label>
                  <input
                    type="text"
                    value={ytTitle}
                    onChange={(e) => setYtTitle(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#050a08] border border-emerald-900/80 rounded-xl text-sm font-bold text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black text-emerald-400 mb-1">
                    섹션 부제목 / 비전 안내 문구
                  </label>
                  <textarea
                    rows="2"
                    value={ytSubtitle}
                    onChange={(e) => setYtSubtitle(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#050a08] border border-emerald-900/80 rounded-xl text-xs font-bold text-white focus:outline-none focus:border-emerald-500 resize-none"
                  />
                </div>
              </div>

              {/* Video Items List */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-black text-white flex items-center gap-2">
                    <Video className="w-5 h-5 text-emerald-400" />
                    <span>등록된 방송/언론 영상 목록 ({videos.length}개)</span>
                  </h3>
                  <button
                    onClick={handleAddVideo}
                    className="px-4 py-2 bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-800 text-xs font-black rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>신규 동영상 추가</span>
                  </button>
                </div>

                <div className="space-y-6">
                  {videos.map((vid, idx) => (
                    <div
                      key={vid.id}
                      className="bg-[#0b1611] p-6 rounded-3xl border border-emerald-900/60 space-y-4 relative group"
                    >
                      <div className="flex items-center justify-between border-b border-emerald-950 pb-3">
                        <span className="text-xs font-black text-emerald-400 bg-emerald-950 px-3 py-1 rounded-full border border-emerald-800">
                          VIDEO #0{idx + 1}
                        </span>
                        <button
                          onClick={() => handleRemoveVideo(vid.id)}
                          className="p-1.5 bg-rose-950/80 hover:bg-rose-900 text-rose-300 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span>삭제</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                        <div className="md:col-span-8 space-y-3">
                          <div>
                            <label className="block text-[11px] font-black text-gray-400 mb-1">
                              유튜브 URL 주소
                            </label>
                            <input
                              type="text"
                              value={vid.videoUrl}
                              onChange={(e) =>
                                handleUpdateVideoField(vid.id, 'videoUrl', e.target.value)
                              }
                              className="w-full px-3 py-2 bg-[#050a08] border border-emerald-900/80 rounded-xl text-xs font-mono text-emerald-300"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-black text-gray-400 mb-1">
                              영상 제목
                            </label>
                            <input
                              type="text"
                              value={vid.title}
                              onChange={(e) =>
                                handleUpdateVideoField(vid.id, 'title', e.target.value)
                              }
                              className="w-full px-3 py-2 bg-[#050a08] border border-emerald-900/80 rounded-xl text-xs font-bold text-white"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-black text-gray-400 mb-1">
                              상세 설명
                            </label>
                            <input
                              type="text"
                              value={vid.subtitle}
                              onChange={(e) =>
                                handleUpdateVideoField(vid.id, 'subtitle', e.target.value)
                              }
                              className="w-full px-3 py-2 bg-[#050a08] border border-emerald-900/80 rounded-xl text-xs font-medium text-gray-300"
                            />
                          </div>
                        </div>

                        {/* Video Thumbnail Preview */}
                        <div className="md:col-span-4 flex flex-col justify-center items-center bg-[#050a08] rounded-2xl border border-emerald-950 p-2">
                          <img
                            src={`https://img.youtube.com/vi/${vid.videoId}/mqdefault.jpg`}
                            alt="미리보기"
                            className="w-full h-28 object-cover rounded-xl shadow-md"
                          />
                          <span className="text-[10px] font-mono text-gray-500 mt-2">
                            ID: {vid.videoId}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: INQUIRY & BOARD MANAGEMENT WITH 1-CLICK TEMPLATES */}
          {activeTab === 'inquiries' && (
            <div className="space-y-8 animate-fadeIn max-w-6xl">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-900/60 pb-4">
                <div>
                  <h2 className="text-2xl font-black text-white tracking-tight">
                    수강생 1:1 문의 & 게시글 관리 워크스테이션
                  </h2>
                  <p className="text-xs text-gray-400 font-medium mt-1">
                    수강생 문의글을 조회하고 1-Click 보조 템플릿으로 빠르게 공식 답변을 등록합니다.
                  </p>
                </div>

                {/* Status Filter Pills */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setInquiryFilter('all')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                      inquiryFilter === 'all'
                        ? 'bg-emerald-500 text-black'
                        : 'bg-[#0b1611] text-gray-400 border border-emerald-900'
                    }`}
                  >
                    전체 ({adminInquiries.length})
                  </button>
                  <button
                    onClick={() => setInquiryFilter('pending')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                      inquiryFilter === 'pending'
                        ? 'bg-amber-500 text-black'
                        : 'bg-[#0b1611] text-amber-400 border border-amber-900/50'
                    }`}
                  >
                    ⏳ 답변대기 ({adminInquiries.filter((i) => i.status === 'pending').length})
                  </button>
                  <button
                    onClick={() => setInquiryFilter('completed')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                      inquiryFilter === 'completed'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-[#0b1611] text-emerald-400 border border-emerald-900/50'
                    }`}
                  >
                    ✓ 답변완료 ({adminInquiries.filter((i) => i.status === 'completed').length})
                  </button>
                </div>
              </div>

              {/* Main Inquiries Workspace: Left List + Right Workstation Panel */}
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
                        className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                          isSelected
                            ? 'bg-emerald-950/80 border-emerald-500 shadow-lg'
                            : 'bg-[#0b1611] border-emerald-900/50 hover:border-emerald-700'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span
                            className={`text-[10px] font-black px-2.5 py-0.5 rounded-full border ${
                              isAnswered
                                ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                                : 'bg-amber-950 text-amber-300 border-amber-800 animate-pulse'
                            }`}
                          >
                            {isAnswered ? '✓ 답변완료' : '⏳ 답변대기'}
                          </span>
                          <span className="text-[11px] font-mono text-gray-400">
                            {item.date}
                          </span>
                        </div>

                        <h4 className="text-sm font-black text-white line-clamp-1">
                          {item.title}
                        </h4>

                        <div className="flex items-center justify-between text-xs text-gray-400 font-bold pt-1 border-t border-emerald-950">
                          <span>작성자: {item.author}</span>
                          <ChevronRight className="w-4 h-4 text-emerald-500" />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Right Workstation Panel with 1-Click Templates */}
                <div className="lg:col-span-7 bg-[#0b1611] p-6 rounded-3xl border border-emerald-900/60 space-y-6">
                  {selectedInquiry ? (
                    <div className="space-y-6">
                      
                      {/* Inquiry Header Info */}
                      <div className="border-b border-emerald-900/80 pb-4 space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-black text-emerald-400 bg-emerald-950 px-3 py-1 rounded-full border border-emerald-800">
                            {selectedInquiry.category}
                          </span>
                          {selectedInquiry.status === 'completed' ? (
                            <span className="text-xs font-black text-emerald-300 bg-emerald-900/60 px-3 py-1 rounded-full">
                              ✓ 공식 답변 완료됨
                            </span>
                          ) : (
                            <span className="text-xs font-black text-amber-300 bg-amber-950 px-3 py-1 rounded-full border border-amber-800">
                              ⏳ 답변 대기중
                            </span>
                          )}
                        </div>

                        <h3 className="text-xl font-black text-white">
                          {selectedInquiry.title}
                        </h3>

                        <div className="flex items-center gap-4 text-xs font-bold text-gray-400">
                          <span>작성자: {selectedInquiry.author}</span>
                          <span>|</span>
                          <span>작성일: {selectedInquiry.date}</span>
                        </div>
                      </div>

                      {/* Student Inquiry Body */}
                      <div className="bg-[#050a08] p-4 rounded-2xl border border-emerald-950 text-xs text-gray-200 font-medium whitespace-pre-wrap leading-relaxed">
                        {selectedInquiry.content}
                      </div>

                      {/* ADMINISTRATOR CONVENIENCE REPLY WORKSTATION (1-Click Templates) */}
                      <div className="bg-[#08120d] p-5 rounded-2xl border border-emerald-800 space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-emerald-900/60 pb-3">
                          <div className="flex items-center gap-2 text-sm font-black text-emerald-300">
                            <ShieldCheck className="w-5 h-5 text-emerald-400" />
                            <span>공식 답변 작성 및 템플릿 완성</span>
                          </div>

                          {/* 1-Click Preset Template Shortcuts */}
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="text-[10px] font-bold text-gray-400">자주 쓰는 템플릿:</span>
                            <button
                              type="button"
                              onClick={() => applyAdminTemplate('government')}
                              className="px-2.5 py-1 bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-700 rounded-lg text-xs font-bold transition-all cursor-pointer"
                            >
                              ⚡ 정부지원금
                            </button>
                            <button
                              type="button"
                              onClick={() => applyAdminTemplate('curriculum')}
                              className="px-2.5 py-1 bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-700 rounded-lg text-xs font-bold transition-all cursor-pointer"
                            >
                              ⚡ 커리큘럼
                            </button>
                            <button
                              type="button"
                              onClick={() => applyAdminTemplate('recipe')}
                              className="px-2.5 py-1 bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-700 rounded-lg text-xs font-bold transition-all cursor-pointer"
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
                          className="w-full p-4 bg-[#050a08] border border-emerald-900 rounded-xl text-xs font-medium text-white focus:outline-none focus:border-emerald-500 resize-none leading-relaxed"
                        />

                        <div className="flex items-center justify-between pt-1">
                          <span className="text-[11px] font-bold text-gray-400">
                            ✓ 등록 시 작성자 이메일/SMS 알림이 자동 전송됩니다.
                          </span>

                          <button
                            onClick={handleAdminInquiryReplySubmit}
                            className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs sm:text-sm rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                          >
                            <Send className="w-4 h-4" />
                            <span>공식 답변 등록/수정</span>
                          </button>
                        </div>
                      </div>

                    </div>
                  ) : (
                    <div className="py-20 text-center text-gray-500 font-bold space-y-2">
                      <MessageSquare className="w-10 h-10 mx-auto text-emerald-900" />
                      <p>좌측 목록에서 답변할 수강생 문의글을 선택해주세요.</p>
                    </div>
                  )}
                </div>

              </div>

            </div>
          )}

          {/* TAB 3: BANNER MANAGEMENT */}
          {activeTab === 'banner' && (
            <div className="space-y-8 animate-fadeIn max-w-4xl">
              
              <div className="flex items-center justify-between border-b border-emerald-900/60 pb-4">
                <div>
                  <h2 className="text-2xl font-black text-white tracking-tight">
                    행사 띠 배너 설정
                  </h2>
                  <p className="text-xs text-gray-400 font-medium mt-1">
                    메인 랜딩페이지 상단 이벤트 스트립 배너를 활성화/비활성화하고 문구를 변경합니다.
                  </p>
                </div>
                <button
                  onClick={handleSaveBanner}
                  className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs sm:text-sm rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>배너 저장하기</span>
                </button>
              </div>

              <div className="bg-[#0b1611] p-6 rounded-3xl border border-emerald-900/60 space-y-6">
                
                <div className="flex items-center justify-between pb-4 border-b border-emerald-950">
                  <div>
                    <h3 className="text-base font-black text-white">
                      상단 띠 배너 표시 여부
                    </h3>
                    <p className="text-xs text-gray-400 font-medium">
                      비활성화 시 랜딩페이지 이벤트 띠 배너가 숨겨집니다.
                    </p>
                  </div>

                  <button
                    onClick={() => setBannerActive(!bannerActive)}
                    className={`px-4 py-2 rounded-xl text-xs font-black transition-all border cursor-pointer ${
                      bannerActive
                        ? 'bg-emerald-500 text-black border-emerald-400'
                        : 'bg-stone-900 text-gray-400 border-stone-800'
                    }`}
                  >
                    {bannerActive ? 'ON (표시중)' : 'OFF (숨김)'}
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-black text-emerald-400 mb-2">
                    배너 문구 타이틀
                  </label>
                  <input
                    type="text"
                    value={bannerTitle}
                    onChange={(e) => setBannerTitle(e.target.value)}
                    className="w-full px-4 py-3 bg-[#050a08] border border-emerald-900/80 rounded-xl text-sm font-bold text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

              </div>

            </div>
          )}

        </main>

      </div>
    </div>
  );
}
