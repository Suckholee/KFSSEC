import React, { useEffect, useState } from 'react';
import EmailLogin from './EmailLogin';
import { X, Mail, ArrowLeft, MessageCircle } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export default function AuthModal({ isOpen = false, initialMode = 'login', onClose }) {
  const { language } = useLanguage();
  const [googleConfigured, setGoogleConfigured] = useState(false);
  const [configured, setConfigured] = useState(false);
  const [checking, setChecking] = useState(true);
  const [method, setMethod] = useState(null);
  const [mode, setMode] = useState('login');
  const signingUp = mode === 'signup';
  const wording = {
    ko: ['로그인', '회원가입', '카카오로 로그인', '카카오로 가입하기', '이메일로 로그인', '이메일로 가입하기', '이미 회원이신가요?', '아직 회원이 아니신가요?', '인증 후 회원정보를 입력하면 가입이 완료됩니다.'],
    en: ['Log in', 'Sign up', 'Log in with Kakao', 'Sign up with Kakao', 'Log in with email', 'Sign up with email', 'Already a member?', 'New here?', 'Verify your account, then complete your member details.'],
    ja: ['ログイン', '会員登録', 'カカオでログイン', 'カカオで登録', 'メールでログイン', 'メールで登録', '登録済みの方', '初めての方', '認証後、会員情報を入力して登録します。'],
    zh: ['登录', '注册', '使用Kakao登录', '使用Kakao注册', '使用邮箱登录', '使用邮箱注册', '已有账号？', '还没有账号？', '验证后填写会员信息即可完成注册。'],
  }[language];
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
    setMode(initialMode === 'signup' ? 'signup' : 'login');
    setChecking(true);
    fetch('/api/member-auth', { cache: 'no-store' }).then(response => response.json()).then(result => {
      if (!cancelled) { setConfigured(Boolean(result.configured)); setGoogleConfigured(Boolean(result.googleConfigured)); }
    }).catch(() => { if (!cancelled) { setConfigured(false); setGoogleConfigured(false); } }).finally(() => { if (!cancelled) setChecking(false); });
    return () => { cancelled = true; };
  }, [isOpen, initialMode]);
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
        <h2 id="member-auth-title" className="text-xl font-bold text-emerald-950">{wording[signingUp ? 1 : 0]}</h2>
        {method === 'email' ? <>
          <button type="button" onClick={() => setMethod(null)} className="mt-4 inline-flex items-center gap-2 rounded-lg py-2 text-sm text-gray-600 hover:text-emerald-800"><ArrowLeft className="h-4 w-4" />{labels[2]}</button>
          <EmailLogin signingUp={signingUp} />
        </> : <>
        <p className="mt-3 text-sm leading-6 text-gray-600">{signingUp ? wording[8] : labels[0]}</p>
        <button type="button" disabled={checking || !configured} onClick={() => window.location.assign('/api/member-auth?action=start')} aria-label={wording[signingUp ? 3 : 2]} className="mt-6 w-full overflow-hidden rounded-xl bg-[#FEE500] disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-800">
          <span className="flex min-h-14 items-center justify-center gap-2 px-4 py-3 font-bold text-[#191919]"><MessageCircle className="h-5 w-5 shrink-0 fill-current" />{wording[signingUp ? 3 : 2]}</span>
        </button>
        <button type="button" disabled={checking || !googleConfigured} onClick={() => window.location.assign('/api/member-auth?action=google-start')} className="mt-3 flex min-h-14 w-full items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-3 font-semibold text-gray-800 hover:bg-gray-50 disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-800"><span aria-hidden="true" className="text-lg font-bold text-blue-600">G</span>{language === 'ko' ? (signingUp ? 'Google로 가입하기' : 'Google로 로그인') : (signingUp ? 'Sign up with Google' : 'Sign in with Google')}</button>
        <button type="button" onClick={() => setMethod('email')} className="mt-3 flex min-h-14 w-full items-center justify-center gap-2 rounded-xl border border-gray-300 px-4 py-3 font-semibold text-gray-800 hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-800"><Mail className="h-5 w-5 shrink-0" />{wording[signingUp ? 5 : 4]}</button>

        {(checking || !configured) && <p role="status" className="mt-3 text-sm text-gray-500">{checking ? copy[3] : copy[2]}</p>}
        </>}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 border-t border-gray-100 pt-4 text-sm">
          <span className="text-gray-500">{wording[signingUp ? 6 : 7]}</span>
          <button type="button" onClick={() => { setMode(signingUp ? 'login' : 'signup'); setMethod(null); }} className="rounded px-1 py-2 font-bold text-emerald-800 underline underline-offset-4">{wording[signingUp ? 0 : 1]}</button>
        </div>
      </section>
    </div>
  );
}
