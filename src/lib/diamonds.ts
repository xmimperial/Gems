import { ShapeId, SHAPES } from "./shapes";

const SHAPE_CODES: Record<ShapeId, string> = Object.fromEntries(
  SHAPES.map((s) => [s.id, s.code])
) as Record<ShapeId, string>;

export type Origin = "natural" | "lab-grown";

export type ColorGrade = "D" | "E" | "F" | "G" | "H" | "I" | "J";
export type ClarityGrade = "FL" | "IF" | "VVS1" | "VVS2" | "VS1" | "VS2" | "SI1" | "SI2";
export type CutGrade = "Excellent" | "Very Good" | "Good";
export type Lab = "GIA" | "IGI";

export type Diamond = {
  sku: string;
  shape: ShapeId;
  origin: Origin;
  carat: number;
  color: ColorGrade;
  clarity: ClarityGrade;
  cut: CutGrade;
  lab: Lab;
  certificateNo: string;
  featured?: boolean;
};

const NATURAL_SKUS_SEED: Array<Omit<Diamond, "sku" | "origin">> = [
  { shape: "round", carat: 1.02, color: "D", clarity: "VVS1", cut: "Excellent", lab: "GIA", certificateNo: "2201884471", featured: true },
  { shape: "oval", carat: 1.51, color: "F", clarity: "VS1", cut: "Excellent", lab: "GIA", certificateNo: "2201884502" },
  { shape: "cushion", carat: 2.03, color: "G", clarity: "VS2", cut: "Very Good", lab: "GIA", certificateNo: "2201884539", featured: true },
  { shape: "emerald", carat: 1.80, color: "E", clarity: "VVS2", cut: "Excellent", lab: "GIA", certificateNo: "2201884561" },
  { shape: "pear", carat: 1.20, color: "F", clarity: "SI1", cut: "Very Good", lab: "GIA", certificateNo: "2201884588" },
  { shape: "marquise", carat: 1.35, color: "G", clarity: "VS1", cut: "Very Good", lab: "GIA", certificateNo: "2201884602" },
  { shape: "radiant", carat: 1.62, color: "H", clarity: "VS2", cut: "Excellent", lab: "GIA", certificateNo: "2201884629", featured: true },
  { shape: "asscher", carat: 2.15, color: "D", clarity: "VVS1", cut: "Excellent", lab: "GIA", certificateNo: "2201884657" },
  { shape: "heart", carat: 1.05, color: "F", clarity: "SI1", cut: "Good", lab: "GIA", certificateNo: "2201884684" },
  { shape: "trillion", carat: 0.98, color: "G", clarity: "VS2", cut: "Very Good", lab: "GIA", certificateNo: "2201884711" },
  { shape: "princess", carat: 1.44, color: "E", clarity: "VVS2", cut: "Excellent", lab: "GIA", certificateNo: "2201884738" },
  { shape: "round", carat: 3.02, color: "D", clarity: "IF", cut: "Excellent", lab: "GIA", certificateNo: "2201884765", featured: true },
  { shape: "oval", carat: 0.90, color: "H", clarity: "SI2", cut: "Very Good", lab: "GIA", certificateNo: "2201884792" },
  { shape: "cushion", carat: 1.28, color: "F", clarity: "VS1", cut: "Excellent", lab: "GIA", certificateNo: "2201884819" },
  { shape: "emerald", carat: 2.40, color: "G", clarity: "VS2", cut: "Very Good", lab: "GIA", certificateNo: "2201884846" },
  { shape: "round", carat: 0.71, color: "I", clarity: "SI1", cut: "Good", lab: "GIA", certificateNo: "2201884873" },
];

const LAB_GROWN_SKUS_SEED: Array<Omit<Diamond, "sku" | "origin">> = [
  { shape: "round", carat: 1.51, color: "E", clarity: "VVS1", cut: "Excellent", lab: "IGI", certificateNo: "LG514402291", featured: true },
  { shape: "oval", carat: 2.02, color: "F", clarity: "VS1", cut: "Excellent", lab: "IGI", certificateNo: "LG514402318" },
  { shape: "cushion", carat: 1.70, color: "G", clarity: "VS2", cut: "Very Good", lab: "IGI", certificateNo: "LG514402345" },
  { shape: "pear", carat: 1.35, color: "D", clarity: "VVS2", cut: "Excellent", lab: "IGI", certificateNo: "LG514402372", featured: true },
  { shape: "marquise", carat: 1.60, color: "F", clarity: "VS1", cut: "Very Good", lab: "IGI", certificateNo: "LG514402399" },
  { shape: "radiant", carat: 2.11, color: "G", clarity: "SI1", cut: "Excellent", lab: "IGI", certificateNo: "LG514402426" },
  { shape: "asscher", carat: 1.90, color: "E", clarity: "VS2", cut: "Excellent", lab: "IGI", certificateNo: "LG514402453" },
  { shape: "heart", carat: 1.15, color: "F", clarity: "VS1", cut: "Very Good", lab: "IGI", certificateNo: "LG514402480" },
  { shape: "trillion", carat: 1.08, color: "G", clarity: "SI1", cut: "Good", lab: "IGI", certificateNo: "LG514402507" },
  { shape: "princess", carat: 1.55, color: "D", clarity: "VVS1", cut: "Excellent", lab: "IGI", certificateNo: "LG514402534", featured: true },
  { shape: "emerald", carat: 2.60, color: "H", clarity: "VS2", cut: "Very Good", lab: "IGI", certificateNo: "LG514402561" },
  { shape: "round", carat: 4.01, color: "D", clarity: "IF", cut: "Excellent", lab: "IGI", certificateNo: "LG514402588", featured: true },
];

function serial(index: number, origin: Origin) {
  const base = origin === "natural" ? 10000 : 40000;
  return String(base + index * 37 + 234).padStart(5, "0");
}

function buildSet(seed: Array<Omit<Diamond, "sku" | "origin">>, origin: Origin): Diamond[] {
  return seed.map((entry, index) => {
    const shapeCode = SHAPE_CODES[entry.shape];
    const originCode = origin === "natural" ? "N" : "L";
    const sku = `ISG-${shapeCode}-${originCode}-${serial(index, origin)}`;
    return { ...entry, origin, sku };
  });
}

export const NATURAL_DIAMONDS: Diamond[] = buildSet(NATURAL_SKUS_SEED, "natural");
export const LAB_GROWN_DIAMONDS: Diamond[] = buildSet(LAB_GROWN_SKUS_SEED, "lab-grown");
export const ALL_DIAMONDS: Diamond[] = [...NATURAL_DIAMONDS, ...LAB_GROWN_DIAMONDS];

export function findBySku(sku: string): Diamond | undefined {
  return ALL_DIAMONDS.find((d) => d.sku === sku);
}

export const CARAT_BANDS = [
  { label: "Under 1.00", min: 0, max: 0.999 },
  { label: "1.00 – 1.49", min: 1.0, max: 1.499 },
  { label: "1.50 – 1.99", min: 1.5, max: 1.999 },
  { label: "2.00 – 2.99", min: 2.0, max: 2.999 },
  { label: "3.00 and above", min: 3.0, max: Infinity },
];

export const COLOR_GRADES: ColorGrade[] = ["D", "E", "F", "G", "H", "I", "J"];
export const CLARITY_GRADES: ClarityGrade[] = ["FL", "IF", "VVS1", "VVS2", "VS1", "VS2", "SI1", "SI2"];
export const CUT_GRADES: CutGrade[] = ["Excellent", "Very Good", "Good"];
export const LABS: Lab[] = ["GIA", "IGI"];
