import {
  animeSeasonNotFound,
  invalidSeasonofYear,
  invalidYear,
} from "@errors/animeSeason";
import { serverError } from "@errors/system";
import { SeasonOfYear } from "@prisma/client";
import { prisma } from "@utils/prisma";
import { Request, Response, NextFunction } from "express";

async function checkAnimeSeason(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { year: yearString, season } = req.params;

    const year = parseInt(yearString);

    // Check year
    if (isNaN(year)) {
      return res.json(invalidYear);
    }

    // Check Season
    if (!(season in SeasonOfYear)) {
      return res.json(invalidSeasonofYear);
    }

    // Check Anime Season
    if (
      (await prisma.animeSeason.count({
        where: {
          year,
          seasonOfYear: season as SeasonOfYear,
        },
      })) === 0
    ) {
      return res.json(animeSeasonNotFound);
    }

    return next();
  } catch (err) {
    console.log(err);
    return res.json(serverError);
  }
}

export { checkAnimeSeason };
