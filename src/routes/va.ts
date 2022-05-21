import { addVA, deleteVA, getVA, updateVA, updateVAImg } from "@controllers/va";
import { isLoggedIn, minPermission } from "@middlewares/auth";
import { checkVA } from "@middlewares/va";
import express from "express";

const router = express.Router({ mergeParams: true });

router.post("/add", isLoggedIn, minPermission("UPLOADER"), addVA);
router.get("/:vaId", checkVA, getVA);
router.patch(
  "/:vaId",
  isLoggedIn,
  minPermission("UPLOADER"),
  checkVA,
  updateVAImg
);
router.patch(
  "/:vaId",
  isLoggedIn,
  minPermission("MODERATOR"),
  checkVA,
  updateVA
);
router.delete(
  "/:vaId",
  isLoggedIn,
  minPermission("MODERATOR"),
  checkVA,
  deleteVA
);

export default router;
