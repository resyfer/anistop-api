import { serverError } from "@errors/system";
import { Anime } from "@prisma/client";
import { JSONResponse } from "@repo-types/json";
import { prisma } from "@utils/prisma";
import { Request, Response } from "express";

async function getAnime(req: Request, res: Response) {
  try {
    const { animeId } = req.params;

    const id = parseInt(animeId);

    const anime = await prisma.anime.findFirst({
      where: { id },
    });

    return res.json({
      success: true,
      message: anime,
    } as JSONResponse<Anime>);
  } catch (err) {
    console.log(err);
    return res.json(serverError);
  }
}

export { getAnime };
