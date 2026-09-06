import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { AudiobookPlayer } from "./components/AudiobookPlayer";
import { TransmutationWorkshop } from "./components/TransmutationWorkshop";
import { PeaceInStormVideo } from "./components/PeaceInStormVideo";
import { BibliographicGallery } from "./components/BibliographicGallery";
import { AlchemicalMasters } from "./components/AlchemicalMasters";
import { VagusBreathingGuide } from "./components/VagusBreathingGuide";
import { MonetizationGuides } from "./components/MonetizationGuides";
import { CommunitySanctuary } from "./components/CommunitySanctuary";
import { CardExportModal } from "./components/CardExportModal";
import { DiagnosticsModal } from "./components/DiagnosticsModal";
import { ManifestoModal } from "./components/ManifestoModal";
import { AlchemicalAnimatedLogo } from "./components/AlchemicalAnimatedLogo";
import { ClassicalAudioPlayer } from "./components/ClassicalAudioPlayer";
import { RecommendedBook } from "./data/recommendedBooks";
import { ArrowUp } from "lucide-react";

export function App() {
  const [highContrast, setHighContrast] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [diagnosticsOpen, setDiagnosticsOpen] = useState(false);
  const [manifestoOpen, setManifestoOpen] = useState(false);
  const [cardModalState, setCardModalState] = useState<{
    isOpen: boolean;
    title: string;
    verses: string;
    archetype?: string;
  }>({
    isOpen: false,
    title: "",
    verses: "",
    archetype: "El Plomo al Oro",
  });

  const [workshopInitialPrompt, setWorkshopInitialPrompt] = useState("");
  const [workshopInitialTitle, setWorkshopInitialTitle] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    if (id === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const elementMap: { [key: string]: string } = {
      audiolibro: "audiolibro-alquimista",
      taller: "taller-transmutacion",
      video: "video-paz-tormenta",
      bibliografia: "galeria-bibliografica",
      referentes: "referentes-clasicos",
      vago: "nervio-vago",
      monetizacion: "monetizacion-guias",
    };

    const targetId = elementMap[id] || id;
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleOpenCardModal = (title: string, verses: string, archetype?: string) => {
    setCardModalState({
      isOpen: true,
      title,
      verses,
      archetype: archetype || "El Plomo al Oro",
    });
  };

  const handleIncorporatePoemToWorkshop = (verses: string, title: string, author: string) => {
    setWorkshopInitialPrompt(`Inspirado en "${title}" de ${author}:\n\n"${verses}"\n\nMi propia vivencia íntima resonante es: `);
    setWorkshopInitialTitle(`Ecos de ${title}`);
    scrollToSection("taller");
  };

  const handleSendPromptFromAudiobook = (prompt: string, title: string) => {
    setWorkshopInitialPrompt(`Reflexión del ${title}:\n\n${prompt}\n\nMi respuesta íntima: `);
    setWorkshopInitialTitle(`Crisol del ${title}`);
    scrollToSection("taller");
  };

  const handleSendVideoQuoteToWorkshop = (quote: string) => {
    setWorkshopInitialPrompt(`Meditación "Paz en la Tormenta":\n"${quote}"\n\nMi desahogo y transmutación: `);
    setWorkshopInitialTitle("Paz en la Tormenta");
    scrollToSection("taller");
  };

  const handleSelectBookForInspiration = (book: RecommendedBook) => {
    setWorkshopInitialPrompt(`Inspirado en la lección de "${book.title}" (${book.author}):\n"${book.coreQuote}"\n\nMi sentir actual para el crisol es: `);
    setWorkshopInitialTitle(`Alquimia de ${book.title}`);
    scrollToSection("taller");
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 font-sans ${
      highContrast
        ? "bg-black text-slate-100 high-contrast-mode"
        : "bg-[#04060c] text-slate-200"
    }`}>
      
      {/* Navbar */}
      <Navbar
        highContrast={highContrast}
        onToggleContrast={() => setHighContrast(!highContrast)}
        onOpenDiagnostics={() => setDiagnosticsOpen(true)}
        onOpenManifesto={() => setManifestoOpen(true)}
        activeSection={activeSection}
        onSelectSection={scrollToSection}
      />

      {/* Main Content Sections */}
      <main className="space-y-16 sm:space-y-24 pb-20">
        
        {/* Atmospheric Hero with Interactive Melodic Frame "El Abrazo del Alquimista" */}
        <HeroSection
          onNavigate={scrollToSection}
          onOpenManifesto={() => setManifestoOpen(true)}
          onSendToWorkshop={(prompt, title) => {
            setWorkshopInitialPrompt(prompt);
            setWorkshopInitialTitle(title);
            scrollToSection("taller");
          }}
        />

        {/* Module 1: Audiolibro Oficial (7 Capítulos) */}
        <AudiobookPlayer
          highContrast={highContrast}
          onSendToWorkshop={handleSendPromptFromAudiobook}
        />

        {/* Module 2: Taller de Transmutación IA */}
        <TransmutationWorkshop
          initialPrompt={workshopInitialPrompt}
          initialTitle={workshopInitialTitle}
          onOpenCardModal={handleOpenCardModal}
          onJumpToMonetization={() => scrollToSection("monetizacion")}
        />

        {/* Module 3: Ventana Visual "Paz en la Tormenta" (Video con subtítulos) */}
        <PeaceInStormVideo onSendToWorkshop={handleSendVideoQuoteToWorkshop} />

        {/* Module 4: Galería Bibliográfica Recomendada (5 Obras) */}
        <BibliographicGallery onSelectBookForInspiration={handleSelectBookForInspiration} />

        {/* Module 5: Referentes Líricos Clásicos */}
        <AlchemicalMasters
          onIncorporatePoem={handleIncorporatePoemToWorkshop}
          onJumpToAudiobook={() => scrollToSection("audiolibro")}
        />

        {/* Module 6: Regulación del Nervio Vago */}
        <VagusBreathingGuide />

        {/* Module 7: Autopublicación & Dossier PDF */}
        <MonetizationGuides />

        {/* Community Sanctuary Wall */}
        <CommunitySanctuary />

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-[#03050a] py-14 px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="max-w-3xl mx-auto space-y-4 flex flex-col items-center">
          <AlchemicalAnimatedLogo
            size="lg"
            showRays={true}
            onClick={() => scrollToSection("hero")}
          />
          <div className="font-display font-bold text-lg text-white">
            El Alquimista Literario
          </div>
          <p className="font-serif-literary text-xs sm:text-sm text-slate-400 leading-relaxed">
            Micro Activo Interactivo de Sanación Somática, Catarsis Lírica & Soberanía de Autor.
            Diseñado con rigor ético, privacidad local absoluta y sin dependencias invasivas.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500 font-mono pt-2">
            <span>⚗️ 7 Capítulos Oficiales</span>
            <span>•</span>
            <span>🎬 Paz en la Tormenta (Subtitulado)</span>
            <span>•</span>
            <span>📚 26 Obras Fundacionales</span>
            <span>•</span>
            <span>🌬️ Estimulación Vagal</span>
            <span>•</span>
            <span>📖 Amazon KDP Ready</span>
          </div>
        </div>
      </footer>

      {/* Manifesto Modal: "Alquimista: Lee esto Antes" */}
      <ManifestoModal
        isOpen={manifestoOpen}
        onClose={() => setManifestoOpen(false)}
        onGoToWorkshop={() => {
          setManifestoOpen(false);
          scrollToSection("taller");
        }}
      />

      {/* Card Exporter Modal */}
      <CardExportModal
        isOpen={cardModalState.isOpen}
        onClose={() => setCardModalState((prev) => ({ ...prev, isOpen: false }))}
        title={cardModalState.title}
        verses={cardModalState.verses}
        archetype={cardModalState.archetype}
      />

      {/* Diagnostics Modal */}
      <DiagnosticsModal
        isOpen={diagnosticsOpen}
        onClose={() => setDiagnosticsOpen(false)}
      />

      {/* Floating Scroll-to-Top Button */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          title="Volver arriba"
          className="fixed bottom-20 right-6 z-30 p-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-xl shadow-amber-950/50 transition-all active:scale-95 cursor-pointer"
        >
          <ArrowUp className="w-5 h-5 font-bold" />
        </button>
      )}

      {/* Reproductor Estilo Clásico/Literario */}
      <ClassicalAudioPlayer />

    </div>
  );
}

export default App;
