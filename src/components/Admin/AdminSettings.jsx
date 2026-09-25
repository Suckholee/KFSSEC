import React, { useState, useEffect } from 'react';
import {
  Building2,
  Phone,
  MapPin,
  Mail,
  Lock,
  Save,
  CheckCircle2,
  ShieldCheck,
  Globe,
  Clock,
  FileCheck,
  Smartphone,
  ExternalLink,
} from 'lucide-react';

export default function AdminSettings({ siteData = {}, onUpdateSiteData }) {
  const currentInfo = siteData?.institutionInfo || {};

  const [corpName, setCorpName] = useState(
    currentInfo.corpName || '사단법인 한국외식창업교육원'
  );
  const [engName, setEngName] = useState(
    currentInfo.engName || 'Korea Food Service Startup Education Center'
  );
  const [ceoName, setCeoName] = useState(
    currentInfo.ceoName || '안형상 이사장'
  );
  const [phone, setPhone] = useState(
    currentInfo.phone || '010-7244-6796'
  );
  const [tel, setTel] = useState(
    currentInfo.tel || '02-3474-7001'
  );
  const [fax, setFax] = useState(
    currentInfo.fax || '02-3474-7002'
  );
  const [email, setEmail] = useState(
    currentInfo.email || 'contact@kfssec.or.kr'
  );
  const [headquartersAddress, setHeadquartersAddress] = useState(
    currentInfo.headquartersAddress ||
      '서울특별시 강남구 테헤란로 123 KFSSEC 빌딩 3-5층 (실습 및 검정 전용 교육장)'
  );
  const [officeAddress, setOfficeAddress] = useState(
    currentInfo.officeAddress ||
      '서울특별시 서초구 사임당로 174, 강남미래타워 5층 (우: 06628)'
  );
  const [bizNumber, setBizNumber] = useState(
    currentInfo.bizNumber || '114-82-10825'
  );
  const [establishedDate, setEstablishedDate] = useState(
    currentInfo.establishedDate || '2022년 7월 29일'
  );
  const [operatingHours, setOperatingHours] = useState(
    currentInfo.operatingHours || '평일 09:00 - 18:00 (주말/공휴일 휴무)'
  );

  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (siteData?.institutionInfo) {
      const info = siteData.institutionInfo;
      if (info.corpName) setCorpName(info.corpName);
      if (info.engName) setEngName(info.engName);
      if (info.ceoName) setCeoName(info.ceoName);
      if (info.phone) setPhone(info.phone);
      if (info.tel) setTel(info.tel);
      if (info.fax) setFax(info.fax);
      if (info.email) setEmail(info.email);
      if (info.headquartersAddress) setHeadquartersAddress(info.headquartersAddress);
      if (info.officeAddress) setOfficeAddress(info.officeAddress);
      if (info.bizNumber) setBizNumber(info.bizNumber);
      if (info.establishedDate) setEstablishedDate(info.establishedDate);
      if (info.operatingHours) setOperatingHours(info.operatingHours);
    }
  }, [siteData]);

  const handleSave = (e) => {
    e.preventDefault();
    const updatedInfo = {
      corpName,
      engName,
      ceoName,
      phone,
      tel,
      fax,
      email,
      headquartersAddress,
      officeAddress,
      bizNumber,
      establishedDate,
      operatingHours,
    };

    if (onUpdateSiteData) {
      onUpdateSiteData({
        ...siteData,
        institutionInfo: updatedInfo,
      });
    }

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 animate-fadeIn font-sans text-gray-900 max-w-7xl mx-auto pb-12">
      
      {/* Header Bar */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black">
              OFFICIAL INSTITUTION PROFILE
            </span>
          </div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight mt-1">
            기관 대표 정보 & 시스템 설정
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            홈페이지 푸터(하단), 오시는 길, 교육원 소개 페이지에 표기되는 공식 법인 정보와 직통 연락처를 관리합니다.
          </p>
        </div>

        {savedSuccess && (
          <div className="flex items-center gap-2 text-emerald-700 bg-emerald-50 border border-emerald-300 px-4 py-2.5 rounded-2xl font-bold text-xs shadow-xs animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>설정이 성공적으로 저장되었습니다!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Core Institution Info Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-gray-900">법인 공식 표기 정보</h3>
              <p className="text-xs text-gray-500">푸터 및 사업자 안내에 수록되는 공식 등록 정보입니다.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
            <div className="space-y-1.5">
              <label className="font-black text-gray-700">법인명 (한글)</label>
              <input
                type="text"
                value={corpName}
                onChange={(e) => setCorpName(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2.5 text-gray-900 font-bold focus:outline-none focus:border-emerald-500"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-black text-gray-700">영문명 (English Name)</label>
              <input
                type="text"
                value={engName}
                onChange={(e) => setEngName(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2.5 text-gray-900 font-bold focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-black text-gray-700">대표자 (이사장)</label>
              <input
                type="text"
                value={ceoName}
                onChange={(e) => setCeoName(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2.5 text-gray-900 font-bold focus:outline-none focus:border-emerald-500"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-black text-gray-700">사업자 등록번호</label>
              <input
                type="text"
                value={bizNumber}
                onChange={(e) => setBizNumber(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2.5 text-gray-900 font-bold focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-black text-gray-700">설립 및 허가 일자</label>
              <input
                type="text"
                value={establishedDate}
                onChange={(e) => setEstablishedDate(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2.5 text-gray-900 font-bold focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-black text-gray-700">고객센터 운영시간</label>
              <input
                type="text"
                value={operatingHours}
                onChange={(e) => setOperatingHours(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2.5 text-gray-900 font-bold focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Contact Numbers & Location Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
            <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-gray-900">대표 연락처 & 소재지 관리</h3>
              <p className="text-xs text-gray-500">푸터 및 웹사이트 전반에 노출되는 직통 번호와 주소입니다.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            <div className="space-y-1.5">
              <label className="font-black text-gray-700 flex items-center gap-1.5">
                <Smartphone className="w-3.5 h-3.5 text-emerald-600" />
                <span>대표 직통 전화 (모바일)</span>
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="010-7244-6796"
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2.5 text-gray-900 font-bold focus:outline-none focus:border-emerald-500"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-black text-gray-700 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-blue-600" />
                <span>사무국 유선 전화</span>
              </label>
              <input
                type="text"
                value={tel}
                onChange={(e) => setTel(e.target.value)}
                placeholder="02-3474-7001"
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2.5 text-gray-900 font-bold focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-black text-gray-700 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-purple-600" />
                <span>공식 이메일</span>
              </label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="contact@kfssec.or.kr"
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2.5 text-gray-900 font-bold focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="md:col-span-3 space-y-1.5">
              <label className="font-black text-gray-700 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-rose-600" />
                <span>본원 전용 교육장 주소 (실습장)</span>
              </label>
              <input
                type="text"
                value={headquartersAddress}
                onChange={(e) => setHeadquartersAddress(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2.5 text-gray-900 font-bold focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="md:col-span-3 space-y-1.5">
              <label className="font-black text-gray-700 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-stone-600" />
                <span>행정 사무국 및 우편 주소</span>
              </label>
              <input
                type="text"
                value={officeAddress}
                onChange={(e) => setOfficeAddress(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2.5 text-gray-900 font-bold focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Submit Save Button */}
        <div className="flex items-center justify-end pt-2">
          <button
            type="submit"
            className="px-7 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs rounded-2xl shadow-md transition-all cursor-pointer flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>기관 공식 정보 저장 및 홈페이지 즉각 반영</span>
          </button>
        </div>

      </form>

    </div>
  );
}
