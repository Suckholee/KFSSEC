import React, { useState, useEffect } from 'react';
import { X, Image, Save, Sparkles, Tag, DollarSign, UserCheck, CheckCircle2 } from 'lucide-react';

export default function CourseEditModal({ isOpen, course, onClose, onSaveCourse }) {
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
      });
    }
  }, [course, isOpen]);

  if (!isOpen) return null;

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
            COURSE CONTENT & MEDIA EDITOR
          </span>
          <h2 className="text-2xl font-black text-white">
            {course ? '교육과정 썸네일 사진 및 문구 수정' : '신규 교육과정 등록'}
          </h2>
          <p className="text-xs text-emerald-300/80 font-medium">
            홈페이지 갤러리에 실제 노출될 썸네일 이미지, 대표 문구, 수강료 및 강사 정보를 수정합니다.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Thumbnail Image Section */}
          <div className="space-y-3 bg-[#111c16] p-4 rounded-2xl border border-emerald-500/20">
            <label className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
              <Image className="w-4 h-4 text-emerald-400" />
              <span>대표 썸네일 이미지 설정 및 프리뷰</span>
            </label>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              {/* Image Preview Box */}
              <div className="w-full sm:w-40 h-28 rounded-xl overflow-hidden bg-emerald-950 border border-emerald-500/40 shrink-0 relative shadow-md">
                <img
                  src={formData.thumbnail}
                  alt="썸네일 프리뷰"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = '/images/package_card_1.png';
                  }}
                />
                <span className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-black/70 rounded text-[10px] font-mono text-emerald-300">
                  PREVIEW
                </span>
              </div>

              {/* Image Input & Presets */}
              <div className="flex-1 space-y-2 w-full">
                <input
                  type="text"
                  value={formData.thumbnail}
                  onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                  placeholder="이미지 파일 경로 또는 URL 입력 (예: /images/package_card_1.png)"
                  className="w-full bg-[#16241c] border border-emerald-500/30 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-emerald-400"
                />

                <div className="space-y-1">
                  <span className="text-[11px] text-gray-400 font-bold block">빠른 프리셋 사진 선택:</span>
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
