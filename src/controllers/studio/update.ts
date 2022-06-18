import { studioExists } from "@errors/studio";
import { serverError } from "@errors/system";
import { updateStudioBody } from "@interfaces/studio";
import { studioLogoUpdated, studioUpdated } from "@success/studio";
import { prisma } from "@utils/prisma";
import { Request, Response } from "express";

async function updateStudio(req: Request, res: Response) {
  try {
    const { studioId } = req.params;

    const id = parseInt(studioId);

    const { name } = req.body as updateStudioBody;

    if (
      (await prisma.studio.count({
        where: {
          name,
          NOT: {
            id,
          },
        },
      })) !== 0
    ) {
      return res.json(studioExists);
    }

    await prisma.studio.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });

    return res.json(studioUpdated);
  } catch (err) {
    console.log(err);
    return res.json(serverError);
  }
}

async function updateStudioLogo(req: Request, res: Response) {
  try {
    const { studioId } = req.params;

    const id = parseInt(studioId);

    const logoUrl = (req.file as Express.MulterS3.File).location;

    await prisma.studio.update({
      where: {
        id,
      },
      data: {
        logoUrl,
      },
    });

    return res.json(studioLogoUpdated);
  } catch (err) {
    console.log(err);
    return res.json(serverError);
  }
}

export { updateStudio, updateStudioLogo };
