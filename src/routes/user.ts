import { getUser, updateUserImg } from "@controllers/user";
import { checkSelfUser, checkUser } from "@middlewares/user";
import { upload } from "@utils/uploaad";
import express from "express";

const router = express.Router();

router.post(
  "/:userId/img",
  checkSelfUser,
  upload.single("imgUrl"),
  updateUserImg
);
router.get("/:userId", checkUser, getUser);

export default router;
