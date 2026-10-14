import { fail } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import type { Animal } from "#lib/types.ts";
import { addAnimal, listAnimals } from "#lib/server/db.ts";

export const load: PageServerLoad = () => ({ animals: listAnimals() });

export const actions = {
  addAnimal: async ({ request }) => {
    const data = await request.formData();

    // empty string -> undefined
    const str = (key: string): string | undefined => {
      const v = data.get(key);
      return typeof v === "string" && v.trim() ? v.trim() : undefined;
    };

    const firstName = str("firstName");
    const species = str("species");
    if (!firstName) return fail(400, { error: "First name is required" });
    if (!species) return fail(400, { error: "Species is required" });

    const parentIds = [
      ...new Set(
        [str("parent1"), str("parent2")].filter((p): p is string => !!p),
      ),
    ];

    const animal: Animal = {
      firstName,
      lastName: str("lastName"),
      species,
      marriedTo: str("marriedTo"),
      children: [],
      photo: str("photo"),
      about: str("about"),
    };

    try {
      return { success: true, id: addAnimal(animal, parentIds) };
    } catch (e) {
      const code = (e as { code?: string }).code;
      if (code === "SQLITE_CONSTRAINT_PRIMARYKEY") {
        return fail(409, { error: `"${firstName}" already exists` });
      }
      if (code === "SQLITE_CONSTRAINT_FOREIGNKEY") {
        return fail(400, { error: "Spouse or child id does not exist" });
      }
      if (e instanceof Error && e.message.startsWith("First name")) {
        return fail(400, { error: e.message });
      }
      throw e;
    }
  },
} satisfies Actions;
