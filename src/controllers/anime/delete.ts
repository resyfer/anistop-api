import { animeNotFound, wrongAnimeId } from "@errors/anime";
import { serverError } from "@errors/system";
import { animeDeleted } from "@success/anime";
import { prisma } from "@utils/prisma";
import { Request, Response } from "express";

async function deleteAnime(req: Request, res: Response) {
  try {
    const { animeId } = req.params;

    const id = parseInt(animeId);

    if (isNaN(id)) {
      return res.json(wrongAnimeId);
    }

    if ((await prisma.anime.count({ where: { id } })) === 0) {
      return res.json(animeNotFound);
    }

    await prisma.anime.delete({
      where: {
        id,
      },
    });

    return res.json(animeDeleted);
  } catch (err) {
    console.log(err);
    return res.json(serverError);
  }
}

export { deleteAnime };
