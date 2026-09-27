import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Camera,
  Upload,
  Loader2,
  MapPin,
  CheckCircle2,
  Sparkles,
  Star,
  Bold,
  Quote,
  Clipboard,
  Link as LinkIcon,
  Edit3,
  Eye,
} from 'lucide-react';
import { renderRichContent } from '../common/RichContentRenderer';

export default function GalleryEditorModal({
  isOpen,
  isEdit = false,
  initialData,
  onSave,
  onClose,
}) {
  const [formData, setFormData] = useState({
    title: '',
    category: 'training',
    date: new Date().toISOString().slice(0, 10).replace(/-/g, '.'),
    location: '서울 본원 실습실',
    image: '',
    images: [],
    content: '',
  });

  const [urlInput, setUrlInput] = useState('');
  const [contentTab, setContentTab] = useState('write'); // 'write' | 'preview'
  const [clipboardToast, setClipboardToast] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgressText, setUploadProgressText] = useState('');
  const [uploadError, setUploadError] = useState('');

  const fileInputRef = useRef(null);
  const inlineImageInputRef = useRef(null);
  const textareaRef = useRef(null);

  // Sync initial data when modal opens
  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        const existingImages = Array.isArray(initialData.images) && initialData.images.length > 0
          ? initialData.images
          : (initialData.image ? [initialData.image] : []);
        setFormData({
          title: initialData.title || '',
          category: initialData.category || 'training',
          date: initialData.date || new Date().toISOString().slice(0, 10).replace(/-/g, '.'),
          location: initialData.location || '서울 본원 실습실',
          image: initialData.image || existingImages[0] || '',
          images: existingImages,
          content: initialData.content || initialData.desc || '',
        });
      } else {
        setFormData({
          title: '',
          category: 'training',
          date: new Date().toISOString().slice(0, 10).replace(/-/g, '.'),
          location: '서울 본원 실습실',
          image: '',
          images: [],
          content: '',
        });
      }
      setUrlInput('');
      setContentTab('write');
      setClipboardToast('');
      setUploadError('');
      setUploadProgressText('');
    }
  }, [isOpen, initialData]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Handle Clipboard Paste (detects copied images)
  const handlePasteEvent = async (e, isContentArea = false) => {
    const clipboardData = e.clipboardData;
    if (!clipboardData) return;

    const items = Array.from(clipboardData.items || []);
    const imageItems = items.filter((item) => item.type.indexOf('image') !== -1);
    if (imageItems.length === 0) return;

    e.preventDefault();
    setIsUploading(true);
    setUploadProgressText('클립보드 이미지 업로드 중…');
    setUploadError('');

    try {
      const uploadedUrls = [];
      for (let i = 0; i < imageItems.length; i++) {
        const file = imageItems[i].getAsFile();
        if (!file) continue;

        const base64Data = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = () => reject(new Error('클립보드 이미지를 읽는 데 실패했습니다.'));
          reader.readAsDataURL(file);
        });

        try {
          const response = await fetch('/api/upload', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              imageBase64: base64Data,
              fileName: `clipboard_${Date.now()}_${i}.png`,
            }),
          });
          const result = await response.json();
          if (response.ok && result.success && result.url) {
            uploadedUrls.push(result.url);
          } else {
            uploadedUrls.push(base64Data);
          }
        } catch (err) {
          console.warn('Fallback to base64 for clipboard image:', err);
          uploadedUrls.push(base64Data);
        }
      }

      if (uploadedUrls.length === 0) return;

      if (isContentArea) {
        const insertMarkdown = uploadedUrls.map((url) => `\n![현장 사진](${url})\n`).join('');
        const textarea = textareaRef.current;
        if (textarea) {
          const start = textarea.selectionStart ?? formData.content.length;
          const end = textarea.selectionEnd ?? formData.content.length;
          const prevContent = formData.content || '';
          const newContent =
            prevContent.substring(0, start) + insertMarkdown + prevContent.substring(end);
          setFormData((prev) => ({
            ...prev,
            content: newContent,
            images: [...(prev.images || []), ...uploadedUrls],
            image: prev.image || uploadedUrls[0] || '',
          }));
          setTimeout(() => {
            textarea.focus();
            const nextCursor = start + insertMarkdown.length;
            textarea.setSelectionRange(nextCursor, nextCursor);
          }, 50);
        } else {
          setFormData((prev) => ({
            ...prev,
            content: (prev.content || '') + insertMarkdown,
            images: [...(prev.images || []), ...uploadedUrls],
            image: prev.image || uploadedUrls[0] || '',
          }));
        }
        setClipboardToast('📋 클립보드 이미지를 본문 커서 위치에 삽입했습니다!');
      } else {
        setFormData((prev) => {
          const nextImages = [...(prev.images || []), ...uploadedUrls];
          return {
            ...prev,
            images: nextImages,
            image: prev.image || nextImages[0] || '',
          };
        });
        setClipboardToast(
          `📋 클립보드 이미지 ${uploadedUrls.length}장을 갤러리 사진 목록에 추가했습니다!`
        );
      }
    } catch (err) {
      setUploadError(err.message || '클립보드 이미지 처리 중 오류 발생');
    } finally {
      setIsUploading(false);
      setUploadProgressText('');
      setTimeout(() => setClipboardToast(''), 4000);
    }
  };

  // Upload Multiple Photo Files from PC
  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const oversized = files.filter((f) => f.size > 10 * 1024 * 1024);
    if (oversized.length > 0) {
      setUploadError('각 사진의 용량은 10MB 이하여야 합니다.');
      return;
    }

    setIsUploading(true);
    setUploadError('');

    try {
      const uploadedUrls = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        setUploadProgressText(`사진 업로드 중… (${i + 1}/${files.length})`);

        const base64Data = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = () => reject(new Error('파일 읽기 오류'));
          reader.readAsDataURL(file);
        });

        try {
          const response = await fetch('/api/upload', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ imageBase64: base64Data, fileName: file.name }),
          });

          const result = await response.json();
          if (response.ok && result.success && result.url) {
            uploadedUrls.push(result.url);
          } else {
            uploadedUrls.push(base64Data);
          }
        } catch (err) {
          console.warn('Fallback to base64 for image:', file.name, err);
          uploadedUrls.push(base64Data);
        }
      }

      setFormData((prev) => {
        const nextImages = [...(prev.images || []), ...uploadedUrls];
        return {
          ...prev,
          images: nextImages,
          image: prev.image || nextImages[0] || '',
        };
      });
    } catch (err) {
      setUploadError(err.message || '사진 업로드 중 오류가 발생했습니다.');
    } finally {
      setIsUploading(false);
      setUploadProgressText('');
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  // Add Direct URL
  const handleAddUrl = (e) => {
    e?.preventDefault();
    if (!urlInput.trim()) return;
    setFormData((prev) => {
      const nextImages = [...(prev.images || []), urlInput.trim()];
      return {
        ...prev,
        images: nextImages,
        image: prev.image || nextImages[0] || '',
      };
    });
    setUrlInput('');
  };

  // Set Cover Photo
  const handleSetCover = (imgUrl) => {
    setFormData((prev) => ({
      ...prev,
      image: imgUrl,
    }));
  };

  // Remove Photo from List
  const handleRemoveImage = (indexToRemove) => {
    setFormData((prev) => {
      const targetUrl = prev.images[indexToRemove];
      const nextImages = prev.images.filter((_, idx) => idx !== indexToRemove);
      let nextCover = prev.image;
      if (nextCover === targetUrl) {
        nextCover = nextImages[0] || '';
      }
      return {
        ...prev,
        images: nextImages,
        image: nextCover,
      };
    });
  };

  // Insert Inline Image from PC into Text Content
  const handleInsertContentImage = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadProgressText('본문 삽입 이미지 업로드 중…');
    setUploadError('');

    try {
      const base64Data = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(new Error('파일 읽기 실패'));
        reader.readAsDataURL(file);
      });

      let uploadedUrl = base64Data;
      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ imageBase64: base64Data, fileName: file.name }),
        });
        const result = await response.json();
        if (response.ok && result.success && result.url) {
          uploadedUrl = result.url;
        }
      } catch (err) {
        console.warn('Fallback to base64:', err);
      }

      const insertMarkdown = `\n![현장 사진](${uploadedUrl})\n`;
      const textarea = textareaRef.current;
      if (textarea) {
        const start = textarea.selectionStart ?? formData.content.length;
        const end = textarea.selectionEnd ?? formData.content.length;
        const prevContent = formData.content || '';
        const newContent =
          prevContent.substring(0, start) + insertMarkdown + prevContent.substring(end);
        setFormData((prev) => ({
          ...prev,
          content: newContent,
          images: [...(prev.images || []), uploadedUrl],
          image: prev.image || uploadedUrl,
        }));
        setTimeout(() => {
          textarea.focus();
          const nextCursor = start + insertMarkdown.length;
          textarea.setSelectionRange(nextCursor, nextCursor);
        }, 50);
      } else {
        setFormData((prev) => ({
          ...prev,
          content: (prev.content || '') + insertMarkdown,
          images: [...(prev.images || []), uploadedUrl],
          image: prev.image || uploadedUrl,
        }));
      }
      setClipboardToast('📷 본문 커서 위치에 이미지가 삽입되었습니다.');
    } catch (err) {
      setUploadError(err.message || '이미지 삽입 실패');
    } finally {
      setIsUploading(false);
      setUploadProgressText('');
      if (inlineImageInputRef.current) inlineImageInputRef.current.value = '';
      setTimeout(() => setClipboardToast(''), 4000);
    }
  };

  // Insert Inline Image URL into Text Content
  const handleInsertContentUrl = () => {
    const url = prompt('본문에 삽입할 이미지 웹 링크(URL)를 입력하세요:', 'https://');
    if (!url || !url.trim() || url === 'https://') return;

    const cleanUrl = url.trim();
    const insertMarkdown = `\n![현장 사진](${cleanUrl})\n`;
    const textarea = textareaRef.current;
    if (textarea) {
      const start = textarea.selectionStart ?? formData.content.length;
      const end = textarea.selectionEnd ?? formData.content.length;
      const prevContent = formData.content || '';
      const newContent =
        prevContent.substring(0, start) + insertMarkdown + prevContent.substring(end);
      setFormData((prev) => ({
        ...prev,
        content: newContent,
        images: [...(prev.images || []), cleanUrl],
        image: prev.image || cleanUrl,
      }));
      setTimeout(() => {
        textarea.focus();
        const nextCursor = start + insertMarkdown.length;
        textarea.setSelectionRange(nextCursor, nextCursor);
      }, 50);
    } else {
      setFormData((prev) => ({
        ...prev,
        content: (prev.content || '') + insertMarkdown,
        images: [...(prev.images || []), cleanUrl],
        image: prev.image || cleanUrl,
      }));
    }
  };

  // Insert Bold helper
  const handleInsertBold = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const prevContent = formData.content || '';
    const selected = prevContent.substring(start, end) || '강조 문구';
    const insertText = `**${selected}**`;
    const newContent = prevContent.substring(0, start) + insertText + prevContent.substring(end);
    setFormData((prev) => ({ ...prev, content: newContent }));
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + 2, start + 2 + selected.length);
    }, 50);
  };

  // Insert Quote helper
  const handleInsertQuote = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const prevContent = formData.content || '';
    const selected = prevContent.substring(start, end) || '인용 또는 주요 안내 사항을 입력하세요';
    const insertText = `\n> ${selected}\n`;
    const newContent = prevContent.substring(0, start) + insertText + prevContent.substring(end);
    setFormData((prev) => ({ ...prev, content: newContent }));
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + 3, start + 3 + selected.length);
    }, 50);
  };

  // Submit Form
  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('갤러리 제목을 입력해주세요.');
      return;
    }

    const imagesToSave =
      formData.images && formData.images.length > 0
        ? formData.images
        : (formData.image ? [formData.image] : []);

    if (imagesToSave.length === 0) {
      alert('갤러리 사진을 최소 1장 이상 등록해주세요 (PC 파일 선택 또는 이미지 링크 추가).');
      return;
    }

    const coverImageToSave = formData.image || imagesToSave[0];

    onSave?.({
      title: formData.title.trim(),
      galleryCategory: formData.category,
      date: formData.date,
      location: formData.location.trim(),
      image: coverImageToSave,
      images: imagesToSave,
      content: formData.content.trim(),
    });

    onClose?.();
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        onPaste={(e) => handlePasteEvent(e, false)}
        className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-150"
      >
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-4 px-6 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
            <h3 className="font-bold text-base text-slate-100">
              {isEdit ? '갤러리 게시물 수정' : '새 갤러리 사진 등록'}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmitForm} className="p-6 space-y-4 overflow-y-auto flex-1 text-slate-800 text-xs">
          {clipboardToast && (
            <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2 animate-fadeIn shadow-xs">
              <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{clipboardToast}</span>
            </div>
          )}

          {uploadError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 font-medium">
              {uploadError}
            </div>
          )}

          {/* Category & Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">분류 카테고리</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-amber-500 focus:outline-none"
              >
                <option value="competition">요리대회</option>
                <option value="ceremony">시상식 & 인증패</option>
                <option value="consulting">지자체 컨설팅</option>
                <option value="training">조리 실습 현장</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">촬영 / 행사 일자</label>
              <input
                type="text"
                value={formData.date}
                onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
                placeholder="예: 2026.09.27"
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              갤러리 제목 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
              placeholder="예: 2026 대한민국 명인·명장 시상식 현장 화보"
              className="w-full px-3 py-2.5 border border-slate-300 rounded-xl text-xs sm:text-sm font-bold focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">장소 / 행사처</label>
            <div className="relative">
              <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                placeholder="예: 서울 양재 aT센터 제1전시장"
                className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Multi-Photo Upload & Preview Grid */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block font-bold text-slate-700">
                갤러리 사진 등록 (여러 장 등록 가능) <span className="text-red-500">*</span>
              </label>
              {formData.images && formData.images.length > 0 && (
                <span className="text-[11px] font-bold text-emerald-700">
                  총 {formData.images.length}장 등록됨
                </span>
              )}
            </div>

            {/* Upload Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 pt-0.5">
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/png,image/jpeg,image/webp,image/svg+xml"
                onChange={handleFileChange}
                className="hidden"
              />
              <button
                type="button"
                disabled={isUploading}
                onClick={() => fileInputRef.current?.click()}
                className="flex-1 py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition active:scale-95 cursor-pointer disabled:opacity-50"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{uploadProgressText || '사진 업로드 중…'}</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    <span>내 PC에서 사진 여러 장 선택 업로드</span>
                  </>
                )}
              </button>
            </div>

            {/* URL Input Row */}
            <div className="flex gap-2">
              <input
                type="url"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddUrl();
                  }
                }}
                placeholder="또는 https://... 이미지 링크 입력 후 [추가]"
                className="flex-1 px-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={handleAddUrl}
                className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition shrink-0 cursor-pointer"
              >
                추가
              </button>
            </div>

            {/* Uploaded Photos Thumbnails Grid */}
            {formData.images && formData.images.length > 0 ? (
              <div className="space-y-1.5 pt-1">
                <p className="text-[11px] text-slate-500 font-medium">
                  💡 사진을 클릭하면 목록 <span className="font-bold text-amber-600">대표(커버) 사진</span>으로 지정됩니다.
                </p>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5 max-h-48 overflow-y-auto p-2.5 bg-slate-50 rounded-2xl border border-slate-200">
                  {formData.images.map((imgUrl, idx) => {
                    const isCover = formData.image === imgUrl || (!formData.image && idx === 0);
                    return (
                      <div
                        key={idx}
                        onClick={() => handleSetCover(imgUrl)}
                        className={`relative group aspect-[4/3] rounded-xl overflow-hidden border-2 bg-slate-900 cursor-pointer transition-all ${
                          isCover
                            ? 'border-amber-500 ring-2 ring-amber-400 shadow-md'
                            : 'border-slate-300 hover:border-slate-400'
                        }`}
                      >
                        <img src={imgUrl} alt={`사진 ${idx + 1}`} className="w-full h-full object-cover" />

                        {/* Cover Badge */}
                        {isCover && (
                          <div className="absolute top-1 left-1 bg-amber-500 text-black text-[9px] font-black px-1.5 py-0.5 rounded shadow flex items-center gap-0.5">
                            <Star className="w-2.5 h-2.5 fill-black" />
                            <span>대표</span>
                          </div>
                        )}

                        {/* Hover overlay for non-cover */}
                        {!isCover && (
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="text-[10px] text-white font-bold bg-black/60 px-1.5 py-0.5 rounded">
                              대표 지정
                            </span>
                          </div>
                        )}

                        {/* Delete button */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveImage(idx);
                          }}
                          className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/70 hover:bg-red-600 text-white flex items-center justify-center transition cursor-pointer shadow"
                          title="사진 삭제"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-300 hover:border-amber-500 rounded-2xl p-6 text-center bg-slate-50 hover:bg-amber-50/30 transition cursor-pointer space-y-1.5"
              >
                <Camera className="w-8 h-8 text-slate-400 mx-auto" />
                <p className="text-xs text-slate-600 font-bold">컴퓨터에서 사진을 선택하거나 직접 URL을 입력하세요</p>
                <p className="text-[11px] text-slate-400">
                  Ctrl 또는 Shift 키를 누르고 여러 장을 한 번에 선택하여 일괄 등록할 수 있습니다.
                </p>
              </div>
            )}
          </div>

          {/* Description with Inline Image Insertion & Tabs */}
          <div className="space-y-2 pt-1 border-t border-slate-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <label className="block font-bold text-slate-700">현장 설명 및 내용</label>
                <span className="text-[10px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full font-bold border border-amber-200">
                  글 중간 사진 삽입 지원
                </span>
              </div>

              {/* Write / Preview Tab switcher */}
              <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => setContentTab('write')}
                  className={`px-3 py-1 rounded-md text-[11px] font-bold transition flex items-center gap-1 cursor-pointer ${
                    contentTab === 'write'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <Edit3 className="w-3 h-3" />
                  <span>작성</span>
                </button>
                <button
                  type="button"
                  onClick={() => setContentTab('preview')}
                  className={`px-3 py-1 rounded-md text-[11px] font-bold transition flex items-center gap-1 cursor-pointer ${
                    contentTab === 'preview'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <Eye className="w-3 h-3" />
                  <span>본문 미리보기</span>
                </button>
              </div>
            </div>

            {/* Editor Toolbar (Visible in 'write' mode) */}
            {contentTab === 'write' && (
              <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-slate-100 rounded-xl border border-slate-200 text-xs">
                <input
                  ref={inlineImageInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/svg+xml"
                  onChange={handleInsertContentImage}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => inlineImageInputRef.current?.click()}
                  className="px-2.5 py-1 bg-white hover:bg-amber-50 hover:text-amber-700 border border-slate-200 rounded-lg font-bold text-[11px] text-slate-700 flex items-center gap-1 shadow-2xs transition active:scale-95 cursor-pointer"
                  title="커서 위치에 PC 사진 파일 삽입"
                >
                  <Camera className="w-3.5 h-3.5 text-amber-600" />
                  <span>본문 사진 삽입</span>
                </button>

                <button
                  type="button"
                  onClick={handleInsertContentUrl}
                  className="px-2.5 py-1 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg font-bold text-[11px] text-slate-700 flex items-center gap-1 shadow-2xs transition active:scale-95 cursor-pointer"
                  title="커서 위치에 이미지 웹 링크 삽입"
                >
                  <LinkIcon className="w-3 h-3 text-slate-500" />
                  <span>이미지 링크</span>
                </button>

                <span className="w-px h-4 bg-slate-300 mx-0.5"></span>

                <button
                  type="button"
                  onClick={handleInsertBold}
                  className="px-2 py-1 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg font-black text-[11px] text-slate-700 flex items-center gap-1 shadow-2xs transition active:scale-95 cursor-pointer"
                  title="굵은 글씨 (**텍스트**)"
                >
                  <Bold className="w-3 h-3 text-slate-700" />
                </button>

                <button
                  type="button"
                  onClick={handleInsertQuote}
                  className="px-2 py-1 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg font-bold text-[11px] text-slate-700 flex items-center gap-1 shadow-2xs transition active:scale-95 cursor-pointer"
                  title="인용 문구 (> 인용)"
                >
                  <Quote className="w-3 h-3 text-slate-700" />
                </button>

                <div className="ml-auto hidden sm:flex items-center gap-1 text-[10px] text-slate-500 bg-white/70 px-2 py-0.5 rounded-md border border-slate-200/60 font-mono">
                  <Clipboard className="w-3 h-3 text-slate-400" />
                  <span>Ctrl+V 캡처 이미지 즉시 삽입</span>
                </div>
              </div>
            )}

            {/* Editor Content Area */}
            {contentTab === 'write' ? (
              <div className="relative">
                <textarea
                  ref={textareaRef}
                  rows={5}
                  value={formData.content}
                  onPaste={(e) => handlePasteEvent(e, true)}
                  onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))}
                  placeholder="행사 또는 실습 현장에 대한 설명을 입력하세요.&#10;&#10;💡 [본문 사진 삽입] 버튼을 누르거나, 캡처한 이미지를 복사(Ctrl+C)한 뒤 이곳에서 붙여넣기(Ctrl+V)하면 글 중간에 사진이 바로 삽입됩니다."
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none leading-relaxed font-sans"
                />
                <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1 px-1">
                  <span>클립보드 스크린샷 붙여넣기(Ctrl+V / ⌘V) 지원</span>
                  <span>{formData.content.length}자</span>
                </div>
              </div>
            ) : (
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 max-h-60 overflow-y-auto text-xs min-h-[140px]">
                {formData.content ? (
                  renderRichContent(formData.content)
                ) : (
                  <p className="text-slate-400 italic text-center py-6">
                    내용을 입력하시면 실제 방문자에게 보이는 서식과 사진 위치가 여기에 미리 표시됩니다.
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Submit Buttons */}
          <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition cursor-pointer"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition shadow-md active:scale-95 cursor-pointer flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isEdit ? '수정 완료' : '갤러리 등록 완료'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
