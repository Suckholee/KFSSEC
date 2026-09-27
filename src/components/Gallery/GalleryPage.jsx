import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import ScrollReveal from '../common/ScrollReveal';
import SectorBlock from '../Admin/InlineEditor/SectorBlock';
import { useAdminEdit } from '../../context/AdminEditContext';
import { Image, Search, Plus } from 'lucide-react';
import GalleryCard from './GalleryCard';
import GalleryDetailModal from './GalleryDetailModal';
import GalleryEditorModal from './GalleryEditorModal';
import { cleanMarkdownSnippet } from '../common/RichContentRenderer';

export default function GalleryPage({ initialSubTab = 'all', postsList = [] }) {
  const { t } = useLanguage();
  const { isEditMode, postsDraft, updatePostsDraft } = useAdminEdit();

  const [activeCategory, setActiveCategory] = useState(initialSubTab || 'all');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // Gallery Creation & Editing Modal State
  const [isEditorModalOpen, setIsEditorModalOpen] = useState(false);
  const [editingPostId, setEditingPostId] = useState(null);

  useEffect(() => {
    if (initialSubTab) {
      setActiveCategory(initialSubTab);
    }
  }, [initialSubTab]);

  const galleryCategories = [
    { id: 'all', label: t('전체 갤러리') },
    { id: 'competition', label: t('요리대회') },
    { id: 'ceremony', label: t('시상식 & 인증패') },
    { id: 'consulting', label: t('지자체 컨설팅') },
    { id: 'training', label: t('조리 실습 현장') },
  ];

  // Resolve current posts list: prefer active draft in admin context
  const currentPosts = postsDraft && postsDraft.length > 0 ? postsDraft : postsList;

  const galleryItems = currentPosts
    .filter((post) => post.categoryType === 'gallery')
    .map((post) => {
      const postImages =
        Array.isArray(post.images) && post.images.length > 0
          ? post.images
          : post.image
          ? [post.image]
          : ['/images/hero_bg.jpg'];
      const coverImage = post.image || postImages[0] || '/images/hero_bg.jpg';
      return {
        id: post.id,
        category: post.galleryCategory || 'training',
        categoryLabel:
          galleryCategories.find(
            (item) => item.id === (post.galleryCategory || 'training')
          )?.label || '조리 실습 현장',
        title: post.title,
        date: post.date || '',
        location: post.location || '',
        image: coverImage,
        images: postImages,
        desc: post.content || '',
        rawPost: post,
      };
    });

  // Filtering by category and search keyword
  const filteredItems = galleryItems.filter((item) => {
    const matchesCategory =
      activeCategory === 'all' || item.category === activeCategory;
    const cleanDesc = cleanMarkdownSnippet(item.desc).toLowerCase();
    const query = searchKeyword.toLowerCase();
    const matchesSearch =
      item.title.toLowerCase().includes(query) ||
      cleanDesc.includes(query) ||
      item.location.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

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

  return (
    <div className="bg-gray-50 min-h-screen py-8 font-sans text-gray-900">
      <div className="w-full px-4 sm:px-8 lg:px-12 max-w-[1520px] mx-auto space-y-8">
        {/* Top Header Hero Banner */}
        <ScrollReveal direction="up" delay={0}>
          <div className="relative bg-gradient-to-br from-[#1E5B3C] via-[#2A7550] to-[#388C61] text-white rounded-3xl p-6 sm:p-10 border border-[#85CFAB]/40 shadow-xl overflow-hidden">
            <div className="relative z-10 max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/15 border border-white/25 text-[#A7F3D0] text-xs font-black rounded-full">
                <Image className="w-3.5 h-3.5" />
                <span>KFSSEC OFFICIAL GALLERY</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight">
                현장의 열정과 영광의 순간, <br className="hidden sm:inline" />
                <span className="text-[#A7F3D0]">한국외식창업교육원 갤러리</span>
              </h1>
              <p className="text-xs sm:text-sm text-emerald-100/90 font-medium leading-relaxed">
                전국 조리경연대회, 명인·명장 시상식, 전국 지자체 소상공인 컨설팅 및 생생한 현장 조리 실습의 순간들을 기록합니다.
              </p>
            </div>
            <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          </div>
        </ScrollReveal>

        {/* Category Tabs & Search Bar & Admin Action */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Subtabs */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {galleryCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-gradient-to-r from-[#1B5238] to-[#266847] text-white shadow-md'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Right Controls: Search Box + Admin New Post Button */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            {/* Search Box */}
            <div className="relative flex-1 md:w-64">
              <input
                type="text"
                placeholder={t('갤러리 검색 (대회, 시상식, 지자체...)')}
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-stone-300 text-xs font-bold text-gray-900 focus:outline-none focus:border-[#2B7752] shadow-2xs"
              />
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
            </div>

            {/* Admin Add Post Button */}
            {isEditMode && (
              <button
                type="button"
                onClick={handleOpenCreateModal}
                className="shrink-0 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 border border-amber-400/80"
                title="새 갤러리 사진 및 내용 등록"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>새 갤러리 등록</span>
              </button>
            )}
          </div>
        </div>

        {/* Gallery Grid wrapped in SectorBlock for unified context editing */}
        <SectorBlock
          sectorId={
            activeCategory === 'competition'
              ? 'S-GAL-02'
              : activeCategory === 'ceremony'
              ? 'S-GAL-03'
              : activeCategory === 'consulting'
              ? 'S-GAL-04'
              : activeCategory === 'training'
              ? 'S-GAL-05'
              : 'S-GAL-01'
          }
          sectorName={
            activeCategory === 'competition'
              ? '요리대회 포토 갤러리'
              : activeCategory === 'ceremony'
              ? '시상식 & 인증패 갤러리'
              : activeCategory === 'consulting'
              ? '지자체 컨설팅 포토'
              : activeCategory === 'training'
              ? '조리 실습 현장 스케치'
              : '전체 갤러리 미디어'
          }
          pageKey="gallery"
          editContentLabel="➕ 새 갤러리 사진 등록"
          onEditContent={handleOpenCreateModal}
          customActions={[
            {
              label: '➕ 새 갤러리 포스트 등록',
              onClick: handleOpenCreateModal,
            },
          ]}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* Admin Quick Add Card placeholder in Edit Mode */}
            {isEditMode && (
              <div
                onClick={handleOpenCreateModal}
                className="rounded-2xl border-2 border-dashed border-amber-400 bg-amber-500/5 hover:bg-amber-500/15 transition-all p-6 flex flex-col items-center justify-center text-center cursor-pointer min-h-[300px] group shadow-sm hover:shadow-lg"
              >
                <div className="w-14 h-14 rounded-2xl bg-amber-500/20 group-hover:bg-amber-500 text-amber-500 group-hover:text-black flex items-center justify-center transition-all mb-3 shadow-inner">
                  <Plus className="w-7 h-7 stroke-[3]" />
                </div>
                <h3 className="font-black text-sm text-slate-800 group-hover:text-amber-700">
                  새 갤러리 사진 등록
                </h3>
                <p className="text-xs text-slate-500 mt-1 max-w-[200px] leading-relaxed">
                  클릭하여 요리대회, 시상식, 조리 실습 현장 사진을 바로 추가합니다
                </p>
              </div>
            )}

            {filteredItems.map((item, idx) => (
              <GalleryCard
                key={item.id}
                item={item}
                idx={idx}
                isEditMode={isEditMode}
                onSelect={(selected) => setSelectedPhoto(selected)}
                onEdit={handleOpenEditModal}
                onDelete={handleDeleteGallery}
              />
            ))}
          </div>

          {filteredItems.length === 0 && !isEditMode && (
            <div className="bg-white rounded-2xl p-12 text-center text-stone-500 space-y-2 border border-stone-200">
              <Image className="w-10 h-10 text-stone-300 mx-auto" />
              <p className="font-bold">일치하는 갤러리 자료가 없습니다.</p>
            </div>
          )}
        </SectorBlock>
      </div>

      {/* 1. Photo Detail View Modal */}
      <GalleryDetailModal
        photo={selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
      />

      {/* 2. Admin Create / Edit Modal Popover */}
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
