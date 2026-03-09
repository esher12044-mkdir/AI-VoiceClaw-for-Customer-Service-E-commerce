/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { TaskList } from './components/TaskList';
import { LiveChat } from './components/LiveChat';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'live-chat':
        return <LiveChat />;
      case 'tasks':
        return <TaskList />;
      default:
        return (
          <div className="p-8 flex items-center justify-center h-full text-slate-400">
            模块开发中...
          </div>
        );
    }
  };

  const getTitle = () => {
    switch (activeTab) {
      case 'dashboard': return '总览看板';
      case 'live-chat': return 'Live Chat 会话';
      case 'tasks': return 'AI 任务库';
      case 'calls': return '通话记录';
      case 'settings': return '系统设置';
      default: return '';
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans overflow-hidden">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 flex flex-col min-w-0">
        <Header title={getTitle()} />
        <main className="flex-1 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
