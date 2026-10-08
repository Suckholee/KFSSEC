import { useLanguage } from '../../i18n/LanguageContext';
import React, { useState } from 'react';
import { ArrowRight, Award, CheckCircle2 } from 'lucide-react';
import { qualificationCatalog, specialistQualifications } from '../../data/qualifications';
import { useAdminEdit } from '../../context/AdminEditContext';
import EditableImage from '../Admin/InlineEditor/EditableImage';
import EditableText from '../Admin/InlineEditor/EditableText';

export function QualificationHighlights({ onExplore }) {
  const { tr, language } = useLanguage();
  return <section className="bg-[#FAF8F5] py-14 px-6 sm:px-10 border-b border-[#E7E2D8]"><div className="max-w-7xl mx-auto"><p className="text-[#15803D] font-bold text-sm">{tr("한국외식창업교육원 자격과정")}</p><div className="flex flex-wrap justify-between items-end gap-4 mb-7"><h2 className="text-2xl sm:text-3xl font-black mt-2 text-gray-900">{tr("창업의 시작부터, 전문 역량까지")}</h2><button onClick={onExplore} className="flex items-center gap-2 text-sm font-bold text-[#15803D] hover:text-[#EA580C] transition-colors">{tr("자격과정 전체 보기 ")}<ArrowRight size={18}/></button></div><div className="grid md:grid-cols-3 gap-5">{qualificationCatalog.map(q=><button key={q.id} onClick={onExplore} className="text-left bg-white rounded-2xl border border-stone-200 overflow-hidden hover:shadow-lg hover:border-[#16A34A]/50 transition-all"><img src={q.image} alt={tr`${q.name} 과정 소개`} className="block w-full h-auto object-contain"/><div className="p-5"><p className="text-xs text-[#15803D] font-bold">{tr(q.levelLabel)}</p><h3 className="font-black text-xl mt-2 text-gray-900">{tr(q.name)}</h3><p className="mt-3 text-sm text-gray-600 leading-relaxed">{tr(q.description)}</p></div></button>)}</div></div></section>;
}

