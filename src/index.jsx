import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Volume2, RotateCcw, CheckCircle2, Trophy, Flame, BarChart3 } from "lucide-react";

const RAW_WORDS = `1|de|of
2|ella|she
3|que|that / which
4|el|the
5|ser|to be
6|y|and
7|en|in / on
8|él|he
9|estar|to be (temporary)
10|uno|one
11|haber|to have
12|yo|I
13|por|for / by
14|tener|to have
15|se|oneself / itself
16|ir|to go
17|tú|you
18|con|with
19|qué|what
20|hacer|to do / make
21|poder|to be able to
22|para|for / in order to
23|del|of the
24|decir|to say
25|este|this
26|todo|all / every
27|pero|but
28|si|if
29|querer|to want / to love
30|al|to the
31|sí|yes / oneself
32|como|like / as
33|bien|well
34|más|more
35|ver|to see
36|saber|to know
37|bueno|good
38|ese|that
39|aquí|here
40|nosotros|we
41|creer|to believe
42|ya|already
43|o|or
44|dar|to give
45|deber|must / should
46|mucho|much / many
47|otro|other
48|así|like this / so
49|ahora|now
50|vez|time / instance
51|cuando|when
52|algo|something
53|dejar|to leave / let
54|hablar|to speak
55|pasar|to happen / pass
56|nada|nothing
57|cómo|how
58|solo|only / alone
59|sentir|to feel
60|pensar|to think
61|porque|because
62|esperar|to hope / wait
63|usted|you (formal)
64|día|day
65|año|year
66|padre|father
67|venir|to come
68|nuestro|our
69|gracias|thanks
70|cosa|thing
71|dos|two
72|sin|without
73|sobre|about / over
74|alguno|some / any
75|señor|sir / Mr.
76|mirar|to look
77|hombre|man
78|tiempo|time
79|también|also
80|mismo|same
81|necesitar|to need
82|casa|house / home
83|llevar|to carry / wear / take
84|tan|so
85|entonces|then
86|encontrar|to find
87|volver|to return
88|llamar|to call
89|parecer|to seem
90|nuevo|new
91|mejor|better / best
92|primero|first
93|verdad|truth
94|hasta|until / up to
95|quién|who
96|vida|life
97|nunca|never
98|tomar|to take / drink
99|quedar|to stay / remain
100|grande|big / large
101|llegar|to arrive
102|hola|hello
103|chico|boy / kid
104|poner|to put
105|oír|to hear
106|noche|night
107|mí|me
108|hijo|son / child
109|dónde|where
110|ni|nor / not even
111|salir|to leave / go out
112|favor|favor
113|gustar|to like
114|seguir|to follow / continue
115|amigo|friend
116|siempre|always
117|hecho|fact / done
118|Dios|God
119|antes|before
120|desde|from / since
121|conocer|to know / meet
122|poco|little / few
123|ahí|there
124|alguien|someone
125|trabajo|work / job
126|mujer|woman
127|entre|between / among
128|después|after
129|parte|part
130|mi|my
131|acuerdo|agreement / okay
132|escuchar|to listen
133|momento|moment
134|matar|to kill
135|donde|where
136|seguro|safe / sure
137|mundo|world
138|gente|people
139|niño|child / boy
140|hora|hour / time
141|buscar|to look for
142|problema|problem
143|Estado|state
144|lugar|place
145|nadie|nobody
146|tal|such
147|ayudar|to help
148|perder|to lose
149|ustedes|you all
150|persona|person
151|tipo|type / guy
152|claro|clear / of course
153|entender|to understand
154|menos|less
155|fuera|outside
156|acabar|to finish / end
157|tratar|to treat / try
158|tres|three
159|último|last
160|trabajar|to work
161|morir|to die
162|cada|each
163|dinero|money
164|mañana|morning / tomorrow
165|hermano|brother
166|quien|who
167|vivir|to live
168|valer|to be worth
169|allí|there
170|hoy|today
171|luego|then / later
172|mano|hand
173|tanto|so much / so many
174|caso|case
175|nombre|name
176|entrar|to enter
177|forma|shape / form
178|empezar|to start
179|conseguir|to get / obtain
180|pedir|to ask for
181|intentar|to try
182|ninguno|none / no one
183|traer|to bring
184|pequeño|small
185|importar|to matter
186|aún|still / yet
187|cuenta|account / count
188|razón|reason
189|preguntar|to ask
190|terminar|to finish / end
191|idea|idea
192|mamá|mom
193|único|only / single
194|mal|badly / wrong
195|suponer|to suppose / assume
196|papá|dad
197|muerto|dead
198|durante|during
199|pasado|past
200|recordar|to remember
201|semana|week
202|cierto|certain / true
203|contra|against
204|tarde|late / afternoon
205|segundo|second
206|cambiar|to change
207|familia|family
208|usar|to use
209|policía|police
210|comer|to eat
211|conmigo|with me
212|sacar|to take out
213|mientras|while
214|mantener|to keep / maintain
215|realmente|really
216|serio|serious
217|país|country
218|contar|to count / tell
219|minuto|minute
220|olvidar|to forget
221|propio|own
222|pues|well / then
223|aunque|although
224|historia|history / story
225|amor|love
226|lado|side
227|junto|together / next to
228|hacia|toward
229|manera|way / manner
230|cabeza|head
231|punto|point
232|mayor|older / greater
233|todavía|still
234|cualquiera|any / whichever
235|casi|almost
236|contigo|with you
237|mes|month
238|ciudad|city
239|importante|important
240|demasiado|too much / too
241|preocupar|to worry
242|poder|power
243|ganar|to win / earn
244|cuánto|how much
245|tío|uncle / guy
246|puerta|door
247|palabra|word
248|ojo|eye
249|agua|water
250|medio|middle / half
251|dentro|inside
252|abrir|to open
253|jugar|to play
254|llamado|called / named
255|loco|crazy
256|ocurrir|to happen / occur
257|alto|tall / high
258|aquel|that over there
259|fin|end
260|pagar|to pay
261|camino|road / path
262|esposo|husband
263|permitir|to allow
264|recibir|to receive
265|pregunta|question
266|leer|to read
267|significar|to mean
268|suceder|to happen
269|muerte|death
270|millón|million
271|general|general
272|dormir|to sleep
273|realidad|reality
274|caer|to fall
275|rápido|fast / quickly
276|enviar|to send
277|acercar|to bring closer
278|equipo|team
279|cuál|which
280|ayuda|help
281|cuerpo|body
282|jefe|boss / chief
283|presidente|president
284|mover|to move
285|comprar|to buy
286|supuesto|supposed / assumption
287|bajo|under / low
288|gobierno|government
289|quizá|maybe
290|comenzar|to begin
291|joven|young
292|viejo|old / old man
293|tierra|earth / land
294|número|number
295|cuatro|four
296|feliz|happy
297|final|final / end
298|regresar|to return
299|grupo|group
300|guerra|war
301|cariño|affection / dear
302|además|besides / in addition
303|posible|possible
304|echar|to throw / pour
305|clase|class
306|cual|which
307|arma|weapon
308|cinco|five
309|pronto|soon
310|convertir|to convert / turn into
311|difícil|difficult
312|cara|face
313|sino|but rather
314|genial|great / awesome
315|tocar|to touch / play
316|largo|long
317|juego|game
318|escribir|to write
319|meter|to put in
320|igual|equal / same
321|incluso|even
322|doctor|doctor
323|corazón|heart
324|detener|to stop
325|adiós|goodbye
326|siquiera|even
327|ello|it / that
328|decidir|to decide
329|suerte|luck
330|ayer|yesterday
331|libro|book
332|correr|to run
333|según|according to
334|funcionar|to work / function
335|vivo|alive / living
336|luz|light
337|quizás|perhaps
338|justo|fair / just / right
339|miedo|fear
340|modo|way / mode
341|relación|relationship
342|cambio|change
343|público|public
344|derecho|right / law
345|presentar|to present
346|cerca|near
347|suficiente|enough
348|prueba|test / proof
349|próximo|next
350|fuerte|strong
351|existir|to exist
352|sentido|sense
353|orden|order
354|perro|dog
355|humano|human
356|vuelta|turn / return
357|listo|ready / smart
358|mostrar|to show
359|subir|to go up
360|coche|car
361|servir|to serve
362|sentar|to sit / seat
363|salvar|to save
364|blanco|white
365|fuerza|strength / force
366|sistema|system
367|explicar|to explain
368|bastante|quite / enough
369|levantar|to raise / lift
370|adelante|forward / ahead
371|mil|thousand
372|considerar|to consider
373|paso|step
374|asegurar|to assure / ensure
375|aceptar|to accept
376|quitar|to remove / take off
377|plan|plan
378|calle|street
379|pueblo|town / people
380|cuidado|care / caution
381|negro|black
382|allá|over there
383|partido|game / party / match
384|diferente|different
385|ante|before / in the presence of
386|fiesta|party
387|amar|to love
388|coger|to take / grab
389|disparar|to shoot
390|disculpar|to excuse / forgive
391|pie|foot
392|beber|to drink
393|frente|front / forehead
394|escuela|school
395|sangre|blood
396|oportunidad|opportunity
397|muchacho|boy / young man
398|real|real
399|situación|situation
400|política|politics / policy
401|ley|law
402|vender|to sell
403|teléfono|telephone
404|malo|bad
405|extraño|strange / foreign
406|perdonar|to forgive
407|arriba|up / above
408|aparecer|to appear
409|servicio|service
410|novio|boyfriend / groom
411|tampoco|neither / not either
412|especial|special
413|casar|to marry
414|puesto|position / post
415|dólar|dollar
416|cuándo|when
417|duro|hard
418|nacional|national
419|recuerdo|memory / souvenir
420|lograr|to achieve
421|robar|to steal
422|seguridad|security
423|prometer|to promise
424|enseñar|to teach / show
425|obra|work / construction / play
426|descubrir|to discover
427|andar|to walk / go
428|fácil|easy
429|película|movie
430|cuanto|as much as
431|lista|list / ready / smart
432|tras|after / behind
433|español|Spanish
434|sonar|to sound / ring
435|referir|to refer
436|vino|wine
437|centro|center
438|asunto|matter / issue
439|encantar|to love / delight
440|embargo|embargo
441|imaginar|to imagine
442|información|information
443|habitación|room
444|aprender|to learn
445|falta|lack / absence
446|cielo|sky
447|seis|six
448|realizar|to carry out
449|negocio|business
450|sueño|dream / sleepiness
451|atrás|behind / back
452|social|social
453|capitán|captain
454|comida|food / meal
455|bebé|baby
456|libre|free
457|voz|voice
458|foto|photo
459|abajo|down / below
460|par|pair
461|paz|peace
462|confiar|to trust
463|callar|to be quiet
464|culpa|guilt / blame
465|cerrar|to close
466|ofrecer|to offer
467|noticia|news
468|bajar|to go down
469|desear|to wish / desire
470|música|music
471|diablo|devil
472|resto|rest / remainder
473|siguiente|following / next
474|cuidar|to take care of
475|médico|doctor
476|carta|letter / menu
477|preparar|to prepare
478|don|Mr. / honorific
479|correcto|correct
480|programa|program
481|sitio|place / site
482|campo|field / countryside
483|elegir|to choose
484|exactamente|exactly
485|parar|to stop
486|aire|air
487|señora|lady / Mrs.
488|esperanza|hope
489|imagen|image
490|risa|laugh / laughter
491|tema|theme / topic
492|norte|north
493|sur|south
494|izquierdo|left
495|derecha|right side
496|verdadero|true / real
497|simple|simple
498|nivel|level
499|edad|age
500|precio|price`;

