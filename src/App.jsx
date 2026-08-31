import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import EventBannerSection from './components/EventBannerSection';
import YouTubeMediaSection from './components/YouTubeMediaSection';
import NetflixCoursesSection from './components/NetflixCoursesSection';
import FullPackageCoursesSection from './components/FullPackageCoursesSection';
import CategoryCourseSection from './components/CategoryCourseSection';
import CategoryFocusSection from './components/CategoryFocusSection';
import NoticePostSection from './components/NoticePostSection';
import BannerSection from './components/BannerSection';
import Footer from './components/Footer';
import AboutPage from './components/About/AboutPage';
import MasterBusinessPage from './components/Master/MasterBusinessPage';
import CourseCatalogPage from './components/Catalog/CourseCatalogPage';
import ConsultingPage from './components/Consulting/ConsultingPage';
import CommunityPage from './components/Community/CommunityPage';
import CommunityEditorPage from './components/Community/CommunityEditorPage';
import AdminLayout from './components/Admin/AdminLayout';
import AuthModal from './components/AuthModal';
import YouTubeModal from './components/YouTubeModal';
import PaymentGuideModal from './components/PaymentGuideModal';
import { fetchCoursesFromAPI } from './services/courseDatabase';
import { ChevronUp } from 'lucide-react';

