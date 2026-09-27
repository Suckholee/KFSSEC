import React, { useState, useRef } from 'react';
import { useAdminEdit } from '../../../context/AdminEditContext';
import { Camera, Upload, Link as LinkIcon, X, Loader2, Check } from 'lucide-react';

export default function EditableImage({
  src,
  alt = '이미지',
  onChange,
  path,
  className = '',
  imageClassName = '',
  aspectRatio,
  children,
}) {
  const { isEditMode, updateSiteField } = useAdminEdit();
  const [isOpen, setIsOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef(null);

  if (!isEditMode) {
    if (children) return <div className={className}>{children}</div>;
    return <img src={src} alt={alt} className={`${className} ${imageClassName}`} />;
  }

  const handleUpdate = (newUrl) => {
    if (onChange) {
      onChange(newUrl);
    } else if (path) {
      updateSiteField(path, newUrl);
    }
    setIsOpen(false);
    setErrorMessage('');
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
    <div className={`relative group ${className}`}>
      {/* Target Image or Children */}
      {children ? (
        children
      ) : (
        <img src={src} alt={alt} className={`transition group-hover:brightness-95 ${imageClassName}`} />
      )}

      {/* Hover Photo Swap Button */}
      <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(true);
          }}
          className="pointer-events-auto opacity-0 group-hover:opacity-100 transition-all duration-200 px-3 py-1.5 rounded-lg bg-slate-950/85 hover:bg-slate-900 text-amber-300 hover:text-white text-xs font-semibold shadow-xl border border-amber-500/50 backdrop-blur-sm flex items-center gap-1.5 active:scale-95 cursor-pointer"
        >
          <Camera className="w-3.5 h-3.5" />
          <span>사진 바꾸기</span>
        </button>
      </div>

      {/* Image Edit Modal Popover */}
      {isOpen && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm"
        >
          <div className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-2xl border border-slate-200 space-y-4 text-slate-800 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b pb-2">
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                <Camera className="w-4 h-4 text-amber-600" />
                <span>사진/배너 교체</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-md"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Current Image Preview */}
            {src && (
              <div className="relative rounded-lg overflow-hidden border border-slate-200 h-28 bg-slate-100 flex items-center justify-center">
                <img src={src} alt="현재 이미지" className="max-h-full max-w-full object-contain" />
                <span className="absolute bottom-1 right-2 text-[10px] bg-slate-900/70 text-white px-1.5 py-0.5 rounded">현재 사진</span>
              </div>
            )}

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
                    <span>내 컴퓨터에서 사진 선택</span>
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
                className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold disabled:opacity-40 transition"
              >
                적용
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
