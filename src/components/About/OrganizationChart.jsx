import React from 'react';
import { useAdminEdit } from '../../context/AdminEditContext';
import EditableText from '../Admin/InlineEditor/EditableText';

// Keep existing published names when first adopting the configurable chart.
export function createOrganizationChart(org = {}, partners = []) {
  const member = (role, name) => ({ role, name });
  const node = (id, title, members, parentId = 'chairman', placement = 'below') => ({ id, title, members, parentId, placement });
  return [
    node('chairman', org.chairman || '이사장 : 안형상', [], null),
    node('secretariat', '사무국', [member('사무국장', '김근혜'), member('사무주임', '조범진')], 'chairman', 'side'),
    node('advisors', '자문위원회', [member('자문위원', org.advisors?.[0]?.name || '신충섭'), member('자문위원', org.advisors?.[1]?.name || '진익준')]),
    node('mentors', '고문단', [member('고문', org.mentors?.[0]?.name || '이상정'), member('고문', org.mentors?.[1]?.name || '조춘봉')]),
    node('partners', '협력업체', partners.map(name => member('', name))),
    node('press', '언론사', [member(org.press?.badge || '공식 협력 언론', org.press?.name || '글로벌 외식정보')]),
    node('honorary', '명예 임원', [member('명예 이사장', org.honorary?.[0]?.name || '이상정'), member('명예 부이사장', org.honorary?.[1]?.name || '주정자')]),
    node('auditor', '감사', [member('공인 감사', org.auditor?.name || '권영복')]),
  ];
}

