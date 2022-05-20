import { animeNotFound, wrongAnimeId } from "@errors/anime";
import { characterExists } from "@errors/character";
import { serverError } from "@errors/system";
import { vaNotFound } from "@errors/va";
import { addCharacterBody } from "@interfaces/character";
import { characterCreated } from "@success/character";
import { defaultProfilePic } from "@utils/img";
import { prisma } from "@utils/prisma";
import { Request, Response } from "express";

async function addCharacter(req: Request, res: Response) {
  try {
    const { animeId } = req.params;
    const { name, description, vas } = req.body as addCharacterBody;

    const id = parseInt(animeId);

    // Anime check
    if (isNaN(id)) {
      return res.json(wrongAnimeId);
    }

    if ((await prisma.anime.count({ where: { id } })) === 0) {
      return res.json(animeNotFound);
    }

    // Character check
    if (
      (await prisma.character.count({ where: { animeId: id, name } })) !== 0
    ) {
      return res.json(characterExists);
    }

    // Check VAs
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

    // VA Options

    await prisma.character.create({
      data: {
        name,
        imgUrl: defaultProfilePic(name),
        description,

        anime: {
          connect: {
            id,
          },
        },
        vas: {
          connect: vas,
        },
      },
    });

    return res.json(characterCreated);
  } catch (err) {
    console.log(err);
    return res.json(serverError);
  }
}

export { addCharacter };
