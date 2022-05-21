import { episodeNotFound } from "@errors/episode";
import { serverError } from "@errors/system";
import { Episode, User } from "@prisma/client";
import { JSONResponse } from "@repo-types/json";
import { prisma } from "@utils/prisma";
import { Request, Response } from "express";

async function getEpisodeDetails(req: Request, res: Response) {
  try {
    const { seasonId: SID, episodeNumber } = req.params;

    const seasonId = parseInt(SID);
    const episodeNum = parseInt(episodeNumber);

    const episode = await prisma.episode.findFirst({
      where: {
        number: episodeNum,
        seasonId,
      },
      select: {
        number: true,
        name: true,
      },
    });

    return res.json({
      success: true,
      message: episode,
    } as JSONResponse<typeof episode>);
  } catch (err) {
    console.log(err);
    return res.json(serverError);
  }
}

async function getEpisodeVideoUrl(req: Request, res: Response) {
  try {
    const { seasonId: SID, episodeNumber } = req.params;

    const seasonId = parseInt(SID);
    const episodeNum = parseInt(episodeNumber);

    const episode = await prisma.episode.findFirst({
      where: {
        number: episodeNum,
        seasonId,
      },
    });

    if (!episode) {
      return res.json(episodeNotFound);
    }

    if (req.isAuthenticated()) {
      await prisma.view.create({
        data: {
          viewer: {
            connect: {
              id: (req.user as User).id,
            },
          },

          episode: {
            connect: {
              id: episode.id,
            },
          },
        },
      });
    }

    await prisma.episode.update({
      where: {
        id: episode.id,
      },
      data: {
        viewCount: {
          increment: 1,
        },
      },
    });

    return res.json({
      success: true,
      message: episode,
    } as JSONResponse<Episode>);
  } catch (err) {
    console.log(err);
    return res.json(serverError);
  }
}

export { getEpisodeDetails, getEpisodeVideoUrl };
