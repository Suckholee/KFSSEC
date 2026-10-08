import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, Edit, Trash2, LayoutGrid, List, Users, Sparkles, Tag, Eye, Clock, Video, GripVertical, ArrowUp, ArrowDown, CheckCircle2, Move } from 'lucide-react';
import CourseEditModal from './CourseEditModal';
import { getCoursesFromDB, saveCoursesToDB, fetchCoursesFromAPI } from '../../services/courseDatabase';

export default function AdminCourses() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [viewMode, setViewMode] = useState('gallery'); // 'gallery' | 'list'
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedCourseForEdit, setSelectedCourseForEdit] = useState(null);

  // Drag and Drop state
  const [draggedCourseId, setDraggedCourseId] = useState(null);
  const [dragOverCourseId, setDragOverCourseId] = useState(null);
  const [reorderNotice, setReorderNotice] = useState('');

  // Load authoritative courses from localStorage / API
  const [courses, setCourses] = useState(getCoursesFromDB);

  useEffect(() => {
    const update = () => setCourses(getCoursesFromDB());
    window.addEventListener('kfssec_courses_updated', update);
    fetchCoursesFromAPI().then(data => {
      if (data && Array.isArray(data)) setCourses(data);
    }).catch(() => {});
    return () => window.removeEventListener('kfssec_courses_updated', update);
  }, []);

  const filteredCourses = courses.filter((c) => {
    const title = c.title || '';
    const instructor = c.instructor || '';
    const matchesSearch = title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = categoryFilter === 'all' || c.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  const handleOpenAddModal = () => {
    setSelectedCourseForEdit(null);
    setEditModalOpen(true);
  };

  const handleOpenEditModal = (course) => {
    setSelectedCourseForEdit(course);
    setEditModalOpen(true);
  };

  const handleSaveCourse = async (savedCourse) => {
    const exists = courses.some((c) => c.id === savedCourse.id);
    let nextCourses;
    if (exists) {
      nextCourses = courses.map((c) => (c.id === savedCourse.id ? savedCourse : c));
    } else {
      nextCourses = [savedCourse, ...courses];
    }
    if (!await persistCourses(nextCourses)) throw new Error('교육과정을 저장하지 못했습니다. 입력 내용은 유지됩니다.');
  };

  const persistCourses = async nextCourses => {
    try {
      setCourses(await saveCoursesToDB(nextCourses));
      return true;
    } catch (error) {
      setReorderNotice(`저장 실패: ${error.message}`);
      return false;
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('정말로 이 교육과정을 목록에서 삭제하시겠습니까?')) {
      const nextCourses = courses.filter((c) => c.id !== id);
      if (!await persistCourses(nextCourses)) return;

    }
  };

  // Drag & Drop Handlers for Reordering
  const handleDragStart = (e, courseId) => {
    setDraggedCourseId(courseId);
    e.dataTransfer.setData('text/plain', courseId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, courseId) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (draggedCourseId && String(draggedCourseId) !== String(courseId)) {
      if (dragOverCourseId !== courseId) {
        setDragOverCourseId(courseId);
      }
    }
  };

  const handleDragLeave = (e, courseId) => {
    if (dragOverCourseId === courseId) {
      setDragOverCourseId(null);
    }
  };

  const handleDrop = async (e, targetCourseId) => {
    e.preventDefault();
    const sourceId = draggedCourseId || e.dataTransfer.getData('text/plain');
    if (!sourceId || String(sourceId) === String(targetCourseId)) {
      setDraggedCourseId(null);
      setDragOverCourseId(null);
      return;
    }

    const fromIndex = courses.findIndex((c) => String(c.id) === String(sourceId));
    const toIndex = courses.findIndex((c) => String(c.id) === String(targetCourseId));

    if (fromIndex !== -1 && toIndex !== -1 && fromIndex !== toIndex) {
      const nextCourses = [...courses];
      const [moved] = nextCourses.splice(fromIndex, 1);
      nextCourses.splice(toIndex, 0, moved);
      setDraggedCourseId(null);
      setDragOverCourseId(null);
      if (!await persistCourses(nextCourses)) return;

      setReorderNotice(`'${moved.title}' 과정의 위치가 변경되었습니다.`);
      setTimeout(() => setReorderNotice(''), 3000);
    }

    setDraggedCourseId(null);
    setDragOverCourseId(null);
  };

  const handleDragEnd = () => {
    setDraggedCourseId(null);
    setDragOverCourseId(null);
  };

  // Quick arrow buttons as convenient alternative
  const handleMoveCourse = async (courseId, direction) => {
    const currentIndex = courses.findIndex((c) => String(c.id) === String(courseId));
    if (currentIndex === -1) return;
    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (targetIndex < 0 || targetIndex >= courses.length) return;

    const nextCourses = [...courses];
    const [moved] = nextCourses.splice(currentIndex, 1);
    nextCourses.splice(targetIndex, 0, moved);
    if (!await persistCourses(nextCourses)) return;

    setReorderNotice(`'${moved.title}' 순서가 변경되었습니다.`);
    setTimeout(() => setReorderNotice(''), 3000);
  };

  return (
    <div className="space-y-6 animate-fadeIn">

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-br from-[#EBF6EF] via-[#F3FAF5] to-[#E5F3EB] p-6 rounded-3xl border border-[#CCE7D7] shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#D4EEDB] text-[#1C5B3A] border border-[#BDE3C8] text-[11px] font-extrabold tracking-wider">
              CURRICULUM MANAGER
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[#153D28] mt-1.5">
            온라인 교육 및 전문 자격과정 관리
          </h2>
          <p className="text-xs sm:text-sm text-[#3E7356] font-medium mt-1">
            교육원 공식 자격과정의 과정명, 담당 교수진, 교육 형태, 교육 기간, 수강료 및 포스터를 관리할 수 있습니다.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="px-5 py-2.5 bg-[#2B7752] hover:bg-[#226142] text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs hover:shadow-md transition-all shrink-0 cursor-pointer flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>신규 교육과정 등록</span>
        </button>
      </div>

      {/* Filter & Search Bar + View Mode Toggle */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#D5EADF] shadow-xs">

        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-[#3C825D] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="과정명 또는 강사명으로 검색..."
            className="w-full bg-[#F3FAF5] border border-[#CDE5D8] rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-[#183B29] placeholder-[#7CAE93] focus:outline-none focus:border-[#388C61] focus:bg-white transition-colors"
          />
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto no-scrollbar">
          <Filter className="w-4 h-4 text-[#3C825D] shrink-0" />
          {[
            { id: 'all', name: '전체' },
            { id: 'startup', name: '외식창업' },
            { id: 'management', name: '외식실무' },
            { id: 'hansik', name: '한국음식' },
            { id: 'foodtech', name: '푸드테크' },
            { id: 'beverage', name: '식음료' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                categoryFilter === cat.id
                  ? 'bg-[#2B7752] text-white shadow-xs'
                  : 'bg-[#F0F8F3] text-[#295F43] hover:bg-[#E3F2E9] border border-[#D3EBDC]'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* View Mode Toggle Button */}
        <div className="flex items-center gap-1 bg-[#EDF7F1] p-1 rounded-xl border border-[#CCE5D7] shrink-0 self-end md:self-auto">
          <button
            onClick={() => setViewMode('gallery')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              viewMode === 'gallery'
                ? 'bg-white text-[#1B5237] shadow-xs font-black'
                : 'text-[#487C60] hover:text-[#1B5237]'
            }`}
            title="썸네일 갤러리 카드형"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>갤러리형</span>
          </button>

          <button
            onClick={() => setViewMode('list')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              viewMode === 'list'
                ? 'bg-white text-[#1B5237] shadow-xs font-black'
                : 'text-[#487C60] hover:text-[#1B5237]'
            }`}
            title="목록 리스트형"
          >
            <List className="w-3.5 h-3.5" />
            <span>리스트형</span>
          </button>
        </div>

      </div>

      {/* Drag & Drop Reorder Guidance Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-3 rounded-2xl bg-gradient-to-r from-[#EAF6EF] via-[#F2F9F5] to-[#EAF6EF] border border-[#C8E5D5] text-[#1E5239] shadow-xs">
        <div className="flex items-center gap-2.5 text-xs sm:text-sm font-bold">
          <div className="p-1.5 rounded-lg bg-[#D3ECDD] text-[#256846] border border-[#BCE1CB] shrink-0">
            <GripVertical className="w-4 h-4" />
          </div>
          <span>
            {reorderNotice ? (
              <span className="text-[#1A5B3A] font-extrabold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#2E7E56]" />
                {reorderNotice}
              </span>
            ) : (
              <span>
                <strong className="text-[#123924]">마우스 드래그로 순서 변경:</strong> 카드를 원하는 위치로 끌어다 놓으면 순서가 즉시 실시간 저장됩니다.
              </span>
            )}
          </span>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-[#336F4E] shrink-0 self-end sm:self-auto">
          <span className="px-2.5 py-1 rounded-full bg-white/90 border border-[#CDE7D8] font-mono font-bold shadow-2xs">
            총 {courses.length}개 과정 등록됨
          </span>
        </div>
      </div>

      {/* VIEW MODE 1: GALLERY CARD GRID VIEW WITH DRAG & DROP */}
      {viewMode === 'gallery' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCourses.map((c) => {
            const priceDisplay = c.price ? (typeof c.price === 'number' ? `${c.price.toLocaleString()}원` : c.price) : (c.priceFormatted || '수강료 문의');
            const currentIndex = courses.findIndex((item) => item.id === c.id);
            const isFirst = currentIndex === 0;
            const isLast = currentIndex === courses.length - 1;
            const isBeingDragged = draggedCourseId === c.id;
            const isDropTarget = dragOverCourseId === c.id;

            return (
              <div
                key={c.id}
                draggable={true}
                onDragStart={(e) => handleDragStart(e, c.id)}
                onDragOver={(e) => handleDragOver(e, c.id)}
                onDragLeave={(e) => handleDragLeave(e, c.id)}
                onDrop={(e) => handleDrop(e, c.id)}
                onDragEnd={handleDragEnd}
                className={`bg-white rounded-3xl border overflow-hidden transition-all duration-300 flex flex-col justify-between group relative select-none cursor-grab active:cursor-grabbing ${
                  isBeingDragged
                    ? 'opacity-30 scale-95 border-dashed border-[#348A60] ring-2 ring-[#52B582]/40 bg-[#F4FAF6]'
                    : isDropTarget
                    ? 'border-[#2C7B53] ring-4 ring-[#88D3AC]/70 scale-[1.03] bg-[#EBF7F0] z-20 shadow-xl'
                    : 'border-[#D9EDE1] hover:border-[#86C9A5] shadow-xs hover:shadow-xl hover:-translate-y-1'
                }`}
              >
                {/* Visual Drop Target Highlight */}
                {isDropTarget && (
                  <div className="absolute inset-0 bg-[#35895F]/15 border-2 border-[#2F7E56] rounded-3xl pointer-events-none z-30 flex items-center justify-center backdrop-blur-[1px]">
                    <div className="px-4 py-2 bg-[#1B5238] text-white rounded-xl font-black text-xs shadow-xl border border-[#6CC295] flex items-center gap-2">
                      <Move className="w-4 h-4 text-[#9CE0BC] animate-bounce" />
                      <span>여기에 놓기 (위치 변경)</span>
                    </div>
                  </div>
                )}

                {/* Thumbnail Cover Header with Unclipped Fit Support */}
                <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100 p-1 flex items-center justify-center border-b border-[#E3EFE8]">
                  <img
                    src={c.thumbnail || c.image || '/images/qualifications/advisor.jpg'}
                    alt={c.title}
                    className={`w-full h-full pointer-events-none ${
                      c.fitMode === 'cover' ? 'object-cover object-top' : 'object-contain object-center'
                    } group-hover:scale-105 transition-transform duration-500`}
                    onError={(e) => {
                      e.target.src = '/images/qualifications/advisor.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />

                  {/* Top Badges: Category & Drag Grip Handle */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                    <div className="flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-white/95 text-[#184F34] text-[10px] font-black flex items-center justify-center border border-[#BCE1CB] shadow-xs">
                        {currentIndex + 1}
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-[#276F4B] text-white text-[11px] font-black shadow-xs tracking-wider">
                        {c.categoryName || (c.category === 'startup' ? '외식창업' : c.category === 'management' ? '외식실무' : c.category === 'hansik' ? '한국음식' : c.category === 'foodtech' ? '푸드테크' : c.category === 'beverage' ? '식음료' : '교육과정')}
                      </span>
                    </div>

                    {/* Drag Handle Capsule */}
                    <div
                      className="px-2.5 py-1 rounded-full bg-white/90 hover:bg-[#256D48] text-[#1E5638] hover:text-white text-[10px] font-black flex items-center gap-1 backdrop-blur-md border border-white/60 shadow-xs cursor-grab active:cursor-grabbing transition-all"
                      title="이 카드를 마우스로 드래그하여 순서를 바꿀 수 있습니다"
                    >
                      <GripVertical className="w-3.5 h-3.5 text-[#2E7E56] group-hover:text-white" />
                      <span>드래그 이동</span>
                    </div>
                  </div>

                  {/* Bottom ID and Format */}
                  <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between z-10">
                    <div className="text-xs font-mono text-white font-bold bg-black/60 px-2 py-0.5 rounded-md backdrop-blur-xs border border-white/20">
                      {c.id}
                    </div>
                    <span className="px-2.5 py-0.5 rounded-md bg-[#256D48]/90 text-white text-[11px] font-bold border border-white/20 shadow-xs backdrop-blur-xs">
                      {c.format || c.grade || '온·오프라인'}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4 bg-white">
                  <div className="space-y-1.5">
                    <h3 className="text-base font-black text-gray-900 group-hover:text-[#256D48] transition-colors leading-snug line-clamp-2">
                      {c.title}
                    </h3>
                    <p className="text-xs text-gray-600 line-clamp-2 font-medium leading-relaxed">
                      {c.desc || c.description || '외식창업 전문 실무 교육'}
                    </p>
                  </div>

                  <div className="space-y-3 pt-3 border-t border-[#E3EFE7]">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500 font-medium">강사: {c.instructor}</span>
                      <span className="text-[#1E5D3B] font-bold bg-[#EAF5EE] px-2.5 py-0.5 rounded-md border border-[#C8E5D4]">
                        {c.duration || '4주 과정'}
                      </span>
                    </div>

                    {/* Single Tuition Fee, Quick Up/Down Nudge & Action Buttons */}
                    <div className="flex items-end justify-between pt-1">
                      <div className="flex flex-col">
                        <span className="text-[11px] text-gray-400 font-medium">수강료</span>
                        <span className="text-lg font-black text-[#1E5D3B]">
                          {priceDisplay}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        {/* Quick Up/Down Arrow Nudge Buttons */}
                        <div className="flex items-center rounded-xl bg-[#F0F8F3] border border-[#CFE7D9] p-0.5">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleMoveCourse(c.id, 'up');
                            }}
                            disabled={isFirst}
                            className={`p-1 rounded-lg transition-colors cursor-pointer ${
                              isFirst ? 'text-gray-300 cursor-not-allowed' : 'text-[#3E7557] hover:text-[#184F34] hover:bg-[#DCF0E4]'
                            }`}
                            title="앞 순서로 이동"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleMoveCourse(c.id, 'down');
                            }}
                            disabled={isLast}
                            className={`p-1 rounded-lg transition-colors cursor-pointer ${
                              isLast ? 'text-gray-300 cursor-not-allowed' : 'text-[#3E7557] hover:text-[#184F34] hover:bg-[#DCF0E4]'
                            }`}
                            title="뒤 순서로 이동"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenEditModal(c);
                          }}
                          className="px-3 py-1.5 rounded-xl bg-[#2A7550] hover:bg-[#1E5C3D] text-white text-xs font-bold transition-all cursor-pointer shadow-xs flex items-center gap-1"
                          title="교육과정 정보 수정"
                        >
                          <Edit className="w-3.5 h-3.5" />
                          <span>수정</span>
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(c.id);
                          }}
                          className="p-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 transition-colors cursor-pointer"
                          title="삭제"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* VIEW MODE 2: TABLE LIST VIEW WITH DRAG & DROP */
        <div className="bg-white rounded-3xl p-6 border border-[#D5EADF] shadow-xs">
          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left border-collapse min-w-[850px]">
              <thead>
                <tr className="text-xs font-black text-[#1E593A] bg-[#EEF8F2] border-b border-[#CFE7DA]">
                  <th className="py-3 px-3 text-center rounded-l-xl">드래그 순서</th>
                  <th className="py-3 px-3">썸네일</th>
                  <th className="py-3 px-3">과정 ID</th>
                  <th className="py-3 px-3">카테고리</th>
                  <th className="py-3 px-3">교육 과정명</th>
                  <th className="py-3 px-3">담당 명인 / 강사</th>
                  <th className="py-3 px-3">교육 기간</th>
                  <th className="py-3 px-3">진행 형태</th>
                  <th className="py-3 px-3">수강료</th>
                  <th className="py-3 px-3 text-center rounded-r-xl">관리</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E6F2EB] text-xs sm:text-sm font-semibold text-gray-700">
                {filteredCourses.map((c) => {
                  const priceDisplay = c.price ? (typeof c.price === 'number' ? `${c.price.toLocaleString()}원` : c.price) : (c.priceFormatted || '수강료 문의');
                  const currentIndex = courses.findIndex((item) => item.id === c.id);
                  const isFirst = currentIndex === 0;
                  const isLast = currentIndex === courses.length - 1;
                  const isBeingDragged = draggedCourseId === c.id;
                  const isDropTarget = dragOverCourseId === c.id;

                  return (
                    <tr
                      key={c.id}
                      draggable={true}
                      onDragStart={(e) => handleDragStart(e, c.id)}
                      onDragOver={(e) => handleDragOver(e, c.id)}
                      onDragLeave={(e) => handleDragLeave(e, c.id)}
                      onDrop={(e) => handleDrop(e, c.id)}
                      onDragEnd={handleDragEnd}
                      className={`transition-all select-none ${
                        isBeingDragged
                          ? 'opacity-30 bg-[#EAF5EF] border-2 border-dashed border-[#348A60]'
                          : isDropTarget
                          ? 'bg-[#E0F3E8] ring-2 ring-[#35895F] border-y-2 border-[#2A7550] font-bold'
                          : 'hover:bg-[#F4FAF6]'
                      }`}
                    >
                      <td className="py-3 px-3 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <div
                            className="p-1.5 rounded-lg bg-[#EAF5EF] hover:bg-[#D5EEDB] text-[#246A48] hover:text-[#14422C] border border-[#C6E4D3] cursor-grab active:cursor-grabbing transition-all flex items-center justify-center shadow-xs"
                            title="마우스로 끌어서 순서를 변경하세요"
                          >
                            <GripVertical className="w-4 h-4" />
                          </div>
                          <span className="w-6 h-6 rounded-md bg-white text-[#1C5838] text-xs font-mono font-bold flex items-center justify-center border border-[#BEDECB] shadow-xs">
                            {currentIndex + 1}
                          </span>
                          <div className="flex flex-col">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleMoveCourse(c.id, 'up');
                              }}
                              disabled={isFirst}
                              className={`p-0.5 rounded transition-colors ${
                                isFirst ? 'text-gray-300 cursor-not-allowed' : 'text-[#3E7557] hover:text-[#184F34] hover:bg-[#DCF0E4] cursor-pointer'
                              }`}
                              title="한 칸 위로 이동"
                            >
                              <ArrowUp className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleMoveCourse(c.id, 'down');
                              }}
                              disabled={isLast}
                              className={`p-0.5 rounded transition-colors ${
                                isLast ? 'text-gray-300 cursor-not-allowed' : 'text-[#3E7557] hover:text-[#184F34] hover:bg-[#DCF0E4] cursor-pointer'
                              }`}
                              title="한 칸 아래로 이동"
                            >
                              <ArrowDown className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-100 border border-[#C7E5D5] shrink-0 p-0.5 flex items-center justify-center shadow-xs">
                          <img
                            src={c.thumbnail || c.image || '/images/qualifications/advisor.jpg'}
                            alt={c.title}
                            className={`w-full h-full pointer-events-none ${
                              c.fitMode === 'cover' ? 'object-cover object-top' : 'object-contain object-center'
                            }`}
                            onError={(e) => {
                              e.target.src = '/images/qualifications/advisor.jpg';
                            }}
                          />
                        </div>
                      </td>
                      <td className="py-3 px-3 font-mono text-xs text-gray-500">{c.id}</td>
                      <td className="py-3 px-3">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#E5F5EC] text-[#1E5D3B] border border-[#BEDECB] text-[11px] font-black">
                          {c.categoryName || (c.category === 'startup' ? '외식창업' : c.category === 'management' ? '외식실무' : c.category === 'hansik' ? '한국음식' : c.category === 'foodtech' ? '푸드테크' : c.category === 'beverage' ? '식음료' : '교육과정')}
                        </span>
                      </td>
                      <td className="py-3 px-3 font-black text-gray-900">{c.title}</td>
                      <td className="py-3 px-3 text-gray-600">{c.instructor}</td>
                      <td className="py-3 px-3 text-[#1E5D3B] font-bold">{c.duration || '4주'}</td>
                      <td className="py-3 px-3 text-gray-700">
                        <span className="px-2.5 py-0.5 rounded-md bg-[#EDF7F1] text-[#1E5D3B] border border-[#CDE5D8] text-xs font-semibold">
                          {c.format || '온라인'}
                        </span>
                      </td>
                      <td className="py-3 px-3 font-black text-[#1E5D3B]">
                        {priceDisplay}
                      </td>
                      <td className="py-3 px-3 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenEditModal(c);
                            }}
                            className="p-1.5 rounded-lg bg-[#EBF7F0] hover:bg-[#256D48] text-[#256D48] hover:text-white border border-[#C7E4D3] transition-colors cursor-pointer"
                            title="교육과정 정보 수정"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(c.id);
                            }}
                            className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 transition-colors cursor-pointer"
                            title="삭제"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Interactive Course Edit & Add Modal */}
      <CourseEditModal
        isOpen={editModalOpen}
        course={selectedCourseForEdit}
        onClose={() => setEditModalOpen(false)}
        onSaveCourse={handleSaveCourse}
      />

    </div>
  );
}
