"use client";

import { useState } from "react";
import Link from "next/link";
import { SHAPES } from "@/lib/shapes";
import { ShapeIcon } from "./shape-icon";

export function ShapeGrid({
  hrefFor = (shapeId: string) => `/natural-diamonds?shape=${shapeId}`,
}: {
  hrefFor?: (shapeId: string) => string;
}) {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <ul className="grid grid-cols-3 gap-x-4 gap-y-8 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-11 lg:gap-x-2">
      {SHAPES.map((shape) => (
        <li key={shape.id} className="flex flex-col items-center">
          <Link
            href={hrefFor(shape.id)}
            className="focus-ring flex flex-col items-center gap-3 rounded-2xl p-2 transition-colors hover:bg-panel/60"
            onMouseEnter={() => setActiveId(shape.id)}
            onMouseLeave={() => setActiveId((id) => (id === shape.id ? null : id))}
            onFocus={() => setActiveId(shape.id)}
            onBlur={() => setActiveId((id) => (id === shape.id ? null : id))}
          >
            <ShapeIcon shape={shape} active={activeId === shape.id} size={52} />
            <span className="font-sans text-[11px] tracking-wide text-ink-muted">
              {shape.name}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
