import SelectionPoster from './SelectionPoster';
import CeremonyBrochure2026 from './CeremonyBrochure2026';
import React from 'react';
import { MASTER_SELECTION_NOTICE, MASTER_SELECTION_FAQS, MASTER_SELECTION_CRITERIA, CEREMONY_2026_HONOREES } from '../../data/masterSelection';

export default function MasterSelectionPage({ tab = 'selection' }) {
  return <div className="bg-[#FAF8F5] min-h-screen py-8 sm:py-12 text-stone-900">
    <div className="max-w-6xl mx-auto px-4 sm:px-8 space-y-8">
      <header className="bg-[#14532D] text-white rounded-3xl p-6 sm:p-10 space-y-4">
        <p className="text-amber-200 text-sm font-bold">KFSSEC · 대한민국 외식 명인·명장</p>
        <h1 className="text-3xl sm:text-4xl font-black">{tab === 'faq' ? '명인·명장 FAQ' : tab === 'ceremony' ? '2026 명인·명장 선정식' : '명인·명장 선정 제도 안내'}</h1>
        <p className="leading-relaxed text-emerald-50">전문성을 인정받고, 기술을 계승하며, 대한민국 외식산업의 미래를 이끄는 전문인의 영예</p>
      </header>
      <nav aria-label="명인·명장 안내" className="flex flex-wrap gap-2">
        {[['selection','선정 제도 안내'],['faq','자주 묻는 질문'],['ceremony','2026 선정식'],['all','명장·명인 전체']].map(([id,label]) => <a key={id} href={`/master/${id}`} aria-current={tab === id ? 'page' : undefined} className={`px-4 py-3 rounded-xl border font-bold ${tab === id ? 'bg-green-800 text-white' : 'bg-white text-green-900'}`}>{label}</a>)}
      </nav>
      <aside className="bg-amber-50 border border-amber-200 p-5 rounded-2xl leading-relaxed">{MASTER_SELECTION_NOTICE}</aside>
      {tab === 'selection' && <SelectionPoster name="honor-banner" title="대한민국 외식산업을 대표하는 전문인의 영예" width={1536} height={1024} wide />}
      {tab === 'faq' && <SelectionPoster name="faq-institution" title="한국외식창업교육원은 어떤 기관인가요?" width={1086} height={1448} />}
      {tab === 'faq' ? <section aria-label="자주 묻는 질문" className="space-y-3">{MASTER_SELECTION_FAQS.map(([question,answer],i) => <details key={question} className="bg-white border border-stone-200 rounded-2xl p-5"><summary className="cursor-pointer font-bold leading-relaxed">Q{i+1}. {question}</summary><p className="mt-4 leading-8 text-stone-700">{answer}</p></details>)}</section> : tab === 'ceremony' ? <>
        <section className="bg-white border rounded-3xl p-6 sm:p-8 space-y-5">
          <span className="inline-block bg-stone-100 px-3 py-1 rounded-full text-sm">지난 행사 · 2026.10.19</span>
          <h2 className="text-2xl font-black">제5회 2026 대한민국 자랑스런 명인·명장 선정식</h2>
          <p className="leading-8">일시: 2026년 10월 19일(월) 오전 10시<br/>장소: 더샵갤러리 4F<br/>주최: 사단법인 한국외식창업교육원</p>
          <p className="leading-8">명인·명장 선정과 인증서 및 패 수여, 우수회원 시상, 기념촬영, 축하공연 및 회원 교류를 위한 행사 자료입니다. 아래 선정자 명단은 브로슈어의 ‘선정자’ 항목을 기준으로 하며, 별도 시상 부문의 수상자와 구분됩니다.</p>
          <a href="/documents/kfssec-2026-master-ceremony.pdf" download className="inline-block rounded-xl bg-green-800 text-white px-5 py-3 font-bold">공식 브로슈어 PDF 다운로드</a>
          <a href="/gallery/ceremony" className="inline-block ml-4 text-green-800 underline">시상식 갤러리 보기</a>
        </section>
        <section className="bg-white border rounded-3xl p-6 sm:p-8 space-y-6"><h2 className="text-2xl font-black">2026 선정자</h2>{Object.entries(CEREMONY_2026_HONOREES).map(([group,names]) => <div key={group}><h3 className="font-bold text-green-900 mb-3">{group}</h3><ul className="grid grid-cols-2 sm:grid-cols-3 gap-3">{names.map(name => <li key={name} className="border rounded-xl p-4 text-center">{name}</li>)}</ul></div>)}</section>
        <CeremonyBrochure2026 />
      </> : <>
        <section className="bg-white border rounded-3xl p-6 sm:p-8 space-y-4"><h2 className="text-2xl font-black">대한민국 외식산업의 가치를 높이는 전문인 발굴</h2><p className="leading-8">한국외식창업교육원의 대한민국 외식 명인·명장 제도는 외식산업 각 분야에서 오랜 세월 축적한 전문기술과 경험, 경영 노하우 및 산업 발전에 기여한 전문가를 발굴하고 그 가치를 널리 알리기 위한 독자적인 전문 선정 제도입니다.</p><h3 className="text-xl font-bold pt-3">정부 지정 제도와의 차이</h3><div className="overflow-x-auto"><table className="w-full text-left leading-7"><thead><tr className="border-b"><th className="p-3">구분</th><th className="p-3">운영 주체와 평가 영역</th></tr></thead><tbody><tr className="border-b"><th className="p-3">대한민국식품명인</th><td className="p-3">농림축산식품부 정부 지정 제도 · 전통식품의 제조·가공 및 계승·발전 분야</td></tr><tr><th className="p-3">교육원 명인·명장</th><td className="p-3">한국외식창업교육원 민간 선정 제도 · 조리기술, 제과제빵, 식음료, 외식경영, 식문화, 전문교육 등</td></tr></tbody></table></div></section>
        <SelectionPoster name="selection-values" title="명인·명장 선정 제도의 취지와 가치" />
        <section className="space-y-4"><h2 className="text-2xl font-black">선정 기준</h2><p className="leading-8">단순한 경력이나 활동 기간만으로 선정하지 않습니다. 교육원이 정한 신청 자격과 심사 기준에 따라 제출 자료와 전문성, 주요 활동 및 성과를 종합적으로 평가합니다. 세부 자격과 구분은 해당 연도의 운영 규정에 따릅니다.</p><div className="grid sm:grid-cols-2 gap-4">{MASTER_SELECTION_CRITERIA.map(([title,desc]) => <article key={title} className="bg-white border rounded-2xl p-5"><h3 className="font-bold text-green-900">{title}</h3><p className="mt-2 leading-7">{desc}</p></article>)}</div></section>
        <section className="bg-white border rounded-3xl p-6 sm:p-8 space-y-6"><h2 className="text-2xl font-black">선정 절차</h2><ol className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">{[['서류심사','경력, 전문성, 활동 실적 및 주요 성과 검토'],['전문성 평가','기술력, 실무 역량 및 차별화된 경쟁력 검토'],['심사위원 평가','분야별 전문성과 산업 기여도 종합 심사'],['최종 선정','심사 결과를 바탕으로 선정 여부 결정'],['인증 및 기록','선정 결과와 발급 내역을 공식적으로 관리']].map(([title,description],i)=><li key={title} className="rounded-xl bg-green-50 p-4 space-y-2"><p className="text-sm font-bold text-green-700">{i+1}단계</p><h3 className="font-bold">{title}</h3><p className="text-sm leading-7 text-stone-600">{description}</p></li>)}</ol><SelectionPoster name="selection-process" title="명인·명장 선정 기준·절차 공식 안내" /></section>
        <section className="bg-white border rounded-3xl p-6 sm:p-8 space-y-4"><h2 className="text-2xl font-black">선정 이후의 책임과 가치</h2><p className="leading-8">공정하고 투명한 심사, 분야별 전문성을 고려한 평가, 선정 결과와 인증 내역의 체계적인 관리를 지향합니다. 명인·명장은 전문성과 윤리성을 유지하며 기술 전수와 후진 양성, 외식산업 발전 및 K-FOOD 세계화에 기여합니다.</p><p className="font-bold text-green-900 leading-8">명예는 선정으로 시작되지만, 진정한 가치는 전문성과 실천으로 완성됩니다.</p><a href="/community/inquiry" className="inline-block bg-green-800 text-white rounded-xl px-5 py-3 font-bold">선정 제도 문의</a></section>
      </>}
    </div>
  </div>;
}
