import { normalizePopupSchedule } from '../src/utils/popupSchedule.js';
import { requireAdmin } from './_auth.js';
import { normalizeImages, readContentSnapshot, writeContent } from './_store.js';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  const type = req.query?.type;
  if (!['site', 'posts', 'masters', 'chatbot'].includes(type)) return res.status(400).json({ success: false, message: 'Invalid content type' });
  try {
    if (req.method === 'GET') {
      const { data, version } = await readContentSnapshot(type);
      if (type === 'site' && data?.popupNotice) data.popupNotice = normalizePopupSchedule(data.popupNotice);
      return res.status(200).json({ success: true, data, version });
    }
    if (req.method !== 'PUT') return res.status(405).json({ success: false });
    if (!await requireAdmin(req, res)) return;
    const expectedVersion = req.headers['if-match'];
    if (typeof expectedVersion !== 'string' || !expectedVersion) return res.status(428).json({ success: false, message: '저장 방식이 업데이트되었습니다. 작성 내용을 복사한 뒤 화면을 새로 열어 주세요.' });
    if (!req.body || typeof req.body !== 'object') return res.status(400).json({ success: false, message: 'Invalid content' });
    const data = await normalizeImages(req.body);
    if (type === 'site' && data.popupNotice) data.popupNotice = normalizePopupSchedule(data.popupNotice);
    const saved = await writeContent(type, data, expectedVersion);
    return res.status(200).json({ success: true, ...saved });
  } catch (error) {
    console.error('Content API error:', error);
    return res.status(error.status || 500).json({ success: false, code: error.code, message: error.message });
  }
}
