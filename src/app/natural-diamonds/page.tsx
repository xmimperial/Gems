import { Suspense } from "react";
import type { Metadata } from "next";
import { CatalogGrid } from "@/components/catalog";
import { NATURAL_DIAMONDS } from "@/lib/diamonds";

export const metadata: Metadata = {
  title: "Natural Diamonds",
  description: "Loose natural diamonds by shape, carat, color, clarity and cut. GIA certified.",
};

export default function NaturalDiamondsPage() {
  return (
    <div className="container-isg py-16">
      <div className="max-w-2xl">
        <p className="font-sans text-xs uppercase tracking-wide text-ink-muted">Catalog</p>
        <h1 className="mt-2 font-display text-4xl">Natural diamonds</h1>
        <p className="mt-4 font-sans text-sm text-ink-muted">
          Each stone below is independently graded and sold on specification.
          Enquire on any stone for its full certificate and additional
          imagery.
        </p>
      </div>

      <div className="mt-10">
        <Suspense fallback={null}>
          <CatalogGrid diamonds={NATURAL_DIAMONDS} />
        </Suspense>
      </div>
    </div>
  );
}
