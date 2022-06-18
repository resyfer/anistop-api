import { characterExists } from "@errors/character";
import { serverError } from "@errors/system";
import { vaNotFound } from "@errors/va";
import { updateCharacterBody } from "@interfaces/character";
import { characterImgUpdated, characterUpdated } from "@success/character";
import { prisma } from "@utils/prisma";
import { Request, Response } from "express";

async function updateCharacter(req: Request, res: Response) {
  try {
    const { characterId } = req.params;
    const { name, description, vas: vaArray } = req.body as updateCharacterBody;

    const vas = vaArray.map((va) => ({ name: va }));

    const id = parseInt(characterId);

    // Name check
    if (
      (await prisma.character.count({
        where: {
          name,
          NOT: {
            id,
          },
        },
      })) !== 0
    ) {
      return res.json(characterExists);
    }

    // VA Check
    const vaCheckPromises: Promise<number>[] = [];
    for (let i = 0; i < vas.length; i++) {
      vaCheckPromises.push(
        prisma.vA.count({
          where: { name: vas[i].name },
        })
      );
    }

    const vaCheckResults = await Promise.all(vaCheckPromises);
    if (vaCheckResults.indexOf(0) !== -1) {
      return res.json(vaNotFound);
    }

    await prisma.character.update({
      where: {
        id,
      },
      data: {
        name,
        description,
        vas: {
          set: [],
          connect: vas,
        },
      },
    });

    console.log(vas);

    return res.json(characterUpdated);
  } catch (err) {
    console.log(err);
    return res.json(serverError);
  }
}

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

export { updateCharacter, updateCharacterImg };
