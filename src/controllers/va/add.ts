import { serverError } from "@errors/system";
import { vaExists } from "@errors/va";
import { addVABody } from "@interfaces/va";
import { vaAdded } from "@success/va";
import { defaultProfilePic } from "@utils/img";
import { prisma } from "@utils/prisma";
import { Request, Response } from "express";
import { DateTime } from "luxon";

async function addVA(req: Request, res: Response) {
  try {
    const { name, dob, more } = req.body as addVABody;

    if ((await prisma.vA.count({ where: { name } })) !== 0) {
      return res.json(vaExists);
    }

    await prisma.vA.create({
      data: {
        name,
        dob: DateTime.fromObject(dob, { zone: "Asia/Tokyo" }).toJSDate(),
        more,
        imgUrl: defaultProfilePic(name),
      },
    });

    return res.json(vaAdded);
  } catch (err) {
    console.log(err);
    return res.json(serverError);
  }
}

export { addVA };
