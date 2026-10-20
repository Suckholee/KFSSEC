import React, { forwardRef, useEffect, useRef } from 'react';
import { useAdminEdit } from '../../../context/AdminEditContext';
import { useLanguage } from '../../../i18n/LanguageContext';
import { useResourceItem } from '../../../content/useContentResource';
import { contentRegistry, textRole, valueKey } from './directContentModel';

// The native element and all event handlers remain intact. Visitors receive no
// editor markup; only administrator mode registers the element with the editor.
const DirectContent = forwardRef(function DirectContent({ as: Tag, contentId, children, ...props }, forwardedRef) {
  const { siteDraft, isEditMode, showEditGuides } = useAdminEdit();
  const { language } = useLanguage();
  const elementRef = useRef(null);
  const resourceItem = useResourceItem();
  const fields = [];
  const overrides = siteDraft?.contentOverrides || {};
  const bind = (slot, original, label, type = 'text') => {
    if (typeof original !== 'string' || !original.trim()) return original;
    const key = valueKey(contentId, slot, original, type === 'text' ? language : 'ko');
    const value = !resourceItem && Object.hasOwn(overrides, key) ? overrides[key] : original;
    fields.push({ key, label, type, value, original });
    return value;
  };
  const mapText = (child, index) => {
    if (Array.isArray(child)) return child.map((item, i) => mapText(item, `${index}-${i}`));
    // React elements are rendered by their own component; do not flatten icons,
    // links, formatted text, or functional child components into plain strings.
    return typeof child === 'string' ? bind(`text-${index}`, child, textRole(Tag)) : child;
  };
  const nextChildren = Array.isArray(children) ? children.map(mapText) : mapText(children, 0);
  const nextProps = { ...props };
  if (Tag === 'img') nextProps.src = bind('src', props.src, '이미지 주소', 'image');
  if (['video', 'source'].includes(Tag)) nextProps.src = bind('src', props.src, '동영상 주소', 'media');
  if (Tag === 'iframe') nextProps.src = bind('src', props.src, '삽입 영상·지도 주소', 'media');
  if (Tag === 'video') nextProps.poster = bind('poster', props.poster, '동영상 표지 이미지', 'image');
  if (Tag === 'a') nextProps.href = bind('href', props.href, '버튼·링크 이동 주소', 'link');
  if (props.alt) nextProps.alt = bind('alt', props.alt, '이미지 설명');
  if (props.placeholder) nextProps.placeholder = bind('placeholder', props.placeholder, '입력 안내 문구');
  if (typeof props.style?.backgroundImage === 'string' && /^url\(["']?(.*?)["']?\)$/.test(props.style.backgroundImage)) {
    const original = props.style.backgroundImage.match(/^url\(["']?(.*?)["']?\)$/)[1];
    const image = bind('background', original, '배경 이미지 주소', 'image');
    nextProps.style = { ...props.style, backgroundImage: `url(${JSON.stringify(image)})` };
  }

  // Refresh the registry after every render so the drawer always reads the
  // current language, current list item and the most recent draft.
  useEffect(() => {
    const element = elementRef.current;
    if (!element || !isEditMode || !fields.length) return;
    const semanticParent = element.closest('h1,h2,h3,h4,h5,h6,button,a,li,dt,dd,p,label,figcaption,blockquote');
    const role = semanticParent ? textRole(semanticParent.tagName.toLowerCase()) : textRole(Tag);
    contentRegistry.set(element, { fields: fields.map(field => field.type === 'text' && field.label === textRole(Tag) ? { ...field, label: role } : field) });

    return () => contentRegistry.delete(element);
  });

  const hasFields = fields.length > 0;
  if (isEditMode && hasFields) {
    nextProps['data-direct-content'] = contentId;
    nextProps['data-content-role'] = fields[0].label;
    if (showEditGuides && !props.title) nextProps.title = `${fields[0].label} 영역 · 클릭하여 관리 · 버튼·링크는 두 번 클릭`;
    nextProps['data-content-guides'] = showEditGuides ? 'true' : undefined;
    const openEditor = event => {
      props.onDoubleClick?.(event);
      if (event.defaultPrevented || event.target.closest('[data-direct-content]') !== event.currentTarget) return;
      event.preventDefault();
      event.stopPropagation();
      if (resourceItem?.path) window.dispatchEvent(new CustomEvent('kfssec:manage-scope', { detail: resourceItem }));
      else window.dispatchEvent(new CustomEvent('kfssec:edit-content', { detail: { element: event.currentTarget } }));
    };
    nextProps.onDoubleClick = openEditor;
    nextProps.onClick = event => {
      if (!event.target.closest('button,a,input,select,textarea,summary,[role=button],[data-content-editor-ui]')) openEditor(event);
      else props.onClick?.(event);
    };
  }
  nextProps.ref = element => {
    elementRef.current = element;
    if (typeof forwardedRef === 'function') forwardedRef(element);
    else if (forwardedRef) forwardedRef.current = element;
  };
  return React.createElement(Tag, nextProps, ...(['img', 'source', 'input'].includes(Tag) ? [] : [nextChildren]));
});

export default DirectContent;
