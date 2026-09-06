import React, { useState, useEffect } from "react";
import { Wind, Play, Pause, RotateCcw, Volume2, VolumeX, Shield, Heart, Sparkles, Activity } from "lucide-react";
import { playVagusChime } from "../utils/audioEngine";

interface BreathingPattern {
  id: string;
  name: string;
  badge: string;
  description: string;
  inhale: number;
  holdIn: number;
  exhale: number;
  holdOut: number;
  color: string;
  mantraInhale: string;
  mantraHold: string;
  mantraExhale: string;
}

const BREATHING_PATTERNS: BreathingPattern[] = [
  {
    id: "478",
    name: "4-7-8 Relax Profundo",
    badge: "Freno Parasimpático",
    description: "La técnica del Dr. Andrew Weil para desactivar la amígdala y reducir la adrenalina rápidamente.",
    inhale: 4,
    holdIn: 7,
    exhale: 8,
    holdOut: 0,
    color: "from-emerald-400 to-teal-500",
    mantraInhale: "Inhalo serenidad y quietud...",
    mantraHold: "Sostengo la luz en mi pecho...",
    mantraExhale: "Exhalo todo peso y tensión...",
  },
  {
    id: "box",
    name: "Respiración Cuadrada (4-4-4-4)",
    badge: "Enfoque & Estabilidad",
    description: "Utilizada para recuperar la claridad mental y la estabilidad del sistema nervioso central.",
    inhale: 4,
    holdIn: 4,
    exhale: 4,
    holdOut: 4,
    color: "from-cyan-400 to-blue-500",
    mantraInhale: "Inhalo presencia...",
    mantraHold: "Habito mi centro...",
    mantraExhale: "Libero el control...",
  },
  {
    id: "coherence",
    name: "Coherencia Cardíaca (5-5)",
    badge: "Armonía Corazón-Mente",
    description: "6 respiraciones por minuto para maximizar la variabilidad de la frecuencia cardíaca (VFC).",
    inhale: 5,
    holdIn: 0,
    exhale: 5,
    holdOut: 0,
    color: "from-amber-400 to-orange-500",
    mantraInhale: "Inhalo gratitud...",
    mantraHold: "",
    mantraExhale: "Exhalo paz...",
  }
];

