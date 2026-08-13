import React from 'react';
import { Headphones, MessageSquare, HelpCircle } from 'lucide-react';

export default function Sidebar({ activeCategory, onSelectCategory }) {
  const menuItems = [
    { id: 'all', label: '전체 교육과정' },
    { id: 'industry', label: '업종별 교육과정' },
    { id: 'stage', label: '창업 단계별 교육과정' },
    { id: 'online', label: '온라인 교육과정' },
    { id: 'custom', label: '맞춤형 교육과정' },
  ];

  return (
    <aside className="w-full lg:w-64 shrink-0 space-y-6">
      {/* Sidebar Navigation Box */}
      <div className="bg-white rounded-2xl border border-emerald-100 overflow-hidden shadow-sm">
        {/* Deep Forest Green Header */}
        <div className="bg-[#0F5132] px-6 py-7 text-center">
          <h2 className="text-xl font-extrabold text-white tracking-tight">
            교육과정
          </h2>
        </div>

        {/* Menu Items List */}
        <nav className="p-2 space-y-1">
          {menuItems.map((item) => {
            const isActive = activeCategory === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectCategory(item.id)}
                className={`w-full text-left px-4 py-3.5 rounded-xl font-bold text-sm transition-all flex items-center justify-between relative cursor-pointer ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-900 font-extrabold'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-emerald-700'
                }`}
              >
                {isActive && (
                  <span className="absolute left-0 top-2 bottom-2 w-1 bg-emerald-600 rounded-r-full" />
                )}
                <span className={isActive ? 'ml-1' : ''}>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Customer Support Callout Widget */}
      <div className="bg-white rounded-2xl border border-emerald-100 p-5 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-gray-800">
          <Headphones className="w-5 h-5 text-emerald-600" />
          <span className="text-sm font-extrabold">교육 상담센터</span>
        </div>

        <div>
          <span className="text-xl font-black text-gray-900 tracking-tight block">
            02-511-8484
          </span>
          <span className="text-xs text-gray-400 font-medium">
            평일 09:00 ~ 18:00
          </span>
        </div>

        <div className="space-y-2 pt-1">
          <button
            onClick={() => alert('1:1 문의하기 페이지로 이동합니다.')}
            className="w-full py-2.5 px-3 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-900 hover:bg-emerald-50 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
            <span>1:1 문의하기</span>
          </button>
          <button
            onClick={() => alert('자주 묻는 질문 FAQ로 이동합니다.')}
            className="w-full py-2.5 px-3 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-900 hover:bg-emerald-50 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>자주 묻는 질문</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
