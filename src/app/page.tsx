import Link from "next/link";
import { HeroSequence } from "@/components/hero-sequence";
import { ShapeGrid } from "@/components/shape-grid";
import { ProductCard } from "@/components/product-card";
import { ALL_DIAMONDS } from "@/lib/diamonds";

const FEATURED = ALL_DIAMONDS.filter((d) => d.featured).slice(0, 6);

export default function HomePage() {
  return (
    <>
      <HeroSequence />

      <section className="container-isg py-24">
        <div className="mb-12 max-w-2xl">
          <p className="font-sans text-xs uppercase tracking-wide text-ink-muted">Browse by shape</p>
          <h2 className="mt-2 font-display text-3xl">Eleven shapes, one standard of cut.</h2>
        </div>
        <ShapeGrid />
      </section>

      <section className="bg-panel py-24">
        <div className="container-isg grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl">Natural</h2>
            <p className="mt-4 max-w-md font-sans text-sm text-ink-muted">
              Formed over billions of years under heat and pressure, each
              natural stone carries a mine of origin and a grading history
              specific to it alone.
            </p>
            <Link
              href="/natural-diamonds"
              className="focus-ring mt-6 inline-block rounded-full border border-ink px-6 py-2.5 font-sans text-sm text-ink transition-colors hover:bg-ink hover:text-porcelain"
            >
              View natural diamonds
            </Link>
          </div>
          <div>
            <h2 className="font-display text-3xl">Lab-grown</h2>
            <p className="mt-4 max-w-md font-sans text-sm text-ink-muted">
              Chemically and optically identical to mined diamond, grown under
              controlled conditions and graded to the same standard, stone
              for stone.
            </p>
            <Link
              href="/lab-grown-diamonds"
              className="focus-ring mt-6 inline-block rounded-full border border-ink px-6 py-2.5 font-sans text-sm text-ink transition-colors hover:bg-ink hover:text-porcelain"
            >
              View lab-grown diamonds
            </Link>
          </div>
        </div>
      </section>

      <section className="container-isg py-24">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <p className="font-sans text-xs uppercase tracking-wide text-ink-muted">Featured</p>
            <h2 className="mt-2 font-display text-3xl">A short selection, in hand this week.</h2>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURED.map((d) => (
            <ProductCard key={d.sku} diamond={d} />
          ))}
        </div>
      </section>

      <section className="bg-ink py-24 text-porcelain">
        <div className="container-isg grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="font-sans text-xs uppercase tracking-wide text-metal">Craftsmanship</p>
            <h2 className="mt-2 font-display text-3xl">
              From rough to graded, nothing is left to approximation.
            </h2>
            <p className="mt-4 max-w-md font-sans text-sm text-porcelain/70">
              Read how a stone is planned, cut and finished before it ever
              reaches this catalog, and what our sourcing and certification
              standards commit to.
            </p>
            <Link
              href="/craftsmanship"
              className="focus-ring mt-6 inline-block rounded-full bg-porcelain px-6 py-2.5 font-sans text-sm text-ink transition-opacity hover:opacity-90"
            >
              Read the process
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
