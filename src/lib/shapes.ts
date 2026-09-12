export type ShapeId =
  | "round"
  | "princess"
  | "cushion"
  | "emerald"
  | "oval"
  | "pear"
  | "marquise"
  | "radiant"
  | "asscher"
  | "heart"
  | "trillion";

export type ShapeDef = {
  id: ShapeId;
  name: string;
  /** SKU code, e.g. ISG-RD-N-10234 */
  code: string;
  /** Outline path/shape drawn in a 0 0 100 100 viewBox. */
  outline:
    | { kind: "path"; d: string }
    | { kind: "circle"; cx: number; cy: number; r: number }
    | { kind: "ellipse"; cx: number; cy: number; rx: number; ry: number }
    | { kind: "rect"; x: number; y: number; width: number; height: number; rx: number };
  /** One or two lines of original write-up copy for the /shapes gallery. */
  blurb: string;
};

export const SHAPES: ShapeDef[] = [
  {
    id: "round",
    name: "Round",
    code: "RD",
    outline: { kind: "circle", cx: 50, cy: 50, r: 38 },
    blurb:
      "The brilliant round returns more light per carat than any other cut, its facets arranged for maximum fire under both daylight and spot lighting.",
  },
  {
    id: "princess",
    name: "Princess",
    code: "PR",
    outline: { kind: "path", d: "M14 14 H86 V86 H14 Z" },
    blurb:
      "A squared outline with crisp, unbroken corners. Princess-cut stones retain more of the rough during planning, favoring yield without a loss of brilliance.",
  },
  {
    id: "cushion",
    name: "Cushion",
    code: "CU",
    outline: { kind: "rect", x: 15, y: 15, width: 70, height: 70, rx: 24 },
    blurb:
      "Softened corners over a square or rectangular base. The cushion reads warmer than a round of the same grade, with broader, more open facets.",
  },
  {
    id: "emerald",
    name: "Emerald",
    code: "EM",
    outline: {
      kind: "path",
      d: "M36 10 H64 L80 26 V74 L64 90 H36 L20 74 V26 Z",
    },
    blurb:
      "Long step facets run parallel to the girdle, producing a hall-of-mirrors effect rather than scattered fire. Clarity matters more here than in any other shape.",
  },
  {
    id: "oval",
    name: "Oval",
    code: "OV",
    outline: { kind: "ellipse", cx: 50, cy: 50, rx: 32, ry: 44 },
    blurb:
      "An elongated brilliant that flatters the hand and finger alike, with a face-up area larger than a round of equivalent carat weight.",
  },
  {
    id: "pear",
    name: "Pear",
    code: "PE",
    outline: {
      kind: "path",
      d: "M50 91 Q19 69 17 40 Q17 11 50 11 Q83 11 83 40 Q81 69 50 91 Z",
    },
    blurb:
      "One rounded end, one point, a single line of symmetry between them. Precision at the point is the mark of a well-cut pear.",
  },
  {
    id: "marquise",
    name: "Marquise",
    code: "MQ",
    outline: {
      kind: "path",
      d: "M50 6 Q80 34 80 50 Q80 66 50 94 Q20 66 20 50 Q20 34 50 6 Z",
    },
    blurb:
      "Two points, maximum length. The marquise carries the largest visual footprint per carat of any standard shape.",
  },
  {
    id: "radiant",
    name: "Radiant",
    code: "RA",
    outline: {
      kind: "path",
      d: "M30 18 H70 L86 34 V66 L70 82 H30 L14 66 V34 Z",
    },
    blurb:
      "A brilliant-cut facet pattern fitted to a cropped-corner rectangle, combining the fire of a round with the outline of a step cut.",
  },
  {
    id: "asscher",
    name: "Asscher",
    code: "AS",
    outline: {
      kind: "path",
      d: "M33 16 H67 L84 33 V67 L67 84 H33 L16 67 V33 Z",
    },
    blurb:
      "A square step cut with deep, wide facets and cut corners. Asscher stones favor clarity and depth over scattered sparkle.",
  },
  {
    id: "heart",
    name: "Heart",
    code: "HE",
    outline: {
      kind: "path",
      d: "M50 89 C19 65 7 44 7 29 C7 14 21 5 34 5 C44 5 50 12 50 21 C50 12 56 5 66 5 C79 5 93 14 93 29 C93 44 81 65 50 89 Z",
    },
    blurb:
      "The most exacting outline to cut symmetrically. A well-formed cleft and even lobes are what separate a fine heart from an ordinary one.",
  },
  {
    id: "trillion",
    name: "Trillion",
    code: "TR",
    outline: {
      kind: "path",
      d: "M50 7 Q76 30 91 80 Q50 96 9 80 Q24 30 50 7 Z",
    },
    blurb:
      "A triangular brilliant with gently convex sides, most often set to accent a center stone but equally striking cut for its own sake.",
  },
];

export function getShape(id: ShapeId): ShapeDef {
  const shape = SHAPES.find((s) => s.id === id);
  if (!shape) throw new Error(`Unknown shape: ${id}`);
  return shape;
}
