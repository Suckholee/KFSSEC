import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

export default function BoardPostEditor({ onSubmit, onCancel }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const submit = async event => {
    event.preventDefault();
    if (submitting) return;
    if (!title.trim() || !content.trim()) { setError('제목과 본문을 입력해 주세요.'); return; }
    setSubmitting(true);
    setError('');
    try { await onSubmit({ title: title.trim(), content: content.trim() }); }
    catch (err) { setError(err.message || '게시글 등록에 실패했습니다. 다시 시도해 주세요.'); }
    finally { setSubmitting(false); }
  };
  return <div data-content-editor-ui className="min-h-screen bg-gray-50 px-4 py-8">
    <form onSubmit={submit} className="mx-auto max-w-4xl space-y-6 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
      <div className="flex items-center gap-3"><button type="button" disabled={submitting} onClick={onCancel} aria-label="공지사항으로 돌아가기" className="rounded-full bg-gray-100 p-3"><ArrowLeft className="h-5 w-5" /></button><h1 className="text-2xl font-black">공지사항 글쓰기</h1></div>
      <label className="block space-y-2 font-bold">제목<input aria-label="제목" autoFocus required maxLength={200} value={title} onChange={event => setTitle(event.target.value)} disabled={submitting} placeholder="게시글 제목을 입력하세요" className="w-full rounded-xl border p-3 font-normal" /></label>
      <label className="block space-y-2 font-bold">본문<textarea aria-label="본문" required rows={16} value={content} onChange={event => setContent(event.target.value)} disabled={submitting} placeholder="공지할 내용을 자유롭게 작성하세요" className="w-full rounded-xl border p-4 font-normal leading-7" /></label>
      {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
      <div className="flex justify-end gap-3"><button type="button" disabled={submitting} onClick={onCancel} className="rounded-xl bg-gray-100 px-5 py-3 font-bold">취소</button><button type="submit" disabled={submitting} className="rounded-xl bg-emerald-700 px-6 py-3 font-bold text-white disabled:opacity-50">{submitting ? '등록 중…' : '게시글 등록'}</button></div>
    </form>
  </div>;
}
