import React from 'react';
import { LayoutDashboard, Users, PlusCircle, FileSpreadsheet, GraduationCap, Briefcase, Calendar, X, LogOut } from 'lucide-react';

interface SidebarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  isMobile?: boolean;
  onClose?: () => void;
  onLogout?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView, isMobile, onClose, onLogout }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'list', label: 'Alumni Data', icon: Users },
    { id: 'survey', label: 'New Entry', icon: PlusCircle },
    { id: 'jobs', label: 'Career Center', icon: Briefcase },
    { id: 'events', label: 'Events & Reunions', icon: Calendar },
  ];

  return (
    <div className="bg-slate-900 text-white min-h-screen flex flex-col h-full relative">
      <div className="p-6 flex items-center justify-between border-b border-slate-700">
        <div className="flex items-center space-x-3">
            <GraduationCap className="w-8 h-8 text-indigo-400" />
            <div>
            <h1 className="text-xl font-bold tracking-tight">AlumniTrack</h1>
            <p className="text-xs text-slate-400 font-medium">Tracer Study System</p>
            </div>
        </div>
        {isMobile && onClose && (
            <button onClick={onClose} className="p-1 text-slate-400 hover:text-white transition-colors">
                <X className="w-6 h-6" />
            </button>
        )}
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all active:scale-95 ${
                currentView === item.id
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/50'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-700 safe-area-bottom space-y-4">
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700/50">
          <div className="flex items-center space-x-2 mb-2">
            <FileSpreadsheet className="w-4 h-4 text-green-400" />
            <span className="text-sm font-semibold text-slate-200">Export Data</span>
          </div>
          <button 
             onClick={() => window.alert("In a real app, this downloads .csv")}
             className="w-full text-xs bg-slate-700 hover:bg-slate-600 text-white py-2.5 rounded text-center transition-colors font-medium active:bg-slate-600 mb-1 border border-slate-600">
            Download CSV
          </button>
        </div>

        {onLogout && (
          <button 
            onClick={onLogout}
            className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg text-red-400 hover:bg-red-950/30 hover:text-red-300 transition-colors border border-transparent hover:border-red-900/50"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Sign Out</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Sidebar;