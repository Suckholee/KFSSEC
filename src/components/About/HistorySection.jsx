import React, { useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import ScrollReveal from '../common/ScrollReveal';
import {
  Calendar,
  Award,
  Building2,
  Handshake,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  TrendingUp,
  Landmark,
  ShieldCheck,
  Edit3,
  Plus,
  Trash2,
  Save,
  X,
} from 'lucide-react';
import EditableText from '../Admin/InlineEditor/EditableText';
import { useAdminEdit } from '../../context/AdminEditContext';

export default function HistorySection({ milestones: propMilestones }) {
  const { t } = useLanguage();
  const { isEditMode, siteDraft, updateSiteDraft } = useAdminEdit();

  const defaultMilestones = [
    {
      year: '2026',
      badge: '도약과 결실',
      badgeColor: 'bg-[#C5A059] text-stone-950 font-black',
      events: [
        {
          date: '2026.10',
          title: t('대한민국 자랑스러운 외식 명인·명장 인물대상 시상식 개최 (10월 19일)'),
          desc: t('외식 산업 발전 및 한식 세계화에 기여한 전국 명장·명인을 발굴하여 공식 인증패 및 인물대상 수여'),
          tag: '정기 시상식',
        },
        {
          date: '2026.08',
          title: t('외식창업 수강생 128명 돌파 및 N:N 매칭 포트폴리오 시스템 도입'),
          desc: t('수강생 1인이 다수의 조리/창업 커리큘럼을 연계 이수하고 정책자금 지원과 1:1 창업 코칭을 받는 선진 학사 체계 완성'),
          tag: '교육 혁신',
        },
        {
          date: '2026.03',
          title: t('소믈리에 파티컨설턴트 및 푸드테크 설계사 1·2급 자격 과정 정식 론칭'),
          desc: t('외식 트렌드 변화에 발맞춘 신개념 융합 전문 자격 검정 체계 구축'),
          tag: '자격 신설',
        },
      ],
    },
    {
      year: '2025',
      badge: '전국 확장',
      badgeColor: 'bg-[#2B7752] text-white border border-[#85CFAB]/40',
      events: [
        {
          date: '2025.09',
          title: t('제01회 K-FOOD 지역 특산물 연계 조리 경연대회 주관'),
          desc: t('지역 농수축산물 소비 활성화를 위한 전국 단위 창작 요리 경연 대회 성공적 개최'),
          tag: '요리대회',
        },
        {
          date: '2025.04',
          title: t('한국음식능력(K-FOOD) 1·2급 및 외식창업실무사 1·2급 검정 확대 인가'),
          desc: t('농림축산식품부 등록 민간자격 기준에 따른 현장 실기 중심 검정 라인업 완성'),
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
          date: '2024.06',
          title: t('강남구 및 전국 지자체 소상공인 외식창업 경영개선 현장 컨설팅 협약'),
          desc: t('골목상권 활성화 및 예비·청년 창업가를 위한 지자체 연계 맞춤형 밀착 컨설팅 시행'),
          tag: '지자체 협력',
        },
        {
          date: '2024.02',
          title: t('2024 한국외식창업교육원 정기총회 개최 및 아시아창의방송(actv) 언론 보도'),
          desc: t('안형상 이사장 "100세 초고령 시대 맞춤형 교육을 통한 글로벌 K-FOOD 시대 개막" 비전 선포 및 대외 언론 보도'),
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
          date: '2023.07',
          title: t('10대 산학 협력업체 전략적 업무협약(MOU) 체결'),
          desc: t('(주)주방뱅크, (주)세진, (주)비엠스 인터내셔날, (주)자인 등 외식 인프라 1위 기업들과 설비·위생·식자재 상생 네트워크 구축'),
          tag: '산학 MOU',
        },
        {
          date: '2023.03',
          title: t('외식창업지도사 1·2급 자격 과정 개시 및 1:1 도제식 전수 교육장 완공'),
          desc: t('강남 테헤란로 본원 실습실 개설 및 최고급 조리 설비 확충'),
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
          date: '2022.07.12',
          title: t('사단법인 한국외식창업교육원 창립 및 비영리 사단법인 설립 허가'),
          desc: t('[민법] 제32조 및 농림축산식품부 소관 비영리법인의 설립 및 감독에 관한 규칙 제5조에 의거 공식 비영리 사단법인 설립 인가'),
          tag: '법인 설립',
        },
        {
          date: '2022.08',
          title: t('안형상 초대 이사장 취임 및 교육원 12대 핵심 추진 방향 선포'),
          desc: t('40년 경력의 조리명장 중심 실전형 외식 창업 인재 양성 목표 수립'),
          tag: '이사장 취임',
        },
      ],
    },
  ];

  const milestones = siteDraft?.history && siteDraft.history.length > 0
    ? siteDraft.history
    : (propMilestones && propMilestones.length > 0 ? propMilestones : defaultMilestones);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    year: '2026',
    date: '2026.11',
    tag: '신규 행사',
    title: '',
    desc: '',
  });

  const handleAddEvent = (e) => {
    e.preventDefault();
    if (!newEvent.title.trim()) {
      alert('연혁 사건 제목을 입력해주세요.');
      return;
    }

    const updated = JSON.parse(JSON.stringify(milestones));
    let targetYear = updated.find(m => m.year === newEvent.year);
    if (!targetYear) {
      targetYear = {
        year: newEvent.year,
        badge: '주요 성과',
        badgeColor: 'bg-[#C5A059] text-stone-950 font-black',
        events: [],
      };
      updated.unshift(targetYear);
      updated.sort((a, b) => Number(b.year) - Number(a.year));
    }

    targetYear.events.unshift({
      date: newEvent.date,
      tag: newEvent.tag,
      title: newEvent.title,
      desc: newEvent.desc,
    });

    if (updateSiteDraft) {
      updateSiteDraft(prev => ({
        ...prev,
        history: updated,
      }));
    }

    setIsAddModalOpen(false);
    setNewEvent({
      year: '2026',
      date: '2026.11',
      tag: '신규 행사',
      title: '',
      desc: '',
    });
  };

  const handleDeleteEvent = (yearIndex, eventIndex) => {
    if (!window.confirm('이 연혁 사건을 삭제하시겠습니까?')) return;
    const updated = JSON.parse(JSON.stringify(milestones));
    updated[yearIndex].events.splice(eventIndex, 1);
    if (updated[yearIndex].events.length === 0) {
      updated.splice(yearIndex, 1);
    }
    if (updateSiteDraft) {
      updateSiteDraft(prev => ({
        ...prev,
        history: updated,
      }));
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn w-full">
      {/* Admin Quick Editor Header Banner */}
      {isEditMode && (
        <div className="bg-gradient-to-r from-[#1B5238] via-[#266847] to-[#34885E] text-white p-4 sm:p-5 rounded-2xl border border-[#85CFAB]/50 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="p-2.5 bg-white/10 text-[#A7F3D0] rounded-xl border border-white/20">
              <Calendar className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-[#A7F3D0] uppercase tracking-wider">
                  주요 연혁 인라인 편집 모드
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-400/20 text-emerald-200 text-[10px] font-bold">
                  실시간 연동
                </span>
              </div>
              <p className="text-xs sm:text-sm text-gray-200 font-medium mt-0.5">
                화면의 연혁 날짜, 태그, 제목, 설명글을 직접 클릭해 수정하거나, 새 연혁 사건을 추가할 수 있습니다.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="px-5 py-2.5 bg-white hover:bg-[#F2FAF5] text-[#1E5D3B] font-black text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center gap-2 shrink-0 cursor-pointer hover:scale-102"
          >
            <Plus className="w-4 h-4" />
            <span>➕ 새 연혁 사건 등록</span>
          </button>
        </div>
      )}

      {/* Header Banner */}
      <div className="relative bg-gradient-to-br from-[#1E5B3C] via-[#2A7550] to-[#388C61] text-white rounded-3xl p-6 sm:p-10 border border-[#85CFAB]/50 shadow-xl overflow-hidden">
        <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-[#A7F3D0]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/15 border border-white/25 text-[#A7F3D0] text-xs font-black">
            <Calendar className="w-3.5 h-3.5" />
            <span>KFSSEC HISTORY</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight font-serif text-white">
            <EditableText path="historyTitle" value={siteDraft?.historyTitle || t('주요 연혁')} />
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100/90 font-medium max-w-2xl leading-relaxed">
            <EditableText
              multiline
              path="historySubtitle"
              value={siteDraft?.historySubtitle || t('사단법인 한국외식창업교육원의 설립 이래 발전 과정과 대외 협력 성과를 담은 공식 연혁입니다.')}
            />
          </p>
        </div>
      </div>

      {/* Interactive Timeline List */}
      <div className="relative border-l-2 border-[#BEDECB] ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
        {milestones.map((milestone, mIdx) => (
          <ScrollReveal key={milestone.year || mIdx} direction="up" delay={mIdx * 80}>
            <div className="relative space-y-6">
              {/* Year Marker Pin */}
              <div className="absolute -left-[35px] sm:-left-[51px] top-0 flex items-center justify-center">
                <div className="w-6 h-6 rounded-full bg-[#2B7752] border-4 border-[#A7F3D0] shadow-md flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                </div>
              </div>

              {/* Year Header */}
              <div className="flex items-center gap-3">
                <span className="text-3xl sm:text-4xl font-black text-[#2B7752] tracking-tight font-serif">
                  <EditableText path={`history.${mIdx}.year`} value={milestone.year} />
                </span>
                <span
                  className={`text-xs px-3 py-1 rounded-full font-bold shadow-xs ${milestone.badgeColor || 'bg-stone-800 text-stone-200'}`}
                >
                  <EditableText path={`history.${mIdx}.badge`} value={milestone.badge} />
                </span>
              </div>

              {/* Event Cards Grid */}
              <div className="grid grid-cols-1 gap-4">
                {(milestone.events || []).map((evt, eIdx) => {
                  return (
                    <div
                      key={eIdx}
                      className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm hover:shadow-md hover:border-[#34885E] transition-all flex flex-col sm:flex-row sm:items-start justify-between gap-4 group relative"
                    >
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-10 h-10 rounded-xl bg-[#F2FAF5] text-[#2B7752] border border-[#D0E7DA] flex items-center justify-center shrink-0 group-hover:bg-[#2B7752] group-hover:text-white transition-colors mt-0.5">
                          <Award className="w-5 h-5" />
                        </div>
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-black text-[#2B7752]">
                              <EditableText path={`history.${mIdx}.events.${eIdx}.date`} value={evt.date} />
                            </span>
                            <span className="text-[11px] font-bold px-2 py-0.5 bg-stone-100 text-stone-600 rounded-md">
                              <EditableText path={`history.${mIdx}.events.${eIdx}.tag`} value={evt.tag} />
                            </span>
                          </div>
                          <h4 className="text-base font-black text-gray-900 group-hover:text-[#2B7752] transition-colors">
                            <EditableText path={`history.${mIdx}.events.${eIdx}.title`} value={evt.title} />
                          </h4>
                          <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed">
                            <EditableText multiline path={`history.${mIdx}.events.${eIdx}.desc`} value={evt.desc} />
                          </p>
                        </div>
                      </div>

                      {/* Delete Event Button for Admins */}
                      {isEditMode && (
                        <button
                          type="button"
                          onClick={() => handleDeleteEvent(mIdx, eIdx)}
                          className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-600 p-2 rounded-lg hover:bg-red-50 transition cursor-pointer self-start"
                          title="이 연혁 삭제"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Add New Milestone Event Modal */}
      {isAddModalOpen && (
        <div
          onClick={() => setIsAddModalOpen(false)}
          className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl shadow-2xl border border-gray-200 w-full max-w-lg overflow-hidden text-gray-900"
          >
            <div className="px-6 py-4 bg-gradient-to-r from-[#1B5238] via-[#266847] to-[#34885E] text-white flex items-center justify-between border-b border-[#85CFAB]/40">
              <div className="flex items-center gap-2.5">
                <Calendar className="w-5 h-5 text-[#A7F3D0]" />
                <h3 className="text-base font-black text-white">새 연혁 사건 추가</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 text-gray-300 hover:text-white rounded-lg transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddEvent} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-black text-gray-700">연도 (Year)</label>
                  <input
                    type="text"
                    value={newEvent.year}
                    onChange={(e) => setNewEvent({ ...newEvent, year: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl font-bold focus:outline-none focus:border-[#2B7752] focus:ring-1 focus:ring-[#85CFAB]"
                    placeholder="2026"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-black text-gray-700">날짜 (Date)</label>
                  <input
                    type="text"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl font-bold focus:outline-none focus:border-[#2B7752] focus:ring-1 focus:ring-[#85CFAB]"
                    placeholder="2026.11"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-black text-gray-700">분류 태그 (Tag)</label>
                <input
                  type="text"
                  value={newEvent.tag}
                  onChange={(e) => setNewEvent({ ...newEvent, tag: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl font-bold focus:outline-none focus:border-[#2B7752] focus:ring-1 focus:ring-[#85CFAB]"
                  placeholder="정기 행사 / 산학 MOU / 자격 신설 등"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-black text-gray-700">연혁 사건 제목</label>
                <input
                  type="text"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl font-bold focus:outline-none focus:border-[#2B7752] focus:ring-1 focus:ring-[#85CFAB]"
                  placeholder="사건 및 협약 제목을 입력하세요"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-black text-gray-700">상세 설명</label>
                <textarea
                  rows={3}
                  value={newEvent.desc}
                  onChange={(e) => setNewEvent({ ...newEvent, desc: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl focus:outline-none focus:border-[#2B7752] focus:ring-1 focus:ring-[#85CFAB] leading-relaxed"
                  placeholder="연혁 내용에 대한 상세 설명을 입력하세요"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-100 rounded-xl text-xs font-bold transition cursor-pointer"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#2B7752] hover:bg-[#236344] text-white rounded-xl text-xs font-black shadow-md transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>연혁 추가 완료</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
