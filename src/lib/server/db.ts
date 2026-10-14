import type { Animal } from "#lib/types.ts";
import Database from "better-sqlite3";

const db = new Database("db/family.db");
db.pragma("foreign_keys = ON");

export const toId = (name: string): string =>
  name.toLowerCase().replace(/[^a-z0-9]/g, "");

export type AnimalOption = { id: string; name: string };

export function listAnimals(): AnimalOption[] {
  return db
    .prepare(
      `SELECT id, first_name || COALESCE(' ' || last_name, '') AS name
       FROM animal ORDER BY first_name`,
    )
    .all() as AnimalOption[];
}

export function addAnimal(animal: Animal, parentIds: string[] = []): string {
  const id = toId(animal.firstName);
  if (!id) throw new Error("First name needs at least one letter or digit");

  const insert = db.transaction(() => {
    db.prepare(
      `INSERT INTO animal (id, first_name, last_name, species, photo, about)
       VALUES (?, ?, ?, ?, ?, ?)`,
    ).run(
      id,
      animal.firstName,
      animal.lastName ?? null,
      animal.species,
      animal.photo ?? null,
      animal.about ?? null,
    );

    if (animal.marriedTo) {
      const [a, b] = [id, toId(animal.marriedTo)].sort();
      db.prepare(`INSERT OR IGNORE INTO marriage (a, b) VALUES (?, ?)`).run(
        a,
        b,
      );
    }

    const link = db.prepare(
      `INSERT OR IGNORE INTO parent_child (parent_id, child_id) VALUES (?, ?)`,
    );
    for (const child of animal.children) link.run(id, toId(child)); // new animal as parent
    for (const parent of parentIds) link.run(parent, id); // new animal as child
  });

  insert();
  return id;
}
