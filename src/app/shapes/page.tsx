import type { Metadata } from "next";
import Link from "next/link";
import { SHAPES } from "@/lib/shapes";
import { ShapeIcon } from "@/components/shape-icon";

export const metadata: Metadata = {
  title: "Shapes",
  description: "Every standard diamond shape we cut and carry, explained.",
};

export default function ShapesPage() {
  return (
    <div className="container-isg py-16">
      <div className="max-w-2xl">
        <p className="font-sans text-xs uppercase tracking-wide text-ink-muted">Gallery</p>
        <h1 className="mt-2 font-display text-4xl">Shapes</h1>
        <p className="mt-4 font-sans text-sm text-ink-muted">
          Eleven standard shapes, each with its own facet arrangement and its
          own tradeoffs between fire, scintillation and yield from the rough.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-[22px] border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3">
        {SHAPES.map((shape) => (
          <div key={shape.id} className="flex flex-col gap-4 bg-porcelain p-8">
            <ShapeIcon shape={shape} size={64} />
            <h2 className="font-display text-2xl">{shape.name}</h2>
            <p className="font-sans text-sm text-ink-muted">{shape.blurb}</p>
            <Link
              href={`/natural-diamonds?shape=${shape.id}`}
              className="focus-ring mt-auto self-start font-sans text-sm text-ink underline underline-offset-4 hover:text-ink-muted"
            >
              View stones in this shape
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
