import { serverError } from "@errors/system";
import { characterDeleted } from "@success/character";
import { prisma } from "@utils/prisma";
import { Request, Response } from "express";

async function deleteCharacter(req: Request, res: Response) {
  try {
    const { characterId: CID } = req.params;

    const characterId = parseInt(CID);

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
