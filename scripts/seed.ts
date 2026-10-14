import { family } from "../src/lib/data";

const q = (s?: string) =>
  s === undefined ? "NULL" : `'${s.replaceAll("'", "''")}'`;

const out: string[] = ["PRAGMA foreign_keys = ON;", "BEGIN;"];

for (const [id, a] of Object.entries(family)) {
  out.push(
    `INSERT INTO animal VALUES (${q(id)}, ${q(a.firstName)}, ${q(a.lastName)}, ${q(a.species)}, ${q(a.photo)}, ${q(a.about)});`,
  );
}

for (const [id, a] of Object.entries(family)) {
  if (a.marriedTo) {
    const [x, y] = [id, a.marriedTo.toLowerCase()].sort();
    out.push(`INSERT OR IGNORE INTO marriage VALUES (${q(x)}, ${q(y)});`);
  }
  for (const c of a.children ?? []) {
    out.push(
      `INSERT OR IGNORE INTO parent_child VALUES (${q(id)}, ${q(c.toLowerCase())});`,
    );
  }
}

out.push("COMMIT;");
console.log(out.join("\n"));
