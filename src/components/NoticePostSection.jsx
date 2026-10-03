import React, { useState, useEffect } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import {
  Bell,
  Calendar,
  User,
  ChevronRight,
  ChevronLeft,
  Pause,
  Play,
  ArrowUpRight,
  Sparkles,
  Pin,
  X,
  Eye,
  FileText,
  Megaphone,
} from 'lucide-react';
import { cleanMarkdownSnippet, renderRichContent } from './common/RichContentRenderer';

export default function NoticePostSection({
  onScrollNext,
  postsList = [],
  onViewAll,
  onSelectPost,
}) {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('all');
  const [direction, setDirection] = useState('left'); // 'left' is default (flows right-to-left: 오른쪽에서 왼쪽으로 흐름)
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);

  // Close modal on Escape key
  useEffect(() => {
    if (!selectedPost) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedPost(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPost]);

  const categories = [
    { id: 'all', label: '전체 소식' },
    { id: 'notice', label: '공지사항' },
    { id: 'press', label: '언론보도 & 정책' },
    { id: 'mou', label: '산학협력 & MOU' },
    { id: 'competition', label: '요리대회 & 행사' },
  ];

  // Base list of announcements and posts: include all official notices, press news, and MOU partnerships!
  const rawPosts = postsList.filter((post) => Boolean(post.title));

  const filteredPosts = rawPosts.filter((item) => {
    if (activeCategory === 'notice') {
      return item.categoryType === 'notice' || (item.category && item.category.includes('공지'));
    }
    if (activeCategory === 'press') {
      const text = `${item.title} ${item.content || ''} ${(item.tags || []).join(' ')}`;
      return (
        text.includes('언론') ||
        text.includes('보도') ||
        text.includes('농안법') ||
        text.includes('국회') ||
        text.includes('기사')
      );
    }
    if (activeCategory === 'mou') {
      return (
        item.galleryCategory === 'partners' ||
        item.category === 'MOU' ||
        item.title.includes('MOU') ||
        item.title.includes('협약') ||
        (item.tags && item.tags.includes('MOU'))
      );
    }
    if (activeCategory === 'competition') {
      return (
        item.categoryType === 'competition' ||
        (item.category && item.category.includes('대회')) ||
        item.title.includes('대회')
      );
    }
    return true;
  });

  // Duplicate list for seamless infinite marquee loop
  const marqueeList =
    filteredPosts.length > 0
      ? filteredPosts.length < 5
        ? [...filteredPosts, ...filteredPosts, ...filteredPosts, ...filteredPosts]
        : [...filteredPosts, ...filteredPosts]
      : [];

  // Smooth marquee speed (approx 4.2s per card)
  const marqueeDuration = Math.max(35, filteredPosts.length * 4.2);

  const handleCardClick = (post) => {
    setSelectedPost(post);
    onSelectPost?.(post);
  };

  const handleGoToBoard = () => {
    setSelectedPost(null);
    onViewAll?.();
  };

  return (
    <section
      id="notice-section"
      className="relative py-14 lg:py-20 bg-gradient-to-b from-white via-[#F8FAF9] to-[#F1F8F4] text-gray-900 font-sans border-b-2 border-[#DCEEE3] overflow-hidden shadow-inner"
    >
      {/* Background Decorative Ambient Gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#DCFCE7]/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full px-4 sm:px-8 lg:px-12 max-w-[1600px] mx-auto space-y-7">
        
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-stone-200">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-[#14532D] to-[#15803D] text-white text-xs font-black shadow-xs border border-[#4ADE80]/30">
                <Bell className="w-3.5 h-3.5 text-amber-300 animate-bounce" />
                <span>{t('공지사항 & 소식', 'Notices & Announcements')}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white text-stone-700 text-xs font-bold border border-stone-200 shadow-2xs">
                <span>사단법인 한국외식창업교육원</span>
              </span>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 tracking-tight flex items-center gap-2.5">
                <Megaphone className="w-7 h-7 sm:w-8 sm:h-8 text-[#15803D]" />
                <span>{t('교육원 주요 소식', 'Official Institute Notices')}</span>
              </h2>
              <p className="text-sm sm:text-base text-stone-600 mt-1 font-medium">
                {t(
                  '사단법인 한국외식창업교육원의 공식 행사, 정책 세미나, 입학 안내 및 최신 공지사항을 전해드립니다.',
                  'Stay updated with official events, policy seminars, admissions, and latest announcements from KFSSEC.'
                )}
              </p>
            </div>
          </div>

          {/* Right Navigation & Flow Controls */}
          <div className="flex flex-wrap items-center gap-2.5 self-start md:self-end shrink-0">
            {/* Flow Controls (Default to Leftward motion: 오른쪽에서 왼쪽으로 흐름) */}
            <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-full border border-stone-200 shadow-2xs">
              <button
                type="button"
                onClick={() => {
                  setDirection('left');
                  setIsPlaying(true);
                }}
                aria-label="오른쪽에서 왼쪽으로 흐르기 (기본)"
                title="오른쪽에서 왼쪽으로 계속 흐르기 (기본)"
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                  direction === 'left' && isPlaying
                    ? 'bg-[#15803D] text-white shadow-xs'
                    : 'bg-white hover:bg-stone-200 text-stone-700'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setIsPlaying((prev) => !prev)}
                aria-label={isPlaying ? '흐름 일시정지' : '자동 흐름 재생'}
                title={isPlaying ? '마우스 오버 시에도 정지됩니다 (클릭하여 일시정지)' : '자동 애니메이션 재생'}
                className={`px-3 h-8 rounded-full flex items-center gap-1.5 text-xs font-bold transition-all cursor-pointer ${
                  !isPlaying
                    ? 'bg-amber-500 text-stone-950 font-black shadow-xs'
                    : 'bg-white hover:bg-stone-200 text-stone-700'
                }`}
              >
                {isPlaying ? (
                  <Pause className="w-3.5 h-3.5 text-stone-700" />
                ) : (
                  <Play className="w-3.5 h-3.5 fill-current" />
                )}
                <span>{isPlaying ? '일시정지' : '자동재생'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setDirection('right');
                  setIsPlaying(true);
                }}
                aria-label="왼쪽에서 오른쪽으로 흐르기"
                title="왼쪽에서 오른쪽 방향으로 흐르기"
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                  direction === 'right' && isPlaying
                    ? 'bg-[#15803D] text-white shadow-xs'
                    : 'bg-white hover:bg-stone-200 text-stone-700'
                }`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* View Full Notices Link Button */}
            <button
              type="button"
              onClick={handleGoToBoard}
              className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-full bg-gradient-to-r from-[#EA580C] to-[#F97316] hover:from-[#C2410C] hover:to-[#EA580C] text-white border border-orange-300 font-black text-xs sm:text-sm shadow-md transition-all duration-200 group cursor-pointer"
              title="교육원 전체 게시판 공지사항 보기"
            >
              <span>{t('전체 공지사항 보기', 'View All Notices')}</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-white" />
            </button>
          </div>
        </div>

        {/* Category Filter Pills & Live Update Status */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 overflow-x-auto pb-1 scrollbar-none">
          <div className="flex items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap focus-visible:ring-2 focus-visible:ring-[#15803D] focus-visible:outline-none ${
                  activeCategory === cat.id
                    ? 'bg-gradient-to-r from-[#14532D] to-[#15803D] text-white shadow-sm font-black border border-[#4ADE80]/30'
                    : 'bg-white text-stone-600 border border-stone-200 hover:border-stone-400 hover:text-stone-900'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2.5 text-xs font-medium text-stone-500 shrink-0">
            <span className="inline-flex items-center gap-1.5 bg-[#EAF6EE] text-[#1E5D3B] px-3 py-1 rounded-full border border-[#BEDECB] font-bold text-[11px] shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>실시간 주요 공지 연동</span>
            </span>
            <span className="hidden lg:inline-block text-stone-400">
              총 {filteredPosts.length}건 수록 · 마우스 오버 시 정지
            </span>
          </div>
        </div>

        {/* Gallery Continuous Flowing Track (Marquee) */}
        <div className="relative w-full overflow-hidden group py-2">
          {/* Left & Right Shadow Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-l from-[#F1F8F4] via-[#F1F8F4]/80 to-transparent z-10 pointer-events-none" />

          {/* Marquee Row */}
          <div
            className={`flex items-stretch gap-5 sm:gap-6 w-max ${
              direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'
            } hover:[animation-play-state:paused]`}
            style={{
              animationDuration: `${marqueeDuration}s`,
              animationPlayState: isPlaying ? undefined : 'paused',
            }}
          >
            {marqueeList.map((post, idx) => {
              const realIdx = idx % (filteredPosts.length || 1);
              const isPinned = Boolean(post.isPinned);
              const imageUrl =
                post.coverImage ||
                post.image ||
                (post.images && post.images[0]) ||
                '/images/hero_bg.jpg';
              const cleanSummary = cleanMarkdownSnippet(post.content || post.subtitle || '');

              return (
                <div
                  key={`${post.id}-${idx}`}
                  onClick={() => handleCardClick(post)}
                  className="shrink-0 w-[290px] sm:w-[340px] lg:w-[370px] group/card bg-white rounded-3xl border border-stone-200/90 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:border-[#16A34A] flex flex-col overflow-hidden select-none cursor-pointer"
                  title={`${post.title} (클릭하여 내용 보기)`}
                >
                  {/* Image Canvas */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                    <img
                      src={imageUrl}
                      alt={post.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover/card:scale-108 transition-transform duration-700 ease-out"
                      onError={(e) => {
                        e.currentTarget.src = '/images/hero_bg.jpg';
                      }}
                    />

                    {/* Dark Gradient Overlay for Gallery Effect */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-65 group-hover/card:opacity-45 transition-opacity" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span className="px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-md text-white text-[11px] font-bold border border-white/20">
                        소식 #{realIdx + 1}
                      </span>
                      {isPinned && (
                        <span className="px-2 py-0.5 rounded-lg bg-gradient-to-r from-[#EA580C] to-[#F97316] text-white text-[10px] font-black shadow-xs flex items-center gap-1">
                          <Pin className="w-2.5 h-2.5" />
                          <span>중요 공지</span>
                        </span>
                      )}
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                      <span className="px-2 py-0.5 rounded-md bg-white/20 backdrop-blur-md text-emerald-200 font-bold border border-white/20 text-[11px]">
                        {post.category || (post.galleryCategory === 'partners' ? '업무협약(MOU)' : '공지사항')}
                      </span>
                      {post.views && (
                        <span className="flex items-center gap-1 text-[11px] text-stone-300 font-medium">
                          <Eye className="w-3 h-3" />
                          <span>{post.views.toLocaleString()}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between bg-white space-y-3">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs text-stone-500 font-medium">
                        <span className="flex items-center gap-1.5 text-stone-600 font-semibold">
                          <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{post.date}</span>
                        </span>
                        <span className="text-[11px] text-stone-400 font-medium">
                          한국외식창업교육원
                        </span>
                      </div>

                      <h3 className="font-black text-stone-900 text-base sm:text-lg group-hover/card:text-[#16A34A] transition-colors leading-snug line-clamp-2">
                        {post.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-stone-500 font-medium leading-relaxed line-clamp-2">
                        {cleanSummary || '자세한 공지사항 및 세부 일정을 확인하시려면 클릭하세요.'}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                      <span className="text-stone-400 font-medium flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-stone-400" />
                        <span className="truncate max-w-[160px]">{post.author || '사무국'}</span>
                      </span>
                      <span className="font-bold text-[#15803D] group-hover/card:translate-x-1 transition-transform flex items-center gap-0.5">
                        <span>자세히 보기</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Post Detail Modal */}
      {selectedPost && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
          onClick={() => setSelectedPost(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[88vh] overflow-y-auto shadow-2xl border border-stone-200 relative flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Bar */}
            <div className="p-6 border-b border-stone-100 flex items-start justify-between gap-4 sticky top-0 bg-white/95 backdrop-blur-md z-10">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-[#14532D] text-xs font-black">
                    {selectedPost.category || '공지사항'}
                  </span>
                  <span className="text-xs text-stone-400 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{selectedPost.date}</span>
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-gray-900 leading-snug">
                  {selectedPost.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setSelectedPost(null)}
                className="w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center shrink-0 transition cursor-pointer"
                aria-label="닫기"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6 flex-1">
              {/* Optional Hero Cover Image */}
              {(selectedPost.coverImage || selectedPost.image) && (
                <div className="rounded-2xl overflow-hidden shadow-sm border border-stone-100 bg-stone-50 max-h-80">
                  <img
                    src={selectedPost.coverImage || selectedPost.image}
                    alt={selectedPost.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              )}

              {/* Rich Markdown / HTML Text */}
              <div className="prose prose-stone max-w-none text-sm sm:text-base leading-relaxed text-stone-700">
                {renderRichContent(selectedPost.content || selectedPost.subtitle || '')}
              </div>
            </div>

            {/* Modal Footer Bar */}
            <div className="p-5 border-t border-stone-100 bg-stone-50 flex items-center justify-between rounded-b-3xl">
              <span className="text-xs text-stone-400 flex items-center gap-1">
                <User className="w-3.5 h-3.5" />
                <span>{selectedPost.author || '사단법인 한국외식창업교육원'}</span>
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedPost(null)}
                  className="px-4 py-2 rounded-xl bg-white border border-stone-300 text-stone-700 text-xs font-bold hover:bg-stone-100 transition cursor-pointer"
                >
                  닫기 (ESC)
                </button>
                <button
                  type="button"
                  onClick={handleGoToBoard}
                  className="px-4 py-2 rounded-xl bg-[#15803D] hover:bg-[#14532D] text-white text-xs font-black shadow-sm transition flex items-center gap-1 cursor-pointer"
                >
                  <span>전체 게시판 보기</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
