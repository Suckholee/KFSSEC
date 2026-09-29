import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useAdminEdit } from '../../../context/AdminEditContext';
import { Camera, Upload, Link as LinkIcon, X, Loader2, Check, ChevronLeft, ChevronRight, ArrowUpDown } from 'lucide-react';

export default function EditableImage({
  src,
  alt = '이미지',
  onChange,
  path,
  className = '',
  imageClassName = '',
  aspectRatio,
  children,
  slides,
  currentSlideIndex = 0,
  onSelectSlide,
  onReorderSlides,
}) {
  const { isEditMode, showEditGuides, updateSiteField } = useAdminEdit();
  const [isOpen, setIsOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef(null);

  // Manage active selected slide in the modal
  const [selectedSlideIdx, setSelectedSlideIdx] = useState(currentSlideIndex || 0);

  // Sync selectedSlideIdx when currentSlideIndex changes from outside or modal opens
  useEffect(() => {
    if (isOpen && currentSlideIndex !== undefined) {
      setSelectedSlideIdx(currentSlideIndex);
    }
  }, [isOpen, currentSlideIndex]);

  // Close modal on Escape key press
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!isEditMode) {
    if (children) return <div className={className}>{children}</div>;
    return <img src={src} alt={alt} className={`${className} ${imageClassName}`} />;
  }

  const activeSrc = (slides && slides[selectedSlideIdx]?.imageUrl) || src;

  const handleUpdate = (newUrl) => {
    if (slides && onReorderSlides) {
      const newSlides = slides.map((s, idx) =>
        idx === selectedSlideIdx ? { ...s, imageUrl: newUrl } : s
      );
      onReorderSlides(newSlides);
      onChange?.(newUrl, selectedSlideIdx);
    } else if (onChange) {
      onChange(newUrl);
    } else if (path) {
      updateSiteField(path, newUrl);
    }
    setErrorMessage('');
  };

  const handleMoveSlide = (fromIdx, toIdx) => {
    if (!slides || toIdx < 0 || toIdx >= slides.length) return;
    const newSlides = [...slides];
    const [moved] = newSlides.splice(fromIdx, 1);
    newSlides.splice(toIdx, 0, moved);
    onReorderSlides?.(newSlides);
    setSelectedSlideIdx(toIdx);
    onSelectSlide?.(toIdx);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage('사진 크기는 5MB 이하여야 합니다.');
      return;
    }

    setIsUploading(true);
    setErrorMessage('');

    try {
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const base64Data = reader.result;
          const response = await fetch('/api/upload', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ imageBase64: base64Data, fileName: file.name }),
          });

          const result = await response.json();
          if (!response.ok || !result.success) {
            // Fallback: use direct data URL if server upload endpoint fails
            handleUpdate(base64Data);
            return;
          }
          handleUpdate(result.url);
        } catch (err) {
          console.warn('Server upload fallback to base64:', err);
          handleUpdate(reader.result);
        } finally {
          setIsUploading(false);
        }
      };
      reader.onerror = () => {
        setErrorMessage('파일을 읽는 도중 오류가 발생했습니다.');
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      setErrorMessage(err.message || '업로드 실패');
      setIsUploading(false);
    }
  };

  const handleUrlSubmit = (e) => {
    e.preventDefault();
    if (!urlInput.trim()) return;
    handleUpdate(urlInput.trim());
    setUrlInput('');
  };

  return (
    <div
      onClick={(e) => {
        if (isEditMode) {
          e.stopPropagation();
          setIsOpen(true);
        }
      }}
      className={`relative group ${isEditMode ? 'cursor-pointer' : ''} ${className} ${
        isEditMode && showEditGuides
          ? 'ring-2 ring-dashed ring-amber-400/80 rounded-xl transition-all'
          : ''
      }`}
      title={isEditMode ? '클릭하여 사진 교체 및 순서 변경' : undefined}
    >
      {/* Target Image or Children */}
      {children ? (
        children
      ) : (
        <img src={src} alt={alt} className={`transition group-hover:brightness-95 ${imageClassName}`} />
      )}

      {/* Persistent Badge when Guides are ON */}
      {showEditGuides && !isOpen && (
        <div className="absolute top-2 right-2 z-20 pointer-events-none transition-all">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-500/95 text-slate-950 font-bold text-[11px] shadow-md border border-amber-300 backdrop-blur-sm">
            <Camera className="w-3 h-3 text-slate-950" />
            <span>{slides && slides.length > 1 ? '배너 순서·교체' : '사진 교체'}</span>
          </span>
        </div>
      )}

      {/* Hover Photo Swap Button */}
      <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(true);
          }}
          className="pointer-events-auto opacity-0 group-hover:opacity-100 transition-all duration-200 px-3.5 py-2 rounded-xl bg-slate-950/90 hover:bg-slate-900 text-amber-300 hover:text-white text-xs font-bold shadow-2xl border border-amber-500/60 backdrop-blur-md flex items-center gap-1.5 active:scale-95 cursor-pointer"
        >
          <Camera className="w-3.5 h-3.5" />
          <span>{slides && slides.length > 1 ? '배너 순서 & 사진 교체' : '사진 바꾸기'}</span>
        </button>
      </div>

      {/* Image Edit Modal Popover (Rendered in document.body via Portal to prevent container clipping) */}
      {isOpen && typeof document !== 'undefined' && createPortal(
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-[100000] flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`w-full ${
              slides && slides.length > 1 ? 'max-w-xl sm:max-w-2xl' : 'max-w-sm'
            } max-h-[88vh] overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl border border-slate-200 space-y-4 text-slate-800 animate-in fade-in zoom-in-95 duration-150`}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-700">
                  <Camera className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                    <span>{slides && slides.length > 1 ? '메인 배너 순서 & 사진 교체' : '사진/배너 교체'}</span>
                    {slides && slides.length > 1 && (
                      <span className="text-[11px] font-black px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                        총 {slides.length}개 슬라이드
                      </span>
                    )}
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    {slides && slides.length > 1
                      ? '1번·2번·3번 카드의 화살표로 위치를 바꾸고, 원하는 사진을 업로드하세요.'
                      : '사진을 업로드하거나 웹 이미지 주소를 입력하여 교체할 수 있습니다.'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition cursor-pointer"
                title="닫기 (ESC)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* MULTI-SLIDE ORDER & POSITION SWAPPING (When slides are provided) */}
            {slides && slides.length > 1 && (
              <div className="bg-slate-50/90 p-3 sm:p-3.5 rounded-xl border border-slate-200 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-slate-800 flex items-center gap-1.5">
                    <ArrowUpDown className="w-3.5 h-3.5 text-amber-600" />
                    배너 순서 변경 (1번 · 2번 · 3번 위치 바꾸기)
                  </span>
                  <span className="text-[11px] text-slate-500 font-medium hidden sm:inline">
                    [◀ 앞으로] [▶ 뒤로] 버튼으로 순서 즉시 교체
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {slides.map((slide, idx) => {
                    const isCurrent = idx === selectedSlideIdx;
                    return (
                      <div
                        key={slide.id || idx}
                        onClick={() => {
                          setSelectedSlideIdx(idx);
                          onSelectSlide?.(idx);
                        }}
                        className={`relative rounded-xl border p-2.5 flex flex-col gap-2 cursor-pointer transition-all ${
                          isCurrent
                            ? 'border-amber-500 bg-white shadow-md ring-2 ring-amber-400'
                            : 'border-slate-200 bg-white/70 hover:bg-white hover:border-slate-300 shadow-xs'
                        }`}
                      >
                        {/* Card Header: Badge + Move buttons */}
                        <div className="flex items-center justify-between">
                          <span
                            className={`text-[11px] font-black px-2 py-0.5 rounded-full transition-colors ${
                              isCurrent
                                ? 'bg-amber-500 text-slate-950 shadow-xs'
                                : 'bg-slate-200 text-slate-700'
                            }`}
                          >
                            {idx + 1}번 배너 {isCurrent && '✓'}
                          </span>

                          {/* Position Swap Buttons */}
                          <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                            <button
                              type="button"
                              disabled={idx === 0}
                              onClick={() => handleMoveSlide(idx, idx - 1)}
                              className="p-1 rounded-md bg-slate-100 hover:bg-amber-100 disabled:opacity-20 border border-slate-200 hover:border-amber-300 text-slate-700 hover:text-amber-900 shadow-xs cursor-pointer disabled:cursor-not-allowed transition"
                              title={`${idx + 1}번 배너를 ${idx}번 자리로 앞으로 이동`}
                            >
                              <ChevronLeft className="w-3.5 h-3.5 stroke-[2.5]" />
                            </button>
                            <button
                              type="button"
                              disabled={idx === slides.length - 1}
                              onClick={() => handleMoveSlide(idx, idx + 1)}
                              className="p-1 rounded-md bg-slate-100 hover:bg-amber-100 disabled:opacity-20 border border-slate-200 hover:border-amber-300 text-slate-700 hover:text-amber-900 shadow-xs cursor-pointer disabled:cursor-not-allowed transition"
                              title={`${idx + 1}번 배너를 ${idx + 2}번 자리로 뒤로 이동`}
                            >
                              <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
                            </button>
                          </div>
                        </div>

                        {/* Thumbnail Preview */}
                        <div className="w-full h-20 rounded-lg overflow-hidden bg-slate-950 border border-slate-200 flex items-center justify-center relative">
                          <img
                            src={slide.imageUrl}
                            alt={slide.title || `${idx + 1}번 배너`}
                            className="w-full h-full object-cover"
                          />
                          <span className="absolute bottom-1 right-1.5 text-[9px] bg-slate-950/80 text-white font-mono px-1 py-0.5 rounded">
                            {idx + 1} / {slides.length}
                          </span>
                        </div>

                        {/* Title Snippet */}
                        <div className="text-[11px] font-bold text-slate-800 truncate" title={slide.title}>
                          {slide.title || `배너 ${idx + 1}`}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Current Image Preview for Selected Slide */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-slate-800">
                  {slides && slides.length > 1
                    ? `[${selectedSlideIdx + 1}번 배너] 현재 사진 미리보기`
                    : '현재 사진 미리보기'}
                </span>
                {slides && slides.length > 1 && (
                  <span className="text-[11px] text-amber-700 font-medium bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                    위 카드에서 편집할 배너를 바꿀 수 있습니다
                  </span>
                )}
              </div>

              {activeSrc && (
                <div className="relative rounded-xl overflow-hidden border border-slate-200 h-28 sm:h-32 bg-slate-950 flex items-center justify-center">
                  <img src={activeSrc} alt="현재 이미지" className="max-h-full max-w-full object-contain" />
                  <span className="absolute bottom-2 right-2 text-[10px] bg-slate-900/80 text-white px-2 py-0.5 rounded-md font-medium">
                    {slides ? `${selectedSlideIdx + 1}번 배너 현재 사진` : '현재 사진'}
                  </span>
                </div>
              )}
            </div>

            {/* Error Message */}
            {errorMessage && (
              <p className="text-xs text-red-600 bg-red-50 p-2 rounded-lg border border-red-200">{errorMessage}</p>
            )}

            {/* Option 1: File Upload */}
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp,image/svg+xml"
                onChange={handleFileChange}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-slate-950 font-bold text-xs shadow-md transition disabled:opacity-50 cursor-pointer"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>사진 업로드 중…</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    <span>{slides && slides.length > 1 ? `[${selectedSlideIdx + 1}번] 내 컴퓨터에서 사진 선택` : '내 컴퓨터에서 사진 선택'}</span>
                  </>
                )}
              </button>
              <p className="text-[11px] text-slate-500 text-center mt-1">JPG, PNG, WebP (최대 5MB, Supabase 클라우드 저장)</p>
            </div>

            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-slate-200"></div>
              <span className="flex-shrink mx-2 text-slate-400 text-xs">또는 웹 링크</span>
              <div className="flex-grow border-t border-slate-200"></div>
            </div>

            {/* Option 2: Image URL input */}
            <form onSubmit={handleUrlSubmit} className="flex gap-2">
              <input
                type="url"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://... 이미지 주소 붙여넣기"
                className="flex-1 px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <button
                type="submit"
                disabled={!urlInput.trim()}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold disabled:opacity-40 transition cursor-pointer"
              >
                적용
              </button>
            </form>

            {/* Footer Buttons */}
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition shadow-sm cursor-pointer"
              >
                완료 / 닫기
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
