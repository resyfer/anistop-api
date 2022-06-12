import { getUser, updateUserImg, getSelf } from "@controllers/user";
import { uploadErrors } from "@middlewares/upload";
import { isLoggedIn } from "@middlewares/auth";
import { checkSelfUser, checkUser } from "@middlewares/user";
import { upload } from "@utils/upload";
import express from "express";

const router = express.Router();

router.get("/", isLoggedIn, getSelf);

router.post(
  "/:userId/img",
  checkSelfUser,
  upload.single("imgUrl"),
  uploadErrors,
  updateUserImg
);
router.get("/:userId", checkUser, getUser);

export default router;
