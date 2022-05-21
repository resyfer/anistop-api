import { animeExists } from "@errors/anime";
import { serverError } from "@errors/system";
import { addAnimeBody } from "@interfaces/anime";
import { animeCreated } from "@success/anime";
import { defaultProfilePic } from "@utils/img";
import { prisma } from "@utils/prisma";
import { Request, Response } from "express";

async function addAnime(req: Request, res: Response) {
  try {
    const {
      englishName,
      japaneseName,
      description,
      genres,
      country,
      keywords,
    } = req.body as addAnimeBody;

    // Check anime exists
    if ((await prisma.anime.count({ where: { englishName } })) !== 0) {
      return res.json(animeExists);
    }

    if ((await prisma.anime.count({ where: { japaneseName } })) !== 0) {
      return res.json(animeExists);
    }

    // New anime
    await prisma.anime.create({
      data: {
        englishName,
        japaneseName,
        description,
        genres,
        country,
        keywords,
        posterUrl: defaultProfilePic(englishName),
        backgroundImgUrl: defaultProfilePic(englishName),
      },
    });

    return res.json(animeCreated);
  } catch (err) {
    console.log(err);
    return res.json(serverError);
  }
}

export { addAnime };
