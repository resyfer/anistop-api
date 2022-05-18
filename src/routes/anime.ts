import { addAnime, updateAnime } from "@controllers/anime";
import { minPermission } from "@middlewares/auth";
import express from "express";

const router = express.Router();

router.post("/add", minPermission(), addAnime);
router.post("/update/:animeId", minPermission("MODERATOR"), updateAnime);

export default router;
