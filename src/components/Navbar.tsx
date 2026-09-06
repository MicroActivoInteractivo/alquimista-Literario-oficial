import React from "react";
import {
  Moon,
  Sun,
  Activity,
  BookOpen,
  Feather,
  Wind,
  DollarSign,
  Video,
  Library,
  Sparkles,
  HeartHandshake,
  Flame,
  Compass
} from "lucide-react";
import { AlchemicalAnimatedLogo } from "./AlchemicalAnimatedLogo";
import { AlchemicalInteractiveIcon } from "./AlchemicalInteractiveIcon";

interface NavbarProps {
  highContrast: boolean;
  onToggleContrast: () => void;
  onOpenDiagnostics: () => void;
  onOpenManifesto: () => void;
  activeSection: string;
  onSelectSection: (id: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  highContrast,
  onToggleContrast,
  onOpenDiagnostics,
  onOpenManifesto,
  activeSection,
  onSelectSection,
}) => {
  const navItems = [
    {
      id: "audiolibro",
      label: "01. Audiolibro",
      icon: BookOpen,
      colorScheme: "cyan" as const,
    },
    {
      id: "taller",
      label: "02. Transmutación",
      icon: Feather,
      colorScheme: "amber" as const,
    },
    {
      id: "video",
      label: "03. Paz en la Tormenta",
      icon: Video,
      colorScheme: "emerald" as const,
    },
    {
      id: "bibliografia",
      label: "04. Biblioteca",
      icon: Library,
      colorScheme: "purple" as const,
    },
    {
      id: "referentes",
      label: "05. Clásicos",
      icon: Sparkles,
      colorScheme: "rose" as const,
    },
    {
      id: "vago",
      label: "06. Nervio Vago",
      icon: Wind,
      colorScheme: "teal" as const,
    },
    {
      id: "monetizacion",
      label: "07. Autopublicación",
      icon: DollarSign,
      colorScheme: "gold" as const,
    },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#05070d]/95 backdrop-blur-md transition-colors shadow-lg shadow-black/50">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2">
        
        {/* Brand with Animated Alchemical Logo */}
        <div
          className="flex items-center space-x-3 cursor-pointer group shrink-0"
          onClick={() => onSelectSection("hero")}
          title="Ir al inicio"
        >
          <AlchemicalAnimatedLogo
            size="md"
            className="shrink-0"
          />
          <div className="hidden sm:block">
            <span className="font-display font-bold text-sm sm:text-base text-white tracking-wide block leading-none group-hover:text-amber-300 transition-colors">
              El Alquimista Literario
            </span>
            <span className="text-[9px] text-amber-400/90 font-mono tracking-wider uppercase flex items-center space-x-1 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping inline-block" />
              <span>Micro Activo Interactivo</span>
            </span>
          </div>
        </div>

        {/* Navigation items (Desktop) with Interactive Animated Icons */}
        <nav className="hidden 2xl:flex items-center space-x-1">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectSection(item.id)}
                className={`px-2.5 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center space-x-2 cursor-pointer group ${
                  isActive
                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold shadow-md shadow-amber-950/30"
                    : "text-slate-300 hover:text-white hover:bg-slate-900/80 border border-transparent hover:border-slate-800"
                }`}
              >
                <AlchemicalInteractiveIcon
                  icon={item.icon}
                  colorScheme={item.colorScheme}
                  size="sm"
                  isActive={isActive}
                />
                <span className="group-hover:text-amber-300 transition-colors">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Compact Navigation for XL Screens */}
        <nav className="hidden xl:flex 2xl:hidden items-center space-x-1">
          {navItems.slice(0, 5).map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectSection(item.id)}
                className={`px-2 py-1 rounded-xl text-[11px] font-medium transition-all flex items-center space-x-1.5 cursor-pointer ${
                  isActive
                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold"
                    : "text-slate-300 hover:text-white hover:bg-slate-900/80"
                }`}
              >
                <AlchemicalInteractiveIcon
                  icon={item.icon}
                  colorScheme={item.colorScheme}
                  size="sm"
                  isActive={isActive}
                />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Action Controls: Manifesto Button + Contrast & Diagnostics */}
        <div className="flex items-center space-x-2 shrink-0">
          
          {/* SPECIAL MANIFESTO BUTTON: "Alquimista: Lee esto Antes" */}
          <button
            onClick={onOpenManifesto}
            title="Sobre Nosotros • Manifiesto del Alquimista: Ética, desahogo sagrado y cero presión"
            className="px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl bg-gradient-to-r from-amber-500/20 via-yellow-500/15 to-amber-500/20 hover:from-amber-500 hover:via-yellow-400 hover:to-amber-400 border border-amber-400/50 hover:border-amber-300 text-amber-300 hover:text-slate-950 text-xs font-bold transition-all duration-300 shadow-md shadow-amber-950/30 flex items-center space-x-2 group cursor-pointer hover:scale-105 active:scale-95"
          >
            <AlchemicalInteractiveIcon
              icon={Sparkles}
              colorScheme="rainbow"
              size="sm"
              isActive={true}
            />
            <span className="hidden sm:inline font-mono tracking-wide">
              Alquimista: Lee esto Antes
            </span>
            <span className="sm:hidden font-mono text-[11px]">
              Lee esto Antes
            </span>
          </button>

          {/* High Contrast Toggle */}
          <button
            onClick={onToggleContrast}
            title="Alternar modo de alto contraste para lectura"
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-amber-300 transition-colors cursor-pointer"
          >
            {highContrast ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Diagnostics Modal Opener */}
          <button
            onClick={onOpenDiagnostics}
            title="Diagnóstico y verificación de subsistemas"
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400 hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <Activity className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Mobile / Horizontal Scrollable Sub-Navigation */}
      <div className="xl:hidden flex items-center space-x-2 px-3 py-2 border-t border-slate-800/80 bg-[#070a14]/90 overflow-x-auto no-scrollbar">
        {/* Mobile Manifesto Item first */}
        <button
          onClick={onOpenManifesto}
          className="px-2.5 py-1 rounded-xl bg-amber-500/20 border border-amber-400/50 text-amber-300 text-[11px] font-bold whitespace-nowrap flex items-center space-x-1.5 shadow-sm shrink-0"
        >
          <Sparkles className="w-3 h-3 text-amber-400 animate-pulse" />
          <span>✨ Lee esto Antes</span>
        </button>

        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectSection(item.id)}
              className={`px-2.5 py-1 rounded-xl text-[11px] font-medium whitespace-nowrap transition-all flex items-center space-x-1.5 cursor-pointer shrink-0 ${
                isActive
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold"
                  : "bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              <AlchemicalInteractiveIcon
                icon={item.icon}
                colorScheme={item.colorScheme}
                size="sm"
                isActive={isActive}
              />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
