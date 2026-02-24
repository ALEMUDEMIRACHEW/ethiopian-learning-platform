import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, BookOpen, FileText, MessageSquare, User, Settings, Bell, Search, Menu, X 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
// CORRECTED PATHS: Using root alias '@' or direct relative './'
import { cn } from './utils'; 
import { MOCK_USER } from './constants';

interface SidebarItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  collapsed?: boolean;
}

const SidebarItem = ({ to, icon: Icon, label, collapsed }: SidebarItemProps) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      cn(
        "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
        isActive 
          ? "bg-eth-green text-white shadow-lg shadow-eth-green/20" 
          : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
      )
    }
  >
    <Icon size={20} className="shrink-0" />
    {!collapsed && <span className="font-medium">{label}</span>}
  </NavLink>
);

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <div className="min-h-screen bg-eth-bg flex text-eth-dark font-sans">
      {/* Desktop Sidebar */}
      <aside 
        className={cn(
          "hidden md:flex flex-col bg-white border-r border-slate-200 transition-all duration-300 sticky top-0 h-screen soft-shadow",
          isSidebarCollapsed ? "w-20" : "w-64"
        )}
      >
        <div className="p-6 flex items-center justify-between">
          {!isSidebarCollapsed && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 font-display font-bold text-2xl text-eth-green"
            >
              <div className="w-8 h-8 eth-gradient rounded-lg flex items-center justify-center text-white">E</div>
              <span>EthioPulse</span>
            </motion.div>
          )}
          {isSidebarCollapsed && (
             <div className="w-8 h-8 eth-gradient rounded-lg flex items-center justify-center text-white font-bold mx-auto">E</div>
          )}
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          <SidebarItem to="/" icon={Home} label="Home" collapsed={isSidebarCollapsed} />
          <SidebarItem to="/classes" icon={Layout} label="My Classes" collapsed={isSidebarCollapsed} />
          <SidebarItem to="/materials" icon={FileText} label="Materials" collapsed={isSidebarCollapsed} />
          <SidebarItem to="/quizzes" icon={BookOpen} label="Quizzes" collapsed={isSidebarCollapsed} />
          <SidebarItem to="/chat" icon={MessageSquare} label="Collaboration" collapsed={isSidebarCollapsed} />
          <SidebarItem to="/profile" icon={User} label="My Profile" collapsed={isSidebarCollapsed} />
        </nav>

        <div className="p-4 border-t border-slate-100 space-y-2">
          <SidebarItem to="/settings" icon={Settings} label="Settings" collapsed={isSidebarCollapsed} />
          <button 
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all w-full",
              isSidebarCollapsed && "justify-center"
            )}
          >
            <LogOut size={20} />
            {!isSidebarCollapsed && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white border-b border-slate-200 z-50 px-4 py-3 flex items-center justify-between soft-shadow">
        <div className="flex items-center gap-2 font-display font-bold text-xl text-eth-green">
          <div className="w-8 h-8 eth-gradient rounded-lg flex items-center justify-center text-white">E</div>
          <span>EthioPulse</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-slate-600">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            className="fixed inset-0 bg-white z-40 pt-20 px-6 md:hidden"
          >
            <nav className="space-y-4">
              <SidebarItem to="/" icon={Home} label="Home" />
              <SidebarItem to="/classes" icon={Layout} label="My Classes" />
              <SidebarItem to="/materials" icon={FileText} label="Materials" />
              <SidebarItem to="/quizzes" icon={BookOpen} label="Quizzes" />
              <SidebarItem to="/chat" icon={MessageSquare} label="Collaboration" />
              <SidebarItem to="/profile" icon={User} label="My Profile" />
              <div className="pt-4 border-t border-slate-100">
                <SidebarItem to="/settings" icon={Settings} label="Settings" />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 pt-16 md:pt-0">
        {/* Top Navbar */}
        <header className="hidden md:flex h-20 bg-white border-b border-slate-200 items-center justify-between px-8 sticky top-0 z-30 soft-shadow">
          <div className="flex items-center gap-6">
            <div className="relative w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-full pl-10 pr-4 py-2 bg-eth-bg border-none rounded-full text-sm focus:ring-2 focus:ring-eth-green focus:bg-white transition-all outline-none neumorphic-inset"
              />
            </div>

            <div className="flex items-center gap-2 bg-slate-50 p-1 rounded-xl neumorphic-inset">
              <select className="bg-transparent border-none text-xs font-bold px-3 py-1.5 outline-none text-slate-600 cursor-pointer">
                {['KG', 'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'].map(g => (
                  <option key={g} value={g} selected={g === MOCK_USER.grade}>{g}</option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center gap-2 bg-slate-50 p-1 rounded-xl neumorphic-inset">
              {['EN', 'አማ', 'ኦሮ', 'ትግ'].map((lang) => (
                <button 
                  key={lang}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
                    lang === 'EN' ? "bg-white text-eth-green shadow-sm" : "text-slate-400 hover:text-slate-600"
                  )}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-eth-red rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-px bg-slate-200 mx-2"></div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-bold">{MOCK_USER.name}</p>
                <p className="text-xs text-slate-500">{MOCK_USER.grade}</p>
              </div>
              <img src={MOCK_USER.avatar} alt="Avatar" className="w-10 h-10 rounded-xl border-2 border-eth-green/20 object-cover" />
            </div>
          </div>
        </header>

        <div className="p-4 md:p-8 max-w-7xl mx-auto w-full">
          {children}
        </div>
      </main>
    </div>
  );
};
