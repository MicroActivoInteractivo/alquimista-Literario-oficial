import React, { useState, useEffect } from "react";
import {
  Feather,
  Sparkles,
  Wand2,
  Copy,
  Check,
  Volume2,
  VolumeX,
  Download,
  Trash2,
  Shield,
  DollarSign,
  BookOpen,
  RefreshCw,
  Quote,
  HeartHandshake,
  Flame,
  Compass,
  ArrowRight,
  ShieldCheck,
  Lock,
  Lightbulb,
  CheckCheck,
  Dices,
  RotateCcw
} from "lucide-react";
import { ALCHEMICAL_ARCHETYPES, AlchemicalArchetype } from "../data/archetypes";
import { TransmutationRecord } from "../types";
import { readParagraphs, stopSpeech } from "../utils/speechEngine";
import confetti from "canvas-confetti";

interface TransmutationWorkshopProps {
  initialPrompt?: string;
  initialTitle?: string;
  onOpenCardModal: (title: string, poem: string, archetype?: string) => void;
  onJumpToMonetization?: () => void;
}

const MANDATORY_SYMBOLS = [
  "Crisol",
  "Oro",
  "Serenidad",
  "Luz",
  "Fuego sagrado",
  "Amanecer"
];

const SUGGESTED_WHISPERS = [
  "Es hoy, hoy comienzo mi nueva vida con serenidad y fuerza...",
  "Siento una opresión en el pecho por lo que aún no puedo soltar...",
  "Llevo días en silencio intentando comprender esta tristeza y hallar paz...",
  "La incertidumbre del mañana pesa, pero busco la fuerza para renacer...",
  "El cansancio acumulado me pide una pausa sagrada para sanar...",
];

