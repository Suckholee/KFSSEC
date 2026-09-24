import React, { useState, useEffect } from 'react';
import {
  Bot,
  Sparkles,
  Save,
  RotateCcw,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  MessageSquare,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  Send,
  Sliders,
  Compass,
  AlertCircle,
  Eye,
  Info,
} from 'lucide-react';
import {
  getChatbotConfig,
  saveChatbotConfig,
  resetChatbotConfig,
  findBotAnswer,
} from '../../services/chatbotConfig';

export default function AdminChatbotSettings() {
  const [config, setConfig] = useState(getChatbotConfig());
  const [activeSubTab, setActiveSubTab] = useState('basic'); // 'basic' | 'buttons' | 'faq' | 'preview'
  const [savedAlert, setSavedAlert] = useState(false);

  // Edit / Add Modal States for Quick Buttons
  const [editingButton, setEditingButton] = useState(null); // null or object
  const [editingFaq, setEditingFaq] = useState(null); // null or object

  // Interactive Simulator state
  const [simChatLog, setSimChatLog] = useState([
    {
      sender: 'bot',
      text: config.welcomeMessage,
    },
  ]);
  const [simInput, setSimInput] = useState('');

  // Re-sync on update
  useEffect(() => {
    const handleUpdate = () => {
      const fresh = getChatbotConfig();
      setConfig(fresh);
    };
    window.addEventListener('kfssec_chatbot_config_updated', handleUpdate);
    return () => window.removeEventListener('kfssec_chatbot_config_updated', handleUpdate);
  }, []);

  const handleSave = () => {
    saveChatbotConfig(config);
    setSavedAlert(true);
    setTimeout(() => setSavedAlert(false), 3000);
  };

  const handleReset = () => {
    if (window.confirm('챗봇 설정을 교육원 기본값으로 초기화하시겠습니까?')) {
      const reset = resetChatbotConfig();
      setConfig(reset);
      setSimChatLog([{ sender: 'bot', text: reset.welcomeMessage }]);
      alert('챗봇 설정이 기본값으로 초기화되었습니다.');
    }
  };

  // Quick button CRUD
  const handleSaveButton = (btn) => {
    let updated;
    if (btn.id) {
      updated = config.quickButtons.map((b) => (b.id === btn.id ? btn : b));
    } else {
      const newBtn = { ...btn, id: `btn_${Date.now()}` };
      updated = [...config.quickButtons, newBtn];
    }
    const newConfig = { ...config, quickButtons: updated };
    setConfig(newConfig);
    setEditingButton(null);
  };

  const handleDeleteButton = (id) => {
    if (window.confirm('이 퀵 질문 버튼을 삭제하시겠습니까?')) {
      const updated = config.quickButtons.filter((b) => b.id !== id);
      setConfig({ ...config, quickButtons: updated });
    }
  };

  // FAQ CRUD
  const handleSaveFaq = (faq) => {
    let updated;
    const kwArray = Array.isArray(faq.keywords)
      ? faq.keywords
      : (faq.keywords || '').split(',').map((s) => s.trim()).filter(Boolean);

    const cleanFaq = { ...faq, keywords: kwArray };
    if (cleanFaq.id) {
      updated = config.faqRules.map((f) => (f.id === cleanFaq.id ? cleanFaq : f));
    } else {
      const newFaq = { ...cleanFaq, id: `faq_${Date.now()}` };
      updated = [...config.faqRules, newFaq];
    }
    const newConfig = { ...config, faqRules: updated };
    setConfig(newConfig);
    setEditingFaq(null);
  };

  const handleDeleteFaq = (id) => {
    if (window.confirm('이 AI 키워드 규칙을 삭제하시겠습니까?')) {
      const updated = config.faqRules.filter((f) => f.id !== id);
      setConfig({ ...config, faqRules: updated });
    }
  };

  // Simulator interactions
  const handleSimSend = (e) => {
    if (e) e.preventDefault();
    if (!simInput.trim()) return;

    const userText = simInput.trim();
    setSimInput('');

    const botResult = findBotAnswer(userText, config);
    setSimChatLog((prev) => [
      ...prev,
      { sender: 'user', text: userText },
      {
        sender: 'bot',
        text: botResult.text,
        targetTab: botResult.targetTab,
        targetSub: botResult.targetSub,
        actionLabel: botResult.actionLabel,
      },
    ]);
  };

  const handleSimQuickClick = (q) => {
    setSimChatLog((prev) => [
      ...prev,
      { sender: 'user', text: q.label },
      {
        sender: 'bot',
        text: q.reply,
        targetTab: q.actionTab,
        targetSub: q.actionSubTab,
        actionLabel: q.actionLabel || '해당 페이지로 바로 이동',
      },
    ]);
  };

  return (
    <div className="flex-1 bg-[#F4F6F8] p-6 lg:p-8 space-y-6 overflow-y-auto">
      {/* Top Banner Header */}
      <div className="bg-white p-6 rounded-3xl border-2 border-gray-300 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-[#0B3C26] text-[#C5A059] flex items-center justify-center shadow-md">
            <Bot className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-black text-black">🤖 AI 챗봇 & 1:1 상담 관리자 설정</h2>
              <span className="text-[11px] font-bold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full border border-emerald-300">
                실시간 연동 가동 중
              </span>
            </div>
            <p className="text-xs text-gray-500 font-bold mt-1">
              방문자 챗봇의 인사말, 추천 퀵 버튼, 키워드 자동 응답 지식 및 1:1 문의 연동 옵션을 직접 편집하고 관리합니다.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleReset}
            className="px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-gray-700 font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 cursor-pointer border border-stone-300"
            title="초기값으로 되돌리기"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>기본값 복원</span>
          </button>

          <button
            onClick={handleSave}
            className="px-5 py-2.5 bg-[#0B3C26] hover:bg-[#072819] text-white font-black text-xs rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer border border-[#C5A059]"
          >
            <Save className="w-4 h-4 text-[#D4AF37]" />
            <span>설정 저장 및 라이브 적용</span>
          </button>
        </div>
      </div>

      {savedAlert && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-300 rounded-2xl text-emerald-900 font-bold text-xs flex items-center gap-2 shadow-xs animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>✓ 챗봇 설정이 성공적으로 저장되었으며, 사이트에 즉시 실시간 반영되었습니다!</span>
        </div>
      )}

      {/* Sub Navigation Bar */}
      <div className="flex items-center gap-2 border-b border-gray-300 pb-2">
        <button
          onClick={() => setActiveSubTab('basic')}
          className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
            activeSubTab === 'basic'
              ? 'bg-black text-white shadow-sm'
              : 'bg-white text-gray-700 hover:bg-stone-100 border border-stone-200'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>기본 설정 & 인사말</span>
        </button>

        <button
          onClick={() => setActiveSubTab('buttons')}
          className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
            activeSubTab === 'buttons'
              ? 'bg-black text-white shadow-sm'
              : 'bg-white text-gray-700 hover:bg-stone-100 border border-stone-200'
          }`}
        >
          <Compass className="w-3.5 h-3.5" />
          <span>추천 퀵 질문 버튼 ({config.quickButtons.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('faq')}
          className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
            activeSubTab === 'faq'
              ? 'bg-black text-white shadow-sm'
              : 'bg-white text-gray-700 hover:bg-stone-100 border border-stone-200'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>AI 키워드 자동 응답 ({config.faqRules.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('preview')}
          className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
            activeSubTab === 'preview'
              ? 'bg-emerald-700 text-white shadow-sm'
              : 'bg-white text-emerald-800 hover:bg-emerald-50 border border-emerald-300'
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          <span>챗봇 실시간 테스트 (시뮬레이터)</span>
        </button>
      </div>

      {/* Main Tab Panels with Split / Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* Left Column: Form & Management */}
        <div className="xl:col-span-7 space-y-6">
          {/* TAB 1: BASIC SETTINGS */}
          {activeSubTab === 'basic' && (
            <div className="bg-white p-6 rounded-3xl border-2 border-gray-300 shadow-sm space-y-5 animate-fadeIn">
              <h3 className="text-base font-black text-black border-b border-gray-200 pb-3 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-emerald-600" />
                <span>챗봇 기본 동작 및 노출 문구</span>
              </h3>

              <div className="space-y-4 text-xs font-bold text-gray-800">
                {/* Enabled Toggle */}
                <div className="flex items-center justify-between p-3.5 bg-stone-50 rounded-2xl border border-stone-200">
                  <div>
                    <span className="font-black text-black block text-sm">챗봇 사용 활성화</span>
                    <span className="text-[11px] text-gray-500 font-medium">
                      비활성화 시 사용자 화면에서 우측 하단 챗봇 버튼이 숨겨집니다.
                    </span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={config.enabled}
                      onChange={(e) => setConfig({ ...config, enabled: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                  </label>
                </div>

                {/* 1:1 Inquiry AI Draft Auto Generation Toggle */}
                <div className="flex items-center justify-between p-3.5 bg-emerald-50/60 rounded-2xl border border-emerald-200">
                  <div>
                    <span className="font-black text-emerald-950 block text-sm">
                      1:1 온라인 문의 'AI 1초 즉각 사전 답변' 자동 생성
                    </span>
                    <span className="text-[11px] text-emerald-700 font-medium">
                      수강생이 1:1 문의글을 남기면 AI가 즉시 핵심 규정 및 추천 커리큘럼 사전 답변을 자동 등록합니다.
                    </span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={config.autoReplyAiDraft !== false}
                      onChange={(e) => setConfig({ ...config, autoReplyAiDraft: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                  </label>
                </div>

                {/* Bot Name */}
                <div className="space-y-1.5">
                  <label className="text-black font-black">챗봇 명칭 (상단 헤더 표시)</label>
                  <input
                    type="text"
                    value={config.botName || ''}
                    onChange={(e) => setConfig({ ...config, botName: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-black font-bold focus:outline-none focus:border-black"
                  />
                </div>

                {/* Welcome Message */}
                <div className="space-y-1.5">
                  <label className="text-black font-black">챗봇 첫 환영 인사말 (대화창 최초 오픈 시)</label>
                  <textarea
                    rows={3}
                    value={config.welcomeMessage}
                    onChange={(e) => setConfig({ ...config, welcomeMessage: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-black font-bold focus:outline-none focus:border-black resize-none"
                  />
                  <span className="text-[11px] text-gray-500 font-normal">
                    방문자가 챗봇을 열었을 때 가장 먼저 마주하는 봇의 인사 메시지입니다.
                  </span>
                </div>

                {/* Nudge Message */}
                <div className="space-y-1.5">
                  <label className="text-black font-black">플로팅 넛지(Nudge) 말풍선 문구</label>
                  <input
                    type="text"
                    value={config.nudgeMessage || ''}
                    onChange={(e) => setConfig({ ...config, nudgeMessage: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-black font-bold focus:outline-none focus:border-black"
                  />
                  <span className="text-[11px] text-gray-500 font-normal">
                    사용자가 사이트에 접속했을 때 챗봇 버튼 위에 자동으로 떠올라 클릭을 유도하는 말풍선입니다.
                  </span>
                </div>

                {/* Fallback reply */}
                <div className="space-y-1.5">
                  <label className="text-black font-black">미일치(키워드 없음) 시 기본 안내 및 1:1 문의 유도 문구</label>
                  <textarea
                    rows={2}
                    value={config.fallbackReply || ''}
                    onChange={(e) => setConfig({ ...config, fallbackReply: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-black font-bold focus:outline-none focus:border-black resize-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: QUICK BUTTONS */}
          {activeSubTab === 'buttons' && (
            <div className="bg-white p-6 rounded-3xl border-2 border-gray-300 shadow-sm space-y-5 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                <div>
                  <h3 className="text-base font-black text-black">추천 퀵 질문 버튼 목록</h3>
                  <p className="text-xs text-gray-500 font-medium mt-0.5">
                    챗봇 창 하단에 노출되는 원클릭 질의응답 버튼입니다. 클릭 시 답변과 함께 해당 페이지로 바로 이동할 수 있습니다.
                  </p>
                </div>
                <button
                  onClick={() =>
                    setEditingButton({
                      label: '',
                      reply: '',
                      actionTab: 'catalog',
                      actionSubTab: 'courses',
                      actionLabel: '해당 페이지로 이동',
                    })
                  }
                  className="px-3.5 py-2 bg-black hover:bg-gray-800 text-white font-black text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>새 퀵 버튼 추가</span>
                </button>
              </div>

              {/* Editing Modal/Form for Button */}
              {editingButton && (
                <div className="p-4 bg-stone-50 rounded-2xl border-2 border-[#0B3C26] space-y-3 animate-fadeIn">
                  <h4 className="text-xs font-black text-[#0B3C26]">
                    {editingButton.id ? '퀵 버튼 수정' : '새 퀵 버튼 등록'}
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-bold">
                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-black">버튼 표시 이름 (라벨)</label>
                      <input
                        type="text"
                        placeholder="예: 💬 어떤 교육과정이 있나요?"
                        value={editingButton.label || ''}
                        onChange={(e) => setEditingButton({ ...editingButton, label: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl font-bold text-black focus:outline-none focus:border-black"
                      />
                    </div>

                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-black">클릭 시 AI 자동 답변 문구</label>
                      <textarea
                        rows={3}
                        placeholder="방문자에게 안내할 상세 답변을 입력하세요."
                        value={editingButton.reply || ''}
                        onChange={(e) => setEditingButton({ ...editingButton, reply: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl font-bold text-black focus:outline-none focus:border-black resize-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-black">연결할 메인 메뉴 탭</label>
                      <select
                        value={editingButton.actionTab || 'catalog'}
                        onChange={(e) => setEditingButton({ ...editingButton, actionTab: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl font-bold text-black focus:outline-none focus:border-black"
                      >
                        <option value="catalog">교육·자격증 (catalog)</option>
                        <option value="consulting">창업컨설팅 (consulting)</option>
                        <option value="about">교육원 소개 (about)</option>
                        <option value="master">명장·명인 (master)</option>
                        <option value="gangnam">강남 소호 (gangnam)</option>
                        <option value="community">커뮤니티 / 1:1 문의 (community)</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-black">바로가기 버튼 라벨</label>
                      <input
                        type="text"
                        placeholder="예: 교육과정 전체보기"
                        value={editingButton.actionLabel || ''}
                        onChange={(e) => setEditingButton({ ...editingButton, actionLabel: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl font-bold text-black focus:outline-none focus:border-black"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setEditingButton(null)}
                      className="px-3 py-1.5 bg-stone-200 text-gray-700 font-bold text-xs rounded-xl cursor-pointer"
                    >
                      취소
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSaveButton(editingButton)}
                      className="px-4 py-1.5 bg-[#0B3C26] text-white font-black text-xs rounded-xl cursor-pointer shadow-xs"
                    >
                      적용
                    </button>
                  </div>
                </div>
              )}

              {/* List of Quick Buttons */}
              <div className="space-y-2.5">
                {config.quickButtons.map((btn, idx) => (
                  <div
                    key={btn.id}
                    className="p-4 bg-stone-50 rounded-2xl border border-stone-200 hover:border-black transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  >
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-gray-400 font-bold">#{idx + 1}</span>
                        <h4 className="font-black text-black text-sm">{btn.label}</h4>
                        <span className="text-[10px] font-bold bg-stone-200 text-stone-700 px-2 py-0.5 rounded">
                          연결: {btn.actionTab}
                        </span>
                      </div>
                      <p className="text-gray-600 font-medium line-clamp-2 leading-relaxed pl-5">
                        {btn.reply}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                      <button
                        onClick={() => setEditingButton(btn)}
                        className="p-2 bg-white hover:bg-stone-200 text-gray-700 rounded-xl border border-stone-300 transition-colors cursor-pointer"
                        title="수정"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteButton(btn.id)}
                        className="p-2 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl border border-rose-200 transition-colors cursor-pointer"
                        title="삭제"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: AI FAQ KNOWLEDGE RULES */}
          {activeSubTab === 'faq' && (
            <div className="bg-white p-6 rounded-3xl border-2 border-gray-300 shadow-sm space-y-5 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                <div>
                  <h3 className="text-base font-black text-black">AI 키워드 자동 응답 지식 베이스</h3>
                  <p className="text-xs text-gray-500 font-medium mt-0.5">
                    방문자가 챗봇 입력창에 자유 질문을 남겼을 때 키워드를 인식하여 즉시 자동 응답하는 지식 규칙입니다.
                  </p>
                </div>
                <button
                  onClick={() =>
                    setEditingFaq({
                      title: '',
                      keywords: '',
                      reply: '',
                      actionTab: 'catalog',
                      actionSubTab: 'courses',
                      actionLabel: '상세 확인하기',
                    })
                  }
                  className="px-3.5 py-2 bg-black hover:bg-gray-800 text-white font-black text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>새 지식 규칙 등록</span>
                </button>
              </div>

              {/* Editing Modal/Form for FAQ */}
              {editingFaq && (
                <div className="p-4 bg-stone-50 rounded-2xl border-2 border-[#0B3C26] space-y-3 animate-fadeIn">
                  <h4 className="text-xs font-black text-[#0B3C26]">
                    {editingFaq.id ? '지식 규칙 수정' : '새 지식 규칙 추가'}
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-bold">
                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-black">질문 주제 (관리용 제목)</label>
                      <input
                        type="text"
                        placeholder="예: 수강료 및 할인 문의"
                        value={editingFaq.title || ''}
                        onChange={(e) => setEditingFaq({ ...editingFaq, title: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl font-bold text-black focus:outline-none focus:border-black"
                      />
                    </div>

                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-black">
                        인식할 키워드 (쉼표로 구분하여 여러 개 등록)
                      </label>
                      <input
                        type="text"
                        placeholder="예: 수강료, 비용, 가격, 얼마, 결제, 할인"
                        value={
                          Array.isArray(editingFaq.keywords)
                            ? editingFaq.keywords.join(', ')
                            : editingFaq.keywords || ''
                        }
                        onChange={(e) => setEditingFaq({ ...editingFaq, keywords: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl font-bold text-black focus:outline-none focus:border-black"
                      />
                    </div>

                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-black">AI 자동 응답 문구</label>
                      <textarea
                        rows={3}
                        placeholder="키워드 인식 시 챗봇이 답변할 내용을 작성해 주세요."
                        value={editingFaq.reply || ''}
                        onChange={(e) => setEditingFaq({ ...editingFaq, reply: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl font-bold text-black focus:outline-none focus:border-black resize-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-black">연결할 페이지 탭</label>
                      <select
                        value={editingFaq.actionTab || 'catalog'}
                        onChange={(e) => setEditingFaq({ ...editingFaq, actionTab: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl font-bold text-black focus:outline-none focus:border-black"
                      >
                        <option value="catalog">교육·자격증 (catalog)</option>
                        <option value="consulting">창업컨설팅 (consulting)</option>
                        <option value="about">교육원 소개 (about)</option>
                        <option value="master">명장·명인 (master)</option>
                        <option value="gangnam">강남 소호 (gangnam)</option>
                        <option value="community">커뮤니티 / 1:1 문의 (community)</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-black">버튼 라벨</label>
                      <input
                        type="text"
                        placeholder="예: 교육과정 & 수강료 확인"
                        value={editingFaq.actionLabel || ''}
                        onChange={(e) => setEditingFaq({ ...editingFaq, actionLabel: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl font-bold text-black focus:outline-none focus:border-black"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setEditingFaq(null)}
                      className="px-3 py-1.5 bg-stone-200 text-gray-700 font-bold text-xs rounded-xl cursor-pointer"
                    >
                      취소
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSaveFaq(editingFaq)}
                      className="px-4 py-1.5 bg-[#0B3C26] text-white font-black text-xs rounded-xl cursor-pointer shadow-xs"
                    >
                      적용
                    </button>
                  </div>
                </div>
              )}

              {/* List of FAQ Rules */}
              <div className="space-y-3">
                {config.faqRules.map((faq, idx) => (
                  <div
                    key={faq.id}
                    className="p-4 bg-stone-50 rounded-2xl border border-stone-200 hover:border-black transition-all space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-gray-400 font-bold">#{idx + 1}</span>
                        <h4 className="font-black text-black text-sm">{faq.title}</h4>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setEditingFaq(faq)}
                          className="p-1.5 bg-white hover:bg-stone-200 text-gray-700 rounded-lg border border-stone-300 transition-colors cursor-pointer"
                          title="수정"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteFaq(faq.id)}
                          className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg border border-rose-200 transition-colors cursor-pointer"
                          title="삭제"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {(faq.keywords || []).map((kw, ki) => (
                        <span
                          key={ki}
                          className="px-2 py-0.5 bg-emerald-100 text-emerald-900 rounded-md font-bold text-[11px]"
                        >
                          #{kw}
                        </span>
                      ))}
                    </div>

                    <p className="text-gray-700 font-medium leading-relaxed bg-white p-2.5 rounded-xl border border-stone-200">
                      {faq.reply}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: SIMULATOR TEST */}
          {activeSubTab === 'preview' && (
            <div className="bg-white p-6 rounded-3xl border-2 border-gray-300 shadow-sm space-y-3">
              <h3 className="text-base font-black text-black">챗봇 대화 시뮬레이터 안내</h3>
              <p className="text-xs text-gray-600 font-medium leading-relaxed">
                오른쪽(또는 아래)의 인터랙티브 가상 챗봇 화면에서 변경된 설정과 키워드 매칭을 실시간으로 테스트해 보실 수 있습니다.
                질문창에 "수강료 얼마예요?", "자격증 시험 언제 보나요?", "정부지원금 받고 싶어요" 등을 입력해 보세요!
              </p>
            </div>
          )}
        </div>

        {/* Right Column: Live Simulator Phone Frame */}
        <div className="xl:col-span-5 bg-white p-4 sm:p-6 rounded-3xl border-2 border-gray-300 shadow-lg space-y-3">
          <div className="flex items-center justify-between border-b border-gray-200 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-black text-black">실시간 챗봇 시뮬레이터</span>
            </div>
            <button
              onClick={() => setSimChatLog([{ sender: 'bot', text: config.welcomeMessage }])}
              className="text-[11px] font-bold text-gray-500 hover:text-black cursor-pointer underline"
            >
              대화창 비우기
            </button>
          </div>

          {/* Phone Frame Simulator */}
          <div className="bg-[#0B3C26] p-2 sm:p-3 rounded-3xl shadow-xl">
            <div className="bg-white rounded-2xl overflow-hidden flex flex-col h-[520px] border border-[#C5A059]">
              {/* Chat Header */}
              <div className="bg-[#0B3C26] text-white p-3.5 px-4 flex items-center justify-between border-b border-[#C5A059] shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#C5A059] flex items-center justify-center text-[#0B3C26] shadow-sm">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-black text-xs sm:text-sm text-white leading-tight">
                      {config.botName || '한국외식창업교육원 AI 도우미'}
                    </h5>
                    <span className="text-[10px] text-emerald-300 font-bold">● 24시간 실시간 질문 도우미</span>
                  </div>
                </div>
              </div>

              {/* Chat Log */}
              <div className="flex-1 p-3 overflow-y-auto space-y-3 bg-[#FDFBF7] text-xs font-bold">
                {simChatLog.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[85%] p-3 rounded-2xl leading-relaxed text-xs ${
                        msg.sender === 'user'
                          ? 'bg-[#0B3C26] text-white font-extrabold rounded-tr-none'
                          : 'bg-white text-gray-900 font-bold border border-stone-200 rounded-tl-none shadow-2xs'
                      }`}
                    >
                      {msg.text}
                    </div>

                    {msg.targetTab && (
                      <div className="mt-1 px-3 py-1.5 bg-[#C5A059] text-white text-[11px] font-black rounded-lg shadow-2xs flex items-center gap-1 border border-[#D4AF37]">
                        <span>{msg.actionLabel || '해당 페이지로 바로 이동'}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-white" />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Quick Questions Buttons inside Simulator */}
              <div className="p-2.5 bg-stone-50 border-t border-stone-200 space-y-1.5 shrink-0 max-h-32 overflow-y-auto">
                <span className="text-[10px] font-black text-gray-500 block px-1">추천 퀵 질문:</span>
                <div className="flex flex-col gap-1">
                  {config.quickButtons.map((q) => (
                    <button
                      key={q.id}
                      onClick={() => handleSimQuickClick(q)}
                      className="text-left px-2.5 py-1.5 bg-white hover:bg-emerald-50 text-gray-900 font-bold text-[11px] rounded-lg border border-stone-200 transition-colors flex items-center justify-between cursor-pointer"
                    >
                      <span className="truncate">{q.label}</span>
                      <ChevronRight className="w-3 h-3 text-gray-400 shrink-0" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Text Input inside Simulator */}
              <form
                onSubmit={handleSimSend}
                className="p-2 bg-white border-t border-stone-200 flex items-center gap-1.5 shrink-0"
              >
                <input
                  type="text"
                  placeholder="직접 질문을 입력해 보세요..."
                  value={simInput}
                  onChange={(e) => setSimInput(e.target.value)}
                  className="flex-1 px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs font-bold text-black focus:outline-none focus:border-black"
                />
                <button
                  type="submit"
                  className="p-2 bg-[#0B3C26] hover:bg-[#072819] text-[#D4AF37] rounded-xl cursor-pointer transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
