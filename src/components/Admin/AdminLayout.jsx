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

export default function AdminLayout({ siteData, onUpdateSiteData, onExitAdmin, onLogout }) {
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
        return <AdminContent siteData={siteData} onUpdateSiteData={onUpdateSiteData} />;
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
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 text-emerald-400 hover:text-white rounded-lg hover:bg-emerald-950/60"
          >
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <img src="/images/logo.png" alt="한국외식창업교육원" className="h-9 w-auto object-contain" />
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-black tracking-wide hidden sm:inline-block">
              ADMIN PANEL v1.0
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>안형상 이사장 (관리자 인증됨)</span>
          </div>

          <button
            onClick={onExitAdmin}
            className="px-3.5 py-1.5 rounded-xl bg-[#14241b] hover:bg-emerald-900 text-emerald-300 text-xs font-bold border border-emerald-500/30 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <span>사용자 홈페이지</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onLogout}
            className="px-3.5 py-1.5 rounded-xl bg-rose-950/60 hover:bg-rose-900 text-rose-300 text-xs font-bold border border-rose-500/30 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>로그아웃</span>
          </button>
        </div>
      </header>

      {/* Main Layout Body */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Sidebar Navigation */}
        <aside
          className={`fixed lg:static inset-y-16 left-0 z-30 w-64 bg-[#0c1611] border-r border-emerald-900/40 p-4 transition-transform duration-300 flex flex-col justify-between ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          <div className="space-y-1.5">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-950/80 font-black'
                      : 'text-gray-300 hover:bg-emerald-950/60 hover:text-emerald-300'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-emerald-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="p-4 rounded-2xl bg-[#09110d] border border-emerald-900/40 text-[11px] text-gray-400 space-y-1">
            <p className="font-bold text-gray-300">사단법인 한국외식창업교육원</p>
            <p>통합 웹사이트 관리자 제어반</p>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto max-w-7xl mx-auto w-full">
          {renderTabContent()}
        </main>

      </div>

    </div>
  );
}
