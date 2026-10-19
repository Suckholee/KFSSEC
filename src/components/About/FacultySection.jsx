import { resolveFaculty } from '../../data/faculty';
import { useLanguage } from '../../i18n/LanguageContext';
import React, { useState } from 'react';
import ScrollReveal from '../common/ScrollReveal';
import {
  GraduationCap,
  BookOpen,
  Award,
  Sparkles,
  Building,
  CheckCircle2,
  BookmarkCheck,
  UserCheck,
  MapPin,
  Store,
  Layers,
  FileText,
  Edit3,
  Camera,
  Upload,
  Plus,
  Trash2,
  Save,
  X,
} from 'lucide-react';
import EditableText from '../Admin/InlineEditor/EditableText';
import EditableImage from '../Admin/InlineEditor/EditableImage';
import { useAdminEdit } from '../../context/AdminEditContext';

export default function FacultySection({ facultyList: propFaculty }) {
  const { t } = useLanguage();
  const { isEditMode, siteDraft, updateSiteDraft } = useAdminEdit();

  const facultyMembers = resolveFaculty(
    siteDraft?.faculty?.length ? siteDraft.faculty : propFaculty
  );

  return (
    <div className="space-y-10 animate-fadeIn font-sans text-gray-900 w-full">
      {/* Admin Quick Editor Header when Edit Mode is active */}
      {isEditMode && (
        <div className="bg-gradient-to-r from-[#1B5238] via-[#266847] to-[#34885E] text-white p-4 sm:p-5 rounded-2xl border border-[#85CFAB]/50 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="p-2.5 bg-white/10 text-[#A7F3D0] rounded-xl border border-white/20">
              <GraduationCap className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-[#A7F3D0] uppercase tracking-wider">
                  교수진 & 자문위원 인라인 편집 모드
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-400/20 text-emerald-200 text-[10px] font-bold">
                  실시간 연동
                </span>
              </div>
              <p className="text-xs sm:text-sm text-gray-200 font-medium mt-0.5">
                화면의 교수 사진에 마우스를 올려 교체하거나, 성함, 직함, 약력 문구를 직접 클릭하여 수정할 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Top Banner Header */}
      <ScrollReveal direction="up" delay={0}>
        <div className="relative bg-gradient-to-br from-[#1E5B3C] via-[#2A7550] to-[#388C61] text-white rounded-3xl p-6 sm:p-10 border border-[#85CFAB]/50 shadow-xl overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/15 border border-white/25 text-[#A7F3D0] text-xs font-black rounded-full">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>DISTINGUISHED FACULTY & ADVISORS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight">
              외식산업 최고 권위의 <br className="hidden sm:inline" />
              <span className="text-[#A7F3D0]">명문 교수진 & 전문 자문단</span>
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100/90 font-medium leading-relaxed">
              사단법인 한국외식창업교육원은 조리명장, 상권분석 및 인테리어 건축 석학, 프랜차이즈 경영 정책 전문가가 하나 되어 이론과 실무를 관통하는 차별화된 교육을 제공합니다.
            </p>
          </div>
          <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-[#A7F3D0]/10 rounded-full blur-3xl pointer-events-none" />
        </div>
      </ScrollReveal>

      {/* Faculty Cards Grid */}
      <div className="space-y-8">
        {facultyMembers.map((member, idx) => (
          <ScrollReveal key={member.id || idx} direction="up" delay={100 + idx * 80}>
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 hover:border-[#34885E] shadow-sm hover:shadow-md transition-all duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left Column: Portrait & Badge */}
                <div className="lg:col-span-4 flex flex-col items-center sm:items-start space-y-4">
                  <div className="relative w-44 sm:w-52 aspect-[3/4] rounded-2xl overflow-hidden border border-[#D0E7DA] shadow-sm bg-stone-100">
                    <EditableImage
                      path={`faculty.${idx}.image`}
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full"
                      imageClassName="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="space-y-1.5 text-center sm:text-left w-full">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-black border ${member.badgeColor || 'bg-amber-100 text-amber-900 border-amber-300'}`}>
                      <EditableText path={`faculty.${idx}.badge`} value={member.badge} />
                    </span>
                    <h3 className="text-2xl font-black text-gray-900 tracking-tight flex items-center justify-center sm:justify-start gap-2">
                      <EditableText path={`faculty.${idx}.name`} value={member.name} />
                      <span className="text-sm font-bold text-gray-500">교수</span>
                    </h3>
                    <p className="text-xs font-black text-[#1E5D3B]">
                      <EditableText path={`faculty.${idx}.role`} value={member.role} />
                    </p>
                    <p className="text-xs text-gray-500 font-medium">
                      <EditableText path={`faculty.${idx}.title`} value={member.title} />
                    </p>
                  </div>
                </div>

                {/* Right Column: Full Details */}
                <div className="lg:col-span-8 space-y-5 text-gray-800">
                  
                  {/* Philosophy / Overview */}
                  <div className="bg-stone-50 p-4 sm:p-5 rounded-2xl border border-stone-200">
                    <p className="text-xs sm:text-sm text-gray-800 font-medium leading-relaxed italic">
                      "<EditableText multiline path={`faculty.${idx}.intro`} value={member.intro} />"
                    </p>
                  </div>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    
                    {/* Career & Academic Background */}
                    <div className="space-y-2.5">
                      <h4 className="text-xs font-black uppercase text-[#1E5D3B] flex items-center gap-1.5 border-b border-stone-200 pb-1.5">
                        <BookmarkCheck className="w-3.5 h-3.5 text-[#2B7752]" />
                        <span>주요 학력 및 경력</span>
                      </h4>
                      <ul className="space-y-1.5 text-xs text-gray-700 font-semibold">
                        {(member.highlights || []).map((h, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#2B7752] shrink-0 mt-0.5" />
                            <span>
                              <EditableText path={`faculty.${idx}.highlights.${i}`} value={h} />
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Specialties / Core Subjects */}
                    <div className="space-y-2.5">
                      <h4 className="text-xs font-black uppercase text-[#1E5D3B] flex items-center gap-1.5 border-b border-stone-200 pb-1.5">
                        <Store className="w-3.5 h-3.5 text-[#2B7752]" />
                        <span>전문 강의 및 지도 분야</span>
                      </h4>
                      <ul className="space-y-1.5 text-xs text-gray-700 font-semibold">
                        {(member.specialties || []).map((s, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#2B7752] shrink-0 mt-0.5" />
                            <span>
                              <EditableText path={`faculty.${idx}.specialties.${i}`} value={s} />
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>

                  {/* Publications */}
                  {member.publications && member.publications.length > 0 && (
                    <div className="pt-2">
                      <h4 className="text-xs font-black uppercase text-gray-700 flex items-center gap-1.5 mb-2">
                        <BookOpen className="w-3.5 h-3.5 text-[#2B7752]" />
                        <span>저서 및 주요 논문</span>
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {member.publications.map((pub, i) => (
                          <span
                            key={i}
                            className="inline-block text-xs font-medium px-3 py-1 bg-stone-100 text-gray-700 rounded-lg border border-stone-200"
                          >
                            <EditableText path={`faculty.${idx}.publications.${i}`} value={pub} />
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {member.id === 'prof-jin' && (
                    <div className="pt-3 border-t border-stone-100 flex justify-end">
                      <a
                        href="/consulting?tab=professor"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#FAF9F5] hover:bg-[#F2EFE9] text-[#2F6B55] border border-[#E7E3DA] text-xs font-bold transition shadow-2xs"
                      >
                        <span>진익준 교수 외식경영 & 공간전략 프로필(Expert Profile) 상세 보기</span>
                        <span>↗</span>
                      </a>
                    </div>
                  )}

                </div>

              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
