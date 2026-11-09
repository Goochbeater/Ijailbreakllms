'use client';

/**
 * InfinitySlider
 * ---------------------------------------------------------------------------
 * Image-free replacement for the imgur logo marquee.
 *
 *   - 26 provider lockups, all inline SVG (see ./provider-marks.js). No image
 *     files, no network requests, no new dependencies.
 *   - Every lockup breathes in its own brand colour (a tint layer fades in and
 *     out over the muted base), each on its own period and phase so the strip
 *     shimmers instead of blinking in sync. Hover locks the colour in.
 *   - A dotted infinity loop is drawn behind the logos at the strip's real size,
 *     with a small comet travelling along it.
 *   - Hover slows the strip, drag scrubs it, arrow keys nudge it, Space pauses.
 *     It also stays still for visitors who prefer reduced motion.
 *
 * Used by components/client-home-page.jsx in place of the old imgur marquee.
 *
 * Optional: add  family=Instrument+Serif:ital@0;1  to the Google Fonts <link>
 * in app/layout.jsx for the exact Falcon / Pi lettering (falls back to Georgia).
 *
 * PROPS
 *   speed         px per second               default 40
 *   hoverSpeed    speed multiplier on hover   default 0.12
 *   gap           gap between lockups, px     default 56
 *   showInfinity  dotted infinity + comet     default true
 *   linkOut       lockups open the matching guide folder on GitHub   default false
 *   className     extra wrapper class
 *
 * Theme: reads the site's --text-primary / --text-accent / --font-heading and the
 * html.dark class, so light and dark mode need no extra wiring.
 * ---------------------------------------------------------------------------
 */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { SYMBOLS } from './provider-marks';

const REPO = 'https://github.com/Goochbeater/Spiritual-Spell-Red-Teaming';
const GUIDE = REPO + '/tree/main/Jailbreak-Guide';
const SERIF = "'Instrument Serif', Georgia, 'Times New Roman', serif";

/*
 * mark / word  -> symbol ids in provider-marks.js (traced logo + traced wordmark)
 * lockup       -> one complete traced lockup
 * text         -> typed product name set beside the provider's real mark
 */
