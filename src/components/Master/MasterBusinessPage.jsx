import React, { useState, useEffect } from 'react';
import { flushSync } from 'react-dom';
import { Sparkles, Award, Medal, Edit3, X, Plus } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import useMasterProfiles from '../../hooks/useMasterProfiles';
import MasterDirectory from './MasterDirectory';
import SectorBlock from '../Admin/InlineEditor/SectorBlock';
import EditableText from '../Admin/InlineEditor/EditableText';
import AdminMasters from '../Admin/AdminMasters';
import { useAdminEdit } from '../../context/AdminEditContext';

const normalizeTab = tab => {
  if (tab === 'directory') return 'directory';
  if (tab === 'profiles') return 'profiles';
  return 'all';
};

export default function MasterBusinessPage({ initialSubTab = 'all', initialTab = 'all' }) {
  const { tr, t } = useLanguage();
  const defaultSub = normalizeTab(initialSubTab || initialTab || 'all');
  const [activeTab, setActiveTab] = useState(defaultSub);
  const { profiles } = useMasterProfiles();
  const { isEditMode, siteDraft } = useAdminEdit();
  const [isMasterModalOpen, setIsMasterModalOpen] = useState(false);
  const [editingMasterId, setEditingMasterId] = useState(null);

  const handleOpenMasterEdit = (masterId = null) => {
    setEditingMasterId(masterId);
    setIsMasterModalOpen(true);
  };

  const totalCount = profiles.filter(p => p.published).length;
  const masterCount = profiles.filter(p => p.published && p.group === 'master').length;
  const expertCount = profiles.filter(p => p.published && p.group === 'expert').length;

  useEffect(() => {
    const target = initialSubTab || initialTab;
    if (target) {
      setActiveTab(normalizeTab(target));
    }
  }, [initialSubTab, initialTab]);

  const selectTab = id => {
    if (id === activeTab) return;
    const update = () => {
      setActiveTab(id);
      window.history.pushState({}, '', `/master/${id}`);
      window.dispatchEvent(new PopStateEvent('popstate'));
    };
    if (document.startViewTransition && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.startViewTransition(() => flushSync(update));
    } else update();
  };

  const masterSubItems = [
    {
      id: 'all',
      label: '명장·명인 전체',
      group: 'all',
      count: totalCount,
      icon: Sparkles,
      desc: '외식산업을 이끄는 모든 마스터와 장인',
    },
    {
      id: 'profiles',
      label: '대한민국 명장',
      group: 'master',
      count: masterCount,
      icon: Award,
      desc: '국가 공인 최고 권위 조리명장',
    },
    {
      id: 'directory',
      label: '조리 명인',
      group: 'expert',
      count: expertCount,
      icon: Medal,
      desc: '전통 비법과 현장 실무의 장인들',
    },
  ];

  const currentItem = masterSubItems.find(item => item.id === activeTab) || masterSubItems[0];

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-8 sm:py-12 font-sans text-gray-900">
      
      {/* Full Width Flush Layout matching Header margins */}
      <div className="w-full max-w-[1520px] mx-auto px-4 sm:px-8 lg:px-12 space-y-8">
        
        {/* Admin Quick Editor Header when Edit Mode is active */}
        {isEditMode && (
          <div className="bg-gradient-to-r from-[#1B5238] via-[#266847] to-[#34885E] text-white p-4 sm:p-5 rounded-2xl border border-[#85CFAB]/40 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="p-2.5 bg-white/15 text-[#A7F3D0] rounded-xl border border-white/20">
                <Award className="w-5 h-5" />
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-[#A7F3D0] uppercase tracking-wider">
                    명장·명인 프로필 관리 모드
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-400/20 text-emerald-100 text-[10px] font-bold">
                    실시간 연동
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-gray-100 font-medium mt-0.5">
                  새 명장·명인을 추가하거나, 프로필 사진, 직함, 약력, 대표 요리를 관리창에서 자유롭게 등록/수정/삭제할 수 있습니다.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsMasterModalOpen(true)}
              className="px-5 py-2.5 bg-white hover:bg-[#EAF6EE] text-[#1E5D3B] font-black text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center gap-2 shrink-0 cursor-pointer hover:scale-102 border border-[#85CFAB]"
            >
              <Edit3 className="w-4 h-4" />
              <span>👨‍🍳 명장·명인 프로필 전체 관리</span>
            </button>
          </div>
        )}

        {/* Hero Section */}
        <header className="relative bg-gradient-to-br from-[#14532D] via-[#15803D] to-[#16A34A] text-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#4ADE80]/30 shadow-xl overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-3 sm:space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-500/20 border border-orange-400/40 text-orange-200 text-xs font-black tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-orange-300" />
              <span>KFSSEC · CULINARY MASTERS & ARTISANS</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight font-serif">
              <EditableText path="masterHeroTitle" value={siteDraft?.masterHeroTitle || tr("대한민국 명장·명인")} />
            </h1>
            
            <p className="text-sm sm:text-base text-emerald-100/90 font-medium leading-relaxed">
              <EditableText
                multiline
                path="masterHeroSubtitle"
                value={siteDraft?.masterHeroSubtitle || tr("수십 년간 축적된 조리 비법과 철학으로 대한민국 외식산업의 깊이를 더하는 국가 공인 조리명장과 요리명인 네트워크입니다.")}
              />
            </p>
          </div>

          {/* Decorative ambient glow */}
          <div className="absolute -bottom-16 -right-16 w-80 h-80 bg-[#F97316]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-[#4ADE80]/15 rounded-full blur-2xl pointer-events-none" />
        </header>

        {/* Unified Master / Artisan Branch Navigation Tabs */}
        <section aria-label={tr("명장·명인 분류 선택")} className="bg-white rounded-2xl p-2 sm:p-3 border border-stone-200/90 shadow-xs">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {masterSubItems.map(item => {
              const IconComp = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => selectTab(item.id)}
                  className={`group relative flex items-center justify-between p-3.5 sm:p-4 rounded-xl border transition-all text-left cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-[#14532D] to-[#15803D] border-[#15803D] text-white shadow-md'
                      : 'bg-stone-50/70 hover:bg-stone-100/80 border-stone-200 text-stone-700 hover:text-stone-900'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                        isActive
                          ? 'bg-gradient-to-br from-[#EA580C] to-[#F97316] text-white shadow-xs'
                          : 'bg-white border border-stone-200 text-[#15803D] group-hover:border-[#15803D]'
                      }`}
                    >
                      <IconComp className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-black text-sm sm:text-base tracking-tight truncate">
                          {tr(item.label)}
                        </span>
                      </div>
                      <p className={`text-[11px] truncate ${isActive ? 'text-emerald-100/80' : 'text-stone-500'}`}>
                        {tr(item.desc)}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`ml-2 px-2.5 py-1 rounded-full text-xs font-black shrink-0 ${
                      isActive
                        ? 'bg-[#C5A059] text-white'
                        : 'bg-stone-200/80 text-stone-700'
                    }`}
                  >
                    {item.count}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Master Directory Content Panel */}
        <main className="w-full min-w-0">
          <SectorBlock
            sectorId={activeTab === 'profiles' ? 'S-MAS-02' : activeTab === 'directory' ? 'S-MAS-03' : 'S-MAS-01'}
            sectorName={activeTab === 'profiles' ? '대한민국 조리명장 명단' : activeTab === 'directory' ? '외식창업 조리명인 명단' : '명장·명인 전체 목록'}
            pageKey="master"
            editContentLabel="👨‍🍳 명장·명인 전체 관리 (추가/수정/삭제)"
            onEditContent={() => handleOpenMasterEdit(null)}
            customActions={[
              {
                label: '👨‍🍳 명장·명인 등록/수정/순서 관리',
                onClick: () => handleOpenMasterEdit(null),
              },
            ]}
          >
            <MasterDirectory
              key={activeTab}
              group={currentItem.group}
              groupLabel={currentItem.label}
              onSelectGroup={selectTab}
              onEditMaster={handleOpenMasterEdit}
            />
          </SectorBlock>
        </main>

      </div>

      {/* Admin Master Management Modal */}
      {isMasterModalOpen && (
        <div
          onClick={() => {
            setIsMasterModalOpen(false);
            setEditingMasterId(null);
          }}
          className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl shadow-2xl border border-gray-200 w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden text-gray-900"
          >
            {/* Modal Header */}
            <div className="px-6 py-4 bg-gradient-to-r from-[#1B5238] via-[#266847] to-[#34885E] text-white flex items-center justify-between border-b border-[#85CFAB]/40 shrink-0">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/15 text-[#A7F3D0] rounded-xl border border-white/20">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-white">대한민국 명장·명인 전체 관리</h3>
                  <p className="text-xs text-[#A7F3D0]">신규 명장/명인 등록, 프로필 사진 업로드, 약력 및 수상내역 수정</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsMasterModalOpen(false);
                  setEditingMasterId(null);
                }}
                className="p-2 text-gray-200 hover:text-white hover:bg-white/15 rounded-xl transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body with embedded AdminMasters */}
            <div className="flex-1 overflow-y-auto p-6">
              <AdminMasters
                key={editingMasterId || 'all'}
                initialProfileId={editingMasterId}
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
