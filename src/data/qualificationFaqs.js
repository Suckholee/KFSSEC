import { valueKey } from '../components/Admin/InlineEditor/directContentModel.js';

export const DEFAULT_QUALIFICATION_FAQS = [
  { id: 'eligibility', question: '누가 지원할 수 있나요?', answer: '온라인 2급 과정은 만 17세 이상 지원 가능합니다. 전문 자격은 과정별 응시 요건을 확인해 주세요.', visible: true },
  { id: 'duration', question: '수강 기간은 얼마나 되나요?', answer: '온라인 2급 과정의 수강 기간은 4주 이내입니다. 학습 일정은 개인별로 달라질 수 있습니다.', visible: true },
  { id: 'certification', question: '어떻게 자격을 취득하나요?', answer: '교육원에서 과정과 응시 요건을 확인한 후 수강 및 검정 절차를 진행합니다. 출석 기준과 발급 비용은 신청 전 상담해 주세요.', visible: true },
];

export function getQualificationFaqs(site = {}) {
  // An explicitly saved empty list must stay empty. Preserve text changes made
  // through the previous version's generic editor when adopting list management.
  if (Array.isArray(site.qualificationFaqs)) return site.qualificationFaqs;
  return DEFAULT_QUALIFICATION_FAQS.map(item => ({ ...item,
    question: site.contentOverrides?.[valueKey('ccfb2b3d65273bd2-0', 'text-0', item.question)] ?? item.question,
    answer: site.contentOverrides?.[valueKey('7759f399c2b8db5f-0', 'text-0', item.answer)] ?? item.answer,
  }));
}

export function moveFaq(items, index, offset) {
  const target = index + offset;
  if (target < 0 || target >= items.length) return items;
  const next = [...items];
  [next[index], next[target]] = [next[target], next[index]];
  return next;
}

export function validateFaqs(items) {
  const ids = new Set();
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (!item.id || ids.has(item.id)) return `${i + 1}번 질문의 식별자가 중복되었습니다.`;
    ids.add(item.id);
    if (!item.question.trim() || !item.answer.trim()) return `${i + 1}번 질문과 답변을 모두 입력해주세요. 비공개 항목도 내용을 입력해야 합니다.`;
  }
  return '';
}
