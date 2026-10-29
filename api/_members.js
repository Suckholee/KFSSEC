import crypto from 'node:crypto';

function encryptionKey() {
  if (!process.env.MEMBER_SESSION_SECRET) throw new Error('Member encryption key is missing');
  return crypto.createHash('sha256').update(process.env.MEMBER_SESSION_SECRET).digest();
}
function encode(member) {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', encryptionKey(), iv);
  const data = Buffer.concat([cipher.update(JSON.stringify(member)), cipher.final()]);
  return { encrypted: Buffer.concat([iv, cipher.getAuthTag(), data]).toString('base64') };
}
function decode(value) {
  const bytes = Buffer.from(value.encrypted, 'base64');
  const cipher = crypto.createDecipheriv('aes-256-gcm', encryptionKey(), bytes.subarray(0, 12));
  cipher.setAuthTag(bytes.subarray(12, 28));
  return JSON.parse(Buffer.concat([cipher.update(bytes.subarray(28)), cipher.final()]).toString());
}

// Private, encrypted member objects; each account has its own record.
async function request(route, options = {}, allowMissing = false) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error('Member database is not configured');
  const response = await fetch(`${url.replace(/\/$/, '')}/storage/v1/${route}`, {
    ...options, headers: { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json', ...options.headers },
  });
  if (allowMissing && (response.status === 404 || response.status === 400)) {
    const error = await response.json();
    if (String(error.statusCode) === '404' || error.error === 'not_found') return null;
    throw new Error('Member read failed');
  }
  if (!response.ok) { const body = await response.json().catch(() => ({})); const error = new Error('회원 정보를 처리하지 못했습니다. 다시 시도해 주세요.'); if (response.status === 409 || body.error === 'Duplicate' || String(body.statusCode) === '409') error.code = 'CONFLICT'; throw error; }
  return response;
}
function filename(id) { return crypto.createHash('sha256').update(id).digest('hex') + '.json'; }
async function rawMember(id) {
  const response = await request(`object/members/${filename(id)}`, {}, true);
  return response ? decode(await response.json()) : null;
}
export async function getMember(id) {
  const seen = new Set();
  for (let i = 0; i < 20; i++) {
    if (seen.has(id)) throw new Error('회원 연결 상태를 확인해 주세요.');
    seen.add(id);
    const member = await rawMember(id);
    if (!member?.mergedInto) return member;
    id = member.mergedInto;
  }
  throw new Error('회원 연결 상태를 확인해 주세요.');
}
async function writeMember(member) {
  await request(`object/members/${filename(member.id)}`, { method: 'POST', headers: { 'x-upsert': 'true' }, body: JSON.stringify(encode(member)) });
}
async function locked(ids, task) {
  const acquired = [];
  try {
    for (const id of [...new Set(ids)].sort()) {
      const route = `object/members/lock-${filename(id)}`;
      try { await request(route, { method: 'POST', headers: { 'x-upsert': 'false' }, body: JSON.stringify({ lockedAt: new Date().toISOString() }) }); }
      catch (error) { if (error.code === 'CONFLICT') throw new Error('다른 회원정보 처리가 진행 중입니다. 잠시 후 다시 시도해 주세요.'); throw error; }
      acquired.push(`lock-${filename(id)}`);
    }
    return await task();
  } finally {
    if (acquired.length) await request('object/members', { method: 'DELETE', body: JSON.stringify({ prefixes: acquired }) }).catch(() => {});
  }
}
export async function saveMember(user, { touchLogin = true } = {}) {
  const root = await getMember(user.id);
  const id = root?.id || user.id;
  return locked([id], async () => {
    const previous = await getMember(user.id);
    if (previous && previous.id !== id) throw new Error('계정 연결이 변경되었습니다. 다시 시도해 주세요.');
    const now = new Date().toISOString();
    const member = { membershipType: 'general', ...previous, ...user, ...(user.loginIdentities ? { loginIdentities: [...new Set([...(previous?.loginIdentities || []), ...user.loginIdentities])] } : {}), id, joinedAt: previous?.joinedAt || now, lastLoginAt: touchLogin ? now : previous?.lastLoginAt || now };
    await writeMember(member);
    return member;
  });
}
export async function identityMember(identity) {
  const response = await request(`object/members/identity-${filename(identity)}`, {}, true);
  if (response) return getMember(decode(await response.json()).memberId);
  return identity.startsWith('kakao:') ? getMember(identity) : null;
}
export async function claimIdentity(identity, memberId) {
  const route = `object/members/identity-${filename(identity)}`;
  try { await request(route, { method: 'POST', headers: { 'x-upsert': 'false' }, body: JSON.stringify(encode({ memberId })) }); }
  catch (error) {
    if (error.code !== 'CONFLICT') throw error;
    const existing = await identityMember(identity), target = await getMember(memberId);
    if (!existing || existing.id !== (target?.id || memberId)) throw new Error('이미 다른 회원에 연결된 로그인 수단입니다. 기존 계정으로 로그인한 후 연결해 주세요.');
  }
}
export function combinedEnrollments(first = [], second = []) {
  const rows = new Map();
  for (const item of [...first, ...second]) {
    if (!item || !item.courseId) continue;
    const previous = rows.get(String(item.courseId));
    rows.set(String(item.courseId), { ...item, ...previous, ...(previous ? { linkedHistory: [...(previous.linkedHistory || []), item] } : {}) });
  }
  return [...rows.values()];
}
// Called only after the handler has proved both the current session and the other identity.
export async function linkVerifiedIdentity(currentId, identity) {
  const current = await getMember(currentId);
  if (!current?.registrationComplete) throw new Error('회원가입을 먼저 완료해 주세요.');
  const other = await identityMember(identity);
  if (!other || other.id === current.id) {
    await claimIdentity(identity, current.id);
    return saveMember({ id: current.id, loginIdentities: [...new Set([...(current.loginIdentities || [current.id]), identity])] }, { touchLogin: false });
  }
  return locked([current.id, other.id], async () => {
    const target = await getMember(current.id), source = await getMember(other.id);
    if (target?.id !== current.id || source?.id !== other.id) throw new Error('다른 연결 작업이 완료되었습니다. 다시 시도해 주세요.');
    const merged = { ...source, ...target, id: target.id,
      membershipType: source.membershipType === 'regular' || target.membershipType === 'regular' ? 'regular' : 'general',
      adminRole: source.adminRole === 'admin' || target.adminRole === 'admin' ? 'admin' : 'none',
      enrolledCourses: combinedEnrollments(target.enrolledCourses, source.enrolledCourses),
      loginIdentities: [...new Set([...(target.loginIdentities || [target.id]), ...(source.loginIdentities || [source.id]), identity])],
      linkedAt: new Date().toISOString() };
    // Prepare the destination first; the source pointer is the commit point. Retrying is idempotent.
    await writeMember(merged);
    await writeMember({ ...source, mergedInto: target.id, mergedAt: merged.linkedAt });
    return merged;
  });
}
export async function listMembers() {
  const members = [];
  for (let offset = 0; ; offset += 100) {
    const files = await (await request('object/list/members', { method: 'POST', body: JSON.stringify({ prefix: '', limit: 100, offset, sortBy: { column: 'name', order: 'asc' } }) })).json();
    const rows = await Promise.all(files.filter(file => /^[a-f0-9]{64}\.json$/.test(file.name)).map(async file => decode(await (await request(`object/members/${file.name}`)).json())));
    members.push(...rows.filter(member => !member.mergedInto));
    if (files.length < 100) break;
  }
  return members.sort((a, b) => b.joinedAt.localeCompare(a.joinedAt));
}
