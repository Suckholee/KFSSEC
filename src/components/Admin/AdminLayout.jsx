import React, { useState } from 'react';
import AdminDashboard from './AdminDashboard';
import AdminCourses from './AdminCourses';
import AdminApplications from './AdminApplications';
import AdminUsers from './AdminUsers';
import AdminContent from './AdminContent';
import AdminSettings from './AdminSettings';
import {
  LayoutDashboard,
  GraduationCap,
  ClipboardList,
  Users,
  Film,
  Settings,
  LogOut,
  ExternalLink,
  ShieldCheck,
  Menu,
  X,
  Bell,
} from 'lucide-react';

export default function AdminLayout({ onExitAdmin }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: '대시보드 종합', icon: LayoutDashboard },
    { id: 'courses', label: '교육과정 & 상품 관리', icon: GraduationCap },
    { id: 'applications', label: '수강 신청 & 결제 관리', icon: ClipboardList },
    { id: 'users', label: '등록 회원 & 권한 관리', icon: Users },
    { id: 'content', label: '유튜브 & 배너 관리', icon: Film },
    { id: 'settings', label: '기관 정보 & 시스템 설정', icon: Settings },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <AdminDashboard onNavigateTab={(tab) => setActiveTab(tab)} />;
      case 'courses':
        return <AdminCourses />;
      case 'applications':
        return <AdminApplications />;
      case 'users':
        return <AdminUsers />;
      case 'content':
        return <AdminContent />;
      case 'settings':
        return <AdminSettings />;
      default:
        return <AdminDashboard onNavigateTab={(tab) => setActiveTab(tab)} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#09110d] text-white flex flex-col font-sans selection:bg-emerald-500 selection:text-black">
      
      {/* Top Admin Bar */}
      <header className="h-16 border-b border-emerald-900/40 bg-[#0c1611]/90 backdrop-blur-md sticky top-0 z-40 px-4 sm:px-8 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-4">
          {/* Mobile Sidebar Toggle Button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 text-gray-400 hover:text-white rounded-lg hover:bg-emerald-950"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Logo & Admin Title */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onExitAdmin()}>
            <img
              src="/images/official_logo.png"
              alt="사단법인 한국외식창업교육원"
              className="h-9 w-auto object-contain filter brightness-120"
            />
            <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-black">
              ADMIN PANEL v1.0
            </span>
          </div>
        </div>

        {/* Right Header Status Utilities */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-xs font-bold text-emerald-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>안형상 이사장 (최고 관리자)</span>
          </div>

          <button
            onClick={onExitAdmin}
            className="px-3.5 py-1.5 bg-emerald-900/40 hover:bg-emerald-800 text-emerald-300 border border-emerald-500/30 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <span>사용자 홈페이지로 나가기</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Main Admin Sidebar & Content Layout */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Sidebar */}
        <aside
          className={`fixed lg:static inset-y-0 left-0 z-30 w-64 bg-[#0d1712] border-r border-emerald-900/40 flex flex-col justify-between transition-transform duration-300 transform ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          } pt-16 lg:pt-0`}
        >
          <div className="p-5 space-y-6">
            <div className="px-2">
              <span className="text-[11px] font-black text-emerald-400/70 tracking-widest uppercase block">
                MAIN NAVIGATION
              </span>
            </div>

            <nav className="space-y-1.5">
              {menuItems.map((item) => {
                const IconComp = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setSidebarOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-3 cursor-pointer ${
                      isActive
                        ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-900/40 font-black'
                        : 'text-gray-400 hover:bg-emerald-950/60 hover:text-emerald-300'
                    }`}
                  >
                    <IconComp className={`w-4 h-4 ${isActive ? 'text-white' : 'text-emerald-500/70'}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Bottom Footer Info inside Sidebar */}
          <div className="p-5 border-t border-emerald-900/40 space-y-2">
            <div className="text-[11px] text-gray-500 font-medium space-y-0.5">
              <p className="font-bold text-gray-400">사단법인 한국외식창업교육원</p>
              <p>통합 웹사이트 관리자 플랫폼</p>
            </div>
          </div>
        </aside>

        {/* Main Workspace View */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 lg:p-10 max-w-7xl mx-auto w-full">
          {renderTabContent()}
        </main>
      </div>

    </div>
  );
}
