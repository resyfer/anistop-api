import { animeNotFound, wrongAnimeId } from "@errors/anime";
import { incorrectStatus, seasonNotFound, wrongSeasonId } from "@errors/season";
import { serverError } from "@errors/system";
import { seasonUpdateBody } from "@interfaces/season";
import { Status } from "@prisma/client";
import { seasonUpdated } from "@success/season";
import { prisma } from "@utils/prisma";
import { Request, Response } from "express";

async function updateSeason(req: Request, res: Response) {
  try {
    const { animeId: AID, seasonId: SID } = req.params;
    const { status } = req.body as seasonUpdateBody;

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

    // Check status
    if (!(status in Status)) {
      return res.json(incorrectStatus);
    }

    await prisma.season.update({
      where: {
        id: seasonId,
      },
      data: {
        status,
      },
    });

    return res.json(seasonUpdated);
  } catch (err) {
    console.log(err);
    return res.json(serverError);
  }
}

export { updateSeason };
