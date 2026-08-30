import React, { useState } from 'react';
import { Building2, Phone, MapPin, Mail, Lock, Save, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function AdminSettings() {
  const [corpName, setCorpName] = useState('사단법인 한국외식창업교육원');
  const [ceoName, setCeoName] = useState('안형상 이사장');
  const [address, setAddress] = useState('서울특별시 서초구 사임당로 174, 강남미래타워 5층 (우: 06628)');
  const [phone, setPhone] = useState('02-3474-7001');
  const [fax, setFax] = useState('02-3474-7002');
  const [email, setEmail] = useState('contact@kfssec.or.kr');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Header Bar */}
      <div className="bg-[#111c16] p-6 rounded-3xl border border-emerald-500/20 shadow-xl">
        <h2 className="text-xl sm:text-2xl font-black text-white">
          기관 대표 정보 & 시스템 설정
        </h2>
        <p className="text-xs sm:text-sm text-emerald-200/70 font-medium mt-1">
          홈페이지 푸터 및 오시는 길, 기관 개요에 표시되는 법인 공식 정보와 연락처를 관리합니다.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Institution Info Card */}
        <div className="bg-[#111c16] rounded-3xl p-6 sm:p-8 border border-emerald-500/20 shadow-xl space-y-5">
          <div className="flex items-center gap-3 border-b border-emerald-900/60 pb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white">법인 표기 정보 관리</h3>
              <p className="text-xs text-gray-400">푸터 및 사업자 안내에 수록되는 공식 레거시 정보입니다.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs sm:text-sm">
            <div className="space-y-1.5">
              <label className="font-extrabold text-emerald-300">법인명</label>
              <input
                type="text"
                value={corpName}
                onChange={(e) => setCorpName(e.target.value)}
                className="w-full bg-[#16241c] border border-emerald-500/30 rounded-xl px-4 py-2.5 text-white font-bold focus:outline-none focus:border-emerald-400"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-extrabold text-emerald-300">대표자 (이사장)</label>
              <input
                type="text"
                value={ceoName}
                onChange={(e) => setCeoName(e.target.value)}
                className="w-full bg-[#16241c] border border-emerald-500/30 rounded-xl px-4 py-2.5 text-white font-bold focus:outline-none focus:border-emerald-400"
              />
            </div>

            <div className="md:col-span-2 space-y-1.5">
              <label className="font-extrabold text-emerald-300">교육원 주소</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-[#16241c] border border-emerald-500/30 rounded-xl px-4 py-2.5 text-white font-bold focus:outline-none focus:border-emerald-400"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-extrabold text-emerald-300">대표 전화번호</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-[#16241c] border border-emerald-500/30 rounded-xl px-4 py-2.5 text-white font-bold focus:outline-none focus:border-emerald-400"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-extrabold text-emerald-300">팩스 번호</label>
              <input
                type="text"
                value={fax}
                onChange={(e) => setFax(e.target.value)}
                className="w-full bg-[#16241c] border border-emerald-500/30 rounded-xl px-4 py-2.5 text-white font-bold focus:outline-none focus:border-emerald-400"
              />
            </div>
          </div>
        </div>

        {/* Submit Save Button */}
        <div className="flex items-center justify-between pt-2">
          {savedSuccess ? (
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm animate-fadeIn">
              <CheckCircle2 className="w-5 h-5" />
              <span>기관 정보가 성공적으로 업데이트되었습니다!</span>
            </div>
          ) : <div />}

          <button
            type="submit"
            className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-sm rounded-xl shadow-lg transition-all cursor-pointer flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>기관 정보 저장</span>
          </button>
        </div>

      </form>

    </div>
  );
}
