import React, { useState } from "react";
import logoDarkGold from "../assets/images/alquimista_logo_dark_gold_1786828106865.jpg";

interface AlchemicalAnimatedLogoProps {
  size?: "sm" | "md" | "lg" | "xl" | "hero";
  className?: string;
  isInteractive?: boolean;
  isAudioReactive?: boolean;
  showRays?: boolean;
  onClick?: () => void;
}

export const AlchemicalAnimatedLogo: React.FC<AlchemicalAnimatedLogoProps> = ({
  size = "md",
  className = "",
  isInteractive = true,
  isAudioReactive = false,
  showRays = true,
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Size configurations
  const sizeMap = {
    sm: "w-9 h-9",
    md: "w-11 h-11",
    lg: "w-16 h-16",
    xl: "w-24 h-24",
    hero: "w-28 h-28 sm:w-36 sm:h-36",
  };

  const ringPadding = {
    sm: "-inset-1",
    md: "-inset-1.5",
    lg: "-inset-2",
    xl: "-inset-3",
    hero: "-inset-3.5",
  };

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative inline-flex items-center justify-center cursor-pointer select-none group ${className}`}
    >
      {/* 1. Luminous Radial Ambient Aura (Blends seamlessly with #05070d) */}
      <div
        className={`absolute rounded-full pointer-events-none transition-all duration-700 ${
          isAudioReactive
            ? "bg-gradient-to-tr from-amber-500/40 via-yellow-400/30 to-cyan-400/30 blur-xl scale-125 animate-pulse"
            : isHovered
            ? "bg-gradient-to-tr from-amber-500/35 via-yellow-300/25 to-cyan-400/25 blur-lg scale-115"
            : "bg-gradient-to-tr from-amber-500/20 via-yellow-500/15 to-cyan-500/15 blur-md scale-100"
        } ${ringPadding[size]}`}
      />

      {/* 2. Outer Rotating Sacred Geometry Ring (Animated GIF Effect) */}
      {showRays && (
        <div className={`absolute ${ringPadding[size]} pointer-events-none`}>
          <svg
            className={`w-full h-full animate-alchemical-spin ${
              isAudioReactive ? "opacity-100 duration-1000" : "opacity-85"
            }`}
            viewBox="0 0 100 100"
          >
            <defs>
              <linearGradient id="alchemicalRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.9" />
                <stop offset="35%" stopColor="#fbbf24" stopOpacity="1" />
                <stop offset="70%" stopColor="#38bdf8" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.9" />
              </linearGradient>
            </defs>
            
            {/* Sacred Orbit dashed ring */}
            <circle
              cx="50"
              cy="50"
              r="46"
              fill="none"
              stroke="url(#alchemicalRingGrad)"
              strokeWidth="1.5"
              strokeDasharray="4 6 12 6"
            />
            {/* Orbiting Stardust Particles */}
            <circle cx="50" cy="4" r="2.2" fill="#fbbf24" className="filter drop-shadow-[0_0_4px_#fbbf24]" />
            <circle cx="96" cy="50" r="1.8" fill="#38bdf8" className="filter drop-shadow-[0_0_4px_#38bdf8]" />
            <circle cx="50" cy="96" r="2.2" fill="#f59e0b" className="filter drop-shadow-[0_0_4px_#f59e0b]" />
            <circle cx="4" cy="50" r="1.8" fill="#fbbf24" className="filter drop-shadow-[0_0_4px_#fbbf24]" />
          </svg>
        </div>
      )}

      {/* 3. Reverse Counter-Rotating Constellation Ring */}
      {showRays && (size === "xl" || size === "hero") && (
        <div className="absolute -inset-6 pointer-events-none">
          <svg className="w-full h-full animate-alchemical-spin-reverse opacity-40" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r="56"
              fill="none"
              stroke="#fbbf24"
              strokeWidth="0.8"
              strokeDasharray="2 10"
            />
          </svg>
        </div>
      )}

      {/* 4. Center Logo Shield Frame (Deep Obsidian + 24k Gold Bezel) */}
      <div
        className={`relative ${sizeMap[size]} rounded-2xl sm:rounded-3xl overflow-hidden bg-[#05070d] border border-amber-500/50 shadow-2xl shadow-amber-950/60 transition-transform duration-500 ${
          isInteractive ? "group-hover:scale-105 group-active:scale-95" : ""
        } animate-alchemical-breathe animate-alchemical-glow`}
      >
        {/* Core High-Contrast Dark Gold Artwork */}
        <img
          src={logoDarkGold}
          alt="El Alquimista Literario - Logo Oficial Animado"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
        />

        {/* Dynamic Shimmer Light Sweep (Animated GIF shine effect) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-amber-200/25 to-transparent animate-alchemical-shimmer" />
        </div>

        {/* Golden Glass Vignette & Depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#05070d]/60 via-transparent to-amber-500/10 pointer-events-none" />
      </div>

    </div>
  );
};
