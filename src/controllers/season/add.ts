import { animeSeasonNotFound } from "@errors/animeSeason";
import {
  episodeTypeIncorrect,
  seasonExists,
  seasonTypeIncorrect,
} from "@errors/season";
import { studioNotFound } from "@errors/studio";
import { serverError } from "@errors/system";
import { ANIME_SEASONS } from "@globals/constants";
import {
  animeSeasonConnectionOption,
  seasonAddBody,
  studioConnectionOption,
} from "@interfaces/season";
import { EpisodeType, SeasonType } from "@prisma/client";
import { seasonCreated } from "@success/season";
import { prisma } from "@utils/prisma";
import { Request, Response } from "express";

async function addSeason(req: Request, res: Response) {
  try {
    const { animeId } = req.params;
    const { episodeType, name, seasonType, studios, animeSeasons } =
      req.body as seasonAddBody;

    const id = parseInt(animeId);

    // Season Check
    if ((await prisma.season.count({ where: { name, animeId: id } })) !== 0) {
      return res.json(seasonExists);
    }

    // Check for Episode Type
    if (!(episodeType in EpisodeType)) {
      return res.json(episodeTypeIncorrect);
    }

    // Check for Season Type
    if (!(seasonType in SeasonType)) {
      return res.json(seasonTypeIncorrect);
    }

    // Check for studio
    const studioCheckPromises: Promise<number>[] = [];
    for (let i = 0; i < studios.length; i++) {
      studioCheckPromises.push(
        prisma.studio.count({ where: { name: studios[i] } })
      );
    }

    const studioExistence = await Promise.all(studioCheckPromises);
    if (studioExistence.indexOf(0) !== -1) {
      return res.json(studioNotFound);
    }

    // Studio Many-To-Many
    const studioConnectionOptions: studioConnectionOption[] = [];
    for (let i = 0; i < studios.length; i++) {
      studioConnectionOptions.push({
        name: studios[i],
      });
    }

    // Check for Anime Season
    const animeSeasonCheckPromises: Promise<number>[] = [];
    for (let i = 0; i < animeSeasons.length; i++) {
      if (ANIME_SEASONS.indexOf(animeSeasons[i].seasonOfYear) !== -1) {
        animeSeasonCheckPromises.push(
          prisma.animeSeason.count({
            where: {
              year: animeSeasons[i].year,
              seasonOfYear: animeSeasons[i].seasonOfYear,
            },
          })
        );
      } else {
        return res.json(animeSeasonNotFound);
      }
    }

    const animeSeasonExistence = await Promise.all(animeSeasonCheckPromises);
    console.log(animeSeasonExistence);
    if (animeSeasonExistence.indexOf(0) !== -1) {
      return res.json(animeSeasonNotFound);
    }

    // Anime Season Many-To-Many
    const animeSeasonConnectionOptions: animeSeasonConnectionOption[] = [];
    for (let i = 0; i < animeSeasons.length; i++) {
      animeSeasonConnectionOptions.push({
        // eslint-disable-next-line camelcase
        seasonOfYear_year: {
          seasonOfYear: animeSeasons[i].seasonOfYear,
          year: animeSeasons[i].year,
        },
      });
    }

    await prisma.season.create({
      data: {
        name,
        seasonType,
        episodeType,
        studios: {
          connect: studioConnectionOptions,
        },
        anime: {
          connect: {
            id,
          },
        },
        animeSeasons: {
          connect: animeSeasonConnectionOptions,
        },
      },
    });

    return res.json(seasonCreated);
  } catch (err) {
    console.log(err);
    return res.json(serverError);
  }
}

export { addSeason };
