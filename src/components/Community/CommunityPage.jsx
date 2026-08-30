import React, { useState, useEffect } from 'react';
import SubSidebar from '../common/SubSidebar';
import { MessageSquare, Bell, Image, Trophy, HelpCircle, PenSquare, Search, Eye, Calendar, User, ChevronRight, X } from 'lucide-react';
import ScrollReveal from '../common/ScrollReveal';

export default function CommunityPage({ initialTab = 'all', onOpenAuth }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);
  const [showWriteModal, setShowWriteModal] = useState(false);
  const [writeForm, setWriteForm] = useState({ category: '문의', title: '', author: '', content: '' });

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

  const initialPosts = [
    {
      id: 1,
      category: '공지 사항',
      categoryType: 'notice',
      title: '240203 사단법인 한국외식창업교육원 정기총회 개최 안내',
      date: '2024.02.03',
      author: 'Admin',
      views: 1245,
      content: '사단법인 한국외식창업교육원 2023년 사업 결산 및 2024년 글로벌 K-FOOD 외식 창업 육성 비전 발표 정기총회가 개최됩니다.',
    },
    {
      id: 2,
      category: '공지 사항',
      categoryType: 'notice',
      title: '외식창업 수강생 N:N 커리큘럼 매칭 포트폴리오 시스템 도입',
      date: '2024.01.26',
      author: 'Admin',
      views: 980,
      content: '수강생 1인이 다수의 조리/창업 커리큘럼을 연계하여 수강하고 혜택을 제공받을 수 있는 N:N 매칭 포트폴리오 시스템이 도입되었습니다.',
    },
    {
      id: 3,
      category: '공지 사항',
      categoryType: 'notice',
      title: '제 01회 요리대회 <OO활용한 OO지역활성 대회> 규정집 & 접수 신청',
      date: '2023.01.26',
      author: 'Admin',
      views: 2150,
      content: '지역 농수축산물을 활용한 제01회 대한민국 창의 요리대회 참가를 위한 규정집 다운로드 및 접수 페이지입니다.',
    },
    {
      id: 4,
      category: '요리대회',
      categoryType: 'competition',
      title: '제 01회 요리대회 <OO활용한 OO지역활성 대회> 접수 신청',
      date: '2023.01.26',
      author: 'Admin',
      views: 1890,
      content: '전국 조리 관련 학생 및 외식업 종사자 누구나 응시 가능한 신제품 메뉴 개발 요리대회 접수가 진행 중입니다.',
    },
    {
      id: 5,
      category: '갤러리',
      categoryType: 'gallery',
      title: '2024 대한민국 자랑스러운 외식 명인 시상식 현장 화보',
      date: '2023.01.26',
      author: '안 OO',
      views: 750,
      image: '/images/hero_bg.jpg',
      content: '특급호텔 40년 현장 실무 경력의 조리 명장진과 인정받은 수강생들의 시상식 현장 사진 기록입니다.',
    },
    {
      id: 6,
      category: '갤러리',
      categoryType: 'gallery',
      title: '외식창업 조리 실습실 시그니처 메뉴 테스트 현장',
      date: '2023.01.26',
      author: '김 OOO',
      views: 640,
      image: '/images/course_menu_dev.jpg',
      content: '100년 전통 발효 소스와 시그니처 레시피 개발을 위한 외식창업 조리 실습실 현장입니다.',
    },
    {
      id: 7,
      category: '문의',
      categoryType: 'inquiry',
      title: '청년 외식창업 정부지원금 연계 신청 방법 문의',
      date: '2023.01.26',
      author: '박 OOO',
      views: 310,
      content: '청년 창업 교육 지원 정책 및 소상공인 창업 지원금 연계 절차에 관해 문의드립니다.',
    },
    {
      id: 8,
      category: '문의',
      categoryType: 'inquiry',
      title: '1:1 수강생 커리큘럼 매칭 상담 예약 문의',
      date: '2023.01.26',
      author: '이 OO',
      views: 280,
      content: '한식 및 배달밀키트 복수 수강 패키지 할인 혜택 및 주말반 수강 일정 상담을 신청합니다.',
    },
    {
      id: 9,
      category: '문의',
      categoryType: 'inquiry',
      title: '소상공인 100년 전통 발효 소스 전수 과정 문의',
      date: '2023.01.26',
      author: '최 OOO',
      views: 420,
      content: '기존 매장 메뉴 리뉴얼 및 셰프 1:1 레시피 전수 과정 수강료 문의드립니다.',
    },
    {
      id: 10,
      category: '요리대회',
      categoryType: 'competition',
      title: '제 01회 요리대회 <OO활용한 OO지역활성 대회> 심사위원 라인업 공개',
      date: '2023.01.26',
      author: 'Admin',
      views: 1120,
      content: '국가 조리기능장 및 특급호텔 총주방장 명장으로 구성된 심사위원단을 소개합니다.',
    },
  ];

  const [postsList, setPostsList] = useState(initialPosts);

  // Filter posts based on activeTab and searchTerm
  const filteredPosts = postsList.filter((post) => {
    const matchesTab =
      activeTab === 'all' ? true : post.categoryType === activeTab;
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleWriteSubmit = (e) => {
    e.preventDefault();
    if (!writeForm.title || !writeForm.content) {
      alert('제목과 내용을 입력해주세요.');
      return;
    }
    const newPost = {
      id: postsList.length + 1,
      category: writeForm.category === '문의' ? '문의' : writeForm.category,
      categoryType: writeForm.category === '문의' ? 'inquiry' : 'notice',
      title: writeForm.title,
      date: new Date().toISOString().split('T')[0].replace(/-/g, '.'),
      author: writeForm.author || '수강생',
      views: 1,
      content: writeForm.content,
    };
    setPostsList([newPost, ...postsList]);
    setShowWriteModal(false);
    setWriteForm({ category: '문의', title: '', author: '', content: '' });
    alert('게시글이 성공적으로 등록되었습니다.');
  };

  return (
    <div className="bg-gray-50 min-h-screen py-6 font-sans text-gray-900">
      
      {/* Full Width Flush Layout matching Header margins */}
      <div className="w-full px-4 sm:px-8 lg:px-12 space-y-6">
        
        {/* Main Content Layout: Left SubSidebar + Right Main Content (100% Matching Target Screenshot) */}
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

                  {/* Write Post Button */}
                  <button
                    onClick={() => setShowWriteModal(true)}
                    className="px-4 py-2 bg-black hover:bg-gray-800 text-white text-xs font-black rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
                  >
                    <PenSquare className="w-4 h-4 text-emerald-400" />
                    <span>글쓰기</span>
                  </button>
                </div>
              </div>

              {/* Exact Table Layout Matching Target Screenshot */}
              <div className="border border-gray-300 rounded-2xl overflow-hidden shadow-sm bg-white">
                <table className="w-full text-left border-collapse text-xs sm:text-sm font-sans">
                  
                  {/* Table Header (번호 | 항목 | 제목 | 작성일 | 작성인) */}
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

            {selectedPost.image && (
              <div className="rounded-2xl overflow-hidden max-h-64 shadow-md bg-black">
                <img
                  src={selectedPost.image}
                  alt={selectedPost.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200 text-sm text-gray-800 font-medium leading-relaxed min-h-[120px]">
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

      {/* Write Post Modal */}
      {showWriteModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <form
            onSubmit={handleWriteSubmit}
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full border-2 border-black shadow-2xl space-y-4 animate-fadeIn"
          >
            <div className="flex items-center justify-between border-b border-gray-200 pb-3">
              <h3 className="text-lg font-black text-black">게시글 작성하기</h3>
              <button
                type="button"
                onClick={() => setShowWriteModal(false)}
                className="text-gray-400 hover:text-black font-black text-xl"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs font-bold text-gray-800">
              <div>
                <label className="block text-gray-600 mb-1">카테고리 항목</label>
                <select
                  value={writeForm.category}
                  onChange={(e) => setWriteForm({ ...writeForm, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-black"
                >
                  <option value="문의">문의하기</option>
                  <option value="갤러리">갤러리</option>
                  <option value="요리대회">요리대회</option>
                  <option value="공지 사항">공지 사항 (관리자)</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-600 mb-1">작성자 이름</label>
                <input
                  type="text"
                  placeholder="작성자 성함 입력"
                  value={writeForm.author}
                  onChange={(e) => setWriteForm({ ...writeForm, author: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-gray-600 mb-1">글 제목</label>
                <input
                  type="text"
                  placeholder="제목을 입력하세요"
                  value={writeForm.title}
                  onChange={(e) => setWriteForm({ ...writeForm, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-gray-600 mb-1">글 내용</label>
                <textarea
                  rows="5"
                  placeholder="내용을 작성해주세요..."
                  value={writeForm.content}
                  onChange={(e) => setWriteForm({ ...writeForm, content: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-black resize-none"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowWriteModal(false)}
                className="px-5 py-2 bg-gray-200 text-gray-800 font-bold text-xs rounded-xl hover:bg-gray-300"
              >
                취소
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-black text-white font-black text-xs rounded-xl shadow-md hover:bg-gray-800 transition-colors"
              >
                등록하기
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}
