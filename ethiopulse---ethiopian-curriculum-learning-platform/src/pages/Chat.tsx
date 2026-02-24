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
  Circle,
  MessageSquare,
  Layout
} from 'lucide-react';
import { io, Socket } from 'socket.io-client';
import { MOCK_USER } from '../constants';
import { Message } from '../types';
import { cn } from '../lib/utils';
import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from 'react-markdown';

export const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', senderId: 'ai', senderName: 'EthioPulse AI', text: 'Selam! I am your AI study assistant. I can help you with the Ethiopian curriculum in English, Amharic, Afaan Oromo, or Tigrinya. How can I help you today?', timestamp: new Date().toISOString(), isAi: true }
  ]);
  const [inputText, setInputText] = useState('');
  const [activeTab, setActiveTab] = useState<'ai' | 'class' | 'topics'>('ai');
  const [selectedTopic, setSelectedTopic] = useState('General');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<Socket | null>(null);
  const genAI = new GoogleGenAI(process.env.GEMINI_API_KEY || "");
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const topics = [
    { id: 't1', name: 'General Science', icon: '🧪' },
    { id: 't2', name: 'Mathematics', icon: '📐' },
    { id: 't3', name: 'History & Civics', icon: '🏛️' },
    { id: 't4', name: 'Language Arts', icon: '✍️' },
  ];

  useEffect(() => {
    socketRef.current = io();
    socketRef.current.on('connect', () => {
      socketRef.current?.emit('join-room', `topic-${selectedTopic}`);
    });
    socketRef.current.on('new-message', (message: Message) => {
      if (activeTab !== 'ai') {
        setMessages(prev => [...prev, message]);
      }
    });
    return () => {
      socketRef.current?.disconnect();
    };
  }, [activeTab, selectedTopic]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      senderId: MOCK_USER.id,
      senderName: MOCK_USER.name,
      text: inputText,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    if (activeTab === 'ai') {
      setIsTyping(true);
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        const response = await ai.models.generateContent({
          model: "gemini-3-flash-preview",
          contents: inputText,
          config: {
            systemInstruction: `You are EthioPulse AI, a helpful study assistant for the Ethiopian National Curriculum (KG-Grade 12). 
            You support English, Amharic, Afaan Oromo, and Tigrinya. 
            Provide explanations aligned with MoE standards. 
            If asked in a local language, respond in that language. 
            Use markdown for formatting. 
            Current student grade: ${MOCK_USER.grade}.`,
          }
        });

        const aiMessage: Message = {
          id: Date.now().toString(),
          senderId: 'ai',
          senderName: 'EthioPulse AI',
          text: response.text || "I'm sorry, I couldn't process that request.",
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
      socketRef.current?.emit('send-message', {
        room: activeTab === 'class' ? 'physics-101' : `topic-${selectedTopic}`,
        senderName: MOCK_USER.name,
        text: inputText
      });
    }
  };

  return (
    <div className="h-[calc(100vh-12rem)] flex flex-col bg-white rounded-[2.5rem] border border-slate-100 soft-shadow overflow-hidden">
      {/* Chat Header */}
      <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white z-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-eth-green/5 rounded-2xl flex items-center justify-center text-eth-green neumorphic-inset">
            <MessageSquare size={24} />
          </div>
          <div>
            <h2 className="font-black text-xl text-eth-dark tracking-tight">Collaboration Hub</h2>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              {activeTab === 'ai' ? 'EthioPulse AI Assistant' : activeTab === 'class' ? 'Grade 12 Physics Group' : `${selectedTopic} Discussion`}
            </p>
          </div>
        </div>
        
        <div className="flex bg-slate-50 p-1.5 rounded-2xl neumorphic-inset">
          <button 
            onClick={() => {
              setActiveTab('ai');
              setMessages([{ id: '1', senderId: 'ai', senderName: 'EthioPulse AI', text: 'Selam! How can I help you with your studies today?', timestamp: new Date().toISOString(), isAi: true }]);
            }}
            className={cn(
              "px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2",
              activeTab === 'ai' ? "bg-white text-eth-green shadow-sm" : "text-slate-400 hover:text-slate-600"
            )}
          >
            <Sparkles size={16} /> AI Assistant
          </button>
          <button 
            onClick={() => {
              setActiveTab('class');
              setMessages([]);
            }}
            className={cn(
              "px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2",
              activeTab === 'class' ? "bg-white text-eth-green shadow-sm" : "text-slate-400 hover:text-slate-600"
            )}
          >
            <Users size={16} /> Class
          </button>
          <button 
            onClick={() => {
              setActiveTab('topics');
              setMessages([]);
            }}
            className={cn(
              "px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2",
              activeTab === 'topics' ? "bg-white text-eth-green shadow-sm" : "text-slate-400 hover:text-slate-600"
            )}
          >
            <Layout size={16} /> Topics
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Topics Sidebar */}
        <AnimatePresence>
          {activeTab === 'topics' && (
            <motion.div 
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 280, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="border-r border-slate-100 bg-slate-50/30 overflow-hidden"
            >
              <div className="p-6 space-y-4">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Discussion Boards</h3>
                {topics.map(topic => (
                  <button
                    key={topic.id}
                    onClick={() => setSelectedTopic(topic.name)}
                    className={cn(
                      "w-full flex items-center gap-4 p-4 rounded-2xl transition-all font-black text-sm",
                      selectedTopic === topic.name ? "bg-white text-eth-green shadow-lg border border-slate-100" : "text-slate-500 hover:bg-white/50"
                    )}
                  >
                    <span className="text-xl">{topic.icon}</span>
                    {topic.name}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Messages Area */}
        <div className="flex-1 flex flex-col min-w-0">
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-8 space-y-8 bg-slate-50/20"
          >
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  "flex flex-col max-w-[75%]",
                  msg.senderId === MOCK_USER.id ? "ml-auto items-end" : "items-start"
                )}
              >
                <div className="flex items-center gap-3 mb-2 px-2">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{msg.senderName}</span>
                  <span className="text-[10px] text-slate-300 font-black">{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <div className={cn(
                  "p-5 rounded-[1.5rem] text-sm shadow-sm leading-relaxed",
                  msg.senderId === MOCK_USER.id 
                    ? "bg-eth-green text-white rounded-tr-none" 
                    : msg.isAi 
                      ? "bg-white border border-eth-green/10 text-eth-dark rounded-tl-none ring-4 ring-eth-green/5" 
                      : "bg-white border border-slate-100 text-eth-dark rounded-tl-none"
                )}>
                  {msg.isAi ? (
                    <div className="prose prose-sm prose-green max-w-none font-medium">
                      <ReactMarkdown>{msg.text}</ReactMarkdown>
                    </div>
                  ) : (
                    <span className="font-medium">{msg.text}</span>
                  )}
                </div>
              </motion.div>
            ))}
            
            {isTyping && (
              <div className="flex flex-col items-start max-w-[75%]">
                <div className="flex items-center gap-2 mb-2 px-2">
                  <span className="text-[10px] font-black text-eth-green uppercase tracking-widest">EthioPulse AI is thinking...</span>
                </div>
                <div className="bg-white border border-eth-green/10 p-5 rounded-[1.5rem] rounded-tl-none flex items-center gap-1.5 neumorphic-inset">
                  <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1 }} className="w-2 h-2 bg-eth-green rounded-full" />
                  <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-2 h-2 bg-eth-green rounded-full" />
                  <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-2 h-2 bg-eth-green rounded-full" />
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-8 bg-white border-t border-slate-100">
            <form onSubmit={handleSendMessage} className="flex items-center gap-4">
              <button type="button" className="p-4 text-slate-400 hover:text-eth-green hover:bg-slate-50 rounded-2xl transition-all">
                <Paperclip size={24} />
              </button>
              <div className="flex-1 relative">
                <input 
                  type="text" 
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={activeTab === 'ai' ? "Ask the AI assistant anything (Amharic, Afaan Oromo, English)..." : `Message ${activeTab === 'class' ? 'the class' : selectedTopic}...`}
                  className="w-full pl-6 pr-14 py-5 bg-slate-50 border border-slate-100 rounded-[2rem] text-sm font-medium focus:ring-2 focus:ring-eth-green focus:bg-white transition-all outline-none neumorphic-inset"
                />
                <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-eth-green">
                  <Smile size={24} />
                </button>
              </div>
              <button 
                type="submit"
                disabled={!inputText.trim()}
                className="p-5 bg-eth-green text-white rounded-2xl hover:bg-eth-green/90 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-eth-green/20 transition-all"
              >
                <Send size={24} />
              </button>
            </form>
            {activeTab === 'ai' && (
              <div className="mt-4 flex items-center justify-center gap-4">
                <p className="text-[10px] font-black text-slate-400 flex items-center gap-2 uppercase tracking-widest">
                  <Sparkles size={12} className="text-eth-green" />
                  Multilingual AI Support Active
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
