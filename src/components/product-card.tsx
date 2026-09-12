import { Diamond } from "@/lib/diamonds";
import { getShape } from "@/lib/shapes";
import { ShapeIcon } from "./shape-icon";
import { EnquiryModal } from "./enquiry-modal";

export function ProductCard({ diamond }: { diamond: Diamond }) {
  const shape = getShape(diamond.shape);

  return (
    <article className="flex flex-col rounded-[22px] border border-hairline bg-porcelain p-6 transition-shadow hover:shadow-[0_8px_30px_rgba(23,24,27,0.06)]">
      <div className="flex items-center justify-center rounded-2xl bg-panel py-10">
        <ShapeIcon shape={shape} size={96} />
      </div>

      <div className="mt-5 flex items-baseline justify-between">
        <h3 className="font-display text-xl">{shape.name}</h3>
        <span className="font-sans text-sm text-ink-muted">{diamond.carat.toFixed(2)}ct</span>
      </div>

      <dl className="mt-3 grid grid-cols-3 gap-2 font-sans text-xs text-ink-muted">
        <div>
          <dt className="uppercase tracking-wide">Color</dt>
          <dd className="mt-0.5 text-sm text-ink">{diamond.color}</dd>
        </div>
        <div>
          <dt className="uppercase tracking-wide">Clarity</dt>
          <dd className="mt-0.5 text-sm text-ink">{diamond.clarity}</dd>
        </div>
        <div>
          <dt className="uppercase tracking-wide">Cut</dt>
          <dd className="mt-0.5 text-sm text-ink">{diamond.cut}</dd>
        </div>
      </dl>

      <p className="mt-3 font-sans text-xs text-ink-muted">
        {diamond.lab} certified · {diamond.origin === "natural" ? "Natural" : "Lab-grown"}
      </p>
      <p className="mt-1 font-sans text-xs text-ink-muted">{diamond.sku}</p>

      <div className="mt-5">
        <EnquiryModal diamond={diamond} />
      </div>
    </article>
  );
}
