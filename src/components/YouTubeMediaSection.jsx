import { useLanguage } from '../i18n/LanguageContext';
import React, { useState, useEffect } from 'react';
import {
  Youtube,
  Play,
  ExternalLink,
  Edit3,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  X,
} from 'lucide-react';
import YouTubeModal from './YouTubeModal';
import { extractYoutubeId, isValidYoutubeId, getYoutubeThumbnail } from '../utils/youtube';
import EditableText from './Admin/InlineEditor/EditableText';
import { useAdminEdit } from '../context/AdminEditContext';

function YouTubeCardImage({ videoId, alt }) {
  const { t } = useLanguage();
  const [quality, setQuality] = useState('hqdefault');
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setQuality('hqdefault');
    setFailed(false);
  }, [videoId]);

  const handleError = () => {
    if (quality === 'hqdefault') {
      setQuality('mqdefault');
    } else {
      setFailed(true);
    }
  };

  if (!videoId || failed) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-gray-900 text-gray-400 p-4 text-center">
        <Youtube className="w-8 h-8 text-red-500 mb-1" />
        <span className="text-xs font-semibold">{t('유튜브에서 영상 보기')}</span>
      </div>
    );
  }

  return (
    <img
      src={`https://img.youtube.com/vi/${videoId}/${quality}.jpg`}
      alt={alt}
      onError={handleError}
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      loading="lazy"
    />
  );
}

