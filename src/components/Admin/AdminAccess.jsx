import React, { useState } from 'react';
export default function AdminAccess({ onAuthenticated, configured }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);
  const [recovery, setRecovery] = useState(false);
  async function login(event) {
    event.preventDefault(); setPending(true); setError('');
    try {
      const response = await fetch('/api/auth', recovery ? { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username, password }) } : { cache: 'no-store' });
      const result = await response.json();
      if (!response.ok || (!recovery && !result.authenticated)) throw new Error(result.message || '먼저 회원 로그인을 완료해 주세요. 관리자 권한이 지정된 계정만 접속할 수 있습니다.');
      onAuthenticated();
    } catch (cause) { setError(cause.message); } finally { setPending(false); }
  }
  return <main className="grid min-h-screen place-items-center bg-slate-900 p-6">
    <form onSubmit={login} className="w-full max-w-md space-y-5 rounded-3xl bg-white p-8 shadow-2xl">
      <h1 className="text-xl font-black">KFSSEC 관리자 로그인</h1>
      <p className="text-sm leading-6 text-slate-600">회원가입·로그인 후 교육원에서 관리자 권한을 부여받은 계정으로 접속하세요. 회원 구분과 관리자 권한은 별도로 관리됩니다.</p>
      {!recovery && <a href="/?login=1&returnTo=%2Fadmin" className="block rounded-xl bg-[#FEE500] p-3 text-center font-bold text-black">회원 계정으로 로그인</a>}
      {recovery && <>
        <label className="block text-sm font-bold">운영자 아이디<input autoComplete="username" required value={username} onChange={e => setUsername(e.target.value)} className="mt-2 w-full rounded-lg border p-3" /></label>
        <label className="block text-sm font-bold">운영자 비밀번호<input type="password" autoComplete="current-password" required value={password} onChange={e => setPassword(e.target.value)} className="mt-2 w-full rounded-lg border p-3" /></label>
        {!configured && <p className="text-sm text-red-600">운영자 인증 설정이 필요합니다.</p>}
      </>}
      {error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
      <button disabled={pending || (recovery && !configured)} className="w-full rounded-xl bg-emerald-800 p-3 font-bold text-white disabled:opacity-50">{pending ? '확인 중…' : recovery ? '운영자 로그인' : '관리자 권한 확인 후 접속'}</button>
      <button type="button" className="block text-xs text-slate-500 underline" onClick={() => { setRecovery(!recovery); setError(''); }}>{recovery ? '회원 계정으로 접속하기' : '시스템 운영자 접속'}</button>
      <a href="/" className="block text-center text-xs text-slate-500">홈으로 돌아가기</a>
    </form>
  </main>;
}
