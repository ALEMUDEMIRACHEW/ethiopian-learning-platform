import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Send, 
  Paperclip, 
  Smile, 
  MoreVertical, 
  Search,
  Users,
  Bot,
  Sparkles,
  MessageSquare,
  Layout
} from 'lucide-react';
// Imports corrected to match your root directory structure
import { MOCK_USER } from './constants';
import { Message } from './types';
import { cn } from './utils';
import ReactMarkdown from 'react-markdown';

export const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: '1', 
      senderId: 'ai', 
      senderName: 'EthioPulse AI', 
      text: 'Selam! I am your AI study assistant. I can help you with the Ethiopian curriculum in English, Amharic, Afaan Oromo, or Tigrinya. How can I help you today?', 
      timestamp: new Date().toISOString(), 
      isAi: true 
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [activeTab, setActiveTab] = useState<'ai' | 'class' | 'topics'>('ai');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      senderId: 'user',
      senderName: MOCK_USER.name,
      text: inputText,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputText;
    setInputText('');

    if (activeTab === 'ai') {
      setIsTyping(true);
      try {
        // Vercel Serverless Function Call
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: currentInput }),
        });
        
        const data = await response.json();
        
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          senderId: 'ai',
          senderName: 'EthioPulse AI',
          text: data.text || "I'm having trouble connecting to the MoE servers. Please try again later.",
          timestamp: new Date().toISOString(),
          isAi: true,
        };
        setMessages(prev => [...prev, aiMessage]);
      } catch (error) {
        console.error("AI Error:", error);
      } finally {
        setIsTyping(false);
      }
    } else {
      // Logic for 'Class' or 'Topics' (Simulated since Socket.io is removed)
      setTimeout(() => {
        const peerMessage: Message = {
          id: (Date.now() + 1).toString(),
          senderId: 'peer',
          senderName: 'System',
          text: "Real-time peer chat is currently in maintenance. Use AI mode for help!",
          timestamp: new Date().toISOString(),
        };
        setMessages(prev => [...prev, peerMessage]);
      }, 1000);
    }
  };

  return (
    <div className="h-[calc(100vh-12rem)] flex gap-8">
      {/* Sidebar: Chat Modes */}
      <div className="w-80 hidden lg:flex flex-col gap-6">
        <div className="bg-white rounded-[2.5rem] p-6 border border-slate-100 soft-shadow flex-1">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-8 px-2">Learning Channels</h3>
          <div className="space-y-3">
            {[
              { id: 'ai', name: 'AI Assistant', icon: Bot, color: 'text-eth-green bg-eth-green/5' },
              { id: 'class', name: 'My Class', icon: Users, color: 'text-eth-yellow bg-eth-yellow/5' },
              { id: 'topics', name: 'Subject Forums', icon: MessageSquare, color: 'text-eth-red bg-eth-red/5' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  "w-full flex items-center gap-4 p-4 rounded-2xl transition-all font-bold",
                  activeTab === tab.id ? "bg-eth-dark text-white shadow-xl" : "hover:bg-slate-50 text-slate-500"
                )}
              >
                <div className={cn("p-2 rounded-xl", activeTab === tab.id ? "bg-white/10" : tab.color)}>
                  <tab.icon size={20} />
                </div>
                {tab.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Chat Interface */}
      <div className="flex-1 flex flex-col bg-white rounded-[3rem] border border-slate-100 soft-shadow overflow-hidden relative">
        {/* Chat Header */}
        <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-eth-green/10 flex items-center justify-center text-eth-green shadow-inner">
              {activeTab === 'ai' ? <Bot size={28} /> : <Users size={28} />}
            </div>
            <div>
              <h2 className="text-xl font-black text-eth-dark">
                {activeTab === 'ai' ? 'EthioPulse AI' : 'Grade 12 Physics Group'}
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="w-2 h-2 bg-eth-green rounded-full animate-pulse"></span>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Now</span>
              </div>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-8 space-y-8 scroll-smooth"
        >
          {messages.map((msg) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={msg.id}
              className={cn("flex flex-col", msg.senderId === 'user' ? "items-end" : "items-start")}
            >
              <div className={cn(
                "max-w-[80%] p-6 rounded-[2rem]",
                msg.senderId === 'user' 
                  ? "bg-eth-dark text-white rounded-tr-none shadow-2xl" 
                  : "bg-slate-50 text-eth-dark rounded-tl-none border border-slate-100"
              )}>
                <p className="text-[10px] font-black uppercase tracking-widest mb-2 opacity-50">
                  {msg.senderName} • {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
                <div className="prose prose-sm max-w-none prose-slate">
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <div className="flex flex-col items-start">
              <div className="bg-slate-50 p-6 rounded-[2rem] rounded-tl-none border border-slate-100">
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-eth-green rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-eth-green rounded-full animate-bounce delay-75"></div>
                  <div className="w-2 h-2 bg-eth-green rounded-full animate-bounce delay-150"></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-8 bg-white border-t border-slate-50">
          <form onSubmit={handleSubmit} className="flex gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={activeTab === 'ai' ? "Ask in Amharic, Afaan Oromo, or English..." : "Type a message..."}
                className="w-full pl-6 pr-14 py-5 bg-slate-50 border border-slate-100 rounded-[2rem] text-sm font-medium focus:ring-2 focus:ring-eth-green focus:bg-white transition-all outline-none"
              />
            </div>
            <button 
              type="submit"
              disabled={!inputText.trim() || isTyping}
              className="p-5 bg-eth-green text-white rounded-2xl hover:bg-eth-green/90 disabled:opacity-50 shadow-xl shadow-eth-green/20 transition-all"
            >
              <Send size={24} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
