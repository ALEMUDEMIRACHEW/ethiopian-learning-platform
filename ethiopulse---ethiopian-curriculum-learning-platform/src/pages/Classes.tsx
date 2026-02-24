import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Filter, Star, MoreVertical, Users, BookOpen } from 'lucide-react';
import { MOCK_COURSES } from '../constants';
import { cn } from '../lib/utils';

export const Classes = () => {
  const [courses, setCourses] = useState(MOCK_COURSES);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [selectedGrade, setSelectedGrade] = useState('All');
  const [selectedStream, setSelectedStream] = useState('All');
  const [favoritesOnly, setFavoritesOnly] = useState(false);

  const subjects = ['All', 'Physics', 'Mathematics', 'English', 'Civics', 'Amharic', 'Chemistry', 'Biology', 'Science', 'Environmental Science'];
  const grades = ['All', 'KG', 'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'];
  const streams = ['All', 'Natural Science', 'Social Science', 'General', 'TVET'];

  const toggleFavorite = (id: string) => {
    setCourses(prev => prev.map(course => 
      course.id === id ? { ...course, isFavorite: !course.isFavorite } : course
    ));
  };

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         course.teacher.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = selectedSubject === 'All' || course.subject === selectedSubject;
    const matchesGrade = selectedGrade === 'All' || course.grade === selectedGrade;
    const matchesStream = selectedStream === 'All' || course.stream === selectedStream;
    const matchesFavorite = !favoritesOnly || course.isFavorite;
    return matchesSearch && matchesSubject && matchesGrade && matchesStream && matchesFavorite;
  });

  const showStreamFilter = selectedGrade === 'All' || ['Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'].includes(selectedGrade);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-eth-dark tracking-tight">My Classes</h1>
          <p className="text-slate-400 font-medium">Manage your enrolled courses and track national curriculum progress.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setFavoritesOnly(!favoritesOnly)}
            className={cn(
              "p-3.5 rounded-2xl border transition-all soft-shadow",
              favoritesOnly ? "bg-eth-yellow border-eth-yellow text-eth-dark" : "bg-white border-slate-200 text-slate-400 hover:border-eth-green"
            )}
          >
            <Star size={22} fill={favoritesOnly ? "currentColor" : "none"} />
          </button>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Search classes..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-eth-green outline-none w-full md:w-72 soft-shadow font-medium"
            />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
          <div className="p-3 bg-white rounded-2xl border border-slate-100 soft-shadow text-slate-400 shrink-0">
            <Filter size={20} />
          </div>
          {subjects.map(subject => (
            <button
              key={subject}
              onClick={() => setSelectedSubject(subject)}
              className={cn(
                "px-8 py-3 rounded-2xl text-sm font-black whitespace-nowrap transition-all uppercase tracking-widest",
                selectedSubject === subject 
                  ? "bg-eth-green text-white shadow-xl shadow-eth-green/20" 
                  : "bg-white text-slate-400 border border-slate-200 hover:border-eth-green hover:text-eth-green"
              )}
            >
              {subject}
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

        {showStreamFilter && (
          <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-hide">
            <div className="p-3 bg-white rounded-2xl border border-slate-100 soft-shadow text-slate-400 shrink-0 opacity-0">
              <Filter size={20} />
            </div>
            {streams.map(stream => (
              <button
                key={stream}
                onClick={() => setSelectedStream(stream)}
                className={cn(
                  "px-6 py-2.5 rounded-xl text-[10px] font-black whitespace-nowrap transition-all uppercase tracking-widest",
                  selectedStream === stream 
                    ? "bg-eth-red text-white shadow-xl shadow-eth-red/20" 
                    : "bg-white text-slate-400 border border-slate-200 hover:border-eth-red hover:text-eth-red"
                )}
              >
                {stream}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Course Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredCourses.map((course) => (
          <motion.div
            key={course.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-[2.5rem] border border-slate-100 soft-shadow hover:shadow-2xl transition-all group overflow-hidden"
          >
            <div className="relative h-56 overflow-hidden">
              <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute top-6 right-6">
                <button className="p-3 bg-white/90 backdrop-blur-md rounded-2xl text-slate-600 hover:text-eth-green shadow-lg">
                  <MoreVertical size={20} />
                </button>
              </div>
              <div className="absolute bottom-6 left-6">
                <span className="px-5 py-2 bg-white/90 backdrop-blur-md text-eth-green text-[10px] font-black rounded-xl shadow-lg uppercase tracking-widest border border-white/50">
                  {course.subject}
                </span>
              </div>
            </div>
            
            <div className="p-10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-black text-2xl text-eth-dark group-hover:text-eth-green transition-colors leading-tight">{course.title}</h3>
                <button 
                  onClick={() => toggleFavorite(course.id)}
                  className="p-2 hover:bg-slate-50 rounded-2xl transition-all"
                >
                  <Star size={24} className={course.isFavorite ? "text-eth-yellow fill-eth-yellow" : "text-slate-200"} />
                </button>
              </div>
              <p className="text-slate-400 font-medium text-sm mb-8 line-clamp-2 leading-relaxed">{course.description}</p>
              
              <div className="flex items-center gap-8 text-slate-400 text-[10px] mb-10 font-black uppercase tracking-widest">
                <div className="flex items-center gap-3">
                  <Users size={20} className="text-eth-green" />
                  <span>24 STUDENTS</span>
                </div>
                <div className="flex items-center gap-3">
                  <BookOpen size={20} className="text-eth-yellow" />
                  <span>12 LESSONS</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                  <span className="text-slate-400">Curriculum Progress</span>
                  <span className="text-eth-green">{course.progress}%</span>
                </div>
                <div className="w-full h-3.5 bg-slate-50 rounded-full overflow-hidden neumorphic-inset">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${course.progress}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-eth-green rounded-full shadow-lg shadow-eth-green/20"
                  />
                </div>
              </div>
              
              <button className="w-full mt-10 py-5 bg-eth-dark text-white rounded-[1.5rem] font-black uppercase tracking-widest hover:bg-eth-green transition-all shadow-2xl shadow-slate-200 hover:shadow-eth-green/20">
                Enter Classroom
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-20">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
            <Search size={32} />
          </div>
          <h3 className="text-xl font-bold">No classes found</h3>
          <p className="text-slate-500">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
};
