import React, { useState } from "react";
import { DollarSign, BookOpen, Download, Printer, Shield, CheckSquare, Square, Calculator, ExternalLink, Sparkles, FileText } from "lucide-react";
import { MONETIZATION_PLATFORMS } from "../data/monetizationGuides";
import { MonetizationPlatform } from "../types";

export const MonetizationGuides: React.FC = () => {
  const [selectedPlatform, setSelectedPlatform] = useState<MonetizationPlatform>(MONETIZATION_PLATFORMS[0]);
  const [authorPseudonym, setAuthorPseudonym] = useState("Poeta_Anonimo_Alquimista");
  const [bookPrice, setBookPrice] = useState(12.99);
  const [estimatedSales, setEstimatedSales] = useState(50);
  const [checkedSteps, setCheckedSteps] = useState<{ [key: string]: boolean }>({});

  const toggleCheck = (stepId: string) => {
    setCheckedSteps((prev) => ({ ...prev, [stepId]: !prev[stepId] }));
  };

  // Royalty Calculation
  const calculateRoyalties = () => {
    if (selectedPlatform.id === "kdp") {
      // Paper book approx: (Price * 0.60) - printCost ($3.50)
      const perUnitPaper = Math.max(0, bookPrice * 0.6 - 3.2);
      const perUnitEbook = bookPrice * 0.7;
      return {
        unit: `$${perUnitPaper.toFixed(2)} (Papel) / $${perUnitEbook.toFixed(2)} (eBook)`,
        monthly: `$${(perUnitPaper * estimatedSales).toFixed(2)} - $${(perUnitEbook * estimatedSales).toFixed(2)}`,
      };
    } else if (selectedPlatform.id === "substack") {
      // Subscriptions
      const total = bookPrice * estimatedSales * 0.9;
      return {
        unit: `$${(bookPrice * 0.9).toFixed(2)} neto/mes por suscriptor`,
        monthly: `$${total.toFixed(2)} / mes recurrente`,
      };
    } else if (selectedPlatform.id === "gumroad") {
      // Direct sales (90%)
      const total = bookPrice * estimatedSales * 0.9;
      return {
        unit: `$${(bookPrice * 0.9).toFixed(2)} neto por descarga`,
        monthly: `$${total.toFixed(2)} total estimado`,
      };
    } else {
      const perUnit = bookPrice * 0.65;
      return {
        unit: `$${perUnit.toFixed(2)} promedio`,
        monthly: `$${(perUnit * estimatedSales).toFixed(2)}`,
      };
    }
  };

  const royaltyResult = calculateRoyalties();

  const handlePrintDossier = () => {
    window.print();
  };

  return (
    <section id="monetizacion-guias" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="border-b border-slate-800 pb-6">
        <div className="flex items-center space-x-2 text-teal-400 text-xs font-mono font-semibold uppercase tracking-wider mb-2">
          <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping" />
          <span>Módulo 05 • Sustento Libre & Autopublicación</span>
        </div>
        <h2 className="font-display text-2xl sm:text-4xl font-bold text-white">
          Monetización Ética & Guías PDF
        </h2>
        <p className="font-serif-literary text-slate-300 text-base sm:text-lg mt-1">
          Aprende a publicar tus poemarios y reflexiones en Amazon KDP, Substack y Gumroad bajo estricto anonimato con seudónimo.
        </p>
      </div>

      {/* Anonymity Banner */}
      <div className="p-6 rounded-3xl bg-slate-950/90 border border-teal-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3.5">
          <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 shrink-0">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-display text-base font-bold text-white">
              Privacidad & Seudónimo 100% Legal
            </h4>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed mt-0.5">
              Las plataformas procesan tus regalías bancarias confidencialmente. En portadas, tiendas y redes sólo figurará el seudónimo que tú elijas.
            </p>
          </div>
        </div>

        {/* Pseudonym Quick Input */}
        <div className="w-full md:w-auto flex items-center space-x-2 bg-slate-900 px-3.5 py-2 rounded-2xl border border-slate-800">
          <span className="text-xs text-slate-400 font-mono">Tu Seudónimo:</span>
          <input
            type="text"
            value={authorPseudonym}
            onChange={(e) => setAuthorPseudonym(e.target.value)}
            className="bg-transparent text-xs font-mono font-bold text-teal-300 focus:outline-none border-b border-teal-500/40 w-44"
          />
        </div>
      </div>

      {/* Platform Selector Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {MONETIZATION_PLATFORMS.map((plat) => {
          const isSelected = selectedPlatform.id === plat.id;
          return (
            <button
              key={plat.id}
              onClick={() => setSelectedPlatform(plat)}
              className={`p-3.5 rounded-2xl border text-left transition-all ${
                isSelected
                  ? "bg-slate-900 border-teal-500/60 shadow-lg shadow-teal-950/40"
                  : "bg-slate-950/80 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60"
              }`}
            >
              <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full border ${plat.iconBg} ${plat.borderColor} block w-fit mb-1.5`}>
                {plat.badge}
              </span>
              <h5 className="font-display text-xs font-bold text-white">
                {plat.name.split(" (")[0]}
              </h5>
            </button>
          );
        })}
      </div>

      {/* Main Guide Content & Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Step-by-Step Interactive Guide (7 cols) */}
        <div className="lg:col-span-7 bg-slate-950/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          
          {/* Guide Header */}
          <div className="border-b border-slate-800 pb-5">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
              <span className="text-xs font-mono text-teal-300 font-bold">
                ✦ Guía Paso a Paso para {selectedPlatform.name}
              </span>
              <a
                href={selectedPlatform.officialUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-teal-400 hover:underline flex items-center space-x-1 font-mono"
              >
                <span>Visitar {selectedPlatform.name.split(" ")[0]}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {selectedPlatform.summary}
            </p>
          </div>

          {/* Checklist */}
          <div className="space-y-3">
            <h5 className="text-xs font-mono text-slate-300 uppercase tracking-wide">
              ✦ Checklist de Autopublicación (Haz clic al completar):
            </h5>
            <div className="space-y-2">
              {selectedPlatform.stepByStep.map((step, idx) => {
                const stepKey = `${selectedPlatform.id}_step_${idx}`;
                const isChecked = checkedSteps[stepKey] || false;
                return (
                  <div
                    key={idx}
                    onClick={() => toggleCheck(stepKey)}
                    className={`p-3 rounded-xl border flex items-start space-x-3 cursor-pointer transition-colors ${
                      isChecked
                        ? "bg-teal-950/20 border-teal-500/40 text-slate-300"
                        : "bg-[#070b14] border-slate-800 text-slate-200 hover:border-slate-700"
                    }`}
                  >
                    <button className="mt-0.5 shrink-0 text-teal-400">
                      {isChecked ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4 text-slate-500" />}
                    </button>
                    <span className={`text-xs leading-relaxed ${isChecked ? "line-through text-slate-500" : ""}`}>
                      {step}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Anonymity tips specific to platform */}
          <div className="p-4 rounded-2xl bg-teal-950/20 border border-teal-500/30 space-y-2">
            <h6 className="text-xs font-mono text-teal-300 font-bold uppercase">
              ✦ Claves de Anonimato en {selectedPlatform.name.split(" ")[0]}:
            </h6>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {selectedPlatform.tipsForAnonymity.map((tip, i) => (
                <li key={i} className="flex items-start space-x-2">
                  <span className="text-teal-400 font-bold">▪</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Print / Save Dossier action */}
          <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div className="text-xs text-slate-400 font-mono">
              Documento: <span className="text-white">{selectedPlatform.pdfTitle}</span>
            </div>
            <button
              onClick={handlePrintDossier}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-slate-950 font-bold text-xs flex items-center space-x-2 shadow-lg shadow-teal-950/40 transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimir / Guardar en PDF</span>
            </button>
          </div>

        </div>

        {/* Right Column: Royalty & Earnings Simulator (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-slate-950/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            
            <div className="flex items-center space-x-2 text-teal-300 font-display text-sm font-bold border-b border-slate-800 pb-3">
              <Calculator className="w-4 h-4 text-teal-400" />
              <span>Simulador de Regalías e Ingresos</span>
            </div>

            {/* Price Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-400">Precio de venta fijado:</span>
                <span className="text-teal-300 font-bold">${bookPrice.toFixed(2)} USD</span>
              </div>
              <input
                type="range"
                min="2.99"
                max="39.99"
                step="0.5"
                value={bookPrice}
                onChange={(e) => setBookPrice(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-500"
              />
            </div>

            {/* Volume Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-400">Ventas / Lectores mensuales:</span>
                <span className="text-teal-300 font-bold">{estimatedSales} lectores</span>
              </div>
              <input
                type="range"
                min="5"
                max="500"
                step="5"
                value={estimatedSales}
                onChange={(e) => setEstimatedSales(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-500"
              />
            </div>

            {/* Output Box */}
            <div className="p-5 rounded-2xl bg-teal-950/30 border border-teal-500/40 space-y-3">
              <div className="flex justify-between text-xs text-slate-300 border-b border-teal-500/20 pb-2">
                <span>Regalía por unidad:</span>
                <span className="font-mono font-bold text-teal-300">{royaltyResult.unit}</span>
              </div>
              <div className="flex justify-between text-sm text-white pt-1">
                <span className="font-bold">Ingreso Neto Estimado:</span>
                <span className="font-mono font-bold text-emerald-400 text-base">{royaltyResult.monthly}</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed italic">
              * Cálculo orientativo. En Amazon KDP, los libros impresos descuentan coste de impresión por página. En Substack y Gumroad los pagos son prácticamente directos.
            </p>

          </div>

          {/* Printable Dossier Preview Stamp */}
          <div className="p-5 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-3 text-center">
            <FileText className="w-8 h-8 text-teal-400 mx-auto" />
            <h5 className="font-display text-sm font-bold text-white">
              Dossier Autorizado para {authorPseudonym}
            </h5>
            <p className="text-xs text-slate-400">
              Personalizado con tu seudónimo para consulta offline o impresión.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
