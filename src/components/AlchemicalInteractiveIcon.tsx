import React from "react";
import { LucideIcon } from "lucide-react";

interface AlchemicalInteractiveIconProps {
  icon: LucideIcon;
  colorScheme?: "amber" | "cyan" | "emerald" | "purple" | "rose" | "teal" | "gold" | "rainbow";
  size?: "sm" | "md" | "lg";
  isActive?: boolean;
  className?: string;
  badgeText?: string;
}

export const AlchemicalInteractiveIcon: React.FC<AlchemicalInteractiveIconProps> = ({
  icon: Icon,
  colorScheme = "amber",
  size = "md",
  isActive = false,
  className = "",
  badgeText,
}) => {
  const schemeStyles = {
    amber: {
      bg: "bg-amber-500/15 border-amber-500/40 text-amber-400 group-hover:text-amber-300 group-hover:border-amber-400",
      glow: "from-amber-500/30 via-yellow-400/20 to-amber-600/20",
      activeBg: "bg-amber-500 text-slate-950 border-amber-400 shadow-amber-500/40",
      ring: "#f59e0b",
      particle: "#fbbf24",
    },
    cyan: {
      bg: "bg-cyan-500/15 border-cyan-500/40 text-cyan-400 group-hover:text-cyan-300 group-hover:border-cyan-400",
      glow: "from-cyan-500/30 via-sky-400/20 to-blue-600/20",
      activeBg: "bg-cyan-500 text-slate-950 border-cyan-400 shadow-cyan-500/40",
      ring: "#06b6d4",
      particle: "#38bdf8",
    },
    emerald: {
      bg: "bg-emerald-500/15 border-emerald-500/40 text-emerald-400 group-hover:text-emerald-300 group-hover:border-emerald-400",
      glow: "from-emerald-500/30 via-teal-400/20 to-green-600/20",
      activeBg: "bg-emerald-500 text-slate-950 border-emerald-400 shadow-emerald-500/40",
      ring: "#10b981",
      particle: "#34d399",
    },
    purple: {
      bg: "bg-purple-500/15 border-purple-500/40 text-purple-400 group-hover:text-purple-300 group-hover:border-purple-400",
      glow: "from-purple-500/30 via-fuchsia-400/20 to-indigo-600/20",
      activeBg: "bg-purple-500 text-slate-950 border-purple-400 shadow-purple-500/40",
      ring: "#a855f7",
      particle: "#c084fc",
    },
    rose: {
      bg: "bg-rose-500/15 border-rose-500/40 text-rose-400 group-hover:text-rose-300 group-hover:border-rose-400",
      glow: "from-rose-500/30 via-pink-400/20 to-amber-600/20",
      activeBg: "bg-rose-500 text-slate-950 border-rose-400 shadow-rose-500/40",
      ring: "#f43f5e",
      particle: "#fb7185",
    },
    teal: {
      bg: "bg-teal-500/15 border-teal-500/40 text-teal-400 group-hover:text-teal-300 group-hover:border-teal-400",
      glow: "from-teal-500/30 via-emerald-400/20 to-cyan-600/20",
      activeBg: "bg-teal-500 text-slate-950 border-teal-400 shadow-teal-500/40",
      ring: "#14b8a6",
      particle: "#2dd4bf",
    },
    gold: {
      bg: "bg-gradient-to-tr from-amber-500/20 to-yellow-400/20 border-amber-400/50 text-amber-300 group-hover:text-yellow-200 group-hover:border-yellow-300",
      glow: "from-yellow-400/40 via-amber-500/30 to-orange-500/20",
      activeBg: "bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-950 border-yellow-300 shadow-yellow-500/50",
      ring: "#eab308",
      particle: "#fef08a",
    },
    rainbow: {
      bg: "bg-gradient-to-tr from-amber-500/25 via-fuchsia-500/20 to-cyan-500/25 border-amber-400/60 text-amber-300 group-hover:text-white group-hover:border-amber-300",
      glow: "from-amber-500/40 via-rose-500/30 to-cyan-400/30",
      activeBg: "bg-gradient-to-r from-amber-400 via-rose-400 to-cyan-400 text-slate-950 border-white shadow-amber-500/50",
      ring: "#f59e0b",
      particle: "#38bdf8",
    },
  };

  const currentScheme = schemeStyles[colorScheme];

  const sizeBox = {
    sm: "w-7 h-7 rounded-lg",
    md: "w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl",
    lg: "w-12 h-12 sm:w-14 sm:h-14 rounded-2xl",
  }[size];

  const iconSize = {
    sm: "w-3.5 h-3.5",
    md: "w-4 h-4 sm:w-5 sm:h-5",
    lg: "w-6 h-6 sm:w-7 sm:h-7",
  }[size];

  return (
    <div className={`relative inline-flex items-center justify-center select-none group/icon ${className}`}>
      
      {/* 1. Cheerful Radiant Glow Atmosphere */}
      <div
        className={`absolute -inset-1 rounded-full bg-gradient-to-tr ${currentScheme.glow} blur-md transition-all duration-500 ${
          isActive
            ? "opacity-100 scale-125 animate-pulse"
            : "opacity-40 group-hover/icon:opacity-90 group-hover/icon:scale-115"
        }`}
      />

      {/* 2. Micro Rotating Celestial Orbit with Stars */}
      <div className="absolute -inset-1.5 pointer-events-none opacity-60 group-hover/icon:opacity-100 transition-opacity">
        <svg className="w-full h-full animate-alchemical-spin" viewBox="0 0 40 40">
          <circle
            cx="20"
            cy="20"
            r="18"
            fill="none"
            stroke={currentScheme.ring}
            strokeWidth="0.75"
            strokeDasharray="2 4 8 4"
            opacity="0.7"
          />
          <circle
            cx="20"
            cy="2"
            r="1.2"
            fill={currentScheme.particle}
            className="filter drop-shadow-[0_0_2px_currentColor]"
          />
          <circle
            cx="38"
            cy="20"
            r="0.9"
            fill={currentScheme.particle}
            className="filter drop-shadow-[0_0_2px_currentColor]"
          />
        </svg>
      </div>

      {/* 3. Center Interactive Core Icon Box */}
      <div
        className={`relative ${sizeBox} flex items-center justify-center border shadow-lg transition-all duration-300 transform group-hover/icon:scale-110 group-hover/icon:-translate-y-0.5 group-active/icon:scale-95 ${
          isActive ? currentScheme.activeBg : currentScheme.bg
        }`}
      >
        <Icon className={`${iconSize} transition-transform duration-300 group-hover/icon:rotate-6`} />

        {/* Shimmer light sweep */}
        <div className="absolute inset-0 rounded-inherit overflow-hidden pointer-events-none">
          <div className="w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/icon:translate-x-full transition-transform duration-700" />
        </div>
      </div>

      {/* 4. Optional Floating Sparkle Badge */}
      {badgeText && (
        <span className="absolute -top-1 -right-1 bg-amber-400 text-slate-950 text-[9px] font-mono font-bold px-1 rounded-full shadow-sm animate-bounce">
          {badgeText}
        </span>
      )}

    </div>
  );
};
