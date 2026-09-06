// Dedicated Real-time Polyphonic Synthesizer & Audio Engine for "El Abrazo del Alquimista"

export interface EmbraceMelodyOption {
  id: string;
  name: string;
  subtitle: string;
  frequency: string;
  notes: { note: number; duration: number }[]; // Note frequency in Hz, duration in seconds
  bpm: number;
}

// Predefined Harmonic Melodic Progressions (Pythagorean 432Hz & Solfeggio 528Hz tuned)
export const EMBRACE_MELODIES: EmbraceMelodyOption[] = [
  {
    id: "paz_tormenta",
    name: "Paz en la Tormenta",
    subtitle: "Piano Celestial & Cuerdas Alquímicas",
    frequency: "432 Hz",
    bpm: 54,
    notes: [
      { note: 256.87, duration: 2.0 }, // C4
      { note: 323.63, duration: 2.0 }, // E4
      { note: 384.87, duration: 2.5 }, // G4
      { note: 432.00, duration: 3.5 }, // A4 (432Hz)
      { note: 384.87, duration: 2.0 }, // G4
      { note: 323.63, duration: 2.0 }, // E4
      { note: 288.33, duration: 2.5 }, // D4
      { note: 256.87, duration: 4.0 }, // C4
      // Second phrase
      { note: 216.00, duration: 2.5 }, // A3
      { note: 256.87, duration: 2.0 }, // C4
      { note: 323.63, duration: 2.5 }, // E4
      { note: 288.33, duration: 3.5 }, // D4
      { note: 256.87, duration: 4.5 }, // C4 resolve
    ]
  },
  {
    id: "sublime_gracia",
    name: "Sublime Gracia (Amazing Grace)",
    subtitle: "Consuelo & Sanación del Alma",
    frequency: "432 Hz",
    bpm: 52,
    notes: [
      { note: 256.87, duration: 2.0 }, // C4
      { note: 342.88, duration: 3.0 }, // F4
      { note: 432.00, duration: 1.5 }, // A4
      { note: 384.87, duration: 1.5 }, // G4
      { note: 342.88, duration: 3.0 }, // F4
      { note: 432.00, duration: 3.0 }, // A4
      { note: 384.87, duration: 4.5 }, // G4
      { note: 432.00, duration: 2.0 }, // A4
      { note: 513.74, duration: 3.5 }, // C5
      { note: 432.00, duration: 2.0 }, // A4
      { note: 384.87, duration: 2.0 }, // G4
      { note: 342.88, duration: 4.0 }, // F4
      { note: 288.33, duration: 2.0 }, // D4
      { note: 256.87, duration: 4.5 }, // C4
    ]
  },
  {
    id: "silencio_sagrado",
    name: "En el Silencio de Tu Presencia",
    subtitle: "Campanas Alquímicas & Piano Etéreo",
    frequency: "528 Hz",
    bpm: 48,
    notes: [
      { note: 528.00, duration: 3.5 }, // 528Hz Solfeggio
      { note: 396.00, duration: 2.5 }, // 396Hz
      { note: 440.00, duration: 2.5 },
      { note: 528.00, duration: 4.0 },
      { note: 660.00, duration: 3.0 },
      { note: 528.00, duration: 3.0 },
      { note: 396.00, duration: 3.0 },
      { note: 330.00, duration: 4.5 },
    ]
  },
  {
    id: "claro_luna",
    name: "Claro de Luna (Beethoven)",
    subtitle: "Adagio Sostenuto de Paz",
    frequency: "432 Hz",
    bpm: 50,
    notes: [
      { note: 216.00, duration: 1.2 }, // A3
      { note: 256.87, duration: 1.2 }, // C4
      { note: 323.63, duration: 1.2 }, // E4
      { note: 216.00, duration: 1.2 },
      { note: 256.87, duration: 1.2 },
      { note: 323.63, duration: 1.2 },
      { note: 204.00, duration: 1.2 }, // G#3
      { note: 256.87, duration: 1.2 },
      { note: 323.63, duration: 1.2 },
      { note: 192.43, duration: 1.5 }, // G3
      { note: 242.45, duration: 1.5 }, // B3
      { note: 323.63, duration: 1.5 },
      { note: 181.63, duration: 2.0 }, // F#3
      { note: 216.00, duration: 2.0 },
      { note: 288.33, duration: 3.5 },
    ]
  }
];

let audioCtx: AudioContext | null = null;
let currentMelodyId = "paz_tormenta";
let isPlaying = false;
let volume = 0.5;
let noteTimer: number | null = null;
let currentNoteIndex = 0;
let listeners = new Set<(state: { isPlaying: boolean; melodyId: string; volume: number; noteIndex: number }) => void>();

