import { addSeason } from "@controllers/season";
import { isLoggedIn, minPermission } from "@middlewares/auth";
import express from "express";

const router = express.Router();

router.post("/:animeId/add", isLoggedIn, minPermission("UPLOADER"), addSeason);

export default router;
