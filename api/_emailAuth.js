export function emailIdentity(value) {
  if (typeof value !== 'string') throw new Error('이메일 주소를 입력해 주세요.');
  const email = value.trim().toLowerCase();
  if (email.length > 254 || !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email)) throw new Error('올바른 이메일 주소를 입력해 주세요.');
  return email;
}
export async function emailAuth(path, body, token) {
  const url = process.env.SUPABASE_URL, key = process.env.SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error('이메일 인증 서버 설정이 필요합니다.');
  const response = await fetch(`${url.replace(/\/$/, '')}/auth/v1/${path}`, {
    method: body ? 'POST' : 'GET', headers: { apikey: key, ...(token ? { Authorization: `Bearer ${token}` } : {}), 'Content-Type': 'application/json' },
    ...(body ? { body: JSON.stringify(body) } : {}), signal: AbortSignal.timeout(12000),
  });
  const result = await response.json();
  if (!response.ok) throw new Error(response.status === 429 ? '요청이 많습니다. 잠시 후 다시 시도해 주세요.' : '이메일 인증을 완료하지 못했습니다. 주소와 인증코드·유효시간을 확인해 주세요.');
  return result;
}
