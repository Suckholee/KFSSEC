import React, { createContext, useContext, useEffect, useRef, useSyncExternalStore } from 'react';
import { useAdminEdit } from '../context/AdminEditContext';
import { resourceRegistry, resourceDefaults, resourceViews, announceResources, resourceRevision, getPath, restoreTemplates, publicItems } from './resourceModel';
const ItemContext = createContext(null);
export const useResourceItem = () => useContext(ItemContext);
const subscribe = listener => { window.addEventListener('kfssec:resources', listener); return () => window.removeEventListener('kfssec:resources', listener); };
export function useResourceCatalog() { useSyncExternalStore(subscribe, resourceRevision, () => 0); return [...resourceRegistry.values()]; }
export function useContentResource(path, defaults, options = {}) {
  const { siteDraft, isEditMode, updateSiteField } = useAdminEdit();
  const key = options.language ? `${path}.${options.language}` : path;
  const descriptorRef = useRef(null);
  if (path === 'managedLists.qualificationCatalog') defaults = defaults.map(item => {
    const legacy = siteDraft?.qualifications?.[item.id] || {};
    return { ...item, ...(legacy.name !== undefined ? {name: legacy.name} : {}), ...(legacy.description !== undefined ? {description: legacy.description} : {}), ...(legacy.poster !== undefined ? {image: legacy.poster} : {}) };
  });
  const saved = getPath(siteDraft, key);
  // Read and write exactly the same complete collection. Explicit [] is valid.
  const value = restoreTemplates(Array.isArray(saved) ? saved : defaults, defaults);
  const descriptor = { ...options, path: key, defaults, value, apply: next => updateSiteField(key, next) };
  descriptorRef.current = descriptor;
  resourceDefaults.set(key, defaults);
  useEffect(() => {
    if (!isEditMode) return;
    const proxy = { path: key, get current() { return descriptorRef.current; } };
    resourceRegistry.set(key, proxy); announceResources();
    return () => { if (resourceRegistry.get(key) === proxy) { resourceRegistry.delete(key); announceResources(); } };
  }, [isEditMode, key]);
  const visible = isEditMode ? value : publicItems(value);
  Object.defineProperty(visible, '__resourcePath', { value: key, configurable: true });
  return visible;
}
export function ManagedListView({ items, resourcePath, render }) {
  const { isEditMode } = useAdminEdit();
  const start = useRef(null), end = useRef(null);
  const path = resourcePath || items?.__resourcePath;
  useEffect(() => {
    if (!isEditMode || !path || !start.current) return;
    const anchor = start.current;
    let node = anchor.nextElementSibling;
    const nodes = [];
    while (node && node !== end.current) { node.dataset.resourcePath = path; nodes.push(node); node = node.nextElementSibling; }
    const view = { anchor, nodes, sectorId: anchor.closest('[data-editor-sector]')?.dataset.editorSector };
    const views = resourceViews.get(path) || new Set(); views.add(view); resourceViews.set(path, views); announceResources();
    return () => { nodes.forEach(el => { if (el.dataset.resourcePath === path) delete el.dataset.resourcePath; }); views.delete(view); if (!views.size) resourceViews.delete(path); announceResources(); };
  }, [isEditMode, path, items]);
  // Templates are inert HTML and valid inside lists/tables; no layout wrapper.
  return <><template ref={start} data-resource-anchor={path} />{items.map((item, index) => <ItemContext.Provider key={`${item?.id ?? index}-${index}`} value={{ path, index, id: item?.id }}>{render(item, index, items)}</ItemContext.Provider>)}<template ref={end} /></>;
}
export function resourcesForSector(sectorId) {
  return [...resourceRegistry.values()].map(entry => entry.current).filter(resource => {
    if (!resource) return false;
    const views = [...(resourceViews.get(resource.path) || [])];
    return views.some(view => view.sectorId === sectorId) || resource.sectorId === sectorId;
  });
}

export function ResourceRecord({ path, id, index, children }) {
  return <ItemContext.Provider value={{path, id, index}}><div data-resource-path={path}>{children}</div></ItemContext.Provider>;
}
