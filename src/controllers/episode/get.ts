import { animeNotFound, wrongAnimeId } from "@errors/anime";
import { episodeNotFound } from "@errors/episode";
import { seasonNotFound, wrongSeasonId } from "@errors/season";
import { serverError } from "@errors/system";
import { Episode, User } from "@prisma/client";
import { JSONResponse } from "@repo-types/json";
import { prisma } from "@utils/prisma";
import { Request, Response } from "express";

async function getEpisodeDetails(req: Request, res: Response) {
  try {
    const { animeId: AID, seasonId: SID, episodeNumber } = req.params;

    const animeId = parseInt(AID);
    const seasonId = parseInt(SID);
    const episodeNum = parseInt(episodeNumber);

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
    if (isNaN(episodeNum)) {
      return res.json(episodeNotFound);
    }

    if (
      (await prisma.episode.count({
        where: { number: episodeNum, seasonId },
      })) === 0
    ) {
      return res.json(episodeNotFound);
    }

    const episode = await prisma.episode.findFirst({
      where: {
        number: episodeNum,
        seasonId,
      },
      select: {
        number: true,
        name: true,
      },
    });

    return res.json({
      success: true,
      message: episode,
    } as JSONResponse<typeof episode>);
  } catch (err) {
    console.log(err);
    return res.json(serverError);
  }
}

async function getEpisodeVideoUrl(req: Request, res: Response) {
  try {
    const { animeId: AID, seasonId: SID, episodeNumber } = req.params;

    const animeId = parseInt(AID);
    const seasonId = parseInt(SID);
    const episodeNum = parseInt(episodeNumber);

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
    if (isNaN(episodeNum)) {
      return res.json(episodeNotFound);
    }

    if (
      (await prisma.episode.count({
        where: { number: episodeNum, seasonId },
      })) === 0
    ) {
      return res.json(episodeNotFound);
    }

    const episode = await prisma.episode.findFirst({
      where: {
        number: episodeNum,
        seasonId,
      },
    });

    if (!episode) {
      return res.json(episodeNotFound);
    }

    if (req.isAuthenticated()) {
      await prisma.view.create({
        data: {
          viewer: {
            connect: {
              id: (req.user as User).id,
            },
          },

          episode: {
            connect: {
              id: episode.id,
            },
          },
        },
      });
    }

    await prisma.episode.update({
      where: {
        id: episode.id,
      },
      data: {
        viewCount: {
          increment: 1,
        },
      },
    });

    return res.json({
      success: true,
      message: episode,
    } as JSONResponse<Episode>);
  } catch (err) {
    console.log(err);
    return res.json(serverError);
  }
}

export { getEpisodeDetails, getEpisodeVideoUrl };
