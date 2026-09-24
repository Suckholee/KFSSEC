import React, { useState } from 'react';
import {
  Sparkles,
  Calendar,
  FileText,
  Copy,
  CheckCircle,
  Clock,
  Layers,
  Bot,
  Image,
  Tag,
  Share2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  Send,
  UserCheck,
} from 'lucide-react';

export default function AdminAIBlogMarketing() {
  const [activeTab, setActiveTab] = useState('generator'); // 'generator' | 'calendar' | 'banner_guide'
  
  // Blog Post Generator State
  const [topic, setTopic] = useState('외식창업실무지도사 자격증 취득 혜택 및 수강 안내');
  const [targetAudience, setTargetAudience] = useState('30~50대 예비 외식 창업자 및 자영업자');
  const [tone, setTone] = useState('신뢰감 있고 친근한 전문가 어조');
  const [generatedPost, setGeneratedPost] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  // Scheduled Calendar Items
  const [scheduledPosts, setScheduledPosts] = useState([
    {
      id: 1,
      date: '2026.09.25',
      time: '09:00',
      title: '[명인 칼럼] 100년 전통 발효 소스로 매장 매출 2배 올리는 비법',
      status: 'scheduled',
      platform: '네이버 블로그',
    },
    {
      id: 2,
      date: '2026.09.27',
      time: '14:00',
      title: '청년 외식창업 정책자금 1억원 연계 신청 완벽 가이드',
      status: 'scheduled',
      platform: '네이버 블로그 / 스마트스토어',
    },
    {
      id: 3,
      date: '2026.09.30',
      time: '10:30',
      title: '진익준 교수가 알려주는 실패하지 않는 골목상권 입지 분석법',
      status: 'scheduled',
      platform: '네이버 블로그',
    },
    {
      id: 4,
      date: '2026.10.02',
      time: '18:00',
      title: '사단법인 한국외식창업교육원 10월 개강 신규 커리큘럼 안내',
      status: 'draft',
      platform: '네이버 블로그 / 인스타그램',
    },
  ]);

  const handleGenerateBlogPost = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setGeneratedPost({
        title: `[외식창업 필독] ${topic} - 사단법인 공인 명장 직강 총정리`,
        intro: `안녕하세요! 사단법인 한국외식창업교육원입니다. 👨‍🍳\n\n요즘 경기 침체와 높은 원가율로 외식 창업을 망설이시는 분들이 많으실 텐데요. 창업은 단순한 요리 실력을 넘어 '상권 분석 + 원가 통제 + 차별화된 시그니처 메뉴'가 삼위일체가 되어야 성공할 수 있습니다.\n\n오늘은 ${targetAudience}을 위해 "${topic}"의 핵심 포인트와 수강 혜택을 알기 쉽게 정리해 드립니다!`,
        sections: [
          {
            subhead: '1. 대한민국 조리명장 & 명인의 1:1 도제식 전수',
            body: '특급호텔 40년 경력의 조리명장이 직접 시연하는 시그니처 비법 소스와 1인 주방 운영 최적화 레시피를 전수받으실 수 있습니다. 대용량 조리 표준화로 주방 인건비를 획기적으로 절감할 수 있습니다.',
            imagePlaceholder: '[사진 추천: 명장 셰프 조리 실습 및 불쇼 현장 포토]',
          },
          {
            subhead: '2. 진익준 교수의 데이터 기반 상권분석 및 인테리어 기획',
            body: '단순한 예쁜 인테리어가 아닌, 고객 경험 디자인(CX)과 회전율을 고려한 파사드·동선 설계를 지도합니다. 실패 확률을 사전에 차단하는 빅데이터 상권 분석 보고서를 함께 제공합니다.',
            imagePlaceholder: '[사진 추천: 상권분석 지도 및 3D 매장 인테리어 도면]',
          },
          {
            subhead: '3. 자격기본법 등록 공식 자격증 발급 & 정부지원금 연계',
            body: '교육 이수 후 사단법인 이사장 명의의 공식 자격증이 수여되며, 중소벤처기업부 및 소상공인시장진흥공단의 청년/소상공인 정책자금 신청 시 가점 혜택을 지원받으실 수 있습니다.',
            imagePlaceholder: '[사진 추천: 자격증 수여식 및 공인 인증서 이미지]',
          },
        ],
        outro: '망설이지 마시고 지금 바로 1:1 입학 및 수강 상담을 신청해 보세요. 성공 창업의 첫걸음을 든든하게 동행해 드리겠습니다!\n\n📞 입학 및 상담 문의: 010-8914-1188\n🌐 공식 홈페이지: kfssec.com',
        hashtags: '#외식창업 #한국외식창업교육원 #식당창업 #조리명장 #창업컨설팅 #상권분석 #진익준교수 #소상공인정부지원금 #외식경영 #맛집창업',
      });
      setIsGenerating(false);
    }, 800);
  };

  const handleCopyText = () => {
    if (!generatedPost) return;
    const fullText = `${generatedPost.title}\n\n${generatedPost.intro}\n\n${generatedPost.sections.map(s => `${s.subhead}\n${s.body}\n${s.imagePlaceholder}\n`).join('\n')}\n${generatedPost.outro}\n\n${generatedPost.hashtags}`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto p-4 sm:p-6 font-sans text-gray-900 select-text">
      
      {/* Top Banner Header */}
      <div className="bg-[#171b20] text-white rounded-3xl p-6 sm:p-8 border border-gray-700 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-black mb-2">
            <Bot className="w-3.5 h-3.5" />
            <span>AI MARKETING ENGINE & AP BANNER OPS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight flex items-center gap-2">
            <span>네이버 AI 블로그 연동 및 배너 운영 검토 센터</span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-300 font-medium mt-1">
            고객 피드백 다음 미팅 안건: AI 블로그 원고/해시태그 생성, 캘린더 자동 등록 실효성 검토 및 AP 배너 생성 프로세스 가이드
          </p>
        </div>

        {/* Subtabs Switcher */}
        <div className="flex items-center gap-2 bg-[#20252b] p-1.5 rounded-2xl border border-gray-700 self-start md:self-auto shrink-0">
          <button
            onClick={() => setActiveTab('generator')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
              activeTab === 'generator'
                ? 'bg-emerald-500 text-black shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            AI 블로그 원고 생성기
          </button>
          <button
            onClick={() => setActiveTab('calendar')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
              activeTab === 'calendar'
                ? 'bg-emerald-500 text-black shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            캘린더 스케줄러 & 검토
          </button>
          <button
            onClick={() => setActiveTab('banner_guide')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
              activeTab === 'banner_guide'
                ? 'bg-emerald-500 text-black shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            AP 배너 생성 가이드
          </button>
        </div>
      </div>

      {/* TAB 1: AI BLOG POST GENERATOR */}
      {activeTab === 'generator' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Form: Parameter Controls */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-5 border border-stone-200 shadow-sm space-y-4">
            <h2 className="text-base font-black text-gray-900 border-b pb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>원고 생성 조건 설정</span>
            </h2>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  포스팅 핵심 주제 / 키워드
                </label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-bold border border-gray-300 rounded-xl focus:outline-none focus:border-emerald-600"
                  placeholder="예: 외식창업실무지도사 자격증 취득 혜택"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  타겟 독자층
                </label>
                <input
                  type="text"
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-bold border border-gray-300 rounded-xl focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  문체 및 어조
                </label>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-bold border border-gray-300 rounded-xl focus:outline-none focus:border-emerald-600 bg-white"
                >
                  <option value="신뢰감 있고 친근한 전문가 어조">신뢰감 있고 친근한 전문가 어조 (추천)</option>
                  <option value="트렌디하고 열정적인 창업 성공기">트렌디하고 열정적인 창업 성공기</option>
                  <option value="공신력 있는 학술·기관 공식 공지체">공신력 있는 학술·기관 공식 공지체</option>
                </select>
              </div>

              {/* Preset Topic Buttons */}
              <div>
                <label className="text-xs font-bold text-gray-500 block mb-1.5">
                  추천 주제 빠른 선택
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    '외식창업실무지도사 자격증 취득 혜택',
                    '100년 전통 발효 소스 전수 마스터클래스',
                    '진익준 교수의 소상공인 상권분석 성공전략',
                    '청년 소상공인 창업 정책자금 1:1 코칭',
                  ].map((preset, i) => (
                    <button
                      key={i}
                      onClick={() => setTopic(preset)}
                      className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-emerald-50 text-[11px] font-bold text-stone-700 hover:text-emerald-800 transition-colors text-left"
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleGenerateBlogPost}
                  disabled={isGenerating}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Sparkles className="w-4 h-4 text-emerald-200" />
                  <span>{isGenerating ? 'AI가 고품질 원고 작성 중...' : '네이버 AI 블로그 원고 자동 생성'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Preview: Generated Result */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-5 border border-stone-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h2 className="text-base font-black text-gray-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-600" />
                <span>생성된 네이버 블로그 원고 & 해시태그</span>
              </h2>

              {generatedPost && (
                <button
                  onClick={handleCopyText}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    copied
                      ? 'bg-emerald-600 text-white'
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-800'
                  }`}
                >
                  {copied ? <CheckCircle className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? '복사 완료!' : '전체 원고 복사'}</span>
                </button>
              )}
            </div>

            {generatedPost ? (
              <div className="space-y-4 text-xs sm:text-sm text-gray-800 leading-relaxed font-sans max-h-[580px] overflow-y-auto pr-2">
                <div className="bg-stone-50 p-4 rounded-xl border border-stone-200">
                  <span className="text-[10px] font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                    블로그 제목 추천
                  </span>
                  <h3 className="text-base font-black text-gray-900 mt-1">
                    {generatedPost.title}
                  </h3>
                </div>

                <div className="whitespace-pre-wrap font-medium">
                  {generatedPost.intro}
                </div>

                {generatedPost.sections.map((sec, i) => (
                  <div key={i} className="space-y-2 border-l-2 border-emerald-600 pl-3 py-1">
                    <h4 className="font-black text-sm text-gray-900">
                      {sec.subhead}
                    </h4>
                    <p className="font-medium text-gray-700">
                      {sec.body}
                    </p>
                    <div className="p-2 bg-emerald-50/70 border border-dashed border-emerald-300 rounded-lg text-[11px] font-bold text-emerald-900 flex items-center gap-1.5">
                      <Image className="w-3.5 h-3.5 text-emerald-700" />
                      <span>{sec.imagePlaceholder}</span>
                    </div>
                  </div>
                ))}

                <div className="whitespace-pre-wrap font-medium border-t pt-3">
                  {generatedPost.outro}
                </div>

                <div className="bg-stone-50 p-3 rounded-xl border border-stone-200">
                  <span className="text-[10px] font-black text-purple-900 bg-purple-100 px-2 py-0.5 rounded block mb-1">
                    추천 태그 (복사용)
                  </span>
                  <p className="text-xs font-bold text-emerald-700 font-mono">
                    {generatedPost.hashtags}
                  </p>
                </div>
              </div>
            ) : (
              <div className="py-20 text-center text-stone-400 space-y-2">
                <Bot className="w-12 h-12 mx-auto text-stone-300" />
                <p className="font-bold">좌측에서 주제를 입력 후 [자동 생성] 버튼을 누르시면</p>
                <p className="text-xs">네이버 블로그 맞춤형 제목, 본문, 사진 배치 가이드 및 태그가 즉시 생성됩니다.</p>
              </div>
            )}
          </div>

        </div>
      )}

      {/* TAB 2: CALENDAR SCHEDULER & FEASIBILITY REVIEW */}
      {activeTab === 'calendar' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-4">
            <h2 className="text-lg font-black text-gray-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-emerald-600" />
              <span>캘린더 기반 자동 포스팅 예약 현황</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {scheduledPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-stone-50 p-4 rounded-xl border border-stone-200 flex items-start justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                        {post.date} ({post.time})
                      </span>
                      <span className="text-[10px] font-bold text-gray-500">
                        {post.platform}
                      </span>
                    </div>
                    <h4 className="text-sm font-black text-gray-900">
                      {post.title}
                    </h4>
                  </div>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                    post.status === 'scheduled'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {post.status === 'scheduled' ? '발행 예약' : '초안 검토'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Feasibility & Assessment Sheet for Client Meeting */}
          <div className="bg-emerald-50/80 rounded-2xl p-6 border-2 border-emerald-300 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-emerald-950 font-black text-base border-b border-emerald-200 pb-2">
              <AlertCircle className="w-5 h-5 text-emerald-700" />
              <span>다음 미팅 검토 보고: 네이버 AI 블로그 자동 등록 실효성 및 기술 분석</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-medium text-emerald-950 leading-relaxed">
              <div className="bg-white p-4 rounded-xl border border-emerald-200 space-y-2">
                <strong className="font-black text-emerald-900 block text-sm">
                  1. 네이버 API 공식 정책
                </strong>
                <p>
                  네이버는 스팸 및 봇 어뷰징 방지를 위해 일반 계정의 완전 자동 글쓰기 API를 제한하고 있습니다. 따라서 100% 무인 자동 발행 시 네이버 알고리즘에 의해 검색 노출 누락(저품질 블로그 지정) 위험이 있습니다.
                </p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-emerald-200 space-y-2">
                <strong className="font-black text-emerald-900 block text-sm">
                  2. 권장 최적 실무 프로세스
                </strong>
                <p>
                  <strong>"AI 초안 원고 자동 생성 ➔ 관리자 1클릭 복사 ➔ 네이버 스마트에디터 발행"</strong>의 하이브리드 워크플로우가 저품질 리스크 없이 최상위 노출 점수를 유지하는 가장 안전하고 실효성 높은 방식입니다.
                </p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-emerald-200 space-y-2">
                <strong className="font-black text-emerald-900 block text-sm">
                  3. 캘린더 스케줄링 효과
                </strong>
                <p>
                  교육원 학사 일정(개강일, 요리대회, 시상식, 설명회)에 맞추어 캘린더에 사전 원고를 미리 비축해 두면 담당자가 1일 1포스팅을 3분 이내에 완료할 수 있어 업무 생산성이 500% 이상 증대됩니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: AP BANNER CREATION GUIDE & WORKFLOW */}
      {activeTab === 'banner_guide' && (
        <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-6">
          <div className="border-b pb-4">
            <h2 className="text-xl font-black text-gray-900 flex items-center gap-2">
              <Layers className="w-5 h-5 text-emerald-600" />
              <span>AP 배너 생성 및 향후 운영 담당자 지정 점검 가이드</span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 font-medium mt-1">
              다음 미팅 시 배너 제작 프로세스 및 운영 담당자 역할 분담을 확정하기 위한 사전 가이드라인입니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Standard Sizes */}
            <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200 space-y-3">
              <h3 className="font-black text-sm text-gray-900 flex items-center gap-1.5">
                <Image className="w-4 h-4 text-emerald-600" />
                <span>권장 배너 규격 및 포맷</span>
              </h3>
              <ul className="space-y-2 text-xs text-gray-700 font-bold">
                <li className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-stone-200">
                  <span>메인 히어로 배너 (와이드)</span>
                  <span className="font-mono text-emerald-700">1920 × 640 px (WebP / JPG)</span>
                </li>
                <li className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-stone-200">
                  <span>이벤트 & 프로모션 배너 (스트립)</span>
                  <span className="font-mono text-emerald-700">1200 × 360 px</span>
                </li>
                <li className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-stone-200">
                  <span>모바일 팝업 & 카카오톡 알림</span>
                  <span className="font-mono text-emerald-700">800 × 800 px (1:1 정사각형)</span>
                </li>
              </ul>
            </div>

            {/* Role Assignments for Meeting */}
            <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200 space-y-3">
              <h3 className="font-black text-sm text-gray-900 flex items-center gap-1.5">
                <UserCheck className="w-4 h-4 text-emerald-600" />
                <span>미팅 시 확정할 운영 담당자 지정 사항</span>
              </h3>
              <div className="space-y-2 text-xs text-gray-700 font-medium leading-relaxed">
                <div className="p-2.5 bg-white rounded-xl border border-stone-200 space-y-1">
                  <strong className="text-gray-900 block font-black">① 배너 기획 및 텍스트 카피 담당</strong>
                  <p>교육원 사무국 (개강 일정, 수강 할인율, 이벤트 정책 수립)</p>
                </div>
                <div className="p-2.5 bg-white rounded-xl border border-stone-200 space-y-1">
                  <strong className="text-gray-900 block font-black">② 그래픽 디자인 및 이미지 추출 담당</strong>
                  <p>웹 디자인/개발팀 (사전 정의된 Figma/PSD 템플릿 기반 유사 복제)</p>
                </div>
                <div className="p-2.5 bg-white rounded-xl border border-stone-200 space-y-1">
                  <strong className="text-gray-900 block font-black">③ 관리자 페이지 실시간 배너 등록</strong>
                  <p>운영 담당자 (Admin 홈화면 관리에서 1클릭 업로드 및 링크 연결)</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
