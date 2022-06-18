import {
  EpisodeType,
  SeasonOfYear,
  SeasonType,
  Status,
  Season,
} from "@prisma/client";

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

interface updateRatingBody {
  rating: string;
}

interface ratingPromise {
  _sum: {
    rating: number | null;
  };
  _count: {
    rating: number;
  };
}

interface seasonData extends ratingPromise, Season {}

export {
  seasonAddBody,
  seasonUpdateBody,
  studioConnectionOption,
  animeSeasonConnectionOption,
  updateRatingBody,
  ratingPromise,
  seasonData,
};
