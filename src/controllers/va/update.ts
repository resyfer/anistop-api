import { serverError } from "@errors/system";
import { vaExists } from "@errors/va";
import { updateVABody } from "@interfaces/va";
import { vaImgUpdated, vaUpdated } from "@success/va";
import { prisma } from "@utils/prisma";
import { Request, Response } from "express";
import { DateTime } from "luxon";

async function updateVA(req: Request, res: Response) {
  try {
    const { vaId } = req.params;

    const { name, more, dob } = req.body as updateVABody;

    const [year, month, day] = dob.split("-");

    const id = parseInt(vaId);

    // Check Name
    if (
      (await prisma.vA.count({
        where: {
          name,
          NOT: {
            id,
          },
        },
      })) !== 0
    ) {
      return res.json(vaExists);
    }

    await prisma.vA.update({
      where: { id },
      data: {
        name,
        more,
        dob: DateTime.fromObject(
          {
            year: parseInt(year),
            month: parseInt(month),
            day: parseInt(day),
          },
          { zone: "Asia/Tokyo" }
        ).toJSDate(),
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
