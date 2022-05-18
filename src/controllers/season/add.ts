import { animeNotFound, wrongAnimeId } from "@errors/anime";
import { serverError } from "@errors/system";
import { prisma } from "@utils/prisma";
import { Request, Response } from "express";

async function addSeason(req: Request, res: Response) {
  try {
    const { animeId } = req.params;
    // const {} = req.body;

    const id = parseInt(animeId);

    if (isNaN(id)) {
      return res.json(wrongAnimeId);
    }

    if ((await prisma.anime.count({ where: { id } })) === 0) {
      return res.json(animeNotFound);
    }

    return "TODO: Add season";
  } catch (err) {
    console.log(err);
    return res.json(serverError);
  }
}

export { addSeason };
