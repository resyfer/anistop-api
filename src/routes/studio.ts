import { addStudio, getStudio, getStudioAnimes } from "@controllers/studio";
import { isLoggedIn, minPermission } from "@middlewares/auth";
import { checkStudio } from "@middlewares/studio";
import express from "express";

const router = express.Router({ mergeParams: true });

router.post("/add", isLoggedIn, minPermission("MODERATOR"), addStudio);
router.get("/:studioId/animes", checkStudio, getStudioAnimes);
router.get("/:studioId", checkStudio, getStudio);

export default router;
