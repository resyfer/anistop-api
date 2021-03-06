import dotenv from "dotenv";
import cors from "cors";
import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";
import cookieSession from "cookie-session";
import passport from "passport";

import { COOKIE_MAX_AGE, ROOT } from "@globals/constants";
import { initializePassport } from "@utils/passport";
import { initializeMulter } from "@utils/upload";

dotenv.config();
initializePassport();
initializeMulter();

const app = express();

//------------------------- ROUTERS -------------------------

import authRouter from "@routes/auth";
import otpRouter from "@routes/otp";
import animeRouter from "@routes/anime";
import studioRouter from "@routes/studio";
import animeSeasonRouter from "@routes/animeSeason";
import vaRouter from "@routes/va";
import userRouter from "@routes/user";
import genreRouter from "@routes/genre";

//-------------------------END OF IMPORTS------------------------

app
  .use(
    cors({
      origin: process.env.CLIENT!,
      credentials: true,
    })
  )
  .use(helmet())
  .use(morgan(process.env.NODE_ENV === "development" ? "dev" : "short"))
  .use(cookieParser())
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(
    cookieSession({
      maxAge: COOKIE_MAX_AGE,
      keys: [process.env.SECRET!],
    })
  )
  .use(passport.initialize())
  .use(passport.session());

//-------------------------END OF MIDDLEWARES------------------------

app.use(`${ROOT}/auth`, authRouter);
app.use(`${ROOT}/otp`, otpRouter);
app.use(`${ROOT}/anime`, animeRouter);
app.use(`${ROOT}/studio`, studioRouter);
app.use(`${ROOT}/anime_season`, animeSeasonRouter);
app.use(`${ROOT}/va`, vaRouter);
app.use(`${ROOT}/user`, userRouter);
app.use(`${ROOT}/genre`, genreRouter);

//-------------------------END OF ROUTERS------------------------

app.get("/", (_: Request, res: Response) => {
  res.json({ status: true });
});

//-------------------------END OF ROUTES------------------------

app.listen(process.env.PORT, () => {
  console.log(
    `Server running on port:${process.env.PORT} on mode:${process.env.NODE_ENV}`
  );
});
