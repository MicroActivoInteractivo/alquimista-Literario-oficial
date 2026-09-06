import React, { useRef, useEffect, useState } from "react";
import { X, Download, Sparkles, Image, Check } from "lucide-react";
import { renderPoeticCard, downloadCanvasImage } from "../utils/canvasCardGenerator";

interface CardExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  verses: string;
  archetype?: string;
}

export const CardExportModal: React.FC<CardExportModalProps> = ({
  isOpen,
  onClose,
  title,
  verses,
  archetype = "Alquimia Lírica",
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [authorName, setAuthorName] = useState("Poeta Anónimo");
  const [format, setFormat] = useState<"post" | "story" | "banner">("post");
  const [theme, setTheme] = useState<"gold_alchemy" | "dark_mystic" | "ancient_parchment" | "amethyst">("gold_alchemy");
  const [isDownloaded, setIsDownloaded] = useState(false);

  useEffect(() => {
    if (isOpen && canvasRef.current) {
      renderPoeticCard(canvasRef.current, {
        title: title || "Crisol de Paz",
        verses: verses || "En el silencio nace la calma...",
        authorOrPseudonym: authorName,
        archetype,
        format,
        theme,
      });
    }
  }, [isOpen, title, verses, authorName, format, theme, archetype]);

  if (!isOpen) return null;

  const handleDownload = () => {
    if (!canvasRef.current) return;
    const filename = `${title.replace(/\s+/g, "_") || "Poema_Alquimico"}_${format}.png`;
    downloadCanvasImage(canvasRef.current, filename);
    setIsDownloaded(true);
    setTimeout(() => setIsDownloaded(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#0b0f19] border border-slate-800 rounded-3xl max-w-4xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative my-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-2 text-amber-400 font-display text-lg font-bold">
            <Sparkles className="w-5 h-5" />
            <span>Generador de Tarjetas & Stories HD</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          
          {/* Controls (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            
            {/* Format Selection */}
            <div className="space-y-1.5">
              <label className="block text-xs font-mono text-slate-300 uppercase">Formato:</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "post", label: "Post (1:1)" },
                  { id: "story", label: "Story (9:16)" },
                  { id: "banner", label: "Banner (16:9)" },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setFormat(f.id as "post" | "story" | "banner")}
                    className={`py-2 px-2 rounded-xl text-xs font-mono transition-all ${
                      format === f.id
                        ? "bg-amber-500/20 text-amber-300 border border-amber-500/50 font-bold"
                        : "bg-slate-900 text-slate-400 border border-slate-800"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Theme Selection */}
            <div className="space-y-1.5">
              <label className="block text-xs font-mono text-slate-300 uppercase">Atmósfera / Tema:</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "gold_alchemy", label: "Oro Alquímico" },
                  { id: "dark_mystic", label: "Noche Mística" },
                  { id: "ancient_parchment", label: "Pergamino" },
                  { id: "amethyst", label: "Amatista Sagrada" },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTheme(t.id as "gold_alchemy" | "dark_mystic" | "ancient_parchment" | "amethyst")}
                    className={`py-2 px-2 rounded-xl text-xs font-mono transition-all ${
                      theme === t.id
                        ? "bg-amber-500/20 text-amber-300 border border-amber-500/50 font-bold"
                        : "bg-slate-900 text-slate-400 border border-slate-800"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Author / Pseudonym */}
            <div className="space-y-1.5">
              <label className="block text-xs font-mono text-slate-300 uppercase">Firma / Seudónimo:</label>
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="Tu seudónimo..."
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-500/60"
              />
            </div>

            {/* Download Button */}
            <button
              onClick={handleDownload}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-display font-bold text-xs flex items-center justify-center space-x-2 shadow-lg shadow-amber-950/50 transition-all"
            >
              {isDownloaded ? <Check className="w-4 h-4 text-slate-950" /> : <Download className="w-4 h-4" />}
              <span>{isDownloaded ? "¡Imagen Descargada en HD!" : "Descargar Imagen PNG (Alta Resolución)"}</span>
            </button>

            <p className="text-[11px] text-slate-400 text-center">
              Renderizado en 1080px nítido listo para Instagram, Pinterest o tu fondo de pantalla.
            </p>

          </div>

          {/* Live Canvas Preview (7 cols) */}
          <div className="md:col-span-7 bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center justify-center overflow-hidden max-h-[480px]">
            <canvas
              ref={canvasRef}
              className="max-w-full max-h-[440px] object-contain rounded-xl shadow-2xl border border-slate-800"
            />
          </div>

        </div>

      </div>
    </div>
  );
};
