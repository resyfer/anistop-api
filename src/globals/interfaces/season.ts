import { EpisodeType, SeasonOfYear, SeasonType } from "@prisma/client";

interface seasonAddBody {
  name: string;
  seasonType: SeasonType;
  episodeType: EpisodeType;
  animeSeasons: {
    year: number;
    seasonOfYear: SeasonOfYear;
  }[];
  studios: string[];
}

interface studioConnectionOption {
  name: string;
}

interface animeSeasonConnectionOption {
  // eslint-disable-next-line camelcase
  seasonOfYear_year: {
    seasonOfYear: SeasonOfYear;
    year: number;
  };
}

export { seasonAddBody, studioConnectionOption, animeSeasonConnectionOption };