const STORAGE_KEY = "spanish-flashcards-vite-v2";
const SETTINGS_KEY = "spanish-flashcards-settings-vite-v2";
const DEFAULT_SETTINGS = {
  direction: "both",
  autoAudio: false,
  theme: "system",
};

const themeValues = {
  light: {
    page: "#f6f7fb",
    card: "rgba(255,255,255,0.82)",
    cardSolid: "#ffffff",
    text: "#111827",
    muted: "#6b7280",
    border: "rgba(17,24,39,0.08)",
    soft: "#eef2ff",
    accent: "#4f46e5",
    accentText: "#ffffff",
    secondary: "#f3f4f6",
    danger: "#dc2626",
    shadow: "0 20px 50px rgba(15, 23, 42, 0.08)",
  },
  dark: {
    page: "#0b1020",
    card: "rgba(17,24,39,0.82)",
    cardSolid: "#111827",
    text: "#f3f4f6",
    muted: "#9ca3af",
    border: "rgba(255,255,255,0.08)",
    soft: "#182033",
    accent: "#818cf8",
    accentText: "#111827",
    secondary: "#1f2937",
    danger: "#ef4444",
    shadow: "0 20px 50px rgba(0, 0, 0, 0.32)",
  },
};

const words = RAW_WORDS.split("\n")
  .map((line) => line.trim())
  .filter(Boolean)
  .map((line) => {
    const [rank, spanish, english] = line.split("|");
    return {
      id: Number(rank),
      rank: Number(rank),
      spanish,
      english,
    };
  });

