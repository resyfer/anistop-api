import { addVA, deleteVA, getVA, updateVA, updateVAImg } from "@controllers/va";
import { isLoggedIn, minPermission } from "@middlewares/auth";
import express from "express";

const router = express.Router();

router.post("/add", isLoggedIn, minPermission("UPLOADER"), addVA);
router.get("/:vaId", getVA);
router.patch("/:vaId", isLoggedIn, minPermission("UPLOADER"), updateVAImg);
router.patch("/:vaId", isLoggedIn, minPermission("MODERATOR"), updateVA);
router.delete("/:vaId", isLoggedIn, minPermission("MODERATOR"), deleteVA);

export default router;
