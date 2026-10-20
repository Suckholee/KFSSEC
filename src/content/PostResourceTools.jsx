import React, { useEffect, useRef } from 'react';
import { useAdminEdit } from '../context/AdminEditContext';
import { resourceRegistry, resourceViews, announceResources } from './resourceModel';
const template = { id: 'template-post', title: '새 자료', content: '', image: '', coverImage: '', images: [], date: '', author: '교육원', category: '공지 사항', categoryType: 'notice', visible: true };
export default function PostResourceTools({ type = 'all', galleryCategory, label = '게시글·공지 목록', sectorId }) {
  const { isEditMode, postsDraft, updatePostsDraft } = useAdminEdit();
  const ref = useRef(null), current = useRef(null);
  const path = `posts:${type}:${galleryCategory || 'all'}`;
  const matches = post => (type === 'all' || post.categoryType === type) && (!galleryCategory || post.galleryCategory === galleryCategory);
  const value = postsDraft.filter(matches);
  current.current = { path, label, type: 'media', value, defaults: value.length ? value : [{ ...template, categoryType: type === 'all' ? 'notice' : type, category: type === 'gallery' ? '갤러리' : type === 'inquiry' ? '문의' : '공지 사항', ...(galleryCategory ? { galleryCategory } : {}) }], shared: true, description: '이 자료의 변경은 홈·게시판·갤러리 등 같은 자료를 사용하는 화면에 함께 적용됩니다.', apply: next => updatePostsDraft(previous => {
    const replacement = next.map((post, index) => ({ ...post, contentOrder: index, categoryType: type === 'all' ? post.categoryType : type, ...(galleryCategory ? { galleryCategory } : {}) }));
    return type === 'all' && !galleryCategory ? replacement : [...previous.filter(post => !matches(post)), ...replacement];
  }) };
  useEffect(() => {
    if (!isEditMode) return;
    const entry = { path, get current() { return current.current; } };
    resourceRegistry.set(path, entry);
    const view = { anchor: ref.current, nodes: [], sectorId: sectorId || ref.current.closest('[data-editor-sector]')?.dataset.editorSector };
    const views = resourceViews.get(path) || new Set(); views.add(view); resourceViews.set(path, views); announceResources();
    return () => { if (resourceRegistry.get(path) === entry) resourceRegistry.delete(path); views.delete(view); if (!views.size) resourceViews.delete(path); announceResources(); };
  }, [isEditMode, path, sectorId]);
  if (!isEditMode) return null;
  return <div ref={ref} data-content-editor-ui className="flex flex-wrap gap-2 items-center mb-3"><button type="button" onClick={() => window.dispatchEvent(new CustomEvent('kfssec:manage-scope', { detail: { path } }))} className="bg-emerald-700 text-white rounded-lg px-4 py-2 text-sm font-bold">{label} 관리</button><span className="text-xs text-slate-600">자료 {value.length}개 · 추가·삭제·순서·공개 · 여러 화면 공통</span></div>;
}
