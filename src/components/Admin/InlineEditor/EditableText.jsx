import React, { useState, useRef, useEffect } from 'react';
import { useAdminEdit } from '../../../context/AdminEditContext';
import { Edit3 } from 'lucide-react';
import { useLanguage } from '../../../i18n/LanguageContext';

export default function EditableText({
  value,
  onChange,
  path,
  as: Component = 'span',
  multiline = false,
  placeholder = '내용을 입력하세요...',
  className = '',
  children,
}) {
  const { isEditMode, showEditGuides, updateSiteField } = useAdminEdit();
  const { tr } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(value ?? (typeof children === 'string' ? children : ''));
  const elementRef = useRef(null);

  // Sync draft when value prop changes
  useEffect(() => {
    setDraft(value ?? (typeof children === 'string' ? children : ''));
  }, [value, children]);

  if (!isEditMode) {
    return <Component className={className}>{tr(value || children)}</Component>;
  }

  const handleCommit = (newVal) => {
    const trimmed = (newVal ?? '').trim();
    if (trimmed !== value) {
      if (onChange) {
        onChange(trimmed);
      } else if (path) {
        updateSiteField(path, trimmed);
      }
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      setDraft(value ?? '');
      if (elementRef.current) {
        elementRef.current.innerText = value ?? '';
      }
      setIsEditing(false);
    } else if (e.key === 'Enter' && !multiline) {
      e.preventDefault();
      elementRef.current?.blur();
    } else if (e.key === 'Tab') {
      // Tab to next editable text field for fast spreadsheet-like workflow
      const editables = Array.from(document.querySelectorAll('[contenteditable="true"]'));
      const idx = editables.indexOf(elementRef.current);
      if (idx !== -1) {
        e.preventDefault();
        elementRef.current?.blur();
        const nextIdx = e.shiftKey ? idx - 1 : idx + 1;
        if (nextIdx >= 0 && nextIdx < editables.length) {
          editables[nextIdx].focus();
        }
      }
    }
  };

  const handleBlur = (e) => {
    const text = e.currentTarget.innerText;
    setDraft(text);
    handleCommit(text);
  };

  return (
    <Component
      ref={elementRef}
      contentEditable={isEditMode}
      suppressContentEditableWarning={true}
      onFocus={() => setIsEditing(true)}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      title={isEditMode ? '클릭하여 글자 바로 수정 (Tab: 다음 글자로 이동, Esc: 취소)' : undefined}
      className={`relative group inline-block max-w-full transition-all duration-150 ${className} ${
        isEditing
          ? 'outline-2 outline-amber-500 bg-amber-500/15 rounded px-1.5 shadow-inner ring-2 ring-amber-400/40'
          : showEditGuides
            ? 'outline-dashed outline-1 outline-amber-500/70 bg-amber-400/10 hover:outline-2 hover:outline-amber-500 hover:bg-amber-400/25 rounded px-1 cursor-text shadow-sm'
            : 'hover:outline-dashed hover:outline-2 hover:outline-amber-500/80 hover:bg-amber-400/10 rounded px-1 cursor-text'
      }`}
    >
      {draft || <span className="text-gray-400 italic">{placeholder}</span>}
      
      {/* Little Edit Pencil Hint */}
      {!isEditing && (
        <span
          className={`absolute -top-3 -right-3 z-20 bg-amber-500 text-slate-950 rounded-full p-0.5 shadow-md transition pointer-events-none ${
            showEditGuides
              ? 'opacity-85 group-hover:opacity-100 scale-90 group-hover:scale-110 ring-1 ring-white/50'
              : 'opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100'
          }`}
        >
          <Edit3 className="w-2.5 h-2.5" />
        </span>
      )}
    </Component>
  );
}
