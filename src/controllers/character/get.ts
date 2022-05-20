import { animeNotFound } from "@errors/anime";
import { characterNotFound } from "@errors/character";
import { serverError } from "@errors/system";
import { Character } from "@prisma/client";
import { JSONResponse } from "@repo-types/json";
import { prisma } from "@utils/prisma";
import { Request, Response } from "express";

async function getCharacter(req: Request, res: Response) {
  try {
    const { animeId: AID, characterId: CID } = req.params;

    const animeId = parseInt(AID);
    const characterId = parseInt(CID);

    // Anime Check
    if (isNaN(animeId)) {
      return res.json(animeNotFound);
    }

    if ((await prisma.anime.count({ where: { id: animeId } })) === 0) {
      return res.json(animeNotFound);
    }

    // Character Check
    if (isNaN(characterId)) {
      return res.json(characterNotFound);
    }

    if ((await prisma.character.count({ where: { id: characterId } })) === 0) {
      return res.json(characterNotFound);
    }

    const character = await prisma.character.findFirst({
      where: {
        id: characterId,
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
      message: character,
    } as JSONResponse<Character>);
  } catch (err) {
    console.log(err);
    return res.json(serverError);
  }
}

async function getCharactersByAnime(req: Request, res: Response) {
  try {
    const { animeId: AID } = req.params;

    const animeId = parseInt(AID);

    // Anime Check
    if (isNaN(animeId)) {
      return res.json(animeNotFound);
    }

    if ((await prisma.anime.count({ where: { id: animeId } })) === 0) {
      return res.json(animeNotFound);
    }

    const characters = await prisma.character.findMany({
      where: {
        animeId,
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
