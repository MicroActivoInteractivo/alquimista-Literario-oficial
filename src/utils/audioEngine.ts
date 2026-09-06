// Ultra-Reliable HTML5 Audio & Hybrid Web Audio Player Engine
import { SoundscapeTrack } from "../types";
import { SOUNDSCAPE_TRACKS } from "../data/soundscapes";

type AudioStateListener = (state: {
  isPlaying: boolean;
  currentTrackId: string | null;
  volume: number;
  currentTime: number;
  duration: number;
  isLoading: boolean;
  hasError: boolean;
}) => void;

let htmlAudio: HTMLAudioElement | null = null;
let currentTrack: SoundscapeTrack | null = null;
let isPlaying = false;
let currentVolume = 0.5; // 50% default volume
let isLoading = false;
let hasError = false;
const listeners = new Set<AudioStateListener>();

// Optional Web Audio Fallback Synth Context
let webAudioCtx: AudioContext | null = null;
let webAudioOscs: OscillatorNode[] = [];
let webAudioGain: GainNode | null = null;

function notifyListeners() {
  const state = {
    isPlaying,
    currentTrackId: currentTrack ? currentTrack.id : null,
    volume: currentVolume,
    currentTime: htmlAudio ? htmlAudio.currentTime : 0,
    duration: htmlAudio && !isNaN(htmlAudio.duration) ? htmlAudio.duration : 0,
    isLoading,
    hasError
  };
  listeners.forEach(fn => {
    try {
      fn(state);
    } catch {
      // ignore listener error
    }
  });
}

function getOrCreateAudio(): HTMLAudioElement {
  if (!htmlAudio && typeof window !== "undefined") {
    htmlAudio = new Audio();
    htmlAudio.preload = "auto";
    htmlAudio.loop = true;
    htmlAudio.volume = currentVolume;

    htmlAudio.addEventListener("play", () => {
      isPlaying = true;
      isLoading = false;
      hasError = false;
      notifyListeners();
    });

    htmlAudio.addEventListener("pause", () => {
      isPlaying = false;
      notifyListeners();
    });

    htmlAudio.addEventListener("waiting", () => {
      isLoading = true;
      notifyListeners();
    });

    htmlAudio.addEventListener("playing", () => {
      isLoading = false;
      isPlaying = true;
      notifyListeners();
    });

    htmlAudio.addEventListener("timeupdate", () => {
      notifyListeners();
    });

    htmlAudio.addEventListener("error", () => {
      console.warn("Audio element failed to load stream, attempting fallback...");
      if (currentTrack && currentTrack.fallbackUrl && htmlAudio?.src !== currentTrack.fallbackUrl) {
        htmlAudio!.src = currentTrack.fallbackUrl;
        htmlAudio!.play().catch(() => {
          fallbackToWebAudio(currentTrack!);
        });
      } else if (currentTrack) {
        fallbackToWebAudio(currentTrack);
      }
    });
  }
  return htmlAudio!;
}

// Fallback Harmonic Tone Generator (Web Audio) if network stream is blocked
function fallbackToWebAudio(track: SoundscapeTrack) {
  try {
    stopWebAudio();
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;

    webAudioCtx = new AudioContextClass();
    if (webAudioCtx.state === "suspended") {
      webAudioCtx.resume();
    }

    webAudioGain = webAudioCtx.createGain();
    webAudioGain.gain.setValueAtTime(currentVolume * 0.4, webAudioCtx.currentTime);
    webAudioGain.connect(webAudioCtx.destination);

    const baseFreq = track.baseFreq || (track.category === "cristiana" ? 432 : 528);
    const harmonics = [baseFreq, baseFreq * 1.25, baseFreq * 1.5];

    harmonics.forEach((freq, i) => {
      const osc = webAudioCtx!.createOscillator();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, webAudioCtx!.currentTime);

      const subGain = webAudioCtx!.createGain();
      subGain.gain.setValueAtTime(0.3 / (i + 1), webAudioCtx!.currentTime);
      osc.connect(subGain);
      subGain.connect(webAudioGain!);
      osc.start();
      webAudioOscs.push(osc);
    });

    isPlaying = true;
    isLoading = false;
    notifyListeners();
  } catch (e) {
    console.error("Web audio fallback error:", e);
  }
}

function stopWebAudio() {
  if (webAudioOscs.length > 0) {
    webAudioOscs.forEach(osc => {
      try {
        osc.stop();
        osc.disconnect();
      } catch {
        // ignore
      }
    });
    webAudioOscs = [];
  }
  if (webAudioCtx && webAudioCtx.state !== "closed") {
    try {
      webAudioCtx.close();
    } catch {
      // ignore
    }
    webAudioCtx = null;
  }
}