const BRANDS = [
  { id: 'anthropic', name: 'Anthropic', models: 'Claude 4.8 · Opus 5.5 · Haiku 5.5', accent: '#D97757', href: GUIDE + '/Anthropic', mark: 'm-anthropic', word: 'w-anthropic' },
  { id: 'openai', name: 'OpenAI', models: 'ChatGPT 5.3 Instant', accent: '#10A37F', href: GUIDE + '/ChatGPT', mark: 'm-openai', word: 'w-openai' },
  { id: 'gemini', name: 'Google Gemini', models: 'Gemini 4 Argon · 3.8 Flash', accent: '#7F93FF', href: GUIDE + '/Gemini', mark: 'm-gemini', word: 'w-gemini' },
  { id: 'deepmind', name: 'Google DeepMind', models: 'Antigravity · Jules', accent: '#6EA8FF', href: GUIDE + '/Gemini', mark: 'm-deepmind', word: 'w-deepmind' },
  { id: 'grok', name: 'xAI Grok', models: 'Grok 4.7 · 4.5 · Heavy', accent: '#E6E8EB', href: GUIDE + '/Grok', mark: 'm-grok', word: 'w-grok' },
  { id: 'meta', name: 'Meta', models: 'Muse Spark · Llama', accent: '#2F80FF', href: GUIDE + '/System%20Prompts/Meta%20AI', lockup: 'l-meta' },
  { id: 'mistral', name: 'Mistral AI', models: 'Mistral · Le Chat', accent: '#FA520F', href: GUIDE + '/Other%20LLMs/Mistral', mark: 'm-mistral', word: 'w-mistral' },
  { id: 'deepseek', name: 'DeepSeek', models: 'DeepSeek chat + reasoner', accent: '#4D6BFE', href: GUIDE + '/Other%20LLMs/DeepSeek', mark: 'm-deepseek', word: 'w-deepseek' },
  { id: 'qwen', name: 'Alibaba Qwen', models: 'Qwen · Qwen Chat', accent: '#8B6CFF', href: GUIDE + '/Other%20LLMs/Qwen', mark: 'm-qwen', word: 'w-qwen' },
  { id: 'kimi', name: 'Moonshot AI Kimi', models: 'Kimi', accent: '#2E8BFF', href: GUIDE + '/Other%20LLMs/KIMI', mark: 'm-kimi', word: 'w-kimi' },
  { id: 'glm', name: 'Z.ai GLM', models: 'GLM', accent: '#5B86FF', href: GUIDE + '/Other%20LLMs/GLM', mark: 'm-glm', text: 'GLM' },
  { id: 'perplexity', name: 'Perplexity', models: 'PPLX · Sonnet 4.5 via Perplexity', accent: '#22B8CD', href: GUIDE + '/Anthropic/Perplexity', mark: 'm-perplexity', word: 'w-perplexity' },
  { id: 'cohere', name: 'Cohere', models: 'Command', accent: '#FF7759', href: REPO, mark: 'm-cohere', word: 'w-cohere' },
  { id: 'hf', name: 'Hugging Face', models: 'Spaces · Inference chat', accent: '#FFD21E', href: REPO, mark: 'm-hf', word: 'w-hf' },
  { id: 'nvidia', name: 'NVIDIA', models: 'NIM endpoints', accent: '#76B900', href: REPO, mark: 'm-nvidia', word: 'w-nvidia' },
  { id: 'stability', name: 'Stability AI', models: 'Stable Diffusion', accent: '#A855F7', href: REPO, lockup: 'l-stability' },
  { id: 'rufus', name: 'Amazon Rufus', models: 'Amazon Rufus · full tool map', accent: '#FF9900', href: GUIDE + "/Anthropic/Amazon's%20Rufus", mark: 'm-rufus', text: 'rufus' },
  { id: 'ernie', name: 'Baidu ERNIE', models: 'ERNIE', accent: '#4A6CFF', href: GUIDE + '/Other%20LLMs/ERNIE', mark: 'm-ernie', text: 'ERNIE' },
  { id: 'minimax', name: 'MiniMax', models: 'MiniMax chat', accent: '#F23F5D', href: GUIDE + '/Other%20LLMs/MiniMax', mark: 'm-minimax', word: 'w-minimax' },
  { id: 'olmo', name: 'Ai2 OLMo', models: 'OLMo 3', accent: '#F0529C', href: GUIDE + '/Other%20LLMs/OLMo%203', mark: 'm-olmo', text: 'OLMo' },
  { id: 'falcon', name: 'TII Falcon', models: 'Falcon 3', accent: '#2BC4F0', href: GUIDE + '/Other%20LLMs/Falcon%203', mark: 'm-falcon', text: 'Falcon' },
  { id: 'palmyra', name: 'Writer Palmyra', models: 'Palmyra x5', accent: '#C6F135', href: GUIDE + '/Other%20LLMs/Palmyra%20x5', mark: 'm-palmyra', text: 'Palmyra' },
  { id: 'mercury', name: 'Inception Labs Mercury', models: 'Mercury', accent: '#C0CBD8', href: GUIDE + '/Other%20LLMs/Mercury', mark: 'm-mercury', text: 'Mercury' },
  { id: 'pi', name: 'Inflection Pi', models: 'Pi · Inflection 3', accent: '#A99BFF', href: GUIDE + '/Other%20LLMs/Pi-AI%20Inflection%203', mark: 'm-pi', text: 'Pi' },
  { id: 'canva', name: 'Canva AI', models: 'Canva AI', accent: '#00C4CC', href: GUIDE + '/Other%20LLMs/Canva%20AI', mark: 'm-canva', text: 'Canva' },
  { id: 'sarvam', name: 'Sarvam AI', models: 'Indus', accent: '#FFA94D', href: GUIDE + '/Other%20LLMs/Indus%20by%20Sarvam%20AI', mark: 'm-sarvam', text: 'Sarvam' },
];

/* Typed product names (sizes are em of the 22px base, scaled by --ijb-k). */
const TEXT_STYLE = {
  glm: { fontWeight: 700, fontSize: '0.98em', letterSpacing: '0.12em' },
  rufus: { fontWeight: 700, fontSize: '1.14em', letterSpacing: '-0.045em', textTransform: 'lowercase' },
  ernie: { fontWeight: 600, fontSize: '0.92em', letterSpacing: '0.2em' },
  olmo: { fontWeight: 800, fontSize: '1.14em', letterSpacing: '-0.05em' },
  falcon: { fontFamily: SERIF, fontWeight: 400, fontSize: '1.32em', letterSpacing: '0.005em' },
  palmyra: { fontWeight: 500, fontSize: '1.04em', letterSpacing: '0.01em' },
  mercury: { fontWeight: 400, fontSize: '0.72em', letterSpacing: '0.26em', textTransform: 'uppercase' },
  pi: { fontFamily: SERIF, fontWeight: 400, fontStyle: 'italic', fontSize: '1.55em', letterSpacing: '0' },
  canva: { fontWeight: 700, fontSize: '1.1em', letterSpacing: '-0.03em' },
  sarvam: { fontWeight: 600, fontSize: '1.05em', letterSpacing: '0.005em' },
};

