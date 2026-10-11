import type { Family, Animal } from "./types";

export const family: Family = {
  henning: {
    firstName: "Henning",
    lastName: "den Store",
    marriedTo: "olga",
    species: "Capybara",
    photo: "https://animalcorner.org/wp-content/uploads/2015/02/Capybara-2.png",
    about: "Den første af sin slægt.",
    children: ["helga", "henrik", "hans"],
  },

  olga: {
    firstName: "Olga",
    species: "Octopus",
    marriedTo: "henning",
    children: ["helga", "henrik", "hans"],
  },

  helga: {
    firstName: "Helga",
    lastName: "Henningsen",
    species: "Capybara",
    children: [],
  },

  henrik: {
    firstName: "Henrik",
    lastName: "Henningsen",
    species: "Capybara",
    marriedTo: "bea",
    children: ["tina", "alex", "hvalborg", "steve", "pingu", "navy"],
  },

  bea: {
    firstName: "Bea",
    species: "Turtle",
    marriedTo: "henrik",
    children: ["tina", "alex", "hvalborg", "steve", "pingu", "navy"],
  },

  tina: {
    firstName: "Tina",
    species: "Turtle",
    children: ["leonardo", "donatello", "raphael", "michelangelo"],
  },

  alex: {
    firstName: "Alex",
    species: "Axolotl",
    children: [],
  },

  hvalborg: {
    firstName: "Hvalborg",
    species: "Whale",
    children: [],
  },

  steve: {
    firstName: "Steve",
    species: "Stingray",
    children: [],
  },

  pingu: {
    firstName: "Pingu",
    species: "Penguin",
    children: ["skipper", "rico", "kowalski", "private"],
  },

  navy: {
    firstName: "Navy",
    species: "Seal",
    children: [],
  },

  raphael: {
    firstName: "Raphael",
    species: "Turtle",
    children: [],
  },

  donatello: {
    firstName: "Donatello",
    species: "Turtle",
    children: [],
  },

  michelangelo: {
    firstName: "Michelangelo",
    species: "Turtle",
    children: [],
  },

  leonardo: {
    firstName: "Leonardo",
    species: "Turtle",
    children: [],
  },

  kowalski: {
    firstName: "Kowalski",
    species: "Penguin",
    children: [],
  },

  rico: {
    firstName: "Rico",
    species: "Penguin",
    children: [],
  },

  skipper: {
    firstName: "Skipper",
    species: "Penguin",
    children: [],
  },

  private: {
    firstName: "Private",
    species: "Penguin",
    children: [],
  },

  hans: {
    firstName: "Hans",
    lastName: "Henningsen",
    marriedTo: "hanne",
    species: "Capybara",
    about: "Født med et skævt ben.",
    children: ["Johannes", "Johanne"],
  },

  hanne: {
    firstName: "Hanne",
    marriedTo: "hans",
    species: "Hippo",
    children: ["Johannes", "Johanne"],
  },

  johannes: { firstName: "Johannes", species: "Hippo", children: [] },

  johanne: { firstName: "Johanne", species: "Capybara", children: [] },
};

export function getAnimal(name: string | undefined) {
  for (const [id, animal] of Object.entries(family)) {
    if (id === name?.toLowerCase()) {
      return animal;
    }
  }
  throw new Error("No animal called " + name);
}

export function getAnimals(names: string[]) {
  return names.map(getAnimal);
}

export const rootId: string = "henning";