function defaultStats() {
  return {
    seen: 0,
    correct: 0,
    wrong: 0,
    streak: 0,
    ease: 2.3,
    intervalHours: 0,
    dueAt: 0,
    lastSeenAt: 0,
  };
}

function safeJsonParse(value, fallback) {
  try {
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function getStoredValue(key, fallback) {
  if (typeof window === "undefined") return fallback;
  return safeJsonParse(window.localStorage.getItem(key), fallback);
}

function speak(text) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  const utterance = new SpeechSynthesisUtterance(text);
  const voices = window.speechSynthesis.getVoices();
  const preferred =
    voices.find((voice) => /es-MX/i.test(voice.lang)) ||
    voices.find((voice) => /es-US/i.test(voice.lang)) ||
    voices.find((voice) => /^es/i.test(voice.lang));
  if (preferred) utterance.voice = preferred;
  utterance.lang = preferred?.lang || "es-MX";
  utterance.rate = 0.92;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

function buildPrompt(card, direction, seed) {
  if (direction === "es-en") {
    return { prompt: card.spanish, answer: card.english, label: "Spanish → English", pronounce: card.spanish };
  }
  if (direction === "en-es") {
    return { prompt: card.english, answer: card.spanish, label: "English → Spanish", pronounce: card.spanish };
  }
  const useSpanishPrompt = seed % 2 === 0;
  return useSpanishPrompt
    ? { prompt: card.spanish, answer: card.english, label: "Spanish → English", pronounce: card.spanish }
    : { prompt: card.english, answer: card.spanish, label: "English → Spanish", pronounce: card.spanish };
}

function pickWeighted(items) {
  if (!items.length) return null;
  const total = items.reduce((sum, item) => sum + item.weight, 0);
  if (total <= 0) return items[0];
  let random = Math.random() * total;
  for (const item of items) {
    random -= item.weight;
    if (random <= 0) return item;
  }
  return items[0];
}

function formatDueLabel(timestamp) {
  if (!timestamp || timestamp <= Date.now()) return "Now";
  const diff = timestamp - Date.now();
  const minutes = Math.max(1, Math.round(diff / 60000));
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.round(hours / 24);
  return `${days}d`;
}

function useResolvedTheme(theme) {
  const [resolvedTheme, setResolvedTheme] = useState("light");

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const apply = () => {
      const dark = theme === "dark" || (theme === "system" && media.matches);
      setResolvedTheme(dark ? "dark" : "light");
      document.documentElement.style.colorScheme = dark ? "dark" : "light";
      document.body.style.margin = "0";
      document.body.style.background = dark ? themeValues.dark.page : themeValues.light.page;
      document.body.style.color = dark ? themeValues.dark.text : themeValues.light.text;
      document.body.style.fontFamily = 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
    };
    apply();
    const handleChange = () => apply();
    if (typeof media.addEventListener === "function") {
      media.addEventListener("change", handleChange);
      return () => media.removeEventListener("change", handleChange);
    }
    media.addListener(handleChange);
    return () => media.removeListener(handleChange);
  }, [theme]);

  return resolvedTheme;
}

