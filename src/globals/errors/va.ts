import { error } from "@errors/error";

const vaExists = error("VA Already exists.");
const vaNotFound = error("VA Not Found.");

export { vaExists, vaNotFound };
