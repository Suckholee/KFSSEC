import {test} from 'node:test';
import assert from 'node:assert/strict';
import {normalizePopupSchedule,popupStatus,koreaDate,nextKoreaMidnight,expiredEventPromotion} from '../src/utils/popupSchedule.js';
const legacy={enabled:true,linkUrl:'/community/notice?post=notice-ceremony-2026-1019',startDate:'2026-09-01',endDate:'2026-10-31'};
test('past ceremony expires on its actual day even with saved October 31 configuration',()=>{
 assert.equal(normalizePopupSchedule(legacy).endDate,'2026-10-19');
 assert.equal(legacy.endDate,'2026-10-31');
 assert.equal(popupStatus(legacy,'2026-10-19T14:59:59.999Z'),'active');
 assert.equal(popupStatus(legacy,'2026-10-19T15:00:00.000Z'),'expired');
 assert.equal(popupStatus(legacy,'2026-10-26T00:00:00Z'),'expired');
});
test('Korean midnight and future notices are independent of browser time zone',()=>{
 assert.equal(koreaDate('2026-10-19T15:00:00Z'),'2026-10-20');
 assert.equal(nextKoreaMidnight('2026-10-19T14:30:00Z'),Date.parse('2026-10-19T15:00:00Z'));
 const future={enabled:true,title:'다음 행사',linkUrl:'/community/notice?post=next-event',startDate:'2026-11-01',endDate:'2026-11-10'};
 assert.equal(popupStatus(future,'2026-10-26T00:00:00Z'),'scheduled');
 assert.equal(popupStatus(future,'2026-11-01T00:00:00Z'),'active');
 assert.equal(popupStatus(future,'2026-11-10T15:00:00Z'),'expired');
 assert.equal(normalizePopupSchedule(future).endDate,'2026-11-10');
});
test('disabled and invalid popup periods never open',()=>{
 assert.equal(popupStatus({...legacy,enabled:false}),'disabled');
 assert.equal(popupStatus({enabled:true,startDate:'2026-12-01',endDate:'2026-11-01'}),'invalid');
 assert.equal(popupStatus({enabled:true,endDate:'2026-02-31'}),'invalid');
 assert.equal(popupStatus(null),'disabled');
});

test('retired event promotions leave home news without hiding event reports',()=>{
 assert.equal(expiredEventPromotion({id:'notice-ceremony-2026-1019'},'2026-10-26'),true);
 assert.equal(expiredEventPromotion({id:'gal-ceremony-2026-1019'},'2026-10-26'),true);
 assert.equal(expiredEventPromotion({id:'notice-ceremony-2026-1019'},'2026-10-19T14:59:59Z'),false);
 assert.equal(expiredEventPromotion({id:'ceremony-report',eventDate:'2026-10-19'},'2026-10-26'),false);
});
