import { error } from "@errors/error";

const characterExists = error("Character already exists.");
const characterNotFound = error("Character Not Found.");

export { characterExists, characterNotFound };
