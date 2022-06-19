import { Request, Response } from "express";
import { prisma } from "@utils/prisma";
import { JSONResponse } from "@repo-types/json";
import { userNotFound } from "@errors/auth";
import { User } from "@prisma/client";

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
                id: true,
                name: true,
                imgUrl: true,
                animeId: true,
              },
            },
          },
        },
        ratings: {
          select: {
            season: {
              include: {
                anime: {
                  select: {
                    id: true,
                    englishName: true,
                    posterUrl: true,
                  },
                },
                episodes: {
                  include: {
                    views: {
                      where: {
                        viewerId: id,
                      },
                      distinct: ["viewerId", "episodeId"],
                    },
                  },
                },
              },
            },
            rating: true,
          },
          orderBy: {
            rating: "desc",
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

async function getSelf(req: Request, res: Response) {
  try {
    const id = (req.user as User).id;

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

export { getUser, getSelf };
