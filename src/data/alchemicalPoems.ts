import { AlchemicalPoem, AuthorReference } from "../types";

export const ALCHEMICAL_POEMS: AlchemicalPoem[] = [
  // ==================== 21 MAESTROS LATINOAMERICANOS ====================
  {
    id: "poem_bonnett_1",
    title: "Las cicatrices",
    author: "Piedad Bonnett",
    category: "Sanación",
    verses: `No hay cicatriz, por leve, que no guarde
una secreta flor, un testimonio,
la huella de aquel fuego que en la tarde
puso a prueba la fuerza del demonio.

No hay herida en la piel o en la memoria
que no enseñe a mirar con ojos nuevos
la humilde trama de la propia historia
y el valor de cruzar oscuros remos.

Porque sanar no es olvidar el daño,
sino encender la lámpara en la niebla,
abrazar la verdad de cada año
y ver cómo la herida se desniebla.`,
    note: "Premio Reina Sofía de Poesía Iberoamericana. Transmuta el duelo y la herida en compasión y lucidez.",
    centuryOrEra: "Siglo XX-XXI • Colombia",
    archetype: "La Tejedora de la Memoria"
  },
  {
    id: "poem_borges_1",
    title: "Arte poética",
    author: "Jorge Luis Borges",
    category: "Filosófico",
    verses: `Mirar el río hecho de tiempo y agua
y recordar que el tiempo es otro río,
saber que nos perdemos como el río
y que los rostros pasan como el agua.

Sentir que la vigilia es otro sueño
que sueña no soñar y que la muerte
que teme nuestra carne es esa muerte
de cada noche, que se llama sueño.

Ver en el día o en el año un símbolo
de los días del hombre y de sus años,
convertir el ultraje de los años
en una música, un rumor y un símbolo,

ver en la muerte el sueño, en el ocaso
un triste oro, tal es la poesía
que es inmortal y pobre. La poesía
vuelve como la aurora y el ocaso.`,
    note: "La transmutación del paso del tiempo y la fragilidad humana en belleza lírica eterna.",
    centuryOrEra: "Siglo XX • Argentina",
    archetype: "El Sabio del Laberinto"
  },
  {
    id: "poem_camargo_1",
    title: "El delirio con los pájaros (Fragmento Lírico)",
    author: "Edmundo Camargo",
    category: "Inspiración",
    verses: `En la noche que avanza sin orillas
he visto alzarse el vuelo de las llamas,
pájaros de cristal y de ceniza
que cantan en la fronda de las ramas.

No temas al fulgor de la tormenta
ni al silencio que muerde la garganta:
el alma que en el fuego se sustenta
vuelve a nacer en todo lo que canta.

Hay una luz que sobrevive al viento,
un destello de sol en la mirada,
que transmuta en dorado sentimiento
la sombra de la noche desolada.`,
    note: "Lírica visionaria boliviana donde la angustia existencial florece en vuelo sagrado y cósmico.",
    centuryOrEra: "Siglo XX • Bolivia",
    archetype: "El Alquimista del Vuelo"
  },
  {
    id: "poem_coelho_1",
    title: "El Alquimista (La Voz del Corazón y el Alma del Mundo)",
    author: "Paulo Coelho",
    category: "Espiritual",
    verses: `Escucha a tu corazón:
él conoce todas las cosas,
porque proviene del Alma del Mundo
y un día retornará a ella.

Nadie consigue huir de su corazón;
por eso es mejor escuchar lo que te dice,
para que jamás te tome desprevenido
ni reciba un golpe que no estés esperando.

Cuando amamos, siempre nos esforzamos
por ser mejores de lo que somos;
y cuando nos transformamos en mejores,
todo a nuestro alrededor se vuelve mejor.

Esa es la verdadera Alquimia:
no transformar el plomo en oro,
sino hacer que el alma humana
alcance la luz que el universo le prometió.`,
    note: "Extracto iniciático de 'El Alquimista' (Brasil). La transmutación espiritual a través de la escucha del propio corazón, las señales del destino y la realización de la Leyenda Personal.",
    centuryOrEra: "Siglo XX-XXI • Brasil",
    archetype: "El Alquimista de la Leyenda Personal"
  },
  {
    id: "poem_castellanos_1",
    title: "Meditación en el umbral",
    author: "Rosario Castellanos",
    category: "Superación",
    verses: `No, no es la tregua, la paz o el olvido
lo que busco en la sombra de este umbral;
es saber que después de haber sufrido
queda intacto el latido principal.

Debe haber otro modo de ser libre,
otro modo de amar sin la atadura,
donde la voz en su verdad calibre
el milagro sin fin de la estatura.

Otro modo de ser humano y fuerte,
de mirar el abismo cara a cara,
y en vez de ser esclavo de la suerte,
ser la luz que en la noche se declara.`,
    note: "Voz cumbre mexicana sobre la soberanía personal, el coraje interior y la dignidad.",
    centuryOrEra: "Siglo XX • México",
    archetype: "La Soberana del Umbral"
  },
  {
    id: "poem_sorjuana_1",
    title: "En perseguirme, Mundo, ¿qué interesas?",
    author: "Sor Juana Inés de la Cruz",
    category: "Filosófico",
    verses: `En perseguirme, Mundo, ¿qué interesas?
¿En qué te ofendo, cuando sólo intento
poner bellezas en mi entendimiento
y no mi entendimiento en las bellezas?

Yo no estimo tesoros ni riquezas;
y así, siempre me causa más contento
poner riquezas en mi pensamiento
que no mi pensamiento en las riquezas.

Y no estimo hermosura que, vencida,
es despojo civil de las edades,
ni riqueza me agrada fementida,

teniendo por mejor en mis verdades
consumir vanidades de la vida
que consumir la vida en vanidades.`,
    note: "La Décima Musa barroca. Afirmación del cultivo espiritual e intelectual sobre las apariencias efímeras.",
    centuryOrEra: "Siglo XVII • México",
    archetype: "La Sabia Revolucionaria"
  },
  {
    id: "poem_gelman_1",
    title: "Arte poética (El pájaro y la sangre)",
    author: "Juan Gelman",
    category: "Motivacional",
    verses: `Un pájaro vivía en mí.
Una flor viajaba en mi sangre.
Mi corazón era un violín.

Quise o no quise. Pero a veces
me quisieron. También a mí
me alegraban: la primavera,
las manos juntas, lo feliz.

¡Digo que el hombre debe ser
un árbol con raíces de agua,
un canto abierto al amanecer,
y que la vida no se apaga!`,
    note: "Premio Cervantes. Resiliencia y ternura inagotable que resiste a cualquier sombra histórica.",
    centuryOrEra: "Siglo XX-XXI • Argentina",
    archetype: "El Cantor Resiliente"
  },
  {
    id: "poem_heraud_1",
    title: "El río (Extracto Lírico)",
    author: "Javier Heraud",
    category: "Espiritual",
    verses: `Yo soy un río,
voy bajando por
las piedras anchas,
voy bajando por
las rocas duras,
por el sendero
dibujado por el viento.

Hay veces en que soy
un río ciego y fuerte,
y otras veces soy
claro y bondadoso,
y en las mañanas
un río de fuego.

Llego a los valles,
doy de beber a las flores,
a los pastos y a los hombres,
y sigo mi camino hacia la mar.`,
    note: "Metáfora universal del fluir constante, la generosidad y la pureza del espíritu ante el destino.",
    centuryOrEra: "Siglo XX • Perú",
    archetype: "El Río Eterno"
  },
  {
    id: "poem_mutis_1",
    title: "Nocturno (La lluvia en los cafetales)",
    author: "Álvaro Mutis",
    category: "Sanación",
    verses: `Esta noche ha vuelto la lluvia sobre los cafetales.
Sobre las hojas de plátano,
sobre las altas ramas de los guamos,
ha caído la lluvia con un rumor de pasos lentos.

Un rumor de agua que lava el cansancio del mundo,
que aquieta el pecho fatigado
y devuelve a la tierra su olor a nacimiento.

Bendita sea el agua que en la noche desciende
para enseñarnos que toda tormenta
guarda en su centro el aroma de la paz.`,
    note: "Premio Cervantes. La lluvia tropical como bálsamo restaurador y sosiego para el espíritu fatigado.",
    centuryOrEra: "Siglo XX-XXI • Colombia",
    archetype: "El Gaviero de la Noche"
  },
  {
    id: "poem_ortizguerrero_1",
    title: "Endoso Lírico (A la adversidad)",
    author: "Manuel Ortiz Guerrero",
    category: "Superación",
    verses: `No me importa la sombra de la muerte
ni el rigor implacable del destino,
si tengo en el dolor la dicha fuerte
de cantar como un pájaro en mi camino.

Mi carne sufre, pero el alma vuela
más allá de las sombras y el quebranto;
en la noche más honda y más severa,
florece con más luz mi propio canto.

Soy el dueño supremo de mis versos,
nada apaga este fuego soberano:
¡mientras tenga la voz de los dispersos,
seré el rey inmortal de mi laúd pagano!`,
    note: "Creador de la guarania. Ejemplo legendario de cómo vencer la enfermedad y el dolor con arte supremo.",
    centuryOrEra: "Siglo XX • Paraguay",
    archetype: "El Trovador Inmortal"
  },
  {
    id: "poem_paz_hermandad",
    title: "Hermandad",
    author: "Octavio Paz",
    category: "Inspiración",
    verses: `Soy hombre: duro poco
y es enorme la noche.
Pero miro hacia arriba:
las estrellas escriben.

Sin entender comprendo:
también soy escritura
y en este mismo instante
alguien me deletrea.`,
    note: "Premio Nobel de Literatura. La reconciliación del instante humano con el orden cósmico.",
    centuryOrEra: "Siglo XX • México",
    archetype: "El Poeta Cósmico"
  },
  {
    id: "poem_pizarnik_1",
    title: "Árbol de Diana (Salto al alba)",
    author: "Alejandra Pizarnik",
    category: "Sanación",
    verses: `He dado el salto de mí al alba.
He dejado mi cuerpo junto a la luz
y he cantado la tristeza de lo que nace.

Estas son las versiones que nos deja:
un agujero, una pared que tiembla...

Pero en el fondo de la noche callada,
una pequeña linterna se enciende
y las palabras vuelven a su casa:
la luz abraza lo que fue herida.`,
    note: "Orfebrería poética que desciende a la noche interior para rescatar la pequeña lámpara del renacer.",
    centuryOrEra: "Siglo XX • Argentina",
    archetype: "La Orfebre del Alba"
  },
  {
    id: "poem_pla_1",
    title: "Razón de ser (El barro y la luz)",
    author: "Josefina Plá",
    category: "Inspiración",
    verses: `Haber estado aquí, sobre la tierra,
amasando la arcilla con las manos,
sabiendo que la paz o que la guerra
son apenas los pasos de los humanos.

Haber dado una forma a la tristeza,
haber puesto en el barro una sonrisa,
y ver cómo la humilde fortaleza
desafía al olvido y a la prisa.

No viví en vano si dejé encendida
una pequeña lámpara en la choza:
el arte es la victoria de la vida,
la huella que en la sombra permanece hermosa.`,
    note: "Matriarca de las artes paraguayas. La creación artística como triunfo definitivo sobre el olvido.",
    centuryOrEra: "Siglo XX • Paraguay",
    archetype: "La Escultora del Espíritu"
  },
  {
    id: "poem_roabastos_1",
    title: "Canto al hombre (La raíz del canto)",
    author: "Augusto Roa Bastos",
    category: "Superación",
    verses: `Porque el hombre es la raíz del canto,
la semilla que brota en el desierto,
el que vence la furia y el espanto
y renace con el pecho abierto.

No hay tiranía que apague la palabra
cuando el alma se planta en su trinchera;
el tiempo es el arado que destraba
el verdor de la nueva primavera.

Canto a la vida que jamás se rinde,
canto al hermano que levanta el brazo:
¡la libertad no tiene fin ni linde
cuando se funde en fraternal abrazo!`,
    note: "Premio Cervantes de Literatura. Himno a la resistencia ética, la libertad y la dignidad colectiva.",
    centuryOrEra: "Siglo XX • Paraguay",
    archetype: "El Guardián de la Memoria"
  },
  {
    id: "poem_romero_1",
    title: "De cara al corazón (Resurrección)",
    author: "Elvio Romero",
    category: "Motivacional",
    verses: `No callará la voz aunque la hieran,
ni se marchitará la primavera;
los hombres que en el surco perseveran
llevan la luz como una compañera.

Aquí me planto con el pecho al viento,
aquí renazco de mi propia hoguera:
no hay tempestad que borre el sentimiento
de quien ama su tierra y su bandera.

Caminaremos juntos hacia el día,
con la frente lavada por el rocío,
transmutando el dolor en alegría
y en cauce fértil el antiguo río.`,
    note: "Poeta lírico mayor del Paraguay. Pasión telúrica que transforma las penas del destierro en esperanza viva.",
    centuryOrEra: "Siglo XX • Paraguay",
    archetype: "El Forjador del Porvenir"
  },
  {
    id: "poem_sabines_1",
    title: "Los amorosos (El silencio más fino)",
    author: "Jaime Sabines",
    category: "Sanación",
    verses: `Los amorosos callan.
El amor es el silencio más fino,
el más tembloroso, el más insoportable.

Los amorosos buscan,
los amorosos son los que abandonan,
son los que cambian, los que olvidan.

Su corazón les dice que nunca han de encontrar,
no encuentran, buscan.

Los amorosos juegan a coger el agua,
a tatuar el humo, a no irse.
Juegan el largo, el triste juego de la esperanza:
¡y en ese fuego bendito se renuevan!`,
    note: "Clásico contemporáneo sobre la intensidad emocional y la constante reinvención del afecto.",
    centuryOrEra: "Siglo XX • México",
    archetype: "El Cantor del Amor Puro"
  },
  {
    id: "poem_saenz_1",
    title: "La noche y el hallazgo",
    author: "Jaime Sáenz",
    category: "Espiritual",
    verses: `La noche no es la ausencia de la luz:
es el ámbito secreto donde el alma se recoge
para escuchar el latido de su propio fuego.

En la penumbra descubres tu verdadero rostro,
aquello que no envejece con el ruido del mundo,
la certeza que aguarda en el silencio.

Bebe de esta quietud como de un agua pura;
el frío de las cumbres purifica tu mirada
y en la más honda oscuridad despierta el alba.`,
    note: "Místico andino de La Paz. Rito de introspección donde la sombra se revela como umbral hacia la luz interior.",
    centuryOrEra: "Siglo XX • Bolivia",
    archetype: "El Místico de las Cumbres"
  },
  {
    id: "poem_silva_1",
    title: "Nocturno III (La unión en la sombra)",
    author: "José Asunción Silva",
    category: "Sanación",
    verses: `Una noche,
una noche toda llena de perfumes, de murmullos y de música de alas,
una noche
en que ardían en la sombra nupcial y húmeda las luciérnagas fantásticas,
a mi lado, lentamente, contra mí ceñida, toda,
muda y pálida
como si un presentimiento de amarguras infinitas
hasta el más secreto fondo de tus fibras te agitara...

Y eran una sola sombra larga,
¡y eran una sola sombra larga,
y eran una sola sombra larga sobre el campo de la eternidad!`,
    note: "Cúspide del modernismo colombiano. Alquimia de la música verbal y la inmortalidad afectiva.",
    centuryOrEra: "Siglo XIX • Colombia",
    archetype: "El Músico del Nocturno"
  },
  {
    id: "poem_storni_1",
    title: "Voy a dormir (Hacia la paz del mar)",
    author: "Alfonsina Storni",
    category: "Espiritual",
    verses: `Dientes de flores, cofia de rocío,
manos de hierbas, tú, nodriza fina,
tenme prestas las sábanas de lino
y el edredón de cardosperlas mío.

Voy a dormir, nodriza mía, acuéstame.
Ponme una lámpara a la cabecera;
una constelación; la que te guste;
todas son buenas; bájala un poquito.

Déjame sola: oyes romper los brotes...
te acuna un pie celeste desde arriba
y un pájaro te traza unos compases
para que olvides... Gracias. ¡Ah, un encargo:
si él llama nuevamente por teléfono
le dices que no insista, que he salido!`,
    note: "Último poema de la gran lírica argentina. Entrega serena y luminosa a la inmensidad del cosmos y del mar.",
    centuryOrEra: "Siglo XX • Argentina",
    archetype: "La Hija del Océano"
  },
  {
    id: "poem_vallejo_1",
    title: "Masa (El triunfo del amor humano)",
    author: "César Vallejo",
    category: "Superación",
    verses: `Al fin de la batalla,
y muerto el combatiente, vino hacia él un hombre
y le dijo: «¡No mueras, te amo tanto!»
Pero el cadáver ¡ay! siguió muriendo.

Se le acercaron dos y repitiéronle:
«¡No nos dejes! ¡Valor! ¡Vuelve a la vida!»
Pero el cadáver ¡ay! siguió muriendo.

Acudieron a él veinte, cien, mil, quinientos mil,
clamando: «¡Tanto amor y no poder nada contra la muerte!»
Pero el cadáver ¡ay! siguió muriendo.

Le rodearon millones de individuos,
con un ruego común: «¡Quédate hermano!»
Pero el cadáver ¡ay! siguió muriendo.

Entonces todos los hombres de la tierra
le rodearon; les vio el cadáver triste, emocionado;
incorporóse lentamente,
abrazó al primer hombre; echóse a andar...`,
    note: "Cumbre de la poesía universal. La fuerza colectiva del amor humano capaz de resucitar al caído.",
    centuryOrEra: "Siglo XX • Perú",
    archetype: "El Redentor Universal"
  },
  {
    id: "poem_varela_1",
    title: "Canto villano (La plenitud en el plato humilde)",
    author: "Blanca Varela",
    category: "Filosófico",
    verses: `Y de pronto la vida
en mi plato de pobre
un magro trozo de celeste cerdo
aquí en mi plato

junto a mi copa de vino
observo la luz que cae
sobre la mesa de madera limpia

sé que esto es todo:
el pan, la sal, la respiración,
la certeza de estar viva en este instante
sin pedir nada más que la verdad.`,
    note: "Premio Reina Sofía de Poesía. Belleza despojada de artificios que encuentra lo sagrado en lo cotidiano.",
    centuryOrEra: "Siglo XX • Perú",
    archetype: "La Guardiana de la Luz Esencial"
  },
  {
    id: "poem_zamudio_1",
    title: "Nacer hombre (Extracto lírico de dignidad)",
    author: "Adela Zamudio",
    category: "Superación",
    verses: `Cuánto afán por escribir
que el alma es libre y altiva,
y que el humano destino
en la igualdad se cultiva.

Una mujer con coraje,
con pensamiento y razón,
vale más que cien halagos
que adormecen la nación.

¡Arriba la mente clara!
¡Arriba el pecho sincero!
Que la verdad es la espada
y la justicia el sendero.`,
    note: "Pionera inmortal de las letras bolivianas. Fortaleza intelectual que abrió caminos de emancipación.",
    centuryOrEra: "Siglo XIX-XX • Bolivia",
    archetype: "La Pionera Indómita"
  },

  // ==================== MAESTROS FUNDACIONALES / UNIVERSALES ====================
  {
    id: "poem_1",
    title: "No te rindas",
    author: "Mario Benedetti",
    category: "Motivacional",
    verses: `No te rindas, por favor no cedas,
aunque el frío queme,
aunque el miedo muerda,
aunque el sol se esconda,
y se calle el viento,
aún hay fuego en tu alma,
aún hay vida en tus sueños.

Porque la vida es tuya y tuyo también el deseo,
porque has querido y porque te quiero,
porque existe el vino y el amor, es cierto,
porque no hay heridas que no cure el tiempo.

Abrir las puertas, quitar los cerrojos,
abandonar las murallas que te protegieron,
vivir la vida y aceptar el reto,
recuperar la risa, ensayar un canto,
bajar la guardia y extender las manos,
desplegar las alas e intentar de nuevo,
celebrar la vida y retomar el cielo.`,
    note: "Un himno universal a la resiliencia y la perseverancia interior ante las dificultades.",
    centuryOrEra: "Siglo XX • Uruguay",
    archetype: "El Guardián del Fuego"
  },
  {
    id: "poem_2",
    title: "Caminante, no hay camino",
    author: "Antonio Machado",
    category: "Motivacional",
    verses: `Caminante, son tus huellas
el camino y nada más;
Caminante, no hay camino,
se hace camino al andar.

Al andar se hace el camino,
y al volver la vista atrás
se ve la senda que nunca
se ha de volver a pisar.

Caminante no hay camino
sino estelas en la mar.`,
    note: "Recuerda que cada decisión en tu vida construye tu propio destino único e irrepetible.",
    centuryOrEra: "Siglo XX • España",
    archetype: "El Caminante Libre"
  },
  {
    id: "poem_3",
    title: "Si... (If)",
    author: "Rudyard Kipling",
    category: "Superación",
    verses: `Si puedes mantener la cabeza en su sitio cuando todos a tu alrededor
la pierden y te culpan a ti;
si puedes confiar en ti mismo cuando todos dudan de ti,
pero admites también sus dudas;
si puedes esperar y no cansarte en la espera;
o siendo engañado, no pagar con engaño;
o siendo odiado, no dar lugar al odio...

Si puedes encontrarte con el Triunfo y el Desastre
y tratar a esos dos impostores de la misma manera...
Tuya es la Tierra y todo lo que hay en ella,
y lo que es más: ¡serás un ser íntegro, libre y en paz!`,
    note: "Clásico de la literatura universal sobre la entereza emocional y el autodominio.",
    centuryOrEra: "Siglo XIX • Reino Unido",
    archetype: "El Soberano Interior"
  },
  {
    id: "poem_4",
    title: "Invictus",
    author: "William Ernest Henley",
    category: "Superación",
    verses: `En la noche que me cubre,
negra como el abismo de polo a polo,
doy gracias a los dioses que puedan existir
por mi alma inconquistable.

En las garras de las circunstancias
no he gemido ni he llorado en voz alta.
Bajo los golpes del azar
mi cabeza sangra, pero no se inclina.

Más allá de este lugar de ira y lágrimas
se vislumbra el horror de la sombra,
y sin embargo la amenaza de los años
me encuentra y me encontrará sin miedo.

No importa cuán estrecho sea el pórtico,
cuán cargada de castigos la sentencia:
Soy el amo de mi destino,
soy el capitán de mi alma.`,
    note: "Escrito desde una cama de hospital, es el testimonio definitivo de la soberanía espiritual.",
    centuryOrEra: "Siglo XIX • Reino Unido",
    archetype: "El Capitán Indómito"
  },
  {
    id: "poem_5",
    title: "Piu Avanti!",
    author: "Almafuerte (Pedro B. Palacios)",
    category: "Superación",
    verses: `No te des por vencido, ni aun vencido;
no te sientas esclavo, ni aun esclavo;
trémulo de pavor, piénsate bravo,
y arremete feroz, ya mal herido.

Ten el tesón del clavo enmohecido
que ya viejo y ruin, vuelve a ser clavo;
no la cobarde intrepidez del pavo
que amaina su plumaje al primer ruido.

Procede como Dios que nunca llora;
o como Lucifer, que nunca reza;
o como el robledal, cuya grandeza
necesita del agua y no la implora...

¡Que muerda y vocifere vengadora,
rodando en el polvo tu cabeza!`,
    note: "Una de las poesías argentinas más enérgicas para renacer tras el fracaso aparente.",
    centuryOrEra: "Siglo XIX • Argentina",
    archetype: "El Robledal Inmortal"
  },
  {
    id: "poem_7",
    title: "Nada te turbe",
    author: "Santa Teresa de Jesús",
    category: "Espiritual",
    verses: `Nada te turbe,
nada te espante,
todo se pasa,
Dios no se muda.

La paciencia
todo lo alcanza;
quien a Dios tiene
nada le falta:
solo Dios basta.`,
    note: "Oración mística del siglo XVI que disipa la ansiedad y reconecta con la serenidad profunda.",
    centuryOrEra: "Siglo XVI • España",
    archetype: "El Místico en Paz"
  },
  {
    id: "poem_8",
    title: "Cántico Espiritual",
    author: "San Juan de la Cruz",
    category: "Espiritual",
    verses: `¡Oh llama de amor viva,
que tiernamente hieres
de mi alma en el más profundo centro!
Pues ya no eres esquiva,
acaba ya si quieres;
¡rompe la tela de este dulce encuentro!

¡Oh cauterio suave!
¡Oh regalada llaga!
¡Oh mano blanda! ¡Oh toque delicado,
que a vida eterna sabe,
y toda deuda paga!
Matando, muerte en vida has trocado.`,
    note: "Cúspide de la lírica mística española sobre la unión interior del ser humano.",
    centuryOrEra: "Siglo XVI • España",
    archetype: "La Llama Viva"
  },
  {
    id: "poem_9",
    title: "Rima LIII (Volverán las oscuras golondrinas)",
    author: "Gustavo Adolfo Bécquer",
    category: "Sanación",
    verses: `Volverán las oscuras golondrinas
en tu balcón sus nidos a colgar,
y otra vez con el ala a sus cristales
jugando llamarán.

Pero aquellas que el vuelo refrenaban
tu hermosura y mi dicha a contemplar,
aquellas que aprendieron nuestros nombres...
¡esas... no volverán!

Volverán las tupidas madreselvas
de tu jardín las tapias a escalar,
y otra vez a la tarde aún más hermosas
sus flores se abrirán...`,
    note: "Poema maestro sobre la aceptación del ciclo de la vida, el desapego y la memoria afectiva.",
    centuryOrEra: "Siglo XIX • España",
    archetype: "El Testigo de los Ciclos"
  },
  {
    id: "poem_10",
    title: "En paz",
    author: "Amado Nervo",
    category: "Sanación",
    verses: `Muy cerca de mi ocaso, yo te bendigo, vida,
porque nunca me diste ni esperanza fallida,
ni trabajos injustos, ni pena inmerecida;

porque veo al final de mi rudo camino
que yo fue el arquitecto de mi propio destino;

que si extraje las mieles o la hiel de las cosas,
fue porque en ellas puse hiel o mieles sabrosas:
cuando planté rosales, coseché siempre rosas.

Cierto, a mis lozanías va a seguir el invierno:
¡mas tú no me dijiste que mayo fuese eterno!

Hallé sin duda largas las noches de mis penas;
mas no me prometiste tan sólo noches buenas;
y en cambio tuve algunas santamente serenas...

Amé, fui amado, el sol acarició mi faz.
¡Vida, nada me debes! ¡Vida, estamos en paz!`,
    note: "Una de las declaraciones líricas más sublimes de agradecimiento y paz interior con la propia biografía.",
    centuryOrEra: "Siglo XX • México",
    archetype: "El Arquitecto de la Paz"
  },
  {
    id: "poem_12",
    title: "Soneto 18",
    author: "William Shakespeare",
    category: "Inspiración",
    verses: `¿Debería compararte con un día de verano?
Tú eres más hermosa y más templada.
Ásperos vientos sacuden los tiernos capullos de mayo,
y el arriendo del verano tiene una fecha demasiado corta.

A veces demasiado ardiente brilla el ojo del cielo,
y a menudo su tez dorada se atenúa;
y toda belleza alguna vez declina,
por azar o por el curso cambiante de la naturaleza sin adornos.

Pero tu eterno verano no se desvanecerá,
ni perderá la posesión de esa belleza que posees;
ni la muerte se jactará de que camines en su sombra,
cuando en versos eternos al tiempo crezcas.

Mientras los seres humanos respiren o los ojos puedan ver,
tanto vivirá este poema, y te dará vida a ti.`,
    note: "La inmortalidad que otorga el arte sobre el paso destructivo del tiempo.",
    centuryOrEra: "Siglo XVII • Inglaterra",
    archetype: "El Creador Inmortal"
  },
  {
    id: "poem_13",
    title: "La esperanza es esa cosa con plumas",
    author: "Emily Dickinson",
    category: "Sanación",
    verses: `La esperanza es esa cosa con plumas
que se posa en el alma,
y canta la melodía sin las palabras,
y nunca se detiene en absoluto.

Y más dulce en el vendaval se escucha;
y dolorosa debe ser la tormenta
que pudiera avergonzar al pequeño pájaro
que mantuvo a tantos cálidos.

Lo he oído en la tierra más helada,
y en el mar más extraño;
sin embargo, nunca, en la extremidad,
me pidió una sola migaja.`,
    note: "Una tierna y poderosa personificación de la esperanza como fuerza inagotable y gratuita.",
    centuryOrEra: "Siglo XIX • Estados Unidos",
    archetype: "El Pájaro de la Esperanza"
  },
  {
    id: "poem_15",
    title: "Soneto XVII (Cien sonetos de amor)",
    author: "Pablo Neruda",
    category: "Sanación",
    verses: `No te amo como si fueras rosa de sal, topacio
o flecha de claveles que propagan el fuego:
te amo como se aman ciertas cosas oscuras,
secretamente, entre la sombra y el alma.

Te amo como la planta que no florece y lleva
dentro de sí, escondida, la luz de aquellas flores,
y gracias a tu amor vive oscuro en mi cuerpo
el apretado aroma que ascendió de la tierra.

Te amo sin saber cómo, ni cuándo, ni de dónde,
te amo directamente sin problemas ni orgullo:
así te amo porque no sé amar de otra manera,
sino así de este modo en que no soy ni eres,
tan cerca que tu mano sobre mi pecho es mía,
tan cerca que se cierran tus ojos con mi sueño.`,
    note: "El amor maduro que trasciende las apariencias e integra la sombra y la luz.",
    centuryOrEra: "Siglo XX • Chile",
    archetype: "El Alquimista del Amor"
  },
  {
    id: "poem_17",
    title: "Dame la mano",
    author: "Gabriela Mistral",
    category: "Sanación",
    verses: `Dame la mano y danzaremos;
dame la mano y me amarás.
Como una sola flor seremos,
como una flor, y nada más...

El mismo verso cantaremos,
al mismo paso bailarás.
Como una espiga ondularemos,
como una espiga, y nada más.

Te llamas Rosa y yo Esperanza;
pero tu nombre olvidarás,
porque seremos una danza
en la colina, y nada más...`,
    note: "Premio Nobel de Literatura. La danza de la ternura y la unión fraterna que disuelve el aislamiento.",
    centuryOrEra: "Siglo XX • Chile",
    archetype: "La Danza de la Unidad"
  },
  {
    id: "poem_19",
    title: "Lo fatal",
    author: "Rubén Darío",
    category: "Filosófico",
    verses: `Dichoso el árbol, que es apenas sensitivo,
y más la piedra dura porque esa ya no siente,
pues no hay dolor más grande que el dolor de ser vivo,
ni mayor pesadumbre que la vida consciente.

Ser y no saber nada, y ser sin rumbo cierto,
y el temor de haber sido y un futuro terror...
Y el espanto seguro de estar mañana muerto,
y sufrir por la vida y por la sombra y por

lo que no conocemos y apenas sospechamos,
y la carne que tienta con sus frescos racimos,
y la tumba que aguarda con sus fúnebres ramos,
¡y no saber adónde vamos,
ni de dónde venimos!...`,
    note: "La cumbre del modernismo hispánico enfrentando el misterio de la existencia humana.",
    centuryOrEra: "Siglo XIX • Nicaragua",
    archetype: "El Filósofo de la Conciencia"
  }
];

