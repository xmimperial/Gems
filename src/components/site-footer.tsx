import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-hairline bg-panel">
      <div className="container-isg grid gap-10 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-display text-lg">Imperial Star Gems</p>
          <p className="mt-3 max-w-sm font-sans text-sm text-ink-muted">
            Loose natural and lab-grown diamonds, graded and sold on their own
            merits. No mounts, no markups hidden in a setting — an enquiry
            begins every conversation.
          </p>
        </div>

        <div>
          <p className="font-sans text-sm font-medium text-ink">Catalog</p>
          <ul className="mt-4 space-y-2 font-sans text-sm text-ink-muted">
            <li><Link className="focus-ring hover:text-ink" href="/natural-diamonds">Natural diamonds</Link></li>
            <li><Link className="focus-ring hover:text-ink" href="/lab-grown-diamonds">Lab-grown diamonds</Link></li>
            <li><Link className="focus-ring hover:text-ink" href="/shapes">Shape gallery</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-sans text-sm font-medium text-ink">Studio</p>
          <ul className="mt-4 space-y-2 font-sans text-sm text-ink-muted">
            <li><Link className="focus-ring hover:text-ink" href="/craftsmanship">Craftsmanship</Link></li>
            <li><Link className="focus-ring hover:text-ink" href="/contact">Contact</Link></li>
            <li>
              <a className="focus-ring hover:text-ink" href="mailto:sales@imperialstargems.com">
                sales@imperialstargems.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container-isg flex flex-col gap-2 border-t border-hairline py-6 font-sans text-xs text-ink-muted md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} Imperial Star Gems. All stones independently graded.</p>
        <p>GIA and IGI certification referenced on individual stone records.</p>
      </div>
    </footer>
  );
}
