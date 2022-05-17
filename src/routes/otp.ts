import express from "express";
import { newOtp, verifyOtp } from "@controllers/otp";
import { isNotLoggedIn } from "@middlewares/auth";

const router = express.Router();

router.post("/verify", isNotLoggedIn, verifyOtp);
router.post("/new", isNotLoggedIn, newOtp);

export default router;
