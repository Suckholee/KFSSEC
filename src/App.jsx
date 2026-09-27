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
import { AdminEditProvider, useAdminEdit } from './context/AdminEditContext';
import AdminLiveToolbar from './components/Admin/InlineEditor/AdminLiveToolbar';
import SectorBlock from './components/Admin/InlineEditor/SectorBlock';
import AdminDrawer from './components/Admin/InlineEditor/AdminDrawer';
import AdminBlockNavigator from './components/Admin/InlineEditor/AdminBlockNavigator';

function MainLayout({ children }) {
  const { isNavigatorOpen, isEditMode } = useAdminEdit();
  return (
    <div
      className={`min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900 selection:bg-emerald-500 selection:text-white overflow-x-clip transition-all duration-300 ${
        isNavigatorOpen && isEditMode ? 'lg:pl-[280px]' : ''
      }`}
    >
      {children}
    </div>
  );
}

const HOME_SECTORS = [
  { id: 'S-HOME-01', name: '메인 비주얼 배너' },
  { id: 'S-HOME-02', name: '수강생 모집 / 이벤트 배너' },
  { id: 'S-HOME-08', name: '공식 유튜브 미디어' },
  { id: 'S-HOME-03', name: '추천 강좌 큐레이션 (넷플릭스형)' },
  { id: 'S-HOME-04', name: '글로벌 외식 트렌드 뉴스' },
  { id: 'S-HOME-05', name: '자격증·실무 과정 카테고리' },
  { id: 'S-HOME-05B', name: '분야별 교육 포커스' },
  { id: 'S-HOME-06', name: '공식 제휴 & 파트너사 로고' },
  { id: 'S-HOME-07', name: '최신 공지사항 & 커뮤니티' },
];

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
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-900 p-6">
      <form onSubmit={login} className="w-full max-w-sm rounded-3xl bg-white p-8 shadow-2xl space-y-5">
        <div className="text-center space-y-1">
          <h1 className="text-xl font-black text-slate-900">KFSSEC 관리자 로그인</h1>
          <p className="text-xs text-slate-500">홈페이지 라이브 편집 및 관리 권한 접속</p>
        </div>
        <label className="block text-xs font-bold text-slate-700">
          관리자 비밀번호
          <input
            autoFocus
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={event => setPassword(event.target.value)}
            placeholder="비밀번호 입력 (기본: kfssec2026!)"
            className="mt-2 block w-full rounded-xl border border-slate-300 p-3 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
            required
          />
        </label>
        {error && <p role="alert" className="text-xs text-red-600 font-medium bg-red-50 p-2.5 rounded-lg border border-red-200">{error}</p>}
        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-xl bg-slate-900 hover:bg-slate-800 px-4 py-3 text-white font-bold text-sm shadow-md transition disabled:opacity-50 cursor-pointer"
        >
          {pending ? '확인 중…' : '관리자 접속하기'}
        </button>
        <p className="text-[11px] text-slate-400 text-center">
          기본 비밀번호: <code className="text-amber-600 font-bold">kfssec2026!</code>
        </p>
        <a href="/" className="block text-center text-xs text-slate-500 hover:underline">홈으로 돌아가기</a>
      </form>
    </main>
  );
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
    if (!adminAuth.authenticated) {
      return (
        <AdminAccess
          configured={adminAuth.configured}
          onAuthenticated={() => {
            setAdminAuth({ checked: true, authenticated: true, configured: true });
            handleTabChange('home');
          }}
        />
      );
    }
    // If specifically requested legacy back-office
    if (subTab === 'legacy') {
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
  }

  return (
    <AdminEditProvider
      initialSiteData={siteData}
      initialPostsList={postsList}
      onUpdateSiteData={handleUpdateSiteData}
      onUpdatePostsList={handleUpdatePostsList}
      adminAuth={adminAuth}
      onLogout={handleLogout}
    >
      <AdminLiveToolbar />
      <AdminBlockNavigator
        activeTab={activeTab}
        homeSectors={HOME_SECTORS}
      />
      <AdminDrawer />

      <MainLayout>
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
              <SectorBlock
                sectorId="S-HOME-01"
                sectorName="메인 비주얼 배너"
                sectorList={HOME_SECTORS}
                editContentLabel="🖼️ 메인 배너 슬라이드 편집"
                onEditContent={() => {
                  handleTabChange('admin', 'legacy');
                }}
              >
                <Hero
                  heroBanners={siteData.heroBanners}
                  onExploreClick={() => handleTabChange('catalog')}
                  onAboutClick={() => handleTabChange('about', 'greetings')}
                  onInquiryClick={() => handleTabChange('community', 'inquiry')}
                />
              </SectorBlock>

              <SectorBlock
                sectorId="S-HOME-02"
                sectorName="수강생 모집 / 이벤트 배너"
                sectorList={HOME_SECTORS}
                editContentLabel="🎯 D-Day 배너 설정 수정"
                onEditContent={() => {
                  handleTabChange('admin', 'legacy');
                }}
              >
                <AwardCeremonyBannerSection
                  bannerData={siteData.banner}
                  onGoToGallery={() => handleTabChange('gallery', 'awards')}
                  onGoToInquiry={() => handleTabChange('community', 'inquiry')}
                />
              </SectorBlock>

              <SectorBlock
                sectorId="S-HOME-08"
                sectorName="공식 유튜브 미디어"
                sectorList={HOME_SECTORS}
                editContentLabel="🎥 유튜브 영상 링크 변경"
                onEditContent={() => {
                  window.dispatchEvent(new CustomEvent('kfssec:action', { detail: { action: 'edit_youtube' } }));
                }}
                customActions={[
                  {
                    label: '➕ 새 유튜브 영상 추가 등록',
                    onClick: () => {
                      window.dispatchEvent(new CustomEvent('kfssec:action', { detail: { action: 'add_youtube' } }));
                    },
                  },
                ]}
              >
                <YouTubeMediaSection
                  youtubeData={siteData.youtube}
                  onPlayVideo={handleOpenVideo}
                />
              </SectorBlock>

              <SectorBlock
                sectorId="S-HOME-03"
                sectorName="추천 강좌 큐레이션 (넷플릭스형)"
                sectorList={HOME_SECTORS}
                editContentLabel="📚 교육 과정 카탈로그 바로가기"
                onEditContent={() => handleTabChange('catalog', 'courses')}
              >
                <NetflixCoursesSection onSelectCourse={() => handleTabChange('catalog', 'courses')} />
              </SectorBlock>

              <SectorBlock sectorId="S-HOME-04" sectorName="글로벌 외식 트렌드 뉴스" sectorList={HOME_SECTORS}>
                <GlobalDiningTrendsSection />
              </SectorBlock>

              <SectorBlock
                sectorId="S-HOME-05"
                sectorName="자격증·실무 과정 카테고리"
                sectorList={HOME_SECTORS}
                editContentLabel="📋 과정 카테고리 둘러보기"
                onEditContent={() => handleTabChange('catalog', 'courses')}
              >
                <CategoryCourseSection onSelectCourse={() => handleTabChange('catalog', 'courses')} />
              </SectorBlock>

              <SectorBlock
                sectorId="S-HOME-05B"
                sectorName="분야별 교육 포커스"
                sectorList={HOME_SECTORS}
                editContentLabel="🔍 교육 포커스 상세 안내"
                onEditContent={() => handleTabChange('catalog', 'guide')}
              >
                <CategoryFocusSection onViewMoreClick={() => handleTabChange('catalog', 'guide')} />
              </SectorBlock>

              <SectorBlock sectorId="S-HOME-06" sectorName="공식 제휴 & 파트너사 로고" sectorList={HOME_SECTORS}>
                <PartnerMarqueeSection partnerLogos={siteData.partnerLogos} />
              </SectorBlock>

              <SectorBlock
                sectorId="S-HOME-07"
                sectorName="최신 공지사항 & 커뮤니티"
                sectorList={HOME_SECTORS}
                editContentLabel="📝 1:1 문의 및 신청 내역 확인"
                onEditContent={() => handleTabChange('community', 'inquiry')}
              >
                <NoticePostSection postsList={postsList} onScrollNext={() => scrollToSection('footer')} />
              </SectorBlock>
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

      {/* Footer Component wrapped in SectorBlock for unified context editing */}
      <SectorBlock
        sectorId="S-GLOBAL-02"
        sectorName="하단 푸터 & 법인 정보"
        editContentLabel="🏢 법인 연락처/사업자정보 수정"
        onEditContent={() => {
          window.dispatchEvent(new CustomEvent('kfssec:open-drawer', { detail: { tab: 'info' } }));
        }}
      >
        <Footer onTabChange={handleTabChange} siteData={siteData} />
      </SectorBlock>

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
      </MainLayout>
    </AdminEditProvider>
  );
}
