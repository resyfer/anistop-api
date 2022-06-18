import {
  addCharacter,
  checkFavStatus,
  deleteCharacter,
  getCharacter,
  getCharactersByAnime,
  toggleFavChar,
  updateCharacter,
  updateCharacterImg,
} from "@controllers/character";
import { isLoggedIn, minPermission } from "@middlewares/auth";
import { characterCheck } from "@middlewares/character";
import express from "express";
import { upload } from "@utils/upload";
import { uploadErrors } from "@middlewares/upload";

const router = express.Router({ mergeParams: true });

router.post(
  "/add",
  isLoggedIn,
  minPermission("UPLOADER"),
  upload.single("imgUrl"),
  uploadErrors,
  addCharacter
);
router.get("/all", getCharactersByAnime);
router.get("/:characterId/fav", characterCheck, isLoggedIn, checkFavStatus);
router.patch("/:characterId/fav_toggle", characterCheck, toggleFavChar);
router.patch(
  "/:characterId/img",
  isLoggedIn,
  minPermission("UPLOADER"),
  characterCheck,
  upload.single("imgUrl"),
  uploadErrors,
  updateCharacterImg
);
router.get("/:characterId", characterCheck, getCharacter);
router.patch(
  "/:characterId",
  isLoggedIn,
  minPermission("UPLOADER"),
  characterCheck,
  upload.single("imgUrl"),
  uploadErrors,
  updateCharacter
);
router.delete(
  "/:characterId",
  isLoggedIn,
  minPermission("MODERATOR"),
  characterCheck,
  deleteCharacter
);

export default router;