const IJB_CSS = `
.ijb-infinity {
  --ijb-k: 1;
  --ijb-gap: 56px;
  --ijb-ink: var(--text-primary, #f4efe2);
  --ijb-line: color-mix(in srgb, var(--ijb-ink) 12%, transparent);
  --ijb-line-strong: color-mix(in srgb, var(--ijb-ink) 26%, transparent);
  --ijb-gold: var(--text-accent, #D4AF37);
  --ijb-glow-peak: 0.5;
  position: relative;
  width: 100%;
  isolation: isolate;
  color: var(--ijb-ink);
  font-family: var(--font-heading, Outfit, system-ui, sans-serif);
}
html:not(.dark) .ijb-infinity { --ijb-gold: #b8860b; --ijb-glow-peak: 0.34; }
.ijb-infinity *, .ijb-infinity *::before, .ijb-infinity *::after { box-sizing: border-box; }
.ijb-sprite { position: absolute; width: 0; height: 0; overflow: hidden; }
.ijb-sr { position: absolute; width: 1px; height: 1px; margin: -1px; padding: 0; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; border: 0; }

.ijb-stage { position: relative; }
.ijb-fade {
  -webkit-mask-image: linear-gradient(90deg, transparent 0, #000 9%, #000 91%, transparent 100%);
  mask-image: linear-gradient(90deg, transparent 0, #000 9%, #000 91%, transparent 100%);
}

/* dotted infinity + comet ---------------------------------------------------- */
.ijb-ribbon { position: absolute; inset: 0; z-index: 0; pointer-events: none; overflow: hidden; }
.ijb-ribbon svg { display: block; width: 100%; height: 100%; }
.ijb-dots {
  fill: none; stroke: var(--ijb-gold); stroke-width: 2; stroke-linecap: round;
  stroke-dasharray: 0.1 9; opacity: 0.3;
  animation: ijb-drift 40s linear infinite;
}
.ijb-comet, .ijb-comet-tail { fill: none; stroke: var(--ijb-gold); stroke-linecap: round; animation: ijb-comet 16s linear infinite; }
.ijb-comet-tail { stroke-width: 1.6; stroke-dasharray: 30 970; opacity: 0.28; }
.ijb-comet { stroke-width: 2.6; stroke-dasharray: 4 996; stroke-dashoffset: -26; opacity: 0.95; filter: drop-shadow(0 0 4px var(--ijb-gold)); animation-name: ijb-comet-head; }
@keyframes ijb-drift { to { stroke-dashoffset: -190; } }
@keyframes ijb-comet { from { stroke-dashoffset: 0; } to { stroke-dashoffset: -1000; } }
@keyframes ijb-comet-head { from { stroke-dashoffset: -26; } to { stroke-dashoffset: -1026; } }

/* track ---------------------------------------------------------------------- */
.ijb-viewport {
  position: relative; z-index: 1; overflow: hidden;
  padding: clamp(24px, 3.2vw, 38px) 0;
  border-top: 1px solid var(--ijb-line); border-bottom: 1px solid var(--ijb-line);
  cursor: grab; touch-action: pan-y;
}
.ijb-viewport:active { cursor: grabbing; }
.ijb-viewport:focus-visible { outline: 1px solid var(--ijb-gold); outline-offset: -8px; }
.ijb-track { display: flex; width: max-content; will-change: transform; user-select: none; -webkit-user-select: none; }
.ijb-set { display: flex; align-items: center; gap: var(--ijb-gap); padding: 0 var(--ijb-gap) 0 0; margin: 0; list-style: none; }

/* a lockup: soft glow + muted base + brand-colour tint, stacked in one grid cell */
.ijb-brand {
  --ijb-accent: var(--ijb-gold);
  --ijb-live: var(--ijb-accent);
  --ijb-dur: 7s; --ijb-delay: 0s;
  position: relative; display: grid; align-items: center; justify-items: start; flex: none;
  padding: 6px 0; color: inherit; text-decoration: none; line-height: 1; white-space: nowrap;
  font-size: calc(22px * var(--ijb-k)); outline: none;
  transition: transform 340ms cubic-bezier(0.22, 0.8, 0.25, 1);
}
html:not(.dark) .ijb-brand { --ijb-live: color-mix(in srgb, var(--ijb-accent) 62%, #000); }
.ijb-brand > * { grid-area: 1 / 1; }
.ijb-layer { display: inline-flex; align-items: center; gap: calc(12px * var(--ijb-k)); }
.ijb-base {
  color: color-mix(in srgb, var(--ijb-ink) 60%, transparent);
  transition: color 340ms cubic-bezier(0.22, 0.8, 0.25, 1), filter 340ms cubic-bezier(0.22, 0.8, 0.25, 1);
}
.ijb-tint { color: var(--ijb-live); pointer-events: none; --ijb-lo: 0.1; --ijb-hi: 0.9; animation: ijb-breathe var(--ijb-dur) ease-in-out var(--ijb-delay) infinite; will-change: opacity; }
.ijb-brand > .ijb-glow {
  position: absolute; left: calc(-22px * var(--ijb-k)); top: 50%;
  width: calc(78px * var(--ijb-k)); height: calc(78px * var(--ijb-k));
  margin-top: calc(-39px * var(--ijb-k));
  border-radius: 50%; pointer-events: none; opacity: 0;
  background: radial-gradient(closest-side, color-mix(in srgb, var(--ijb-live) 46%, transparent), transparent 74%);
  --ijb-lo: 0; --ijb-hi: var(--ijb-glow-peak);
  animation: ijb-breathe var(--ijb-dur) ease-in-out var(--ijb-delay) infinite; will-change: opacity;
}
@keyframes ijb-breathe { 0%, 100% { opacity: var(--ijb-lo); } 50% { opacity: var(--ijb-hi); } }
@keyframes ijb-bob { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }

.ijb-svg { display: block; flex: none; fill: currentColor; overflow: visible; }
.ijb-mark { width: calc(34px * var(--ijb-k)); height: calc(34px * var(--ijb-k)); animation: ijb-bob var(--ijb-dur) ease-in-out var(--ijb-delay) infinite; }
.ijb-wordmark { height: calc(21px * var(--ijb-k)); width: auto; }
.ijb-lockup { height: calc(28px * var(--ijb-k)); width: auto; }
.ijb-word { font-size: 1em; font-weight: 600; letter-spacing: -0.02em; white-space: nowrap; }

a.ijb-brand { cursor: pointer; }
.ijb-brand:focus-visible { outline: 1px solid var(--ijb-live); outline-offset: 9px; }
@media (hover: hover) {
  .ijb-brand:hover, .ijb-brand:focus-visible { transform: translateY(-2px); }
  .ijb-brand:hover .ijb-base, .ijb-brand:focus-visible .ijb-base {
    color: var(--ijb-live);
    filter: drop-shadow(0 0 10px color-mix(in srgb, var(--ijb-live) 52%, transparent));
  }
}
@media (max-width: 900px) { .ijb-infinity { --ijb-k: 0.9; } }
@media (max-width: 720px) {
  .ijb-infinity { --ijb-k: 0.8; }
  .ijb-set { gap: calc(var(--ijb-gap) * 0.62); padding-right: calc(var(--ijb-gap) * 0.62); }
}
@media (max-width: 430px) { .ijb-infinity { --ijb-k: 0.72; } }
@media (prefers-reduced-motion: reduce) {
  .ijb-dots, .ijb-comet, .ijb-comet-tail, .ijb-mark, .ijb-tint, .ijb-glow { animation: none; }
  .ijb-comet, .ijb-comet-tail { display: none; }
  .ijb-tint { opacity: 0.24; }
  .ijb-glow { opacity: 0.16; }
  .ijb-brand { transition: none; }
}
`;

