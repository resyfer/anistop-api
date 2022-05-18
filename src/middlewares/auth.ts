import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { error } from "@errors/error";
import {
  unauthorizedAcccess,
  userAlreadyLoggedIn,
  userNotLoggedIn,
} from "@errors/auth";
import { Role, User } from "@prisma/client";
import { levelIndex } from "@utils/levelIndex";

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

/**
 * @description Middleware for checking if user
 * has clearance to access a route.
 *
 * Usage is:
 *
 * ```ts
 *  router.use(minPermission());
 * ```
 *
 * or,
 *
 * ```ts
 *  router.use(minPermission("OWNER"));
 * ```
 *
 * @param level
 *
 */
function minPermission(level: Role = "UPLOADER") {
  return (req: Request, res: Response, next: NextFunction) => {
    const roleIndex = levelIndex((req.user as User).role);
    if (roleIndex < levelIndex(level)) {
      return res.json(unauthorizedAcccess);
    } else {
      return next();
    }
  };
}

export { loginErrors, isLoggedIn, isNotLoggedIn, minPermission };
