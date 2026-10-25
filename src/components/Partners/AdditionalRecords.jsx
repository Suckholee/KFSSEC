import React from 'react';
import { Award, Handshake } from 'lucide-react';
import { useAdminEdit } from '../../context/AdminEditContext';
import EditableText from '../Admin/InlineEditor/EditableText';
import EditableImage from '../Admin/InlineEditor/EditableImage';
const defaults = [
  { id: 'sangdo-mou', type: '업무협약', title: '상도생활권추진위원회 업무협약(MOU)', description: '한국외식창업교육원과 상도생활권추진위원회의 업무협약 기록입니다.', image: '' },
  { id: 'taipei-appreciation-2024', type: '감사장', title: '2024 세계요리왕 타이베이대회 · 타이베이시 정부 감사장', description: '타이베이시 정부에서 한국외식창업교육원에 전달한 감사장입니다.', image: '' },
];
export default function AdditionalRecords() {
 const { siteDraft, isEditMode, updateSiteField } = useAdminEdit();
 const records = siteDraft.additionalInstitutionRecords ?? defaults;
 const change = (index, key, value) => updateSiteField('additionalInstitutionRecords', records.map((record,i) => i === index ? {...record,[key]:value} : record));
 return <section className="space-y-4" aria-label="추가 협약 및 감사장 기록"><h2 className="text-xl font-black text-emerald-950">추가 협약 및 감사장 기록</h2><div className="grid gap-4 sm:grid-cols-2">{records.map((record,index)=>{const Icon=record.type==='감사장'?Award:Handshake;return <article key={record.id} className="space-y-3 rounded-2xl border bg-white p-6"><Icon className="h-7 w-7 text-emerald-700"/><p className="text-xs font-bold text-emerald-700">{record.type}</p><h3 className="text-lg font-bold"><EditableText value={record.title} onChange={value=>change(index,'title',value)}/></h3><p className="text-sm leading-6 text-stone-600"><EditableText multiline value={record.description} onChange={value=>change(index,'description',value)}/></p>{(record.image || isEditMode) && <EditableImage src={record.image} alt={record.title} onChange={value=>change(index,'image',value)} className="aspect-[4/3] overflow-hidden rounded-xl bg-stone-100" imageClassName="h-full w-full object-contain"/>}</article>;})}</div></section>;
}