export function subscribeAudioState(listener: AudioStateListener): () => void {
  listeners.add(listener);
  // Initial immediate call
  listener({
    isPlaying,
    currentTrackId: currentTrack ? currentTrack.id : null,
    volume: currentVolume,
    currentTime: htmlAudio ? htmlAudio.currentTime : 0,
    duration: htmlAudio && !isNaN(htmlAudio.duration) ? htmlAudio.duration : 0,
    isLoading,
    hasError
  });
  return () => {
    listeners.delete(listener);
  };
}

export function playSoundscape(track?: SoundscapeTrack, volume?: number): void {
  const targetTrack = track || currentTrack || SOUNDSCAPE_TRACKS[0];
  currentTrack = targetTrack;
  const audio = getOrCreateAudio();

  if (typeof volume === "number") {
    setSoundscapeVolume(volume);
  }

  stopWebAudio();

  if (targetTrack.audioUrl) {
    if (audio.src !== targetTrack.audioUrl) {
      audio.src = targetTrack.audioUrl;
      audio.load();
    }
    isLoading = true;
    notifyListeners();

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          isPlaying = true;
          isLoading = false;
          hasError = false;
          notifyListeners();
        })
        .catch((err) => {
          console.warn("Audio play prevented or errored, trying fallback:", err);
          if (targetTrack.fallbackUrl) {
            audio.src = targetTrack.fallbackUrl;
            audio.play().catch(() => fallbackToWebAudio(targetTrack));
          } else {
            fallbackToWebAudio(targetTrack);
          }
        });
    }
  } else {
    fallbackToWebAudio(targetTrack);
  }
}

export function pauseSoundscape(): void {
  if (htmlAudio) {
    htmlAudio.pause();
  }
  stopWebAudio();
  isPlaying = false;
  notifyListeners();
}

export function stopSoundscape(): void {
  if (htmlAudio) {
    htmlAudio.pause();
    htmlAudio.currentTime = 0;
  }
  stopWebAudio();
  isPlaying = false;
  notifyListeners();
}

export function togglePlayPause(track?: SoundscapeTrack): void {
  if (track && currentTrack?.id !== track.id) {
    playSoundscape(track);
    return;
  }
  if (isPlaying) {
    pauseSoundscape();
  } else {
    playSoundscape(currentTrack || SOUNDSCAPE_TRACKS[0]);
  }
}

export function setSoundscapeVolume(vol: number): void {
  currentVolume = Math.max(0, Math.min(1, vol));
  if (htmlAudio) {
    htmlAudio.volume = currentVolume;
  }
  if (webAudioGain && webAudioCtx) {
    webAudioGain.gain.setValueAtTime(currentVolume * 0.4, webAudioCtx.currentTime);
  }
  notifyListeners();
}

export function getSoundscapeVolume(): number {
  return currentVolume;
}

export function seekSoundscape(timeSec: number): void {
  if (htmlAudio && !isNaN(htmlAudio.duration) && htmlAudio.duration > 0) {
    htmlAudio.currentTime = Math.max(0, Math.min(htmlAudio.duration, timeSec));
    notifyListeners();
  }
}

export function playNextTrack(): void {
  const currentIndex = SOUNDSCAPE_TRACKS.findIndex(t => t.id === currentTrack?.id);
  const nextIndex = (currentIndex + 1) % SOUNDSCAPE_TRACKS.length;
  playSoundscape(SOUNDSCAPE_TRACKS[nextIndex]);
}

export function playPreviousTrack(): void {
  const currentIndex = SOUNDSCAPE_TRACKS.findIndex(t => t.id === currentTrack?.id);
  const prevIndex = (currentIndex - 1 + SOUNDSCAPE_TRACKS.length) % SOUNDSCAPE_TRACKS.length;
  playSoundscape(SOUNDSCAPE_TRACKS[prevIndex]);
}

export function isSoundscapePlaying(): boolean {
  return isPlaying;
}

export function getCurrentTrackId(): string | null {
  return currentTrack ? currentTrack.id : null;
}

export function getCurrentTrack(): SoundscapeTrack {
  return currentTrack || SOUNDSCAPE_TRACKS[0];
}

export function playVagusChime(frequency = 528): void {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(frequency, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.35, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 2.6);
  } catch {
    // ignore
  }
}
