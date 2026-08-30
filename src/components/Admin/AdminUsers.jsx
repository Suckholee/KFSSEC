import React, { useState } from 'react';
import { Search, UserCheck, Shield, User, Key, CheckCircle, Mail, MessageSquare, Layers } from 'lucide-react';
import { maskName, maskEmail } from '../../utils/security';

export default function AdminUsers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  const [users, setUsers] = useState([
    {
      id: 'USR-1001',
      name: '안형상',
      email: 'ahn@kfssec.or.kr',
      provider: '이메일',
      role: '이사장 / 관리자',
      joinDate: '2022-07-12',
      enrolledCoursesCount: 4,
      coursesList: ['외식창업 마스터 풀 패키지', '메뉴개발·원가관리', '매장운영·서비스', '외식마케팅'],
    },
    {
      id: 'USR-1002',
      name: '김창업',
      email: 'changup.kim@kakao.com',
      provider: '카카오톡',
      role: '수강생',
      joinDate: '2026-08-15',
      enrolledCoursesCount: 2,
      coursesList: ['외식창업 마스터 풀 패키지', '메뉴개발·원가관리'],
    },
    {
      id: 'USR-1003',
      name: '이수진',
      email: 'sujin.lee@gmail.com',
      provider: '구글',
      role: '수강생',
      joinDate: '2026-08-18',
      enrolledCoursesCount: 3,
      coursesList: ['반려동물 영양·식재료 기초', '반려견 행동 이해', '창업기획·사업계획'],
    },
    {
      id: 'USR-1004',
      name: '박재민',
      email: 'jaemin.park@naver.com',
      provider: '네이버',
      role: '일반회원',
      joinDate: '2026-08-20',
      enrolledCoursesCount: 1,
      coursesList: ['카페 창업 마스터클래스'],
    },
    {
      id: 'USR-1005',
      name: '최명진',
      email: 'myungjin.choi@gmail.com',
      provider: '구글',
      role: '수강생',
      joinDate: '2026-08-22',
      enrolledCoursesCount: 2,
      coursesList: ['창업기획 마스터', '외식마케팅 풀 패키지'],
    },
  ]);

  const filteredUsers = users.filter((u) => {
    const matchesSearch = u.name.includes(searchTerm) || u.email.includes(searchTerm);
    const matchesRole = roleFilter === 'all' || u.role.includes(roleFilter);
    return matchesSearch && matchesRole;
  });

  const handleRoleChange = (id, newRole) => {
    setUsers(users.map((u) => (u.id === id ? { ...u, role: newRole } : u)));
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#111c16] p-6 rounded-3xl border border-emerald-500/20 shadow-xl">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            등록 회원 & N:N 수강 매칭 관리 센터
          </h2>
          <p className="text-xs sm:text-sm text-emerald-200/70 font-medium mt-1">
            카카오톡, 구글, 이메일 가입 회원들의 권한 및 N:N 병행 수강 매칭 목록을 한눈에 관리합니다.
          </p>
        </div>

        <button
          onClick={() => alert('신규 관리자 계정 초대 모달이 열립니다.')}
          className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg transition-all shrink-0 cursor-pointer flex items-center gap-2 self-start sm:self-auto"
        >
          <UserCheck className="w-4 h-4" />
          <span>신규 관리자 초대</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#0e1712] p-4 rounded-2xl border border-emerald-900/60">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="회원 이름 또는 이메일 검색..."
            className="w-full bg-[#16241c] border border-emerald-500/30 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-white placeholder-emerald-800/60 focus:outline-none focus:border-emerald-400"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {['all', '관리자', '수강생', '일반회원'].map((rf) => (
            <button
              key={rf}
              onClick={() => setRoleFilter(rf)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                roleFilter === rf
                  ? 'bg-emerald-500 text-white shadow-md'
                  : 'bg-[#16241c] text-gray-300 hover:bg-emerald-950 hover:text-emerald-300'
              }`}
            >
              {rf === 'all' ? '전체 보기' : rf}
            </button>
          ))}
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-[#111c16] rounded-3xl p-6 border border-emerald-500/20 shadow-xl">
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left border-collapse min-w-[750px]">
            <thead>
              <tr className="text-xs font-black text-emerald-400/80 border-b border-emerald-900/40">
                <th className="pb-3 px-3">회원 ID</th>
                <th className="pb-3 px-3">회원명</th>
                <th className="pb-3 px-3">이메일 계정</th>
                <th className="pb-3 px-3">N:N 매칭 수강과목</th>
                <th className="pb-3 px-3">가입일자</th>
                <th className="pb-3 px-3 text-center">회원 권한</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-900/30 text-xs sm:text-sm font-semibold text-gray-200">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-emerald-950/40 transition-colors">
                  <td className="py-3.5 px-3 font-mono text-xs text-gray-400">{u.id}</td>
                  <td className="py-3.5 px-3 font-black text-white">{u.name}</td>
                  <td className="py-3.5 px-3 text-emerald-200">{u.email}</td>
                  <td className="py-3.5 px-3">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-black">
                        {u.enrolledCoursesCount}개 과목 병행 수강
                      </span>
                    </div>
                  </td>
                  <td className="py-3.5 px-3 text-xs text-gray-400 font-mono">{u.joinDate}</td>
                  <td className="py-3.5 px-3 text-center">
                    <select
                      value={u.role}
                      onChange={(e) => handleRoleChange(u.id, e.target.value)}
                      className="px-3 py-1 rounded-xl text-xs font-black border bg-[#122219] border-emerald-500/40 text-emerald-300 cursor-pointer focus:outline-none"
                    >
                      <option value="이사장 / 관리자">이사장 / 관리자</option>
                      <option value="수강생">수강생</option>
                      <option value="일반회원">일반회원</option>
                    </select>
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
