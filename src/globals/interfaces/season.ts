import { EpisodeType, SeasonOfYear, SeasonType, Status } from "@prisma/client";

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

interface seasonUpdateBody {
  status: Status;
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

export {
  seasonAddBody,
  seasonUpdateBody,
  studioConnectionOption,
  animeSeasonConnectionOption,
};
