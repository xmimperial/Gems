"use client";

import { motion } from "framer-motion";
import { ShapeDef } from "@/lib/shapes";

function outlinePath(shape: ShapeDef): string {
  const { outline } = shape;
  switch (outline.kind) {
    case "path":
      return outline.d;
    case "circle": {
      const { cx, cy, r } = outline;
      return `M ${cx - r} ${cy} A ${r} ${r} 0 1 0 ${cx + r} ${cy} A ${r} ${r} 0 1 0 ${cx - r} ${cy} Z`;
    }
    case "ellipse": {
      const { cx, cy, rx, ry } = outline;
      return `M ${cx - rx} ${cy} A ${rx} ${ry} 0 1 0 ${cx + rx} ${cy} A ${rx} ${ry} 0 1 0 ${cx - rx} ${cy} Z`;
    }
    case "rect": {
      const { x, y, width, height, rx } = outline;
      return `M ${x + rx} ${y} H ${x + width - rx} A ${rx} ${rx} 0 0 1 ${x + width} ${y + rx} V ${y + height - rx} A ${rx} ${rx} 0 0 1 ${x + width - rx} ${y + height} H ${x + rx} A ${rx} ${rx} 0 0 1 ${x} ${y + height - rx} V ${y + rx} A ${rx} ${rx} 0 0 1 ${x + rx} ${y} Z`;
    }
  }
}

export function ShapeIcon({
  shape,
  size = 56,
  active = false,
  showFacets = true,
}: {
  shape: ShapeDef;
  size?: number;
  active?: boolean;
  showFacets?: boolean;
}) {
  const d = outlinePath(shape);
  const facetId = `facet-${shape.id}`;

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      aria-hidden="true"
      className="overflow-visible"
    >
      <defs>
        <radialGradient id={facetId} cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="var(--facet)" stopOpacity="0.95" />
          <stop offset="100%" stopColor="var(--facet)" stopOpacity="0.15" />
        </radialGradient>
      </defs>

      <motion.path
        d={d}
        fill={`url(#${facetId})`}
        initial={false}
        animate={{ opacity: active && showFacets ? 1 : 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      />

      <motion.g
        initial={false}
        animate={{ opacity: active && showFacets ? 1 : 0, scale: active ? 1 : 0.85 }}
        style={{ originX: "50px", originY: "50px" }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <path
          d={d}
          fill="none"
          stroke="var(--ink)"
          strokeWidth={0.6}
          strokeOpacity={0.4}
          transform="translate(50 50) scale(0.55) translate(-50 -50)"
        />
        <line x1="50" y1="50" x2="50" y2="10" stroke="var(--ink)" strokeWidth={0.5} strokeOpacity={0.35} />
        <line x1="50" y1="50" x2="86" y2="50" stroke="var(--ink)" strokeWidth={0.5} strokeOpacity={0.35} />
        <line x1="50" y1="50" x2="50" y2="90" stroke="var(--ink)" strokeWidth={0.5} strokeOpacity={0.35} />
        <line x1="50" y1="50" x2="14" y2="50" stroke="var(--ink)" strokeWidth={0.5} strokeOpacity={0.35} />
      </motion.g>

      <path
        d={d}
        fill="none"
        stroke="var(--ink)"
        strokeWidth={active ? 1.4 : 1}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
