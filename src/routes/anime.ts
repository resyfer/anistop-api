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

const router = express.Router({ mergeParams: true });

router.post("/add", isLoggedIn, minPermission(), addAnime);

router.use("/:animeId/character", characterRouter);
router.use("/:animeId/season", seasonRouter);

router.get("/:animeId", getAnime);
router.patch("/:animeId", isLoggedIn, minPermission("MODERATOR"), updateAnime);
router.delete("/:animeId", isLoggedIn, minPermission("MODERATOR"), deleteAnime);

export default router;
