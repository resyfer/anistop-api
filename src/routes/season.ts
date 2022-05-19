import {
  addSeason,
  deleteSeason,
  getSeason,
  getSeasonsByAnime,
  updateSeason,
} from "@controllers/season";
import { isLoggedIn, minPermission } from "@middlewares/auth";
import express from "express";

const router = express.Router({ mergeParams: true });

router.post("/add", isLoggedIn, minPermission("UPLOADER"), addSeason);
router.get("/all", getSeasonsByAnime);

router.get("/:seasonId", getSeason);
router.patch("/:seasonId", isLoggedIn, minPermission("UPLOADER"), updateSeason);
router.delete(
  "/:seasonId",
  isLoggedIn,
  minPermission("MODERATOR"),
  deleteSeason
);

export default router;
