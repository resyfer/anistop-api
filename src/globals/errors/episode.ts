import { error } from "@errors/error";

const episodeExists = error("Episode Already Exists");
const episodeNotFound = error("Episode Not Found.");

export { episodeExists, episodeNotFound };
