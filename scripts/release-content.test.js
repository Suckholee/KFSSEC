import { test } from 'node:test';
import assert from 'node:assert/strict';
import { adoptReleasePosts, CEREMONY_2026_ALBUM } from '../src/data/releasePosts.js';
import { profileVideoSource } from '../src/utils/profileVideo.js';
test('release album preserves existing edits and an administrator-hidden album',()=>{
 const hidden={...CEREMONY_2026_ALBUM,title:'수정 제목',visible:false};
 const list=[{id:'other'},hidden];
 assert.equal(adoptReleasePosts(list),list);
 assert.equal(adoptReleasePosts(list)[1].visible,false);
 const incoming=[{id:'other'}];
 assert.equal(adoptReleasePosts(incoming)[0].images.length,2);
 assert.deepEqual(incoming,[{id:'other'}]);
});
test('introduction videos accept explicit video URLs and reject scripts, channels and deceptive hosts',()=>{
 assert.deepEqual(profileVideoSource('https://youtu.be/abcDEF123_-'),{type:'youtube',src:'https://www.youtube-nocookie.com/embed/abcDEF123_-'});
 assert.equal(profileVideoSource('/videos/intro.mp4').type,'file');
 assert.equal(profileVideoSource('https://example.org/intro.mp4?version=2').type,'file');
 for(const invalid of ['javascript:alert(1)','http://example.org/intro.mp4','https://youtube.com.evil.test/watch?v=abcDEF123_-','https://youtube.com/@channel','/videos/../secret.mp4']) assert.equal(profileVideoSource(invalid),null);
});
