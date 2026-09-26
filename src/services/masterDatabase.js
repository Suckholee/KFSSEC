import { normalizeProfileImage } from '../utils/profileImage.js';
import defaults from '../data/masterDirectory.json';

export const MASTER_STORAGE_KEY = 'kfssec_master_profiles_v1';
export const MASTER_UPDATE_EVENT = 'kfssec_masters_updated';
export const initialProfiles = defaults.map((profile, index) => ({
  id: `master-${index + 1}`, title: '', intro: '', awards: [], published: true, order: index + 1, ...profile,
}));

export function getMasterProfiles() {
  const saved = localStorage.getItem(MASTER_STORAGE_KEY);
  if (!saved) return initialProfiles;
  const stored = JSON.parse(saved);
  const profiles = Array.isArray(stored) ? stored : stored?.data;
  if (!Array.isArray(profiles) || profiles.some(p => !p || typeof p.id !== 'string' || typeof p.name !== 'string' || !['expert', 'master'].includes(p.group))) {
    throw new Error('저장된 프로필을 읽을 수 없습니다. 브라우저 저장 데이터를 확인해 주세요.');
  }
  const current = profiles.map(profile => {
    const original = initialProfiles.find(item => item.id === profile.id && (item.name === profile.name || (profile.name === '곡국진' && item.name === '송창수')));
    if (!original) return profile;
    return {
      ...original,
      ...profile,
      // If saved image is empty or invalid, fallback to original verified image
      image: profile.image || original.image,
      name: original.name,
      group: original.group,
      headline: profile.name === '곡국진' ? original.headline : (profile.headline ?? original.headline ?? ''),
      title: profile.title || original.title,
      intro: profile.intro || original.intro,
      awards: profile.awards?.length ? profile.awards : original.awards,
    };
  });

  // Ensure any newly added profiles in data/masterDirectory.json are seamlessly integrated
  const missingProfiles = initialProfiles.filter(p => !current.some(c => c.id === p.id || c.name === p.name));
  if (missingProfiles.length > 0) {
    current.push(...missingProfiles);
  }

  if (stored.version !== 2 || missingProfiles.length > 0) {
    try {
      localStorage.setItem(MASTER_STORAGE_KEY, JSON.stringify({ version: 2, data: current }));
    } catch (e) {}
  }
  return current;
}

export function validateProfile(profile) {
  if (!profile.name?.trim()) throw new Error('이름을 입력해 주세요.');
  if (!['expert', 'master'].includes(profile.group)) throw new Error('명인 또는 명장을 선택해 주세요.');
  if (String(profile.order).trim() === '' || !Number.isSafeInteger(Number(profile.order)) || Number(profile.order) < 0) throw new Error('표시 순서는 0 이상의 정수로 입력해 주세요.');
  const image = normalizeProfileImage(profile.image);
  if (profile.published && !image) throw new Error('공개 프로필에는 사진이 필요합니다.');
  const headline = (profile.headline || '').trim();
  if (headline.length > 60 || headline.split('\n').length > 2) throw new Error('카드 소개 문구는 60자 이내, 두 줄 이하로 입력해 주세요.');
  return {
    ...profile,
    image,
    headline,
    name: profile.name.trim(),
    title: (profile.title || '').trim(),
    intro: (profile.intro || '').trim(),
    order: Number(profile.order),
    blogUrl: (profile.blogUrl || '').trim(),
    youtubeUrl: (profile.youtubeUrl || '').trim(),
    instagramUrl: (profile.instagramUrl || '').trim(),
  };
}

export function saveMasterProfile(profile, expectedProfile) {
  const validated = validateProfile(profile);
  const profiles = getMasterProfiles();
  if (expectedProfile) {
    const current = profiles.find(p => p.id === validated.id);
    if (!current || JSON.stringify(current) !== JSON.stringify(expectedProfile)) throw new Error('다른 화면에서 프로필이 변경되거나 삭제되었습니다. 입력 내용을 복사한 뒤 목록을 다시 열어 주세요.');
  }
  const next = profiles.some(p => p.id === validated.id)
    ? profiles.map(p => p.id === validated.id ? validated : p)
    : [...profiles, validated];
  persist(next);
}

export function deleteMasterProfile(id) {
  persist(getMasterProfiles().filter(p => p.id !== id));
}

function persist(profiles) {
  try { localStorage.setItem(MASTER_STORAGE_KEY, JSON.stringify({ version: 2, data: profiles })); }
  catch { throw new Error('저장 공간이 부족하거나 브라우저 저장이 차단되었습니다. 사진 용량을 줄인 뒤 다시 시도해 주세요.'); }
  window.dispatchEvent(new Event(MASTER_UPDATE_EVENT));
}

export function sortProfiles(profiles) {
  return [...profiles].sort((a, b) => Number(b.group === 'master') - Number(a.group === 'master') || a.order - b.order);
}

// Move to the target card's position within its group, preserving current content.
export function moveMasterProfile(id, targetId, expectedIds) {
  const profiles = getMasterProfiles();
  const source = profiles.find(p => p.id === id);
  const target = profiles.find(p => p.id === targetId);
  if (!source || !target) throw new Error('프로필 목록이 변경되었습니다. 다시 시도해 주세요.');
  if (source.group !== target.group) throw new Error('명장은 명장끼리, 명인은 명인끼리 이동할 수 있습니다.');
  const ordered = sortProfiles(profiles.filter(p => p.group === source.group));
  if (JSON.stringify(ordered.map(p => p.id)) !== JSON.stringify(expectedIds)) {
    throw new Error('다른 화면에서 목록 순서가 변경되었습니다. 최신 목록에서 다시 이동해 주세요.');
  }
  if (id === targetId) return;
  const from = ordered.findIndex(p => p.id === id);
  const to = ordered.findIndex(p => p.id === targetId);
  const [moved] = ordered.splice(from, 1);
  ordered.splice(to, 0, moved);
  const positions = new Map(ordered.map((p, index) => [p.id, index + 1]));
  persist(profiles.map(p => positions.has(p.id) ? { ...p, order: positions.get(p.id) } : p));
}
