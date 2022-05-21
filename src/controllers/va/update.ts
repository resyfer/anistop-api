import { serverError } from "@errors/system";
import { updateVABody } from "@interfaces/va";
import { vaImgUpdated, vaUpdated } from "@success/va";
import { prisma } from "@utils/prisma";
import { Request, Response } from "express";

async function updateVA(req: Request, res: Response) {
  try {
    const { vaId } = req.params;

    const { more } = req.body as updateVABody;

    const id = parseInt(vaId);

    await prisma.vA.update({
      where: { id },
      data: {
        more,
      },
    });

    return res.json(vaUpdated);
  } catch (err) {
    console.log(err);
    return res.json(serverError);
  }
}

async function updateVAImg(req: Request, res: Response) {
  try {
    const { vaId } = req.params;

    const id = parseInt(vaId);

    await prisma.vA.update({
      where: { id },
      data: {
        imgUrl: (req.file as Express.MulterS3.File).location,
      },
    });

    return res.json(vaImgUpdated);
  } catch (err) {
    console.log(err);
    return res.json(serverError);
  }
}

export { updateVA, updateVAImg };
