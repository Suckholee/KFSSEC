import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export default function AuthModal({ isOpen = false, onClose }) {
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = event => { if (event.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={onClose}>
      <section role="dialog" aria-modal="true" aria-labelledby="member-auth-title" onClick={event => event.stopPropagation()} className="relative w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
        <button type="button" aria-label="닫기" onClick={onClose} className="absolute right-4 top-4 rounded-full p-2 text-gray-500 hover:bg-gray-100"><X className="h-5 w-5" /></button>
        <h2 id="member-auth-title" className="text-xl font-bold text-emerald-950">회원 서비스 준비 중</h2>
        <p className="mt-4 text-sm leading-6 text-gray-700">회원가입과 로그인은 현재 실제 회원 데이터베이스에 연결되어 있지 않습니다. 교육 문의는 커뮤니티의 문의하기에서 회원가입 없이 등록할 수 있습니다.</p>
        <button type="button" onClick={onClose} className="mt-6 w-full rounded-xl bg-emerald-800 px-4 py-3 font-semibold text-white">확인</button>
      </section>
    </div>
  );
}
