export const sectorRegistry = new Map();
export function selectScope(element) {
  document.querySelectorAll('[data-scope-selected]').forEach(node => node.removeAttribute('data-scope-selected'));
  element?.setAttribute('data-scope-selected', 'true');
}
export const clearScope = () => document.querySelectorAll('[data-scope-selected]').forEach(node => node.removeAttribute('data-scope-selected'));
