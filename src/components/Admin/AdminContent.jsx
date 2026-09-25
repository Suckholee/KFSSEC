import React, { useState, useEffect } from 'react';
import {
  Youtube,
  Image as ImageIcon,
  Save,
  CheckCircle2,
  Play,
  ExternalLink,
  Plus,
  Trash2,
  Eye,
  Edit3,
  HelpCircle,
  Link as LinkIcon,
  Sparkles,
  Calendar,
  Layers,
} from 'lucide-react';
import { extractYoutubeId } from '../../utils/youtube';

export default function AdminContent({ siteData = {}, onUpdateSiteData }) {
  const [activeSubTab, setActiveSubTab] = useState('visual_editor'); // 'visual_editor' | 'banner_edit' | 'youtube_edit'

  // YouTube State
  const [youtubeTitle, setYoutubeTitle] = useState(
    siteData?.youtube?.title || '한국외식창업교육원 미디어'
  );
  const [youtubeSubtitle, setYoutubeSubtitle] = useState(
    siteData?.youtube?.subtitle ||
      '사단법인 한국외식창업교육원의 주요 정기총회 현장 및 아시아창의방송 언론 보도 영상입니다.'
  );
  const [youtubeChannelUrl, setYoutubeChannelUrl] = useState(
    siteData?.youtube?.channelUrl ||
      'https://www.youtube.com/@%ED%95%9C%EA%B5%AD%EC%99%B8%EC%8B%9D%EC%B0%BD%EC%97%85%EA%B5%90%EC%9C%A1%EC%9C%88'
  );
  const [youtubeVideos, setYoutubeVideos] = useState(
    siteData?.youtube?.videos || [
      {
        id: 'v1',
        videoUrl: 'https://www.youtube.com/watch?v=ZDZFUpS0fFE',
        videoId: 'ZDZFUpS0fFE',
        title: '240203 한국외식창업교육원 정기총회',
        subtitle: '한국외식창업교육원 2023년 결산 및 2024년 사업 계획에 대한 정기 총회 전체 영상',
        channel: '한국외식창업교육원 공식 채널',
        categoryBadge: '공식 채널 영상',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      },
      {
        id: 'v2',
        videoUrl: 'https://www.youtube.com/watch?v=E_WgebIP_SY',
        videoId: 'E_WgebIP_SY',
        title:
          '안형상 한국외식창업교육원 이사장, 정기총회서 "100세 초고령 시대 교육을 통한 글로벌 K-FOOD 시대 열어야..." 강조',
        subtitle: '아시아창의방송(actv) 정기총회 현장 취재 및 안형상 이사장 특별 언론 보도 영상',
        channel: '아시아창의방송 (actv) 언론 보도',
        categoryBadge: '언론 보도 영상',
        badgeColor: 'bg-red-100 text-red-800 border-red-300',
      },
    ]
  );

  // New Video Form Input
  const [newVideoInputUrl, setNewVideoInputUrl] = useState('');
  const [newVideoTitle, setNewVideoTitle] = useState('');
  const [newVideoCategory, setNewVideoCategory] = useState('공식 채널 영상');

  // Banner State
  const [bannerActive, setBannerActive] = useState(
    siteData?.banner?.active !== false
  );
  const [bannerBadgeText, setBannerBadgeText] = useState(
    siteData?.banner?.badgeText || '사단법인 한국외식창업교육원 2026 하반기 신규 수강생 모집'
  );
  const [bannerTitle, setBannerTitle] = useState(
    siteData?.banner?.title || 'K-FOOD 시그니처 100년 발효 레시피 & 창업 실무 직강'
  );
  const [bannerSubtitle, setBannerSubtitle] = useState(
    siteData?.banner?.subtitle || '특급호텔 40년 명장이 전수하는 소상공인 창업 성공 솔루션'
  );
  const [bannerDDay, setBannerDDay] = useState(
    siteData?.banner?.dDay || 'D-7일 마감임박'
  );
  const [bannerButtonText, setBannerButtonText] = useState(
    siteData?.banner?.buttonText || '수강생 필수 서비스 안내'
  );

  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (siteData) {
      if (siteData.youtube?.title) setYoutubeTitle(siteData.youtube.title);
      if (siteData.youtube?.subtitle) setYoutubeSubtitle(siteData.youtube.subtitle);
      if (siteData.youtube?.channelUrl) setYoutubeChannelUrl(siteData.youtube.channelUrl);
      if (siteData.youtube?.videos) setYoutubeVideos(siteData.youtube.videos);
      if (siteData.banner?.active !== undefined) setBannerActive(siteData.banner.active);
      if (siteData.banner?.badgeText) setBannerBadgeText(siteData.banner.badgeText);
      if (siteData.banner?.title) setBannerTitle(siteData.banner.title);
      if (siteData.banner?.subtitle) setBannerSubtitle(siteData.banner.subtitle);
      if (siteData.banner?.dDay) setBannerDDay(siteData.banner.dDay);
      if (siteData.banner?.buttonText) setBannerButtonText(siteData.banner.buttonText);
    }
  }, [siteData]);

  // Synchronize SiteData helper
  const syncToParent = (updatedYoutube, updatedBanner) => {
    if (onUpdateSiteData) {
      onUpdateSiteData({
        ...siteData,
        youtube: updatedYoutube || {
          title: youtubeTitle,
          subtitle: youtubeSubtitle,
          channelUrl: youtubeChannelUrl,
          videos: youtubeVideos,
        },
        banner: updatedBanner || {
          active: bannerActive,
          badgeText: bannerBadgeText,
          title: bannerTitle,
          subtitle: bannerSubtitle,
          dDay: bannerDDay,
          buttonText: bannerButtonText,
        },
      });
    }
  };

  const handleAddVideo = (e) => {
    e.preventDefault();
    const rawUrl = newVideoInputUrl.trim();
    const extractedId = extractYoutubeId(rawUrl);

    if (!rawUrl || !newVideoTitle.trim()) {
      alert('유튜브 영상 전체 주소(URL)와 영상 제목을 모두 입력해주세요.');
      return;
    }

    const newVideo = {
      id: `v-${Date.now()}`,
      videoUrl: rawUrl.startsWith('http') ? rawUrl : `https://www.youtube.com/watch?v=${extractedId}`,
      videoId: extractedId || 'ZDZFUpS0fFE',
      title: newVideoTitle.trim(),
      subtitle: '사단법인 한국외식창업교육원 영상 콘텐츠',
      channel: '한국외식창업교육원 공식 채널',
      categoryBadge: newVideoCategory,
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    };

    const updatedVideos = [...youtubeVideos, newVideo];
    setYoutubeVideos(updatedVideos);
    setNewVideoInputUrl('');
    setNewVideoTitle('');

    const newYoutube = {
      title: youtubeTitle,
      subtitle: youtubeSubtitle,
      channelUrl: youtubeChannelUrl,
      videos: updatedVideos,
    };
    syncToParent(newYoutube, null);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleDeleteVideo = (id) => {
    if (youtubeVideos.length <= 1) {
      alert('최소 1개 이상의 유튜브 미디어 영상이 등록되어 있어야 합니다.');
      return;
    }
    if (window.confirm('이 유튜브 영상을 미디어 노출 목록에서 삭제하시겠습니까?')) {
      const updatedVideos = youtubeVideos.filter((v) => v.id !== id);
      setYoutubeVideos(updatedVideos);
      const newYoutube = {
        title: youtubeTitle,
        subtitle: youtubeSubtitle,
        channelUrl: youtubeChannelUrl,
        videos: updatedVideos,
      };
      syncToParent(newYoutube, null);
    }
  };

  const handleSaveAll = (e) => {
    e.preventDefault();
    const newYoutube = {
      title: youtubeTitle,
      subtitle: youtubeSubtitle,
      channelUrl: youtubeChannelUrl,
      videos: youtubeVideos,
    };
    const newBanner = {
      active: bannerActive,
      badgeText: bannerBadgeText,
      title: bannerTitle,
      subtitle: bannerSubtitle,
      dDay: bannerDDay,
      buttonText: bannerButtonText,
    };
    syncToParent(newYoutube, newBanner);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 animate-fadeIn font-sans text-gray-900 max-w-7xl mx-auto pb-12">
      
      {/* Header Bar */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black">
              HOME VISUAL & MEDIA CONTROL
            </span>
          </div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight mt-1">
            홈화면 라이브 에디터 & 유튜브 미디어 관리
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            메인 행사 띠배너, 모집 카운트다운(D-Day), 언론 보도 및 유튜브 동영상 콘텐츠를 실시간으로 제어합니다.
          </p>
        </div>

        {/* View/Subtab Switcher */}
        <div className="flex items-center gap-1.5 bg-gray-100 p-1.5 rounded-2xl border border-gray-200 self-start md:self-auto">
          <button
            onClick={() => setActiveSubTab('visual_editor')}
            className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
              activeSubTab === 'visual_editor'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            🖥️ 통합 라이브 뷰
          </button>
          <button
            onClick={() => setActiveSubTab('banner_edit')}
            className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
              activeSubTab === 'banner_edit'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            📢 행사 띠배너 설정
          </button>
          <button
            onClick={() => setActiveSubTab('youtube_edit')}
            className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
              activeSubTab === 'youtube_edit'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            📺 유튜브 영상 관리
          </button>
        </div>
      </div>

      {/* Success Notification */}
      {savedSuccess && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 px-4 py-3 rounded-2xl text-xs font-black flex items-center gap-2 shadow-xs animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>홈페이지 배너 및 유튜브 미디어 설정이 성공적으로 저장 및 반영되었습니다!</span>
        </div>
      )}

      {/* SUBTAB 1: INTEGRATED VISUAL LIVE VIEW */}
      {activeSubTab === 'visual_editor' && (
        <div className="space-y-6">
          
          {/* Section 1: Event Banner Live Preview & Quick Edit */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <h3 className="text-base font-black text-gray-900">
                  메인 행사 띠배너 실시간 라이브 프리뷰
                </h3>
              </div>
              <button
                onClick={() => setActiveSubTab('banner_edit')}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 cursor-pointer"
              >
                배너 상세 설정 이동 &gt;
              </button>
            </div>

            {/* Live Banner Box */}
            {bannerActive ? (
              <div className="bg-gradient-to-r from-[#0B3C26] via-[#104830] to-[#072517] text-white p-6 rounded-2xl border-2 border-[#C5A059] shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="inline-block px-2.5 py-0.5 rounded-full bg-[#C5A059] text-stone-950 text-[10px] font-black">
                    {bannerBadgeText}
                  </div>
                  <h4 className="text-lg font-black text-white">{bannerTitle}</h4>
                  <p className="text-xs text-emerald-100/90">{bannerSubtitle}</p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="px-3 py-1 rounded-xl bg-rose-600 text-white font-mono font-black text-xs">
                    {bannerDDay}
                  </span>
                  <span className="px-4 py-2 rounded-xl bg-[#C5A059] text-stone-950 font-black text-xs">
                    {bannerButtonText}
                  </span>
                </div>
              </div>
            ) : (
              <div className="bg-gray-100 p-6 rounded-2xl text-center text-gray-400 font-bold text-xs border border-dashed border-gray-300">
                현재 행사 띠배너가 숨김(비활성) 상태입니다.
              </div>
            )}
          </div>

          {/* Section 2: YouTube Media Live Grid */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <Youtube className="w-5 h-5 text-red-600 fill-current" />
                  <h3 className="text-base font-black text-gray-900">
                    유튜브 미디어 섹션 라이브 프리뷰 ({youtubeVideos.length}개 영상)
                  </h3>
                </div>
                <p className="text-xs text-gray-500">{youtubeTitle} — {youtubeSubtitle}</p>
              </div>
              <button
                onClick={() => setActiveSubTab('youtube_edit')}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 cursor-pointer"
              >
                영상 추가/편집 &gt;
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {youtubeVideos.map((video) => {
                const effectiveId = extractYoutubeId(video.videoUrl || video.videoId);
                const thumb = `https://img.youtube.com/vi/${effectiveId}/hqdefault.jpg`;
                return (
                  <div
                    key={video.id}
                    className="bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden shadow-xs hover:border-emerald-500 transition-colors flex flex-col justify-between"
                  >
                    <div className="relative aspect-video w-full bg-black">
                      <img
                        src={thumb}
                        alt={video.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.opacity = '0.5';
                        }}
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <div className="w-12 h-9 rounded-xl bg-red-600 text-white flex items-center justify-center shadow-lg">
                          <Play className="w-5 h-5 fill-current ml-0.5" />
                        </div>
                      </div>
                    </div>

                    <div className="p-4 space-y-2">
                      <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-black">
                        {video.categoryBadge || '공식 채널'}
                      </span>
                      <h4 className="text-xs font-bold text-gray-900 line-clamp-2">
                        {video.title}
                      </h4>
                      <p className="text-[11px] text-gray-500 font-mono line-clamp-1">
                        {video.videoUrl || `https://www.youtube.com/watch?v=${video.videoId}`}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      )}

      {/* SUBTAB 2: EVENT BANNER EDIT */}
      {activeSubTab === 'banner_edit' && (
        <form onSubmit={handleSaveAll} className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <div>
              <h3 className="text-lg font-black text-gray-900">
                행사 띠배너 & 수강생 모집 안내 설정
              </h3>
              <p className="text-xs text-gray-500">
                메인 홈페이지 최상단에 강조 노출되는 띠배너의 문구 및 활성화 여부를 설정합니다.
              </p>
            </div>

            {/* Active Toggle Switch */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-gray-700">배너 노출 여부:</span>
              <button
                type="button"
                onClick={() => setBannerActive(!bannerActive)}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-colors cursor-pointer ${
                  bannerActive
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {bannerActive ? '✓ 노출중 (ON)' : '숨김 (OFF)'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
            <div className="space-y-1.5 md:col-span-2">
              <label className="font-black text-gray-700">상단 소형 뱃지 문구</label>
              <input
                type="text"
                value={bannerBadgeText}
                onChange={(e) => setBannerBadgeText(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2.5 text-gray-900 font-bold focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="space-y-1.5 md:col-span-2">
              <label className="font-black text-gray-700">메인 배너 타이틀</label>
              <input
                type="text"
                value={bannerTitle}
                onChange={(e) => setBannerTitle(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2.5 text-gray-900 font-bold focus:outline-none focus:border-emerald-500"
                required
              />
            </div>

            <div className="space-y-1.5 md:col-span-2">
              <label className="font-black text-gray-700">서브타이틀 설명 문구</label>
              <input
                type="text"
                value={bannerSubtitle}
                onChange={(e) => setBannerSubtitle(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2.5 text-gray-900 font-bold focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-black text-gray-700">D-Day 마감 카운트 문구</label>
              <input
                type="text"
                value={bannerDDay}
                onChange={(e) => setBannerDDay(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2.5 text-gray-900 font-bold focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-black text-gray-700">우측 액션 버튼 문구</label>
              <input
                type="text"
                value={bannerButtonText}
                onChange={(e) => setBannerButtonText(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2.5 text-gray-900 font-bold focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="flex items-center justify-end pt-4 border-t border-gray-100">
            <button
              type="submit"
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>배너 설정 저장</span>
            </button>
          </div>
        </form>
      )}

      {/* SUBTAB 3: YOUTUBE MEDIA EDIT */}
      {activeSubTab === 'youtube_edit' && (
        <div className="space-y-6">
          
          {/* Section Titles Form */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-4">
            <div className="border-b border-gray-100 pb-3">
              <h3 className="text-base font-black text-gray-900">
                유튜브 미디어 섹션 제목 및 채널 링크 설정
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-black text-gray-700">섹션 메인 제목</label>
                <input
                  type="text"
                  value={youtubeTitle}
                  onChange={(e) => setYoutubeTitle(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2.5 text-gray-900 font-bold focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-black text-gray-700">공식 유튜브 채널 URL</label>
                <input
                  type="text"
                  value={youtubeChannelUrl}
                  onChange={(e) => setYoutubeChannelUrl(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2.5 text-gray-900 font-bold focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="font-black text-gray-700">섹션 부제목 설명</label>
                <input
                  type="text"
                  value={youtubeSubtitle}
                  onChange={(e) => setYoutubeSubtitle(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2.5 text-gray-900 font-bold focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={handleSaveAll}
                className="px-5 py-2 bg-gray-900 hover:bg-black text-white text-xs font-black rounded-xl cursor-pointer"
              >
                기본 제목 저장
              </button>
            </div>
          </div>

          {/* Add New Video Card */}
          <form onSubmit={handleAddVideo} className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
              <Plus className="w-4 h-4 text-emerald-600" />
              <h3 className="text-base font-black text-gray-900">새 유튜브 영상 등록</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="space-y-1.5 md:col-span-2">
                <label className="font-black text-gray-700">유튜브 전체 웹주소 (URL)</label>
                <input
                  type="text"
                  value={newVideoInputUrl}
                  onChange={(e) => setNewVideoInputUrl(e.target.value)}
                  placeholder="예: https://www.youtube.com/watch?v=ZDZFUpS0fFE"
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2.5 text-gray-900 font-bold focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-black text-gray-700">카테고리 뱃지</label>
                <select
                  value={newVideoCategory}
                  onChange={(e) => setNewVideoCategory(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2.5 text-gray-900 font-bold focus:outline-none focus:border-emerald-500"
                >
                  <option value="공식 채널 영상">공식 채널 영상</option>
                  <option value="언론 보도 영상">언론 보도 영상</option>
                  <option value="특강 및 세미나">특강 및 세미나</option>
                  <option value="수강생 현장 스케치">수강생 현장 스케치</option>
                </select>
              </div>

              <div className="space-y-1.5 md:col-span-3">
                <label className="font-black text-gray-700">영상 제목</label>
                <input
                  type="text"
                  value={newVideoTitle}
                  onChange={(e) => setNewVideoTitle(e.target.value)}
                  placeholder="예: 2026 한국외식창업교육원 총회 및 K-FOOD 비전 선포식"
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2.5 text-gray-900 font-bold focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>영상 목록에 추가 및 라이브 반영</span>
              </button>
            </div>
          </form>

          {/* Managed Videos List */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-4">
            <h3 className="text-base font-black text-gray-900 border-b border-gray-100 pb-3">
              현재 노출 중인 영상 목록 ({youtubeVideos.length}개)
            </h3>

            <div className="divide-y divide-gray-100">
              {youtubeVideos.map((video) => {
                const effectiveId = extractYoutubeId(video.videoUrl || video.videoId);
                const thumb = `https://img.youtube.com/vi/${effectiveId}/hqdefault.jpg`;
                return (
                  <div
                    key={video.id}
                    className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={thumb}
                        alt={video.title}
                        className="w-24 h-16 object-cover rounded-xl border border-gray-200 shrink-0 bg-black"
                      />
                      <div className="space-y-1">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-gray-100 text-gray-700">
                          {video.categoryBadge}
                        </span>
                        <h4 className="text-xs font-bold text-gray-900">{video.title}</h4>
                        <p className="text-[11px] text-gray-500 font-mono">
                          {video.videoUrl || `https://www.youtube.com/watch?v=${video.videoId}`}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <a
                        href={video.videoUrl || `https://www.youtube.com/watch?v=${video.videoId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-gray-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors"
                        title="유튜브에서 열기"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                      <button
                        onClick={() => handleDeleteVideo(video.id)}
                        className="p-2 text-gray-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                        title="삭제"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
