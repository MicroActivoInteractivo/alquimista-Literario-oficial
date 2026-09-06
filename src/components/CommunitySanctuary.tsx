import React, { useState } from "react";
import { MessageSquare, Sparkles, Heart, Send, ShieldCheck, User } from "lucide-react";

interface CommunityWhisper {
  id: string;
  authorAlias: string;
  archetype: string;
  transmutationText: string;
  reactions: {
    alchemy: number;
    peace: number;
    strength: number;
  };
  timeAgo: string;
}

const INITIAL_WHISPERS: CommunityWhisper[] = [
  {
    id: "w_1",
    authorAlias: "Alquimista_Del_Sur",
    archetype: "El Nudo al Río",
    transmutationText: "Solté la culpa de no poder arreglarlo todo. Hoy mi pecho respira como agua mansa que encuentra su mar.",
    reactions: { alchemy: 18, peace: 24, strength: 12 },
    timeAgo: "Hace 2 horas",
  },
  {
    id: "w_2",
    authorAlias: "Voz_de_Medianoche",
    archetype: "El Plomo al Oro",
    transmutationText: "El insomnio no es una condena, fue la ventana donde escribí mis primeros tres poemas. El silencio ahora es mi amigo.",
    reactions: { alchemy: 32, peace: 19, strength: 27 },
    timeAgo: "Hace 5 horas",
  },
  {
    id: "w_3",
    authorAlias: "Caminante_Silente",
    archetype: "La Ceniza al Fénix",
    transmutationText: "Perdí mi empleo tras 12 años, pero recuperé mis tardes y mi pluma. Las cenizas fueron abono para mi libertad.",
    reactions: { alchemy: 45, peace: 38, strength: 52 },
    timeAgo: "Ayer",
  },
];

export const CommunitySanctuary: React.FC = () => {
  const [whispers, setWhispers] = useState<CommunityWhisper[]>(() => {
    try {
      const saved = localStorage.getItem("alquimista_community_whispers");
      return saved ? JSON.parse(saved) : INITIAL_WHISPERS;
    } catch {
      return INITIAL_WHISPERS;
    }
  });

  const [newText, setNewText] = useState("");
  const [alias, setAlias] = useState("Alquimista_Anonimo");
  const [selectedArch, setSelectedArch] = useState("El Plomo al Oro");
  const [userReactions, setUserReactions] = useState<{ [key: string]: boolean }>({});

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newText.trim()) return;

    const newWhisper: CommunityWhisper = {
      id: "w_" + Date.now(),
      authorAlias: alias.trim() || "Alquimista_Anonimo",
      archetype: selectedArch,
      transmutationText: newText.trim(),
      reactions: { alchemy: 1, peace: 1, strength: 1 },
      timeAgo: "Recién publicado",
    };

    const updated = [newWhisper, ...whispers];
    setWhispers(updated);
    setNewText("");
    try {
      localStorage.setItem("alquimista_community_whispers", JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleReaction = (whisperId: string, type: "alchemy" | "peace" | "strength") => {
    const key = `${whisperId}_${type}`;
    if (userReactions[key]) return; // prevent duplicate clicks

    setUserReactions((prev) => ({ ...prev, [key]: true }));
    setWhispers((prev) =>
      prev.map((w) => {
        if (w.id === whisperId) {
          return {
            ...w,
            reactions: {
              ...w.reactions,
              [type]: w.reactions[type] + 1,
            },
          };
        }
        return w;
      })
    );
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="border-b border-slate-800 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-rose-400 text-xs font-mono font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4 text-rose-400" />
            <span>Muro Anónimo de Transmutación</span>
          </div>
          <h2 className="font-display text-2xl sm:text-4xl font-bold text-white">
            Santuario de Voces Alquímicas
          </h2>
          <p className="font-serif-literary text-slate-300 text-base sm:text-lg mt-1">
            Lee y comparte pensamientos transmutados sin revelar tu identidad.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs text-slate-400 bg-slate-900 px-3.5 py-2 rounded-2xl border border-slate-800">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Espacio anónimo y respetuoso</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Share Form (5 cols) */}
        <div className="lg:col-span-5 bg-slate-950/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-4">
          <h3 className="font-display text-lg font-bold text-white flex items-center space-x-2">
            <Send className="w-4 h-4 text-amber-400" />
            <span>Dejar un Susurro en el Muro</span>
          </h3>

          <form onSubmit={handlePost} className="space-y-3.5">
            <div className="space-y-1">
              <label className="block text-[11px] font-mono text-slate-400 uppercase">Pseudónimo:</label>
              <input
                type="text"
                value={alias}
                onChange={(e) => setAlias(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-500/60"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-[11px] font-mono text-slate-400 uppercase">Arquetipo:</label>
              <select
                value={selectedArch}
                onChange={(e) => setSelectedArch(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-500/60"
              >
                <option value="El Plomo al Oro">El Plomo al Oro (Ansiedad a Claridad)</option>
                <option value="La Ceniza al Fénix">La Ceniza al Fénix (Duelo a Renacimiento)</option>
                <option value="El Nudo al Río">El Nudo al Río (Bloqueo a Fluidez)</option>
                <option value="La Tormenta al Faro">La Tormenta al Faro (Ira a Soberanía)</option>
                <option value="La Espina a la Rosa">La Espina a la Rosa (Culpa a Autocompasión)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="block text-[11px] font-mono text-slate-400 uppercase">Tu mensaje o verso:</label>
              <textarea
                rows={4}
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                placeholder="Comparte una frase de aliento o una verdad que hayas descubierto..."
                className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-500/60 font-serif-literary leading-relaxed"
              />
            </div>

            <button
              type="submit"
              disabled={!newText.trim()}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-display font-bold text-xs flex items-center justify-center space-x-2 transition-all disabled:opacity-50"
            >
              <span>Publicar en el Santuario</span>
            </button>
          </form>
        </div>

        {/* Right Column: Whispers Wall (7 cols) */}
        <div className="lg:col-span-7 space-y-4 max-h-[580px] overflow-y-auto pr-1">
          {whispers.map((w) => (
            <div
              key={w.id}
              className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-3 shadow-md hover:border-slate-700 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-[10px] text-amber-400 font-mono">
                    ✦
                  </div>
                  <span className="font-mono text-xs font-bold text-slate-200">
                    {w.authorAlias}
                  </span>
                  <span className="text-[10px] text-amber-400/90 font-mono bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/30">
                    {w.archetype}
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 font-mono">{w.timeAgo}</span>
              </div>

              <p className="font-serif-literary text-sm sm:text-base text-slate-200 leading-relaxed italic">
                "{w.transmutationText}"
              </p>

              <div className="flex items-center space-x-2 pt-2 border-t border-slate-800/60 text-xs">
                <button
                  onClick={() => handleReaction(w.id, "alchemy")}
                  className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 flex items-center space-x-1.5 transition-colors"
                >
                  <span>✨</span>
                  <span className="font-mono text-[11px]">{w.reactions.alchemy}</span>
                </button>
                <button
                  onClick={() => handleReaction(w.id, "peace")}
                  className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 flex items-center space-x-1.5 transition-colors"
                >
                  <span>🕊️</span>
                  <span className="font-mono text-[11px]">{w.reactions.peace}</span>
                </button>
                <button
                  onClick={() => handleReaction(w.id, "strength")}
                  className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 flex items-center space-x-1.5 transition-colors"
                >
                  <span>💖</span>
                  <span className="font-mono text-[11px]">{w.reactions.strength}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
