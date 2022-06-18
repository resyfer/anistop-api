import { addAnimeSeason, getAnimeSeasonAnime } from "@controllers/animeSeason";
import { checkAnimeSeason } from "@middlewares/animeSeason";
import { isLoggedIn, minPermission } from "@middlewares/auth";
import express from "express";

const router = express.Router({ mergeParams: true });

router.post("/add", isLoggedIn, minPermission("UPLOADER"), addAnimeSeason);
router.get(
  "/:year/:season/anime",
  isLoggedIn,
  checkAnimeSeason,
  getAnimeSeasonAnime
);

export default router;
