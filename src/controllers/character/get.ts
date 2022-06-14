import { serverError } from "@errors/system";
import { Character } from "@prisma/client";
import { JSONResponse } from "@repo-types/json";
import { prisma } from "@utils/prisma";
import { Request, Response } from "express";

async function getCharacter(req: Request, res: Response) {
  try {
    const { characterId: CID } = req.params;

    const characterId = parseInt(CID);

    const character = await prisma.character.findFirst({
      where: {
        id: characterId,
      },
      include: {
        anime: true,
        vas: true,
        _count: {
          select: {
            characterFavorites: true,
          },
        },
      },
    });

    return res.json({
      success: true,
      message: character,
    } as JSONResponse<typeof character>);
  } catch (err) {
    console.log(err);
    return res.json(serverError);
  }
}

async function getCharactersByAnime(req: Request, res: Response) {
  try {
    const { animeId: AID } = req.params;

    const animeId = parseInt(AID);

    const characters = await prisma.character.findMany({
      where: {
        animeId,
      },
      include: {
        _count: {
          select: {
            characterFavorites: true,
          },
        },
      },
    });

    return res.json({
      success: true,
      message: characters,
    } as JSONResponse<Character[]>);
  } catch (err) {
    console.log(err);
    return res.json(serverError);
  }
}

export { getCharacter, getCharactersByAnime };
