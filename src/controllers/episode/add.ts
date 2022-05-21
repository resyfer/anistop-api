import { episodeExists } from "@errors/episode";
import { serverError } from "@errors/system";
import { episodeCreated } from "@success/episode";
import { prisma } from "@utils/prisma";
import { Request, Response } from "express";
import { episodeAddBody } from "@interfaces/episode";

async function addEpisode(req: Request, res: Response) {
  try {
    const { seasonId: SID } = req.params;

    const { number, name } = req.body as episodeAddBody;

    const seasonId = parseInt(SID);

    const videoUrl = (req.file as Express.MulterS3.File).location;

    // Check for episode
    if (
      (await prisma.episode.count({ where: { number, name, videoUrl } })) !== 0
    ) {
      return res.json(episodeExists);
    }

    await prisma.episode.create({
      data: {
        name,
        number,
        videoUrl,

        season: {
          connect: {
            id: seasonId,
          },
        },
      },
    });

    return res.json(episodeCreated);
  } catch (err) {
    console.log(err);
    return res.json(serverError);
  }
}

export { addEpisode };
