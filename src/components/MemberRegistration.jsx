import EmailLogin from './EmailLogin';
import React, { useEffect, useState } from 'react';

const emptyProfile = { name: '', phone: '', email: '', industry: '', organization: '', position: '' };
const industries = ['외식업', '식품 제조·유통', '교육·연구', '호텔·관광', '창업 준비', '학생', '기타'];
const positions = ['대표·사업주', '임원', '관리자', '직원', '교수·강사', '학생', '기타'];
export default function MemberRegistration({ onComplete, onCancel, editing = false }) {
  const [form, setForm] = useState(emptyProfile);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(editing);
  const [error, setError] = useState('');
  const [loadFailed, setLoadFailed] = useState(false);
  const [additional, setAdditional] = useState(false);
  const [manageConnections, setManageConnections] = useState(false);
  const [connectEmail, setConnectEmail] = useState(false);
  const connected = provider => connections.some(id => id.startsWith(`${provider}:`));
  const [connections,setConnections]=useState([]);
  const [enrollments,setEnrollments]=useState([]);
  const [retry, setRetry] = useState(0);
  useEffect(() => {
    if (!editing) return;
    const controller = new AbortController();
    setLoading(true); setLoadFailed(false); setError('');
    fetch('/api/member-auth?action=profile', { cache: 'no-store', signal: controller.signal }).then(async response => {
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || '정보를 불러오지 못했습니다.');
      setConnections(result.loginIdentities || []);setEnrollments(result.enrolledCourses || []);
      setForm({ ...emptyProfile, ...result.profile });
      setAdditional(Boolean(result.profile.industry || result.profile.organization || result.profile.position));
    }).catch(e => { if (e.name !== 'AbortError') { setError(e.message); setLoadFailed(true); } }).finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [editing, retry]);
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const closeOnEscape = event => { if (event.key === 'Escape' && !saving) onCancel(); };
    document.addEventListener('keydown', closeOnEscape);
    return () => { document.body.style.overflow = previousOverflow; document.removeEventListener('keydown', closeOnEscape); };
  }, [onCancel, saving]);
  async function submit(e) {
    e.preventDefault(); setSaving(true); setError('');
    try {
      const response = await fetch(`/api/member-auth?action=${editing ? 'profile' : 'register'}`, { method: editing ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || '정보를 저장하지 못했습니다.');
      onComplete(result.user);
    } catch (e) { setError(e.message); }
    finally { setSaving(false); }
  }
  function input(field) {
    return <label key={field.key} className="block text-sm font-bold text-gray-800">{field.label}{field.required ? ' *' : ' (선택)'}<input autoComplete={field.autocomplete} required={field.required} type={field.type || 'text'} maxLength={field.max || 100} list={field.list} value={form[field.key]} onChange={e => setForm(previous => ({ ...previous, [field.key]: e.target.value }))} placeholder={field.placeholder} className="block mt-2 w-full border border-gray-300 rounded-xl p-3 font-normal focus:ring-2 focus:ring-emerald-600 focus:outline-none" /></label>;
  }
  return <div className="fixed inset-0 z-[200] bg-black/50 flex items-center justify-center p-4" onClick={event => { if (event.target === event.currentTarget && !saving) onCancel(); }} role="dialog" aria-modal="true" aria-labelledby="signup-title">
    <form onSubmit={submit} className="bg-white rounded-3xl max-w-lg w-full shadow-xl max-h-[90dvh] overflow-hidden flex flex-col">
      <div className="shrink-0 border-b px-6 py-5 flex items-start gap-4"><div className="flex-1"><h2 id="signup-title" className="text-2xl font-black text-gray-900">{editing ? '내 정보 설정' : '회원가입 정보 입력'}</h2><p className="text-sm text-gray-600 mt-2">{editing ? '기본 정보와 추가 정보를 확인하고 수정할 수 있습니다.' : '로그인 인증이 완료됐습니다. 기본 정보를 입력하고 추가 정보는 선택해 주세요.'}</p></div><button type="button" aria-label="창 닫기" disabled={saving} onClick={onCancel} className="shrink-0 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 text-2xl text-gray-700 disabled:opacity-50">×</button></div>
      <div className="min-h-0 overflow-y-auto overscroll-contain p-6 space-y-5">
      {loading ? <p role="status">내 정보를 불러오는 중입니다.</p> : !loadFailed && <>

        <fieldset className="space-y-4"><legend className="font-black mb-3">기본 정보</legend>
          {input({ key: 'name', label: '성명', required: true, autocomplete: 'name', placeholder: '홍길동', max: 50 })}
          {input({ key: 'phone', label: '전화번호', required: true, type: 'tel', autocomplete: 'tel', placeholder: '010-1234-5678', max: 20 })}
          {input({ key: 'email', label: '이메일', type: 'email', autocomplete: 'email', placeholder: 'example@email.com', max: 254 })}
        </fieldset>
        <section className="border-t pt-4">
          <button type="button" aria-expanded={additional} aria-controls="additional-profile" onClick={() => setAdditional(!additional)} className="w-full text-left flex justify-between items-center font-black"><span>추가 정보 <span className="font-normal text-sm text-gray-500">(선택)</span></span><span>{additional ? '접기 −' : '입력하기 +'}</span></button>
          {additional && <div id="additional-profile" className="space-y-4 mt-4"><p className="text-xs text-gray-500">현재 소속과 업무 정보를 선택하거나 직접 입력하세요. 나중에 내 정보 설정에서 입력해도 됩니다.</p>
            {input({ key: 'industry', label: '업종', list: 'member-industries', placeholder: '업종 선택 또는 직접 입력' })}
            {input({ key: 'organization', label: '소속', autocomplete: 'organization', placeholder: '회사, 기관 또는 매장명' })}
            {input({ key: 'position', label: '직위', autocomplete: 'organization-title', list: 'member-positions', placeholder: '직위 선택 또는 직접 입력' })}
            <datalist id="member-industries">{industries.map(value => <option key={value} value={value} />)}</datalist><datalist id="member-positions">{positions.map(value => <option key={value} value={value} />)}</datalist>
          </div>}
        </section>
        <p className="text-xs text-gray-500">성명과 전화번호는 직접 입력한 정보입니다.</p>
        {editing && <>
          <section className="space-y-3 rounded-xl border border-emerald-100 bg-emerald-50 p-4">
            <h3 className="font-bold text-emerald-950">로그인 계정</h3>
            <p className="text-sm leading-6 text-gray-600">연결 완료된 방법으로 바로 로그인할 수 있습니다. 추가 연결은 선택 사항입니다.</p>
            <ul className="space-y-2 text-sm">{[['kakao', '카카오'], ['google', 'Google'], ['email', '이메일']].filter(([provider]) => connected(provider)).map(([provider, label]) => <li key={provider} className="flex flex-wrap items-center justify-between gap-2"><span>{label}</span><span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-emerald-800">연결 완료</span></li>)}</ul>
            {(!connected('kakao') || !connected('google') || !connected('email')) && <button type="button" aria-expanded={manageConnections} aria-controls="member-login-connections" onClick={() => { setManageConnections(!manageConnections); setConnectEmail(false); }} className="rounded-lg border border-emerald-200 bg-white px-3 py-2 text-sm font-bold text-emerald-800">{manageConnections ? '추가 연결 닫기' : '다른 로그인 방법 추가 (선택)'}</button>}
            {manageConnections && <div id="member-login-connections" className="space-y-3 border-t border-emerald-100 pt-3">
              <p className="text-xs leading-5 text-gray-600">다른 계정도 같은 회원으로 사용하려면 여기서 인증해 연결하세요. 회원정보·수강내역·권한을 함께 관리합니다.</p>
              {!connected('kakao') && <a href="/api/member-auth?action=start&link=1" className="block rounded-lg bg-yellow-300 p-3 text-center text-sm font-bold">카카오 계정 연결</a>}
              {!connected('google') && <a href="/api/member-auth?action=google-start&link=1" className="block rounded-lg border border-gray-300 bg-white p-3 text-center text-sm font-bold">Google 계정 연결</a>}
              {!connected('email') && <button type="button" aria-expanded={connectEmail} onClick={() => setConnectEmail(!connectEmail)} className="w-full rounded-lg border border-gray-300 bg-white p-3 text-sm font-bold">이메일 로그인 추가</button>}
              {connectEmail && !connected('email') && <EmailLogin linking />}
            </div>}
          </section>
          <section className="space-y-3 border-t pt-4"><h3 className="font-bold">내 수강내역</h3>{enrollments.length ? <ul className="space-y-2 text-sm">{enrollments.map(item => <li key={item.courseId}>{item.courseTitle || item.courseId} · {item.status}</li>)}</ul> : <p className="text-sm text-gray-600">등록된 수강내역이 없습니다.</p>}</section>
        </>}

      </>}
      {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
      {loadFailed && <button type="button" onClick={() => setRetry(retry + 1)} className="text-emerald-700 font-bold">다시 불러오기</button>}
      <button disabled={saving || loading || loadFailed} className="w-full bg-emerald-700 text-white rounded-xl p-3 font-bold disabled:opacity-50">{saving ? '저장 중…' : editing ? '변경사항 저장' : '회원가입 완료'}</button>
      <button type="button" disabled={saving} onClick={onCancel} className="w-full text-gray-500 text-sm">{editing ? '닫기' : '가입 취소'}</button>
      </div>
    </form>
  </div>;
}
