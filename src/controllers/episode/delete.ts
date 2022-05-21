import { serverError } from "@errors/system";
import { episodeDeleted } from "@success/episode";
import { prisma } from "@utils/prisma";
import { Request, Response } from "express";

async function deleteEpisode(req: Request, res: Response) {
  try {
    const { seasonId: SID, episodeNumber } = req.params;

    const seasonId = parseInt(SID);
    const episode = parseInt(episodeNumber);

    await prisma.episode.delete({
      where: {
        // eslint-disable-next-line camelcase
        number_seasonId: {
          number: episode,
          seasonId,
        },
      },
    });

    return res.json(episodeDeleted);
  } catch (err) {
    console.log(err);
    return res.json(serverError);
  }
}

export { deleteEpisode };
