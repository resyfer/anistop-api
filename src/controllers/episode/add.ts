import { animeNotFound, wrongAnimeId } from "@errors/anime";
import { episodeExists } from "@errors/episode";
import { seasonNotFound, wrongSeasonId } from "@errors/season";
import { serverError } from "@errors/system";
import { episodeCreated } from "@success/episode";
import { prisma } from "@utils/prisma";
import { Request, Response } from "express";

async function addEpisode(req: Request, res: Response) {
  try {
    const { animeId: AID, seasonId: SID } = req.params;

    const { number, name, videoUrl } = req.body;

    const animeId = parseInt(AID);
    const seasonId = parseInt(SID);

    // Check for anime
    if (isNaN(animeId)) {
      return res.json(wrongAnimeId);
    }

    if ((await prisma.anime.count({ where: { id: animeId } })) === 0) {
      return res.json(animeNotFound);
    }

    // Check for season
    if (isNaN(seasonId)) {
      return res.json(wrongSeasonId);
    }

    if (
      (await prisma.season.count({ where: { id: seasonId, animeId } })) === 0
    ) {
      return res.json(seasonNotFound);
    }

    // Check for episode
    if (
      (await prisma.episode.count({ where: { number, name, videoUrl } })) !== 0
    ) {
      return res.json(episodeExists);
    }

    await prisma.episode.create({
      data: {
        name,
        number,
        videoUrl,

        season: {
          connect: {
            id: seasonId,
          },
        },
      },
    });

    return res.json(episodeCreated);
  } catch (err) {
    console.log(err);
    return res.json(serverError);
  }
}

export { addEpisode };
