import {
  addAnime,
  deleteAnime,
  getAnime,
  updateAnime,
} from "@controllers/anime";
import { isLoggedIn, minPermission } from "@middlewares/auth";
import express from "express";

import seasonRouter from "@routes/season";
import characterRouter from "@routes/character";
import { checkAnime } from "@middlewares/anime";

const router = express.Router({ mergeParams: true });

router.post("/add", isLoggedIn, minPermission(), addAnime);

router.use("/:animeId/character", checkAnime, characterRouter);
router.use("/:animeId/season", checkAnime, seasonRouter);

router.get("/:animeId", checkAnime, getAnime);
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
