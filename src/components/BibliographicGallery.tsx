import React, { useState, useMemo } from "react";
import {
  BookOpen,
  Sparkles,
  ExternalLink,
  Feather,
  Star,
  CheckCircle,
  Search,
  Filter,
  Compass,
  Volume2,
  VolumeX,
  Copy,
  Check,
  Scale,
  BrainCircuit,
  Lightbulb,
  Heart,
  HelpCircle,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  BookText
} from "lucide-react";
import { RECOMMENDED_BOOKS, BOOK_CATEGORIES, RecommendedBook } from "../data/recommendedBooks";
import { readParagraphs, stopSpeech } from "../utils/speechEngine";

interface BibliographicGalleryProps {
  onSelectBookForInspiration?: (book: RecommendedBook) => void;
}

interface AnalysisResult {
  summary: string;
  literaryCommentary: string;
  bibliotherapyReflection: string;
  practicalExercise?: string;
  reflectiveQuestion?: string;
  quoteDisclaimer?: string;
  isOfflineFallback?: boolean;
}

export const BibliographicGallery: React.FC<BibliographicGalleryProps> = ({ onSelectBookForInspiration }) => {
  const [selectedBook, setSelectedBook] = useState<RecommendedBook>(RECOMMENDED_BOOKS[0]);
  const [activeCategory, setActiveCategory] = useState<string>("Todos los Géneros");
  const [searchQuery, setSearchQuery] = useState<string>(" ");
  const [activeTab, setActiveTab] = useState<"fragmento" | "analisis" | "leccion">("fragmento");
  
  // AI analysis state
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisMap, setAnalysisMap] = useState<Record<string, AnalysisResult>>({});
  const [copied, setCopied] = useState(false);
  const [isNarrating, setIsNarrating] = useState(false);

  // Initialize search query as empty
  const [realSearch, setRealSearch] = useState("");

  const filteredBooks = useMemo(() => {
    return RECOMMENDED_BOOKS.filter((book) => {
      const matchesCategory =
        activeCategory === "Todos los Géneros" || book.category === activeCategory;
      const q = realSearch.toLowerCase().trim();
      const matchesSearch =
        !q ||
        book.title.toLowerCase().includes(q) ||
        book.author.toLowerCase().includes(q) ||
        book.shortSummary.toLowerCase().includes(q) ||
        book.badge.toLowerCase().includes(q) ||
        book.coreQuote.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, realSearch]);

  const currentAnalysis = analysisMap[selectedBook.id];
  const excerptText = selectedBook.excerpt || selectedBook.coreQuote;

  // Handle generating AI analysis using Derecho de Cita
  const handleGenerateAnalysis = async () => {
    if (isAnalyzing) return;
    setIsAnalyzing(true);
    setActiveTab("analisis");
    
    try {
      const response = await fetch("/api/analyze-excerpt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookTitle: selectedBook.title,
          bookAuthor: selectedBook.author,
          excerpt: excerptText,
          category: selectedBook.category,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error en servidor: ${response.statusText}`);
      }

      const data: AnalysisResult = await response.json();
      setAnalysisMap((prev) => ({
        ...prev,
        [selectedBook.id]: data,
      }));
    } catch (err) {
      console.warn("Analysis fallback trigger:", err);
      // Client-side fallback if server fails
      const fallbackAnalysis: AnalysisResult = {
        summary: `En "${selectedBook.title}", ${selectedBook.author} expone una premisa transformadora: el poder del ser humano para hallar libertad, significado y serenidad aun en medio de las circunstancias más desafiantes.`,
        literaryCommentary: `La fuerza poética y filosófica del fragmento radica en su elocuencia concisa y su apelación directa a la auto-soberanía del lector, despojando al sufrimiento de su carga reactiva.`,
        bibliotherapyReflection: `Al integrar esta lección, el lector reprograma su respuesta ante la adversidad, pasando de la queja estéril a la creación consciente y a la calma somática.`,
        practicalExercise: "Inhala profundamente en 4 segundos, sostén 4 segundos pensando en esta cita, y exhala soltando el control de lo externo en 6 segundos.",
        reflectiveQuestion: "¿Qué significado más elevado y sanador puedes atribuirle hoy a los obstáculos que enfrentas?",
        quoteDisclaimer: `Análisis pedagógico y crítico generado bajo el Derecho de Cita (Art. 32 LPI / Fair Use) sobre la obra original de ${selectedBook.author}.`,
        isOfflineFallback: true,
      };

      setAnalysisMap((prev) => ({
        ...prev,
        [selectedBook.id]: fallbackAnalysis,
      }));
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleCopyExcerpt = () => {
    const textToCopy = `"${excerptText}"\n— ${selectedBook.author}, «${selectedBook.title}» (${selectedBook.year})\n[Compartido desde El Alquimista Literario • Biblioteca Esencial]`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNarrateExcerpt = () => {
    if (isNarrating) {
      stopSpeech();
      setIsNarrating(false);
    } else {
      setIsNarrating(true);
      const textToRead = `Fragmento de ${selectedBook.title}, por ${selectedBook.author}. ${excerptText}. Lección alquímica: ${selectedBook.alchemicalLesson}`;
      readParagraphs([textToRead], {
        rate: 0.9,
        onEnd: () => setIsNarrating(false),
        onError: () => setIsNarrating(false),
      });
    }
  };

  return (
    <section id="galeria-bibliografica" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10 scroll-mt-24">
      
      {/* SECTION HEADER BLOCK */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950/30 border border-amber-500/30 p-6 sm:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-mono font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>Módulo 01 • Lectura, Análisis IA & Recomendación</span>
            </div>
            
            <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
              Biblioteca Esencial de Transformación Humana
            </h2>
            
            <p className="font-serif-literary text-slate-300 text-base sm:text-lg leading-relaxed">
              Explora fragmentos cortos de 26 obras maestras de la psicología, la logoterapia y la presencia. Analiza su profundidad con la IA de Google AI Studio bajo el <strong className="text-amber-200">Derecho de Cita</strong> (Art. 32 LPI / Fair Use) y accede a la obra completa original.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono text-slate-400">
              <span className="flex items-center space-x-1.5 text-emerald-400 bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-500/30">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Derecho de Cita Educativo</span>
              </span>
              <span className="flex items-center space-x-1.5 text-cyan-300 bg-cyan-950/40 px-3 py-1 rounded-full border border-cyan-500/30">
                <BrainCircuit className="w-3.5 h-3.5" />
                <span>Análisis con Google AI Studio</span>
              </span>
              <span className="flex items-center space-x-1.5 text-amber-300 bg-amber-950/40 px-3 py-1 rounded-full border border-amber-500/30">
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Enlaces Directos a Autores</span>
              </span>
            </div>
          </div>

          {/* Strategic Warm Imagery / Metric Card */}
          <div className="lg:w-80 shrink-0 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            <div className="relative rounded-xl overflow-hidden aspect-[16/9] border border-amber-500/20 shadow-inner group">
              <img
                src="https://images.unsplash.com/photo-1507842229451-9f01079ca4b5?auto=format&fit=crop&w=600&q=80"
                alt="Santuario de Libros y Lectura Cálida"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              <div className="absolute bottom-2.5 left-3 right-3 text-center">
                <span className="text-[11px] font-mono text-amber-300 font-semibold drop-shadow">
                  ⚗️ Santuario de Sabiduría Universal
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs font-mono text-slate-300 pt-1 border-t border-slate-800/80">
              <span className="text-slate-400">Total Obras:</span>
              <strong className="text-amber-400 text-sm font-bold">{RECOMMENDED_BOOKS.length} Títulos</strong>
            </div>
          </div>
        </div>
      </div>

      {/* SEARCH AND CATEGORY FILTER CONTROLS */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          {/* Search Input */}
          <div className="relative w-full sm:max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={realSearch}
              onChange={(e) => setRealSearch(e.target.value)}
              placeholder="Buscar por libro, autor, concepto o cita..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500/60 transition-colors shadow-inner"
            />
            {realSearch && (
              <button
                onClick={() => setRealSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                Limpiar
              </button>
            )}
          </div>

          <div className="flex items-center space-x-2 text-xs font-mono text-slate-400 self-start sm:self-auto">
            <Filter className="w-3.5 h-3.5 text-amber-400" />
            <span>Mostrando: <strong className="text-amber-300">{filteredBooks.length}</strong> de {RECOMMENDED_BOOKS.length} obras</span>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 no-scrollbar">
          {BOOK_CATEGORIES.map((cat) => {
            const isCatActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all flex items-center space-x-1.5 ${
                  isCatActive
                    ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-950/40 scale-102"
                    : "bg-slate-900/80 text-slate-400 border border-slate-800 hover:text-white hover:bg-slate-800/80"
                }`}
              >
                <span>{cat}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* FEATURED READING & AI ANALYSIS SPOTLIGHT HUB (MÓDULO 01 CORE) */}
      {selectedBook && (
        <div className="bg-gradient-to-b from-slate-900 via-[#070b14] to-slate-950 border-2 border-amber-500/50 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl space-y-8 relative overflow-hidden transition-all duration-300">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

          {/* Top meta strip */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div className="flex items-center space-x-2">
              <span className={`text-xs font-mono px-3 py-1 rounded-full border backdrop-blur-md ${selectedBook.badgeColor}`}>
                {selectedBook.badge}
              </span>
              <span className="text-xs font-mono text-slate-400 bg-slate-950/80 px-2.5 py-1 rounded-md border border-slate-800">
                Año {selectedBook.year}
              </span>
            </div>

            {/* View Mode Tabs */}
            <div className="flex items-center bg-slate-950/80 p-1 rounded-xl border border-slate-800 text-xs font-mono">
              <button
                onClick={() => setActiveTab("fragmento")}
                className={`px-3 py-1.5 rounded-lg transition-colors flex items-center space-x-1.5 ${
                  activeTab === "fragmento"
                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <BookText className="w-3.5 h-3.5" />
                <span>Fragmento / Cita</span>
              </button>
              <button
                onClick={() => {
                  if (!currentAnalysis && !isAnalyzing) {
                    handleGenerateAnalysis();
                  } else {
                    setActiveTab("analisis");
                  }
                }}
                className={`px-3 py-1.5 rounded-lg transition-colors flex items-center space-x-1.5 ${
                  activeTab === "analisis"
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <BrainCircuit className="w-3.5 h-3.5 text-cyan-400" />
                <span>Análisis IA (Derecho de Cita)</span>
                {currentAnalysis && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />}
              </button>
              <button
                onClick={() => setActiveTab("leccion")}
                className={`px-3 py-1.5 rounded-lg transition-colors flex items-center space-x-1.5 ${
                  activeTab === "leccion"
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Compass className="w-3.5 h-3.5 text-emerald-400" />
                <span>Aplicación Alquímica</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Book Cover, Author Bio, and Strategic Warm Visual (4 Cols) */}
            <div className="lg:col-span-4 space-y-5">
              <div className="rounded-2xl overflow-hidden aspect-[3/4] max-w-[280px] mx-auto lg:max-w-none bg-slate-900 border border-amber-500/30 shadow-2xl relative group">
                <img
                  src={selectedBook.coverImage}
                  alt={selectedBook.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                
                <div className="absolute bottom-3 left-3 right-3">
                  <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider block">
                    {selectedBook.category}
                  </span>
                  <h4 className="font-display text-lg font-bold text-white leading-tight drop-shadow">
                    {selectedBook.title}
                  </h4>
                  <p className="text-xs font-serif-literary text-amber-200 mt-0.5">
                    {selectedBook.author}
                  </p>
                </div>
              </div>

              {/* Book Summary Card */}
              <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800/90 space-y-2 text-xs">
                <span className="font-mono text-amber-400 font-bold uppercase tracking-wider block text-[10px]">
                  Resumen de la Obra:
                </span>
                <p className="text-slate-300 leading-relaxed">
                  {selectedBook.shortSummary}
                </p>
                <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex items-center space-x-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span><strong>Efecto Somático:</strong> {selectedBook.targetTherapeuticBenefit}</span>
                </div>
              </div>

              {/* Author & Legal Citation Badge */}
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] font-mono text-slate-400 flex items-center space-x-2">
                <Scale className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Cita pedagógica protegida por el Art. 32 LPI / Fair Use.</span>
              </div>
            </div>

            {/* Right Column: Excerpt, AI Analysis, and Action CTAs (8 Cols) */}
            <div className="lg:col-span-8 space-y-6">

              {/* Title & Author Head */}
              <div>
                <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-widest block mb-1">
                  Lectura Guiada & Análisis
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-white leading-tight">
                  {selectedBook.title}
                </h3>
                <p className="font-serif-literary text-base sm:text-lg text-amber-300/90 mt-1">
                  Por {selectedBook.author} ({selectedBook.year})
                </p>
              </div>

              {/* TAB 1: FRAGMENTO DE LECTURA */}
              {activeTab === "fragmento" && (
                <div className="space-y-4 animate-fade-in">
                  <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-amber-950/20 via-slate-900/90 to-slate-950 border border-amber-500/40 relative group shadow-xl">
                    <div className="flex items-center justify-between mb-3 text-xs font-mono text-amber-400">
                      <span className="flex items-center space-x-1.5 font-bold uppercase tracking-wider">
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                        <span>Fragmento Seleccionado para Reflexión:</span>
                      </span>
                      
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={handleNarrateExcerpt}
                          className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors flex items-center space-x-1 text-[11px]"
                          title="Escuchar locución"
                        >
                          {isNarrating ? <VolumeX className="w-3.5 h-3.5 text-rose-400" /> : <Volume2 className="w-3.5 h-3.5 text-cyan-400" />}
                          <span>{isNarrating ? "Pausar" : "Escuchar"}</span>
                        </button>
                        <button
                          onClick={handleCopyExcerpt}
                          className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors flex items-center space-x-1 text-[11px]"
                          title="Copiar cita"
                        >
                          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-amber-400" />}
                          <span>{copied ? "¡Copiado!" : "Copiar"}</span>
                        </button>
                      </div>
                    </div>

                    <blockquote className="font-serif-literary text-lg sm:text-2xl text-amber-100/95 italic leading-relaxed pl-3 sm:pl-4 border-l-2 border-amber-500/70 my-4">
                      "{excerptText}"
                    </blockquote>

                    <p className="text-right text-xs font-mono text-amber-400/90">
                      — {selectedBook.author}, <em>{selectedBook.title}</em>
                    </p>
                  </div>

                  {/* Highlight banner prompting to analyze with AI */}
                  <div className="p-4 rounded-2xl bg-cyan-950/25 border border-cyan-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-1.5 text-xs font-mono font-bold text-cyan-300 uppercase">
                        <BrainCircuit className="w-4 h-4 text-cyan-400" />
                        <span>¿Deseas profundizar en este pasaje?</span>
                      </div>
                      <p className="text-xs text-slate-300">
                        Nuestra IA de Google AI Studio analiza la tesis, el comentario literario y el impacto biblioterapéutico en segundos.
                      </p>
                    </div>

                    <button
                      onClick={handleGenerateAnalysis}
                      disabled={isAnalyzing}
                      className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs font-mono flex items-center justify-center space-x-2 shadow-lg shadow-cyan-950/40 transition-all hover:scale-105 active:scale-95 shrink-0"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>{isAnalyzing ? "Analizando con IA..." : "✨ Generar Análisis con IA (Derecho de Cita)"}</span>
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 2: ANÁLISIS GENERADO CON GOOGLE AI STUDIO */}
              {activeTab === "analisis" && (
                <div className="space-y-4 animate-fade-in">
                  {isAnalyzing ? (
                    <div className="p-10 rounded-2xl bg-slate-950/80 border border-cyan-500/40 text-center space-y-4">
                      <div className="w-12 h-12 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin mx-auto" />
                      <h4 className="font-display text-lg text-cyan-200 font-bold">
                        Consultando a Google AI Studio...
                      </h4>
                      <p className="font-serif-literary text-xs text-slate-400 max-w-md mx-auto">
                        Aplicando hermenéutica literaria y biblioterapia al fragmento de «{selectedBook.title}» bajo el Derecho de Cita.
                      </p>
                    </div>
                  ) : currentAnalysis ? (
                    <div className="space-y-4">
                      {/* Structured Analysis Cards */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        
                        {/* Summary Card */}
                        <div className="p-5 rounded-2xl bg-slate-900/80 border border-amber-500/30 space-y-2">
                          <div className="flex items-center space-x-1.5 text-xs font-mono text-amber-400 font-bold uppercase">
                            <BookOpen className="w-4 h-4 text-amber-400" />
                            <span>1. Resumen Esencial & Tesis:</span>
                          </div>
                          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                            {currentAnalysis.summary}
                          </p>
                        </div>

                        {/* Literary Commentary Card */}
                        <div className="p-5 rounded-2xl bg-slate-900/80 border border-cyan-500/30 space-y-2">
                          <div className="flex items-center space-x-1.5 text-xs font-mono text-cyan-300 font-bold uppercase">
                            <Feather className="w-4 h-4 text-cyan-400" />
                            <span>2. Comentario Literario & Estilo:</span>
                          </div>
                          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                            {currentAnalysis.literaryCommentary}
                          </p>
                        </div>

                        {/* Bibliotherapy Reflection */}
                        <div className="p-5 rounded-2xl bg-slate-900/80 border border-emerald-500/30 space-y-2">
                          <div className="flex items-center space-x-1.5 text-xs font-mono text-emerald-300 font-bold uppercase">
                            <Heart className="w-4 h-4 text-emerald-400" />
                            <span>3. Aplicación Biblioterapéutica:</span>
                          </div>
                          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                            {currentAnalysis.bibliotherapyReflection}
                          </p>
                        </div>

                        {/* Socratic Question & Exercise */}
                        <div className="p-5 rounded-2xl bg-slate-900/80 border border-purple-500/30 space-y-2">
                          <div className="flex items-center space-x-1.5 text-xs font-mono text-purple-300 font-bold uppercase">
                            <HelpCircle className="w-4 h-4 text-purple-400" />
                            <span>4. Pregunta de Reflexión:</span>
                          </div>
                          <p className="text-xs sm:text-sm text-purple-200 italic leading-relaxed">
                            "{currentAnalysis.reflectiveQuestion || '¿Cómo resuena esta enseñanza con tu momento presente?'}"
                          </p>
                          {currentAnalysis.practicalExercise && (
                            <div className="pt-2 border-t border-purple-900/50 text-[11px] text-slate-400">
                              <strong>Práctica Somática:</strong> {currentAnalysis.practicalExercise}
                            </div>
                          )}
                        </div>

                      </div>

                      {/* Disclaimer Strip */}
                      <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[10px] font-mono text-slate-400 flex items-center justify-between">
                        <span>⚖️ {currentAnalysis.quoteDisclaimer}</span>
                        <button
                          onClick={handleGenerateAnalysis}
                          className="text-amber-400 hover:text-amber-300 underline"
                        >
                          Volver a analizar
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-8 rounded-2xl bg-slate-950/60 border border-slate-800 text-center space-y-3">
                      <p className="text-xs text-slate-400 font-mono">
                        Aún no se ha generado el análisis de este fragmento.
                      </p>
                      <button
                        onClick={handleGenerateAnalysis}
                        className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs font-mono transition-all"
                      >
                        Generar Análisis Ahora
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: LECCIÓN Y APLICACIÓN ALQUÍMICA */}
              {activeTab === "leccion" && (
                <div className="space-y-4 animate-fade-in">
                  <div className="p-6 rounded-2xl bg-slate-900/90 border border-emerald-500/40 space-y-3">
                    <h5 className="text-xs font-mono text-emerald-300 font-bold uppercase tracking-wide flex items-center space-x-1.5">
                      <Compass className="w-4 h-4 text-emerald-400" />
                      <span>Cómo integrar esta obra en tu Crisol Lírico:</span>
                    </h5>
                    <p className="text-sm text-slate-200 leading-relaxed font-serif-literary sm:text-base">
                      {selectedBook.alchemicalLesson}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-1">
                    <span className="font-mono text-amber-400 font-bold text-[10px] uppercase">
                      Beneficio Terapéutico Específico:
                    </span>
                    <p>{selectedBook.targetTherapeuticBenefit}</p>
                  </div>
                </div>
              )}

              {/* MANDATORY ACTION BUTTONS (MÓDULO 01 CTAs) */}
              <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                
                {/* Secondary AI & Workshop Buttons */}
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={handleGenerateAnalysis}
                    disabled={isAnalyzing}
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600/90 to-blue-600/90 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs font-mono flex items-center space-x-2 shadow-md transition-all hover:scale-105 active:scale-95"
                  >
                    <BrainCircuit className="w-4 h-4 text-cyan-200" />
                    <span>{isAnalyzing ? "Analizando..." : "Análisis con IA (Derecho de Cita)"}</span>
                  </button>

                  {onSelectBookForInspiration && (
                    <button
                      onClick={() => onSelectBookForInspiration(selectedBook)}
                      className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 hover:text-amber-200 border border-amber-500/40 font-bold text-xs font-mono flex items-center space-x-1.5 transition-all hover:scale-105"
                    >
                      <Feather className="w-4 h-4 text-amber-400" />
                      <span>Transmutar en el Taller</span>
                    </button>
                  )}
                </div>

                {/* PROMINENT CTA: "Obtener obra completa" (Author's official product link) */}
                <a
                  href={selectedBook.amazonOrReadUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-400 hover:via-yellow-300 hover:to-amber-400 text-slate-950 font-bold text-xs sm:text-sm font-mono flex items-center justify-center space-x-2 shadow-xl shadow-amber-950/50 transition-all hover:scale-105 active:scale-95 group text-center"
                >
                  <ShoppingBag className="w-4 h-4 text-slate-950" />
                  <span>Obtener obra completa</span>
                  <ExternalLink className="w-4 h-4 text-slate-950 transition-transform group-hover:translate-x-0.5" />
                </a>

              </div>

            </div>

          </div>

        </div>
      )}

      {/* CATALOG GRID: 26 MASTERWORKS (COMPREHENSIVE BROWSER) */}
      <div className="space-y-4 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-slate-400 border-b border-slate-800/80 pb-3">
          <span className="font-bold text-slate-200">
            Catálogo Completo de la Biblioteca ({filteredBooks.length} Obras):
          </span>
          <span>Haz clic en cualquier obra para leer su fragmento, generar análisis con IA o adquirirla</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredBooks.map((book) => {
            const isSelected = selectedBook?.id === book.id;
            return (
              <div
                key={book.id}
                onClick={() => {
                  setSelectedBook(book);
                  setActiveTab("fragmento");
                }}
                className={`group cursor-pointer rounded-2xl border transition-all duration-300 flex flex-col overflow-hidden ${
                  isSelected
                    ? "bg-slate-900 border-amber-500/80 shadow-2xl shadow-amber-950/50 ring-2 ring-amber-500/50 scale-[1.02]"
                    : "bg-slate-950/80 border-slate-800/90 hover:border-amber-500/40 hover:bg-slate-900/60"
                }`}
              >
                {/* Book Cover Container */}
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-slate-900">
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                  
                  {/* Top Badges */}
                  <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
                    <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full border backdrop-blur-md ${book.badgeColor}`}>
                      {book.year}
                    </span>
                    {isSelected ? (
                      <span className="w-5 h-5 rounded-full bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center shadow-md">
                        ✓
                      </span>
                    ) : (
                      <span className="text-[9px] font-mono text-slate-400 bg-black/60 px-1.5 py-0.5 rounded backdrop-blur-sm">
                        {book.category.split("&")[0]}
                      </span>
                    )}
                  </div>

                  {/* Title at Cover Base */}
                  <div className="absolute bottom-2.5 left-2.5 right-2.5">
                    <h4 className="font-display text-xs font-bold text-white leading-tight drop-shadow-md line-clamp-2">
                      {book.title}
                    </h4>
                    <p className="text-[11px] font-serif-literary text-amber-300 mt-0.5 truncate">
                      {book.author}
                    </p>
                  </div>
                </div>

                {/* Card Info & CTAs */}
                <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2.5">
                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                    "{book.coreQuote}"
                  </p>
                  
                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono">
                    <span className="text-amber-400 font-semibold group-hover:underline flex items-center space-x-1">
                      <span>Leer cita</span>
                      <ArrowRight className="w-2.5 h-2.5" />
                    </span>

                    <a
                      href={book.amazonOrReadUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 px-2 py-1 rounded border border-slate-800 flex items-center space-x-1"
                      title="Obtener obra completa"
                    >
                      <span>Obtener</span>
                      <ExternalLink className="w-2.5 h-2.5 text-amber-400" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
};
