import { useState } from 'react';
import { mockTasks } from '../data/mockData';
import { Task } from '../types';
import { TaskDetail } from './TaskDetail';
import { Search, Filter, ChevronRight, AlertCircle, Clock, CheckCircle } from 'lucide-react';
import { cn } from '../lib/utils';

export function TaskList() {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [filter, setFilter] = useState('all');

  const filteredTasks = mockTasks.filter(task => {
    if (filter === 'pending') return task.status === '待处理';
    if (filter === 'urgent') return task.priority <= 2 && task.status === '待处理';
    return true;
  });

  const getPriorityColor = (priority: number) => {
    if (priority === 1) return 'text-red-600 bg-red-50 border-red-200';
    if (priority === 2) return 'text-orange-600 bg-orange-50 border-orange-200';
    if (priority === 3) return 'text-blue-600 bg-blue-50 border-blue-200';
    return 'text-slate-600 bg-slate-50 border-slate-200';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case '待处理': return <Clock className="w-4 h-4 text-amber-500" />;
      case '已回访': return <CheckCircle className="w-4 h-4 text-emerald-500" />;
      case '归档': return <CheckCircle className="w-4 h-4 text-slate-400" />;
      default: return null;
    }
  };

  return (
    <div className="p-8 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6 shrink-0">
        <div className="flex space-x-2">
          <button 
            onClick={() => setFilter('all')}
            className={cn("px-4 py-2 rounded-lg text-sm font-medium transition-colors", filter === 'all' ? "bg-slate-900 text-white" : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200")}
          >
            全部任务
          </button>
          <button 
            onClick={() => setFilter('pending')}
            className={cn("px-4 py-2 rounded-lg text-sm font-medium transition-colors", filter === 'pending' ? "bg-slate-900 text-white" : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200")}
          >
            待处理
          </button>
          <button 
            onClick={() => setFilter('urgent')}
            className={cn("px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1", filter === 'urgent' ? "bg-red-600 text-white" : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200")}
          >
            <AlertCircle className="w-4 h-4" />
            <span>紧急预警</span>
          </button>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="p-2 bg-white border border-slate-200 rounded-lg text-slate-500 hover:bg-slate-50">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex-1 overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                <th className="px-6 py-4">任务编号</th>
                <th className="px-6 py-4">客户号码</th>
                <th className="px-6 py-4">呼入时间</th>
                <th className="px-6 py-4">意图类型</th>
                <th className="px-6 py-4">AI 摘要</th>
                <th className="px-6 py-4">优先级</th>
                <th className="px-6 py-4">状态</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTasks.map((task) => (
                <tr 
                  key={task.task_id} 
                  onClick={() => setSelectedTask(task)}
                  className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                >
                  <td className="px-6 py-4 text-sm font-mono text-slate-600">{task.task_id}</td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-900">{task.customer_id}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">{task.call_timestamp}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700">
                      {task.intent_type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 max-w-xs truncate" title={task.summary}>
                    {task.summary}
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn("inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold border", getPriorityColor(task.priority))}>
                      P{task.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(task.status)}
                      <span className={cn("text-sm font-medium", task.status === '待处理' ? 'text-amber-600' : 'text-slate-600')}>
                        {task.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-500 transition-colors inline-block" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedTask && (
        <TaskDetail task={selectedTask} onClose={() => setSelectedTask(null)} />
      )}
    </div>
  );
}
