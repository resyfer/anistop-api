import { animeNotFound, wrongAnimeId } from "@errors/anime";
import { episodeNotFound } from "@errors/episode";
import { seasonNotFound, wrongSeasonId } from "@errors/season";
import { serverError } from "@errors/system";
import { episodeDeleted } from "@success/episode";
import { prisma } from "@utils/prisma";
import { Request, Response } from "express";

async function deleteEpisode(req: Request, res: Response) {
  try {
    const { animeId: AID, seasonId: SID, episodeNumber } = req.params;

    const animeId = parseInt(AID);
    const seasonId = parseInt(SID);
    const episode = parseInt(episodeNumber);

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
    if (isNaN(episode)) {
      return res.json(episodeNotFound);
    }

    if (
      (await prisma.episode.count({ where: { number: episode, seasonId } })) ===
      0
    ) {
      return res.json(episodeNotFound);
    }

    // Check for anime
    if (isNaN(animeId)) {
      return res.json(wrongAnimeId);
    }

    await prisma.episode.delete({
      where: {
        // eslint-disable-next-line camelcase
        number_seasonId: {
          number: episode,
          seasonId,
        },
      },
    });

    return res.json(episodeDeleted);
  } catch (err) {
    console.log(err);
    return res.json(serverError);
  }
}

export { deleteEpisode };
