// Procedural rough -> polished diamond renderer.
//
// The build brief specifies a 700-frame photographic sequence drawn to a
// <canvas> via drawImage. Those frames don't exist yet, so this module draws
// each frame procedurally instead — same canvas contract (draw(progress)),
// same frame-index discretization the real sequence would use. Swapping in
// real photography later means replacing the body of `drawGemFrame` with
// `ctx.drawImage(frames[frameIndex], 0, 0, w, h)`; the caller in
// hero-sequence.tsx does not need to change.

const N = 16; // vertex count for both the rough and the round outline

const ROUGH_JITTER = [
  0.62, 0.9, 0.7, 1.0, 0.58, 0.85, 0.95, 0.65, 0.88, 0.6, 0.93, 0.72, 0.99, 0.68, 0.8, 0.75,
];

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

function hexToRgb(hex: string): [number, number, number] {
  const v = parseInt(hex.replace("#", ""), 16);
  return [(v >> 16) & 255, (v >> 8) & 255, v & 255];
}

const METAL = hexToRgb("#b9b6ae");
const WHITE: [number, number, number] = [255, 255, 255];
const FACET_RGB = hexToRgb("#dceaf0");
const INK = hexToRgb("#17181b");

function rgbLerp(a: [number, number, number], b: [number, number, number], t: number) {
  return `rgb(${Math.round(lerp(a[0], b[0], t))}, ${Math.round(lerp(a[1], b[1], t))}, ${Math.round(
    lerp(a[2], b[2], t)
  )})`;
}

export type StageKey = "rough" | "planning" | "sawing" | "faceting" | "finished";

/** Boundaries as fractions of total scroll progress (0–1), mirroring the ~700-frame ranges. */
export const STAGE_BOUNDS: Record<StageKey, [number, number]> = {
  rough: [0, 0.2],
  planning: [0.2, 0.4],
  sawing: [0.4, 0.6],
  faceting: [0.6, 0.858],
  finished: [0.858, 1],
};

function stageLocalT(t: number, key: StageKey): number {
  const [from, to] = STAGE_BOUNDS[key];
  if (t <= from) return 0;
  if (t >= to) return 1;
  return (t - from) / (to - from);
}

export function drawGemFrame(ctx: CanvasRenderingContext2D, width: number, height: number, t: number) {
  ctx.clearRect(0, 0, width, height);

  const cx = width / 2;
  const cy = height / 2;
  const R = Math.min(width, height) * 0.28;

  // shapeProgress: 0 = raw rough silhouette, 1 = perfect round outline.
  // Ramps across planning -> sawing -> faceting.
  const shapeProgress = easeInOut(Math.min(1, Math.max(0, (t - 0.2) / (0.858 - 0.2))));

  // facetProgress: opacity of the internal facet lines / table.
  const facetProgress = easeInOut(stageLocalT(t, "faceting")) * 0.4 + (t >= 0.858 ? 0.6 : 0);
  const facetOpacity = Math.min(1, t < 0.6 ? 0 : facetProgress + (t >= 0.858 ? 0.6 : 0));

  const rotation = t * Math.PI * 0.65;

  const points: [number, number][] = [];
  for (let i = 0; i < N; i++) {
    const angle = (i / N) * Math.PI * 2 + rotation;
    const roughR = R * ROUGH_JITTER[i];
    const r = lerp(roughR, R, shapeProgress);
    points.push([cx + Math.cos(angle) * r, cy + Math.sin(angle) * r]);
  }

  ctx.save();

  // Body fill: muted stone grey warming toward white as it is refined.
  ctx.beginPath();
  points.forEach(([x, y], i) => (i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)));
  ctx.closePath();

  const grad = ctx.createRadialGradient(cx - R * 0.3, cy - R * 0.3, R * 0.1, cx, cy, R);
  const bodyColor = rgbLerp(METAL, WHITE, shapeProgress);
  const glintColor = rgbLerp(METAL, FACET_RGB, Math.max(shapeProgress, facetOpacity));
  grad.addColorStop(0, glintColor);
  grad.addColorStop(1, bodyColor);
  ctx.fillStyle = grad;
  ctx.fill();

  ctx.lineWidth = 1.25;
  ctx.strokeStyle = `rgba(${INK[0]}, ${INK[1]}, ${INK[2]}, ${lerp(0.35, 0.55, shapeProgress)})`;
  ctx.stroke();

  // Sawing stage: a single bright cut line opens across the stone.
  const sawT = stageLocalT(t, "sawing");
  if (sawT > 0 && sawT < 1) {
    const open = Math.sin(sawT * Math.PI); // ramps 0 -> 1 -> 0 across the stage
    ctx.beginPath();
    ctx.moveTo(cx - R * 1.05, cy);
    ctx.lineTo(cx + R * 1.05, cy);
    ctx.lineWidth = 0.75 + open * 2.5;
    ctx.strokeStyle = `rgba(${FACET_RGB[0]}, ${FACET_RGB[1]}, ${FACET_RGB[2]}, ${0.5 + open * 0.5})`;
    ctx.stroke();
  }

  // Planning stage: faint guide chords hinting at the eventual facet plan.
  const planT = stageLocalT(t, "planning");
  if (planT > 0) {
    ctx.globalAlpha = planT * 0.35 * (1 - facetOpacity * 0.5);
    ctx.strokeStyle = `rgb(${INK[0]}, ${INK[1]}, ${INK[2]})`;
    ctx.lineWidth = 0.5;
    for (let i = 0; i < N; i += 4) {
      ctx.beginPath();
      ctx.moveTo(points[i][0], points[i][1]);
      ctx.lineTo(points[(i + N / 2) % N][0], points[(i + N / 2) % N][1]);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }

  // Faceting / finished: table octagon + spokes, fading in.
  if (facetOpacity > 0.01) {
    ctx.globalAlpha = facetOpacity;
    ctx.strokeStyle = `rgba(${INK[0]}, ${INK[1]}, ${INK[2]}, 0.55)`;
    ctx.lineWidth = 0.75;

    ctx.beginPath();
    for (let i = 0; i < N; i += 2) {
      const [x, y] = points[i];
      const ix = cx + (x - cx) * 0.42;
      const iy = cy + (y - cy) * 0.42;
      if (i === 0) ctx.moveTo(ix, iy);
      else ctx.lineTo(ix, iy);
    }
    ctx.closePath();
    ctx.stroke();

    for (let i = 0; i < N; i += 2) {
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(points[i][0], points[i][1]);
      ctx.stroke();
    }

    // Sparkle glints, fixed anchor points, phased by t so they don't flicker randomly.
    if (t > 0.85) {
      const sparkleAlpha = (t - 0.85) / 0.15;
      const anchors = [2, 6, 11];
      anchors.forEach((i, idx) => {
        const phase = Math.sin(t * 30 + idx * 2.1);
        if (phase > 0.5) {
          const [x, y] = points[i];
          const s = 3 + phase * 2;
          ctx.globalAlpha = sparkleAlpha * (phase - 0.5) * 2;
          ctx.strokeStyle = "rgba(255,255,255,0.95)";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(x - s, y);
          ctx.lineTo(x + s, y);
          ctx.moveTo(x, y - s);
          ctx.lineTo(x, y + s);
          ctx.stroke();
        }
      });
    }
    ctx.globalAlpha = 1;
  }

  ctx.restore();
}
