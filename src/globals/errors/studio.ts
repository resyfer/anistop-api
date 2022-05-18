import { error } from "@errors/error";

const studioExists = error("Studio Already exists");
const wrongStudioId = error("Incorrect Studio ID");
const studioNotFound = error("Studio not found.");

export { studioExists, wrongStudioId, studioNotFound };
