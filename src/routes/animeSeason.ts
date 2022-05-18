import { addAnimeSeason } from "@controllers/animeSeason";
import { isLoggedIn, minPermission } from "@middlewares/auth";
import express from "express";

const router = express.Router();

router.post("/add", isLoggedIn, minPermission("UPLOADER"), addAnimeSeason);

export default router;
