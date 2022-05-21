import { incorrectStatus } from "@errors/season";
import { serverError } from "@errors/system";
import { seasonUpdateBody } from "@interfaces/season";
import { Status } from "@prisma/client";
import { seasonUpdated } from "@success/season";
import { prisma } from "@utils/prisma";
import { Request, Response } from "express";

async function updateSeason(req: Request, res: Response) {
  try {
    const { seasonId: SID } = req.params;
    const { status } = req.body as seasonUpdateBody;

    const seasonId = parseInt(SID);

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
