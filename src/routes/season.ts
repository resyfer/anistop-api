import {
  addSeason,
  deleteSeason,
  getEpisodeViewStatus,
  getSeason,
  getSeasonsByAnime,
  updateSeason,
} from "@controllers/season";
import { isLoggedIn, minPermission } from "@middlewares/auth";
import express from "express";

import episodeRouter from "@routes/episode";

const router = express.Router({ mergeParams: true });

router.post("/add", isLoggedIn, minPermission("UPLOADER"), addSeason);
router.get("/all", getSeasonsByAnime);
router.get("/:seasonId/status", isLoggedIn, getEpisodeViewStatus);

router.use("/:seasonId/episode", episodeRouter);

router.get("/:seasonId", getSeason);
router.patch("/:seasonId", isLoggedIn, minPermission("UPLOADER"), updateSeason);
router.delete(
  "/:seasonId",
  isLoggedIn,
  minPermission("MODERATOR"),
  deleteSeason
);

export default router;