const hash01 = n => {
  const x = Math.sin(n * 12.9898 + 4.1414) * 43758.5453;
  return x - Math.floor(x);
};

/* Bernoulli lemniscate sized to the stage in real pixels (no stretched SVG). */
function infinityPath(w, h) {
  const A = w * 0.47;
  const B = (h * 0.42) / 0.3536;
  let d = '';
  for (let i = 0; i <= 200; i++) {
    const t = (i / 200) * Math.PI * 2;
    const s = Math.sin(t);
    const k = 1 + s * s;
    const x = w / 2 + (A * Math.cos(t)) / k;
    const y = h / 2 + (B * s * Math.cos(t)) / k;
    d += (i === 0 ? 'M' : 'L') + x.toFixed(1) + ' ' + y.toFixed(1);
  }
  return d + 'Z';
}

function Svg({ id, className }) {
  const sym = SYMBOLS[id];
  const [, , w, h] = sym.vb.split(' ').map(Number);
  return (
    <svg
      className={'ijb-svg ' + className}
      viewBox={sym.vb}
      fillRule={sym.rule || undefined}
      style={{ aspectRatio: w + ' / ' + h }}
      aria-hidden="true"
      focusable="false"
    >
      <use href={'#ijb-' + id} />
    </svg>
  );
}

