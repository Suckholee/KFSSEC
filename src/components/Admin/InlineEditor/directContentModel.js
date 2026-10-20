export const contentRegistry = new Map();
const sharedBindings = new WeakMap();
let bindingSequence = 0;
export function sharedBindingId(object) {
  if (!sharedBindings.has(object)) sharedBindings.set(object, `collection-${++bindingSequence}`);
  return sharedBindings.get(object);
}

export function valueKey(id, slot, value, language = 'ko') {
  // Use the original value to separate repeated list items, never the edited value.
  let hash = 2166136261;
  for (const c of String(value)) hash = Math.imul(hash ^ c.charCodeAt(0), 16777619);
  return `${id}_${slot}_${(hash >>> 0).toString(36)}_${language}`;
}

export function textRole(tag) {
  if (/^h[1-6]$/.test(tag)) return '제목';
  if (['button', 'a'].includes(tag)) return '버튼·메뉴 문구';
  if (['li', 'dt', 'dd'].includes(tag)) return '목록 항목';
  if (['p', 'blockquote', 'figcaption'].includes(tag)) return '설명·본문';
  if (tag === 'label') return '입력 항목 이름';
  return '문구·강조 표시';
}

export function isAllowedContentUrl(value, type) {
  if (!value) return true;
  if (value !== value.trim() || /[\u0000-\u0020\u007f]/.test(value)) return false;
  if (value.startsWith('/') && !value.startsWith('//')) return true;
  if (type === 'link' && /^(#|mailto:|tel:)/i.test(value)) return true;
  try {
    return ['https:', 'http:'].includes(new URL(value).protocol);
  } catch { return false; }
}

export function collectContentFields(root = document) {
  const fields = [];
  const seen = new Set();
  root.querySelectorAll('[data-direct-content]').forEach(element => {
    if (!element.isConnected || element.closest('[data-content-editor-ui], [role="dialog"]')) return;
    const visualElement = element.tagName === 'SOURCE' ? element.parentElement : element;
    if (!visualElement?.getClientRects().length || element.closest('.sr-only, [aria-hidden="true"]')) return;
    for (let ancestor = visualElement; ancestor; ancestor = ancestor.parentElement) {
      const style = getComputedStyle(ancestor);
      if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') return;
    }
    const entry = contentRegistry.get(element);
    if (!entry) return;
    const sector = element.closest('[data-editor-sector]');
    for (const field of entry.fields) {
      if (seen.has(field.key)) continue;
      seen.add(field.key);
      const semantic = element.closest('h1,h2,h3,h4,h5,h6,button,a,li,dt,dd,p,label');
      const label = field.label === '문구·강조 표시' && semantic ? textRole(semantic.tagName.toLowerCase()) : field.label;
      fields.push({ ...field, label, element, section: sector?.dataset.editorName || '공통 영역·메뉴' });
    }
  });
  return fields;
}
