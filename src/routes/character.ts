import {
  addCharacter,
  deleteCharacter,
  getCharacter,
  getCharactersByAnime,
  toggleFavChar,
} from "@controllers/character";
import { isLoggedIn, minPermission } from "@middlewares/auth";
import { characterCheck } from "@middlewares/character";
import express from "express";

const router = express.Router({ mergeParams: true });

router.post("/add", isLoggedIn, minPermission("UPLOADER"), addCharacter);
router.get("/all", getCharactersByAnime);
router.patch("/:characterId/fav_toggle", characterCheck, toggleFavChar);
router.get("/:characterId", characterCheck, getCharacter);
router.delete(
  "/:characterId",
  isLoggedIn,
  minPermission("MODERATOR"),
  characterCheck,
  deleteCharacter
);

export default router;
