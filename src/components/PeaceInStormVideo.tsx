import React, { useState, useRef } from "react";
import { Play, Pause, Volume2, VolumeX, Subtitles, Maximize, RotateCcw, Feather, ShieldCheck, Youtube, Image as ImageIcon, Sparkles, ExternalLink, Download, X, Eye, Heart, Compass } from "lucide-react";

interface SubtitleCue {
  id: number;
  start: number;
  end: number;
  text: string;
  subText: string;
}

const SUBTITLE_CUES: SubtitleCue[] = [
  {
    id: 1,
    start: 0,
    end: 5,
    text: "En medio del oleaje bravío, el corazón sabio no combate la marea...",
    subText: "El primer paso de la alquimia: no resistirse a lo que se siente.",
  },
  {
    id: 2,
    start: 5,
    end: 11,
    text: "Encuentra el santuario inmóvil en la profundidad de tu propio pecho.",
    subText: "Bajo la superficie de las olas, el océano siempre permanece en calma.",
  },
  {
    id: 3,
    start: 11,
    end: 18,
    text: "Toda tormenta es agua que purifica la tierra de tu renacer.",
    subText: "El dolor reconocido es abono fértil para la creación.",
  },
  {
    id: 4,
    start: 18,
    end: 25,
    text: "Inhala la quietud inamovible del faro; exhala el viento que ya pasó.",
    subText: "Tú no eres la tormenta; tú eres el espacio sagrado donde amanece.",
  },
  {
    id: 5,
    start: 25,
    end: 35,
    text: "El fuego sagrado del crisol transmuta las sombras en oro eterno.",
    subText: "Paz en la tormenta: la soberanía de quien abraza su verdad.",
  },
];

interface StormImage {
  id: string;
  title: string;
  subtitle: string;
  alchemicalSymbol: string;
  url: string;
  quote: string;
}

const STORM_IMAGES: StormImage[] = [
  {
    id: "faro_tempestad",
    title: "El Faro en la Tempestad",
    subtitle: "Centro inamovible ante el oleaje",
    alchemicalSymbol: "✦ Símbolo: El Faro y la Roca",
    url: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1200&q=80",
    quote: "Aunque ruja la marea alrededor, la luz del faro no titubea porque su base está anclada en la roca eterna.",
  },
  {
    id: "amanecer_nubes",
    title: "Amanecer Dorado tras la Lluvia",
    subtitle: "La luz quebranta la noche más densa",
    alchemicalSymbol: "✦ Símbolo: Rayos de Oro y Albor",
    url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    quote: "Toda nube cargada de tormenta guarda en su seno la promesa del amanecer más luminoso.",
  },
  {
    id: "oceano_profundo",
    title: "La Calma en el Fondo del Océano",
    subtitle: "Santuario somático bajo la superficie",
    alchemicalSymbol: "✦ Símbolo: Aguas Profundas",
    url: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
    quote: "Las olas pueden ser violentas en la superficie, pero a diez metros de profundidad reina un silencio sagrado e imperturbable.",
  },
  {
    id: "bosque_neblina",
    title: "Luz Sagrada entre la Niebla",
    subtitle: "Rocío que fecunda la tierra herida",
    alchemicalSymbol: "✦ Símbolo: Niebla y Claridad",
    url: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80",
    quote: "En la quietud del bosque, cada gota de lluvia es una caricia que nutre las raíces invisibles de tu ser.",
  },
  {
    id: "rosa_roca",
    title: "Floración en la Grieta",
    subtitle: "La vida que florece donde hubo dolor",
    alchemicalSymbol: "✦ Símbolo: La Rosa Alquímica",
    url: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1200&q=80",
    quote: "La herida es el lugar por donde entra la luz; en la piedra más dura brota la flor más resiliente.",
  },
  {
    id: "cumbre_crepusculo",
    title: "Cumbre sobre el Mar de Nubes",
    subtitle: "Elevación de la perspectiva interior",
    alchemicalSymbol: "✦ Símbolo: El Crisol de Altura",
    url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
    quote: "Al elevar tu mirada sobre las nubes del pensamiento, contemplas que el cielo siempre fue inmenso y claro.",
  },
];

interface PeaceInStormVideoProps {
  onSendToWorkshop?: (quote: string) => void;
}

