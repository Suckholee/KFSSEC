import React, { useEffect, useState } from 'react';
import EmailLogin from './EmailLogin';
import { X, Mail, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export default function AuthModal({ isOpen = false, onClose }) {
  const { language } = useLanguage();
  const [configured, setConfigured] = useState(false);
  const [checking, setChecking] = useState(true);
  const [method, setMethod] = useState(null);
  const labels = {
    ko: ['원하는 방법으로 로그인하세요.', '이메일로 계속하기', '다른 로그인 방법', '처음 방문하셨나요? 인증 후 회원가입을 진행합니다.'],
    en: ['Choose how to continue.', 'Continue with email', 'Other login methods', 'New here? Complete sign-up after verification.'],
    ja: ['ログイン方法を選択してください。', 'メールで続ける', '他のログイン方法', '初めての方は認証後に会員登録へ進みます。'],
    zh: ['请选择登录方式。', '使用邮箱继续', '其他登录方式', '首次访问？验证后即可完成注册。'],
  }[language];
  const copy = {
    ko: ['로그인 / 회원가입', '카카오 계정으로 간편하게 로그인하세요.', '카카오 로그인 연결 설정 중입니다.', '연결 상태 확인 중…', '카카오 로그인'],
    en: ['Log in / Sign up', 'Continue with your Kakao account.', 'Kakao Login is being configured.', 'Checking connection…', 'Log in with Kakao'],
    ja: ['ログイン / 会員登録', 'カカオアカウントでログインできます。', 'カカオログインを設定中です。', '接続を確認中…', 'カカオでログイン'],
    zh: ['登录 / 注册', '使用Kakao账号快捷登录。', '正在配置Kakao登录。', '正在检查连接…', '使用Kakao登录'],
  }[language];
  useEffect(() => {
    if (!isOpen) return;
    let cancelled = false;
    setMethod(null);
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
      <section role="dialog" aria-modal="true" aria-labelledby="member-auth-title" onClick={event => event.stopPropagation()} className="relative max-h-[calc(100dvh-2rem)] w-full max-w-md overflow-y-auto rounded-3xl bg-white p-6 sm:p-8 shadow-2xl">
        <button type="button" aria-label="닫기" onClick={onClose} className="absolute right-4 top-4 rounded-full p-2 text-gray-500 hover:bg-gray-100"><X className="h-5 w-5" /></button>
        <h2 id="member-auth-title" className="text-xl font-bold text-emerald-950">{copy[0]}</h2>
        {method === 'email' ? <>
          <button type="button" onClick={() => setMethod(null)} className="mt-4 inline-flex items-center gap-2 rounded-lg py-2 text-sm text-gray-600 hover:text-emerald-800"><ArrowLeft className="h-4 w-4" />{labels[2]}</button>
          <EmailLogin />
        </> : <>
        <p className="mt-3 text-sm leading-6 text-gray-600">{labels[0]}</p>
        <button type="button" disabled={checking || !configured} onClick={() => window.location.assign('/api/member-auth?action=start')} aria-label={copy[4]} className="mt-6 w-full overflow-hidden rounded-xl bg-[#FEE500] disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-800">
          <img src={`/images/auth/kakao_login_${language === 'ko' ? 'kr' : 'en'}.svg`} alt={copy[4]} className="w-full h-14 object-contain" />
        </button>
        <button type="button" onClick={() => setMethod('email')} className="mt-3 flex min-h-14 w-full items-center justify-center gap-2 rounded-xl border border-gray-300 px-4 py-3 font-semibold text-gray-800 hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-800"><Mail className="h-5 w-5 shrink-0" />{labels[1]}</button>
        <p className="mt-5 text-center text-xs leading-5 text-gray-500">{labels[3]}</p>
        {(checking || !configured) && <p role="status" className="mt-3 text-sm text-gray-500">{checking ? copy[3] : copy[2]}</p>}
        </>}
      </section>
    </div>
  );
}
