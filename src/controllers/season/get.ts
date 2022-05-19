import { animeNotFound, wrongAnimeId } from "@errors/anime";
import { seasonNotFound, wrongSeasonId } from "@errors/season";
import { serverError } from "@errors/system";
import { Season } from "@prisma/client";
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
      message: season,
    } as JSONResponse<Season>);
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
    });

    return res.json({
      success: true,
      message: seasons,
    } as JSONResponse<Season[]>);
  } catch (err) {
    console.log(err);
    return res.json(serverError);
  }
}

export { getSeason, getSeasonsByAnime };
