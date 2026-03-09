import { LayoutDashboard, ListTodo, Settings, PhoneCall, Bot, MessageSquare } from 'lucide-react';
import { cn } from '../lib/utils';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const navItems = [
    { id: 'dashboard', label: '总览看板', icon: LayoutDashboard },
    { id: 'live-chat', label: 'Live Chat', icon: MessageSquare },
    { id: 'tasks', label: 'AI 任务库', icon: ListTodo },
    { id: 'calls', label: '通话记录', icon: PhoneCall },
    { id: 'settings', label: '系统设置', icon: Settings },
  ];

  return (
    <div className="w-64 bg-slate-900 text-slate-300 flex flex-col h-full border-r border-slate-800">
      <div className="p-6 flex items-center space-x-3 border-b border-slate-800">
        <div className="bg-indigo-500 p-2 rounded-lg">
          <Bot className="w-6 h-6 text-white" />
        </div>
        <span className="text-xl font-bold text-white tracking-tight">AI Lite</span>
      </div>
      
      <div className="flex-1 py-6 px-4 space-y-1">
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-3">
          工作台
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors duration-200",
                isActive 
                  ? "bg-indigo-500/10 text-indigo-400 font-medium" 
                  : "hover:bg-slate-800 hover:text-white"
              )}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center space-x-3 px-3 py-2">
          <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-sm font-medium text-white">
            JD
          </div>
          <div className="flex flex-col text-left">
            <span className="text-sm font-medium text-white">John Doe</span>
            <span className="text-xs text-slate-500">客服主管</span>
          </div>
        </div>
      </div>
    </div>
  );
}
