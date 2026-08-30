import React, { useState } from 'react';
import { Youtube, Image as ImageIcon, Save, CheckCircle2, Play, ExternalLink, Plus, Trash2, Eye } from 'lucide-react';

export default function AdminContent() {
  const [youtubeTitle, setYoutubeTitle] = useState('한국외식창업교육원 미디어');
  const [youtubeChannelUrl, setYoutubeChannelUrl] = useState(
    'https://www.youtube.com/@%ED%95%9C%EA%B5%AD%EC%99%B8%EC%8B%9D%EC%B0%BD%EC%97%85%EA%B5%90%EC%9C%A1%EC%9C%88'
  );

  // Managed List of YouTube Videos with Real-time Thumbnail Preview
  const [youtubeVideos, setYoutubeVideos] = useState([
    {
      id: 'v1',
      videoId: 'rC1sD5sF55E',
      title: '240203 한국외식창업교육원 정기총회 세미나',
      subtitle: '사단법인 한국외식창업교육원 공식 행사 영상',
      category: '정기총회',
    },
    {
      id: 'v2',
      videoId: 'L_LUpnjgPso',
      title: '외식업 창업 마스터클래스 실전 현장',
      subtitle: '안형상 이사장 외 명장진 직강 인터뷰',
      category: '교육현장',
    },
    {
      id: 'v3',
      videoId: 'M7lc1UVf-VE',
      title: '성공적인 카페 & 음료 매장 창업 노하우',
      subtitle: '시그니처 레시피 및 원가 비율 최적화',
      category: '창업노하우',
    },
  ]);

  const [newVideoId, setNewVideoId] = useState('');
  const [newVideoTitle, setNewVideoTitle] = useState('');
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
      subtitle: '한국외식창업교육원 미디어 콘텐츠',
      category: '미디어',
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

  const handleSave = (e) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header Bar */}
      <div className="bg-[#111c16] p-6 rounded-3xl border border-emerald-500/20 shadow-xl">
        <h2 className="text-xl sm:text-2xl font-black text-white">
          유튜브 미디어 & 배너 콘텐츠 관리
        </h2>
        <p className="text-xs sm:text-sm text-emerald-200/70 font-medium mt-1">
          메인 페이지의 "한국외식창업교육원 미디어" 섹션에 노출될 유튜브 영상의 실시간 썸네일을 직접 확인하고 관리합니다.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        
        {/* YouTube Section & Real-time Thumbnail Gallery */}
        <div className="bg-[#111c16] rounded-3xl p-6 sm:p-8 border border-emerald-500/20 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-900/60 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center">
                <Youtube className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-white">유튜브 미디어 썸네일 & 영상 관리</h3>
                <p className="text-xs text-gray-400">메인 1-Scroll 화면에 노출될 영상 썸네일과 제목을 실시간으로 설정합니다.</p>
              </div>
            </div>

            <a
              href={youtubeChannelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-black transition-all flex items-center gap-1.5 shrink-0 self-start sm:self-auto cursor-pointer shadow-md"
            >
              <Youtube className="w-4 h-4" />
              <span>공식 유튜브 채널 바로가기</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Title & Channel Settings Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs sm:text-sm">
            <div className="space-y-1.5">
              <label className="font-extrabold text-emerald-300">섹션 대표 타이틀 제목</label>
              <input
                type="text"
                value={youtubeTitle}
                onChange={(e) => setYoutubeTitle(e.target.value)}
                className="w-full bg-[#16241c] border border-emerald-500/30 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-emerald-400 font-bold"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-extrabold text-emerald-300">공식 유튜브 채널 URL</label>
              <input
                type="text"
                value={youtubeChannelUrl}
                onChange={(e) => setYoutubeChannelUrl(e.target.value)}
                className="w-full bg-[#16241c] border border-emerald-500/30 rounded-xl px-4 py-2.5 text-white font-mono text-xs focus:outline-none focus:border-emerald-400"
              />
            </div>
          </div>

          {/* REAL-TIME YOUTUBE THUMBNAIL GALLERY CARDS */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-black text-emerald-300 flex items-center gap-2">
                <Eye className="w-4 h-4 text-emerald-400" />
                <span>현재 메인 화면에 노출 중인 유튜브 미디어 썸네일 ({youtubeVideos.length}개)</span>
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {youtubeVideos.map((video) => {
                const thumbnailUrl = `https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`;
                const watchUrl = `https://www.youtube.com/watch?v=${video.videoId}`;

                return (
                  <div
                    key={video.id}
                    className="bg-[#0b1710] rounded-2xl border border-emerald-500/30 overflow-hidden shadow-lg hover:border-emerald-400 transition-all flex flex-col justify-between group"
                  >
                    {/* YouTube Video Thumbnail Preview Box */}
                    <div className="relative aspect-video w-full overflow-hidden bg-black">
                      <img
                        src={thumbnailUrl}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.target.src = '/images/hero_bg.jpg';
                        }}
                      />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-rose-600/90 text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                          <Play className="w-6 h-6 fill-current ml-0.5" />
                        </div>
                      </div>

                      <div className="absolute bottom-2 left-2 text-[11px] font-mono text-gray-200 bg-black/70 px-2 py-0.5 rounded border border-white/20">
                        ID: {video.videoId}
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                      <div className="space-y-1">
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">
                          {video.category}
                        </span>
                        <h5 className="text-sm font-black text-white line-clamp-2 pt-1 leading-snug">
                          {video.title}
                        </h5>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-emerald-900/40">
                        <a
                          href={watchUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                        >
                          <span>유튜브에서 보기</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>

                        <button
                          type="button"
                          onClick={() => handleDeleteVideo(video.id)}
                          className="p-1.5 rounded-lg bg-rose-900/40 hover:bg-rose-800 text-rose-300 transition-colors cursor-pointer"
                          title="영상 삭제"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Form: Add New YouTube Video */}
          <div className="bg-[#16241c] p-4 rounded-2xl border border-emerald-500/30 space-y-3">
            <h4 className="text-xs font-black text-white flex items-center gap-1.5">
              <Plus className="w-4 h-4 text-emerald-400" />
              <span>+ 신규 유튜브 영상 등록 (Video ID 입력 시 썸네일 자동 생성)</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
              <div className="sm:col-span-4 space-y-1">
                <label className="text-[11px] font-bold text-emerald-300">유튜브 Video ID</label>
                <input
                  type="text"
                  value={newVideoId}
                  onChange={(e) => setNewVideoId(e.target.value)}
                  placeholder="예: rC1sD5sF55E"
                  className="w-full bg-[#0d1712] border border-emerald-500/40 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div className="sm:col-span-6 space-y-1">
                <label className="text-[11px] font-bold text-emerald-300">영상 제목</label>
                <input
                  type="text"
                  value={newVideoTitle}
                  onChange={(e) => setNewVideoTitle(e.target.value)}
                  placeholder="예: 외식 창업 마스터 현장 세미나"
                  className="w-full bg-[#0d1712] border border-emerald-500/40 rounded-xl px-3 py-2 text-xs text-white font-bold focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div className="sm:col-span-2">
                <button
                  type="button"
                  onClick={handleAddVideo}
                  className="w-full py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>영상 추가</span>
                </button>
              </div>
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
