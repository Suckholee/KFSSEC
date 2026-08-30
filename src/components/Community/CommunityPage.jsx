import React, { useState, useEffect } from 'react';
import SubSidebar from '../common/SubSidebar';
import { MessageSquare, Bell, Image, Trophy, HelpCircle, PenSquare, Search, Eye, Calendar, User, ChevronRight, X, Lock, Pin, ShieldCheck, CheckCircle2, Clock, Send, FileText } from 'lucide-react';
import ScrollReveal from '../common/ScrollReveal';

export default function CommunityPage({ initialTab = 'all', onOpenAuth, isUserLoggedIn, onGoToEditor, postsList = [], setPostsList }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  const communitySubItems = [
    { id: 'all', label: '전체 게시판' },
    { id: 'notice', label: '공지 사항' },
    { id: 'gallery', label: '갤러리' },
    { id: 'competition', label: '요리대회' },
    { id: 'inquiry', label: '문의하기' },
  ];

  // Filter & Sort Posts (Pinned posts first, then newest first)
  const filteredPosts = postsList
    .filter((post) => {
      const matchesTab =
        activeTab === 'all' ? true : post.categoryType === activeTab;
      const matchesSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesTab && matchesSearch;
    })
    .sort((a, b) => {
      const aPinned = a.isPinned || a.category === '공지 사항';
      const bPinned = b.isPinned || b.category === '공지 사항';
      if (aPinned && !bPinned) return -1;
      if (!aPinned && bPinned) return 1;
      return 0;
    });

  const handleWriteButtonClick = () => {
    if (!isUserLoggedIn) {
      alert('🔒 글작성은 로그인 후 이용 가능합니다. 로그인 페이지로 이동합니다.');
      onOpenAuth('login');
    } else {
      if (onGoToEditor) {
        onGoToEditor();
      }
    }
  };

  const handleTogglePin = (postId) => {
    if (!setPostsList) return;
    setPostsList((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, isPinned: !p.isPinned } : p))
    );
    if (selectedPost && selectedPost.id === postId) {
      setSelectedPost((prev) => ({ ...prev, isPinned: !prev.isPinned }));
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-6 font-sans text-gray-900">
      
      {/* Full Width Widescreen Layout matching Header padding */}
      <div className="w-full px-6 sm:px-10 lg:px-14 space-y-6">
        
        {/* Main Content Layout: Left SubSidebar + Right Main Content */}
        <div className="flex flex-col md:flex-row gap-6 lg:gap-8 items-start">
          
          {/* Left Vertical SubSidebar Menu */}
          <SubSidebar
            title="커뮤니티"
            items={communitySubItems}
            activeId={activeTab}
            onSelectTab={(tabId) => setActiveTab(tabId)}
          />

          {/* Right Main Content Panel */}
          <div className="flex-1 w-full space-y-6 min-w-0">
            
            <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-black shadow-lg space-y-6 w-full">
              
              {/* Header Title & Search Toolbar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-black pb-4">
                <div>
                  <h2 className="text-3xl font-black text-black tracking-tight">
                    게시판
                  </h2>
                  <p className="text-xs text-gray-500 font-bold mt-1">
                    사단법인 한국외식창업교육원 공지사항 및 커뮤니티 게시판입니다. (📌 주요 공지 상단 고정)
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  {/* Search Input */}
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="제목 또는 작성자 검색..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9 pr-4 py-2 border border-gray-300 rounded-xl text-xs font-bold text-gray-900 focus:outline-none focus:border-black w-48 sm:w-60 shadow-xs"
                    />
                    <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                  </div>

                  {/* Write Post Button (Requires Login) */}
                  <button
                    onClick={handleWriteButtonClick}
                    className="px-4 py-2 bg-black hover:bg-gray-800 text-white text-xs font-black rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
                    title={isUserLoggedIn ? '새 게시글 작성하기' : '로그인 필요'}
                  >
                    {!isUserLoggedIn ? (
                      <Lock className="w-3.5 h-3.5 text-amber-400" />
                    ) : (
                      <PenSquare className="w-4 h-4 text-emerald-400" />
                    )}
                    <span>글쓰기</span>
                  </button>
                </div>
              </div>

              {/* Table Layout Matching Target Screenshot + Answer Status Badges */}
              <div className="border border-gray-300 rounded-2xl overflow-hidden shadow-sm bg-white">
                <table className="w-full text-left border-collapse text-xs sm:text-sm font-sans">
                  
                  {/* Table Header */}
                  <thead>
                    <tr className="bg-gray-100 text-black font-black border-b-2 border-black text-center">
                      <th className="py-3.5 px-3 w-16 border-r border-gray-300">번호</th>
                      <th className="py-3.5 px-4 w-28 border-r border-gray-300">항목</th>
                      <th className="py-3.5 px-6 border-r border-gray-300 text-left">제목</th>
                      <th className="py-3.5 px-4 w-32 border-r border-gray-300">작성일</th>
                      <th className="py-3.5 px-4 w-28">작성인</th>
                    </tr>
                  </thead>

                  {/* Table Body */}
                  <tbody className="divide-y divide-gray-300 text-gray-800 font-medium">
                    {filteredPosts.length > 0 ? (
                      filteredPosts.map((post, idx) => {
                        const isPinnedRow = post.isPinned || post.category === '공지 사항';
                        const isAnswered = post.reply || post.status === 'completed';

                        return (
                          <tr
                            key={post.id}
                            onClick={() => setSelectedPost(post)}
                            className={`transition-colors cursor-pointer text-center ${
                              isPinnedRow
                                ? 'bg-rose-50/70 hover:bg-rose-100/80 border-l-4 border-l-rose-600 font-bold'
                                : 'hover:bg-emerald-50/60'
                            }`}
                          >
                            <td className="py-3.5 px-3 border-r border-gray-200 font-bold text-gray-600">
                              {isPinnedRow ? (
                                <span className="inline-flex items-center justify-center bg-rose-600 text-white rounded-full p-1 shadow-xs" title="상단 고정">
                                  <Pin className="w-3 h-3 fill-white text-white" />
                                </span>
                              ) : (
                                filteredPosts.length - idx
                              )}
                            </td>

                            <td className="py-3.5 px-4 border-r border-gray-200">
                              <span
                                className={`px-2.5 py-1 rounded text-xs font-black inline-block ${
                                  post.category === '공지 사항'
                                    ? 'text-rose-600 font-black'
                                    : post.category === '요리대회'
                                    ? 'text-blue-700 font-bold'
                                    : post.category === '갤러리'
                                    ? 'text-emerald-700 font-bold'
                                    : 'text-gray-800 font-bold'
                                }`}
                              >
                                {post.category}
                              </span>
                            </td>

                            <td className="py-3.5 px-6 border-r border-gray-200 text-left font-bold text-gray-900 hover:text-rose-600 transition-colors">
                              <div className="flex items-center gap-2">
                                {isPinnedRow && (
                                  <span className="text-[11px] font-black text-white bg-rose-600 px-1.5 py-0.5 rounded shrink-0">
                                    📌 필독
                                  </span>
                                )}

                                {post.category === '문의' && (
                                  isAnswered ? (
                                    <span className="text-[11px] font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300 shrink-0 flex items-center gap-1">
                                      ✓ 답변완료
                                    </span>
                                  ) : (
                                    <span className="text-[11px] font-black text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-300 shrink-0 flex items-center gap-1">
                                      ⏳ 답변대기
                                    </span>
                                  )
                                )}

                                <span className="line-clamp-1">{post.title}</span>
                              </div>
                            </td>

                            <td className="py-3.5 px-4 border-r border-gray-200 text-gray-600 font-semibold text-xs">
                              {post.date}
                            </td>

                            <td className="py-3.5 px-4 font-bold text-gray-700">
                              {post.author}
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="5" className="py-12 text-center text-gray-500 font-bold">
                          등록된 게시글이 없습니다.
                        </td>
                      </tr>
                    )}
                  </tbody>

                </table>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Public Post View Modal (Public View - Clean Answer Card Display) */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full border-2 border-black shadow-2xl space-y-5 animate-fadeIn max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-gray-200 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-rose-600 bg-rose-100 px-3 py-1 rounded-full">
                    {selectedPost.category}
                  </span>

                  {selectedPost.category === '문의' && (
                    selectedPost.reply || selectedPost.status === 'completed' ? (
                      <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
                        ✓ 답변완료
                      </span>
                    ) : (
                      <span className="text-xs font-black text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
                        ⏳ 답변대기
                      </span>
                    )
                  )}
                </div>

                <h3 className="text-xl font-black text-black pt-2">
                  {selectedPost.title}
                </h3>
                <div className="flex items-center gap-4 text-xs font-bold text-gray-500 pt-1">
                  <span>작성자: {selectedPost.author}</span>
                  <span>|</span>
                  <span>작성일: {selectedPost.date}</span>
                </div>
              </div>

              <button
                onClick={() => setSelectedPost(null)}
                className="text-gray-400 hover:text-black font-black text-xl p-1"
              >
                ✕
              </button>
            </div>

            {/* Post Image */}
            {(selectedPost.image || selectedPost.coverImage) && (
              <div className="rounded-2xl overflow-hidden max-h-64 shadow-md bg-black">
                <img
                  src={selectedPost.image || selectedPost.coverImage}
                  alt={selectedPost.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Question Content */}
            <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200 text-sm text-gray-800 font-medium leading-relaxed min-h-[100px] whitespace-pre-wrap">
              {selectedPost.content}
            </div>

            {/* Official Administrator Reply Card (If Answered) */}
            {selectedPost.reply && (
              <div className="bg-emerald-50/90 rounded-2xl p-5 border-2 border-emerald-500 space-y-3 shadow-md animate-fadeIn">
                <div className="flex items-center justify-between border-b border-emerald-200 pb-2">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-700" />
                    <span className="text-sm font-black text-emerald-900">
                      사단법인 한국외식창업교육원 공식 답변
                    </span>
                  </div>
                  <span className="text-xs font-bold text-emerald-700">
                    {selectedPost.reply.date}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-emerald-950 font-bold whitespace-pre-wrap leading-relaxed">
                  {selectedPost.reply.content}
                </p>
              </div>
            )}

            {/* Unanswered Notice for Public */}
            {!selectedPost.reply && selectedPost.category === '문의' && (
              <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200 text-xs font-bold text-amber-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-700 shrink-0" />
                <span>담당 컨설턴트 및 교육팀에서 답변을 준비 중입니다. 빠르게 안내 도와드리겠습니다.</span>
              </div>
            )}

            {/* Modal Footer Controls */}
            <div className="pt-2 flex items-center justify-between border-t border-gray-200">
              <button
                onClick={() => handleTogglePin(selectedPost.id)}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer border ${
                  selectedPost.isPinned || selectedPost.category === '공지 사항'
                    ? 'bg-rose-100 text-rose-800 border-rose-300'
                    : 'bg-stone-100 text-stone-700 border-stone-300 hover:bg-stone-200'
                }`}
              >
                <Pin className="w-3.5 h-3.5" />
                <span>
                  {selectedPost.isPinned || selectedPost.category === '공지 사항'
                    ? '상단 고정 해제'
                    : '상단에 고정하기'}
                </span>
              </button>

              <button
                onClick={() => setSelectedPost(null)}
                className="px-6 py-2.5 bg-black hover:bg-gray-800 text-white font-black text-xs rounded-xl shadow-md transition-colors cursor-pointer"
              >
                닫기
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
