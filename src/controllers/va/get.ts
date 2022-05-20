import { serverError } from "@errors/system";
import { vaNotFound } from "@errors/va";
import { VA } from "@prisma/client";
import { JSONResponse } from "@repo-types/json";
import { prisma } from "@utils/prisma";
import { Request, Response } from "express";

async function getVA(req: Request, res: Response) {
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

    const va = await prisma.vA.findFirst({
      where: { id },
    });

    return res.json({
      success: true,
      message: va,
    } as JSONResponse<VA>);
  } catch (err) {
    console.log(err);
    return res.json(serverError);
  }
}

export { getVA };
