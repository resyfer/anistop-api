import {
  addAnime,
  deleteAnime,
  getAnime,
  updateAnime,
} from "@controllers/anime";
import { isLoggedIn, minPermission } from "@middlewares/auth";
import express from "express";

const router = express.Router();

router.post("/add", isLoggedIn, minPermission(), addAnime);
router.get("/:animeId", getAnime);
router.patch("/:animeId", isLoggedIn, minPermission("MODERATOR"), updateAnime);
router.delete("/:animeId", isLoggedIn, minPermission("MODERATOR"), deleteAnime);

export default router;
