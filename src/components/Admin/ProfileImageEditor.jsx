import React, { useEffect, useRef, useState } from 'react';
import { checkProfileImage, MAX_PROFILE_IMAGE_BYTES } from '../../utils/profileImage';

export default function ProfileImageEditor({ value, original, onChange, onStatus, disabled }) {
  const [mode, setMode] = useState(value?.startsWith('data:') ? 'file' : 'url');
  const [fileName, setFileName] = useState('');
  const [reading, setReading] = useState(false);
  const [fileError, setFileError] = useState('');
  const [validation, setValidation] = useState({ state: 'checking', message: '' });
  const fileRef = useRef(null);
  const readerRef = useRef(null);
  useEffect(() => () => { if (readerRef.current?.readyState === 1) readerRef.current.abort(); }, []);
  useEffect(() => {
    let active = true;
    const report = result => { if (active) { setValidation(result); onStatus(result.state); } };
    if (reading) { report({ state: 'checking', message: '사진을 읽고 있습니다.' }); return; }
    if (fileError) { report({ state: 'error', message: fileError }); return; }
    if (!value) { report({ state: 'empty', message: '사진이 없습니다. 비공개로는 저장할 수 있습니다.' }); return; }
    report({ state: 'checking', message: '이미지를 확인하고 있습니다.' });
    const timer = setTimeout(() => {
      Promise.resolve().then(() => checkProfileImage(value)).then(
        () => report({ state: 'ready', message: '이 사진이 저장됩니다.' }),
        error => report({ state: 'error', message: error.message }),
      );
    }, 300);
    return () => { active = false; clearTimeout(timer); };
  }, [value, reading, fileError, onStatus]);
  const switchMode = next => {
    if (next === mode) return;
    setMode(next); setFileName(''); setFileError(''); onChange('');
    if (fileRef.current) fileRef.current.value = '';
  };
  const upload = event => {
    const file = event.target.files?.[0];
    event.target.value = ''; // Allow selecting the same file after a failed attempt.
    if (!file) return;
    setFileError(''); onStatus('checking');
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type) || !file.size || file.size > MAX_PROFILE_IMAGE_BYTES) {
      setFileError('JPG, PNG, WebP 이미지 파일을 1MB 이하로 선택해 주세요.'); onStatus('error'); return;
    }
    setReading(true);
    const reader = new FileReader(); readerRef.current = reader;
    reader.onload = () => { setFileName(file.name); onChange(String(reader.result)); setReading(false); };
    reader.onerror = () => { setFileError('파일을 읽지 못했습니다. 다시 선택해 주세요.'); setReading(false); };
    reader.readAsDataURL(file);
  };
  return <fieldset disabled={disabled || reading} className="min-w-0 rounded-xl border border-gray-200 p-4 space-y-3">
    <legend className="px-1 text-sm font-bold">프로필 사진</legend>
    <div className="flex flex-wrap gap-4 text-sm">
      <label className="flex gap-2 items-center"><input type="radio" name="profile-image-mode" checked={mode === 'file'} onChange={() => switchMode('file')} />파일 업로드</label>
      <label className="flex gap-2 items-center"><input type="radio" name="profile-image-mode" checked={mode === 'url'} onChange={() => switchMode('url')} />이미지 주소</label>
    </div>
    <p className="text-xs text-gray-500">한 가지 방식만 적용됩니다. 방식을 바꾸면 편집 중인 사진 선택이 초기화됩니다.</p>
    {mode === 'file' ? <div className="space-y-2">
      <label className="block text-sm">사진 파일 선택<input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" onChange={upload} className="mt-2 block w-full min-w-0 text-sm" /></label>
      <p className="text-xs text-gray-500 break-all">{fileName || (value ? '저장된 업로드 사진 사용 중' : 'JPG, PNG, WebP · 최대 1MB')}</p>
    </div> : <label className="block text-sm">이미지 주소<input value={value} onChange={e => { setFileError(''); onStatus('checking'); onChange(e.target.value); }} placeholder="/images/masters/image11.png 또는 https://…" className="mt-2 w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm" /></label>}
    <p role={validation.state === 'error' ? 'alert' : 'status'} className={`text-xs ${validation.state === 'error' ? 'text-red-700' : 'text-gray-500'}`}>{validation.message}</p>
    {validation.state === 'ready' && <img src={value} alt="저장할 프로필 사진" className="h-28 w-24 rounded-lg bg-stone-100 object-contain" />}
    {original && <button type="button" onClick={() => { setMode(original.startsWith('data:') ? 'file' : 'url'); setFileError(''); setFileName(''); onChange(original); }} className="text-xs font-semibold text-emerald-800 underline">기존 사진으로 되돌리기</button>}
  </fieldset>;
}
