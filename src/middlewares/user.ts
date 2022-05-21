import { unauthorizedAcccess, userNotFound } from "@errors/auth";
import { serverError } from "@errors/system";
import { User } from "@prisma/client";
import { prisma } from "@utils/prisma";
import { Request, Response, NextFunction } from "express";

async function checkUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { userId } = req.params;

    const id = parseInt(userId);

    if (isNaN(id)) {
      return res.json(userNotFound);
    }

    if ((await prisma.user.count({ where: { id } })) === 0) {
      return res.json(userNotFound);
    }

    return next();
  } catch (err) {
    console.log(err);
    return res.json(serverError);
  }
}

async function checkSelfUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { userId } = req.params;

    const id = parseInt(userId);

    if (isNaN(id)) {
      return res.json(userNotFound);
    }

    if (id !== (req.user as User).id) {
      return res.json(unauthorizedAcccess);
    }

    return next();
  } catch (err) {
    console.log(err);
    return res.json(serverError);
  }
}

export { checkUser, checkSelfUser };
