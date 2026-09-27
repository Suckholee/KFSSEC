/**
 * YouTube Utility Helper for KFSSEC Admin
 * Automatically extracts 11-character Video ID from any YouTube URL, shorts, live, or share link.
 */

export function extractYoutubeId(urlOrId) {
  if (!urlOrId) return '';
  const str = String(urlOrId).trim();

  // If already 11-char ID (e.g. ZDZFUpS0fFE)
  if (/^[a-zA-Z0-9_-]{11}$/.test(str)) {
    return str;
  }

  // Extract from full URLs:
  // - https://www.youtube.com/watch?v=ZDZFUpS0fFE
  // - https://youtu.be/ZDZFUpS0fFE
  // - https://www.youtube.com/embed/ZDZFUpS0fFE
  // - https://www.youtube.com/v/ZDZFUpS0fFE
  // - https://www.youtube.com/shorts/ZDZFUpS0fFE
  // - https://www.youtube.com/live/ZDZFUpS0fFE
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|shorts\/|live\/|&v=)([^#&?]*).*/;
  const match = str.match(regExp);

  if (match && match[2] && match[2].length === 11) {
    return match[2];
  }

  // Fallback: search for any 11 alphanumeric/dash/underscore chars after delimiter
  const fallback = str.match(/(?:v=|\/)([a-zA-Z0-9_-]{11})(?:[?&/]|$)/);
  if (fallback && fallback[1]) {
    return fallback[1];
  }

  return str;
}

export function getYoutubeThumbnail(urlOrId, quality = 'hqdefault') {
  const id = extractYoutubeId(urlOrId);
  if (!id) return '';
  return `https://img.youtube.com/vi/${id}/${quality}.jpg`;
}

export function isValidYoutubeId(id) {
  return /^[a-zA-Z0-9_-]{11}$/.test(id);
}

