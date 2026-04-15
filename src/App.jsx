import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Volume2, RotateCcw, CheckCircle2, XCircle, MoonStar, SunMedium, Trophy, Flame, BarChart3, Smartphone, Monitor } from "lucide-react";

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

const EXPLICIT = new Set(["mierda", "diablo", "disparar", "arma", "robar", "matar", "sangre"]);
const STORAGE_KEY = "spanish-flashcards-v1";
const SETTINGS_KEY = "spanish-flashcards-settings-v1";

const parseWords = () =>
  RAW_WORDS.split("\n").map((line) => {
    const [rank, spanish, english] = line.split("|");
    return {
      id: Number(rank),
      rank: Number(rank),
      spanish,
      english,
      explicit: EXPLICIT.has(spanish),
    };
  });

const words = parseWords();

const defaultStats = () => ({
  seen: 0,
  correct: 0,
  wrong: 0,
  streak: 0,
  ease: 2.3,
  intervalHours: 0,
  dueAt: Date.now(),
  lastSeenAt: 0,
});

const normalize = (s) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();

const safeJsonParse = (value, fallback) => {
  try {
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

function speak(text) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  const utterance = new SpeechSynthesisUtterance(text);
  const voices = window.speechSynthesis.getVoices();
  const preferred =
    voices.find((v) => /es-MX/i.test(v.lang)) ||
    voices.find((v) => /es-US/i.test(v.lang)) ||
    voices.find((v) => /^es/i.test(v.lang));
  if (preferred) utterance.voice = preferred;
  utterance.lang = preferred?.lang || "es-MX";
  utterance.rate = 0.92;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

function getPrompt(card, direction) {
  if (direction === "es-en") {
    return { prompt: card.spanish, answer: card.english, label: "Spanish → English", pronounce: card.spanish };
  }
  if (direction === "en-es") {
    return { prompt: card.english, answer: card.spanish, label: "English → Spanish", pronounce: card.spanish };
  }
  return Math.random() > 0.5
    ? { prompt: card.spanish, answer: card.english, label: "Spanish → English", pronounce: card.spanish }
    : { prompt: card.english, answer: card.spanish, label: "English → Spanish", pronounce: card.spanish };
}

function pickWeighted(items) {
  const total = items.reduce((sum, item) => sum + item.weight, 0);
  let r = Math.random() * total;
  for (const item of items) {
    r -= item.weight;
    if (r <= 0) return item;
  }
  return items[0];
}

function App() {
  const [progress, setProgress] = useState(() => safeJsonParse(localStorage.getItem(STORAGE_KEY), {}));
  const [settings, setSettings] = useState(() =>
    safeJsonParse(localStorage.getItem(SETTINGS_KEY), {
      direction: "both",
      hideExplicit: true,
      autoAudio: false,
      theme: "system",
      showExamples: false,
    })
  );
  const [revealed, setRevealed] = useState(false);
  const [answerInput, setAnswerInput] = useState("");
  const [session, setSession] = useState({ studied: 0, correct: 0, wrong: 0 });
  const [cardSeed, setCardSeed] = useState(0);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  useEffect(() => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    const root = document.documentElement;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const dark = settings.theme === "dark" || (settings.theme === "system" && prefersDark);
    root.classList.toggle("dark", dark);
  }, [settings.theme]);

  const filteredWords = useMemo(
    () => words.filter((w) => !(settings.hideExplicit && w.explicit)),
    [settings.hideExplicit]
  );

  const mastery = useMemo(() => {
    const studied = filteredWords.filter((w) => (progress[w.id]?.seen || 0) > 0).length;
    const strong = filteredWords.filter((w) => (progress[w.id]?.streak || 0) >= 4).length;
    return {
      studied,
      strong,
      total: filteredWords.length,
      pct: Math.round((strong / Math.max(filteredWords.length, 1)) * 100),
    };
  }, [filteredWords, progress]);

  const currentCard = useMemo(() => {
    const now = Date.now();
    const pool = filteredWords.map((word) => {
      const stats = { ...defaultStats(), ...(progress[word.id] || {}) };
      const overdueBoost = now >= stats.dueAt ? 1.6 : 0.35;
      const weaknessBoost = 1 + stats.wrong * 1.8 + Math.max(0, stats.seen - stats.correct) * 0.4;
      const noveltyBoost = stats.seen === 0 ? 2.2 : 1;
      const masteryPenalty = Math.max(0.25, 1 - stats.streak * 0.08);
      const rankBoost = 1 + (500 - word.rank) / 1200;
      const weight = overdueBoost * weaknessBoost * noveltyBoost * masteryPenalty * rankBoost;
      return { word, stats, weight };
    });
    return pickWeighted(pool);
  }, [filteredWords, progress, cardSeed]);

  const promptPack = useMemo(() => getPrompt(currentCard.word, settings.direction), [currentCard, settings.direction]);

  useEffect(() => {
    setRevealed(false);
    setAnswerInput("");
    if (settings.autoAudio) {
      const t = setTimeout(() => speak(promptPack.pronounce), 250);
      return () => clearTimeout(t);
    }
  }, [promptPack, settings.autoAudio]);

  const accuracyPct = useMemo(() => {
    const total = session.correct + session.wrong;
    return total ? Math.round((session.correct / total) * 100) : 0;
  }, [session]);

  const checkAnswer = () => {
    const good = normalize(answerInput) === normalize(promptPack.answer);
    setRevealed(true);
    if (good) gradeCard("good");
  };

  const gradeCard = (rating) => {
    const now = Date.now();
    const id = currentCard.word.id;
    const prev = { ...defaultStats(), ...(progress[id] || {}) };
    const next = { ...prev, seen: prev.seen + 1, lastSeenAt: now };

    if (rating === "again") {
      next.wrong += 1;
      next.streak = 0;
      next.ease = Math.max(1.4, prev.ease - 0.2);
      next.intervalHours = 0.05;
      next.dueAt = now + 3 * 60 * 1000;
      setSession((s) => ({ ...s, studied: s.studied + 1, wrong: s.wrong + 1 }));
    } else if (rating === "hard") {
      next.correct += 1;
      next.streak = Math.max(1, prev.streak);
      next.ease = Math.max(1.5, prev.ease - 0.05);
      next.intervalHours = Math.max(0.2, (prev.intervalHours || 0.2) * 1.3);
      next.dueAt = now + next.intervalHours * 60 * 60 * 1000;
      setSession((s) => ({ ...s, studied: s.studied + 1, correct: s.correct + 1 }));
    } else if (rating === "easy") {
      next.correct += 1;
      next.streak = prev.streak + 1;
      next.ease = Math.min(3.0, prev.ease + 0.1);
      next.intervalHours = Math.max(8, (prev.intervalHours || 6) * next.ease * 1.45);
      next.dueAt = now + next.intervalHours * 60 * 60 * 1000;
      setSession((s) => ({ ...s, studied: s.studied + 1, correct: s.correct + 1 }));
    } else {
      next.correct += 1;
      next.streak = prev.streak + 1;
      next.intervalHours = Math.max(2, (prev.intervalHours || 1.5) * prev.ease * 1.18 + prev.streak * 0.8);
      next.dueAt = now + next.intervalHours * 60 * 60 * 1000;
      setSession((s) => ({ ...s, studied: s.studied + 1, correct: s.correct + 1 }));
    }

    setProgress((p) => ({ ...p, [id]: next }));
    setTimeout(() => setCardSeed((n) => n + 1), 120);
  };

  const resetProgress = () => {
    setProgress({});
    setSession({ studied: 0, correct: 0, wrong: 0 });
    setCardSeed((n) => n + 1);
  };

  const cardStats = { ...defaultStats(), ...(progress[currentCard.word.id] || {}) };
  const isMobile = typeof window !== "undefined" && window.innerWidth < 900;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/40 text-foreground">
      <div className="mx-auto max-w-7xl p-4 md:p-6 lg:p-8">
        <div className="mb-6 grid gap-4 lg:grid-cols-[1.2fr_360px]">
          <div className="rounded-3xl border bg-card/70 p-5 shadow-sm backdrop-blur">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                  {isMobile ? <Smartphone className="h-4 w-4" /> : <Monitor className="h-4 w-4" />} 
                  <span>{isMobile ? "Phone layout" : "Desktop layout"}</span>
                </div>
                <h1 className="text-3xl font-semibold tracking-tight">Spanish 500</h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  Adaptive Latin American Spanish flashcards with weighted review, audio, and progress memory.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                <Metric icon={<Flame className="h-4 w-4" />} label="Session" value={session.studied} />
                <Metric icon={<CheckCircle2 className="h-4 w-4" />} label="Accuracy" value={`${accuracyPct}%`} />
                <Metric icon={<Trophy className="h-4 w-4" />} label="Mastered" value={mastery.strong} />
                <Metric icon={<BarChart3 className="h-4 w-4" />} label="Pool" value={mastery.total} />
              </div>
            </div>
          </div>

          <Card className="rounded-3xl border shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Study setup</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div>
                <label className="mb-2 block text-muted-foreground">Direction</label>
                <Tabs value={settings.direction} onValueChange={(direction) => setSettings((s) => ({ ...s, direction }))}>
                  <TabsList className="grid w-full grid-cols-3 rounded-2xl">
                    <TabsTrigger value="es-en">ES → EN</TabsTrigger>
                    <TabsTrigger value="en-es">EN → ES</TabsTrigger>
                    <TabsTrigger value="both">Both</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              <div>
                <label className="mb-2 block text-muted-foreground">Theme</label>
                <Select value={settings.theme} onValueChange={(theme) => setSettings((s) => ({ ...s, theme }))}>
                  <SelectTrigger className="rounded-2xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="system">System</SelectItem>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <ToggleRow
                label="Auto-play pronunciation"
                icon={<Volume2 className="h-4 w-4" />}
                checked={settings.autoAudio}
                onCheckedChange={(autoAudio) => setSettings((s) => ({ ...s, autoAudio }))}
              />
              <ToggleRow
                label="Hide slang / explicit words"
                icon={<XCircle className="h-4 w-4" />}
                checked={settings.hideExplicit}
                onCheckedChange={(hideExplicit) => setSettings((s) => ({ ...s, hideExplicit }))}
              />

              <div className="rounded-2xl bg-muted/60 p-3">
                <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
                  <span>Mastery progress</span>
                  <span>{mastery.pct}%</span>
                </div>
                <Progress value={mastery.pct} className="h-2" />
                <div className="mt-2 text-xs text-muted-foreground">
                  {mastery.strong} of {mastery.total} words are currently in the mastered bucket.
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <Card className="rounded-[28px] border shadow-sm">
            <CardContent className="p-4 md:p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${currentCard.word.id}-${promptPack.label}`}
                  initial={{ opacity: 0, y: 12, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -12, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="rounded-full px-3 py-1">
                        {promptPack.label}
                      </Badge>
                      <Badge variant="outline" className="rounded-full px-3 py-1">
                        Rank #{currentCard.word.rank}
                      </Badge>
                      {currentCard.word.explicit && <Badge className="rounded-full">Sensitive</Badge>}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="icon" className="rounded-2xl" onClick={() => speak(promptPack.pronounce)}>
                        <Volume2 className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" className="rounded-2xl" onClick={() => setCardSeed((n) => n + 1)}>
                        <RotateCcw className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="rounded-[28px] border bg-gradient-to-br from-card to-muted/40 p-8 text-center shadow-inner md:p-12">
                    <div className="mb-3 text-xs uppercase tracking-[0.18em] text-muted-foreground">Prompt</div>
                    <div className="text-4xl font-semibold tracking-tight md:text-6xl">{promptPack.prompt}</div>
                    <div className="mt-3 text-sm text-muted-foreground">
                      Adaptive weight: missed words reappear sooner and mastered words drift farther apart.
                    </div>
                  </div>

                  <div className="grid gap-3 md:grid-cols-[1fr_auto]">
                    <Button onClick={() => setRevealed(true)} className="h-12 rounded-2xl px-6">
                      Show answer
                    </Button>
                  </div>

                  {revealed && (
                    <div className="rounded-[24px] border bg-muted/50 p-5">
                      <div className="mb-2 text-sm text-muted-foreground">Answer</div>
                      <div className="text-2xl font-semibold">{promptPack.answer}</div>
                      {settings.direction !== "es-en" && (
                        <div className="mt-3 text-sm text-muted-foreground">
                          Pronunciation target: <span className="font-medium text-foreground">{currentCard.word.spanish}</span>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="grid gap-3 sm:grid-cols-4">
                    <Button variant="destructive" className="rounded-2xl" onClick={() => gradeCard("again")}>
                      Again
                    </Button>
                    <Button variant="secondary" className="rounded-2xl" onClick={() => gradeCard("hard")}>
                      Hard
                    </Button>
                    <Button variant="outline" className="rounded-2xl" onClick={() => gradeCard("good")}>
                      Good
                    </Button>
                    <Button className="rounded-2xl" onClick={() => gradeCard("easy")}>
                      Easy
                    </Button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="rounded-3xl border shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Current word stats</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-3 text-sm">
                <Stat label="Seen" value={cardStats.seen} />
                <Stat label="Correct" value={cardStats.correct} />
                <Stat label="Wrong" value={cardStats.wrong} />
                <Stat label="Streak" value={cardStats.streak} />
                <Stat label="Ease" value={cardStats.ease.toFixed(2)} />
                <Stat label="Due" value={cardStats.dueAt <= Date.now() ? "Now" : "Later"} />
              </CardContent>
            </Card>

            <Card className="rounded-3xl border shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Why this card appeared</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>Words you miss often get boosted heavily.</p>
                <p>New words get a novelty boost so the deck keeps expanding.</p>
                <p>Strong streaks lower frequency so mastered words fade back.</p>
              </CardContent>
            </Card>

            <Card className="rounded-3xl border shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Controls</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full rounded-2xl" onClick={() => speak(currentCard.word.spanish)}>
                  <Volume2 className="mr-2 h-4 w-4" /> Play Spanish audio
                </Button>
                <Button variant="outline" className="w-full rounded-2xl" onClick={() => setCardSeed((n) => n + 1)}>
                  Skip this card
                </Button>
                <Button variant="destructive" className="w-full rounded-2xl" onClick={resetProgress}>
                  Reset all progress
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function Metric({ icon, label, value }) {
  return (
    <div className="rounded-2xl border bg-background/70 p-3">
      <div className="mb-2 flex items-center gap-2 text-muted-foreground">{icon}<span className="text-xs">{label}</span></div>
      <div className="text-lg font-semibold">{value}</div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-2xl bg-muted/50 p-3">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="mt-1 text-base font-semibold">{value}</div>
    </div>
  );
}

function ToggleRow({ label, icon, checked, onCheckedChange }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border p-3">
      <div className="flex items-center gap-2 text-sm">
        {icon}
        <span>{label}</span>
      </div>
      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  );
}

export default App;
