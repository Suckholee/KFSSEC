export const AWARD_CEREMONY_2026_POSTER = '/images/award-ceremony-2026-1019.png';

export const AWARD_CEREMONY_2026_POPUP = {
  enabled: true,
  title: '2026 대한민국 자랑스런 명인명장 선정시상식',
  imageUrl: AWARD_CEREMONY_2026_POSTER,
  linkUrl: '/community/notice?post=notice-ceremony-2026-1019',
  linkText: '명인명장 선정시상식 상세 공지 바로 보기',
  linkTarget: '_self',
  startDate: '2026-09-01',
  eventDate: '2026-10-19',
  endDate: '2026-10-19',
  showOnMobile: true,
  width: 380,
};

const eventDetails = `일시: 2026년 10월 19일(월) 오전 10:00
장소: 더샵갤러리 4F
주최·주관: 사단법인 한국외식창업교육원`;

const schedule = `10:00 ~ 10:30 | 참석자 등록, 웰컴드링크, 사전 네트워킹
10:30 ~ 11:10 | 국민의례, 개회사, 축사, 환영사
11:10 ~ 12:20 | 한국외식창업교육원의 걸어온 길 발표, 2026 대한민국 자랑스런 명인명장 선정자 발표, 인증서 및 패 수여·기념촬영, 우수회원 상장 전달식, 명인명장 단체 기념촬영
12:20 ~ 13:10 | 축하공연
13:10 ~ 13:20 | 2026 자랑스런 명인명장 선정식 폐회선언
13:20 ~ | 만찬 및 네트워킹, 회원 교류 비즈니스 네트워킹`;

const commonPost = {
  author: '사단법인 한국외식창업교육원',
  date: '2026.10.15',
  eventDate: '2026-10-19',
  location: '더샵갤러리 4F',
  isPinned: true,
  isDemo: false,
  published: true,
  views: 0,
  image: AWARD_CEREMONY_2026_POSTER,
  coverImage: AWARD_CEREMONY_2026_POSTER,
  imageLayout: 'poster',
  tags: ['2026', '명인명장', '선정시상식', '한국외식창업교육원'],
};

export const AWARD_CEREMONY_2026_POSTS = [
  {
    ...commonPost,
    id: 'notice-ceremony-2026-1019',
    category: '공지 사항',
    categoryType: 'notice',
    title: '[행사 안내] 2026 대한민국 자랑스런 명인명장 선정시상식 — 10월 19일(월)',
    content: `사단법인 한국외식창업교육원이 주최·주관하는 「2026 대한민국 자랑스런 명인명장 선정시상식」이 10월 19일(월) 더샵갤러리 4층에서 열립니다.

명인·명장의 선정을 축하하고 수상자와 회원, 초청 인사가 함께 교류하는 자리를 마련합니다. 참석하시는 분들께서는 아래 행사 일정과 포스터를 확인해 주시기 바랍니다.

[행사 개요]
${eventDetails}

[주요 일정]
${schedule}

[교류 프로그램]
명인·명장의 수상을 축하하는 프리미엄 와인과 핑거푸드, 수상자와 내빈의 축하 및 자유 담소, 외식산업 관계자 간 소통과 협력을 위한 회원·초청 인사 네트워킹이 준비됩니다.

참석자 등록은 오전 10시부터 진행됩니다. 수상자와 참석자 여러분의 뜻깊은 만남을 기대합니다.`,
  },
  {
    ...commonPost,
    id: 'gal-ceremony-2026-1019',
    category: '갤러리',
    categoryType: 'gallery',
    galleryCategory: 'ceremony',
    title: '2026 대한민국 자랑스런 명인명장 선정시상식 공식 포스터 및 행사 안내',
    images: [AWARD_CEREMONY_2026_POSTER],
    content: `「2026 대한민국 자랑스런 명인명장 선정시상식」 공식 포스터를 공개합니다.

${eventDetails}

명인·명장 선정자 발표와 인증서 및 패 수여, 우수회원 상장 전달식, 기념촬영과 축하공연이 진행될 예정입니다. 이어지는 만찬과 회원·초청 인사 네트워킹을 통해 축하와 교류의 시간을 함께합니다.

[행사 프로그램]
${schedule}

수상자와 참석자 여러분을 맞이할 뜻깊은 자리에 많은 관심 부탁드립니다.`,
  },
];