export default function OrganizationChart({ partners }) {
  const { siteDraft, isEditMode, updateSiteField } = useAdminEdit();
  const nodes = siteDraft?.organization?.chartNodes ?? createOrganizationChart(siteDraft?.organization, partners);
  const save = next => updateSiteField('organization.chartNodes', next);
  const change = (id, patch) => save(nodes.map(n => n.id === id ? { ...n, ...patch } : n));
  const add = parentId => save([...nodes, { id: crypto.randomUUID(), parentId, title: '새 부서', placement: 'below', members: [] }]);
  const descendants = id => {
    const ids = new Set([id]);
    for (let i = 0; i < nodes.length; i++) nodes.forEach(n => { if (ids.has(n.parentId)) ids.add(n.id); });
    return ids;
  };
  const remove = node => {
    if (!window.confirm(`“${node.title}” 및 하위 조직을 삭제하시겠습니까? 저장 전에는 상단 변경 취소로 복구할 수 있습니다.`)) return;
    const ids = descendants(node.id);
    save(nodes.filter(n => !ids.has(n.id)));
  };
  const move = (node, offset) => {
    const siblings = nodes.filter(n => n.parentId === node.parentId && n.placement === node.placement);
    const target = siblings[siblings.findIndex(n => n.id === node.id) + offset];
    if (!target) return;
    const next = [...nodes];
    const a = next.findIndex(n => n.id === node.id), b = next.findIndex(n => n.id === target.id);
    [next[a], next[b]] = [next[b], next[a]];
    save(next);
  };
  const buttonClass = 'rounded border border-emerald-200 bg-white px-2 py-1 text-xs text-emerald-900 hover:bg-emerald-50 disabled:opacity-30';
  const renderNode = (node, ancestors = []) => {
    if (ancestors.includes(node.id)) return null;
    const children = nodes.filter(n => n.parentId === node.id);
    const side = children.filter(n => n.placement === 'side');
    const below = children.filter(n => n.placement !== 'side');
    const blocked = descendants(node.id);
    const siblings = nodes.filter(n => n.parentId === node.parentId && n.placement === node.placement);
    const index = siblings.findIndex(n => n.id === node.id);
    const card = (
      <div className="w-full min-w-0 max-w-[300px] overflow-hidden rounded-2xl border border-[#85CFAB] bg-stone-50 shadow-sm [overflow-wrap:anywhere]">
        <h3 className={`bg-[#2B7752] px-4 py-3 text-center font-black text-white ${!node.parentId ? 'text-2xl' : 'text-sm'}`}>
          <EditableText value={node.title} onChange={title => change(node.id, { title })} />
        </h3>
        {node.members.length > 0 && <div className="divide-y divide-stone-200 px-3">
          {node.members.map((m, i) => <div key={i} className="py-2 text-center">
            <div className="text-xs text-stone-500"><EditableText value={m.role} placeholder="직책" onChange={role => change(node.id, { members: node.members.map((v, j) => j === i ? { ...v, role } : v) })} /></div>
            <div className="text-sm font-bold"><EditableText value={m.name} placeholder="이름" onChange={name => change(node.id, { members: node.members.map((v, j) => j === i ? { ...v, name } : v) })} /></div>
            {isEditMode && <button className={buttonClass} onClick={() => change(node.id, { members: node.members.filter((_, j) => i !== j) })} aria-label={`${m.name || '구성원'} 삭제`}>구성원 삭제</button>}
          </div>)}
        </div>}
        {isEditMode && <div className="space-y-2 border-t border-emerald-200 p-2">
          <div className="flex flex-wrap justify-center gap-1">
            <button className={buttonClass} onClick={() => change(node.id, { members: [...node.members, { role: '직책', name: '이름' }] })}>+ 구성원</button>
            <button className={buttonClass} onClick={() => add(node.id)}>+ 하위 조직</button>
          </div>
          {node.parentId && <>
            <label className="block text-xs">상위 조직<select className="mt-1 w-full rounded border p-1" value={node.parentId} onChange={e => change(node.id, { parentId: e.target.value })}>{nodes.filter(n => !blocked.has(n.id)).map(n => <option key={n.id} value={n.id}>{n.title}</option>)}</select></label>
            <label className="block text-xs">배치<select className="mt-1 w-full rounded border p-1" value={node.placement} onChange={e => change(node.id, { placement: e.target.value })}><option value="below">하단</option><option value="side">우측 직속</option></select></label>
            <div className="flex justify-center gap-1">
              <button className={buttonClass} disabled={index === 0} onClick={() => move(node, -1)} aria-label={`${node.title} 앞으로 이동`}>←</button>
              <button className={buttonClass} disabled={index === siblings.length - 1} onClick={() => move(node, 1)} aria-label={`${node.title} 뒤로 이동`}>→</button>
              <button className={buttonClass} onClick={() => remove(node)}>조직 삭제</button>
            </div>
          </>}
        </div>}
      </div>
    );
    return <div key={node.id} className="flex w-full min-w-0 flex-col items-center">
      {card}
      {side.length > 0 && <div className="flex w-full items-stretch justify-center">
        <div className="hidden w-1/2 shrink-0 sm:block" />
        <div className="flex w-full min-w-0 flex-col gap-4 border-l-2 border-[#85CFAB] py-6 sm:w-1/2">
          {side.map(child => <div key={child.id} className="flex items-center"><div className="h-0.5 w-10 shrink-0 bg-[#85CFAB]" />{renderNode(child, [...ancestors, node.id])}</div>)}
        </div>
      </div>}
      {below.length > 0 && <>
        <div className="h-8 w-0.5 bg-[#85CFAB]" />
        <div className="grid w-full min-w-0 items-start gap-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 150px), 1fr))' }}>
          {below.map(child => <div key={child.id} className="relative flex min-w-0 flex-col items-center pt-6 before:absolute before:top-0 before:left-0 before:h-0.5 before:w-full before:bg-[#85CFAB]">
            <div className="absolute top-0 h-6 w-0.5 bg-[#85CFAB]" />{renderNode(child, [...ancestors, node.id])}
          </div>)}
        </div>
      </>}
    </div>;
  };
  return <section aria-label="조직 체계도">
    {isEditMode && <p className="mb-6 rounded-xl bg-emerald-50 p-4 text-sm text-emerald-900">부서명·직책·이름을 클릭해 수정하세요. 하위 조직과 구성원을 추가하고, 상위 조직·배치·순서를 변경할 수 있습니다. 완료 후 상단 ‘전체 저장’을 눌러 반영하세요.</p>}
    <div className="w-full min-w-0 pb-4"><div className="w-full min-w-0 py-2">{nodes.filter(n => !n.parentId).map(n => renderNode(n))}</div></div>
  </section>;
}
