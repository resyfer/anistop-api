import { serverError } from "@errors/system";
import { vaNotFound } from "@errors/va";
import { updateVABody, updateVAImgBody } from "@interfaces/va";
import { vaImgUpdated, vaUpdated } from "@success/va";
import { prisma } from "@utils/prisma";
import { Request, Response } from "express";

async function updateVA(req: Request, res: Response) {
  try {
    const { vaId } = req.params;

    const { more } = req.body as updateVABody;

    const id = parseInt(vaId);

    if (isNaN(id)) {
      return res.json(vaNotFound);
    }

    if (
      (await prisma.vA.count({
        where: { id },
      })) === 0
    ) {
      return res.json(vaNotFound);
    }

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

    const { imgUrl } = req.body as updateVAImgBody;

    const id = parseInt(vaId);

    if (isNaN(id)) {
      return res.json(vaNotFound);
    }

    if (
      (await prisma.vA.count({
        where: { id },
      })) === 0
    ) {
      return res.json(vaNotFound);
    }

    await prisma.vA.update({
      where: { id },
      data: {
        imgUrl,
      },
    });

    return res.json(vaImgUpdated);
  } catch (err) {
    console.log(err);
    return res.json(serverError);
  }
}

export { updateVA, updateVAImg };
