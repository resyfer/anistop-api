import { episodeNotFound } from "@errors/episode";
import { serverError } from "@errors/system";
import { prisma } from "@utils/prisma";
import { Request, Response, NextFunction } from "express";

async function checkEpisode(req: Request, res: Response, next: NextFunction) {
  try {
    const { seasonId: SID, episodeNumber } = req.params;

    const seasonId = parseInt(SID);
    const episodeNum = parseInt(episodeNumber);

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

    return next();
  } catch (err) {
    console.log(err);
    return res.json(serverError);
  }
}

export { checkEpisode };
