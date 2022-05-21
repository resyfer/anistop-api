import { serverError } from "@errors/system";
import { animeDeleted } from "@success/anime";
import { prisma } from "@utils/prisma";
import { Request, Response } from "express";

async function deleteAnime(req: Request, res: Response) {
  try {
    const { animeId } = req.params;

    const id = parseInt(animeId);

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
