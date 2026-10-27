function invalid(message) { const error = new Error(message); error.name = 'CourseValidationError'; return error; }
const textFields = ['title', 'description', 'desc', 'industry', 'instructor', 'category', 'categoryName', 'stage', 'format', 'duration', 'certName', 'grade', 'registration'];
export function validateCourse(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw invalid('교육과정 형식이 올바르지 않습니다.');
  if (!['string', 'number'].includes(typeof value.id) || !String(value.id).trim()) throw invalid('교육과정 ID가 필요합니다.');
  if (typeof value.title !== 'string' || !value.title.trim()) throw invalid('과정명을 입력해 주세요.');
  for (const field of textFields) {
    if (value[field] != null && typeof value[field] !== 'string') throw invalid(`${field} 항목은 글자로 입력해 주세요.`);
  }
  for (const field of ['curriculum', 'grades', 'lessons']) {
    if (value[field] != null && !Array.isArray(value[field])) throw invalid(`${field} 항목은 목록 형식이어야 합니다.`);
  }
  return { ...value, title: value.title.trim() };
}
export function validateCourseList(value) {
  if (!Array.isArray(value)) throw invalid('교육과정 목록 형식이 올바르지 않습니다.');
  const list = value.map(validateCourse), ids = list.map(course => String(course.id));
  if (new Set(ids).size !== ids.length) throw invalid('교육과정 ID가 중복됩니다. 새로고침 후 다시 저장해 주세요.');
  return list;
}
