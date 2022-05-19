import { error } from "@errors/error";

const animeSeasonExists = error("Anime Season already exists.");
const animeSeasonNotFound = error("Anime Season not found");
const episodeTypeIncorrect = error("Episode Type Incorrect");
const seasonTypeIncorrect = error("Season Type Incorrect.");

export {
  animeSeasonExists,
  animeSeasonNotFound,
  episodeTypeIncorrect,
  seasonTypeIncorrect,
};
