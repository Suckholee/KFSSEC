import React, { useEffect, useRef, useState } from 'react';
import { Users, UserCheck, UserRound, RefreshCw, RotateCcw, Download, ArrowLeft, ChevronLeft, ChevronRight, ArrowUpDown, Check, X, Search, ClipboardList } from 'lucide-react';
import './AdminMembers.css';

const typeOf = member => member.membershipType === 'regular' ? 'regular' : 'general';
const date = value => value ? new Date(value).toLocaleDateString('ko-KR', { timeZone: 'Asia/Seoul', year: 'numeric', month: '2-digit', day: '2-digit' }) : '—';
const columns = [['id','회원 아이디'], ['name','성명'], ['phone','휴대폰 번호'], ['email','이메일'], ['industry','업종'], ['organization','소속'], ['position','직위'], ['joinedAt','가입일'], ['lastLoginAt','최근 로그인']];
const emptyFilters = { id: '', name: '', phone: '', email: '', industry: '', organization: '', position: '', joinedAt: '', lastLoginAt: '' };
const csvCell = value => `"${String(value ?? '').replace(/^[=+@\-\t\r]/, "'$&").replace(/"/g, '""')}"`;

export default function AdminMembers() {
  const [members, setMembers] = useState([]);
  const [typeFilter, setTypeFilter] = useState('all');
  const [filters, setFilters] = useState(emptyFilters);
  const [sort, setSort] = useState({ key: 'joinedAt', direction: -1 });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [selected, setSelected] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(null);
  const [bulkType, setBulkType] = useState('regular');
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');
  const selectionRef = useRef(null);
  async function load() {
    setLoading(true); setError('');
    try {
      const response = await fetch('/api/members', { cache: 'no-store' });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || '회원 목록을 불러오지 못했습니다.');
      setMembers(result.members); setSelected(new Set()); setEditing(null);
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  }
  useEffect(() => { load(); }, []);
  const filtered = members.filter(member => (typeFilter === 'all' || typeOf(member) === typeFilter) && columns.every(([key]) => {
    const value = key.endsWith('At') ? (member[key] ? new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Seoul', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(member[key])) : '') : String(member[key] || '');
    return value.toLowerCase().includes(filters[key].trim().toLowerCase());
  })).sort((a, b) => String(a[sort.key] || '').localeCompare(String(b[sort.key] || ''), 'ko', { numeric: true }) * sort.direction);
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const visible = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const allChecked = visible.length > 0 && visible.every(member => selected.has(member.id));
  useEffect(() => { if (selectionRef.current) selectionRef.current.indeterminate = !allChecked && visible.some(member => selected.has(member.id)); }, [selected, visible, allChecked]);
  function reset() { setFilters(emptyFilters); setTypeFilter('all'); setPage(1); setSelected(new Set()); setEditing(null); }
  function filter(key, value) { setFilters(previous => ({ ...previous, [key]: value })); setPage(1); setSelected(new Set()); }
  function toggle(id) { setSelected(previous => { const next = new Set(previous); next.has(id) ? next.delete(id) : next.add(id); return next; }); }
  async function updateTypes(ids, membershipType) {
    setSaving(true); setError(''); setNotice('');
    const completed = [];
    try {
      for (const id of ids) {
        const response = await fetch('/api/members', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, membershipType }) });
        const result = await response.json();
        if (!response.ok) throw new Error(result.message || '회원 구분을 저장하지 못했습니다.');
        completed.push(id);
        setMembers(previous => previous.map(member => member.id === id ? result.member : member));
      }
      setNotice(`${completed.length}명의 회원 구분을 ${membershipType === 'regular' ? '정회원' : '일반 회원'}으로 변경했습니다.`); setEditing(null);
    } catch (e) { setError(`${e.message}${completed.length ? ` (${completed.length}명 저장 완료)` : ''}`); }
    finally { setSelected(previous => new Set([...previous].filter(id => !completed.includes(id)))); setSaving(false); }
  }
  function exportCsv() {
    const rows = [['회원 구분', ...columns.map(([, label]) => label)], ...filtered.map(member => [typeOf(member) === 'regular' ? '정회원' : '일반 회원', ...columns.map(([key]) => key.endsWith('At') ? date(member[key]) : member[key])])];
    const url = URL.createObjectURL(new Blob(['\uFEFF' + rows.map(row => row.map(csvCell).join(',')).join('\r\n')], { type: 'text/csv;charset=utf-8' }));
    const anchor = document.createElement('a'); anchor.href = url; anchor.download = '회원목록.csv'; anchor.click(); URL.revokeObjectURL(url);
  }
  return <div className="member-workspace">
    <header className="member-heading"><div><a className="member-back" href="/"><ArrowLeft size={14}/> 홈페이지 관리</a><h1>회원 관리 대시보드 <span>Member Workspace</span></h1><p>회원 정보를 조회하고 정회원과 사이트 가입 일반 회원을 구분합니다.</p></div><button className="member-button member-export" disabled={loading || !filtered.length} onClick={exportCsv}><Download size={16}/> CSV 내보내기</button></header>
    <nav className="member-tabs" aria-label="회원 구분">{[['all','전체 회원',Users],['regular','정회원',UserCheck],['general','일반 회원',UserRound]].map(([value,label,Icon]) => <button key={value} aria-pressed={typeFilter === value} className={typeFilter === value ? 'active' : ''} onClick={() => { setTypeFilter(value); setPage(1); setSelected(new Set()); }}><Icon size={17}/>{label}<span>{loading ? '…' : members.filter(member => value === 'all' || typeOf(member) === value).length}</span></button>)}</nav>
    {error && <div role="alert" className="member-message error">{error}</div>}{notice && <div role="status" className="member-message success"><Check size={16}/>{notice}</div>}
    <section className="member-ledger" aria-label="회원 통합 관리대장">
      <div className="member-ledger-toolbar"><div className="member-ledger-title"><ClipboardList size={19}/><strong>회원 통합 관리대장</strong><span>총 {members.length}명 중 <b>{filtered.length}명</b> 표시 <i>(페이지 {currentPage})</i></span></div><div className="member-actions"><button className="member-button" onClick={reset} disabled={saving}><RotateCcw size={14}/> 필터 초기화</button><button className="member-button blue" onClick={load} disabled={loading || saving}><RefreshCw size={14} className={loading ? 'animate-spin' : ''}/> 새로고침</button></div></div>
      {selected.size > 0 && <div className="member-bulk"><strong>{selected.size}명 선택</strong><select aria-label="선택 회원의 변경할 구분" value={bulkType} disabled={saving} onChange={e => setBulkType(e.target.value)}><option value="regular">정회원</option><option value="general">일반 회원</option></select><button className="member-button blue" disabled={saving} onClick={() => updateTypes([...selected], bulkType)}>{saving ? '저장 중…' : '선택 회원 구분 변경'}</button><button className="member-button" disabled={saving} onClick={() => setSelected(new Set())}>선택 해제</button></div>}
      <div className="member-grid-scroll"><table className="member-grid"><colgroup><col style={{width:48}}/><col style={{width:44}}/><col style={{width:160}}/><col style={{width:125}}/><col style={{width:138}}/><col style={{width:130}}/><col style={{width:200}}/><col style={{width:115}}/><col style={{width:145}}/><col style={{width:105}}/><col style={{width:112}}/><col style={{width:120}}/><col style={{width:178}}/></colgroup>
        <thead><tr className="member-filter-row"><th>필터</th><th><Search size={14}/></th>{columns.slice(0,2).map(([key,label]) => <th key={key}><input aria-label={`${label} 검색`} placeholder={label} value={filters[key]} onChange={e => filter(key,e.target.value)}/></th>)}<th><select aria-label="회원 구분 필터" value={typeFilter} onChange={e => { setTypeFilter(e.target.value); setSelected(new Set()); setPage(1); }}><option value="all">전체 구분</option><option value="regular">정회원</option><option value="general">일반 회원</option></select></th>{columns.slice(2).map(([key,label]) => <th key={key}><input aria-label={`${label} 검색`} type={key.endsWith('At') ? 'date' : 'text'} placeholder={label} value={filters[key]} onChange={e => filter(key,e.target.value)}/></th>)}<th/></tr>
        <tr><th>No.</th><th><input ref={selectionRef} type="checkbox" aria-label="현재 페이지 전체 선택" checked={allChecked} disabled={saving || loading || !visible.length} onChange={() => setSelected(previous => { const next = new Set(previous); visible.forEach(member => allChecked ? next.delete(member.id) : next.add(member.id)); return next; })}/></th>{columns.slice(0,2).map(([key,label]) => <th key={key}><button onClick={() => setSort({ key, direction: sort.key === key ? -sort.direction : 1 })}>{label}<ArrowUpDown size={12}/></button></th>)}<th>회원 구분</th>{columns.slice(2).map(([key,label]) => <th key={key}><button onClick={() => setSort({ key, direction: sort.key === key ? -sort.direction : 1 })}>{label}<ArrowUpDown size={12}/></button></th>)}<th>회원 구분 변경</th></tr></thead>
        <tbody>{!loading && visible.map((member,index) => <tr key={member.id} className={selected.has(member.id) ? 'selected' : ''}><td className="muted">{(currentPage-1)*pageSize+index+1}</td><td><input type="checkbox" aria-label={`${member.name} 선택`} checked={selected.has(member.id)} disabled={saving} onChange={() => toggle(member.id)}/></td><td className="member-id" title={member.id}>{member.id}</td><td className="member-name">{member.name}</td><td><span className={`member-badge ${typeOf(member)}`}><span/>{typeOf(member) === 'regular' ? '정회원' : '일반 회원'}</span></td>{columns.slice(2).map(([key]) => <td key={key} className={key.endsWith('At') ? 'member-date' : ''} title={String(member[key] || '')}>{key.endsWith('At') ? date(member[key]) : member[key] || '—'}</td>)}<td>{editing?.id === member.id ? <div className="member-inline-edit"><select aria-label={`${member.name} 변경할 회원 구분`} disabled={saving} value={editing.membershipType} onChange={e => setEditing({ ...editing, membershipType: e.target.value })}><option value="regular">정회원</option><option value="general">일반 회원</option></select><button aria-label={`${member.name} 구분 저장`} disabled={saving} onClick={() => updateTypes([member.id], editing.membershipType)}><Check size={15}/></button><button aria-label="변경 취소" disabled={saving} onClick={() => setEditing(null)}><X size={15}/></button></div> : <button className="member-button blue" disabled={saving} onClick={() => setEditing({ id:member.id, membershipType:typeOf(member) })}>구분 변경 →</button>}</td></tr>)}
        {(loading || !visible.length) && <tr><td colSpan={13}><div className="member-empty">{loading ? <RefreshCw size={26} className="animate-spin"/> : <Users size={32}/>}<strong>{loading ? '회원 목록을 불러오는 중입니다.' : members.length ? '조건에 맞는 회원이 없습니다.' : '등록된 회원이 없습니다.'}</strong><p>{!loading && (members.length ? '필터를 초기화하거나 검색 조건을 변경해 주세요.' : '사이트 가입을 완료한 회원이 이곳에 표시됩니다.')}</p></div></td></tr>}</tbody>
      </table></div>
      <footer className="member-pagination"><label>페이지당 표시 <select aria-label="페이지당 표시 수" value={pageSize} onChange={e => { setPageSize(Number(e.target.value)); setPage(1); }}>{[20,50,100].map(size => <option key={size} value={size}>{size}명</option>)}</select></label><span>{filtered.length ? `${(currentPage-1)*pageSize+1}–${Math.min(currentPage*pageSize,filtered.length)} / ${filtered.length}명` : '0명'}</span><div><button aria-label="이전 페이지" disabled={currentPage <= 1} onClick={() => setPage(currentPage-1)}><ChevronLeft size={18}/></button><strong>{currentPage}</strong> / {totalPages}<button aria-label="다음 페이지" disabled={currentPage >= totalPages} onClick={() => setPage(currentPage+1)}><ChevronRight size={18}/></button></div></footer>
    </section><p className="member-footnote">정회원은 교육원에서 확인한 회원, 일반 회원은 사이트 가입 회원입니다. 회원 구분 변경은 관리자 권한 부여와 별개입니다.</p>
  </div>;
}
