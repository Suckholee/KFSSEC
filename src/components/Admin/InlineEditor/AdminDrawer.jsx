import React, { useState } from 'react';
import { useAdminEdit } from '../../../context/AdminEditContext';
import {
  X,
  MessageSquare,
  Building,
  Database,
  CheckCircle2,
  Clock,
  Send,
  Save,
  Phone,
  Mail,
  MapPin,
  FileText,
} from 'lucide-react';

export default function AdminDrawer() {
  const {
    isDrawerOpen,
    setIsDrawerOpen,
    drawerTab,
    setDrawerTab,
    siteDraft,
    updateSiteField,
    postsDraft,
    updatePostsDraft,
    saveAllChanges,
  } = useAdminEdit();

  const [replyInput, setReplyInput] = useState({});
  const [isSyncing, setIsSyncing] = useState(false);

  if (!isDrawerOpen) return null;

  const info = siteDraft?.institutionInfo || {};
  const inquiries = (postsDraft || []).filter(p => p.categoryType === 'inquiry');

  const handleSendReply = (inquiryId) => {
    const text = replyInput[inquiryId]?.trim();
    if (!text) return;

    updatePostsDraft(prev =>
      prev.map(item => {
        if (item.id === inquiryId) {
          return {
            ...item,
            status: 'completed',
            reply: {
              date: new Date().toISOString().slice(0, 10).replace(/-/g, '.'),
              content: text,
            },
          };
        }
        return item;
      })
    );
    setReplyInput(prev => ({ ...prev, [inquiryId]: '' }));
  };

  return (
    <div
      onClick={() => setIsDrawerOpen(false)}
      className="fixed inset-0 z-[10000] bg-slate-950/60 backdrop-blur-sm flex justify-end transition-opacity"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg h-full bg-white shadow-2xl flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-200"
      >
        {/* Drawer Header */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></div>
            <h2 className="font-bold text-base text-slate-100">KFSSEC 관리 서랍</h2>
          </div>
          <button
            type="button"
            onClick={() => setIsDrawerOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-slate-50 text-xs sm:text-sm font-medium">
          <button
            type="button"
            onClick={() => setDrawerTab('inquiry')}
            className={`flex-1 py-3 px-2 flex items-center justify-center gap-1.5 border-b-2 transition ${
              drawerTab === 'inquiry'
                ? 'border-amber-500 text-amber-700 bg-white font-bold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>1:1 문의·상담 ({inquiries.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setDrawerTab('info')}
            className={`flex-1 py-3 px-2 flex items-center justify-center gap-1.5 border-b-2 transition ${
              drawerTab === 'info'
                ? 'border-amber-500 text-amber-700 bg-white font-bold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Building className="w-4 h-4" />
            <span>기관 기본정보</span>
          </button>

          <button
            type="button"
            onClick={() => setDrawerTab('database')}
            className={`flex-1 py-3 px-2 flex items-center justify-center gap-1.5 border-b-2 transition ${
              drawerTab === 'database'
                ? 'border-amber-500 text-amber-700 bg-white font-bold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>데이터 동기화</span>
          </button>
        </div>

        {/* Tab Content Area */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5 text-slate-800 text-sm">
          {/* 1. Inquiries Tab */}
          {drawerTab === 'inquiry' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900 text-sm">수강생 및 방문자 1:1 문의 접수 내역</h3>
                <span className="text-xs text-slate-500">실시간 반영</span>
              </div>

              {inquiries.length === 0 ? (
                <div className="text-center py-12 text-slate-400">접수된 문의가 없습니다.</div>
              ) : (
                inquiries.map((inq) => (
                  <div
                    key={inq.id}
                    className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-50 transition space-y-2.5"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-0.5 rounded-full font-semibold text-[11px] ${
                            inq.status === 'completed'
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'bg-amber-100 text-amber-700'
                          }`}
                        >
                          {inq.status === 'completed' ? '답변완료' : '답변대기'}
                        </span>
                        <span className="font-medium text-slate-700">{inq.author}</span>
                      </div>
                      <span className="text-slate-400">{inq.date}</span>
                    </div>

                    <h4 className="font-bold text-slate-900">{inq.title}</h4>
                    <p className="text-xs text-slate-600 whitespace-pre-line leading-relaxed bg-white p-3 rounded-lg border border-slate-100">
                      {inq.content}
                    </p>

                    {/* Existing reply or reply input */}
                    {inq.reply ? (
                      <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-lg text-xs space-y-1">
                        <div className="flex items-center justify-between text-emerald-800 font-semibold text-[11px]">
                          <span>교육원 공식 답변</span>
                          <span>{inq.reply.date}</span>
                        </div>
                        <p className="text-emerald-900 whitespace-pre-line">{inq.reply.content}</p>
                      </div>
                    ) : (
                      <div className="space-y-2 pt-1">
                        <textarea
                          rows={2}
                          value={replyInput[inq.id] || ''}
                          onChange={(e) => setReplyInput(prev => ({ ...prev, [inq.id]: e.target.value }))}
                          placeholder="수강생에게 전달할 답변을 입력하세요..."
                          className="w-full p-2.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />
                        <button
                          type="button"
                          onClick={() => handleSendReply(inq.id)}
                          className="w-full py-1.5 px-3 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition active:scale-95"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>답변 등록 및 완료 처리</span>
                        </button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}

          {/* 2. Institution Info Tab */}
          {drawerTab === 'info' && (
            <div className="space-y-4">
              <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl text-xs text-amber-800">
                수정하신 내용은 하단 푸터 및 교육원 소개란에 자동으로 동기화됩니다.
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">법인명 (한글)</label>
                  <input
                    type="text"
                    value={info.corpName || ''}
                    onChange={(e) => updateSiteField('institutionInfo.corpName', e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">영문 법인명</label>
                  <input
                    type="text"
                    value={info.engName || ''}
                    onChange={(e) => updateSiteField('institutionInfo.engName', e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">대표자명</label>
                    <input
                      type="text"
                      value={info.ceoName || ''}
                      onChange={(e) => updateSiteField('institutionInfo.ceoName', e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">사업자등록번호</label>
                    <input
                      type="text"
                      value={info.bizNumber || ''}
                      onChange={(e) => updateSiteField('institutionInfo.bizNumber', e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">대표전화</label>
                    <input
                      type="text"
                      value={info.phone || ''}
                      onChange={(e) => updateSiteField('institutionInfo.phone', e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">대표 이메일</label>
                    <input
                      type="text"
                      value={info.email || ''}
                      onChange={(e) => updateSiteField('institutionInfo.email', e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">교육장 본사 주소</label>
                  <input
                    type="text"
                    value={info.headquartersAddress || ''}
                    onChange={(e) => updateSiteField('institutionInfo.headquartersAddress', e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">행정 사무국 주소</label>
                  <input
                    type="text"
                    value={info.officeAddress || ''}
                    onChange={(e) => updateSiteField('institutionInfo.officeAddress', e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* 3. Database Sync Tab */}
          {drawerTab === 'database' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-900 text-white space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Supabase 공용 클라우드 연결됨</span>
                </div>
                <p className="text-xs text-slate-300">
                  모든 데이터는 실시간 암호화 통신을 통해 Supabase 데이터베이스 및 스토리지와 동기화됩니다.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
                <h4 className="font-bold text-slate-900 text-xs">수동 전체 저장 및 동기화</h4>
                <p className="text-xs text-slate-600">
                  화면에서 수정한 배너, 소개문구, 교육과정 등의 모든 변경사항을 클라우드에 일괄 저장합니다.
                </p>
                <button
                  type="button"
                  onClick={saveAllChanges}
                  className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-xs flex items-center justify-center gap-1.5 transition active:scale-95 shadow-md"
                >
                  <Save className="w-4 h-4" />
                  <span>지금 바로 Supabase에 영구 저장</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <span className="text-xs text-slate-500">KFSSEC Visual CMS v2.0</span>
          <button
            type="button"
            onClick={() => setIsDrawerOpen(false)}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
