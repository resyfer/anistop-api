import express from "express";
import passport from "passport";
import { loginErrors, isLoggedIn, isNotLoggedIn } from "@middlewares/auth";
import { elevate, login, signout, signup } from "@controllers/auth";

const router = express.Router({ mergeParams: true });

router.post(
  "/login",
  isNotLoggedIn,
  passport.authenticate("local", { failWithError: true }),
  loginErrors,
  login
);
router.post("/signup", isNotLoggedIn, signup);
router.post("/signout", isLoggedIn, signout);
router.post("/elevate", isLoggedIn, elevate);

export default router;
