export type JourneyStage = {
  key: "rough" | "planning" | "sawing" | "faceting" | "finished";
  title: string;
  copy: string;
  /** Inclusive frame range out of a nominal 700-frame sequence (0–699). */
  frameFrom: number;
  frameTo: number;
};

export const JOURNEY_STAGES: JourneyStage[] = [
  {
    key: "rough",
    title: "Rough",
    copy: "Every stone begins as mined material — dense, opaque, its potential unreadable from the outside.",
    frameFrom: 0,
    frameTo: 140,
  },
  {
    key: "planning",
    title: "Planning",
    copy: "A planner studies inclusions and crystal structure, mapping the cut that returns the most yield and the most light.",
    frameFrom: 140,
    frameTo: 280,
  },
  {
    key: "sawing",
    title: "Sawing",
    copy: "The first cut follows the plan exactly. It cannot be undone, so it is made once, and made with certainty.",
    frameFrom: 280,
    frameTo: 420,
  },
  {
    key: "faceting",
    title: "Faceting & polishing",
    copy: "Facets are placed and refined to microns, angle by angle, until light entering the crown returns through the table.",
    frameFrom: 420,
    frameTo: 600,
  },
  {
    key: "finished",
    title: "Finished brilliance",
    copy: "The completed stone is graded independently before it ever reaches our catalog.",
    frameFrom: 600,
    frameTo: 699,
  },
];

export const JOURNEY_TOTAL_FRAMES = 699;

export function stageForFrame(frameIndex: number): JourneyStage {
  return (
    JOURNEY_STAGES.find((s) => frameIndex >= s.frameFrom && frameIndex <= s.frameTo) ??
    JOURNEY_STAGES[JOURNEY_STAGES.length - 1]
  );
}
