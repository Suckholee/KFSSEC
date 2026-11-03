import React from 'react';
import brochure from '../../data/ceremonyBrochure2026.json';

const program = [
 ['10:00 ~ 10:30', '참석자 등록 · 웰컴드링크 · 사전 네트워킹'],
 ['10:30 ~ 11:10', '국민의례 / 개회사 / 축사 / 환영사'],
 ['11:10 ~ 12:20', '한국외식창업교육원 걸어온 길 발표 / 2026 대한민국 자랑스런 명인·명장 선정자 발표 / 인증서 및 패 수여 · 기념촬영 / 우수회원 상장 전달식 / 명인·명장 단체 기념촬영'],
 ['12:20 ~ 13:10', '축하공연'],
 ['13:10 ~ 13:20', '2026 자랑스런 명인·명장 선정식 폐회 선언'],
 ['13:20 ~', '만찬 및 네트워킹 / 회원 교류 비즈니스 네트워킹'],
];
const awards = [
 ['조리기술 최우수대상', ['주성환 명인', '이하늘 명인', '문동혁 명인', '조범진 주임', '허연웅 명장', '정세군 이사', '김병섭 위원장']],
 ['대한민국 최우수 명인대상', ['김근혜 명인', '성미진 명인', '심용환 명인', '박동명 명인', '홍성열 명인']],
 ['고객만족 최우수 경영대상', ['김스텔라 대표', '천월순 명인', '양윤영 대표']],
 ['대한민국 최우수 교육대상', ['주정자 명장', '권영복 명장', '이진주 명장', '윤병세 명장', '신충섭 교수', '김철우 명인']],
 ['대한민국 최우수 명장대상', ['김태완 명장', '박해금 명장', '장동석 명장']],
 ['대한민국 와인문화발전공로상', ['박정근 명인']],
 ['대한민국 최우수 AI교육대상', ['진익준 교수']],
 ['대한민국 최우수 ESG 경영대상', ['강동원 회장', '김문경 명장', '라연화 명장', '오순 명장', '김현식 명장']],
];
const organizations = ['농림축산식품부', '중소벤처기업부', '사)한국식음료외식조리교육협회', '사)한국외식경영학회', '글로벌 외식정보', '시사코리아뉴스', '캐롤라인대학교'];
const sponsors = ['㈜비엠에스인터내셔널', '㈜자인', '㈜황태회관', '㈜주방뱅크', '㈜다이닝에프앤다이닝 상해루', '㈜김태완스시', '㈜라온오가닉', '㈜이학갈비', '㈜달 K-Food', '㈜보리골푸드', '㈜구끼구끼', '㈜J-Company', 'VEN60', '진도울돌목가는길', '㈜고선생에프엔씨', '백년짬뽕', '마들식품', '종화네돌솥추어탕', '강화도 장곳횟집', '해리돼지국밥'];
const pageTitles = ['표지', '개회사', '축사', '축하 및 환영사', '행사 순서', '축하공연', '선정자', '부문별 시상', '후원', '회원 참석 안내', '행사장 안내', '주차 및 유의사항', '교육원 안내'];
const sections = [['greetings','개회사·축사'],['program','행사 순서·공연'],['awards','부문별 수상자'],['sponsors','후원'],['venue','당시 참석 안내'],['original','브로슈어 13쪽 원문']];
function Section({id,title,children}) {
 return <section id={`brochure-${id}`} className="scroll-mt-28 bg-white border border-stone-200 rounded-3xl p-5 sm:p-8 space-y-6"><h2 className="text-2xl font-black text-green-950">{title}</h2>{children}</section>;
}
export default function CeremonyBrochure2026() {
 return <div className="space-y-8">
  <nav aria-label="브로슈어 내용 바로가기" className="rounded-2xl bg-green-50 border border-green-200 p-4 flex flex-wrap gap-2">{sections.map(([id,label])=><a key={id} href={`#brochure-${id}`} className="bg-white border rounded-lg px-3 py-2 text-sm font-bold text-green-900">{label}</a>)}</nav>
  <Section id="greetings" title="개회사 · 축사 · 환영사">
   {brochure.speeches.map(speech=><details key={speech.page} className="rounded-2xl border p-5" open={speech.page===2}><summary className="cursor-pointer text-lg font-bold text-green-900">{speech.title} · {speech.speaker}</summary><div className="mt-5 space-y-4 text-stone-700 leading-8">{speech.paragraphs.map((p,i)=><p key={i}>{p}</p>)}</div></details>)}
  </Section>
  <Section id="program" title="행사 순서 · 축하공연">
   <p className="leading-8">사회: 손윤진 아나운서 · 2026년 10월 19일 · 더샵갤러리 4F</p>
   <dl className="divide-y border rounded-2xl overflow-hidden">{program.map(([time,text])=><div key={time} className="grid sm:grid-cols-[160px_1fr]"><dt className="bg-green-900 text-white p-4 font-bold">{time}</dt><dd className="p-4 leading-8">{text}</dd></div>)}</dl>
   <div className="rounded-2xl bg-amber-50 p-5 space-y-3"><h3 className="text-lg font-bold">축하공연 · 12:20 ~ 13:10</h3><ul className="grid sm:grid-cols-3 gap-3">{['소프라노 손정윤', '테너 이상호', '소프라노 김희정'].map(name=><li key={name} className="bg-white rounded-xl p-4 font-bold">{name}</li>)}</ul></div>
   <p className="leading-8 text-stone-700">교류 프로그램: 프리미엄 와인 & 핑거푸드, 명인·명장 축하 및 자유 담소, 회원·초청 인사 네트워킹. 위 순서는 당시 브로슈어에 기재된 행사 계획입니다.</p>
  </Section>
  <Section id="awards" title="부문별 수상자">
   <p className="text-stone-600 leading-8">브로슈어 8쪽 ‘시상’에 기재된 명단입니다. 앞의 ‘2026 선정자’ 명단과 별도로 구분합니다.</p>
   <div className="grid md:grid-cols-2 gap-4">{awards.map(([title,names])=><article key={title} className="border rounded-2xl p-5 space-y-4"><h3 className="font-bold text-green-900">{title}</h3><ul className="flex flex-wrap gap-2">{names.map(name=><li key={name} className="rounded-lg bg-stone-50 px-3 py-2 text-sm">{name}</li>)}</ul></article>)}</div>
  </Section>
  <Section id="sponsors" title="후원 기관 · 단체 · 기업">
   <p className="leading-8 text-stone-600">2026 선정식 브로슈어에 기재된 후원 명단입니다. 행사 후원과 명인·명장 선정·인증의 주체는 구분됩니다.</p>
   <h3 className="text-lg font-bold">후원 기관·단체</h3><ul className="grid sm:grid-cols-2 gap-3">{organizations.map(name=><li key={name} className="border rounded-xl p-4">{name}</li>)}</ul>
   <h3 className="text-lg font-bold">후원 기업</h3><ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">{sponsors.map(name=><li key={name} className="bg-stone-50 rounded-xl p-4">{name}</li>)}</ul>
  </Section>
  <Section id="venue" title="당시 회원 참석 · 행사장 안내">
   <p className="rounded-xl bg-amber-50 border border-amber-200 p-4 leading-8">아래는 2026년 10월 19일 행사 당시 안내의 기록입니다. 현재의 행사 일정, 교통·주차 조건 또는 이용 요금 안내가 아닙니다.</p>
   <details className="border rounded-2xl p-5"><summary className="font-bold cursor-pointer">회원 참석 안내문 전문 · 사무국 조범진 주임</summary><div className="mt-4 space-y-4 leading-8">{brochure.memberNotice.map((p,i)=><p key={i}>{p}</p>)}</div></details>
   <div className="grid md:grid-cols-2 gap-6 leading-8">
    <article className="space-y-3"><h3 className="text-lg font-bold text-green-900">장소 · 복장</h3><p>포스코이앤씨 더샵갤러리 4층 강당 및 공용홀<br/>서울특별시 강남구 자곡로 210<br/>2026년 10월 19일(월) 10:00 ~ 15:00</p><p>정장 착용, 명인·명장 조리복 지참. 조리복은 기념사진 촬영 시 착용하도록 안내했습니다.</p></article>
    <article className="space-y-3"><h3 className="text-lg font-bold text-green-900">대중교통</h3><p>3호선 수서역 6번 출구 → 강남03·강남06 / 4425·3416·2412 / 361번 버스 환승</p><p>8호선 장지역 2번 출구 → 440번 버스 환승</p></article>
    <article className="space-y-3"><h3 className="text-lg font-bold text-green-900">당시 주차 안내</h3><p>더샵갤러리 내부 공사로 행사장 주차 불가. 인근 주차장을 이용하도록 안내했습니다.</p><p>방죽소 공원: 서울 강남구 율현동 353 · 당시 무료 안내 · 도보 약 4분</p><p>밤고개로21길 공영주차장: 서울 강남구 밤고개로21길 71 · 유료 · 도보 약 15분</p><p>주차 요금 개인 부담, 가급적 대중교통 이용 권장.</p></article>
    <article className="space-y-3"><h3 className="text-lg font-bold text-green-900">유의사항 · 문의</h3><p>건물 내 금연. 참석 회원 간 존중과 배려, 명인·명장으로서의 품격과 자긍심을 당부했습니다.</p><p>브로슈어 당시 행사 문의: 조범진 주임 · 010-3836-3587</p><h3 className="font-bold text-green-900">교육원 안내 · 뒤표지</h3><p>사단법인 한국외식창업교육원<br/>서울특별시 강남구 영동대로 602, 6층<br/>미래를 선도하는 외식산업의 동반자</p></article>
   </div>
  </Section>
  <Section id="original" title="브로슈어 전체 보기 · 13쪽">
   <p className="leading-8 text-stone-600">모든 쪽의 원본 이미지를 확인할 수 있습니다. 이미지를 누르면 크게 볼 수 있으며, PDF로도 내려받을 수 있습니다.</p>
   <a href="/documents/kfssec-2026-master-ceremony.pdf" download className="inline-block rounded-xl bg-green-800 text-white px-5 py-3 font-bold">브로슈어 전체 PDF 다운로드</a>
   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">{pageTitles.map((title,i)=><figure key={title} className="space-y-3"><a href={`/images/master-selection/brochure/page-${String(i+1).padStart(2,'0')}.jpg`} target="_blank" rel="noreferrer" aria-label={`${i+1}쪽 ${title} 원본 크게 보기`}><img src={`/images/master-selection/brochure/page-${String(i+1).padStart(2,'0')}.jpg`} alt={`브로슈어 ${i+1}쪽 · ${title}`} width="894" height="1263" loading="lazy" className="w-full border rounded-xl shadow-sm"/></a><figcaption className="text-sm font-bold text-green-900">{i+1}쪽 · {title}</figcaption></figure>)}</div>
  </Section>
 </div>;
}
