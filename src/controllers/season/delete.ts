import { serverError } from "@errors/system";
import { seasonDeleted } from "@success/season";
import { prisma } from "@utils/prisma";
import { Request, Response } from "express";

async function deleteSeason(req: Request, res: Response) {
  try {
    const { seasonId: SID } = req.params;

    const seasonId = parseInt(SID);

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
