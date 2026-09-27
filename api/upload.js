import { requireAdmin } from './_auth.js';
import { storeImage } from './_store.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ success: false });
  if (!requireAdmin(req, res)) return;
  try {
    const imageBase64 = req.body?.imageBase64;
    if (typeof imageBase64 !== 'string' || !imageBase64.startsWith('data:image/')) {
      return res.status(400).json({ success: false, message: '이미지 파일이 필요합니다.' });
    }
    return res.status(200).json({ success: true, url: await storeImage(imageBase64) });
  } catch (error) {
    console.error('Upload failed:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
}