export default function YouTubeMediaSection({ youtubeData, onScrollNext, onPlayVideo }) {
  const { t } = useLanguage();
  const { isEditMode, siteDraft, updateSiteDraft, updateSiteField } = useAdminEdit();

  const [selectedVideo, setSelectedVideo] = useState(null);

  // Modal for editing or adding YouTube video link
  const [modalMode, setModalMode] = useState(null); // null | 'edit' | 'add'
  const [activeEditingIndex, setActiveEditingIndex] = useState(null);
  const [inputUrl, setInputUrl] = useState('');
  const [inputTitle, setInputTitle] = useState('');
  const [inputSubtitle, setInputSubtitle] = useState('');
  const [inputCategory, setInputCategory] = useState('공식 채널 영상');

  // Channel URL editing state
  const [isEditingChannel, setIsEditingChannel] = useState(false);
  const [channelUrlInput, setChannelUrlInput] = useState('');

  const defaultVideos = [
    {
      id: 'ZDZFUpS0fFE',
      videoId: 'ZDZFUpS0fFE',
      videoUrl: 'https://www.youtube.com/watch?v=ZDZFUpS0fFE',
      title: '240203 한국외식창업교육원 정기총회',
      subtitle: '한국외식창업교육원 2023년 결산 및 2024년 사업 계획에 대한 정기 총회 전체 영상',
      channel: '한국외식창업교육원 공식 채널',
      categoryBadge: '공식 채널 영상',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    },
    {
      id: 'E_WgebIP_SY',
      videoId: 'E_WgebIP_SY',
      videoUrl: 'https://www.youtube.com/watch?v=E_WgebIP_SY',
      title: '안형상 한국외식창업교육원 이사장, 정기총회서 "100세 초고령 시대 교육을 통한 글로벌 K-FOOD 시대 열어야..." 강조',
      subtitle: '아시아창의방송(actv) 정기총회 현장 취재 및 안형상 이사장 특별 언론 보도 영상',
      channel: '아시아창의방송 (actv) 언론 보도',
      categoryBadge: '언론 보도 영상',
      badgeColor: 'bg-red-500/20 text-red-300 border-red-500/30',
    },
  ];

  // Resolve active YouTube data: prefer live draft in edit mode
  const activeYoutube = (isEditMode && siteDraft?.youtube)
    ? siteDraft.youtube
    : (youtubeData || siteDraft?.youtube || {});

  const title = activeYoutube?.title || '한국외식창업교육원 미디어';
  const subtitle = activeYoutube?.subtitle || '사단법인 한국외식창업교육원의 주요 정기총회 현장 및 아시아창의방송 언론 보도 영상입니다.';
  const channelUrl = activeYoutube?.channelUrl || 'https://www.youtube.com/@%ED%95%9C%EA%B5%AD%EC%99%B8%EC%8B%9D%EC%B0%BD%EC%97%85%EA%B5%90%EC%9C%A1%EC%9C%88';
  const rawVideos = activeYoutube?.videos && activeYoutube.videos.length > 0 ? activeYoutube.videos : defaultVideos;

  const videos = rawVideos.map((v) => {
    const extracted = extractYoutubeId(v.videoUrl || v.videoId || v.id);
    return {
      id: extracted,
      videoId: extracted,
      videoUrl: v.videoUrl || `https://www.youtube.com/watch?v=${extracted}`,
      title: v.title,
      subtitle: v.subtitle || '사단법인 한국외식창업교육원 영상',
      channel: v.channel || '한국외식창업교육원 공식 채널',
      categoryBadge: v.categoryBadge || v.category || '공식 영상',
      badgeColor: v.badgeColor || 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    };
  });

  // Open Edit Modal for a specific video card
  const handleOpenEditModal = (e, index) => {
    e.stopPropagation();
    const vid = rawVideos[index];
    setActiveEditingIndex(index);
    const existingUrl = vid.videoUrl || (vid.videoId ? `https://www.youtube.com/watch?v=${vid.videoId}` : vid.id ? `https://www.youtube.com/watch?v=${vid.id}` : '');
    setInputUrl(existingUrl);
    setInputTitle(vid.title || '');
    setInputSubtitle(vid.subtitle || '');
    setInputCategory(vid.categoryBadge || '공식 채널 영상');
    setModalMode('edit');
  };

  // Open Add Modal
  const handleOpenAddModal = (e) => {
    e?.stopPropagation?.();
    setActiveEditingIndex(null);
    setInputUrl('');
    setInputTitle('');
    setInputSubtitle('사단법인 한국외식창업교육원 영상');
    setInputCategory('공식 채널 영상');
    setModalMode('add');
  };

  // Listen for actions from SectorBlock context menu
  useEffect(() => {
    const handleAction = (e) => {
      if (e.detail?.action === 'edit_youtube') {
        handleOpenEditModal({ stopPropagation: () => {} }, 0);
      } else if (e.detail?.action === 'add_youtube') {
        handleOpenAddModal({ stopPropagation: () => {} });
      }
    };
    window.addEventListener('kfssec:action', handleAction);
    return () => window.removeEventListener('kfssec:action', handleAction);
  }, [rawVideos]);

  // Save changes from the modal
  const handleSaveModal = (e) => {
    e.preventDefault();
    const extractedId = extractYoutubeId(inputUrl);
    if (!extractedId) {
      alert('유효한 유튜브 동영상 주소 또는 영상 ID를 입력해주세요.');
      return;
    }

    const cleanTitle = inputTitle.trim() || '한국외식창업교육원 영상';
    const cleanSubtitle = inputSubtitle.trim() || '사단법인 한국외식창업교육원 영상';
    const cleanUrl = inputUrl.trim().startsWith('http')
      ? inputUrl.trim()
      : `https://www.youtube.com/watch?v=${extractedId}`;

    const updatedVideo = {
      id: extractedId,
      videoId: extractedId,
      videoUrl: cleanUrl,
      thumbnail: `https://img.youtube.com/vi/${extractedId}/hqdefault.jpg`,
      title: cleanTitle,
      subtitle: cleanSubtitle,
      channel: '한국외식창업교육원 공식 채널',
      categoryBadge: inputCategory,
      badgeColor: inputCategory.includes('언론')
        ? 'bg-red-500/20 text-red-300 border-red-500/30'
        : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    };

    let nextVideos;
    if (modalMode === 'edit' && activeEditingIndex !== null) {
      nextVideos = [...rawVideos];
      nextVideos[activeEditingIndex] = {
        ...nextVideos[activeEditingIndex],
        ...updatedVideo,
      };
    } else {
      nextVideos = [...rawVideos, updatedVideo];
    }

    updateSiteDraft((prev) => ({
      ...prev,
      youtube: {
        ...(prev.youtube || {}),
        title,
        subtitle,
        channelUrl,
        videos: nextVideos,
      },
    }));

    setModalMode(null);
  };

  // Delete a video
  const handleDeleteVideo = (e, index) => {
    e.stopPropagation();
    if (rawVideos.length <= 1) {
      alert('최소 1개 이상의 유튜브 영상이 유지되어야 합니다.');
      return;
    }
    if (window.confirm('이 유튜브 영상을 목록에서 삭제하시겠습니까?')) {
      const nextVideos = rawVideos.filter((_, idx) => idx !== index);
      updateSiteDraft((prev) => ({
        ...prev,
        youtube: {
          ...(prev.youtube || {}),
          title,
          subtitle,
          channelUrl,
          videos: nextVideos,
        },
      }));
    }
  };

  // Update inline text field directly on card
  const handleInlineFieldChange = (index, field, value) => {
    const nextVideos = [...rawVideos];
    nextVideos[index] = {
      ...nextVideos[index],
      [field]: value,
    };
    updateSiteDraft((prev) => ({
      ...prev,
      youtube: {
        ...(prev.youtube || {}),
        title,
        subtitle,
        channelUrl,
        videos: nextVideos,
      },
    }));
  };

  // Save Channel URL
  const handleSaveChannelUrl = (e) => {
    e.preventDefault();
    if (channelUrlInput.trim()) {
      updateSiteField('youtube.channelUrl', channelUrlInput.trim());
    }
    setIsEditingChannel(false);
  };

  // Click card handler: in edit mode, opens edit modal or video preview
  const handleCardClick = (video, index) => {
    if (isEditMode) {
      handleOpenEditModal({ stopPropagation: () => {} }, index);
      return;
    }
    if (onPlayVideo) {
      onPlayVideo(video.videoUrl || `https://www.youtube.com/watch?v=${video.id}`);
    } else {
      setSelectedVideo(video);
    }
  };

  const handleKeyPress = (e, video, index) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCardClick(video, index);
    }
  };

  // Live modal extraction preview
  const modalExtractedId = extractYoutubeId(inputUrl);
  const isModalUrlValid = isValidYoutubeId(modalExtractedId);

  return (
    <section className="relative py-12 lg:py-16 bg-[#0A1410] text-white min-h-full flex flex-col justify-center border-b border-emerald-950">
      <div className="w-full px-4 sm:px-8 lg:px-12 space-y-8 max-w-[1520px] mx-auto">

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-600/20 border border-red-500/30 text-red-400 text-xs font-bold mb-3">
              <Youtube className="w-4 h-4 fill-current shrink-0" />
              <span>YOUTUBE OFFICIAL</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              <EditableText
                path="youtube.title"
                value={title}
              />
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100/90 font-semibold mt-1">
              <EditableText
                path="youtube.subtitle"
                multiline
                value={subtitle}
              />
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={channelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-5 py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg transition-all shrink-0 whitespace-nowrap self-start sm:self-auto cursor-pointer min-h-[44px] focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:outline-none"
              aria-label={t("한국외식창업교육원 공식 유튜브 채널 새 창에서 이동")}
            >
              <Youtube className="w-4 h-4 fill-current shrink-0" />
              <span>{t("공식 유튜브 채널")}</span>
              <ExternalLink className="w-4 h-4 shrink-0 stroke-[2.2]" />
            </a>

            {/* In Edit Mode: allow modifying YouTube channel URL */}
            {isEditMode && (
              <button
                type="button"
                onClick={() => {
                  setChannelUrlInput(channelUrl);
                  setIsEditingChannel(true);
                }}
                className="px-3 py-3 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-300 rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer transition"
                title="공식 채널 URL 링크 변경"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">채널 링크</span>
              </button>
            )}
          </div>
        </div>

        {/* Channel URL Edit Inline Form */}
        {isEditMode && isEditingChannel && (
          <form
            onSubmit={handleSaveChannelUrl}
            className="p-4 bg-amber-950/40 border border-amber-500/40 rounded-2xl flex flex-col sm:flex-row items-center gap-3 animate-fadeIn"
          >
            <span className="text-xs font-bold text-amber-300 whitespace-nowrap">공식 유튜브 채널 URL:</span>
            <input
              type="text"
              value={channelUrlInput}
              onChange={(e) => setChannelUrlInput(e.target.value)}
              placeholder="https://www.youtube.com/@채널명"
              className="flex-1 bg-black/60 border border-amber-500/50 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-amber-400 w-full"
            />
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                type="submit"
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black text-xs font-extrabold rounded-xl cursor-pointer"
              >
                반영
              </button>
              <button
                type="button"
                onClick={() => setIsEditingChannel(false)}
                className="px-3 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs font-bold rounded-xl cursor-pointer"
              >
                취소
              </button>
            </div>
          </form>
        )}

        {/* 2-Column Responsive YouTube Video Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {videos.map((video, index) => (
            <article
              key={`${video.id}-${index}`}
              onClick={() => handleCardClick(video, index)}
              onKeyDown={(e) => handleKeyPress(e, video, index)}
              onContextMenu={(e) => {
                if (isEditMode) {
                  e.preventDefault();
                  e.stopPropagation();
                  handleOpenEditModal(e, index);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`${t("유튜브에서 영상 보기")}: ${t(video.title)}`}
              className={`bg-[#111C16] rounded-3xl border overflow-hidden shadow-lg transition-all duration-300 flex flex-col justify-between group cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none relative ${
                isEditMode
                  ? 'border-amber-500/50 hover:border-amber-400 hover:shadow-amber-500/10'
                  : 'border-emerald-500/20 hover:border-emerald-400/50 hover:shadow-2xl'
              }`}
            >
              {/* EDIT MODE CONTROLS OVERLAY ON CARD */}
              {isEditMode && (
                <div className="absolute top-3 right-3 z-30 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => handleOpenEditModal(e, index)}
                    className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs rounded-xl shadow-2xl flex items-center gap-1.5 transition transform hover:scale-105 cursor-pointer backdrop-blur-md"
                    title="유튜브 영상 링크 변경하기"
                  >
                    <Edit3 className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>영상 링크 변경</span>
                  </button>

                  {videos.length > 1 && (
                    <button
                      type="button"
                      onClick={(e) => handleDeleteVideo(e, index)}
                      className="p-1.5 bg-red-600/90 hover:bg-red-500 text-white rounded-xl shadow-xl transition cursor-pointer"
                      title="이 영상 삭제"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              )}

              {/* YouTube Thumbnail Box with Large Red Play Button */}
              <div className="relative aspect-video w-full bg-[#0A1410] overflow-hidden">
                <YouTubeCardImage
                  key={video.id}
                  videoId={video.id}
                  alt={t(video.title)}
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />

                {/* Prominent YouTube Red Play Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-12 rounded-2xl bg-red-600 group-hover:bg-red-500 text-white flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform">
                    <Play className="w-7 h-7 fill-current ml-1" />
                  </div>
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-bold text-white drop-shadow-md">
                  <span className="px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md text-emerald-300 border border-white/20">
                    {t('HD 동영상 시청하기')}
                  </span>
                  {isEditMode && (
                    <span className="px-2 py-0.5 rounded-md bg-amber-500/90 text-black text-[10px] font-black">
                      클릭하여 링크/정보 수정
                    </span>
                  )}
                </div>
              </div>

              {/* Video Info Details */}
              <div className="p-5 sm:p-6 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2.5 py-0.5 rounded-full border text-[11px] font-bold ${video.badgeColor}`}>
                      {t(video.categoryBadge)}
                    </span>
                    <span className="text-xs font-bold text-gray-300">
                      {t(video.channel)}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-black text-white group-hover:text-emerald-300 transition-colors leading-snug line-clamp-2">
                    {isEditMode ? (
                      <EditableText
                        value={video.title}
                        onChange={(newVal) => handleInlineFieldChange(index, 'title', newVal)}
                      />
                    ) : (
                      t(video.title)
                    )}
                  </h3>

                  <div className="text-xs sm:text-sm text-gray-300 font-medium line-clamp-2 mt-1">
                    {isEditMode ? (
                      <EditableText
                        multiline
                        value={video.subtitle}
                        onChange={(newVal) => handleInlineFieldChange(index, 'subtitle', newVal)}
                      />
                    ) : (
                      t(video.subtitle)
                    )}
                  </div>
                </div>

                {isEditMode && (
                  <div className="pt-3 border-t border-emerald-950/60 flex items-center justify-between text-[11px] text-gray-400 font-mono">
                    <span className="truncate max-w-[260px] text-emerald-400">
                      {video.videoUrl}
                    </span>
                    <span className="text-amber-400 font-sans font-bold">
                      ID: {video.id}
                    </span>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* In Edit Mode: Button to Add New Video Card */}
        {isEditMode && (
          <div className="pt-2">
            <button
              type="button"
              onClick={handleOpenAddModal}
              className="w-full py-4 border-2 border-dashed border-emerald-500/40 hover:border-emerald-400 bg-emerald-950/20 hover:bg-emerald-950/50 rounded-3xl text-emerald-300 font-bold text-sm flex items-center justify-center gap-2 transition duration-200 cursor-pointer shadow-inner"
            >
              <Plus className="w-5 h-5" />
              <span>새 유튜브 영상 추가 등록 (+ 링크 바로 연결)</span>
            </button>
          </div>
        )}

      </div>

      {/* YOUTUBE VIDEO LINK & INFO EDIT MODAL */}
      {modalMode && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fadeIn"
          onClick={() => setModalMode(null)}
        >
          <div
            className="relative w-full max-w-xl bg-gray-900 border border-emerald-500/40 rounded-3xl shadow-2xl p-6 sm:p-7 space-y-5 text-white max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Title */}
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-red-600 flex items-center justify-center text-white shrink-0">
                  <Youtube className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-white">
                    {modalMode === 'edit' ? '🎥 유튜브 영상 링크 변경' : '🎥 새 유튜브 영상 추가'}
                  </h3>
                  <p className="text-xs text-gray-400">
                    유튜브 주소를 붙여넣으면 썸네일과 영상이 즉시 자동 반영됩니다.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setModalMode(null)}
                className="w-8 h-8 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white flex items-center justify-center cursor-pointer transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-4">
              {/* YouTube URL Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-black text-emerald-300 flex items-center justify-between">
                  <span>유튜브 주소 (URL 또는 공유 링크) *</span>
                  {isModalUrlValid ? (
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      ID: {modalExtractedId} 감지됨
                    </span>
                  ) : inputUrl ? (
                    <span className="text-amber-400 font-bold flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      유효한 링크 확인 중...
                    </span>
                  ) : null}
                </label>
                <input
                  type="text"
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  placeholder="예: https://www.youtube.com/watch?v=ZDZFUpS0fFE 또는 https://youtu.be/..."
                  className="w-full bg-black/60 border border-emerald-500/40 rounded-xl px-4 py-3 text-xs sm:text-sm text-white font-mono focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
                  autoFocus
                  required
                />
              </div>

              {/* Real-Time Live Thumbnail Preview Box */}
              <div className="space-y-1.5">
                <label className="text-xs font-black text-gray-400">실시간 썸네일 미리보기</label>
                {isModalUrlValid ? (
                  <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-emerald-500/50 bg-black shadow-lg">
                    <img
                      src={`https://img.youtube.com/vi/${modalExtractedId}/hqdefault.jpg`}
                      alt="유튜브 썸네일 미리보기"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-12 h-9 rounded-xl bg-red-600/90 text-white flex items-center justify-center shadow-xl">
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md text-[11px] font-bold text-emerald-300 border border-emerald-500/30">
                      ✓ 영상 변경 시 이 화면으로 자동 노출됩니다
                    </div>
                  </div>
                ) : (
                  <div className="aspect-video w-full rounded-2xl border-2 border-dashed border-gray-800 bg-black/40 flex flex-col items-center justify-center p-4 text-center text-gray-500 text-xs">
                    <Youtube className="w-10 h-10 text-gray-700 mb-2" />
                    <p className="font-semibold text-gray-400">유튜브 영상 주소를 입력하면 썸네일이 실시간으로 나타납니다.</p>
                    <p className="text-[11px] text-gray-600 mt-1">일반 영상, 쇼츠(Shorts), 라이브 방송 링크 모두 지원</p>
                  </div>
                )}
              </div>

              {/* Video Title Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-black text-gray-300">영상 제목 *</label>
                <input
                  type="text"
                  value={inputTitle}
                  onChange={(e) => setInputTitle(e.target.value)}
                  placeholder="예: 2026 한국외식창업교육원 정기총회 현장 스케치"
                  className="w-full bg-black/60 border border-gray-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-400"
                  required
                />
              </div>

              {/* Category Badge & Subtitle */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="space-y-1.5">
                  <label className="font-black text-gray-300">카테고리 뱃지</label>
                  <select
                    value={inputCategory}
                    onChange={(e) => setInputCategory(e.target.value)}
                    className="w-full bg-black/60 border border-gray-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-400 cursor-pointer"
                  >
                    <option value="공식 채널 영상">공식 채널 영상</option>
                    <option value="언론 보도 영상">언론 보도 영상</option>
                    <option value="특강 및 세미나">특강 및 세미나</option>
                    <option value="수강생 현장 스케치">수강생 현장 스케치</option>
                    <option value="외식 트렌드 뉴스">외식 트렌드 뉴스</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-black text-gray-300">영상 부제목/간략 설명</label>
                  <input
                    type="text"
                    value={inputSubtitle}
                    onChange={(e) => setInputSubtitle(e.target.value)}
                    placeholder="사단법인 한국외식창업교육원 영상"
                    className="w-full bg-black/60 border border-gray-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>

              {/* Modal Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-800">
                <button
                  type="button"
                  onClick={() => setModalMode(null)}
                  className="px-5 py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs font-bold rounded-xl cursor-pointer transition"
                >
                  취소
                </button>
                <button
                  type="submit"
                  disabled={!isModalUrlValid}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed text-white text-xs font-black rounded-xl shadow-lg flex items-center gap-1.5 cursor-pointer transition"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{modalMode === 'edit' ? '영상 변경 즉시 반영' : '영상 목록에 추가'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Interactive YouTube Video Modal (Visitor Modal) */}
      {selectedVideo && (
        <YouTubeModal
          videoId={selectedVideo.id}
          videoTitle={selectedVideo.title}
          isOpen={Boolean(selectedVideo)}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </section>
  );
}
