import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, Square, SkipBack, SkipForward, Volume2, Search, BookOpen, CheckCircle, Sparkles, Sliders, MessageSquare, Lightbulb } from "lucide-react";
import { AUDIOBOOK_CHAPTERS } from "../data/audiobookChapters";
import { AudiobookChapter } from "../types";
import { readParagraphs, stopSpeech, pauseSpeech, resumeSpeech, getAvailableVoices } from "../utils/speechEngine";
import confetti from "canvas-confetti";

interface AudiobookPlayerProps {
  highContrast: boolean;
  onSendToWorkshop?: (text: string, title: string) => void;
}

export const AudiobookPlayer: React.FC<AudiobookPlayerProps> = ({ highContrast, onSendToWorkshop }) => {
  const [selectedChapter, setSelectedChapter] = useState<AudiobookChapter>(AUDIOBOOK_CHAPTERS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentParagraph, setCurrentParagraph] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVoiceURI, setSelectedVoiceURI] = useState<string>("");
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [showReflections, setShowReflections] = useState(false);
  const [completedChapters, setCompletedChapters] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem("alquimista_completed_chapters");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const paragraphRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  useEffect(() => {
    getAvailableVoices().then((v) => {
      setVoices(v.filter((voice) => voice.lang.startsWith("es")));
    });
  }, []);

  // Filter chapters by search query
  const filteredChapters = AUDIOBOOK_CHAPTERS.filter((chap) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      chap.title.toLowerCase().includes(q) ||
      chap.subtitle.toLowerCase().includes(q) ||
      chap.summary.toLowerCase().includes(q) ||
      chap.fullText.toLowerCase().includes(q)
    );
  });

  const handlePlayChapter = (chapter: AudiobookChapter, startParaIndex = 0) => {
    setSelectedChapter(chapter);
    setCurrentParagraph(startParaIndex);
    setIsPlaying(true);
    setIsPaused(false);

    readParagraphs(
      chapter.paragraphs,
      {
        rate: playbackRate,
        voiceURI: selectedVoiceURI || undefined,
        onParagraphChange: (idx) => {
          setCurrentParagraph(idx);
          if (paragraphRefs.current[idx]) {
            paragraphRefs.current[idx]?.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        },
        onEnd: () => {
          setIsPlaying(false);
          setIsPaused(false);
          // Mark chapter completed
          setCompletedChapters((prev) => {
            if (!prev.includes(chapter.id)) {
              const updated = [...prev, chapter.id];
              try {
                localStorage.setItem("alquimista_completed_chapters", JSON.stringify(updated));
              } catch {
                // ignore
              }
              confetti({
                particleCount: 70,
                spread: 60,
                origin: { y: 0.7 },
                colors: ["#f59e0b", "#38bdf8", "#ec4899", "#10b981"]
              });
              return updated;
            }
            return prev;
          });
        },
        onError: () => {
          setIsPlaying(false);
          setIsPaused(false);
        }
      },
      startParaIndex
    );
  };

  const handlePause = () => {
    pauseSpeech();
    setIsPaused(true);
  };

  const handleResume = () => {
    resumeSpeech();
    setIsPaused(false);
  };

  const handleStop = () => {
    stopSpeech();
    setIsPlaying(false);
    setIsPaused(false);
    setCurrentParagraph(0);
  };

  const handleNextChapter = () => {
    const nextIdx = AUDIOBOOK_CHAPTERS.findIndex((c) => c.id === selectedChapter.id) + 1;
    if (nextIdx < AUDIOBOOK_CHAPTERS.length) {
      handlePlayChapter(AUDIOBOOK_CHAPTERS[nextIdx], 0);
    }
  };

  const handlePrevChapter = () => {
    const prevIdx = AUDIOBOOK_CHAPTERS.findIndex((c) => c.id === selectedChapter.id) - 1;
    if (prevIdx >= 0) {
      handlePlayChapter(AUDIOBOOK_CHAPTERS[prevIdx], 0);
    }
  };

  return (
    <section id="audiolibro-alquimista" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 text-xs font-mono font-semibold uppercase tracking-wider mb-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>Módulo 01 • Audiolibro Oficial</span>
          </div>
          <h2 className="font-display text-2xl sm:text-4xl font-bold text-white">
            El Alquimista Literario: Audiolibro y Recitales Poéticos
          </h2>
          <p className="font-serif-literary text-slate-300 text-base sm:text-lg mt-1">
            Locución neutra profesional, transcripción sincronizada en vivo y recitales poéticos inmortales.
          </p>
        </div>

        {/* Progress tracker */}
        <div className="flex items-center space-x-3 bg-slate-900/90 border border-slate-800 px-4 py-2.5 rounded-2xl">
          <div className="text-right">
            <div className="text-xs text-slate-400">Progreso de escucha</div>
            <div className="text-sm font-bold text-cyan-300 font-mono">
              {completedChapters.length} de {AUDIOBOOK_CHAPTERS.length} Capítulos
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold">
            {Math.round((completedChapters.length / AUDIOBOOK_CHAPTERS.length) * 100)}%
          </div>
        </div>
      </div>

      {/* Main Grid: Sidebar Chapters + Active Reader */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Chapter List (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por palabra clave o tema..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/60 transition-colors"
            />
          </div>

          {/* Chapters Accordion */}
          <div className="space-y-2.5 max-h-[580px] overflow-y-auto pr-1">
            {filteredChapters.map((chapter) => {
              const isSelected = selectedChapter.id === chapter.id;
              const isCompleted = completedChapters.includes(chapter.id);

              return (
                <div
                  key={chapter.id}
                  onClick={() => {
                    if (isSelected && isPlaying) {
                      handlePause();
                    } else {
                      handlePlayChapter(chapter, 0);
                    }
                  }}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? "bg-slate-900 border-cyan-500/50 shadow-lg shadow-cyan-950/40"
                      : "bg-[#080c16] border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/50"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2.5">
                      <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs font-bold ${
                        isSelected
                          ? "bg-cyan-500 text-slate-950"
                          : "bg-slate-800 text-slate-300"
                      }`}>
                        {chapter.number}
                      </span>
                      <h4 className={`text-sm font-bold font-display ${
                        isSelected ? "text-cyan-300" : "text-white"
                      }`}>
                        {chapter.title}
                      </h4>
                    </div>
                    {isCompleted && (
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />
                    )}
                  </div>

                  <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                    {chapter.subtitle}
                  </p>

                  <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                    <span>⏱ ~{chapter.estimatedMinutes} min</span>
                    <span className="text-cyan-400/90 font-medium">
                      {isSelected && isPlaying ? "Reproduciendo..." : "Escuchar capítulo →"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Right Column: Active Player & Transcript (8 cols) */}
        <div className="lg:col-span-8 space-y-6 bg-slate-950/90 border border-slate-800/90 rounded-3xl p-6 sm:p-8 shadow-2xl relative">
          
          {/* Active Chapter Header */}
          <div className="border-b border-slate-800/80 pb-6">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
              <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold">
                Capítulo {selectedChapter.number} de 0{AUDIOBOOK_CHAPTERS.length}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {selectedChapter.estimatedMinutes} minutos de reflexión
              </span>
            </div>

            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
              {selectedChapter.title}
            </h3>
            <p className="font-serif-literary text-cyan-200/90 text-sm sm:text-base mt-1 italic">
              {selectedChapter.subtitle}
            </p>
          </div>

          {/* Audio Controls Bar */}
          <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl flex flex-wrap items-center justify-between gap-4">
            
            {/* Playback action buttons */}
            <div className="flex items-center space-x-2">
              <button
                onClick={handlePrevChapter}
                title="Capítulo anterior"
                className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              >
                <SkipBack className="w-4 h-4" />
              </button>

              {isPlaying && !isPaused ? (
                <button
                  onClick={handlePause}
                  title="Pausar audio"
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center space-x-2 shadow-lg shadow-amber-950/50 transition-transform active:scale-95"
                >
                  <Pause className="w-4 h-4 fill-slate-950" />
                  <span>Pausar</span>
                </button>
              ) : isPaused ? (
                <button
                  onClick={handleResume}
                  title="Reanudar audio"
                  className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center space-x-2 shadow-lg shadow-cyan-950/50 transition-transform active:scale-95"
                >
                  <Play className="w-4 h-4 fill-slate-950" />
                  <span>Reanudar</span>
                </button>
              ) : (
                <button
                  onClick={() => handlePlayChapter(selectedChapter, 0)}
                  title="Escuchar locución del capítulo"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs flex items-center space-x-2 shadow-lg shadow-cyan-950/50 transition-transform active:scale-95"
                >
                  <Play className="w-4 h-4 fill-slate-950" />
                  <span>Escuchar Capítulo</span>
                </button>
              )}

              <button
                onClick={handleStop}
                title="Detener audio"
                className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-rose-400 transition-colors"
              >
                <Square className="w-4 h-4" />
              </button>

              <button
                onClick={handleNextChapter}
                title="Siguiente capítulo"
                className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              >
                <SkipForward className="w-4 h-4" />
              </button>
            </div>

            {/* Speed Selector */}
            <div className="flex items-center space-x-2 text-xs text-slate-300">
              <Sliders className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-[11px] text-slate-400">Velocidad:</span>
              {[0.8, 1.0, 1.2, 1.5].map((rate) => (
                <button
                  key={rate}
                  onClick={() => {
                    setPlaybackRate(rate);
                    if (isPlaying) {
                      handlePlayChapter(selectedChapter, currentParagraph);
                    }
                  }}
                  className={`px-2.5 py-1 rounded-lg font-mono text-[11px] transition-all ${
                    playbackRate === rate
                      ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold"
                      : "bg-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  {rate}x
                </button>
              ))}
            </div>

          </div>

          {/* Transcript Content with Synced Highlight */}
          <div className="space-y-5 pt-2">
            <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800/60 pb-2">
              <span className="flex items-center space-x-1.5">
                <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                <span>Transcripción Oficial Sincronizada</span>
              </span>
              <span className="text-[11px] font-mono text-cyan-400/90">
                Párrafo {currentParagraph + 1} de {selectedChapter.paragraphs.length}
              </span>
            </div>

            <div className="space-y-4 text-base sm:text-lg leading-relaxed">
              {selectedChapter.paragraphs.map((para, idx) => {
                const isCurrent = isPlaying && currentParagraph === idx;
                return (
                  <p
                    key={idx}
                    ref={(el) => (paragraphRefs.current[idx] = el)}
                    onClick={() => handlePlayChapter(selectedChapter, idx)}
                    className={`font-serif-literary p-3.5 rounded-xl cursor-pointer transition-all duration-300 ${
                      isCurrent
                        ? "bg-cyan-950/40 border-l-4 border-cyan-400 text-cyan-100 shadow-md pl-4 font-medium"
                        : highContrast
                        ? "text-slate-100 hover:bg-slate-900/50"
                        : "text-slate-300 hover:bg-slate-900/40 hover:text-slate-100"
                    }`}
                  >
                    {para}
                  </p>
                );
              })}
            </div>
          </div>

          {/* Key Lessons & Reflection Accordion */}
          <div className="mt-8 pt-6 border-t border-slate-800/80 space-y-4">
            <button
              onClick={() => setShowReflections(!showReflections)}
              className="w-full flex items-center justify-between p-4 rounded-2xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 transition-colors"
            >
              <div className="flex items-center space-x-2 text-amber-300 font-display text-sm font-bold">
                <Lightbulb className="w-4 h-4 text-amber-400" />
                <span>Lecciones Clave & Ejercicio de Reflexión</span>
              </div>
              <span className="text-xs text-slate-400 font-mono">
                {showReflections ? "Ocultar ▲" : "Ver lecciones ▼"}
              </span>
            </button>

            {showReflections && (
              <div className="p-5 rounded-2xl bg-amber-950/10 border border-amber-500/20 space-y-4 animate-fade-in">
                <div>
                  <h5 className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wide mb-2">
                    ✦ Enseñanzas de este capítulo:
                  </h5>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                    {selectedChapter.keyLessons.map((lesson, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <span className="text-amber-400 font-bold">▪</span>
                        <span>{lesson}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-amber-500/20">
                  <h5 className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wide mb-1.5">
                    ✦ Pregunta para tu taller íntimo:
                  </h5>
                  <p className="font-serif-literary text-sm sm:text-base text-slate-200 italic">
                    "{selectedChapter.reflectionPrompt}"
                  </p>
                  
                  {onSendToWorkshop && (
                    <button
                      onClick={() => onSendToWorkshop(selectedChapter.reflectionPrompt, selectedChapter.title)}
                      className="mt-3 px-3.5 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-medium transition-colors flex items-center space-x-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Llevar esta pregunta al Taller de Transmutación →</span>
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
