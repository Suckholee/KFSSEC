import assert from 'node:assert/strict';
import { test } from 'node:test';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { readContentSnapshot, writeContent } from '../api/_store.js';
import contentHandler from '../api/content.js';
import coursesHandler from '../api/courses.js';
import { setAdminCookie } from '../api/_auth.js';
import { rememberContentVersion, inheritContentVersion, contentVersion, readSharedContent, saveSharedContent } from '../src/services/contentApi.js';
import { fetchCoursesFromAPI, getCoursesFromDB, saveCoursesToDB, updateCourseAPI, deleteCourseAPI } from '../src/services/courseDatabase.js';

const response = () => ({ statusCode: 200, headers: {}, setHeader(k, v) { this.headers[k] = v; }, status(code) { this.statusCode = code; return this; }, json(body) { this.body = body; return this; } });

test('atomic storage and authenticated APIs reject stale writes, including deletion and course ordering', async () => {
  const original = { fetch: global.fetch, url: process.env.SUPABASE_URL, vercel: process.env.VERCEL, secret: process.env.ADMIN_SESSION_SECRET };
  process.env.SUPABASE_URL = 'https://conflict-test.invalid';
  process.env.SUPABASE_SERVICE_ROLE_KEY = 'test-only';
  process.env.ADMIN_SESSION_SECRET = 'test-only-secret-for-conflict-suite-123456789';
  const rows = new Map();
  let sequence = 0;
  global.fetch = async (url, options = {}) => {
    const query = new URL(url).searchParams;
    const method = options.method || 'GET';
    if (method === 'GET') return Response.json(rows.has(query.get('key')?.slice(3)) ? [structuredClone(rows.get(query.get('key').slice(3)))] : []);
    const body = JSON.parse(options.body);
    const key = method === 'POST' ? body.key : query.get('key').slice(3);
    const current = rows.get(key);
    if (method === 'POST' ? current : current?.updated_at !== query.get('updated_at').slice(3)) return Response.json([]);
    assert.match(options.headers.Prefer, /return=representation/);
    if (method === 'POST') assert.match(options.headers.Prefer, /resolution=ignore-duplicates/);
    const row = { key, value: body.value, updated_at: `revision-${++sequence}` };
    rows.set(key, row);
    return Response.json([structuredClone(row)]);
  };
  const cookieResponse = response();
  setAdminCookie(cookieResponse);
  const cookie = cookieResponse.headers['Set-Cookie'].split(';')[0];
  const request = (type, body, version) => ({ method: 'PUT', query: { type }, body, headers: { cookie, ...(version ? { 'if-match': version } : {}) } });
  try {
    const first = await writeContent('posts', [{ id: 'a', title: 'original' }], 'missing');
    const results = await Promise.allSettled([
      writeContent('posts', [{ id: 'a', title: 'first admin' }], first.version),
      writeContent('posts', [], first.version),
    ]);
    assert.equal(results.filter(r => r.status === 'fulfilled').length, 1);
    assert.equal(results.find(r => r.status === 'rejected').reason.code, 'CONTENT_CONFLICT');
    assert.equal((await readContentSnapshot('posts')).data[0].title, 'first admin');

    const stale = response();
    await contentHandler(request('posts', [], first.version), stale);
    assert.equal(stale.statusCode, 409);
    assert.equal(stale.body.code, 'CONTENT_CONFLICT');
    const oldClient = response();
    await contentHandler(request('posts', []), oldClient);
    assert.equal(oldClient.statusCode, 428);
    const latest = await readContentSnapshot('posts');
    const deleted = response();
    await contentHandler(request('posts', [], latest.version), deleted);
    assert.equal(deleted.statusCode, 200);
    assert.deepEqual(deleted.body.data, []);
    assert.notEqual(deleted.body.version, latest.version);
    await assert.rejects(writeContent('posts', first.data, latest.version), { code: 'CONTENT_CONFLICT' });

    const courseBase = await writeContent('courses', [], 'missing');
    await writeContent('courses', [], courseBase.version);
    const courseResponse = response();
    await coursesHandler({ ...request(null, { courses: [] }, courseBase.version), query: { id: 'reorder' } }, courseResponse);
    assert.equal(courseResponse.statusCode, 409);
    const newCourse = { id: 'test-course', title: '정상 생성' };
    const createResponse = response();
    await coursesHandler({ ...request(null, newCourse, (await readContentSnapshot('courses')).version), method: 'POST', query: {} }, createResponse);
    assert.equal(createResponse.statusCode, 201);
    const editResponse = response();
    await coursesHandler({ ...request(null, { title: '정상 수정' }, createResponse.body.version), query: { id: newCourse.id } }, editResponse);
    assert.equal(editResponse.statusCode, 200);
    assert.equal(editResponse.body.data.title, '정상 수정');
    const deleteResponse = response();
    await coursesHandler({ ...request(null, null, editResponse.body.version), method: 'DELETE', query: { id: newCourse.id } }, deleteResponse);
    assert.equal(deleteResponse.statusCode, 200);
    assert.deepEqual((await readContentSnapshot('courses')).data, []);
    const rejectedCreation = await Promise.allSettled([
      writeContent('site', { title: 'one' }, 'missing'), writeContent('site', { title: 'two' }, 'missing'),
    ]);
    assert.equal(rejectedCreation.filter(r => r.status === 'fulfilled').length, 1);
    global.fetch = async () => new Response('database unavailable', { status: 503 });
    await assert.rejects(readContentSnapshot('posts'), /503/);
  } finally {
    global.fetch = original.fetch;
    for (const [key, value] of Object.entries({ SUPABASE_URL: original.url, VERCEL: original.vercel, ADMIN_SESSION_SECRET: original.secret })) {
      if (value === undefined) delete process.env[key]; else process.env[key] = value;
    }
    delete process.env.SUPABASE_SERVICE_ROLE_KEY;
  }
});