function Layer({ brand, tint }) {
  return (
    <span className={'ijb-layer ' + (tint ? 'ijb-tint' : 'ijb-base')} aria-hidden="true">
      {brand.lockup ? (
        <Svg id={brand.lockup} className="ijb-lockup" />
      ) : (
        <>
          <Svg id={brand.mark} className="ijb-mark" />
          {brand.word ? (
            <Svg id={brand.word} className="ijb-wordmark" />
          ) : (
            <span className="ijb-word" style={TEXT_STYLE[brand.id]}>{brand.text}</span>
          )}
        </>
      )}
    </span>
  );
}

const Brand = React.memo(function Brand({ brand, index, duplicate, linkOut }) {
  const dur = 5.8 + hash01(index + 1) * 3.6;
  const style = {
    '--ijb-accent': brand.accent,
    '--ijb-dur': dur.toFixed(2) + 's',
    '--ijb-delay': (-hash01(index + 31) * dur).toFixed(2) + 's',
  };
  const inner = (
    <>
      <span className="ijb-glow" aria-hidden="true" />
      <Layer brand={brand} />
      <Layer brand={brand} tint />
      <span className="ijb-sr">{brand.name}</span>
    </>
  );
  return (
    <li>
      {linkOut ? (
        <a
          className="ijb-brand"
          style={style}
          href={brand.href}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={duplicate ? -1 : 0}
          draggable={false}
          title={brand.models}
        >
          {inner}
        </a>
      ) : (
        <div className="ijb-brand" style={style}>{inner}</div>
      )}
    </li>
  );
});

const usedSymbolIds = BRANDS.flatMap(b => [b.mark, b.word, b.lockup]).filter(Boolean);

function Sprite() {
  return (
    <svg className="ijb-sprite" width="0" height="0" aria-hidden="true" focusable="false">
      <defs>
        {usedSymbolIds.map(id => (
          <symbol key={id} id={'ijb-' + id} viewBox={SYMBOLS[id].vb} dangerouslySetInnerHTML={{ __html: SYMBOLS[id].body }} />
        ))}
      </defs>
    </svg>
  );
}

