import { serverError } from "@errors/system";
import { vaDeleted } from "@success/va";
import { prisma } from "@utils/prisma";
import { Request, Response } from "express";

async function deleteVA(req: Request, res: Response) {
  try {
    const { vaId } = req.params;

    const id = parseInt(vaId);

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
