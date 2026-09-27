import { actualCourses } from '../src/data/actualCourses.js';
import { requireAdmin } from './_auth.js';
import { normalizeImages, readContent, writeContent } from './_store.js';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  try {
    const courses = await readContent('courses') ?? actualCourses;
    if (req.method === 'GET') return res.status(200).json({ success: true, count: courses.length, data: courses });
    if (!['POST', 'PUT', 'DELETE'].includes(req.method)) return res.status(405).json({ success: false });
    if (!requireAdmin(req, res)) return;
    const id = String(req.query?.id || '');
    if (req.method === 'PUT' && id === 'reorder' && Array.isArray(req.body?.courses)) {
      await writeContent('courses', req.body.courses);
      return res.status(200).json({ success: true, data: req.body.courses });
    }
    if (req.method === 'POST') {
      if (!req.body?.title) return res.status(400).json({ success: false, message: '과정명이 필요합니다.' });
      const course = await normalizeImages({ ...req.body, id: req.body.id || `c_${Date.now()}` });
      if (courses.some(item => String(item.id) === String(course.id))) return res.status(409).json({ success: false, message: '이미 존재하는 과정 ID입니다.' });
      await writeContent('courses', [course, ...courses]);
      return res.status(201).json({ success: true, data: course });
    }
    const index = courses.findIndex(course => String(course.id) === id);
    if (index < 0) return res.status(404).json({ success: false, message: '과정을 찾을 수 없습니다.' });
    if (req.method === 'PUT') {
      const updated = await normalizeImages({ ...courses[index], ...req.body, id });
      const next = [...courses];
      next[index] = updated;
      await writeContent('courses', next);
      return res.status(200).json({ success: true, data: updated });
    }
    await writeContent('courses', courses.filter(course => String(course.id) !== id));
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Course API error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
}
