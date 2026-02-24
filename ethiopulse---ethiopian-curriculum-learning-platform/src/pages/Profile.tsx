import React from 'react';
import { motion } from 'motion/react';
import { 
  Trophy, 
  Award, 
  Clock, 
  Calendar, 
  Edit3, 
  Star,
  CheckCircle2,
  ArrowUpRight,
  BookOpen,
  Camera,
  Settings,
  Zap
} from 'lucide-react';
import { MOCK_USER, MOCK_QUIZZES, MOCK_COURSES } from '../constants';
import { cn } from '../lib/utils';

export const Profile = () => {
  return (
    <div className="space-y-10">
      {/* Profile Header */}
      <div className="bg-white rounded-[3rem] border border-slate-100 soft-shadow overflow-hidden">
        <div className="h-64 eth-gradient relative">
          <div className="absolute -bottom-20 left-12 flex items-end gap-10">
            <div className="relative">
              <img 
                src={MOCK_USER.avatar} 
                alt={MOCK_USER.name} 
                className="w-48 h-48 rounded-[3rem] border-[12px] border-white shadow-2xl object-cover"
              />
              <div className="absolute bottom-3 right-3 p-4 bg-eth-yellow text-eth-dark rounded-2xl shadow-xl border-4 border-white cursor-pointer hover:scale-110 transition-transform">
                <Camera size={24} />
              </div>
            </div>
            <div className="mb-6">
              <h1 className="text-5xl font-black text-eth-dark tracking-tight">{MOCK_USER.name}</h1>
              <div className="flex items-center gap-4 text-slate-400 font-black mt-2 uppercase tracking-widest text-xs">
                <span className="bg-eth-green/10 text-eth-green px-4 py-1.5 rounded-xl border border-eth-green/10">{MOCK_USER.grade}</span>
                <span className="text-slate-200">•</span>
                <span>{MOCK_USER.email}</span>
              </div>
            </div>
          </div>
          <button className="absolute bottom-8 right-12 px-10 py-4 bg-white/20 backdrop-blur-2xl text-white border border-white/30 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white/30 transition-all flex items-center gap-3 shadow-2xl">
            <Settings size={22} /> Edit Profile
          </button>
        </div>
        <div className="h-32"></div>
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        {/* Left Column: Stats & Achievements */}
        <div className="space-y-10">
          <div className="bg-white p-10 rounded-[3rem] border border-slate-100 soft-shadow">
            <h3 className="text-2xl font-black mb-10 text-eth-dark tracking-tight">Learning Stats</h3>
            <div className="grid grid-cols-2 gap-8">
              <div className="p-8 bg-eth-green/5 rounded-[2.5rem] text-center neumorphic-inset border border-eth-green/5">
                <div className="text-4xl font-black text-eth-green mb-2">12</div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Courses</div>
              </div>
              <div className="p-8 bg-eth-yellow/5 rounded-[2.5rem] text-center neumorphic-inset border border-eth-yellow/5">
                <div className="text-4xl font-black text-eth-yellow mb-2">85%</div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Avg Score</div>
              </div>
              <div className="p-8 bg-eth-red/5 rounded-[2.5rem] text-center neumorphic-inset border border-eth-red/5">
                <div className="text-4xl font-black text-eth-red mb-2">48</div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Hours</div>
              </div>
              <div className="p-8 bg-slate-50 rounded-[2.5rem] text-center neumorphic-inset border border-slate-100">
                <div className="text-4xl font-black text-slate-600 mb-2">15</div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Quizzes</div>
              </div>
            </div>
          </div>

          <div className="bg-white p-10 rounded-[3rem] border border-slate-100 soft-shadow">
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-2xl font-black text-eth-dark tracking-tight">Badges</h3>
              <button className="text-eth-green font-black text-xs uppercase tracking-widest hover:text-eth-yellow transition-colors">View All</button>
            </div>
            <div className="grid grid-cols-3 gap-8">
              {MOCK_USER.badges.map((badge) => (
                <div key={badge.id} className="flex flex-col items-center gap-4 group cursor-help">
                  <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center text-4xl group-hover:scale-110 transition-transform neumorphic-inset border border-slate-100">
                    {badge.icon}
                  </div>
                  <span className="text-[10px] font-black text-slate-400 text-center uppercase tracking-tighter leading-tight px-2">
                    {badge.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Activity & Enrolled Classes */}
        <div className="lg:col-span-2 space-y-10">
          {/* Competency Tracking */}
          <section className="bg-white rounded-[3rem] p-10 border border-slate-100 soft-shadow">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-3xl font-black text-eth-dark tracking-tight">Curriculum Competencies</h2>
                <p className="text-slate-400 font-medium mt-2">Mastery across national learning domains.</p>
              </div>
              <div className="p-4 bg-eth-green/5 rounded-2xl text-eth-green">
                <Zap size={28} />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {MOCK_USER.competencies.map((comp) => (
                <div key={comp.domain} className="space-y-4 p-6 rounded-[2rem] bg-slate-50/50 border border-slate-50">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{comp.domain}</p>
                      <h4 className="text-lg font-black text-eth-dark">{comp.level}</h4>
                    </div>
                    <span className="text-eth-green font-black text-xl">{comp.score}%</span>
                  </div>
                  <div className="w-full h-3 bg-white rounded-full overflow-hidden neumorphic-inset">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${comp.score}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full bg-eth-green rounded-full shadow-lg shadow-eth-green/20"
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="bg-white p-10 rounded-[3rem] border border-slate-100 soft-shadow">
            <h3 className="text-2xl font-black mb-10 text-eth-dark tracking-tight">Activity Timeline</h3>
            <div className="space-y-12 relative before:absolute before:inset-0 before:left-[23px] before:w-1 before:bg-slate-50">
              {[
                { title: 'Completed Quiz: Physics Grade 12', time: '2 hours ago', icon: <Zap size={20} />, color: 'bg-eth-yellow' },
                { title: 'Enrolled in Civics & Ethical Education', time: 'Yesterday', icon: <BookOpen size={20} />, color: 'bg-eth-green' },
                { title: 'Earned "National Exam Ready" Badge', time: '2 days ago', icon: <Trophy size={20} />, color: 'bg-eth-red' },
              ].map((activity, idx) => (
                <div key={idx} className="flex items-start gap-8 relative">
                  <div className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-2xl relative z-10 border-4 border-white",
                    activity.color
                  )}>
                    {activity.icon}
                  </div>
                  <div className="pt-2">
                    <h4 className="font-black text-xl text-eth-dark leading-tight">{activity.title}</h4>
                    <p className="text-[10px] font-black text-slate-400 mt-2 uppercase tracking-widest">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-10 rounded-[3rem] border border-slate-100 soft-shadow">
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-2xl font-black text-eth-dark tracking-tight">Current Courses</h3>
              <button className="text-eth-green font-black text-xs uppercase tracking-widest hover:text-eth-yellow transition-colors">Manage</button>
            </div>
            <div className="space-y-8">
              {MOCK_COURSES.slice(0, 3).map((course) => (
                <div key={course.id} className="flex items-center gap-8 p-6 rounded-[2.5rem] hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100 group">
                  <img src={course.thumbnail} alt={course.title} className="w-32 h-32 rounded-[2rem] object-cover shadow-2xl group-hover:scale-105 transition-transform" />
                  <div className="flex-1">
                    <h4 className="font-black text-2xl text-eth-dark mb-2 leading-tight">{course.title}</h4>
                    <p className="text-[10px] font-black text-eth-green uppercase tracking-[0.2em] mb-6">{course.subject}</p>
                    <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden neumorphic-inset border border-slate-50">
                      <div className="h-full bg-eth-green shadow-lg" style={{ width: `${course.progress}%` }}></div>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-2xl font-black text-eth-dark">{course.progress}%</span>
                    <p className="text-[10px] font-black text-slate-400 uppercase mt-2 tracking-widest">Progress</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
