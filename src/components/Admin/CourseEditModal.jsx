import React, { useState, useEffect, useRef } from 'react';
import { X, Image as ImageIcon, Save, Upload, Sparkles, Tag, DollarSign, UserCheck, CheckCircle2, Clock } from 'lucide-react';
import CoursePosterGeneratorModal from './CoursePosterGeneratorModal';

export default function CourseEditModal({ isOpen, course, onClose, onSaveCourse }) {
  const fileInputRef = useRef(null);
  const [posterModalOpen, setPosterModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    id: '',
    category: 'startup',
    categoryName: '외식창업',
    title: '',
    instructor: '',
    price: '',
    duration: '6주',
    format: '온·오프라인 병행',
    studentsCount: 0,
    thumbnail: '/images/qualifications/advisor.jpg',
    desc: '',
    fitMode: 'contain',
  });

  const presetThumbnails = [
    { label: '외식창업지도사 포스터', url: '/images/qualifications/advisor.jpg' },
    { label: '외식창업실무사 포스터', url: '/images/qualifications/practice.jpg' },
    { label: '한국음식능력 K-FOOD 포스터', url: '/images/qualifications/kfood.jpg' },
  ];

  useEffect(() => {
    if (course) {
      setFormData({
        id: course.id || `qualification-${Date.now().toString().slice(-4)}`,
        category: course.category || 'startup',
        categoryName: course.categoryName || (course.category === 'management' ? '외식실무' : course.category === 'hansik' ? '한국음식' : course.category === 'foodtech' ? '푸드테크' : course.category === 'beverage' ? '식음료' : '외식창업'),
        title: course.title || '',
        instructor: course.instructor || '',
        price: course.price != null ? (typeof course.price === 'number' ? `${course.price.toLocaleString()}원` : course.price) : '',
        duration: course.duration || '6주',
        format: course.format || '온·오프라인 병행',
        studentsCount: course.studentsCount || 45,
        thumbnail: course.thumbnail || course.image || '/images/qualifications/advisor.jpg',
        desc: course.desc || course.description || '',
        fitMode: course.fitMode || 'contain',
      });
    } else {
      setFormData({
        id: `qualification-${Date.now().toString().slice(-4)}`,
        category: 'startup',
        categoryName: '외식창업',
        title: '',
        instructor: '진익준 교수 / 안형상 이사장',
        price: '',
        duration: '6주 (실전 프로젝트)',
        format: '온·오프라인 병행',
        studentsCount: 0,
        thumbnail: '/images/qualifications/advisor.jpg',
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
    let catName = '외식창업';
    if (val === 'startup') catName = '외식창업';
    if (val === 'management') catName = '외식실무';
    if (val === 'hansik') catName = '한국음식';
    if (val === 'foodtech') catName = '푸드테크';
    if (val === 'beverage') catName = '식음료';
    if (val === 'full-package') catName = '풀 패키지';

    setFormData({ ...formData, category: val, categoryName: catName });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('교육과정 제목을 입력해 주세요.');
      return;
    }
    
    const finalCourse = {
      ...course,
      ...formData,
      image: formData.thumbnail,
      description: formData.desc,
      price: formData.price.trim() || null,
      priceFormatted: formData.price.trim() || '수강료 문의',
    };
    // Purge obsolete discount & strikethrough price keys
    delete finalCourse.originalPrice;
    delete finalCourse.discount;
    delete finalCourse.discountRate;

    onSaveCourse(finalCourse);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#F8FAF9] rounded-3xl border border-[#CDE5D7] p-6 sm:p-8 shadow-2xl space-y-6 text-gray-900 max-h-[90vh] overflow-y-auto no-scrollbar">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-gray-400 hover:text-[#153D28] rounded-full hover:bg-[#E3F2E9] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Title */}
        <div className="border-b border-[#D8ECE0] pb-4 space-y-1">
          <span className="px-2.5 py-0.5 rounded-full bg-[#E5F5EC] text-[#1E5D3B] border border-[#BEDECB] text-xs font-black">
            KFSSEC CURRICULUM MANAGEMENT
          </span>
          <h2 className="text-2xl font-black text-[#153D28] mt-1">
            {course ? '교육 과정 정보 수정' : '신규 교육 과정 등록'}
          </h2>
          <p className="text-xs text-[#3E7356] font-medium">
            과정명, 담당 교수진, 교육 형태, 교육 기간, 수강료 및 포스터 이미지를 등록하고 수정합니다.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Thumbnail Photo Upload & Fit Mode Section */}
          <div className="space-y-4 bg-white p-5 rounded-2xl border border-[#D5EADF] shadow-xs">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[#1E5D3B] flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-[#2E7E56]" />
                <span>대표 썸네일 이미지 업로드 & 비율 (잘림 방지)</span>
              </label>

              {/* Fit Mode Switcher */}
              <div className="flex items-center gap-1 bg-[#EEF7F2] p-1 rounded-xl border border-[#CCE6D7]">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, fitMode: 'contain' })}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                    formData.fitMode === 'contain'
                      ? 'bg-[#2B7752] text-white shadow-xs'
                      : 'text-[#3E7557] hover:text-[#184F34]'
                  }`}
                >
                  원본 비율 보존 (권장)
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, fitMode: 'cover' })}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                    formData.fitMode === 'cover'
                      ? 'bg-[#2B7752] text-white shadow-xs'
                      : 'text-[#3E7557] hover:text-[#184F34]'
                  }`}
                >
                  꽉 채우기
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="w-full sm:w-48 h-36 rounded-xl overflow-hidden bg-slate-100 border border-[#CCE6D7] shrink-0 relative shadow-xs flex items-center justify-center p-1">
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
              </div>

              <div className="flex-1 space-y-3 w-full">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/*"
                  className="hidden"
                />
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setPosterModalOpen(true)}
                    className="px-3.5 py-2.5 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-200 text-stone-950 font-black text-xs sm:text-sm rounded-xl shadow-xs transition-all cursor-pointer flex items-center gap-1.5 active:scale-95"
                  >
                    <Sparkles className="w-4 h-4 text-stone-950" />
                    <span>🎨 AI 포스터 생성</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2.5 bg-[#2B7752] hover:bg-[#205E40] text-white font-black text-xs sm:text-sm rounded-xl shadow-xs transition-all cursor-pointer flex items-center gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    <span>📁 내 PC에서 업로드</span>
                  </button>
                </div>

                <input
                  type="text"
                  value={formData.thumbnail}
                  onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                  placeholder="또는 이미지 경로/URL 입력"
                  className="w-full bg-[#F3FAF5] border border-[#CCE6D7] rounded-xl px-3 py-2 text-xs text-[#1E5D3B] font-mono focus:outline-none focus:border-[#2B7752] focus:bg-white"
                />
              </div>
            </div>
          </div>

          {/* Form Fields Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="space-y-1 sm:col-span-2">
              <label className="font-extrabold text-[#1B5237]">교육 과정명 (제목)</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="예: 외식창업 마스터 풀 패키지"
                className="w-full bg-[#F3FAF5] border border-[#CCE6D7] rounded-xl px-3.5 py-2.5 text-gray-900 font-black focus:outline-none focus:border-[#2B7752] focus:bg-white transition-colors"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="font-extrabold text-[#1B5237]">카테고리 분류</label>
              <select
                value={formData.category}
                onChange={handleCategoryChange}
                className="w-full bg-[#F3FAF5] border border-[#CCE6D7] rounded-xl px-3.5 py-2.5 text-gray-900 font-bold focus:outline-none focus:border-[#2B7752] focus:bg-white transition-colors"
              >
                <option value="startup">외식창업 (지도사)</option>
                <option value="management">외식실무 (실무사)</option>
                <option value="hansik">한국음식 (K-FOOD)</option>
                <option value="foodtech">푸드테크 (스마트주방)</option>
                <option value="beverage">식음료·소믈리에</option>
                <option value="full-package">풀 패키지</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-extrabold text-[#1B5237]">담당 명인 / 강사명</label>
              <input
                type="text"
                value={formData.instructor}
                onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                placeholder="예: 안형상 이사장 외 명장진"
                className="w-full bg-[#F3FAF5] border border-[#CCE6D7] rounded-xl px-3.5 py-2.5 text-gray-900 font-bold focus:outline-none focus:border-[#2B7752] focus:bg-white transition-colors"
              />
            </div>

            {/* Duration Input */}
            <div className="space-y-1">
              <label className="font-extrabold text-[#1B5237]">교육 기간</label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                placeholder="예: 6주 (실전 프로젝트), 4주 이내"
                className="w-full bg-[#F3FAF5] border border-[#CCE6D7] rounded-xl px-3.5 py-2.5 text-gray-900 font-bold focus:outline-none focus:border-[#2B7752] focus:bg-white transition-colors"
              />
            </div>

            {/* Format Input */}
            <div className="space-y-1">
              <label className="font-extrabold text-[#1B5237]">교육 진행 형태</label>
              <select
                value={formData.format}
                onChange={(e) => setFormData({ ...formData, format: e.target.value })}
                className="w-full bg-[#F3FAF5] border border-[#CCE6D7] rounded-xl px-3.5 py-2.5 text-gray-900 font-bold focus:outline-none focus:border-[#2B7752] focus:bg-white transition-colors"
              >
                <option value="온라인">온라인</option>
                <option value="온·오프라인 병행">온·오프라인 병행</option>
                <option value="실기 현장실습">실기 현장실습</option>
              </select>
            </div>

            {/* Price Input (Optional Single Field) */}
            <div className="space-y-1 sm:col-span-2">
              <label className="font-extrabold text-[#1B5237]">수강료 (선택사항)</label>
              <input
                type="text"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="예: 500,000원 (비워둘 시 '수강료 문의'로 깔끔하게 표시됩니다)"
                className="w-full bg-[#F3FAF5] border border-[#CCE6D7] rounded-xl px-3.5 py-2.5 text-gray-900 font-bold focus:outline-none focus:border-[#2B7752] focus:bg-white transition-colors"
              />
              <p className="text-[11px] text-gray-500">
                💡 별도 금액이 없거나 상담 후 결정되는 경우 비워두시면 사이트에 <strong>'수강료 문의'</strong>로 정돈되어 표기됩니다.
              </p>
            </div>

            <div className="space-y-1 sm:col-span-2">
              <label className="font-extrabold text-[#1B5237]">교육 과정 요약 설명문구</label>
              <textarea
                value={formData.desc}
                onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                rows={3}
                placeholder="과정에 대한 상세 설명문구를 입력하세요."
                className="w-full bg-[#F3FAF5] border border-[#CCE6D7] rounded-xl p-3 text-xs sm:text-sm text-gray-900 font-medium focus:outline-none focus:border-[#2B7752] focus:bg-white leading-relaxed transition-colors"
              />
            </div>
          </div>

          {/* Submit Action Buttons */}
          <div className="pt-3 border-t border-[#D8ECE0] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#2B7752] hover:bg-[#205E40] text-white font-black text-xs sm:text-sm rounded-xl shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>저장하기</span>
            </button>
          </div>

        </form>

        {/* AI Course Poster Generator Modal */}
        <CoursePosterGeneratorModal
          isOpen={posterModalOpen}
          course={{
            title: formData.title,
            categoryName: formData.categoryName,
            desc: formData.desc,
            description: formData.desc,
            instructor: formData.instructor,
            price: formData.price || '수강료 문의',
            duration: formData.duration,
            format: formData.format,
            startDate: '2026.10.05',
          }}
          onClose={() => setPosterModalOpen(false)}
          onApplyPoster={(dataUrl) => {
            setFormData((prev) => ({
              ...prev,
              thumbnail: dataUrl,
            }));
          }}
        />

      </div>
    </div>
  );
}
