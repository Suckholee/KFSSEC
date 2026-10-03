import React, { useEffect, useRef, useState } from 'react';
import {
  Plus,
  Award,
  Pencil,
  Trash2,
  Save,
  ArrowLeft,
  ArrowRight,
  GripVertical,
  ChevronsUp,
  ChevronsDown,
  LayoutGrid,
  ListFilter,
  ArrowUpDown,
  Sparkles,
} from 'lucide-react';
import useMasterProfiles from '../../hooks/useMasterProfiles';
import { saveMasterProfile, deleteMasterProfile, moveMasterProfile, sortProfiles } from '../../services/masterDatabase';
import ProfileImageEditor from './ProfileImageEditor';
import { checkProfileImage } from '../../utils/profileImage';
import MasterPhotoGrid from '../Master/MasterPhotoGrid';

const inputClass = 'mt-2 w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600';
const buttonClass = 'inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-2 text-sm font-bold disabled:opacity-50 cursor-pointer';

export default function AdminMasters({ initialProfileId = null }) {
  const headingRef = useRef(null);
  const { profiles, error: readError } = useMasterProfiles();
  const [search, setSearch] = useState('');
  const [group, setGroup] = useState('all');
  const [viewMode, setViewMode] = useState(() => {
    try {
      return localStorage.getItem('kfssec_masters_view_mode') || 'list';
    } catch {
      return 'list';
    }
  });

  const [draft, setDraft] = useState(null);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [draggedId, setDraggedId] = useState(null);
  const [dropId, setDropId] = useState(null);
  const [imageStatus, setImageStatus] = useState('empty');
  const [saving, setSaving] = useState(false);
  const savingRef = useRef(false);
  const originalRef = useRef(null);
  const initialDraftRef = useRef('');
  const dirty = draft && JSON.stringify(draft) !== initialDraftRef.current;

  const changeViewMode = (mode) => {
    setViewMode(mode);
    try {
      localStorage.setItem('kfssec_masters_view_mode', mode);
    } catch {}
  };

  useEffect(() => {
    if (!dirty) return;
    const warn = (e) => {
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);

  useEffect(() => {
    headingRef.current?.scrollIntoView({ block: 'start' });
  }, [draft?.id]);

  // Auto-open draft if initialProfileId is passed
  useEffect(() => {
    if (initialProfileId && profiles.length > 0 && !draft) {
      const found = profiles.find((p) => p.id === initialProfileId || p.name === initialProfileId);
      if (found) {
        edit(found);
      }
    }
  }, [initialProfileId, profiles]);

  const filtered = profiles.filter(
    (p) => (group === 'all' || p.group === group) && `${p.name} ${p.title}`.includes(search.trim())
  );
  const canArrange = !search.trim() && !readError;
  const groupIds = (profile) => profiles.filter((p) => p.group === profile.group).map((p) => p.id);

  const move = async (profile, targetId, expectedIds = groupIds(profile)) => {
    try {
      await moveMasterProfile(profile.id, targetId, expectedIds);
      setError('');
      setNotice(`✅ [${profile.name}] 프로필의 배치 순서가 저장되어 사이트에 즉시 반영되었습니다.`);
    } catch (err) {
      setError(err.message);
    } finally {
      setDraggedId(null);
      setDropId(null);
    }
  };

  // Move to a specific 0-based index within the given list
  const moveToIndex = async (profile, targetIndex, currentList) => {
    if (targetIndex < 0 || targetIndex >= currentList.length) return;
    const targetProfile = currentList[targetIndex];
    if (!targetProfile || targetProfile.id === profile.id) return;
    await move(profile, targetProfile.id, currentList.map((p) => p.id));
  };

  // HTML5 Drag & Drop handlers
  const handleDragStart = (e, profile) => {
    if (!canArrange) return;
    e.dataTransfer.setData('text/plain', profile.id);
    e.dataTransfer.effectAllowed = 'move';
    setDraggedId(profile.id);
  };

  const handleDragOver = (e, profile) => {
    if (!canArrange || !draggedId) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dropId !== profile.id) {
      setDropId(profile.id);
    }
  };

  const handleDragEnd = () => {
    setDraggedId(null);
    setDropId(null);
  };

  const handleDrop = (e, targetProfile, currentList) => {
    e.preventDefault();
    if (!canArrange || !draggedId || draggedId === targetProfile.id) {
      handleDragEnd();
      return;
    }
    const sourceProfile = profiles.find((p) => p.id === draggedId);
    if (sourceProfile && sourceProfile.group === targetProfile.group) {
      move(sourceProfile, targetProfile.id, currentList.map((p) => p.id));
    }
    handleDragEnd();
  };

  const edit = (profile) => {
    originalRef.current = profiles.find((p) => p.id === profile.id) || null;
    const next = { ...profile, awardsText: (profile.awards || []).join('\n') };
    initialDraftRef.current = JSON.stringify(next);
    setDraft(next);
    setImageStatus(profile.image ? 'checking' : 'empty');
    setError('');
    setNotice('');
  };

  const change = (key, value) => setDraft((d) => (d ? { ...d, [key]: value } : d));

  const close = () => {
    if (!dirty || window.confirm('편집을 종료할까요? 저장하지 않은 내용은 사라집니다.')) {
      setDraft(null);
      setError('');
    }
  };

  const save = async (event) => {
    event.preventDefault();
    if (savingRef.current || imageStatus === 'checking' || imageStatus === 'error') return;
    savingRef.current = true;
    setSaving(true);
    setError('');
    try {
      const { awardsText, ...profile } = draft;
      await checkProfileImage(profile.image);
      await saveMasterProfile(
        { ...profile, awards: awardsText.split('\n').map((s) => s.trim()).filter(Boolean) },
        originalRef.current
      );
      setDraft(null);
      setNotice('프로필을 저장했습니다. 공개 페이지에 반영되었습니다.');
    } catch (err) {
      setError(err.message);
    } finally {
      savingRef.current = false;
      setSaving(false);
    }
  };

  const remove = async (profile) => {
    if (!window.confirm(`${profile.name} 프로필을 삭제할까요? 삭제 후 복구할 수 없습니다.`)) return;
    try {
      await deleteMasterProfile(profile.id);
      setError('');
      setNotice('프로필을 삭제했습니다.');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="mx-auto max-w-6xl space-y-6">
      <header ref={headingRef} className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Award className="text-emerald-700 w-7 h-7" />
            <span>대한민국 명장·명인 전체 관리</span>
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            사진, 소개, 경력 수정 및 웹사이트에 노출되는 표시 순서를 편리하게 관리합니다.
          </p>
        </div>
        {!draft && (
          <button
            disabled={!!readError}
            className={`${buttonClass} bg-emerald-800 hover:bg-emerald-900 text-white shadow-xs transition-colors`}
            onClick={() =>
              edit({
                id: crypto.randomUUID(),
                headline: '',
                name: '',
                group: 'expert',
                image: '',
                title: '',
                intro: '',
                awards: [],
                blogUrl: '',
                youtubeUrl: '',
                instagramUrl: '',
                published: true,
                order: Math.max(0, ...profiles.map((p) => p.order)) + 1,
              })
            }
          >
            <Plus size={16} />
            <span>신규 프로필 등록</span>
          </button>
        )}
      </header>

      {(error || readError) && (
        <p role="alert" className="rounded-2xl bg-rose-50 border border-rose-200 p-4 text-sm font-bold text-rose-800">
          ⚠️ {error || readError}
        </p>
      )}

      {notice && (
        <div role="status" className="rounded-2xl bg-emerald-50 border border-emerald-200 p-4 text-sm font-bold text-emerald-900 flex items-center justify-between">
          <span>{notice}</span>
          <button onClick={() => setNotice('')} className="text-emerald-700 hover:text-emerald-950 text-xs underline cursor-pointer">
            닫기
          </button>
        </div>
      )}

      {draft ? (
        /* EDIT / REGISTRATION FORM */
        <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
          <form onSubmit={save} className="space-y-5 rounded-2xl border bg-white p-5 shadow-xs">
            <fieldset disabled={saving} className="min-w-0 space-y-5">
              <button type="button" disabled={saving} onClick={close} className={buttonClass}>
                <ArrowLeft size={16} />
                <span>목록으로 돌아가기</span>
              </button>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="text-sm font-bold">
                  이름 *
                  <input
                    required
                    maxLength={50}
                    className={inputClass}
                    value={draft.name}
                    onChange={(e) => change('name', e.target.value)}
                  />
                </label>
                <label className="text-sm font-bold">
                  구분
                  <select
                    className={inputClass}
                    value={draft.group}
                    onChange={(e) => change('group', e.target.value)}
                  >
                    <option value="master">명장</option>
                    <option value="expert">명인</option>
                  </select>
                </label>
              </div>

              <label className="block text-sm font-bold">
                카드 소개 문구
                <span className="ml-2 text-xs text-gray-500 font-normal">짧게 두 줄로 입력</span>
                <textarea
                  rows={2}
                  maxLength={60}
                  className={inputClass}
                  value={draft.headline || ''}
                  onChange={(e) => change('headline', e.target.value)}
                  placeholder="전문 분야와 개성을 담은 한마디"
                />
              </label>

              <label className="block text-sm font-bold">
                직함 · 전문 분야
                <input
                  className={inputClass}
                  maxLength={200}
                  value={draft.title}
                  onChange={(e) => change('title', e.target.value)}
                  placeholder="예: 한식 조리 / 전통 발효 전문가"
                />
              </label>

              {/* SNS Links (블로그, 유튜브, 인스타그램) */}
              <div className="space-y-3 rounded-xl border border-emerald-100 bg-emerald-50/50 p-4">
                <p className="text-sm font-bold text-emerald-950 flex items-center gap-1.5">
                  <span>🔗 SNS 및 외부 채널 연동</span>
                  <span className="text-xs font-normal text-emerald-700">(선택 사항)</span>
                </p>
                <div className="grid gap-3 sm:grid-cols-3">
                  <label className="text-xs font-bold text-gray-700">
                    네이버 블로그 / 홈페이지
                    <input
                      className={inputClass}
                      value={draft.blogUrl || ''}
                      onChange={(e) => change('blogUrl', e.target.value)}
                      placeholder="https://blog.naver.com/..."
                    />
                  </label>
                  <label className="text-xs font-bold text-gray-700">
                    유튜브 채널
                    <input
                      className={inputClass}
                      value={draft.youtubeUrl || ''}
                      onChange={(e) => change('youtubeUrl', e.target.value)}
                      placeholder="https://youtube.com/@..."
                    />
                  </label>
                  <label className="text-xs font-bold text-gray-700">
                    인스타그램
                    <input
                      className={inputClass}
                      value={draft.instagramUrl || ''}
                      onChange={(e) => change('instagramUrl', e.target.value)}
                      placeholder="https://instagram.com/..."
                    />
                  </label>
                </div>
              </div>

              <ProfileImageEditor
                key={draft.id}
                value={draft.image}
                original={originalRef.current?.image || ''}
                onChange={(value) => change('image', value)}
                onStatus={setImageStatus}
                disabled={saving}
              />

              <label className="block text-sm font-bold">
                소개
                <textarea
                  rows={4}
                  maxLength={5000}
                  className={inputClass}
                  value={draft.intro}
                  onChange={(e) => change('intro', e.target.value)}
                />
              </label>

              <label className="block text-sm font-bold">
                주요 경력 · 수상 내역
                <span className="ml-2 text-xs text-gray-500 font-normal">한 줄에 하나씩 입력</span>
                <textarea
                  rows={6}
                  maxLength={10000}
                  className={inputClass}
                  value={draft.awardsText}
                  onChange={(e) => change('awardsText', e.target.value)}
                />
              </label>

              <div className="flex flex-wrap items-center gap-6">
                <label className="flex items-center gap-2 text-sm font-bold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={draft.published}
                    onChange={(e) => change('published', e.target.checked)}
                    className="w-4 h-4 text-emerald-600 rounded"
                  />
                  <span>사이트에 공개</span>
                </label>
              </div>

              <button
                disabled={
                  saving ||
                  imageStatus === 'checking' ||
                  imageStatus === 'error' ||
                  (draft.published && !draft.image.trim()) ||
                  !!readError
                }
                className={`${buttonClass} bg-emerald-800 hover:bg-emerald-900 text-white w-full sm:w-auto`}
              >
                <Save size={16} />
                <span>
                  {saving ? '저장 중…' : imageStatus === 'checking' ? '이미지 확인 중…' : '프로필 저장'}
                </span>
              </button>
              {draft.published && !draft.image.trim() && (
                <p className="text-sm text-amber-800">
                  공개하려면 사진을 등록해 주세요. 사진 없이 저장하려면 공개를 해제하세요.
                </p>
              )}
            </fieldset>
          </form>

          <aside className="space-y-4">
            <h2 className="font-bold text-sm text-stone-700">카드 미리보기</h2>
            <div className="[&>div]:!grid-cols-1">
              <MasterPhotoGrid
                profiles={[
                  {
                    ...draft,
                    image: imageStatus === 'ready' ? draft.image : '',
                    awards: draft.awardsText.split('\n').map((s) => s.trim()).filter(Boolean),
                  },
                ]}
              />
            </div>
            <p className="text-xs text-gray-500">
              저장 후 사이트의 프로필을 클릭하면 소개와 경력이 상세 팝업으로 표시됩니다.
            </p>
          </aside>
        </div>
      ) : (
        /* MASTER / EXPERT LIST & ARRANGEMENT */
        <>
          {/* Top Control Bar: Search, Category Filter, View Mode Toggle */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-stone-50 p-4 rounded-2xl border border-stone-200">
            <div className="flex flex-wrap items-center gap-2.5">
              <input
                aria-label="프로필 검색"
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="이름 또는 전문 분야 검색"
                className="rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 sm:w-64"
              />
              <select
                aria-label="구분 필터"
                value={group}
                onChange={(e) => setGroup(e.target.value)}
                className="rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-bold text-stone-700 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              >
                <option value="all">전체 구분</option>
                <option value="master">명장만 보기</option>
                <option value="expert">명인만 보기</option>
              </select>
            </div>

            {/* View Mode Switcher (List vs Card) */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-stone-500 hidden sm:inline">
                총 {filtered.length}명 (공개 {profiles.filter((p) => p.published).length}명)
              </span>

              <div className="flex items-center bg-white p-1 rounded-xl border border-stone-300 shadow-2xs">
                <button
                  type="button"
                  onClick={() => changeViewMode('list')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    viewMode === 'list'
                      ? 'bg-emerald-800 text-white font-black shadow-xs'
                      : 'text-stone-600 hover:text-stone-950 hover:bg-stone-50'
                  }`}
                  title="순서 정렬에 최적화된 컴팩트 목록 뷰"
                >
                  <ListFilter className="w-3.5 h-3.5" />
                  <span>간편 순서 목록</span>
                </button>
                <button
                  type="button"
                  onClick={() => changeViewMode('grid')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    viewMode === 'grid'
                      ? 'bg-emerald-800 text-white font-black shadow-xs'
                      : 'text-stone-600 hover:text-stone-950 hover:bg-stone-50'
                  }`}
                  title="사진과 프로필을 한눈에 보는 카드 뷰"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span>카드 뷰</span>
                </button>
              </div>
            </div>
          </div>

          {/* User Guidance Banner */}
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/80 p-4 text-xs sm:text-sm text-emerald-950 space-y-1">
            <div className="flex items-center gap-2 font-black text-emerald-900">
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
              <span>순서 변경 안내</span>
            </div>
            {canArrange ? (
              <p className="text-emerald-800 leading-relaxed">
                • <strong>원클릭 이동</strong>: <code className="bg-white px-1.5 py-0.5 rounded border border-emerald-200 text-emerald-900 font-bold">⏫ 맨 위</code>, <code className="bg-white px-1.5 py-0.5 rounded border border-emerald-200 text-emerald-900 font-bold">🔼 1칸 위</code>, <code className="bg-white px-1.5 py-0.5 rounded border border-emerald-200 text-emerald-900 font-bold">🔽 1칸 아래</code>, <code className="bg-white px-1.5 py-0.5 rounded border border-emerald-200 text-emerald-900 font-bold">⏬ 맨 아래</code> 버튼으로 쉽게 옮길 수 있습니다.<br />
                • <strong>직접 번호 지정</strong>: 순서 번호(<span className="font-mono font-bold text-emerald-950">#1, #2...</span>)를 누르면 원하는 순번으로 단번에 이동합니다.<br />
                • <strong>드래그 이동</strong>: 왼쪽의 <span className="font-bold">끌기 손잡이(::)</span>를 잡고 위/아래로 끌어다 놓아도 됩니다. (변경 사항은 즉시 서버와 사이트에 반영됩니다)
              </p>
            ) : (
              <p className="text-stone-600">
                ⚠️ 검색어를 입력한 상태에서는 순서를 변경할 수 없습니다. 검색어를 지우면 순서 변경 버튼과 드래그 기능이 활성화됩니다.
              </p>
            )}
          </div>

          {/* Master / Expert Groups */}
          {['master', 'expert']
            .filter((type) => group === 'all' || group === type)
            .map((type) => {
              const currentGroupList = filtered.filter((p) => p.group === type);
              if (currentGroupList.length === 0) return null;

              return (
                <section key={type} className="space-y-3" aria-label={`${type === 'master' ? '명장' : '명인'} 배치 목록`}>
                  <div className="flex items-center justify-between border-b pb-2">
                    <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${type === 'master' ? 'bg-[#C59B58]' : 'bg-[#15803D]'}`} />
                      <span>{type === 'master' ? '대한민국 명장' : '대한민국 명인'}</span>
                      <span className="text-xs font-normal text-stone-500 bg-stone-100 px-2 py-0.5 rounded-full">
                        총 {currentGroupList.length}명
                      </span>
                    </h2>
                    <span className="text-xs text-stone-400">
                      {type === 'master' ? '홈페이지 최상단 우선 노출' : '명장 목록 하단 노출'}
                    </span>
                  </div>

                  {/* VIEW MODE 1: COMPACT LIST VIEW (FAST, INTUITIVE REORDERING) */}
                  {viewMode === 'list' ? (
                    <div className="space-y-2">
                      {currentGroupList.map((profile, index, list) => {
                        const isDragging = draggedId === profile.id;
                        const isDropTarget = dropId === profile.id && draggedId !== profile.id;

                        return (
                          <div
                            key={profile.id}
                            draggable={canArrange}
                            onDragStart={(e) => handleDragStart(e, profile)}
                            onDragOver={(e) => handleDragOver(e, profile)}
                            onDragEnd={handleDragEnd}
                            onDrop={(e) => handleDrop(e, profile, list)}
                            className={`flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 p-2.5 sm:p-3 bg-white rounded-2xl border transition-all ${
                              isDragging
                                ? 'opacity-40 border-dashed border-emerald-500 bg-emerald-50/50'
                                : isDropTarget
                                ? 'border-2 border-emerald-600 ring-4 ring-emerald-100 shadow-md scale-[1.01]'
                                : 'border-stone-200 hover:border-emerald-300 hover:shadow-xs'
                            }`}
                          >
                            {/* Left: Drag Handle, Rank Badge, Thumbnail, Info */}
                            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
                              {/* Drag Handle */}
                              <div
                                title={canArrange ? `${profile.name} 끌어서 순서 이동` : '검색 중에는 드래그 불가'}
                                className={`p-1.5 rounded-lg transition-colors shrink-0 ${
                                  canArrange
                                    ? 'text-stone-400 hover:text-emerald-700 hover:bg-emerald-50 cursor-grab active:cursor-grabbing'
                                    : 'text-stone-300 cursor-not-allowed'
                                }`}
                              >
                                <GripVertical className="w-5 h-5" />
                              </div>

                              {/* Direct Order Rank Select Box */}
                              <div className="relative shrink-0" title="클릭하여 원하는 순번으로 즉시 이동">
                                <select
                                  value={index + 1}
                                  onChange={(e) => moveToIndex(profile, Number(e.target.value) - 1, list)}
                                  disabled={!canArrange}
                                  aria-label={`${profile.name} 순서 번호 선택`}
                                  className="w-12 h-8 text-center bg-stone-100 hover:bg-emerald-100 text-stone-800 hover:text-emerald-900 font-mono font-black text-xs rounded-xl border border-stone-300 cursor-pointer focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-colors"
                                >
                                  {list.map((_, i) => (
                                    <option key={i + 1} value={i + 1}>
                                      #{i + 1}
                                    </option>
                                  ))}
                                </select>
                              </div>

                              {/* Thumbnail Photo */}
                              <div className="w-11 h-11 shrink-0 rounded-xl bg-stone-100 border border-stone-200 overflow-hidden flex items-center justify-center">
                                {profile.image ? (
                                  <img src={profile.image} alt={profile.name} className="w-full h-full object-cover" />
                                ) : (
                                  <span className="text-[10px] text-stone-400">사진없음</span>
                                )}
                              </div>

                              {/* Info: Name, Title, Badges */}
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span
                                    className={`px-2 py-0.5 rounded-full text-[11px] font-black shrink-0 ${
                                      profile.group === 'master'
                                        ? 'bg-[#C59B58]/20 text-[#8C6D32] border border-[#C59B58]/30'
                                        : 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                                    }`}
                                  >
                                    {profile.group === 'master' ? '명장' : '명인'}
                                  </span>
                                  <span className="font-black text-stone-900 text-sm truncate">{profile.name}</span>
                                  <span
                                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${
                                      profile.published
                                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                        : 'bg-stone-100 text-stone-500'
                                    }`}
                                  >
                                    {profile.published ? '공개' : '비공개'}
                                  </span>
                                </div>
                                <p className="text-xs text-stone-500 truncate mt-0.5">
                                  {profile.title || '전문 분야 미등록'}
                                </p>
                              </div>
                            </div>

                            {/* Right: 4-Way Quick Buttons & Actions */}
                            <div className="flex items-center gap-1.5 shrink-0 w-full sm:w-auto justify-end border-t sm:border-t-0 pt-2 sm:pt-0">
                              {/* 4-Way Quick Order Move Buttons */}
                              <div className="flex items-center bg-stone-100 p-1 rounded-xl border border-stone-200 gap-0.5">
                                <button
                                  type="button"
                                  disabled={!canArrange || index === 0}
                                  onClick={() => moveToIndex(profile, 0, list)}
                                  title="맨 위로 이동 (#1)"
                                  className="p-1.5 text-stone-600 hover:text-emerald-700 hover:bg-white rounded-lg disabled:opacity-20 transition-all cursor-pointer"
                                >
                                  <ChevronsUp className="w-4 h-4" />
                                </button>
                                <button
                                  type="button"
                                  disabled={!canArrange || index === 0}
                                  onClick={() => move(profile, list[index - 1].id)}
                                  title="1칸 위로 이동"
                                  className="p-1.5 text-stone-600 hover:text-emerald-700 hover:bg-white rounded-lg disabled:opacity-20 transition-all cursor-pointer flex items-center gap-0.5 text-xs font-bold"
                                >
                                  <ArrowLeft className="w-3.5 h-3.5 rotate-90" />
                                  <span className="hidden md:inline">위</span>
                                </button>
                                <button
                                  type="button"
                                  disabled={!canArrange || index === list.length - 1}
                                  onClick={() => move(profile, list[index + 1].id)}
                                  title="1칸 아래로 이동"
                                  className="p-1.5 text-stone-600 hover:text-emerald-700 hover:bg-white rounded-lg disabled:opacity-20 transition-all cursor-pointer flex items-center gap-0.5 text-xs font-bold"
                                >
                                  <span className="hidden md:inline">아래</span>
                                  <ArrowRight className="w-3.5 h-3.5 rotate-90" />
                                </button>
                                <button
                                  type="button"
                                  disabled={!canArrange || index === list.length - 1}
                                  onClick={() => moveToIndex(profile, list.length - 1, list)}
                                  title="맨 아래로 이동"
                                  className="p-1.5 text-stone-600 hover:text-emerald-700 hover:bg-white rounded-lg disabled:opacity-20 transition-all cursor-pointer"
                                >
                                  <ChevronsDown className="w-4 h-4" />
                                </button>
                              </div>

                              {/* Edit & Delete Buttons */}
                              <button
                                type="button"
                                onClick={() => edit(profile)}
                                className="px-3 py-1.5 bg-stone-100 hover:bg-emerald-50 text-stone-700 hover:text-emerald-800 text-xs font-bold rounded-xl border border-stone-200 transition-colors flex items-center gap-1 cursor-pointer"
                              >
                                <Pencil className="w-3.5 h-3.5" />
                                <span>수정</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => remove(profile)}
                                className="p-1.5 text-stone-400 hover:text-rose-700 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                                title="삭제"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    /* VIEW MODE 2: CARD GRID VIEW (IMPROVED WITH RANK BADGE & 4-WAY MOVES) */
                    <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
                      {currentGroupList.map((profile, index, list) => {
                        const isDragging = draggedId === profile.id;
                        const isDropTarget = dropId === profile.id && draggedId !== profile.id;

                        return (
                          <article
                            key={profile.id}
                            draggable={canArrange}
                            onDragStart={(e) => handleDragStart(e, profile)}
                            onDragOver={(e) => handleDragOver(e, profile)}
                            onDragEnd={handleDragEnd}
                            onDrop={(e) => handleDrop(e, profile, list)}
                            className={`rounded-2xl border bg-white p-4 space-y-4 transition-all ${
                              isDragging
                                ? 'opacity-40 border-dashed border-emerald-500 bg-emerald-50/50'
                                : isDropTarget
                                ? 'border-2 border-emerald-600 ring-4 ring-emerald-100 shadow-md scale-[1.01]'
                                : 'border-stone-200 hover:border-emerald-300 hover:shadow-sm'
                            }`}
                          >
                            {/* Card Top Header: Drag Handle, Rank Badge, 4-Way Quick Reorder */}
                            <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-3">
                              <div className="flex items-center gap-2">
                                <div
                                  title={canArrange ? `${profile.name} 끌어서 순서 이동` : '검색 중에는 드래그 불가'}
                                  className={`inline-flex items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-bold transition-colors ${
                                    canArrange
                                      ? 'text-stone-600 hover:text-emerald-800 hover:bg-emerald-50 cursor-grab active:cursor-grabbing bg-stone-100'
                                      : 'text-stone-300 cursor-not-allowed bg-stone-50'
                                  }`}
                                >
                                  <GripVertical size={16} />
                                  <span>끌기</span>
                                </div>

                                {/* Direct Order Select */}
                                <select
                                  value={index + 1}
                                  onChange={(e) => moveToIndex(profile, Number(e.target.value) - 1, list)}
                                  disabled={!canArrange}
                                  aria-label={`${profile.name} 순서 선택`}
                                  className="h-7 px-1 text-center bg-stone-100 hover:bg-emerald-100 text-stone-800 font-mono font-black text-xs rounded-lg border border-stone-300 cursor-pointer focus:outline-none"
                                >
                                  {list.map((_, i) => (
                                    <option key={i + 1} value={i + 1}>
                                      #{i + 1}
                                    </option>
                                  ))}
                                </select>
                              </div>

                              {/* 4 Quick Move Buttons */}
                              <div className="flex items-center gap-0.5 bg-stone-50 p-0.5 rounded-xl border border-stone-200">
                                <button
                                  type="button"
                                  disabled={!canArrange || index === 0}
                                  onClick={() => moveToIndex(profile, 0, list)}
                                  title="맨 앞으로 이동 (#1)"
                                  className="p-1.5 text-stone-600 hover:text-emerald-700 hover:bg-white rounded-lg disabled:opacity-20 transition-all cursor-pointer"
                                >
                                  <ChevronsUp className="w-3.5 h-3.5 -rotate-90" />
                                </button>
                                <button
                                  type="button"
                                  disabled={!canArrange || index === 0}
                                  onClick={() => move(profile, list[index - 1].id)}
                                  title="앞으로 1칸 이동"
                                  className="inline-flex items-center gap-1 px-2 py-1 text-xs font-bold text-stone-700 hover:text-emerald-800 hover:bg-white rounded-lg disabled:opacity-20 transition-all cursor-pointer"
                                >
                                  <ArrowLeft size={13} />
                                  <span>앞</span>
                                </button>
                                <button
                                  type="button"
                                  disabled={!canArrange || index === list.length - 1}
                                  onClick={() => move(profile, list[index + 1].id)}
                                  title="뒤로 1칸 이동"
                                  className="inline-flex items-center gap-1 px-2 py-1 text-xs font-bold text-stone-700 hover:text-emerald-800 hover:bg-white rounded-lg disabled:opacity-20 transition-all cursor-pointer"
                                >
                                  <span>뒤</span>
                                  <ArrowRight size={13} />
                                </button>
                                <button
                                  type="button"
                                  disabled={!canArrange || index === list.length - 1}
                                  onClick={() => moveToIndex(profile, list.length - 1, list)}
                                  title="맨 뒤로 이동"
                                  className="p-1.5 text-stone-600 hover:text-emerald-700 hover:bg-white rounded-lg disabled:opacity-20 transition-all cursor-pointer"
                                >
                                  <ChevronsDown className="w-3.5 h-3.5 -rotate-90" />
                                </button>
                              </div>
                            </div>

                            {/* Card Content */}
                            <div className="flex gap-4">
                              <div className="h-24 w-20 shrink-0 rounded-xl bg-stone-100 border border-stone-200 overflow-hidden flex items-center justify-center">
                                {profile.image ? (
                                  <img src={profile.image} alt={profile.name} className="h-full w-full object-cover" />
                                ) : (
                                  <span className="flex h-full items-center justify-center text-xs text-gray-400">사진 없음</span>
                                )}
                              </div>
                              <div className="min-w-0 flex-1">
                                <span
                                  className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-black ${
                                    profile.group === 'master'
                                      ? 'bg-[#C59B58]/20 text-[#8C6D32] border border-[#C59B58]/30'
                                      : 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                                  }`}
                                >
                                  {profile.group === 'master' ? '명장' : '명인'}
                                </span>
                                <h3 className="mt-1 text-base font-black text-stone-900 truncate">{profile.name}</h3>
                                <p className="truncate text-xs text-gray-500 mt-0.5">{profile.title || '전문 분야 미등록'}</p>
                                <span
                                  className={`mt-2 inline-block rounded-full px-2 py-0.5 text-[10px] font-bold ${
                                    profile.published
                                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                                      : 'bg-gray-100 text-gray-600'
                                  }`}
                                >
                                  {profile.published ? '공개' : '비공개'}
                                </span>
                              </div>
                            </div>

                            {/* Card Actions: Edit & Delete */}
                            <div className="flex gap-2 border-t pt-3">
                              <button
                                type="button"
                                className={`${buttonClass} flex-1 bg-stone-50 hover:bg-emerald-50 hover:text-emerald-900`}
                                onClick={() => edit(profile)}
                              >
                                <Pencil size={14} />
                                <span>수정</span>
                              </button>
                              <button
                                type="button"
                                className={`${buttonClass} text-rose-700 hover:bg-rose-50 hover:border-rose-200`}
                                onClick={() => remove(profile)}
                              >
                                <Trash2 size={14} />
                                <span>삭제</span>
                              </button>
                            </div>
                          </article>
                        );
                      })}
                    </div>
                  )}
                </section>
              );
            })}

          {!filtered.length && !readError && (
            <div className="py-16 text-center text-gray-500 bg-stone-50 rounded-2xl border border-stone-200">
              <p className="text-base font-bold text-stone-700">등록된 프로필 또는 검색 결과가 없습니다.</p>
              <p className="text-xs text-stone-400 mt-1">검색어를 변경하거나 신규 프로필을 등록해 보세요.</p>
            </div>
          )}
        </>
      )}
    </section>
  );
}
