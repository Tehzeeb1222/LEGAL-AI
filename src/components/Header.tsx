import React from 'react';
import { Logo } from './Logo';
import { Sparkles, User, Briefcase, Bot, Shield, CheckCircle2 } from 'lucide-react';

interface HeaderProps {
  currentRole: 'client' | 'lawyer';
  onRoleChange: (role: 'client' | 'lawyer') => void;
  onLoadSample: () => void;
  onToggleChatbot: () => void;
  isChatOpen: boolean;
  isSubmitted: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentRole,
  onRoleChange,
  onLoadSample,
  onToggleChatbot,
  isChatOpen,
  isSubmitted,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#FFCED8]/60 shadow-sm px-4 lg:px-8 py-3.5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Brand Identity */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <Logo size="md" />

          {/* Mobile Chat trigger */}
          <button
            onClick={onToggleChatbot}
            className="md:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FFCED8]/60 text-charcoal font-semibold text-xs border border-[#F48B9B]/50"
          >
            <Bot className="w-4 h-4 text-rose-500" />
            <span>Lexi AI</span>
          </button>
        </div>

        {/* Center: Dual-Role Switcher */}
        <div className="flex items-center bg-[#FFF4DE] p-1 rounded-2xl border border-[#FFCED8] shadow-inner">
          <button
            onClick={() => onRoleChange('client')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
              currentRole === 'client'
                ? 'bg-white text-charcoal shadow-md border border-[#FFCED8]/70'
                : 'text-slateText hover:text-charcoal'
            }`}
          >
            <User className={`w-4 h-4 ${currentRole === 'client' ? 'text-rose-500' : 'text-slate-400'}`} />
            <span>Client View</span>
            <span className="hidden sm:inline-block px-1.5 py-0.2 bg-[#FFCED8]/50 text-[10px] rounded text-slate-700 font-semibold">
              Public Intake
            </span>
          </button>

          <button
            onClick={() => onRoleChange('lawyer')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 relative ${
              currentRole === 'lawyer'
                ? 'bg-white text-charcoal shadow-md border border-[#FFCED8]/70'
                : 'text-slateText hover:text-charcoal'
            }`}
          >
            <Briefcase className={`w-4 h-4 ${currentRole === 'lawyer' ? 'text-rose-500' : 'text-slate-400'}`} />
            <span>Lawyer View</span>
            <span className="hidden sm:inline-block px-1.5 py-0.2 bg-rose-100 text-rose-800 text-[10px] rounded font-semibold">
              Audit & Draft
            </span>
            {isSubmitted && (
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
            )}
          </button>
        </div>

        {/* Right: Quick Action Demo Helpers & AI Assistant trigger */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          {/* Sample Case Loader for Judges */}
          <button
            onClick={onLoadSample}
            className="group flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#FFF4DE] to-[#FFCED8]/60 hover:to-[#FFCED8] text-charcoal text-xs font-bold border border-[#F48B9B]/40 hover:border-[#F48B9B] shadow-sm hover:shadow-card transition-all"
            title="Auto-fill sample property data for testing"
          >
            <Sparkles className="w-4 h-4 text-rose-500 group-hover:rotate-12 transition-transform" />
            <span>Load Sample Property Case</span>
          </button>

          {/* AI Assistant Drawer Trigger */}
          <button
            onClick={onToggleChatbot}
            className={`hidden md:flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
              isChatOpen
                ? 'bg-charcoal text-white'
                : 'bg-white text-charcoal hover:bg-[#FFF4DE] border border-[#FFCED8]'
            }`}
          >
            <Bot className="w-4 h-4 text-rose-500" />
            <span>Ask Lexi AI</span>
          </button>
        </div>
      </div>
    </header>
  );
};