function notify() {
  listeners.forEach((fn) => {
    try {
      fn({ isPlaying, melodyId: currentMelodyId, volume, noteIndex: currentNoteIndex });
    } catch {
      // ignore
    }
  });
}

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

function playNote(freq: number, duration: number) {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  
  // 1. Primary Warm Piano/Chime Tone
  const osc1 = ctx.createOscillator();
  const gain1 = ctx.createGain();
  osc1.type = "sine";
  osc1.frequency.setValueAtTime(freq, now);

  // Soft attack and natural acoustic exponential decay
  gain1.gain.setValueAtTime(0.0001, now);
  gain1.gain.linearRampToValueAtTime(volume * 0.45, now + 0.08);
  gain1.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  osc1.connect(gain1);
  gain1.connect(ctx.destination);
  osc1.start(now);
  osc1.stop(now + duration + 0.1);

  // 2. Harmonic Ambient Layer (Octave warm string tone)
  const osc2 = ctx.createOscillator();
  const gain2 = ctx.createGain();
  osc2.type = "triangle";
  osc2.frequency.setValueAtTime(freq * 0.5, now);

  gain2.gain.setValueAtTime(0.0001, now);
  gain2.gain.linearRampToValueAtTime(volume * 0.25, now + 0.2);
  gain2.gain.exponentialRampToValueAtTime(0.0001, now + duration * 1.2);

  osc2.connect(gain2);
  gain2.connect(ctx.destination);
  osc2.start(now);
  osc2.stop(now + duration * 1.2 + 0.1);

  // 3. Shimmer overtone (528Hz or 5th harmonic)
  const osc3 = ctx.createOscillator();
  const gain3 = ctx.createGain();
  osc3.type = "sine";
  osc3.frequency.setValueAtTime(freq * 1.5, now);

  gain3.gain.setValueAtTime(0.0001, now);
  gain3.gain.linearRampToValueAtTime(volume * 0.15, now + 0.12);
  gain3.gain.exponentialRampToValueAtTime(0.0001, now + duration * 0.9);

  osc3.connect(gain3);
  gain3.connect(ctx.destination);
  osc3.start(now);
  osc3.stop(now + duration * 0.9 + 0.1);
}

function scheduleNextNote() {
  if (!isPlaying) return;

  const melody = EMBRACE_MELODIES.find((m) => m.id === currentMelodyId) || EMBRACE_MELODIES[0];
  const item = melody.notes[currentNoteIndex];

  playNote(item.note, item.duration);
  notify();

  const noteDurationMs = (item.duration * 1000) * 0.88;

  noteTimer = window.setTimeout(() => {
    if (!isPlaying) return;
    currentNoteIndex = (currentNoteIndex + 1) % melody.notes.length;
    scheduleNextNote();
  }, noteDurationMs);
}

export function startEmbraceMelody(melodyId?: string, vol?: number) {
  if (melodyId) {
    currentMelodyId = melodyId;
    currentNoteIndex = 0;
  }
  if (typeof vol === "number") {
    volume = Math.max(0, Math.min(1, vol));
  }

  getAudioContext();
  if (noteTimer) {
    clearTimeout(noteTimer);
    noteTimer = null;
  }

  isPlaying = true;
  scheduleNextNote();
  notify();
}

export function pauseEmbraceMelody() {
  isPlaying = false;
  if (noteTimer) {
    clearTimeout(noteTimer);
    noteTimer = null;
  }
  notify();
}

export function toggleEmbraceMelody(melodyId?: string) {
  if (isPlaying) {
    if (melodyId && melodyId !== currentMelodyId) {
      startEmbraceMelody(melodyId);
    } else {
      pauseEmbraceMelody();
    }
  } else {
    startEmbraceMelody(melodyId || currentMelodyId);
  }
}

export function setEmbraceVolume(newVol: number) {
  volume = Math.max(0, Math.min(1, newVol));
  notify();
}

export function getEmbraceVolume(): number {
  return volume;
}

export function isEmbracePlaying(): boolean {
  return isPlaying;
}

export function getCurrentEmbraceMelodyId(): string {
  return currentMelodyId;
}

export function subscribeEmbraceState(
  listener: (state: { isPlaying: boolean; melodyId: string; volume: number; noteIndex: number }) => void
): () => void {
  listeners.add(listener);
  listener({ isPlaying, melodyId: currentMelodyId, volume, noteIndex: currentNoteIndex });
  return () => {
    listeners.delete(listener);
  };
}
