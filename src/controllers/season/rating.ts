import { animeNotFound, wrongAnimeId } from "@errors/anime";
import { seasonNotFound, wrongSeasonId } from "@errors/season";
import { updateRatingBody } from "@interfaces/season";
import { User } from "@prisma/client";
import { ratingUpdated } from "@success/season";
import { prisma } from "@utils/prisma";
import { Request, Response } from "express";

async function updateRating(req: Request, res: Response) {
  try {
    const { animeId: AID, seasonId: SID } = req.params;

    const { rating } = req.body as updateRatingBody;

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

    if (
      (await prisma.userRating.count({
        where: { userId: (req.user as User).id, seasonId },
      })) === 0
    ) {
      await prisma.userRating.create({
        data: {
          rating,
          rater: {
            connect: {
              id: (req.user as User).id,
            },
          },
          season: {
            connect: {
              id: seasonId,
            },
          },
        },
      });
    } else {
      await prisma.userRating.update({
        where: {
          // eslint-disable-next-line camelcase
          userId_seasonId: {
            seasonId,
            userId: (req.user as User).id,
          },
        },
        data: {
          rating,
        },
      });
    }

    return res.json(ratingUpdated);
  } catch (err) {
    console.log(err);
    return res.json(err);
  }
}

export { updateRating };
