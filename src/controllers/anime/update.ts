import { animeNotFound, wrongAnimeId } from "@errors/anime";
import { serverError } from "@errors/system";
import { updateAnimeBody } from "@interfaces/anime";
import { animeUpdated } from "@success/anime";
import { prisma } from "@utils/prisma";
import { Request, Response } from "express";

async function updateAnime(req: Request, res: Response) {
  try {
    const { animeId } = req.params;
    const {
      description,
      genres,
      keywords,
      country,
      posterUrl,
      backgroundImgUrl,
      status,
    } = req.body as updateAnimeBody;

    const id = parseInt(animeId);

    if (isNaN(id)) {
      return res.json(wrongAnimeId);
    }

    if ((await prisma.anime.count({ where: { id } })) === 0) {
      return res.json(animeNotFound);
    }

    await prisma.anime.update({
      where: {
        id,
      },
      data: {
        description,
        genres,
        keywords,
        country,
        posterUrl,
        backgroundImgUrl,
        status,
      },
    });

    return res.json(animeUpdated);
  } catch (err) {
    console.log(err);
    return res.json(serverError);
  }
}

export { updateAnime };