export const PeaceInStormVideo: React.FC<PeaceInStormVideoProps> = ({ onSendToWorkshop }) => {
  const [activeTab, setActiveTab] = useState<"youtube" | "ambient">("youtube");
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showSubtitles, setShowSubtitles] = useState(true);
  const [, setCurrentTime] = useState(0);
  const [, setDuration] = useState(35);
  const [activeCue, setActiveCue] = useState<SubtitleCue | null>(SUBTITLE_CUES[0]);
  const [selectedLightboxImage, setSelectedLightboxImage] = useState<StormImage | null>(null);

  // Video time tracking for ambient mode
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const time = videoRef.current.currentTime;
    setCurrentTime(time);
    const current = SUBTITLE_CUES.find((c) => time >= c.start && time <= c.end);
    setActiveCue(current || null);
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((e) => {
        console.warn("Play interrupted:", e);
      });
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleRestart = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play();
    setIsPlaying(true);
  };

  const handleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  // WebVTT content
  const vttContent = `WEBVTT

1
00:00:00.000 --> 00:00:05.000
En medio del oleaje bravío, el corazón sabio no combate la marea...

2
00:00:05.000 --> 00:00:11.000
Encuentra el santuario inmóvil en la profundidad de tu propio pecho.

3
00:00:11.000 --> 00:00:18.000
Toda tormenta es agua que purifica la tierra de tu renacer.

4
00:00:18.000 --> 00:00:25.000
Inhala la quietud inamovible del faro; exhala el viento que ya pasó.

5
00:00:25.000 --> 00:00:35.000
El fuego sagrado del crisol transmuta las sombras en oro eterno.`;

  const vttDataUri = `data:text/vtt;charset=utf-8,${encodeURIComponent(vttContent)}`;

  const youtubeUrl = "https://www.youtube.com/watch?v=g4nRS1GcUjI&list=RDg4nRS1GcUjI&start_radio=1";

  return (
    <section id="video-paz-tormenta" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      
      {/* Section Header */}
      <div className="border-b border-slate-800 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 text-xs font-mono font-semibold uppercase tracking-wider mb-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>Módulo 03 • Experiencia Audiovisual & Galería</span>
          </div>
          <h2 className="font-display text-2xl sm:text-4xl font-bold text-white">
            Paz en la Tormenta
          </h2>
          <p className="font-serif-literary text-slate-300 text-base sm:text-lg mt-1">
            Música, video oficial y galería de imágenes contemplativas para aquietar el espíritu y anclar la serenidad interior.
          </p>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center p-1 rounded-2xl bg-slate-900/90 border border-slate-800">
          <button
            onClick={() => setActiveTab("youtube")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center space-x-1.5 ${
              activeTab === "youtube"
                ? "bg-red-600 text-white font-bold shadow-md shadow-red-950/50"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Youtube className="w-3.5 h-3.5" />
            <span>Video Oficial (YouTube)</span>
          </button>

          <button
            onClick={() => setActiveTab("ambient")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center space-x-1.5 ${
              activeTab === "ambient"
                ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-950/50"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Meditación Subtitulada</span>
          </button>
        </div>
      </div>

      {/* Main Video Cinema Container */}
      <div className="relative rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl group">
        
        {activeTab === "youtube" ? (
          /* YouTube Video Player Embed */
          <div className="relative aspect-video w-full max-h-[580px] bg-black">
            <iframe
              src="https://www.youtube-nocookie.com/embed/g4nRS1GcUjI?autoplay=0&rel=0&modestbranding=1"
              title="Paz en la Tormenta - Video Oficial"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full border-0"
            />
          </div>
        ) : (
          /* Native Ambient Video with WebVTT Subtitles */
          <div className="relative aspect-video w-full max-h-[560px] bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center overflow-hidden">
            <video
              ref={videoRef}
              playsInline
              loop
              muted={isMuted}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={(e) => setDuration(e.currentTarget.duration || 35)}
              className="w-full h-full object-cover opacity-85"
              poster="https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1920&q=80"
            >
              <source
                src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4"
                type="video/mp4"
              />
              <track
                kind="subtitles"
                src={vttDataUri}
                srcLang="es"
                label="Español (Subtítulos Alquímicos)"
                default
              />
              Tu navegador no soporta el reproductor de video HTML5 con subtítulos.
            </video>

            {/* Golden Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/40 pointer-events-none" />

            {/* Active Overlay Subtitles Bar */}
            {showSubtitles && activeCue && (
              <div className="absolute bottom-16 sm:bottom-20 left-4 right-4 sm:left-12 sm:right-12 text-center pointer-events-none z-20 animate-fade-in">
                <div className="inline-block max-w-2xl bg-black/85 backdrop-blur-md px-6 py-3.5 rounded-2xl border border-amber-500/30 shadow-2xl">
                  <p className="font-serif-literary text-base sm:text-xl md:text-2xl text-amber-200 font-medium tracking-wide drop-shadow-md">
                    "{activeCue.text}"
                  </p>
                  <p className="text-[11px] sm:text-xs font-mono text-cyan-300/90 mt-1">
                    ✦ {activeCue.subText}
                  </p>
                </div>
              </div>
            )}

            {/* Big Center Play/Pause button on Hover */}
            {!isPlaying && (
              <button
                onClick={togglePlay}
                className="absolute z-30 w-20 h-20 rounded-full bg-amber-500/90 hover:bg-amber-400 text-slate-950 flex items-center justify-center shadow-2xl shadow-amber-950/80 transition-transform transform hover:scale-110 active:scale-95"
                title="Reproducir video"
              >
                <Play className="w-8 h-8 fill-slate-950 ml-1" />
              </button>
            )}
          </div>
        )}

        {/* Video Control Bar & External Link */}
        <div className="p-4 sm:p-5 bg-slate-950 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
          
          {activeTab === "ambient" ? (
            <div className="flex items-center space-x-2">
              <button
                onClick={togglePlay}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-bold text-xs flex items-center space-x-2 shadow-md transition-all"
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-slate-950" /> : <Play className="w-4 h-4 fill-slate-950" />}
                <span>{isPlaying ? "Pausar" : "Reproducir"}</span>
              </button>

              <button
                onClick={handleRestart}
                title="Reiniciar video"
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={toggleMute}
                title={isMuted ? "Activar audio" : "Silenciar audio"}
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
              <span className="text-xs font-mono text-slate-300 font-bold">
                Reproduciendo: "Paz en la Tormenta"
              </span>
            </div>
          )}

          {/* Subtitles & Actions */}
          <div className="flex flex-wrap items-center gap-3">
            {activeTab === "ambient" && (
              <button
                onClick={() => setShowSubtitles(!showSubtitles)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all flex items-center space-x-1.5 ${
                  showSubtitles
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold"
                    : "bg-slate-900 text-slate-500 border border-slate-800 hover:text-slate-300"
                }`}
              >
                <Subtitles className="w-4 h-4" />
                <span>Subtítulos: {showSubtitles ? "ON" : "OFF"}</span>
              </button>
            )}

            {onSendToWorkshop && (
              <button
                onClick={() => onSendToWorkshop("Puedes tener paz en la tormenta, fe y esperanza cuando no puedas seguir; aun con tu mundo hecho pedazos, el Señor guiará tus pasos...")}
                className="px-3.5 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-medium transition-colors flex items-center space-x-1.5"
              >
                <Feather className="w-3.5 h-3.5" />
                <span>Llevar Letra al Taller</span>
              </button>
            )}

            <a
              href={youtubeUrl}
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-mono flex items-center space-x-1.5 transition-colors"
            >
              <span>Abrir en YouTube</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            {activeTab === "ambient" && (
              <button
                onClick={handleFullscreen}
                title="Pantalla completa"
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
              >
                <Maximize className="w-4 h-4" />
              </button>
            )}
          </div>

        </div>

      </div>

      {/* Curated Message & Lyrics Callout */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-950/30 via-slate-950 to-cyan-950/30 border border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start space-x-2 text-amber-400 text-xs font-mono font-bold uppercase">
            <Heart className="w-4 h-4 fill-amber-400" />
            <span>Mensaje y Anclaje Central:</span>
          </div>
          <p className="font-serif-literary text-base sm:text-lg text-slate-200 italic leading-relaxed max-w-2xl">
            "Puedes tener paz en la tormenta, fe y esperanza cuando no puedas seguir; aun con tu mundo hecho pedazos, el Señor guiará tus pasos en paz en medio de la tormenta."
          </p>
        </div>

        {onSendToWorkshop && (
          <button
            onClick={() => onSendToWorkshop("Puedes tener paz en la tormenta, fe y esperanza cuando no puedas seguir; aun con tu mundo hecho pedazos...")}
            className="shrink-0 px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-bold text-xs flex items-center space-x-2 shadow-lg shadow-amber-950/40 transition-all hover:scale-105 active:scale-95"
          >
            <Feather className="w-4 h-4" />
            <span>Transmutar este Mensaje</span>
          </button>
        )}
      </div>

      {/* Imagery Gallery: "Imágenes de Paz en la Tormenta" */}
      <div className="space-y-6 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-slate-800/80 pb-4">
          <div>
            <div className="flex items-center space-x-2 text-amber-400 text-xs font-mono font-semibold uppercase tracking-wider mb-1">
              <ImageIcon className="w-4 h-4 text-amber-400" />
              <span>Galería Visual • Santuario de Imágenes</span>
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
              Imágenes de Paz en la Tormenta
            </h3>
            <p className="font-serif-literary text-slate-400 text-sm">
              Paisajes y metáforas visuales de alta resolución para la meditación, la respiración serena y la contemplación.
            </p>
          </div>

          <span className="text-xs text-slate-500 font-mono bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800 self-start sm:self-auto">
            {STORM_IMAGES.length} Láminas Visuales
          </span>
        </div>

        {/* Responsive Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {STORM_IMAGES.map((img) => (
            <div
              key={img.id}
              className="group relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-800/90 hover:border-amber-500/50 transition-all duration-300 shadow-xl flex flex-col"
            >
              {/* Image Container with Zoom Effect */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950">
                <img
                  src={img.url}
                  alt={img.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                
                {/* Symbol Tag */}
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-amber-500/40 text-[10px] font-mono text-amber-300">
                    {img.alchemicalSymbol}
                  </span>
                </div>

                {/* Quick View Button */}
                <button
                  onClick={() => setSelectedLightboxImage(img)}
                  className="absolute bottom-3 right-3 p-2 rounded-xl bg-slate-950/80 hover:bg-amber-500 text-slate-300 hover:text-slate-950 backdrop-blur-md border border-slate-700 transition-all opacity-0 group-hover:opacity-100 shadow-lg"
                  title="Ver en pantalla completa"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>

              {/* Card Details */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-1.5">
                  <h4 className="font-display text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                    {img.title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {img.subtitle}
                  </p>
                  <p className="font-serif-literary text-xs text-amber-200/90 italic pt-1 line-clamp-2">
                    "{img.quote}"
                  </p>
                </div>

                {/* Card Actions */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                  <button
                    onClick={() => setSelectedLightboxImage(img)}
                    className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center space-x-1"
                  >
                    <span>Contemplar</span>
                    <span>→</span>
                  </button>

                  {onSendToWorkshop && (
                    <button
                      onClick={() => onSendToWorkshop(`Inspirado en "${img.title}":\n"${img.quote}"\n\nMi propia vivencia de paz en medio de la tormenta es: `)}
                      className="px-2.5 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[11px] font-mono transition-colors flex items-center space-x-1"
                    >
                      <Feather className="w-3 h-3" />
                      <span>Inspirar Taller</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal for Contemplation */}
      {selectedLightboxImage && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fade-in">
          <div className="relative max-w-4xl w-full bg-slate-950 border border-amber-500/40 rounded-3xl overflow-hidden shadow-2xl space-y-4">
            
            {/* Modal Header */}
            <div className="p-4 sm:p-5 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <Compass className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-mono text-amber-300 uppercase font-bold">
                  {selectedLightboxImage.title}
                </span>
              </div>
              <button
                onClick={() => setSelectedLightboxImage(null)}
                className="p-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Big Image */}
            <div className="relative aspect-[16/10] w-full bg-slate-900 max-h-[60vh] overflow-hidden">
              <img
                src={selectedLightboxImage.url}
                alt={selectedLightboxImage.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-center sm:text-left">
                <p className="font-serif-literary text-base sm:text-xl text-white italic drop-shadow-md">
                  "{selectedLightboxImage.quote}"
                </p>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="p-4 sm:p-5 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs font-mono text-slate-400">
                {selectedLightboxImage.alchemicalSymbol}
              </span>

              <div className="flex items-center space-x-3">
                {onSendToWorkshop && (
                  <button
                    onClick={() => {
                      onSendToWorkshop(`Inspirado en "${selectedLightboxImage.title}":\n"${selectedLightboxImage.quote}"\n\nMi sentir de paz en la tormenta es: `);
                      setSelectedLightboxImage(null);
                    }}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-bold text-xs flex items-center space-x-1.5 shadow-md shadow-amber-950/40"
                  >
                    <Feather className="w-3.5 h-3.5" />
                    <span>Llevar Cita al Taller</span>
                  </button>
                )}

                <a
                  href={selectedLightboxImage.url}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-mono flex items-center space-x-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Descargar HD</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
