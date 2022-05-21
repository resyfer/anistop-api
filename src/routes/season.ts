import {
  addSeason,
  deleteSeason,
  getEpisodeViewStatus,
  getSeason,
  getSeasonsByAnime,
  updateSeason,
  updateRating,
} from "@controllers/season";
import { isLoggedIn, minPermission } from "@middlewares/auth";
import express from "express";

import episodeRouter from "@routes/episode";
import { checkSeason } from "@middlewares/season";

const router = express.Router({ mergeParams: true });

router.post("/add", isLoggedIn, minPermission("UPLOADER"), addSeason);
router.get("/all", getSeasonsByAnime);
router.use("/:seasonId/episode", checkSeason, episodeRouter);

router.patch("/:seasonId/rating", isLoggedIn, checkSeason, updateRating);
router.get("/:seasonId/status", isLoggedIn, checkSeason, getEpisodeViewStatus);
router.get("/:seasonId", getSeason);
router.patch(
  "/:seasonId",
  isLoggedIn,
  minPermission("UPLOADER"),
  checkSeason,
  updateSeason
);
router.delete(
  "/:seasonId",
  isLoggedIn,
  minPermission("MODERATOR"),
  checkSeason,
  deleteSeason
);

export default router;
