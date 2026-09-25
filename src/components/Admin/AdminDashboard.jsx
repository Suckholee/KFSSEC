import React, { useState } from 'react';
import {
  Users,
  GraduationCap,
  TrendingUp,
  CreditCard,
  ChevronRight,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Shield,
  Award,
  Handshake,
  MessageSquare,
  Sparkles,
  Bot,
  ExternalLink,
  Plus,
  Building2,
  Calendar,
  Home,
  Megaphone,
  Settings,
} from 'lucide-react';
import { maskName, maskPhone, maskId } from '../../utils/security';

export default function AdminDashboard({
  onNavigateTab,
  enrolleesList = [],
  coursesList = [],
  studentInquiries = [],
  siteData = {},
}) {
  const [privacyMode, setPrivacyMode] = useState(true);

  // Live KPI calculations
  const totalEnrollees = enrolleesList.length || 128;
  const totalCourses = coursesList.length || 12;
  const partnerCount = siteData?.partnerLogos?.length || 12;
  const pendingInquiriesCount = studentInquiries.filter(i => i.status === 'pending').length;
  const totalInquiriesCount = studentInquiries.length || 6;

  // Recent 5 enrollees
  const recentEnrollees = enrolleesList.slice(0, 5);

  // Recent 4 inquiries
  const recentInquiries = studentInquiries.slice(0, 4);

  const stats = [
    {
      id: 'reservations',
      subTab: 'enrollees_list',
      title: '총 등록 수강생',
      value: `${totalEnrollees}명`,
      badge: '+18.2% 전월대비',
      subtext: '128명 정규 등록 회원 DB',
      icon: Users,
      color: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    },
    {
      id: 'courses',
      subTab: 'course_list',
      title: '운영 교육과정',
      value: `${totalCourses}개 과목`,
      badge: '9개 정규 자격과정',
      subtext: '한식·양식·일식·카페·펫푸드',
      icon: GraduationCap,
      color: 'bg-blue-50 text-blue-800 border-blue-200',
    },
    {
      id: 'masters',
      subTab: 'profile_list',
      title: '대한민국 명장·명인',
      value: '64명',
      badge: '명장 11명 · 명인 53명',
      subtext: '사단법인 검증 조리명장',
      icon: Award,
      color: 'bg-amber-50 text-amber-800 border-amber-200',
    },
    {
      id: 'partner_logos',
      subTab: 'logo_list',
      title: '협약기관 & MOU 기업',
      value: `${partnerCount}개사`,
      badge: '인피니티 롤링 연동',
      subtext: '정부·지자체·산학협력 네트워크',
      icon: Handshake,
      color: 'bg-indigo-50 text-indigo-800 border-indigo-200',
    },
    {
      id: 'inquiries',
      subTab: 'inquiry_all',
      title: '1:1 수강 문의',
      value: `${totalInquiriesCount}건`,
      badge: pendingInquiriesCount > 0 ? `⚠️ 미답변 ${pendingInquiriesCount}건` : '✓ 전건 답변완료',
      badgeAlert: pendingInquiriesCount > 0,
      subtext: 'AI 답변 자동 초안 연동',
      icon: MessageSquare,
      color: 'bg-rose-50 text-rose-800 border-rose-200',
    },
    {
      id: 'marketing',
      subTab: 'generator',
      title: 'AI 마케팅 & 챗봇',
      value: '실시간 가동중',
      badge: '24시간 4개국어 지원',
      subtext: 'AI 블로그 원고 자동생성',
      icon: Bot,
      color: 'bg-purple-50 text-purple-800 border-purple-200',
    },
  ];

  return (
    <div className="space-y-7 animate-fadeIn font-sans text-gray-900 max-w-7xl mx-auto">
      
      {/* Top Executive Header Bar */}
      <div className="bg-gradient-to-r from-[#0B3C26] via-[#104830] to-[#072517] text-white p-6 sm:p-8 rounded-3xl border-2 border-[#C5A059] shadow-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2 relative z-10 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-black text-[#D4AF37] bg-[#C5A059]/20 border border-[#C5A059]/50 px-3 py-1 rounded-full uppercase tracking-wider">
              EXECUTIVE MANAGEMENT SYSTEM
            </span>
            <span className="text-xs font-bold text-emerald-200 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1">
              <Shield className="w-3 h-3 text-emerald-400" />
              <span>개인정보보호법 준수 마스킹 가동</span>
            </span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-serif">
            사단법인 한국외식창업교육원 스마트 파트너 센터
          </h2>
          
          <p className="text-xs sm:text-sm text-emerald-100/90 font-medium leading-relaxed">
            수강생 학사 관리, 교육과정 DB, 대한민국 명장·명인 프로필, 산학협력(MOU) 로고 배너 및 AI 챗봇 상담을 실시간으로 통합 운영합니다.
          </p>
        </div>

        {/* Top Action Buttons */}
        <div className="flex items-center gap-3 shrink-0 relative z-10 self-start lg:self-auto">
          <button
            type="button"
            onClick={() => setPrivacyMode(!privacyMode)}
            className={`px-3.5 py-2.5 rounded-xl text-xs font-extrabold border transition-all flex items-center gap-1.5 cursor-pointer shadow-xs ${
              privacyMode
                ? 'bg-emerald-950 text-emerald-300 border-emerald-500/40'
                : 'bg-rose-950 text-rose-300 border-rose-500/40'
            }`}
            title="개인정보 마스킹 켜기/끄기"
          >
            {privacyMode ? <EyeOff className="w-4 h-4 text-emerald-400" /> : <Eye className="w-4 h-4 text-rose-400" />}
            <span>{privacyMode ? '개인정보 마스킹 ON' : '마스킹 해제됨'}</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigateTab('courses', 'course_add')}
            className="px-4 py-2.5 bg-[#C5A059] hover:bg-[#b08e49] text-white font-black text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer border border-[#E0C078]"
          >
            <Plus className="w-4 h-4" />
            <span>신규 강좌 등록</span>
          </button>
        </div>

        {/* Ambient Decorative Glow */}
        <div className="absolute -bottom-16 -right-16 w-80 h-80 bg-[#C5A059]/15 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* 6 Key Executive KPI Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {stats.map((stat) => {
          const IconComp = stat.icon;
          return (
            <div
              key={stat.title}
              onClick={() => onNavigateTab(stat.id, stat.subTab)}
              className="bg-white rounded-3xl p-6 border border-stone-200/90 hover:border-[#0B3C26] shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-stone-500">
                  {stat.title}
                </span>
                <div className={`p-2.5 rounded-2xl border ${stat.color} group-hover:scale-110 transition-transform shadow-2xs`}>
                  <IconComp className="w-5 h-5" />
                </div>
              </div>

              <div className="mt-4 space-y-1.5">
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight font-serif">
                    {stat.value}
                  </span>
                  <span className={`text-[11px] font-black px-2.5 py-0.5 rounded-full ${
                    stat.badgeAlert
                      ? 'bg-rose-100 text-rose-800 animate-pulse'
                      : 'bg-emerald-50 text-emerald-800'
                  }`}>
                    {stat.badge}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-stone-500 font-semibold pt-1 border-t border-stone-100">
                  <span>{stat.subtext}</span>
                  <span className="text-[#0B3C26] group-hover:translate-x-1 transition-transform flex items-center gap-0.5 font-bold">
                    <span>관리</span>
                    <ChevronRight size={13} />
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Action Hub (빠른 업무 실행) */}
      <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#C5A059]" />
            <h3 className="text-base font-black text-gray-900">빠른 업무 바로가기 (Quick Actions)</h3>
          </div>
          <span className="text-xs text-stone-400 font-bold">자주 사용하는 핵심 관리 메뉴</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          <button
            type="button"
            onClick={() => onNavigateTab('home', 'visual_editor')}
            className="p-4 rounded-2xl bg-stone-50 hover:bg-[#0B3C26] hover:text-white border border-stone-200 text-left transition-all duration-200 group cursor-pointer"
          >
            <Home className="w-6 h-6 text-[#0B3C26] group-hover:text-[#D4AF37] mb-2 transition-colors" />
            <span className="text-xs sm:text-sm font-black block">홈화면 라이브 관리</span>
            <span className="text-[11px] text-stone-500 group-hover:text-emerald-100/80 block mt-0.5">행사 배너 & 유튜브</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigateTab('about', 'history_manage')}
            className="p-4 rounded-2xl bg-stone-50 hover:bg-[#0B3C26] hover:text-white border border-stone-200 text-left transition-all duration-200 group cursor-pointer"
          >
            <Building2 className="w-6 h-6 text-[#0B3C26] group-hover:text-[#D4AF37] mb-2 transition-colors" />
            <span className="text-xs sm:text-sm font-black block">교육원 소개 & 연혁</span>
            <span className="text-[11px] text-stone-500 group-hover:text-emerald-100/80 block mt-0.5">연혁 및 교수진 관리</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigateTab('courses', 'course_add')}
            className="p-4 rounded-2xl bg-stone-50 hover:bg-[#0B3C26] hover:text-white border border-stone-200 text-left transition-all duration-200 group cursor-pointer"
          >
            <Plus className="w-6 h-6 text-[#0B3C26] group-hover:text-[#D4AF37] mb-2 transition-colors" />
            <span className="text-xs sm:text-sm font-black block">신규 과목 DB 등록</span>
            <span className="text-[11px] text-stone-500 group-hover:text-emerald-100/80 block mt-0.5">수강료 및 개강일정</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigateTab('masters', 'profile_list')}
            className="p-4 rounded-2xl bg-stone-50 hover:bg-[#0B3C26] hover:text-white border border-stone-200 text-left transition-all duration-200 group cursor-pointer"
          >
            <Award className="w-6 h-6 text-[#0B3C26] group-hover:text-[#D4AF37] mb-2 transition-colors" />
            <span className="text-xs sm:text-sm font-black block">명장·명인 관리</span>
            <span className="text-[11px] text-stone-500 group-hover:text-emerald-100/80 block mt-0.5">64명 프로필 & SNS</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigateTab('partner_logos', 'logo_list')}
            className="p-4 rounded-2xl bg-stone-50 hover:bg-[#0B3C26] hover:text-white border border-stone-200 text-left transition-all duration-200 group cursor-pointer"
          >
            <Handshake className="w-6 h-6 text-[#0B3C26] group-hover:text-[#D4AF37] mb-2 transition-colors" />
            <span className="text-xs sm:text-sm font-black block">MOU 로고 관리</span>
            <span className="text-[11px] text-stone-500 group-hover:text-emerald-100/80 block mt-0.5">인피니티 롤링 배너</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigateTab('community', 'notice_list')}
            className="p-4 rounded-2xl bg-stone-50 hover:bg-[#0B3C26] hover:text-white border border-stone-200 text-left transition-all duration-200 group cursor-pointer"
          >
            <Megaphone className="w-6 h-6 text-[#0B3C26] group-hover:text-[#D4AF37] mb-2 transition-colors" />
            <span className="text-xs sm:text-sm font-black block">공지사항 & 게시판</span>
            <span className="text-[11px] text-stone-500 group-hover:text-emerald-100/80 block mt-0.5">보도자료 & 대회공지</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigateTab('reservations', 'enrollees_list')}
            className="p-4 rounded-2xl bg-stone-50 hover:bg-[#0B3C26] hover:text-white border border-stone-200 text-left transition-all duration-200 group cursor-pointer"
          >
            <Users className="w-6 h-6 text-[#0B3C26] group-hover:text-[#D4AF37] mb-2 transition-colors" />
            <span className="text-xs sm:text-sm font-black block">수강생 회원 (128명)</span>
            <span className="text-[11px] text-stone-500 group-hover:text-emerald-100/80 block mt-0.5">결제상태 & 수강증</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigateTab('settings', 'corp_info')}
            className="p-4 rounded-2xl bg-stone-50 hover:bg-[#0B3C26] hover:text-white border border-stone-200 text-left transition-all duration-200 group cursor-pointer"
          >
            <Settings className="w-6 h-6 text-[#0B3C26] group-hover:text-[#D4AF37] mb-2 transition-colors" />
            <span className="text-xs sm:text-sm font-black block">기관 대표 정보 설정</span>
            <span className="text-[11px] text-stone-500 group-hover:text-emerald-100/80 block mt-0.5">대표번호 & 주소 설정</span>
          </button>
        </div>
      </div>

      {/* Two Live Workstation Feeds Grid: Recent Enrollees & Recent Inquiries */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7">
        
        {/* Left Column: Recent Student Enrollees (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3.5">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#0B3C26]" />
                <h3 className="text-base font-black text-gray-900">최근 실시간 수강 등록 내역</h3>
              </div>
              <button
                type="button"
                onClick={() => onNavigateTab('reservations', 'enrollees_list')}
                className="text-xs font-bold text-[#0B3C26] hover:text-[#C5A059] transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span>전체 128명 명단보기</span>
                <ChevronRight size={13} />
              </button>
            </div>

            <div className="overflow-x-auto no-scrollbar">
              <table className="w-full text-left border-collapse min-w-[500px]">
                <thead>
                  <tr className="text-xs font-black text-stone-400 border-b border-stone-100">
                    <th className="pb-2.5 px-2">등록번호</th>
                    <th className="pb-2.5 px-2">수강생명</th>
                    <th className="pb-2.5 px-2">과정명</th>
                    <th className="pb-2.5 px-2">결제금액</th>
                    <th className="pb-2.5 px-2 text-center">상태</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-xs font-semibold text-stone-700">
                  {recentEnrollees.map((enrollee) => (
                    <tr key={enrollee.id} className="hover:bg-stone-50 transition-colors">
                      <td className="py-3 px-2 font-mono text-stone-400 text-[11px]">
                        {privacyMode ? maskId(enrollee.id) : enrollee.id}
                      </td>
                      <td className="py-3 px-2 font-black text-gray-900">
                        {privacyMode ? maskName(enrollee.studentName) : enrollee.studentName}
                      </td>
                      <td className="py-3 px-2 font-medium text-stone-800 truncate max-w-[170px]">
                        {enrollee.courseTitle}
                      </td>
                      <td className="py-3 px-2 font-black text-emerald-800">
                        {enrollee.paidAmount ? `${enrollee.paidAmount.toLocaleString()}원` : '-'}
                      </td>
                      <td className="py-3 px-2 text-center">
                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black ${
                          enrollee.status === 'completed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {enrollee.status === 'completed' ? '결제완료' : '입금대기'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-400">
            <span>{privacyMode ? '개인정보 보호 마스킹 작동중' : '전체 정보 노출중'}</span>
            <span className="font-bold text-[#0B3C26]">128명 전원 수강증 및 영수증 발급 가능</span>
          </div>
        </div>

        {/* Right Column: Recent 1:1 Inquiries (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3.5">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-emerald-700" />
                <h3 className="text-base font-black text-gray-900">1:1 수강 상담 문의</h3>
              </div>
              <button
                type="button"
                onClick={() => onNavigateTab('inquiries', 'inquiry_all')}
                className="text-xs font-bold text-[#0B3C26] hover:text-[#C5A059] transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span>전체 문의보기</span>
                <ChevronRight size={13} />
              </button>
            </div>

            <div className="space-y-3">
              {recentInquiries.map((inq) => (
                <div
                  key={inq.id}
                  onClick={() => onNavigateTab('inquiries', 'inquiry_all')}
                  className="p-3.5 rounded-2xl bg-stone-50 hover:bg-emerald-50/60 border border-stone-200 transition-all cursor-pointer space-y-1.5"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-black text-gray-900 truncate max-w-[160px]">
                      {privacyMode ? maskName(inq.studentName) : inq.studentName} 수강생
                    </span>
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                      inq.status === 'completed'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-rose-100 text-rose-800 animate-pulse'
                    }`}>
                      {inq.status === 'completed' ? '답변완료' : '답변대기'}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-stone-700 line-clamp-1">
                    {inq.title}
                  </p>
                  <div className="flex items-center justify-between text-[11px] text-stone-400 pt-1">
                    <span>{inq.categoryName}</span>
                    <span>{inq.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => onNavigateTab('inquiries', 'chatbot_settings')}
            className="w-full py-2.5 bg-stone-100 hover:bg-[#0B3C26] hover:text-white rounded-xl text-xs font-black transition-colors flex items-center justify-center gap-1.5 cursor-pointer text-stone-700"
          >
            <Bot size={14} />
            <span>AI 챗봇 사전 질문/답변 설정 열기</span>
          </button>
        </div>

      </div>

    </div>
  );
}
