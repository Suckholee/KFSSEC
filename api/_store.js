import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';

const LOCAL_DIR = path.resolve('server/data/content');
const TYPES = new Set(['site', 'posts', 'masters', 'chatbot', 'courses']);
const BUCKET = 'site-media';

function config() {
  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error('Supabase 서버 환경변수가 설정되지 않았습니다.');
  return { url: url.replace(/\/$/, ''), key };
}

function checkType(type) {
  if (!TYPES.has(type)) throw new Error('Unsupported content type');
}

async function supabaseRequest(route, options = {}) {
  const { url, key } = config();
  const response = await fetch(`${url}${route}`, {
    ...options,
    headers: { apikey: key, Authorization: `Bearer ${key}`, ...options.headers },
  });
  if (!response.ok) throw new Error(`Supabase ${response.status}: ${(await response.text()).slice(0, 300)}`);
  return response;
}

export async function readContent(type) {
  checkType(type);
  if (process.env.VERCEL || process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL) {
    const response = await supabaseRequest(`/rest/v1/site_content?key=eq.${type}&select=value`);
    return (await response.json())[0]?.value ?? null;
  }
  try { return JSON.parse(await fs.readFile(path.join(LOCAL_DIR, `${type}.json`), 'utf8')); }
  catch (error) { if (error.code === 'ENOENT') return null; throw error; }
}

export async function writeContent(type, value) {
  checkType(type);
  const data = JSON.stringify(value);
  if (process.env.VERCEL || process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL) {
    await supabaseRequest('/rest/v1/site_content?on_conflict=key', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Prefer: 'resolution=merge-duplicates' },
      body: JSON.stringify({ key: type, value }),
    });
  } else {
    await fs.mkdir(LOCAL_DIR, { recursive: true });
    const destination = path.join(LOCAL_DIR, `${type}.json`);
    const temporary = `${destination}.${crypto.randomUUID()}.tmp`;
    await fs.writeFile(temporary, data);
    await fs.rename(temporary, destination);
  }
}

export async function storeImage(dataUrl) {
  const match = /^data:image\/(png|jpeg|webp);base64,([\s\S]+)$/.exec(dataUrl);
  if (!match) return dataUrl;
  const bytes = Buffer.from(match[2], 'base64');
  if (bytes.length > 4 * 1024 * 1024) throw new Error('이미지는 4MB 이하만 저장할 수 있습니다.');
  const extension = match[1] === 'jpeg' ? 'jpg' : match[1];
  const pathname = `${crypto.randomUUID()}.${extension}`;
  if (process.env.VERCEL || process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL) {
    const { url } = config();
    await supabaseRequest(`/storage/v1/object/${BUCKET}/${pathname}`, {
      method: 'POST', headers: { 'Content-Type': `image/${match[1]}`, 'x-upsert': 'false' }, body: bytes,
    });
    return `${url}/storage/v1/object/public/${BUCKET}/${pathname}`;
  }
  const location = path.join(LOCAL_DIR, 'media', pathname);
  await fs.mkdir(path.dirname(location), { recursive: true });
  await fs.writeFile(location, bytes);
  return `/api/media?path=${encodeURIComponent(`media/${pathname}`)}`;
}

export async function normalizeImages(value) {
  if (typeof value === 'string') return value.startsWith('data:image/') ? storeImage(value) : value;
  if (Array.isArray(value)) return Promise.all(value.map(normalizeImages));
  if (value && typeof value === 'object') {
    const entries = await Promise.all(Object.entries(value).map(async ([key, child]) => [key, await normalizeImages(child)]));
    return Object.fromEntries(entries);
  }
  return value;
}

export async function readImage(pathname) {
  if (!/^media\/[a-f0-9-]+\.(png|jpg|webp)$/.test(pathname || '')) return null;
  try { return await fs.readFile(path.join(LOCAL_DIR, pathname)); }
  catch (error) { if (error.code === 'ENOENT') return null; throw error; }
}
