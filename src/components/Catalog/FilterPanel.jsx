import React from 'react';

export default function FilterPanel({
  selectedIndustry,
  onSelectIndustry,
  selectedStage,
  onSelectStage,
  selectedFormats,
  onToggleFormat,
}) {
  const industries = [
    '전체보기',
    '한식',
    '일식',
    '중식',
    '양식',
    '카페/디저트',
    '치킨',
    '분식',
    '배달/밀키트',
    '기타',
  ];

  const stages = [
    '전체보기',
    '창업 준비',
    '입지 선정',
    '메뉴 개발',
    '마케팅/브랜딩',
    '매장 오픈',
    '매장 운영',
    '성장/확장',
  ];

  const formats = ['전체', '오프라인', '온라인', '혼합형'];

  return (
    <div className="bg-white rounded-2xl border border-emerald-100 p-6 shadow-sm space-y-6">
      
      {/* 1. 업종별 필터 */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <span className="text-sm font-black text-gray-900 w-24 shrink-0">
          업종별
        </span>
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {industries.map((item) => {
            const isActive =
              (item === '전체보기' && (!selectedIndustry || selectedIndustry === '전체보기' || selectedIndustry === '전체')) ||
              selectedIndustry === item;

            return (
              <button
                key={item}
                onClick={() => onSelectIndustry(item)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold shrink-0 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#0F5132] text-white shadow-sm'
                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-800'
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-emerald-100/60" />

      {/* 2. 창업 단계별 필터 */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <span className="text-sm font-black text-gray-900 w-24 shrink-0">
          창업 단계별
        </span>
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {stages.map((item) => {
            const isActive =
              (item === '전체보기' && (!selectedStage || selectedStage === '전체보기' || selectedStage === '전체')) ||
              selectedStage === item;

            return (
              <button
                key={item}
                onClick={() => onSelectStage(item)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold shrink-0 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#0F5132] text-white shadow-sm'
                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-800'
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-emerald-100/60" />

      {/* 3. 교육 형태 필터 (Checkboxes) */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <span className="text-sm font-black text-gray-900 w-24 shrink-0">
          교육 형태
        </span>
        <div className="flex items-center gap-6 py-1">
          {formats.map((fmt) => {
            const isChecked =
              fmt === '전체'
                ? selectedFormats.length === 0 || selectedFormats.includes('전체')
                : selectedFormats.includes(fmt);

            return (
              <label
                key={fmt}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-700 cursor-pointer select-none hover:text-emerald-800"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => onToggleFormat(fmt)}
                  className="w-4 h-4 rounded text-emerald-600 border-gray-300 focus:ring-emerald-500 cursor-pointer"
                />
                <span>{fmt}</span>
              </label>
            );
          })}
        </div>
      </div>

    </div>
  );
}
