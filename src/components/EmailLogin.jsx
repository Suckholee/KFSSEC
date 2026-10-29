import React, { useState } from 'react';
export default function EmailLogin({ linking = false }) {
  const [email,setEmail]=useState(''),[token,setToken]=useState(''),[sent,setSent]=useState(false),[busy,setBusy]=useState(false),[message,setMessage]=useState('');
  async function submit(verify) {
    if(busy)return;setBusy(true);setMessage('');
    try {
      const response=await fetch(`/api/member-auth?action=${verify?'email-verify':'email-start'}`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(verify?{token}:{email,purpose:linking?'link':'login'})});
      const result=await response.json();if(!response.ok)throw new Error(result.message||'인증에 실패했습니다.');
      if(verify)window.location.assign(result.registrationRequired?'/?signup=1':'/');
      else {setSent(true);setMessage(result.message);}
    }catch(error){setMessage(error.message);}finally{setBusy(false);}
  }
  return <section onKeyDown={event=>{if(event.key==='Enter'){event.preventDefault();submit(Boolean(sent&&token));}}} className="mt-5 space-y-3 border-t pt-4" aria-label={linking?'이메일 로그인 연결':'이메일 로그인'}>
    <h3 className="font-bold text-emerald-950">{linking?'이메일 로그인 연결':'이메일로 로그인 / 가입'}</h3>
    <p className="text-xs leading-relaxed text-stone-600">{linking?'현재 계정과 이메일을 모두 인증하면 회원정보·수강내역·권한을 한 회원으로 관리합니다. 기존에 별도로 가입한 계정도 인증 후 통합됩니다.':'비밀번호 대신 메일로 받은 일회용 링크 또는 인증코드를 사용합니다. 기존 카카오 회원은 카카오로 로그인한 뒤 내 정보에서 이메일을 연결하세요.'}</p>
    <label className="block text-sm">인증할 이메일<input type="email" autoComplete="email" value={email} onChange={e=>{setEmail(e.target.value);setSent(false);}} className="mt-1 w-full rounded-lg border p-3" /></label>
    <button type="button" disabled={busy||!email} onClick={()=>submit(false)} className="w-full rounded-lg bg-emerald-700 p-3 font-bold text-white disabled:opacity-50">{busy?'처리 중…':'인증메일 받기'}</button>
    {sent&&<><label className="block text-sm">메일에 인증코드가 있는 경우<input inputMode="numeric" autoComplete="one-time-code" value={token} onChange={e=>setToken(e.target.value)} className="mt-1 w-full rounded-lg border p-3" /></label><button type="button" disabled={busy||!token} onClick={()=>submit(true)} className="w-full rounded-lg border p-3 font-bold">{linking?'인증하고 계정 연결':'인증하고 계속하기'}</button></>}
    {message&&<p role="status" className="text-sm leading-relaxed text-emerald-900">{message}</p>}
  </section>;
}
