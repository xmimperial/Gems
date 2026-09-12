import type { Metadata } from "next";
import { JOURNEY_STAGES } from "@/lib/journey";

export const metadata: Metadata = {
  title: "Craftsmanship",
  description: "How a stone moves from rough to graded, and how we source and certify it.",
};

export default function CraftsmanshipPage() {
  return (
    <div className="container-isg py-16">
      <div className="max-w-2xl">
        <p className="font-sans text-xs uppercase tracking-wide text-ink-muted">Craftsmanship</p>
        <h1 className="mt-2 font-display text-4xl">The journey of a stone</h1>
        <p className="mt-4 font-sans text-sm text-ink-muted">
          Nothing on this site is described as flawless without a certificate
          behind it. This is the process every stone passes through before it
          reaches that point.
        </p>
      </div>

      <ol className="mt-16 flex flex-col gap-14">
        {JOURNEY_STAGES.map((stage, i) => (
          <li key={stage.key} className="grid gap-4 border-t border-hairline pt-8 md:grid-cols-[80px_1fr] md:gap-10">
            <span className="font-display text-2xl text-ink-muted">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <h2 className="font-display text-2xl">{stage.title}</h2>
              <p className="mt-3 max-w-2xl font-sans text-sm text-ink-muted">{stage.copy}</p>
            </div>
          </li>
        ))}
      </ol>

      <section className="mt-24 grid gap-12 border-t border-hairline pt-16 md:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl">Sourcing and ethics</h2>
          <p className="mt-4 font-sans text-sm text-ink-muted">
            Every natural stone we carry is sourced through suppliers
            compliant with the Kimberley Process and warranted conflict-free
            in accordance with the World Diamond Council System of
            Warranties. Lab-grown stones are sourced directly from growers we
            audit against the same standard of traceability.
          </p>
        </div>
        <div>
          <h2 className="font-display text-2xl">Certification</h2>
          <p className="mt-4 font-sans text-sm text-ink-muted">
            Natural stones are graded by GIA. Lab-grown stones are graded by
            IGI, with origin stated on the certificate as required by both
            labs. A certificate number accompanies every stone record and can
            be verified directly against the issuing lab.
          </p>
        </div>
      </section>
    </div>
  );
}
