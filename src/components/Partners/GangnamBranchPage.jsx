import React from 'react';
export default function GangnamBranchPage() {
  return <main className="bg-stone-50 min-h-screen py-8 sm:py-12"><div className="max-w-5xl mx-auto px-4 sm:px-8 space-y-8">
    <header className="rounded-3xl bg-green-900 text-white p-6 sm:p-10 space-y-4"><p className="text-emerald-200 font-bold">산학·파트너</p><h1 className="text-3xl sm:text-4xl font-black leading-tight">소상공인연합회 강남구지부</h1><p className="text-emerald-50 leading-8">지역 소상공인과 외식산업 전문가를 잇는 교류의 공간</p></header>
    <nav aria-label="파트너 메뉴" className="flex flex-wrap gap-3"><a href="/partners/all" className="rounded-xl border bg-white p-3 text-green-900">협력기업 네트워크</a><a href="/partners/gangnam" aria-current="page" className="rounded-xl bg-green-800 p-3 text-white">소상공인연합회 강남구지부</a></nav>
    <section className="bg-white rounded-3xl border p-6 sm:p-8 space-y-4"><h2 className="text-2xl font-bold">지부 소개</h2><p className="leading-8 text-stone-700">소상공인연합회 강남구지부 관련 소식과 한국외식창업교육원과의 교류·협력 정보를 안내하는 공간입니다. 지부의 공식 소개와 세부 활동 내용은 확인된 자료에 따라 순차적으로 안내합니다.</p></section>
    <section className="bg-white rounded-3xl border p-6 sm:p-8 space-y-4"><h2 className="text-2xl font-bold">활동 소식</h2><p className="text-stone-600 leading-8">등록된 활동 소식이 없습니다. 새로운 교류 및 행사 소식이 준비되면 이곳에서 안내하겠습니다.</p></section>
    <section className="rounded-3xl bg-emerald-50 border p-6 sm:p-8 space-y-4"><h2 className="text-2xl font-bold">교류·협력 문의</h2><p className="leading-8">지부 관련 교류 및 협력 제안은 교육원 온라인 문의로 남겨 주세요.</p><a href="/community/inquiry" className="inline-block bg-green-800 text-white rounded-xl px-5 py-3 font-bold">교육원에 문의하기</a></section>
  </div></main>;
}