function panelStyle(theme, radius) {
  return {
    borderRadius: radius,
    border: `1px solid ${theme.border}`,
    background: theme.card,
    boxShadow: theme.shadow,
    backdropFilter: "blur(12px)",
    padding: 20,
  };
}

function labelStyle(theme) {
  return {
    marginBottom: 8,
    fontSize: 13,
    color: theme.muted,
  };
}

function selectStyle(theme) {
  return {
    width: "100%",
    borderRadius: 16,
    border: `1px solid ${theme.border}`,
    background: theme.cardSolid,
    color: theme.text,
    padding: "12px 14px",
    outline: "none",
    appearance: "none",
    WebkitAppearance: "none",
    MozAppearance: "none",
  };
}

function App() {
  const [progress, setProgress] = useState(() => getStoredValue(STORAGE_KEY, {}));
  const [settings, setSettings] = useState(() => ({ ...DEFAULT_SETTINGS, ...getStoredValue(SETTINGS_KEY, DEFAULT_SETTINGS) }));
  const [revealed, setRevealed] = useState(false);
  const [cardSeed, setCardSeed] = useState(0);
  const [promptSeed, setPromptSeed] = useState(0);
  const resolvedTheme = useResolvedTheme(settings.theme);
  const theme = themeValues[resolvedTheme] || themeValues.light;

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  }, [settings]);

  const overallStats = useMemo(() => {
    return words.reduce(
      (accumulator, word) => {
        const stats = { ...defaultStats(), ...(progress[word.id] || {}) };
        accumulator.reviewed += stats.seen;
        accumulator.correct += stats.correct;
        accumulator.wrong += stats.wrong;
        if (stats.seen > 0) accumulator.studied += 1;
        if (stats.streak >= 4) accumulator.mastered += 1;
        return accumulator;
      },
      { reviewed: 0, correct: 0, wrong: 0, studied: 0, mastered: 0 }
    );
  }, [progress]);

  const masteryPct = useMemo(() => {
    return Math.round((overallStats.mastered / Math.max(words.length, 1)) * 100);
  }, [overallStats.mastered]);

  const currentCard = useMemo(() => {
    const now = Date.now();
    const pool = words.map((word) => {
      const stats = { ...defaultStats(), ...(progress[word.id] || {}) };
      const dueBoost = stats.dueAt <= now ? 1.8 : 0.25;
      const difficultyBoost = 1 + stats.wrong * 1.75 + Math.max(0, stats.seen - stats.correct) * 0.35;
      const newBoost = stats.seen === 0 ? 2 : 1;
      const masteryPenalty = Math.max(0.2, 1 - stats.streak * 0.08);
      const rankBoost = 1 + (500 - word.rank) / 1200;
      return {
        word,
        weight: dueBoost * difficultyBoost * newBoost * masteryPenalty * rankBoost,
      };
    });
    return pickWeighted(pool)?.word || words[0];
  }, [progress, cardSeed]);

  const promptPack = useMemo(() => buildPrompt(currentCard, settings.direction, promptSeed), [currentCard, settings.direction, promptSeed]);

  useEffect(() => {
    setRevealed(false);
    if (settings.autoAudio && typeof window !== "undefined") {
      const timeoutId = window.setTimeout(() => speak(promptPack.pronounce), 250);
      return () => window.clearTimeout(timeoutId);
    }
    return undefined;
  }, [promptPack, settings.autoAudio]);

  const currentWordStats = useMemo(() => {
    return { ...defaultStats(), ...(progress[currentCard.id] || {}) };
  }, [currentCard.id, progress]);

  const accuracyPct = useMemo(() => {
    const total = overallStats.correct + overallStats.wrong;
    return total ? Math.round((overallStats.correct / total) * 100) : 0;
  }, [overallStats.correct, overallStats.wrong]);

  const advanceCard = () => {
    setCardSeed((value) => value + 1);
    setPromptSeed((value) => value + 1);
  };

  const gradeCard = (rating) => {
    if (!revealed) return;
    const now = Date.now();
    const id = currentCard.id;
    const previous = { ...defaultStats(), ...(progress[id] || {}) };
    const next = {
      ...previous,
      seen: previous.seen + 1,
      lastSeenAt: now,
    };

    if (rating === "wrong") {
      next.wrong = previous.wrong + 1;
      next.streak = 0;
      next.ease = Math.max(1.4, previous.ease - 0.2);
      next.intervalHours = 0.05;
      next.dueAt = now + 3 * 60 * 1000;
    } else {
      next.correct = previous.correct + 1;
      next.streak = previous.streak + 1;
      next.ease = Math.min(3, previous.ease + 0.04);
      next.intervalHours = Math.max(2, (previous.intervalHours || 1.5) * previous.ease * 1.22 + previous.streak * 0.9);
      next.dueAt = now + next.intervalHours * 60 * 60 * 1000;
    }

    setProgress((state) => ({ ...state, [id]: next }));
    advanceCard();
  };

  const skipCard = () => {
    advanceCard();
  };

  const resetProgress = () => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(STORAGE_KEY);
    }
    setProgress({});
    setRevealed(false);
    advanceCard();
  };

  const sectionTitleStyle = {
    fontSize: 16,
    fontWeight: 700,
    margin: 0,
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: `radial-gradient(circle at top left, ${theme.soft} 0%, ${theme.page} 42%, ${theme.page} 100%)`,
        color: theme.text,
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: 16,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.2fr) minmax(280px, 360px)",
            gap: 16,
            marginBottom: 24,
          }}
          className="top-grid"
        >
          <div style={panelStyle(theme, 20)}>
            <div style={{ display: "flex", gap: 16, justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" }}>
              <h1 style={{ margin: 0, fontSize: 34, lineHeight: 1.1, fontWeight: 800 }}>Spanish 500</h1>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(88px, 1fr))", gap: 8 }} className="metric-grid">
                <Metric icon={<Flame size={16} />} label="Reviewed" value={overallStats.reviewed} theme={theme} />
                <Metric icon={<CheckCircle2 size={16} />} label="Accuracy" value={`${accuracyPct}%`} theme={theme} />
                <Metric icon={<Trophy size={16} />} label="Mastered" value={overallStats.mastered} theme={theme} />
                <Metric icon={<BarChart3 size={16} />} label="Studied" value={overallStats.studied} theme={theme} />
              </div>
            </div>
          </div>

          <div style={panelStyle(theme, 24)}>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <h2 style={sectionTitleStyle}>Study setup</h2>
              <div>
                <div style={labelStyle(theme)}>Direction</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
                  <TabButton active={settings.direction === "es-en"} onClick={() => setSettings((state) => ({ ...state, direction: "es-en" }))} theme={theme}>ES → EN</TabButton>
                  <TabButton active={settings.direction === "en-es"} onClick={() => setSettings((state) => ({ ...state, direction: "en-es" }))} theme={theme}>EN → ES</TabButton>
                  <TabButton active={settings.direction === "both"} onClick={() => setSettings((state) => ({ ...state, direction: "both" }))} theme={theme}>Both</TabButton>
                </div>
              </div>

              <div>
                <div style={labelStyle(theme)}>Theme</div>
                <select
                  value={settings.theme}
                  onChange={(event) => setSettings((state) => ({ ...state, theme: event.target.value }))}
                  style={selectStyle(theme)}
                >
                  <option value="system">System</option>
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                </select>
              </div>

              <ToggleRow
                label="Auto-play pronunciation"
                icon={<Volume2 size={16} />}
                checked={settings.autoAudio}
                onCheckedChange={(autoAudio) => setSettings((state) => ({ ...state, autoAudio }))}
                theme={theme}
              />

              <div style={{ borderRadius: 18, padding: 14, background: theme.soft, border: `1px solid ${theme.border}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: theme.muted, marginBottom: 8 }}>
                  <span>Mastery progress</span>
                  <span>{masteryPct}%</span>
                </div>
                <ProgressBar value={masteryPct} theme={theme} />
                <div style={{ marginTop: 8, fontSize: 12, color: theme.muted }}>
                  {overallStats.mastered} of {words.length} words are currently in the mastered bucket.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) 320px",
            gap: 24,
          }}
          className="main-grid"
        >
          <div style={panelStyle(theme, 28)}>
            <AnimatePresence mode="wait">
              <motion.div
                key={`${currentCard.id}-${promptPack.label}-${promptSeed}`}
                initial={{ opacity: 0, y: 12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                style={{ display: "flex", flexDirection: "column", gap: 20 }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    <Pill theme={theme} variant="secondary">{promptPack.label}</Pill>
                    <Pill theme={theme} variant="outline">Rank #{currentCard.rank}</Pill>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <IconButton onClick={() => speak(promptPack.pronounce)} theme={theme} ariaLabel="Play audio">
                      <Volume2 size={16} />
                    </IconButton>
                    <IconButton onClick={skipCard} theme={theme} ariaLabel="Skip card">
                      <RotateCcw size={16} />
                    </IconButton>
                  </div>
                </div>

                <motion.button
                  type="button"
                  onClick={() => setRevealed((value) => !value)}
                  whileTap={{ scale: 0.995 }}
                  style={{
                    position: "relative",
                    minHeight: 380,
                    width: "100%",
                    borderRadius: 28,
                    border: `1px solid ${theme.border}`,
                    background: `linear-gradient(135deg, ${theme.cardSolid} 0%, ${theme.soft} 100%)`,
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
                    padding: 0,
                    color: theme.text,
                    cursor: "pointer",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: 16,
                      right: 16,
                      zIndex: 2,
                      borderRadius: 999,
                      border: `1px solid ${theme.border}`,
                      background: theme.card,
                      padding: "6px 12px",
                      fontSize: 12,
                      color: theme.muted,
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    {revealed ? "Tap to flip back" : "Tap to flip"}
                  </div>
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={revealed ? "back" : "front"}
                      initial={{ rotateY: revealed ? -90 : 90, opacity: 0 }}
                      animate={{ rotateY: 0, opacity: 1 }}
                      exit={{ rotateY: revealed ? 90 : -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      style={{
                        minHeight: 380,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                        padding: 48,
                        gap: 12,
                      }}
                    >
                      <div style={{ fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", color: theme.muted }}>
                        {revealed ? "Translation" : "Prompt"}
                      </div>
                      <div style={{ fontSize: 48, lineHeight: 1.05, fontWeight: 800 }} className="card-word">
                        {revealed ? promptPack.answer : promptPack.prompt}
                      </div>
                      <div style={{ marginTop: 4, fontSize: 14, color: theme.muted }}>
                        {revealed ? `Pronunciation target: ${currentCard.spanish}` : "Tap the card to reveal the translation."}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </motion.button>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 12 }} className="grade-grid">
                  <ActionButton variant="danger" disabled={!revealed} onClick={() => gradeCard("wrong")} theme={theme}>Wrong</ActionButton>
                  <ActionButton disabled={!revealed} onClick={() => gradeCard("correct")} theme={theme}>Correct</ActionButton>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={panelStyle(theme, 24)}>
              <h2 style={{ ...sectionTitleStyle, marginBottom: 16 }}>Progress stats</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 12 }}>
                <Stat label="Reviewed" value={overallStats.reviewed} theme={theme} />
                <Stat label="Correct" value={overallStats.correct} theme={theme} />
                <Stat label="Wrong" value={overallStats.wrong} theme={theme} />
                <Stat label="Current streak" value={currentWordStats.streak} theme={theme} />
                <Stat label="Current ease" value={currentWordStats.ease.toFixed(2)} theme={theme} />
                <Stat label="Current due" value={formatDueLabel(currentWordStats.dueAt)} theme={theme} />
              </div>
            </div>

            <div style={panelStyle(theme, 24)}>
              <h2 style={{ ...sectionTitleStyle, marginBottom: 16 }}>Controls</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <ActionButton variant="secondary" onClick={() => speak(currentCard.spanish)} theme={theme}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}><Volume2 size={16} /> Play Spanish audio</span>
                </ActionButton>
                <ActionButton variant="secondary" onClick={skipCard} theme={theme}>Skip this card</ActionButton>
                <ActionButton variant="danger" onClick={resetProgress} theme={theme}>Reset all progress</ActionButton>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        * { box-sizing: border-box; }
        button, select, input { font: inherit; }
        @media (max-width: 1024px) {
          .top-grid, .main-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 768px) {
          .metric-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; width: 100%; }
          .grade-grid { grid-template-columns: 1fr !important; }
          .card-word { font-size: 38px !important; }
        }
      `}</style>
    </div>
  );
}

