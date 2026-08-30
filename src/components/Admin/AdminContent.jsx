import React, { useState } from 'react';
import { Youtube, Image as ImageIcon, Save, CheckCircle2, Play, ExternalLink, Plus, Trash2, Eye, Edit3, Layout, Layers } from 'lucide-react';

export default function AdminContent() {
  const [youtubeTitle, setYoutubeTitle] = useState('한국외식창업교육원 미디어');
  const [youtubeSubtitle, setYoutubeSubtitle] = useState(
    '사단법인 한국외식창업교육원의 주요 정기총회 현장 및 아시아창의방송 언론 보도 영상입니다.'
  );
  const [youtubeChannelUrl, setYoutubeChannelUrl] = useState(
    'https://www.youtube.com/@%ED%95%9C%EA%B5%AD%EC%99%B8%EC%8B%9D%EC%B0%BD%EC%97%85%EA%B5%90%EC%9C%A1%EC%9C%88'
  );

  // 2 Real Official YouTube Videos Matching Actual Landing Page
  const [youtubeVideos, setYoutubeVideos] = useState([
    {
      id: 'v1',
      videoId: 'ZDZFUpS0fFE',
      title: '240203 한국외식창업교육원 정기총회',
      subtitle: '한국외식창업교육원 2023년 결산 및 2024년 사업 계획에 대한 정기 총회 전체 영상',
      channel: '한국외식창업교육원 공식 채널',
      categoryBadge: '공식 채널 영상',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    },
    {
      id: 'v2',
      videoId: 'E_WgebIP_SY',
      title: '안형상 한국외식창업교육원 이사장, 정기총회서 "100세 초고령 시대 교육을 통한 글로벌 K-FOOD 시대 열어야..." 강조',
      subtitle: '아시아창의방송(actv) 정기총회 현장 취재 및 안형상 이사장 특별 언론 보도 영상',
      channel: '아시아창의방송 (actv) 언론 보도',
      categoryBadge: '언론 보도 영상',
      badgeColor: 'bg-red-500/20 text-red-300 border-red-500/30',
    },
  ]);

  const [activeViewMode, setActiveViewMode] = useState('visual'); // 'visual' | 'edit'
  const [editingVideoId, setEditingVideoId] = useState(null);
  const [newVideoId, setNewVideoId] = useState('');
  const [newVideoTitle, setNewVideoTitle] = useState('');
  const [newVideoCategory, setNewVideoCategory] = useState('공식 채널 영상');
  const [bannerActive, setBannerActive] = useState(true);
  const [bannerTitle, setBannerTitle] = useState('240203 한국외식창업교육원 정기총회 세미나');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleAddVideo = (e) => {
    e.preventDefault();
    if (!newVideoId.trim() || !newVideoTitle.trim()) {
      alert('유튜브 Video ID와 영상 제목을 모두 입력해주세요.');
      return;
    }

    const newVideo = {
      id: `v-${Date.now()}`,
      videoId: newVideoId.trim(),
      title: newVideoTitle.trim(),
      subtitle: '사단법인 한국외식창업교육원 영상 콘텐츠',
      channel: '한국외식창업교육원 공식 채널',
      categoryBadge: newVideoCategory,
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    };

    setYoutubeVideos([...youtubeVideos, newVideo]);
    setNewVideoId('');
    setNewVideoTitle('');
  };

  const handleDeleteVideo = (id) => {
    if (youtubeVideos.length <= 1) {
      alert('최소 1개 이상의 유튜브 미디어 영상이 등록되어 있어야 합니다.');
      return;
    }
    if (window.confirm('이 유튜브 영상을 미디어 노출 목록에서 삭제하시겠습니까?')) {
      setYoutubeVideos(youtubeVideos.filter((v) => v.id !== id));
    }
  };

  const handleUpdateVideoTitle = (id, newTitle) => {
    setYoutubeVideos(
      youtubeVideos.map((v) => (v.id === id ? { ...v, title: newTitle } : v))
    );
  };

  const handleUpdateVideoId = (id, newVid) => {
    setYoutubeVideos(
      youtubeVideos.map((v) => (v.id === id ? { ...v, videoId: newVid } : v))
    );
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#111c16] p-6 rounded-3xl border border-emerald-500/20 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-black text-white">
              유튜브 미디어 & 시각적 랜딩페이지 편집 관리자
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-red-600/20 text-red-300 border border-red-500/40 text-xs font-black">
              LIVE VISUAL EDITOR
            </span>
          </div>
          <p className="text-xs sm:text-sm text-emerald-200/70 font-medium mt-1">
            개발자가 없이도 관리자가 실제 랜딩페이지 화면을 그대로 시각적으로 확인하며 유튜브 영상 및 타이틀을 즉시 수정합니다.
          </p>
        </div>

        {/* View Mode Toggle: Visual Preview vs Form Edit */}
        <div className="flex items-center gap-1 bg-[#16241c] p-1.5 rounded-2xl border border-emerald-500/30 shrink-0 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveViewMode('visual')}
            className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${
              activeViewMode === 'visual'
                ? 'bg-emerald-500 text-white shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>👁️ 실시간 랜딩페이지 시각적 모드</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveViewMode('edit')}
            className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${
              activeViewMode === 'edit'
                ? 'bg-emerald-500 text-white shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Edit3 className="w-4 h-4" />
            <span>⚙️ 폼 상세 입력 모드</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        
        {/* VIEW MODE 1: LIVE VISUAL LANDING PAGE EDITOR (실제 랜딩페이지와 100% 동일한 시각적 편집기) */}
        {activeViewMode === 'visual' ? (
          <div className="space-y-6">
            <div className="bg-[#08100d] rounded-3xl p-6 sm:p-10 border border-emerald-500/30 shadow-2xl space-y-8 relative overflow-hidden">
              <div className="absolute top-3 right-4 px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full text-xs font-black">
                LIVE COMPONENT PREVIEW & DIRECT EDIT
              </div>

              {/* Section Header with Direct In-place Editing */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-emerald-950 pb-6">
                <div className="space-y-2 flex-1 max-w-3xl">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-600/20 border border-red-500/30 text-red-400 text-xs font-black">
                    <Youtube className="w-4 h-4 fill-current shrink-0" />
                    <span>YOUTUBE OFFICIAL</span>
                  </div>

                  {/* Direct Editable Title */}
                  <div className="space-y-1">
                    <label className="text-[11px] text-emerald-400 font-extrabold block">
                      [클릭하여 제목 수정 가능]
                    </label>
                    <input
                      type="text"
                      value={youtubeTitle}
                      onChange={(e) => setYoutubeTitle(e.target.value)}
                      className="w-full bg-[#12241b] border border-emerald-500/40 rounded-xl px-4 py-2 text-2xl sm:text-3xl font-black text-white focus:outline-none focus:border-emerald-400"
                    />
                  </div>

                  {/* Direct Editable Subtitle */}
                  <input
                    type="text"
                    value={youtubeSubtitle}
                    onChange={(e) => setYoutubeSubtitle(e.target.value)}
                    className="w-full bg-[#12241b] border border-emerald-500/30 rounded-xl px-4 py-1.5 text-xs sm:text-sm text-emerald-200/80 font-medium focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <a
                  href={youtubeChannelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg transition-all shrink-0 whitespace-nowrap cursor-pointer"
                >
                  <Youtube className="w-4 h-4 fill-current shrink-0" />
                  <span>한국외식창업교육원 채널</span>
                  <ExternalLink className="w-4 h-4 shrink-0" />
                </a>
              </div>

              {/* 2-Column Real YouTube Videos Visual Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                {youtubeVideos.map((video) => {
                  const thumbnailUrl = `https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`;

                  return (
                    <div
                      key={video.id}
                      className="bg-[#0f1f18] rounded-3xl border border-emerald-500/30 overflow-hidden shadow-xl hover:border-emerald-400/80 transition-all flex flex-col justify-between group"
                    >
                      {/* Real Official YouTube Thumbnail Preview with Play Icon */}
                      <div className="relative aspect-video w-full bg-black overflow-hidden">
                        <img
                          src={thumbnailUrl}
                          alt={video.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 brightness-95"
                          onError={(e) => {
                            e.target.src = '/images/hero_bg.jpg';
                          }}
                        />
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />

                        {/* Large Red YouTube Play Icon */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-16 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                            <Play className="w-7 h-7 fill-current ml-1" />
                          </div>
                        </div>

                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-bold text-white">
                          <span className="px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md text-emerald-300 border border-white/20">
                            HD 동영상 시청하기 (Video ID: {video.videoId})
                          </span>
                        </div>
                      </div>

                      {/* In-place Editable Title & Video ID */}
                      <div className="p-5 sm:p-6 space-y-3 flex-1 flex flex-col justify-between bg-[#0f1f18]">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between gap-2">
                            <span className={`px-2.5 py-0.5 rounded-full border text-[11px] font-black ${video.badgeColor}`}>
                              {video.categoryBadge}
                            </span>
                            <span className="text-xs font-bold text-gray-400">{video.channel}</span>
                          </div>

                          {/* Editable Title */}
                          <textarea
                            value={video.title}
                            onChange={(e) => handleUpdateVideoTitle(video.id, e.target.value)}
                            rows={2}
                            className="w-full bg-[#162a20] border border-emerald-500/40 rounded-xl p-2 text-sm font-black text-white focus:outline-none focus:border-emerald-400 leading-snug"
                          />
                        </div>

                        {/* Editable Video ID & Action Buttons */}
                        <div className="pt-3 border-t border-emerald-900/60 flex items-center justify-between gap-3 text-xs">
                          <div className="flex items-center gap-1.5 flex-1">
                            <span className="text-gray-400 font-bold shrink-0">ID:</span>
                            <input
                              type="text"
                              value={video.videoId}
                              onChange={(e) => handleUpdateVideoId(video.id, e.target.value)}
                              className="w-full bg-[#162a20] border border-emerald-500/40 rounded-lg px-2 py-1 text-xs font-mono text-emerald-300 focus:outline-none focus:border-emerald-400"
                            />
                          </div>

                          <button
                            type="button"
                            onClick={() => handleDeleteVideo(video.id)}
                            className="p-1.5 rounded-lg bg-rose-900/40 hover:bg-rose-800 text-rose-300 transition-colors cursor-pointer shrink-0"
                            title="영상 삭제"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          /* VIEW MODE 2: FORM INPUT EDIT MODE */
          <div className="bg-[#111c16] rounded-3xl p-6 sm:p-8 border border-emerald-500/20 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-emerald-900/60 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center">
                  <Youtube className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white">유튜브 미디어 폼 상세 관리</h3>
                  <p className="text-xs text-gray-400">영상 추가, 분류 태그 및 대표 텍스트 설정 폼입니다.</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs sm:text-sm">
              <div className="space-y-1.5">
                <label className="font-extrabold text-emerald-300">섹션 제목</label>
                <input
                  type="text"
                  value={youtubeTitle}
                  onChange={(e) => setYoutubeTitle(e.target.value)}
                  className="w-full bg-[#16241c] border border-emerald-500/30 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-emerald-400 font-bold"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-extrabold text-emerald-300">공식 유튜브 채널 이동 URL</label>
                <input
                  type="text"
                  value={youtubeChannelUrl}
                  onChange={(e) => setYoutubeChannelUrl(e.target.value)}
                  className="w-full bg-[#16241c] border border-emerald-500/30 rounded-xl px-4 py-2.5 text-white font-mono text-xs focus:outline-none focus:border-emerald-400"
                />
              </div>
            </div>
          </div>
        )}

        {/* Add New YouTube Video Section */}
        <div className="bg-[#111c16] rounded-3xl p-6 border border-emerald-500/20 shadow-xl space-y-4">
          <h4 className="text-sm font-black text-white flex items-center gap-2">
            <Plus className="w-4 h-4 text-emerald-400" />
            <span>+ 신규 유튜브 영상 추가 (실제 영상 ID 및 제목 입력)</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
            <div className="sm:col-span-4 space-y-1">
              <label className="text-[11px] font-bold text-emerald-300">유튜브 Video ID (예: ZDZFUpS0fFE)</label>
              <input
                type="text"
                value={newVideoId}
                onChange={(e) => setNewVideoId(e.target.value)}
                placeholder="예: ZDZFUpS0fFE"
                className="w-full bg-[#16241c] border border-emerald-500/40 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-emerald-400"
              />
            </div>

            <div className="sm:col-span-5 space-y-1">
              <label className="text-[11px] font-bold text-emerald-300">영상 제목</label>
              <input
                type="text"
                value={newVideoTitle}
                onChange={(e) => setNewVideoTitle(e.target.value)}
                placeholder="예: 240203 한국외식창업교육원 정기총회"
                className="w-full bg-[#16241c] border border-emerald-500/40 rounded-xl px-3 py-2 text-xs text-white font-bold focus:outline-none focus:border-emerald-400"
              />
            </div>

            <div className="sm:col-span-3">
              <button
                type="button"
                onClick={handleAddVideo}
                className="w-full py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>신규 영상 추가</span>
              </button>
            </div>
          </div>
        </div>

        {/* Banner Settings Card with Live Preview Box */}
        <div className="bg-[#111c16] rounded-3xl p-6 sm:p-8 border border-emerald-500/20 shadow-xl space-y-5">
          <div className="flex items-center justify-between border-b border-emerald-900/60 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
                <ImageIcon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-white">상단 이벤트/공지 띠배너 라이브 관리</h3>
                <p className="text-xs text-gray-400">메인 최상단 프로모션 배너 텍스트 및 실시간 가상 프리뷰입니다.</p>
              </div>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={bannerActive}
                onChange={(e) => setBannerActive(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
              <span className="ml-2 text-xs font-black text-gray-300">
                {bannerActive ? '배너 노출중' : '숨김'}
              </span>
            </label>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5 text-xs sm:text-sm">
              <label className="font-extrabold text-emerald-300">배너 문구 입력</label>
              <input
                type="text"
                value={bannerTitle}
                onChange={(e) => setBannerTitle(e.target.value)}
                className="w-full bg-[#16241c] border border-emerald-500/30 rounded-xl px-4 py-2.5 text-white font-bold focus:outline-none focus:border-emerald-400"
              />
            </div>

            {/* Banner Live Preview Strip */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-gray-400">실제 웹사이트 최상단 노출 예시 프리뷰:</span>
              {bannerActive ? (
                <div className="bg-[#0c1015] border border-emerald-500/40 rounded-xl p-3 text-center text-xs font-black text-white flex items-center justify-center gap-3 shadow-inner">
                  <span className="px-2 py-0.5 bg-rose-500 text-white rounded text-[10px] uppercase font-mono">
                    EVENT
                  </span>
                  <span>{bannerTitle}</span>
                  <span className="text-emerald-400 text-[11px] underline font-bold cursor-pointer">
                    자세히 보기 ➔
                  </span>
                </div>
              ) : (
                <div className="bg-gray-900 border border-gray-800 rounded-xl p-3 text-center text-xs font-bold text-gray-500">
                  현재 배너가 비활성화(숨김) 처리되어 화면에 노출되지 않습니다.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Submit Save Button */}
        <div className="flex items-center justify-between pt-2">
          {savedSuccess ? (
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm animate-fadeIn">
              <CheckCircle2 className="w-5 h-5" />
              <span>유튜브 미디어 및 배너 설정이 성공적으로 저장되었습니다!</span>
            </div>
          ) : <div />}

          <button
            type="submit"
            className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-sm rounded-xl shadow-lg transition-all cursor-pointer flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>설정 저장하기</span>
          </button>
        </div>

      </form>

    </div>
  );
}
