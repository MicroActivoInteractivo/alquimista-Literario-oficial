import React, { useState, useRef, useEffect } from "react";
import { startEmbraceMelody, pauseEmbraceMelody } from "../utils/embraceAudioEngine";

export const ClassicalAudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeInIntervalRef = useRef<any>(null);
  const fadeOutIntervalRef = useRef<any>(null);
  const useSynthFallbackRef = useRef<boolean>(false);

  const clearAllFades = () => {
    if (fadeInIntervalRef.current) {
      clearInterval(fadeInIntervalRef.current);
      fadeInIntervalRef.current = null;
    }
    if (fadeOutIntervalRef.current) {
      clearInterval(fadeOutIntervalRef.current);
      fadeOutIntervalRef.current = null;
    }
  };

  const toggleAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;

    clearAllFades();

    if (!isPlaying) {
      // Start Play with Fade-In
      setIsPlaying(true);

      // Try playing audio file first
      audio.volume = 0;
      const playPromise = audio.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            useSynthFallbackRef.current = false;
            // Efecto Fade-in (sube el volumen gradualmente en 1 segundo)
            fadeInIntervalRef.current = setInterval(() => {
              if (audio.volume < 0.9) {
                audio.volume = Math.min(1, audio.volume + 0.1);
              } else {
                audio.volume = 1;
                clearInterval(fadeInIntervalRef.current);
                fadeInIntervalRef.current = null;
              }
            }, 100);
          })
          .catch(() => {
            // Audio file not found or browser blocked file without user interaction:
            // Fallback gracefully to classical ambient synthesis so music is guaranteed to play!
            useSynthFallbackRef.current = true;
            startEmbraceMelody("claro_luna", 0.45);
          });
      }
    } else {
      // Pause with Fade-Out
      setIsPlaying(false);

      if (useSynthFallbackRef.current) {
        pauseEmbraceMelody();
      } else {
        // Efecto Fade-out (baja el volumen antes de pausar)
        fadeOutIntervalRef.current = setInterval(() => {
          if (audio.volume > 0.1) {
            audio.volume = Math.max(0, audio.volume - 0.1);
          } else {
            audio.pause();
            clearInterval(fadeOutIntervalRef.current);
            fadeOutIntervalRef.current = null;
          }
        }, 50);
      }
    }
  };

  useEffect(() => {
    return () => {
      clearAllFades();
      if (useSynthFallbackRef.current) {
        pauseEmbraceMelody();
      }
    };
  }, []);

  return (
    <div className="classical-player">
      <button
        id="audioControl"
        className="literary-btn"
        onClick={toggleAudio}
        type="button"
        title="Música clásica y de fondo"
      >
        <span className="music-icon">♫</span>
        <span id="btnText">
          {isPlaying ? "Pausar melodía" : "Escuchar música de fondo"}
        </span>
      </button>
      <audio
        id="literaryAudio"
        ref={audioRef}
        loop
        preload="auto"
      >
        <source src="musica-clasica-ai.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
};

export default ClassicalAudioPlayer;
