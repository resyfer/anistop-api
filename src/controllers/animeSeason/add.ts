import { animeSeasonExists } from "@errors/animeSeason";
import { serverError } from "@errors/system";
import { addAnimeSeasonBody } from "@interfaces/animeSeason";
import { animeSeasonCreated } from "@success/animeSeason";
import { prisma } from "@utils/prisma";
import { Request, Response } from "express";

async function addAnimeSeason(req: Request, res: Response) {
  try {
    const { seasonOfYear, year } = req.body as addAnimeSeasonBody;

    if (
      (await prisma.animeSeason.count({
        where: { AND: [{ seasonOfYear }, { year }] },
      })) !== 0
    ) {
      return res.json(animeSeasonExists);
    }

    await prisma.animeSeason.create({
      data: {
        seasonOfYear,
        year,
      },
    });

    return res.json(animeSeasonCreated);
  } catch (err) {
    console.log(err);
    return res.json(serverError);
  }
}

export { addAnimeSeason };
