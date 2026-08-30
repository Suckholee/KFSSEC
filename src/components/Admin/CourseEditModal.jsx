import React, { useState, useEffect, useRef } from 'react';
import { X, Image as ImageIcon, Save, Upload, Sparkles, Tag, DollarSign, UserCheck, CheckCircle2, RefreshCw } from 'lucide-react';

export default function CourseEditModal({ isOpen, course, onClose, onSaveCourse }) {
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    id: '',
    category: 'full-package',
    categoryName: '풀 패키지',
    title: '',
    instructor: '',
    price: '',
    discount: '20% OFF',
    studentsCount: 0,
    thumbnail: '/images/package_card_1.png',
    desc: '',
    fitMode: 'contain', // 'contain' | 'cover'
  });

  const presetThumbnails = [
    { label: '패키지 1 (마스터)', url: '/images/package_card_1.png' },
    { label: '패키지 2 (메뉴개발)', url: '/images/package_card_2.png' },
    { label: '패키지 3 (매장운영)', url: '/images/package_card_3.png' },
    { label: '패키지 4 (마케팅)', url: '/images/package_card_4.png' },
    { label: '행동교정 1', url: '/images/behavior_card_1.jpg' },
    { label: '펫푸드 1', url: '/images/petfood_card_1.jpg' },
    { label: '창업전략 1', url: '/images/startup_card_1.jpg' },
    { label: '비전 세미나 1', url: '/images/dir_1.jpg' },
  ];

  useEffect(() => {
    if (course) {
      setFormData({
        id: course.id || `CRS-${Date.now().toString().slice(-3)}`,
        category: course.category || 'full-package',
        categoryName: course.categoryName || '풀 패키지',
        title: course.title || '',
        instructor: course.instructor || '',
        price: course.price || '',
        discount: course.discount || '20% OFF',
        studentsCount: course.studentsCount || 0,
        thumbnail: course.thumbnail || '/images/package_card_1.png',
        desc: course.desc || '',
        fitMode: course.fitMode || 'contain',
      });
    } else {
      setFormData({
        id: `CRS-${Date.now().toString().slice(-3)}`,
        category: 'full-package',
        categoryName: '풀 패키지',
        title: '',
        instructor: '안형상 이사장 외 명장진',
        price: '1,000,000원',
        discount: '20% OFF',
        studentsCount: 0,
        thumbnail: '/images/package_card_1.png',
        desc: '',
        fitMode: 'contain',
      });
    }
  }, [course, isOpen]);

  if (!isOpen) return null;

  // Handle Direct File Upload from PC (Base64 Reader)
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 업로드할 수 있습니다.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setFormData((prev) => ({
          ...prev,
          thumbnail: event.target.result,
        }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleCategoryChange = (e) => {
    const val = e.target.value;
    let catName = '풀 패키지';
    if (val === 'behavior') catName = '행동교정';
    if (val === 'petfood') catName = '펫푸드';
    if (val === 'startup') catName = '창업전략';
    if (val === 'netflix') catName = '인기 클래스';

    setFormData({ ...formData, category: val, categoryName: catName });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('교육과정 제목을 입력해 주세요.');
      return;
    }
    onSaveCourse(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#0d1712] rounded-3xl border border-emerald-500/40 p-6 sm:p-8 shadow-2xl space-y-6 text-white max-h-[90vh] overflow-y-auto no-scrollbar">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-gray-400 hover:text-white rounded-full hover:bg-emerald-950/60 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Title */}
        <div className="border-b border-emerald-900/60 pb-4 space-y-1">
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-black">
            COURSE MEDIA & FILE UPLOADER
          </span>
          <h2 className="text-2xl font-black text-white">
            {course ? '교육과정 사진 업로드 및 문구 수정' : '신규 교육과정 등록'}
          </h2>
          <p className="text-xs text-emerald-300/80 font-medium">
            PC에서 실제 사진을 직접 업로드하거나 URL을 지정하여 100% 잘림 없이 선명하게 노출시킵니다.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Thumbnail Photo Upload & Fit Mode Section */}
          <div className="space-y-4 bg-[#111c16] p-5 rounded-2xl border border-emerald-500/20">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-emerald-400" />
                <span>대표 썸네일 이미지 업로드 & 비율 (잘림 방지)</span>
              </label>

              {/* Fit Mode Switcher */}
              <div className="flex items-center gap-1 bg-[#16241c] p-1 rounded-xl border border-emerald-500/30">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, fitMode: 'contain' })}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                    formData.fitMode === 'contain'
                      ? 'bg-emerald-500 text-white shadow-xs'
                      : 'text-gray-400 hover:text-white'
                  }`}
                  title="사진 전체 원본 비율 보존 (잘림 없음)"
                >
                  원본 비율 보존 (권장)
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, fitMode: 'cover' })}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                    formData.fitMode === 'cover'
                      ? 'bg-emerald-500 text-white shadow-xs'
                      : 'text-gray-400 hover:text-white'
                  }`}
                  title="꽉 찬 채우기"
                >
                  꽉 채우기
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              {/* Image Preview Box - Unclipped 100% Full View */}
              <div className="w-full sm:w-48 h-36 rounded-xl overflow-hidden bg-black border border-emerald-500/40 shrink-0 relative shadow-md flex items-center justify-center p-1">
                <img
                  src={formData.thumbnail}
                  alt="썸네일 프리뷰"
                  className={`w-full h-full ${
                    formData.fitMode === 'cover' ? 'object-cover object-top' : 'object-contain object-center'
                  }`}
                  onError={(e) => {
                    e.target.src = '/images/package_card_1.png';
                  }}
                />
                <span className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-black/80 rounded text-[10px] font-mono text-emerald-300 border border-emerald-500/30">
                  PREVIEW
                </span>
              </div>

              {/* Direct PC File Upload Button & URL Input */}
              <div className="flex-1 space-y-3 w-full">
                {/* File Upload Button */}
                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs sm:text-sm rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    <span>📁 내 PC에서 사진 업로드</span>
                  </button>

                  <span className="text-[11px] text-gray-400 font-medium">
                    (JPG, PNG, WEBP 지원)
                  </span>
                </div>

                <input
                  type="text"
                  value={formData.thumbnail}
                  onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                  placeholder="또는 이미지 경로/URL 입력"
                  className="w-full bg-[#16241c] border border-emerald-500/30 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-emerald-400"
                />

                <div className="space-y-1">
                  <span className="text-[11px] text-gray-400 font-bold block">기본 샘플 사진 선택:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {presetThumbnails.map((pt, pIdx) => (
                      <button
                        key={pIdx}
                        type="button"
                        onClick={() => setFormData({ ...formData, thumbnail: pt.url })}
                        className={`px-2 py-1 rounded-lg text-[11px] font-bold border transition-all cursor-pointer ${
                          formData.thumbnail === pt.url
                            ? 'bg-emerald-500 text-white border-emerald-400'
                            : 'bg-[#16241c] text-gray-300 border-emerald-900/60 hover:border-emerald-500'
                        }`}
                      >
                        {pt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Fields Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="space-y-1 sm:col-span-2">
              <label className="font-extrabold text-emerald-300">교육 과정명 (제목)</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="예: 외식창업 마스터 풀 패키지"
                className="w-full bg-[#16241c] border border-emerald-500/30 rounded-xl px-3.5 py-2.5 text-white font-black focus:outline-none focus:border-emerald-400"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="font-extrabold text-emerald-300">카테고리 분류</label>
              <select
                value={formData.category}
                onChange={handleCategoryChange}
                className="w-full bg-[#16241c] border border-emerald-500/30 rounded-xl px-3.5 py-2.5 text-white font-bold focus:outline-none focus:border-emerald-400"
              >
                <option value="full-package">풀 패키지</option>
                <option value="behavior">행동교정</option>
                <option value="petfood">펫푸드</option>
                <option value="startup">창업전략</option>
                <option value="netflix">인기 클래스</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-extrabold text-emerald-300">담당 명인 / 강사명</label>
              <input
                type="text"
                value={formData.instructor}
                onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                placeholder="예: 안형상 이사장 외 명장진"
                className="w-full bg-[#16241c] border border-emerald-500/30 rounded-xl px-3.5 py-2.5 text-white font-bold focus:outline-none focus:border-emerald-400"
              />
            </div>

            <div className="space-y-1">
              <label className="font-extrabold text-emerald-300">수강료 (가격)</label>
              <input
                type="text"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="예: 1,200,000원"
                className="w-full bg-[#16241c] border border-emerald-500/30 rounded-xl px-3.5 py-2.5 text-white font-black focus:outline-none focus:border-emerald-400"
              />
            </div>

            <div className="space-y-1">
              <label className="font-extrabold text-emerald-300">할인 / 혜택 뱃지 텍스트</label>
              <input
                type="text"
                value={formData.discount}
                onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                placeholder="예: 20% OFF, BEST, NEW"
                className="w-full bg-[#16241c] border border-emerald-500/30 rounded-xl px-3.5 py-2.5 text-white font-bold focus:outline-none focus:border-emerald-400"
              />
            </div>

            <div className="space-y-1 sm:col-span-2">
              <label className="font-extrabold text-emerald-300">교육 과정 요약 설명문구</label>
              <textarea
                value={formData.desc}
                onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                rows={3}
                placeholder="과정에 대한 상세 설명문구를 입력하세요."
                className="w-full bg-[#16241c] border border-emerald-500/30 rounded-xl p-3 text-xs sm:text-sm text-white font-medium focus:outline-none focus:border-emerald-400 leading-relaxed"
              />
            </div>
          </div>

          {/* Submit Action Buttons */}
          <div className="pt-3 border-t border-emerald-900/60 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-300 font-bold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs sm:text-sm rounded-xl shadow-lg transition-all cursor-pointer flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>변경사항 저장하기</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
