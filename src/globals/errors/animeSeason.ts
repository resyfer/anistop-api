import { error } from "@errors/error";

const animeSeasonExists = error("Anime Season already exists.");
const animeSeasonNotFound = error("Anime Season not found");

export { animeSeasonExists, animeSeasonNotFound };