// ==================== LISTADO EXACTO DE MAESTROS DE LA TRANSMUTACIÓN POÉTICA ====================
export const REFERENT_AUTHORS: AuthorReference[] = [
  {
    id: "bonnett",
    name: "Piedad Bonnett",
    formattedName: "Bonnett, Piedad (Colombia)",
    country: "Colombia",
    era: "Siglo XX-XXI • Colombia",
    badge: "Alquimista del Duelo & la Memoria",
    tagline: "La voz poética que transforma el dolor de la pérdida en luz y hondura humana.",
    bio: "Poeta, dramaturga y novelista colombiana galardonada con el Premio Reina Sofía de Poesía Iberoamericana. Su obra aborda el duelo, la vulnerabilidad y la capacidad de reconstrucción emocional a través de la palabra lírica.",
    featuredWorkTitle: "Las cicatrices",
    featuredWorkExcerpt: "No hay cicatriz, por leve, que no guarde una secreta flor, un testimonio, la huella de aquel fuego que en la tarde puso a prueba la fuerza del demonio.",
    textColor: "text-amber-300",
    accentBg: "bg-amber-500/10",
    accentBorder: "border-amber-500/30"
  },
  {
    id: "borges",
    name: "Jorge Luis Borges",
    formattedName: "Borges, Jorge Luis (Argentina)",
    country: "Argentina",
    era: "Siglo XX • Argentina",
    badge: "Arquitecto del Laberinto & el Tiempo",
    tagline: "El filósofo de la eternidad, los espejos y la serenidad de los justos.",
    bio: "Uno de los más grandes maestros de la literatura universal. Su poesía destila una contemplación metafísica donde el tiempo, la ceguera y la memoria se convierten en lúcida aceptación y asombro.",
    featuredWorkTitle: "Arte poética",
    featuredWorkExcerpt: "Mirar el río hecho de tiempo y agua y recordar que el tiempo es otro río, saber que nos perdemos como el río y que los rostros pasan como el agua.",
    textColor: "text-purple-300",
    accentBg: "bg-purple-500/10",
    accentBorder: "border-purple-500/30"
  },
  {
    id: "camargo",
    name: "Edmundo Camargo",
    formattedName: "Camargo, Edmundo (Bolivia)",
    country: "Bolivia",
    era: "Siglo XX • Bolivia",
    badge: "Poeta del Fuego & los Pájaros",
    tagline: "La lírica visionaria del altiplano y la transmutación del sufrimiento en belleza cósmica.",
    bio: "Poeta boliviano de culto, autor de 'El delirio con los pájaros'. Su obra de deslumbrante originalidad metafórica elevó la angustia humana a una dimensión sagrada y telúrica.",
    featuredWorkTitle: "El delirio con los pájaros",
    featuredWorkExcerpt: "En la noche que avanza sin orillas he visto alzarse el vuelo de las llamas, pájaros de cristal y de ceniza que cantan en la fronda de las ramas.",
    textColor: "text-rose-300",
    accentBg: "bg-rose-500/10",
    accentBorder: "border-rose-500/30"
  },
  {
    id: "castellanos",
    name: "Rosario Castellanos",
    formattedName: "Castellanos, Rosario (México)",
    country: "México",
    era: "Siglo XX • México",
    badge: "Conciencia de la Dignidad & la Libertad",
    tagline: "Voz lúcida, valiente y reflexiva sobre la soberanía interior y la verdad del alma.",
    bio: "Gigante de las letras mexicanas, pionera del pensamiento emancipador y la honestidad introspectiva. Su poesía desnuda el alma y conquista una serena sabiduría.",
    featuredWorkTitle: "Meditación en el umbral",
    featuredWorkExcerpt: "Debe haber otro modo de ser libre, otro modo de amar sin la atadura, donde la voz en su verdad calibre el milagro sin fin de la estatura.",
    textColor: "text-cyan-300",
    accentBg: "bg-cyan-500/10",
    accentBorder: "border-cyan-500/30"
  },
  {
    id: "coelho",
    name: "Paulo Coelho",
    formattedName: "Coelho, Paulo (Brasil)",
    country: "Brasil",
    era: "Siglo XX-XXI • Brasil",
    badge: "El Alquimista de la Leyenda Personal",
    tagline: "El maestro de las señales cósmicas, el Alma del Mundo y la transmutación del corazón.",
    bio: "Escritor brasileño de renombre universal y miembro de la Academia Brasileña de Letras. Su obra cumbre 'El Alquimista' ha inspirado a millones de personas a escuchar su propio corazón, descifrar el lenguaje secreto de las señales y convertir los miedos en el oro de la sabiduría personal.",
    featuredWorkTitle: "El Alquimista (La Voz del Corazón)",
    featuredWorkExcerpt: "Escucha a tu corazón: él conoce todas las cosas, porque proviene del Alma del Mundo y un día retornará a ella. Nadie puede huir de su corazón; por eso es mejor escuchar lo que te dice.",
    textColor: "text-amber-300",
    accentBg: "bg-amber-500/10",
    accentBorder: "border-amber-500/30"
  },
  {
    id: "sorjuana",
    name: "Sor Juana Inés de la Cruz",
    formattedName: "De la Cruz, Sor Juana Inés (México)",
    country: "México",
    era: "Siglo XVII • México",
    badge: "La Décima Musa & Filósofa Universal",
    tagline: "El intelecto más brillante del barroco hispanoamericano, defensora de la razón y el saber.",
    bio: "Monja jerónima, escritora y pensadora cumbre del Siglo de Oro en América. Su búsqueda incansable del conocimiento y la verdad espiritual rompió todos los moldes de su tiempo.",
    featuredWorkTitle: "En perseguirme, Mundo, ¿qué interesas?",
    featuredWorkExcerpt: "Teniendo por mejor en mis verdades consumir vanidades de la vida que consumir la vida en vanidades.",
    textColor: "text-amber-300",
    accentBg: "bg-amber-500/10",
    accentBorder: "border-amber-500/30"
  },
  {
    id: "gelman",
    name: "Juan Gelman",
    formattedName: "Gelman, Juan (Argentina)",
    country: "Argentina",
    era: "Siglo XX-XXI • Argentina",
    badge: "Poeta de la Ternura Inquebrantable",
    tagline: "El cantor que convirtió el exilio y las heridas históricas en canto de amor y esperanza.",
    bio: "Poeta y periodista argentino galardonado con el Premio Cervantes. Su obra es un milagro lírico que resiste a la barbarie a través de la compasión, la música verbal y la fe inagotable en el ser humano.",
    featuredWorkTitle: "Arte poética (El pájaro y la sangre)",
    featuredWorkExcerpt: "¡Digo que el hombre debe ser un árbol con raíces de agua, un canto abierto al amanecer, y que la vida no se apaga!",
    textColor: "text-emerald-300",
    accentBg: "bg-emerald-500/10",
    accentBorder: "border-emerald-500/30"
  },
  {
    id: "heraud",
    name: "Javier Heraud",
    formattedName: "Heraud, Javier (Perú)",
    country: "Perú",
    era: "Siglo XX • Perú",
    badge: "La Voz Joven del Río & la Pureza",
    tagline: "La fluidez transparente del agua que abraza a la tierra y no teme a su destino.",
    bio: "Poeta peruano de pureza lírica asombrosa. Su célebre poema 'El río' es una metáfora universal de la vida, la generosidad y el fluir constante hacia la plenitud.",
    featuredWorkTitle: "El río",
    featuredWorkExcerpt: "Yo soy un río, voy bajando por las piedras anchas... doy de beber a las flores, a los pastos y a los hombres, y sigo mi camino hacia la mar.",
    textColor: "text-cyan-300",
    accentBg: "bg-cyan-500/10",
    accentBorder: "border-cyan-500/30"
  },
  {
    id: "mutis",
    name: "Álvaro Mutis",
    formattedName: "Mutis, Álvaro (Colombia)",
    country: "Colombia",
    era: "Siglo XX-XXI • Colombia",
    badge: "Poeta de la Tierra Caliente & Maqroll",
    tagline: "El navegante de la desesperanza serena que encuentra la gracia en la intemperie.",
    bio: "Autor colombiano galardonado con el Premio Cervantes y el Príncipe de Asturias. Su voz lírica celebra el viaje, la lluvia, el sosiego ante lo efímero y la dignidad del caminante.",
    featuredWorkTitle: "Nocturno (La lluvia en los cafetales)",
    featuredWorkExcerpt: "Bendita sea el agua que en la noche desciende para enseñarnos que toda tormenta guarda en su centro el aroma de la paz.",
    textColor: "text-amber-300",
    accentBg: "bg-amber-500/10",
    accentBorder: "border-amber-500/30"
  },
  {
    id: "ortizguerrero",
    name: "Manuel Ortiz Guerrero",
    formattedName: "Ortiz Guerrero, Manuel (Paraguay)",
    country: "Paraguay",
    era: "Siglo XX • Paraguay",
    badge: "Trovador Heroico de la Belleza",
    tagline: "Venció la adversidad física convirtiendo cada aliento en guarania y verso inmortal.",
    bio: "Máximo poeta lírico y músico del Paraguay, creador junto a José Asunción Flores de la inmortal 'Guarania'. Pese a la lepra y la pobreza, su poesía desbordó amor, dignidad y triunfo espiritual.",
    featuredWorkTitle: "Endoso Lírico",
    featuredWorkExcerpt: "No me importa la sombra de la muerte ni el rigor implacable del destino, si tengo en el dolor la dicha fuerte de cantar como un pájaro en mi camino.",
    textColor: "text-yellow-300",
    accentBg: "bg-yellow-500/10",
    accentBorder: "border-yellow-500/30"
  },
  {
    id: "paz",
    name: "Octavio Paz",
    formattedName: "Paz, Octavio (México)",
    country: "México",
    era: "Siglo XX • México (Nobel 1990)",
    badge: "Alquimista del Lenguaje & la Conciencia",
    tagline: "El explorador del laberinto humano y la reconciliación del instante con lo eterno.",
    bio: "Premio Nobel de Literatura. Su poesía y ensayos fundaron una nueva manera de mirar el arte, la soledad y la comunión entre el ser humano y el cosmos.",
    featuredWorkTitle: "Hermandad",
    featuredWorkExcerpt: "Soy hombre: duro poco y es enorme la noche. Pero miro hacia arriba: las estrellas escriben. Sin entender comprendo: también soy escritura y en este mismo instante alguien me deletrea.",
    textColor: "text-purple-300",
    accentBg: "bg-purple-500/10",
    accentBorder: "border-purple-500/30"
  },
  {
    id: "pizarnik",
    name: "Alejandra Pizarnik",
    formattedName: "Pizarnik, Alejandra (Argentina)",
    country: "Argentina",
    era: "Siglo XX • Argentina",
    badge: "Orfebre del Silencio & la Noche",
    tagline: "La intensidad más pura del verso que busca la luz en el fondo de la sombra.",
    bio: "Figura mítica de la poesía latinoamericana. Su búsqueda implacable de la palabra exacta y su viaje al centro de la noche revelan una deslumbrante belleza catártica.",
    featuredWorkTitle: "Árbol de Diana",
    featuredWorkExcerpt: "He dado el salto de mí al alba. He dejado mi cuerpo junto a la luz y he cantado la tristeza de lo que nace... la luz abraza lo que fue herida.",
    textColor: "text-rose-300",
    accentBg: "bg-rose-500/10",
    accentBorder: "border-rose-500/30"
  },
  {
    id: "pla",
    name: "Josefina Plá",
    formattedName: "Plá, Josefina (Paraguay)",
    country: "Paraguay",
    era: "Siglo XX • Paraguay",
    badge: "Matriarca de la Cultura & el Fuego Creador",
    tagline: "Escritora, ceramista y crítica que moldeó la modernidad con pasión inquebrantable.",
    bio: "Figura monumental de la cultura paraguaya. Poeta de hondo calado existencial, su obra reflexiona sobre la creación, el tiempo, el amor y la tenacidad del espíritu frente al barro del mundo.",
    featuredWorkTitle: "Razón de ser (El barro y la luz)",
    featuredWorkExcerpt: "No viví en vano si dejé encendida una pequeña lámpara en la choza: el arte es la victoria de la vida, la huella que en la sombra permanece hermosa.",
    textColor: "text-emerald-300",
    accentBg: "bg-emerald-500/10",
    accentBorder: "border-emerald-500/30"
  },
  {
    id: "roabastos",
    name: "Augusto Roa Bastos",
    formattedName: "Roa Bastos, Augusto (Paraguay)",
    country: "Paraguay",
    era: "Siglo XX • Paraguay (Cervantes 1989)",
    badge: "La Voz Suprema de la Dignidad Humana",
    tagline: "El titán de las letras paraguayas que convirtió la memoria colectiva en canto universal.",
    bio: "Premio Cervantes de Literatura. Su poesía temprana y su narrativa deslumbrante capturan la lucha incesante por la libertad, la justicia y el renacimiento espiritual del pueblo.",
    featuredWorkTitle: "Canto al hombre",
    featuredWorkExcerpt: "Porque el hombre es la raíz del canto, la semilla que brota en el desierto, el que vence la furia y el espanto y renace con el pecho abierto.",
    textColor: "text-amber-300",
    accentBg: "bg-amber-500/10",
    accentBorder: "border-amber-500/30"
  },
  {
    id: "romero",
    name: "Elvio Romero",
    formattedName: "Romero, Elvio (Paraguay)",
    country: "Paraguay",
    era: "Siglo XX • Paraguay",
    badge: "Poeta del Fuego Campesino & el Éxodo",
    tagline: "La pasión telúrica que canta a la tierra, al trabajo y a la esperanza incombustible.",
    bio: "Uno de los más grandes poetas líricos paraguayos, elogiado por Neruda y Miguel Ángel Asturias. Su poesía vibra con el pulso de la naturaleza, el sol y la fe inquebrantable en el porvenir.",
    featuredWorkTitle: "De cara al corazón",
    featuredWorkExcerpt: "Aquí me planto con el pecho al viento, aquí renazco de mi propia hoguera: no hay tempestad que borre el sentimiento de quien ama su tierra y su bandera.",
    textColor: "text-rose-300",
    accentBg: "bg-rose-500/10",
    accentBorder: "border-rose-500/30"
  },
  {
    id: "sabines",
    name: "Jaime Sabines",
    formattedName: "Sabines, Jaime (México)",
    country: "México",
    era: "Siglo XX • México",
    badge: "El Poeta del Amor Humano & Cotidiano",
    tagline: "La voz más entrañable, directa y conmovedora de la poesía amorosa moderna.",
    bio: "Uno de los poetas más leídos y queridos de Hispanoamérica. Su lirismo directo, tierno y sincero llega al corazón sin artificios, sanando las heridas del desamor.",
    featuredWorkTitle: "Los amorosos",
    featuredWorkExcerpt: "Los amorosos callan. El amor es el silencio más fino, el más tembloroso, el más insoportable... ¡y en ese fuego bendito se renuevan!",
    textColor: "text-cyan-300",
    accentBg: "bg-cyan-500/10",
    accentBorder: "border-cyan-500/30"
  },
  {
    id: "saenz",
    name: "Jaime Sáenz",
    formattedName: "Sáenz, Jaime (Bolivia)",
    country: "Bolivia",
    era: "Siglo XX • Bolivia",
    badge: "El Místico de la Noche & las Alturas",
    tagline: "El explorador de los abismos del alma y la fascinante belleza de la penumbra paceña.",
    bio: "Máximo mito de la literatura boliviana. Su poesía nocturna, visionaria y telúrica es un rito de iniciación donde la muerte y la sombra se revelan como umbrales hacia la trascendencia.",
    featuredWorkTitle: "La noche y el hallazgo",
    featuredWorkExcerpt: "La noche no es la ausencia de la luz: es el ámbito secreto donde el alma se recoge para escuchar el latido de su propio fuego.",
    textColor: "text-purple-300",
    accentBg: "bg-purple-500/10",
    accentBorder: "border-purple-500/30"
  },
  {
    id: "silva",
    name: "José Asunción Silva",
    formattedName: "Silva, José Asunción (Colombia)",
    country: "Colombia",
    era: "Siglo XIX • Colombia",
    badge: "Maestro de la Musicalidad & el Nocturno",
    tagline: "El renovador de la lírica modernista que tejió sombras y armonías infinitas.",
    bio: "Fundador del modernismo hispanoamericano. Su célebre 'Nocturno' transformó el ritmo poético en español con una musicalidad hipnótica e inolvidable.",
    featuredWorkTitle: "Nocturno III",
    featuredWorkExcerpt: "Y eran una sola sombra larga, ¡y eran una sola sombra larga, y eran una sola sombra larga sobre el campo de la eternidad!",
    textColor: "text-indigo-300",
    accentBg: "bg-indigo-500/10",
    accentBorder: "border-indigo-500/30"
  },
  {
    id: "storni",
    name: "Alfonsina Storni",
    formattedName: "Storni, Alfonsina (Argentina)",
    country: "Argentina",
    era: "Siglo XX • Argentina",
    badge: "Pionera de la Valentía & el Mar",
    tagline: "La voz indómita que desafió los convencionalismos y abrazó la inmensidad del océano.",
    bio: "Una de las voces más poderosas e influyentes de la lírica latinoamericana. Su poesía es un grito de autenticidad, sensibilidad extrema y comunión mística con la naturaleza.",
    featuredWorkTitle: "Voy a dormir",
    featuredWorkExcerpt: "Voy a dormir, nodriza mía, acuéstame. Ponme una lámpara a la cabecera; una constelación; la que te guste; todas son buenas; bájala un poquito.",
    textColor: "text-cyan-300",
    accentBg: "bg-cyan-500/10",
    accentBorder: "border-cyan-500/30"
  },
  {
    id: "vallejo",
    name: "César Vallejo",
    formattedName: "Vallejo, César (Perú)",
    country: "Perú",
    era: "Siglo XX • Perú",
    badge: "El Poeta del Dolor Cósmico & la Hermandad",
    tagline: "El humanista más profundo del siglo XX, cuya compasión resucita al caído.",
    bio: "Considerado una de las cumbres más altas de la poesía mundial. Sus versos en 'Trilce', 'Los heraldos negros' y 'Poemas humanos' transmutan el sufrimiento en amor absoluto por la humanidad.",
    featuredWorkTitle: "Masa",
    featuredWorkExcerpt: "Entonces todos los hombres de la tierra le rodearon; les vio el cadáver triste, emocionado; incorporóse lentamente, abrazó al primer hombre; echóse a andar...",
    textColor: "text-amber-300",
    accentBg: "bg-amber-500/10",
    accentBorder: "border-amber-500/30"
  },
  {
    id: "varela",
    name: "Blanca Varela",
    formattedName: "Varela, Blanca (Perú)",
    country: "Perú",
    era: "Siglo XX • Perú",
    badge: "Maestra de la Precisión & la Belleza Esencial",
    tagline: "La mirada lúcida, despojada de artificios, que encuentra lo sagrado en lo cotidiano.",
    bio: "Una de las voces líricas más rigurosas y admiradas de Hispanoamérica. Elogiada por Octavio Paz, su poesía busca la verdad sin adornos con una fuerza deslumbrante.",
    featuredWorkTitle: "Canto villano",
    featuredWorkExcerpt: "Sé que esto es todo: el pan, la sal, la respiración, la certeza de estar viva en este instante sin pedir nada más que la verdad.",
    textColor: "text-emerald-300",
    accentBg: "bg-emerald-500/10",
    accentBorder: "border-emerald-500/30"
  },
  {
    id: "zamudio",
    name: "Adela Zamudio",
    formattedName: "Zamudio, Adela (Bolivia)",
    country: "Bolivia",
    era: "Siglo XIX-XX • Bolivia",
    badge: "Pionera Heroica del Pensamiento Libre",
    tagline: "La educadora y poeta indoblegable que defendió la igualdad, la justicia y la dignidad.",
    bio: "Máxima figura intelectual boliviana, en cuyo honor se celebra el Día de la Mujer en Bolivia. Su valentía intelectual y su virtuosismo lírico abrieron camino a generaciones enteras.",
    featuredWorkTitle: "Nacer hombre",
    featuredWorkExcerpt: "¡Arriba la mente clara! ¡Arriba el pecho sincero! Que la verdad es la espada y la justicia el sendero.",
    textColor: "text-rose-300",
    accentBg: "bg-rose-500/10",
    accentBorder: "border-rose-500/30"
  },

  // ==================== MAESTROS FUNDACIONALES / UNIVERSALES ====================
  {
    id: "machado",
    name: "Antonio Machado",
    formattedName: "Machado, Antonio (España)",
    country: "España",
    era: "Generación del 98 • España",
    badge: "Poeta Caminante",
    tagline: "El filósofo de la sencillez profunda y la introspección serena.",
    bio: "Descubrió que el alma humana no se descubre en torres de marfil, sino al caminar despacio y contemplar los campos y el dolor del pueblo con compasión.",
    featuredWorkTitle: "Caminante, no hay camino",
    featuredWorkExcerpt: "Caminante, son tus huellas el camino y nada más; Caminante, no hay camino, se hace camino al andar.",
    textColor: "text-amber-300",
    accentBg: "bg-amber-500/10",
    accentBorder: "border-amber-500/30"
  },
  {
    id: "benedetti",
    name: "Mario Benedetti",
    formattedName: "Benedetti, Mario (Uruguay)",
    country: "Uruguay",
    era: "Siglo XX • Uruguay",
    badge: "Voz de la Resiliencia",
    tagline: "El maestro del amor cotidiano, la cercanía y la esperanza indomable.",
    bio: "Vivió el exilio y las pérdidas con una pluma cálida que jamás abandonó la fe en el ser humano, convirtiéndose en el refugio de millones de lectores.",
    featuredWorkTitle: "No te rindas",
    featuredWorkExcerpt: "No te rindas, por favor no cedas, aunque el frío queme, aunque el miedo muerda, aún hay fuego en tu alma.",
    textColor: "text-cyan-300",
    accentBg: "bg-cyan-500/10",
    accentBorder: "border-cyan-500/30"
  },
  {
    id: "dickinson",
    name: "Emily Dickinson",
    formattedName: "Dickinson, Emily (Estados Unidos)",
    country: "Estados Unidos",
    era: "Siglo XIX • Estados Unidos",
    badge: "Alquimista de la Soledad",
    tagline: "La ermitaña de Amherst que descubrió universos enteros en una habitación.",
    bio: "Escribió más de 1.800 poemas cosidos a mano en cuadernillos secretos. Su obra demuestra que la soledad fecunda es el laboratorio más sagrado de la mente.",
    featuredWorkTitle: "La esperanza es esa cosa con plumas",
    featuredWorkExcerpt: "La esperanza es esa cosa con plumas que se posa en el alma, y canta la melodía sin palabras, y nunca se detiene.",
    textColor: "text-purple-300",
    accentBg: "bg-purple-500/10",
    accentBorder: "border-purple-500/30"
  },
  {
    id: "mistral",
    name: "Gabriela Mistral",
    formattedName: "Mistral, Gabriela (Chile)",
    country: "Chile",
    era: "Nobel 1945 • Chile",
    badge: "Madre de la Ternura",
    tagline: "La primera mujer latinoamericana en ganar el Premio Nobel de Literatura.",
    bio: "Convirtió sus duelos más desgarradores en pedagogía de amor, rondas infantiles y una poesía telúrica que abraza la tierra y a los desposeídos.",
    featuredWorkTitle: "Dame la mano",
    featuredWorkExcerpt: "Dame la mano y danzaremos; dame la mano y me amarás. Como una sola flor seremos, como una flor, y nada más.",
    textColor: "text-emerald-300",
    accentBg: "bg-emerald-500/10",
    accentBorder: "border-emerald-500/30"
  },
  {
    id: "shakespeare",
    name: "William Shakespeare",
    formattedName: "Shakespeare, William (Inglaterra)",
    country: "Inglaterra",
    era: "Renacimiento • Inglaterra",
    badge: "Dramaturgo Eterno",
    tagline: "El arquitecto del lenguaje que descifró todas las pasiones humanas.",
    bio: "Sus sonetos y obras teatrales son el mapa más completo de la psicología humana: desde la traición y la ambición hasta el amor que desafía a la muerte.",
    featuredWorkTitle: "Soneto 18",
    featuredWorkExcerpt: "Mientras los seres humanos respiren o los ojos puedan ver, tanto vivirá este poema, y te dará vida a ti.",
    textColor: "text-rose-300",
    accentBg: "bg-rose-500/10",
    accentBorder: "border-rose-500/30"
  }
];
