import {
  addAnime,
  deleteAnime,
  getAnime,
  updateAnime,
  updateAnimePosterUrl,
  updateAnimeBackgroundUrl,
} from "@controllers/anime";
import { isLoggedIn, minPermission } from "@middlewares/auth";
import express from "express";

import seasonRouter from "@routes/season";
import characterRouter from "@routes/character";
import { checkAnime } from "@middlewares/anime";
import { upload } from "@utils/upload";
import { uploadErrors } from "@middlewares/upload";

const router = express.Router({ mergeParams: true });

router.post(
  "/add",
  isLoggedIn,
  minPermission(),
  upload.fields([
    { name: "posterUrl", maxCount: 1 },
    { name: "backgroundImgUrl", maxCount: 1 },
  ]),
  uploadErrors,
  addAnime
);

router.use("/:animeId/character", checkAnime, characterRouter);
router.use("/:animeId/season", checkAnime, seasonRouter);

router.get("/:animeId", checkAnime, getAnime);
router.patch(
  "/:animeId/poster",
  isLoggedIn,
  minPermission("MODERATOR"),
  checkAnime,
  upload.single("posterUrl"),
  uploadErrors,
  updateAnimePosterUrl
);
router.patch(
  "/:animeId/background",
  isLoggedIn,
  minPermission("MODERATOR"),
  checkAnime,
  upload.single("backgroundImgUrl"),
  uploadErrors,
  updateAnimeBackgroundUrl
);
router.patch(
  "/:animeId",
  isLoggedIn,
  minPermission("MODERATOR"),
  checkAnime,
  updateAnime
);
router.delete(
  "/:animeId",
  isLoggedIn,
  minPermission("MODERATOR"),
  checkAnime,
  deleteAnime
);

export default router;
