"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { JOURNEY_STAGES, stageForFrame, JOURNEY_TOTAL_FRAMES } from "@/lib/journey";
import { drawGemFrame } from "@/lib/gem-render";

function subscribeReducedMotion(callback: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(subscribeReducedMotion, getReducedMotionSnapshot, () => false);
}

export function HeroSequence() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lastFrameRef = useRef(-1);
  const [engaged, setEngaged] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const [activeStageIndex, setActiveStageIndex] = useState(0);

  // Only spin up ScrollTrigger once the hero is close to the viewport.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || engaged) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setEngaged(true);
          observer.disconnect();
        }
      },
      { rootMargin: "600px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [engaged]);

  function render(progress: number) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const frameIndex = Math.round(progress * JOURNEY_TOTAL_FRAMES);
    if (frameIndex === lastFrameRef.current) return;
    lastFrameRef.current = frameIndex;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const { width, height } = canvas.getBoundingClientRect();
    if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    drawGemFrame(ctx, width, height, progress);

    const stage = stageForFrame(frameIndex);
    const idx = JOURNEY_STAGES.findIndex((s) => s.key === stage.key);
    setActiveStageIndex((prev) => (prev === idx ? prev : idx));
  }

  useEffect(() => {
    if (reducedMotion) {
      render(1);
      return;
    }
    if (!engaged) return;

    let ctx: { revert: () => void } | undefined;
    let cancelled = false;

    import("gsap").then(async ({ default: gsap }) => {
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          onUpdate: (self) => render(self.progress),
        });
      });

      render(0);
    });

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [engaged, reducedMotion]);

  useEffect(() => {
    function onResize() {
      lastFrameRef.current = -1;
      render(0);
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const pinHeight = reducedMotion ? undefined : "600vh";
  const displayStageIndex = reducedMotion ? JOURNEY_STAGES.length - 1 : activeStageIndex;

  return (
    <div ref={sectionRef} style={{ height: pinHeight }} className="relative">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden bg-porcelain px-6">
        <div className="container-isg grid w-full items-center gap-10 md:grid-cols-2">
          <div className="relative order-2 flex aspect-square items-center justify-center rounded-[36px] bg-panel md:order-1">
            {!engaged && !reducedMotion && (
              <div className="absolute inset-6 animate-pulse rounded-[28px] bg-gradient-to-br from-hairline to-panel" />
            )}
            <canvas ref={canvasRef} className="h-[70%] w-[70%]" aria-hidden="true" />
          </div>

          <div className="order-1 md:order-2">
            <p className="font-sans text-xs uppercase tracking-wide text-ink-muted">
              The journey of the stone
            </p>
            <div className="relative mt-4 min-h-[10rem]">
              {JOURNEY_STAGES.map((stage, i) => (
                <div
                  key={stage.key}
                  className="absolute inset-0 transition-opacity duration-500"
                  style={{ opacity: i === displayStageIndex ? 1 : 0 }}
                  aria-hidden={i !== displayStageIndex}
                >
                  <h2 className="font-display text-3xl md:text-4xl">{stage.title}</h2>
                  <p className="mt-4 max-w-md font-sans text-base text-ink-muted">{stage.copy}</p>
                </div>
              ))}
            </div>
            {!reducedMotion && (
              <p className="mt-6 font-sans text-xs text-ink-muted">Scroll to follow the stone</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
