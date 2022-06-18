import {
  addStudio,
  getStudio,
  getStudioAnimes,
  updateStudio,
  updateStudioLogo,
} from "@controllers/studio";
import { isLoggedIn, minPermission } from "@middlewares/auth";
import { checkStudio } from "@middlewares/studio";
import { uploadErrors } from "@middlewares/upload";
import { upload } from "@utils/upload";
import express from "express";

const router = express.Router({ mergeParams: true });

router.post(
  "/add",
  isLoggedIn,
  minPermission("MODERATOR"),
  upload.single("logoUrl"),
  uploadErrors,
  addStudio
);
router.patch(
  "/:studioId/logo",
  checkStudio,
  isLoggedIn,
  minPermission("MODERATOR"),
  upload.single("logoUrl"),
  uploadErrors,
  updateStudioLogo
);
router.patch(
  "/:studioId",
  isLoggedIn,
  minPermission("MODERATOR"),
  checkStudio,
  updateStudio
);
router.get("/:studioId/animes", checkStudio, getStudioAnimes);
router.get("/:studioId", checkStudio, getStudio);

export default router;
