import { animeExists } from "@errors/anime";
import { serverError } from "@errors/system";
import { updateAnimeBody } from "@interfaces/anime";
import {
  animeBackgroundUpdated,
  animePosterUpdated,
  animeUpdated,
} from "@success/anime";
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
      englishName,
      japaneseName,
    } = req.body as updateAnimeBody;

    const id = parseInt(animeId);

    // Check anime
    if (
      (await prisma.anime.count({
        where: {
          OR: [
            {
              englishName,
            },
            {
              japaneseName,
            },
          ],
          NOT: {
            id,
          },
        },
      })) !== 0
    ) {
      return res.json(animeExists);
    }

    // TODO: Check genres

    // TODO: Check country

    await prisma.anime.update({
      where: {
        id,
      },
      data: {
        description,
        genres,
        keywords,
        country,
        englishName,
        japaneseName,
      },
    });

    return res.json(animeUpdated);
  } catch (err) {
    console.log(err);
    return res.json(serverError);
  }
}

async function updateAnimePosterUrl(req: Request, res: Response) {
  try {
    const { animeId } = req.params;

    const id = parseInt(animeId);

    await prisma.anime.update({
      where: {
        id,
      },
      data: {
        posterUrl: (req.file as Express.MulterS3.File).location,
      },
    });

    return res.json(animePosterUpdated);
  } catch (err) {
    console.log(err);
    return res.json(serverError);
  }
}

async function updateAnimeBackgroundUrl(req: Request, res: Response) {
  try {
    const { animeId } = req.params;

    const id = parseInt(animeId);

    await prisma.anime.update({
      where: {
        id,
      },
      data: {
        backgroundImgUrl: (req.file as Express.MulterS3.File).location,
      },
    });

    return res.json(animeBackgroundUpdated);
  } catch (err) {
    console.log(err);
    return res.json(serverError);
  }
}

export { updateAnime, updateAnimePosterUrl, updateAnimeBackgroundUrl };
