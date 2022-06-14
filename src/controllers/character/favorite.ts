import { serverError } from "@errors/system";
import { User } from "@prisma/client";
import { JSONResponse } from "@repo-types/json";
import { characterFavToggled } from "@success/character";
import { prisma } from "@utils/prisma";
import { Request, Response } from "express";

async function toggleFavChar(req: Request, res: Response) {
  try {
    const { characterId: CID } = req.params;

    const characterId = parseInt(CID);

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

async function checkFavStatus(req: Request, res: Response) {
  try {
    const { characterId: CID } = req.params;

    const characterId = parseInt(CID);

    const favCount = await prisma.characterFavorite.count({
      where: {
        userId: (req.user as User).id,
        characterId,
      },
    });

    return res.json({
      success: true,
      message: favCount !== 0,
    } as JSONResponse<boolean>);
  } catch (err) {
    console.log(err);
    return res.json(serverError);
  }
}

export { toggleFavChar, checkFavStatus };
