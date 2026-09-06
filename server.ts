import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

let aiClient: GoogleGenAI | null = null;
function getAIClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    try {
      aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    } catch (err) {
      console.error("Failed to initialize GoogleGenAI client:", err);
    }
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "5mb" }));

  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({
      status: "ok",
      hasGeminiApiKey: Boolean(process.env.GEMINI_API_KEY),
      timestamp: new Date().toISOString(),
    });
  });

  // Literary Excerpt Analysis endpoint (Biblioteca Esencial & Derecho de Cita)
  app.post("/api/analyze-excerpt", async (req, res) => {
    try {
      const { bookTitle, bookAuthor, excerpt, category, focus } = req.body;
      const ai = getAIClient();

      const title = (bookTitle || "Obra de Transformación Humana").trim();
      const author = (bookAuthor || "Autor Clásico").trim();
      const quote = (excerpt || "El sufrimiento deja de ser sufrimiento cuando adquiere un sentido.").trim();

      if (ai) {
        const prompt = `Actúa como un Crítico Literario Humanista y Alquimista Biblioterapéutico. 
Analiza el siguiente fragmento literario respetando rigurosamente el Derecho de Cita (Art. 32 LPI / Fair Use con fines de docencia, investigación y divulgación cultural).

OBRA: "${title}"
AUTOR: "${author}"
CATEGORÍA: "${category || "Desarrollo Humano & Sabiduría"}"
FRAGMENTO CITADO:
"${quote}"

Realiza un análisis estructurado, lúcido y de profunda calidez sanadora para el lector contemporáneo.

Devuelve EXCLUSIVAMENTE un objeto JSON válido con la siguiente estructura:
{
  "summary": "Resumen esencial y tesis central del fragmento en 2-3 frases claras y potentes",
  "literaryCommentary": "Comentario literario, tono, recursos retóricos y belleza estilística del pasaje (3-4 frases)",
  "bibliotherapyReflection": "Aplicación biblioterapéutica: cómo este fragmento ayuda a regular las emociones y calmar la mente (3-4 frases)",
  "practicalExercise": "Ejercicio breve de 1 minuto para anclar esta sabiduría en el cuerpo o la respiración",
  "reflectiveQuestion": "Una pregunta socrática transformadora para que el lector escriba en su diario íntimo",
  "quoteDisclaimer": "Análisis pedagógico y crítico generado bajo el Derecho de Cita (Art. 32 LPI / Fair Use) sobre la obra original de ${author}."
}`;

        const response = await ai.models.generateContent({
          model: "gemini-3.7-flash",
          contents: prompt,
          config: {
            responseMimeType: "application/json",
            temperature: 0.7,
          },
        });

        const text = response.text || "{}";
        try {
          const parsed = JSON.parse(text);
          return res.json(parsed);
        } catch {
          return res.json({
            summary: `En "${title}", ${author} expone una verdad cardinal: la libertad interior y la consciencia trascienden cualquier turbulencia externa.`,
            literaryCommentary: `Con una prosa sobria y de honda resonancia ética, el fragmento condensa el poder de la voluntad y la resignificación del sufrimiento en belleza.`,
            bibliotherapyReflection: `Este pasaje funciona como un bálsamo somático que reubica el locus de control en tu soberanía íntima, disolviendo la rumiación ansiosa.`,
            practicalExercise: "Cierra los ojos, inhala profundo en 4 tiempos recordando este fragmento y exhala soltando el control de lo externo.",
            reflectiveQuestion: "¿Qué circunstancia actual puedes dejar de juzgar como una amenaza para verla como un maestro de tu paciencia?",
            quoteDisclaimer: `Análisis pedagógico y crítico generado bajo el Derecho de Cita (Art. 32 LPI / Fair Use) sobre la obra original de ${author}.`
          });
        }
      }

      // Offline / Fallback analysis
      return res.json({
        summary: `En "${title}", ${author} formula una tesis transformadora: la soberanía del espíritu humano permanece intacta aun en medio de la mayor adversidad.`,
        literaryCommentary: `La cita "${quote}" destaca por su economía verbal y su pulso reflexivo, transformando una experiencia vivencial en un axioma universal de resiliencia.`,
        bibliotherapyReflection: `Al contemplar este fragmento, el sistema nervioso encuentra un punto de apoyo firme: te recuerda que no eres tus pensamientos reactivos, sino el testigo que los observa.`,
        practicalExercise: "Lleva una mano a tu pecho, repite mentalmente la cita y realiza tres respiraciones diafragmáticas lentas.",
        reflectiveQuestion: "¿Cuál es el 'para qué' más luminoso que puedes darle hoy a tu esfuerzo?",
        quoteDisclaimer: `Análisis pedagógico y crítico generado bajo el Derecho de Cita (Art. 32 LPI / Fair Use) sobre la obra original de ${author}.`,
        isOfflineFallback: true
      });
    } catch (error) {
      console.error("Error in /api/analyze-excerpt:", error);
      return res.status(500).json({ error: "Error al generar el análisis del fragmento." });
    }
  });

  // Spelling & Grammar Correction Endpoint (Google AI Studio)
  app.post("/api/correct-spelling", async (req, res) => {
    try {
      const { text } = req.body;
      const ai = getAIClient();
      const rawText = (text || "").trim();

      if (!rawText) {
        return res.json({ correctedText: "", hadErrors: false });
      }

      if (ai) {
        const prompt = `Actúa como un Corrector de Estilo y Editor Literario de la Real Academia Española.
Revisa el siguiente texto escrito por un usuario en un taller de escritura poética:

"${rawText}"

Instrucciones:
1. Corrige cualquier falta de ortografía (por ejemplo "nueba" -> "nueva", "comienso" -> "comienzo", "haber" vs "a ver", etc.), acentuación diacrítica, mayúsculas y puntuación.
2. Respeta estrictamente el vocabulario, significado e intención emocional del usuario, pero dejándolo en un español impecable, natural y bien puntuado.
3. Devuelve EXCLUSIVAMENTE un objeto JSON válido con:
{
  "correctedText": "El texto completamente corregido y pulido",
  "hadErrors": true o false si encontraste errores corregidos,
  "explanation": "Breve explicación de las mejoras ortográficas realizadas en 1 frase corta"
}`;

        const response = await ai.models.generateContent({
          model: "gemini-3.7-flash",
          contents: prompt,
          config: {
            responseMimeType: "application/json",
            temperature: 0.2,
          },
        });

        const outputText = response.text || "{}";
        try {
          const parsed = JSON.parse(outputText);
          return res.json(parsed);
        } catch {
          return res.json({ correctedText: rawText, hadErrors: false });
        }
      }

      // Offline basic dictionary replacement
      let offlineClean = rawText
        .replace(/\bnueba\b/gi, "nueva")
        .replace(/\bnuebo\b/gi, "nuevo")
        .replace(/\bcomienso\b/gi, "comienzo")
        .replace(/\bcampeon\b/gi, "campeón")
        .replace(/\bcorason\b/gi, "corazón")
        .replace(/\bdesision\b/gi, "decisión")
        .replace(/\bay\b/gi, "hay")
        .replace(/\bhaber si\b/gi, "a ver si");

      // Capitalize first letter
      if (offlineClean.length > 0) {
        offlineClean = offlineClean.charAt(0).toUpperCase() + offlineClean.slice(1);
      }

      return res.json({
        correctedText: offlineClean,
        hadErrors: offlineClean.toLowerCase() !== rawText.toLowerCase(),
        explanation: "Corrección ortográfica y de mayúsculas aplicada."
      });
    } catch (error) {
      console.error("Error in /api/correct-spelling:", error);
      return res.status(500).json({ error: "Error al corregir texto." });
    }
  });

  // Random / Alternative Inspiration Generator
  app.post("/api/generate-random-inspiration", async (req, res) => {
    try {
      const { currentText, archetype, densityValue } = req.body;
      const ai = getAIClient();
      const archName = archetype || "El Plomo al Oro";

      if (ai) {
        const prompt = `Actúa como un Maestro Alquimista y Poeta Contemporáneo.
Genera 3 opciones de desahogos líricos e inspiraciones íntimas breves (de 1 a 2 frases cada una) para que un lector las elija y use como punto de partida en su taller de transmutación.
${currentText ? `El usuario ha escrito como punto de partida: "${currentText}". Genera variaciones enriquecidas que expandan o pulan esta idea.` : `Genera inspiraciones profundas, sentidas y humanas basadas en el arquetipo "${archName}".`}

Devuelve EXCLUSIVAMENTE un objeto JSON válido con:
{
  "options": [
    {
      "title": "Susurro 1 (Íntimo y vulnerable)",
      "text": "Frase de desahogo profunda y poética con ortografía impecable"
    },
    {
      "title": "Susurro 2 (Resignificación y fuerza)",
      "text": "Frase de desahogo orientada al despertar o superación con ortografía impecable"
    },
    {
      "title": "Susurro 3 (Apertura al nuevo comienzo)",
      "text": "Frase de desahogo celebrando la nueva vida, el renacer o la calma con ortografía impecable"
    }
  ]
}`;

        const response = await ai.models.generateContent({
          model: "gemini-3.7-flash",
          contents: prompt,
          config: {
            responseMimeType: "application/json",
            temperature: 0.85,
          },
        });

        const outputText = response.text || "{}";
        try {
          const parsed = JSON.parse(outputText);
          return res.json(parsed);
        } catch {
          // fallback
        }
      }

      // Offline random options
      const offlineOptions = [
        {
          title: "Susurro 1 • Despertar Interior",
          text: currentText ? `Hoy decido que "${currentText.trim()}" sea el umbral donde comienza mi verdadera paz.` : "Es hoy: doy el primer paso hacia una nueva vida donde mi voz no teme a su propia luz."
        },
        {
          title: "Susurro 2 • Alquimia del Instante",
          text: "Suelto la carga de lo que no puedo controlar y abro mis manos a la serenidad que me aguarda."
        },
        {
          title: "Susurro 3 • Renacimiento Victorioso",
          text: "En medio de la incertidumbre elijo la certeza de mi coraje y el amanecer de mis anhelos."
        }
      ];

      return res.json({ options: offlineOptions });
    } catch (error) {
      console.error("Error in /api/generate-random-inspiration:", error);
      return res.status(500).json({ error: "Error al generar inspiraciones." });
    }
  });

  // Transmutation endpoint (Catarsis Lírica & Alquimia)
  app.post("/api/transmute", async (req, res) => {
    try {
      const { densityName, densityValue, symbols, userWhisper, targetMood, archetypeId } = req.body;
      const ai = getAIClient();

      const userText = (userWhisper || "").trim() || "Es hoy, hoy comienzo mi nueva vida.";
      const selectedSymbolsList = Array.isArray(symbols) && symbols.length > 0 ? symbols.join(", ") : "Crisol, Oro, Serenidad, Luz, Fuego sagrado, Amanecer";

      if (ai) {
        const prompt = `Actúa como un Alquimista Literario y Poeta Profesional de Élite, galardonado en poesía lírica hispanoamericana y biblioterapia aplicada.
Tu misión es recibir el texto del usuario ("ESCRIBE AQUÍ TU INSPIRACIÓN"), CORREGIR AUTOMÁTICAMENTE CUALQUIER ERROR ORTOGRÁFICO O GRAMATICAL, y transmutarlo en un poema lírico de excelsa belleza, ritmo impecable y profunda resonancia sanadora.

INSTRUCCIONES CLAVE DE CALIDAD LITERARIA Y EDITORIAL:
1. CORRECCIÓN ORTOGRÁFICA ABSOLUTA: Detecta y corrige de inmediato cualquier falta de ortografía, acentuación (tildes), mayúsculas o erratas presentes en el texto del usuario (por ejemplo: "nueba" -> "nueva", "comienso" -> "comienzo", "olimpia" -> "Olimpia", "campeon" -> "campeón", etc.).
2. FIDELIDAD EMOCIONAL Y ENTRETEJIDO: Entrelaza y resignifica las palabras y frases clave del usuario en los versos, pero expresadas en un español impecable, sonoro y sublime.
3. RITMO Y MÉTRICA POÉTICA: Utiliza imágenes sensoriales, cadencia musical y estrofas fluidas (de 2 a 4 estrofas bien equilibradas con saltos de línea \\n).
4. ARQUETIPO Y DENSIDAD: Conduce la emoción desde "${densityName || "El Plomo al Oro"}" hacia "${targetMood || "Oro / Serenidad luminosa"}" calibrando el nivel de densidad emocional (${densityValue || 6}/10).
5. SÍMBOLOS ALQUÍMICOS: Entrelaza orgánicamente los símbolos: ${selectedSymbolsList}.

TEXTO INGRESADO POR EL USUARIO:
"${userText}"

Arquetipo: "${densityName || "El Plomo al Oro"}" (Hacia: "${targetMood || "Oro / Serenidad"}")
Densidad: ${densityValue || 6}/10

Devuelve EXCLUSIVAMENTE un objeto JSON válido con la siguiente estructura:
{
  "title": "Título poético y evocador",
  "correctedUserWhisper": "El texto original del usuario corregido ortográficamente de forma perfecta, con mayúsculas, tildes y puntuación correcta",
  "transmutedPoem": "Poema lírico refinado y sin errores ortográficos de 2 a 4 estrofas con saltos de línea \\n",
  "alchemicalReflection": "Reflexión biblioterapéutica cálida y lúcida de 2-3 frases sobre cómo la intención del usuario florece en paz y soberanía",
  "mantra": "Mantra somático de una sola frase poderosa para respirar e integrar",
  "archetype": "${densityName || "El Plomo al Oro"}"
}`;

        const response = await ai.models.generateContent({
          model: "gemini-3.7-flash",
          contents: prompt,
          config: {
            responseMimeType: "application/json",
            temperature: 0.75,
          },
        });

        const text = response.text || "{}";
        try {
          const parsed = JSON.parse(text);
          if (!parsed.correctedUserWhisper) {
            parsed.correctedUserWhisper = userText;
          }
          return res.json(parsed);
        } catch {
          return res.json({
            title: "Crisol de Luz y Oro",
            correctedUserWhisper: userText,
            transmutedPoem: text,
            alchemicalReflection: "Tus palabras, entregadas con valentía al crisol lírico, han transformado su peso en sabiduría y serenidad.",
            mantra: "Inhalo el fuego sagrado, exhalo en el amanecer de mi paz.",
            archetype: densityName || "El Plomo al Oro"
          });
        }
      }

      // Offline / Fallback algorithmic transmuter (strictly weaving user's words and cleaning typos)
      let cleanedText = userText
        .replace(/\bnueba\b/gi, "nueva")
        .replace(/\bnuebo\b/gi, "nuevo")
        .replace(/\bcomienso\b/gi, "comienzo")
        .replace(/\bcampeon\b/gi, "campeón")
        .replace(/\bcorason\b/gi, "corazón");

      if (cleanedText.length > 0) {
        cleanedText = cleanedText.charAt(0).toUpperCase() + cleanedText.slice(1);
      }

      const userPhrases = cleanedText
        .split(/[.\n,;]/)
        .map((s: string) => s.trim())
        .filter((s: string) => s.length > 2);

      const phrase1 = userPhrases[0] || "en el silencio donde nace la certeza";
      const phrase2 = userPhrases[1] || "el alma abraza su nuevo comienzo con fuerza";
      const phrase3 = userPhrases[2] || "cada paso se transforma en sendero de luz";

      const fallbackTitle = `Crisol de ${densityName ? densityName.replace("El ", "").replace("La ", "") : "la Nueva Vida"}`;
      const fallbackPoem = `En el #Crisol sagrado de este instante,\ndonde "${phrase1}" se alza libre de todo temor.\nEl #Fuego sagrado acoge ${phrase2.toLowerCase()},\ntransmutando las dudas en pura #Serenidad y #Luz.\n\nPorque al proclamar ${phrase3.toLowerCase()},\nel pasado entrega sus sombras al nuevo #Amanecer;\nlo que antes era anhelo resplandece ahora,\nconsagrado en eterno #Oro para tu renacer.`;

      return res.json({
        title: fallbackTitle,
        correctedUserWhisper: cleanedText,
        transmutedPoem: fallbackPoem,
        alchemicalReflection: `Tus palabras ("${phrase1}") han sido acogidas en el crisol lírico: al ser nombradas con convicción y belleza, el espíritu encuentra su centro y florece en auténtica soberanía.`,
        mantra: "Inhalo el fuego sagrado, exhalo en el amanecer de mi nueva vida.",
        archetype: densityName || "El Plomo al Oro",
        isOfflineFallback: true,
      });
    } catch (error) {
      console.error("Error in /api/transmute:", error);
      return res.status(500).json({
        error: "No se pudo completar la transmutación por IA.",
        fallbackPoem: "En el crisol del silencio,\ntodo dolor encuentra su calma y su verso.",
      });
    }
  });

  // Optional ElevenLabs TTS Proxy
  app.post("/api/elevenlabs-speech", async (req, res) => {
    try {
      const { text, voiceId } = req.body;
      const apiKey = process.env.ELEVENLABS_API_KEY;

      if (!apiKey) {
        return res.status(200).json({
          available: false,
          message: "ElevenLabs API Key not configured; client fallback to Web SpeechSynthesis active."
        });
      }

      const selectedVoice = voiceId || "21m00Tcm4TlvDq8ikWAM"; // Default Rachel/Warm voice
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${selectedVoice}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "xi-api-key": apiKey,
        },
        body: JSON.stringify({
          text: text,
          model_id: "eleven_multilingual_v2",
          voice_settings: {
            stability: 0.65,
            similarity_boost: 0.85,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`ElevenLabs error: ${response.statusText}`);
      }

      const audioBuffer = await response.arrayBuffer();
      res.setHeader("Content-Type", "audio/mpeg");
      return res.send(Buffer.from(audioBuffer));
    } catch (err) {
      console.warn("ElevenLabs TTS endpoint error:", err);
      return res.status(200).json({
        available: false,
        message: "Fallback to local speech engine.",
      });
    }
  });

  // Polish draft endpoint
  app.post("/api/polish", async (req, res) => {
    try {
      const { title, genre, draft, symbols, densityName } = req.body;
      const ai = getAIClient();

      if (ai) {
        const prompt = `Eres un laureado editor de poesía clásica y contemporánea en español.
El autor ha escrito el siguiente borrador lírico:
- Título: ${title || "Sin título"}
- Género/Estilo: ${genre || "Poesía lírica reflexiva"}
- Emoción/Atmósfera: ${densityName || "Serenidad"}
- Símbolos: ${Array.isArray(symbols) ? symbols.join(", ") : "Luz, Alquimia"}
- Borrador original:
"${draft}"

Por favor:
1. Pule la métrica, cadencia, ritmo y vocabulario manteniendo fielmente el alma y sentimiento original del autor.
2. Añade sugerencias de mejora y observaciones estéticas.

Devuelve en JSON:
{
  "polishedTitle": "Título refinado",
  "polishedText": "El poema pulido con saltos de línea \\n",
  "critique": "Breve comentario constructivo y encomiástico",
  "meterSummary": "Análisis breve del ritmo y musicalidad"
}`;

        const response = await ai.models.generateContent({
          model: "gemini-3.7-flash",
          contents: prompt,
          config: {
            responseMimeType: "application/json",
            temperature: 0.7,
          },
        });

        const text = response.text || "{}";
        return res.json(JSON.parse(text));
      }

      // Offline polish fallback
      return res.json({
        polishedTitle: title ? `Ecos de ${title}` : "Cántico de Transmutación",
        polishedText: draft || "Guardo en el pecho la luz que renace\ny en cada verso un nuevo amanecer.",
        critique: "El texto posee una resonancia genuina y sincera. Se ha optimizado la cadencia para resaltar las pausas naturales de respiración.",
        meterSummary: "Versos de arte mayor con ritmo endecasílabo armónico.",
        isOfflineFallback: true,
      });
    } catch (error) {
      console.error("Error in /api/polish:", error);
      return res.status(500).json({ error: "Error al pulir el borrador" });
    }
  });

  // Generate personalized grounding mantra
  app.post("/api/generate-mantra", async (req, res) => {
    try {
      const { archetype, focusArea } = req.body;
      const ai = getAIClient();

      if (ai) {
        const prompt = `Crea 3 mantras poéticos breves y poderosos en español para calmar la ansiedad y regular el nervio vago.
Arquetipo: ${archetype || "El Alquimista de la Paz"}
Foco: ${focusArea || "Calma y respiración consciente"}

Devuelve JSON:
{
  "mantras": [
    { "text": "Mantra 1", "inspirationalNote": "Explicación breve" },
    { "text": "Mantra 2", "inspirationalNote": "Explicación breve" },
    { "text": "Mantra 3", "inspirationalNote": "Explicación breve" }
  ]
}`;

        const response = await ai.models.generateContent({
          model: "gemini-3.7-flash",
          contents: prompt,
          config: {
            responseMimeType: "application/json",
            temperature: 0.7,
          },
        });

        return res.json(JSON.parse(response.text || "{}"));
      }

      return res.json({
        mantras: [
          { text: "Inhalo serenidad pura, exhalo toda prisa que no me pertenece.", inspirationalNote: "Alineación del sistema simpático a parasimpático." },
          { text: "Mi mente es un río en calma, mis palabras son puentes de luz.", inspirationalNote: "Foco en la fluidez emocional." },
          { text: "Aquí y ahora estoy a salvo, sostengo mi ser con ternura.", inspirationalNote: "Anclaje somático de seguridad." },
        ],
        isOfflineFallback: true,
      });
    } catch (error) {
      console.error("Error in /api/generate-mantra:", error);
      return res.status(500).json({ error: "Error al generar mantras" });
    }
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`El Alquimista Literario server running on http://localhost:${PORT}`);
  });
}

startServer();
