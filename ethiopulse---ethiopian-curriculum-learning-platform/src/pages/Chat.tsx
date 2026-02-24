import React, { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { Send, Bot, Users, Sparkles } from 'lucide-react';
import { MOCK_USER } from './constants';
import { cn } from './utils';
import ReactMarkdown from 'react-markdown';

export const Chat = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [inputText, setInputText] = useState('');
  const [activeTab, setActiveTab] = useState<'ai' | 'class'>('ai');
  const [isTyping, setIsTyping] = useState(false);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    // Railway will provide the connection URL automatically
    socketRef.current = io();
    socketRef.current.emit('join-room', 'general-grade-12');

    socketRef.current.on('new-message', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => { socketRef.current?.disconnect(); };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    if (activeTab === 'ai') {
      const userMsg = { id: Date.now().toString(), senderName: 'Student', text: inputText, senderId: 'user', timestamp: new Date().toISOString() };
      setMessages(prev => [...prev, userMsg]);
      setIsTyping(true);

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: inputText }),
        });
        const data = await response.json();
        setMessages(prev => [...prev, { id: Date.now().toString(), senderName: 'EthioPulse AI', text: data.text, isAi: true, timestamp: new Date().toISOString() }]);
      } catch (err) {
        console.error(err);
      } finally {
        setIsTyping(false);
      }
    } else {
      socketRef.current?.emit('send-message', {
        room: 'general-grade-12',
        senderName: MOCK_USER.name,
        text: inputText,
        senderId: 'user'
      });
    }
    setInputText('');
  };

  return (
    <div className="flex flex-col h-[calc(100vh-10rem)] bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100">
      <div className="p-6 border-b flex items-center justify-between bg-slate-50/50">
        <div className="flex gap-4">
          <button onClick={() => setActiveTab('ai')} className={cn("px-6 py-3 rounded-2xl font-black transition-all", activeTab === 'ai' ? "bg-eth-green text-white shadow-lg" : "text-slate-400 hover:bg-white")}>AI Mode</button>
          <button onClick={() => setActiveTab('class')} className={cn("px-6 py-3 rounded-2xl font-black transition-all", activeTab === 'class' ? "bg-eth-green text-white shadow-lg" : "text-slate-400 hover:bg-white")}>Class Chat</button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
        {messages.map((msg) => (
          <div key={msg.id} className={cn("flex flex-col", msg.senderId === 'user' ? "items-end" : "items-start")}>
            <div className={cn("max-w-[80%] p-5 rounded-[2rem]", msg.senderId === 'user' ? "bg-eth-dark text-white rounded-tr-none" : "bg-white border border-slate-100 shadow-sm rounded-tl-none")}>
              <p className="text-[10px] font-black uppercase opacity-50 mb-1">{msg.senderName}</p>
              <div className="prose prose-sm"><ReactMarkdown>{msg.text}</ReactMarkdown></div>
            </div>
          </div>
        ))}
        {isTyping && <div className="text-eth-green animate-pulse font-bold text-xs">AI is thinking...</div>}
      </div>

      <form onSubmit={handleSubmit} className="p-8 border-t bg-white flex gap-4">
        <input value={inputText} onChange={(e) => setInputText(e.target.value)} className="flex-1 bg-slate-50 px-6 py-4 rounded-2xl outline-none focus:ring-2 focus:ring-eth-green transition-all" placeholder="Ask anything..." />
        <button type="submit" className="bg-eth-green text-white p-4 rounded-2xl shadow-lg hover:rotate-6 transition-transform"><Send size={24}/></button>
      </form>
    </div>
  );
};
