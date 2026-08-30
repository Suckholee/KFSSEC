import React, { useState } from 'react';
import { Search, Filter, Phone, CheckCircle2, Clock, XCircle, CreditCard, ChevronDown, Download } from 'lucide-react';

export default function AdminApplications() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const [applications, setApplications] = useState([
    {
      id: 'APP-2026-089',
      name: '김창업',
      phone: '010-3849-8120',
      email: 'changup.kim@gmail.com',
      course: '외식창업 마스터 풀 패키지',
      date: '2026-08-30 16:42',
      price: '1,200,000원',
      paymentMethod: '카카오페이 / 카드',
      status: '결제완료',
    },
    {
      id: 'APP-2026-088',
      name: '이수진',
      phone: '010-9281-3019',
      email: 'sujin.lee@naver.com',
      course: '반려동물 영양·식재료 기초',
      date: '2026-08-30 15:10',
      price: '120,000원',
      paymentMethod: '무통장 입금 대기',
      status: '상담대기',
    },
    {
      id: 'APP-2026-087',
      name: '박재민',
      phone: '010-4720-9102',
      email: 'jaemin.park@gmail.com',
      course: '240203 정기총회 외식경영 세미나',
      date: '2026-08-30 14:25',
      price: '0원 (무료)',
      paymentMethod: '무료 이벤트',
      status: '신청완료',
    },
    {
      id: 'APP-2026-086',
      name: '최명진',
      phone: '010-5821-4910',
      email: 'myungjin.choi@kakao.com',
      course: '창업기획·사업계획 수립 마스터',
      date: '2026-08-30 11:05',
      price: '120,000원',
      paymentMethod: '신용카드 결제',
      status: '결제완료',
    },
    {
      id: 'APP-2026-085',
      name: '정현우',
      phone: '010-1849-9301',
      email: 'hyunwoo.jung@naver.com',
      course: '메뉴개발·원가관리 풀 패키지',
      date: '2026-08-29 18:30',
      price: '980,000원',
      paymentMethod: '무통장 입금 대기',
      status: '상담대기',
    },
    {
      id: 'APP-2026-084',
      name: '한소영',
      phone: '010-7410-2819',
      email: 'soyoung.han@gmail.com',
      course: '수제간식·펫푸드 실전',
      date: '2026-08-29 14:12',
      price: '80,000원',
      paymentMethod: '카카오페이',
      status: '수강중',
    },
  ]);

  const filteredApps = applications.filter((app) => {
    const matchesSearch =
      app.name.includes(searchTerm) ||
      app.phone.includes(searchTerm) ||
      app.course.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (id, newStatus) => {
    setApplications(
      applications.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
    );
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case '결제완료':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      case '상담대기':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case '신청완료':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/40';
      case '수강중':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/40';
      case '취소':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/40';
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#111c16] p-6 rounded-3xl border border-emerald-500/20 shadow-xl">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            실시간 수강 신청 및 결제 관리
          </h2>
          <p className="text-xs sm:text-sm text-emerald-200/70 font-medium mt-1">
            홈페이지에서 신청된 창업 수강생 내역, 입금 상태 및 상담 진행 상태를 관리합니다.
          </p>
        </div>

        <button
          onClick={() => alert('Excel 명단 다운로드 기능이 시작됩니다.')}
          className="px-5 py-2.5 bg-[#162a20] hover:bg-emerald-900 border border-emerald-500/30 text-emerald-300 font-bold text-xs sm:text-sm rounded-xl shadow-lg transition-all shrink-0 cursor-pointer flex items-center gap-2 self-start sm:self-auto"
        >
          <Download className="w-4 h-4" />
          <span>수강생 명단 엑셀 다운로드</span>
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
            placeholder="수강생 성함, 전화번호, 신청과정 검색..."
            className="w-full bg-[#16241c] border border-emerald-500/30 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-white placeholder-emerald-800/60 focus:outline-none focus:border-emerald-400"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto no-scrollbar">
          <Filter className="w-4 h-4 text-emerald-400 shrink-0" />
          {['all', '결제완료', '상담대기', '신청완료', '수강중', '취소'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                statusFilter === st
                  ? 'bg-emerald-500 text-white shadow-md'
                  : 'bg-[#16241c] text-gray-300 hover:bg-emerald-950 hover:text-emerald-300'
              }`}
            >
              {st === 'all' ? '전체 보기' : st}
            </button>
          ))}
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-[#111c16] rounded-3xl p-6 border border-emerald-500/20 shadow-xl">
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="text-xs font-black text-emerald-400/80 border-b border-emerald-900/40">
                <th className="pb-3 px-3">접수 ID</th>
                <th className="pb-3 px-3">수강생명</th>
                <th className="pb-3 px-3">연락처 / 이메일</th>
                <th className="pb-3 px-3">신청 과정명</th>
                <th className="pb-3 px-3">신청 일시</th>
                <th className="pb-3 px-3">결제 금액</th>
                <th className="pb-3 px-3 text-center">상태 변경</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-900/30 text-xs sm:text-sm font-semibold text-gray-200">
              {filteredApps.map((app) => (
                <tr key={app.id} className="hover:bg-emerald-950/40 transition-colors">
                  <td className="py-3.5 px-3 font-mono text-xs text-gray-400">{app.id}</td>
                  <td className="py-3.5 px-3 font-black text-white">{app.name}</td>
                  <td className="py-3.5 px-3">
                    <div className="text-xs">
                      <span className="font-bold text-emerald-300 block">{app.phone}</span>
                      <span className="text-gray-400 text-[11px]">{app.email}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-3 font-bold text-gray-200">{app.course}</td>
                  <td className="py-3.5 px-3 text-xs text-gray-400">{app.date}</td>
                  <td className="py-3.5 px-3 font-black text-white">{app.price}</td>
                  <td className="py-3.5 px-3 text-center">
                    <select
                      value={app.status}
                      onChange={(e) => handleStatusChange(app.id, e.target.value)}
                      className={`px-3 py-1 rounded-xl text-xs font-black border bg-[#122219] cursor-pointer focus:outline-none ${getStatusBadge(
                        app.status
                      )}`}
                    >
                      <option value="결제완료">결제완료</option>
                      <option value="상담대기">상담대기</option>
                      <option value="신청완료">신청완료</option>
                      <option value="수강중">수강중</option>
                      <option value="취소">취소</option>
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
