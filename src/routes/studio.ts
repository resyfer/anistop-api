import { addStudio, getStudio, getStudioAnimes } from "@controllers/studio";
import { isLoggedIn, minPermission } from "@middlewares/auth";
import express from "express";

const router = express.Router({ mergeParams: true });

router.post("/add", isLoggedIn, minPermission("MODERATOR"), addStudio);
router.get("/:studioId/animes", getStudioAnimes);
router.get("/:studioId", getStudio);

export default router;
