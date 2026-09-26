import React, { useState } from 'react';
import {
  Handshake,
  Plus,
  Trash2,
  Edit2,
  Save,
  CheckCircle2,
  ExternalLink,
  Eye,
  EyeOff,
  Upload,
  RefreshCw,
  Building2,
  Sparkles,
  X,
} from 'lucide-react';
import { DEFAULT_PARTNER_LOGOS } from '../Home/PartnerMarqueeSection';

export default function AdminPartnerLogos({ partnerLogos = [], onUpdatePartnerLogos }) {
  const hydrateLogos = (raw) => {
    const base = raw && raw.length > 0 ? raw : DEFAULT_PARTNER_LOGOS;
    return base.map((item) => {
      if (!item.image) {
        const def = DEFAULT_PARTNER_LOGOS.find((d) => d.id === item.id || d.name === item.name);
        return { ...item, image: def?.image || '' };
      }
      return item;
    });
  };

  const [list, setList] = useState(() => hydrateLogos(partnerLogos));
  const [editingItem, setEditingItem] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState(false);

  // Sync state if partnerLogos prop updates
  React.useEffect(() => {
    if (partnerLogos && partnerLogos.length > 0) {
      setList(hydrateLogos(partnerLogos));
    }
  }, [partnerLogos]);

  // Form State for Adding / Editing
  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState('');
  const [formTag, setFormTag] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formLogoText, setFormLogoText] = useState('');
  const [formImage, setFormImage] = useState('');
  const [formLinkUrl, setFormLinkUrl] = useState('');
  const [formActive, setFormActive] = useState(true);

  const openAddModal = () => {
    setEditingItem(null);
    setFormName('');
    setFormCategory('외식 협력 기업');
    setFormTag('MOU 협약');
    setFormDesc('');
    setFormLogoText('');
    setFormImage('');
    setFormLinkUrl('');
    setFormActive(true);
    setShowAddModal(true);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setFormName(item.name || '');
    setFormCategory(item.category || '');
    setFormTag(item.tag || '');
    setFormDesc(item.desc || '');
    setFormLogoText(item.logoText || '');
    setFormImage(item.image || '');
    setFormLinkUrl(item.linkUrl || '');
    setFormActive(item.active !== false);
    setShowAddModal(true);
  };

  React.useEffect(() => {
    if (!showAddModal) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setShowAddModal(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showAddModal]);

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const rawData = event.target?.result;
        if (!rawData) return;

        // Auto-compress image using canvas to max 320px
        const img = new window.Image();
        img.onload = () => {
          const maxDim = 320;
          let width = img.width;
          let height = img.height;
          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          const compressedData = canvas.toDataURL('image/png', 0.9);
          setFormImage(compressedData);
        };
        img.onerror = () => {
          setFormImage(rawData);
        };
        img.src = rawData;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveModal = (e) => {
    e.preventDefault();
    if (!formName.trim()) {
      alert('기관/기업명을 입력해주세요.');
      return;
    }

    let updatedList;
    if (editingItem) {
      updatedList = list.map((item) =>
        item.id === editingItem.id
          ? {
              ...item,
              name: formName.trim(),
              category: formCategory.trim(),
              tag: formTag.trim(),
              desc: formDesc.trim(),
              logoText: formLogoText.trim() || formName.trim().slice(0, 8),
              image: formImage,
              linkUrl: formLinkUrl.trim(),
              active: formActive,
            }
          : item
      );
    } else {
      const newItem = {
        id: `p_${Date.now()}`,
        name: formName.trim(),
        category: formCategory.trim() || '협력기관',
        tag: formTag.trim() || 'MOU',
        desc: formDesc.trim(),
        logoText: formLogoText.trim() || formName.trim().slice(0, 8),
        image: formImage,
        linkUrl: formLinkUrl.trim(),
        active: formActive,
      };
      updatedList = [newItem, ...list];
    }

    setList(updatedList);
    setShowAddModal(false);
    persistChanges(updatedList);
  };

  const handleDelete = (id) => {
    if (window.confirm('정말 이 협약 기관 로고를 삭제하시겠습니까?')) {
      const updatedList = list.filter((item) => item.id !== id);
      setList(updatedList);
      persistChanges(updatedList);
    }
  };

  const handleToggleActive = (id) => {
    const updatedList = list.map((item) =>
      item.id === id ? { ...item, active: item.active === false ? true : false } : item
    );
    setList(updatedList);
    persistChanges(updatedList);
  };

  const handleResetDefaults = () => {
    if (window.confirm('협력사/MOU 로고 목록을 기본 12개 기관으로 초기화하시겠습니까?')) {
      setList(DEFAULT_PARTNER_LOGOS);
      persistChanges(DEFAULT_PARTNER_LOGOS);
    }
  };

  const persistChanges = (newList) => {
    if (onUpdatePartnerLogos) {
      onUpdatePartnerLogos(newList);
    }
    setSaveSuccessMsg(true);
    setTimeout(() => setSaveSuccessMsg(false), 3000);
  };

  return (
    <div className="space-y-6 text-gray-900 font-sans">
      {/* Top Banner Bar */}
      <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B3C26] text-[#D4AF37] text-xs font-black mb-2">
            <Handshake className="w-3.5 h-3.5" />
            <span>MOU & PARTNER LOGO MANAGER</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
            홈화면 협력기관 & 산학협력(MOU) 로고 관리
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            메인 페이지 하단에 무한 롤링되는 협약 기관/기업의 로고 이미지, 명칭, 링크를 실시간으로 추가하고 관리합니다.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={handleResetDefaults}
            className="px-3.5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
            title="기본 12개사 목록으로 복원"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>기본값 초기화</span>
          </button>

          <button
            type="button"
            onClick={openAddModal}
            className="px-4 py-2.5 bg-[#0B3C26] hover:bg-[#072819] text-white text-xs font-black rounded-xl transition-all shadow-md flex items-center gap-1.5 cursor-pointer border border-[#C5A059]"
          >
            <Plus className="w-4 h-4 text-[#D4AF37]" />
            <span>신규 협약기관 로고 추가</span>
          </button>
        </div>
      </div>

      {saveSuccessMsg && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>성공적으로 저장되었습니다! 메인 페이지 롤링 배너에 즉시 반영됩니다.</span>
        </div>
      )}

      {/* Logos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map((item, idx) => (
          <div
            key={item.id}
            className={`p-4 rounded-2xl border transition-all space-y-3 flex flex-col justify-between ${
              item.active !== false
                ? 'bg-white border-stone-200 hover:border-[#0B3C26] shadow-sm'
                : 'bg-stone-100 border-stone-300 opacity-60'
            }`}
          >
            <div className="flex items-start gap-3.5">
              {/* Logo Preview */}
              <div className="w-14 h-14 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-center p-1.5 overflow-hidden shrink-0">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="text-center">
                    <Building2 className="w-6 h-6 text-[#0B3C26] mx-auto" />
                    <span className="text-[9px] font-black font-mono text-stone-500 block truncate max-w-[48px]">
                      {item.logoText || 'MOU'}
                    </span>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="space-y-1 min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-[#0B3C26] border border-emerald-100 truncate">
                    {item.tag || item.category}
                  </span>
                  <span className="text-[10px] text-gray-400 font-mono">#{idx + 1}</span>
                </div>
                <h4 className="text-sm font-black text-gray-900 truncate">{item.name}</h4>
                <p className="text-xs text-gray-500 truncate">{item.category}</p>
                {item.linkUrl && (
                  <a
                    href={item.linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-emerald-700 hover:underline flex items-center gap-1 font-mono truncate"
                  >
                    <span>{item.linkUrl}</span>
                    <ExternalLink className="w-3 h-3 shrink-0" />
                  </a>
                )}
              </div>
            </div>

            {/* Actions Bar */}
            <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
              <button
                type="button"
                onClick={() => handleToggleActive(item.id)}
                className={`px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 cursor-pointer transition-colors ${
                  item.active !== false
                    ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                    : 'bg-stone-200 text-stone-600 hover:bg-stone-300'
                }`}
                title={item.active !== false ? '노출 중 (클릭 시 숨김)' : '숨김 상태 (클릭 시 노출)'}
              >
                {item.active !== false ? (
                  <>
                    <Eye className="w-3 h-3 text-emerald-700" />
                    <span>노출</span>
                  </>
                ) : (
                  <>
                    <EyeOff className="w-3 h-3 text-stone-500" />
                    <span>숨김</span>
                  </>
                )}
              </button>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => openEditModal(item)}
                  className="p-1.5 hover:bg-stone-100 rounded-lg text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
                  title="수정"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(item.id)}
                  className="p-1.5 hover:bg-rose-50 rounded-lg text-stone-400 hover:text-rose-600 transition-colors cursor-pointer"
                  title="삭제"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Add / Edit */}
      {showAddModal && (
        <div
          onClick={() => setShowAddModal(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-md w-full p-6 space-y-5 border-2 border-[#0B3C26] shadow-2xl animate-fadeIn cursor-default"
          >
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-base font-black text-gray-900 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#0B3C26]" />
                <span>{editingItem ? '협약 기관 정보 수정' : '신규 협약 기관 추가'}</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-full hover:bg-gray-100 text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-4 text-xs font-bold">
              <div>
                <label className="block text-gray-700 mb-1">기관/기업명 (필수) *</label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="예: (주)주방뱅크"
                  required
                  className="w-full px-3 py-2 border rounded-xl border-gray-300 focus:outline-none focus:border-[#0B3C26]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 mb-1">분야/업종</label>
                  <input
                    type="text"
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    placeholder="예: 주방 설비 1위"
                    className="w-full px-3 py-2 border rounded-xl border-gray-300 focus:outline-none focus:border-[#0B3C26]"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">배지 태그</label>
                  <input
                    type="text"
                    value={formTag}
                    onChange={(e) => setFormTag(e.target.value)}
                    placeholder="예: 3D 설계 지원"
                    className="w-full px-3 py-2 border rounded-xl border-gray-300 focus:outline-none focus:border-[#0B3C26]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-1">로고 텍스트/약칭 (이미지 없을 시 대체 표시)</label>
                <input
                  type="text"
                  value={formLogoText}
                  onChange={(e) => setFormLogoText(e.target.value)}
                  placeholder="예: KITCHEN BANK"
                  className="w-full px-3 py-2 border rounded-xl border-gray-300 focus:outline-none focus:border-[#0B3C26]"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">로고 이미지 URL 또는 파일 업로드</label>
                <div className="space-y-2">
                  <input
                    type="url"
                    value={formImage}
                    onChange={(e) => setFormImage(e.target.value)}
                    placeholder="https://... 또는 /images/... (직접 링크 입력)"
                    className="w-full px-3 py-2 border rounded-xl border-gray-300 focus:outline-none focus:border-[#0B3C26]"
                  />
                  <label className="flex items-center justify-center gap-2 py-2 px-3 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl cursor-pointer transition-colors border border-stone-300">
                    <Upload className="w-3.5 h-3.5" />
                    <span>내 컴퓨터에서 로고 파일 선택 (자동 최적화 압축)</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                {formImage && (
                  <div className="mt-2 p-2 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={formImage}
                        alt="미리보기"
                        className="h-10 w-auto object-contain max-w-[100px] rounded border bg-white p-0.5"
                      />
                      <span className="text-[11px] text-gray-500 font-medium">로고 미리보기 (적용됨)</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setFormImage('')}
                      className="text-xs text-rose-600 hover:text-rose-800 font-bold px-2 py-1 rounded bg-rose-50 hover:bg-rose-100 transition-colors"
                    >
                      이미지 제거
                    </button>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-gray-700 mb-1">기업/기관 상세 소개 (산학협력 페이지에 노출)</label>
                <textarea
                  rows={3}
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  placeholder="예: 대한민국 1위 업소용 주방기구 및 설비 토탈 컨설팅 기업으로, 수강생 대상 주방 집기 특별 할인 및 3D 도면 설계를 지원합니다."
                  className="w-full px-3 py-2 border rounded-xl border-gray-300 focus:outline-none focus:border-[#0B3C26] resize-none text-xs"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">공식 웹사이트 URL (선택)</label>
                <input
                  type="url"
                  value={formLinkUrl}
                  onChange={(e) => setFormLinkUrl(e.target.value)}
                  placeholder="https://www.example.com"
                  className="w-full px-3 py-2 border rounded-xl border-gray-300 focus:outline-none focus:border-[#0B3C26]"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="activeCheck"
                  checked={formActive}
                  onChange={(e) => setFormActive(e.target.checked)}
                  className="w-4 h-4 text-emerald-600 rounded"
                />
                <label htmlFor="activeCheck" className="text-gray-700 cursor-pointer">
                  홈화면 롤링 배너에 바로 노출하기
                </label>
              </div>

              <div className="pt-3 border-t flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0B3C26] hover:bg-[#072819] text-white rounded-xl font-bold border border-[#C5A059]"
                >
                  {editingItem ? '수정 완료' : '추가하기'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
