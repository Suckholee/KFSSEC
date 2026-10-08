import React, { useState } from 'react';
import { ArrowLeft, Send, Save, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

const DRAFT_KEY = 'kfssec_consulting_survey_draft';
const QUESTIONS = [
  { id: 'consultingType', label: '신청할 상담을 선택해 주세요.', options: ['청년 창업 상담', '일반 창업 상담'] },
  { id: 'age', label: '연령대를 선택해 주세요.', options: ['만 19세 미만', '만 19~24세', '만 25~29세', '만 30~34세', '만 35~39세', '만 40세 이상', '응답하지 않음'] },
  { id: 'stage', label: '현재 창업 준비 단계는 어디인가요?', options: ['창업에 관심이 있어 정보를 찾는 중', '아이템을 검토하는 중', '사업계획을 준비하는 중', '점포·자금 등을 준비하는 중', '이미 운영 중이며 개선을 희망'] },
  { id: 'industry', label: '관심 있는 창업 업종은 무엇인가요?', multiple: true, options: ['한식', '중식', '일식', '양식', '카페·음료', '베이커리·디저트', '배달·포장 전문', '기타 외식업', '아직 미정'] },
  { id: 'experience', label: '외식업·조리 관련 경험은 어느 정도인가요?', options: ['경험 없음', '교육·자격증 취득 경험', '1년 미만 근무', '1~3년 근무', '3년 이상 근무', '매장 운영 경험'] },
  { id: 'budget', label: '예상 창업 예산은 얼마인가요? (점포·시설·운영 자금 포함)', options: ['3천만 원 미만', '3천만~5천만 원 미만', '5천만~1억 원 미만', '1억~2억 원 미만', '2억 원 이상', '아직 미정'] },
  { id: 'region', label: '창업을 희망하는 지역은 어디인가요?', options: ['서울', '경기·인천', '대전·세종·충청', '광주·전라', '대구·경북', '부산·울산·경남', '강원', '제주', '해외', '아직 미정'] },
  { id: 'timing', label: '언제 창업을 계획하고 있나요?', options: ['3개월 이내', '3~6개월 이내', '6개월~1년 이내', '1년 이후', '시기 미정', '현재 운영 중'] },
  { id: 'topics', label: '어떤 분야의 상담이 필요한가요?', multiple: true, options: ['창업 아이템·사업계획', '메뉴 개발·조리 교육', '상권·입지 분석', '창업 비용·자금 계획', '지원사업·정책자금 정보', '매장 운영·인력 관리', '홍보·마케팅', '인허가·위생 관리', '전반적인 창업 방향'] },
  { id: 'format', label: '선호하는 상담 방식은 무엇인가요?', options: ['온라인 화상 상담', '방문 상담', '상담 방식 무관'] },
];

export default function CommunityEditorPage({ onPublishPost, onSubmitPost, onCancel, currentUser }) {
  const { tr } = useLanguage();
  const [answers, setAnswers] = useState(() => {
    try { return JSON.parse(localStorage.getItem(DRAFT_KEY) || '{}'); } catch { return {}; }
  });
  const [saved, setSaved] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const selectAnswer = (question, option) => {
    setAnswers(previous => {
      if (!question.multiple) return { ...previous, [question.id]: option };
      const selected = Array.isArray(previous[question.id]) ? previous[question.id] : [];
      // Undecided is mutually exclusive with specific industries.
      const next = selected.includes(option) ? selected.filter(item => item !== option)
        : option === '아직 미정' ? [option] : [...selected.filter(item => item !== '아직 미정'), option];
      return { ...previous, [question.id]: next };
    });
    setSaved(false);
    setError('');
  };

  const saveDraft = () => {
    try { localStorage.setItem(DRAFT_KEY, JSON.stringify(answers)); setSaved(true); setError(''); }
    catch { setError('임시저장에 실패했습니다. 브라우저 저장 공간을 확인해 주세요.'); }
  };

  const handleSubmit = async event => {
    event.preventDefault();
    if (submitting) return;
    const missing = QUESTIONS.find(question => question.multiple
      ? !Array.isArray(answers[question.id]) || answers[question.id].length === 0
      : !question.options.includes(answers[question.id]));
    if (missing) {
      setError('모든 질문에 답변해 주세요. 미정인 항목은 ‘아직 미정’을 선택할 수 있습니다.');
      document.getElementById(`survey-${missing.id}`)?.focus();
      return;
    }
    const content = [`${answers.consultingType} 사전 정보`, ...QUESTIONS.map((question, index) =>
      `${index + 1}. ${question.label}\n답변: ${Array.isArray(answers[question.id]) ? answers[question.id].join(', ') : answers[question.id]}`)].join('\n\n');
    setSubmitting(true);
    setError('');
    try {
      const submit = onSubmitPost || onPublishPost;
      if (!submit) throw new Error('상담 신청을 처리할 수 없습니다. 잠시 후 다시 시도해 주세요.');
      await submit({ category: '문의', categoryType: 'inquiry', title: `${answers.consultingType} 사전 상담 신청`, content,
        coverImage: null, tags: [answers.consultingType, '창업컨설팅'], isPinned: false, author: currentUser?.name || '방문자' });
      localStorage.removeItem(DRAFT_KEY);
      localStorage.removeItem('kfssec_inquiry_draft');
    } catch (submitError) { setError(submitError.message || '상담 신청에 실패했습니다.'); }
    finally { setSubmitting(false); }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-6 text-gray-900">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto px-4 sm:px-8 space-y-6">
        <div className="bg-white p-5 sm:p-8 rounded-3xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <button type="button" onClick={onCancel} aria-label={tr('게시판으로 돌아가기')} className="p-3 rounded-full bg-gray-100 hover:bg-gray-200"><ArrowLeft className="w-5 h-5" /></button>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-2 rounded-full">{tr('청년 및 일반 창업 컨설팅')}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">{tr('창업 상담 사전 정보')}</h1>
          <p className="mt-3 text-sm text-gray-600 leading-relaxed">{tr('맞춤형 상담을 준비하기 위한 설문입니다. 현재 상황과 관심 분야를 선택해 주세요. 준비 중인 항목은 미정으로 선택해도 됩니다.')}</p>
          <p className="mt-2 text-xs text-gray-500">{tr('모든 문항은 필수입니다. 복수 선택 문항은 해당 항목을 모두 선택해 주세요.')}</p>
        </div>
        {QUESTIONS.map((question, index) => (
          <fieldset key={question.id} id={`survey-${question.id}`} tabIndex={-1} className="bg-white p-5 sm:p-8 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-600">
            <legend className="sr-only">{tr(question.label)}</legend>
            <h2 className="font-bold text-base"><span className="text-emerald-700 mr-2">{index + 1}.</span>{tr(question.label)}</h2>
            <p className="text-xs text-gray-500 mt-2 mb-4">{tr(question.multiple ? '복수 선택' : '하나 선택')}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {question.options.map(option => {
                const selected = question.multiple ? (answers[question.id] || []).includes(option) : answers[question.id] === option;
                return <label key={option} className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-colors ${selected ? 'bg-emerald-50 border-emerald-600 text-emerald-900' : 'border-gray-200 hover:bg-gray-50'}`}>
                  <input type={question.multiple ? 'checkbox' : 'radio'} name={question.id} value={option} checked={selected} onChange={() => selectAnswer(question, option)} className="w-4 h-4 accent-emerald-700 shrink-0" />
                  <span className="text-sm font-medium">{tr(option)}</span>
                </label>;
              })}
            </div>
          </fieldset>
        ))}
        <div className="bg-white p-5 sm:p-8 rounded-2xl border border-gray-200">
          {error && <p role="alert" className="text-sm text-red-700 mb-4">{tr(error)}</p>}
          {saved && <p role="status" className="text-sm text-emerald-700 flex items-center gap-2 mb-4"><CheckCircle2 className="w-4 h-4" />{tr('답변을 임시저장했습니다.')}</p>}
          <div className="flex flex-wrap justify-end gap-3">
            <button type="button" onClick={saveDraft} disabled={submitting} className="px-5 py-3 rounded-xl bg-gray-100 font-bold text-sm flex items-center gap-2"><Save className="w-4 h-4" />{tr('임시저장')}</button>
            <button type="submit" disabled={submitting} className="px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm flex items-center gap-2 disabled:opacity-50"><Send className="w-4 h-4" />{tr(submitting ? '신청 중…' : '상담 신청')}</button>
          </div>
        </div>
      </form>
    </div>
  );
}
