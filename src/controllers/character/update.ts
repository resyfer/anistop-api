import { characterImgUpdated } from "@success/character";
import { prisma } from "@utils/prisma";
import { Request, Response } from "express";

async function updateCharacterImg(req: Request, res: Response) {
  try {
    const { characterId } = req.params;

    const id = parseInt(characterId);

    await prisma.character.update({
      where: {
        id,
      },
      data: {
        imgUrl: (req.file as Express.MulterS3.File).location,
      },
    });

    return res.json(characterImgUpdated);
  } catch (err) {
    console.log(err);
    return;
  }
}

export { updateCharacterImg };
