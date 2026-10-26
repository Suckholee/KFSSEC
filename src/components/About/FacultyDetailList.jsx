import React, { useEffect, useRef } from 'react';
import { CheckCircle2, Plus, Trash2 } from 'lucide-react';
import EditableText from '../Admin/InlineEditor/EditableText';
import { useAdminEdit } from '../../context/AdminEditContext';

export default function FacultyDetailList({ member, field, label, onUpdate }) {
  const { isEditMode } = useAdminEdit();
  const listRef = useRef(null);
  const focusIndex = useRef(null);
  const items = member[field] || [];
  useEffect(() => {
    if (focusIndex.current === null) return;
    const row = listRef.current?.querySelectorAll('[data-detail-row]')[focusIndex.current];
    row?.querySelector('[contenteditable]')?.focus();
    focusIndex.current = null;
  }, [items.length]);
  const markers = member.listMarkers?.[field] || [];
  const change = operation => onUpdate(current => {
    const nextItems = [...(current[field] || [])];
    const nextMarkers = nextItems.map((_, i) => current.listMarkers?.[field]?.[i] || 'check');
    operation(nextItems, nextMarkers);
    return { ...current, [field]: nextItems, listMarkers: { ...current.listMarkers, [field]: nextMarkers } };
  });
  const insert = index => {
    focusIndex.current = index;
    change((values, signs) => {
      values.splice(index, 0, '');
      signs.splice(index, 0, 'check');
    });
  };
  return (
    <div ref={listRef} className="space-y-2">
      <ul className="space-y-2 text-xs text-gray-700 font-semibold">
        {items.map((text, i) => (!isEditMode && !text.trim() ? null : (
          <li key={`${field}-${i}`} data-detail-row className="group/detail flex items-start gap-2 rounded-lg hover:bg-emerald-50/50 focus-within:bg-emerald-50/50">
            <div className="flex flex-1 min-w-0 items-start gap-2 py-1">
              {(markers[i] || 'check') === 'check' && <CheckCircle2 className="w-3.5 h-3.5 text-[#2B7752] shrink-0 mt-0.5" />}
              {markers[i] === 'bullet' && <span aria-hidden="true" className="text-[#2B7752]">•</span>}
              <EditableText multiline value={text} placeholder="세부항목 내용을 입력하세요" onChange={value => change(values => { values[i] = value; })} className="flex-1 min-w-0 whitespace-pre-line" />
            </div>
            {isEditMode && (
              <div className="flex shrink-0 items-center gap-0.5 py-0.5 opacity-100 sm:opacity-0 sm:group-hover/detail:opacity-100 sm:group-focus-within/detail:opacity-100 transition-opacity">
                <button type="button" aria-label={`${label} ${i + 1}번 아래에 삽입`} title="아래에 항목 삽입" onClick={() => insert(i + 1)} className="rounded-md p-1.5 text-emerald-700 hover:bg-emerald-100 focus-visible:opacity-100"><Plus className="w-3.5 h-3.5" /></button>
                <button type="button" aria-label={`${label} ${i + 1}번 삭제`} title="항목 삭제" onClick={() => change((values, signs) => { values.splice(i, 1); signs.splice(i, 1); })} className="rounded-md p-1.5 text-gray-400 hover:bg-rose-50 hover:text-rose-700"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            )}
          </li>
        )))}
      </ul>
      {isEditMode && <button type="button" onClick={() => insert(items.length)} className="flex w-full items-center gap-1.5 rounded-lg border border-dashed border-emerald-200 px-3 py-2.5 text-left text-xs font-bold text-emerald-700 hover:border-emerald-400 hover:bg-emerald-50 transition-colors"><Plus className="w-3.5 h-3.5" />세부항목 추가</button>}
    </div>
  );
}

