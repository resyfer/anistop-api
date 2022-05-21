import { serverError } from "@errors/system";
import { vaNotFound } from "@errors/va";
import { prisma } from "@utils/prisma";
import { Request, Response, NextFunction } from "express";

async function checkVA(req: Request, res: Response, next: NextFunction) {
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

    return next();
  } catch (err) {
    console.log(err);
    return res.json(serverError);
  }
}

export { checkVA };
