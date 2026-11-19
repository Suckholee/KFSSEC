import { withCurrentCourseContent } from '../src/data/foodtechCurricula.js';
import { validateCourse, validateCourseList } from '../src/utils/courseValidation.js';
import { actualCourses } from '../src/data/actualCourses.js';
import { requireAdmin } from './_auth.js';
import { normalizeImages, readContentSnapshot, writeContent } from './_store.js';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  try {
    const snapshot = await readContentSnapshot('courses');
    const courses = withCurrentCourseContent(snapshot.data ?? actualCourses);
    if (req.method === 'GET') return res.status(200).json({ success: true, count: courses.length, data: courses, version: snapshot.version });
    if (!['POST', 'PUT', 'DELETE'].includes(req.method)) return res.status(405).json({ success: false });
    if (!await requireAdmin(req, res)) return;
    const expectedVersion = req.headers['if-match'];
    if (typeof expectedVersion !== 'string' || !expectedVersion) return res.status(428).json({ success: false, message: '저장 방식이 업데이트되었습니다. 작성 내용을 복사한 뒤 화면을 다시 열어 주세요.' });
    const id = String(req.query?.id || '');
    if (req.method === 'PUT' && id === 'reorder') {
      const next = await normalizeImages(validateCourseList(req.body?.courses));
      const saved = await writeContent('courses', next, expectedVersion);
      return res.status(200).json({ success: true, data: next, version: saved.version });
    }
    if (req.method === 'POST') {
      if (!req.body?.title) return res.status(400).json({ success: false, message: '과정명이 필요합니다.' });
      const course = await normalizeImages(validateCourse({ ...req.body, id: req.body.id || `c_${Date.now()}` }));
      if (courses.some(item => String(item.id) === String(course.id))) return res.status(409).json({ success: false, message: '이미 존재하는 과정 ID입니다.' });
      const saved = await writeContent('courses', [course, ...courses], expectedVersion);
      return res.status(201).json({ success: true, data: course, version: saved.version });
    }
    const index = courses.findIndex(course => String(course.id) === id);
    if (index < 0) return res.status(404).json({ success: false, message: '과정을 찾을 수 없습니다.' });
    if (req.method === 'PUT') {
      const updated = await normalizeImages(validateCourse({ ...courses[index], ...req.body, id }));
      const next = [...courses];
      next[index] = updated;
      const saved = await writeContent('courses', next, expectedVersion);
      return res.status(200).json({ success: true, data: updated, version: saved.version });
    }
    const saved = await writeContent('courses', courses.filter(course => String(course.id) !== id), expectedVersion);
    return res.status(200).json({ success: true, version: saved.version });
  } catch (error) {
    if (error.name === 'CourseValidationError') return res.status(400).json({ success: false, message: error.message });
    console.error('Course API error:', error);
    return res.status(error.status || 500).json({ success: false, code: error.code, message: error.message });
  }
}
