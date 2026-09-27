import NetflixCoursesSection from './components/NetflixCoursesSection';
import CategoryCourseSection from './components/CategoryCourseSection';
import CategoryFocusSection from './components/CategoryFocusSection';
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import AwardCeremonyBannerSection from './components/Home/AwardCeremonyBannerSection';
import PartnerMarqueeSection, { DEFAULT_PARTNER_LOGOS } from './components/Home/PartnerMarqueeSection';
import YouTubeMediaSection from './components/YouTubeMediaSection';
import NoticePostSection from './components/NoticePostSection';
import GlobalDiningTrendsSection from './components/Home/GlobalDiningTrendsSection';
import Footer from './components/Footer';
import MobileQuickBar from './components/common/MobileQuickBar';
import VisitorChatbotWidget from './components/common/VisitorChatbotWidget';
import AboutPage from './components/About/AboutPage';
import MasterBusinessPage from './components/Master/MasterBusinessPage';
import CourseCatalogPage from './components/Catalog/CourseCatalogPage';
import ConsultingPage from './components/Consulting/ConsultingPage';
import GangnamSohoPage from './components/Gangnam/GangnamSohoPage';
import GalleryPage from './components/Gallery/GalleryPage';
import PartnersPage from './components/Partners/PartnersPage';
import CommunityPage from './components/Community/CommunityPage';
import CommunityEditorPage from './components/Community/CommunityEditorPage';
import AdminLayout from './components/Admin/AdminLayout';
import AuthModal from './components/AuthModal';
import YouTubeModal from './components/YouTubeModal';
import PaymentGuideModal from './components/PaymentGuideModal';
import { fetchCoursesFromAPI } from './services/courseDatabase';
import { ChevronUp } from 'lucide-react';
import { readSharedContent, saveSharedContent } from './services/contentApi';

function AdminAccess({ onAuthenticated, configured }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);
  const login = async event => {
    event.preventDefault();
    setPending(true); setError('');
    try {
      const response = await fetch('/api/auth', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username: 'admin', password }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || '로그인에 실패했습니다.');
      onAuthenticated();
    } catch (cause) { setError(cause.message); }
    finally { setPending(false); }
  };
  return <main className="min-h-screen flex items-center justify-center bg-slate-100 p-6"><form onSubmit={login} className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-lg space-y-5"><h1 className="text-xl font-bold">관리자 로그인</h1>{configured === false && <p className="text-red-700 text-sm">관리자 인증 환경변수가 설정되지 않았습니다.</p>}<label className="block text-sm font-medium">비밀번호<input autoFocus type="password" autoComplete="current-password" value={password} onChange={event => setPassword(event.target.value)} className="mt-2 block w-full rounded-lg border p-3" required /></label>{error && <p role="alert" className="text-sm text-red-700">{error}</p>}<button type="submit" disabled={pending || configured === false} className="w-full rounded-lg bg-emerald-800 px-4 py-3 text-white disabled:opacity-50">{pending ? '확인 중…' : '로그인'}</button><a href="/" className="block text-center text-sm text-slate-600">홈으로 돌아가기</a></form></main>;
}

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
      className="fixed bottom-32 sm:bottom-6 right-3 sm:right-6 z-30 p-3 sm:p-3.5 bg-[#0B3C26] hover:bg-[#072819] text-white rounded-full shadow-2xl transition-all cursor-pointer border border-[#C5A059] flex items-center justify-center group focus-visible:ring-2 focus-visible:ring-[#0B3C26] focus-visible:outline-none"
    >
      <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4AF37] group-hover:-translate-y-0.5 transition-transform" />
    </button>
  );
}

