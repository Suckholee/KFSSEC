import React from 'react';
import { CreditCard, CheckCircle2, ShieldCheck, HelpCircle, ArrowRight, X, Percent, RefreshCw, FileText } from 'lucide-react';

export default function PaymentGuideModal({ isOpen, onClose, onGoToCatalog }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 sm:p-10 max-w-2xl w-full border-2 border-black shadow-2xl space-y-6 animate-fadeIn max-h-[90vh] overflow-y-auto font-sans text-gray-900">
        
        {/* Header */}
        <div className="flex items-start justify-between border-b-2 border-black pb-4">
          <div className="space-y-1">
            <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
              SERVICE GUIDE
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-black tracking-tight pt-1">
              한국외식창업교육원 수강 결제 안내
            </h2>
            <p className="text-xs text-gray-500 font-bold">
              투명하고 편리한 수강료 결제 및 정부 지원 정책 안내입니다.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-black font-black text-2xl p-1 transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Section 1: Payment Process 3 Steps */}
        <div className="space-y-3">
          <h3 className="text-base font-black text-black flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-emerald-700" />
            <span>1. 수강료 결제 절차 안내</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-300 space-y-1">
              <span className="text-xs font-black text-white bg-black px-2 py-0.5 rounded">STEP 01</span>
              <h4 className="text-sm font-black text-black pt-1">과정 선택 & 신청</h4>
              <p className="text-xs text-gray-600 font-medium">원하는 메뉴개발/창업과정 상세페이지에서 신청하기 클릭</p>
            </div>

            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-300 space-y-1">
              <span className="text-xs font-black text-white bg-black px-2 py-0.5 rounded">STEP 02</span>
              <h4 className="text-sm font-black text-black pt-1">결제 수단 선택</h4>
              <p className="text-xs text-gray-600 font-medium">신용카드, 계좌이체, 무통장입금 또는 정부지원금 신청</p>
            </div>

            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-300 space-y-1">
              <span className="text-xs font-black text-white bg-black px-2 py-0.5 rounded">STEP 03</span>
              <h4 className="text-sm font-black text-black pt-1">개강 문자 안내</h4>
              <p className="text-xs text-gray-600 font-medium">결제 승인 후 담당 셰프 및 개강 알림 톡/SMS 자동 전송</p>
            </div>
          </div>
        </div>

        {/* Section 2: Discounts & Government Support */}
        <div className="bg-emerald-50/80 p-5 rounded-2xl border border-emerald-300 space-y-3">
          <h3 className="text-base font-black text-emerald-950 flex items-center gap-2">
            <Percent className="w-5 h-5 text-emerald-700" />
            <span>2. 수강료 할인 및 정부지원 혜택</span>
          </h3>
          <ul className="space-y-2 text-xs font-bold text-emerald-900 leading-relaxed">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <span><strong>패키지 복수 수강 할인:</strong> 2개 이상 과목 동시 수강 시 최대 40% 즉시 할인 적용</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <span><strong>청년 창업 지원 정책:</strong> 만 39세 이하 예비 창업자 수강료 최대 80% 정부 지원 연계</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <span><strong>소상공인 재창업 혜택:</strong> 기존 사업자등록증 제출 시 1:1 시그니처 레시피 무상 전수</span>
            </li>
          </ul>
        </div>

        {/* Section 3: Refund Policy */}
        <div className="space-y-3">
          <h3 className="text-base font-black text-black flex items-center gap-2">
            <RefreshCw className="w-5 h-5 text-emerald-700" />
            <span>3. 환불 규정 및 취소 안내</span>
          </h3>

          <div className="bg-stone-50 p-4 rounded-2xl border border-stone-300 text-xs text-gray-700 font-medium space-y-1.5 leading-relaxed">
            <p>• <strong>개강 3일 전까지:</strong> 수강료 100% 전액 환불 가능</p>
            <p>• <strong>개강 1일 전 ~ 개강 당일:</strong> 재료 준비비 제외 후 90% 환불</p>
            <p>• <strong>수강 진행 중:</strong> 잔여 차수 비율 계산 후 환불 (사단법인 학원법 수강료 반환 기준 준수)</p>
          </div>
        </div>

        {/* Modal Footer Action Controls */}
        <div className="pt-3 border-t-2 border-black flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-900 font-bold text-xs rounded-xl transition-colors cursor-pointer"
          >
            닫기
          </button>

          <button
            onClick={() => {
              onClose();
              if (onGoToCatalog) onGoToCatalog();
            }}
            className="px-6 py-2.5 bg-black hover:bg-gray-800 text-white font-black text-xs sm:text-sm rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>교육과정 둘러보고 결제하기</span>
            <ArrowRight className="w-4 h-4 text-emerald-400" />
          </button>
        </div>

      </div>
    </div>
  );
}
