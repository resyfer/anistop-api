import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";
import cookieSession from "cookie-session";
import passport from "passport";

dotenv.config();

const app = express();

//-------------------------END OF IMPORTS------------------------

app
  .use(
    cors({
      origin: process.env.CLIENT as string,
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
      maxAge: 1000 * 60 * 60 * 24 * 30,
      keys: [process.env.SECRET as string],
    })
  )
  .use(passport.initialize())
  .use(passport.session());

//-------------------------END OF MIDDLEWARES------------------------

app.get("/", (_, res) => {
  res.json({ status: true });
});

//-------------------------END OF ROUTES------------------------

app.listen(process.env.PORT, () => {
  console.log(
    `Server running on port:${process.env.PORT} on mode:${process.env.NODE_ENV}`
  );
});
