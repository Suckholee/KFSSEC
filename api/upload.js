import { requireAdmin } from './_auth.js';
import { createGalleryVideoUpload, storeImage } from './_store.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ success: false });
  if (!await requireAdmin(req, res)) return;
  try {
    if (req.body?.videoType) {
      const { videoType, size } = req.body;
      if (!['video/mp4', 'video/webm'].includes(videoType) || !Number.isInteger(size) || size < 1 || size > 50 * 1024 * 1024) {
        return res.status(400).json({ success: false, message: '50MB 이하의 MP4 또는 WebM 파일을 선택해 주세요.' });
      }
      return res.status(200).json({ success: true, ...await createGalleryVideoUpload(videoType) });
    }
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
