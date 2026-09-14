import { qualifications } from './qualifications.js';

// Course facts supplied by the institute. Unprovided prices and dates stay unset.
export const actualCourses = qualifications.map(q => ({
  id: `qualification-${q.id}`, qualificationId: q.id,
  title: `${q.name} 2급`, certName: `${q.name} 2급`,
  registration: q.registration, instructor: `${q.professor} 교수`,
  category: q.id === 'kfood' ? 'hansik' : 'etc',
  categoryName: q.id === 'kfood' ? '한국음식' : '외식창업',
  industry: q.id === 'kfood' ? '한국음식' : '외식창업',
  stage: '창업 준비', format: '온라인', duration: '4주 이내',
  price: null, discountRate: 0, startDate: '', endDate: '', examDate: '',
  description: q.description, image: `/images/qualifications/${q.id}.jpg`,
  assessment: q.assessment, grades: q.grades,
}));
