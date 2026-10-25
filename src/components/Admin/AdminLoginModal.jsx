import React from 'react';
import AdminAccess from './AdminAccess';
export default function AdminLoginModal({ isOpen, onClose, onLoginSuccess }) {
  if (!isOpen) return null;
  return <div role="dialog" aria-modal="true" aria-label="관리자 로그인" className="fixed inset-0 z-50 overflow-auto"><button onClick={onClose} className="absolute right-6 top-6 text-white" aria-label="닫기">✕</button><AdminAccess configured onAuthenticated={onLoginSuccess} /></div>;
}
