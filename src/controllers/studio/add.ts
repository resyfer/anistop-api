import { serverError } from "@errors/system";
import { studioAdded } from "@success/studio";
import { addStudioBody } from "@interfaces/studio";
import { prisma } from "@utils/prisma";
import { Request, Response } from "express";

async function addStudio(req: Request, res: Response) {
  try {
    const { name } = req.body as addStudioBody;

    const logoUrl = (req.file as Express.MulterS3.File).location;

    // Check if studio exists
    if ((await prisma.studio.count({ where: { name } })) !== 0) {
      return res.json(logoUrl);
    }

    await prisma.studio.create({
      data: {
        name,
        logoUrl,
      },
    });

    return res.json(studioAdded);
  } catch (err) {
    console.log(err);
    return res.json(serverError);
  }
}

export { addStudio };
