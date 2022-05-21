import {
  addEpisode,
  deleteEpisode,
  getEpisodeDetails,
  getEpisodeVideoUrl,
} from "@controllers/episode";
import { isLoggedIn, minPermission } from "@middlewares/auth";
import { checkEpisode } from "@middlewares/episode";
import express from "express";

const router = express.Router({ mergeParams: true });

router.post("/add", isLoggedIn, minPermission("UPLOADER"), addEpisode);
router.get("/:episodeNumber/details", checkEpisode, getEpisodeDetails);
router.get("/:episodeNumber/video", checkEpisode, getEpisodeVideoUrl);
router.delete(
  "/:episodeNumber",
  isLoggedIn,
  minPermission("MODERATOR"),
  checkEpisode,
  deleteEpisode
);

export default router;
