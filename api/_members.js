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
  if (!response.ok) throw new Error(`Member database request failed (${response.status})`);
  return response;
}
function filename(id) { return crypto.createHash('sha256').update(id).digest('hex') + '.json'; }
export async function getMember(id) {
  const response = await request(`object/members/${filename(id)}`, {}, true);
  return response ? decode(await response.json()) : null;
}
export async function saveMember(user, { touchLogin = true } = {}) {
  const route = `object/members/${filename(user.id)}`;
  const previous = await getMember(user.id);
  const now = new Date().toISOString();
  const member = { membershipType: 'general', ...previous, ...user, joinedAt: previous?.joinedAt || now, lastLoginAt: touchLogin ? now : previous?.lastLoginAt || now };
  await request(route, { method: 'POST', headers: { 'x-upsert': 'true' }, body: JSON.stringify(encode(member)) });
  return member;
}
export async function listMembers() {
  const members = [];
  for (let offset = 0; ; offset += 100) {
    const files = await (await request('object/list/members', { method: 'POST', body: JSON.stringify({ prefix: '', limit: 100, offset, sortBy: { column: 'name', order: 'asc' } }) })).json();
    const rows = await Promise.all(files.filter(file => /^[a-f0-9]{64}\.json$/.test(file.name)).map(async file => decode(await (await request(`object/members/${file.name}`)).json())));
    members.push(...rows);
    if (files.length < 100) break;
  }
  return members.sort((a, b) => b.joinedAt.localeCompare(a.joinedAt));
}
