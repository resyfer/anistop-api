import { error } from "@errors/error";

const animeSeasonExists = error("Anime Season already exists.");
const animeSeasonNotFound = error("Anime Season not found");

const invalidYear = error("Invalid Year");
const invalidSeasonofYear = error("Invalid Season Of Year.");

export {
  animeSeasonExists,
  animeSeasonNotFound,
  invalidYear,
  invalidSeasonofYear,
};
