import React from 'react';

interface MascotAvatarProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isAnimated?: boolean;
}

export const MascotAvatar: React.FC<MascotAvatarProps> = ({ size = 'md', isAnimated = false }) => {
  const sizeMap = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-base',
    xl: 'w-20 h-20 text-xl',
  };

  return (
    <div className={`relative inline-flex items-center justify-center rounded-2xl bg-gradient-to-br from-[#FFF4DE] via-[#FFCED8] to-[#F48B9B] p-1 shadow-card ${sizeMap[size]} ${isAnimated ? 'mascot-pulse' : ''}`}>
      <svg 
        viewBox="0 0 100 100" 
        className="w-full h-full drop-shadow-sm"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Owl/Shield Mascot Head Outline */}
        <path 
          d="M24 38 C24 24 34 16 50 16 C66 16 76 24 76 38 C76 56 68 84 50 88 C32 84 24 56 24 38 Z" 
          fill="#FFFFFF" 
          stroke="#F48B9B" 
          strokeWidth="3.5" 
        />
        
        {/* Subtle cute owl ear tufts / lawyer wig curves */}
        <path d="M28 26 L22 14 C28 17 34 19 40 20" stroke="#F48B9B" strokeWidth="3" strokeLinecap="round" fill="#FFCED8" />
        <path d="M72 26 L78 14 C72 17 66 19 60 20" stroke="#F48B9B" strokeWidth="3" strokeLinecap="round" fill="#FFCED8" />

        {/* Big Smart Digital Owl Glasses / Optical Visor */}
        <rect x="29" y="34" width="18" height="18" rx="7" fill="#FFF4DE" stroke="#1E293B" strokeWidth="3" />
        <rect x="53" y="34" width="18" height="18" rx="7" fill="#FFF4DE" stroke="#1E293B" strokeWidth="3" />
        <line x1="47" y1="43" x2="53" y2="43" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />

        {/* Expressive AI Glowing Pupils */}
        <circle cx="38" cy="43" r="4" fill="#E15B70" />
        <circle cx="36.5" cy="41.5" r="1.5" fill="#FFFFFF" />

        <circle cx="62" cy="43" r="4" fill="#E15B70" />
        <circle cx="60.5" cy="41.5" r="1.5" fill="#FFFFFF" />

        {/* Cute beak / nose */}
        <polygon points="50,53 45,58 55,58" fill="#F48B9B" />

        {/* Legal Barrister Collar & Tie */}
        <path d="M42 66 L50 76 L58 66 Z" fill="#E15B70" />
        <path d="M44 65 L50 69 L56 65" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />

        {/* Tiny balance scales badge / AI node */}
        <circle cx="50" cy="80" r="2.5" fill="#1E293B" />
      </svg>
      {/* Active pulse dot */}
      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white"></span>
    </div>
  );
};
