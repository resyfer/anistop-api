import { serverError } from "@errors/system";
import { JSONResponse } from "@repo-types/json";
import { prisma } from "@utils/prisma";
import { Request, Response } from "express";

async function getVA(req: Request, res: Response) {
  try {
    const { vaId } = req.params;

    const id = parseInt(vaId);

    const va = await prisma.vA.findFirst({
      where: { id },
      include: {
        characters: {
          select: {
            id: true,
            name: true,
            imgUrl: true,
            anime: {
              select: {
                id: true,
                englishName: true,
                posterUrl: true,
              },
            },
            _count: {
              select: {
                characterFavorites: true,
              },
            },
          },
          orderBy: {
            characterFavorites: {
              _count: "desc",
            },
          },
        },
      },
    });

    return res.json({
      success: true,
      message: va,
    } as JSONResponse<typeof va>);
  } catch (err) {
    console.log(err);
    return res.json(serverError);
  }
}

export { getVA };