export function InfinitySlider({
  className = '',
  speed = 40,
  hoverSpeed = 0.12,
  gap = 56,
  showInfinity = true,
  linkOut = false,
}) {
  // starts false so server and client markup match; the effect below pauses for reduced-motion users
  const [paused, setPaused] = useState(false);
  const [copies, setCopies] = useState(2);
  const [stage, setStage] = useState({ w: 0, h: 0 });

  const stageRef = useRef(null);
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const firstSetRef = useRef(null);
  const draggingRef = useRef(false);
  const hoveringRef = useRef(false);
  const inViewRef = useRef(true);
  const pausedRef = useRef(paused);
  const offsetRef = useRef(0);
  const setWidthRef = useRef(0);
  const dragRef = useRef(null);
  const movedRef = useRef(0);
  const suppressRef = useRef(false);

  useEffect(() => { pausedRef.current = paused; }, [paused]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => { if (mq.matches) setPaused(true); };
    if (mq.matches) setPaused(true);
    mq.addEventListener ? mq.addEventListener('change', onChange) : mq.addListener(onChange);
    return () => (mq.removeEventListener ? mq.removeEventListener('change', onChange) : mq.removeListener(onChange));
  }, []);

  // One set's width drives the wrap point; enough copies to always cover the viewport.
  useEffect(() => {
    const measure = () => {
      const set = firstSetRef.current;
      const view = viewportRef.current;
      if (!set || !view) return;
      const w = set.getBoundingClientRect().width;
      setWidthRef.current = w;
      if (w > 0) setCopies(Math.max(2, Math.ceil(view.clientWidth / w) + 1));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (firstSetRef.current) ro.observe(firstSetRef.current);
    if (viewportRef.current) ro.observe(viewportRef.current);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure).catch(() => {});
    return () => ro.disconnect();
  }, []);

  // Stage size, so the infinity loop is drawn in real pixels.
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return undefined;
    const read = () => {
      const w = Math.round(el.clientWidth);
      const h = Math.round(el.clientHeight);
      setStage(prev => (prev.w === w && prev.h === h ? prev : { w, h }));
    };
    read();
    const ro = new ResizeObserver(read);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return undefined;
    const io = new IntersectionObserver(([entry]) => { inViewRef.current = entry.isIntersecting; }, { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    let frame = 0;
    let last = 0;
    const tick = now => {
      if (!last) last = now;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!pausedRef.current && !draggingRef.current && inViewRef.current) {
        offsetRef.current += speed * dt * (hoveringRef.current ? hoverSpeed : 1);
      }
      const width = setWidthRef.current;
      if (width > 0 && trackRef.current) {
        const wrapped = ((offsetRef.current % width) + width) % width;
        trackRef.current.style.transform = 'translate3d(' + (-wrapped).toFixed(2) + 'px,0,0)';
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [speed, hoverSpeed]);

  const infinity = useMemo(
    () => (stage.w > 0 && stage.h > 0 ? infinityPath(stage.w, stage.h) : ''),
    [stage.w, stage.h]
  );

  const handlePointerDown = event => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    suppressRef.current = false;
    movedRef.current = 0;
    dragRef.current = { x: event.clientX, start: offsetRef.current };
    draggingRef.current = true;
    try { event.currentTarget.setPointerCapture(event.pointerId); } catch (e) { /* noop */ }
  };
  const handlePointerMove = event => {
    if (!dragRef.current) return;
    const dx = event.clientX - dragRef.current.x;
    movedRef.current = Math.max(movedRef.current, Math.abs(dx));
    offsetRef.current = dragRef.current.start - dx * 1.15;
  };
  const endDrag = event => {
    if (!dragRef.current) return;
    suppressRef.current = movedRef.current > 6;
    dragRef.current = null;
    draggingRef.current = false;
    try { viewportRef.current.releasePointerCapture(event.pointerId); } catch (e) { /* noop */ }
  };
  const handleClickCapture = event => {
    if (!suppressRef.current) return;
    event.preventDefault();
    event.stopPropagation();
    suppressRef.current = false;
  };
  const handleKeyDown = event => {
    if (event.target !== event.currentTarget) return;
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();
      offsetRef.current += (event.key === 'ArrowRight' ? 1 : -1) * 90;
    }
    if (event.key === ' ' || event.key === 'Spacebar') {
      event.preventDefault();
      setPaused(v => !v);
    }
  };

  return (
    <div className={('ijb-infinity ' + className).trim()} style={{ '--ijb-gap': gap + 'px' }}>
      {/* injected raw: React would HTML-escape '>' in selectors during SSR and break the CSS */}
      <style dangerouslySetInnerHTML={{ __html: IJB_CSS }} />
      <Sprite />

      <div className="ijb-stage" ref={stageRef}>
        {showInfinity && infinity && (
          <div className="ijb-ribbon ijb-fade" aria-hidden="true">
            <svg width={stage.w} height={stage.h} viewBox={'0 0 ' + stage.w + ' ' + stage.h} focusable="false">
              <path className="ijb-dots" d={infinity} />
              <path className="ijb-comet-tail" d={infinity} pathLength="1000" />
              <path className="ijb-comet" d={infinity} pathLength="1000" />
            </svg>
          </div>
        )}

        <div
          className="ijb-viewport ijb-fade"
          ref={viewportRef}
          role="region"
          aria-label="AI models and providers covered"
          tabIndex={0}
          onPointerEnter={() => { hoveringRef.current = true; }}
          onPointerLeave={() => { hoveringRef.current = false; }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onClickCapture={handleClickCapture}
          onDragStart={event => event.preventDefault()}
          onFocus={() => { hoveringRef.current = true; }}
          onBlur={() => { hoveringRef.current = false; }}
          onKeyDown={handleKeyDown}
        >
          <div className="ijb-track" ref={trackRef}>
            {Array.from({ length: copies }, (_, copy) => (
              <ul
                key={copy}
                className="ijb-set"
                ref={copy === 0 ? firstSetRef : undefined}
                aria-hidden={copy > 0 ? 'true' : undefined}
              >
                {BRANDS.map((brand, index) => (
                  <Brand key={brand.id} brand={brand} index={index} duplicate={copy > 0} linkOut={linkOut} />
                ))}
              </ul>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default InfinitySlider;
