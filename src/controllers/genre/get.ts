import { serverError } from "@errors/system";
import { Genre } from "@prisma/client";
import { JSONResponse } from "@repo-types/json";
import { prisma } from "@utils/prisma";
import { Request, Response } from "express";

async function getGenreAnime(req: Request, res: Response) {
  try {
    const { genre } = req.params;

    const animes = await prisma.anime.findMany({
      where: {
        genres: {
          has: genre as Genre,
        },
      },
    });

    return res.json({
      success: true,
      message: animes,
    } as JSONResponse<typeof animes>);
  } catch (err) {
    console.log(err);
    return res.json(serverError);
  }
}

export { getGenreAnime };
