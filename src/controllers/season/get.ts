import { serverError } from "@errors/system";
import { ratingPromise, seasonData } from "@interfaces/season";
import { User, View } from "@prisma/client";
import { JSONResponse } from "@repo-types/json";
import { prisma } from "@utils/prisma";
import { Request, Response } from "express";

async function getSeason(req: Request, res: Response) {
  try {
    const { seasonId: SID } = req.params;

    const seasonId = parseInt(SID);

    const season = await prisma.season.findFirst({
      where: {
        id: seasonId,
      },
      include: {
        anime: {
          select: {
            id: true,
            backgroundImgUrl: true,
            posterUrl: true,
            englishName: true,
            japaneseName: true,
          },
        },
        episodes: {
          select: {
            id: true,
            name: true,
            number: true,
            viewCount: true,
            views: {
              distinct: ["viewerId", "episodeId"],
              where: {
                viewerId: (req.user as User).id,
              },
            },
          },
          orderBy: {
            number: "asc",
          },
        },
        studios: {
          select: {
            name: true,
          },
        },
        animeSeasons: {
          select: {
            year: true,
            seasonOfYear: true,
          },
        },
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

    const studios = season!.studios.map((studio) => studio.name);

    return res.json({
      success: true,
      message: {
        ...season,
        studios,
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
    const { seasonId: SID } = req.params;

    const seasonId = parseInt(SID);

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
