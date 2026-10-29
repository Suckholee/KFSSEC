import React,{useEffect,useRef,useState} from 'react';
export default function EmailAuthReturn(){
 const started=useRef(false),[message,setMessage]=useState('');
 useEffect(()=>{
  if(started.current)return;
  const hash=new URLSearchParams(window.location.hash.slice(1));
  if(!hash.has('access_token')&&!hash.has('error_description'))return;
  started.current=true;
  const accessToken=hash.get('access_token');
  const url=new URL(window.location.href);url.hash='';url.searchParams.delete('email_auth');window.history.replaceState({},'',url.pathname+url.search);
  if(!accessToken){setMessage('인증 링크가 만료됐거나 유효하지 않습니다. 로그인에서 인증메일을 다시 요청해 주세요.');return;}
  setMessage('이메일 인증을 확인하고 있습니다…');
  fetch('/api/member-auth?action=email-token',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({accessToken})}).then(async response=>{const result=await response.json();if(!response.ok)throw new Error(result.message);window.location.replace(result.registrationRequired?'/?signup=1':'/');}).catch(error=>setMessage(error.message||'인증에 실패했습니다. 다시 시도해 주세요.'));
 },[]);
 return message?<div role="status" className="fixed inset-x-4 top-28 z-[300] mx-auto max-w-lg rounded-xl border bg-white p-5 shadow-xl">{message}<button className="ml-3 underline" onClick={()=>setMessage('')}>닫기</button></div>:null;
}
