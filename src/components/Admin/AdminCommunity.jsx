import React, { useState, useEffect } from 'react';
import {
  Megaphone,
  Plus,
  Search,
  Pin,
  Trash2,
  Edit3,
  Eye,
  CheckCircle2,
  Calendar,
  User,
  Filter,
  X,
  FileText,
  Trophy,
  Image as ImageIcon,
  MessageSquare,
  AlertCircle,
  Clock,
  Sparkles,
  Send,
  Upload,
} from 'lucide-react';

export default function AdminCommunity({
  postsList = [],
  setPostsList,
}) {
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('all');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [savedSuccessMsg, setSavedSuccessMsg] = useState('');

  // Form State for creating/editing posts
  const [formCategory, setFormCategory] = useState('공지 사항');
  const [formTitle, setFormTitle] = useState('');
  const [formAuthor, setFormAuthor] = useState('사단법인 한국외식창업교육원');
  const [formContent, setFormContent] = useState('');
  const [formIsPinned, setFormIsPinned] = useState(false);
  const [formImage, setFormImage] = useState('');

  // Keyboard shortcut: Close modals on ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (isWriteModalOpen) setIsWriteModalOpen(false);
        if (editingPost) setEditingPost(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isWriteModalOpen, editingPost]);

  const showNotification = (msg) => {
    setSavedSuccessMsg(msg);
    setTimeout(() => setSavedSuccessMsg(''), 3000);
  };

  // Open Write Modal
  const handleOpenCreateModal = () => {
    setFormCategory('공지 사항');
    setFormTitle('');
    setFormAuthor('사단법인 한국외식창업교육원');
    setFormContent('');
    setFormIsPinned(false);
    setFormImage('');
    setIsWriteModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEditModal = (post) => {
    setEditingPost(post);
    setFormCategory(post.category || '공지 사항');
    setFormTitle(post.title || '');
    setFormAuthor(post.author || '사단법인 한국외식창업교육원');
    setFormContent(post.content || '');
    setFormIsPinned(Boolean(post.isPinned));
    setFormImage(post.image || '');
  };

  // Handle Save (Create or Edit)
  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (!formTitle.trim()) {
      alert('제목을 입력해주세요.');
      return;
    }
    if (!formContent.trim()) {
      alert('본문 내용을 입력해주세요.');
      return;
    }

    const todayStr = new Date().toISOString().slice(0, 10).replace(/-/g, '.');

    let updatedList;
    if (editingPost) {
      updatedList = postsList.map((p) => {
        if (p.id === editingPost.id) {
          return {
            ...p,
            category: formCategory,
            categoryType:
              formCategory === '공지 사항'
                ? 'notice'
                : formCategory === '보도자료'
                ? 'press'
                : formCategory === '요리대회'
                ? 'competition'
                : formCategory === '갤러리'
                ? 'gallery'
                : 'notice',
            title: formTitle.trim(),
            author: formAuthor.trim(),
            content: formContent.trim(),
            isPinned: formIsPinned,
            image: formImage || p.image || null,
          };
        }
        return p;
      });
      showNotification('게시글이 성공적으로 수정되었습니다.');
      setEditingPost(null);
    } else {
      const newPost = {
        id: Date.now(),
        category: formCategory,
        categoryType:
          formCategory === '공지 사항'
            ? 'notice'
            : formCategory === '보도자료'
            ? 'press'
            : formCategory === '요리대회'
            ? 'competition'
            : formCategory === '갤러리'
            ? 'gallery'
            : 'notice',
        title: formTitle.trim(),
        author: formAuthor.trim(),
        content: formContent.trim(),
        date: todayStr,
        views: 1,
        isPinned: formIsPinned,
        image: formImage || null,
      };
      updatedList = [newPost, ...postsList];
      showNotification('새 공지/게시글이 성공적으로 등록되었습니다.');
      setIsWriteModalOpen(false);
    }

    setPostsList(updatedList);
    try {
      localStorage.setItem('kfssec_posts_list', JSON.stringify(updatedList));
    } catch (e) {
      console.error(e);
    }
  };

  // Toggle Pin Status
  const handleTogglePin = (id) => {
    const updatedList = postsList.map((p) =>
      p.id === id ? { ...p, isPinned: !p.isPinned } : p
    );
    setPostsList(updatedList);
    try {
      localStorage.setItem('kfssec_posts_list', JSON.stringify(updatedList));
    } catch (e) {
      console.error(e);
    }
    showNotification('상단 고정 상태가 변경되었습니다.');
  };

  // Delete Post
  const handleDeletePost = (id) => {
    if (window.confirm('정말 이 게시글을 삭제하시겠습니까? 삭제 후에는 복구할 수 없습니다.')) {
      const updatedList = postsList.filter((p) => p.id !== id);
      setPostsList(updatedList);
      try {
        localStorage.setItem('kfssec_posts_list', JSON.stringify(updatedList));
      } catch (e) {
        console.error(e);
      }
      showNotification('게시글이 삭제되었습니다.');
    }
  };

  // Filtered List
  const filteredPosts = postsList.filter((post) => {
    // Category match
    if (activeCategoryFilter !== 'all') {
      if (activeCategoryFilter === 'notice') {
        if (!post.category.includes('공지')) return false;
      } else if (activeCategoryFilter === 'press') {
        if (!post.category.includes('보도') && !post.category.includes('언론')) return false;
      } else if (activeCategoryFilter === 'competition') {
        if (!post.category.includes('대회') && !post.category.includes('요리')) return false;
      } else if (activeCategoryFilter === 'gallery') {
        if (!post.category.includes('갤러리') && !post.category.includes('현장')) return false;
      }
    }
    // Search keyword match
    if (searchKeyword.trim()) {
      const kw = searchKeyword.toLowerCase();
      const matchTitle = (post.title || '').toLowerCase().includes(kw);
      const matchContent = (post.content || '').toLowerCase().includes(kw);
      const matchAuthor = (post.author || '').toLowerCase().includes(kw);
      return matchTitle || matchContent || matchAuthor;
    }
    return true;
  });

  const pinnedCount = postsList.filter((p) => p.isPinned).length;
  const noticeCount = postsList.filter((p) => (p.category || '').includes('공지')).length;
  const pressCount = postsList.filter((p) => (p.category || '').includes('보도')).length;
  const galleryCount = postsList.filter((p) => (p.category || '').includes('갤러리')).length;

  return (
    <div className="space-y-6 animate-fadeIn font-sans text-gray-900 max-w-7xl mx-auto pb-12">
      
      {/* Top Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black">
              COMMUNITY & NOTICES CONTROL
            </span>
            <span className="text-xs text-gray-500 font-bold">
              총 {postsList.length}건 등록됨
            </span>
          </div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
            <span>게시판 & 공지사항 통합 관리</span>
          </h2>
          <p className="text-xs text-gray-500">
            사단법인 공식 공지사항, 언론 보도자료, 요리대회 접수 및 수강생 화보 게시글을 실시간으로 작성, 수정, 고정 및 삭제합니다.
          </p>
        </div>

        {/* Write Post Button */}
        <button
          onClick={handleOpenCreateModal}
          className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-black text-sm shadow-md transition-all flex items-center gap-2 self-start md:self-auto cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>새 공지사항 / 게시글 작성</span>
        </button>
      </div>

      {/* Success Notice Toast */}
      {savedSuccessMsg && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 px-4 py-3 rounded-2xl text-xs font-black flex items-center gap-2 shadow-sm animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{savedSuccessMsg}</span>
        </div>
      )}

      {/* 4 Summary Stat Mini Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs">
          <div className="flex items-center justify-between text-gray-500 text-xs font-bold mb-1">
            <span>공지사항</span>
            <Megaphone className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-xl font-black text-gray-900">{noticeCount}건</div>
          <div className="text-[11px] text-emerald-700 font-bold mt-1">상단 고정 {pinnedCount}건</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs">
          <div className="flex items-center justify-between text-gray-500 text-xs font-bold mb-1">
            <span>보도자료</span>
            <FileText className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-xl font-black text-gray-900">{pressCount}건</div>
          <div className="text-[11px] text-gray-500 font-bold mt-1">언론 미디어 보도</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs">
          <div className="flex items-center justify-between text-gray-500 text-xs font-bold mb-1">
            <span>갤러리 현장화보</span>
            <ImageIcon className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-xl font-black text-gray-900">{galleryCount}건</div>
          <div className="text-[11px] text-gray-500 font-bold mt-1">실습 및 시상식 사진</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs">
          <div className="flex items-center justify-between text-gray-500 text-xs font-bold mb-1">
            <span>상단 고정 게시글</span>
            <Pin className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-xl font-black text-gray-900">{pinnedCount}건</div>
          <div className="text-[11px] text-amber-700 font-bold mt-1">최우선 노출 설정</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Category Filter Chips */}
        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          {[
            { id: 'all', label: '전체' },
            { id: 'notice', label: '공지사항' },
            { id: 'press', label: '보도자료' },
            { id: 'competition', label: '요리대회' },
            { id: 'gallery', label: '갤러리' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategoryFilter(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeCategoryFilter === cat.id
                  ? 'bg-emerald-600 text-white font-black shadow-xs'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="제목, 작성자, 내용 검색..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors"
          />
          {searchKeyword && (
            <button
              onClick={() => setSearchKeyword('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Posts Table List */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-200 text-gray-500 font-bold uppercase tracking-wider">
                <th className="py-3.5 px-4 w-16 text-center">고정</th>
                <th className="py-3.5 px-4 w-28">분류</th>
                <th className="py-3.5 px-4">제목</th>
                <th className="py-3.5 px-4 w-32">작성자</th>
                <th className="py-3.5 px-4 w-28 text-center">등록일</th>
                <th className="py-3.5 px-4 w-20 text-center">조회수</th>
                <th className="py-3.5 px-4 w-28 text-center">관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              {filteredPosts.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-12 text-center text-gray-400 text-sm font-bold">
                    검색 조건에 일치하는 게시글이 없습니다.
                  </td>
                </tr>
              ) : (
                filteredPosts.map((post) => (
                  <tr
                    key={post.id}
                    className={`hover:bg-emerald-50/30 transition-colors ${
                      post.isPinned ? 'bg-amber-50/40' : ''
                    }`}
                  >
                    {/* Pin Status Toggle */}
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => handleTogglePin(post.id)}
                        className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                          post.isPinned
                            ? 'text-amber-600 bg-amber-100 hover:bg-amber-200'
                            : 'text-gray-300 hover:text-gray-500 hover:bg-gray-100'
                        }`}
                        title={post.isPinned ? '상단 고정 해제' : '상단 고정'}
                      >
                        <Pin className="w-4 h-4" />
                      </button>
                    </td>

                    {/* Category Badge */}
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[11px] font-black inline-block ${
                          (post.category || '').includes('공지')
                            ? 'bg-emerald-100 text-emerald-800'
                            : (post.category || '').includes('보도')
                            ? 'bg-blue-100 text-blue-800'
                            : (post.category || '').includes('대회')
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-purple-100 text-purple-800'
                        }`}
                      >
                        {post.category || '공지사항'}
                      </span>
                    </td>

                    {/* Title & Preview */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        {post.isPinned && (
                          <span className="px-1.5 py-0.5 rounded bg-amber-500 text-white text-[10px] font-black shrink-0">
                            고정
                          </span>
                        )}
                        <span className="font-bold text-gray-900 line-clamp-1">
                          {post.title}
                        </span>
                        {post.image && (
                          <span className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded border border-gray-200 shrink-0 flex items-center gap-1 font-bold">
                            <ImageIcon className="w-3 h-3 text-emerald-600" />
                            사진
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-gray-500 line-clamp-1 mt-0.5">
                        {post.content}
                      </p>
                    </td>

                    {/* Author */}
                    <td className="py-3.5 px-4 text-gray-600 font-bold whitespace-nowrap">
                      {post.author || 'Admin'}
                    </td>

                    {/* Date */}
                    <td className="py-3.5 px-4 text-center text-gray-500 font-mono whitespace-nowrap">
                      {post.date || '2026.08.30'}
                    </td>

                    {/* Views */}
                    <td className="py-3.5 px-4 text-center text-gray-600 font-mono">
                      {post.views || 0}
                    </td>

                    {/* Actions: Edit & Delete */}
                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => handleOpenEditModal(post)}
                          className="p-1.5 bg-gray-100 hover:bg-emerald-100 text-gray-600 hover:text-emerald-700 rounded-lg transition-colors cursor-pointer"
                          title="게시글 수정"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeletePost(post.id)}
                          className="p-1.5 bg-gray-100 hover:bg-rose-100 text-gray-600 hover:text-rose-700 rounded-lg transition-colors cursor-pointer"
                          title="게시글 삭제"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE / EDIT MODAL */}
      {(isWriteModalOpen || editingPost) && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => {
            setIsWriteModalOpen(false);
            setEditingPost(null);
          }}
        >
          <div
            className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-gray-200 space-y-6 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-gray-200 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <Megaphone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-gray-900">
                    {editingPost ? '게시글 / 공지사항 수정' : '새 공지사항 / 게시글 작성'}
                  </h3>
                  <p className="text-xs text-gray-500">
                    작성된 내용은 홈페이지 공지사항 및 커뮤니티에 즉시 반영됩니다.
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsWriteModalOpen(false);
                  setEditingPost(null);
                }}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmitForm} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Category Selector */}
                <div className="space-y-1.5">
                  <label className="text-xs font-black text-gray-700">분류 (카테고리)</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs font-bold text-gray-900 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="공지 사항">공지 사항 (Notice)</option>
                    <option value="보도자료">보도자료 (Press Release)</option>
                    <option value="요리대회">요리대회 접수 및 공고</option>
                    <option value="갤러리">갤러리 (현장 화보)</option>
                  </select>
                </div>

                {/* Author Input */}
                <div className="space-y-1.5">
                  <label className="text-xs font-black text-gray-700">작성자</label>
                  <input
                    type="text"
                    value={formAuthor}
                    onChange={(e) => setFormAuthor(e.target.value)}
                    placeholder="사단법인 한국외식창업교육원"
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs font-bold text-gray-900 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Pin To Top Checkbox */}
              <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 p-3 rounded-xl">
                <input
                  type="checkbox"
                  id="formPin"
                  checked={formIsPinned}
                  onChange={(e) => setFormIsPinned(e.target.checked)}
                  className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500 border-gray-300"
                />
                <label htmlFor="formPin" className="text-xs font-bold text-amber-900 cursor-pointer">
                  📌 상단 고정 (중요 공지사항으로 목록 최상단에 고정 노출)
                </label>
              </div>

              {/* Title Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-black text-gray-700">게시글 제목</label>
                <input
                  type="text"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="예: 2026 하반기 정기총회 및 외식 창업 성과발표회 개최 안내"
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-sm font-bold text-gray-900 focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>

              {/* Image URL (Optional) */}
              <div className="space-y-1.5">
                <label className="text-xs font-black text-gray-700 flex items-center justify-between">
                  <span>첨부 이미지 URL (선택 사항)</span>
                  <span className="text-[10px] text-gray-400">갤러리 및 행사 배너용</span>
                </label>
                <input
                  type="text"
                  value={formImage}
                  onChange={(e) => setFormImage(e.target.value)}
                  placeholder="예: /images/course_menu_dev.jpg 또는 웹 이미지 URL"
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2 text-xs font-bold text-gray-900 focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Content Textarea */}
              <div className="space-y-1.5">
                <label className="text-xs font-black text-gray-700">게시글 본문 내용</label>
                <textarea
                  rows={8}
                  value={formContent}
                  onChange={(e) => setFormContent(e.target.value)}
                  placeholder="공지할 상세 내용을 자세하게 입력해주세요..."
                  className="w-full bg-gray-50 border border-gray-300 rounded-2xl p-4 text-xs font-medium text-gray-900 focus:outline-none focus:border-emerald-500 leading-relaxed"
                  required
                />
              </div>

              {/* Modal Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    setIsWriteModalOpen(false);
                    setEditingPost(null);
                  }}
                  className="px-5 py-2.5 rounded-xl border border-gray-300 text-xs font-bold text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black shadow-md transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{editingPost ? '수정 내용 저장' : '공지글 등록 완료'}</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