export default function QualificationGuide({ initialSelected = 'advisor', onGoToConsulting }) {
  const { tr, language } = useLanguage();
  const { siteDraft, updateSiteDraft } = useAdminEdit();
  const [selected, setSelected] = useState(initialSelected);
  const q = qualificationCatalog.find(item => item.id === selected) || qualificationCatalog[0];
  return <div className="space-y-9 text-gray-900">
    <header className="rounded-2xl bg-gradient-to-r from-[#14532D] via-[#15803D] to-[#16A34A] text-white px-6 py-10 sm:p-10 shadow-md border border-[#16A34A]/30"><p className="text-orange-300 font-black tracking-wider text-xs uppercase">{tr("자격과정 안내")}</p><h1 className="text-3xl sm:text-4xl font-black mt-3 leading-tight">{tr("배움에서 자격으로,")}<br/>{tr("외식 분야의 전문성을 키우세요.")}</h1><p className="mt-5 text-emerald-50 leading-relaxed text-sm sm:text-base">{tr("외식창업·한국음식부터 명인 인증과 푸드테크까지")}<br className="hidden sm:block"/>{tr(" 한국외식창업교육원의 분야별 자격과정을 소개합니다.")}</p></header>
    <div className="flex flex-wrap gap-2" role="tablist" aria-label={tr("자격과정 선택")}>{qualificationCatalog.map(item=><button key={item.id} id={`tab-${item.id}`} role="tab" aria-selected={selected===item.id} aria-controls="qualification-panel" onClick={()=>setSelected(item.id)} onKeyDown={e=>{ const keys=['ArrowLeft','ArrowRight','Home','End']; if(!keys.includes(e.key))return; e.preventDefault(); const current=qualificationCatalog.findIndex(q=>q.id===selected); const next=e.key==='Home'?0:e.key==='End'?qualificationCatalog.length-1:(current+(e.key==='ArrowRight'?1:qualificationCatalog.length-1))%qualificationCatalog.length; setSelected(qualificationCatalog[next].id); document.getElementById(`tab-${qualificationCatalog[next].id}`)?.focus(); }} className={`rounded-full px-5 py-3 font-bold text-sm border transition-all ${selected===item.id?'bg-gradient-to-r from-[#14532D] to-[#15803D] text-white border-[#16A34A] shadow-sm':'bg-white border-stone-200 text-stone-700 hover:bg-[#F0FDF4]'}`}>{tr(item.name)}{` ${tr(item.levelLabel)}`}</button>)}</div>
    <section id="qualification-panel" role="tabpanel" aria-labelledby={`tab-${q.id}`} className="space-y-7">
      <div className="grid xl:grid-cols-[1fr_1.2fr] gap-7">
        <EditableImage
          src={siteDraft?.qualifications?.[q.id]?.poster || q.image}
          alt={tr`${q.name} 2급 과정 소개 포스터`}
          onChange={(newUrl) => {
            updateSiteDraft(prev => ({
              ...prev,
              qualifications: {
                ...(prev?.qualifications || {}),
                [q.id]: {
                  ...(prev?.qualifications?.[q.id] || {}),
                  poster: newUrl
                }
              }
            }));
          }}
          className="w-full rounded-2xl overflow-hidden self-start shadow-md border border-[#D0E7DA]"
          imageClassName="w-full h-auto object-cover rounded-2xl block"
        />
        <div className="bg-white p-5 sm:p-7 rounded-2xl border border-stone-200 shadow-xs">
          <p className="text-sm font-black text-[#15803D] bg-[#F0FDF4] border border-[#DCFCE7] inline-block px-3 py-1 rounded-full">{tr(q.levelLabel)}</p>
          <h2 className="text-2xl font-black mt-3 text-gray-900">
            <EditableText
              path={`qualifications.${q.id}.name`}
              value={siteDraft?.qualifications?.[q.id]?.name || `${tr(q.name)} ${tr(q.levelLabel)}`}
            />
          </h2>
          <p className="leading-relaxed text-gray-600 mt-4">
            <EditableText
              path={`qualifications.${q.id}.description`}
              multiline
              value={siteDraft?.qualifications?.[q.id]?.description || tr(q.description)}
            />
          </p>
          <dl className="mt-6 divide-y divide-[#EAF2EC]">{[...(q.registration ? [['민간자격 등록번호',q.registration]] : []),...(q.professor ? [['담당 교수',tr`${q.professor} 교수`]] : []),['교육·발급 기관','한국외식창업교육원'],['주무부처','농림축산식품부']].map(([title,value])=><div key={title} className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] gap-3 py-3 text-sm"><dt className="text-gray-500">{tr(title)}</dt><dd className="font-bold break-words">{tr(value)}</dd></div>)}</dl><p className="text-xs sm:text-sm text-[#15803D] font-bold mt-4 leading-relaxed bg-[#F0FDF4] p-3.5 rounded-xl border border-[#DCFCE7]">{tr("수강 신청 방법 및 자격증 발급 절차는 1:1 맞춤 상담을 통해 친절히 안내해 드립니다.")}</p><div className="flex flex-col sm:flex-row gap-2.5 mt-4">{onGoToConsulting && <button onClick={onGoToConsulting} className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#EA580C] to-[#F97316] hover:from-[#C2410C] hover:to-[#EA580C] text-white rounded-xl p-3.5 font-black transition-all shadow-md text-sm border border-orange-300/40"><span>{tr("⚡ 1:1 온라인 문의 신청")}</span></button>}</div></div></div>
      <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-xs"><h3 className="text-xl font-black text-gray-900">{tr("등급별 직무와 검정 내용")}</h3><ul className="mt-4 space-y-3 text-sm leading-relaxed">{(q.details || q.grades).map(g=><li key={g}>{tr(g)}</li>)}</ul>{q.assessment && <p className="mt-4 pt-4 border-t border-stone-100 text-sm leading-relaxed"><strong>{tr("검정 내용")}</strong> · {tr(q.assessment)}</p>}</div>
      {q.reviews.length > 0 && <div><h3 className="text-xl font-black mb-4 text-gray-900">{tr("수강생 후기")}</h3><div className="grid lg:grid-cols-3 gap-4">{q.reviews.map((review,i)=><figure key={review} className="bg-[#FAF8F5] rounded-2xl p-6 border border-stone-200"><figcaption className="text-sm text-[#15803D] font-bold mb-4">{tr("수강생 ")}{tr(['김','박','최'][i])}{tr("**님")}</figcaption><blockquote className="font-bold leading-relaxed text-gray-800">“{tr(review)}”</blockquote></figure>)}</div></div>}
    </section>
    <section><h2 className="text-2xl font-black mb-5 text-gray-900">{tr("분야별 전문 자격")}</h2><div className="space-y-3">{specialistQualifications.map(item=><details key={item.name} className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs"><summary className="font-bold text-lg cursor-pointer text-gray-900">{tr(item.name)}</summary><p className="mt-4 text-gray-600 leading-relaxed">{tr(item.description)}</p><ul className="mt-4 space-y-2 text-sm leading-relaxed">{item.details.map(t=><li key={t} className="flex gap-2"><CheckCircle2 size={17} className="shrink-0 mt-1 text-[#15803D]"/>{tr(t)}</li>)}</ul></details>)}</div></section>
    <section className="bg-[#FAF8F5] border border-stone-200 rounded-2xl p-6 sm:p-8"><Award className="text-[#F97316] mb-3" size={32}/><h2 className="text-2xl font-black text-gray-900">{tr("자격증 발급 안내")}</h2><p className="mt-4 leading-relaxed text-gray-600">{tr("과정 이수 및 검정을 거쳐 상장형과 카드형 자격증을 발급합니다. 발급번호가 부여되며, 발급 절차와 비용은 교육원 상담을 통해 안내받으실 수 있습니다.")}</p><div className="grid sm:grid-cols-2 gap-4 mt-5">{['상장형 · 보관용 자격증','카드형 · 휴대용 자격증'].map(t=><div key={t} className="bg-white border border-stone-200 rounded-xl p-5 font-bold text-gray-800 shadow-xs">{tr(t)}</div>)}</div></section>
    <section><h2 className="text-2xl font-black mb-5 text-gray-900">{tr("자주 묻는 질문")}</h2>{[['누가 지원할 수 있나요?','온라인 2급 과정은 만 17세 이상 지원 가능합니다. 전문 자격은 과정별 응시 요건을 확인해 주세요.'],['수강 기간은 얼마나 되나요?','온라인 2급 과정의 수강 기간은 4주 이내입니다. 학습 일정은 개인별로 달라질 수 있습니다.'],['어떻게 자격을 취득하나요?','교육원에서 과정과 응시 요건을 확인한 후 수강 및 검정 절차를 진행합니다. 출석 기준과 발급 비용은 신청 전 상담해 주세요.']].map(([title,answer])=><details key={title} className="border-b border-stone-200 py-5"><summary className="font-bold cursor-pointer text-gray-900">{tr(title)}</summary><p className="mt-4 text-gray-600 leading-relaxed">{tr(answer)}</p></details>)}</section>
  </div>;
}
