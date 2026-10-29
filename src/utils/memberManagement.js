export function memberManagementRow(member) {
  const identities = member.loginIdentities || [member.id || `${member.provider}:`];
  const methods = [['kakao', '카카오'], ['google', 'Google'], ['email', '이메일']].filter(([provider]) => identities.some(id => id.startsWith(`${provider}:`)) || member.provider === provider).map(([, label]) => label);
  return { ...member,
    loginMethod: methods.length > 1 ? `${methods.join(' · ')} 연결` : methods.length ? (methods[0] === '카카오' ? '카카오 간편 로그인' : methods[0] === '이메일' ? '이메일 인증 로그인' : 'Google 간편 로그인') : '확인 필요',
    registrationStatus: member.registrationComplete ? '가입 완료' : '추가 정보 입력 필요',
    contactStatus: member.phone && member.email ? '연락처 등록' : '연락처 확인 필요',
    accessRole: member.adminRole === 'admin' ? '관리자' : '일반 이용자',
  };
}
