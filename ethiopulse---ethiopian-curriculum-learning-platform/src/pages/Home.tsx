import React from 'react';
import { motion } from 'motion/react';
import { 
  BookOpen, 
  FileText, 
  Layout, 
  ArrowRight,
  TrendingUp,
  Clock,
  Star,
  Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { MOCK_USER, MOCK_COURSES } from '../constants';
import { cn } from '../lib/utils';

const QuickLink = ({ to, icon: Icon, label, color }: { to: string, icon: any, label: string, color: string }) => (
  <Link to={to} className="group">
    <div className={`p-6 rounded-2xl ${color} transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl flex flex-col items-center text-center gap-3`}>
      <div className="p-3 bg-white/30 rounded-xl">
        <Icon size={28} className="text-white" />
      </div>
      <span className="font-bold text-white text-lg">{label}</span>
    </div>
  </Link>
);

export const Home = () => {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-[2.5rem] eth-gradient p-8 md:p-16 text-white shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-xs font-black uppercase tracking-widest mb-6 border border-white/30"
            >
              <span className="w-2 h-2 bg-eth-yellow rounded-full animate-pulse"></span>
              Ethiopian National Curriculum
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-black mb-6 leading-[0.9] tracking-tighter"
            >
              Master Your Future with <span className="text-eth-yellow">EthioPulse</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-white/90 text-xl mb-10 font-medium max-w-lg leading-relaxed"
            >
              Welcome back, {MOCK_USER.name.split(' ')[0]}! You're on track for your Grade 12 National Exams. Let's keep the momentum!
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap gap-4"
            >
              <Link to="/classes" className="bg-white text-eth-green px-10 py-5 rounded-2xl font-black hover:bg-eth-yellow hover:text-eth-dark transition-all shadow-xl flex items-center gap-3 group">
                My Classes <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/quizzes" className="bg-eth-dark/30 backdrop-blur-md text-white border border-white/30 px-10 py-5 rounded-2xl font-black hover:bg-white/10 transition-all">
                Exam Practice
              </Link>
            </motion.div>
          </div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            className="hidden lg:block w-80 h-80 relative"
          >
            <div className="absolute inset-0 bg-eth-yellow/20 rounded-[3rem] blur-3xl animate-pulse"></div>
            <img 
              src="https://picsum.photos/seed/ethiopia/800/800" 
              alt="Ethiopian Student" 
              className="w-full h-full object-cover rounded-[3rem] border-8 border-white/20 shadow-2xl relative z-10"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-eth-yellow/10 rounded-full -mr-32 -mt-32 blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-eth-red/10 rounded-full -ml-32 -mb-32 blur-[100px]"></div>
      </section>

      {/* Quick Links */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <QuickLink to="/classes" icon={Layout} label="My Classes" color="bg-eth-green" />
        <QuickLink to="/quizzes" icon={BookOpen} label="Quizzes" color="bg-eth-yellow" />
        <QuickLink to="/materials" icon={FileText} label="Textbooks" color="bg-eth-red" />
        <QuickLink to="/quizzes" icon={TrendingUp} label="Exams" color="bg-eth-dark" />
      </section>

      {/* Curriculum Gateway */}
      <section className="bg-white rounded-[2.5rem] p-10 border border-slate-100 soft-shadow relative overflow-hidden">
        {/* Cultural Motif Pattern */}
        <div className="absolute top-0 right-0 w-64 h-64 opacity-[0.03] pointer-events-none">
          <svg viewBox="0 0 100 100" className="w-full h-full text-eth-dark">
            <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M50,0 L50,100 M0,50 L100,50" stroke="currentColor" strokeWidth="1" />
            <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="1" fill="none" />
            <path d="M10,10 L90,90 M90,10 L10,90" stroke="currentColor" strokeWidth="1" />
          </svg>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10 relative z-10">
          <div>
            <h2 className="text-3xl font-black text-eth-dark tracking-tight">Curriculum Gateway</h2>
            <p className="text-slate-400 font-medium mt-2">Explore MoE approved content for all grade levels.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-slate-50 p-2 rounded-2xl neumorphic-inset flex items-center gap-2">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">Grade:</span>
              <select className="bg-transparent border-none text-xs font-black px-4 py-2 outline-none text-eth-green cursor-pointer">
                {['KG', 'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'].map(g => (
                  <option key={g} value={g} selected={g === MOCK_USER.grade}>{g}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          {[
            { title: 'Primary (Grades 1-6)', desc: 'Foundational literacy, numeracy, and environmental science.', icon: '🌱', color: 'bg-eth-green/5 text-eth-green' },
            { title: 'Middle (Grades 7-8)', desc: 'General science, citizenship, and career education.', icon: '🧪', color: 'bg-eth-yellow/5 text-eth-yellow' },
            { title: 'Secondary (Grades 9-12)', desc: 'Advanced STEM, social sciences, and exam preparation.', icon: '🎓', color: 'bg-eth-red/5 text-eth-red' },
          ].map((item, idx) => (
            <div key={idx} className="p-8 rounded-[2rem] border border-slate-50 hover:border-eth-green transition-all group cursor-pointer bg-slate-50/30">
              <div className={`w-16 h-16 rounded-2xl ${item.color} flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform`}>
                {item.icon}
              </div>
              <h4 className="font-black text-xl text-eth-dark mb-3 leading-tight">{item.title}</h4>
              <p className="text-sm font-medium text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Recommended Path (AI Driven) */}
      <section className="bg-eth-dark rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full eth-gradient-soft"></div>
        </div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-black tracking-tight">Recommended Path</h2>
              <p className="text-white/60 font-medium mt-2">AI-driven suggestions based on your curriculum mastery.</p>
            </div>
            <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl text-eth-yellow">
              <TrendingUp size={28} />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Master Electromagnetism', subject: 'Physics', type: 'Lesson', icon: <BookOpen size={20} />, color: 'bg-eth-green' },
              { title: 'Calculus: Derivatives', subject: 'Mathematics', type: 'Quiz', icon: <Zap size={20} />, color: 'bg-eth-yellow' },
              { title: 'Modern Ethiopia History', subject: 'History', type: 'Reading', icon: <FileText size={20} />, color: 'bg-eth-red' },
            ].map((path, idx) => (
              <div key={idx} className="bg-white/5 backdrop-blur-xl p-8 rounded-[2rem] border border-white/10 hover:bg-white/10 transition-all group cursor-pointer">
                <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center text-white mb-6 shadow-lg", path.color)}>
                  {path.icon}
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/40">{path.subject}</span>
                  <span className="w-1 h-1 bg-white/20 rounded-full"></span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-eth-yellow">{path.type}</span>
                </div>
                <h4 className="font-black text-xl mb-6 group-hover:text-eth-yellow transition-colors">{path.title}</h4>
                <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/60 group-hover:text-white transition-colors">
                  Start Now <ArrowRight size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="grid lg:grid-cols-3 gap-10">
        {/* Featured Courses */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-black text-eth-dark tracking-tight">National Exam Materials</h2>
            <Link to="/materials" className="text-eth-green font-black hover:underline flex items-center gap-2 text-sm uppercase tracking-widest">
              View All <ArrowRight size={18} />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {MOCK_COURSES.slice(0, 2).map((course) => (
              <motion.div 
                key={course.id}
                whileHover={{ y: -12 }}
                className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 soft-shadow hover:shadow-2xl transition-all group"
              >
                <div className="relative h-56">
                  <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-6 left-6">
                    <span className="px-4 py-2 bg-white/90 backdrop-blur-md text-eth-green text-xs font-black rounded-xl shadow-lg uppercase tracking-widest">{course.subject}</span>
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-black text-xl text-eth-dark group-hover:text-eth-green transition-colors leading-tight">{course.title}</h3>
                    <button className="text-slate-200 hover:text-eth-yellow transition-colors">
                      <Star size={24} fill={course.isFavorite ? "currentColor" : "none"} />
                    </button>
                  </div>
                  <p className="text-slate-400 font-bold text-sm mb-6">{course.teacher}</p>
                  <div className="space-y-3">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                      <span className="text-slate-400">Curriculum Progress</span>
                      <span className="text-eth-green">{course.progress}%</span>
                    </div>
                    <div className="w-full h-3 bg-slate-50 rounded-full overflow-hidden neumorphic-inset">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${course.progress}%` }}
                        className="h-full bg-eth-green rounded-full shadow-lg shadow-eth-green/20"
                      ></motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Notifications & Announcements */}
        <div className="space-y-8">
          <h2 className="text-3xl font-black text-eth-dark tracking-tight">Announcements</h2>
          <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 space-y-8 soft-shadow">
            <div className="flex gap-6 p-4 rounded-3xl hover:bg-slate-50 transition-all cursor-pointer group border border-transparent hover:border-slate-100">
              <div className="w-14 h-14 rounded-2xl bg-eth-green/10 flex items-center justify-center text-eth-green shrink-0 group-hover:bg-eth-green group-hover:text-white transition-all shadow-lg shadow-eth-green/5">
                <Clock size={28} />
              </div>
              <div>
                <h4 className="font-black text-eth-dark text-lg leading-tight">Grade 12 Mock Exam</h4>
                <p className="text-sm font-medium text-slate-400 mt-2 leading-relaxed">The regional mock exam schedule has been released. Check your dashboard.</p>
                <span className="text-[10px] text-eth-green mt-3 block font-black uppercase tracking-widest">2 HOURS AGO</span>
              </div>
            </div>
            <div className="flex gap-6 p-4 rounded-3xl hover:bg-slate-50 transition-all cursor-pointer group border border-transparent hover:border-slate-100">
              <div className="w-14 h-14 rounded-2xl bg-eth-yellow/10 flex items-center justify-center text-eth-yellow shrink-0 group-hover:bg-eth-yellow group-hover:text-white transition-all shadow-lg shadow-eth-yellow/5">
                <TrendingUp size={28} />
              </div>
              <div>
                <h4 className="font-black text-eth-dark text-lg leading-tight">New Physics Notes</h4>
                <p className="text-sm font-medium text-slate-400 mt-2 leading-relaxed">Unit 5: Atomic Physics textbooks are now available for download.</p>
                <span className="text-[10px] text-eth-yellow mt-3 block font-black uppercase tracking-widest">5 HOURS AGO</span>
              </div>
            </div>
            <div className="flex gap-6 p-4 rounded-3xl hover:bg-slate-50 transition-all cursor-pointer group border border-transparent hover:border-slate-100">
              <div className="w-14 h-14 rounded-2xl bg-eth-red/10 flex items-center justify-center text-eth-red shrink-0 group-hover:bg-eth-red group-hover:text-white transition-all shadow-lg shadow-eth-red/5">
                <Star size={28} />
              </div>
              <div>
                <h4 className="font-black text-eth-dark text-lg leading-tight">Top Scorer Badge!</h4>
                <p className="text-sm font-medium text-slate-400 mt-2 leading-relaxed">Congratulations Abebe! You ranked 1st in the Math weekly quiz.</p>
                <span className="text-[10px] text-eth-red mt-3 block font-black uppercase tracking-widest">YESTERDAY</span>
              </div>
            </div>
            <button className="w-full py-5 bg-slate-50 text-eth-dark font-black text-sm hover:bg-eth-green hover:text-white rounded-2xl transition-all uppercase tracking-widest border border-slate-100">
              View All Updates
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
