# Imperial Star Gems

A multi-page storefront for loose natural and lab-grown diamonds. No checkout, no visible pricing anywhere — every stone ends in an enquiry (email, WhatsApp, or an in-page form).

Built with Next.js (App Router) + TypeScript + Tailwind v4, GSAP/ScrollTrigger for the scroll-scrubbed hero, and Framer Motion for smaller interactions.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Structure

- `src/app/` — routes: `/`, `/natural-diamonds`, `/lab-grown-diamonds`, `/shapes`, `/craftsmanship`, `/contact`, plus the `/api/enquiry` form handler.
- `src/components/` — `hero-sequence`, `shape-icon` / `shape-grid`, `catalog` (filter bar + grid), `product-card`, `enquiry-modal`, `enquiry-form`.
- `src/lib/` — `shapes.ts` (the 11 shape definitions and copy), `diamonds.ts` (mock catalog data — swap for a real data source), `journey.ts` (rough→polished narrative copy), `enquiry.ts` (mailto/WhatsApp link builders), `gem-render.ts` (the hero's canvas renderer).

## Things to swap before launch

- **Hero frames** — the brief specifies a 700-frame rough→polished photographic sequence. That footage doesn't exist yet, so `src/lib/gem-render.ts` draws the transformation procedurally on the same `<canvas>` contract (`drawGemFrame(ctx, width, height, progress)`). Once real frames are hosted on a CDN, replace its body with `ctx.drawImage(frames[frameIndex], 0, 0, w, h)` — the scroll/pin/reduced-motion logic in `hero-sequence.tsx` doesn't need to change.
- **WhatsApp number** — `WHATSAPP_BUSINESS_NUMBER` in `src/lib/enquiry.ts` is a placeholder.
- **Enquiry delivery** — `src/app/api/enquiry/route.ts` currently logs submissions to the server console. Wire it to a transactional email API (Resend/Postmark/SES) or a form backend before launch.
- **Catalog data** — `src/lib/diamonds.ts` is mock inventory. Replace with a real data source (CMS, sheet, or database) once available.
- **Product imagery** — stone cards currently show the wireframe shape glyph in place of photography/360° captures.

## Accessibility & performance notes

- All design tokens live in `src/app/globals.css`; muted text colors were checked against both page backgrounds for WCAG AA contrast.
- The hero respects `prefers-reduced-motion` (static final frame, no scroll-jacking) and only initializes GSAP once the section nears the viewport.
- No price appears anywhere in markup, including hidden fields — every stone flows to enquiry only.
