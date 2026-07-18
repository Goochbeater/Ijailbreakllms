'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from '@/app/layout';

/**
 * PhysicsLogo — an interactive particle wordmark.
 *
 * The logo text is rasterised to an offscreen canvas and sampled into a grid
 * of particles (one per opaque glyph cell). The particles are simulated with
 * fixed-timestep Verlet integration:
 *
 *   - every particle is spring-bound to its "home" glyph position, so the
 *     text always re-forms naturally on release
 *   - neighbouring particles are linked by short distance constraints solved
 *     with position-based dynamics (unconditionally stable, no explosions)
 *   - the pointer/touch exerts a radial repulsion field — swipes "part" the
 *     text like water
 *   - pressing captures nearby particles so the word can be dragged around
 *   - pointer velocity injects a tangential curl force, so circular motions
 *     spin/rotate the cloud
 *   - a velocity clamp + fixed timestep keep the sim stable at any frame rate
 */
export function PhysicsLogo({ text = 'JailbreakLLMs', className = '' }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const { isDark } = useTheme();
  const themeRef = useRef(isDark);
  themeRef.current = isDark;

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return undefined;
    const ctx = canvas.getContext('2d');

    // ---- tunables ------------------------------------------------------
    const DAMPING = 0.9; // velocity retained per step
    const HOME_K = 0.055; // spring stiffness pulling particles home
    const REPEL_RADIUS = 110; // pointer "parting" radius (px)
    const REPEL_K = 2.6; // repulsion strength
    const GRAB_RADIUS = 72; // press-and-drag capture radius (px)
    const GRAB_K = 0.3; // drag attraction strength
    const SWIRL_K = 0.16; // rotational force from pointer velocity
    const MAX_SPEED = 26; // velocity clamp (stability)
    const SOLVER_ITERS = 2; // constraint relaxation passes per step
    const IDLE_AMP = 0.05; // ambient breathing force
    const STEP_MS = 1000 / 60; // fixed physics timestep
    // --------------------------------------------------------------------

    let particles = [];
    let sticks = [];
    let rafId = 0;
    let lastTime = 0;
    let acc = 0;
    let visible = true;
    let W = 0;
    let H = 0;
    let gap = 4;
    let dotR = 1.6;

    const pointer = {
      x: -1e4,
      y: -1e4,
      vx: 0,
      vy: 0,
      down: false,
      inside: false,
    };

    const reducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function build() {
      const rect = container.getBoundingClientRect();
      W = Math.max(1, Math.floor(rect.width));
      H = Math.max(1, Math.floor(rect.height));
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Rasterise the wordmark offscreen to find glyph pixels
      const off = document.createElement('canvas');
      off.width = W;
      off.height = H;
      const octx = off.getContext('2d', { willReadFrequently: true });
      let fontSize = H * 0.74;
      octx.font = `900 ${fontSize}px Outfit, sans-serif`;
      const measured = octx.measureText(text).width || 1;
      fontSize *= Math.min((W * 0.96) / measured, 1);
      octx.font = `900 ${fontSize}px Outfit, sans-serif`;
      octx.textAlign = 'center';
      octx.textBaseline = 'middle';
      octx.fillStyle = '#fff';
      octx.fillText(text, W / 2, H / 2 + fontSize * 0.04);

      const img = octx.getImageData(0, 0, W, H).data;
      gap = Math.max(3, Math.min(6, Math.round(W / 240)));
      dotR = Math.max(1.1, gap * 0.42);
      particles = [];
      sticks = [];
      const grid = new Map();
      let row = 0;
      for (let y = gap >> 1; y < H; y += gap, row += 1) {
        let col = 0;
        for (let x = gap >> 1; x < W; x += gap, col += 1) {
          if (img[(y * W + x) * 4 + 3] > 128) {
            const p = {
              x,
              y,
              px: x,
              py: y,
              hx: x,
              hy: y,
              gx: col,
              gy: row,
              seed: Math.random() * Math.PI * 2,
            };
            particles.push(p);
            grid.set(`${col}:${row}`, p);
          }
        }
      }
      // Link right + down neighbours -> a soft "fabric" stretched over the glyphs
      for (let i = 0; i < particles.length; i += 1) {
        const p = particles[i];
        const right = grid.get(`${p.gx + 1}:${p.gy}`);
        const down = grid.get(`${p.gx}:${p.gy + 1}`);
        if (right) sticks.push({ a: p, b: right, len: gap });
        if (down) sticks.push({ a: p, b: down, len: gap });
      }
    }

    function step(t) {
      const repelR2 = REPEL_RADIUS * REPEL_RADIUS;
      const grabR2 = GRAB_RADIUS * GRAB_RADIUS;
      const hasPointer = pointer.inside || pointer.down;

      for (let i = 0; i < particles.length; i += 1) {
        const p = particles[i];
        let ax = (p.hx - p.x) * HOME_K;
        let ay = (p.hy - p.y) * HOME_K;

        // gentle idle breathing so the mark feels alive
        ax += Math.sin(t * 0.0011 + p.seed) * IDLE_AMP;
        ay += Math.cos(t * 0.0009 + p.seed) * IDLE_AMP;

        if (hasPointer) {
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < repelR2) {
            const d = Math.sqrt(d2) || 0.001;
            const nx = dx / d;
            const ny = dy / d;
            const fall = 1 - d / REPEL_RADIUS;
            if (pointer.down && d2 < grabR2) {
              // drag: captured particles are pulled toward the pointer
              ax += -dx * GRAB_K;
              ay += -dy * GRAB_K;
            } else {
              // part: radial push away from the pointer
              ax += nx * fall * REPEL_K;
              ay += ny * fall * REPEL_K;
            }
            // rotate: tangential (curl) component of pointer velocity
            const vTan = -ny * pointer.vx + nx * pointer.vy;
            ax += -ny * vTan * SWIRL_K * fall;
            ay += nx * vTan * SWIRL_K * fall;
          }
        }

        // Verlet integration with velocity clamping
        let vx = (p.x - p.px) * DAMPING;
        let vy = (p.y - p.py) * DAMPING;
        const sp = Math.sqrt(vx * vx + vy * vy);
        if (sp > MAX_SPEED) {
          vx = (vx / sp) * MAX_SPEED;
          vy = (vy / sp) * MAX_SPEED;
        }
        p.px = p.x;
        p.py = p.y;
        p.x += vx + ax;
        p.y += vy + ay;
      }

      // Relax neighbour constraints (position-based dynamics)
      for (let k = 0; k < SOLVER_ITERS; k += 1) {
        for (let i = 0; i < sticks.length; i += 1) {
          const s = sticks[i];
          const { a, b } = s;
          let dx = b.x - a.x;
          let dy = b.y - a.y;
          const d = Math.sqrt(dx * dx + dy * dy) || 0.0001;
          const diff = ((d - s.len) / d) * 0.5;
          dx *= diff;
          dy *= diff;
          a.x += dx;
          a.y += dy;
          b.x -= dx;
          b.y -= dy;
        }
      }

      // decay pointer velocity between events
      pointer.vx *= 0.82;
      pointer.vy *= 0.82;
    }

    function render() {
      ctx.clearRect(0, 0, W, H);
      const dark = themeRef.current;
      const base = dark ? '#E9C766' : '#8a6508';
      const hot = dark ? '#FFF3C4' : '#d4af37';
      const glowR2 = REPEL_RADIUS * REPEL_RADIUS;
      const showGlow = pointer.inside || pointer.down;

      // base pass — one batched path
      ctx.fillStyle = base;
      ctx.beginPath();
      for (let i = 0; i < particles.length; i += 1) {
        const p = particles[i];
        ctx.moveTo(p.x + dotR, p.y);
        ctx.arc(p.x, p.y, dotR, 0, 6.2832);
      }
      ctx.fill();

      // highlight pass — particles near the pointer light up
      if (showGlow) {
        ctx.fillStyle = hot;
        ctx.beginPath();
        let any = false;
        for (let i = 0; i < particles.length; i += 1) {
          const p = particles[i];
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          if (dx * dx + dy * dy < glowR2) {
            ctx.moveTo(p.x + dotR * 1.35, p.y);
            ctx.arc(p.x, p.y, dotR * 1.35, 0, 6.2832);
            any = true;
          }
        }
        if (any) ctx.fill();
      }
    }

    function frame(t) {
      rafId = requestAnimationFrame(frame);
      if (!visible) {
        lastTime = t;
        return;
      }
      if (!lastTime) lastTime = t;
      acc += Math.min(t - lastTime, 100); // avoid spiral of death after tab switch
      lastTime = t;
      let n = 0;
      while (acc >= STEP_MS && n < 3) {
        step(t);
        acc -= STEP_MS;
        n += 1;
      }
      render();
    }

    // ---- events ---------------------------------------------------------
    function updatePointer(e) {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      pointer.vx = x - pointer.x;
      pointer.vy = y - pointer.y;
      pointer.x = x;
      pointer.y = y;
      pointer.inside = true;
    }

    function onPointerMove(e) {
      updatePointer(e);
    }

    function onPointerDown(e) {
      updatePointer(e);
      pointer.down = true;
      try {
        canvas.setPointerCapture(e.pointerId);
      } catch {
        /* pointer already released */
      }
    }

    function onPointerUp(e) {
      pointer.down = false;
      try {
        canvas.releasePointerCapture(e.pointerId);
      } catch {
        /* not captured */
      }
    }

    function onPointerLeave() {
      pointer.inside = false;
      pointer.down = false;
    }

    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerdown', onPointerDown);
    canvas.addEventListener('pointerup', onPointerUp);
    canvas.addEventListener('pointercancel', onPointerUp);
    canvas.addEventListener('pointerleave', onPointerLeave);

    // rebuild when the container resizes (debounced)
    let rebuildTimer;
    const ro = new ResizeObserver(() => {
      clearTimeout(rebuildTimer);
      rebuildTimer = setTimeout(() => {
        build();
        if (reducedMotion) render();
      }, 150);
    });
    ro.observe(container);

    // pause the sim when the hero scrolls out of view
    const io = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting !== false;
      },
      { threshold: 0 }
    );
    io.observe(container);

    // initial build — rebuild once the display font is actually available
    build();
    if (typeof document !== 'undefined' && document.fonts?.load) {
      document.fonts
        .load('900 100px Outfit')
        .then(() => {
          build();
          if (reducedMotion) render();
        })
        .catch(() => {});
    }

    if (reducedMotion) {
      // static render for users who prefer reduced motion
      render();
    } else {
      rafId = requestAnimationFrame(frame);
    }

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(rebuildTimer);
      ro.disconnect();
      io.disconnect();
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerdown', onPointerDown);
      canvas.removeEventListener('pointerup', onPointerUp);
      canvas.removeEventListener('pointercancel', onPointerUp);
      canvas.removeEventListener('pointerleave', onPointerLeave);
    };
  }, [text]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full select-none ${className}`}
      role="img"
      aria-label={text}
    >
      <span className="sr-only">{text}</span>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="block cursor-grab active:cursor-grabbing"
        style={{ touchAction: 'pan-y' }}
      />
    </div>
  );
}
