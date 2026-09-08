import React, { useRef } from 'react';
import { X, Printer, Download, Award, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function CertificateModal({
  isOpen,
  onClose,
  certData = {
    type: '수료증', // '수료증' | '자격증'
    certNo: 'KFSSEC-2026-0915',
    studentName: '김태훈',
    birthDate: '1988년 05월 14일',
    courseTitle: '외식창업 성공전략 마스터 과정',
    categoryName: '한식/창업실무',
    startDate: '2026-09-05',
    endDate: '2026-10-03',
    hours: '60시간 이수',
    certName: '외식창업 성공전략 지도사 1급',
    issueDate: '2026년 10월 03일',
  },
}) {
  const printRef = useRef(null);

  if (!isOpen || !certData) return null;

  const handlePrint = () => {
    window.print();
  };

  const isLicense = certData.type === '자격증';

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn cursor-pointer"
    >
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-certificate, #printable-certificate * {
            visibility: visible;
          }
          #printable-certificate {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 20px;
            box-shadow: none !important;
            border: 4px solid #0B3C26 !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl transition-all border border-gray-200 max-h-[95vh] flex flex-col cursor-default"
      >
        {/* Top Control Bar (Non-printable) */}
        <div className="bg-[#0B3C26] text-white p-4 sm:p-5 px-6 flex items-center justify-between shrink-0 border-b border-[#C5A059] no-print">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-[#D4AF37]" />
            <h3 className="text-base sm:text-lg font-black tracking-tight">
              (사)한국외식창업교육원 공식 {isLicense ? '자격증' : '수료증'} 증명서 발급기
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-[#C5A059] hover:bg-[#B38F48] text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>🖨️ 수료증 즉시 인쇄 / PDF 저장</span>
            </button>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-black/30 hover:bg-black/60 text-white flex items-center justify-center transition-colors cursor-pointer"
              title="닫기 (ESC)"
            >
              <X className="w-4.5 h-4.5" />
            </button>
          </div>
        </div>

        {/* Printable Official Certificate Body */}
        <div className="p-6 sm:p-10 overflow-y-auto flex-1 bg-[#FDFBF7]">
          <div
            id="printable-certificate"
            ref={printRef}
            className="bg-white rounded-2xl p-8 sm:p-12 border-8 border-double border-[#C5A059] shadow-inner relative overflow-hidden flex flex-col justify-between min-h-[580px]"
          >
            {/* Background Watermark Stamp */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
              <img src="/images/logo.png" alt="Watermark" className="w-96 h-auto" />
            </div>

            {/* Certificate Header */}
            <div className="text-center space-y-3 relative z-10">
              <div className="flex items-center justify-between text-[11px] font-bold text-gray-500 font-mono border-b border-gray-200 pb-2">
                <span>등록번호: {certData.certNo || 'KFSSEC-2026-0915'}</span>
                <span>농림축산식품부 소관 사단법인</span>
              </div>

              <span className="inline-block px-4 py-1 rounded-full bg-[#0B3C26]/10 text-[#0B3C26] text-xs font-black border border-[#0B3C26]/30 uppercase tracking-widest mt-2">
                OFFICIAL CERTIFICATE OF COMPLETION
              </span>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B3C26] tracking-widest font-serif pt-2">
                {isLicense ? '자 격 증' : '수 료 증'}
              </h1>
            </div>

            {/* Certificate Student Details */}
            <div className="my-8 space-y-6 relative z-10 text-gray-900">
              <div className="grid grid-cols-2 gap-4 text-xs sm:text-sm bg-[#F8F6F0] p-4 sm:p-6 rounded-xl border border-[#E5E0D8] font-bold">
                <div>
                  <span className="text-gray-500 block text-xs">성 명</span>
                  <span className="text-base font-black text-black">{certData.studentName}</span>
                </div>
                <div>
                  <span className="text-gray-500 block text-xs">생년월일</span>
                  <span className="text-sm font-black text-black font-mono">{certData.birthDate || '1988-05-14'}</span>
                </div>
                <div className="col-span-2 border-t border-gray-200 pt-3">
                  <span className="text-gray-500 block text-xs">교육 과정명</span>
                  <span className="text-base sm:text-lg font-black text-[#0B3C26]">
                    {certData.courseTitle}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 block text-xs">교육 기간</span>
                  <span className="text-xs font-bold text-gray-800 font-mono">
                    {certData.startDate} ~ {certData.endDate}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 block text-xs">이수 시간 / 자격명</span>
                  <span className="text-xs font-black text-emerald-900">
                    {certData.hours || '60시간 이수'} ({certData.certName || '지도사 1급'})
                  </span>
                </div>
              </div>

              {/* Body Statement */}
              <div className="text-center py-4 space-y-3">
                <p className="text-sm sm:text-base font-extrabold text-gray-800 leading-relaxed font-serif">
                  위 사람은 사단법인 한국외식창업교육원에서 주관하는<br className="hidden sm:inline" />
                  <strong className="text-[#0B3C26] underline underline-offset-4 font-black">[{certData.courseTitle}]</strong>의 전 과정을 성실히 이수하였으므로<br />
                  본 수료증을 수여합니다.
                </p>
              </div>
            </div>

            {/* Certificate Footer & Official Red Seal Stamp */}
            <div className="pt-6 border-t-2 border-[#C5A059] flex items-end justify-between relative z-10">
              <div className="space-y-1">
                <span className="text-xs font-bold text-gray-500 block font-mono">발행일자: {certData.issueDate || '2026년 10월 03일'}</span>
                <span className="text-xs font-black text-[#0B3C26] block">사단법인 한국외식창업교육원</span>
              </div>

              {/* Official Red Seal Stamp Visual */}
              <div className="flex items-center gap-3 relative">
                <div className="text-right">
                  <span className="text-xs font-black text-gray-700 block">이사장</span>
                  <span className="text-lg font-black text-[#0B3C26] tracking-widest">안 형 상</span>
                </div>
                
                {/* Red Seal Stamp Badge */}
                <div className="w-16 h-16 rounded-full border-4 border-rose-600 bg-rose-50 text-rose-700 flex flex-col items-center justify-center p-1 text-[10px] font-black leading-tight shadow-md transform -rotate-12 select-none border-double">
                  <ShieldCheck className="w-4 h-4 text-rose-600 mb-0.5" />
                  <span>한국외식</span>
                  <span>직인</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="bg-gray-100 p-4 px-6 border-t border-gray-200 flex items-center justify-between text-xs text-gray-600 font-bold shrink-0 no-print">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#0B3C26]" />
            <span>농림축산식품부 소관 비영리 사단법인 정식 인가 증명서</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-xl transition-colors cursor-pointer"
          >
            닫기
          </button>
        </div>

      </div>
    </div>
  );
}
