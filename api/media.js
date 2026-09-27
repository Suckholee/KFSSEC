import { readImage } from './_store.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();
  try {
    const pathname = req.query?.path;
    const image = await readImage(pathname);
    if (!image) return res.status(404).end();
    const extension = pathname.split('.').pop();
    res.setHeader('Content-Type', extension === 'jpg' ? 'image/jpeg' : `image/${extension}`);
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    return res.status(200).send(image);
  } catch (error) {
    console.error('Media API error:', error);
    return res.status(500).end();
  }
}
