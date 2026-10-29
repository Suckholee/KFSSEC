export function memberManagementRow(member) {
  return { ...member,
    loginMethod: member.provider === 'kakao' ? '카카오 간편 로그인' : member.provider ? String(member.provider) : '확인 필요',
    registrationStatus: member.registrationComplete ? '가입 완료' : '추가 정보 입력 필요',
    contactStatus: member.phone && member.email ? '연락처 등록' : '연락처 확인 필요',
    accessRole: member.adminRole === 'admin' ? '관리자' : '일반 이용자',
  };
}