export const VagusBreathingGuide: React.FC = () => {
  const [selectedPattern, setSelectedPattern] = useState<BreathingPattern>(BREATHING_PATTERNS[0]);
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<"inhale" | "holdIn" | "exhale" | "holdOut">("inhale");
  const [countdown, setCountdown] = useState(selectedPattern.inhale);
  const [cyclesCompleted, setCyclesCompleted] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Breathing Loop Timer
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isActive) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            // Transition to next phase
            if (phase === "inhale") {
              if (selectedPattern.holdIn > 0) {
                setPhase("holdIn");
                if (soundEnabled) playVagusChime(432);
                return selectedPattern.holdIn;
              } else {
                setPhase("exhale");
                if (soundEnabled) playVagusChime(320);
                return selectedPattern.exhale;
              }
            } else if (phase === "holdIn") {
              setPhase("exhale");
              if (soundEnabled) playVagusChime(320);
              return selectedPattern.exhale;
            } else if (phase === "exhale") {
              if (selectedPattern.holdOut > 0) {
                setPhase("holdOut");
                if (soundEnabled) playVagusChime(256);
                return selectedPattern.holdOut;
              } else {
                setPhase("inhale");
                setCyclesCompleted((c) => c + 1);
                if (soundEnabled) playVagusChime(528);
                return selectedPattern.inhale;
              }
            } else {
              // holdOut -> inhale
              setPhase("inhale");
              setCyclesCompleted((c) => c + 1);
              if (soundEnabled) playVagusChime(528);
              return selectedPattern.inhale;
            }
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isActive, phase, selectedPattern, soundEnabled]);

  const handleStart = () => {
    setIsActive(true);
    setPhase("inhale");
    setCountdown(selectedPattern.inhale);
    if (soundEnabled) playVagusChime(528);
  };

  const handlePause = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setPhase("inhale");
    setCountdown(selectedPattern.inhale);
    setCyclesCompleted(0);
  };

  const selectPattern = (pattern: BreathingPattern) => {
    setSelectedPattern(pattern);
    setIsActive(false);
    setPhase("inhale");
    setCountdown(pattern.inhale);
  };

  // Phase Display Text
  const getPhaseText = () => {
    switch (phase) {
      case "inhale":
        return { label: "INHALA", sub: selectedPattern.mantraInhale, color: "text-emerald-400" };
      case "holdIn":
        return { label: "SOSTÉN", sub: selectedPattern.mantraHold || "Mundo interior en calma", color: "text-amber-400" };
      case "exhale":
        return { label: "EXHALA", sub: selectedPattern.mantraExhale, color: "text-cyan-400" };
      case "holdOut":
        return { label: "VACÍO", sub: "Pausa serena antes de renacer", color: "text-purple-400" };
    }
  };

  const currentPhaseInfo = getPhaseText();

  // Circle Scale Calculation
  const getScale = () => {
    if (!isActive) return "scale-100";
    if (phase === "inhale") return "scale-125 duration-1000";
    if (phase === "holdIn") return "scale-125 duration-1000";
    if (phase === "exhale") return "scale-75 duration-1000";
    return "scale-75 duration-1000";
  };

  return (
    <section id="nervio-vago" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="border-b border-slate-800 pb-6">
        <div className="flex items-center space-x-2 text-emerald-400 text-xs font-mono font-semibold uppercase tracking-wider mb-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>Módulo 04 • Fisiología & Regulación Nerviosa</span>
        </div>
        <h2 className="font-display text-2xl sm:text-4xl font-bold text-white">
          Regulación del Nervio Vago
        </h2>
        <p className="font-serif-literary text-slate-300 text-base sm:text-lg mt-1">
          Guía de ritmo respiratorio visual y auditivo para reducir la ansiedad, regular el ritmo cardíaco y preparar la mente para la creación lírica.
        </p>
      </div>

      {/* Main Grid: Breathing Interactive Stage + Vagal Knowledge */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: Visual Breathing Sphere (7 cols) */}
        <div className="lg:col-span-7 bg-slate-950/90 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl flex flex-col items-center justify-between min-h-[500px] relative overflow-hidden">
          
          {/* Pattern Selector Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 w-full">
            {BREATHING_PATTERNS.map((p) => {
              const isSelected = selectedPattern.id === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => selectPattern(p)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all ${
                    isSelected
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 font-bold shadow-sm"
                      : "bg-slate-900 text-slate-400 border border-slate-800 hover:text-white"
                  }`}
                >
                  {p.name}
                </button>
              );
            })}
          </div>

          {/* Interactive Animated Circle */}
          <div className="relative my-8 flex items-center justify-center w-64 h-64 sm:w-72 sm:h-72">
            {/* Outer Glow Ring */}
            <div
              className={`absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-teal-500/20 blur-2xl transition-transform duration-1000 ${getScale()}`}
            />
            
            {/* Middle Breathing Ring */}
            <div
              className={`w-52 h-52 sm:w-60 sm:h-60 rounded-full border-2 border-dashed border-emerald-400/40 flex items-center justify-center transition-transform duration-1000 ${getScale()}`}
            >
              {/* Inner Core */}
              <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-gradient-to-br from-slate-900 via-emerald-950/40 to-slate-950 border border-emerald-500/40 flex flex-col items-center justify-center text-center p-4 shadow-inner">
                <span className={`text-xs font-mono font-bold tracking-widest uppercase ${currentPhaseInfo.color}`}>
                  {isActive ? currentPhaseInfo.label : "EN REPOSO"}
                </span>
                <span className="font-mono text-4xl sm:text-5xl font-bold text-white my-1">
                  {countdown}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  {isActive ? `Ciclo ${cyclesCompleted + 1}` : "Pulsa Iniciar"}
                </span>
              </div>
            </div>
          </div>

          {/* Subtitle Mantra */}
          <div className="text-center space-y-1 max-w-md">
            <p className="font-serif-literary text-sm sm:text-base text-slate-200 italic transition-all">
              "{currentPhaseInfo.sub}"
            </p>
            <p className="text-[11px] text-slate-400 font-mono">
              {selectedPattern.description}
            </p>
          </div>

          {/* Controls Bar */}
          <div className="mt-6 flex items-center space-x-3">
            {isActive ? (
              <button
                onClick={handlePause}
                className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center space-x-2 shadow-lg shadow-amber-950/50 transition-all"
              >
                <Pause className="w-4 h-4 fill-slate-950" />
                <span>Pausar</span>
              </button>
            ) : (
              <button
                onClick={handleStart}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-300 hover:to-teal-400 text-slate-950 font-bold text-xs flex items-center space-x-2 shadow-lg shadow-emerald-950/50 transition-all"
              >
                <Play className="w-4 h-4 fill-slate-950" />
                <span>Iniciar Respiración</span>
              </button>
            )}

            <button
              onClick={handleReset}
              title="Reiniciar contador"
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              title={soundEnabled ? "Desactivar campanillas armónicas" : "Activar campanillas armónicas"}
              className={`p-2.5 rounded-xl border transition-colors ${
                soundEnabled
                  ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                  : "bg-slate-900 text-slate-500 border-slate-800"
              }`}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
          </div>

        </div>

        {/* Right Column: Vagal Science & Somatic Tips (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          <div className="p-6 rounded-3xl bg-slate-950/90 border border-slate-800 space-y-4">
            <div className="flex items-center space-x-2 text-emerald-400 font-display text-sm font-bold">
              <Activity className="w-4 h-4" />
              <span>¿Cómo actúa la respiración en tu cerebro?</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              El <strong>Nervio Vago</strong> es el décimo par craneal y el principal canal del sistema nervioso parasimpático ("descansar y digerir"). Cuando prolongas la exhalación el doble del tiempo de inhalación:
            </p>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-start space-x-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Se libera acetilcolina en el nódulo sinoauricular del corazón, ralentizando las pulsaciones por minuto.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Se desactiva la señal de amenaza en la amígdala cerebral, disolviendo el pánico y la rumiación.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Se oxigena la corteza prefrontal, desbloqueando la creatividad y la introspección poética.</span>
              </li>
            </ul>
          </div>

          <div className="p-6 rounded-3xl bg-emerald-950/20 border border-emerald-500/30 space-y-3">
            <div className="text-xs font-mono text-emerald-300 font-bold uppercase tracking-wide flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Técnicas Somáticas Complementarias:</span>
            </div>
            <div className="space-y-2 text-xs text-slate-300">
              <p><strong>1. El Suspiro Fisiológico:</strong> Dos inhalaciones rápidas por la nariz seguidas de una exhalación larga por la boca.</p>
              <p><strong>2. Tarareo / Vocal Toning:</strong> Pronunciar la letra "M" o "OM" al exhalar para hacer vibrar las cuerdas vocales conectadas al nervio vago.</p>
              <p><strong>3. Agua Fría Facial:</strong> Salpicar agua fría en el rostro para activar el reflejo de inmersión mamífero.</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
