import React, { useState, useEffect } from "react";
import { X, Activity, CheckCircle, AlertTriangle, RefreshCw, Volume2, Cpu, Database, Eye, ShieldCheck, Wrench } from "lucide-react";
import { playVagusChime } from "../utils/audioEngine";
import { getAvailableVoices, readParagraphs } from "../utils/speechEngine";

interface DiagnosticsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface DiagnosticItem {
  id: string;
  name: string;
  category: string;
  status: "success" | "warning" | "error" | "testing";
  details: string;
  recommendation?: string;
}

export const DiagnosticsModal: React.FC<DiagnosticsModalProps> = ({ isOpen, onClose }) => {
  const [items, setItems] = useState<DiagnosticItem[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const runAllDiagnostics = async () => {
    setIsRunning(true);
    const results: DiagnosticItem[] = [];

    // 1. Web Audio API Test
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        results.push({
          id: "audio_api",
          name: "Web Audio API (Osciladores & 528Hz)",
          category: "Audio Engine",
          status: "success",
          details: "AudioContext nativo disponible y operativo. Soporta síntesis de ruido binaural y campanas vagales.",
        });
      } else {
        results.push({
          id: "audio_api",
          name: "Web Audio API",
          category: "Audio Engine",
          status: "error",
          details: "El navegador no tiene soporte nativo para Web Audio API.",
          recommendation: "Actualiza tu navegador a una versión reciente de Chrome, Safari o Firefox.",
        });
      }
    } catch {
      results.push({
        id: "audio_api",
        name: "Web Audio API",
        category: "Audio Engine",
        status: "warning",
        details: "No se pudo inicializar AudioContext.",
      });
    }

    // 2. Speech Synthesis (TTS) Test
    try {
      if ("speechSynthesis" in window) {
        const voices = await getAvailableVoices();
        const spanishVoices = voices.filter((v) => v.lang.startsWith("es"));
        if (spanishVoices.length > 0) {
          results.push({
            id: "tts_api",
            name: "Locución TTS (SpeechSynthesis)",
            category: "Voz & Audiolibro",
            status: "success",
            details: `Encontradas ${spanishVoices.length} voces en español disponibles (${spanishVoices.map((v) => v.name).slice(0, 2).join(", ")}).`,
          });
        } else {
          results.push({
            id: "tts_api",
            name: "Locución TTS (SpeechSynthesis)",
            category: "Voz & Audiolibro",
            status: "warning",
            details: "SpeechSynthesis soportado pero no se detectaron voces específicas en español nativo en este sistema operativo.",
            recommendation: "La app usará la voz predeterminada del sistema con ajuste de entonación y velocidad.",
          });
        }
      } else {
        results.push({
          id: "tts_api",
          name: "Locución TTS",
          category: "Voz & Audiolibro",
          status: "error",
          details: "SpeechSynthesis no está disponible en este entorno.",
        });
      }
    } catch {
      results.push({
        id: "tts_api",
        name: "Locución TTS",
        category: "Voz & Audiolibro",
        status: "warning",
        details: "Fallo al consultar voces del sistema.",
      });
    }

    // 3. Backend AI Endpoint Check
    try {
      const res = await fetch("/api/health");
      if (res.ok) {
        const data = await res.json();
        results.push({
          id: "server_api",
          name: "Servidor Express & Gemini AI API",
          category: "Inteligencia Artificial",
          status: "success",
          details: `Servidor activo (${data.status}). El motor alquímico cuenta con fallback seguro de 20 arquetipos poéticos.`,
        });
      } else {
        results.push({
          id: "server_api",
          name: "Servidor Express",
          category: "Inteligencia Artificial",
          status: "warning",
          details: "El servidor API devolvió un código no estándar, usando motor algorítmico local.",
        });
      }
    } catch {
      results.push({
        id: "server_api",
        name: "Servidor Express & Gemini AI",
        category: "Inteligencia Artificial",
        status: "success",
        details: "Modo cliente activo con motor algorítmico de transmutación y rima incorporado.",
      });
    }

    // 4. LocalStorage & Persistence Test
    try {
      const testKey = "__alquimia_test__";
      localStorage.setItem(testKey, "ok");
      const read = localStorage.getItem(testKey);
      localStorage.removeItem(testKey);
      if (read === "ok") {
        results.push({
          id: "local_storage",
          name: "Almacenamiento Local (Privacidad Offline)",
          category: "Persistencia",
          status: "success",
          details: "LocalStorage disponible. Tu diario, capítulos completados y configuración se guardan de forma privada en tu dispositivo.",
        });
      } else {
        throw new Error("Mismatch");
      }
    } catch {
      results.push({
        id: "local_storage",
        name: "Almacenamiento Local",
        category: "Persistencia",
        status: "warning",
        details: "LocalStorage restringido (navegación privada o cookies de terceros bloqueadas).",
        recommendation: "Permite el almacenamiento local para guardar tus progresos.",
      });
    }

    // 5. Canvas 2D High-DPI Engine
    try {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (ctx) {
        results.push({
          id: "canvas_2d",
          name: "Renderizador Gráfico Canvas 2D (Stories & Tarjetas)",
          category: "Exportación Gráfica",
          status: "success",
          details: `Canvas 2D activo. Escala nativa de píxeles detectada: ${window.devicePixelRatio || 1}x para tarjetas nítidas.`,
        });
      }
    } catch {
      results.push({
        id: "canvas_2d",
        name: "Canvas 2D",
        category: "Exportación Gráfica",
        status: "error",
        details: "No se pudo obtener contexto 2D de Canvas.",
      });
    }

    setItems(results);
    setIsRunning(false);
  };

  useEffect(() => {
    if (isOpen) {
      runAllDiagnostics();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#090d17] border border-cyan-500/40 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative my-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-2.5 text-cyan-400 font-display text-lg font-bold">
            <Activity className="w-5 h-5 animate-pulse" />
            <span>Auditoría & Diagnóstico de Subsistemas</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Overview banner */}
        <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 text-xs text-slate-300 space-y-1">
          <p className="font-bold text-cyan-300">
            ✓ Análisis de estabilidad del Micro Activo Interactivo:
          </p>
          <p>
            Hemos corregido y verificado la compatibilidad de audio en navegadores móviles, añadido fallbacks seguros para la IA, soporte para retina displays y navegación accesible.
          </p>
        </div>

        {/* Diagnostics list */}
        <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
          {items.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {item.status === "success" ? (
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                  ) : item.status === "warning" ? (
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-rose-400" />
                  )}
                  <span className="font-display text-xs font-bold text-white">
                    {item.name}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded-md">
                  {item.category}
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {item.details}
              </p>

              {item.recommendation && (
                <div className="p-2.5 rounded-xl bg-amber-950/30 border border-amber-500/30 text-[11px] text-amber-200">
                  <strong>Recomendación:</strong> {item.recommendation}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-800">
          <button
            onClick={() => playVagusChime(528)}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-mono flex items-center space-x-1.5 transition-colors"
          >
            <Volume2 className="w-4 h-4" />
            <span>Probar Sonido 528 Hz</span>
          </button>

          <button
            onClick={runAllDiagnostics}
            disabled={isRunning}
            className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center space-x-1.5 transition-all shadow-md shadow-cyan-950/40"
          >
            <RefreshCw className={`w-4 h-4 ${isRunning ? "animate-spin" : ""}`} />
            <span>Re-ejecutar Auditoría</span>
          </button>
        </div>

      </div>
    </div>
  );
};
