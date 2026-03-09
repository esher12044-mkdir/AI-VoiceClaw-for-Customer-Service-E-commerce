import { useState, useRef, useEffect } from 'react';
import { Search, MoreVertical, Send, Paperclip, Smile, User, Tag, ShoppingBag, Sparkles, Link as LinkIcon, ExternalLink, MessageSquare } from 'lucide-react';
import { cn } from '../lib/utils';
import { GoogleGenAI } from '@google/genai';

// Initialize Gemini API
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Mock Data
const initialSessions = [
  { id: '1', name: '张女士', phone: '138****8888', lastMessage: '我想了解一下你们的企业版套餐', time: '10:42 AM', unread: 2, active: true },
  { id: '2', name: '李先生', phone: '139****4321', lastMessage: '好的，我先看看', time: '09:15 AM', unread: 0, active: false },
  { id: '3', name: '王总', phone: '137****5555', lastMessage: '合同发我邮箱吧', time: '昨天', unread: 0, active: false },
];

const initialMessages = [
  { id: '1', sender: 'user', text: '你好，我想问一下你们那个企业版套餐具体包含哪些功能？', time: '10:40 AM' },
  { id: '2', sender: 'agent', text: '您好，张女士！我们的企业版套餐包含无限坐席、高级AI分析、自定义报表等功能。请问您团队目前有多少人呢？', time: '10:41 AM' },
  { id: '3', sender: 'user', text: '大概50人左右，主要是客服团队用。如果我现在买的话有没有什么折扣？', time: '10:42 AM' },
];

