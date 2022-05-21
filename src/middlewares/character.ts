import { characterNotFound } from "@errors/character";
import { serverError } from "@errors/system";
import { prisma } from "@utils/prisma";
import { Request, Response, NextFunction } from "express";

async function characterCheck(req: Request, res: Response, next: NextFunction) {
  try {
    const { characterId: CID } = req.params;

    const characterId = parseInt(CID);

    if (isNaN(characterId)) {
      return res.json(characterNotFound);
    }

    if ((await prisma.character.count({ where: { id: characterId } })) === 0) {
      return res.json(characterNotFound);
    }

    return next();
  } catch (err) {
    console.log(err);
    return res.json(serverError);
  }
}

export { characterCheck };
