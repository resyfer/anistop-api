import { Genre } from ".prisma/client";
import { animeExists } from "@errors/anime";
import { serverError } from "@errors/system";
import { addAnimeBody } from "@interfaces/anime";
import { FileArray } from "@interfaces/upload";
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

    const posterUrl = (req.files as FileArray)["posterUrl"][0].location;
    const backgroundImgUrl = (req.files as FileArray)["backgroundImgUrl"][0]
      .location;

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
        genres: genres.split(",") as Genre[],
        country,
        keywords: keywords.split(","),
        posterUrl: posterUrl ?? defaultProfilePic(englishName),
        backgroundImgUrl: backgroundImgUrl ?? defaultProfilePic(englishName),
      },
    });

    return res.json(animeCreated);
  } catch (err) {
    console.log(err);
    return res.json(serverError);
  }
}

export { addAnime };
