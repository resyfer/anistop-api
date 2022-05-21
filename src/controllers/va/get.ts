import { serverError } from "@errors/system";
import { VA } from "@prisma/client";
import { JSONResponse } from "@repo-types/json";
import { prisma } from "@utils/prisma";
import { Request, Response } from "express";

async function getVA(req: Request, res: Response) {
  try {
    const { vaId } = req.params;

    const id = parseInt(vaId);

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
