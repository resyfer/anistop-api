import { serverError } from "@errors/system";
import { Anime } from "@prisma/client";
import { JSONResponse } from "@repo-types/json";
import { prisma } from "@utils/prisma";
import { Request, Response } from "express";

async function getAnime(req: Request, res: Response) {
  try {
    const { animeId } = req.params;

    const id = parseInt(animeId);

    const anime = await prisma.anime.findFirst({
      where: { id },
      include: {
        characters: {
          select: {
            id: true,
            name: true,
            vas: true,
            imgUrl: true,
            _count: {
              select: {
                characterFavorites: true,
              },
            },
          },
          orderBy: {
            id: "asc",
          },
        },
        seasons: {
          orderBy: {
            id: "asc",
          },
          select: {
            id: true,
            name: true,
            episodeType: true,
            seasonType: true,
            _count: {
              select: {
                episodes: true,
              },
            },
          },
        },
      },
    });

    return res.json({
      success: true,
      message: anime,
    } as JSONResponse<Anime>);
  } catch (err) {
    console.log(err);
    return res.json(serverError);
  }
}

async function searchAnime(req: Request, res: Response) {
  try {
    const { query } = req.query;

    const queryArray = (query as string).split(" ");
    const queryString = queryArray.join(" | ");

    const animes = await prisma.anime.findMany({
      where: {
        OR: [
          {
            englishName: {
              search: queryString,
            },
          },
          {
            description: {
              search: queryString,
            },
          },
          {
            characters: {
              some: {
                name: {
                  search: queryString,
                },
              },
            },
          },
          {
            keywords: {
              hasSome: queryArray,
            },
          },
          {
            characters: {
              some: {
                vas: {
                  some: {
                    name: {
                      search: queryString,
                    },
                  },
                },
              },
            },
          },
          {
            seasons: {
              some: {
                studios: {
                  some: {
                    name: {
                      search: queryString,
                    },
                  },
                },
              },
            },
          },
        ],
      },
    });

    return res.json({
      success: true,
      message: animes,
    } as JSONResponse<typeof animes>);
  } catch (err) {
    console.log(err);
    return res.json(serverError);
  }
}

export { getAnime, searchAnime };
