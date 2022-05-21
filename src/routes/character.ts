import {
  addCharacter,
  deleteCharacter,
  getCharacter,
  getCharactersByAnime,
  toggleFavChar,
  updateCharacterImg,
} from "@controllers/character";
import { isLoggedIn, minPermission } from "@middlewares/auth";
import { characterCheck } from "@middlewares/character";
import express from "express";
import { upload } from "@utils/upload";
import { uploadErrors } from "@middlewares/upload";

const router = express.Router({ mergeParams: true });

router.post("/add", isLoggedIn, minPermission("UPLOADER"), addCharacter);
router.get("/all", getCharactersByAnime);
router.patch("/:characterId/fav_toggle", characterCheck, toggleFavChar);
router.patch(
  "/:characterId/img",
  isLoggedIn,
  minPermission("UPLOADER"),
  characterCheck,
  upload.single("posterUrl"),
  uploadErrors,
  updateCharacterImg
);
router.get("/:characterId", characterCheck, getCharacter);
router.delete(
  "/:characterId",
  isLoggedIn,
  minPermission("MODERATOR"),
  characterCheck,
  deleteCharacter
);

export default router;
