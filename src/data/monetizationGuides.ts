import { MonetizationPlatform } from "../types";

export const MONETIZATION_PLATFORMS: MonetizationPlatform[] = [
  {
    id: "kdp",
    name: "Amazon KDP (Kindle Direct Publishing)",
    badge: "Publicación Global",
    tagline: "Libros impresos bajo demanda (Print on Demand) y eBooks Kindle a nivel mundial.",
    summary: "La plataforma líder mundial para autopublicar poemarios, antologías y libros en formato e-Book Kindle y libro impreso en papel bajo demanda, sin ningún costo de inversión inicial en tirajes.",
    iconBg: "bg-amber-500/20 text-amber-300",
    borderColor: "border-amber-500/40",
    officialUrl: "https://kdp.amazon.com",
    avgRoyaltyRate: "60% en papel (menos coste de impresión) / 70% en eBook",
    payoutModel: "Depósito bancario mensual (60 días tras cierre de mes)",
    pdfTitle: "Guía_Oficial_Amazon_KDP_Autopublicacion_Anonima.pdf",
    requirements: [
      "Manuscrito en PDF maquetado para papel o .kpf/.docx para eBook.",
      "Portada en PDF de alta resolución (300 DPI) con medidas exactas de lomo.",
      "Cuenta de Amazon KDP gratuita vinculada a tu cuenta fiscal de cobro.",
      "ISBN gratuito proporcionado por Amazon o tu propio ISBN registrado."
    ],
    stepByStep: [
      "1. Accede a kdp.amazon.com e inicia sesión con tu cuenta de Amazon.",
      "2. Haz clic en '+ Crear' y selecciona 'Libro de tapa blanda' o 'eBook Kindle'.",
      "3. En los detalles del libro, introduce el título, subtítulo y en el campo 'Autor' coloca tu Seudónimo Artístico.",
      "4. En la descripción del libro, redacta una sinopsis atractiva que resalte el valor emocional o estético de tu obra.",
      "5. Sube tu manuscrito en PDF (interior) y tu portada completa calculada.",
      "6. Utiliza el 'Previsualizador de impresión' de KDP para comprobar que no existan cortes de texto ni márgenes desalineados.",
      "7. Establece el precio de venta en dólares/euros y el territorio de distribución (Mundial).",
      "8. Haz clic en 'Publicar': Amazon revisará tu libro en 24-72 horas y estará disponible para compra en todo el planeta."
    ],
    tipsForAnonymity: [
      "En Amazon KDP, los datos fiscales (nombre real, identificación y cuenta bancaria) son estrictamente privados y confidenciales entre tú y Amazon para la tributación de regalías.",
      "En la portada, lomo, contraportada, interior del libro y en tu página de autor de Amazon Author Central solo aparecerá tu Seudónimo.",
      "No necesitas crear una empresa: puedes registrarte como persona física con tu identificación local."
    ]
  },
  {
    id: "substack",
    name: "Substack",
    badge: "Mecenazgo & Boletín",
    tagline: "Crea tu comunidad de lectores fieles y recibe suscripciones mensuales recurrentes.",
    summary: "La plataforma de newsletters y ensayos literarios que te permite enviar poemas semanales o reflexiones directamente al correo de tus lectores y ofrecer suscripciones de pago voluntarias.",
    iconBg: "bg-orange-500/20 text-orange-300",
    borderColor: "border-orange-500/40",
    officialUrl: "https://substack.com",
    avgRoyaltyRate: "90% de los ingresos por suscripción (Substack toma 10% + Stripe)",
    payoutModel: "Pagos directos a tu cuenta bancaria vía Stripe Connect",
    pdfTitle: "Guia_Substack_Comunidad_Lirica_Recurrente.pdf",
    requirements: [
      "Una cuenta gratuita en Substack.com.",
      "Conexión con Stripe para habilitar pagos por tarjeta de crédito/débito.",
      "Un nombre evocador para tu publicación (ej: 'El Crisol Semanal', 'Cartas de Medianoche').",
      "Frecuencia sugerida: 1 a 2 publicaciones por semana."
    ],
    stepByStep: [
      "1. Regístrate en Substack.com e introduce tu seudónimo como nombre de perfil.",
      "2. Elige el subdominio de tu publicación (ej: tuseudonimo.substack.com).",
      "3. Configura tu 'About page' explicando qué encontrarán tus lectores (poemas inéditos, audios, reflexiones).",
      "4. Publica tus primeros 3 artículos o poemas de acceso libre para construir tu archivo inicial.",
      "5. Conecta tu cuenta de Stripe Connect desde 'Settings > Payments'.",
      "6. Define el precio de la suscripción de pago (sugerido: $5/mes o $50/año).",
      "7. Ofrece contenido exclusivo a mecenas: poemarios descargables en PDF, notas de voz o acceso a debates privados."
    ],
    tipsForAnonymity: [
      "Configura tu nombre de remitente y firma con tu seudónimo.",
      "Stripe requiere verificación de identidad para procesar pagos, pero a los suscriptores solo les aparecerá en su extracto bancario el nombre de tu publicación comercial de Substack.",
      "Puedes usar un correo electrónico dedicado exclusivamente a tu proyecto literario."
    ]
  },
  {
    id: "medium",
    name: "Medium Partner Program",
    badge: "Monetización por Lectura",
    tagline: "Gana dinero en función del tiempo de lectura de una audiencia global.",
    summary: "Plataforma de publicación abierta con más de 100 millones de lectores activos. Recibe compensación económica cada vez que un miembro de Medium lee y valora tus historias, ensayos o prosas poéticas.",
    iconBg: "bg-emerald-500/20 text-emerald-300",
    borderColor: "border-emerald-500/40",
    officialUrl: "https://medium.com",
    avgRoyaltyRate: "Basado en minutos de lectura de miembros de pago y 'claps' de valor",
    payoutModel: "Mensual a través de Stripe Connect",
    pdfTitle: "Guia_Medium_Partner_Program_Monetizacion.pdf",
    requirements: [
      "Membresía activa de Medium para unirse al Partner Program ($5/mes).",
      "Publicar contenido original respetando los lineamientos de la comunidad.",
      "Tener al menos una historia publicada antes de aplicar."
    ],
    stepByStep: [
      "1. Crea tu perfil en Medium.com e ingresa una biografía con tu seudónimo.",
      "2. Dirígete a medium.com/earn y envía tu solicitud al Medium Partner Program.",
      "3. Conecta tu cuenta de Stripe para los depósitos bancarios.",
      "4. Al redactar un poema o microcuento, marca la casilla 'Monetizar esta historia'.",
      "5. Utiliza etiquetas relevantes como #Poetry, #MentalHealth, #SelfImprovement, #Philosophy.",
      "6. Envía tus poemas a publicaciones comunitarias de Medium (como The Lark, Illumination, Scribe) para multiplicar tu alcance orgánico."
    ],
    tipsForAnonymity: [
      "El perfil público de Medium no muestra ningún dato legal ni correo real.",
      "Elige una foto de perfil estética (ilustración alquímica, avatar abstracto o fotografía artística sin rostro).",
      "Mantén tus temas organizados en 'Lists' temáticas para que tus lectores naveguen fácilmente."
    ]
  },
  {
    id: "patreon",
    name: "Patreon",
    badge: "Club de Mecenas",
    tagline: "Recibe apoyo mensual recurrente de tus lectores más apasionados.",
    summary: "Crea diferentes niveles de suscripción con recompensas digitales exclusivas como poemas dedicados, avances de capítulos o audios de lectura.",
    iconBg: "bg-rose-500/20 text-rose-300",
    borderColor: "border-rose-500/40",
    officialUrl: "https://patreon.com",
    avgRoyaltyRate: "88% a 92% (Patreon retiene entre 5% y 8% según el plan)",
    payoutModel: "Retiros automáticos o manuales mensuales a PayPal / Banco",
    pdfTitle: "Guia_Patreon_Comunidad_Mecenas_Literarios.pdf",
    requirements: [
      "Página de Patreon con tu seudónimo.",
      "Estructura clara de niveles de patrocinio voluntario.",
      "Cuenta PayPal o Stripe para recibir los fondos."
    ],
    stepByStep: [
      "1. Crea tu página de creador en patreon.com usando tu seudónimo artístico.",
      "2. Configura los niveles de membresía (ej: 'Lector de Penumbra' $3/mes, 'Mecenas Alquimista' $9/mes).",
      "3. Ofrece recompensas digitales: PDFs exclusivos, notas de voz, agradecimientos en futuros libros impresos.",
      "4. Publica actualizaciones periódicas en el muro exclusivo para mecenas.",
      "5. Conecta tus cobros a tu cuenta bancaria o PayPal de forma segura."
    ],
    tipsForAnonymity: [
      "Patreon oculta completamente tus datos fiscales a los patrocinadores.",
      "Puedes interactuar con tus mecenas usando mensajes directos dentro de la plataforma sin exponer tus redes personales."
    ]
  },
  {
    id: "gumroad",
    name: "Gumroad",
    badge: "Venta Directa Digital",
    tagline: "Vende directamente tus PDFs, ePubs, audiolibros y láminas sin intermediarios.",
    summary: "Vende directamente tus antologías poéticas en formato PDF, ePub, audiolibros MP3 o láminas poéticas para imprimir sin necesidad de aprobación de editoriales.",
    iconBg: "bg-cyan-500/20 text-cyan-300",
    borderColor: "border-cyan-500/40",
    officialUrl: "https://gumroad.com",
    avgRoyaltyRate: "90% por venta (Gumroad retiene 10% plano)",
    payoutModel: "Pagos semanales o quincenales a cuenta bancaria o PayPal",
    pdfTitle: "Guia_Gumroad_Venta_Directa_Ebooks_Liricos.pdf",
    requirements: [
      "Manuscrito final en formato PDF o ePub listo para descargar.",
      "Cuenta gratuita en Gumroad.com.",
      "Fijar precio libre o modalidad 'Paga lo que quieras' (Pay what you want)."
    ],
    stepByStep: [
      "1. Abre una cuenta en Gumroad.com con tu correo y nombre de autor.",
      "2. Ve a 'Products > New Product' y selecciona 'Digital product'.",
      "3. Asigna un nombre a tu libro digital (ej: 'El Crisol Interior: Poemas de Sanación').",
      "4. Sube la portada en formato JPG/PNG y el archivo del libro en PDF/ePub.",
      "5. Establece el precio (ej: $7 o mínimo $0 para descargas gratuitas con donación voluntaria).",
      "6. Obtén tu enlace personalizado (gumroad.com/l/tu-libro) y compártelo en tus redes o biografía."
    ],
    tipsForAnonymity: [
      "El comprobante de compra del cliente muestra tu nombre público de tienda en Gumroad.",
      "Puedes habilitar generación de factura automática con IVA para compradores europeos sin que tengas que gestionar trámites adicionales."
    ]
  },
  {
    id: "d2d",
    name: "Draft2Digital (D2D)",
    badge: "Distribución Masiva",
    tagline: "Distribuye a Apple Books, Barnes & Noble, Kobo, Tolino y bibliotecas de un solo golpe.",
    summary: "Distribuye tu libro con un solo clic a Apple Books, Barnes & Noble, Kobo, Google Play Books, Smashwords y miles de bibliotecas públicas internacionales.",
    iconBg: "bg-indigo-500/20 text-indigo-300",
    borderColor: "border-indigo-500/40",
    officialUrl: "https://draft2digital.com",
    avgRoyaltyRate: "Aproximadamente 60% a 70% del precio de venta",
    payoutModel: "Mensual a PayPal, Payoneer o transferencia bancaria",
    pdfTitle: "Guia_Draft2Digital_Distribucion_Global.pdf",
    requirements: [
      "Manuscrito en formato Word (.docx). D2D lo convierte automáticamente a ePub perfecto.",
      "ISBN gratuito asignado por Draft2Digital o tu propio ISBN.",
      "Cuenta bancaria internacional o PayPal."
    ],
    stepByStep: [
      "1. Abre tu cuenta gratuita en Draft2Digital.com.",
      "2. Sube tu archivo .docx y deja que la herramienta genere portadillas, índices y tipografías automáticas.",
      "3. Sube tu imagen de portada.",
      "4. Selecciona en qué tiendas deseas distribuir tu libro (Apple Books, Kobo, Tolino, bibliotecas).",
      "5. Fija el precio y pulsa 'Publish Book'. Tu obra se enviará a todas las tiendas en 48 horas."
    ],
    tipsForAnonymity: [
      "D2D te permite registrar múltiples seudónimos bajo una misma cuenta administrativa.",
      "Excelente para complementar Amazon KDP y no depender de un único gigante tecnológico."
    ]
  }
];
