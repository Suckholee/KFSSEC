import React, { useState } from 'react';
import {
  ArrowLeft,
  Image as ImageIcon,
  Send,
  Save,
  Bold,
  Italic,
  List,
  Heading1,
  Heading2,
  Quote,
  Code,
  Link as LinkIcon,
  Tag,
  Eye,
  Edit3,
  CheckCircle2,
  Sparkles,
  HelpCircle,
  AlertCircle,
} from 'lucide-react';

export default function CommunityEditorPage({ onPublishPost, onCancel, currentUser }) {
  const [category, setCategory] = useState('문의');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState(['외식창업', '수강문의']);
  const [previewMode, setPreviewMode] = useState(false);
  const [isDraftSaved, setIsDraftSaved] = useState(false);

  // Preset cover image choices for quick selection
  const presetCoverImages = [
    { label: '조리 실습실', url: '/images/course_menu_dev.jpg' },
    { label: '세미나 현장', url: '/images/dir_1.jpg' },
    { label: '메뉴 개발', url: '/images/course_restaurant.jpg' },
    { label: '명인 요리', url: '/images/course_cafe.jpg' },
  ];

  const handleAddTag = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const cleaned = tagInput.trim().replace(/^#/, '');
      if (cleaned && !tags.includes(cleaned)) {
        setTags([...tags, cleaned]);
        setTagInput('');
      }
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const handleInsertFormat = (formatSymbol) => {
    setContent((prev) => prev + `\n${formatSymbol} `);
  };

  const handleSaveDraft = () => {
    setIsDraftSaved(true);
    setTimeout(() => setIsDraftSaved(false), 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('게시글 제목을 입력해 주세요.');
      return;
    }
    if (!content.trim()) {
      alert('게시글 본문 내용을 작성해 주세요.');
      return;
    }

    const categoryTypeMap = {
      '공지 사항': 'notice',
      '갤러리': 'gallery',
      '요리대회': 'competition',
      '문의': 'inquiry',
    };

    const newPost = {
      category,
      categoryType: categoryTypeMap[category] || 'inquiry',
      title,
      content,
      coverImage: coverImage || null,
      tags,
      author: currentUser?.name || '수강생 (회원)',
      date: new Date().toISOString().split('T')[0].replace(/-/g, '.'),
      views: 1,
    };

    onPublishPost(newPost);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-6 font-sans text-gray-900 animate-fadeIn">
      <div className="w-full px-4 sm:px-8 lg:px-12 max-w-6xl mx-auto space-y-6">
        
        {/* Top Header Bar with Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 sm:p-6 rounded-3xl border-2 border-black shadow-md">
          
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="p-2.5 bg-gray-100 hover:bg-black hover:text-white rounded-2xl transition-all cursor-pointer"
              title="게시판으로 돌아가기"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full uppercase">
                COMMUNITY BLOG EDITOR
              </span>
              <h1 className="text-2xl font-black text-black tracking-tight mt-1">
                새 게시글 작성
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Draft Save Status Indicator */}
            {isDraftSaved && (
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 flex items-center gap-1 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4" /> 임시 저장 완료!
              </span>
            )}

            {/* Toggle Preview Mode */}
            <button
              type="button"
              onClick={() => setPreviewMode(!previewMode)}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${
                previewMode
                  ? 'bg-black text-white'
                  : 'bg-stone-100 text-stone-800 hover:bg-stone-200'
              }`}
            >
              {previewMode ? <Edit3 className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              <span>{previewMode ? '편집기로 변경' : '미리보기'}</span>
            </button>

            {/* Save Draft */}
            <button
              type="button"
              onClick={handleSaveDraft}
              className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-black rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Save className="w-4 h-4 text-gray-600" />
              <span>임시저장</span>
            </button>

            {/* Publish Post Button */}
            <button
              type="button"
              onClick={handleSubmit}
              className="px-6 py-2.5 bg-black hover:bg-gray-800 text-white font-black text-xs sm:text-sm rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4 text-emerald-400" />
              <span>게시글 발행</span>
            </button>
          </div>

        </div>

        {/* Main Editor Body */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-black shadow-xl space-y-6">
          
          {/* 1. Category Selection & Cover Image Selector Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 pb-6 border-b border-gray-200">
            
            {/* Category Dropdown */}
            <div className="sm:col-span-4 space-y-2">
              <label className="block text-xs font-black text-gray-700">게시판 카테고리 선택</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 bg-stone-50 border-2 border-stone-300 rounded-2xl text-sm font-black text-black focus:outline-none focus:border-black shadow-xs cursor-pointer"
              >
                <option value="문의">문의하기</option>
                <option value="갤러리">갤러리</option>
                <option value="요리대회">요리대회</option>
                <option value="공지 사항">공지 사항 (관리자 전용)</option>
              </select>
            </div>

            {/* Preset Cover Image Selector */}
            <div className="sm:col-span-8 space-y-2">
              <label className="block text-xs font-black text-gray-700 flex items-center gap-1">
                <ImageIcon className="w-4 h-4 text-emerald-700" />
                <span>대표 사진/커버 이미지 선택</span>
              </label>
              <div className="flex flex-wrap items-center gap-2">
                {presetCoverImages.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCoverImage(coverImage === img.url ? '' : img.url)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border cursor-pointer flex items-center gap-1.5 ${
                      coverImage === img.url
                        ? 'bg-black text-white border-black font-black shadow-md'
                        : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                    }`}
                  >
                    <span>🖼️ {img.label}</span>
                    {coverImage === img.url && <span className="text-emerald-400">✓</span>}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Selected Cover Image Banner Display */}
          {coverImage && (
            <div className="relative h-48 sm:h-64 rounded-2xl overflow-hidden shadow-md bg-black border-2 border-black group">
              <img
                src={coverImage}
                alt="대표 커버 사진"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => setCoverImage('')}
                className="absolute top-3 right-3 bg-black/80 hover:bg-rose-600 text-white font-black text-xs px-3 py-1.5 rounded-xl border border-white/20 cursor-pointer"
              >
                커버 사진 제거 ✕
              </button>
            </div>
          )}

          {/* 2. Large Post Title Input */}
          <div className="pt-2">
            <input
              type="text"
              placeholder="제목을 입력하세요 (예: 1:1 수강생 커리큘럼 매칭 문의드립니다)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-2xl sm:text-4xl font-black text-black placeholder:text-gray-300 border-b-2 border-stone-300 pb-3 focus:outline-none focus:border-black transition-colors"
            />
          </div>

          {/* 3. Tags Input Bar */}
          <div className="flex flex-wrap items-center gap-2 pt-1 pb-4">
            <div className="flex items-center gap-1.5 text-xs font-black text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
              <Tag className="w-3.5 h-3.5" />
              <span>태그</span>
            </div>

            {tags.map((tag, idx) => (
              <span
                key={idx}
                className="bg-stone-100 hover:bg-stone-200 text-stone-900 font-bold text-xs px-3 py-1.5 rounded-xl border border-stone-300 flex items-center gap-1.5 cursor-pointer"
                onClick={() => handleRemoveTag(tag)}
                title="태그 삭제"
              >
                #{tag} <span className="text-gray-400 hover:text-rose-600">✕</span>
              </span>
            ))}

            <input
              type="text"
              placeholder="태그 입력 후 Enter (예: 외식창업)"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleAddTag}
              className="px-3 py-1.5 border border-stone-300 rounded-xl text-xs font-bold focus:outline-none focus:border-black w-48"
            />
          </div>

          {/* 4. Famous Rich Editor Toolbar */}
          {!previewMode && (
            <div className="flex flex-wrap items-center gap-1 bg-stone-100 p-2 rounded-2xl border border-stone-300 shadow-xs">
              <button
                type="button"
                onClick={() => handleInsertFormat('###')}
                className="p-2 hover:bg-white text-gray-700 hover:text-black rounded-xl font-bold text-xs flex items-center gap-1 cursor-pointer"
                title="제목 1"
              >
                <Heading1 className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => handleInsertFormat('####')}
                className="p-2 hover:bg-white text-gray-700 hover:text-black rounded-xl font-bold text-xs flex items-center gap-1 cursor-pointer"
                title="제목 2"
              >
                <Heading2 className="w-4 h-4" />
              </button>

              <span className="w-px h-5 bg-stone-300 mx-1" />

              <button
                type="button"
                onClick={() => handleInsertFormat('**굵게**')}
                className="p-2 hover:bg-white text-gray-700 hover:text-black rounded-xl font-bold text-xs cursor-pointer"
                title="굵게"
              >
                <Bold className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => handleInsertFormat('*기울임*')}
                className="p-2 hover:bg-white text-gray-700 hover:text-black rounded-xl font-bold text-xs cursor-pointer"
                title="기울임"
              >
                <Italic className="w-4 h-4" />
              </button>

              <span className="w-px h-5 bg-stone-300 mx-1" />

              <button
                type="button"
                onClick={() => handleInsertFormat('> 인용구')}
                className="p-2 hover:bg-white text-gray-700 hover:text-black rounded-xl font-bold text-xs cursor-pointer"
                title="인용구"
              >
                <Quote className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => handleInsertFormat('- ')}
                className="p-2 hover:bg-white text-gray-700 hover:text-black rounded-xl font-bold text-xs cursor-pointer"
                title="글머리 기호"
              >
                <List className="w-4 h-4" />
              </button>

              <span className="w-px h-5 bg-stone-300 mx-1" />

              <button
                type="button"
                onClick={() => handleInsertFormat('```\n코드\n```')}
                className="p-2 hover:bg-white text-gray-700 hover:text-black rounded-xl font-bold text-xs cursor-pointer"
                title="코드 블록"
              >
                <Code className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* 5. Main Content Text Area or Live Preview Mode */}
          {!previewMode ? (
            <textarea
              rows="14"
              placeholder="내용을 마음껏 작성해주세요. (질문, 후기, 메뉴 레시피, 창업 문의 등)"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-6 bg-stone-50 border-2 border-stone-300 rounded-3xl text-sm sm:text-base font-medium text-black focus:outline-none focus:border-black resize-none leading-relaxed shadow-inner"
            />
          ) : (
            <div className="p-6 bg-stone-50 border-2 border-black rounded-3xl space-y-4 min-h-[360px]">
              <div className="border-b border-stone-300 pb-3">
                <span className="text-xs font-black text-rose-600 bg-rose-100 px-3 py-1 rounded-full">
                  {category}
                </span>
                <h2 className="text-2xl font-black text-black pt-2">{title || '제목 없음'}</h2>
              </div>
              <div className="text-sm font-medium text-gray-800 whitespace-pre-wrap leading-relaxed">
                {content || '본문 내용이 없습니다.'}
              </div>
            </div>
          )}

          {/* 6. Footer Author Info Notice */}
          <div className="pt-4 border-t border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-gray-500 font-bold gap-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>작성자: <strong className="text-black font-black">{currentUser?.name || '수강생 회원'}</strong> (로그인 세션 인증 완료)</span>
            </div>
            <span>사단법인 한국외식창업교육원 운영 정책 준수</span>
          </div>

        </div>

      </div>
    </div>
  );
}
