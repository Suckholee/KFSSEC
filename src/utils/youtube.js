/**
 * YouTube Utility Helper for KFSSEC Admin
 * Automatically extracts 11-character Video ID from any YouTube URL or share link.
 */

export function extractYoutubeId(urlOrId) {
  if (!urlOrId) return '';
  const str = urlOrId.trim();

  // If already 11-char ID (e.g. ZDZFUpS0fFE)
  if (/^[a-zA-Z0-9_-]{11}$/.test(str)) {
    return str;
  }

  // Extract from full URLs:
  // - https://www.youtube.com/watch?v=ZDZFUpS0fFE
  // - https://youtu.be/ZDZFUpS0fFE
  // - https://www.youtube.com/embed/ZDZFUpS0fFE
  // - https://www.youtube.com/v/ZDZFUpS0fFE
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = str.match(regExp);

  if (match && match[2] && match[2].length === 11) {
    return match[2];
  }

  return str;
}
