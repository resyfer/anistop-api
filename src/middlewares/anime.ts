import { animeNotFound } from "@errors/anime";
import { serverError } from "@errors/system";
import { prisma } from "@utils/prisma";
import { NextFunction, Request, Response } from "express";

async function checkAnime(req: Request, res: Response, next: NextFunction) {
  try {
    const { animeId } = req.params;

    const id = parseInt(animeId);

    if (isNaN(id)) {
      return res.json(animeNotFound);
    }

    if ((await prisma.anime.count({ where: { id } })) === 0) {
      return res.json(animeNotFound);
    }

    return next();
  } catch (err) {
    console.log(err);
    return res.json(serverError);
  }
}

export { checkAnime };
