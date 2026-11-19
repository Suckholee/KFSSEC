import React, { createContext, useContext, useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { saveSharedContent, readSharedContent } from '../services/contentApi.js';
import { updateWithDefaults, sortedSectorIds } from '../content/resourceModel.js';

const AdminEditContext = createContext(null);

export function AdminEditProvider({
  children,
  initialSiteData,
  siteData,
  initialPostsList,
  postsList,
  onUpdateSiteData,
  onUpdatePostsList,
  adminAuth = { authenticated: false },
  onLogout,
}) {
  const resolvedSiteData = siteData || initialSiteData || {};
  const resolvedPostsList = postsList || initialPostsList || [];

  const isAdmin = Boolean(adminAuth?.authenticated);
  const [isEditMode, setIsEditMode] = useState(true);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  // Active Draft States
  const [siteDraft, setSiteDraft] = useState(resolvedSiteData);
  const [postsDraft, setPostsDraft] = useState(resolvedPostsList);

  // Sector Settings (order & visibility) stored in siteData.sectorSettings
  const [sectorSettings, setSectorSettings] = useState(() => resolvedSiteData?.sectorSettings || {});

  // Saved snapshots for rollback
  const [savedSnapshot, setSavedSnapshot] = useState({
    site: resolvedSiteData,
    posts: resolvedPostsList,
  });

  // Track pending changes
  const [pendingChanges, setPendingChanges] = useState({
    site: false,
    posts: false,
    count: 0,
  });

  // Drawer state
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerTab, setDrawerTab] = useState('inquiry'); // inquiry, info, database
  const [isSaving, setIsSaving] = useState(false);
  const savingRef = useRef(false);
  const [saveSuccessNotice, setSaveSuccessNotice] = useState(false);

  // Left Block TOC Navigator state (expanded by default on desktop)
  const [isNavigatorOpen, setIsNavigatorOpen] = useState(() => typeof window !== 'undefined' && window.innerWidth >= 1024);

  // Persistent Edit Guides / Highlight State (Enabled by default in edit mode)
  const [showEditGuides, setShowEditGuides] = useState(() => {
    try {
      const saved = localStorage.getItem('kfssec_show_guides');
      return saved !== null ? saved === 'true' : true;
    } catch {
      return true;
    }
  });

  const toggleEditGuides = useCallback(() => {
    setShowEditGuides(prev => {
      const next = !prev;
      try {
        localStorage.setItem('kfssec_show_guides', String(next));
      } catch (e) {}
      return next;
    });
  }, []);

  // Keep the revision associated with the draft until that draft is saved or discarded.
  // Background refreshes must not give old edits permission to overwrite newer data.
  useEffect(() => {
    if (!pendingChanges.site) {
      setSavedSnapshot(prev => ({ ...prev, site: resolvedSiteData }));
      setSiteDraft(resolvedSiteData);
      setSectorSettings(resolvedSiteData?.sectorSettings || {});
    }
  }, [resolvedSiteData]);

  useEffect(() => {
    if (!pendingChanges.posts) {
      setSavedSnapshot(prev => ({ ...prev, posts: resolvedPostsList }));
      setPostsDraft(resolvedPostsList);
    }
  }, [resolvedPostsList]);

  // Support opening admin drawer from anywhere (context menu / quick action)
  useEffect(() => {
    const handleDrawerEvent = (e) => {
      if (e.detail?.tab) setDrawerTab(e.detail.tab);
      setIsDrawerOpen(true);
    };
    window.addEventListener('kfssec:open-drawer', handleDrawerEvent);
    return () => window.removeEventListener('kfssec:open-drawer', handleDrawerEvent);
  }, []);

  // Update a field in siteData
  const updateSiteField = useCallback((path, value) => {
    setSiteDraft(prev => {
      const next = updateWithDefaults(prev, path, value);
      return next;
    });
    setPendingChanges(prev => ({
      ...prev,
      site: true,
      count: prev.count + 1,
    }));
  }, []);

  // Update entire site draft
  const updateSiteDraft = useCallback((updater) => {
    setSiteDraft(prev => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      return next;
    });
    setPendingChanges(prev => ({
      ...prev,
      site: true,
      count: prev.count + 1,
    }));
  }, []);

  // Update posts draft
  const updatePostsDraft = useCallback((updater) => {
    setPostsDraft(prev => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      return next;
    });
    setPendingChanges(prev => ({
      ...prev,
      posts: true,
      count: prev.count + 1,
    }));
  }, []);

  // Sector Visibility & Order controls
  const toggleSectorVisibility = useCallback((pageKey, sectorId, defaultVisible = true) => {
    setSectorSettings(prev => {
      const pageSectors = prev[pageKey] || {};
      const currentVal = pageSectors[sectorId]?.visible ?? defaultVisible;
      const next = {
        ...prev,
        [pageKey]: {
          ...pageSectors,
          [sectorId]: {
            ...pageSectors[sectorId],
            visible: !currentVal,
          },
        },
      };
      // Auto attach to siteDraft
      setSiteDraft(s => ({ ...s, sectorSettings: next }));
      return next;
    });
    setPendingChanges(prev => ({ ...prev, site: true, count: prev.count + 1 }));
  }, []);

  const moveSector = useCallback((pageKey, sectorList, sectorId, direction) => {
    const sorted = sortedSectorIds(sectorList.map(s => s.id), sectorSettings[pageKey] || {});
    const currentIndex = sorted.indexOf(sectorId);
    if (currentIndex < 0) return;
    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (targetIndex < 0 || targetIndex >= sectorList.length) return;

    setSectorSettings(prev => {
      const pageSectors = prev[pageKey] || {};
      const newOrderList = sorted.map(id => sectorList.find(sector => sector.id === id));
      const [moved] = newOrderList.splice(currentIndex, 1);
      newOrderList.splice(targetIndex, 0, moved);

      const orderMap = {};
      newOrderList.forEach((sec, idx) => {
        orderMap[sec.id] = { ...(pageSectors[sec.id] || {}), order: idx };
      });

      const next = {
        ...prev,
        [pageKey]: {
          ...pageSectors,
          ...orderMap,
        },
      };
      setSiteDraft(s => ({ ...s, sectorSettings: next }));
      return next;
    });
    setPendingChanges(prev => ({ ...prev, site: true, count: prev.count + 1 }));
  }, [sectorSettings]);

  useEffect(() => {
    if (!pendingChanges.count) return;
    const warn = event => {
      event.preventDefault();
      event.returnValue = '';
    };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [pendingChanges.count]);

  // Save All Changes to Supabase
  const saveAllChanges = useCallback(async () => {
    if (!isAdmin || savingRef.current) return;
    savingRef.current = true;
    setIsSaving(true);
    try {
      if (pendingChanges.site || JSON.stringify(siteDraft) !== JSON.stringify(savedSnapshot.site)) {
        const payload = { ...siteDraft, sectorSettings };
        const saved = await saveSharedContent('site', payload, savedSnapshot.site);
        if (onUpdateSiteData) await onUpdateSiteData(saved);
        setSiteDraft(saved);
        setSavedSnapshot(prev => ({ ...prev, site: saved }));
        setPendingChanges(prev => ({ ...prev, site: false, count: prev.posts ? prev.count : 0 }));
      }
      if (pendingChanges.posts || JSON.stringify(postsDraft) !== JSON.stringify(savedSnapshot.posts)) {
        const saved = await saveSharedContent('posts', postsDraft, savedSnapshot.posts);
        if (onUpdatePostsList) await onUpdatePostsList(saved);
        setPostsDraft(saved);
        setSavedSnapshot(prev => ({ ...prev, posts: saved }));
        setPendingChanges(prev => ({ ...prev, posts: false, count: prev.site ? prev.count : 0 }));
      }
      setPendingChanges({ site: false, posts: false, count: 0 });
      setSaveSuccessNotice(true);
      setTimeout(() => setSaveSuccessNotice(false), 3000);
    } catch (err) {
      console.error('Failed to save to Supabase:', err);
      alert(`저장에 실패했습니다: ${err.message || '네트워크 오류'}`);
    } finally {
      savingRef.current = false;
      setIsSaving(false);
    }
  }, [isAdmin, pendingChanges, siteDraft, postsDraft, sectorSettings, savedSnapshot, onUpdateSiteData, onUpdatePostsList]);

  const saveSiteChanges = useCallback(async update => {
    if (!isAdmin) throw new Error('관리자 로그인이 필요합니다.');
    if (savingRef.current) throw new Error('다른 저장이 진행 중입니다. 잠시 후 다시 시도해 주세요.');
    savingRef.current = true;
    setIsSaving(true);
    const payload = typeof update === 'function' ? update(siteDraft) : update;
    // Preserve the submitted values even when the server reports a conflict.
    setSiteDraft(payload);
    setPendingChanges(prev => ({ ...prev, site: true, count: prev.count + 1 }));
    try {
      const saved = await saveSharedContent('site', payload, savedSnapshot.site);
      await onUpdateSiteData?.(saved);
      setSiteDraft(saved);
      setSectorSettings(saved?.sectorSettings || {});
      setSavedSnapshot(prev => ({ ...prev, site: saved }));
      setPendingChanges(prev => ({ ...prev, site: false, count: prev.posts ? prev.count : 0 }));
    } finally {
      savingRef.current = false;
      setIsSaving(false);
    }
  }, [isAdmin, siteDraft, savedSnapshot.site, onUpdateSiteData]);

  const savePostChanges = useCallback(async update => {
    if (!isAdmin) throw new Error('관리자 로그인이 필요합니다.');
    if (savingRef.current) throw new Error('다른 저장이 진행 중입니다. 잠시 후 다시 시도해 주세요.');
    savingRef.current = true;
    setIsSaving(true);
    try {
      const saved = await saveSharedContent('posts', update(postsDraft), savedSnapshot.posts);
      await onUpdatePostsList?.(saved);
      setPostsDraft(saved);
      setSavedSnapshot(prev => ({ ...prev, posts: saved }));
      setPendingChanges(prev => ({ ...prev, posts: false, count: prev.site ? prev.count : 0 }));
    } finally {
      savingRef.current = false;
      setIsSaving(false);
    }
  }, [isAdmin, postsDraft, savedSnapshot.posts, onUpdatePostsList]);

  const publishBoardPost = useCallback(post => savePostChanges(posts => [
    { ...post, id: crypto.randomUUID(), category: '공지 사항', categoryType: 'notice', author: '관리자', date: new Date().toLocaleDateString('sv-SE', { timeZone: 'Asia/Seoul' }), views: 0, visible: true, isPinned: false },
    ...posts,
  ]), [savePostChanges]);

  // Revert all changes
  const revertAllChanges = useCallback(() => {
    if (!window.confirm('저장하지 않은 모든 수정 내역을 되돌리고 원래대로 복원하시겠습니까?')) return;
    setSiteDraft(savedSnapshot.site);
    setPostsDraft(savedSnapshot.posts);
    setSectorSettings(savedSnapshot.site?.sectorSettings || {});
    setPendingChanges({ site: false, posts: false, count: 0 });
  }, [savedSnapshot]);

  const value = useMemo(() => ({
    isAdmin,
    isEditMode: isAdmin && isEditMode && !isPreviewMode && !isSaving,
    rawEditMode: isEditMode,
    setIsEditMode,
    isPreviewMode,
    setIsPreviewMode,
    siteDraft,
    postsDraft,
    sectorSettings,
    pendingChanges,
    isSaving,
    saveSuccessNotice,
    updateSiteField,
    updateSiteDraft,
    updatePostsDraft,
    toggleSectorVisibility,
    moveSector,
    saveAllChanges,
    publishBoardPost,
    savePostChanges,
    saveSiteChanges,
    revertAllChanges,
    isDrawerOpen,
    setIsDrawerOpen,
    drawerTab,
    setDrawerTab,
    isNavigatorOpen,
    setIsNavigatorOpen,
    showEditGuides,
    setShowEditGuides,
    toggleEditGuides,
    onLogout,
  }), [
    isAdmin,
    isEditMode,
    isPreviewMode,
    siteDraft,
    postsDraft,
    sectorSettings,
    pendingChanges,
    isSaving,
    saveSuccessNotice,
    updateSiteField,
    updateSiteDraft,
    updatePostsDraft,
    toggleSectorVisibility,
    moveSector,
    saveAllChanges,
    publishBoardPost,
    savePostChanges,
    saveSiteChanges,
    revertAllChanges,
    isDrawerOpen,
    drawerTab,
    isNavigatorOpen,
    showEditGuides,
    toggleEditGuides,
    onLogout,
  ]);

  return (
    <AdminEditContext.Provider value={value}>
      {children}
    </AdminEditContext.Provider>
  );
}

export function useAdminEdit() {
  const context = useContext(AdminEditContext);
  if (!context) {
    return {
      isAdmin: false,
      isEditMode: false,
      isPreviewMode: true,
      siteDraft: {},
      postsDraft: [],
      sectorSettings: {},
      pendingChanges: { count: 0 },
      isSaving: false,
      showEditGuides: true,
      setShowEditGuides: () => {},
      toggleEditGuides: () => {},
      updateSiteField: () => {},
      updateSiteDraft: () => {},
      updatePostsDraft: () => {},
      toggleSectorVisibility: () => {},
      moveSector: () => {},
      saveAllChanges: () => {},
      revertAllChanges: () => {},
      setIsDrawerOpen: () => {},
      isNavigatorOpen: true,
      setIsNavigatorOpen: () => {},
      setIsEditMode: () => {},
      setIsPreviewMode: () => {},
    };
  }
  return context;
}
