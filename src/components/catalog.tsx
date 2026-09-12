"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  CARAT_BANDS,
  CLARITY_GRADES,
  COLOR_GRADES,
  CUT_GRADES,
  LABS,
  type Diamond,
} from "@/lib/diamonds";
import { SHAPES, type ShapeId } from "@/lib/shapes";
import { ProductCard } from "./product-card";

type Filters = {
  shapes: Set<ShapeId>;
  caratBand: string | null;
  colors: Set<string>;
  clarities: Set<string>;
  cuts: Set<string>;
  labs: Set<string>;
};

function toggled<T>(set: Set<T>, value: T): Set<T> {
  const next = new Set(set);
  if (next.has(value)) next.delete(value);
  else next.add(value);
  return next;
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`focus-ring rounded-[10px] border px-3 py-1.5 font-sans text-xs transition-colors ${
        active
          ? "border-ink bg-ink text-porcelain"
          : "border-hairline text-ink-muted hover:border-ink hover:text-ink"
      }`}
    >
      {children}
    </button>
  );
}

export function CatalogGrid({ diamonds }: { diamonds: Diamond[] }) {
  const searchParams = useSearchParams();
  const initialShape = searchParams.get("shape") as ShapeId | null;

  const [filters, setFilters] = useState<Filters>({
    shapes: initialShape ? new Set([initialShape]) : new Set(),
    caratBand: null,
    colors: new Set(),
    clarities: new Set(),
    cuts: new Set(),
    labs: new Set(),
  });

  const filtered = useMemo(() => {
    const band = CARAT_BANDS.find((b) => b.label === filters.caratBand);
    return diamonds.filter((d) => {
      if (filters.shapes.size && !filters.shapes.has(d.shape)) return false;
      if (band && (d.carat < band.min || d.carat > band.max)) return false;
      if (filters.colors.size && !filters.colors.has(d.color)) return false;
      if (filters.clarities.size && !filters.clarities.has(d.clarity)) return false;
      if (filters.cuts.size && !filters.cuts.has(d.cut)) return false;
      if (filters.labs.size && !filters.labs.has(d.lab)) return false;
      return true;
    });
  }, [diamonds, filters]);

  const hasActiveFilters =
    filters.shapes.size ||
    filters.caratBand ||
    filters.colors.size ||
    filters.clarities.size ||
    filters.cuts.size ||
    filters.labs.size;

  return (
    <div>
      <div className="flex flex-col gap-6 rounded-[22px] border border-hairline bg-panel/50 p-6">
        <FilterGroup label="Shape">
          {SHAPES.map((s) => (
            <Chip
              key={s.id}
              active={filters.shapes.has(s.id)}
              onClick={() => setFilters((f) => ({ ...f, shapes: toggled(f.shapes, s.id) }))}
            >
              {s.name}
            </Chip>
          ))}
        </FilterGroup>

        <FilterGroup label="Carat">
          {CARAT_BANDS.map((b) => (
            <Chip
              key={b.label}
              active={filters.caratBand === b.label}
              onClick={() =>
                setFilters((f) => ({ ...f, caratBand: f.caratBand === b.label ? null : b.label }))
              }
            >
              {b.label}
            </Chip>
          ))}
        </FilterGroup>

        <FilterGroup label="Color">
          {COLOR_GRADES.map((c) => (
            <Chip
              key={c}
              active={filters.colors.has(c)}
              onClick={() => setFilters((f) => ({ ...f, colors: toggled(f.colors, c) }))}
            >
              {c}
            </Chip>
          ))}
        </FilterGroup>

        <FilterGroup label="Clarity">
          {CLARITY_GRADES.map((c) => (
            <Chip
              key={c}
              active={filters.clarities.has(c)}
              onClick={() => setFilters((f) => ({ ...f, clarities: toggled(f.clarities, c) }))}
            >
              {c}
            </Chip>
          ))}
        </FilterGroup>

        <FilterGroup label="Cut / finish">
          {CUT_GRADES.map((c) => (
            <Chip
              key={c}
              active={filters.cuts.has(c)}
              onClick={() => setFilters((f) => ({ ...f, cuts: toggled(f.cuts, c) }))}
            >
              {c}
            </Chip>
          ))}
        </FilterGroup>

        <FilterGroup label="Certificate">
          {LABS.map((l) => (
            <Chip
              key={l}
              active={filters.labs.has(l)}
              onClick={() => setFilters((f) => ({ ...f, labs: toggled(f.labs, l) }))}
            >
              {l}
            </Chip>
          ))}
        </FilterGroup>

        {Boolean(hasActiveFilters) && (
          <button
            type="button"
            onClick={() =>
              setFilters({
                shapes: new Set(),
                caratBand: null,
                colors: new Set(),
                clarities: new Set(),
                cuts: new Set(),
                labs: new Set(),
              })
            }
            className="focus-ring self-start font-sans text-xs text-ink-muted underline underline-offset-4 hover:text-ink"
          >
            Clear all filters
          </button>
        )}
      </div>

      <p className="mt-6 font-sans text-sm text-ink-muted">
        {filtered.length} stone{filtered.length === 1 ? "" : "s"}
      </p>

      {filtered.length > 0 ? (
        <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((d) => (
            <ProductCard key={d.sku} diamond={d} />
          ))}
        </div>
      ) : (
        <p className="mt-10 font-sans text-sm text-ink-muted">
          No stones match this combination yet. Clear a filter, or enquire and
          we will source against your specification.
        </p>
      )}
    </div>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-2 font-sans text-xs uppercase tracking-wide text-ink-muted">{label}</p>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}
