import { animeNotFound, wrongAnimeId } from "@errors/anime";
import { seasonNotFound, wrongSeasonId } from "@errors/season";
import { serverError } from "@errors/system";
import { ratingPromise, seasonData } from "@interfaces/season";
import { User, View } from "@prisma/client";
import { JSONResponse } from "@repo-types/json";
import { prisma } from "@utils/prisma";
import { Request, Response } from "express";

async function getSeason(req: Request, res: Response) {
  try {
    const { animeId: AID, seasonId: SID } = req.params;

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

    const season = await prisma.season.findFirst({
      where: {
        id: seasonId,
      },
    });

    const rating = await prisma.userRating.aggregate({
      where: {
        seasonId,
      },
      _sum: {
        rating: true,
      },
      _count: {
        rating: true,
      },
    });

    await prisma.season.update({
      where: {
        id: seasonId,
      },
      data: {
        views: {
          increment: 1,
        },
      },
    });

    return res.json({
      success: true,
      message: {
        ...season,
        ...rating,
      },
    } as JSONResponse<seasonData>);
  } catch (err) {
    console.log(err);
    return res.json(serverError);
  }
}

async function getSeasonsByAnime(req: Request, res: Response) {
  try {
    const { animeId } = req.params;

    const id = parseInt(animeId);

    // Check for anime
    if (isNaN(id)) {
      return res.json(wrongAnimeId);
    }

    if ((await prisma.anime.count({ where: { id } })) === 0) {
      return res.json(animeNotFound);
    }

    const seasons = await prisma.season.findMany({
      where: {
        animeId: id,
      },
      orderBy: {
        id: "asc",
      },
    });

    const seasonRatingCount: Promise<ratingPromise>[] = [];
    for (let i = 0; i < seasons.length; i++) {
      seasonRatingCount.push(
        prisma.userRating.aggregate({
          where: {
            seasonId: seasons[i].id,
          },
          _sum: {
            rating: true,
          },
          _count: {
            rating: true,
          },
        })
      );
    }

    const seasonValues = await Promise.all(seasonRatingCount);
    const seasonsData: seasonData[] = [];
    for (let i = 0; i < seasonValues.length; i++) {
      seasonsData.push({
        ...seasons[i],
        ...seasonValues[i],
      });
    }

    return res.json({
      success: true,
      message: seasonsData,
    } as JSONResponse<seasonData[]>);
  } catch (err) {
    console.log(err);
    return res.json(serverError);
  }
}

async function getEpisodeViewStatus(req: Request, res: Response) {
  try {
    const { animeId: AID, seasonId: SID } = req.params;

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

    const status = await prisma.view.findMany({
      distinct: ["episodeId"],
      where: {
        episode: {
          season: {
            id: seasonId,
          },
        },
        viewer: {
          id: (req.user as User).id,
        },
      },
      orderBy: {
        episode: {
          number: "asc",
        },
      },
    });

    return res.json({
      success: true,
      message: status,
    } as JSONResponse<View[]>);
  } catch (err) {
    console.log(err);
    return res.json(serverError);
  }
}

export { getSeason, getSeasonsByAnime, getEpisodeViewStatus };
