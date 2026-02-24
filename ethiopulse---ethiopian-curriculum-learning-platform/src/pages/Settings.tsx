import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  User, 
  Bell, 
  Lock, 
  Globe, 
  Moon, 
  Sun, 
  Shield, 
  Smartphone,
  ChevronRight,
  Check
} from 'lucide-react';
import { cn } from '../lib/utils';

export const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    updates: true
  });

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const SettingSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div className="space-y-6">
      <h2 className="text-xl font-black text-eth-dark px-2 tracking-tight uppercase tracking-widest text-[10px] text-slate-400">{title}</h2>
      <div className="bg-white rounded-[2.5rem] border border-slate-100 soft-shadow overflow-hidden">
        {children}
      </div>
    </div>
  );

  const SettingItem = ({ icon: Icon, label, description, action, danger }: any) => (
    <div className="flex items-center justify-between p-8 hover:bg-slate-50 transition-all border-b border-slate-50 last:border-0 group">
      <div className="flex items-center gap-6">
        <div className={cn(
          "w-14 h-14 rounded-2xl flex items-center justify-center transition-all neumorphic-inset",
          danger ? "bg-red-50 text-eth-red" : "bg-eth-green/5 text-eth-green"
        )}>
          <Icon size={24} />
        </div>
        <div>
          <h4 className={cn("font-black text-lg tracking-tight", danger ? "text-eth-red" : "text-eth-dark")}>{label}</h4>
          <p className="text-sm font-medium text-slate-400 mt-1">{description}</p>
        </div>
      </div>
      <div className="group-hover:scale-110 transition-transform">{action}</div>
    </div>
  );

  const Toggle = ({ active, onToggle }: { active: boolean, onToggle: () => void }) => (
    <button 
      onClick={onToggle}
      className={cn(
        "w-16 h-8 rounded-full transition-all relative neumorphic-inset",
        active ? "bg-eth-green" : "bg-slate-200"
      )}
    >
      <div className={cn(
        "absolute top-1.5 w-5 h-5 bg-white rounded-full shadow-md transition-all",
        active ? "left-9" : "left-2"
      )} />
    </button>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-12 py-8">
      <div className="text-center">
        <h1 className="text-4xl font-black text-eth-dark tracking-tight mb-4">Settings</h1>
        <p className="text-slate-500 font-medium max-w-lg mx-auto leading-relaxed">
          Customize your EthioPulse experience and manage your account preferences.
        </p>
      </div>

      <SettingSection title="Curriculum & Account">
        <SettingItem 
          icon={User} 
          label="Profile Information" 
          description="Update your name, grade, and stream."
          action={<ChevronRight size={24} className="text-slate-300" />}
        />
        <SettingItem 
          icon={Globe} 
          label="Instruction Language" 
          description="Select your preferred language for learning materials."
          action={<span className="text-xs font-black text-eth-green bg-eth-green/5 px-4 py-2 rounded-xl">English</span>}
        />
        <SettingItem 
          icon={darkMode ? Moon : Sun} 
          label="Appearance" 
          description="Switch between light and dark mode themes."
          action={<Toggle active={darkMode} onToggle={() => setDarkMode(!darkMode)} />}
        />
        <SettingItem 
          icon={Check} 
          label="High Contrast Mode" 
          description="Increase visibility for better readability."
          action={<Toggle active={false} onToggle={() => {}} />}
        />
      </SettingSection>

      <SettingSection title="Notifications">
        <SettingItem 
          icon={Bell} 
          label="Exam Alerts" 
          description="Receive notifications for national exam dates and mock tests."
          action={<Toggle active={notifications.email} onToggle={() => toggleNotification('email')} />}
        />
        <SettingItem 
          icon={Smartphone} 
          label="Study Reminders" 
          description="Get daily reminders to keep your streak alive."
          action={<Toggle active={notifications.push} onToggle={() => toggleNotification('push')} />}
        />
      </SettingSection>

      <SettingSection title="Security & Privacy">
        <SettingItem 
          icon={Lock} 
          label="Change Password" 
          description="Keep your account secure with a strong password."
          action={<ChevronRight size={24} className="text-slate-300" />}
        />
        <SettingItem 
          icon={Shield} 
          label="Two-Factor Authentication" 
          description="Add an extra layer of security to your account."
          action={<span className="text-xs font-black text-slate-400 uppercase tracking-widest">Disabled</span>}
        />
      </SettingSection>

      <div className="pt-8">
        <button className="w-full py-6 bg-red-50 text-red-600 rounded-[2rem] font-black text-lg hover:bg-red-100 transition-all flex items-center justify-center gap-3 border border-red-100">
          Deactivate Account
        </button>
      </div>
    </div>
  );
};
