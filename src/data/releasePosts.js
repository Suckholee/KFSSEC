export const CEREMONY_2026_ALBUM = {
  id: 'gallery-ceremony-2026-1019-originals', categoryType: 'gallery', galleryCategory: 'ceremony',
  title: '2026 대한민국 자랑스런 명인명장 선정식 현장', date: '2026.10.19',
  location: '더샵갤러리', author: '한국외식창업교육원', visible: true, isPinned: true,
  image: '/images/gallery/ceremony/2026/group.jpeg', coverImage: '/images/gallery/ceremony/2026/group.jpeg',
  images: ['/images/gallery/ceremony/2026/group.jpeg', '/images/gallery/ceremony/2026/chairman.jpeg'],
  content: '2026년 10월 19일 열린 대한민국 자랑스런 명인명장 선정식 현장입니다. 교육원에서 전달한 단체 기념사진과 이사장 기념사진 원본을 담았습니다.',
};
export function adoptReleasePosts(posts = []) {
  return posts.some(post => post.id === CEREMONY_2026_ALBUM.id) ? posts : [CEREMONY_2026_ALBUM, ...posts];
}
