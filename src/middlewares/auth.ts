import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { error } from "@errors/error";
import { userAlreadyLoggedIn, userNotLoggedIn } from "@errors/auth";

/**
 * @description Catch the errors of passport
 * on login and send them as JSON
 */
const loginErrors: ErrorRequestHandler = async (err, _, res, next) => {
  if (err) {
    res.json(error(err));
  } else {
    next();
  }
};

/**
 * @description Checks if user is logged in
 */
function isLoggedIn(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.json(userNotLoggedIn);
  }
}

function isNotLoggedIn(req: Request, res: Response, next: NextFunction) {
  if (!req.isAuthenticated()) {
    next();
  } else {
    res.json(userAlreadyLoggedIn);
  }
}

export { loginErrors, isLoggedIn, isNotLoggedIn };
