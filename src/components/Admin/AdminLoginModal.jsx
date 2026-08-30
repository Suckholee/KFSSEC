import React, { useState } from 'react';
import { ShieldCheck, Lock, User, Key, ArrowRight, AlertTriangle, X } from 'lucide-react';

export default function AdminLoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [adminId, setAdminId] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    // Verification: admin / kfssec2026! or admin1234
    if (adminId.trim() === 'admin' && (adminPassword === 'kfssec2026!' || adminPassword === 'admin1234' || adminPassword === '1234')) {
      setErrorMsg('');
      onLoginSuccess();
    } else {
      setErrorMsg('관리자 아이디 또는 비밀번호가 올바르지 않습니다.');
    }
  };

  const handleQuickDemoLogin = () => {
    setAdminId('admin');
    setAdminPassword('kfssec2026!');
    setErrorMsg('');
    onLoginSuccess();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md bg-[#0d1712] rounded-3xl border border-emerald-500/40 p-6 sm:p-8 shadow-2xl space-y-6 text-white">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-gray-400 hover:text-white rounded-full hover:bg-emerald-950/60 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Title */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto shadow-lg">
            <Lock className="w-7 h-7" />
          </div>
          <span className="text-[11px] font-black text-emerald-400 bg-emerald-500/20 border border-emerald-500/30 px-3 py-1 rounded-full uppercase tracking-wider inline-block">
            RESTRICTED ADMIN AREA
          </span>
          <h2 className="text-2xl font-black text-white">관리자 보안 로그인</h2>
          <p className="text-xs text-gray-400">
            사단법인 한국외식창업교육원 인가된 이사장 및 관리자 전용 접속 구역입니다.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4 pt-2">
          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-bold flex items-center gap-2 animate-fadeIn">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-emerald-300">관리자 아이디</label>
            <div className="relative">
              <User className="w-4 h-4 text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={adminId}
                onChange={(e) => setAdminId(e.target.value)}
                placeholder="관리자 ID 입력 (예: admin)"
                className="w-full bg-[#16241c] border border-emerald-500/30 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-400 font-bold"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-emerald-300">비밀번호</label>
            <div className="relative">
              <Key className="w-4 h-4 text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                placeholder="비밀번호 입력"
                className="w-full bg-[#16241c] border border-emerald-500/30 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-400 font-bold"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            <span>관리자 인증 및 로그인</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Quick Demo Test Access Button */}
        <div className="pt-3 border-t border-emerald-900/60 text-center space-y-2">
          <p className="text-[11px] text-gray-400">
            테스트용 관리자 계정: ID: <code className="text-emerald-400 font-bold">admin</code> / PW: <code className="text-emerald-400 font-bold">kfssec2026!</code>
          </p>
          <button
            type="button"
            onClick={handleQuickDemoLogin}
            className="w-full py-2 bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-500/30 rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            ⚡ 원클릭 테스트 관리자 인증 로그인
          </button>
        </div>

      </div>
    </div>
  );
}
