import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { saveSharedContent, readSharedContent } from '../services/contentApi.js';

const AdminEditContext = createContext(null);

// Helper to set nested property by dot path (e.g., 'banner.title' or 'heroBanners.0.title')
function setDeepValue(obj, path, value) {
  if (!obj || typeof obj !== 'object') return obj;
  const parts = path.split('.');
  const next = Array.isArray(obj) ? [...obj] : { ...obj };
  let current = next;

  for (let i = 0; i < parts.length - 1; i++) {
    const key = parts[i];
    const rawChild = current[key];
    const isArrayNext = !isNaN(Number(parts[i + 1]));
    current[key] = rawChild && typeof rawChild === 'object'
      ? (Array.isArray(rawChild) ? [...rawChild] : { ...rawChild })
      : (isArrayNext ? [] : {});
    current = current[key];
  }

  current[parts[parts.length - 1]] = value;
  return next;
}

export function AdminEditProvider({
  children,
  initialSiteData = {},
  initialPostsList = [],
  onUpdateSiteData,
  onUpdatePostsList,
  adminAuth = { authenticated: false },
  onLogout,
}) {
  const isAdmin = Boolean(adminAuth?.authenticated);
  const [isEditMode, setIsEditMode] = useState(true);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  // Active Draft States
  const [siteDraft, setSiteDraft] = useState(initialSiteData);
  const [postsDraft, setPostsDraft] = useState(initialPostsList);

  // Sector Settings (order & visibility) stored in siteData.sectorSettings
  const [sectorSettings, setSectorSettings] = useState(() => initialSiteData?.sectorSettings || {});

  // Saved snapshots for rollback
  const [savedSnapshot, setSavedSnapshot] = useState({
    site: initialSiteData,
    posts: initialPostsList,
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
  const [saveSuccessNotice, setSaveSuccessNotice] = useState(false);

  // Sync when initial props update externally
  useEffect(() => {
    setSiteDraft(initialSiteData);
    setSectorSettings(initialSiteData?.sectorSettings || {});
    setSavedSnapshot(prev => ({ ...prev, site: initialSiteData }));
  }, [initialSiteData]);

  useEffect(() => {
    setPostsDraft(initialPostsList);
    setSavedSnapshot(prev => ({ ...prev, posts: initialPostsList }));
  }, [initialPostsList]);

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
      const next = setDeepValue(prev, path, value);
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
  const toggleSectorVisibility = useCallback((pageKey, sectorId) => {
    setSectorSettings(prev => {
      const pageSectors = prev[pageKey] || {};
      const currentVal = pageSectors[sectorId]?.visible !== false;
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
    const currentIndex = sectorList.findIndex(s => s.id === sectorId);
    if (currentIndex < 0) return;
    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (targetIndex < 0 || targetIndex >= sectorList.length) return;

    setSectorSettings(prev => {
      const pageSectors = prev[pageKey] || {};
      const newOrderList = [...sectorList];
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
  }, []);

  // Save All Changes to Supabase
  const saveAllChanges = useCallback(async () => {
    if (!isAdmin) return;
    setIsSaving(true);
    try {
      if (pendingChanges.site || JSON.stringify(siteDraft) !== JSON.stringify(savedSnapshot.site)) {
        const payload = { ...siteDraft, sectorSettings };
        const saved = await saveSharedContent('site', payload);
        if (onUpdateSiteData) onUpdateSiteData(saved);
        setSavedSnapshot(prev => ({ ...prev, site: saved }));
      }
      if (pendingChanges.posts || JSON.stringify(postsDraft) !== JSON.stringify(savedSnapshot.posts)) {
        const saved = await saveSharedContent('posts', postsDraft);
        if (onUpdatePostsList) onUpdatePostsList(saved);
        setSavedSnapshot(prev => ({ ...prev, posts: saved }));
      }
      setPendingChanges({ site: false, posts: false, count: 0 });
      setSaveSuccessNotice(true);
      setTimeout(() => setSaveSuccessNotice(false), 3000);
    } catch (err) {
      console.error('Failed to save to Supabase:', err);
      alert(`저장에 실패했습니다: ${err.message || '네트워크 오류'}`);
    } finally {
      setIsSaving(false);
    }
  }, [isAdmin, pendingChanges, siteDraft, postsDraft, sectorSettings, savedSnapshot, onUpdateSiteData, onUpdatePostsList]);

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
    isEditMode: isAdmin && isEditMode && !isPreviewMode,
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
    revertAllChanges,
    isDrawerOpen,
    setIsDrawerOpen,
    drawerTab,
    setDrawerTab,
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
    revertAllChanges,
    isDrawerOpen,
    drawerTab,
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
      updateSiteField: () => {},
      updateSiteDraft: () => {},
      updatePostsDraft: () => {},
      toggleSectorVisibility: () => {},
      moveSector: () => {},
      saveAllChanges: () => {},
      revertAllChanges: () => {},
      setIsDrawerOpen: () => {},
      setIsEditMode: () => {},
      setIsPreviewMode: () => {},
    };
  }
  return context;
}
