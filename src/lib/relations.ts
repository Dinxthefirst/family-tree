import type { Animal, Family } from "./types";
import { getAnimals } from "./data.ts";

export type Relations = {
  parentsOf: Map<Animal, Animal[]>;
  siblingsOf: Map<Animal, Animal[]>;
};

export function buildRelations(family: Family): Relations {
  const animals = Object.values(family);

  const pairs = animals.flatMap((parent) =>
    getAnimals(parent.children).map((child) => [child, parent] as const),
  );

  const parentsOf = pairs.reduce(
    (m, [child, parent]) => m.set(child, [...(m.get(child) ?? []), parent]),
    new Map<Animal, Animal[]>(),
  );

  const siblingsOf = new Map(
    animals.map((animal) => [
      animal,
      [
        ...new Set(
          (parentsOf.get(animal) ?? []).flatMap((p) => getAnimals(p.children)),
        ),
      ].filter((c) => c != animal),
    ]),
  );

  return { parentsOf, siblingsOf };
}
