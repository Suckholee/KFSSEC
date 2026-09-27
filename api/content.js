import { requireAdmin } from './_auth.js';
import { normalizeImages, readContent, writeContent } from './_store.js';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  const type = req.query?.type;
  if (!['site', 'posts', 'masters', 'chatbot'].includes(type)) return res.status(400).json({ success: false, message: 'Invalid content type' });
  try {
    if (req.method === 'GET') return res.status(200).json({ success: true, data: await readContent(type) });
    if (req.method !== 'PUT') return res.status(405).json({ success: false });
    if (!requireAdmin(req, res)) return;
    if (!req.body || typeof req.body !== 'object') return res.status(400).json({ success: false, message: 'Invalid content' });
    const data = await normalizeImages(req.body);
    await writeContent(type, data);
    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Content API error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
}
