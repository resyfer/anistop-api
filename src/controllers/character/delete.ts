import { animeNotFound } from "@errors/anime";
import { characterNotFound } from "@errors/character";
import { serverError } from "@errors/system";
import { characterDeleted } from "@success/character";
import { prisma } from "@utils/prisma";
import { Request, Response } from "express";

async function deleteCharacter(req: Request, res: Response) {
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

    await prisma.character.delete({
      where: {
        id: characterId,
      },
    });

    return res.json(characterDeleted);
  } catch (err) {
    console.log(err);
    return res.json(serverError);
  }
}

export { deleteCharacter };