export function LiveChat() {
  const [sessions, setSessions] = useState(initialSessions);
  const [activeSession, setActiveSession] = useState(initialSessions[0]);
  const [messages, setMessages] = useState(initialMessages);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const newUserMsg = {
      id: Date.now().toString(),
      sender: 'agent',
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newUserMsg]);
    setInputText('');
    setIsTyping(true);

    try {
      // Simulate customer response using Gemini
      const prompt = `
        You are simulating a customer named 张女士 in a live chat with a customer service agent.
        Context: The customer is interested in an Enterprise SaaS plan. She has a team of about 50 people.
        Previous messages:
        ${messages.map(m => `${m.sender === 'agent' ? 'Agent' : 'Customer'}: ${m.text}`).join('\n')}
        Agent: ${inputText}
        
        Reply as the customer. Keep it brief, natural, and in Chinese.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3.1-pro-preview',
        contents: prompt,
      });

      const customerReply = {
        id: (Date.now() + 1).toString(),
        sender: 'user',
        text: response.text || '好的，我了解了。',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, customerReply]);
      
      // Update session last message
      setSessions(prev => prev.map(s => 
        s.id === activeSession.id 
          ? { ...s, lastMessage: customerReply.text, time: customerReply.time }
          : s
      ));
    } catch (error) {
      console.error('Error generating response:', error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex h-full bg-white overflow-hidden">
      {/* Left: Session List */}
      <div className="w-80 border-r border-slate-200 flex flex-col bg-slate-50/50 shrink-0">
        <div className="p-4 border-b border-slate-200">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="搜索客户..." 
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {sessions.map(session => (
            <div 
              key={session.id}
              onClick={() => setActiveSession(session)}
              className={cn(
                "p-4 border-b border-slate-100 cursor-pointer hover:bg-white transition-colors",
                activeSession.id === session.id ? "bg-white border-l-2 border-l-indigo-500" : ""
              )}
            >
              <div className="flex justify-between items-start mb-1">
                <span className="font-medium text-slate-900">{session.name}</span>
                <span className="text-xs text-slate-500">{session.time}</span>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm text-slate-500 truncate pr-4">{session.lastMessage}</p>
                {session.unread > 0 && activeSession.id !== session.id && (
                  <span className="w-5 h-5 bg-indigo-500 text-white text-xs rounded-full flex items-center justify-center shrink-0">
                    {session.unread}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Middle: Chat Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-white">
        {/* Chat Header */}
        <div className="h-16 border-b border-slate-200 flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold">
              {activeSession.name[0]}
            </div>
            <div>
              <h3 className="font-medium text-slate-900">{activeSession.name}</h3>
              <p className="text-xs text-slate-500">{activeSession.phone}</p>
            </div>
          </div>
          <button className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/30">
          {messages.map(msg => (
            <div key={msg.id} className={cn("flex", msg.sender === 'user' ? "justify-start" : "justify-end")}>
              <div className={cn(
                "max-w-[70%] rounded-2xl px-5 py-3 shadow-sm",
                msg.sender === 'user' 
                  ? "bg-white border border-slate-200 text-slate-800 rounded-tl-sm" 
                  : "bg-indigo-600 text-white rounded-tr-sm"
              )}>
                <p className="text-sm leading-relaxed">{msg.text}</p>
                <p className={cn(
                  "text-[10px] mt-2 text-right",
                  msg.sender === 'user' ? "text-slate-400" : "text-indigo-200"
                )}>
                  {msg.time}
                </p>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-sm px-5 py-4 shadow-sm flex space-x-1">
                <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input */}
        <div className="p-4 border-t border-slate-200 bg-white shrink-0">
          <div className="flex items-end space-x-2">
            <div className="flex-1 bg-slate-50 border border-slate-200 rounded-xl p-2 focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500 transition-all">
              <textarea 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder="输入回复内容... (按 Enter 发送)" 
                className="w-full bg-transparent border-none focus:ring-0 resize-none text-sm p-2 max-h-32 min-h-[44px] outline-none"
                rows={1}
              />
              <div className="flex items-center justify-between px-2 pb-1">
                <div className="flex space-x-2 text-slate-400">
                  <button className="p-1.5 hover:text-slate-600 hover:bg-slate-200 rounded-md transition-colors"><Paperclip className="w-4 h-4" /></button>
                  <button className="p-1.5 hover:text-slate-600 hover:bg-slate-200 rounded-md transition-colors"><Smile className="w-4 h-4" /></button>
                </div>
                <button 
                  onClick={handleSendMessage}
                  disabled={!inputText.trim() || isTyping}
                  className="p-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white rounded-lg shadow-sm transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right: 3 Cards */}
      <div className="w-96 border-l border-slate-200 bg-slate-50/50 flex flex-col shrink-0 overflow-y-auto p-6 space-y-6">
        
        {/* Card 1: Customer 360 */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/80 flex items-center space-x-2">
            <User className="w-4 h-4 text-slate-500" />
            <h3 className="text-sm font-semibold text-slate-800">客户 360 画像</h3>
          </div>
          <div className="p-4 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-lg">
                张
              </div>
              <div>
                <p className="font-bold text-slate-900">张女士 (VIP)</p>
                <p className="text-xs text-slate-500">广东 深圳 · 活跃用户</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                <p className="text-xs text-slate-500 mb-1">生命周期</p>
                <p className="font-medium text-slate-800">成熟期</p>
              </div>
              <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                <p className="text-xs text-slate-500 mb-1">累计消费</p>
                <p className="font-medium text-slate-800">¥ 12,500</p>
              </div>
            </div>

            <div>
              <p className="text-xs text-slate-500 mb-2 flex items-center space-x-1">
                <Tag className="w-3 h-3" />
                <span>客户标签</span>
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-blue-50 text-blue-600 border border-blue-100 rounded-md text-xs font-medium">高净值</span>
                <span className="px-2 py-1 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-md text-xs font-medium">企业采购</span>
                <span className="px-2 py-1 bg-orange-50 text-orange-600 border border-orange-100 rounded-md text-xs font-medium">价格敏感</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: AI Semantic Analysis */}
        <div className="bg-white border border-indigo-100 rounded-xl shadow-sm overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
          <div className="px-4 py-3 border-b border-slate-100 bg-indigo-50/30 flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-indigo-500" />
            <h3 className="text-sm font-semibold text-slate-800">AI 实时语义分析</h3>
          </div>
          <div className="p-4 space-y-4">
            <div className="space-y-2">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">意图识别</p>
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-1 bg-indigo-100 text-indigo-700 rounded-md text-sm font-bold">强烈购买意向</span>
                <span className="text-sm text-slate-600">针对 <span className="font-semibold text-slate-800">企业版套餐A</span></span>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">分析依据</p>
              <ul className="text-sm text-slate-600 space-y-2">
                <li className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0"></span>
                  <span><strong className="text-slate-800">对话内容:</strong> 明确询问“企业版套餐具体功能”及“现在购买的折扣”。</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0"></span>
                  <span><strong className="text-slate-800">行为数据:</strong> 过去3天内访问“企业版定价页”超过5次。</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0"></span>
                  <span><strong className="text-slate-800">团队规模:</strong> 提及“50人左右”，符合企业版A的目标客群。</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Card 3: Extracted Tasks / Actions */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/80 flex items-center space-x-2">
            <ShoppingBag className="w-4 h-4 text-emerald-500" />
            <h3 className="text-sm font-semibold text-slate-800">AI 推荐操作 (Next Best Action)</h3>
          </div>
          <div className="p-4 space-y-3">
            <p className="text-sm text-slate-600 mb-2">基于客户高意向，建议立即发送以下资料促单：</p>
            
            <button 
              onClick={() => {
                setInputText(prev => prev + (prev ? '\n' : '') + '您可以点击这里查看企业版套餐A的专属购买链接（附带9折限时优惠券）：https://example.com/buy/enterprise-a');
              }}
              className="w-full text-left p-3 rounded-lg border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all group"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center shrink-0">
                    <LinkIcon className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800 group-hover:text-indigo-700">企业版套餐A 专属购买链接</p>
                    <p className="text-xs text-slate-500 mt-0.5">附带 9折 限时优惠券</p>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-300 group-hover:text-indigo-500 mt-2" />
              </div>
            </button>

            <button 
              onClick={() => {
                setInputText(prev => prev + (prev ? '\n' : '') + '另外，您也可以参考一下这篇行业标杆客户的种草笔记，了解他们是如何通过我们的系统将50人团队提效300%的：https://xiaohongshu.com/explore/12345');
              }}
              className="w-full text-left p-3 rounded-lg border border-slate-200 hover:border-red-300 hover:bg-red-50 transition-all group"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-red-100 rounded-md flex items-center justify-center shrink-0">
                    <span className="text-red-600 font-bold text-xs">小红书</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800 group-hover:text-red-700">行业标杆客户种草笔记</p>
                    <p className="text-xs text-slate-500 mt-0.5">50人团队提效 300% 案例</p>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-300 group-hover:text-red-500 mt-2" />
              </div>
            </button>
            
            <div className="pt-2">
               <button 
                 onClick={() => {
                   setInputText('您可以点击这里查看企业版套餐A的专属购买链接（附带9折限时优惠券）：https://example.com/buy/enterprise-a \n\n另外，您也可以参考一下这篇行业标杆客户的种草笔记，了解他们是如何通过我们的系统将50人团队提效300%的：https://xiaohongshu.com/explore/12345');
                 }}
                 className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium rounded-lg transition-colors"
               >
                 一键填入以上物料
               </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
