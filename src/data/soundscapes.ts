import { SoundscapeTrack } from "../types";

export interface AudioCategoryOption {
  id: string;
  name: string;
  badge: string;
  icon: string;
}

export const AUDIO_CATEGORIES: AudioCategoryOption[] = [
  { id: "todas", name: "Todas las Melodías", badge: "Catálogo Completo", icon: "🎵" },
  { id: "cristiana", name: "Cristiana Instrumental", badge: "Paz & Adoración", icon: "🕊️" },
  { id: "beethoven", name: "Ludwig van Beethoven", badge: "Clásico & Serenidad", icon: "🎼" },
  { id: "mozart", name: "W. A. Mozart", badge: "Efecto Mozart & Enfoque", icon: "🎻" },
  { id: "bach", name: "J. S. Bach", badge: "Armonía Sagrada", icon: "🎹" },
  { id: "frecuencias", name: "Frecuencias Alquímicas", badge: "528 Hz / 432 Hz", icon: "⚗️" },
  { id: "naturaleza", name: "Santuario Natural", badge: "Lluvia & Océano", icon: "🌧️" }
];

export const SOUNDSCAPE_TRACKS: SoundscapeTrack[] = [
  // --- MÚSICA CRISTIANA INSTRUMENTAL ---
  {
    id: "cristiana_paz_tormenta",
    name: "Paz en la Tormenta (Piano & Cuerdas)",
    composer: "Himno de Alabanza y Consuelo",
    frequencyLabel: "Adoración Instrumental • Frecuencia 432 Hz",
    description: "Serena melodía instrumental a piano suave con colchón de cuerdas orquestales que evoca reposo y confianza total en medio de la adversidad.",
    category: "cristiana",
    noiseType: "melody",
    melodyPattern: "paz_tormenta",
    bpm: 64,
    audioUrl: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3",
    fallbackUrl: "https://upload.wikimedia.org/wikipedia/commons/1/15/Amazing_Grace_%28USAF_Strolling_Strings%29.ogg"
  },
  {
    id: "cristiana_sublime_gracia",
    name: "Sublime Gracia (Amazing Grace)",
    composer: "John Newton • Arreglo Meditativo",
    frequencyLabel: "Gracia & Redención • Tono Cálido",
    description: "Interpretación celestial a tempo lento con armonías acústicas de piano y cuerdas para apaciguar el dolor y reencontrar la esperanza.",
    category: "cristiana",
    noiseType: "melody",
    melodyPattern: "amazing_grace",
    bpm: 58,
    audioUrl: "https://upload.wikimedia.org/wikipedia/commons/1/15/Amazing_Grace_%28USAF_Strolling_Strings%29.ogg",
    fallbackUrl: "https://cdn.pixabay.com/download/audio/2022/11/06/audio_4d998d361a.mp3"
  },
  {
    id: "cristiana_cuan_grande",
    name: "Cuán Grande es Él (How Great Thou Art)",
    composer: "Himno Clásico de Reverencia",
    frequencyLabel: "Reverencia Sagrada • Resonancia Áurea",
    description: "Acordes solemnes y arpegios envolventes que inspiran admiración, trascendencia y descanso para el espíritu cansado.",
    category: "cristiana",
    noiseType: "melody",
    melodyPattern: "cuan_grande",
    bpm: 60,
    audioUrl: "https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3",
    fallbackUrl: "https://upload.wikimedia.org/wikipedia/commons/1/15/Amazing_Grace_%28USAF_Strolling_Strings%29.ogg"
  },
  {
    id: "cristiana_silencio_sagrado",
    name: "En el Silencio de Tu Presencia",
    composer: "Meditación Instrumental Contemplativa",
    frequencyLabel: "Introspección & Oración • 528 Hz",
    description: "Progresiones armónicas de piano etéreo y campanas suaves diseñadas para la oración íntima y la liberación de la ansiedad.",
    category: "cristiana",
    noiseType: "melody",
    melodyPattern: "silencio_sagrado",
    bpm: 52,
    audioUrl: "https://cdn.pixabay.com/download/audio/2022/11/06/audio_4d998d361a.mp3",
    fallbackUrl: "https://cdn.pixabay.com/download/audio/2022/02/10/audio_5116743b35.mp3"
  },

  // --- LUDWIG VAN BEETHOVEN ---
  {
    id: "beethoven_claro_luna",
    name: "Claro de Luna (Moonlight Sonata - Adagio)",
    composer: "Ludwig van Beethoven",
    frequencyLabel: "Op. 27 No. 2 • Adagio Sostenuto",
    description: "La cumbre del lirismo introspectivo. Sus arpegios continuos en Do sostenido menor inducen una profunda relajación y calma nocturna.",
    category: "beethoven",
    noiseType: "melody",
    melodyPattern: "moonlight_sonata",
    bpm: 54,
    audioUrl: "https://upload.wikimedia.org/wikipedia/commons/e/eb/Beethoven_Moonlight_1st_movement.ogg",
    fallbackUrl: "https://cdn.pixabay.com/download/audio/2022/05/16/audio_c8540b615c.mp3"
  },
  {
    id: "beethoven_himno_alegria",
    name: "Himno a la Alegría (Oda a la Fraternidad)",
    composer: "Ludwig van Beethoven",
    frequencyLabel: "Sinfonía No. 9 • Versión Meditativa",
    description: "La inmortal melodía de fraternidad universal y triunfo del espíritu sobre el sufrimiento, arreglada en tempo calmo para cuerdas y piano.",
    category: "beethoven",
    noiseType: "melody",
    melodyPattern: "ode_to_joy",
    bpm: 68,
    audioUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Beethoven_Symphony_9_mvt_4_ode_to_joy.ogg",
    fallbackUrl: "https://cdn.pixabay.com/download/audio/2022/10/14/audio_9939f792cb.mp3"
  },
  {
    id: "beethoven_patetica_adagio",
    name: "Sonata Patética (Adagio Cantabile)",
    composer: "Ludwig van Beethoven",
    frequencyLabel: "Op. 13 • 2do Movimiento",
    description: "Uno de los temas más tiernos y consoladores de la historia de la música. Abraza la melancolía y la transforma en infinita serenidad.",
    category: "beethoven",
    noiseType: "melody",
    melodyPattern: "pathetique_adagio",
    bpm: 56,
    audioUrl: "https://upload.wikimedia.org/wikipedia/commons/f/fc/Beethoven_Pathetique_2nd_movement.ogg",
    fallbackUrl: "https://upload.wikimedia.org/wikipedia/commons/e/eb/Beethoven_Moonlight_1st_movement.ogg"
  },

  // --- WOLFGANG AMADEUS MOZART ---
  {
    id: "mozart_elvira_madigan",
    name: "Concierto para Piano No. 21 (Andante)",
    composer: "Wolfgang Amadeus Mozart",
    frequencyLabel: "K. 467 • 'Elvira Madigan' Andante",
    description: "La quintaesencia del 'Efecto Mozart'. Ondas melódicas equilibradas que reducen el cortisol y clarifican la mente creadora.",
    category: "mozart",
    noiseType: "melody",
    melodyPattern: "mozart_andante_21",
    bpm: 60,
    audioUrl: "https://upload.wikimedia.org/wikipedia/commons/3/36/Mozart_-_Piano_Concerto_No._21_in_C_major%2C_K._467_-_II._Andante.ogg",
    fallbackUrl: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Mozart_Ave_Verum_Corpus_K618.ogg"
  },
  {
    id: "mozart_lacrimosa",
    name: "Lacrimosa (Réquiem - Versión Instrumental)",
    composer: "Wolfgang Amadeus Mozart",
    frequencyLabel: "K. 626 • Elegía de Esperanza",
    description: "Polifonía solemne y emotiva que acompaña los procesos de duelo, purificación del alma y transmutación del dolor en belleza inmortal.",
    category: "mozart",
    noiseType: "melody",
    melodyPattern: "mozart_lacrimosa",
    bpm: 50,
    audioUrl: "https://upload.wikimedia.org/wikipedia/commons/0/07/Mozart_Requiem_Lacrimosa.ogg",
    fallbackUrl: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Mozart_Ave_Verum_Corpus_K618.ogg"
  },
  {
    id: "mozart_ave_verum",
    name: "Ave Verum Corpus (Cuerdas de Paz)",
    composer: "Wolfgang Amadeus Mozart",
    frequencyLabel: "K. 618 • Motete Sacro",
    description: "Pureza armónica absoluta en Re mayor. Una plegaria musical sin palabras que transmite sosiego, compasión y dulzura.",
    category: "mozart",
    noiseType: "melody",
    melodyPattern: "mozart_ave_verum",
    bpm: 52,
    audioUrl: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Mozart_Ave_Verum_Corpus_K618.ogg",
    fallbackUrl: "https://upload.wikimedia.org/wikipedia/commons/3/36/Mozart_-_Piano_Concerto_No._21_in_C_major%2C_K._467_-_II._Andante.ogg"
  },

  // --- JOHANN SEBASTIAN BACH ---
  {
    id: "bach_aria_g",
    name: "Aria en la Cuerda de Sol (Air on G String)",
    composer: "Johann Sebastian Bach",
    frequencyLabel: "Suite Orquestal No. 3 en Re Mayor",
    description: "Línea de bajo caminante y melodía sostenida que regula la respiración y genera un estado de quietud casi hipnótico.",
    category: "bach",
    noiseType: "melody",
    melodyPattern: "bach_air_g",
    bpm: 48,
    audioUrl: "https://upload.wikimedia.org/wikipedia/commons/2/21/Johann_Sebastian_Bach_-_Air_on_the_G_String.ogg",
    fallbackUrl: "https://upload.wikimedia.org/wikipedia/commons/f/fb/Jesu%2C_Joy_of_Man%27s_Desiring.ogg"
  },
  {
    id: "bach_jesus_alegria",
    name: "Jesús, Alegría de los Hombres (Jesu Joy)",
    composer: "Johann Sebastian Bach",
    frequencyLabel: "Cantata BWV 147 • Pastoral Sagrada",
    description: "Trinos pastorales fluidos en compás de 9/8 que simbolizan la dicha constante, la confianza interior y la luz en el camino.",
    category: "bach",
    noiseType: "melody",
    melodyPattern: "bach_jesu_joy",
    bpm: 66,
    audioUrl: "https://upload.wikimedia.org/wikipedia/commons/f/fb/Jesu%2C_Joy_of_Man%27s_Desiring.ogg",
    fallbackUrl: "https://upload.wikimedia.org/wikipedia/commons/2/21/Johann_Sebastian_Bach_-_Air_on_the_G_String.ogg"
  },

  // --- FRECUENCIAS ALQUÍMICAS ---
  {
    id: "freq_528",
    name: "Frecuencia de Transformación (528 Hz)",
    composer: "Tono Solfeggio Sagrado",
    frequencyLabel: "528 Hz • Tono del Milagro",
    description: "Onda armónica pura de 528 Hz que promueve la calma profunda, relajación muscular y regeneración mental.",
    category: "frecuencias",
    baseFreq: 528,
    modFreq: 4.5,
    audioUrl: "https://cdn.pixabay.com/download/audio/2022/02/10/audio_5116743b35.mp3"
  },
  {
    id: "freq_432",
    name: "Frecuencia Áurea Natural (432 Hz)",
    composer: "Afinación Universal Pitagórica",
    frequencyLabel: "432 Hz • Armonía Biológica",
    description: "Sintonización en resonancia con los patrones de la naturaleza y la respiración tranquila del sistema nervioso.",
    category: "frecuencias",
    baseFreq: 432,
    modFreq: 7.83,
    audioUrl: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3"
  },
  {
    id: "singing_bowl",
    name: "Cuenco Tibetano & Resonancia Vagal",
    composer: "Armónicos de Campana Sagrada",
    frequencyLabel: "136.1 Hz (OM Cósmico / Nervio Vago)",
    description: "Resonancia profunda multicapa que estimula el nervio vago y ralentiza los ritmos cardíacos acelerados.",
    category: "frecuencias",
    baseFreq: 136.1,
    noiseType: "singing-bowl",
    audioUrl: "https://upload.wikimedia.org/wikipedia/commons/0/08/Singing_bowl_sound.ogg"
  },

  // --- NATURALEZA ---
  {
    id: "soft_rain",
    name: "Lluvia de Medianoche en el Santuario",
    composer: "Hidroacústica Natural",
    frequencyLabel: "Ruido Rosa Filtrado & Gotas Suaves",
    description: "Frecuencias filtradas que emulan lluvia continua sobre tejas, ideal para la lectura tranquila y la catarsis lírica.",
    category: "naturaleza",
    baseFreq: 220,
    noiseType: "rain",
    audioUrl: "https://upload.wikimedia.org/wikipedia/commons/a/af/Rain_ambience.ogg",
    fallbackUrl: "https://cdn.pixabay.com/download/audio/2022/05/16/audio_db6591201e.mp3"
  },
  {
    id: "deep_ocean",
    name: "Olas del Océano en Calma Profunda",
    composer: "Marea Primordial",
    frequencyLabel: "Ciclos de Flujo y Reflujo",
    description: "Vaivén de olas marinas rítmicas que sincroniza el ritmo respiratorio con la inmensidad del mar.",
    category: "naturaleza",
    baseFreq: 180,
    noiseType: "waves",
    audioUrl: "https://upload.wikimedia.org/wikipedia/commons/c/ce/Ocean_waves_sound.ogg",
    fallbackUrl: "https://cdn.pixabay.com/download/audio/2021/09/06/audio_73229b0f49.mp3"
  }
];
