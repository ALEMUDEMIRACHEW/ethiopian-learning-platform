import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, 
  Video, 
  Link as LinkIcon, 
  Bookmark, 
  Download, 
  Search, 
  Filter,
  Eye,
  ChevronRight,
  Book,
  X,
  CheckCircle2,
  Play,
  Lock,
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import { MOCK_MATERIALS } from '../constants';
import { cn } from '../lib/utils';

export const Materials = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedGrade, setSelectedGrade] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'curriculum'>('grid');
  const [previewItem, setPreviewItem] = useState<any>(null);

  const types = ['All', 'pdf', 'video', 'note'];
  const grades = ['All', 'KG', 'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'];

  const filteredMaterials = MOCK_MATERIALS.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         item.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'All' || item.type === selectedType;
    return matchesSearch && matchesType;
  });

  const getIcon = (type: string) => {
    switch (type) {
      case 'pdf': return <FileText className="text-eth-red" />;
      case 'video': return <Video className="text-eth-green" />;
      case 'note': return <Book className="text-eth-yellow" />;
      default: return <LinkIcon className="text-slate-500" />;
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-eth-dark tracking-tight">Study Materials</h1>
          <p className="text-slate-400 font-medium">Access your MoE approved textbooks, lecture notes, and video lessons.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-white p-1 rounded-2xl border border-slate-100 soft-shadow flex">
            <button 
              onClick={() => setViewMode('grid')}
              className={cn("px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all", viewMode === 'grid' ? "bg-eth-green text-white shadow-lg" : "text-slate-400 hover:text-slate-600")}
            >
              Library
            </button>
            <button 
              onClick={() => setViewMode('curriculum')}
              className={cn("px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all", viewMode === 'curriculum' ? "bg-eth-green text-white shadow-lg" : "text-slate-400 hover:text-slate-600")}
            >
              Curriculum Explorer
            </button>
          </div>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Search..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-eth-green outline-none w-full md:w-64 soft-shadow font-medium"
            />
          </div>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <>
          <div className="space-y-4">
            <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
              <div className="p-3 bg-white rounded-2xl border border-slate-100 soft-shadow text-slate-400 shrink-0">
                <Filter size={20} />
              </div>
              {types.map(type => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={cn(
                    "px-8 py-3 rounded-2xl text-sm font-black whitespace-nowrap transition-all uppercase tracking-widest",
                    selectedType === type 
                      ? "bg-eth-green text-white shadow-xl shadow-eth-green/20" 
                      : "bg-white text-slate-400 border border-slate-200 hover:border-eth-green hover:text-eth-green"
                  )}
                >
                  {type === 'All' ? 'All Formats' : type.toUpperCase()}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-hide">
              <div className="p-3 bg-white rounded-2xl border border-slate-100 soft-shadow text-slate-400 shrink-0 opacity-0">
                <Filter size={20} />
              </div>
              {grades.map(grade => (
                <button
                  key={grade}
                  onClick={() => setSelectedGrade(grade)}
                  className={cn(
                    "px-6 py-2.5 rounded-xl text-[10px] font-black whitespace-nowrap transition-all uppercase tracking-widest",
                    selectedGrade === grade 
                      ? "bg-eth-yellow text-eth-dark shadow-xl shadow-eth-yellow/20" 
                      : "bg-white text-slate-400 border border-slate-200 hover:border-eth-yellow hover:text-eth-yellow"
                  )}
                >
                  {grade}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredMaterials.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-[2.5rem] p-10 border border-slate-100 soft-shadow hover:shadow-2xl transition-all group"
              >
                <div className="flex items-start justify-between mb-8">
                  <div className="p-5 bg-slate-50 rounded-2xl group-hover:bg-slate-100 transition-colors neumorphic-inset">
                    {getIcon(item.type)}
                  </div>
                  <button className={cn(
                    "p-3 rounded-2xl transition-all",
                    item.isBookmarked ? "text-eth-yellow bg-eth-yellow/10" : "text-slate-200 hover:bg-slate-50"
                  )}>
                    <Bookmark size={24} fill={item.isBookmarked ? "currentColor" : "none"} />
                  </button>
                </div>
                
                <h3 className="font-black text-2xl mb-3 text-eth-dark group-hover:text-eth-green transition-colors leading-tight">{item.title}</h3>
                <div className="flex items-center gap-4 text-[10px] font-black mb-8 uppercase tracking-widest">
                  <span className="text-eth-green bg-eth-green/10 px-4 py-1.5 rounded-xl">{item.subject}</span>
                  <span className="text-slate-200">•</span>
                  <span className="text-slate-400">{item.chapter}</span>
                </div>

                <div className="flex items-center justify-between pt-8 border-t border-slate-50">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.date}</span>
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => setPreviewItem(item)}
                      className="p-3 text-slate-400 hover:text-eth-green hover:bg-slate-50 rounded-2xl transition-all"
                    >
                      <Eye size={22} />
                    </button>
                    <button className="p-3 text-slate-400 hover:text-eth-yellow hover:bg-slate-50 rounded-2xl transition-all">
                      <Download size={22} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </>
      ) : (
        <div className="grid lg:grid-cols-4 gap-10">
          {/* Curriculum Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-[2rem] p-8 border border-slate-100 soft-shadow">
              <h3 className="text-lg font-black text-eth-dark mb-6 tracking-tight uppercase tracking-widest text-[10px] text-slate-400">Curriculum Structure</h3>
              <div className="space-y-4">
                {['Unit 1: Electromagnetism', 'Unit 2: Quantum Mechanics', 'Unit 3: Atomic Physics', 'Unit 4: Nuclear Physics'].map((unit, idx) => (
                  <button key={idx} className={cn("w-full text-left p-4 rounded-2xl transition-all text-sm font-bold", idx === 0 ? "bg-eth-green text-white shadow-lg" : "text-slate-500 hover:bg-slate-50")}>
                    {unit}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Lessons View */}
          <div className="lg:col-span-3 space-y-8">
            <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 soft-shadow">
              <div className="flex items-center justify-between mb-10">
                <div>
                  <h2 className="text-3xl font-black text-eth-dark tracking-tight">Unit 1: Electromagnetism</h2>
                  <p className="text-slate-400 font-medium mt-2">Grade 12 Physics • MoE Approved Curriculum</p>
                </div>
                <div className="flex items-center gap-3">
                   <div className="px-4 py-2 bg-eth-green/10 text-eth-green rounded-xl text-[10px] font-black uppercase tracking-widest">85% Complete</div>
                </div>
              </div>

              <div className="space-y-6">
                {[
                  { title: 'Lesson 1.1: Electric Fields', objectives: ['Define electric field', 'Calculate field strength'], status: 'completed' },
                  { title: 'Lesson 1.2: Magnetic Induction', objectives: ['Explain Faraday\'s Law', 'Lenz\'s Law applications'], status: 'in-progress' },
                  { title: 'Lesson 1.3: Maxwell\'s Equations', objectives: ['Unified theory of EM', 'Wave propagation'], status: 'locked' },
                ].map((lesson, idx) => (
                  <div key={idx} className={cn("p-8 rounded-[2rem] border transition-all flex items-center justify-between group", lesson.status === 'locked' ? "bg-slate-50/50 border-slate-100 opacity-60" : "bg-white border-slate-100 hover:border-eth-green hover:shadow-xl")}>
                    <div className="flex items-center gap-8">
                      <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg", lesson.status === 'completed' ? "bg-eth-green" : lesson.status === 'in-progress' ? "bg-eth-yellow" : "bg-slate-300")}>
                        {lesson.status === 'completed' ? <CheckCircle2 size={24} /> : lesson.status === 'in-progress' ? <Play size={24} fill="currentColor" /> : <Lock size={24} />}
                      </div>
                      <div>
                        <h4 className="font-black text-xl text-eth-dark leading-tight mb-2">{lesson.title}</h4>
                        <div className="flex flex-wrap gap-3">
                          {lesson.objectives.map((obj, i) => (
                            <span key={i} className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1 rounded-lg">{obj}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    {lesson.status !== 'locked' && (
                      <button className="p-4 bg-eth-dark text-white rounded-2xl hover:bg-eth-green transition-all shadow-xl">
                        <ArrowRight size={24} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      <AnimatePresence>
        {previewItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPreviewItem(null)}
              className="absolute inset-0 bg-eth-dark/60 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white rounded-[3rem] w-full max-w-5xl max-h-[90vh] overflow-hidden shadow-2xl border border-white/20"
            >
              <div className="p-10 border-b border-slate-100 flex items-center justify-between bg-white/50 backdrop-blur-md sticky top-0 z-10">
                <div className="flex items-center gap-6">
                  <div className="p-4 bg-slate-50 rounded-2xl text-eth-green neumorphic-inset">
                    {getIcon(previewItem.type)}
                  </div>
                  <div>
                    <h2 className="font-black text-3xl text-eth-dark leading-tight">{previewItem.title}</h2>
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest mt-1">{previewItem.subject} • {previewItem.chapter}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setPreviewItem(null)}
                  className="p-4 hover:bg-slate-100 rounded-2xl transition-colors text-slate-400"
                >
                  <X size={32} />
                </button>
              </div>
              <div className="p-12 bg-eth-bg min-h-[500px] flex items-center justify-center">
                {previewItem.type === 'video' ? (
                  <div className="w-full aspect-video bg-eth-dark rounded-[2.5rem] flex items-center justify-center relative overflow-hidden group shadow-2xl border-8 border-white">
                    <img src={`https://picsum.photos/seed/${previewItem.id}/1200/675`} alt="Video Preview" className="w-full h-full object-cover opacity-60" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-28 h-28 bg-white/20 backdrop-blur-2xl rounded-full flex items-center justify-center group-hover:scale-110 transition-transform cursor-pointer">
                        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-eth-green shadow-2xl">
                          <ChevronRight size={48} fill="currentColor" />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="w-full max-w-3xl bg-white p-20 rounded-[2.5rem] shadow-2xl border border-slate-100 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-2 eth-gradient"></div>
                    <div className="space-y-8 animate-pulse">
                      <div className="h-6 bg-slate-50 rounded-full w-3/4"></div>
                      <div className="h-6 bg-slate-50 rounded-full w-full"></div>
                      <div className="h-6 bg-slate-50 rounded-full w-5/6"></div>
                      <div className="h-6 bg-slate-50 rounded-full w-2/3"></div>
                      <div className="h-48 bg-slate-50/50 rounded-[2rem] w-full mt-12 border border-slate-50"></div>
                      <div className="h-6 bg-slate-50 rounded-full w-full mt-12"></div>
                      <div className="h-6 bg-slate-50 rounded-full w-4/5"></div>
                    </div>
                    <div className="mt-20 text-center">
                      <p className="text-slate-400 font-black text-[10px] tracking-[0.2em] uppercase">MoE Document Preview Loading...</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="p-10 border-t border-slate-100 flex justify-end gap-6 bg-white/50 backdrop-blur-md">
                <button 
                  onClick={() => setPreviewItem(null)}
                  className="px-10 py-5 border border-slate-200 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-50 transition-all"
                >
                  Close
                </button>
                <button className="px-10 py-5 bg-eth-green text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-eth-green/90 transition-all shadow-2xl shadow-eth-green/20 flex items-center gap-3">
                  <Download size={22} /> Download Full Textbook
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
