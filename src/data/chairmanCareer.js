export const chairmanCareerSections = [
  {
    id: '06', title: '학력', subtitle: 'Academic Background',
    items: [
      '캐롤라인대학교 외식경영학 박사',
      '동의대학교 대학원 박사수료 (호텔·외식·관광)',
      '강릉원주대학교 대학원 박사수료 (관광·외식)',
      '사)한국외식창업교육원 설립자·이사장·민간자격증 전담교수',
    ],
  },
  {
    id: '07', title: '직책', subtitle: 'Positions & Career',
    items: [
      '현) 사)한국외식창업교육원 이사장',
      '현) 글로벌외식정보 발행인 대표 기자',
      '전) (사)경남음식관광협회 회장',
      '전) 세계음식문화연구원 부산·경상남도 지회장',
      '전) 한국약선협회 경상남도 지회장',
    ],
  },
  {
    id: '08', title: '강의 경력', subtitle: 'Teaching Experience',
    items: [
      '서정대학교 호텔제과제빵학과 겸임교수',
      '창원문성대학교 식품조리과 겸임교수',
      '창신대학교 호텔·조리·제과·제빵학과 겸임교수',
      '동의대학교 외식경영학과 외래교수',
      '한중대학교 외식산업학과 겸임교수',
    ],
  },
];

const replacedEntries = new Set([
  ...chairmanCareerSections.flatMap(section => section.items),
  '한국외식창업교육원 설립자·이사장·민간자격증 전담교수',
  '현) 글로벌외식정보 대표 기자 / (사)경남음식관광협회 전 회장',
  '전) 한국약선협회 이사·경상남도 지회장',
  '서정대학교·창원문성대학교 외식조리과 겸임교수',
  '창신대학교·동의대학교·한중대학교 외식산업학과 겸임교수',
  '창신대학교 호텔,조리,제과,제빵학과 겸임교수',
]);

export function migrateChairmanCareer(site) {
  const savedCards = site.managedLists?.chairmanCareer;
  const cards = Array.isArray(savedCards) ? savedCards : null;
  const legacy = cards?.find(card => card.id === '06');
  if (cards && (!legacy || legacy.title === '학력' || cards.some(card => card.id === '07' || card.id === '08'))) {
    return site;
  }

  const additional = site.speech?.profileAdditionalItems;
  const retained = additional?.['06']?.filter(item => !replacedEntries.has(item.text?.trim()));
  if (!legacy && (!retained || retained.length === additional['06'].length)) return site;

  return {
    ...site,
    ...(legacy && {
      managedLists: {
        ...site.managedLists,
        chairmanCareer: cards.flatMap(card => card !== legacy ? [card] : [
          {
            ...legacy,
            ...chairmanCareerSections[0],
            items: [
              ...chairmanCareerSections[0].items,
              ...(legacy.items || []).filter(item => typeof item !== 'string' || !replacedEntries.has(item.trim())),
            ],
          },
          ...chairmanCareerSections.slice(1).map(section => ({ ...section, visible: legacy.visible })),
        ]),
      },
    }),
    ...(retained && { speech: { ...site.speech, profileAdditionalItems: { ...additional, '06': retained } } }),
  };
}
