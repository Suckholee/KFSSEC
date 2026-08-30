import React, { useState } from 'react';
import { Youtube, Play, ExternalLink, ChevronDown } from 'lucide-react';
import YouTubeModal from './YouTubeModal';

export default function YouTubeMediaSection({ youtubeData, onScrollNext }) {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const defaultVideos = [
    {
      id: 'ZDZFUpS0fFE',
      title: '240203 한국외식창업교육원 정기총회',
      subtitle: '한국외식창업교육원 2023년 결산 및 2024년 사업 계획에 대한 정기 총회 전체 영상',
      channel: '한국외식창업교육원 공식 채널',
      categoryBadge: '공식 채널 영상',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      thumbnail: '/images/yt_thumb_1.jpg',
    },
    {
      id: 'E_WgebIP_SY',
      title: '안형상 한국외식창업교육원 이사장, 정기총회서 "100세 초고령 시대 교육을 통한 글로벌 K-FOOD 시대 열어야..." 강조',
      subtitle: '아시아창의방송(actv) 정기총회 현장 취재 및 안형상 이사장 특별 언론 보도 영상',
      channel: '아시아창의방송 (actv) 언론 보도',
      categoryBadge: '언론 보도 영상',
      badgeColor: 'bg-red-500/20 text-red-300 border-red-500/30',
      thumbnail: '/images/yt_thumb_2.jpg',
    },
  ];

  const title = youtubeData?.title || '한국외식창업교육원 미디어';
  const subtitle = youtubeData?.subtitle || '사단법인 한국외식창업교육원의 주요 정기총회 현장 및 아시아창의방송 언론 보도 영상입니다.';
  const channelUrl = youtubeData?.channelUrl || 'https://www.youtube.com/@%ED%95%9C%EA%B5%AD%EC%99%B8%EC%8B%9D%EC%B0%BD%EC%97%85%EA%B5%90%EC%9C%A1%EC%9C%88';
  const rawVideos = youtubeData?.videos && youtubeData.videos.length > 0 ? youtubeData.videos : defaultVideos;

  const videos = rawVideos.map((v, idx) => ({
    id: v.videoId || v.id,
    title: v.title,
    subtitle: v.subtitle || '사단법인 한국외식창업교육원 영상',
    channel: v.channel || '한국외식창업교육원 공식 채널',
    categoryBadge: v.categoryBadge || v.category || '공식 영상',
    badgeColor: v.badgeColor || 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    thumbnail: v.thumbnail || (idx === 0 ? '/images/yt_thumb_1.jpg' : '/images/yt_thumb_2.jpg'),
  }));

  const handleKeyPress = (e, video) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setSelectedVideo(video);
    }
  };

  return (
    <section className="relative py-12 lg:py-16 bg-[#0A1410] text-white min-h-full flex flex-col justify-center border-b border-emerald-950">
      <div className="w-full px-4 sm:px-8 lg:px-12 space-y-8 max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-600/20 border border-red-500/30 text-red-400 text-xs font-bold mb-3">
              <Youtube className="w-4 h-4 fill-current shrink-0" />
              <span>YOUTUBE OFFICIAL</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {title}
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100/70 font-semibold mt-1">
              {subtitle}
            </p>
          </div>
          
          <a
            href={channelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-5 py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg transition-all shrink-0 whitespace-nowrap self-start sm:self-auto cursor-pointer min-h-[44px] focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:outline-none"
            aria-label="한국외식창업교육원 공식 유튜브 채널 새 창에서 이동"
          >
            <Youtube className="w-4 h-4 fill-current shrink-0" />
            <span>공식 유튜브 채널</span>
            <ExternalLink className="w-4 h-4 shrink-0 stroke-[2.2]" />
          </a>
        </div>

        {/* 2-Column Responsive YouTube Video Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {videos.map((video) => (
            <article
              key={video.id}
              onClick={() => setSelectedVideo(video)}
              onKeyDown={(e) => handleKeyPress(e, video)}
              tabIndex={0}
              role="button"
              aria-label={`유튜브 영상 재생: ${video.title}`}
              className="bg-[#111C16] rounded-3xl border border-emerald-500/20 overflow-hidden shadow-lg hover:shadow-2xl hover:border-emerald-400/50 transition-all duration-300 flex flex-col justify-between group cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none"
            >
              {/* YouTube Thumbnail Box with Large Red Play Button */}
              <div className="relative aspect-video w-full bg-black overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/images/yt_thumb_1.jpg';
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 brightness-95"
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
                    HD 동영상 시청하기
                  </span>
                </div>
              </div>

              {/* Video Info Details */}
              <div className="p-5 sm:p-6 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2.5 py-0.5 rounded-full border text-[11px] font-bold ${video.badgeColor}`}>
                      {video.categoryBadge}
                    </span>
                    <span className="text-xs font-bold text-gray-300">
                      {video.channel}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-white group-hover:text-emerald-300 transition-colors leading-snug line-clamp-2">
                    {video.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-300 font-medium line-clamp-2 mt-1">
                    {video.subtitle}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>

      {/* Interactive YouTube Video Modal */}
      {selectedVideo && (
        <YouTubeModal
          videoId={selectedVideo.id}
          title={selectedVideo.title}
          isOpen={Boolean(selectedVideo)}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </section>
  );
}
