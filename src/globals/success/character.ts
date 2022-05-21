import { success } from "@success/success";

const characterCreated = success("Character created succcessfully.");
const characterDeleted = success("Character deleted successfully.");
const characterFavToggled = success("Character favorite status updated.");
const characterImgUpdated = success("Character image updated");

export {
  characterCreated,
  characterDeleted,
  characterFavToggled,
  characterImgUpdated,
};
