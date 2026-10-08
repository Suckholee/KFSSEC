import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export default function AuthModal({ isOpen = false, onClose }) {
  const { language } = useLanguage();
  const [configured, setConfigured] = useState(false);
  const [checking, setChecking] = useState(true);
  const copy = {
    ko: ['로그인 / 회원가입', '카카오 계정으로 간편하게 로그인하세요.', '카카오 로그인 연결 설정 중입니다.', '연결 상태 확인 중…', '카카오 로그인'],
    en: ['Log in / Sign up', 'Continue with your Kakao account.', 'Kakao Login is being configured.', 'Checking connection…', 'Log in with Kakao'],
    ja: ['ログイン / 会員登録', 'カカオアカウントでログインできます。', 'カカオログインを設定中です。', '接続を確認中…', 'カカオでログイン'],
    zh: ['登录 / 注册', '使用Kakao账号快捷登录。', '正在配置Kakao登录。', '正在检查连接…', '使用Kakao登录'],
  }[language];
  useEffect(() => {
    if (!isOpen) return;
    let cancelled = false;
    setChecking(true);
    fetch('/api/member-auth', { cache: 'no-store' }).then(response => response.json()).then(result => {
      if (!cancelled) setConfigured(Boolean(result.configured));
    }).catch(() => { if (!cancelled) setConfigured(false); }).finally(() => { if (!cancelled) setChecking(false); });
    return () => { cancelled = true; };
  }, [isOpen]);
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
        <h2 id="member-auth-title" className="text-xl font-bold text-emerald-950">{copy[0]}</h2>
        <p className="mt-4 text-sm leading-6 text-gray-700">{copy[1]}</p>
        <button type="button" disabled={checking || !configured} onClick={() => window.location.assign('/api/member-auth?action=start')} aria-label={copy[4]} className="mt-6 w-full overflow-hidden rounded-xl bg-[#FEE500] disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-800">
          <img src={`/images/auth/kakao_login_${language === 'ko' ? 'kr' : 'en'}.svg`} alt={copy[4]} className="w-full h-14 object-contain" />
        </button>
        {(checking || !configured) && <p role="status" className="mt-3 text-sm text-gray-500">{checking ? copy[3] : copy[2]}</p>}
      </section>
    </div>
  );
}
