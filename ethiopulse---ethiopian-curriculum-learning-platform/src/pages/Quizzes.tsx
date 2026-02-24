import React from 'react';
import { motion } from 'motion/react';
import { 
  Timer, 
  CheckCircle2, 
  Play, 
  BarChart3, 
  Trophy, 
  Zap,
  ChevronRight,
  HelpCircle,
  ArrowRight
} from 'lucide-react';
import { MOCK_QUIZZES } from '../constants';
import { cn } from '../lib/utils';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

const performanceData = [
  { name: 'Mon', score: 65 },
  { name: 'Tue', score: 72 },
  { name: 'Wed', score: 68 },
  { name: 'Thu', score: 85 },
  { name: 'Fri', score: 78 },
  { name: 'Sat', score: 92 },
  { name: 'Sun', score: 88 },
];

export const Quizzes = () => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-eth-dark tracking-tight">Quizzes & Exams</h1>
          <p className="text-slate-400 font-medium">Test your knowledge and prepare for national exams.</p>
        </div>
        <div className="flex items-center gap-4 bg-white p-4 rounded-[2rem] border border-slate-100 soft-shadow">
          <div className="flex items-center gap-3 px-6 py-3 bg-eth-yellow/10 text-eth-yellow rounded-2xl font-black text-xs uppercase tracking-widest neumorphic-inset">
            <Zap size={20} fill="currentColor" />
            <span>7 DAY STREAK!</span>
          </div>
          <div className="flex items-center gap-3 px-6 py-3 bg-eth-green/10 text-eth-green rounded-2xl font-black text-xs uppercase tracking-widest neumorphic-inset">
            <Trophy size={20} />
            <span>1,250 XP</span>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        {/* Performance Analytics */}
        <div className="lg:col-span-2 space-y-10">
          {/* Exam Readiness Card */}
          <div className="bg-eth-dark rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="max-w-md">
                <h2 className="text-3xl font-black mb-4 tracking-tight">National Exam Readiness</h2>
                <p className="text-white/60 text-sm font-medium mb-8 leading-relaxed">Based on your recent mock tests and curriculum coverage, here is your estimated readiness for the Grade 12 National Exam.</p>
                <div className="flex flex-wrap gap-4">
                  <div className="px-6 py-3 bg-white/10 rounded-2xl border border-white/10">
                    <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Physics</p>
                    <p className="text-xl font-black text-eth-green">82%</p>
                  </div>
                  <div className="px-6 py-3 bg-white/10 rounded-2xl border border-white/10">
                    <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Math</p>
                    <p className="text-xl font-black text-eth-yellow">75%</p>
                  </div>
                  <div className="px-6 py-3 bg-white/10 rounded-2xl border border-white/10">
                    <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Civics</p>
                    <p className="text-xl font-black text-eth-red">94%</p>
                  </div>
                </div>
              </div>
              <div className="relative w-48 h-48 shrink-0">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle className="text-white/10 stroke-current" strokeWidth="10" fill="transparent" r="40" cx="50" cy="50" />
                  <circle className="text-eth-green stroke-current" strokeWidth="10" strokeLinecap="round" fill="transparent" r="40" cx="50" cy="50" strokeDasharray="251.2" strokeDashoffset={251.2 * (1 - 0.84)} transform="rotate(-90 50 50)" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-black">84%</span>
                  <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">OVERALL</span>
                </div>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-eth-green/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          </div>

          <div className="bg-white p-10 rounded-[3rem] border border-slate-100 soft-shadow">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-2xl font-black flex items-center gap-4 text-eth-dark tracking-tight">
                <div className="p-3 bg-eth-green/10 rounded-2xl text-eth-green shadow-lg shadow-eth-green/5">
                  <BarChart3 size={28} />
                </div>
                Performance Overview
              </h2>
              <select className="bg-slate-50 border border-slate-100 text-[10px] font-black uppercase tracking-widest rounded-xl px-6 py-3 outline-none neumorphic-inset text-slate-400">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
              </select>
            </div>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData}>
                  <defs>
                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1BAA56" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#1BAA56" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 900 }} 
                    dy={15}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 900 }}
                  />
                  <Tooltip 
                    contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.15)', padding: '16px', fontWeight: 900 }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="score" 
                    stroke="#1BAA56" 
                    strokeWidth={6}
                    fillOpacity={1} 
                    fill="url(#colorScore)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-black text-eth-dark tracking-tight">National Exam Simulator</h2>
              <div className="px-4 py-2 bg-eth-red/10 text-eth-red rounded-xl text-[10px] font-black uppercase tracking-widest border border-eth-red/10">
                Official Formats
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: 'Grade 8 National', year: '2024 Simulation', color: 'bg-eth-green' },
                { title: 'Grade 10 Assessment', year: '2024 Simulation', color: 'bg-eth-yellow' },
                { title: 'Grade 12 Entrance', year: '2024 Simulation', color: 'bg-eth-red' },
              ].map((exam, idx) => (
                <div key={idx} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 soft-shadow hover:shadow-2xl transition-all group cursor-pointer relative overflow-hidden">
                  <div className={cn("absolute top-0 left-0 w-full h-2", exam.color)}></div>
                  <h4 className="font-black text-xl text-eth-dark mb-2 leading-tight">{exam.title}</h4>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8">{exam.year}</p>
                  <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-eth-green group-hover:text-eth-yellow transition-colors">
                    Start Simulation <ArrowRight size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <h2 className="text-3xl font-black text-eth-dark tracking-tight">Active Quizzes</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {MOCK_QUIZZES.map((quiz) => (
                <motion.div
                  key={quiz.id}
                  whileHover={{ y: -12 }}
                  className="bg-white p-10 rounded-[3rem] border border-slate-100 soft-shadow flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-8">
                      <span className={cn(
                        "px-5 py-2 text-[10px] font-black rounded-xl uppercase tracking-widest",
                        quiz.difficulty === 'Easy' ? "bg-eth-green/10 text-eth-green" :
                        quiz.difficulty === 'Medium' ? "bg-eth-yellow/10 text-eth-yellow" :
                        "bg-eth-red/10 text-eth-red"
                      )}>
                        {quiz.difficulty}
                      </span>
                      {quiz.completed && (
                        <div className="flex items-center gap-2 text-eth-green text-[10px] font-black bg-eth-green/10 px-4 py-2 rounded-xl uppercase tracking-widest border border-eth-green/20">
                          <CheckCircle2 size={18} />
                          <span>SCORE: {quiz.score}%</span>
                        </div>
                      )}
                    </div>
                    <h3 className="font-black text-2xl mb-3 text-eth-dark group-hover:text-eth-green transition-colors leading-tight">{quiz.title}</h3>
                    <p className="text-eth-green text-[10px] font-black mb-8 tracking-[0.2em] uppercase">{quiz.subject}</p>
                    
                    <div className="flex items-center gap-8 text-slate-400 text-[10px] mb-10 font-black uppercase tracking-widest">
                      <div className="flex items-center gap-3">
                        <HelpCircle size={20} className="text-eth-yellow" />
                        <span>{quiz.questionsCount} QUESTIONS</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Timer size={20} className="text-eth-green" />
                        <span>{quiz.durationMinutes} MINS</span>
                      </div>
                    </div>
                  </div>

                  <button className={cn(
                    "w-full py-5 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 transition-all shadow-2xl",
                    quiz.completed 
                      ? "bg-slate-50 text-slate-400 hover:bg-slate-100 shadow-slate-100" 
                      : "bg-eth-green text-white hover:bg-eth-green/90 shadow-eth-green/20"
                  )}>
                    {quiz.completed ? (
                      <>Review Results <ChevronRight size={22} /></>
                    ) : (
                      <>Start Quiz <Play size={22} fill="currentColor" /></>
                    )}
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar: Achievements & Leaderboard */}
        <div className="space-y-10">
          <div className="eth-gradient rounded-[3rem] p-10 text-white overflow-hidden relative shadow-2xl">
            <div className="relative z-10">
              <h3 className="text-3xl font-black mb-4 tracking-tight">Weekly Challenge</h3>
              <p className="text-white/80 text-sm font-medium mb-10 leading-relaxed">Complete 5 Physics quizzes with a score above 85% to earn the "Newton of Ethiopia" badge.</p>
              <div className="space-y-4 mb-10">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em]">
                  <span>Progress</span>
                  <span>3/5</span>
                </div>
                <div className="w-full h-4 bg-white/20 rounded-full overflow-hidden backdrop-blur-md border border-white/10">
                  <div className="h-full bg-white shadow-xl" style={{ width: '60%' }}></div>
                </div>
              </div>
              <button className="w-full py-5 bg-white text-eth-green rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-eth-yellow hover:text-eth-dark transition-all shadow-2xl">
                View Challenges
              </button>
            </div>
            <Trophy className="absolute -bottom-10 -right-10 w-48 h-48 text-white opacity-10 rotate-12" />
          </div>

          <div className="bg-white p-10 rounded-[3rem] border border-slate-100 soft-shadow">
            <h3 className="text-2xl font-black mb-10 text-eth-dark tracking-tight">Leaderboard</h3>
            <div className="space-y-6">
              {[
                { name: 'Sarah W.', xp: '2,450', rank: 1, avatar: 'https://picsum.photos/seed/sarah/100/100' },
                { name: 'Abebe B.', xp: '1,250', rank: 2, avatar: 'https://picsum.photos/seed/abebe/100/100', isMe: true },
                { name: 'Mike R.', xp: '1,120', rank: 3, avatar: 'https://picsum.photos/seed/mike/100/100' },
                { name: 'Emma L.', xp: '980', rank: 4, avatar: 'https://picsum.photos/seed/emma/100/100' },
              ].map((user) => (
                <div key={user.name} className={cn(
                  "flex items-center justify-between p-5 rounded-3xl transition-all border border-transparent",
                  user.isMe ? "bg-eth-green/5 border-eth-green/10" : "hover:bg-slate-50"
                )}>
                  <div className="flex items-center gap-5">
                    <span className={cn(
                      "w-8 text-center font-black text-sm",
                      user.rank === 1 ? "text-eth-yellow" : 
                      user.rank === 2 ? "text-slate-400" : 
                      user.rank === 3 ? "text-eth-red" : "text-slate-300"
                    )}>
                      {user.rank}
                    </span>
                    <img src={user.avatar} alt={user.name} className="w-14 h-14 rounded-2xl border-2 border-white shadow-xl object-cover" />
                    <span className="font-black text-sm text-eth-dark">{user.name}</span>
                  </div>
                  <span className="text-[10px] font-black text-slate-400 tracking-widest uppercase">{user.xp} XP</span>
                </div>
              ))}
            </div>
            <button className="w-full mt-10 py-5 text-eth-green font-black text-sm uppercase tracking-widest hover:bg-eth-green/5 rounded-2xl transition-all border border-slate-100">
              View Full Ranking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