test('draft revisions stay tied to their original snapshot after background reads and failed saves', async () => {
  const originalFetch = global.fetch;
  let latest = { data: [{ id: 'a', title: 'original' }], version: 'v1' };
  let puts = 0;
  global.fetch = async (url, options = {}) => {
    if (!options.method) return Response.json({ success: true, ...latest });
    puts++;
    if (options.headers['If-Match'] !== latest.version) return Response.json({ success: false, code: 'CONTENT_CONFLICT', message: 'conflict' }, { status: 409 });
    latest = { data: JSON.parse(options.body), version: 'v3' };
    return Response.json({ success: true, ...latest });
  };
  try {
    const base = await readSharedContent('posts');
    const draft = [{ id: 'a', title: 'unsaved text' }];
    latest = { data: [{ id: 'b', title: 'other admin' }], version: 'v2' };
    const refreshed = await readSharedContent('posts');
    await assert.rejects(saveSharedContent('posts', draft, base), { code: 'CONTENT_CONFLICT' });
    assert.equal(draft[0].title, 'unsaved text');
    assert.equal(contentVersion(base), 'v1');
    assert.equal(contentVersion(refreshed), 'v2');
    assert.deepEqual(latest.data, [{ id: 'b', title: 'other admin' }]);
    await assert.rejects(saveSharedContent('posts', draft), /최신 저장본/);
    assert.equal(puts, 1);
    const merged = inheritContentVersion({ banner: { title: 'hydrated' } }, rememberContentVersion({}, 'site-v1'));
    assert.equal(contentVersion(merged), 'site-v1');
    const saved = await saveSharedContent('posts', [{ id: 'b', title: 'deliberate update' }], refreshed);
    assert.equal(contentVersion(saved), 'v3');
  } finally { global.fetch = originalFetch; }
});

test('local conditional writes serialize competing requests without losing the winning data', async () => {
  const dir = await mkdtemp(path.join(tmpdir(), 'kfssec-cas-'));
  const previousDirectory = process.cwd();
  const previous = Object.fromEntries(['VERCEL', 'SUPABASE_URL', 'VITE_SUPABASE_URL'].map(k => [k, process.env[k]]));
  try {
    for (const key of Object.keys(previous)) delete process.env[key];
    process.chdir(dir);
    const store = await import(`../api/_store.js?local=${Date.now()}`);
    const base = await store.readContentSnapshot('posts');
    const results = await Promise.allSettled([
      store.writeContent('posts', [{ id: 'winner' }], base.version),
      store.writeContent('posts', [], base.version),
    ]);
    assert.equal(results.filter(r => r.status === 'fulfilled').length, 1);
    assert.deepEqual((await store.readContentSnapshot('posts')).data, [{ id: 'winner' }]);
  } finally {
    process.chdir(previousDirectory);
    for (const [key, value] of Object.entries(previous)) { if (value === undefined) delete process.env[key]; else process.env[key] = value; }
    await rm(dir, { recursive: true, force: true });
  }
});

test('course editors preserve their opening revision and legacy editors reject changed records', async () => {
  const originalFetch = global.fetch;
  let data = [{ id: 'safe-course', title: 'original' }];
  let version = 'course-v1';
  let puts = 0;
  global.fetch = async (url, options = {}) => {
    if (!options.method) return Response.json({ success: true, data, version });
    puts++;
    if (options.headers['If-Match'] !== version) return Response.json({ success: false, message: 'course conflict' }, { status: 409 });
    data = JSON.parse(options.body).courses;
    version = 'course-v3';
    return Response.json({ success: true, data, version });
  };
  try {
    const base = await fetchCoursesFromAPI();
    assert.strictEqual(getCoursesFromDB(), base);
    data = [{ id: 'safe-course', title: 'other administrator' }];
    version = 'course-v2';
    const current = await fetchCoursesFromAPI();
    await assert.rejects(saveCoursesToDB([{ ...base[0], title: 'my draft' }], base), /course conflict/);
    await assert.rejects(updateCourseAPI(base[0].id, { ...base[0], title: 'my draft' }, base[0]), /다른 화면/);
    await assert.rejects(deleteCourseAPI(base[0].id, base[0]), /다른 화면/);
    assert.equal(puts, 1);
    const saved = await saveCoursesToDB([{ ...current[0], title: 'intentional latest edit' }], current);
    assert.equal(contentVersion(saved), 'course-v3');
    assert.strictEqual(getCoursesFromDB(), saved);
  } finally { global.fetch = originalFetch; }
});
