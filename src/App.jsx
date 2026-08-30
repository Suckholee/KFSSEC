import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import EventBannerSection from './components/EventBannerSection';
import NetflixCoursesSection from './components/NetflixCoursesSection';
import YouTubeMediaSection from './components/YouTubeMediaSection';
import FullPackageCoursesSection from './components/FullPackageCoursesSection';
import CategoryCourseSection from './components/CategoryCourseSection';
import BannerSection from './components/BannerSection';
import CourseCatalogPage from './components/Catalog/CourseCatalogPage';
import AboutPage from './components/About/AboutPage';
import MasterBusinessPage from './components/Master/MasterBusinessPage';
import ConsultingPage from './components/Consulting/ConsultingPage';
import CommunityPage from './components/Community/CommunityPage';
import CommunityEditorPage from './components/Community/CommunityEditorPage';
import AdminLayout from './components/Admin/AdminLayout';
import AdminLoginModal from './components/Admin/AdminLoginModal';
import PaymentGuideModal from './components/PaymentGuideModal';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';

export default function App() {
  // Determine initial view based on window.location.pathname
  const getInitialView = () => {
    const path = window.location.pathname;
    if (path === '/admin') return 'admin';
    if (path === '/catalog') return 'catalog';
    if (path === '/about') return 'about';
    if (path === '/masters') return 'masters';
    if (path === '/consulting') return 'consulting';
    if (path === '/community/write') return 'community_editor';
    if (path === '/community') return 'community';
    return 'landing';
  };

  const [currentView, setCurrentView] = useState(getInitialView);
  const [aboutTab, setAboutTab] = useState('greetings');
  const [masterTab, setMasterTab] = useState('masters');
  const [catalogTab, setCatalogTab] = useState('courses');
  const [consultingTab, setConsultingTab] = useState('education');
  const [communityTab, setCommunityTab] = useState('all');
  
  // User Authentication State
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(true);
  const [currentUser, setCurrentUser] = useState({ name: '안형상 (회원)' });
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authInitialMode, setAuthInitialMode] = useState('login');
  const [paymentGuideOpen, setPaymentGuideOpen] = useState(false);

  // Shared Community Posts List State
  const [postsList, setPostsList] = useState([
    {
      id: 1,
      category: '공지 사항',
      categoryType: 'notice',
      title: '240203 사단법인 한국외식창업교육원 정기총회 개최 안내',
      date: '2024.02.03',
      author: 'Admin',
      views: 1245,
      content: '사단법인 한국외식창업교육원 2023년 사업 결산 및 2024년 글로벌 K-FOOD 외식 창업 육성 비전 발표 정기총회가 개최됩니다.',
    },
    {
      id: 2,
      category: '공지 사항',
      categoryType: 'notice',
      title: '외식창업 수강생 N:N 커리큘럼 매칭 포트폴리오 시스템 도입',
      date: '2024.01.26',
      author: 'Admin',
      views: 980,
      content: '수강생 1인이 다수의 조리/창업 커리큘럼을 연계하여 수강하고 혜택을 제공받을 수 있는 N:N 매칭 포트폴리오 시스템이 도입되었습니다.',
    },
    {
      id: 3,
      category: '공지 사항',
      categoryType: 'notice',
      title: '제 01회 요리대회 <OO활용한 OO지역활성 대회> 규정집 & 접수 신청',
      date: '2023.01.26',
      author: 'Admin',
      views: 2150,
      content: '지역 농수축산물을 활용한 제01회 대한민국 창의 요리대회 참가를 위한 규정집 다운로드 및 접수 페이지입니다.',
    },
    {
      id: 4,
      category: '요리대회',
      categoryType: 'competition',
      title: '제 01회 요리대회 <OO활용한 OO지역활성 대회> 접수 신청',
      date: '2023.01.26',
      author: 'Admin',
      views: 1890,
      content: '전국 조리 관련 학생 및 외식업 종사자 누구나 응시 가능한 신제품 메뉴 개발 요리대회 접수가 진행 중입니다.',
    },
    {
      id: 5,
      category: '갤러리',
      categoryType: 'gallery',
      title: '2024 대한민국 자랑스러운 외식 명인 시상식 현장 화보',
      date: '2023.01.26',
      author: '안 OO',
      views: 750,
      image: '/images/hero_bg.jpg',
      content: '특급호텔 40년 현장 실무 경력의 조리 명장진과 인정받은 수강생들의 시상식 현장 사진 기록입니다.',
    },
    {
      id: 6,
      category: '갤러리',
      categoryType: 'gallery',
      title: '외식창업 조리 실습실 시그니처 메뉴 테스트 현장',
      date: '2023.01.26',
      author: '김 OOO',
      views: 640,
      image: '/images/course_menu_dev.jpg',
      content: '100년 전통 발효 소스와 시그니처 레시피 개발을 위한 외식창업 조리 실습실 현장입니다.',
    },
    {
      id: 7,
      category: '문의',
      categoryType: 'inquiry',
      title: '청년 외식창업 정부지원금 연계 신청 방법 문의',
      date: '2023.01.26',
      author: '박 OOO',
      views: 310,
      content: '청년 창업 교육 지원 정책 및 소상공인 창업 지원금 연계 절차에 관해 문의드립니다.',
    },
    {
      id: 8,
      category: '문의',
      categoryType: 'inquiry',
      title: '1:1 수강생 커리큘럼 매칭 상담 예약 문의',
      date: '2023.01.26',
      author: '이 OO',
      views: 280,
      content: '한식 및 배달밀키트 복수 수강 패키지 할인 혜택 및 주말반 수강 일정 상담을 신청합니다.',
    },
    {
      id: 9,
      category: '문의',
      categoryType: 'inquiry',
      title: '소상공인 100년 전통 발효 소스 전수 과정 문의',
      date: '2023.01.26',
      author: '최 OOO',
      views: 420,
      content: '기존 매장 메뉴 리뉴얼 및 셰프 1:1 레시피 전수 과정 수강료 문의드립니다.',
    },
  ]);

  // Central Dynamic Site Data Store with localStorage Persistence
  const [siteData, setSiteData] = useState(() => {
    const saved = localStorage.getItem('kfssec_site_data');
    if (saved) {
      try {
        return JSON.parse(saved);
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
            badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
          },
          {
            id: 'v2',
            videoUrl: 'https://www.youtube.com/watch?v=E_WgebIP_SY',
            videoId: 'E_WgebIP_SY',
            title: '안형상 한국외식창업교육원 이사장, 정기총회서 "100세 초고령 시대 교육을 통한 글로벌 K-FOOD 시대 열어야..." 강조',
            subtitle: '아시아창의방송(actv) 정기총회 현장 취재 및 안형상 이사장 특별 언론 보도 영상',
            channel: '아시아창의방송 (actv) 언론 보도',
            categoryBadge: '언론 보도 영상',
            badgeColor: 'bg-red-500/20 text-red-300 border-red-500/30',
          },
        ],
      },
      banner: {
        active: true,
        title: '240203 한국외식창업교육원 정기총회 세미나',
      },
    };
  });

  const handleUpdateSiteData = (newPart) => {
    setSiteData((prev) => {
      const updated = {
        ...prev,
        ...newPart,
        youtube: newPart.youtube ? { ...prev.youtube, ...newPart.youtube } : prev.youtube,
        banner: newPart.banner ? { ...prev.banner, ...newPart.banner } : prev.banner,
      };
      localStorage.setItem('kfssec_site_data', JSON.stringify(updated));
      return updated;
    });
  };

  // Admin Security Authentication State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return localStorage.getItem('kfssec_admin_auth') === 'true';
  });

  const [adminLoginModalOpen, setAdminLoginModalOpen] = useState(false);
  const snapContainerRef = useRef(null);

  // Sync View to URL Pathname & Handle Popstate Navigation
  const changeView = (view, pathName = null) => {
    setCurrentView(view);
    const targetPath =
      pathName ||
      (view === 'landing'
        ? '/'
        : view === 'community_editor'
        ? '/community/write'
        : `/${view}`);
    if (window.location.pathname !== targetPath) {
      window.history.pushState({ view }, '', targetPath);
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === '/admin') {
        setCurrentView('admin');
      } else if (path === '/catalog') {
        setCurrentView('catalog');
      } else if (path === '/about') {
        setCurrentView('about');
      } else if (path === '/masters') {
        setCurrentView('masters');
      } else if (path === '/consulting') {
        setCurrentView('consulting');
      } else if (path === '/community/write') {
        setCurrentView('community_editor');
      } else if (path === '/community') {
        setCurrentView('community');
      } else {
        setCurrentView('landing');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Handle Admin Access Security Check
  useEffect(() => {
    if (currentView === 'admin') {
      if (!isAdminAuthenticated) {
        setAdminLoginModalOpen(true);
      }
    } else {
      setAdminLoginModalOpen(false);
    }
  }, [currentView, isAdminAuthenticated]);

  const handleAdminLoginSuccess = () => {
    setIsAdminAuthenticated(true);
    localStorage.setItem('kfssec_admin_auth', 'true');
    setAdminLoginModalOpen(false);
    changeView('admin', '/admin');
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    localStorage.removeItem('kfssec_admin_auth');
    setAdminLoginModalOpen(false);
    changeView('landing', '/');
  };

  const handleOpenAuth = (mode = 'login') => {
    setAuthInitialMode(mode);
    setAuthModalOpen(true);
  };

  const handleOpenAboutTab = (tab = 'greetings') => {
    setAboutTab(tab);
    changeView('about', '/about');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenMasterTab = (tab = 'masters') => {
    setMasterTab(tab);
    changeView('masters', '/masters');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenCatalogTab = (tab = 'courses') => {
    setCatalogTab(tab);
    changeView('catalog', '/catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenConsultingTab = (tab = 'education') => {
    setConsultingTab(tab);
    changeView('consulting', '/consulting');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenCommunityTab = (tab = 'all') => {
    setCommunityTab(tab);
    changeView('community', '/community');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePublishPost = (newPost) => {
    const createdPost = {
      id: postsList.length + 1,
      ...newPost,
    };
    setPostsList([createdPost, ...postsList]);
    changeView('community', '/community');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    alert('🎉 게시글이 성공적으로 발행되었습니다!');
  };

  const handleScrollNext = () => {
    if (snapContainerRef.current) {
      const vh = snapContainerRef.current.clientHeight;
      snapContainerRef.current.scrollBy({ top: vh, behavior: 'smooth' });
    }
  };

  // If in Admin Mode and Authenticated, render full-screen Admin Layout
  if (currentView === 'admin' && isAdminAuthenticated) {
    return (
      <AdminLayout
        siteData={siteData}
        onUpdateSiteData={handleUpdateSiteData}
        onExitAdmin={() => changeView('landing', '/')}
        onLogout={handleAdminLogout}
      />
    );
  }

  return (
    <div className="h-screen overflow-hidden bg-gray-50 flex flex-col font-sans text-gray-900 antialiased selection:bg-emerald-200 selection:text-emerald-900">
      {/* Header */}
      <Header
        currentView={currentView}
        onViewChange={(view) => {
          changeView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenAuth={handleOpenAuth}
        onOpenAboutTab={handleOpenAboutTab}
        onOpenMasterTab={handleOpenMasterTab}
        onOpenCatalogTab={handleOpenCatalogTab}
        onOpenConsultingTab={handleOpenConsultingTab}
        onOpenCommunityTab={handleOpenCommunityTab}
      />

      {/* Main Content Body */}
      <main className="flex-1 overflow-hidden">
        {currentView === 'landing' ? (
          <div ref={snapContainerRef} className="scroll-snap-container no-scrollbar">
            {/* Section 1: Hero Banner */}
            <section className="scroll-snap-section flex flex-col justify-center">
              <Hero
                onExploreClick={() => handleOpenCatalogTab('courses')}
                onAboutClick={() => handleOpenAboutTab('greetings')}
                onScrollNext={handleScrollNext}
              />
            </section>

            {/* Section 2: Event Strip Banner */}
            <section className="scroll-snap-section flex flex-col justify-center bg-[#0c1015]">
              <EventBannerSection
                bannerData={siteData.banner}
                onEventClick={() => handleOpenAuth('login')}
                onScrollNext={handleScrollNext}
              />
            </section>

            {/* Section 3: Netflix-Style Course Catalog */}
            <section className="scroll-snap-section flex flex-col justify-center bg-[#091510]">
              <NetflixCoursesSection
                onSelectCourse={() => handleOpenAuth('login')}
                onScrollNext={handleScrollNext}
              />
            </section>

            {/* Section 4: YouTube Media Section */}
            <section className="scroll-snap-section flex flex-col justify-center bg-[#08100d]">
              <YouTubeMediaSection
                youtubeData={siteData.youtube}
                onScrollNext={handleScrollNext}
              />
            </section>

            {/* Section 5: Full Package Courses Section */}
            <section className="scroll-snap-section flex flex-col justify-center bg-[#061811]">
              <FullPackageCoursesSection
                onSelectPackage={() => handleOpenAuth('login')}
                onScrollNext={handleScrollNext}
              />
            </section>

            {/* Section 6: Unified Category Course Section */}
            <section className="scroll-snap-section flex flex-col justify-center bg-[#0a1410]">
              <CategoryCourseSection
                onViewMoreClick={() => handleOpenCatalogTab('courses')}
                onSelectCourse={() => handleOpenAuth('login')}
                onScrollNext={handleScrollNext}
              />
            </section>

            {/* Section 7: Login & Payment Guide Banners */}
            <section className="scroll-snap-section flex flex-col justify-center py-6">
              <BannerSection
                onOpenLogin={() => handleOpenAuth('login')}
                onOpenCatalog={() => handleOpenCatalogTab('courses')}
                onOpenPaymentGuide={() => setPaymentGuideOpen(true)}
                onScrollNext={handleScrollNext}
              />
            </section>

            {/* Section 8: Footer */}
            <section className="scroll-snap-section flex flex-col justify-end">
              <Footer
                onViewChange={(view) => {
                  changeView(view);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onOpenAboutTab={handleOpenAboutTab}
              />
            </section>
          </div>
        ) : (
          <div className="h-[calc(100vh-65px)] overflow-y-auto">
            {currentView === 'catalog' && (
              <CourseCatalogPage
                initialSubTab={catalogTab}
              />
            )}

            {currentView === 'about' && (
              <AboutPage initialTab={aboutTab} />
            )}

            {currentView === 'masters' && (
              <MasterBusinessPage initialTab={masterTab} />
            )}

            {currentView === 'consulting' && (
              <ConsultingPage
                initialTab={consultingTab}
                onOpenAuth={handleOpenAuth}
              />
            )}

            {currentView === 'community' && (
              <CommunityPage
                initialTab={communityTab}
                onOpenAuth={handleOpenAuth}
                isUserLoggedIn={isUserLoggedIn}
                onGoToEditor={() => changeView('community_editor', '/community/write')}
                postsList={postsList}
                setPostsList={setPostsList}
              />
            )}

            {currentView === 'community_editor' && (
              <CommunityEditorPage
                onPublishPost={handlePublishPost}
                onCancel={() => changeView('community', '/community')}
                currentUser={currentUser}
              />
            )}

            <Footer
              onViewChange={(view) => {
                changeView(view);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenAboutTab={handleOpenAboutTab}
            />
          </div>
        )}
      </main>

      {/* Admin Security Login Modal */}
      <AdminLoginModal
        isOpen={adminLoginModalOpen}
        onClose={() => {
          setAdminLoginModalOpen(false);
          if (currentView === 'admin' && !isAdminAuthenticated) {
            changeView('landing', '/');
          }
        }}
        onLoginSuccess={handleAdminLoginSuccess}
      />

      {/* User Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authInitialMode}
      />

      {/* Payment Guide Information Modal */}
      <PaymentGuideModal
        isOpen={paymentGuideOpen}
        onClose={() => setPaymentGuideOpen(false)}
        onGoToCatalog={() => handleOpenCatalogTab('courses')}
      />
    </div>
  );
}
