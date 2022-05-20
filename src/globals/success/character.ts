import { success } from "@success/success";

const characterCreated = success("Character created succcessfully.");
const characterDeleted = success("Character deleted successfully.");
const characterFavToggled = success("Character favorite status updated.");

export { characterCreated, characterDeleted, characterFavToggled };
