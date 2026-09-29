import { useLanguage } from '../../i18n/LanguageContext';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  X,
  Award,
  CheckCircle2,
  ShieldCheck,
  ChevronRight,
  BookOpen,
  Star,
  Calendar,
  Edit3,
  Youtube,
  Instagram,
  Globe,
  ExternalLink,
  Save,
  Loader2,
  Plus,
  Link2,
} from 'lucide-react';
import { useAdminEdit } from '../../context/AdminEditContext';
import { saveMasterProfile } from '../../services/masterDatabase';

export default function MasterDetailModal({ isOpen, master, onClose, originRect, onEditMaster }) {
  const { tr, language } = useLanguage();
  const { isEditMode } = useAdminEdit();
  const dialogRef = useRef(null);
  const overlayRef = useRef(null);
  const closingRef = useRef(false);
  const closeRef = useRef(onClose);
  const requestClose = () => {
    if (closingRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !dialogRef.current?.animate) { onClose(); return; }
    closingRef.current = true;
    const animation = dialogRef.current.animate([
      { opacity: 1, transform: 'translateY(0) scale(1)' },
      { opacity: 0, transform: 'translateY(12px) scale(.98)' },
    ], { duration: 180, easing: 'ease-in', fill: 'forwards' });
    overlayRef.current?.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 180, fill: 'forwards' });
    animation.onfinish = onClose;
  };
  closeRef.current = requestClose;
  useLayoutEffect(() => {
    closingRef.current = false;
    if (!isOpen || !dialogRef.current?.animate || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = dialogRef.current.getBoundingClientRect();
    const x = originRect ? originRect.left + originRect.width / 2 - rect.left - rect.width / 2 : 0;
    const y = originRect ? originRect.top + originRect.height / 2 - rect.top - rect.height / 2 : 20;
    const scale = originRect ? Math.max(.65, Math.min(.92, originRect.width / rect.width)) : .96;
    const animation = dialogRef.current.animate([
      { opacity: 0, transform: `translate(${x}px, ${y}px) scale(${scale})` },
      { opacity: 1, transform: 'translate(0, 0) scale(1)' },
    ], { duration: 440, easing: 'cubic-bezier(.22,1,.36,1)' });
    return () => animation.cancel();
  }, [isOpen]);
  useEffect(() => {
    if (!isOpen) return;
    const previous = document.activeElement;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialogRef.current?.focus();
    const handleKey = event => {
      if (event.key === 'Escape') closeRef.current();
      if (event.key === 'Tab') {
        const buttons = dialogRef.current?.querySelectorAll('button');
        const first = buttons?.[0];
        const last = buttons?.[buttons.length - 1];
        if (event.shiftKey && (document.activeElement === first || document.activeElement === dialogRef.current)) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener('keydown', handleKey);
    };
  }, [isOpen]);

  const [isEditingSns, setIsEditingSns] = useState(false);
  const [snsDraft, setSnsDraft] = useState({
    youtubeUrl: '',
    instagramUrl: '',
    blogUrl: '',
  });
  const [isSavingSns, setIsSavingSns] = useState(false);
  const [snsNotice, setSnsNotice] = useState('');

  useEffect(() => {
    if (master) {
      setSnsDraft({
        youtubeUrl: master.youtubeUrl || '',
        instagramUrl: master.instagramUrl || '',
        blogUrl: master.blogUrl || '',
      });
      setIsEditingSns(false);
      setSnsNotice('');
    }
  }, [master]);

  const handleSaveSns = async (e) => {
    e?.preventDefault();
    if (!master) return;
    setIsSavingSns(true);
    setSnsNotice('');
    try {
      const updated = {
        ...master,
        youtubeUrl: (snsDraft.youtubeUrl || '').trim(),
        instagramUrl: (snsDraft.instagramUrl || '').trim(),
        blogUrl: (snsDraft.blogUrl || '').trim(),
      };
      await saveMasterProfile(updated, master);
      setSnsNotice('SNS 및 유튜브 링크가 성공적으로 저장되었습니다!');
      setIsEditingSns(false);
      setTimeout(() => setSnsNotice(''), 3000);
    } catch (err) {
      alert(`저장 실패: ${err.message}`);
    } finally {
      setIsSavingSns(false);
    }
  };

  if (!isOpen || !master) return null;

  return (
    <div
      onClick={requestClose}
      ref={overlayRef}
      className="master-profile-backdrop fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md cursor-pointer"
    >
      <div
        ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="master-detail-title" tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className="master-profile-dialog bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl transition-all border border-[#16A34A]/40 max-h-[92vh] flex flex-col cursor-default"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#14532D] via-[#15803D] to-[#16A34A] text-white p-6 sm:p-7 relative shrink-0 border-b border-[#16A34A]/40">
          <div className="absolute top-5 right-5 flex items-center gap-2">
            {isEditMode && (
              <button
                type="button"
                onClick={() => {
                  requestClose();
                  onEditMaster?.(master.id || master.name);
                }}
                className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-[#F0FDF4] text-[#15803D] font-black text-xs shadow-lg border border-[#86EFAC] flex items-center gap-1.5 transition-all cursor-pointer hover:scale-105 active:scale-95"
                title="이 명장의 정보 및 사진 편집하기"
              >
                <Edit3 className="w-3.5 h-3.5 text-[#15803D]" />
                <span>이 프로필 수정하기</span>
              </button>
            )}

            <button
              onClick={requestClose}
              className="w-9 h-9 rounded-full bg-black/20 hover:bg-black/40 text-white flex items-center justify-center transition-colors cursor-pointer"
              title={tr("닫기 (ESC)")}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-white/50 shadow-md bg-white shrink-0">
              <img
                src={master.image}
                alt={tr(master.name)}
                className="w-full h-full object-cover object-center"
              />
            </div>

            <div className="space-y-1.5">
              <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black shadow-xs ${
                master.group === 'expert' 
                  ? 'bg-gradient-to-r from-[#EA580C] to-[#F97316] text-white border border-orange-300/40' 
                  : 'bg-white/20 text-[#86EFAC] border border-white/30'
              }`}>
                <Award className={`w-3.5 h-3.5 ${master.group === 'expert' ? 'text-amber-100' : 'text-[#86EFAC]'}`} />
                <span>{tr(master.badge || (master.group === 'expert' ? '조리 명인' : '대한민국 명장'))}</span>
              </div>

              <h2 id="master-detail-title" className="text-2xl sm:text-3xl font-black tracking-tight text-white font-serif">
                {tr(master.name)}
              </h2>

              <p className="text-xs sm:text-sm text-emerald-100/90 font-bold">
                {tr(master.title)}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Main Body */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto flex-1 text-xs sm:text-sm font-bold text-gray-800 bg-[#FDFBF7]">
          
          {/* Intro Overview Box */}
          <div className="bg-white p-5 rounded-2xl border border-[#E5E0D8] shadow-xs space-y-2">
            <h3 className="text-sm font-black text-[#15803D] flex items-center gap-2">
              <Star className="w-4 h-4 text-[#F97316] fill-[#F97316]" />
              <span>{tr("소개 및 전문 분야")}</span>
            </h3>
            <p className="text-xs sm:text-sm text-gray-700 font-medium leading-relaxed whitespace-pre-wrap">
              {tr(master.intro || '소개가 아직 등록되지 않았습니다.')}
            </p>
          </div>

          {/* SNS & Media Channels Section */}
          {(isEditMode || master.blogUrl || master.youtubeUrl || master.instagramUrl) && (
            <div className="bg-[#F0FDF4] p-4 sm:p-5 rounded-2xl border border-[#DCFCE7] shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs sm:text-sm font-black text-[#15803D] flex items-center gap-1.5 uppercase tracking-wider">
                  <Link2 className="w-4 h-4 text-[#15803D]" />
                  <span>공식 SNS 및 유튜브 채널</span>
                </h3>
                {isEditMode && !isEditingSns && (
                  <button
                    type="button"
                    onClick={() => setIsEditingSns(true)}
                    className="px-2.5 py-1 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 font-bold text-xs flex items-center gap-1 cursor-pointer transition shadow-xs"
                    title="이 명장의 SNS 및 유튜브 링크 직접 수정"
                  >
                    <Edit3 className="w-3 h-3 text-amber-700" />
                    <span>링크 직접 수정</span>
                  </button>
                )}
              </div>

              {/* Editing Form in Edit Mode */}
              {isEditMode && isEditingSns ? (
                <form onSubmit={handleSaveSns} className="space-y-3 pt-1">
                  <div className="space-y-2.5 bg-white p-3.5 rounded-xl border border-emerald-200 shadow-inner">
                    <label className="block text-xs font-bold text-gray-700">
                      <span className="flex items-center gap-1.5 mb-1 text-rose-600 font-black">
                        <Youtube className="w-3.5 h-3.5" />
                        <span>유튜브 채널 또는 대표 영상 주소 (URL)</span>
                      </span>
                      <input
                        type="url"
                        value={snsDraft.youtubeUrl}
                        onChange={(e) => setSnsDraft({ ...snsDraft, youtubeUrl: e.target.value })}
                        placeholder="https://www.youtube.com/@... 또는 영상 URL 입력"
                        className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 font-mono"
                      />
                    </label>

                    <label className="block text-xs font-bold text-gray-700">
                      <span className="flex items-center gap-1.5 mb-1 text-pink-600 font-black">
                        <Instagram className="w-3.5 h-3.5" />
                        <span>인스타그램 프로필 주소 (URL)</span>
                      </span>
                      <input
                        type="url"
                        value={snsDraft.instagramUrl}
                        onChange={(e) => setSnsDraft({ ...snsDraft, instagramUrl: e.target.value })}
                        placeholder="https://www.instagram.com/..."
                        className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 font-mono"
                      />
                    </label>

                    <label className="block text-xs font-bold text-gray-700">
                      <span className="flex items-center gap-1.5 mb-1 text-[#03C75A] font-black">
                        <Globe className="w-3.5 h-3.5" />
                        <span>네이버 블로그 / 공식 웹사이트 (URL)</span>
                      </span>
                      <input
                        type="url"
                        value={snsDraft.blogUrl}
                        onChange={(e) => setSnsDraft({ ...snsDraft, blogUrl: e.target.value })}
                        placeholder="https://blog.naver.com/... 또는 공식 홈페이지"
                        className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
                      />
                    </label>
                  </div>

                  <div className="flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditingSns(false);
                        setSnsDraft({
                          youtubeUrl: master.youtubeUrl || '',
                          instagramUrl: master.instagramUrl || '',
                          blogUrl: master.blogUrl || '',
                        });
                      }}
                      className="px-3 py-1.5 rounded-lg border border-gray-300 bg-white text-gray-700 text-xs font-bold hover:bg-gray-50 cursor-pointer"
                    >
                      취소
                    </button>
                    <button
                      type="submit"
                      disabled={isSavingSns}
                      className="px-4 py-1.5 rounded-lg bg-[#15803D] hover:bg-[#16A34A] text-white text-xs font-bold flex items-center gap-1.5 shadow-md cursor-pointer transition disabled:opacity-50"
                    >
                      {isSavingSns ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>저장 중…</span>
                        </>
                      ) : (
                        <>
                          <Save className="w-3.5 h-3.5" />
                          <span>링크 저장하기</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                /* Public View or Display View */
                <div>
                  {(master.blogUrl || master.youtubeUrl || master.instagramUrl) ? (
                    <div className="flex flex-wrap items-center gap-2.5 pt-1">
                      {master.youtubeUrl && (
                        <a
                          href={master.youtubeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#FF0000] hover:bg-[#CC0000] text-white rounded-xl text-xs font-bold transition-all shadow-sm hover:shadow-md cursor-pointer group/link"
                        >
                          <Youtube className="w-4 h-4 fill-white" />
                          <span>유튜브 채널 바로가기</span>
                          <ExternalLink className="w-3 h-3 opacity-80 group-hover/link:translate-x-0.5 transition-transform" />
                        </a>
                      )}
                      {master.instagramUrl && (
                        <a
                          href={master.instagramUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-3.5 py-2 bg-gradient-to-tr from-[#833AB4] via-[#FD1D1D] to-[#FCB045] hover:opacity-95 text-white rounded-xl text-xs font-bold transition-all shadow-sm hover:shadow-md cursor-pointer group/link"
                        >
                          <Instagram className="w-4 h-4" />
                          <span>인스타그램 바로가기</span>
                          <ExternalLink className="w-3 h-3 opacity-80 group-hover/link:translate-x-0.5 transition-transform" />
                        </a>
                      )}
                      {master.blogUrl && (
                        <a
                          href={master.blogUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#03C75A] hover:bg-[#02B150] text-white rounded-xl text-xs font-bold transition-all shadow-sm hover:shadow-md cursor-pointer group/link"
                        >
                          <Globe className="w-4 h-4" />
                          <span>블로그 / 공식 홈페이지</span>
                          <ExternalLink className="w-3 h-3 opacity-80 group-hover/link:translate-x-0.5 transition-transform" />
                        </a>
                      )}
                    </div>
                  ) : isEditMode ? (
                    <div
                      onClick={() => setIsEditingSns(true)}
                      className="p-3.5 rounded-xl border-2 border-dashed border-emerald-300 bg-white/70 hover:bg-emerald-50 text-center cursor-pointer transition text-xs font-bold text-emerald-800 flex items-center justify-center gap-2"
                    >
                      <Plus className="w-4 h-4 text-emerald-600" />
                      <span>이 명장의 공식 유튜브 채널, 인스타그램, 블로그 링크 등록하기</span>
                    </div>
                  ) : null}
                </div>
              )}

              {snsNotice && (
                <p className="text-xs text-emerald-700 bg-emerald-100 p-2 rounded-lg font-bold flex items-center gap-1.5 animate-fadeIn">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{snsNotice}</span>
                </p>
              )}
            </div>
          )}

          {/* Awards & Career Timeline List */}
          <div className="space-y-3">
            <h3 className="text-base font-black text-gray-900 flex items-center gap-2 border-b-2 border-[#16A34A]/40 pb-2">
              <Award className="w-4 h-4 text-[#F97316]" />
              <span>{tr("주요 이력, 활동 및 수상 경력")}</span>
            </h3>

            <div className="bg-white p-5 rounded-2xl border border-gray-200 space-y-2.5 shadow-xs">
              {!master.awards?.length && <p className="font-normal text-gray-500">{tr("등록된 경력이 없습니다.")}</p>}
              {master.awards && master.awards.map((award, idx) => (
                <div key={idx} className="flex items-start gap-3 py-1 border-b border-stone-100 last:border-0">
                  <CheckCircle2 className="w-4 h-4 text-[#15803D] shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-gray-800 font-bold leading-relaxed">{tr(award)}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-gray-100 p-4 px-6 border-t border-gray-200 flex items-center justify-between text-xs text-gray-600 font-bold shrink-0">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#15803D]" />
            <span>{tr("사단법인 한국외식창업교육원 검증 명장·명인")}</span>
          </span>
          <button
            onClick={requestClose}
            className="px-5 py-2 bg-gradient-to-r from-[#14532D] to-[#15803D] hover:from-[#15803D] hover:to-[#16A34A] text-white rounded-xl font-bold transition-all shadow-xs cursor-pointer"
          >{tr(" 닫기 ")}</button>
        </div>

      </div>
    </div>
  );
}
