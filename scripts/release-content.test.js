import { test } from 'node:test';
import assert from 'node:assert/strict';
import { CEREMONY_2026_ALBUM } from '../src/data/releasePosts.js';
import { profileVideoSource } from '../src/utils/profileVideo.js';
test('ceremony album uses the seated group cover and retains all six originals',()=>{
 assert.equal(CEREMONY_2026_ALBUM.images.length,6);
 assert.equal(CEREMONY_2026_ALBUM.images[0],CEREMONY_2026_ALBUM.coverImage);
 assert.equal(CEREMONY_2026_ALBUM.imageFit,'contain');
});
test('introduction videos accept explicit video URLs and reject scripts, channels and deceptive hosts',()=>{
 assert.deepEqual(profileVideoSource('https://youtu.be/abcDEF123_-'),{type:'youtube',src:'https://www.youtube-nocookie.com/embed/abcDEF123_-'});
 assert.equal(profileVideoSource('/videos/intro.mp4').type,'file');
 assert.equal(profileVideoSource('https://example.org/intro.mp4?version=2').type,'file');
 for(const invalid of ['javascript:alert(1)','http://example.org/intro.mp4','https://youtube.com.evil.test/watch?v=abcDEF123_-','https://youtube.com/@channel','/videos/../secret.mp4']) assert.equal(profileVideoSource(invalid),null);
});
