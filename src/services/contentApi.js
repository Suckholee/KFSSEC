export async function readSharedContent(type) {
  const response = await fetch(`/api/content?type=${encodeURIComponent(type)}`, { cache: 'no-store' });
  const body = await response.json();
  if (!response.ok || !body.success) throw new Error(body.message || '콘텐츠를 읽지 못했습니다.');
  return body.data;
}

export async function saveSharedContent(type, data) {
  const response = await fetch(`/api/content?type=${encodeURIComponent(type)}`, {
    method: 'PUT', credentials: 'same-origin', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data),
  });
  const body = await response.json();
  if (!response.ok || !body.success) throw new Error(body.message || '콘텐츠를 저장하지 못했습니다.');
  return body.data;
}
