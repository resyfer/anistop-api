import { Request, Response, NextFunction } from "express";
import { serverError } from "@errors/system";
import { studioNotFound } from "@errors/studio";
import { prisma } from "@utils/prisma";

async function checkStudio(req: Request, res: Response, next: NextFunction) {
  try {
    const { studioId } = req.params;

    const id = parseInt(studioId);

    if (isNaN(id)) {
      return res.json(studioNotFound);
    }

    if ((await prisma.studio.count({ where: { id } })) === 0) {
      return res.json(studioNotFound);
    }

    return next();
  } catch (err) {
    console.log(err);
    return res.json(serverError);
  }
}

export { checkStudio };
