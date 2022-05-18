import { error } from "@errors/error";

const animeExists = error("Anime already exists.");
const wrongAnimeId = error("Anime ID incorrect");

export { animeExists, wrongAnimeId };