function Metric({ icon, label, value, theme }) {
  return (
    <div style={{ borderRadius: 18, border: `1px solid ${theme.border}`, background: theme.cardSolid, padding: 12 }}>
      <div style={{ marginBottom: 8, display: "flex", alignItems: "center", gap: 8, color: theme.muted, fontSize: 12 }}>
        {icon}
        <span>{label}</span>
      </div>
      <div style={{ fontSize: 20, fontWeight: 800 }}>{value}</div>
    </div>
  );
}

function Stat({ label, value, theme }) {
  return (
    <div style={{ borderRadius: 18, background: theme.soft, border: `1px solid ${theme.border}`, padding: 12 }}>
      <div style={{ fontSize: 12, color: theme.muted }}>{label}</div>
      <div style={{ marginTop: 6, fontSize: 18, fontWeight: 800 }}>{value}</div>
    </div>
  );
}

function ProgressBar({ value, theme }) {
  return (
    <div style={{ width: "100%", height: 8, borderRadius: 999, background: theme.secondary, overflow: "hidden" }}>
      <div
        style={{
          width: `${Math.max(0, Math.min(100, value))}%`,
          height: "100%",
          borderRadius: 999,
          background: theme.accent,
          transition: "width 180ms ease",
        }}
      />
    </div>
  );
}

