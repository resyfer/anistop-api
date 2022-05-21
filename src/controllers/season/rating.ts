import { updateRatingBody } from "@interfaces/season";
import { User } from "@prisma/client";
import { ratingUpdated } from "@success/season";
import { prisma } from "@utils/prisma";
import { Request, Response } from "express";

async function updateRating(req: Request, res: Response) {
  try {
    const { seasonId: SID } = req.params;

    const { rating } = req.body as updateRatingBody;

    const seasonId = parseInt(SID);

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
