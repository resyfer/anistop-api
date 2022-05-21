import { getUser, updateUserImg } from "@controllers/user";
import { uploadErrors } from "@middlewares/upload";
import { checkSelfUser, checkUser } from "@middlewares/user";
import { upload } from "@utils/upload";
import express from "express";

const router = express.Router();

router.post(
  "/:userId/img",
  checkSelfUser,
  upload.single("imgUrl"),
  uploadErrors,
  updateUserImg
);
router.get("/:userId", checkUser, getUser);

export default router;
