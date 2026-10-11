import type { Animal, Family } from "./types";
import { getAnimal, getAnimals } from "./data";

export type Line = [x1: number, y1: number, x2: number, y2: number];
export type PlacedAnimal = { animal: Animal; x: number; y: number };
export type Layout = {
  animals: PlacedAnimal[];
  lines: Line[];
  width: number;
  height: number;
};

type Measured = {
  couple: Animal[];
  kids: Measured[];
  kw: number;
  span: number;
};

export const W = 130;
export const H = 48;
export const PAD = 12;
const GAP = 24;
const UNIT_GAP = 30;
const LEVEL = 110;
const T = 2; // line thickness

const unitWidth = (n: Measured): number =>
  n.couple.length * W + (n.couple.length - 1) * GAP;

const spouseOf = (a: Animal): Animal | undefined =>
  a.marriedTo ? getAnimal(a.marriedTo) : undefined;

function measure(a: Animal): Measured {
  const s = spouseOf(a);
  const couple = s ? [a, s] : [a];
  const kids = getAnimals(a.children).map(measure);
  const kw =
    kids.reduce((sum, k) => sum + k.span, 0) +
    Math.max(0, kids.length - 1) * UNIT_GAP;
  const m: Measured = { couple, kids, kw, span: 0 };
  m.span = Math.max(unitWidth(m), kw);
  return m;
}

export function buildLayout(tree: Animal): Layout {
  const animals: PlacedAnimal[] = [];
  const lines: Line[] = [];
  let maxDepth = 0;

  // returns x center of couple[0], where parent line lands
  function place(n: Measured, left: number, depth: number): number {
    const cx = left + n.span / 2;
    const y = depth * LEVEL;
    const x0 = cx - unitWidth(n) / 2;
    maxDepth = Math.max(maxDepth, depth);

    n.couple.forEach((animal, i) =>
      animals.push({ animal, x: x0 + i * (W + GAP), y }),
    );

    // marriage line
    if (n.couple.length === 2) {
      lines.push([x0 + W, y + H / 2, x0 + W + GAP, y + H / 2]);
    }

    if (n.kids.length) {
      let cl = left + (n.span - n.kw) / 2;
      const xs: number[] = [];
      for (const k of n.kids) {
        xs.push(place(k, cl, depth + 1));
        cl += k.span + UNIT_GAP;
      }

      // married: start at marriage line midpoint. single: bottom of box.
      const startY = n.couple.length === 2 ? y + H / 2 : y + H;
      const busY = y + H + (LEVEL - H) / 2;

      lines.push([cx, startY, cx, busY]); // parents down
      lines.push([Math.min(...xs, cx), busY, Math.max(...xs, cx), busY]); // bus
      xs.forEach((x) => lines.push([x, busY, x, y + LEVEL])); // to each child box
    }

    return x0 + W / 2;
  }

  const root = measure(tree);
  place(root, 0, 0);

  return {
    animals,
    lines,
    width: root.span + PAD * 2,
    height: maxDepth * LEVEL + H + PAD * 2,
  };
}

export function lineStyle([x1, y1, x2, y2]: Line): string {
  const left = Math.min(x1, x2) + PAD - (x1 === x2 ? T / 2 : 0);
  const top = Math.min(y1, y2) + PAD - (y1 === y2 ? T / 2 : 0);
  const w = x1 === x2 ? T : Math.abs(x2 - x1);
  const h = y1 === y2 ? T : Math.abs(y2 - y1);
  return `left:${left}px; top:${top}px; width:${w}px; height:${h}px`;
}
