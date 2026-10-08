import { useLanguage } from '../../i18n/LanguageContext';
import React, { useState, useEffect, useRef } from 'react';
import ScrollReveal from '../common/ScrollReveal';
import {
  Award,
  GraduationCap,
  Briefcase,
  BookOpen,
  Presentation,
  CheckCircle2,
  Scale,
  Medal,
  Star,
  Building2,
  BookmarkCheck,
  Edit3,
  Camera,
  Upload,
  Link as LinkIcon,
  X,
  Save,
  Check,
  Sparkles,
  User,
  Quote,
  Target,
  FileText,
  ArrowRight,
} from 'lucide-react';
import EditableText from '../Admin/InlineEditor/EditableText';
import EditableImage from '../Admin/InlineEditor/EditableImage';
import { useAdminEdit } from '../../context/AdminEditContext';

const DEFAULT_SPEECH = {
  visionBadge: 'GREETINGS & VISION',
  visionTitle: '" 미래를 선도하는\n외식산업의 동반자, 한국외식창업교육원 "',
  image: '/images/chairman_ahn_real.jpg?v=2',
  orgName: '사단법인 한국외식창업교육원',
  chairmanTitle: '이사장 안형상',
  chairmanName: '이사장 안형상',
  title: '안녕하십니까? 사단법인 한국외식창업교육원 이사장 안형상입니다.',
  p1: '먼저 저희 한국외식창업교육원 홈페이지를 방문해 주신 여러분께 깊은 감사의 말씀을 전합니다.',
  p2: '외식산업은 단순히 먹거리를 제공하는 것을 넘어, 사람들의 삶에 풍요와 행복을 더하며, 문화와 가치를 창출하는 중요한 산업으로 자리 잡았습니다. 급변하는 시대 속에서 외식산업은 창의성과 혁신, 그리고 진정성을 요구받고 있으며, 이러한 변화는 무한한 가능성과 도전의 기회를 열어주고 있습니다.',
  p3: '사단법인 한국외식창업교육원은 "미래를 선도하는 외식산업의 동반자"라는 사명을 바탕으로, 창업을 준비하시는 분들과 현업에서 활동하고 계신 분들께 실질적이고 미래 지향적인 교육을 제공하기 위해 최선을 다하고 있습니다.',
  p4: '우리는 여러분의 꿈과 비전을 실현할 수 있도록 든든한 동반자로 함께하며, 지속 가능한 외식산업 생태계를 구축하기 위해 노력하고 있습니다.',
  goalsTitle: 'I. 교육원의 운영 목표',
  goalsSubtitle: '다음과 같은 세 가지 핵심 목표를 중심으로 운영되고 있습니다.',
  goal1Title: '1. 미래지향적 교육',
  goal1Desc: '급변하는 외식산업 트렌드와 기술을 반영한 실용적인 교육을 통해 시대가 요구하는 역량을 갖춘 인재를 양성합니다.',
  goal2Title: '2. 실전 중심의 통합 솔루션',
  goal2Desc: '창업의 첫걸음부터 안정적인 정착에 이르기까지 컨설팅, 멘토링, 마케팅 지원 등 외식 창업 전 과정에 필요한 종합적인 솔루션을 제공합니다.',
  goal3Title: '3. 상생과 협력의 네트워크',
  goal3Desc: '창업자, 소상공인, 그리고 관련 기관 간의 긴밀한 협력 체계를 구축하여 외식산업 전반의 경쟁력을 높이고 지역사회 발전에 기여합니다.',
  closingTitle: 'II. 맺음말',
  closing1: '외식업은 지속적인 도전과 열정을 필요로 하는 영역입니다. 하지만 올바른 길을 제시하고 함께 고민해 주는 파트너가 있다면, 도전은 더 이상 두려움이 아닌 성공의 시작이 될 것입니다.',
  closing2: '한국외식창업교육원은 여러분의 열정이 결실을 맺을 수 있도록 늘 곁에서 최고의 교육과 지원을 아끼지 않을 것을 약속드립니다.',
  closing3: '여러분의 원대한 꿈과 도전이 이곳 한국외식창업교육원에서 시작되기를 진심으로 응원합니다.',
  closingThanks: '감사합니다.',
  signOrg: '사단법인 한국외식창업교육원',
  signName: '이사장 안 형 상',
};

