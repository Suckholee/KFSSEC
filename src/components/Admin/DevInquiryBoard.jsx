import React, { useState, useEffect, useRef } from 'react';
import {
  Terminal,
  PenTool,
  Send,
  Paperclip,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  CheckCircle2,
  Sparkles,
  Bug,
  Palette,
  Zap,
  Image as ImageIcon,
  Trash2,
  Filter,
  Plus,
  Maximize2,
  X,
  Target,
  Edit3,
  ListTodo,
  Layers,
  UserCheck,
  Code2,
  Save,
  RotateCcw,
} from 'lucide-react';

export function DevInquiryBoard() {
  const STORAGE_KEY = 'kfssec_dev_inquiries';

  const INITIAL_INQUIRIES = [
    {
      id: 3,
      type: '신규기능',
      title: '사전검토 및 현품확인 1:1 개발 소통 게시판 & 이미지 영역 주석 기능 구축',
      description: '업무 중 발견되는 라벨링 검토 버그나 추가 필요한 기능(예: 수강생 회원 DB 연동, 1:1 문의 워크스테이션)을 개발자에게 바로 전달하고 조치 결과를 확인할 수 있는 전용 게시판을 신설해주세요.\n또한 화면 캡쳐를 여러 장 첨부하고, 이미지 위 특정 영역을 드래그하여 번호별 주석(QA 피드백)을 남길 수 있도록 해주세요.',
      screenshots: [],
      status: 'completed',
      date: '2026.08.30 23:50',
      devReply: '✓ 구현 완료: Bokang 프로젝트 기반 1:1 개발 문의 고도화 완료. 다중 스크린샷 Cmd+V 캡쳐 붙여넣기, [마우스 드래그 영역 지정 + 번호별 주석(Annotation) 게시글 정리], 댓글/답변 작성 시 스크린샷 캡쳐 첨부 및 [게시글/댓글 실시간 수정 및 편집] 기능이 전면 연동되었습니다.',
      comments: [
        {
          author: '관리자(대표님)',
          text: '이미지에 네모 영역으로 번호를 찍고 주석을 남기니 한눈에 피드백이 정리되어 매우 편리하네요!',
          date: '2026.08.30 23:51',
        },
        {
          author: '👨‍💻 개발자(Antigravity)',
          text: '답변 및 추가 피드백 댓글을 남기실 때도 아래의 "📷 캡쳐/파일 첨부" 버튼이나 Cmd+V 붙여넣기로 스크린샷 이미지를 함께 전달하실 수 있습니다.',
          date: '2026.08.31 00:05',
        },
      ],
    },
    {
      id: 2,
      type: 'UI개선',
      title: '한국외식창업교육원 헤더 & 히어로 테마 레전드 골드 그린 룩앤필 적용',
      description: '어둡고 칙칙하던 브랜드 그린을 르 꼬르동 블루 명장 룩앤필의 딥 보틀 그린(#0B3C26)과 샴페인 골드(#C5A059)로 전면 디자인 시스템을 개선해주세요.',
      screenshots: [],
      status: 'completed',
      date: '2026.08.28 15:20',
      devReply: '✓ 구현 완료: Header, Hero, Category, Footer 및 전반적인 UI 룩앤필 전면 개편 완료되었습니다.',
    },
    {
      id: 1,
      type: '버그수정',
      title: '유튜브 미디어 썸네일 무한 재로드 검은 박스 현상 조치',
      description: '유튜브 썸네일 불러오기 실패 시 404 폴백으로 인해 발생하던 이미지 무한 재로드 및 글자 깜빡임 현상을 조치해주세요.',
      screenshots: [],
      status: 'completed',
      date: '2026.08.27 11:30',
      devReply: '✓ 조치 완료: YouTubeCardImage 컴포넌트 추가 및 로컬 고해상도 백업 썸네일 asset 연동으로 무한 루프가 해결되었습니다.',
    },
  ];

  const normalizeScreenshots = (ticket) => {
    if (Array.isArray(ticket.screenshots)) {
      return ticket.screenshots.map((item) => {
        if (typeof item === 'string') {
          return { url: item, annotations: [] };
        }
        return {
          url: item.url || '',
          annotations: Array.isArray(item.annotations) ? item.annotations : [],
        };
      });
    }
    if (ticket.screenshot) {
      return [{ url: ticket.screenshot, annotations: [] }];
    }
    return [];
  };

  const [inquiries, setInquiries] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isWriteFormOpen, setIsWriteFormOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('전체');
  const [expandedInquiryId, setExpandedInquiryId] = useState(3);

  // Main Inquiry Write Form State
  const [inquiryType, setInquiryType] = useState('신규기능');
  const [inquiryTitle, setInquiryTitle] = useState('');
  const [inquiryDesc, setInquiryDesc] = useState('');
  const [inquiryScreenshots, setInquiryScreenshots] = useState([]);
  const [savedNotice, setSavedNotice] = useState(null);

  // Edit Mode State
  const [editingInquiryId, setEditingInquiryId] = useState(null);
  const [editInquiryType, setEditInquiryType] = useState('신규기능');
  const [editInquiryTitle, setEditInquiryTitle] = useState('');
  const [editInquiryDesc, setEditInquiryDesc] = useState('');
  const [editInquiryScreenshots, setEditInquiryScreenshots] = useState([]);

  // Full Image Lightbox Modal
  const [previewImageModal, setPreviewImageModal] = useState(null);

  // Annotation Editor Modal Target
  const [annotationEditorTarget, setAnnotationEditorTarget] = useState(null);

  // Reply / Comments Input State Maps
  const [replyTexts, setReplyTexts] = useState({});
  const [replyAuthors, setReplyAuthors] = useState({});
  const [replyScreenshots, setReplyScreenshots] = useState({});

  const fileInputRef = useRef(null);
  const editFileInputRef = useRef(null);
  const lastPasteTimeRef = useRef(0);

  // Load from localStorage or seed
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        const normalized = parsed.map((item) => ({
          ...item,
          screenshots: normalizeScreenshots(item),
        }));
        setInquiries(normalized);
      } else {
        setInquiries(INITIAL_INQUIRIES);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_INQUIRIES));
      }
    } catch (e) {
      console.error('Failed to load dev inquiries from localStorage', e);
      setInquiries(INITIAL_INQUIRIES);
    }
    setIsLoaded(true);
  }, []);

  const saveInquiries = (updated) => {
    setInquiries(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save dev inquiries', e);
    }
  };

  const triggerToast = (msg) => {
    setSavedNotice(msg);
    setTimeout(() => setSavedNotice(null), 3000);
  };

  // Clipboard Paste Handler
  const handleGlobalClipboardPaste = (e) => {
    const items = e.clipboardData?.items;
    if (!items) return;

    const now = Date.now();
    if (now - lastPasteTimeRef.current < 300) return;

    let targetBlob = null;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.startsWith('image/')) {
        targetBlob = items[i].getAsFile();
        if (targetBlob) break;
      }
    }

    if (targetBlob) {
      e.preventDefault();
      e.stopPropagation();
      lastPasteTimeRef.current = now;

      if (editingInquiryId !== null) {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            const newScreenshot = {
              url: event.target.result,
              annotations: [],
            };
            setEditInquiryScreenshots((prev) => [...prev, newScreenshot]);
          }
        };
        reader.readAsDataURL(targetBlob);
      } else if (isWriteFormOpen) {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            const newScreenshot = {
              url: event.target.result,
              annotations: [],
            };
            setInquiryScreenshots((prev) => [...prev, newScreenshot]);
          }
        };
        reader.readAsDataURL(targetBlob);
      } else if (expandedInquiryId !== null) {
        const targetId = expandedInquiryId;
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            setReplyScreenshots((prev) => ({
              ...prev,
              [targetId]: [...(prev[targetId] || []), event.target.result],
            }));
          }
        };
        reader.readAsDataURL(targetBlob);
      } else {
        setIsWriteFormOpen(true);
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            const newScreenshot = {
              url: event.target.result,
              annotations: [],
            };
            setInquiryScreenshots([newScreenshot]);
          }
        };
        reader.readAsDataURL(targetBlob);
      }
    }
  };

  const handleFileUpload = (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      if (!file.type.startsWith('image/')) {
        alert(`${file.name}은(는) 이미지 파일이 아닙니다.`);
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const newScreenshot = {
            url: event.target.result,
            annotations: [],
          };
          setInquiryScreenshots((prev) => [...prev, newScreenshot]);
        }
      };
      reader.readAsDataURL(file);
    });

    e.target.value = '';
  };

  const handleEditFileUpload = (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      if (!file.type.startsWith('image/')) {
        alert(`${file.name}은(는) 이미지 파일이 아닙니다.`);
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const newScreenshot = {
            url: event.target.result,
            annotations: [],
          };
          setEditInquiryScreenshots((prev) => [...prev, newScreenshot]);
        }
      };
      reader.readAsDataURL(file);
    });

    e.target.value = '';
  };

  const handleSaveAnnotationsFromModal = (newAnnotations) => {
    if (!annotationEditorTarget) return;
    const { context, imageIdx } = annotationEditorTarget;

    if (context === 'create') {
      setInquiryScreenshots((prev) =>
        prev.map((item, idx) => (idx === imageIdx ? { ...item, annotations: newAnnotations } : item))
      );
    } else if (context === 'edit') {
      setEditInquiryScreenshots((prev) =>
        prev.map((item, idx) => (idx === imageIdx ? { ...item, annotations: newAnnotations } : item))
      );
    }
    setAnnotationEditorTarget(null);
  };

  const handleSubmitInquiry = (e) => {
    e.preventDefault();
    if (!inquiryTitle.trim() || !inquiryDesc.trim()) {
      alert('문의 제목과 상세 요청 내용을 입력해주세요.');
      return;
    }

    const now = new Date();
    const dateStr = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}.${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const nextId = inquiries.length > 0 ? Math.max(...inquiries.map((it) => it.id)) + 1 : 1;

    const newTicket = {
      id: nextId,
      type: inquiryType,
      title: inquiryTitle.trim(),
      description: inquiryDesc.trim(),
      screenshots: inquiryScreenshots,
      status: 'pending',
      date: dateStr,
      devReply: null,
      comments: [],
    };

    const updated = [newTicket, ...inquiries];
    saveInquiries(updated);
    setExpandedInquiryId(newTicket.id);
    setIsWriteFormOpen(false);
    setInquiryTitle('');
    setInquiryDesc('');
    setInquiryScreenshots([]);

    triggerToast('성공적으로 등록되었습니다!');
    alert('🚀 개발 문의글이 등록되었습니다. 확인 후 조치 답변이 반영됩니다.');
  };

  const handleStartEditInquiry = (ticket) => {
    setEditingInquiryId(ticket.id);
    setEditInquiryType(ticket.type);
    setEditInquiryTitle(ticket.title);
    setEditInquiryDesc(ticket.description);
    setEditInquiryScreenshots(ticket.screenshots || []);
  };

  const handleCancelEditInquiry = () => {
    setEditingInquiryId(null);
    setEditInquiryTitle('');
    setEditInquiryDesc('');
    setEditInquiryScreenshots([]);
  };

  const handleSaveEditInquiry = (ticketId) => {
    if (!editInquiryTitle.trim() || !editInquiryDesc.trim()) {
      alert('문의 제목과 상세 요청 내용을 입력해주세요.');
      return;
    }

    const updated = inquiries.map((item) => {
      if (item.id === ticketId) {
        return {
          ...item,
          type: editInquiryType,
          title: editInquiryTitle.trim(),
          description: editInquiryDesc.trim(),
          screenshots: editInquiryScreenshots,
        };
      }
      return item;
    });

    saveInquiries(updated);
    setEditingInquiryId(null);
    triggerToast('게시글 수정이 완료되었습니다!');
  };

  const handleDeleteInquiry = (ticketId) => {
    if (window.confirm('정말 이 개발 문의 게시글을 삭제하시겠습니까?')) {
      const updated = inquiries.filter((it) => it.id !== ticketId);
      saveInquiries(updated);
      if (expandedInquiryId === ticketId) setExpandedInquiryId(null);
      triggerToast('게시글이 삭제되었습니다.');
    }
  };

  const handleReplyFileUpload = (inquiryId, e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      if (!file.type.startsWith('image/')) {
        alert(`${file.name}은(는) 이미지 파일이 아닙니다.`);
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setReplyScreenshots((prev) => ({
            ...prev,
            [inquiryId]: [...(prev[inquiryId] || []), event.target.result],
          }));
        }
      };
      reader.readAsDataURL(file);
    });

    e.target.value = '';
  };

  const handleRemoveReplyScreenshot = (inquiryId, imgIdx) => {
    setReplyScreenshots((prev) => ({
      ...prev,
      [inquiryId]: (prev[inquiryId] || []).filter((_, idx) => idx !== imgIdx),
    }));
  };

  const handleAddComment = (inquiryId) => {
    const text = replyTexts[inquiryId]?.trim();
    const attachedImages = replyScreenshots[inquiryId] || [];

    if (!text && attachedImages.length === 0) {
      alert('내용을 입력하거나 스크린샷 이미지를 첨부해주세요.');
      return;
    }

    const now = new Date();
    const dateStr = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}.${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const author = replyAuthors[inquiryId] || '관리자(대표님)';

    const newComment = {
      author,
      text: text || '(첨부된 스크린샷 이미지)',
      date: dateStr,
      screenshots: attachedImages.length > 0 ? attachedImages : undefined,
    };

    const updated = inquiries.map((item) => {
      if (item.id === inquiryId) {
        return {
          ...item,
          comments: [...(item.comments || []), newComment],
        };
      }
      return item;
    });

    saveInquiries(updated);
    setReplyTexts((prev) => ({ ...prev, [inquiryId]: '' }));
    setReplyScreenshots((prev) => ({ ...prev, [inquiryId]: [] }));
    triggerToast('답변/댓글이 등록되었습니다.');
  };

  const handleDeleteComment = (ticketId, commentIdx) => {
    if (window.confirm('이 댓글을 삭제하시겠습니까?')) {
      const updated = inquiries.map((item) => {
        if (item.id === ticketId) {
          const filteredComments = (item.comments || []).filter((_, idx) => idx !== commentIdx);
          return { ...item, comments: filteredComments };
        }
        return item;
      });
      saveInquiries(updated);
      triggerToast('댓글이 삭제되었습니다.');
    }
  };

  const handleToggleStatus = (inquiryId) => {
    const updated = inquiries.map((item) => {
      if (item.id === inquiryId) {
        const nextStatus = item.status === 'completed' ? 'pending' : 'completed';
        return { ...item, status: nextStatus };
      }
      return item;
    });
    saveInquiries(updated);
  };

  const filteredInquiries = inquiries.filter((it) => {
    if (selectedFilter === '전체') return true;
    return it.type === selectedFilter;
  });

  if (!isLoaded) {
    return <div className="p-8 text-center text-gray-500 font-bold">개발 문의 워크스테이션 로딩 중...</div>;
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto" onPaste={handleGlobalClipboardPaste}>
      {/* Toast Notice */}
      {savedNotice && (
        <div className="fixed top-16 right-6 z-50 bg-[#0B3C26] text-white text-xs font-bold px-4 py-3 rounded-xl shadow-2xl animate-bounce flex items-center gap-2 border border-[#C5A059]">
          <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
          <span>{savedNotice}</span>
        </div>
      )}

      {/* ANNOTATION EDITOR MODAL */}
      {annotationEditorTarget !== null && (
        <AnnotationEditorModal
          screenshot={annotationEditorTarget.screenshot}
          onSave={handleSaveAnnotationsFromModal}
          onClose={() => setAnnotationEditorTarget(null)}
        />
      )}

      {/* FULL IMAGE ZOOM MODAL */}
      {previewImageModal && (
        <div
          className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4 backdrop-blur-xs animate-fadeIn"
          onClick={() => setPreviewImageModal(null)}
        >
          <div
            className="relative max-w-5xl max-h-[90vh] bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/20 p-2"
            onClick={(e) => e.stopPropagation()}
          >
            {previewImageModal.annotations && previewImageModal.annotations.length > 0 ? (
              <AnnotatedImageViewer screenshot={previewImageModal} interactive={false} />
            ) : (
              <img
                src={previewImageModal.url || previewImageModal}
                alt="확대 스크린샷"
                className="max-w-full max-h-[85vh] w-auto h-auto object-contain mx-auto block"
              />
            )}
            <button
              onClick={() => setPreviewImageModal(null)}
              className="absolute top-3 right-3 bg-black/70 hover:bg-black text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border border-white/30 transition-transform hover:scale-110 cursor-pointer z-10"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Header Title & Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-gray-200 pb-4">
        <div>
          <h2 className="text-xl font-black text-gray-900 tracking-tight flex items-center gap-2.5">
            <div className="p-2 bg-[#0B3C26] text-[#D4AF37] rounded-xl shadow-md">
              <Terminal className="w-5 h-5" />
            </div>
            <span>개발자 소통 & 1:1 개발 문의 게시판</span>
          </h2>
          <p className="text-xs text-gray-500 font-bold mt-1">
            버그 제보나 신규 기능 요구사항을 작성하면 개발자(Antigravity)의 조치 답변이 실시간 반영됩니다.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsWriteFormOpen(!isWriteFormOpen)}
            className="px-5 py-2.5 bg-[#0B3C26] hover:bg-[#072819] text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer border border-[#C5A059]"
          >
            <PenTool className="w-4 h-4 text-[#D4AF37]" />
            <span>{isWriteFormOpen ? '✕ 작성 닫기' : '✏️ 개발 문의하기'}</span>
          </button>
        </div>
      </div>

      {/* WRITE FORM COLLAPSIBLE PANEL */}
      {isWriteFormOpen && (
        <form
          onSubmit={handleSubmitInquiry}
          className="bg-white p-6 sm:p-7 rounded-3xl border-2 border-[#0B3C26] shadow-xl space-y-4 text-xs font-bold animate-fadeIn"
        >
          <div className="border-b border-gray-200 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h4 className="text-sm font-black text-gray-900 flex items-center gap-2">
              <Send className="w-4 h-4 text-[#0B3C26]" />
              <span>신규 개발 문의 작성</span>
            </h4>
            <span className="text-[11px] text-gray-500 font-bold">
              💡 화면 캡쳐 후 어디서든 <kbd className="px-1.5 py-0.5 bg-gray-100 rounded border font-mono">Cmd+V</kbd> 또는 <kbd className="px-1.5 py-0.5 bg-gray-100 rounded border font-mono">Ctrl+V</kbd>를 누르면 스크린샷이 자동 추가됩니다.
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-3">
              <label className="block text-gray-700 font-bold mb-1">문의 유형</label>
              <select
                value={inquiryType}
                onChange={(e) => setInquiryType(e.target.value)}
                className="w-full px-3 py-2.5 bg-gray-50 border border-gray-300 rounded-xl font-black text-gray-900 focus:outline-none focus:border-[#0B3C26]"
              >
                <option value="신규기능">✨ 신규기능</option>
                <option value="버그수정">🐞 버그수정</option>
                <option value="UI개선">🎨 UI개선</option>
                <option value="성능기타">⚡ 성능기타</option>
              </select>
            </div>

            <div className="md:col-span-9">
              <label className="block text-gray-700 font-bold mb-1">문의 제목</label>
              <input
                type="text"
                required
                placeholder="예: 수강생 DB 엑셀 다운로드 및 필터링 기능 추가 요청"
                value={inquiryTitle}
                onChange={(e) => setInquiryTitle(e.target.value)}
                className="w-full px-3 py-2.5 bg-gray-50 border border-gray-300 rounded-xl font-black text-gray-900 focus:outline-none focus:border-[#0B3C26]"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-1">상세 요청 내용</label>
            <textarea
              rows={4}
              required
              placeholder="개발자에게 전달할 요구사항이나 버그 증상을 구체적으로 설명해주세요... (스크린샷은 어디서든 Cmd+V로 바로 붙여넣거나 아래 파일 선택을 이용하세요)"
              value={inquiryDesc}
              onChange={(e) => setInquiryDesc(e.target.value)}
              className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl leading-relaxed focus:outline-none focus:border-[#0B3C26] resize-none font-medium text-gray-900"
            />
          </div>

          {/* SCREENSHOT MULTI-FILE UPLOAD & CLIPBOARD AREA */}
          <div className="space-y-3 bg-gray-50 p-4 rounded-2xl border border-gray-200 relative">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                  <Paperclip className="w-4 h-4 text-[#0B3C26]" />
                  <span>
                    스크린샷 이미지 및 영역별 주석(Annotation){' '}
                    <span className="text-[#0B3C26] font-black">
                      (현재 {inquiryScreenshots.length}장)
                    </span>
                  </span>
                </span>
                <p className="text-[11px] text-gray-500 font-bold">
                  캡쳐를 붙여넣은 뒤 각 이미지의 <strong>[🎯 영역 주석 달기]</strong> 버튼을 누르면 마우스 드래그로 문제 영역을 지정하고 메모를 남길 수 있습니다.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3.5 py-2 bg-white hover:bg-gray-100 text-gray-900 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 border border-gray-300 flex items-center gap-1.5 shadow-xs"
                >
                  <ImageIcon className="w-3.5 h-3.5 text-[#0B3C26]" />
                  <span>📁 여러 장 파일 선택</span>
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>
            </div>

            {/* Screenshots Preview Grid */}
            {inquiryScreenshots.length > 0 && (
              <div className="pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {inquiryScreenshots.map((item, index) => (
                    <div
                      key={index}
                      className="group relative rounded-2xl overflow-hidden border-2 border-gray-200 bg-white shadow-xs transition-all hover:border-[#0B3C26] space-y-2 p-2.5"
                    >
                      <div className="relative h-36 rounded-xl overflow-hidden bg-black flex items-center justify-center">
                        <img
                          src={item.url}
                          alt={`첨부 이미지 ${index + 1}`}
                          className="w-full h-full object-contain"
                        />
                        <span className="absolute bottom-1.5 left-1.5 bg-black/70 text-white text-[10px] font-mono px-1.5 py-0.5 rounded backdrop-blur-xs">
                          #{index + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            setInquiryScreenshots((prev) => prev.filter((_, idx) => idx !== index))
                          }
                          className="absolute top-1.5 right-1.5 bg-rose-600 text-white w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shadow-md transition-transform hover:scale-110 cursor-pointer"
                          title="이미지 삭제"
                        >
                          ✕
                        </button>
                      </div>

                      <div className="flex items-center justify-between gap-2 pt-1">
                        <div className="text-[11px] font-bold text-gray-600 flex items-center gap-1 truncate">
                          <Target className="w-3.5 h-3.5 text-[#0B3C26]" />
                          <span>
                            주석 {item.annotations.length > 0 ? (
                              <span className="text-[#0B3C26] font-black">
                                {item.annotations.length}개 설정됨
                              </span>
                            ) : (
                              '없음'
                            )}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            setAnnotationEditorTarget({
                              context: 'create',
                              imageIdx: index,
                              screenshot: item,
                            })
                          }
                          className="px-2.5 py-1 bg-[#0B3C26] hover:bg-[#072819] text-white rounded-lg text-[11px] font-bold transition-colors cursor-pointer flex items-center gap-1 shadow-xs"
                        >
                          <Edit3 className="w-3 h-3 text-[#D4AF37]" />
                          <span>{item.annotations.length > 0 ? '주석 수정' : '🎯 영역 주석 달기'}</span>
                        </button>
                      </div>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="h-48 rounded-2xl border-2 border-dashed border-gray-300 hover:border-[#0B3C26] bg-white hover:bg-gray-50 flex flex-col items-center justify-center gap-1 text-gray-500 hover:text-gray-900 transition-all cursor-pointer"
                  >
                    <Plus className="w-6 h-6 text-[#0B3C26]" />
                    <span className="text-xs font-bold">+ 이미지 추가 등록</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsWriteFormOpen(false)}
              className="px-4 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold text-xs rounded-xl transition-all cursor-pointer"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#0B3C26] hover:bg-[#072819] text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer border border-[#C5A059]"
            >
              <Send className="w-4 h-4 text-[#D4AF37]" />
              <span>🚀 개발 문의글 등록하기</span>
            </button>
          </div>
        </form>
      )}

      {/* FILTER TABS & SEARCH */}
      <div className="flex items-center justify-between gap-3 flex-wrap bg-white p-3 rounded-2xl border border-gray-200 shadow-xs">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {[
            { id: '전체', label: '전체 목록', icon: Filter },
            { id: '신규기능', label: '✨ 신규기능', icon: Sparkles },
            { id: '버그수정', label: '🐞 버그수정', icon: Bug },
            { id: 'UI개선', label: '🎨 UI개선', icon: Palette },
            { id: '성능기타', label: '⚡ 성능기타', icon: Zap },
          ].map((tab) => {
            const isSelected = selectedFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? 'bg-[#0B3C26] text-white shadow-sm border border-[#C5A059]'
                    : 'bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {tab.id === '전체'
                    ? inquiries.length
                    : inquiries.filter((it) => it.type === tab.id).length}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* BOARD TABLE LIST */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="bg-[#0B3C26] text-white px-6 py-4 flex items-center justify-between text-xs font-bold border-b border-[#C5A059]">
          <span>📋 개발 문의 목록 (총 {filteredInquiries.length}건)</span>
          <span className="text-[#D4AF37] font-mono text-[11px]">클릭 시 개발자 조치 및 피드백 확인 가능</span>
        </div>

        <div className="divide-y divide-gray-200 text-xs font-medium">
          {/* Table Header */}
          <div className="grid grid-cols-12 bg-gray-50 px-6 py-3 text-gray-500 font-bold border-b border-gray-200">
            <div className="col-span-1 text-center font-mono">번호</div>
            <div className="col-span-2 text-center">유형</div>
            <div className="col-span-5">문의 제목 & 첨부</div>
            <div className="col-span-2 text-center">작성일시</div>
            <div className="col-span-2 text-center">처리 상태</div>
          </div>

          {/* Table Rows */}
          {filteredInquiries.length === 0 ? (
            <div className="py-12 text-center text-gray-500 text-xs font-bold">
              등록된 개발 문의 내역이 없습니다. 상단의 '✏️ 개발 문의하기' 버튼을 눌러 첫 문의를 등록해보세요.
            </div>
          ) : (
            filteredInquiries.map((ticket) => {
              const isExpanded = expandedInquiryId === ticket.id;
              const isEditingThis = editingInquiryId === ticket.id;
              const ticketScreenshots = normalizeScreenshots(ticket);
              const totalAnnotations = ticketScreenshots.reduce((acc, it) => acc + it.annotations.length, 0);
              const currentReplyImages = replyScreenshots[ticket.id] || [];
              const currentAuthor = replyAuthors[ticket.id] || '관리자(대표님)';

              return (
                <div key={ticket.id} className="transition-colors hover:bg-gray-50/80">
                  {/* Summary Row */}
                  <div
                    onClick={() => {
                      if (!isEditingThis) {
                        setExpandedInquiryId(isExpanded ? null : ticket.id);
                      }
                    }}
                    className="grid grid-cols-12 px-6 py-4 items-center cursor-pointer select-none"
                  >
                    <div className="col-span-1 text-center font-mono text-gray-400 font-bold">
                      #{ticket.id}
                    </div>
                    <div className="col-span-2 text-center">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-black ${
                          ticket.type === '신규기능'
                            ? 'bg-blue-100 text-blue-800'
                            : ticket.type === '버그수정'
                            ? 'bg-rose-100 text-rose-800'
                            : ticket.type === 'UI개선'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {ticket.type}
                      </span>
                    </div>
                    <div className="col-span-5 font-black text-gray-900 flex items-center gap-2 pr-2">
                      <span className="truncate">{ticket.title}</span>
                      {ticketScreenshots.length > 0 && (
                        <span className="text-[10px] bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded border border-emerald-300 flex items-center gap-1 font-mono shrink-0">
                          📷 캡쳐 {ticketScreenshots.length}장
                          {totalAnnotations > 0 && ` (주석 ${totalAnnotations})`}
                        </span>
                      )}
                      {ticket.comments && ticket.comments.length > 0 && (
                        <span className="text-[10px] bg-gray-100 text-gray-700 px-1.5 py-0.2 rounded-full font-mono shrink-0 font-bold">
                          💬 {ticket.comments.length}
                        </span>
                      )}
                    </div>
                    <div className="col-span-2 text-center font-mono text-gray-500 text-[11px] font-bold">
                      {ticket.date}
                    </div>
                    <div className="col-span-2 text-center flex items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleStatus(ticket.id);
                        }}
                        className={`px-3 py-1 rounded-full text-[10px] font-black border transition-all cursor-pointer ${
                          ticket.status === 'completed'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                            : 'bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100'
                        }`}
                        title="클릭하여 상태 변경"
                      >
                        {ticket.status === 'completed' ? '✓ 완료됨' : '⏳ 처리 진행중'}
                      </button>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-gray-500" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                      )}
                    </div>
                  </div>

                  {/* EXPANDED DETAIL VIEW */}
                  {isExpanded && (
                    <div className="bg-gray-50/80 border-t border-gray-200 p-6 space-y-6 animate-fadeIn">
                      {/* INLINE EDIT MODE OR REGULAR VIEW */}
                      {isEditingThis ? (
                        /* EDIT MODE FORM */
                        <div className="bg-white p-6 rounded-2xl border-2 border-amber-500 shadow-md space-y-4">
                          <div className="border-b border-gray-200 pb-3 flex items-center justify-between">
                            <span className="text-sm font-black text-gray-900 flex items-center gap-2">
                              <Edit3 className="w-4 h-4 text-amber-600" />
                              <span>게시글 수정 & 편집 모드 (#{ticket.id})</span>
                            </span>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                            <div className="md:col-span-3">
                              <label className="block text-gray-700 font-bold mb-1">문의 유형</label>
                              <select
                                value={editInquiryType}
                                onChange={(e) => setEditInquiryType(e.target.value)}
                                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl font-bold text-gray-900"
                              >
                                <option value="신규기능">✨ 신규기능</option>
                                <option value="버그수정">🐞 버그수정</option>
                                <option value="UI개선">🎨 UI개선</option>
                                <option value="성능기타">⚡ 성능기타</option>
                              </select>
                            </div>

                            <div className="md:col-span-9">
                              <label className="block text-gray-700 font-bold mb-1">문의 제목</label>
                              <input
                                type="text"
                                required
                                value={editInquiryTitle}
                                onChange={(e) => setEditInquiryTitle(e.target.value)}
                                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl font-bold text-gray-900"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-gray-700 font-bold mb-1">상세 요청 내용</label>
                            <textarea
                              rows={4}
                              required
                              value={editInquiryDesc}
                              onChange={(e) => setEditInquiryDesc(e.target.value)}
                              className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl leading-relaxed font-medium text-gray-900 resize-none"
                            />
                          </div>

                          {/* EDIT SCREENSHOTS */}
                          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                                <Paperclip className="w-4 h-4 text-[#0B3C26]" />
                                <span>첨부된 스크린샷 ({editInquiryScreenshots.length}장) 및 주석 편집</span>
                              </span>

                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => editFileInputRef.current?.click()}
                                  className="px-3 py-1.5 bg-white hover:bg-gray-100 text-gray-900 rounded-lg text-xs font-bold border border-gray-300 flex items-center gap-1.5"
                                >
                                  <ImageIcon className="w-3.5 h-3.5" />
                                  <span>📁 이미지 추가</span>
                                </button>
                                <input
                                  ref={editFileInputRef}
                                  type="file"
                                  accept="image/*"
                                  multiple
                                  onChange={handleEditFileUpload}
                                  className="hidden"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                              {editInquiryScreenshots.map((item, index) => (
                                <div
                                  key={index}
                                  className="relative rounded-xl overflow-hidden border border-gray-300 bg-white space-y-2 p-2.5 shadow-xs"
                                >
                                  <div className="relative h-32 rounded-lg overflow-hidden bg-black flex items-center justify-center">
                                    <img
                                      src={item.url}
                                      alt={`첨부 이미지 ${index + 1}`}
                                      className="w-full h-full object-contain"
                                    />
                                    <button
                                      type="button"
                                      onClick={() =>
                                        setEditInquiryScreenshots((prev) =>
                                          prev.filter((_, idx) => idx !== index)
                                        )
                                      }
                                      className="absolute top-1.5 right-1.5 bg-rose-600 text-white w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs"
                                      title="삭제"
                                    >
                                      ✕
                                    </button>
                                  </div>

                                  <div className="flex items-center justify-between gap-2 pt-1">
                                    <span className="text-[11px] font-bold text-gray-500 truncate">
                                      주석 {item.annotations.length}개
                                    </span>
                                    <button
                                      type="button"
                                      onClick={() =>
                                        setAnnotationEditorTarget({
                                          context: 'edit',
                                          imageIdx: index,
                                          screenshot: item,
                                        })
                                      }
                                      className="px-2.5 py-1 bg-[#0B3C26] text-white rounded-lg text-[11px] font-bold cursor-pointer flex items-center gap-1"
                                    >
                                      <Edit3 className="w-3 h-3 text-[#D4AF37]" />
                                      <span>주석 편집</span>
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-200">
                            <button
                              type="button"
                              onClick={handleCancelEditInquiry}
                              className="px-4 py-2 bg-gray-200 text-gray-800 font-bold text-xs rounded-xl cursor-pointer flex items-center gap-1.5"
                            >
                              <RotateCcw className="w-3.5 h-3.5" />
                              <span>취소</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => handleSaveEditInquiry(ticket.id)}
                              className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl cursor-pointer flex items-center gap-1.5"
                            >
                              <Save className="w-4 h-4" />
                              <span>수정 완료 저장</span>
                            </button>
                          </div>
                        </div>
                      ) : (
                        /* REGULAR VIEW POST BOX */
                        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-xs space-y-5">
                          <div className="border-b border-gray-200 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-black text-gray-900 flex items-center gap-2">
                                <PenTool className="w-4 h-4 text-[#0B3C26]" />
                                <span>상세 문의 내용</span>
                              </span>
                              <span className="text-[11px] text-gray-500 font-mono font-bold">
                                작성일: {ticket.date}
                              </span>
                            </div>

                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => handleStartEditInquiry(ticket)}
                                className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg text-xs font-bold transition-colors cursor-pointer border border-gray-300 flex items-center gap-1"
                              >
                                <Edit3 className="w-3.5 h-3.5 text-blue-600" />
                                <span>게시글 수정</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteInquiry(ticket.id)}
                                className="px-3 py-1.5 bg-rose-50 hover:bg-rose-600 text-rose-700 hover:text-white rounded-lg text-xs font-bold transition-colors cursor-pointer border border-rose-200 flex items-center gap-1"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                <span>삭제</span>
                              </button>
                            </div>
                          </div>

                          <p className="text-xs sm:text-sm text-gray-800 font-medium leading-relaxed whitespace-pre-wrap">
                            {ticket.description}
                          </p>

                          {/* Screenshots with Area Annotation Overlays */}
                          {ticketScreenshots.length > 0 && (
                            <div className="pt-3 border-t border-gray-200 space-y-6">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                                  <Layers className="w-4 h-4 text-[#0B3C26]" />
                                  <span>
                                    첨부된 스크린샷 및 영역별 주석 리포트 ({ticketScreenshots.length}장)
                                  </span>
                                </span>
                                <span className="text-[11px] text-gray-500 font-bold">
                                  마우스를 올리거나 클릭하면 해당 영역 주석을 확인할 수 있습니다.
                                </span>
                              </div>

                              <div className="space-y-6">
                                {ticketScreenshots.map((item, imgIdx) => (
                                  <div
                                    key={imgIdx}
                                    className="bg-gray-50 p-4 rounded-2xl border border-gray-200 space-y-3"
                                  >
                                    <div className="flex items-center justify-between">
                                      <span className="text-xs font-bold text-gray-900 font-mono flex items-center gap-1.5">
                                        <ImageIcon className="w-3.5 h-3.5 text-[#0B3C26]" />
                                        <span>스크린샷 #{imgIdx + 1}</span>
                                      </span>
                                      <button
                                        type="button"
                                        onClick={() => setPreviewImageModal(item)}
                                        className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
                                      >
                                        <Maximize2 className="w-3.5 h-3.5" />
                                        <span>크게 보기</span>
                                      </button>
                                    </div>

                                    {/* Visual Annotated Image Viewer */}
                                    <div className="relative max-w-4xl max-h-[480px] rounded-xl overflow-hidden border border-gray-300 bg-black shadow-inner flex items-center justify-center">
                                      <AnnotatedImageViewer screenshot={item} interactive={true} />
                                    </div>

                                    {/* Annotation Comments List */}
                                    {item.annotations.length > 0 ? (
                                      <div className="bg-white p-3.5 rounded-xl border border-gray-200 space-y-2 mt-2">
                                        <span className="text-xs font-black text-gray-900 flex items-center gap-1.5 text-[11px]">
                                          <ListTodo className="w-3.5 h-3.5 text-rose-500" />
                                          <span>이 스크린샷의 영역별 피드백/주석 목록:</span>
                                        </span>
                                        <div className="space-y-1.5">
                                          {item.annotations.map((ann) => (
                                            <div
                                              key={ann.id}
                                              className="flex items-start gap-2 text-xs bg-gray-50 p-2 rounded-lg border border-gray-200"
                                            >
                                              <span className="w-5 h-5 rounded-full bg-rose-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                                                {ann.number}
                                              </span>
                                              <p className="text-gray-800 leading-relaxed font-medium">
                                                {ann.comment}
                                              </p>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    ) : (
                                      <p className="text-[11px] text-gray-500 italic font-bold">
                                        (추가 영역 주석 없음)
                                      </p>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Developer Reply Card */}
                      {ticket.devReply && (
                        <div className="bg-emerald-50/90 p-5 rounded-2xl border-2 border-emerald-400 text-xs font-medium text-emerald-950 space-y-2 shadow-xs">
                          <span className="font-black text-emerald-900 flex items-center gap-2 border-b border-emerald-200 pb-2 text-sm">
                            <Terminal className="w-4 h-4 text-emerald-700" />
                            <span>👨‍💻 개발자(Antigravity) 조치 및 작업 결과</span>
                          </span>
                          <p className="leading-relaxed font-mono text-xs whitespace-pre-wrap">{ticket.devReply}</p>
                        </div>
                      )}

                      {/* Additional Comments Timeline */}
                      {ticket.comments && ticket.comments.length > 0 && (
                        <div className="space-y-3 pt-1">
                          <span className="text-[11px] font-bold text-gray-500 block">
                            💬 주고받은 추가 대화 & 조치 답변 피드백:
                          </span>
                          {ticket.comments.map((c, cIdx) => {
                            const isDev = c.author.includes('개발자') || c.author.includes('Antigravity');
                            return (
                              <div
                                key={cIdx}
                                className={`p-4 rounded-2xl border text-xs font-normal space-y-2 shadow-xs ${
                                  isDev
                                    ? 'bg-emerald-50/60 border-emerald-300'
                                    : 'bg-white border-gray-200'
                                }`}
                              >
                                <div className="flex items-center justify-between text-gray-500 text-[10px]">
                                  <div className="flex items-center gap-1.5">
                                    {isDev ? (
                                      <span className="px-2 py-0.5 rounded-md bg-[#0B3C26] text-white font-bold text-[10px] flex items-center gap-1">
                                        <Code2 className="w-3 h-3 text-[#D4AF37]" />
                                        <span>개발자 답변</span>
                                      </span>
                                    ) : (
                                      <span className="px-2 py-0.5 rounded-md bg-blue-700 text-white font-bold text-[10px] flex items-center gap-1">
                                        <UserCheck className="w-3 h-3" />
                                        <span>관리자 피드백</span>
                                      </span>
                                    )}
                                    <span className="font-bold text-gray-900">{c.author}</span>
                                  </div>

                                  <div className="flex items-center gap-2">
                                    <span className="font-mono text-gray-500 font-bold">{c.date}</span>
                                    <button
                                      type="button"
                                      onClick={() => handleDeleteComment(ticket.id, cIdx)}
                                      className="text-gray-400 hover:text-rose-600 p-1 rounded transition-colors"
                                      title="댓글 삭제"
                                    >
                                      <Trash2 className="w-3 h-3" />
                                    </button>
                                  </div>
                                </div>

                                <p className="text-gray-900 leading-relaxed font-medium whitespace-pre-wrap">
                                  {c.text}
                                </p>

                                {c.screenshots && c.screenshots.length > 0 && (
                                  <div className="pt-2">
                                    <span className="text-[10px] font-bold text-gray-500 block mb-1">
                                      📷 첨부된 스크린샷 ({c.screenshots.length}장):
                                    </span>
                                    <div className="flex flex-wrap gap-2">
                                      {c.screenshots.map((imgUrl, iIdx) => (
                                        <div
                                          key={iIdx}
                                          onClick={() => setPreviewImageModal({ url: imgUrl })}
                                          className="group relative w-32 h-24 rounded-lg overflow-hidden border border-gray-300 bg-black shadow-xs cursor-pointer hover:border-[#0B3C26]"
                                        >
                                          <img
                                            src={imgUrl}
                                            alt={`댓글 이미지 ${iIdx + 1}`}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                          />
                                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[10px] font-bold">
                                            <Maximize2 className="w-3.5 h-3.5" />
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {/* REPLY FORM */}
                      <div className="bg-white p-5 rounded-2xl border-2 border-gray-200 shadow-sm space-y-3 pt-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-200 pb-2.5">
                          <span className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                            <MessageCircle className="w-4 h-4 text-[#0B3C26]" />
                            <span>💬 추가 의견 / 개발 조치 답변 전달하기</span>
                          </span>

                          <div className="flex items-center gap-2">
                            <span className="text-[11px] text-gray-500 font-bold">작성자:</span>
                            <div className="inline-flex bg-gray-100 p-0.5 rounded-lg text-[11px] font-bold">
                              <button
                                type="button"
                                onClick={() =>
                                  setReplyAuthors((prev) => ({ ...prev, [ticket.id]: '관리자(대표님)' }))
                                }
                                className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                                  currentAuthor === '관리자(대표님)'
                                    ? 'bg-white text-gray-900 shadow-xs font-black'
                                    : 'text-gray-500 hover:text-gray-900'
                                }`}
                              >
                                👤 관리자
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  setReplyAuthors((prev) => ({ ...prev, [ticket.id]: '👨‍💻 개발자(Antigravity)' }))
                                }
                                className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                                  currentAuthor === '👨‍💻 개발자(Antigravity)'
                                    ? 'bg-[#0B3C26] text-white shadow-xs font-black'
                                    : 'text-gray-500 hover:text-gray-900'
                                }`}
                              >
                                👨‍💻 개발자
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <textarea
                            rows={3}
                            placeholder="추가 요청사항이나 개발 조치 답변을 입력하세요... (스크린샷은 어디서든 Cmd+V로 바로 붙여넣거나 아래 파일 첨부를 클릭하세요)"
                            value={replyTexts[ticket.id] || ''}
                            onChange={(e) =>
                              setReplyTexts((prev) => ({ ...prev, [ticket.id]: e.target.value }))
                            }
                            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl text-xs font-medium text-gray-900 focus:outline-none focus:border-[#0B3C26] resize-none leading-relaxed"
                          />

                          {currentReplyImages.length > 0 && (
                            <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 space-y-2">
                              <span className="text-[11px] font-bold text-gray-900 flex items-center gap-1.5">
                                <ImageIcon className="w-3.5 h-3.5 text-[#0B3C26]" />
                                <span>첨부된 답변 스크린샷 ({currentReplyImages.length}장):</span>
                              </span>
                              <div className="flex flex-wrap gap-2">
                                {currentReplyImages.map((src, idx) => (
                                  <div
                                    key={idx}
                                    className="group relative w-28 h-20 rounded-lg overflow-hidden border border-gray-300 bg-black shadow-xs"
                                  >
                                    <img
                                      src={src}
                                      alt="답변 첨부 썸네일"
                                      className="w-full h-full object-cover"
                                    />
                                    <button
                                      type="button"
                                      onClick={() => handleRemoveReplyScreenshot(ticket.id, idx)}
                                      className="absolute top-1 right-1 bg-rose-600 text-white w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] shadow-sm hover:scale-110 cursor-pointer"
                                      title="이미지 삭제"
                                    >
                                      ✕
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                            <div className="flex items-center gap-2">
                              <label className="px-3 py-1.5 bg-white hover:bg-gray-100 text-gray-800 rounded-xl text-xs font-bold transition-colors cursor-pointer border border-gray-300 flex items-center gap-1.5 shadow-xs">
                                <Paperclip className="w-3.5 h-3.5 text-[#0B3C26]" />
                                <span>📷 캡쳐/파일 첨부</span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  multiple
                                  onChange={(e) => handleReplyFileUpload(ticket.id, e)}
                                  className="hidden"
                                />
                              </label>

                              <span className="text-[10px] text-gray-500 hidden sm:inline font-bold">
                                💡 Cmd+V로 바로 붙여넣기도 가능합니다.
                              </span>
                            </div>

                            <button
                              type="button"
                              onClick={() => handleAddComment(ticket.id)}
                              className="px-5 py-2 bg-[#0B3C26] hover:bg-[#072819] text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer ml-auto border border-[#C5A059]"
                            >
                              <Send className="w-3.5 h-3.5 text-[#D4AF37]" />
                              <span>답변/피드백 등록</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Subcomponent: Annotated Image Viewer
// ─────────────────────────────────────────────────────────────
function AnnotatedImageViewer({ screenshot, interactive = true }) {
  const [activeHoverId, setActiveHoverId] = useState(null);

  return (
    <div className="relative inline-block max-w-full overflow-hidden select-none">
      <img
        src={screenshot.url}
        alt="스크린샷"
        className="max-w-full max-h-[480px] w-auto h-auto object-contain block mx-auto"
      />

      {screenshot.annotations.map((ann) => {
        const isHovered = activeHoverId === ann.id;
        return (
          <div
            key={ann.id}
            onMouseEnter={() => interactive && setActiveHoverId(ann.id)}
            onMouseLeave={() => interactive && setActiveHoverId(null)}
            style={{
              left: `${ann.box.x}%`,
              top: `${ann.box.y}%`,
              width: `${ann.box.width}%`,
              height: `${ann.box.height}%`,
            }}
            className={`absolute border-2 transition-all cursor-pointer ${
              isHovered
                ? 'border-rose-500 bg-rose-500/25 shadow-lg ring-2 ring-rose-400 z-30'
                : 'border-rose-500/90 bg-rose-500/10 z-20'
            }`}
          >
            <div className="absolute -top-3.5 -left-3.5 w-6 h-6 rounded-full bg-rose-600 text-white font-bold text-xs flex items-center justify-center shadow-md border-2 border-white">
              {ann.number}
            </div>

            {isHovered && interactive && (
              <div className="absolute bottom-full left-0 mb-2 min-w-[180px] max-w-xs bg-gray-900/95 text-white p-2.5 rounded-xl text-xs font-medium shadow-2xl border border-white/20 z-40 animate-fadeIn">
                <div className="font-bold text-rose-300 text-[11px] mb-1 flex items-center gap-1">
                  <span>주석 #{ann.number}</span>
                </div>
                <p className="leading-snug">{ann.comment}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Subcomponent: Annotation Editor Modal
// ─────────────────────────────────────────────────────────────
function AnnotationEditorModal({ screenshot, onSave, onClose }) {
  const [annotations, setAnnotations] = useState(screenshot.annotations || []);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState(null);
  const [currentBox, setCurrentBox] = useState(null);
  const [activeEditingId, setActiveEditingId] = useState(null);

  const containerRef = useRef(null);

  const getRelativeCoords = (e) => {
    if (!containerRef.current) return { x: 0, y: 0 };
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    return { x, y };
  };

  const handleMouseDown = (e) => {
    if (e.button !== 0) return;
    const pos = getRelativeCoords(e);
    setStartPos(pos);
    setIsDrawing(true);
    setCurrentBox({ x: pos.x, y: pos.y, width: 0, height: 0 });
  };

  const handleMouseMove = (e) => {
    if (!isDrawing || !startPos) return;
    const pos = getRelativeCoords(e);
    const x = Math.min(startPos.x, pos.x);
    const y = Math.min(startPos.y, pos.y);
    const width = Math.abs(pos.x - startPos.x);
    const height = Math.abs(pos.y - startPos.y);
    setCurrentBox({ x, y, width, height });
  };

  const handleMouseUp = () => {
    if (!isDrawing || !currentBox) return;
    setIsDrawing(false);

    if (currentBox.width > 2 && currentBox.height > 2) {
      const nextNumber = annotations.length > 0 ? Math.max(...annotations.map((a) => a.number)) + 1 : 1;
      const newAnn = {
        id: `ann-${Date.now()}`,
        number: nextNumber,
        box: currentBox,
        comment: `영역 #${nextNumber} 요청사항`,
      };
      setAnnotations([...annotations, newAnn]);
      setActiveEditingId(newAnn.id);
    }
    setCurrentBox(null);
    setStartPos(null);
  };

  const handleUpdateComment = (id, comment) => {
    setAnnotations((prev) => prev.map((a) => (a.id === id ? { ...a, comment } : a)));
  };

  const handleDeleteAnnotation = (id) => {
    const remaining = annotations.filter((a) => a.id !== id);
    const renumbered = remaining.map((a, idx) => ({ ...a, number: idx + 1 }));
    setAnnotations(renumbered);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-3 sm:p-6 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white w-full max-w-6xl max-h-[95vh] rounded-3xl overflow-hidden shadow-2xl border border-gray-200 flex flex-col">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-gray-200 bg-[#0B3C26] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Target className="w-5 h-5 text-[#D4AF37]" />
            <div>
              <h3 className="font-extrabold text-sm">스크린샷 영역 주석(Annotation) 편집기</h3>
              <p className="text-[11px] text-emerald-200/80 font-bold">
                이미지 위에서 마우스로 드래그하여 사각 영역을 지정하고 요청사항을 작성하세요.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body: 2 Columns */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
          {/* Left Canvas Area */}
          <div className="lg:col-span-8 p-4 bg-black/90 flex flex-col items-center justify-center overflow-auto select-none relative min-h-[360px]">
            <div
              ref={containerRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              className="relative inline-block max-w-full max-h-[60vh] cursor-crosshair"
            >
              <img
                src={screenshot.url}
                alt="주석 편집 대상"
                className="max-w-full max-h-[60vh] w-auto h-auto object-contain block pointer-events-none"
              />

              {annotations.map((ann) => {
                const isSelected = activeEditingId === ann.id;
                return (
                  <div
                    key={ann.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveEditingId(ann.id);
                    }}
                    style={{
                      left: `${ann.box.x}%`,
                      top: `${ann.box.y}%`,
                      width: `${ann.box.width}%`,
                      height: `${ann.box.height}%`,
                    }}
                    className={`absolute border-2 transition-all ${
                      isSelected
                        ? 'border-rose-500 bg-rose-500/30 ring-2 ring-rose-400 z-30'
                        : 'border-rose-500/80 bg-rose-500/15 z-20'
                    }`}
                  >
                    <div className="absolute -top-3.5 -left-3.5 w-6 h-6 rounded-full bg-rose-600 text-white font-bold text-xs flex items-center justify-center shadow-md border-2 border-white">
                      {ann.number}
                    </div>
                  </div>
                );
              })}

              {currentBox && (
                <div
                  style={{
                    left: `${currentBox.x}%`,
                    top: `${currentBox.y}%`,
                    width: `${currentBox.width}%`,
                    height: `${currentBox.height}%`,
                  }}
                  className="absolute border-2 border-dashed border-rose-400 bg-rose-500/20 z-40 pointer-events-none"
                />
              )}
            </div>

            <div className="mt-2 text-[11px] text-white/70 font-mono font-bold">
              💡 마우스 좌클릭 후 드래그하면 빨간색 영역 박스가 생성됩니다.
            </div>
          </div>

          {/* Right Annotations List Panel */}
          <div className="lg:col-span-4 p-5 bg-white border-t lg:border-t-0 lg:border-l border-gray-200 flex flex-col justify-between overflow-y-auto max-h-[70vh]">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                <span className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                  <ListTodo className="w-4 h-4 text-[#0B3C26]" />
                  <span>지정된 영역별 주석 목록 ({annotations.length}개)</span>
                </span>
                <span className="text-[11px] text-gray-500 font-mono font-bold">
                  번호 자동 부여
                </span>
              </div>

              {annotations.length === 0 ? (
                <div className="py-12 text-center text-gray-500 text-xs font-bold space-y-2">
                  <p>아직 지정된 영역이 없습니다.</p>
                  <p className="text-[11px]">왼쪽 이미지 위에서 마우스로 드래그해보세요!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {annotations.map((ann) => (
                    <div
                      key={ann.id}
                      onClick={() => setActiveEditingId(ann.id)}
                      className={`p-3 rounded-2xl border transition-all space-y-2 cursor-pointer ${
                        activeEditingId === ann.id
                          ? 'border-rose-500 bg-rose-50/50 ring-1 ring-rose-400'
                          : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5 font-bold text-xs text-gray-900">
                          <span className="w-5 h-5 rounded-full bg-rose-600 text-white font-bold text-[10px] flex items-center justify-center">
                            {ann.number}
                          </span>
                          <span>영역 #{ann.number} 요청사항</span>
                        </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteAnnotation(ann.id);
                          }}
                          className="text-gray-400 hover:text-rose-600 p-1 rounded transition-colors"
                          title="삭제"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <textarea
                        rows={2}
                        value={ann.comment}
                        onChange={(e) => handleUpdateComment(ann.id, e.target.value)}
                        placeholder="이 영역에 대한 구체적인 수정/요청 사항을 입력하세요..."
                        className="w-full p-2 bg-white border border-gray-300 rounded-xl text-xs leading-relaxed focus:outline-none focus:border-rose-500 resize-none font-medium text-gray-900"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-gray-200 flex items-center justify-end gap-2 mt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 text-gray-800 font-bold text-xs rounded-xl transition-colors cursor-pointer"
              >
                취소
              </button>
              <button
                type="button"
                onClick={() => onSave(annotations)}
                className="px-5 py-2 bg-[#0B3C26] hover:bg-[#072819] text-white font-bold text-xs rounded-xl shadow-md transition-colors cursor-pointer flex items-center gap-1.5 border border-[#C5A059]"
              >
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                <span>주석 저장 완료</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
