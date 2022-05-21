import { error } from "@errors/error";

const episodeTypeIncorrect = error("Episode Type Incorrect");
const seasonTypeIncorrect = error("Season Type Incorrect.");
const seasonExists = error("Season Exists");
const seasonNotFound = error("Season Not Found");
const wrongSeasonId = error("Wrong Season ID");
const incorrectStatus = error("Incorrect Status");

export {
  episodeTypeIncorrect,
  seasonTypeIncorrect,
  seasonExists,
  seasonNotFound,
  wrongSeasonId,
  incorrectStatus,
};
