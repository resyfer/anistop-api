import { getGenreAnime } from "@controllers/genre/get";
import { checkGenre } from "@middlewares/genre";
import express from "express";

const router = express.Router({ mergeParams: true });

router.get("/:genre/anime", checkGenre, getGenreAnime);

export default router;
