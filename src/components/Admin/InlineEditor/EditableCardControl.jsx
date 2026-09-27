import React from 'react';
import { useAdminEdit } from '../../../context/AdminEditContext';
import { ArrowLeft, ArrowRight, Trash2 } from 'lucide-react';

export default function EditableCardControl({
  onMoveLeft,
  onMoveRight,
  onDelete,
  title = '항목 제어',
  className = '',
}) {
  const { isEditMode } = useAdminEdit();

  if (!isEditMode) return null;

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`absolute top-2 right-2 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex items-center gap-1 bg-slate-950/85 backdrop-blur-md text-white p-1 rounded-lg border border-amber-500/40 shadow-lg ${className}`}
    >
      {onMoveLeft && (
        <button
          type="button"
          onClick={onMoveLeft}
          title="앞으로 순서 이동"
          className="p-1 rounded hover:bg-amber-600 text-slate-300 hover:text-white transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
        </button>
      )}

      {onMoveRight && (
        <button
          type="button"
          onClick={onMoveRight}
          title="뒤로 순서 이동"
          className="p-1 rounded hover:bg-amber-600 text-slate-300 hover:text-white transition"
        >
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      )}

      {onDelete && (
        <button
          type="button"
          onClick={() => {
            if (window.confirm('이 항목을 정말 삭제하시겠습니까?')) {
              onDelete();
            }
          }}
          title="항목 삭제"
          className="p-1 rounded hover:bg-red-600 text-red-400 hover:text-white transition"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}
