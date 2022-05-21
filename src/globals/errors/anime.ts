import { error } from "@errors/error";

const animeExists = error("Anime already exists.");
const animeNotFound = error("Anime not found.");
const wrongAnimeId = error("Anime ID incorrect");

export { animeExists, animeNotFound, wrongAnimeId };
