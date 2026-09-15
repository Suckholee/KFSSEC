export const MAX_PROFILE_IMAGE_BYTES = 1024 * 1024;

export function normalizeProfileImage(value = '') {
  const src = value.trim();
  if (!src) return '';
  if (/^data:image\/(png|jpeg|webp);base64,[A-Za-z0-9+/]+={0,2}$/.test(src)) {
    if (src.length > Math.ceil(MAX_PROFILE_IMAGE_BYTES * 4 / 3) + 40) throw new Error('사진은 1MB 이하로 등록해 주세요.');
    return src;
  }
  if (/^[\s\S]*[\\\u0000-\u001f]/.test(src)) throw new Error('올바른 이미지 주소를 입력해 주세요.');
  if (src.startsWith('/') && !src.startsWith('//')) return src;
  try {
    const url = new URL(src);
    if (!['https:', 'http:'].includes(url.protocol) || url.username || url.password) throw new Error();
    return url.href;
  } catch { throw new Error('https:// 이미지 주소 또는 /images/로 시작하는 사이트 경로를 입력해 주세요.'); }
}

export function checkProfileImage(value) {
  const src = normalizeProfileImage(value);
  if (!src) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const img = new Image();
    const finish = error => {
      clearTimeout(timer); img.onload = null; img.onerror = null;
      if (error) reject(error); else resolve();
    };
    const timer = setTimeout(() => finish(new Error('이미지 응답이 너무 늦습니다. 주소를 확인하거나 파일로 등록해 주세요.')), 10000);
    img.onload = () => finish(img.naturalWidth && img.naturalHeight ? null : new Error('이미지를 읽을 수 없습니다.'));
    img.onerror = () => finish(new Error('이미지를 불러올 수 없습니다. 주소 또는 파일을 확인해 주세요.'));
    img.src = src;
  });
}
