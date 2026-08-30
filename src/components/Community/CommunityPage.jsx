import React, { useState, useEffect } from 'react';
import SubSidebar from '../common/SubSidebar';
import { MessageSquare, Bell, Image, Trophy, HelpCircle, PenSquare, Search, Eye, Calendar, User, ChevronRight, X, Lock } from 'lucide-react';
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

  // Filter posts based on activeTab and searchTerm
  const filteredPosts = postsList.filter((post) => {
    const matchesTab =
      activeTab === 'all' ? true : post.categoryType === activeTab;
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
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

  return (
    <div className="bg-gray-50 min-h-screen py-6 font-sans text-gray-900">
      
      {/* Full Width Flush Layout matching Header margins */}
      <div className="w-full px-4 sm:px-8 lg:px-12 space-y-6">
        
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
                    사단법인 한국외식창업교육원 공지사항 및 커뮤니티 게시판입니다.
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

              {/* Exact Table Layout Matching Target Screenshot */}
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
                      filteredPosts.map((post, idx) => (
                        <tr
                          key={post.id}
                          onClick={() => setSelectedPost(post)}
                          className="hover:bg-emerald-50/60 transition-colors cursor-pointer text-center"
                        >
                          <td className="py-3.5 px-3 border-r border-gray-200 font-bold text-gray-600">
                            {filteredPosts.length - idx}
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
                            {post.title}
                          </td>

                          <td className="py-3.5 px-4 border-r border-gray-200 text-gray-600 font-semibold text-xs">
                            {post.date}
                          </td>

                          <td className="py-3.5 px-4 font-bold text-gray-700">
                            {post.author}
                          </td>
                        </tr>
                      ))
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

      {/* Post Detail Modal */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full border-2 border-black shadow-2xl space-y-5 animate-fadeIn">
            <div className="flex items-start justify-between border-b border-gray-200 pb-4">
              <div className="space-y-1">
                <span className="text-xs font-black text-rose-600 bg-rose-100 px-3 py-1 rounded-full">
                  {selectedPost.category}
                </span>
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

            {(selectedPost.image || selectedPost.coverImage) && (
              <div className="rounded-2xl overflow-hidden max-h-64 shadow-md bg-black">
                <img
                  src={selectedPost.image || selectedPost.coverImage}
                  alt={selectedPost.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200 text-sm text-gray-800 font-medium leading-relaxed min-h-[120px] whitespace-pre-wrap">
              {selectedPost.content}
            </div>

            <div className="pt-2 text-right">
              <button
                onClick={() => setSelectedPost(null)}
                className="px-6 py-2.5 bg-black text-white font-black text-xs rounded-xl shadow-md hover:bg-gray-800 transition-colors cursor-pointer"
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