function TabButton({ active, onClick, children, theme }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        borderRadius: 16,
        border: `1px solid ${active ? theme.accent : theme.border}`,
        background: active ? theme.accent : theme.cardSolid,
        color: active ? theme.accentText : theme.text,
        padding: "12px 14px",
        fontWeight: 700,
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
}

function IconButton({ onClick, children, theme, ariaLabel }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      style={{
        width: 42,
        height: 42,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 16,
        border: `1px solid ${theme.border}`,
        background: theme.cardSolid,
        color: theme.text,
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
}

function ActionButton({ children, onClick, disabled = false, variant = "primary", theme }) {
  const background = variant === "danger" ? theme.danger : variant === "secondary" ? theme.cardSolid : theme.accent;
  const color = variant === "danger" ? "#ffffff" : variant === "secondary" ? theme.text : theme.accentText;
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      style={{
        width: "100%",
        borderRadius: 18,
        border: `1px solid ${variant === "secondary" ? theme.border : background}`,
        background,
        color,
        padding: "14px 16px",
        fontWeight: 700,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.45 : 1,
      }}
    >
      {children}
    </button>
  );
}

function Pill({ children, theme, variant }) {
  return (
    <div
      style={{
        borderRadius: 999,
        padding: "8px 12px",
        fontSize: 12,
        fontWeight: 700,
        border: `1px solid ${theme.border}`,
        background: variant === "secondary" ? theme.soft : theme.cardSolid,
        color: theme.text,
      }}
    >
      {children}
    </div>
  );
}

function ToggleRow({ label, icon, checked, onCheckedChange, theme }) {
  return (
    <label
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
        borderRadius: 18,
        border: `1px solid ${theme.border}`,
        padding: 14,
        cursor: "pointer",
        background: theme.cardSolid,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14 }}>
        {icon}
        <span>{label}</span>
      </div>
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onCheckedChange(event.target.checked)}
        style={{ width: 18, height: 18, accentColor: theme.accent }}
      />
    </label>
  );
}

export default App;
