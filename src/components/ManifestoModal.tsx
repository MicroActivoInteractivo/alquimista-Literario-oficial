import React from "react";
import {
  X,
  HeartHandshake,
  ShieldCheck,
  Feather,
  Sparkles,
  Heart,
  Smile,
  CheckCircle2,
  Compass,
  Flame,
  ArrowRight
} from "lucide-react";
import { AlchemicalAnimatedLogo } from "./AlchemicalAnimatedLogo";
import { AlchemicalInteractiveIcon } from "./AlchemicalInteractiveIcon";
import { playVagusChime } from "../utils/audioEngine";

interface ManifestoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGoToWorkshop?: () => void;
}

export const ManifestoModal: React.FC<ManifestoModalProps> = ({
  isOpen,
  onClose,
  onGoToWorkshop,
}) => {
  if (!isOpen) return null;

  const handleUnderstand = () => {
    try {
      playVagusChime(528);
    } catch {
      // ignore
    }
    onClose();
  };

  const pillars = [
    {
      id: "desahogo",
      title: "1. Un Espacio de Desahogo Sagrado",
      subtitle: "Escribe lo que duele • Sin juicio ni censura",
      icon: Feather,
      colorScheme: "amber" as const,
      gradient: "from-amber-500/15 via-yellow-500/5 to-transparent",
      borderColor: "border-amber-500/40",
      description:
        "Este es tu refugio íntimo. Escribe lo que te pesa, lo que quema y lo que no puedes decir en voz alta. Saca el plomo denso de tus emociones, vacía tu crisol y concédete el regalo de darles un nuevo significado, belleza y paz sin juzgarte.",
      highlight: "Tu dolor no es un error: es la materia prima de tu obra más luminosa.",
    },
    {
      id: "cero_presion",
      title: "2. Cero Presión Comercial",
      subtitle: "Sanar antes de vender • Cero ansiedad o estrés",
      icon: ShieldCheck,
      colorScheme: "emerald" as const,
      gradient: "from-emerald-500/15 via-teal-500/5 to-transparent",
      borderColor: "border-emerald-500/40",
      description:
        "Aunque aquí dispones de guías claras y dignas para autopublicar y monetizar tu arte en Amazon KDP si así lo deseas, este santuario jamás buscará generar ansiedad, frustración o carreras frenéticas por vender. Tu bienestar interior y tu paz espiritual son infinitamente más valiosos que cualquier métrica.",
      highlight: "Tu valor no se mide en ventas ni seguidores: reside en tu espíritu.",
    },
    {
      id: "escritura_libre",
      title: "3. Escritura Libre y Consciente",
      subtitle: "A tu propio compás • Validando cada sentir",
      icon: Sparkles,
      colorScheme: "purple" as const,
      gradient: "from-purple-500/15 via-fuchsia-500/5 to-transparent",
      borderColor: "border-purple-500/40",
      description:
        "Tu proceso creativo es únicamente tuyo y avanza a tu propio ritmo. No hay fórmulas rígidas ni fechas límite. Validamos y abrazamos cada emoción, lágrima, verso o suspiro plasmado en el papel. Escribe en libertad cuando tu alma lo pida.",
      highlight: "Escribir es respirar despacio con la tinta del alma.",
    },
    {
      id: "menores",
      title: "4. Acompañamiento Amoroso a Menores",
      subtitle: "Guía responsable • Espacio seguro de crecimiento",
      icon: HeartHandshake,
      colorScheme: "rose" as const,
      gradient: "from-rose-500/15 via-pink-500/5 to-transparent",
      borderColor: "border-rose-500/40",
      description:
        "Si eres menor de edad, te recomendamos con mucho cariño explorar este espacio de la mano de un padre, madre o tutor responsable. No queremos crear más ansiedad desde lo comercial ni acelerar etapas; solo queremos sacar lo mejor, más noble y puro de tu arte para que te sientas libre de expresarte y crear con amor.",
      highlight: "Siéntete en total libertad de escribir; el resto Dios te acompañará siempre.",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-3xl my-8 bg-[#070a14] border border-amber-500/50 rounded-3xl shadow-2xl shadow-black flex flex-col overflow-hidden ring-1 ring-amber-400/30">
        
        {/* Glow ambient background aura */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header with Logo & Cheerful Badge */}
        <div className="relative p-6 sm:p-7 border-b border-slate-800 bg-gradient-to-r from-slate-950 via-[#0a0f1f] to-slate-950 flex items-start justify-between gap-4">
          <div className="flex items-center space-x-4">
            <AlchemicalAnimatedLogo size="md" showRays={true} isInteractive={false} />
            <div>
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-400/40 text-amber-300 text-[11px] font-mono tracking-wider uppercase font-bold shadow-md shadow-amber-950/30 mb-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                <span>Alquimista: Lee esto Antes • Sobre Nosotros</span>
              </div>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-white tracking-wide">
                Manifiesto del Alquimista Literario
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 font-serif-literary mt-0.5">
                Nuestra ética, filosofía de amor y compromiso con tu bienestar espiritual y creativo.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 hover:border-amber-400/50 transition-all cursor-pointer shrink-0"
            title="Cerrar ventana"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: The 4 Pillars */}
        <div className="relative p-5 sm:p-7 space-y-4 max-h-[65vh] overflow-y-auto custom-scrollbar">
          
          {/* Welcome Greeting Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-900 border border-amber-500/30 flex items-start space-x-3.5 shadow-lg">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
              <Smile className="w-5 h-5 animate-bounce" />
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-serif-literary">
              Bienvenido(a) a este crisol de sanación y esperanza. Antes de que comiences a explorar las herramientas y melodías, queremos que tengas la certeza de que este lugar fue construido para cuidarte, respetarte y elevar tu espíritu.
            </p>
          </div>

          {/* Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.id}
                  className={`p-5 rounded-2xl bg-gradient-to-b ${pillar.gradient} border ${pillar.borderColor} shadow-lg hover:border-amber-400 transition-all duration-300 flex flex-col justify-between space-y-3 group`}
                >
                  <div className="space-y-2.5">
                    {/* Header */}
                    <div className="flex items-center space-x-3">
                      <AlchemicalInteractiveIcon
                        icon={Icon}
                        colorScheme={pillar.colorScheme}
                        size="md"
                      />
                      <div>
                        <h3 className="font-display text-sm sm:text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                          {pillar.title}
                        </h3>
                        <span className="text-[10px] font-mono text-slate-400 block">
                          {pillar.subtitle}
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>

                  {/* Highlight pill */}
                  <div className="pt-2 border-t border-slate-800/80">
                    <p className="text-[11px] font-serif-literary italic text-amber-300/95">
                      ✦ {pillar.highlight}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Final Spiritual Blessing Card */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-yellow-500/10 to-cyan-500/10 border border-amber-400/40 text-center space-y-2">
            <div className="inline-flex items-center space-x-2 text-xs font-mono text-amber-300 font-bold uppercase tracking-wider">
              <Heart className="w-4 h-4 text-rose-400 fill-rose-400 animate-pulse" />
              <span>Nuestra Bendición para Tu Camino</span>
            </div>
            <p className="font-serif-literary text-sm sm:text-base text-amber-100 italic leading-relaxed max-w-xl mx-auto">
              "No tengas temor de vaciar lo que pesa en tu corazón. Tu voz importa, tus emociones son dignas y tu arte tiene un propósito sagrado. Siéntete en paz: Dios te acompañará en cada paso."
            </p>
          </div>

        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-950 flex flex-col sm:flex-row items-center justify-between gap-3">
          
          <div className="flex items-center space-x-2 text-xs text-slate-400">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Espacio seguro, confidencial y sin recopilación de datos privados.</span>
          </div>

          <div className="flex items-center space-x-2.5 w-full sm:w-auto justify-end">
            <button
              onClick={handleUnderstand}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-medium transition-colors cursor-pointer"
            >
              Comprendido
            </button>

            {onGoToWorkshop && (
              <button
                onClick={() => {
                  handleUnderstand();
                  onGoToWorkshop();
                }}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:from-amber-300 text-slate-950 text-xs font-bold shadow-lg shadow-amber-950/40 transition-all hover:scale-105 active:scale-95 flex items-center space-x-1.5 cursor-pointer"
              >
                <span>Entrar al Taller de Escritura</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};
