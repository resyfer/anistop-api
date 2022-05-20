import {
  addCharacter,
  deleteCharacter,
  getCharacter,
  getCharactersByAnime,
} from "@controllers/character";
import { isLoggedIn, minPermission } from "@middlewares/auth";
import express from "express";

const router = express.Router({ mergeParams: true });

router.post("/add", isLoggedIn, minPermission("UPLOADER"), addCharacter);
router.get("/all", getCharactersByAnime);
router.get("/:characterId", getCharacter);
router.delete(
  "/:characterId",
  isLoggedIn,
  minPermission("MODERATOR"),
  deleteCharacter
);

export default router;