function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisible = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener('scroll', toggleVisible);
    return () => window.removeEventListener('scroll', toggleVisible);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="페이지 맨 위로 이동"
      className="fixed bottom-6 right-6 z-40 p-3.5 bg-[#0B3C26] hover:bg-[#072819] text-white rounded-full shadow-2xl transition-all cursor-pointer border border-[#C5A059] flex items-center justify-center group focus-visible:ring-2 focus-visible:ring-[#0B3C26] focus-visible:outline-none"
    >
      <ChevronUp className="w-5 h-5 text-[#D4AF37] group-hover:-translate-y-0.5 transition-transform" />
    </button>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [subTab, setSubTab] = useState(null);

  // Auth state
  const [authModalState, setAuthModalState] = useState({ isOpen: false, initialMode: 'login' });
  const [currentUser, setCurrentUser] = useState(null);

  // YouTube modal state
  const [activeVideoUrl, setActiveVideoUrl] = useState(null);

  // Payment Guide Modal State
  const [isPaymentGuideOpen, setIsPaymentGuideOpen] = useState(false);

  // Sync REST API Backend DB on Mount
  useEffect(() => {
    fetchCoursesFromAPI();
  }, []);

  // Shared Community Posts List State populated with 128 Real Student Dataset
  const [postsList, setPostsList] = useState([
    {
      id: 1,
      category: '공지 사항',
      categoryType: 'notice',
      isPinned: true,
      title: '2026년 사단법인 한국외식창업교육원 3분기 총회 및 성과발표회 개최 안내',
      date: '2026.08.30',
      author: 'Admin (교육원)',
      views: 1450,
      content: '사단법인 한국외식창업교육원 2026년 3분기 외식 창업 성과 발표 및 글로벌 K-FOOD 조리 명장 인증서 수여식 총회가 개최됩니다.',
    },
    {
      id: 2,
      category: '공지 사항',
      categoryType: 'notice',
      isPinned: true,
      title: '외식창업 수강생 N:N 커리큘럼 매칭 포트폴리오 시스템 도입 안내',
      date: '2026.08.28',
      author: 'Admin (교육원)',
      views: 1120,
      content: '128명 가입 수강생 1인이 다수의 조리/창업 커리큘럼을 연계하여 수강하고 정부지원금 혜택을 제공받을 수 있는 N:N 매칭 포트폴리오 시스템이 공식 도입되었습니다.',
    },
    {
      id: 3,
      category: '공지 사항',
      categoryType: 'notice',
      isPinned: true,
      title: '제 01회 요리대회 <K-FOOD 지역 특산물 연계 조리 경연 대회> 규정집 & 접수 안내',
      date: '2026.08.25',
      author: 'Admin (교육원)',
      views: 2340,
      content: '전국 128명 수강생 및 외식 창업 준비생 대상 K-FOOD 지역 농수축산물 활성화 요리대회 참가를 위한 규정집 다운로드 및 접수 안내입니다.',
    },
    {
      id: 4,
      category: '요리대회',
      categoryType: 'competition',
      title: '제 01회 K-FOOD 지역 특산물 연계 요리대회 참가 신청서 제출',
      date: '2026.08.29',
      author: '김태훈 수강생',
      views: 890,
      content: '전통 한식 조리 마스터 과정을 수강 중인 김태훈입니다. 발효 장류를 활용한 퓨전 한식 메뉴로 요리대회 참가를 신청합니다.',
    },
    {
      id: 5,
      category: '갤러리',
      categoryType: 'gallery',
      title: '2026 대한민국 자랑스러운 외식 명인 시상식 현장 화보',
      date: '2026.08.29',
      author: '안형상 이사장',
      views: 1280,
      image: '/images/hero_bg.jpg',
      content: '특급호텔 40년 현장 실무 경력의 조리 명장진과 열정적인 128명 수강생들의 명인 시상식 및 수여식 현장 사진 기록입니다.',
    },
    {
      id: 6,
      category: '갤러리',
      categoryType: 'gallery',
      title: '외식창업 조리 실습실 100년 전통 발효 소스 시그니처 메뉴 테스트 현장',
      date: '2026.08.28',
      author: '박준형 수강생',
      views: 940,
      image: '/images/course_menu_dev.jpg',
      content: '한식 셰프 창업 과정을 통해 직접 조리한 100년 전통 발효 소스 시그니처 갈비찜 테스트 실습 현장 화보입니다.',
    },
    {
      id: 7,
      category: '갤러리',
      categoryType: 'gallery',
      title: '카페 창업 실전 & 라떼아트 1:1 직강 이수 인증 샷!',
      date: '2026.08.27',
      author: '최성민 수강생',
      views: 710,
      image: '/images/course_cafe.jpg',
      content: '바리스타 챔피언 이지은 강사님의 라떼아트 1:1 코칭을 이수하고 드디어 로제타 패턴 완성에 성공했습니다!',
    },
    {
      id: 8,
      category: '문의',
      categoryType: 'inquiry',
      status: 'completed',
      title: '청년 외식창업 정부지원금 5천만원 연계 신청 방법 및 자격 문의',
      date: '2026.08.30',
      author: '강현우 수강생',
      views: 450,
      content: '청년 창업 교육 지원 정책 및 소상공인 창업 지원금 연계 절차에 관해 문의드립니다. 제출 서류 양식이 궁금합니다.',
      reply: {
        date: '2026.08.30 14:20',
        content: '안녕하세요 강현우 수강생님, 사단법인 한국외식창업교육원입니다.\n청년 외식창업 정부지원금 연계 서류는 스마트 파트너 센터 마이페이지에서 다운로드 가능하며, 1:1 전담 컨설턴트가 사업계획서 검토를 도와드립니다.',
      },
    },
    {
      id: 9,
      category: '문의',
      categoryType: 'inquiry',
      status: 'completed',
      title: '전통 한식 조리 마스터 1:1 주방 동선 컨설팅 예약 문의',
      date: '2026.08.29',
      author: '조수진 수강생',
      views: 380,
      content: '9월 매장 오픈 예정인 한식 전문점 주방 설비 및 동선 1:1 현장 컨설팅 일정을 신청하고자 합니다.',
      reply: {
        date: '2026.08.29 16:45',
        content: '조수진 대표님 안녕하세요!\n신청하신 1:1 주방 동선 컨설팅은 9월 5일 개강 당일 안형상 이사장님 직강 후 오프라인 실습실에서 진행될 예정입니다.',
      },
    },
    {
      id: 10,
      category: '문의',
      categoryType: 'inquiry',
      status: 'pending',
      title: '소상공인 100년 전통 발효 소스 시그니처 전수 과정 문의',
      date: '2026.08.30',
      author: '윤경민 수강생',
      views: 290,
      content: '기존 매장 메뉴 리뉴얼 및 셰프 1:1 레시피 전수 과정 수강료 할인 패키지에 대해 상세 상담 부탁드립니다.',
      reply: null,
    },
    {
      id: 11,
      category: '문의',
      categoryType: 'inquiry',
      status: 'completed',
      title: '파스타 생면 제면기 및 이태리 파인다이닝 주방 집기 중고 구매 문의',
      date: '2026.08.28',
      author: '장보미 수강생',
      views: 510,
      content: '브런치 파스타 창업 과정 수강생 전용 커뮤니티에서 업소용 제면기 중고 구매 정보를 얻을 수 있나요?',
      reply: {
        date: '2026.08.28 11:10',
        content: '장보미 수강생님 반갑습니다.\n원장님 추천 검증된 주방 집기 거래망 및 수강생 정보 공유 커뮤니티 채팅방 링크를 문자로 발송해 드렸습니다.',
      },
    },
    {
      id: 12,
      category: '문의',
      categoryType: 'inquiry',
      status: 'pending',
      title: '일식 횟집 & 초밥 오마카세 창업 1:1 컨설팅 일정 문의',
      date: '2026.08.30',
      author: '임남궁건 수강생',
      views: 330,
      content: '활어 오로시 및 성게알 타르타르 레시피 실습 시간표와 주말반 개설 여부가 궁금합니다.',
      reply: null,
    },
  ]);

  // Central Dynamic Site Data Store
  const [siteData, setSiteData] = useState(() => {
    const saved = localStorage.getItem('kfssec_site_data');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Force update if legacy b4wS9WvI38g video ID exists
        if (parsed?.youtube?.videos?.some((v) => v.videoId === 'b4wS9WvI38g')) {
          localStorage.removeItem('kfssec_site_data');
        } else {
          return parsed;
        }
      } catch (e) {
        console.error('Failed to parse saved site data:', e);
      }
    }
    return {
      youtube: {
        title: '한국외식창업교육원 미디어',
        subtitle: '사단법인 한국외식창업교육원의 주요 정기총회 현장 및 아시아창의방송 언론 보도 영상입니다.',
        channelUrl:
          'https://www.youtube.com/@%ED%95%9C%EA%B5%AD%EC%99%B8%EC%8B%9D%EC%B0%BD%EC%97%85%EA%B5%90%EC%9C%A1%EC%9C%88',
        videos: [
          {
            id: 'v1',
            videoUrl: 'https://www.youtube.com/watch?v=ZDZFUpS0fFE',
            videoId: 'ZDZFUpS0fFE',
            title: '240203 한국외식창업교육원 정기총회',
            subtitle: '한국외식창업교육원 2023년 결산 및 2024년 사업 계획에 대한 정기 총회 전체 영상',
            channel: '한국외식창업교육원 공식 채널',
            categoryBadge: '공식 채널 영상',
            thumbnail: '/images/yt_thumb_1.jpg',
            uploadDate: '2024.02.03',
          },
          {
            id: 'v2',
            videoUrl: 'https://www.youtube.com/watch?v=E_WgebIP_SY',
            videoId: 'E_WgebIP_SY',
            title: '안형상 한국외식창업교육원 이사장, 정기총회서 "100세 초고령 시대 교육을 통한 글로벌 K-FOOD 시대 열어야..." 강조',
            subtitle: '아시아창의방송(actv) 정기총회 현장 취재 및 안형상 이사장 특별 언론 보도 영상',
            channel: '아시아창의방송(actv) 언론 보도',
            categoryBadge: '언론 보도 영상',
            thumbnail: '/images/yt_thumb_2.jpg',
            uploadDate: '2024.01.15',
          },
        ],
      },
      banner: {
        badgeText: '사단법인 한국외식창업교육원 2026 하반기 신규 수강생 모집',
        title: 'K-FOOD 시그니처 100년 발효 레시피 & 창업 실무 직강',
        subtitle: '특급호텔 40년 명장이 전수하는 소상공인 창업 성공 솔루션',
        dDay: 'D-7일 마감임박',
        buttonText: '수강생 필수 서비스 안내',
      },
    };
  });

  const handleUpdateSiteData = (newSiteData) => {
    setSiteData(newSiteData);
    localStorage.setItem('kfssec_site_data', JSON.stringify(newSiteData));
  };

  // Sync state with URL path
  useEffect(() => {
    const parsePath = () => {
      const path = window.location.pathname;
      const parts = path.split('/').filter(Boolean);
      
      if (parts.length === 0) {
        setActiveTab('home');
        setSubTab(null);
        return;
      }

      const mainRoute = parts[0];
      const subRoute = parts[1] || null;

      if (['about', 'master', 'catalog', 'consulting', 'community', 'admin'].includes(mainRoute)) {
        setActiveTab(mainRoute);
        setSubTab(subRoute);
      } else {
        setActiveTab('home');
        setSubTab(null);
      }
    };

    parsePath();
    window.addEventListener('popstate', parsePath);
    return () => window.removeEventListener('popstate', parsePath);
  }, []);

  const handleTabChange = (tabId, subTabId = null) => {
    setActiveTab(tabId);
    setSubTab(subTabId);
    
    let targetPath = '/';
    if (tabId !== 'home') {
      targetPath = `/${tabId}${subTabId ? `/${subTabId}` : ''}`;
    }
    
    window.history.pushState({}, '', targetPath);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAuth = (initialMode = 'login') => {
    setAuthModalState({ isOpen: true, initialMode });
  };

  const handleCloseAuth = () => {
    setAuthModalState({ isOpen: false, initialMode: 'login' });
  };

  const handleLoginSuccess = (userObj) => {
    setCurrentUser(userObj);
    handleCloseAuth();
    if (userObj.role === 'admin') {
      handleTabChange('admin');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    handleTabChange('home');
    alert('로그아웃 되었습니다.');
  };

  // Open YouTube video popup handler
  const handleOpenVideo = (videoUrl) => {
    setActiveVideoUrl(videoUrl);
  };

  // Close YouTube video popup
  const handleCloseVideo = () => {
    setActiveVideoUrl(null);
  };

  // Scroll to section helper
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle New Post Submission from Editor
  const handleCreatePost = (newPostData) => {
    const createdPost = {
      ...newPostData,
      id: postsList.length + 1,
      date: new Date().toISOString().split('T')[0].replace(/-/g, '.'),
    };
    setPostsList([createdPost, ...postsList]);
    handleTabChange('community', 'all');
  };

  if (activeTab === 'admin') {
    return (
      <AdminLayout
        siteData={siteData}
        onUpdateSiteData={handleUpdateSiteData}
        onExitAdmin={() => handleTabChange('home')}
        onLogout={handleLogout}
        postsList={postsList}
        setPostsList={setPostsList}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900 selection:bg-emerald-500 selection:text-white overflow-x-hidden">
      {/* Top Main Navigation Header */}
      <Header
        activeTab={activeTab}
        subTab={subTab}
        onTabChange={handleTabChange}
        onOpenAuth={handleOpenAuth}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {/* Main Content Area Routing */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <div className="space-y-0">
            <Hero
              onExploreClick={() => handleTabChange('catalog')}
              onAboutClick={() => handleTabChange('about', 'greetings')}
            />
            <EventBannerSection
              bannerData={siteData.banner}
              onEventClick={() => setIsPaymentGuideOpen(true)}
            />
            <YouTubeMediaSection
              youtubeData={siteData.youtube}
              onPlayVideo={handleOpenVideo}
            />
            <NetflixCoursesSection onCourseClick={() => handleTabChange('catalog')} />
            <FullPackageCoursesSection onCourseClick={() => handleTabChange('catalog')} />
            <CategoryCourseSection onCategoryClick={() => handleTabChange('catalog')} />
            <CategoryFocusSection onCategoryClick={() => handleTabChange('catalog')} />
            <NoticePostSection onScrollNext={() => scrollToSection('footer')} />
            <BannerSection onConsultingClick={() => setIsPaymentGuideOpen(true)} />
          </div>
        )}

        {activeTab === 'about' && (
          <AboutPage initialSubTab={subTab || 'greetings'} />
        )}

        {activeTab === 'master' && (
          <MasterBusinessPage initialSubTab={subTab || 'intro'} />
        )}

        {activeTab === 'catalog' && (
          <CourseCatalogPage initialSubTab={subTab || 'courses'} />
        )}

        {activeTab === 'consulting' && (
          <ConsultingPage
            initialSubTab={subTab || 'apply'}
            onGoToApply={() => handleTabChange('consulting', 'apply')}
          />
        )}

        {activeTab === 'community' && subTab === 'editor' && (
          <CommunityEditorPage
            currentUser={currentUser}
            onCancel={() => handleTabChange('community', 'all')}
            onSubmitPost={handleCreatePost}
          />
        )}

        {activeTab === 'community' && subTab !== 'editor' && (
          <CommunityPage
            initialTab={subTab || 'all'}
            onOpenAuth={handleOpenAuth}
            isUserLoggedIn={!!currentUser}
            onGoToEditor={() => handleTabChange('community', 'editor')}
            postsList={postsList}
            setPostsList={setPostsList}
          />
        )}
      </main>

      {/* Footer Component */}
      <Footer onTabChange={handleTabChange} />

      {/* Modals */}
      <AuthModal
        isOpen={authModalState.isOpen}
        initialMode={authModalState.initialMode}
        onClose={handleCloseAuth}
        onLoginSuccess={handleLoginSuccess}
      />

      <YouTubeModal
        videoUrl={activeVideoUrl}
        onClose={handleCloseVideo}
      />

      <PaymentGuideModal
        isOpen={isPaymentGuideOpen}
        onClose={() => setIsPaymentGuideOpen(false)}
      />

      <ScrollToTopButton />
    </div>
  );
}