export const TransmutationWorkshop: React.FC<TransmutationWorkshopProps> = ({
  initialPrompt = "",
  initialTitle = "",
  onOpenCardModal,
  onJumpToMonetization,
}) => {
  const [userInput, setUserInput] = useState(initialPrompt || "ES HOY, HOY COMIENZO MI NUEVA VIDA");
  const [density, setDensity] = useState(6);
  const [selectedArchetype, setSelectedArchetype] = useState<AlchemicalArchetype>(ALCHEMICAL_ARCHETYPES[0]);
  const [selectedSymbols, setSelectedSymbols] = useState<string[]>(["Crisol", "Oro", "Serenidad", "Luz"]);
  
  // Processing states
  const [isTransmuting, setIsTransmuting] = useState(false);
  const [isPolishing, setIsPolishing] = useState(false);
  const [isCorrectingSpelling, setIsCorrectingSpelling] = useState(false);
  const [isGeneratingRandom, setIsGeneratingRandom] = useState(false);
  const [randomOptions, setRandomOptions] = useState<{ title: string; text: string }[] | null>(null);
  const [spellingFeedback, setSpellingFeedback] = useState<string | null>(null);

  // Output results
  const [currentResult, setCurrentResult] = useState<TransmutationRecord | null>(null);
  const [copied, setCopied] = useState(false);
  const [copiedPhrases, setCopiedPhrases] = useState(false);
  
  // Audio narration states (Poem vs Original Phrases)
  const [isNarratingPoem, setIsNarratingPoem] = useState(false);
  const [isNarratingPhrases, setIsNarratingPhrases] = useState(false);

  // Journal history
  const [journalHistory, setJournalHistory] = useState<TransmutationRecord[]>(() => {
    try {
      const saved = localStorage.getItem("alquimista_journal_history");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    if (initialPrompt) {
      setUserInput(initialPrompt);
    }
  }, [initialPrompt]);

  const toggleSymbol = (symbol: string) => {
    if (selectedSymbols.includes(symbol)) {
      setSelectedSymbols(selectedSymbols.filter((s) => s !== symbol));
    } else {
      setSelectedSymbols([...selectedSymbols, symbol]);
    }
  };

  // Qualitative description for density
  const getDensityDetails = (val: number) => {
    if (val <= 4) {
      return {
        badge: "Nivel 1-4 • Susurro Sutil",
        desc: "Lenguaje suave, introspección ligera y cadencia pausada.",
        color: "text-cyan-300 border-cyan-500/40 bg-cyan-500/10",
      };
    } else if (val <= 7) {
      return {
        badge: "Nivel 5-7 • Peso Opresivo",
        desc: "Lenguaje denso, reconocimiento del dolor profundo y rescate lúcido.",
        color: "text-amber-300 border-amber-500/40 bg-amber-500/10",
      };
    } else {
      return {
        badge: "Nivel 8-10 • Catarsis Urgente",
        desc: "Lenguaje visceral, liberación volcánica y soberanía restaurada.",
        color: "text-rose-300 border-rose-500/40 bg-rose-500/10",
      };
    }
  };

  const densityInfo = getDensityDetails(density);

  // Correct spelling and grammar using Gemini
  const handleCorrectSpelling = async () => {
    if (!userInput.trim() || isCorrectingSpelling) return;
    setIsCorrectingSpelling(true);
    setSpellingFeedback(null);

    try {
      const res = await fetch("/api/correct-spelling", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: userInput }),
      });
      const data = await res.json();
      if (data.correctedText) {
        setUserInput(data.correctedText);
        setSpellingFeedback(
          data.hadErrors
            ? `✨ Ortografía y redacción corregidas con Gemini: "${data.correctedText}"`
            : "✓ Tu texto ya tiene una ortografía y estilo impecable."
        );
        setTimeout(() => setSpellingFeedback(null), 5000);
      }
    } catch (err) {
      console.warn("Spellcheck fallback:", err);
      // Client-side quick correction
      let cleaned = userInput
        .replace(/\bnueba\b/gi, "nueva")
        .replace(/\bnuebo\b/gi, "nuevo")
        .replace(/\bcomienso\b/gi, "comienzo")
        .replace(/\bcampeon\b/gi, "campeón")
        .replace(/\bcorason\b/gi, "corazón");
      if (cleaned.length > 0) {
        cleaned = cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
      }
      setUserInput(cleaned);
      setSpellingFeedback("✓ Ortografía y mayúsculas ajustadas.");
      setTimeout(() => setSpellingFeedback(null), 4000);
    } finally {
      setIsCorrectingSpelling(false);
    }
  };

  // Generate random / alternative inspirations using Gemini
  const handleGenerateRandomOptions = async () => {
    if (isGeneratingRandom) return;
    setIsGeneratingRandom(true);
    try {
      const res = await fetch("/api/generate-random-inspiration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentText: userInput,
          archetype: selectedArchetype.name,
          densityValue: density,
        }),
      });
      const data = await res.json();
      if (data.options && Array.isArray(data.options)) {
        setRandomOptions(data.options);
      }
    } catch (err) {
      console.warn("Random inspiration fallback:", err);
      setRandomOptions([
        {
          title: "Opción 1 • Despertar & Esperanza",
          text: "Es hoy, hoy comienzo mi nueva vida: elijo la paz sobre la queja y el brillo sobre la sombra.",
        },
        {
          title: "Opción 2 • Soberanía y Firmeza",
          text: "Hoy suelto el peso de lo que no puedo controlar y consagro mi energía a mi propio florecer.",
        },
        {
          title: "Opción 3 • Reinvención Profunda",
          text: "En el silencio de mi pecho reconozco mi coraje; hoy doy el paso hacia mi auténtico renacer.",
        },
      ]);
    } finally {
      setIsGeneratingRandom(false);
    }
  };

  // Core transmutation action
  const handleTransmute = async () => {
    if (!userInput.trim()) return;
    setIsTransmuting(true);
    stopSpeech();
    setIsNarratingPoem(false);
    setIsNarratingPhrases(false);

    try {
      const res = await fetch("/api/transmute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userWhisper: userInput,
          densityValue: density,
          densityName: selectedArchetype.name,
          symbols: selectedSymbols.length > 0 ? selectedSymbols : MANDATORY_SYMBOLS,
          targetMood: selectedArchetype.transmutationTo,
        }),
      });

      const data = await res.json();
      const newRecord: TransmutationRecord = {
        id: "tx_" + Date.now(),
        timestamp: new Date().toLocaleDateString("es-ES", {
          day: "numeric",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
        userInput: userInput,
        correctedUserInput: data.correctedUserWhisper || userInput,
        densityValue: density,
        densityName: selectedArchetype.transmutationFrom,
        symbols: selectedSymbols,
        title: data.title || "Crisol de Alquimia Interior",
        transmutedPoem: data.transmutedPoem || data.fallbackPoem || "En el #Crisol nace la #Luz y la #Serenidad...",
        alchemicalReflection: data.alchemicalReflection || "Tu inspiración ha sido elevada a arte poético, libre de errores y con profunda resonancia sanadora.",
        mantra: data.mantra || "Inhalo el fuego sagrado, exhalo en el amanecer de mi nueva vida.",
        archetype: data.archetype || selectedArchetype.name,
      };

      setCurrentResult(newRecord);

      // Save to local history
      setJournalHistory((prev) => {
        const updated = [newRecord, ...prev.slice(0, 19)];
        try {
          localStorage.setItem("alquimista_journal_history", JSON.stringify(updated));
        } catch {
          // ignore
        }
        return updated;
      });

      confetti({
        particleCount: 85,
        spread: 85,
        origin: { y: 0.55 },
        colors: ["#fbbf24", "#f59e0b", "#38bdf8", "#ec4899", "#10b981"],
      });
    } catch (err) {
      console.warn("Transmute fallback:", err);
      // Fallback integrating user's input directly and fixing obvious typos
      let cleanInput = userInput
        .replace(/\bnueba\b/gi, "nueva")
        .replace(/\bcomienso\b/gi, "comienzo");
      if (cleanInput.length > 0) {
        cleanInput = cleanInput.charAt(0).toUpperCase() + cleanInput.slice(1);
      }

      const lines = cleanInput.split(/[.\n]/).map((s) => s.trim()).filter(Boolean);
      const mainThought = lines[0] || "es hoy cuando comienza mi nueva vida";
      const secondThought = lines[1] || "el alma encuentra su cauce de libertad";

      const fallbackRecord: TransmutationRecord = {
        id: "tx_" + Date.now(),
        timestamp: new Date().toLocaleDateString("es-ES"),
        userInput: userInput,
        correctedUserInput: cleanInput,
        densityValue: density,
        densityName: selectedArchetype.transmutationFrom,
        symbols: selectedSymbols,
        title: `Crisol de ${selectedArchetype.name.split(" ")[1] || "la Renovación"}`,
        transmutedPoem: `En el #Crisol sagrado de este instante,\ndonde "${mainThought}" deja de ser anhelo para volverse verso.\nEl #Fuego sagrado acoge ${secondThought.toLowerCase()},\ntransmutando las dudas en pura #Serenidad y #Luz.\n\nNo hay sombra que resista al nuevo #Amanecer,\nlo que antes era espera resplandece ahora en puro #Oro para tu renacer.`,
        alchemicalReflection: `Tus palabras han sido recibidas en el crisol lírico: al ser nombradas con honestidad y elevadas con ritmo poético, cobran fuerza y soberanía interior.`,
        mantra: "Inhalo el fuego sagrado, exhalo en el amanecer de mi nueva vida.",
        archetype: selectedArchetype.name,
      };
      setCurrentResult(fallbackRecord);
    } finally {
      setIsTransmuting(false);
    }
  };

  const handlePolish = async () => {
    if (!currentResult) return;
    setIsPolishing(true);
    try {
      const res = await fetch("/api/polish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: currentResult.title,
          draft: currentResult.transmutedPoem,
          symbols: selectedSymbols,
          densityName: selectedArchetype.transmutationTo,
        }),
      });
      const data = await res.json();
      if (data.polishedText) {
        setCurrentResult({
          ...currentResult,
          title: data.polishedTitle || currentResult.title,
          transmutedPoem: data.polishedText,
          alchemicalReflection: data.critique || currentResult.alchemicalReflection,
        });
      }
    } catch (e) {
      console.warn("Polish fallback:", e);
    } finally {
      setIsPolishing(false);
    }
  };

  const handleCopyPoem = () => {
    if (!currentResult) return;
    const textToCopy = `${currentResult.title}\n\n${currentResult.transmutedPoem}\n\n— Frases entrelazadas: "${currentResult.correctedUserInput || currentResult.userInput}"\n— Mantra: "${currentResult.mantra}"\n[Transmutado en El Alquimista Literario • Arquetipo: ${currentResult.archetype}]`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleCopyPhrases = () => {
    if (!currentResult) return;
    const textToCopy = `"${currentResult.correctedUserInput || currentResult.userInput}"\n[Frases originales entrelazadas • El Alquimista Literario]`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedPhrases(true);
    setTimeout(() => setCopiedPhrases(false), 2000);
  };

  // Narrate entire poem
  const handleNarratePoem = () => {
    if (!currentResult) return;
    if (isNarratingPoem) {
      stopSpeech();
      setIsNarratingPoem(false);
    } else {
      stopSpeech();
      setIsNarratingPhrases(false);
      setIsNarratingPoem(true);
      const lines = currentResult.transmutedPoem.split("\n").filter((l) => l.trim().length > 0);
      readParagraphs([currentResult.title, ...lines, `Mantra alquímico: ${currentResult.mantra}`], {
        rate: 0.92,
        onEnd: () => setIsNarratingPoem(false),
        onError: () => setIsNarratingPoem(false),
      });
    }
  };

  // Narrate specifically the original phrases
  const handleNarratePhrases = () => {
    if (!currentResult) return;
    if (isNarratingPhrases) {
      stopSpeech();
      setIsNarratingPhrases(false);
    } else {
      stopSpeech();
      setIsNarratingPoem(false);
      setIsNarratingPhrases(true);
      const phraseText = `Frases originales entrelazadas: ${currentResult.correctedUserInput || currentResult.userInput}`;
      readParagraphs([phraseText], {
        rate: 0.9,
        onEnd: () => setIsNarratingPhrases(false),
        onError: () => setIsNarratingPhrases(false),
      });
    }
  };

  const handleDeleteHistoryItem = (id: string) => {
    const updated = journalHistory.filter((item) => item.id !== id);
    setJournalHistory(updated);
    try {
      localStorage.setItem("alquimista_journal_history", JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  return (
    <section id="taller-transmutacion" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10 scroll-mt-24">
      
      {/* SECTION HEADER BLOCK */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950/40 border border-amber-500/30 p-6 sm:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-mono font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>MÓDULO 02 • TALLER DE ALQUIMIA LÍRICA</span>
            </div>

            <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
              Crisol de Biblioterapia & Poesía Lírica
            </h2>

            <p className="font-serif-literary text-slate-300 text-base sm:text-lg leading-relaxed">
              Actúa como un <strong>Alquimista Literario</strong> y poeta profesional: escribe tu inspiración sin preocuparte por la ortografía (Gemini la perfecciona y pule automáticamente), explora variantes aleatorias y transmuta tus vivencias en versos de conmovedora pureza lírica.
            </p>

            {/* Key Visual Trust Messages */}
            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono">
              <span className="flex items-center space-x-1.5 text-emerald-400 bg-emerald-950/50 px-3.5 py-1.5 rounded-full border border-emerald-500/40 font-semibold shadow-sm">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Privacidad Absoluta • Sin Registro Obligatorio</span>
              </span>
              <span className="flex items-center space-x-1.5 text-amber-300 bg-amber-950/50 px-3.5 py-1.5 rounded-full border border-amber-500/40 font-semibold shadow-sm">
                <Flame className="w-4 h-4 text-amber-400" />
                <span>Corrección Ortográfica & Excelencia Poética</span>
              </span>
            </div>
          </div>

          {/* Strategic Warm Imagery / Crucible Card */}
          <div className="lg:w-80 shrink-0 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
            <div className="relative rounded-xl overflow-hidden aspect-[16/10] border border-amber-500/20 shadow-inner group">
              <img
                src="https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80"
                alt="El Crisol Lírico y la Pluma de Oro"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              <div className="absolute bottom-2.5 left-3 right-3 text-center">
                <span className="text-[11px] font-mono text-amber-300 font-semibold drop-shadow">
                  ⚗️ Crisol de Sanación Lírica
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs font-mono text-slate-300 pt-1 border-t border-slate-800/80">
              <span className="text-slate-400">Vías de Sanación:</span>
              <strong className="text-amber-400 text-sm font-bold">6 Arquetipos</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Workshop Controls & ESCRIBE AQUÍ TU INSPIRACIÓN Box (6 cols) */}
        <div className="lg:col-span-6 space-y-6 bg-slate-950/95 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
          
          {/* Mission Directive Banner */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-2">
            <div className="flex items-center space-x-2 text-xs font-mono text-amber-300 font-bold uppercase">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Crisol de Biblioterapia & Poesía</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-serif-literary sm:text-sm">
              Tu texto es procesado con total confidencialidad. Gemini corrige cualquier falta ortográfica y eleva cada emoción a poesía magistral.
            </p>
          </div>

          {/* STEP 1: 6 VÍAS DE TRANSMUTACIÓN (ARQUETIPOS DE SANACIÓN) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-mono text-amber-300 uppercase tracking-wide font-bold">
                1. Selección de Vía de Transmutación (6 Arquetipos):
              </label>
              <span className="text-[10px] text-amber-400 font-mono">Arquetipos Místicos</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ALCHEMICAL_ARCHETYPES.map((arch, idx) => {
                const isSelected = selectedArchetype.id === arch.id;
                return (
                  <button
                    key={arch.id}
                    onClick={() => {
                      setSelectedArchetype(arch);
                      setSelectedSymbols(arch.seedWords.slice(0, 3));
                    }}
                    className={`p-3.5 rounded-2xl border text-left transition-all relative overflow-hidden cursor-pointer ${
                      isSelected
                        ? "bg-amber-500/20 border-amber-500/70 shadow-lg shadow-amber-950/40 ring-2 ring-amber-500/50 scale-[1.02]"
                        : "bg-slate-900/80 border-slate-800 text-slate-300 hover:border-amber-500/40 hover:bg-slate-900"
                    }`}
                  >
                    <div className="text-xs font-bold text-white flex items-center justify-between">
                      <span>Opción {idx + 1}: {arch.name.split(" (")[0]}</span>
                      {isSelected && <span className="text-amber-400 text-xs font-bold">✓</span>}
                    </div>
                    <div className="text-[11px] text-amber-300 font-mono mt-1 flex items-center space-x-1">
                      <span className="text-slate-400">Hacia:</span>
                      <span className="font-semibold truncate">{arch.transmutationTo}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 2: DENSIDAD DEL PLOMO EMOCIONAL (1-4, 5-7, 8-10) */}
          <div className="space-y-2.5 pt-2 border-t border-slate-800/80">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="font-mono text-slate-300 uppercase font-bold">
                2. Densidad del Plomo Emocional:
              </span>
              <span className={`font-mono font-bold px-2.5 py-0.5 rounded-full border text-xs ${densityInfo.color}`}>
                {densityInfo.badge}
              </span>
            </div>

            <input
              type="range"
              min="1"
              max="10"
              value={density}
              onChange={(e) => setDensity(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />

            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>1-4: Susurro sutil</span>
              <span>5-7: Peso opresivo</span>
              <span>8-10: Catarsis urgente</span>
            </div>

            <p className="text-[11px] text-slate-400 italic">
              {densityInfo.desc}
            </p>
          </div>

          {/* STEP 3: ENTRETEJIDO DE SÍMBOLOS SAGRADOS */}
          <div className="space-y-2 pt-2 border-t border-slate-800/80">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-mono text-cyan-300 uppercase tracking-wide font-bold">
                3. Símbolos Alquímicos a Entrelazar:
              </label>
              <span className="text-[10px] text-slate-500 font-mono">Personaliza tu poema</span>
            </div>
            
            <div className="flex flex-wrap gap-1.5">
              {MANDATORY_SYMBOLS.map((sym) => {
                const active = selectedSymbols.includes(sym);
                return (
                  <button
                    key={sym}
                    onClick={() => toggleSymbol(sym)}
                    className={`px-3 py-1 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                      active
                        ? "bg-amber-500/20 text-amber-300 border border-amber-500/50 font-bold shadow-sm"
                        : "bg-slate-900 text-slate-400 border border-slate-800 hover:text-white"
                    }`}
                  >
                    #{sym}
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 4: CUADRO PRINCIPAL 'ESCRIBE AQUÍ TU INSPIRACIÓN' (REDISEÑADO CON TÍTULO GRANDE) */}
          <div className="space-y-3 pt-3 border-t-2 border-amber-500/40">
            
            {/* LARGE PROMINENT TITLE */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center space-x-2">
                <Quote className="w-5 h-5 text-amber-400 shrink-0" />
                <h3 className="font-display text-base sm:text-xl font-bold text-amber-300 uppercase tracking-wide drop-shadow-sm">
                  ESCRIBE AQUÍ TU INSPIRACIÓN
                </h3>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-[11px] text-slate-400 font-mono bg-slate-900/90 px-2.5 py-1 rounded-full border border-slate-800">
                  {userInput.length} caracteres
                </span>
              </div>
            </div>

            {/* ASSISTANT TOOLBAR: SPELLCHECK & RANDOM INSPIRATION OPTION */}
            <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-900/90 p-2 rounded-2xl border border-slate-800">
              
              {/* Button: Spellcheck with Gemini */}
              <button
                type="button"
                onClick={handleCorrectSpelling}
                disabled={isCorrectingSpelling || !userInput.trim()}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium flex items-center space-x-1.5 transition-all cursor-pointer ${
                  isCorrectingSpelling
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 animate-pulse"
                    : "bg-cyan-950/60 hover:bg-cyan-900/70 text-cyan-300 border border-cyan-500/40 hover:border-cyan-400"
                }`}
                title="Gemini revisa la ortografía, tildes y mayúsculas"
              >
                <CheckCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>{isCorrectingSpelling ? "Revisando con Gemini..." : "🪄 Corregir Ortografía (Gemini)"}</span>
              </button>

              {/* Button: Generate Random Alternative Inspiration */}
              <button
                type="button"
                onClick={handleGenerateRandomOptions}
                disabled={isGeneratingRandom}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium flex items-center space-x-1.5 transition-all cursor-pointer ${
                  isGeneratingRandom
                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse"
                    : "bg-amber-950/60 hover:bg-amber-900/70 text-amber-300 border border-amber-500/40 hover:border-amber-400"
                }`}
                title="Genera opciones e inspiraciones aleatorias para elegir"
              >
                <Dices className="w-3.5 h-3.5 text-amber-400" />
                <span>{isGeneratingRandom ? "Generando opciones..." : "🎲 Opciones de Texto Aleatorio"}</span>
              </button>

            </div>

            {/* Spelling feedback banner */}
            {spellingFeedback && (
              <div className="p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-500/40 text-xs text-cyan-200 font-mono animate-fade-in flex items-center justify-between">
                <span>{spellingFeedback}</span>
                <button onClick={() => setSpellingFeedback(null)} className="text-cyan-400 hover:text-white ml-2">✕</button>
              </div>
            )}

            {/* RANDOM / ALTERNATIVE OPTIONS MODAL / EXPANDABLE LIST */}
            {randomOptions && (
              <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-950 border border-amber-500/50 space-y-3 animate-fade-in shadow-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1.5 text-xs font-mono font-bold text-amber-300 uppercase">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Elige una opción aleatoria para tu inspiración:</span>
                  </div>
                  <button
                    onClick={() => setRandomOptions(null)}
                    className="text-xs text-slate-400 hover:text-white px-2 py-0.5 rounded bg-slate-800"
                  >
                    Cerrar
                  </button>
                </div>

                <div className="space-y-2">
                  {randomOptions.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setUserInput(opt.text);
                        setRandomOptions(null);
                      }}
                      className="w-full p-3 rounded-xl bg-slate-900/90 hover:bg-amber-500/20 border border-slate-800 hover:border-amber-500/60 text-left transition-all group flex items-start justify-between gap-2"
                    >
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-mono text-amber-400 font-bold block">
                          {opt.title}
                        </span>
                        <p className="text-xs font-serif-literary text-slate-200 leading-relaxed group-hover:text-amber-100">
                          "{opt.text}"
                        </p>
                      </div>
                      <span className="text-[10px] font-mono text-amber-300 bg-amber-950/60 px-2 py-1 rounded border border-amber-500/30 shrink-0 group-hover:bg-amber-500 group-hover:text-slate-950 font-bold">
                        Elegir ↵
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* TEXTAREA INPUT */}
            <textarea
              rows={5}
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Escribe aquí tu inspiración, tus palabras de desahogo, anhelo o vivencia. Aunque escribas rápido o con faltas ortográficas, Gemini las corregirá y las elevará a versos de alta maestría lírica..."
              className="w-full p-4 rounded-2xl bg-[#070b14] border-2 border-amber-500/40 text-slate-100 text-sm sm:text-base placeholder:text-slate-600 focus:outline-none focus:border-amber-400 leading-relaxed font-serif-literary transition-colors shadow-inner"
            />

            {/* Quick Inspiration Whispers */}
            <div className="space-y-1.5">
              <span className="text-[10px] text-slate-400 font-mono block">Opciones rápidas de inspiración:</span>
              <div className="flex flex-wrap gap-1.5">
                {SUGGESTED_WHISPERS.map((whisper, idx) => (
                  <button
                    key={idx}
                    onClick={() => setUserInput(whisper)}
                    className="text-[11px] text-slate-300 bg-slate-900/90 hover:bg-amber-500/20 hover:text-amber-300 hover:border-amber-500/50 border border-slate-800 px-2.5 py-1 rounded-lg text-left transition-colors font-serif-literary truncate max-w-full"
                    title={whisper}
                  >
                    "{whisper.slice(0, 48)}..."
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Core Command Button: TRANSMUTAR */}
          <button
            onClick={handleTransmute}
            disabled={isTransmuting || !userInput.trim()}
            className={`w-full py-4 px-6 rounded-2xl font-display font-bold text-sm sm:text-base flex items-center justify-center space-x-2 shadow-2xl transition-all duration-300 ${
              isTransmuting || !userInput.trim()
                ? "bg-slate-800 text-slate-500 cursor-not-allowed"
                : "bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 shadow-amber-950/60 hover:scale-[1.01] active:scale-95 cursor-pointer"
            }`}
          >
            {isTransmuting ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span>Transmutando y Corrigiendo con Gemini AI Studio...</span>
              </>
            ) : (
              <>
                <Wand2 className="w-5 h-5" />
                <span>⚗️ Transmutar en Poema Lírico (AI Studio)</span>
              </>
            )}
          </button>

          <div className="flex items-center justify-center space-x-2 text-[11px] text-slate-400 text-center">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span>Privacidad Absoluta • Corrección ortográfica y transmutación en memoria</span>
          </div>

        </div>

        {/* Right Column: Lyrical Output Frame & History (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          
          {currentResult ? (
            <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-2 border-amber-500/60 rounded-3xl p-6 sm:p-8 shadow-2xl relative space-y-6 animate-fade-in ring-2 ring-amber-500/30">
              
              {/* Header Badge */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <span className="px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/50 text-xs font-mono font-bold flex items-center space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>{currentResult.archetype}</span>
                </span>
                <span className="text-[11px] text-slate-400 font-mono">
                  {currentResult.timestamp}
                </span>
              </div>

              {/* [PROMINENT POSITION]: FRASES ORIGINALES ENTRELAZADAS (CLOSER TO TRANSMUTE + SPEECH NARRATOR) */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-950/40 via-slate-950 to-slate-900 border-2 border-amber-500/50 shadow-lg space-y-2.5">
                <div className="flex items-center justify-between text-xs font-mono text-amber-300">
                  <div className="flex items-center space-x-2 font-bold uppercase tracking-wider">
                    <HeartHandshake className="w-4 h-4 text-amber-400" />
                    <span>FRASES ORIGINALES ENTRELAZADAS:</span>
                  </div>

                  {/* Narration & Copy for Original Phrases */}
                  <div className="flex items-center space-x-1.5">
                    <button
                      onClick={handleNarratePhrases}
                      className={`px-2.5 py-1 rounded-lg transition-colors flex items-center space-x-1 text-[11px] font-mono cursor-pointer ${
                        isNarratingPhrases
                          ? "bg-amber-500 text-slate-950 font-bold"
                          : "bg-slate-800/90 hover:bg-slate-700 text-amber-300 hover:text-white"
                      }`}
                      title="Escuchar frases con nuestra locutora"
                    >
                      {isNarratingPhrases ? <VolumeX className="w-3 h-3 text-rose-500" /> : <Volume2 className="w-3 h-3 text-cyan-400" />}
                      <span>{isNarratingPhrases ? "Pausar" : "Escuchar"}</span>
                    </button>

                    <button
                      onClick={handleCopyPhrases}
                      className="px-2 py-1 rounded-lg bg-slate-800/90 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors text-[11px] font-mono flex items-center space-x-1 cursor-pointer"
                      title="Copiar frases"
                    >
                      {copiedPhrases ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-amber-400" />}
                      <span>{copiedPhrases ? "¡Copiado!" : "Copiar"}</span>
                    </button>
                  </div>
                </div>

                {/* Display corrected & elevated words */}
                <p className="text-sm sm:text-base text-amber-100 font-serif-literary italic leading-relaxed pl-2 border-l-2 border-amber-400">
                  "{currentResult.correctedUserInput || currentResult.userInput}"
                </p>

                {currentResult.correctedUserInput && currentResult.correctedUserInput !== currentResult.userInput && (
                  <div className="text-[10px] font-mono text-emerald-400 flex items-center space-x-1 pt-1 border-t border-slate-800/80">
                    <CheckCheck className="w-3 h-3" />
                    <span>Texto corregido ortográficamente por Gemini antes de la transmutación.</span>
                  </div>
                )}
              </div>

              {/* Title & Transmuted Poem (Elevated Lyrical Quality) */}
              <div className="space-y-4">
                <div>
                  <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest block mb-1">
                    Poema Lírico Transmutado
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-white leading-tight">
                    {currentResult.title}
                  </h3>
                </div>
                
                <div className="w-24 h-0.5 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-600 rounded-full" />
                
                <div className="p-6 sm:p-7 rounded-2xl bg-[#060911] border border-amber-500/30 shadow-inner">
                  <p className="font-serif-literary text-lg sm:text-xl text-slate-100 leading-relaxed whitespace-pre-line italic">
                    {currentResult.transmutedPoem}
                  </p>
                </div>
              </div>

              {/* Bibliotherapy Reflection & Mantra */}
              <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 space-y-2">
                <div className="text-xs font-mono text-amber-400 font-bold uppercase flex items-center space-x-1">
                  <span>✦ Reflexión Biblioterapéutica:</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-serif-literary">
                  {currentResult.alchemicalReflection}
                </p>
                <div className="pt-2 border-t border-amber-500/20 flex flex-wrap items-center gap-1.5 text-xs text-cyan-300 font-mono">
                  <span>🌬️ Mantra Somático:</span>
                  <span className="font-bold">"{currentResult.mantra}"</span>
                </div>
              </div>

              {/* Post-Generation Options */}
              <div className="space-y-3 pt-2 border-t border-slate-800">
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wide">
                  Opciones del Poema:
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  
                  {/* 1. Speech Narration of entire poem */}
                  <button
                    onClick={handleNarratePoem}
                    className={`py-2.5 px-3 rounded-xl text-xs font-medium transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
                      isNarratingPoem
                        ? "bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-950/50"
                        : "bg-slate-800 hover:bg-slate-700 text-slate-200"
                    }`}
                  >
                    {isNarratingPoem ? <VolumeX className="w-4 h-4 text-rose-500" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
                    <span>{isNarratingPoem ? "Pausar Locutora" : "Escuchar Poema"}</span>
                  </button>

                  {/* 2. Copy Text */}
                  <button
                    onClick={handleCopyPoem}
                    className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    <span>{copied ? "¡Copiado!" : "Copiar Texto"}</span>
                  </button>

                  {/* 3. Export Card */}
                  <button
                    onClick={() => onOpenCardModal(currentResult.title, currentResult.transmutedPoem, currentResult.archetype)}
                    className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-bold text-xs transition-all flex items-center justify-center space-x-1.5 shadow-md shadow-amber-950/40 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Exportar Tarjeta</span>
                  </button>

                </div>

                {/* Secondary Actions: Polish Metric & Monetize */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                  <button
                    onClick={handlePolish}
                    disabled={isPolishing}
                    className="px-3 py-1.5 rounded-lg bg-cyan-950/50 hover:bg-cyan-900/50 text-cyan-300 border border-cyan-500/30 text-xs font-mono transition-colors flex items-center space-x-1.5 cursor-pointer"
                  >
                    <Feather className="w-3.5 h-3.5" />
                    <span>{isPolishing ? "Puliendo métrica..." : "Pulir Métrica con IA"}</span>
                  </button>

                  <button
                    onClick={() => {
                      if (onJumpToMonetization) {
                        onJumpToMonetization();
                      } else {
                        const el = document.getElementById("monetizacion-guias");
                        el?.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    className="px-3 py-1.5 rounded-lg bg-emerald-950/50 hover:bg-emerald-900/50 text-emerald-300 border border-emerald-500/30 text-xs font-mono transition-colors flex items-center space-x-1.5 cursor-pointer"
                  >
                    <DollarSign className="w-3.5 h-3.5" />
                    <span>Guía de Autopublicación</span>
                  </button>
                </div>

              </div>

            </div>
          ) : (
            <div className="p-8 rounded-3xl bg-slate-950/60 border border-slate-800/80 text-center space-y-4 flex flex-col items-center justify-center min-h-[420px]">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 text-3xl shadow-lg">
                ⚗️
              </div>
              <h4 className="font-display text-xl font-bold text-white">
                Crisol de Transmutación Listo
              </h4>
              <p className="font-serif-literary text-slate-400 text-sm max-w-md leading-relaxed">
                Escribe en <strong>"ESCRIBE AQUÍ TU INSPIRACIÓN"</strong> (o genera una opción de texto aleatorio), revisa la ortografía con Gemini y haz clic en <strong>"⚗️ Transmutar en Poema Lírico (AI Studio)"</strong> para contemplar tus versos y escuchar tus frases entrelazadas.
              </p>
            </div>
          )}

          {/* Local History */}
          {journalHistory.length > 0 && (
            <div className="bg-slate-950/80 border border-slate-800 rounded-3xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-mono font-bold text-slate-300 uppercase flex items-center space-x-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                  <span>Tu Diario de Obras Transmutadas ({journalHistory.length})</span>
                </span>
                <span className="text-[10px] text-slate-500 font-mono">Guardado en tu navegador</span>
              </div>

              <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                {journalHistory.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setCurrentResult(item)}
                    className="p-3 rounded-xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 flex items-center justify-between cursor-pointer group transition-colors"
                  >
                    <div>
                      <h5 className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors">
                        {item.title}
                      </h5>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {item.timestamp} • {item.archetype}
                      </span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteHistoryItem(item.id);
                      }}
                      className="p-1.5 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition-colors text-slate-500"
                      title="Eliminar registro"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
