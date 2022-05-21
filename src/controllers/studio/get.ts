import { serverError } from "@errors/system";
import { Anime, Studio } from "@prisma/client";
import { JSONResponse } from "@repo-types/json";
import { prisma } from "@utils/prisma";
import { Request, Response } from "express";

async function getStudio(req: Request, res: Response) {
  try {
    const { studioId } = req.params;

    const id = parseInt(studioId);

    const studio = await prisma.studio.findFirst({
      where: {
        id,
      },
    });

    return res.json({
      success: true,
      message: studio,
    } as JSONResponse<Studio>);
  } catch (err) {
    console.log(err);
    return res.json(serverError);
  }
}

async function getStudioAnimes(req: Request, res: Response) {
  try {
    const { studioId } = req.params;

    const id = parseInt(studioId);

    const animes = await prisma.anime.findMany({
      where: {
        seasons: {
          some: {
            studios: {
              some: {
                id,
              },
            },
          },
        },
      },
    });

    return res.json({
      success: true,
      message: animes,
    } as JSONResponse<Anime[]>);
  } catch (err) {
    console.log(err);
    return res.json(serverError);
  }
}

export { getStudio, getStudioAnimes };
