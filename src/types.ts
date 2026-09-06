export interface AudiobookChapter {
  id: number;
  number: string;
  title: string;
  subtitle: string;
  estimatedMinutes: number;
  summary: string;
  fullText: string;
  paragraphs: string[];
  keyLessons: string[];
  reflectionPrompt: string;
  audioVoiceHint?: string;
  accentColor: string;
}

export interface AlchemicalPoem {
  id: string;
  title: string;
  author: string;
  category: "Motivacional" | "Sanación" | "Espiritual" | "Inspiración" | "Superación" | "Filosófico";
  verses: string;
  note: string;
  centuryOrEra?: string;
  archetype?: string;
}

export interface MonetizationPlatform {
  id: "kdp" | "substack" | "medium" | "patreon" | "gumroad" | "d2d";
  name: string;
  badge: string;
  tagline: string;
  summary: string;
  iconBg: string;
  borderColor: string;
  requirements: string[];
  stepByStep: string[];
  tipsForAnonymity: string[];
  officialUrl: string;
  avgRoyaltyRate: string;
  payoutModel: string;
  pdfTitle: string;
}

export interface TransmutationRecord {
  id: string;
  timestamp: string;
  userInput: string;
  correctedUserInput?: string;
  densityValue: number;
  densityName: string;
  symbols: string[];
  title: string;
  transmutedPoem: string;
  alchemicalReflection: string;
  mantra: string;
  archetype: string;
  isSaved?: boolean;
}

export interface SoundscapeTrack {
  id: string;
  name: string;
  composer?: string;
  frequencyLabel: string;
  description: string;
  category: "cristiana" | "beethoven" | "mozart" | "bach" | "frecuencias" | "naturaleza" | "binaural" | "meditation" | "nature";
  audioUrl?: string;
  fallbackUrl?: string;
  durationSec?: number;
  baseFreq?: number; // in Hz (e.g. 432, 528, 136.1)
  modFreq?: number; // binaural delta (e.g. 4 for theta, 7.83 for Schumann)
  noiseType?: "white" | "pink" | "brown" | "rain" | "waves" | "singing-bowl" | "melody";
  melodyPattern?: string;
  bpm?: number;
}

export interface AuthorReference {
  id: string;
  name: string;
  formattedName?: string;
  country?: string;
  era: string;
  badge: string;
  tagline: string;
  bio: string;
  featuredWorkTitle: string;
  featuredWorkExcerpt: string;
  textColor: string;
  accentBg: string;
  accentBorder: string;
}
