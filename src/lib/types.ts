export type Animal = {
  firstName: string;
  lastName?: string;
  marriedTo?: string;
  species: string;
  children: string[];
  photo?: string;
  about?: string;
};

export type Family = Record<string, Animal>;

export const fullName = (a: Animal): string =>
  a.lastName !== undefined ? `${a.firstName} ${a.lastName}` : a.firstName;
