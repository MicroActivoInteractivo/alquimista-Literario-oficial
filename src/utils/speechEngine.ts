// Speech Synthesis Engine for Audiobook & Poetic Narration
export interface SpeechConfig {
  rate?: number; // 0.8 to 1.5
  pitch?: number; // 0.8 to 1.2
  volume?: number; // 0 to 1
  voiceURI?: string;
  onParagraphChange?: (index: number) => void;
  onWord?: (charIndex: number, text: string) => void;
  onEnd?: () => void;
  onError?: (err: unknown) => void;
}

let activeUtterances: SpeechSynthesisUtterance[] = [];
let isSpeaking = false;
let isPaused = false;
let currentParagraphIndex = 0;
let cachedVoices: SpeechSynthesisVoice[] = [];

export function getAvailableVoices(): Promise<SpeechSynthesisVoice[]> {
  return new Promise((resolve) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      return resolve([]);
    }

    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      cachedVoices = voices;
      return resolve(voices);
    }

    const onVoices = () => {
      const v = window.speechSynthesis.getVoices();
      cachedVoices = v;
      window.speechSynthesis.removeEventListener("voiceschanged", onVoices);
      resolve(v);
    };

    window.speechSynthesis.addEventListener("voiceschanged", onVoices);
    // Timeout fallback if event never fires
    setTimeout(() => {
      resolve(window.speechSynthesis.getVoices());
    }, 1500);
  });
}

export function findBestSpanishVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  if (!voices || voices.length === 0) return null;

  // Prioritize Latin American neural / natural voices, then standard es-MX, es-419, es-US, es-ES
  const preferred = [
    (v: SpeechSynthesisVoice) => (v.lang.startsWith("es-419") || v.lang.startsWith("es-MX") || v.lang.startsWith("es-US")) && (v.name.includes("Natural") || v.name.includes("Neural") || v.name.includes("Google")),
    (v: SpeechSynthesisVoice) => (v.lang.startsWith("es-419") || v.lang.startsWith("es-MX") || v.lang.startsWith("es-CO") || v.lang.startsWith("es-AR") || v.lang.startsWith("es-CL")),
    (v: SpeechSynthesisVoice) => v.lang.startsWith("es-ES") && (v.name.includes("Natural") || v.name.includes("Neural") || v.name.includes("Google") || v.name.includes("Alvaro") || v.name.includes("Elvira")),
    (v: SpeechSynthesisVoice) => v.lang.startsWith("es"),
  ];

  for (const matchFn of preferred) {
    const found = voices.find(matchFn);
    if (found) return found;
  }

  return voices.find((v) => v.lang.startsWith("es")) || null;
}

export function stopSpeech(): void {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
  activeUtterances = [];
  isSpeaking = false;
  isPaused = false;
  currentParagraphIndex = 0;
}

export function pauseSpeech(): void {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
      window.speechSynthesis.pause();
      isPaused = true;
    }
  }
}

export function resumeSpeech(): void {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      isPaused = false;
    }
  }
}

export async function readParagraphs(
  paragraphs: string[],
  config: SpeechConfig = {},
  startIndex = 0
): Promise<void> {
  stopSpeech();

  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    console.warn("SpeechSynthesis is not supported in this browser.");
    config.onError?.(new Error("SpeechSynthesis not supported"));
    return;
  }

  const voices = await getAvailableVoices();
  let selectedVoice: SpeechSynthesisVoice | null = null;

  if (config.voiceURI) {
    selectedVoice = voices.find((v) => v.voiceURI === config.voiceURI) || null;
  }
  if (!selectedVoice) {
    selectedVoice = findBestSpanishVoice(voices);
  }

  isSpeaking = true;
  isPaused = false;
  currentParagraphIndex = startIndex;

  const validParagraphs = paragraphs.slice(startIndex);
  if (validParagraphs.length === 0) {
    config.onEnd?.();
    return;
  }

  let pIndex = startIndex;

  const speakNext = (idx: number) => {
    if (idx >= paragraphs.length || !isSpeaking) {
      isSpeaking = false;
      config.onEnd?.();
      return;
    }

    currentParagraphIndex = idx;
    config.onParagraphChange?.(idx);

    const text = paragraphs[idx];
    if (!text || text.trim().length === 0) {
      speakNext(idx + 1);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    if (selectedVoice) {
      utterance.voice = selectedVoice;
      utterance.lang = selectedVoice.lang;
    } else {
      utterance.lang = "es-MX";
    }

    utterance.rate = config.rate ?? 1.0;
    utterance.pitch = config.pitch ?? 1.0;
    utterance.volume = config.volume ?? 1.0;

    utterance.onboundary = (event) => {
      config.onWord?.(event.charIndex, text);
    };

    utterance.onend = () => {
      if (isSpeaking && !isPaused) {
        speakNext(idx + 1);
      }
    };

    utterance.onerror = (e) => {
      if (e.error !== "canceled" && e.error !== "interrupted") {
        console.warn("Speech error on paragraph:", e);
        config.onError?.(e);
      }
      if (isSpeaking && e.error !== "canceled") {
        speakNext(idx + 1);
      }
    };

    activeUtterances = [utterance];
    window.speechSynthesis.speak(utterance);
  };

  speakNext(pIndex);
}

export function getSpeechStatus() {
  return {
    isSpeaking,
    isPaused,
    currentParagraphIndex,
  };
}
