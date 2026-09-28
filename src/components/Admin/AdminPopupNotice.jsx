import React, { useState, useRef } from 'react';
import {
  Sparkles,
  Calendar,
  Image,
  Upload,
  Link,
  CheckCircle2,
  Clock,
  Eye,
  RotateCcw,
  AlertCircle,
  ExternalLink,
  Check,
  X,
  Sliders,
  Smartphone,
} from 'lucide-react';
import NoticePopupModal from '../common/NoticePopupModal';

const DEFAULT_POPUP_NOTICE = {
  enabled: true,
  title: '2026 대한민국 자랑스런 명인·명장 선정식',
  imageUrl: '/images/popup_award_ceremony_2026.jpg',
  linkUrl: '/gallery/ceremony',
  linkText: '선정식 및 행사 상세 안내 바로가기',
  linkTarget: '_self',
  startDate: '2026-09-01',
  endDate: '2026-10-31',
  showOnMobile: true,
  width: 440,
};

export default function AdminPopupNotice({ siteData, onUpdateSiteData }) {
  const currentPopup = siteData?.popupNotice || DEFAULT_POPUP_NOTICE;

  const [enabled, setEnabled] = useState(currentPopup.enabled ?? true);
  const [title, setTitle] = useState(currentPopup.title || DEFAULT_POPUP_NOTICE.title);
  const [imageUrl, setImageUrl] = useState(currentPopup.imageUrl || DEFAULT_POPUP_NOTICE.imageUrl);
  const [linkUrl, setLinkUrl] = useState(currentPopup.linkUrl || DEFAULT_POPUP_NOTICE.linkUrl);
  const [linkText, setLinkText] = useState(currentPopup.linkText || DEFAULT_POPUP_NOTICE.linkText);
  const [startDate, setStartDate] = useState(currentPopup.startDate || DEFAULT_POPUP_NOTICE.startDate);
  const [endDate, setEndDate] = useState(currentPopup.endDate || DEFAULT_POPUP_NOTICE.endDate);
  const [showOnMobile, setShowOnMobile] = useState(currentPopup.showOnMobile ?? true);
  const [width, setWidth] = useState(currentPopup.width || 440);

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [storageResetSuccess, setStorageResetSuccess] = useState(false);
  const fileInputRef = useRef(null);

  // Period Status Check
  const getPeriodStatus = () => {
    if (!enabled) return { label: '팝업 꺼짐 (비활성)', color: 'bg-gray-100 text-gray-700 border-gray-300' };
    const now = new Date();
    const todayStr = now.toISOString().split('T')[0];

    if (startDate && todayStr < startDate) {
      return { label: `노출 대기중 (${startDate} 시작)`, color: 'bg-amber-100 text-amber-800 border-amber-300' };
    }
    if (endDate && todayStr > endDate) {
      return { label: `노출 기간 종료 (${endDate} 만료)`, color: 'bg-rose-100 text-rose-800 border-rose-300' };
    }
    return { label: '🟢 정상 노출 중 (홈페이지 접속 시 표시)', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' };
  };

  const status = getPeriodStatus();

  // Quick Preset Handlers
  const handleApplyPreset1Week = () => {
    const start = new Date();
    const end = new Date();
    end.setDate(start.getDate() + 7);
    setStartDate(start.toISOString().split('T')[0]);
    setEndDate(end.toISOString().split('T')[0]);
  };

  const handleApplyPreset1Month = () => {
    const start = new Date();
    const end = new Date();
    end.setMonth(start.getMonth() + 1);
    setStartDate(start.toISOString().split('T')[0]);
    setEndDate(end.toISOString().split('T')[0]);
  };

  const handleApplyPresetCeremonyDay = () => {
    const start = new Date();
    setStartDate(start.toISOString().split('T')[0]);
    setEndDate('2026-10-31');
  };

  // Image Upload
  const handleImageFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setImageUrl(ev.target.result);
    };
    reader.readAsDataURL(file);
  };

  // Reset Storage Dismissal for Testing
  const handleResetDismissalStorage = () => {
    try {
      localStorage.removeItem('kfssec_popup_dismissed_until');
      setStorageResetSuccess(true);
      setTimeout(() => setStorageResetSuccess(false), 2500);
    } catch (err) {
      console.error(err);
    }
  };

  // Save Settings to Site Data
  const handleSave = async () => {
    const updatedPopup = {
      enabled,
      title,
      imageUrl,
      linkUrl,
      linkText,
      linkTarget: '_self',
      startDate,
      endDate,
      showOnMobile,
      width: Number(width) || 440,
    };

    const newSiteData = {
      ...siteData,
      popupNotice: updatedPopup,
    };

    if (onUpdateSiteData) {
      await onUpdateSiteData(newSiteData);
    }

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  // Preview data object
  const previewData = {
    enabled: true,
    title,
    imageUrl,
    linkUrl,
    linkText,
    startDate: '2020-01-01',
    endDate: '2030-12-31',
    showOnMobile: true,
    width: Number(width) || 440,
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-50 text-amber-600 border border-amber-200">
              <Calendar className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-black text-gray-900 tracking-tight">
              홈페이지 공지 팝업 관리 (오늘 하루 다시보지 않기)
            </h2>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            홈페이지 방문자에게 특정 기간 동안 중요한 행사/시상식/이벤트를 팝업창으로 안내하며, 방문자가 '오늘 하루 다시 보지 않기'를 누를 수 있습니다.
          </p>
        </div>

        {/* Live Status Badge & Save Button */}
        <div className="flex items-center gap-2.5">
          <span className={`px-3 py-1.5 rounded-full text-xs font-bold border ${status.color}`}>
            {status.label}
          </span>
          <button
            onClick={handleSave}
            className="px-5 py-2.5 bg-[#1E5D3B] hover:bg-[#17482E] text-white text-xs font-black rounded-xl shadow-md transition flex items-center gap-2 cursor-pointer hover:scale-105"
          >
            <Check className="w-4 h-4" />
            <span>설정 저장 및 즉시 반영</span>
          </button>
        </div>
      </div>

      {savedSuccess && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 px-4 py-3 rounded-2xl text-xs font-black flex items-center gap-2 shadow-xs animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>공지 팝업 배너 설정이 성공적으로 저장되었습니다! 홈페이지에 즉시 적용됩니다.</span>
        </div>
      )}

      {/* Grid: Left Editor + Right Live Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* =========================================================================
            LEFT COLUMN: SETTINGS FORM (7 cols)
            ========================================================================= */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Card 1: Activation Switch & Period Settings */}
          <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-sm font-black text-gray-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-600" />
                <span>1. 활성화 여부 및 노출 기간 설정</span>
              </h3>

              {/* Toggle Switch */}
              <label className="flex items-center gap-2.5 cursor-pointer">
                <span className="text-xs font-bold text-gray-700">팝업 노출 상태:</span>
                <button
                  type="button"
                  onClick={() => setEnabled(!enabled)}
                  className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                    enabled ? 'bg-[#1E5D3B]' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                      enabled ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
                <span className={`text-xs font-black ${enabled ? 'text-emerald-700' : 'text-gray-400'}`}>
                  {enabled ? 'ON (켜짐)' : 'OFF (꺼짐)'}
                </span>
              </label>
            </div>

            {/* Date Range Inputs */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-gray-700">
                노출 기간 (시작일 ~ 종료일)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-gray-500">시작일 (00:00부터)</span>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs font-bold text-gray-800 focus:bg-white focus:ring-2 focus:ring-emerald-400"
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-gray-500">종료일 (23:59까지)</span>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs font-bold text-gray-800 focus:bg-white focus:ring-2 focus:ring-emerald-400"
                  />
                </div>
              </div>

              {/* Quick Period Presets */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[11px] text-gray-400 font-bold mr-1">빠른 기간 설정:</span>
                <button
                  type="button"
                  onClick={handleApplyPreset1Week}
                  className="px-2.5 py-1 bg-gray-100 hover:bg-emerald-50 text-gray-700 hover:text-emerald-900 border border-gray-200 rounded-lg text-[11px] font-bold transition cursor-pointer"
                >
                  오늘부터 1주일
                </button>
                <button
                  type="button"
                  onClick={handleApplyPreset1Month}
                  className="px-2.5 py-1 bg-gray-100 hover:bg-emerald-50 text-gray-700 hover:text-emerald-900 border border-gray-200 rounded-lg text-[11px] font-bold transition cursor-pointer"
                >
                  오늘부터 1개월
                </button>
                <button
                  type="button"
                  onClick={handleApplyPresetCeremonyDay}
                  className="px-2.5 py-1 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 rounded-lg text-[11px] font-black transition cursor-pointer"
                >
                  🏆 2026 선정식(10월말)까지
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: Poster Image & Content */}
          <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-4">
            <h3 className="text-sm font-black text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
              <Image className="w-4 h-4 text-emerald-600" />
              <span>2. 팝업 이미지 및 안내 내용 설정</span>
            </h3>

            {/* Popup Title */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-gray-700">
                팝업 상단 제목
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="예: 2026 대한민국 자랑스런 명인·명장 선정식"
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs font-bold text-gray-800 focus:bg-white focus:ring-2 focus:ring-emerald-400"
              />
            </div>

            {/* Poster Image Source & Preset */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-gray-700">
                  팝업 포스터 이미지
                </label>
                <button
                  type="button"
                  onClick={() => setImageUrl('/images/popup_award_ceremony_2026.jpg')}
                  className="text-[11px] text-emerald-700 font-bold hover:underline cursor-pointer flex items-center gap-1"
                >
                  <span>🏆 선정식 공식 포스터로 초기화</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="/images/popup_award_ceremony_2026.jpg 또는 외부 이미지 URL"
                  className="flex-1 px-3.5 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs font-medium text-gray-800 focus:bg-white focus:ring-2 focus:ring-emerald-400"
                />
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageFileChange}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-bold transition flex items-center gap-1 shrink-0 border border-stone-300 cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>새 이미지 업로드</span>
                </button>
              </div>
            </div>

            {/* Click Link Settings */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-gray-700">
                  클릭 시 이동할 링크 주소 (선택)
                </label>
                <input
                  type="text"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="/gallery/ceremony 또는 외부 URL"
                  className="w-full px-3.5 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs font-bold text-gray-800 focus:bg-white focus:ring-2 focus:ring-emerald-400"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-gray-700">
                  하단 링크 버튼 안내 텍스트
                </label>
                <input
                  type="text"
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  placeholder="선정식 및 행사 상세 안내 바로가기"
                  className="w-full px-3.5 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs font-bold text-gray-800 focus:bg-white focus:ring-2 focus:ring-emerald-400"
                />
              </div>
            </div>
          </div>

          {/* Card 3: Size & Mobile Controls */}
          <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-4">
            <h3 className="text-sm font-black text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-emerald-600" />
              <span>3. 팝업 규격 및 환경 설정</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-gray-700">
                  팝업 최대 가로 너비 (기본: 440px)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="360"
                    max="600"
                    step="10"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    className="flex-1 accent-emerald-600 cursor-pointer"
                  />
                  <span className="text-xs font-black text-gray-800 w-14 text-right">
                    {width}px
                  </span>
                </div>
              </div>

              <div className="space-y-1.5 pt-2">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={showOnMobile}
                    onChange={(e) => setShowOnMobile(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-gray-400 cursor-pointer accent-emerald-600"
                  />
                  <span className="text-xs font-bold text-gray-800">
                    스마트폰 / 모바일 화면에서도 팝업 표시
                  </span>
                </label>
                <p className="text-[11px] text-gray-500 pl-6">
                  체크 해제 시 모바일 화면에서는 팝업이 뜨지 않고 PC에서만 노출됩니다.
                </p>
              </div>
            </div>
          </div>

          {/* Card 4: Testing & Storage Reset Tools */}
          <div className="bg-stone-50 rounded-3xl p-5 border border-stone-200 space-y-3">
            <div className="text-xs font-black text-stone-800 flex items-center gap-1.5">
              <RotateCcw className="w-4 h-4 text-stone-600" />
              <span>팝업 테스트 및 쿠키(다시보지 않기) 초기화</span>
            </div>
            <p className="text-[11px] text-stone-600 leading-relaxed font-medium">
              테스트 중에 '오늘 하루 다시 보지 않기'를 누르면 브라우저에 기록되어 팝업이 더 이상 뜨지 않게 됩니다.
              아래 버튼을 누르면 기록을 즉시 초기화하여 팝업이 다시 뜨도록 테스트할 수 있습니다.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <button
                type="button"
                onClick={handleResetDismissalStorage}
                className="px-3 py-1.5 bg-white hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-bold transition border border-stone-300 shadow-2xs flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 text-stone-600" />
                <span>'오늘 다시보지 않기' 기록 리셋</span>
              </button>

              <button
                type="button"
                onClick={() => setIsPreviewModalOpen(true)}
                className="px-3.5 py-1.5 bg-[#1E5D3B] hover:bg-[#17482E] text-white rounded-xl text-xs font-black transition shadow-2xs flex items-center gap-1.5 cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5 text-amber-300" />
                <span>실제 팝업창 띄워보기 (실시간 테스트)</span>
              </button>
            </div>

            {storageResetSuccess && (
              <div className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 animate-fadeIn">
                ✓ '오늘 하루 다시 보지 않기' 기록이 초기화되었습니다. 메인 홈으로 가시면 팝업이 다시 뜹니다.
              </div>
            )}
          </div>
        </div>

        {/* =========================================================================
            RIGHT COLUMN: REAL-TIME VISUAL PREVIEW (5 cols)
            ========================================================================= */}
        <div className="lg:col-span-5 sticky top-24 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-black text-gray-700 flex items-center gap-1.5 uppercase tracking-wider">
              <span>실시간 팝업 라이브 프리뷰</span>
            </h3>
            <span className="text-[11px] font-bold text-gray-500">
              너비: {width}px
            </span>
          </div>

          {/* Visual Mini Frame */}
          <div className="bg-stone-200/80 rounded-3xl p-4 sm:p-5 border-2 border-stone-300 flex items-center justify-center min-h-[460px]">
            <div
              style={{ maxWidth: `${width}px` }}
              className="w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-stone-300 flex flex-col animate-fadeIn"
            >
              {/* Header Bar */}
              <div className="bg-[#1A2332] text-white px-3.5 py-2 flex items-center justify-between text-xs font-bold">
                <div className="flex items-center gap-1.5 truncate pr-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shrink-0" />
                  <span className="truncate">{title}</span>
                </div>
                <div className="text-slate-400 p-0.5">
                  <X className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Poster Image */}
              <div className="bg-stone-100 flex items-center justify-center overflow-hidden">
                <img
                  src={imageUrl}
                  alt="팝업 포스터 미리보기"
                  className="w-full h-auto object-contain block max-h-[380px]"
                />
              </div>

              {/* Optional Link Bar */}
              {linkUrl && (
                <div className="bg-emerald-50 border-t border-emerald-200 px-3 py-1.5 flex items-center justify-between text-[11px] font-bold text-emerald-900">
                  <span className="truncate">{linkText}</span>
                  <span className="text-emerald-700 shrink-0 text-[10px] font-black underline">
                    바로가기 ↗
                  </span>
                </div>
              )}

              {/* Bottom Control Bar */}
              <div className="bg-[#1A2332] text-white px-3.5 py-2 flex items-center justify-between text-[11px] font-bold">
                <label className="flex items-center gap-1.5 text-slate-300 select-none">
                  <input type="checkbox" readOnly checked={false} className="w-3.5 h-3.5 rounded" />
                  <span>오늘 하루 다시 보지 않기</span>
                </label>
                <span className="text-slate-300 flex items-center gap-1">
                  <span>닫기</span>
                  <X className="w-3 h-3" />
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Real Interactive Preview Modal (When clicking '실제 팝업창 띄워보기') */}
      {isPreviewModalOpen && (
        <NoticePopupModal
          popupData={previewData}
          onNavigate={(tab, subTab) => {
            alert(`선택된 링크로 이동 테스트: ${tab} / ${subTab}`);
            setIsPreviewModalOpen(false);
          }}
        />
      )}
    </div>
  );
}
