import React, { useState, useEffect } from 'react';
import {
  Building2,
  Calendar,
  GraduationCap,
  Award,
  Plus,
  Trash2,
  Edit3,
  Save,
  CheckCircle2,
  X,
  FileText,
  User,
  Sparkles,
  TrendingUp,
  Image as ImageIcon,
  ChevronRight,
  ShieldCheck,
  Landmark,
  Handshake,
} from 'lucide-react';

const DEFAULT_MILESTONES = [
  {
    year: '2026',
    badge: '도약과 결실',
    badgeColor: 'bg-[#C5A059] text-stone-950 font-black',
    events: [
      {
        id: 'e-2026-1',
        date: '2026.10',
        title: '대한민국 자랑스러운 외식 명인·명장 인물대상 시상식 개최 (10월 19일)',
        desc: '외식 산업 발전 및 한식 세계화에 기여한 전국 명장·명인을 발굴하여 공식 인증패 및 인물대상 수여',
        tag: '정기 시상식',
      },
      {
        id: 'e-2026-2',
        date: '2026.08',
        title: '외식창업 수강생 128명 돌파 및 N:N 매칭 포트폴리오 시스템 도입',
        desc: '수강생 1인이 다수의 조리/창업 커리큘럼을 연계 이수하고 정책자금 지원과 1:1 창업 코칭을 받는 선진 학사 체계 완성',
        tag: '교육 혁신',
      },
      {
        id: 'e-2026-3',
        date: '2026.03',
        title: '소믈리에 파티컨설턴트 및 푸드테크 설계사 1·2급 자격 과정 정식 론칭',
        desc: '외식 트렌드 변화에 발맞춘 신개념 융합 전문 자격 검정 체계 구축',
        tag: '자격 신설',
      },
    ],
  },
  {
    year: '2025',
    badge: '전국 확장',
    badgeColor: 'bg-[#0B3C26] text-[#D4AF37] border border-[#C5A059]/40',
    events: [
      {
        id: 'e-2025-1',
        date: '2025.09',
        title: '제01회 K-FOOD 지역 특산물 연계 조리 경연대회 주관',
        desc: '지역 농수축산물 소비 활성화를 위한 전국 단위 창작 요리 경연 대회 성공적 개최',
        tag: '요리대회',
      },
      {
        id: 'e-2025-2',
        date: '2025.04',
        title: '한국음식능력(K-FOOD) 1·2급 및 외식창업실무사 1·2급 검정 확대 인가',
        desc: '농림축산식품부 등록 민간자격 기준에 따른 현장 실기 중심 검정 라인업 완성',
        tag: '자격 확대',
      },
    ],
  },
  {
    year: '2024',
    badge: '산학 협력 & 언론 보도',
    badgeColor: 'bg-stone-800 text-stone-200',
    events: [
      {
        id: 'e-2024-1',
        date: '2024.06',
        title: '강남구 및 전국 지자체 소상공인 외식창업 경영개선 현장 컨설팅 협약',
        desc: '골목상권 활성화 및 예비·청년 창업가를 위한 지자체 연계 맞춤형 밀착 컨설팅 시행',
        tag: '지자체 협력',
      },
      {
        id: 'e-2024-2',
        date: '2024.02',
        title: '2024 한국외식창업교육원 정기총회 개최 및 아시아창의방송(actv) 언론 보도',
        desc: '안형상 이사장 "100세 초고령 시대 맞춤형 교육을 통한 글로벌 K-FOOD 시대 개막" 비전 선포 및 대외 언론 보도',
        tag: '언론 보도',
      },
    ],
  },
  {
    year: '2023',
    badge: '10대 기업 MOU',
    badgeColor: 'bg-stone-700 text-stone-300',
    events: [
      {
        id: 'e-2023-1',
        date: '2023.07',
        title: '10대 산학 협력업체 전략적 업무협약(MOU) 체결',
        desc: '(주)주방뱅크, (주)세진, (주)비엠스 인터내셔날, (주)자인 등 외식 인프라 1위 기업들과 설비·위생·식자재 상생 네트워크 구축',
        tag: '산학 MOU',
      },
      {
        id: 'e-2023-2',
        date: '2023.03',
        title: '외식창업지도사 1·2급 자격 과정 개시 및 1:1 도제식 전수 교육장 완공',
        desc: '강남 테헤란로 본원 실습실 개설 및 최고급 조리 설비 확충',
        tag: '실습장 완공',
      },
    ],
  },
  {
    year: '2022',
    badge: '공식 설립',
    badgeColor: 'bg-emerald-950 text-emerald-300 border border-emerald-800',
    events: [
      {
        id: 'e-2022-1',
        date: '2022.07.12',
        title: '사단법인 한국외식창업교육원 창립 및 비영리 사단법인 설립 허가',
        desc: '[민법] 제32조 및 농림축산식품부 소관 비영리법인의 설립 및 감독에 관한 규칙 제5조에 의거 공식 비영리 사단법인 설립 인가',
        tag: '법인 설립',
      },
      {
        id: 'e-2022-2',
        date: '2022.08',
        title: '안형상 초대 이사장 취임 및 교육원 12대 핵심 추진 방향 선포',
        desc: '40년 경력의 조리명장 중심 실전형 외식 창업 인재 양성 목표 수립',
        tag: '이사장 취임',
      },
    ],
  },
];

