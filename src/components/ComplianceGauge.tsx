import React from 'react';
import { ShieldCheck, Award } from 'lucide-react';

interface ComplianceGaugeProps {
  score: number;
  size?: number;
}

export const ComplianceGauge: React.FC<ComplianceGaugeProps> = ({ score, size = 160 }) => {
  const strokeWidth = 14;
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(100, score));
  const offset = circumference - (clamped / 100) * circumference;

  // Color dynamics: high scores emerald, mid amber, low rose
  const getColors = (val: number) => {
    if (val >= 90) return { stroke: '#10B981', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200', label: 'Optimal Protection' };
    if (val >= 75) return { stroke: '#F59E0B', bg: 'bg-amber-50 text-amber-700 border-amber-200', label: 'Action Recommended' };
    return { stroke: '#E15B70', bg: 'bg-rose-50 text-rose-700 border-rose-200', label: 'Vulnerable Terms' };
  };

  const status = getColors(clamped);

  return (
    <div className="flex flex-col items-center bg-white rounded-2xl p-4 shadow-card border border-[#FFCED8]/40">
      <div className="flex items-center justify-between w-full mb-2">
        <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-charcoal">
          <ShieldCheck className="w-4 h-4 text-rose-500" />
          <span>AI Compliance Audit</span>
        </div>
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${status.bg}`}>
          {status.label}
        </span>
      </div>

      <div className="relative flex items-center justify-center my-1" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Subtle track background */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#FFF4DE"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#FFCED8"
            strokeWidth={strokeWidth}
            strokeOpacity="0.4"
            fill="transparent"
          />
          {/* Main gauge progress arc */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={status.stroke}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-700 ease-out"
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none">
          <span className="text-3xl font-extrabold text-charcoal tracking-tight font-sans">
            {clamped}%
          </span>
          <span className="text-[10px] font-semibold text-slateText uppercase tracking-wider">
            Risk Shield
          </span>
        </div>
      </div>

      {/* Sub-breakdown badges */}
      <div className="grid grid-cols-3 gap-2 w-full pt-3 mt-1 border-t border-slate-100 text-center">
        <div className="bg-[#FFF4DE]/60 p-1.5 rounded-xl">
          <p className="text-[10px] text-slateText font-medium">RERA 2016</p>
          <p className="text-xs font-bold text-charcoal">{clamped >= 90 ? '100%' : '88%'}</p>
        </div>
        <div className="bg-[#FFF4DE]/60 p-1.5 rounded-xl">
          <p className="text-[10px] text-slateText font-medium">Contract Act</p>
          <p className="text-xs font-bold text-charcoal">{clamped >= 95 ? '98%' : '84%'}</p>
        </div>
        <div className="bg-[#FFF4DE]/60 p-1.5 rounded-xl">
          <p className="text-[10px] text-slateText font-medium">Stamp Act</p>
          <p className="text-xs font-bold text-charcoal">Passed</p>
        </div>
      </div>
    </div>
  );
};
