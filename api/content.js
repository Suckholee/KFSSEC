import { normalizePopupSchedule } from '../src/utils/popupSchedule.js';
import { requireAdmin } from './_auth.js';
import { normalizeImages, readContent, writeContent } from './_store.js';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  const type = req.query?.type;
  if (!['site', 'posts', 'masters', 'chatbot'].includes(type)) return res.status(400).json({ success: false, message: 'Invalid content type' });
  try {
    if (req.method === 'GET') {
      const data = await readContent(type);
      if (type === 'site' && data?.popupNotice) data.popupNotice = normalizePopupSchedule(data.popupNotice);
      return res.status(200).json({ success: true, data });
    }
    if (req.method !== 'PUT') return res.status(405).json({ success: false });
    if (!await requireAdmin(req, res)) return;
    if (!req.body || typeof req.body !== 'object') return res.status(400).json({ success: false, message: 'Invalid content' });
    const data = await normalizeImages(req.body);
    if (type === 'site' && data.popupNotice) data.popupNotice = normalizePopupSchedule(data.popupNotice);
    await writeContent(type, data);
    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Content API error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
}