const DEFAULT_FACULTY = [
  {
    id: 'prof-jin',
    name: '진익준',
    role: '외식 공간디자인 & 상권분석 전담교수',
    title: '브랜드경험디자인연구소 대표 / 청운대학교 외식조리경영학과 겸임교수',
    image: '/images/dir_1.jpg',
    badge: '외식 상권 & 인테리어 석학',
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
    intro:
      '단순한 미적 인테리어를 넘어, 데이터 기반 상권·입지 분석과 타겟 고객의 방문 맥락을 통합 설계하는 대한민국 대표 외식 공간 브랜딩 전문가입니다.',
    highlights: [
      '홍익대학교 건축도시대학원 실내설계 석사',
      '세종대학교 일반대학원 조리·외식경영학 박사과정',
      '청운대학교 외식조리경영학과 겸임교수',
      '브랜드경험디자인연구소 대표',
      '한국외식창업교육원 상권분석 및 공간기획 자문위원',
    ],
  },
  {
    id: 'prof-lee',
    name: '이상정',
    role: '서양조리 & 마스터클래스 석좌교수',
    title: '대한민국 조리명장 제1호 / 호텔 조리부 총괄',
    image: '/images/dir_2.jpg',
    badge: '대한민국 조리명장 1호',
    badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    intro:
      '대한민국 조리 분야 최초의 노동부 지정 조리명장으로서, 특급호텔 조리 현장 노하우와 서양조리의 정석을 후학들에게 도제식으로 전수합니다.',
    highlights: [
      '대한민국 조리명장 제1호 (노동부 지정)',
      '특급호텔 조리부 총괄 역임',
      '한국외식창업교육원 고문 및 명장 마스터클래스 주임교수',
      '국가기술자격 조리기능장 출제 및 실기심사위원',
    ],
  },
  {
    id: 'prof-shin',
    name: '신충섭',
    role: '외식 정책 & 프랜차이즈 경영 자문위원',
    title: '외식산업 산학협력 총괄 / 경영 정책 자문위원',
    image: '/images/dir_3.jpg',
    badge: '경영·정책 자문',
    badgeColor: 'bg-blue-100 text-blue-900 border-blue-300',
    intro:
      '외식 프랜차이즈 시스템 구축과 정부지원 정책 연계, 소상공인 창업 리스크 관리를 지원하는 정책 자문 전문가입니다.',
    highlights: [
      '한국외식창업교육원 자문위원회 위원',
      '외식산업 산학협력 네트워크 총괄',
      '소상공인시장진흥공단 정책 자문위원',
    ],
  },
  {
    id: 'prof-cho',
    name: '조춘봉',
    role: '외식경영학 & 서비스 R&D 고문',
    title: '관광호텔·외식경영학 석학 / 교육원 고문',
    image: '/images/dir_4.jpg',
    badge: '외식경영학 석학',
    badgeColor: 'bg-purple-100 text-purple-900 border-purple-300',
    intro:
      '외식경영학 학문적 깊이와 고객 만족 서비스 전략을 결합하여, 지속 가능한 외식 비즈니스 모델을 제시합니다.',
    highlights: [
      '외식경영학 명예교수 / 관광외식학회 회장 역임',
      '한국외식창업교육원 고문단',
      '국내 주요 호텔 & 리조트 경영 자문',
    ],
  },
];