const DEFAULT_INSTITUTION_INFO = {
  corpName: '사단법인 한국외식창업교육원',
  engName: 'Korea Food Service Startup Education Center',
  ceoName: '안형상 이사장',
  phone: '010-7244-6796',
  tel: '02-3474-7001',
  fax: '02-3474-7002',
  email: 'contact@kfssec.or.kr',
  headquartersAddress: '서울특별시 강남구 테헤란로 123 KFSSEC 빌딩 3-5층 (실습 및 검정 전용 교육장)',
  officeAddress: '서울특별시 서초구 사임당로 174, 강남미래타워 5층 (우: 06628)',
  bizNumber: '114-82-10825',
  establishedDate: '2022년 7월 29일',
  operatingHours: '평일 09:00 - 18:00 (주말/공휴일 휴무)',
};

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [subTab, setSubTab] = useState(null);

  // Auth state
  const [authModalState, setAuthModalState] = useState({ isOpen: false, initialMode: 'login' });
  const [currentUser, setCurrentUser] = useState(null);
  const [adminAuth, setAdminAuth] = useState({ checked: false, authenticated: false, configured: true });

  useEffect(() => {
    fetch('/api/auth', { cache: 'no-store' }).then(response => response.json()).then(result => setAdminAuth({ checked: true, authenticated: result.authenticated, configured: result.configured })).catch(() => setAdminAuth({ checked: true, authenticated: false, configured: false }));
    readSharedContent('site').then(data => { if (data) setSiteData(mergeSiteData(data)); }).catch(error => console.error('Failed to load site data:', error));
    const refreshPosts = () => readSharedContent('posts').then(data => { if (Array.isArray(data)) setPostsList(data); }).catch(error => console.error('Failed to load posts:', error));
    refreshPosts();
    const timer = window.setInterval(() => { if (!document.hidden) refreshPosts(); }, 30000);
    window.addEventListener('focus', refreshPosts);
    return () => { window.clearInterval(timer); window.removeEventListener('focus', refreshPosts); };
  }, []);

  // YouTube modal state
  const [activeVideoUrl, setActiveVideoUrl] = useState(null);

  // Payment Guide Modal State
  const [isPaymentGuideOpen, setIsPaymentGuideOpen] = useState(false);

  // Sync course data from the shared API on mount.
  useEffect(() => {
    fetchCoursesFromAPI();
  }, []);

  const DEFAULT_SITE_DATA = {
    partnerLogos: DEFAULT_PARTNER_LOGOS,
    institutionInfo: DEFAULT_INSTITUTION_INFO,
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
          thumbnail: 'https://img.youtube.com/vi/ZDZFUpS0fFE/hqdefault.jpg',
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
          thumbnail: 'https://img.youtube.com/vi/E_WgebIP_SY/hqdefault.jpg',
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
    heroBanners: [
      {
        id: 'banner_fearless',
        title: '외식 창업이 두려운가?',
        subtitle: '한국외식창업교육원에서 성공으로 이끌어 드립니다.',
        imageUrl: '/images/hero_banner_fearless.png',
        imageOnly: true,
        active: true,
        overlayDim: 0,
        buttonText: '교육과정 둘러보기',
        buttonLink: 'catalog',
      },
      {
        id: 'banner_masters_classic',
        title: '꿈꾸는 외식창업 아무에게나 맡기시겠습니까?',
        subtitle: '오랜 현장실무경험과 실력을 갖춘 명인, 명장님께 맡겨주세요! 성공적인 창업은 저희가 책임지겠습니다.',
        imageUrl: '/images/main_banner_masters.png',
        imageOnly: true,
        active: true,
        overlayDim: 0,
        buttonText: '명인·명장 교수진 소개',
        buttonLink: 'about',
      },
      {
        id: 'banner_culinary_pro',
        title: '특급호텔 40년 명장의 1:1 직강 비법 전수',
        subtitle: '100년 전통 발효 소스부터 1인 주방 최적화 동선 설계까지 실전 창업 성공 솔루션',
        imageUrl: '/images/chef_tossing_food.jpg',
        imageOnly: false,
        active: true,
        overlayDim: 55,
        tag: '대한민국 조리명장 제1호 직강',
        buttonText: '1:1 맞춤 상담 신청',
        buttonLink: 'community',
      },
    ],
  };

  const mergeSiteData = (saved) => {
    if (!saved || typeof saved !== 'object') return DEFAULT_SITE_DATA;

    // 1. Institution Info: merge with defaults and ensure key contacts are never blank
    const institutionInfo = {
      ...DEFAULT_INSTITUTION_INFO,
      ...(saved.institutionInfo || {}),
    };
    ['phone', 'tel', 'headquartersAddress', 'officeAddress', 'bizNumber'].forEach((key) => {
      if (!institutionInfo[key]) {
        institutionInfo[key] = DEFAULT_INSTITUTION_INFO[key];
      }
    });

    const partnerLogos = Array.isArray(saved.partnerLogos) ? saved.partnerLogos : DEFAULT_PARTNER_LOGOS;

    // 3. YouTube: fallback if missing or empty
    const youtube = {
      ...DEFAULT_SITE_DATA.youtube,
      ...(saved.youtube || {}),
      videos: Array.isArray(saved.youtube?.videos) ? saved.youtube.videos : DEFAULT_SITE_DATA.youtube.videos,
    };

    // 4. Banner: fallback if missing
    const banner = {
      ...DEFAULT_SITE_DATA.banner,
      ...(saved.banner || {}),
    };

    // 5. Hero Banners: fallback to defaults or merge saved slides
    const heroBanners =
      Array.isArray(saved.heroBanners)
        ? saved.heroBanners
        : DEFAULT_SITE_DATA.heroBanners;

    return {
      ...DEFAULT_SITE_DATA,
      ...saved,
      institutionInfo,
      partnerLogos,
      youtube,
      banner,
      heroBanners,
    };
  };

  const [postsList, setPostsList] = useState([]);

  const handleUpdatePostsList = async (newList) => {
    const resolved = typeof newList === 'function' ? newList(postsList) : newList;
    try { setPostsList(await saveSharedContent('posts', resolved)); }
    catch (error) { alert(`게시글 저장 실패: ${error.message}`); throw error; }
  };

  // Central Dynamic Site Data Store with Safe Hydration
  const [siteData, setSiteData] = useState(() => {
    return DEFAULT_SITE_DATA;
  });

  const handleUpdateSiteData = async (newSiteData) => {
    try { setSiteData(mergeSiteData(await saveSharedContent('site', newSiteData))); }
    catch (error) { alert(`사이트 저장 실패: ${error.message}`); throw error; }
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

      if (['about', 'master', 'catalog', 'consulting', 'gallery', 'partners', 'gangnam', 'community', 'admin'].includes(mainRoute)) {
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

  const navigateToInquiry = (topic) => {
    if (topic) localStorage.setItem('kfssec_inquiry_draft', JSON.stringify({ title: `${topic} 문의` }));
    handleTabChange('community', 'editor');
  };

  const handleCloseAuth = () => {
    setAuthModalState({ isOpen: false, initialMode: 'login' });
  };

  const handleLogout = () => {
    fetch('/api/auth', { method: 'DELETE' }).catch(console.error);
    setAdminAuth({ checked: true, authenticated: false, configured: true });
    setCurrentUser(null);
    localStorage.removeItem('kfssec_user');
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
  const handleCreatePost = async (newPostData) => {
    const response = await fetch('/api/inquiries', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPostData),
    });
    const result = await response.json();
    if (!response.ok || !result.success) throw new Error(result.message || '문의 등록에 실패했습니다.');
    setPostsList(previous => [result.data, ...previous]);
    handleTabChange('community', 'inquiry');
  };

  if (activeTab === 'admin') {
    if (!adminAuth.checked) return <div className="min-h-screen grid place-items-center">관리자 인증 확인 중…</div>;
    if (!adminAuth.authenticated) return <AdminAccess configured={adminAuth.configured} onAuthenticated={() => setAdminAuth({ checked: true, authenticated: true, configured: true })} />;
    return (
      <AdminLayout
        siteData={siteData}
        onUpdateSiteData={handleUpdateSiteData}
        onExitAdmin={() => handleTabChange('home')}
        onLogout={handleLogout}
        postsList={postsList}
        setPostsList={handleUpdatePostsList}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900 selection:bg-emerald-500 selection:text-white overflow-x-clip">
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
              heroBanners={siteData.heroBanners}
              onExploreClick={() => handleTabChange('catalog')}
              onAboutClick={() => handleTabChange('about', 'greetings')}
              onInquiryClick={() => handleTabChange('community', 'inquiry')}
            />
            <AwardCeremonyBannerSection
              bannerData={siteData.banner}
              onGoToGallery={() => handleTabChange('gallery', 'awards')}
              onGoToInquiry={() => handleTabChange('community', 'inquiry')}
            />
            <YouTubeMediaSection
              youtubeData={siteData.youtube}
              onPlayVideo={handleOpenVideo}
            />
            <NetflixCoursesSection onSelectCourse={() => handleTabChange('catalog', 'courses')} />
            <GlobalDiningTrendsSection />
            <CategoryCourseSection onSelectCourse={() => handleTabChange('catalog', 'courses')} />
            <CategoryFocusSection onViewMoreClick={() => handleTabChange('catalog', 'guide')} />
            <PartnerMarqueeSection partnerLogos={siteData.partnerLogos} />
            <NoticePostSection postsList={postsList} onScrollNext={() => scrollToSection('footer')} />

          </div>
        )}

        {activeTab === 'about' && (
          <AboutPage initialSubTab={subTab || 'greetings'} siteData={siteData} />
        )}

        {activeTab === 'master' && (
          <MasterBusinessPage initialSubTab={subTab || 'all'} />
        )}

        {activeTab === 'catalog' && (
          <CourseCatalogPage
            initialSubTab={subTab || 'courses'}
            onGoToConsulting={() => handleTabChange('consulting', 'consulting')}
          />
        )}

        {activeTab === 'consulting' && (
          <ConsultingPage
            initialSubTab={subTab || 'consulting'}
            onGoToApply={() => handleTabChange('consulting', 'apply')}
            onGoToInquiry={navigateToInquiry}
          />
        )}

        {activeTab === 'gallery' && (
          <GalleryPage initialSubTab={subTab || 'all'} postsList={postsList} />
        )}

        {activeTab === 'partners' && (
          <PartnersPage initialSubTab={subTab || 'all'} partnerLogos={siteData.partnerLogos} postsList={postsList} />
        )}

        {activeTab === 'gangnam' && (
          <GangnamSohoPage initialSubTab={subTab || 'intro'} onGoToInquiry={() => navigateToInquiry('강남구 소상공인 회원 가입 상담')} postsList={postsList} />
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
            setPostsList={undefined}
          />
        )}
      </main>

      {/* Mobile 375px Floating Quick Action Bar */}
      <MobileQuickBar
        onGoToConsulting={() => handleTabChange('consulting', 'apply')}
        onOpenEnrollment={() => handleTabChange('catalog', 'courses')}
      />

      {/* Visitor Button-based AI Assistant Chatbot */}
      <VisitorChatbotWidget onNavigate={handleTabChange} />

      {/* Footer Component */}
      <Footer onTabChange={handleTabChange} siteData={siteData} />

      {/* Modals */}
      <AuthModal
        isOpen={authModalState.isOpen}
        initialMode={authModalState.initialMode}
        onClose={handleCloseAuth}
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
