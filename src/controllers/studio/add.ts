import { serverError } from "@errors/system";
import { addStudioBody } from "@interfaces/studio";
import { studioAdded } from "@success/studio";
import { prisma } from "@utils/prisma";
import { Request, Response } from "express";

async function addStudio(req: Request, res: Response) {
  try {
    const { name, logoUrl } = req.body as addStudioBody;

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
