import {
  addEpisode,
  deleteEpisode,
  getAllEpisodes,
  getEpisodeDetails,
  getEpisodeVideoUrl,
  getEpisodeWatchDetails,
} from "@controllers/episode";
import { isLoggedIn, minPermission } from "@middlewares/auth";
import { checkEpisode } from "@middlewares/episode";
import { uploadErrors } from "@middlewares/upload";
import { upload } from "@utils/upload";
import express from "express";

const router = express.Router({ mergeParams: true });

router.post(
  "/add",
  isLoggedIn,
  minPermission("UPLOADER"),
  upload.single("videoUrl"),
  uploadErrors,
  addEpisode
);
router.get("/all", getAllEpisodes);
router.get("/watch_details", isLoggedIn, getEpisodeWatchDetails);
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
