import React, { useState, useEffect } from "react";
import {
  Headphones,
  Feather,
  BookOpen,
  Sparkles,
  ShieldCheck,
  Heart,
  Video,
  Library,
  Play,
  Pause,
  Compass,
  Volume2,
  VolumeX,
  Music,
  Radio,
  HeartHandshake,
  Wind,
  DollarSign,
  ArrowRight,
  Smile
} from "lucide-react";
import { AlchemicalAnimatedLogo } from "./AlchemicalAnimatedLogo";
import { AlchemicalInteractiveIcon } from "./AlchemicalInteractiveIcon";
import embraceImg from "../assets/images/alchemist_embrace_jesus_1786826992305.jpg";
import {
  EMBRACE_MELODIES,
  toggleEmbraceMelody,
  startEmbraceMelody,
  setEmbraceVolume,
  subscribeEmbraceState
} from "../utils/embraceAudioEngine";

interface HeroSectionProps {
  onNavigate: (sectionId: string) => void;
  onOpenManifesto: () => void;
  onSendToWorkshop?: (prompt: string, title: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onNavigate,
  onOpenManifesto,
  onSendToWorkshop,
}) => {
  const [embraceState, setEmbraceState] = useState({
    isPlaying: false,
    melodyId: "paz_tormenta",
    volume: 0.6,
    noteIndex: 0,
  });

  const [selectedMelodyId, setSelectedMelodyId] = useState("paz_tormenta");

  useEffect(() => {
    const unsubscribe = subscribeEmbraceState((state) => {
      setEmbraceState(state);
      setSelectedMelodyId(state.melodyId);
    });
    return unsubscribe;
  }, []);

  const activeMelody = EMBRACE_MELODIES.find((m) => m.id === selectedMelodyId) || EMBRACE_MELODIES[0];

  const handleTogglePlay = () => {
    toggleEmbraceMelody(selectedMelodyId);
  };

  const handleSelectMelody = (id: string) => {
    setSelectedMelodyId(id);
    startEmbraceMelody(id, embraceState.volume);
  };

  const handleVolumeChange = (volPercent: number) => {
    setEmbraceVolume(volPercent / 100);
  };

  const modulesList = [
    {
      id: "audiolibro",
      number: "01",
      label: "01. Audiolibro",
      title: "Audiolibro Oficial",
      description: "7 capítulos completos con locución neutra, transcripción sincronizada y buscador temático.",
      icon: Headphones,
      colorScheme: "cyan" as const,
      borderHover: "hover:border-cyan-400/80 hover:shadow-cyan-950/40",
      accentText: "text-cyan-400",
    },
    {
      id: "taller",
      number: "02",
      label: "02. Transmutación",
      title: "Taller de Transmutación",
      description: "Transforma pérdidas, duelos y rencores en poesía lírica, haikus o salmos con 4 arquetipos alquímicos.",
      icon: Feather,
      colorScheme: "amber" as const,
      borderHover: "hover:border-amber-400/80 hover:shadow-amber-950/40",
      accentText: "text-amber-400",
    },
    {
      id: "video",
      number: "03",
      label: "03. Paz en la Tormenta",
      title: "Paz en la Tormenta",
      description: "Video taller inmersivo con música relajante, meditación guiada y notas de estudio al paso.",
      icon: Video,
      colorScheme: "emerald" as const,
      borderHover: "hover:border-emerald-400/80 hover:shadow-emerald-950/40",
      accentText: "text-emerald-400",
    },
    {
      id: "bibliografia",
      number: "04",
      label: "04. Biblioteca",
      title: "Biblioteca de Sabiduría",
      description: "10 libros de oro (Frankl, Séneca, Pizarnik, Rilke) con lecciones de resiliencia y sanación.",
      icon: Library,
      colorScheme: "purple" as const,
      borderHover: "hover:border-purple-400/80 hover:shadow-purple-950/40",
      accentText: "text-purple-400",
    },
    {
      id: "referentes",
      number: "05",
      label: "05. Clásicos",
      title: "Referentes Clásicos",
      description: "Citas y versos inmortales de Sócrates, Platón, San Agustín y Nietzsche listos para el crisol.",
      icon: Sparkles,
      colorScheme: "rose" as const,
      borderHover: "hover:border-rose-400/80 hover:shadow-rose-950/40",
      accentText: "text-rose-400",
    },
    {
      id: "vago",
      number: "06",
      label: "06. Nervio Vago",
      title: "Regulación Nervio Vago",
      description: "Técnicas somáticas de respiración 4-7-8, chimes vagales 528Hz y coherencia cardíaca.",
      icon: Wind,
      colorScheme: "teal" as const,
      borderHover: "hover:border-teal-400/80 hover:shadow-teal-950/40",
      accentText: "text-teal-400",
    },
    {
      id: "monetizacion",
      number: "07",
      label: "07. Autopublicación",
      title: "Autopublicación & KDP",
      description: "Formatos Kindle, cálculo de regalías, maquetación y dossier PDF para tu primer libro con dignidad.",
      icon: DollarSign,
      colorScheme: "gold" as const,
      borderHover: "hover:border-yellow-400/80 hover:shadow-yellow-950/40",
      accentText: "text-yellow-400",
    },
  ];

  return (
    <section className="relative pt-6 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Glow Backdrop */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container */}
      <div className="relative text-center max-w-4xl mx-auto space-y-6">
        
        {/* Official Brand Logo & Top Pill */}
        <div className="flex flex-col items-center space-y-4">
          <AlchemicalAnimatedLogo
            size="hero"
            showRays={true}
            className="my-2"
          />

          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/15 via-yellow-500/15 to-cyan-500/15 border border-amber-400/40 text-amber-300 text-xs font-mono tracking-wide shadow-xl shadow-amber-950/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
            <span className="font-bold">EL ALQUIMISTA LITERARIO • Santuario de Catarsis & Transmutación</span>
          </div>
        </div>

        {/* Main Title */}
        <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
          Transmuta el <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500">plomo de tu dolor</span> en oro poético
        </h1>

        {/* Subtitle */}
        <p className="font-serif-literary text-lg sm:text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto">
          Un espacio interactivo y confidencial para escuchar el audiolibro oficial de 7 capítulos, transformar vivencias densas en belleza mediante inteligencia lírica, calmar tu nervio vago y autopublicar tus obras con dignidad.
        </p>

        {/* PROMINENT JOYFUL MANIFESTO BANNER: "Alquimista: Lee esto Antes" */}
        <div className="pt-2 max-w-2xl mx-auto">
          <div
            onClick={onOpenManifesto}
            className="p-4 sm:p-4.5 rounded-3xl bg-gradient-to-r from-amber-950/70 via-slate-900 to-cyan-950/70 border border-amber-400/50 hover:border-amber-300 shadow-xl shadow-amber-950/40 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer group flex items-center justify-between gap-3 text-left"
          >
            <div className="flex items-center space-x-3.5">
              <AlchemicalInteractiveIcon
                icon={Sparkles}
                colorScheme="rainbow"
                size="lg"
                isActive={true}
              />
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded-full border border-amber-400/40">
                    Manifiesto & Sobre Nosotros
                  </span>
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                  </span>
                </div>
                <h3 className="font-display text-sm sm:text-base font-bold text-white group-hover:text-amber-300 transition-colors mt-0.5">
                  Alquimista: Lee esto Antes
                </h3>
                <p className="text-xs text-slate-300 line-clamp-1">
                  Desahogo libre, cero presión comercial y acompañamiento amoroso a menores.
                </p>
              </div>
            </div>

            <div className="shrink-0 w-9 h-9 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold shadow-md shadow-amber-500/40 group-hover:scale-110 group-hover:bg-amber-400 transition-transform">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Hero Visual: The Embrace of the Alchemist with Embedded Interactive Melodic Sanctuary */}
        <div className="pt-4">
          <div className="relative mx-auto max-w-3xl rounded-3xl overflow-hidden border border-amber-500/40 bg-slate-950 shadow-2xl group ring-1 ring-amber-500/20">
            
            {/* Image / Animated Visual Container */}
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden">
              <img
                src={embraceImg}
                alt="El Abrazo del Alquimista con Jesús - Paz y Sanación"
                referrerPolicy="no-referrer"
                className={`w-full h-full object-cover transition-transform duration-1000 ease-out ${
                  embraceState.isPlaying ? "scale-105" : "scale-100"
                }`}
              />

              {/* Radiant Golden Overlay Gradients */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-black/30 to-black/20 pointer-events-none" />
              <div className="absolute inset-0 bg-amber-500/10 mix-blend-overlay pointer-events-none" />

              {/* Animated Melodic Wave Shimmer Effect while Playing */}
              {embraceState.isPlaying && (
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-yellow-400/20 to-cyan-400/10 animate-pulse pointer-events-none" />
              )}

              {/* Top Sacred Symbol & Melodic Badge */}
              <div className="absolute top-3 left-3 right-3 sm:top-4 sm:left-4 sm:right-4 flex items-center justify-between z-20">
                <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-black/85 backdrop-blur-md border border-amber-500/40 text-[11px] font-mono text-amber-300 shadow-xl">
                  <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400 animate-pulse" />
                  <span>El Abrazo del Alquimista: Sanación & Refugio</span>
                </div>

                {/* Live sound indicator */}
                {embraceState.isPlaying ? (
                  <div className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-amber-500 text-slate-950 font-bold text-[11px] font-mono shadow-lg shadow-amber-500/40 animate-pulse">
                    <Radio className="w-3.5 h-3.5 animate-spin" />
                    <span>Melodía Sonando</span>
                  </div>
                ) : (
                  <div className="hidden sm:inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-slate-700 text-[10px] font-mono text-slate-400">
                    <Music className="w-3 h-3 text-amber-400" />
                    <span>Audio Integrado</span>
                  </div>
                )}
              </div>

              {/* Center Direct Play Overlay Button (When Paused) */}
              {!embraceState.isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <button
                    onClick={handleTogglePlay}
                    className="p-4 sm:p-5 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-2xl shadow-amber-950/80 border-2 border-amber-300 transform hover:scale-110 active:scale-95 transition-all flex items-center space-x-2 cursor-pointer group/btn"
                    title="Reproducir Melodía Celestial de Sanación"
                  >
                    <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-slate-950 ml-0.5" />
                    <span className="font-bold text-xs sm:text-sm font-display pr-1 hidden sm:inline">
                      Escuchar Melodía de Sanación
                    </span>
                  </button>
                </div>
              )}

              {/* Bottom Interactive Melodic Sanctuary Console */}
              <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 z-20">
                <div className="p-3 sm:p-4 rounded-2xl bg-black/90 backdrop-blur-xl border border-amber-500/40 shadow-2xl flex flex-col space-y-3">
                  
                  {/* Row 1: Quote & Action to Workshop */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
                    <div className="space-y-0.5">
                      <p className="font-serif-literary text-xs sm:text-sm md:text-base text-amber-200 italic">
                        "En Sus brazos, todo plomo se convierte en oro y todo dolor encuentra reposo eterno."
                      </p>
                      <p className="text-[10px] font-mono text-cyan-300/90">
                        ✦ Melodía activa: <strong className="text-amber-300">{activeMelody.name}</strong> ({activeMelody.frequency})
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        if (onSendToWorkshop) {
                          onSendToWorkshop(
                            `En el sagrado abrazo con Jesús:\n'En Sus brazos, todo plomo se convierte en oro y todo dolor encuentra reposo eterno.'\n(Melodía: ${activeMelody.name})\n\nMi oración, desahogo íntimo y entrega alquímica es: `,
                            "El Abrazo Sagrado"
                          );
                        } else {
                          onNavigate("taller");
                        }
                      }}
                      className="shrink-0 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:from-amber-300 text-slate-950 font-bold text-[11px] flex items-center space-x-1.5 shadow-md shadow-amber-950/40 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                    >
                      <Feather className="w-3.5 h-3.5" />
                      <span>Llevar Sentir al Taller</span>
                    </button>
                  </div>

                  {/* Row 2: Melodic Controls & Melody Selector */}
                  <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2">
                    
                    {/* Left: Play/Pause and Volume */}
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={handleTogglePlay}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all cursor-pointer ${
                          embraceState.isPlaying
                            ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/40"
                            : "bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700"
                        }`}
                      >
                        {embraceState.isPlaying ? (
                          <>
                            <Pause className="w-3.5 h-3.5 fill-slate-950" />
                            <span>Pausar</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                            <span>Reproducir</span>
                          </>
                        )}
                      </button>

                      {/* Volume Slider */}
                      <div className="flex items-center space-x-1.5 bg-slate-900/90 px-2.5 py-1 rounded-xl border border-slate-800">
                        <button
                          onClick={() => handleVolumeChange(embraceState.volume > 0 ? 0 : 60)}
                          className="text-slate-400 hover:text-white"
                          title={embraceState.volume === 0 ? "Activar sonido" : "Silenciar"}
                        >
                          {embraceState.volume === 0 ? (
                            <VolumeX className="w-3.5 h-3.5 text-rose-400" />
                          ) : (
                            <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                          )}
                        </button>
                        <input
                          type="range"
                          min={0}
                          max={100}
                          value={Math.round(embraceState.volume * 100)}
                          onChange={(e) => handleVolumeChange(Number(e.target.value))}
                          className="w-14 sm:w-20 accent-amber-400 h-1 bg-slate-800 rounded cursor-pointer"
                          title={`Volumen: ${Math.round(embraceState.volume * 100)}%`}
                        />
                      </div>
                    </div>

                    {/* Right: Melodic Selector Pills */}
                    <div className="flex items-center space-x-1 overflow-x-auto no-scrollbar">
                      {EMBRACE_MELODIES.map((mel) => {
                        const isThisSelected = selectedMelodyId === mel.id;
                        return (
                          <button
                            key={mel.id}
                            onClick={() => handleSelectMelody(mel.id)}
                            className={`px-2 py-1 rounded-lg text-[10px] font-mono whitespace-nowrap transition-all cursor-pointer ${
                              isThisSelected
                                ? "bg-amber-500/20 text-amber-300 border border-amber-500/50 font-bold shadow-sm shadow-amber-950/40"
                                : "bg-slate-900 text-slate-400 border border-slate-800/80 hover:text-slate-200"
                            }`}
                            title={`${mel.name} (${mel.subtitle})`}
                          >
                            <span>{mel.name.split("(")[0].trim()}</span>
                          </button>
                        );
                      })}
                    </div>

                  </div>

                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Quick Privacy / Zero Anxiety Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs text-slate-400">
          <div className="flex items-center space-x-1.5 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>100% Privado y Confidencial</span>
          </div>
          <div className="flex items-center space-x-1.5 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800">
            <Heart className="w-4 h-4 text-rose-400" />
            <span>Terapia Cognitivo-Conductual Narrativa</span>
          </div>
          <div className="flex items-center space-x-1.5 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800">
            <Compass className="w-4 h-4 text-amber-400" />
            <span>Soberanía Creativa & Amazon KDP Ready</span>
          </div>
        </div>

      </div>

      {/* Joyful, Interactive Core Modules Grid (01 to 07 + Manifesto) */}
      <div className="mt-14 space-y-4">
        <div className="text-center space-y-1">
          <span className="text-[11px] font-mono text-amber-400 uppercase tracking-widest font-bold">
            ✦ RUTA DE NAVEGACIÓN & HERRAMIENTAS ✦
          </span>
          <h2 className="font-display text-xl sm:text-2xl font-bold text-white">
            Explora las 7 Puertas del Santuario
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pt-2">
          {modulesList.map((mod) => {
            return (
              <div
                key={mod.id}
                onClick={() => onNavigate(mod.id)}
                className={`group cursor-pointer p-5 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-800 ${mod.borderHover} hover:bg-slate-900/95 transition-all duration-300 shadow-xl flex flex-col justify-between space-y-4 transform hover:-translate-y-1`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <AlchemicalInteractiveIcon
                      icon={mod.icon}
                      colorScheme={mod.colorScheme}
                      size="md"
                    />
                    <span className={`text-[11px] font-mono font-bold ${mod.accentText} bg-slate-950 px-2 py-0.5 rounded-md border border-slate-800`}>
                      {mod.number}
                    </span>
                  </div>

                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                    {mod.label}
                  </span>
                  <h3 className="font-display text-base font-bold text-white mt-1 group-hover:text-amber-300 transition-colors">
                    {mod.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                    {mod.description}
                  </p>
                </div>

                <div className={`pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs ${mod.accentText} font-mono group-hover:translate-x-1 transition-transform`}>
                  <span>Ingresar al módulo</span>
                  <span>→</span>
                </div>
              </div>
            );
          })}

          {/* 8th Card: Special Manifesto Card */}
          <div
            onClick={onOpenManifesto}
            className="group cursor-pointer p-5 rounded-2xl bg-gradient-to-b from-amber-950/40 via-slate-900 to-slate-950 border border-amber-500/40 hover:border-amber-400 hover:shadow-2xl hover:shadow-amber-950/50 hover:bg-slate-900 transition-all duration-300 shadow-xl flex flex-col justify-between space-y-4 transform hover:-translate-y-1"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <AlchemicalInteractiveIcon
                  icon={Sparkles}
                  colorScheme="rainbow"
                  size="md"
                  isActive={true}
                />
                <span className="text-[11px] font-mono font-bold text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded-md border border-amber-400/40">
                  08
                </span>
              </div>

              <span className="text-[10px] font-mono text-amber-400/90 uppercase tracking-wider block">
                08. Manifiesto
              </span>
              <h3 className="font-display text-base font-bold text-white mt-1 group-hover:text-amber-300 transition-colors">
                Alquimista: Lee esto Antes
              </h3>
              <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                Nuestra carta ética: desahogo auténtico, cero presión comercial y libertad total para sanar y crear.
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-amber-300 font-mono group-hover:translate-x-1 transition-transform font-bold">
              <span>Leer manifiesto</span>
              <span>✨</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
