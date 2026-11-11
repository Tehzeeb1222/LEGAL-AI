import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', showText = true }) => {
  const dimMap = {
    sm: { box: 36, text: 'text-lg', sub: 'text-[9px]' },
    md: { box: 44, text: 'text-xl', sub: 'text-[11px]' },
    lg: { box: 56, text: 'text-2xl', sub: 'text-xs' },
  };

  const { box, text, sub } = dimMap[size];

  return (
    <div className="flex items-center gap-3 select-none">
      {/* Custom Monogram & Embedded AI Node */}
      <div 
        className="relative flex items-center justify-center rounded-2xl shadow-card transition-transform duration-200 hover:scale-105"
        style={{
          width: box,
          height: box,
          background: 'linear-gradient(135deg, #FFCED8 0%, #F48B9B 100%)',
          boxShadow: '0 4px 14px -1px rgba(244,139,155,0.35)'
        }}
      >
        <svg 
          viewBox="0 0 100 100" 
          className="w-4/5 h-4/5" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle shield / balance line */}
          <path 
            d="M50 12 L78 24 V52 C78 68 66 82 50 88 C34 82 22 68 22 52 V24 L50 12Z" 
            stroke="rgba(255, 255, 255, 0.4)" 
            strokeWidth="3" 
            fill="none"
          />

          {/* Interlocking 'L' */}
          <path 
            d="M32 28 V66 H54" 
            stroke="#1E293B" 
            strokeWidth="7" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />

          {/* Interlocking 'A' */}
          <path 
            d="M68 66 L52 28 L43 50" 
            stroke="#FFFFFF" 
            strokeWidth="6.5" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
          <path 
            d="M48 56 H64" 
            stroke="#FFFFFF" 
            strokeWidth="5" 
            strokeLinecap="round" 
          />

          {/* Embedded AI Node Core (sparkling glowing node) */}
          <circle cx="50" cy="28" r="4.5" fill="#FFF4DE" stroke="#E15B70" strokeWidth="2" />
          <line x1="50" y1="21" x2="50" y2="24" stroke="#FFF4DE" strokeWidth="2" strokeLinecap="round" />
          <line x1="50" y1="32" x2="50" y2="35" stroke="#FFF4DE" strokeWidth="2" strokeLinecap="round" />
          <line x1="43" y1="28" x2="46" y2="28" stroke="#FFF4DE" strokeWidth="2" strokeLinecap="round" />
          <line x1="54" y1="28" x2="57" y2="28" stroke="#FFF4DE" strokeWidth="2" strokeLinecap="round" />
        </svg>

        {/* Small sparkling corner indicator */}
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-[#E15B70] border-2 border-white"></span>
        </span>
      </div>

      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className={`font-extrabold tracking-tight text-charcoal font-sans ${text}`}>
              Legal<span className="text-roseSoft text-rose-500 font-black">AI</span>
            </span>
            <span className="px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md bg-[#FFCED8]/70 text-[#1E293B] border border-[#F48B9B]/40">
              Enterprise
            </span>
          </div>
          <span className={`text-slateText font-medium tracking-wide ${sub}`}>
            Smart Legal Document Automation
          </span>
        </div>
      )}
    </div>
  );
};
