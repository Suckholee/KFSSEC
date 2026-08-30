import React, { useState } from 'react';
import { Users, GraduationCap, TrendingUp, CreditCard, ChevronRight, ArrowUpRight, ArrowDownRight, Clock, CheckCircle2, AlertCircle, Eye, EyeOff, Shield } from 'lucide-react';
import { maskName, maskPhone, maskId } from '../../utils/security';

export default function AdminDashboard({ onNavigateTab }) {
  const [privacyMode, setPrivacyMode] = useState(true);

  const stats = [
    {
      id: 'users',
      title: '총 등록 회원 수',
      value: '1,248 명',
      change: '+12.4%',
      isUp: true,
      icon: Users,
      color: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    },
    {
      id: 'applications',
      title: '누적 수강 신청 건수',
      value: '452 건',
      change: '+18.2%',
      isUp: true,
      icon: GraduationCap,
      color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    },
    {
      id: 'revenue',
      title: '당월 수강 결제 금액',
      value: '42,850,000 원',
      change: '+8.6%',
      isUp: true,
      icon: CreditCard,
      color: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    },
    {
      id: 'conversion',
      title: '창업 수강 수료율',
      value: '94.8 %',
      change: '+2.1%',
      isUp: true,
      icon: TrendingUp,
      color: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
    },
  ];

  const recentApplications = [
    {
      id: 'APP-2026-089',
      name: '김창업',
      phone: '010-3849-8120',
      course: '외식창업 마스터 풀 패키지',
      date: '2026-08-30 16:42',
      amount: '1,200,000원',
      status: '결제완료',
      statusColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    },
    {
      id: 'APP-2026-088',
      name: '이수진',
      phone: '010-9281-3019',
      course: '반려동물 영양·식재료 기초',
      date: '2026-08-30 15:10',
      amount: '120,000원',
      status: '상담대기',
      statusColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    },
    {
      id: 'APP-2026-087',
      name: '박재민',
      phone: '010-4720-9102',
      course: '240203 정기총회 외식경영 세미나',
      date: '2026-08-30 14:25',
      amount: '0원 (무료)',
      status: '신청완료',
      statusColor: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
    },
    {
      id: 'APP-2026-086',
      name: '최명진',
      phone: '010-5821-4910',
      course: '창업기획·사업계획 수립 마스터',
      date: '2026-08-30 11:05',
      amount: '120,000원',
      status: '결제완료',
      statusColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    },
    {
      id: 'APP-2026-085',
      name: '정현우',
      phone: '010-1849-9301',
      course: '메뉴개발·원가관리 풀 패키지',
      date: '2026-08-29 18:30',
      amount: '980,000원',
      status: '상담대기',
      statusColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Top Banner Notice with Privacy Toggle */}
      <div className="bg-gradient-to-r from-emerald-950 via-[#0a2318] to-[#0d1c15] p-6 rounded-3xl border border-emerald-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-black text-emerald-400 bg-emerald-500/20 border border-emerald-500/40 px-3 py-1 rounded-full uppercase tracking-wider">
              ADMIN SYSTEM ACTIVE
            </span>
            <span className="text-xs font-bold text-emerald-300/90 bg-emerald-950 px-2.5 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1">
              <Shield className="w-3 h-3 text-emerald-400" />
              <span>개인정보보호법 준수 마스킹</span>
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white mt-2">
            사단법인 한국외식창업교육원 종합 통합 관리자 센터
          </h2>
          <p className="text-xs sm:text-sm text-emerald-200/70 font-medium mt-1">
            실시간 수강 신청 현황, 매출 통계, 교육과정 관리 및 회원 권한을 제어합니다.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 self-start sm:self-auto">
          {/* Privacy Toggle Button */}
          <button
            onClick={() => setPrivacyMode(!privacyMode)}
            className={`px-3.5 py-2 rounded-xl text-xs font-extrabold border transition-all flex items-center gap-1.5 cursor-pointer ${
              privacyMode
                ? 'bg-emerald-950 text-emerald-300 border-emerald-500/40'
                : 'bg-rose-950/60 text-rose-300 border-rose-500/40'
            }`}
            title="개인정보 마스킹 켜기/끄기"
          >
            {privacyMode ? <EyeOff className="w-4 h-4 text-emerald-400" /> : <Eye className="w-4 h-4 text-rose-400" />}
            <span>{privacyMode ? '마스킹 보호 작동중' : '마스킹 해제됨'}</span>
          </button>

          <button
            onClick={() => onNavigateTab('applications')}
            className="px-5 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg transition-all shrink-0 cursor-pointer flex items-center gap-1.5"
          >
            <span>수강 신청 관리</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 4 Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat) => {
          const IconComp = stat.icon;
          return (
            <div
              key={stat.id}
              onClick={() => onNavigateTab(stat.id)}
              className="bg-[#111c16] rounded-3xl p-6 border border-emerald-500/20 hover:border-emerald-400/50 shadow-lg hover:shadow-2xl transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-gray-400">
                  {stat.title}
                </span>
                <div className={`p-2.5 rounded-2xl border ${stat.color} group-hover:scale-110 transition-transform`}>
                  <IconComp className="w-5 h-5" />
                </div>
              </div>

              <div className="mt-4 space-y-1">
                <span className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {stat.value}
                </span>
                <div className="flex items-center gap-1 text-xs font-bold text-emerald-400">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>{stat.change} 전월 대비 상승</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Applications Feed with Security Privacy Masking */}
      <div className="bg-[#111c16] rounded-3xl p-6 sm:p-8 border border-emerald-500/20 shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-emerald-900/60 pb-4">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-emerald-400" />
            <h3 className="text-lg font-black text-white">
              최근 실시간 수강 신청 및 상담 접수 내역
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-emerald-400 font-bold bg-emerald-950 px-2.5 py-1 rounded-lg border border-emerald-500/30">
              {privacyMode ? '🔒 개인정보 마스킹 적용' : '🔓 원본 전체 노출'}
            </span>
            <button
              onClick={() => onNavigateTab('applications')}
              className="text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>전체보기</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="text-xs font-black text-emerald-400/80 border-b border-emerald-900/40">
                <th className="pb-3 px-2">접수번호</th>
                <th className="pb-3 px-2">신청자명</th>
                <th className="pb-3 px-2">연락처</th>
                <th className="pb-3 px-2">신청 과정</th>
                <th className="pb-3 px-2">접수 일시</th>
                <th className="pb-3 px-2">결제 금액</th>
                <th className="pb-3 px-2 text-center">진행 상태</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-900/30 text-xs sm:text-sm font-semibold text-gray-200">
              {recentApplications.map((app) => (
                <tr key={app.id} className="hover:bg-emerald-950/40 transition-colors">
                  <td className="py-3.5 px-2 font-mono text-xs text-gray-400">
                    {privacyMode ? maskId(app.id) : app.id}
                  </td>
                  <td className="py-3.5 px-2 font-black text-white">
                    {privacyMode ? maskName(app.name) : app.name}
                  </td>
                  <td className="py-3.5 px-2 font-bold text-emerald-300 text-xs">
                    {privacyMode ? maskPhone(app.phone) : app.phone}
                  </td>
                  <td className="py-3.5 px-2 font-bold text-emerald-200">{app.course}</td>
                  <td className="py-3.5 px-2 text-xs text-gray-400">{app.date}</td>
                  <td className="py-3.5 px-2 font-black text-white">{app.amount}</td>
                  <td className="py-3.5 px-2 text-center">
                    <span className={`inline-block px-3 py-1 rounded-full text-[11px] font-black border ${app.statusColor}`}>
                      {app.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
