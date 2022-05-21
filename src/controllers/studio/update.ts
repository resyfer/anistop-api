import { serverError } from "@errors/system";
import { studioLogoUpdated } from "@success/studio";
import { prisma } from "@utils/prisma";
import { Request, Response } from "express";

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

export { updateStudioLogo };
