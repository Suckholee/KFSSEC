import React, { useState, useEffect, useMemo } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { useAdminEdit } from '../../context/AdminEditContext';
import SectorBlock from '../Admin/InlineEditor/SectorBlock';
import { Search, Plus, Grid, List, ChevronRight, X } from 'lucide-react';
import NetflixCard from './NetflixCard';
import NetflixCategoryRow from './NetflixCategoryRow';
import GalleryDetailModal from './GalleryDetailModal';
import GalleryEditorModal from './GalleryEditorModal';
import { cleanMarkdownSnippet } from '../common/RichContentRenderer';
import { DEFAULT_POSTS } from '../../data/defaultPosts';

export default function GalleryPage({ initialSubTab = 'all', postsList = [] }) {
  const { t } = useLanguage();
  const { isEditMode, postsDraft, updatePostsDraft } = useAdminEdit();

  const [activeCategory, setActiveCategory] = useState(initialSubTab || 'all');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [viewMode, setViewMode] = useState('rows'); // 'rows' (rails) or 'grid'
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // Gallery Creation & Editing Modal State
  const [isEditorModalOpen, setIsEditorModalOpen] = useState(false);
  const [editingPostId, setEditingPostId] = useState(null);

  useEffect(() => {
    if (initialSubTab) {
      setActiveCategory(initialSubTab);
    }
  }, [initialSubTab]);

  const handleSelectCategory = (catId, mode = viewMode) => {
    setActiveCategory(catId);
    if (mode) setViewMode(mode);
    setSearchKeyword('');
    requestAnimationFrame(() => {
      const anchor = document.getElementById('gallery-content-anchor');
      if (anchor) {
        const headerOffset = 110;
        const elementPosition = anchor.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        if (window.pageYOffset > offsetPosition) {
          window.scrollTo({
            top: Math.max(0, offsetPosition),
            behavior: 'smooth',
          });
        }
      }
    });
  };

  const galleryCategories = useMemo(
    () => [
      { id: 'all', label: t('전체 갤러리'), shortLabel: t('전체') },
      { id: 'ceremony', label: t('대한민국 조리명장·명인 시상식 & 인증패'), shortLabel: t('시상식 & 인증패') },
      { id: 'competition', label: t('전국 청년 조리경연대회 & 요리대회'), shortLabel: t('요리대회') },
      { id: 'consulting', label: t('전국 지자체 외식 소상공인 컨설팅 현장'), shortLabel: t('지자체 컨설팅') },
      { id: 'training', label: t('국가공인 비법 조리 실습 현장'), shortLabel: t('조리 실습 현장') },
      { id: 'partners', label: t('국내외 산학협력 & 글로벌 MOU 협약'), shortLabel: t('산학협력 & MOU') },
    ],
    [t]
  );

  // Resolve current posts list and safely merge with default gallery posts so no category is ever empty
  const currentPosts = postsDraft && postsDraft.length > 0 ? postsDraft : postsList;

  const galleryItems = useMemo(() => {
    const rawList = currentPosts && currentPosts.length > 0 ? currentPosts : DEFAULT_POSTS;
    const activeGallery = rawList.filter((post) => post.categoryType === 'gallery');

    // Guarantee rich posts from DEFAULT_POSTS are present for all categories
    const defaultGallery = DEFAULT_POSTS.filter((post) => post.categoryType === 'gallery');
    const existingIds = new Set(activeGallery.map((p) => p.id));
    const mergedList = [...activeGallery];
    for (const defPost of defaultGallery) {
      if (!existingIds.has(defPost.id)) {
        mergedList.push(defPost);
      }
    }

    return mergedList.map((post) => {
      const postImages =
        Array.isArray(post.images) && post.images.length > 0
          ? post.images
          : post.image
          ? [post.image]
          : ['/images/hero_bg.jpg'];
      const coverImage = post.coverImage || post.image || postImages[0] || '/images/hero_bg.jpg';
      const categoryId = post.galleryCategory || 'training';
      const categoryMeta = galleryCategories.find((item) => item.id === categoryId);

      return {
        id: post.id,
        category: categoryId,
        categoryLabel: categoryMeta?.shortLabel || '조리 실습',
        title: post.title,
        date: post.date || '',
        location: post.location || '',
        image: coverImage,
        images: postImages,
        desc: post.content || '',
        isPinned: Boolean(post.isPinned),
        rawPost: post,
      };
    });
  }, [currentPosts, galleryCategories]);

  // Filtering by category and search keyword
  const filteredItems = useMemo(() => {
    return galleryItems.filter((item) => {
      const matchesCategory =
        activeCategory === 'all' || item.category === activeCategory;
      const cleanDesc = cleanMarkdownSnippet(item.desc).toLowerCase();
      const query = searchKeyword.toLowerCase();
      const matchesSearch =
        item.title.toLowerCase().includes(query) ||
        cleanDesc.includes(query) ||
        (item.location && item.location.toLowerCase().includes(query));
      return matchesCategory && matchesSearch;
    });
  }, [galleryItems, activeCategory, searchKeyword]);

  // Open Create Modal
  const handleOpenCreateModal = () => {
    setEditingPostId(null);
    setIsEditorModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEditModal = (e, item) => {
    e.stopPropagation();
    setEditingPostId(item.id);
    setIsEditorModalOpen(true);
  };

  // Delete Item
  const handleDeleteGallery = (e, item) => {
    e.stopPropagation();
    if (window.confirm(`"${item.title}" 갤러리 게시물을 삭제하시겠습니까?`)) {
      updatePostsDraft((prev) => prev.filter((p) => p.id !== item.id));
    }
  };

  // Save Post (Create / Update)
  const handleSavePost = (postData) => {
    if (editingPostId) {
      updatePostsDraft((prev) =>
        prev.map((p) => (p.id === editingPostId ? { ...p, ...postData } : p))
      );
    } else {
      const newPost = {
        id: 'gal_' + Date.now(),
        categoryType: 'gallery',
        ...postData,
        views: 0,
        author: 'KFSSEC 관리자',
        createdAt: new Date().toISOString(),
      };
      updatePostsDraft((prev) => [newPost, ...prev]);
    }
  };

  const editingItem = editingPostId
    ? galleryItems.find((item) => item.id === editingPostId)
    : null;

  const currentCategoryObj =
    galleryCategories.find((c) => c.id === activeCategory) || galleryCategories[0];

  return (
    <div className="bg-[#FAF9F5] min-h-screen text-stone-900 font-sans py-4 sm:py-6 selection:bg-[#15803D] selection:text-white">
      {/* 1. Authentic Netflix-style Subheader / Breadcrumb Bar (Bright Theme) */}
      <div className="px-4 sm:px-8 lg:px-12 py-3 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200/90 sticky top-20 sm:top-[88px] z-40 bg-white/95 backdrop-blur-md shadow-2xs">
        {/* Left: Fixed Section Title (Constant width, zero horizontal shift) */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 pr-3 border-r border-stone-200">
            <h1 className="text-lg sm:text-xl font-black text-stone-900 tracking-tight shrink-0 whitespace-nowrap">
              {t('현장 갤러리')}
            </h1>
          </div>

          {/* Fixed Position Category Filter Pills (Zero Horizontal Shift!) */}
          <div className="hidden lg:flex items-center gap-1.5">
            {galleryCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleSelectCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeCategory === cat.id
                    ? 'bg-[#15803D] text-white font-black shadow-xs ring-1 ring-[#15803D]'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100 bg-stone-50 border border-stone-200'
                }`}
              >
                {cat.shortLabel}
              </button>
            ))}
          </div>
        </div>

        {/* Right: Search + View Toggle (Grid / Rows) + Admin Create */}
        <div className="flex items-center gap-2.5 sm:gap-3 self-end md:self-auto">
          {/* Sleek Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="제목, 장소 검색..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="w-40 sm:w-56 pl-8 pr-7 py-1.5 bg-stone-50 border border-stone-300 hover:border-stone-400 focus:border-[#15803D] focus:bg-white rounded-lg text-xs text-stone-900 placeholder-stone-400 focus:outline-none transition shadow-2xs"
            />
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2.5" />
            {searchKeyword && (
              <button
                onClick={() => setSearchKeyword('')}
                className="absolute right-2 top-2 text-stone-400 hover:text-stone-700"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Grid vs Rails Toggle (Top-right button like screenshot) */}
          <div className="flex items-center bg-stone-100 border border-stone-300 rounded-lg p-0.5 shadow-2xs">
            <button
              onClick={() => handleSelectCategory(activeCategory, 'rows')}
              className={`p-1.5 rounded-md transition cursor-pointer ${
                viewMode === 'rows'
                  ? 'bg-[#15803D] text-white shadow-xs'
                  : 'text-stone-500 hover:text-stone-900'
              }`}
              title="가로 레일 뷰 (Rows)"
              aria-label="가로 레일 뷰"
            >
              <List className="w-4 h-4 stroke-[2.5]" />
            </button>
            <button
              onClick={() => handleSelectCategory(activeCategory, 'grid')}
              className={`p-1.5 rounded-md transition cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-[#15803D] text-white shadow-xs'
                  : 'text-stone-500 hover:text-stone-900'
              }`}
              title="그리드 뷰 (Grid)"
              aria-label="그리드 뷰"
            >
              <Grid className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>

          {/* Admin New Post Button */}
          {isEditMode && (
            <button
              type="button"
              onClick={handleOpenCreateModal}
              className="px-3 py-1.5 bg-[#15803D] hover:bg-[#166534] text-white font-black text-xs rounded-lg transition flex items-center gap-1 cursor-pointer shadow-sm active:scale-95"
              title="새 갤러리 등록"
            >
              <Plus className="w-3.5 h-3.5 stroke-[3]" />
              <span className="hidden sm:inline">새 갤러리 등록</span>
            </button>
          )}
        </div>
      </div>

      {/* Mobile/Tablet Category Scrollbar */}
      <div className="flex lg:hidden overflow-x-auto scrollbar-none gap-2 px-4 py-2.5 border-b border-stone-200 bg-white/70">
        {galleryCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleSelectCategory(cat.id)}
            className={`px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition cursor-pointer ${
              activeCategory === cat.id
                ? 'bg-[#15803D] text-white font-black shadow-xs'
                : 'text-stone-600 hover:text-stone-900 bg-stone-100'
            }`}
          >
            {cat.shortLabel}
          </button>
        ))}
      </div>

      {/* 2. Main Content Area */}
      <SectorBlock
        sectorId="S-GAL-01"
        sectorName="현장 갤러리"
        pageKey="gallery"
        editContentLabel="➕ 새 갤러리 사진 등록"
        onEditContent={handleOpenCreateModal}
      >
        <div
          id="gallery-content-anchor"
          key={`${activeCategory}-${viewMode}-${searchKeyword ? 'search' : 'norm'}`}
          className="animate-content-slide-up"
        >
          {/* Case A: Search Active or Grid View Mode or Single Category Active in Grid */}
          {searchKeyword || viewMode === 'grid' || activeCategory !== 'all' ? (
            <div className="px-4 sm:px-8 lg:px-12 py-6 space-y-6">
              <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                <h2 className="text-base sm:text-lg font-black text-stone-900 flex items-center gap-2">
                  <span>
                    {searchKeyword
                      ? `"${searchKeyword}" 검색 결과`
                      : currentCategoryObj.label}
                  </span>
                  <span className="text-xs font-bold text-stone-500">
                    ({filteredItems.length}편)
                  </span>
                </h2>

                {activeCategory !== 'all' && (
                  <button
                    onClick={() => handleSelectCategory('all', 'rows')}
                    className="text-xs font-black text-[#15803D] hover:underline cursor-pointer"
                  >
                    ← 전체 갤러리 보기
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2.5 sm:gap-3.5">
                {filteredItems.map((item) => (
                  <NetflixCard
                    key={item.id}
                    item={item}
                    isEditMode={isEditMode}
                    onSelect={(selected) => setSelectedPhoto(selected)}
                    onEdit={handleOpenEditModal}
                    onDelete={handleDeleteGallery}
                  />
                ))}
              </div>

              {filteredItems.length === 0 && (
                <div className="py-20 text-center text-stone-400 space-y-2 bg-white rounded-2xl border border-stone-200 my-4">
                  <p className="text-base font-bold text-stone-700">등록된 갤러리 영상 및 사진이 없습니다.</p>
                  <p className="text-xs text-stone-500">다른 검색어로 찾아보시거나 전체 갤러리를 확인해보세요.</p>
                </div>
              )}
            </div>
          ) : (
            /* Case B: Authentic Netflix Multi-Row Rails Layout (Bright Theme) */
            <div className="py-2 sm:py-4 space-y-2">
              {galleryCategories
                .filter((cat) => cat.id !== 'all')
                .map((cat) => {
                  const rowItems = galleryItems.filter(
                    (item) => item.category === cat.id
                  );
                  return (
                    <NetflixCategoryRow
                      key={cat.id}
                      category={cat}
                      items={rowItems}
                      isEditMode={isEditMode}
                      onSelectPhoto={(photo) => setSelectedPhoto(photo)}
                      onViewAllCategory={(catId) => {
                        handleSelectCategory(catId, 'grid');
                      }}
                      onEditItem={handleOpenEditModal}
                      onDeleteItem={handleDeleteGallery}
                    />
                  );
                })}
            </div>
          )}
        </div>
      </SectorBlock>

      {/* 3. Photo Detail View Modal */}
      <GalleryDetailModal
        photo={selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
      />

      {/* 4. Admin Create / Edit Modal Popover */}
      <GalleryEditorModal
        isOpen={isEditorModalOpen}
        isEdit={Boolean(editingPostId)}
        initialData={editingItem}
        onSave={handleSavePost}
        onClose={() => setIsEditorModalOpen(false)}
      />
    </div>
  );
}
