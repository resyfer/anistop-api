import { Request, Response } from "express";
import { serverError } from "@errors/system";
import { prisma } from "@utils/prisma";
import { userImgUpdated } from "@success/user";

async function updateUserImg(req: Request, res: Response) {
  try {
    const { userId } = req.params;

    const id = parseInt(userId);
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        imgUrl: (req.file as Express.MulterS3.File).location,
      },
    });

    return res.json(userImgUpdated);
  } catch (err) {
    console.log(err);
    return res.json(serverError);
  }
}

export { updateUserImg };
