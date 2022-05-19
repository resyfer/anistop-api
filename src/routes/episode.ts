import {
  addEpisode,
  deleteEpisode,
  getEpisodeDetails,
  getEpisodeVideoUrl,
} from "@controllers/episode";
import { isLoggedIn, minPermission } from "@middlewares/auth";
import express from "express";

const router = express.Router({ mergeParams: true });

router.post("/add", isLoggedIn, minPermission("UPLOADER"), addEpisode);
router.get("/:episodeNumber/details", getEpisodeDetails);
router.get("/:episodeNumber/video", getEpisodeVideoUrl);
router.delete(
  "/:episodeNumber",
  isLoggedIn,
  minPermission("MODERATOR"),
  deleteEpisode
);

export default router;
