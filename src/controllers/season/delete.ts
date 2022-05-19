import { animeNotFound, wrongAnimeId } from "@errors/anime";
import { seasonNotFound, wrongSeasonId } from "@errors/season";
import { serverError } from "@errors/system";
import { seasonDeleted } from "@success/season";
import { prisma } from "@utils/prisma";
import { Request, Response } from "express";

async function deleteSeason(req: Request, res: Response) {
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

    await prisma.season.delete({
      where: {
        id: seasonId,
      },
    });

    return res.json(seasonDeleted);
  } catch (err) {
    console.log(err);
    return res.json(serverError);
  }
}

export { deleteSeason };