export default function AdminAbout({
  siteData = {},
  onUpdateSiteData,
  subTab = 'history_manage',
  onSubTabChange,
}) {
  const normalizeTab = (st) => {
    if (st === 'faculty_manage' || st === 'faculty') return 'faculty';
    if (st === 'speech_manage' || st === 'speech') return 'speech';
    return 'history';
  };

  const [activeTab, setActiveTab] = useState(normalizeTab(subTab));
  const [savedSuccessMsg, setSavedSuccessMsg] = useState('');

  useEffect(() => {
    if (subTab) {
      setActiveTab(normalizeTab(subTab));
    }
  }, [subTab]);

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
    if (onSubTabChange) {
      const fullSubTab =
        tab === 'history' ? 'history_manage' : tab === 'faculty' ? 'faculty_manage' : 'speech_manage';
      onSubTabChange(fullSubTab);
    }
  };

  // History State
  const [milestones, setMilestones] = useState(() => {
    return siteData?.history || DEFAULT_MILESTONES;
  });

  // Faculty State
  const [faculty, setFaculty] = useState(() => {
    return siteData?.faculty || DEFAULT_FACULTY;
  });

  // Speech State
  const [speech, setSpeech] = useState(() => {
    return siteData?.speech || {
      title: '100세 초고령 시대 맞춤형 교육을 통한 글로벌 K-FOOD 조리 명장 시대 개막',
      quote: '“창업은 단순한 생계 수단을 넘어 인생의 새로운 승부수입니다. 40년 조리 명장들의 실전 노하우와 도제식 비법 전수로 실패 없는 백년가게를 만듭니다.”',
      chairmanName: '안형상 이사장',
      chairmanTitle: '사단법인 한국외식창업교육원 초대 이사장 / 조리명장',
      image: '/images/dir_ahn.jpg',
    };
  });

  // Modals
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [editingEventYear, setEditingEventYear] = useState('2026');
  const [editingEvent, setEditingEvent] = useState(null);
  const [eventDate, setEventDate] = useState('');
  const [eventTitle, setEventTitle] = useState('');
  const [eventDesc, setEventDesc] = useState('');
  const [eventTag, setEventTag] = useState('');

  const [isFacultyModalOpen, setIsFacultyModalOpen] = useState(false);
  const [editingFacultyMember, setEditingFacultyMember] = useState(null);
  const [facultyName, setFacultyName] = useState('');
  const [facultyRole, setFacultyRole] = useState('');
  const [facultyTitle, setFacultyTitle] = useState('');
  const [facultyBadge, setFacultyBadge] = useState('');
  const [facultyImage, setFacultyImage] = useState('');
  const [facultyIntro, setFacultyIntro] = useState('');
  const [facultyHighlightsStr, setFacultyHighlightsStr] = useState('');

  // ESC Listener to close modals
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsEventModalOpen(false);
        setIsFacultyModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const showNotification = (msg) => {
    setSavedSuccessMsg(msg);
    setTimeout(() => setSavedSuccessMsg(''), 3000);
  };

  // Save changes to siteData
  const persistSiteData = (newHistory, newFaculty, newSpeech) => {
    const updated = {
      ...siteData,
      history: newHistory !== undefined ? newHistory : milestones,
      faculty: newFaculty !== undefined ? newFaculty : faculty,
      speech: newSpeech !== undefined ? newSpeech : speech,
    };
    if (onUpdateSiteData) {
      onUpdateSiteData(updated);
    }
  };

  // --- History Handlers ---
  const handleOpenAddEventModal = (year) => {
    setEditingEventYear(year);
    setEditingEvent(null);
    setEventDate(`${year}.`);
    setEventTitle('');
    setEventDesc('');
    setEventTag('정기 행사');
    setIsEventModalOpen(true);
  };

  const handleOpenEditEventModal = (year, event) => {
    setEditingEventYear(year);
    setEditingEvent(event);
    setEventDate(event.date);
    setEventTitle(event.title);
    setEventDesc(event.desc);
    setEventTag(event.tag || '');
    setIsEventModalOpen(true);
  };

  const handleSaveEvent = (e) => {
    e.preventDefault();
    if (!eventTitle.trim()) {
      alert('연혁 사건 제목을 입력해주세요.');
      return;
    }

    const updatedMilestones = milestones.map((m) => {
      if (m.year === editingEventYear) {
        let updatedEvents;
        if (editingEvent) {
          updatedEvents = m.events.map((ev) =>
            ev.id === editingEvent.id
              ? { ...ev, date: eventDate, title: eventTitle, desc: eventDesc, tag: eventTag }
              : ev
          );
        } else {
          const newEvent = {
            id: `ev-${Date.now()}`,
            date: eventDate,
            title: eventTitle,
            desc: eventDesc,
            tag: eventTag,
          };
          updatedEvents = [newEvent, ...m.events];
        }
        return { ...m, events: updatedEvents };
      }
      return m;
    });

    setMilestones(updatedMilestones);
    persistSiteData(updatedMilestones, faculty, speech);
    setIsEventModalOpen(false);
    showNotification('연혁 항목이 성공적으로 저장되었습니다.');
  };

  const handleDeleteEvent = (year, eventId) => {
    if (window.confirm('이 연혁 항목을 삭제하시겠습니까?')) {
      const updatedMilestones = milestones.map((m) => {
        if (m.year === year) {
          return {
            ...m,
            events: m.events.filter((ev) => ev.id !== eventId),
          };
        }
        return m;
      });
      setMilestones(updatedMilestones);
      persistSiteData(updatedMilestones, faculty, speech);
      showNotification('연혁 항목이 삭제되었습니다.');
    }
  };

  const handleAddYearMilestone = () => {
    const inputYear = window.prompt('추가할 연도를 4자리 숫자로 입력하세요 (예: 2027):');
    if (!inputYear || !inputYear.trim()) return;
    const yearStr = inputYear.trim();
    if (milestones.some((m) => m.year === yearStr)) {
      alert('이미 존재하는 연도입니다.');
      return;
    }

    const newYearItem = {
      year: yearStr,
      badge: '신규 사업 확장',
      badgeColor: 'bg-emerald-900 text-emerald-200',
      events: [
        {
          id: `ev-${Date.now()}`,
          date: `${yearStr}.01`,
          title: `${yearStr}년 사업 계획 개시`,
          desc: '사단법인 한국외식창업교육원 주요 사업 추진',
          tag: '사업 계획',
        },
      ],
    };

    const updatedMilestones = [newYearItem, ...milestones];
    setMilestones(updatedMilestones);
    persistSiteData(updatedMilestones, faculty, speech);
    showNotification(`${yearStr}년 연혁 섹션이 추가되었습니다.`);
  };

  // --- Faculty Handlers ---
  const handleOpenAddFacultyModal = () => {
    setEditingFacultyMember(null);
    setFacultyName('');
    setFacultyRole('');
    setFacultyTitle('');
    setFacultyBadge('전문 교수진');
    setFacultyImage('/images/dir_1.jpg');
    setFacultyIntro('');
    setFacultyHighlightsStr('');
    setIsFacultyModalOpen(true);
  };

  const handleOpenEditFacultyModal = (member) => {
    setEditingFacultyMember(member);
    setFacultyName(member.name);
    setFacultyRole(member.role);
    setFacultyTitle(member.title);
    setFacultyBadge(member.badge || '');
    setFacultyImage(member.image || '/images/dir_1.jpg');
    setFacultyIntro(member.intro || '');
    setFacultyHighlightsStr((member.highlights || []).join('\n'));
    setIsFacultyModalOpen(true);
  };

  const handleSaveFaculty = (e) => {
    e.preventDefault();
    if (!facultyName.trim()) {
      alert('교수진 성함을 입력해주세요.');
      return;
    }

    const highlightsArr = facultyHighlightsStr
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    let updatedFaculty;
    if (editingFacultyMember) {
      updatedFaculty = faculty.map((f) =>
        f.id === editingFacultyMember.id
          ? {
              ...f,
              name: facultyName.trim(),
              role: facultyRole.trim(),
              title: facultyTitle.trim(),
              badge: facultyBadge.trim(),
              image: facultyImage.trim(),
              intro: facultyIntro.trim(),
              highlights: highlightsArr,
            }
          : f
      );
      showNotification('교수진 정보가 수정되었습니다.');
    } else {
      const newMember = {
        id: `prof-${Date.now()}`,
        name: facultyName.trim(),
        role: facultyRole.trim(),
        title: facultyTitle.trim(),
        badge: facultyBadge.trim() || '전문 교수진',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
        image: facultyImage.trim() || '/images/dir_1.jpg',
        intro: facultyIntro.trim(),
        highlights: highlightsArr,
      };
      updatedFaculty = [...faculty, newMember];
      showNotification('새 교수진이 성공적으로 등록되었습니다.');
    }

    setFaculty(updatedFaculty);
    persistSiteData(milestones, updatedFaculty, speech);
    setIsFacultyModalOpen(false);
  };

  const handleDeleteFaculty = (id) => {
    if (window.confirm('정말 이 교수진 정보를 삭제하시겠습니까?')) {
      const updatedFaculty = faculty.filter((f) => f.id !== id);
      setFaculty(updatedFaculty);
      persistSiteData(milestones, updatedFaculty, speech);
      showNotification('교수진 정보가 삭제되었습니다.');
    }
  };

  // --- Speech Handlers ---
  const handleSaveSpeech = (e) => {
    e.preventDefault();
    persistSiteData(milestones, faculty, speech);
    showNotification('이사장 인사말 및 비전 설정이 저장되었습니다.');
  };

  return (
    <div className="space-y-6 animate-fadeIn font-sans text-gray-900 max-w-7xl mx-auto pb-12">
      
      {/* Top Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black">
              INSTITUTION ABOUT CONTROL
            </span>
          </div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
            <span>교육원 소개 & 주요 연혁 & 교수진 관리</span>
          </h2>
          <p className="text-xs text-gray-500">
            사단법인의 발자취 연혁(Milestones), 명문 교수진 프로필, 그리고 이사장 인사말을 실시간으로 관리합니다.
          </p>
        </div>

        {/* Tab Toggle Buttons */}
        <div className="flex items-center gap-1.5 bg-gray-100 p-1.5 rounded-2xl border border-gray-200 self-start md:self-auto">
          <button
            onClick={() => handleTabSwitch('history')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
              activeTab === 'history'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            주요 연혁 관리
          </button>
          <button
            onClick={() => handleTabSwitch('faculty')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
              activeTab === 'faculty'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            교수진 소개 관리
          </button>
          <button
            onClick={() => handleTabSwitch('speech')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
              activeTab === 'speech'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            이사장 인사말 관리
          </button>
        </div>
      </div>

      {/* Toast Notification */}
      {savedSuccessMsg && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 px-4 py-3 rounded-2xl text-xs font-black flex items-center gap-2 shadow-sm animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{savedSuccessMsg}</span>
        </div>
      )}

      {/* TAB 1: HISTORY MILESTONES */}
      {activeTab === 'history' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500">
              연도별 공식 설립 및 발전 연혁 목록 ({milestones.length}개 연도)
            </span>
            <button
              onClick={handleAddYearMilestone}
              className="px-3.5 py-2 bg-gray-900 hover:bg-black text-white text-xs font-black rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>새 연도 추가</span>
            </button>
          </div>

          <div className="space-y-6">
            {milestones.map((m) => (
              <div
                key={m.year}
                className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs space-y-4"
              >
                {/* Year Header */}
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-black text-gray-900 font-serif">
                      {m.year}년
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${m.badgeColor || 'bg-gray-100 text-gray-800'}`}>
                      {m.badge || '주요 연혁'}
                    </span>
                  </div>

                  <button
                    onClick={() => handleOpenAddEventModal(m.year)}
                    className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold rounded-xl transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{m.year}년 연혁 추가</span>
                  </button>
                </div>

                {/* Events List */}
                <div className="divide-y divide-gray-100">
                  {m.events.map((event) => (
                    <div
                      key={event.id}
                      className="py-3 flex flex-col sm:flex-row sm:items-start justify-between gap-3 group hover:bg-gray-50/60 p-2 rounded-xl transition-colors"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                            {event.date}
                          </span>
                          {event.tag && (
                            <span className="text-[11px] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                              {event.tag}
                            </span>
                          )}
                          <h4 className="text-sm font-bold text-gray-900">
                            {event.title}
                          </h4>
                        </div>
                        <p className="text-xs text-gray-500 leading-relaxed pl-1">
                          {event.desc}
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5 self-end sm:self-center shrink-0">
                        <button
                          onClick={() => handleOpenEditEventModal(m.year, event)}
                          className="p-1.5 text-gray-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
                          title="수정"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteEvent(m.year, event.id)}
                          className="p-1.5 text-gray-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                          title="삭제"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: FACULTY MEMBERS */}
      {activeTab === 'faculty' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500">
              사단법인 명문 교수진 & 전문 자문단 ({faculty.length}명)
            </span>
            <button
              onClick={handleOpenAddFacultyModal}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>새 교수진 등록</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faculty.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs flex flex-col justify-between space-y-4 hover:border-emerald-500 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={member.image || '/images/dir_1.jpg'}
                    alt={member.name}
                    className="w-20 h-24 rounded-2xl object-cover border border-gray-200 shadow-xs shrink-0 bg-stone-100"
                    onError={(e) => {
                      e.target.src = '/images/dir_1.jpg';
                    }}
                  />
                  <div className="space-y-1">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${member.badgeColor || 'bg-amber-100 text-amber-900'}`}>
                      {member.badge || '전문 교수진'}
                    </span>
                    <h3 className="text-lg font-black text-gray-900">
                      {member.name}{' '}
                      <span className="text-xs font-bold text-gray-500">
                        {member.role}
                      </span>
                    </h3>
                    <p className="text-xs text-gray-600 line-clamp-1">
                      {member.title}
                    </p>
                    <p className="text-[11px] text-gray-500 line-clamp-2 mt-1">
                      {member.intro}
                    </p>
                  </div>
                </div>

                {member.highlights && member.highlights.length > 0 && (
                  <div className="bg-gray-50 p-3 rounded-2xl space-y-1 text-[11px] text-gray-600">
                    <span className="font-bold text-gray-800 block text-[10px] uppercase">
                      주요 약력
                    </span>
                    <ul className="list-disc list-inside space-y-0.5">
                      {member.highlights.slice(0, 3).map((hl, i) => (
                        <li key={i} className="line-clamp-1">
                          {hl}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100">
                  <button
                    onClick={() => handleOpenEditFacultyModal(member)}
                    className="px-3 py-1.5 bg-gray-100 hover:bg-emerald-50 text-gray-700 hover:text-emerald-800 text-xs font-bold rounded-xl transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>수정</span>
                  </button>
                  <button
                    onClick={() => handleDeleteFaculty(member.id)}
                    className="px-3 py-1.5 bg-gray-100 hover:bg-rose-50 text-gray-700 hover:text-rose-700 text-xs font-bold rounded-xl transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>삭제</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: SPEECH & VISION */}
      {activeTab === 'speech' && (
        <form onSubmit={handleSaveSpeech} className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
          <div className="border-b border-gray-100 pb-4">
            <h3 className="text-lg font-black text-gray-900">
              이사장 인사말 & 대표 약력 설정
            </h3>
            <p className="text-xs text-gray-500">
              교육원 소개 &gt; 이사장 인사말 탭에 표시되는 공식 메시지와 직함을 편집합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-black text-gray-700">인사말 핵심 헤드라인 타이틀</label>
              <input
                type="text"
                value={speech.title}
                onChange={(e) => setSpeech({ ...speech, title: e.target.value })}
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2.5 text-xs font-bold text-gray-900 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-black text-gray-700">이사장 공식 인용구 (Quote)</label>
              <textarea
                rows={3}
                value={speech.quote}
                onChange={(e) => setSpeech({ ...speech, quote: e.target.value })}
                className="w-full bg-gray-50 border border-gray-300 rounded-xl p-3 text-xs font-bold text-gray-900 focus:outline-none focus:border-emerald-500 leading-relaxed"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-black text-gray-700">대표자(이사장) 성함</label>
              <input
                type="text"
                value={speech.chairmanName}
                onChange={(e) => setSpeech({ ...speech, chairmanName: e.target.value })}
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2 text-xs font-bold text-gray-900 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-black text-gray-700">공식 직함</label>
              <input
                type="text"
                value={speech.chairmanTitle}
                onChange={(e) => setSpeech({ ...speech, chairmanTitle: e.target.value })}
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2 text-xs font-bold text-gray-900 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-black text-gray-700">대표 사진 이미지 경로/URL</label>
              <input
                type="text"
                value={speech.image}
                onChange={(e) => setSpeech({ ...speech, image: e.target.value })}
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2 text-xs font-bold text-gray-900 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="flex items-center justify-end pt-4 border-t border-gray-100">
            <button
              type="submit"
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>인사말 설정 저장</span>
            </button>
          </div>
        </form>
      )}

      {/* EVENT MODAL */}
      {isEventModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setIsEventModalOpen(false)}
        >
          <div
            className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-gray-200 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-gray-200 pb-3">
              <h3 className="text-base font-black text-gray-900">
                {editingEvent ? `${editingEventYear}년 연혁 수정` : `${editingEventYear}년 새 연혁 등록`}
              </h3>
              <button
                onClick={() => setIsEventModalOpen(false)}
                className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveEvent} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700">발생 일자</label>
                  <input
                    type="text"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    placeholder="예: 2026.10"
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 text-xs font-bold text-gray-900 focus:outline-none focus:border-emerald-500"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700">태그 분류</label>
                  <input
                    type="text"
                    value={eventTag}
                    onChange={(e) => setEventTag(e.target.value)}
                    placeholder="예: 정기 시상식, 산학 MOU"
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 text-xs font-bold text-gray-900 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">연혁 제목</label>
                <input
                  type="text"
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  placeholder="예: 대한민국 자랑스러운 외식 명인 시상식 개최"
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 text-xs font-bold text-gray-900 focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">상세 설명</label>
                <textarea
                  rows={3}
                  value={eventDesc}
                  onChange={(e) => setEventDesc(e.target.value)}
                  placeholder="연혁에 대한 상세 내용을 입력하세요..."
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl p-3 text-xs font-medium text-gray-900 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsEventModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 text-xs font-bold rounded-xl text-gray-700 hover:bg-gray-100"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black rounded-xl shadow-xs"
                >
                  저장
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* FACULTY MODAL */}
      {isFacultyModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setIsFacultyModalOpen(false)}
        >
          <div
            className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-gray-200 space-y-4 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-gray-200 pb-3">
              <h3 className="text-base font-black text-gray-900">
                {editingFacultyMember ? '교수진 프로필 수정' : '새 교수진 등록'}
              </h3>
              <button
                onClick={() => setIsFacultyModalOpen(false)}
                className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveFaculty} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700">성함</label>
                  <input
                    type="text"
                    value={facultyName}
                    onChange={(e) => setFacultyName(e.target.value)}
                    placeholder="예: 진익준"
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 text-xs font-bold text-gray-900 focus:outline-none focus:border-emerald-500"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700">뱃지 표기</label>
                  <input
                    type="text"
                    value={facultyBadge}
                    onChange={(e) => setFacultyBadge(e.target.value)}
                    placeholder="예: 외식 상권 석학"
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 text-xs font-bold text-gray-900 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">역할 / 보직</label>
                <input
                  type="text"
                  value={facultyRole}
                  onChange={(e) => setFacultyRole(e.target.value)}
                  placeholder="예: 외식 공간디자인 & 상권분석 전담교수"
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 text-xs font-bold text-gray-900 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">소속 / 공식 직함</label>
                <input
                  type="text"
                  value={facultyTitle}
                  onChange={(e) => setFacultyTitle(e.target.value)}
                  placeholder="예: 브랜드경험디자인연구소 대표 / 청운대학교 겸임교수"
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 text-xs font-bold text-gray-900 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">사진 이미지 경로</label>
                <input
                  type="text"
                  value={facultyImage}
                  onChange={(e) => setFacultyImage(e.target.value)}
                  placeholder="예: /images/dir_1.jpg"
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 text-xs font-bold text-gray-900 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">교수 소개글</label>
                <textarea
                  rows={3}
                  value={facultyIntro}
                  onChange={(e) => setFacultyIntro(e.target.value)}
                  placeholder="교수진에 대한 소개 내용을 입력하세요..."
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl p-3 text-xs font-medium text-gray-900 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">주요 약력 (한 줄에 하나씩 입력)</label>
                <textarea
                  rows={4}
                  value={facultyHighlightsStr}
                  onChange={(e) => setFacultyHighlightsStr(e.target.value)}
                  placeholder="세종대학교 대학원 조리·외식경영학 박사과정&#10;청운대학교 겸임교수&#10;한국외식창업교육원 자문위원"
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl p-3 text-xs font-medium text-gray-900 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsFacultyModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 text-xs font-bold rounded-xl text-gray-700 hover:bg-gray-100"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black rounded-xl shadow-xs"
                >
                  저장
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
