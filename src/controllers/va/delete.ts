import { serverError } from "@errors/system";
import { vaNotFound } from "@errors/va";
import { vaDeleted } from "@success/va";
import { prisma } from "@utils/prisma";
import { Request, Response } from "express";

async function deleteVA(req: Request, res: Response) {
  try {
    const { vaId } = req.params;

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

    await prisma.vA.delete({
      where: { id },
    });

    return res.json(vaDeleted);
  } catch (err) {
    console.log(err);
    return res.json(serverError);
  }
}

export { deleteVA };
