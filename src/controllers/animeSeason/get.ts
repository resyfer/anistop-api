import { serverError } from "@errors/system";
import { SeasonOfYear } from "@prisma/client";
import { JSONResponse } from "@repo-types/json";
import { prisma } from "@utils/prisma";
import { Request, Response } from "express";

async function getAnimeSeasonAnime(req: Request, res: Response) {
  try {
    const { year: yearString, season } = req.params;

    const year = parseInt(yearString);

    const animes = await prisma.anime.findMany({
      where: {
        seasons: {
          some: {
            animeSeasons: {
              some: {
                year,
                seasonOfYear: season as SeasonOfYear,
              },
            },
          },
        },
      },
    });

    return res.json({
      success: true,
      message: animes,
    } as JSONResponse<typeof animes>);
  } catch (err) {
    console.log(err);
    return res.json(serverError);
  }
}

export { getAnimeSeasonAnime };
