import { Request, Response, NextFunction } from "express";
import { serverError } from "@errors/system";
import { seasonNotFound } from "@errors/season";
import { prisma } from "@utils/prisma";

async function checkSeason(req: Request, res: Response, next: NextFunction) {
  try {
    const { animeId: AID, seasonId: SID } = req.params;

    const animeId = parseInt(AID);
    const seasonId = parseInt(SID);

    if (isNaN(seasonId)) {
      return res.json(seasonNotFound);
    }

    if (
      (await prisma.season.count({ where: { id: seasonId, animeId } })) === 0
    ) {
      return res.json(seasonNotFound);
    }

    return next();
  } catch (err) {
    console.log(err);
    return res.json(serverError);
  }
}

export { checkSeason };
