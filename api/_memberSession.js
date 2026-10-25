import crypto from 'node:crypto';
// Accept only the server-encrypted, unexpired, completed member session.
export function memberSessionId(req) {
  try {
    if (!process.env.MEMBER_SESSION_SECRET || process.env.MEMBER_SESSION_SECRET.length < 32) return null;
    const raw = (req.headers.cookie || '').split(';').map(v => v.trim()).find(v => v.startsWith('kfssec_member_session='));
    if (!raw) return null;
    const bytes = Buffer.from(raw.slice('kfssec_member_session='.length), 'base64url');
    const decipher = crypto.createDecipheriv('aes-256-gcm', crypto.createHash('sha256').update(process.env.MEMBER_SESSION_SECRET).digest(), bytes.subarray(0, 12));
    decipher.setAuthTag(bytes.subarray(12, 28));
    const session = JSON.parse(Buffer.concat([decipher.update(bytes.subarray(28)), decipher.final()]).toString());
    return session.expires > Date.now() && session.user?.registrationComplete && typeof session.user.id === 'string' ? session.user.id : null;
  } catch { return null; }
}
