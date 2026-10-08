import React, { useEffect, useState } from 'react';

const date = value => value ? new Date(value).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }) : '—';
export default function AdminMembers() {
  const [members, setMembers] = useState([]);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(null);
  const [notice, setNotice] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  async function load() {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/members', { cache: 'no-store' });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || '회원 목록을 불러오지 못했습니다.');
      setMembers(result.members);
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  }
  useEffect(() => { load(); }, []);
  async function saveType() {
    setSaving(true); setError(''); setNotice('');
    try {
      const response = await fetch('/api/members', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editing) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || '회원 구분을 저장하지 못했습니다.');
      setMembers(previous => previous.map(member => member.id === result.member.id ? result.member : member));
      setNotice('회원 구분이 저장되었습니다.'); setEditing(null);
    } catch (e) { setError(e.message); } finally { setSaving(false); }
  }
  const typeOf = member => member.membershipType === 'regular' ? 'regular' : 'general';
  const filtered = members.filter(member => (typeFilter === 'all' || typeOf(member) === typeFilter)).filter(member => `${member.name} ${member.id} ${member.phone || ""} ${member.email || ""} ${member.industry || ""} ${member.organization || ""} ${member.position || ""}`.toLowerCase().includes(search.trim().toLowerCase()));
  return <div className="space-y-5">
    <div className="flex items-center justify-between gap-4">
      <div><h3 className="text-xl font-black">회원 관리</h3><p className="text-sm text-gray-500 mt-1">정회원과 사이트에 가입한 일반 회원을 구분하고 관리합니다.</p></div>
      <button onClick={load} disabled={loading || saving} className="px-4 py-2 rounded-xl bg-emerald-700 text-white disabled:opacity-50">새로고침</button>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">{[['all', '전체 회원'], ['regular', '정회원'], ['general', '일반 회원']].map(([value, label]) => <button key={value} disabled={loading} onClick={() => setTypeFilter(value)} aria-pressed={typeFilter === value} className={`text-left bg-white border rounded-2xl p-5 ${typeFilter === value ? 'border-emerald-700 ring-1 ring-emerald-700' : ''}`}><span className="text-gray-500">{label}</span><strong className="block text-2xl mt-2">{loading ? '…' : `${members.filter(member => value === 'all' || typeOf(member) === value).length}명`}</strong></button>)}</div>
    <p className="text-sm text-gray-600">일반 회원은 사이트 가입 회원이며, 정회원은 교육원에서 확인한 회원입니다. 회원 구분은 관리자 권한과 별도로 관리됩니다.</p>
    <input aria-label="회원 검색" placeholder="실명, 연락처, 이메일 또는 아이디 검색" value={search} onChange={e => setSearch(e.target.value)} className="w-full max-w-md border rounded-xl px-4 py-3" />
    {notice && <p role="status" className="text-emerald-800">{notice}</p>}
    {editing && <div className="bg-white border rounded-2xl p-5 space-y-3">
      <h4 className="font-bold">{members.find(member => member.id === editing.id)?.name} 회원 구분 변경</h4>
      <select aria-label="변경할 회원 구분" value={editing.membershipType} disabled={saving} onChange={e => setEditing({ ...editing, membershipType: e.target.value })} className="border rounded-lg p-2"><option value="general">일반 회원</option><option value="regular">정회원</option></select>
      <div className="flex gap-2"><button disabled={saving} onClick={saveType} className="bg-emerald-700 text-white rounded-lg px-4 py-2 disabled:opacity-50">{saving ? '저장 중…' : '저장'}</button><button disabled={saving} onClick={() => setEditing(null)} className="border rounded-lg px-4 py-2">취소</button></div>
    </div>}
    {error && <p role="alert" className="text-red-700">{error}</p>}
    {loading ? <p role="status">회원 목록을 불러오는 중입니다.</p> : !error && <div className="overflow-x-auto bg-white border rounded-2xl">
      <table className="w-full text-sm text-left whitespace-nowrap"><thead className="bg-gray-100"><tr>{['실명 (직접 입력)', '회원 구분', '관리', '휴대폰 번호', '이메일', '업종', '소속', '직위', '회원 아이디', '가입일', '최근 로그인'].map(label => <th key={label} className="p-4">{label}</th>)}</tr></thead>
      <tbody>{filtered.map(member => <tr key={member.id} className="border-t"><td className="p-4 font-bold">{member.name}</td><td className="p-4"><span className={`rounded-full px-3 py-1 ${typeOf(member) === 'regular' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-700'}`}>{typeOf(member) === 'regular' ? '정회원' : '일반 회원'}</span></td><td className="p-4"><button aria-label={`${member.name} 회원 구분 변경`} disabled={saving} onClick={() => { setNotice(''); setError(''); setEditing({ id: member.id, membershipType: typeOf(member) }); }} className="border rounded-lg px-3 py-1.5 disabled:opacity-50">구분 변경</button></td><td className="p-4">{member.phone || "—"}</td><td className="p-4">{member.email || "—"}</td><td className="p-4">{member.industry || "—"}</td><td className="p-4">{member.organization || "—"}</td><td className="p-4">{member.position || "—"}</td><td className="p-4">{member.id}</td><td className="p-4">{date(member.joinedAt)}</td><td className="p-4">{date(member.lastLoginAt)}</td></tr>)}
      {!filtered.length && <tr><td colSpan={11} className="p-8 text-center text-gray-500">{search || typeFilter !== 'all' ? '검색 결과가 없습니다.' : '아직 등록된 회원이 없습니다.'}</td></tr>}</tbody></table>
    </div>}
  </div>;
}
