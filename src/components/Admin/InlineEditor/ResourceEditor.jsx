import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { isContentField, fieldNames, serializable, newItem, moveItem } from '../../../content/resourceModel';
import { isAllowedContentUrl } from './directContentModel';
const inputClass = 'mt-1 block w-full border border-slate-300 rounded-lg px-3 py-2 text-sm font-normal bg-white text-slate-900';
const smallButton = 'border rounded-lg px-2 py-1 text-xs font-bold disabled:opacity-30';
const isImage = key => /^(image|imageUrl|poster|photo|coverImage|logo)$/.test(key);
const isUrl = key => isImage(key) || /^(url|href|linkUrl|videoUrl)$/.test(key);
function validate(value, key = '') {
  if (typeof value === 'string' && isUrl(key) && !isAllowedContentUrl(value, key === 'href' || key === 'linkUrl' ? 'link' : 'image')) return `${fieldNames[key] || '주소'}에 올바른 웹 주소를 입력해주세요.`;
  if (Array.isArray(value)) { for (const item of value) { const error = validate(item, key === 'images' ? 'image' : key); if (error) return error; } }
  else if (value && typeof value === 'object') for (const [field, item] of Object.entries(value)) { const error = validate(item, field); if (error) return error; }
  return '';
}
function ArrayFields({ value, template = [], onChange, label, depth = 0, selectedIndex }) {
  const [query, setQuery] = useState('');
  return <div className="space-y-3">
    {depth === 0 && value.length > 6 && <label className="block text-sm font-bold">목록 검색<input value={query} onChange={event => setQuery(event.target.value)} placeholder="제목·이름·내용 검색" className={inputClass} /></label>}
    <div className="flex items-center justify-between gap-2"><strong className="text-sm">{label} · {value.length}개</strong><button type="button" className={smallButton} onClick={() => onChange([...value, newItem(template[0] ?? value[0], value.length + 1)])}>+ 항목 추가</button></div>
    {!value.length && <p className="text-xs text-slate-500">등록된 항목이 없습니다. 빈 목록도 그대로 저장됩니다.</p>}
    {value.map((item, index) => query && !JSON.stringify(item).toLowerCase().includes(query.toLowerCase()) ? null : <fieldset key={item?.id || index} data-resource-row={index} className={`border rounded-xl p-3 space-y-3 ${selectedIndex === index ? 'border-amber-500 ring-2 ring-amber-300' : 'border-slate-200'}`}>
      <legend className="text-sm font-bold px-1">{index + 1}번 · {typeof item === 'string' ? item.slice(0, 30) : item.title || item.name || item.question || item.q || item.year || '항목'}</legend>
      <div className="flex flex-wrap justify-end gap-2">
        <button type="button" aria-label={`${label} ${index + 1}번 위로`} className={smallButton} disabled={!index} onClick={() => onChange(moveItem(value, index, -1))}>↑ 위로</button>
        <button type="button" aria-label={`${label} ${index + 1}번 아래로`} className={smallButton} disabled={index === value.length - 1} onClick={() => onChange(moveItem(value, index, 1))}>↓ 아래로</button>
        <button type="button" aria-label={`${label} ${index + 1}번 삭제`} className={`${smallButton} text-red-700`} onClick={() => onChange(value.filter((_, i) => i !== index))}>삭제</button>
      </div>
      <ValueFields name={typeof item === 'string' ? label.replace(/ 목록$/, '') : '내용'} value={item} template={template.find(original => original?.id === (item?._templateId || item?.id)) || template[index] || template[0]} onChange={next => onChange(value.map((row, i) => i === index ? next : row))} depth={depth + 1} />
    </fieldset>)}
  </div>;
}
function ValueFields({ value, template, onChange, depth = 0, name = '내용', fieldKey = '' }) {
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  if (Array.isArray(value)) return <ArrayFields value={value} template={Array.isArray(template) ? template : []} onChange={onChange} label={name} depth={depth} />;
  if (value && typeof value === 'object') {
    const keys = [...new Set([...Object.keys(template || {}), ...Object.keys(value), 'visible'])].filter(key => isContentField(key) && !['object', 'function'].includes(typeof (value[key] ?? template?.[key])) || (isContentField(key) && (Array.isArray(value[key] ?? template?.[key]) || (value[key] && typeof value[key] === 'object'))));
    return <div className="space-y-3">{keys.map(key => {
      const current = value[key] ?? (key === 'visible' ? true : template?.[key] ?? '');
      return <ValueFields key={key} fieldKey={key} name={fieldNames[key] || key} value={current} template={template?.[key]} onChange={next => onChange({ ...value, [key]: next })} depth={depth + 1} />;
    })}</div>;
  }
  if (typeof value === 'boolean') return <label className="flex items-center gap-2 text-sm font-bold"><input type="checkbox" checked={value} onChange={event => onChange(event.target.checked)} />{name}</label>;
  const choices = { group: [['institute','교육원 소개'],['award','명인·명장 시상식'],['certificate','취득 자격증'],['jin','교수 컨설팅'],['course','수강·커리큘럼'],['consulting','창업컨설팅·사후지원'],['location','오프라인 교육장']], categoryType: [['notice','공지사항'],['gallery','갤러리'],['inquiry','문의'],['press','언론보도'],['competition','요리대회']], galleryCategory: [['ceremony','시상식·인증패'],['competition','요리대회'],['consulting','컨설팅 현장'],['training','조리 실습'],['partners','산학협력·MOU']] }[fieldKey];
  if (choices) return <label className="block text-sm font-bold">{name}<select value={value || ''} onChange={event => onChange(event.target.value)} className={inputClass}>{!choices.some(([key]) => key === value) && <option value={value || ''}>{value || '선택해주세요'}</option>}{choices.map(([key,label]) => <option key={key} value={key}>{label}</option>)}</select></label>;
  const image = /사진|이미지|포스터|로고/.test(name) && !/목록|설명/.test(name);
  const upload = async file => {
    if (!file) return;
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type) || file.size > 4 * 1024 * 1024) { setError('JPG·PNG·WebP, 4MB 이하의 사진을 선택해주세요.'); return; }
    setUploading(true); setError('');
    try {
      const imageBase64 = await new Promise((resolve, reject) => { const reader = new FileReader(); reader.onload = () => resolve(reader.result); reader.onerror = reject; reader.readAsDataURL(file); });
      const response = await fetch('/api/upload', { method: 'POST', credentials: 'same-origin', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ imageBase64, fileName: file.name }) });
      const result = await response.json();
      if (!response.ok || !result.success || !result.url) throw new Error(result.message || '업로드에 실패했습니다.');
      onChange(result.url);
    } catch (err) { setError(err.message); } finally { setUploading(false); }
  };
  return <div><label className="block text-sm font-bold">{name}{typeof value === 'number' ? <input type="number" value={value} onChange={event => onChange(Number(event.target.value))} className={inputClass} /> : <textarea rows={String(value ?? '').length > 90 ? 4 : 2} value={value ?? ''} onChange={event => onChange(event.target.value)} className={inputClass} />}</label>
    {image && <div className="flex items-center gap-3 mt-2">{value && <img src={value} alt="사진 미리보기" className="w-20 h-16 object-contain bg-slate-50 rounded" />}<label className={`${smallButton} cursor-pointer`}>{uploading ? '업로드 중…' : '사진 파일 선택'}<input disabled={uploading} type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" onChange={event => upload(event.target.files?.[0])} /></label></div>}
    {error && <p role="alert" className="text-xs text-red-700">{error}</p>}
  </div>;
}
export default function ResourceEditor({ resource, selectedIndex, onClose }) {
  const [draft, setDraft] = useState(() => serializable(resource.value));
  const [error, setError] = useState('');
  const ref = useRef(null);
  useEffect(() => {
    const opener = document.activeElement, overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    ref.current.querySelector('button')?.focus();
    if (selectedIndex != null) ref.current.querySelector(`[data-resource-row="${selectedIndex}"]`)?.scrollIntoView({ block: 'center' });
    const key = event => {
      if (event.key === 'Escape') { event.preventDefault(); onClose(); }
      if (event.key === 'Tab') {
        const fields = [...ref.current.querySelectorAll('button,input,textarea,select')].filter(el => !el.disabled && el.getClientRects().length);
        if (event.shiftKey && document.activeElement === fields[0]) { event.preventDefault(); fields.at(-1)?.focus(); }
        else if (!event.shiftKey && document.activeElement === fields.at(-1)) { event.preventDefault(); fields[0]?.focus(); }
      }
    };
    document.addEventListener('keydown', key);
    return () => { document.body.style.overflow = overflow; document.removeEventListener('keydown', key); opener?.focus?.(); };
  }, []);
  return createPortal(<div data-content-editor-ui className="fixed inset-0 z-[100110] bg-slate-950/60 flex items-center justify-center p-3"><form ref={ref} role="dialog" aria-modal="true" aria-labelledby="resource-title" className="bg-white text-slate-900 w-full max-w-3xl max-h-[90dvh] rounded-2xl flex flex-col shadow-2xl" onSubmit={event => {
    event.preventDefault(); const message = validate(draft); if (message) { setError(message); return; } resource.apply(draft); onClose();
  }}><div className="p-4 border-b space-y-2"><div className="flex justify-between gap-3"><div><h2 id="resource-title" className="text-lg font-bold">{resource.label} 관리</h2><p className="text-xs text-slate-600 mt-1">선택 범위: {resource.label} · {resource.type === 'media' ? '자료·이미지' : '원본 목록'}</p></div><button type="button" onClick={onClose} className={smallButton}>취소하고 닫기</button></div><p className="text-xs text-slate-600">{resource.description || '이 목록의 내용·추가·삭제·순서·공개 여부를 관리합니다.'}</p><p className="text-xs font-bold text-amber-800">적용 후 미리보기를 확인하고 상단 ‘전체 저장’을 눌러주세요. {resource.shared ? '여러 화면에서 공통으로 사용하는 자료입니다.' : ''}</p></div>
    <div className="p-4 overflow-y-auto space-y-4"><ArrayFields value={draft} template={resource.defaults || []} onChange={setDraft} label={resource.label} selectedIndex={selectedIndex} /></div>
    <div className="p-4 border-t space-y-2">{error && <p role="alert" className="text-red-700 text-sm">{error}</p>}<div className="flex items-center justify-between gap-3"><p className="text-xs text-slate-500">닫으면 이 창에서 적용하지 않은 변경은 취소됩니다.</p><button className="bg-amber-400 text-slate-950 font-bold px-4 py-2 rounded-lg">미리보기에 적용</button></div></div>
  </form></div>, document.body);
}
