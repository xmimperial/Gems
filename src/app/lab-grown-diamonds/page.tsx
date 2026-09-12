import { Suspense } from "react";
import type { Metadata } from "next";
import { CatalogGrid } from "@/components/catalog";
import { LAB_GROWN_DIAMONDS } from "@/lib/diamonds";

export const metadata: Metadata = {
  title: "Lab-Grown Diamonds",
  description: "Loose lab-grown diamonds by shape, carat, color, clarity and cut. IGI certified.",
};

export default function LabGrownDiamondsPage() {
  return (
    <div className="container-isg py-16">
      <div className="max-w-2xl">
        <p className="font-sans text-xs uppercase tracking-wide text-ink-muted">Catalog</p>
        <h1 className="mt-2 font-display text-4xl">Lab-grown diamonds</h1>
        <p className="mt-4 font-sans text-sm text-ink-muted">
          Grown under controlled conditions and identical in composition,
          hardness and optical properties to mined diamond. Graded to the
          same standard as our natural stock.
        </p>
      </div>

      <div className="mt-10 rounded-[22px] border border-hairline bg-panel/60 p-6">
        <h2 className="font-sans text-sm font-medium text-ink">What lab-grown means</h2>
        <p className="mt-2 max-w-2xl font-sans text-sm text-ink-muted">
          Lab-grown diamonds are created using high-pressure high-temperature
          (HPHT) or chemical vapor deposition (CVD) processes that replicate
          the natural conditions under which diamond forms. The result is
          real diamond — the same carbon crystal structure, the same
          hardness, and the same fire — produced in weeks rather than over
          geological time. Every stone here carries an independent IGI
          certificate stating its origin.
        </p>
      </div>

      <div className="mt-10">
        <Suspense fallback={null}>
          <CatalogGrid diamonds={LAB_GROWN_DIAMONDS} />
        </Suspense>
      </div>
    </div>
  );
}
