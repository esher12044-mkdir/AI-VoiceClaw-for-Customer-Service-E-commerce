import { X, Play, Phone, FileText, Sparkles, Clock, AlertTriangle, CheckCircle } from 'lucide-react';
import { Task } from '../types';
import { cn } from '../lib/utils';

interface TaskDetailProps {
  task: Task;
  onClose: () => void;
}

export function TaskDetail({ task, onClose }: TaskDetailProps) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/20 backdrop-blur-sm">
      <div 
        className="w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300"
      >
        {/* Header */}
        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 shrink-0">
          <div>
            <div className="flex items-center space-x-3 mb-1">
              <h2 className="text-xl font-bold text-slate-900">{task.task_id}</h2>
              <span className={cn(
                "px-2.5 py-0.5 rounded-full text-xs font-bold border",
                task.priority <= 2 ? "bg-red-50 text-red-600 border-red-200" : "bg-slate-100 text-slate-600 border-slate-200"
              )}>
                P{task.priority} 级
              </span>
            </div>
            <p className="text-sm text-slate-500 flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>{task.call_timestamp}</span>
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          
          {/* Customer Info Card */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center">
                  <Phone className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500">客户号码</p>
                  <p className="text-xl font-bold text-slate-900">{task.customer_id}</p>
                </div>
              </div>
              <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg shadow-sm transition-colors flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>立即回拨</span>
              </button>
            </div>
          </div>

          {/* AI Analysis */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-indigo-500" />
              <span>AI 智能分析</span>
            </h3>
            
            <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-6 space-y-6">
              <div>
                <p className="text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-2">核心摘要</p>
                <p className="text-slate-800 font-medium leading-relaxed">{task.summary}</p>
              </div>
              
              <div className="h-px bg-indigo-100/50 w-full"></div>
              
              <div>
                <p className="text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-2">AI 处置建议</p>
                <div className="flex items-start space-x-3">
                  {task.priority <= 2 && <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />}
                  <p className="text-slate-700 leading-relaxed">{task.ai_suggestion}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Audio & Transcript */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-2">
              <FileText className="w-4 h-4 text-slate-500" />
              <span>原始语音记录</span>
            </h3>
            
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              {/* Audio Player Mock */}
              <div className="bg-slate-50 p-4 border-b border-slate-200 flex items-center space-x-4">
                <button className="w-10 h-10 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-600 hover:text-indigo-600 hover:border-indigo-200 transition-colors shadow-sm shrink-0">
                  <Play className="w-4 h-4 ml-1" />
                </button>
                <div className="flex-1">
                  <div className="h-2 bg-slate-200 rounded-full w-full overflow-hidden">
                    <div className="h-full bg-indigo-500 w-1/3"></div>
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-slate-500 font-mono">
                    <span>00:12</span>
                    <span>01:45</span>
                  </div>
                </div>
              </div>
              
              {/* Transcript */}
              <div className="p-6 bg-white">
                <p className="text-sm text-slate-600 leading-loose">
                  <span className="font-semibold text-slate-900 mr-2">客户:</span>
                  {task.full_transcript}
                </p>
              </div>
            </div>
          </div>

        </div>
        
        {/* Footer Actions */}
        <div className="px-8 py-4 border-t border-slate-100 bg-slate-50 flex justify-end space-x-3 shrink-0">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-white border border-slate-200 text-slate-600 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors"
          >
            关闭
          </button>
          <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg shadow-sm transition-colors flex items-center space-x-2">
            <CheckCircle className="w-4 h-4" />
            <span>标记为已处理</span>
          </button>
        </div>
      </div>
    </div>
  );
}
