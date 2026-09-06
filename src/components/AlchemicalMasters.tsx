import React, { useState, useMemo } from "react";
import { Sparkles, Search, Copy, Check, Volume2, BookOpen, Feather, Heart, Star, ChevronRight, Globe, Filter, User, Compass, Bookmark } from "lucide-react";
import { ALCHEMICAL_POEMS, REFERENT_AUTHORS } from "../data/alchemicalPoems";
import { AlchemicalPoem, AuthorReference } from "../types";
import { readParagraphs, stopSpeech } from "../utils/speechEngine";

interface AlchemicalMastersProps {
  onIncorporatePoem: (verses: string, title: string, author: string) => void;
  onJumpToAudiobook?: () => void;
}

export const AlchemicalMasters: React.FC<AlchemicalMastersProps> = ({
  onIncorporatePoem,
  onJumpToAudiobook,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");
  const [selectedCountry, setSelectedCountry] = useState<string>("Todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [activePoem, setActivePoem] = useState<AlchemicalPoem>(ALCHEMICAL_POEMS[0]);
  const [selectedAuthor, setSelectedAuthor] = useState<AuthorReference | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [narratingId, setNarratingId] = useState<string | null>(null);
  const [authorViewMode, setAuthorViewMode] = useState<"grid" | "alphabetical">("grid");

  const categories = ["Todos", "Sanación", "Superación", "Espiritual", "Inspiración", "Motivacional", "Filosófico"];
  
  // Extract unique countries
  const countries = useMemo(() => {
    const list = new Set<string>();
    REFERENT_AUTHORS.forEach((a) => {
      if (a.country) list.add(a.country);
    });
    return ["Todos", ...Array.from(list)];
  }, []);

  // Filtered authors
  const filteredAuthors = useMemo(() => {
    return REFERENT_AUTHORS.filter((a) => {
      const matchesCountry = selectedCountry === "Todos" || a.country === selectedCountry;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        a.name.toLowerCase().includes(q) ||
        (a.formattedName && a.formattedName.toLowerCase().includes(q)) ||
        (a.country && a.country.toLowerCase().includes(q)) ||
        a.tagline.toLowerCase().includes(q) ||
        a.badge.toLowerCase().includes(q);
      return matchesCountry && matchesSearch;
    });
  }, [selectedCountry, searchQuery]);

  // Filtered poems
  const filteredPoems = useMemo(() => {
    return ALCHEMICAL_POEMS.filter((p) => {
      const matchesCat = selectedCategory === "Todos" || p.category === selectedCategory;
      const matchesCountry =
        selectedCountry === "Todos" ||
        (p.centuryOrEra && p.centuryOrEra.toLowerCase().includes(selectedCountry.toLowerCase()));
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.author.toLowerCase().includes(q) ||
        p.verses.toLowerCase().includes(q) ||
        p.note.toLowerCase().includes(q);
      return matchesCat && matchesCountry && matchesSearch;
    });
  }, [selectedCategory, selectedCountry, searchQuery]);

  const handleSelectAuthor = (author: AuthorReference) => {
    if (selectedAuthor?.id === author.id) {
      setSelectedAuthor(null);
    } else {
      setSelectedAuthor(author);
      // Try to find author's poem in ALCHEMICAL_POEMS
      const authorPoem = ALCHEMICAL_POEMS.find(
        (p) =>
          p.author.toLowerCase().includes(author.name.toLowerCase()) ||
          author.name.toLowerCase().includes(p.author.toLowerCase()) ||
          (author.featuredWorkTitle && p.title.toLowerCase().includes(author.featuredWorkTitle.toLowerCase()))
      );
      if (authorPoem) {
        setActivePoem(authorPoem);
      }
    }
  };

  const handleCopy = (poem: AlchemicalPoem) => {
    const text = `${poem.title} — ${poem.author}\n\n${poem.verses}\n\n[Leído en El Alquimista Literario - Biblioteca de Sabiduría]`;
    navigator.clipboard.writeText(text);
    setCopiedId(poem.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleNarrate = (poem: AlchemicalPoem) => {
    if (narratingId === poem.id) {
      stopSpeech();
      setNarratingId(null);
    } else {
      setNarratingId(poem.id);
      const lines = poem.verses.split("\n").filter((l) => l.trim().length > 0);
      readParagraphs([`${poem.title}, de ${poem.author}`, ...lines, `Nota lírica: ${poem.note}`], {
        rate: 0.95,
        onEnd: () => setNarratingId(null),
        onError: () => setNarratingId(null),
      });
    }
  };

  return (
    <section id="referentes-clasicos" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      
      {/* Header */}
      <div className="border-b border-slate-800 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-purple-400 text-xs font-mono font-semibold uppercase tracking-wider mb-2">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
            <span>Módulo 03 • Maestros de la Transmutación Poética</span>
          </div>
          <h2 className="font-display text-2xl sm:text-4xl font-bold text-white">
            Grandes Maestros de la Transmutación Lírica
          </h2>
          <p className="font-serif-literary text-slate-300 text-base sm:text-lg mt-1 max-w-3xl">
            Un corpus inmortal de poetas latinoamericanos y universales cuyas palabras transmutan el dolor, la pérdida, el exilio y la soledad en soberanía interior, resiliencia y luz.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          <button
            onClick={() => setAuthorViewMode(authorViewMode === "grid" ? "alphabetical" : "grid")}
            className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-purple-500/50 text-xs font-mono text-slate-300 flex items-center space-x-1.5 transition-all"
          >
            <Compass className="w-4 h-4 text-purple-400" />
            <span>{authorViewMode === "grid" ? "Ver Índice Alfabético" : "Ver Cuadrícula de Cartas"}</span>
          </button>
        </div>
      </div>

      {/* Country Filters & Search */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-950/90 border border-slate-800 p-4 rounded-2xl">
          
          {/* Countries / Origin Filter */}
          <div className="flex items-center space-x-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 no-scrollbar">
            <span className="text-xs font-mono text-slate-400 flex items-center mr-1 whitespace-nowrap">
              <Globe className="w-3.5 h-3.5 mr-1 text-purple-400" /> País:
            </span>
            {countries.map((country) => (
              <button
                key={country}
                onClick={() => setSelectedCountry(country)}
                className={`px-3 py-1 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                  selectedCountry === country
                    ? "bg-purple-500/20 text-purple-300 border border-purple-500/60 font-bold shadow-sm"
                    : "bg-slate-900 text-slate-400 hover:text-white border border-transparent"
                }`}
              >
                {country}
              </button>
            ))}
          </div>

          {/* Quick Search */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar poeta, país o verso..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-purple-500/60 transition-all"
            />
          </div>
        </div>

        {/* Featured Authors View: Alphabetical List or Cards */}
        {authorViewMode === "alphabetical" ? (
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <span className="text-xs font-mono text-purple-300 uppercase tracking-wider font-semibold">
                ✦ Índice Oficial de Autores ({filteredAuthors.length} Poetas)
              </span>
              <span className="text-[11px] font-mono text-slate-500">
                Organizado Apellido, Nombre (País)
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {filteredAuthors.map((author) => {
                const isSelected = selectedAuthor?.id === author.id;
                return (
                  <button
                    key={author.id}
                    onClick={() => handleSelectAuthor(author)}
                    className={`text-left p-3 rounded-xl border text-xs transition-all flex items-center justify-between group ${
                      isSelected
                        ? "bg-purple-950/40 border-purple-500/80 text-white shadow-md shadow-purple-950/40"
                        : "bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900"
                    }`}
                  >
                    <div className="truncate pr-2">
                      <p className="font-semibold text-white group-hover:text-purple-300 transition-colors truncate">
                        {author.formattedName || `${author.name} (${author.country})`}
                      </p>
                      <p className="text-[10px] text-slate-400 font-mono truncate mt-0.5">
                        {author.badge}
                      </p>
                    </div>
                    <ChevronRight className={`w-3.5 h-3.5 shrink-0 transition-transform ${isSelected ? "text-purple-400 translate-x-0.5" : "text-slate-600 group-hover:text-slate-400"}`} />
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wide">
                ✦ Maestros de la Transmutación Poética ({filteredAuthors.length}):
              </span>
              <span className="text-xs font-mono text-slate-500">
                Haz clic en cualquier autor para explorar su obra
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
              {filteredAuthors.map((author) => {
                const isSelected = selectedAuthor?.id === author.id;
                return (
                  <div
                    key={author.id}
                    onClick={() => handleSelectAuthor(author)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? "bg-purple-950/40 border-purple-500/80 shadow-lg shadow-purple-950/40 scale-[1.02]"
                        : "bg-slate-950/80 border-slate-800 hover:border-slate-700 hover:bg-slate-900/80"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${author.accentBg} ${author.textColor} ${author.accentBorder}`}>
                          {author.badge}
                        </span>
                        {author.country && (
                          <span className="text-[10px] font-mono text-slate-400">
                            {author.country}
                          </span>
                        )}
                      </div>
                      <h4 className="font-display text-sm font-bold text-white group-hover:text-purple-300">
                        {author.formattedName || author.name}
                      </h4>
                      <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                        {author.era}
                      </p>
                      <p className="text-xs text-slate-300 mt-2 line-clamp-2 italic leading-relaxed">
                        "{author.tagline}"
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-purple-400 font-mono">
                      <span>{author.featuredWorkTitle}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Selected Author Highlight Spotlight */}
      {selectedAuthor && (
        <div className="bg-gradient-to-r from-purple-950/30 via-slate-950/90 to-indigo-950/30 border border-purple-500/40 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`text-xs font-mono px-2.5 py-1 rounded-full border ${selectedAuthor.accentBg} ${selectedAuthor.textColor} ${selectedAuthor.accentBorder} font-bold`}>
                  ✦ {selectedAuthor.badge}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  {selectedAuthor.era}
                </span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
                {selectedAuthor.formattedName || selectedAuthor.name}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {selectedAuthor.bio}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 font-serif-literary italic">
                <span className="font-mono text-purple-300 font-bold not-italic mr-1.5">Fragmento Destacado:</span>
                "{selectedAuthor.featuredWorkExcerpt}"
              </div>
            </div>

            <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 shrink-0 w-full md:w-auto">
              <button
                onClick={() => {
                  const authorPoem = ALCHEMICAL_POEMS.find(
                    (p) =>
                      p.author.toLowerCase().includes(selectedAuthor.name.toLowerCase()) ||
                      selectedAuthor.name.toLowerCase().includes(p.author.toLowerCase()) ||
                      (selectedAuthor.featuredWorkTitle && p.title.toLowerCase().includes(selectedAuthor.featuredWorkTitle.toLowerCase()))
                  );
                  if (authorPoem) {
                    setActivePoem(authorPoem);
                    const element = document.getElementById("lector-poema-completo");
                    if (element) element.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold font-mono transition-all flex items-center justify-center space-x-2 shadow-lg shadow-purple-950/50"
              >
                <BookOpen className="w-4 h-4" />
                <span>Leer Poema Completo</span>
              </button>
              <button
                onClick={() => setSelectedAuthor(null)}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white text-xs font-mono transition-all text-center"
              >
                Cerrar Perfil
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Category Tabs for Poems */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 border-b border-slate-800 no-scrollbar">
        <span className="text-xs font-mono text-slate-400 mr-2 flex items-center shrink-0">
          <Filter className="w-3.5 h-3.5 mr-1 text-purple-400" /> Temática:
        </span>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? "bg-purple-500/20 text-purple-300 border border-purple-500/50 font-bold"
                : "bg-slate-900/80 text-slate-400 hover:text-white border border-transparent"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main Grid: Poems List + Full View */}
      <div id="lector-poema-completo" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Poem Cards (5 cols) */}
        <div className="lg:col-span-5 space-y-3 max-h-[720px] overflow-y-auto pr-1 custom-scrollbar">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-1 pb-1">
            <span>Poemas Disponibles ({filteredPoems.length})</span>
            <span>Selecciona para leer</span>
          </div>

          {filteredPoems.map((poem) => {
            const isSelected = activePoem.id === poem.id;
            return (
              <div
                key={poem.id}
                onClick={() => setActivePoem(poem)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? "bg-slate-900 border-purple-500/60 shadow-lg shadow-purple-950/40"
                    : "bg-slate-950/80 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-md border border-purple-500/30">
                      {poem.category}
                    </span>
                    <h4 className="font-display text-base font-bold text-white mt-1.5">
                      {poem.title}
                    </h4>
                    <p className="text-xs text-slate-400 font-mono">
                      {poem.author} • {poem.centuryOrEra}
                    </p>
                  </div>
                  <ChevronRight className={`w-4 h-4 mt-1 transition-transform ${isSelected ? "text-purple-400 translate-x-1" : "text-slate-600"}`} />
                </div>

                <p className="font-serif-literary text-xs text-slate-300 mt-2 line-clamp-2 italic leading-relaxed">
                  {poem.verses.split("\n")[0]}...
                </p>
              </div>
            );
          })}
        </div>

        {/* Right Column: Full Poem Reading & Action Hub (7 cols) */}
        <div className="lg:col-span-7 bg-slate-950/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 relative">
          
          {/* Header */}
          <div className="border-b border-slate-800 pb-5">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 text-xs font-mono font-bold">
                ✦ {activePoem.category} • {activePoem.archetype || "Sabiduría Clásica"}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {activePoem.centuryOrEra}
              </span>
            </div>

            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
              {activePoem.title}
            </h3>
            <p className="text-sm font-mono text-amber-300/90 mt-1">
              Por {activePoem.author}
            </p>
          </div>

          {/* Verses */}
          <div className="p-6 rounded-2xl bg-[#070b14] border border-slate-800/80">
            <p className="font-serif-literary text-lg sm:text-xl text-slate-200 leading-relaxed whitespace-pre-line italic">
              {activePoem.verses}
            </p>
          </div>

          {/* Note / Alchemical insight */}
          <div className="p-4 rounded-2xl bg-purple-950/20 border border-purple-500/30 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <strong className="text-purple-300 font-mono block mb-1">
              ✦ Clave de Sanación Literaria:
            </strong>
            {activePoem.note}
          </div>

          {/* Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800">
            <div className="flex items-center space-x-2">
              {/* Narrate */}
              <button
                onClick={() => handleNarrate(activePoem)}
                className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all flex items-center space-x-1.5 ${
                  narratingId === activePoem.id
                    ? "bg-purple-500 text-slate-950 font-bold"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white"
                }`}
              >
                <Volume2 className="w-4 h-4" />
                <span>{narratingId === activePoem.id ? "Pausar Recitación" : "Escuchar Recitado"}</span>
              </button>

              {/* Copy */}
              <button
                onClick={() => handleCopy(activePoem)}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium transition-all flex items-center space-x-1.5"
              >
                {copiedId === activePoem.id ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copiedId === activePoem.id ? "¡Copiado!" : "Copiar"}</span>
              </button>
            </div>

            {/* Incorporate in Workshop */}
            <button
              onClick={() => onIncorporatePoem(activePoem.verses, activePoem.title, activePoem.author)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white font-bold text-xs transition-all flex items-center space-x-1.5 shadow-md shadow-purple-950/40"
            >
              <Feather className="w-4 h-4" />
              <span>Usar como Inspiración en el Taller →</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
