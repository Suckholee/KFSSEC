import React, { useState, useEffect, useRef } from 'react';
import {
  Users,
  GraduationCap,
  Award,
  Handshake,
  MessageSquare,
  Sparkles,
  Bot,
  Plus,
  Clock,
  Eye,
  EyeOff,
  ChevronRight,
  Megaphone,
  Settings,
  Image,
  Star,
} from 'lucide-react';
import { maskName, maskPhone, maskId } from '../../utils/security';

export default function AdminDashboard({
  onNavigateTab,
  enrolleesList = [],
  coursesList = [],
  studentInquiries = [],
  siteData = {},
  activeSubTab = 'overview',
}) {
  const [privacyMode, setPrivacyMode] = useState(true);
  const quickActionsRef = useRef(null);

  useEffect(() => {
    if (activeSubTab === 'quick_actions') {
      const el = quickActionsRef.current || document.getElementById('quick-actions-hub');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [activeSubTab]);

  // Live KPI calculations
  const totalEnrollees = enrolleesList.length || 128;
  const totalCourses = coursesList.length || 12;
  const partnerCount = siteData?.partnerLogos?.length || 12;
  const pendingInquiriesCount = studentInquiries.filter((i) => i.status === 'pending').length;
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
      badge: '+18.2%',
      icon: Users,
    },
    {
      id: 'courses',
      subTab: 'course_list',
      title: '운영 교육과정',
      value: `${totalCourses}과목`,
      badge: '9개 자격',
      icon: GraduationCap,
    },
    {
      id: 'masters',
      subTab: 'profile_list',
      title: '명장·명인',
      value: '64명',
      badge: '명장 11명',
      icon: Award,
    },
    {
      id: 'partner_logos',
      subTab: 'logo_list',
      title: '협약기관(MOU)',
      value: `${partnerCount}개사`,
      badge: '산학협력',
      icon: Handshake,
    },
    {
      id: 'inquiries',
      subTab: 'inquiry_all',
      title: '1:1 수강 문의',
      value: `${totalInquiriesCount}건`,
      badge: pendingInquiriesCount > 0 ? `미답변 ${pendingInquiriesCount}건` : '답변완료',
      badgeAlert: pendingInquiriesCount > 0,
      icon: MessageSquare,
    },
    {
      id: 'marketing',
      subTab: 'generator',
      title: 'AI 마케팅·챗봇',
      value: '가동중',
      badge: '24시간',
      icon: Bot,
    },
  ];

  const quickActionItems = [
    {
      tab: 'home',
      subTab: 'banner_planner',
      icon: Image,
      label: '배너 AI 생성기',
      desc: '1920 띠배너·카드뉴스',
      accent: 'text-amber-600',
    },
    {
      tab: 'courses',
      subTab: 'course_add',
      icon: Plus,
      label: '신규 강좌 등록',
      desc: 'DB 등록 및 사진 업로드',
      accent: 'text-emerald-600',
    },
    {
      tab: 'marketing',
      subTab: 'generator',
      icon: Sparkles,
      label: 'AI 블로그 원고',
      desc: '네이버 블로그 1-Click',
      accent: 'text-purple-600',
    },
    {
      tab: 'inquiries',
      subTab: 'chatbot_settings',
      icon: Bot,
      label: '챗봇 상담 설정',
      desc: '버튼 및 AI 자동응답',
      accent: 'text-blue-600',
    },
    {
      tab: 'partner_logos',
      subTab: 'logo_list',
      icon: Handshake,
      label: 'MOU 로고 관리',
      desc: '협약기관 14개사',
      accent: 'text-indigo-600',
    },
    {
      tab: 'community',
      subTab: 'notice_list',
      icon: Megaphone,
      label: '공지 & 게시판',
      desc: '보도자료·대회공지',
      accent: 'text-teal-600',
    },
    {
      tab: 'reviews',
      subTab: 'review_list',
      icon: Star,
      label: '수강 후기 관리',
      desc: '별점 평가 & 노출 승인',
      accent: 'text-amber-500',
    },
    {
      tab: 'settings',
      subTab: 'corp_info',
      icon: Settings,
      label: '기관 정보 설정',
      desc: '대표자·주소·연락처',
      accent: 'text-gray-700',
    },
  ];

  return (
    <div className="space-y-4 animate-fadeIn font-sans text-gray-900 max-w-7xl mx-auto pb-8">
      {/* 1. Sleek Compact Header */}
      <div className="bg-white rounded-xl border border-gray-200 px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold text-gray-900 tracking-tight">
              통합 운영 대시보드
            </h2>
            <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              REST API 실시간 연동
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-0.5">
            사단법인 한국외식창업교육원 학사·강좌DB·수강문의 현황 및 바로가기
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setPrivacyMode(!privacyMode)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors flex items-center gap-1.5 cursor-pointer ${
              privacyMode
                ? 'bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-300'
                : 'bg-rose-50 text-rose-700 border-rose-300'
            }`}
            title="개인정보 마스킹 켜기/끄기"
          >
            {privacyMode ? <EyeOff className="w-3.5 h-3.5 text-gray-500" /> : <Eye className="w-3.5 h-3.5 text-rose-600" />}
            <span>{privacyMode ? '마스킹 ON' : '마스킹 OFF'}</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigateTab('courses', 'course_add')}
            className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>신규 강좌 등록</span>
          </button>
        </div>
      </div>

      {/* 2. Compact Metric Strip (Flat, High-Density, No Big Bloated Cards) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {stats.map((stat) => {
          const IconComp = stat.icon;
          return (
            <button
              key={stat.title}
              type="button"
              onClick={() => onNavigateTab(stat.id, stat.subTab)}
              className="bg-white p-3 rounded-xl border border-gray-200 hover:border-emerald-500 transition-all text-left flex flex-col justify-between group cursor-pointer shadow-2xs hover:bg-emerald-50/20"
            >
              <div className="flex items-center justify-between text-gray-500">
                <span className="text-[11px] font-semibold text-gray-500 truncate">{stat.title}</span>
                <IconComp className="w-3.5 h-3.5 text-gray-400 group-hover:text-emerald-600 transition-colors shrink-0" />
              </div>

              <div className="mt-2 flex items-baseline justify-between gap-1">
                <span className="text-lg font-bold text-gray-900 font-mono tracking-tight">
                  {stat.value}
                </span>
                <span
                  className={`text-[10px] font-semibold px-1.5 py-0.2 rounded shrink-0 ${
                    stat.badgeAlert
                      ? 'bg-rose-100 text-rose-700 animate-pulse'
                      : 'bg-emerald-50 text-emerald-700'
                  }`}
                >
                  {stat.badge}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* 3. Compact Quick Actions Toolbar */}
      <div
        id="quick-actions-hub"
        ref={quickActionsRef}
        className="bg-white rounded-xl border border-gray-200 p-3.5 space-y-2.5 shadow-2xs"
      >
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-xs font-bold text-gray-800">빠른 업무 바로가기</span>
          </div>
          <span className="text-[11px] text-gray-400">클릭 시 해당 관리 기능으로 바로 전환됩니다</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {quickActionItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                type="button"
                onClick={() => onNavigateTab(item.tab, item.subTab)}
                className="p-2.5 rounded-lg border border-gray-100 bg-gray-50/70 hover:bg-emerald-50 hover:border-emerald-200 transition-all text-left flex flex-col justify-between group cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <Icon className={`w-4 h-4 ${item.accent}`} />
                  <ChevronRight className="w-3 h-3 text-gray-300 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
                </div>
                <div className="mt-2">
                  <span className="text-xs font-bold text-gray-800 block truncate group-hover:text-emerald-900">
                    {item.label}
                  </span>
                  <span className="text-[10px] text-gray-400 block truncate mt-0.5">
                    {item.desc}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Live Data Tables & Feeds: Recent Enrollees & Inquiries */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Column: Recent Student Enrollees (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-xl p-4 sm:p-5 border border-gray-200 shadow-2xs space-y-3 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-gray-100 pb-2.5">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-700" />
                <h3 className="text-xs sm:text-sm font-bold text-gray-900">최근 실시간 수강 등록 내역</h3>
              </div>
              <button
                type="button"
                onClick={() => onNavigateTab('reservations', 'enrollees_list')}
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 transition-colors flex items-center gap-0.5 cursor-pointer"
              >
                <span>전체 128명 명단</span>
                <ChevronRight size={13} />
              </button>
            </div>

            <div className="overflow-x-auto no-scrollbar">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="text-[11px] font-bold text-gray-400 border-b border-gray-100 bg-gray-50/50">
                    <th className="py-2 px-2.5">등록번호</th>
                    <th className="py-2 px-2.5">수강생명</th>
                    <th className="py-2 px-2.5">과정명</th>
                    <th className="py-2 px-2.5 text-center">신청일자</th>
                    <th className="py-2 px-2.5 text-center">학사상태</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-700 font-medium">
                  {recentEnrollees.map((enrollee) => (
                    <tr key={enrollee.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-2.5 px-2.5 font-mono text-gray-400 text-[11px]">
                        {privacyMode ? maskId(enrollee.id) : enrollee.id}
                      </td>
                      <td className="py-2.5 px-2.5 font-bold text-gray-900">
                        {privacyMode ? maskName(enrollee.studentName) : enrollee.studentName}
                      </td>
                      <td className="py-2.5 px-2.5 text-gray-800 truncate max-w-[170px]">
                        {enrollee.courseTitle}
                      </td>
                      <td className="py-2.5 px-2.5 text-center font-mono text-gray-500 text-[11px]">
                        {enrollee.joinDate || '2026.08.30'}
                      </td>
                      <td className="py-2.5 px-2.5 text-center">
                        <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                          수강등록
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="pt-2.5 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400">
            <span>{privacyMode ? '개인정보 보호 마스킹 작동중' : '전체 정보 노출중'}</span>
            <span className="font-semibold text-emerald-800">128명 수강생 학사 관리 및 수강증 발급 가능</span>
          </div>
        </div>

        {/* Right Column: Recent 1:1 Inquiries (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-xl p-4 sm:p-5 border border-gray-200 shadow-2xs space-y-3 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-gray-100 pb-2.5">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-emerald-700" />
                <h3 className="text-xs sm:text-sm font-bold text-gray-900">1:1 수강 상담 문의</h3>
              </div>
              <button
                type="button"
                onClick={() => onNavigateTab('inquiries', 'inquiry_all')}
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 transition-colors flex items-center gap-0.5 cursor-pointer"
              >
                <span>전체 문의보기</span>
                <ChevronRight size={13} />
              </button>
            </div>

            <div className="space-y-2">
              {recentInquiries.map((inq) => (
                <div
                  key={inq.id}
                  onClick={() => onNavigateTab('inquiries', 'inquiry_all')}
                  className="p-2.5 rounded-lg bg-gray-50/70 hover:bg-emerald-50/40 border border-gray-200 transition-colors cursor-pointer space-y-1"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-gray-900 truncate max-w-[160px]">
                      {privacyMode ? maskName(inq.studentName) : inq.studentName} 수강생
                    </span>
                    <span
                      className={`text-[10px] font-semibold px-1.5 py-0.2 rounded ${
                        inq.status === 'completed'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : 'bg-rose-50 text-rose-800 border border-rose-200'
                      }`}
                    >
                      {inq.status === 'completed' ? '답변완료' : '답변대기'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-700 line-clamp-1 font-medium">
                    {inq.title}
                  </p>
                  <div className="flex items-center justify-between text-[10px] text-gray-400 pt-0.5">
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
            className="w-full py-2 bg-gray-50 hover:bg-emerald-600 hover:text-white rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer text-gray-700 border border-gray-200 hover:border-emerald-600"
          >
            <Bot size={13} />
            <span>AI 챗봇 사전 질문/답변 설정 열기</span>
          </button>
        </div>
      </div>
    </div>
  );
}
