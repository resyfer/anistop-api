import { addVA, deleteVA, getVA, updateVA, updateVAImg } from "@controllers/va";
import { isLoggedIn, minPermission } from "@middlewares/auth";
import { uploadErrors } from "@middlewares/upload";
import { checkVA } from "@middlewares/va";
import { upload } from "@utils/upload";
import express from "express";

const router = express.Router({ mergeParams: true });

router.post("/add", isLoggedIn, minPermission("UPLOADER"), addVA);
router.get("/:vaId", checkVA, getVA);
router.patch(
  "/:vaId/img",
  isLoggedIn,
  minPermission("UPLOADER"),
  checkVA,
  upload.single("imgUrl"),
  uploadErrors,
  updateVAImg
);
router.patch(
  "/:vaId",
  isLoggedIn,
  minPermission("UPLOADER"),
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
