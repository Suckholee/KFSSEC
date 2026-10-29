import { memberSessionId } from './_memberSession.js';
import { getMember } from './_members.js';
import crypto from 'node:crypto';
import { readContent, writeContent } from './_store.js';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') return res.status(405).json({ success: false });
  const origin = new URL(process.env.SITE_URL || 'http://localhost:3000').origin;
  if (req.headers.origin !== origin) return res.status(403).json({ success: false, message: '잘못된 요청입니다.' });
  const memberId = memberSessionId(req);
  if (!memberId) return res.status(401).json({ success: false, message: '회원 로그인 후 문의를 작성해 주세요.' });
  let member;
  try { member = await getMember(memberId); } catch { return res.status(503).json({ success: false, message: '회원 정보를 확인하지 못했습니다.' }); }
  if (!member?.registrationComplete) return res.status(401).json({ success: false, message: '회원가입을 완료해 주세요.' });
  const title = String(req.body?.title || '').trim();
  const content = String(req.body?.content || '').trim();
  const author = member.name || '회원';
  if (!title || title.length > 120 || !content || content.length > 5000 || author.length > 40) {
    return res.status(400).json({ success: false, message: '제목, 내용, 작성자 길이를 확인해 주세요.' });
  }
  try {
    const posts = await readContent('posts') || [];
    const post = {
      id: crypto.randomUUID(), category: '문의', categoryType: 'inquiry',
      title, content, author, authorId: member.id, isPinned: false, status: 'pending', views: 0,
      date: new Date().toISOString().slice(0, 10).replace(/-/g, '.'),
    };
    await writeContent('posts', [post, ...posts]);
    return res.status(201).json({ success: true, data: post });
  } catch (error) {
    console.error('Inquiry API error:', error);
    return res.status(500).json({ success: false, message: '문의 등록에 실패했습니다.' });
  }
}
