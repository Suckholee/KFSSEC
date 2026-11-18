async function readResult(response, fallback) {
  if (response.status === 413) {
    throw new Error('저장할 데이터의 용량이 너무 큽니다. 큰 사진을 줄인 뒤 다시 시도해 주세요.');
  }
  const body = await response.json().catch(() => null);
  if (!response.ok || !body?.success) throw new Error(body?.message || fallback);
  return body;
}

export async function uploadInlineImage(imageBase64) {
  if (imageBase64.length > 4_000_000) {
    const image = new Image();
    image.src = imageBase64;
    await image.decode();
    const scale = Math.min(1, 1800 / Math.max(image.width, image.height));
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.round(image.width * scale));
    canvas.height = Math.max(1, Math.round(image.height * scale));
    canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height);
    imageBase64 = canvas.toDataURL('image/webp', 0.85);
  }
  const response = await fetch('/api/upload', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ imageBase64 }),
  });
  const result = await readResult(response, '사진을 업로드하지 못했습니다.');
  if (!result.url || result.url.startsWith('data:')) throw new Error('JPG, PNG 또는 WebP 사진을 사용해 주세요.');
  return result.url;
}

async function replaceInlineImages(value, uploads) {
  if (typeof value === 'string') {
    const images = new Set(value.match(/data:image\/(?:jpeg|png|webp);base64,[a-z0-9+/]+={0,2}/gi));
    for (const image of images) {
      if (!uploads.has(image)) uploads.set(image, await uploadInlineImage(image));
      value = value.replaceAll(image, uploads.get(image));
    }
    return value;
  }
  if (!value || typeof value !== 'object') return value;
  const entries = [];
  for (const [key, child] of Object.entries(value)) {
    entries.push([key, await replaceInlineImages(child, uploads)]);
  }
  return Array.isArray(value) ? entries.map(([, child]) => child) : Object.fromEntries(entries);
}

export async function readSharedContent(type) {
  const response = await fetch(`/api/content?type=${encodeURIComponent(type)}`, { cache: 'no-store' });
  return (await readResult(response, '콘텐츠를 읽지 못했습니다.')).data;
}

export async function saveSharedContent(type, data) {
  const normalized = await replaceInlineImages(JSON.parse(JSON.stringify(data)), new Map());
  const response = await fetch(`/api/content?type=${encodeURIComponent(type)}`, {
    method: 'PUT', credentials: 'same-origin', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(normalized),
  });
  return (await readResult(response, '콘텐츠를 저장하지 못했습니다.')).data;
}

export async function uploadGalleryVideo(file) {
  const ticket = await fetch('/api/upload', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ videoType: file.type, size: file.size }),
  });
  const { uploadUrl, url } = await readResult(ticket, '동영상 업로드를 시작하지 못했습니다.');
  const response = await fetch(uploadUrl, { method: 'PUT', headers: { 'Content-Type': file.type }, body: file });
  if (!response.ok) throw new Error('동영상을 업로드하지 못했습니다. 파일을 확인한 후 다시 시도해 주세요.');
  return url;
}
