export function profileVideoSource(value) {
  if (!value || typeof value !== 'string') return null;
  const text = value.trim();
  if (/^\/videos\/[a-z0-9_./-]+\.mp4$/i.test(text) && !text.includes('..')) return { type: 'file', src: text };
  try {
    const url = new URL(text);
    if (url.protocol !== 'https:' || url.username || url.password) return null;
    const host = url.hostname.toLowerCase();
    let id;
    if (['youtube.com', 'www.youtube.com', 'm.youtube.com'].includes(host)) id = url.searchParams.get('v') || url.pathname.match(/^\/(?:embed|shorts)\/([^/]+)$/)?.[1];
    if (host === 'youtu.be') id = url.pathname.slice(1);
    if (id && /^[a-zA-Z0-9_-]{11}$/.test(id)) return { type: 'youtube', src: `https://www.youtube-nocookie.com/embed/${id}` };
    if (/\.mp4$/i.test(url.pathname)) return { type: 'file', src: url.href };
  } catch { /* Invalid URLs remain unpublished. */ }
  return null;
}
