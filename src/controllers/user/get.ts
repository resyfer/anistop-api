import { Request, Response } from "express";
import { prisma } from "@utils/prisma";
import { JSONResponse } from "@repo-types/json";
import { userNotFound } from "@errors/auth";

async function getUser(req: Request, res: Response) {
  try {
    const { userId } = req.params;

    const id = parseInt(userId);

    const userData = await prisma.user.findFirst({
      where: {
        id,
      },
      include: {
        characterFavorites: {
          select: {
            character: {
              select: {
                name: true,
                imgUrl: true,
              },
            },
          },
        },
        ratings: {
          select: {
            season: true,
          },
        },
      },
    });

    if (!userData) {
      return res.json(userNotFound);
    }

    const {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      password: _password,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      otpValue: _otpValue,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      otpExpiry: _otpExpiry,
      ...user
    } = userData;

    return res.json({
      success: true,
      message: user,
    } as JSONResponse<typeof user>);
  } catch (err) {
    console.log(err);
    return;
  }
}

export { getUser };
