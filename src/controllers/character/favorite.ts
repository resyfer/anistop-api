import { animeNotFound } from "@errors/anime";
import { characterNotFound } from "@errors/character";
import { serverError } from "@errors/system";
import { User } from "@prisma/client";
import { characterFavToggled } from "@success/character";
import { prisma } from "@utils/prisma";
import { Request, Response } from "express";

async function toggleFavChar(req: Request, res: Response) {
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

    // Toggle
    if (
      (await prisma.characterFavorite.count({
        where: { characterId, userId: (req.user as User).id },
      })) === 0
    ) {
      await prisma.characterFavorite.create({
        data: {
          character: {
            connect: {
              id: characterId,
            },
          },
          user: {
            connect: {
              id: (req.user as User).id,
            },
          },
        },
      });
    } else {
      await prisma.characterFavorite.delete({
        where: {
          // eslint-disable-next-line camelcase
          characterId_userId: {
            characterId,
            userId: (req.user as User).id,
          },
        },
      });
    }

    return res.json(characterFavToggled);
  } catch (err) {
    console.log(err);
    return res.json(serverError);
  }
}

export { toggleFavChar };
