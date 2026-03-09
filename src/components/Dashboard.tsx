import { PhoneIncoming, Clock, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { mockTasks } from '../data/mockData';

const chartData = [
  { time: '18:00', calls: 12 },
  { time: '19:00', calls: 18 },
  { time: '20:00', calls: 25 },
  { time: '21:00', calls: 45 },
  { time: '22:00', calls: 85 },
  { time: '23:00', calls: 65 },
  { time: '00:00', calls: 30 },
];

export function Dashboard() {
  const pendingTasks = mockTasks.filter(t => t.status === '待处理').length;
  const urgentTasks = mockTasks.filter(t => t.priority <= 2 && t.status === '待处理').length;

  const stats = [
    { label: '夜间总接听', value: '1,284', icon: PhoneIncoming, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'AI 独立解决', value: '856', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: '待人工回访', value: pendingTasks.toString(), icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: '紧急投诉预警', value: urgentTasks.toString(), icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-50' },
  ];

  return (
    <div className="p-8 space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center space-x-4">
              <div className={`p-4 rounded-xl ${stat.bg}`}>
                <Icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-800">夜间流量趋势 (18:00 - 08:00)</h3>
            <select className="text-sm border-slate-200 rounded-lg text-slate-600 focus:ring-indigo-500">
              <option>今天</option>
              <option>昨天</option>
              <option>近7天</option>
            </select>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCalls" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  cursor={{ stroke: '#94a3b8', strokeWidth: 1, strokeDasharray: '4 4' }}
                />
                <Area type="monotone" dataKey="calls" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorCalls)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-800 mb-6">意图分布</h3>
          <div className="space-y-4">
            {[
              { label: '售前咨询', value: 45, color: 'bg-blue-500' },
              { label: '售后服务', value: 30, color: 'bg-indigo-500' },
              { label: '投诉建议', value: 15, color: 'bg-red-500' },
              { label: '预约服务', value: 8, color: 'bg-emerald-500' },
              { label: '其他', value: 2, color: 'bg-slate-400' },
            ].map((item, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600 font-medium">{item.label}</span>
                  <span className="text-slate-900 font-bold">{item.value}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className={`h-2 rounded-full ${item.color}`} style={{ width: `${item.value}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
