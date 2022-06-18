import { animeSeasonNotFound } from "@errors/animeSeason";
import {
  episodeTypeIncorrect,
  incorrectStatus,
  seasonExists,
  seasonTypeIncorrect,
} from "@errors/season";
import { studioNotFound } from "@errors/studio";
import { serverError } from "@errors/system";
import { ANIME_SEASONS } from "@globals/constants";
import {
  animeSeasonConnectionOption,
  seasonUpdateBody,
  studioConnectionOption,
} from "@interfaces/season";
import { EpisodeType, SeasonType, Status } from "@prisma/client";
import { seasonUpdated } from "@success/season";
import { prisma } from "@utils/prisma";
import { Request, Response } from "express";

async function updateSeason(req: Request, res: Response) {
  try {
    const { seasonId: SID } = req.params;
    const { status, name, episodeType, seasonType, studios, animeSeasons } =
      req.body as seasonUpdateBody;

    const seasonId = parseInt(SID);

    // Check name
    if (
      (await prisma.season.count({
        where: {
          name,
          NOT: {
            id: seasonId,
          },
        },
      })) !== 0
    ) {
      return res.json(seasonExists);
    }

    // Check for Episode Type
    if (!(episodeType in EpisodeType)) {
      return res.json(episodeTypeIncorrect);
    }

    // Check for Season Type
    if (!(seasonType in SeasonType)) {
      console.log(seasonType);
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

    // Check status
    if (!(status in Status)) {
      return res.json(incorrectStatus);
    }

    await prisma.season.update({
      where: {
        id: seasonId,
      },
      data: {
        status,
        name,
        seasonType,
        episodeType,
        studios: {
          connect: studioConnectionOptions,
        },
        animeSeasons: {
          connect: animeSeasonConnectionOptions,
        },
      },
    });

    return res.json(seasonUpdated);
  } catch (err) {
    console.log(err);
    return res.json(serverError);
  }
}

export { updateSeason };
