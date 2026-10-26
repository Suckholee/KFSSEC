const KST_OFFSET = 9 * 60 * 60 * 1000;
export function koreaDate(now = Date.now()) {
  return new Date(new Date(now).getTime() + KST_OFFSET).toISOString().slice(0, 10);
}
export function nextKoreaMidnight(now = Date.now()) {
  const shifted = new Date(new Date(now).getTime() + KST_OFFSET);
  return Date.UTC(shifted.getUTCFullYear(), shifted.getUTCMonth(), shifted.getUTCDate() + 1) - KST_OFFSET;
}
export function normalizePopupSchedule(popup) {
  if (!popup) return popup;
  const legacyCeremony = String(popup.linkUrl || '').includes('notice-ceremony-2026-1019') || String(popup.imageUrl || '').includes('award-ceremony-2026-1019');
  const eventDate = popup.eventDate || (legacyCeremony ? '2026-10-19' : '');
  const endDate = eventDate && (!popup.endDate || popup.endDate > eventDate) ? eventDate : popup.endDate;
  return { ...popup, ...(eventDate ? { eventDate } : {}), endDate };
}
function validDate(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value) && Number.isFinite(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value;
}
export function popupStatus(popup, now = Date.now()) {
  const data = normalizePopupSchedule(popup);
  if (!data || data.enabled === false) return 'disabled';
  if ([data.startDate, data.endDate, data.eventDate].some(date => date && !validDate(date))) return 'invalid';
  if (data.startDate && data.endDate && data.startDate > data.endDate) return 'invalid';
  const today = koreaDate(now);
  if (data.endDate && today > data.endDate) return 'expired';
  if (data.startDate && today < data.startDate) return 'scheduled';
  return 'active';
}

export function expiredEventPromotion(post, now = Date.now()) {
  const knownCeremony = ['notice-ceremony-2026-1019', 'gal-ceremony-2026-1019'].includes(post?.id);
  const endDate = post?.promotionEndDate || (knownCeremony ? '2026-10-19' : '');
  return Boolean(endDate && validDate(endDate) && koreaDate(now) > endDate);
}