export default function GreetingsSection({ viewMode = 'all', speech, onNavigate }) {
  const { t } = useLanguage();
  const { isEditMode, siteDraft, updateSiteDraft } = useAdminEdit();

  const currentSpeech = {
    ...DEFAULT_SPEECH,
    ...(siteDraft?.speech || speech || {}),
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState('basic'); // basic, speech, goals, closing
  const [formData, setFormData] = useState(currentSpeech);
  const [uploadLoading, setUploadLoading] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setFormData({
      ...DEFAULT_SPEECH,
      ...(siteDraft?.speech || speech || {}),
    });
  }, [siteDraft?.speech, speech]);

  // Listen to open-speech-modal event from SectorBlock toolbar or elsewhere
  useEffect(() => {
    const handleOpen = () => {
      setFormData({
        ...DEFAULT_SPEECH,
        ...(siteDraft?.speech || speech || {}),
      });
      setIsModalOpen(true);
    };
    window.addEventListener('kfssec:open-speech-modal', handleOpen);
    return () => window.removeEventListener('kfssec:open-speech-modal', handleOpen);
  }, [siteDraft?.speech, speech]);

  const handleImageFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('이미지 파일 크기는 5MB 이하여야 합니다.');
      return;
    }

    setUploadLoading(true);
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const base64Data = reader.result;
        try {
          const res = await fetch('/api/upload', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ imageBase64: base64Data, fileName: file.name }),
          });
          const data = await res.json();
          if (res.ok && data.url) {
            setFormData(prev => ({ ...prev, image: data.url }));
            setUploadLoading(false);
            return;
          }
        } catch {
          // ignore, fallback
        }
        setFormData(prev => ({ ...prev, image: base64Data }));
      } finally {
        setUploadLoading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveModal = (e) => {
    e.preventDefault();
    if (updateSiteDraft) {
      updateSiteDraft(prev => ({
        ...prev,
        speech: formData,
      }));
    }
    setIsModalOpen(false);
  };

  const highlightPoints = [
    {
      num: '1',
      title: t("실무중심의 전문 교육"),
      desc: t("이론에 그치지 않고 현장에 즉시 적용할 수 있는 실전 노하우를 교육합니다."),
    },
    {
      num: '2',
      title: t("맞춤형 컨설팅"),
      desc: t("예비 창업자의 입지, 예산, 브랜드 콘셉트에 맞춘 1:1 밀착 솔루션을 제공합니다."),
    },
    {
      num: '3',
      title: t("품질 및 위생관리 시스템"),
      desc: t("신뢰할 수 있는 매장 운영을 위해 최고 수준의 품질 및 위생 관리 기준을 전수합니다."),
    },
    {
      num: '4',
      title: t("지속적인 사후관리 지원"),
      desc: t("단순 교육에 그치지 않고 창업 후 지속적인 경영 개선과 모니터링을 함께합니다."),
    },
  ];

  const profileCards = [
    {
      id: '01',
      title: t("명인 & 국가공인 자격"),
      subtitle: 'Official Master & Craftsman Certification',
      icon: Medal,
      items: [
        t("문화체육관광부 조리명인 (제8대) 선정"),
        t("한국산업인력공단 국가공인 조리기능장 (제80회)"),
        t("한국산업인력공단 조리기능장·산업기사·기능사 실기시험 심사위원 (300회 이상)"),
        t("국제기능올림픽 (지방·전국대회) 실기 심사위원 다수 위촉"),
        t("KBS TV 6시 내고향 및 공중파 요리대회 심사위원 다수 출연"),
      ],
    },
    {
      id: '02',
      title: t("특급호텔 실무 총괄 (40년)"),
      subtitle: '40 Years Luxury Hotel Career',
      icon: Briefcase,
      items: [
        t("풀만 앰버서더 호텔 (특1급) 총괄주방장"),
        t("웨스틴 조선호텔 조리 실무"),
        t("리츠칼튼호텔 조리 실무"),
        t("산피아 후쿠오카 리조트 (일본)"),
        t("쥬레스 가든 컨벤션 & 웨딩 조리 총괄"),
      ],
    },
    {
      id: '03',
      title: t("저서 집필 & 자격증 개발"),
      subtitle: 'Authored Books & Qualifications',
      icon: BookOpen,
      items: [
        t("저서 《지속가능한 K-FOOD 발전전략》 (도서출판 비엑스디)"),
        t("저서 《푸드테크 설계사》 (도서출판 비엑스디)"),
        t("저서 《고급 서양 조리 (The Professional Western Cuisine)》"),
        t("저서 《국가직무능력표준(NCS) 실무지침서 양식조리기능사》"),
        t("K-FOOD(한식검정)·외식창업지도사 1·2급·푸드테크 설계사 1·2급 자격개발"),
        t("외식경영실무사·외식경영지도사·외식조리명인·소믈리에·파티컨설턴트 자격개발"),
        t("한국외식창업교육원 자격개발·교육과정 기획 및 운영"),
        t("푸드테크 및 전문서비스 분야 인재양성을 위한 교육·자격체계 구축"),
      ],
    },
    {
      id: '04',
      title: t("정부 위촉 & 정책 자문"),
      subtitle: 'Government Advisory & Professorship',
      icon: Scale,
      items: [
        t("(사)한국소기업소상공인연합회 소기업소상공인 정책자문위원회 자문위원 (2026.05.11)"),
        t("청년상인육성재단 메뉴개발 전담교수 (2023.05.25)"),
        t("청년상인육성재단 지식기술지원단 메뉴개발 전문위원 (2020.04.27)"),
        t("청년상인 스타트업지원단장·메뉴개발 전문위원 (2019.07.04)"),
        t("여주먹자골 요리경연대회 조직위원장·지역농산물 홍보 및 대표메뉴 개발 (2023.10.28)"),
        t("제15회 서울국제푸드앤테이블웨어 박람회 심사위원 (2018.05.22)"),
      ],
    },
    {
      id: '05',
      title: t("정부 표창 & 주요 수상"),
      subtitle: 'Honors & Government Awards',
      icon: Award,
      items: [
        t("한국농수산식품유통공사 사장 표창·기후위기 대응 K-푸드 세계화 컨퍼런스 (2025.10.27)"),
        t("강원고성명태축제 요리대전 최우수상·강원특별자치도지사 (2025.10.18)"),
        t("대한민국인물대상 나눔봉사 공헌부문·시사코리아뉴스·대한노인회 (2024.07.23)"),
        t("대한노인회 교육대상 교육공헌부문 (2023.08.22)"),
        t("문화체육관광부 장관상(대상) 전통음식부문(2015) 및 건강음식부문(2014)"),
        t("서울특별시장상 대상 및 우수상 / 한국국제요리경영대회 금상"),
      ],
    },
    {
      id: '06',
      title: t("학력 & 강의 경력 20년"),
      subtitle: 'Academic Background & Lectures',
      icon: GraduationCap,
      items: [
        t("한국외식창업교육원 설립자·이사장·민간자격증 전담교수"),
        t("캐롤라인대학교 외식경영학 박사"),
        t("동의대학교 대학원 박사수료 (호텔·외식·관광)"),
        t("강릉원주대학교 대학원 박사수료 (관광·외식)"),
        t("서정대학교·창원문성대학교 외식조리과 겸임교수"),
        t("창신대학교·동의대학교·한중대학교 외식산업학과 겸임교수"),
        t("현) 글로벌외식정보 대표 기자 / (사)경남음식관광협회 전 회장"),
        t("전) 세계음식문화연구원 부산·경상남도 지회장"),
        t("전) 한국약선협회 이사·경상남도 지회장"),
      ],
    },
  ];

  const renderSpeechContent = () => (
    <>
      {/* Admin Quick Editor Banner when in Edit Mode */}
      {isEditMode && (
        <div className="mb-6 bg-gradient-to-r from-emerald-900 to-[#073822] text-white p-4 sm:p-5 rounded-2xl border-2 border-emerald-400/40 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="p-2.5 bg-emerald-500/20 text-emerald-300 rounded-xl border border-emerald-400/30">
              <Edit3 className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-emerald-300 uppercase tracking-wider">
                  이사장 인사말 인라인 편집 모드
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-400/20 text-emerald-200 text-[10px] font-bold">
                  실시간 연동
                </span>
              </div>
              <p className="text-xs sm:text-sm text-gray-200 font-medium mt-0.5">
                화면의 텍스트를 직접 클릭해 수정하거나, 사진에 마우스를 올려 바꿀 수 있습니다. 일괄 수정은 모달창을 이용하세요.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              setFormData({
                ...DEFAULT_SPEECH,
                ...(siteDraft?.speech || speech || {}),
              });
              setIsModalOpen(true);
            }}
            className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center gap-2 shrink-0 cursor-pointer hover:scale-102"
          >
            <Edit3 className="w-4 h-4" />
            <span>✍️ 인사말 & 사진 전체 폼으로 편집</span>
          </button>
        </div>
      )}

      {/* Top Green Vision Banner */}
      <ScrollReveal direction="up" delay={0}>
        <div className="relative rounded-3xl p-8 sm:p-12 text-white shadow-xl overflow-hidden bg-[#073822] border border-emerald-500/30 min-h-[220px] flex items-center">
          <div className="absolute right-0 top-0 bottom-0 w-full sm:w-[65%] h-full overflow-hidden">
            <img
              src="/images/hero_bg.jpg"
              alt={t("한국외식창업교육원 시상식 현장 비전 배경")}
              className="w-full h-full object-cover object-right opacity-90 filter contrast-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#073822] via-[#073822]/85 sm:via-[#073822]/70 to-transparent" />
          </div>

          <div className="relative z-10 max-w-2xl space-y-3">
            <span className="text-xs sm:text-sm font-black text-emerald-300 uppercase tracking-widest block drop-shadow-md">
              <EditableText
                path="speech.visionBadge"
                value={currentSpeech.visionBadge}
              />
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-black tracking-tight leading-tight text-white drop-shadow-lg">
              <EditableText
                multiline
                path="speech.visionTitle"
                value={currentSpeech.visionTitle}
              />
            </h2>
          </div>
        </div>
      </ScrollReveal>

      {/* Main Greetings Grid: Photo + Speech Body */}
      <div className="bg-white rounded-3xl p-6 sm:p-12 border border-emerald-100 shadow-sm mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Portrait Photo & Title Box */}
          <div className="lg:col-span-4 space-y-5">
            <ScrollReveal direction="right" delay={100}>
              <EditableImage
                path="speech.image"
                src={currentSpeech.image || '/images/chairman_ahn_real.jpg?v=2'}
                alt={currentSpeech.chairmanName || '안형상 이사장'}
                className="relative rounded-2xl overflow-hidden shadow-lg border border-emerald-100 bg-stone-100 aspect-[3/4]"
                imageClassName="w-full h-full object-cover object-top hover:scale-103 transition-transform duration-500"
              />
            </ScrollReveal>

            <ScrollReveal direction="right" delay={200}>
              <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200/80 space-y-1.5 shadow-xs hover:border-emerald-300 transition-colors">
                <span className="font-extrabold text-gray-900 text-lg sm:text-xl block">
                  안녕하십니까?
                </span>
                <span className="text-gray-900 font-black text-xl sm:text-2xl block leading-snug">
                  <EditableText
                    path="speech.orgName"
                    value={currentSpeech.orgName || (currentSpeech.leftOrgType ? `${currentSpeech.leftOrgType} ${currentSpeech.leftOrgName}` : '사단법인 한국외식창업교육원')}
                  />
                </span>
                <span className="text-[#0F5132] font-black text-xl sm:text-2xl block pt-1">
                  <EditableText
                    path="speech.chairmanTitle"
                    value={currentSpeech.chairmanTitle || currentSpeech.chairmanName || '이사장 안형상'}
                  />
                  <span className="text-gray-800 font-semibold text-base sm:text-lg ml-1">입니다.</span>
                </span>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Full Original Greeting Speech Text */}
          <div className="lg:col-span-8 space-y-8 text-gray-800 font-medium text-base sm:text-lg lg:text-xl leading-relaxed">
            
            {/* Opening Paragraphs */}
            <ScrollReveal direction="up" delay={150}>
              <div className="space-y-5 border-b border-gray-100 pb-8">
                <h3 className="text-2xl sm:text-3xl lg:text-3xl font-black text-gray-900 tracking-tight leading-snug">
                  <EditableText
                    multiline
                    path="speech.title"
                    value={currentSpeech.title}
                  />
                </h3>
                <p className="text-gray-900 font-bold leading-relaxed">
                  <EditableText
                    multiline
                    path="speech.p1"
                    value={currentSpeech.p1}
                  />
                </p>
                <p className="leading-relaxed">
                  <EditableText
                    multiline
                    path="speech.p2"
                    value={currentSpeech.p2}
                  />
                </p>
                <p className="leading-relaxed">
                  <EditableText
                    multiline
                    path="speech.p3"
                    value={currentSpeech.p3}
                  />
                </p>
                <p className="leading-relaxed">
                  <EditableText
                    multiline
                    path="speech.p4"
                    value={currentSpeech.p4}
                  />
                </p>
              </div>
            </ScrollReveal>

            {/* I. 교육원의 운영 목표 */}
            <ScrollReveal direction="up" delay={200}>
              <div className="space-y-4 pt-2">
                <h4 className="text-xl sm:text-2xl font-black text-gray-900 inline-block bg-emerald-100/90 text-emerald-950 px-4 py-1.5 rounded-lg">
                  <EditableText path="speech.goalsTitle" value={currentSpeech.goalsTitle} />
                </h4>
                <p className="text-sm sm:text-base text-gray-600 font-bold">
                  <EditableText path="speech.goalsSubtitle" value={currentSpeech.goalsSubtitle} />
                </p>

                <div className="space-y-4 pt-2">
                  <ScrollReveal direction="up" delay={250}>
                    <div className="bg-stone-50 p-5 sm:p-6 rounded-2xl border border-stone-200/80 space-y-2 hover:bg-emerald-50/50 hover:border-emerald-200 transition-all">
                      <h5 className="font-black text-[#0F5132] text-lg sm:text-xl">
                        <EditableText path="speech.goal1Title" value={currentSpeech.goal1Title} />
                      </h5>
                      <p className="text-sm sm:text-base text-gray-700 font-medium leading-relaxed">
                        <EditableText multiline path="speech.goal1Desc" value={currentSpeech.goal1Desc} />
                      </p>
                    </div>
                  </ScrollReveal>

                  <ScrollReveal direction="up" delay={300}>
                    <div className="bg-stone-50 p-5 sm:p-6 rounded-2xl border border-stone-200/80 space-y-2 hover:bg-emerald-50/50 hover:border-emerald-200 transition-all">
                      <h5 className="font-black text-[#0F5132] text-lg sm:text-xl">
                        <EditableText path="speech.goal2Title" value={currentSpeech.goal2Title} />
                      </h5>
                      <p className="text-sm sm:text-base text-gray-700 font-medium leading-relaxed">
                        <EditableText multiline path="speech.goal2Desc" value={currentSpeech.goal2Desc} />
                      </p>
                    </div>
                  </ScrollReveal>

                  <ScrollReveal direction="up" delay={350}>
                    <div className="bg-stone-50 p-5 sm:p-6 rounded-2xl border border-stone-200/80 space-y-2 hover:bg-emerald-50/50 hover:border-emerald-200 transition-all">
                      <h5 className="font-black text-[#0F5132] text-lg sm:text-xl">
                        <EditableText path="speech.goal3Title" value={currentSpeech.goal3Title} />
                      </h5>
                      <p className="text-sm sm:text-base text-gray-700 font-medium leading-relaxed">
                        <EditableText multiline path="speech.goal3Desc" value={currentSpeech.goal3Desc} />
                      </p>
                    </div>
                  </ScrollReveal>
                </div>
              </div>
            </ScrollReveal>

            {/* II. 맺음말 */}
            <ScrollReveal direction="up" delay={300}>
              <div className="space-y-4 pt-6 border-t border-gray-100">
                <h4 className="text-xl sm:text-2xl font-black text-gray-900 inline-block bg-emerald-100/90 text-emerald-950 px-4 py-1.5 rounded-lg">
                  <EditableText path="speech.closingTitle" value={currentSpeech.closingTitle} />
                </h4>
                <p className="leading-relaxed">
                  <EditableText multiline path="speech.closing1" value={currentSpeech.closing1} />
                </p>
                <p className="leading-relaxed">
                  <EditableText multiline path="speech.closing2" value={currentSpeech.closing2} />
                </p>
                <p className="leading-relaxed font-bold text-gray-900">
                  <EditableText multiline path="speech.closing3" value={currentSpeech.closing3} />
                </p>
                <p className="leading-relaxed pt-2 font-black text-[#0F5132]">
                  <EditableText path="speech.closingThanks" value={currentSpeech.closingThanks} />
                </p>

                <div className="pt-6 flex justify-end">
                  <div className="text-right space-y-1 bg-emerald-50/60 px-6 py-4 rounded-2xl border border-emerald-100 inline-block shadow-xs">
                    <span className="text-xs text-gray-500 font-bold block">
                      <EditableText path="speech.signOrg" value={currentSpeech.signOrg} />
                    </span>
                    <span className="text-[#0F5132] font-black text-xl sm:text-2xl">
                      <EditableText path="speech.signName" value={currentSpeech.signName} />
                    </span>
                  </div>
                </div>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </div>

      {/* Highlight 4 Core Strengths Banner */}
      <ScrollReveal direction="up" delay={100}>
        <div className="bg-[#0F5132] rounded-3xl p-8 sm:p-12 text-white space-y-8 shadow-xl mt-8">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-black text-emerald-300 tracking-widest uppercase">
              WHY CHOOSE US
            </span>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight">{t("한국외식창업교육원의 4가지 핵심 약속")}</h3>
            <p className="text-sm text-emerald-100 font-medium">{t("성공적인 외식 창업을 위해 최고의 실무진과 차별화된 프로세스를 제공합니다.")}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {highlightPoints.map((item, idx) => (
              <ScrollReveal key={item.num} direction="up" delay={150 + idx * 100}>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:bg-white/20 transition-all space-y-3 h-full">
                  <div className="w-10 h-10 rounded-xl bg-emerald-400 text-[#0F5132] font-black text-lg flex items-center justify-center shadow-md">
                    {item.num}
                  </div>
                  <h4 className="text-lg font-black text-white">{item.title}</h4>
                  <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </>
  );

  const renderProfileContent = () => (
    <div className="space-y-8 pt-2 animate-fadeIn font-sans text-gray-900">
      <ScrollReveal direction="up" delay={100}>
        <div className="border-b border-gray-200 pb-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-[#0F5132] text-xs font-black mb-2">
            <Medal className="w-3.5 h-3.5" />
            <span>40 YEARS OF DEDICATION & EXPERTISE</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">{t("안형상 이사장 프로필 & 주요 약력")}</h3>
          <p className="text-sm text-gray-600 font-medium mt-1">{t("특급호텔 40년 현장 경력과 국가 심사위원, 학술 연구를 갖춘 외식 명장의 발자취입니다.")}</p>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {profileCards.map((card, idx) => {
          const IconComp = card.icon;
          return (
            <ScrollReveal key={card.id} direction="up" delay={100 + idx * 80}>
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-emerald-100/80 shadow-sm hover:shadow-xl hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between group h-full">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#0F5132] flex items-center justify-center group-hover:bg-[#0F5132] group-hover:text-white transition-colors shadow-xs">
                        <IconComp className="w-5 h-5 stroke-[2.2]" />
                      </div>
                      <div>
                        <h4 className="text-base sm:text-lg font-black text-gray-900">
                          {card.title}
                        </h4>
                        <span className="text-[11px] font-bold text-emerald-700 tracking-wider block">
                          {card.subtitle}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-black text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg">
                      {card.id}
                    </span>
                  </div>

                  <ul className="space-y-2.5 pt-1">
                    {card.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start gap-2 text-xs sm:text-sm text-gray-700 font-semibold leading-relaxed">
                        <BookmarkCheck className="w-4 h-4 text-[#0F5132] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </div>

      {/* Link to Official Institutional MOU / Partnerships */}
      <ScrollReveal direction="up" delay={150}>
        <div className="bg-[#F0FDF4] rounded-3xl p-6 sm:p-8 border border-[#DCFCE7] shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 mt-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#14532D] to-[#15803D] text-white flex items-center justify-center shrink-0 shadow-md">
              <Building2 className="w-6 h-6 text-[#86EFAC]" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#15803D]/10 text-[#15803D] text-xs font-black mb-1">
                <span>OFFICIAL MOU ARCHIVES</span>
              </div>
              <h4 className="text-lg sm:text-xl font-black text-gray-900 tracking-tight">
                {t("사단법인 한국외식창업교육원 산학협력 & 공식 MOU 체결 현황")}
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 font-medium mt-0.5">
                {t("정부 기관, 전국 지자체 및 10대 산학 협력기업과의 업무협약(MOU) 공식 체결 현황과 사진 기록은 [파트너사] 메뉴에서 확인하실 수 있습니다.")}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onNavigate?.('partners', 'mou')}
            className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-[#EA580C] to-[#F97316] hover:from-[#C2410C] hover:to-[#EA580C] text-white font-black text-xs sm:text-sm rounded-xl shadow-md transition-all shrink-0 cursor-pointer border border-orange-300/40 active:scale-95"
          >
            <span>{t("MOU 체결 현장 바로가기")}</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </button>
        </div>
      </ScrollReveal>
    </div>
  );

  return (
    <section className="space-y-12">
      {viewMode === 'speech' && renderSpeechContent()}
      {viewMode === 'profile' && renderProfileContent()}
      {viewMode === 'all' && (
        <>
          {renderSpeechContent()}
          {renderProfileContent()}
        </>
      )}

      {/* Complete Speech Edit Modal */}
      {isModalOpen && (
        <div
          onClick={() => setIsModalOpen(false)}
          className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl shadow-2xl border border-gray-200 w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden text-gray-900"
          >
            {/* Modal Header */}
            <div className="px-6 py-4 bg-emerald-950 text-white flex items-center justify-between border-b border-emerald-900 shrink-0">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-800/80 rounded-xl">
                  <Edit3 className="w-5 h-5 text-emerald-300" />
                </div>
                <div>
                  <h3 className="text-base font-black text-white">이사장 인사말 & 비전 전체 설정</h3>
                  <p className="text-xs text-emerald-200">인사말 본문, 대표 사진, 3대 운영 목표를 한 번에 편집합니다.</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-gray-300 hover:text-white hover:bg-emerald-900 rounded-xl transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Navigation Tabs */}
            <div className="flex border-b border-gray-200 bg-gray-50 px-6 pt-3 gap-2 overflow-x-auto shrink-0">
              {[
                { id: 'basic', label: '1. 사진 & 기본정보', icon: User },
                { id: 'speech', label: '2. 인사말 본문', icon: Quote },
                { id: 'goals', label: '3. 3대 운영목표', icon: Target },
                { id: 'closing', label: '4. 맺음말 & 서명', icon: FileText },
              ].map((tab) => {
                const IconComp = tab.icon;
                const isActive = modalTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setModalTab(tab.id)}
                    className={`px-4 py-2.5 text-xs font-bold rounded-t-xl flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                      isActive
                        ? 'bg-white text-emerald-900 border-t-2 border-x border-b-0 border-emerald-700 font-black shadow-xs'
                        : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <IconComp className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Modal Form Body */}
            <form onSubmit={handleSaveModal} className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* TAB 1: BASIC INFO & PHOTO */}
              {modalTab === 'basic' && (
                <div className="space-y-6">
                  {/* Photo Upload Section */}
                  <div className="bg-emerald-50/50 p-5 rounded-2xl border border-emerald-200 space-y-4">
                    <label className="text-xs font-black text-emerald-950 flex items-center gap-1.5">
                      <Camera className="w-4 h-4 text-emerald-700" />
                      <span>이사장 공식 대표 사진</span>
                    </label>

                    <div className="flex flex-col sm:flex-row items-center gap-5">
                      <div className="w-28 h-36 rounded-2xl overflow-hidden border-2 border-emerald-300 shadow-md bg-white shrink-0">
                        <img
                          src={formData.image || '/images/chairman_ahn_real.jpg?v=2'}
                          alt="미리보기"
                          className="w-full h-full object-cover object-top"
                        />
                      </div>

                      <div className="flex-1 w-full space-y-3">
                        <div className="flex items-center gap-2">
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleImageFileChange}
                            className="hidden"
                          />
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={uploadLoading}
                            className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-black shadow-sm transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                          >
                            <Upload className="w-3.5 h-3.5" />
                            <span>{uploadLoading ? '업로드 중...' : '내 컴퓨터에서 사진 선택 (5MB)'}</span>
                          </button>
                        </div>

                        <div>
                          <label className="text-[11px] font-bold text-gray-600 block mb-1">
                            또는 이미지 링크(URL) 직접 입력:
                          </label>
                          <input
                            type="text"
                            value={formData.image || ''}
                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                            placeholder="/images/chairman_ahn_real.jpg 또는 https://..."
                            className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl focus:outline-none focus:border-emerald-600 font-mono"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 이사장 및 소속 기관 정보 */}
                  <div className="space-y-4 pt-2 border-t border-gray-200">
                    <div className="border-b border-gray-100 pb-2">
                      <h4 className="text-xs font-black text-gray-900">이사장 및 소속 기관 정보</h4>
                      <p className="text-[11px] text-gray-500">사진 하단 프로필 카드에 들어갈 소속 기관과 직함 및 성함을 입력합니다.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-black text-gray-700">소속 기관명</label>
                        <input
                          type="text"
                          value={formData.orgName || (formData.leftOrgType ? `${formData.leftOrgType} ${formData.leftOrgName}` : '')}
                          onChange={(e) => setFormData({ ...formData, orgName: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-xs border border-gray-300 rounded-xl font-bold focus:outline-none focus:border-emerald-600 bg-white"
                          placeholder="사단법인 한국외식창업교육원"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-black text-gray-700">대표 직함 및 성함</label>
                        <input
                          type="text"
                          value={formData.chairmanTitle || formData.chairmanName || ''}
                          onChange={(e) => setFormData({ ...formData, chairmanTitle: e.target.value, chairmanName: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-xs border border-gray-300 rounded-xl font-bold focus:outline-none focus:border-emerald-600 bg-white"
                          placeholder="이사장 안형상"
                        />
                      </div>
                    </div>

                    {/* Real-time Profile Card Preview */}
                    <div className="bg-stone-50 border border-stone-200/80 rounded-2xl p-4 space-y-2">
                      <span className="text-[11px] font-black text-emerald-800 flex items-center gap-1.5">
                        <span>👁️ 사진 하단 실제 표시 미리보기</span>
                      </span>
                      <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs space-y-1">
                        <div className="font-extrabold text-gray-900 text-sm">안녕하십니까?</div>
                        <div className="text-gray-900 font-black text-base sm:text-lg">
                          {formData.orgName || (formData.leftOrgType ? `${formData.leftOrgType} ${formData.leftOrgName}` : '사단법인 한국외식창업교육원')}
                        </div>
                        <div className="text-[#0F5132] font-black text-base sm:text-lg">
                          {formData.chairmanTitle || formData.chairmanName || '이사장 안형상'}
                          <span className="text-gray-800 font-semibold text-sm ml-1">입니다.</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Top Vision Banner Texts */}
                  <div className="space-y-3 pt-2 border-t border-gray-200">
                    <h4 className="text-xs font-black text-gray-800">상단 비전 녹색 배너 문구</h4>
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-gray-600">배너 태그</label>
                      <input
                        type="text"
                        value={formData.visionBadge || ''}
                        onChange={(e) => setFormData({ ...formData, visionBadge: e.target.value })}
                        className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl font-bold focus:outline-none focus:border-emerald-600"
                        placeholder="GREETINGS & VISION"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-gray-600">배너 헤드라인 (엔터로 줄바꿈 가능)</label>
                      <textarea
                        rows={2}
                        value={formData.visionTitle || ''}
                        onChange={(e) => setFormData({ ...formData, visionTitle: e.target.value })}
                        className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl font-bold focus:outline-none focus:border-emerald-600"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: SPEECH PARAGRAPHS */}
              {modalTab === 'speech' && (
                <div className="space-y-5">
                  <div className="space-y-1">
                    <label className="text-xs font-black text-gray-800">인사말 메인 타이틀</label>
                    <input
                      type="text"
                      value={formData.title || ''}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-3 py-2.5 text-xs border border-gray-300 rounded-xl font-black focus:outline-none focus:border-emerald-600"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-black text-gray-800">도입 첫 문장 (강조 문단)</label>
                    <textarea
                      rows={2}
                      value={formData.p1 || ''}
                      onChange={(e) => setFormData({ ...formData, p1: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl font-bold focus:outline-none focus:border-emerald-600"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-black text-gray-800">단락 2 (외식산업의 가치와 시대적 변화)</label>
                    <textarea
                      rows={3}
                      value={formData.p2 || ''}
                      onChange={(e) => setFormData({ ...formData, p2: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl focus:outline-none focus:border-emerald-600"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-black text-gray-800">단락 3 (교육원의 사명과 실질적 교육)</label>
                    <textarea
                      rows={3}
                      value={formData.p3 || ''}
                      onChange={(e) => setFormData({ ...formData, p3: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl focus:outline-none focus:border-emerald-600"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-black text-gray-800">단락 4 (동반자 및 생태계 구축)</label>
                    <textarea
                      rows={2}
                      value={formData.p4 || ''}
                      onChange={(e) => setFormData({ ...formData, p4: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                </div>
              )}

              {/* TAB 3: 3 CORE OPERATIONAL GOALS */}
              {modalTab === 'goals' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-black text-gray-800">섹션 제목</label>
                      <input
                        type="text"
                        value={formData.goalsTitle || ''}
                        onChange={(e) => setFormData({ ...formData, goalsTitle: e.target.value })}
                        className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl font-bold focus:outline-none focus:border-emerald-600"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-black text-gray-800">부제목 설명</label>
                      <input
                        type="text"
                        value={formData.goalsSubtitle || ''}
                        onChange={(e) => setFormData({ ...formData, goalsSubtitle: e.target.value })}
                        className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl font-bold focus:outline-none focus:border-emerald-600"
                      />
                    </div>
                  </div>

                  {/* Goal 1 */}
                  <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-2">
                    <label className="text-xs font-black text-[#0F5132]">목표 1 제목</label>
                    <input
                      type="text"
                      value={formData.goal1Title || ''}
                      onChange={(e) => setFormData({ ...formData, goal1Title: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl font-bold focus:outline-none focus:border-emerald-600 bg-white"
                    />
                    <label className="text-[11px] font-bold text-gray-600 block pt-1">목표 1 상세 설명</label>
                    <textarea
                      rows={2}
                      value={formData.goal1Desc || ''}
                      onChange={(e) => setFormData({ ...formData, goal1Desc: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl focus:outline-none focus:border-emerald-600 bg-white"
                    />
                  </div>

                  {/* Goal 2 */}
                  <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-2">
                    <label className="text-xs font-black text-[#0F5132]">목표 2 제목</label>
                    <input
                      type="text"
                      value={formData.goal2Title || ''}
                      onChange={(e) => setFormData({ ...formData, goal2Title: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl font-bold focus:outline-none focus:border-emerald-600 bg-white"
                    />
                    <label className="text-[11px] font-bold text-gray-600 block pt-1">목표 2 상세 설명</label>
                    <textarea
                      rows={2}
                      value={formData.goal2Desc || ''}
                      onChange={(e) => setFormData({ ...formData, goal2Desc: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl focus:outline-none focus:border-emerald-600 bg-white"
                    />
                  </div>

                  {/* Goal 3 */}
                  <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-2">
                    <label className="text-xs font-black text-[#0F5132]">목표 3 제목</label>
                    <input
                      type="text"
                      value={formData.goal3Title || ''}
                      onChange={(e) => setFormData({ ...formData, goal3Title: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl font-bold focus:outline-none focus:border-emerald-600 bg-white"
                    />
                    <label className="text-[11px] font-bold text-gray-600 block pt-1">목표 3 상세 설명</label>
                    <textarea
                      rows={2}
                      value={formData.goal3Desc || ''}
                      onChange={(e) => setFormData({ ...formData, goal3Desc: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl focus:outline-none focus:border-emerald-600 bg-white"
                    />
                  </div>
                </div>
              )}

              {/* TAB 4: CLOSING & SIGNATURE */}
              {modalTab === 'closing' && (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-black text-gray-800">섹션 제목</label>
                    <input
                      type="text"
                      value={formData.closingTitle || ''}
                      onChange={(e) => setFormData({ ...formData, closingTitle: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl font-bold focus:outline-none focus:border-emerald-600"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-black text-gray-800">맺음말 단락 1</label>
                    <textarea
                      rows={2}
                      value={formData.closing1 || ''}
                      onChange={(e) => setFormData({ ...formData, closing1: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl focus:outline-none focus:border-emerald-600"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-black text-gray-800">맺음말 단락 2</label>
                    <textarea
                      rows={2}
                      value={formData.closing2 || ''}
                      onChange={(e) => setFormData({ ...formData, closing2: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl focus:outline-none focus:border-emerald-600"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-black text-gray-800">맺음말 단락 3 (응원 문구)</label>
                    <textarea
                      rows={2}
                      value={formData.closing3 || ''}
                      onChange={(e) => setFormData({ ...formData, closing3: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl font-bold focus:outline-none focus:border-emerald-600"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                    <div className="space-y-1">
                      <label className="text-xs font-black text-gray-800">감사 인사말</label>
                      <input
                        type="text"
                        value={formData.closingThanks || ''}
                        onChange={(e) => setFormData({ ...formData, closingThanks: e.target.value })}
                        className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl font-black text-[#0F5132] focus:outline-none focus:border-emerald-600"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-black text-gray-800">서명 기관명</label>
                      <input
                        type="text"
                        value={formData.signOrg || ''}
                        onChange={(e) => setFormData({ ...formData, signOrg: e.target.value })}
                        className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl font-bold focus:outline-none focus:border-emerald-600"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-black text-gray-800">서명 대표자명</label>
                      <input
                        type="text"
                        value={formData.signName || ''}
                        onChange={(e) => setFormData({ ...formData, signName: e.target.value })}
                        className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl font-black text-[#0F5132] focus:outline-none focus:border-emerald-600"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Modal Footer Controls */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-200 mt-6">
                <button
                  type="button"
                  onClick={() => setFormData(DEFAULT_SPEECH)}
                  className="text-xs font-bold text-gray-500 hover:text-red-600 transition"
                >
                  기본 문구로 초기화
                </button>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-100 rounded-xl text-xs font-bold transition cursor-pointer"
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-black shadow-md transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>변경사항 지금 적용</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
