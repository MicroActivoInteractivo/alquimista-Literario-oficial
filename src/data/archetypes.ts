export interface AlchemicalArchetype {
  id: string;
  name: string;
  transmutationFrom: string;
  transmutationTo: string;
  color: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  description: string;
  seedWords: string[];
  vagusPacingSeconds: number; // For breathing pacing
}

export const ALCHEMICAL_ARCHETYPES: AlchemicalArchetype[] = [
  {
    id: "lead_gold",
    name: "El Plomo al Oro (Ansiedad a Claridad)",
    transmutationFrom: "Plomo / Agitación mental",
    transmutationTo: "Oro / Serenidad luminosa",
    color: "from-amber-500 to-yellow-400",
    badgeBg: "bg-amber-500/20",
    badgeBorder: "border-amber-500/40",
    badgeText: "text-amber-300",
    description: "Convierte el peso agobiante de los pensamientos repetitivos en una mirada templada, desapegada y luminosa.",
    seedWords: ["Crisol", "Oro", "Serenidad", "Luz", "Fuego sagrado", "Amanecer"],
    vagusPacingSeconds: 4
  },
  {
    id: "ashes_phoenix",
    name: "La Ceniza al Fénix (Duelo a Renacimiento)",
    transmutationFrom: "Ceniza / Pérdida & Duelo",
    transmutationTo: "Fénix / Fuerza renovada",
    color: "from-orange-500 to-red-500",
    badgeBg: "bg-orange-500/20",
    badgeBorder: "border-orange-500/40",
    badgeText: "text-orange-300",
    description: "Honra lo que ha muerto o partido para que alimente las raíces de tu próxima versión florecida.",
    seedWords: ["Ceniza", "Fénix", "Renacer", "Alas", "Raíz", "Vuelo"],
    vagusPacingSeconds: 5
  },
  {
    id: "knot_river",
    name: "El Nudo al Río (Bloqueo a Fluidez)",
    transmutationFrom: "Nudo / Tensión contenida",
    transmutationTo: "Río / Corriente libre",
    color: "from-cyan-500 to-blue-500",
    badgeBg: "bg-cyan-500/20",
    badgeBorder: "border-cyan-500/40",
    badgeText: "text-cyan-300",
    description: "Disuelve la garganta apretada y la rigidez corporal mediante la palabra que se derrama sin diques.",
    seedWords: ["Río", "Corriente", "Mar", "Fluir", "Canto", "Brisa"],
    vagusPacingSeconds: 6
  },
  {
    id: "storm_lighthouse",
    name: "La Tormenta al Faro (Ira a Soberanía)",
    transmutationFrom: "Tormenta / Rabia & Conflicto",
    transmutationTo: "Faro / Centro inamovible",
    color: "from-blue-600 to-indigo-500",
    badgeBg: "bg-blue-500/20",
    badgeBorder: "border-blue-500/40",
    badgeText: "text-blue-300",
    description: "Canaliza la energía volcánica de la indignación en límites firmes, dignidad y propósito constructivo.",
    seedWords: ["Faro", "Roca", "Certeza", "Brújula", "Horizonte", "Soberanía"],
    vagusPacingSeconds: 4
  },
  {
    id: "thorn_rose",
    name: "La Espina a la Rosa (Culpa a Autocompasión)",
    transmutationFrom: "Espina / Auto-reproche",
    transmutationTo: "Rosa / Abrazo incondicional",
    color: "from-rose-500 to-pink-500",
    badgeBg: "bg-rose-500/20",
    badgeBorder: "border-rose-500/40",
    badgeText: "text-rose-300",
    description: "Retira el aguijón del juicio severo para tratarte a ti mismo con la ternura con la que cuidarías a un niño asustado.",
    seedWords: ["Pétalo", "Perdón", "Ternura", "Bálsamo", "Abrazo", "Sanación"],
    vagusPacingSeconds: 5
  },
  {
    id: "void_chrysalis",
    name: "El Vacío a la Crisálida (Soledad a Templo)",
    transmutationFrom: "Vacío / Desamparo",
    transmutationTo: "Crisálida / Gestación sagrada",
    color: "from-purple-500 to-violet-400",
    badgeBg: "bg-purple-500/20",
    badgeBorder: "border-purple-500/40",
    badgeText: "text-purple-300",
    description: "Reinterpreta el silencio no como abandono, sino como el santuario íntimo donde se gestan tus mayores visiones.",
    seedWords: ["Crisálida", "Silencio", "Santuario", "Metamorfosis", "Semilla", "Misterio"],
    vagusPacingSeconds: 7
  }
];
