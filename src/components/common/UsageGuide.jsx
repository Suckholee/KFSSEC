import React from 'react';
import { useAdminEdit } from '../../context/AdminEditContext';
export default function UsageGuide() {
  const { isAdmin } = useAdminEdit();
  const sections = [
    ['회원가입과 로그인', '상단 로그인·회원가입에서 카카오 계정으로 로그인한 뒤 필요한 회원 정보를 입력해 가입을 완료하세요.'],
    ['창업 상담 신청', '로그인 후 창업컨설팅에서 상담 신청을 선택하세요. 희망 분야와 매장 현황, 예산 및 문의 내용을 입력하면 교육원 사무국에서 확인합니다.'],
    ['질문과 답변 확인', '커뮤니티의 1:1 온라인 문의에서 질문을 작성하고 답변을 확인할 수 있습니다. 연락처 등 개인정보는 공개 본문에 적지 마세요.'],
    ['교육·자격 과정 확인', '교육·자격증에서 과정별 교육 내용과 일정, 자격 안내를 확인하세요. 신청 전 해당 과정의 상세 안내를 확인해 주세요.'],
    ['사진과 행사 소식', '현장 갤러리에서 선정식·요리대회·교육 현장 사진을 확인할 수 있습니다. 공지 배너를 누르면 연결된 안내로 이동합니다.'],
  ];
  if (isAdmin) sections.push(
    ['프로필 추가와 수정', '교육원 소개 → 교수진 소개는 임원·고문 목록, 창업컨설팅 → 교수 프로필은 컨설팅 전문가 목록입니다. 각 화면의 추가 버튼으로 등록하고 사진을 클릭해 교체하세요. 학력·경력은 한 줄에 한 항목씩 입력합니다.'],
    ['조직도 관리', '교육원 소개 → 조직도에서 부서와 구성원을 추가·수정하세요. 상위 조직과 배치, 순서를 변경할 수 있습니다.'],
    ['편집 저장과 취소', '화면에서 수정한 내용은 상단 전체 저장을 눌러야 홈페이지에 반영됩니다. 저장 전 변경 취소로 이전 내용으로 되돌릴 수 있습니다.'],
    ['관리자 계정 지정', '관리자 로그인 후 회원 관리에서 가입된 사람의 계정을 확인하고 관리자 지정을 선택하세요. 일반회원·정회원 구분과 관리자 권한은 별개입니다.'],
  );
  return <main className="mx-auto max-w-4xl space-y-6 px-5 py-12"><h1 className="text-3xl font-black text-emerald-950">홈페이지 이용 안내</h1><p className="text-stone-600">회원가입부터 상담 신청, 홈페이지 관리까지 안내해 드립니다.</p>{sections.map(([title,body])=><section key={title} className="rounded-xl border bg-white p-6"><h2 className="text-lg font-bold text-emerald-900">{title}</h2><p className="mt-3 text-sm leading-7 text-stone-700">{body}</p></section>)}<a href="/" className="inline-block text-emerald-800 underline">홈으로 돌아가기</a></main>;
}
